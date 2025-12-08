const fs = require('fs');
const vm = require('vm');

function extractWindowTestDataFromHTML(html) {
  const token = 'window.testData =';
  const idx = html.indexOf(token);
  if (idx === -1) return null;
  let i = html.indexOf('{', idx);
  if (i === -1) return null;
  let depth = 0;
  let end = -1;
  for (; i < html.length; i++) {
    const ch = html[i];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) { end = i; break; }
    }
  }
  if (end === -1) return null;
  const objText = html.slice(html.indexOf('{', idx), end + 1);
  try {
    // evaluate safely
    const sandbox = {};
    const scriptText = '(' + objText + ')';
    const obj = vm.runInNewContext(scriptText, sandbox, {timeout: 1000});
    return obj;
  } catch (e) {
    console.error('Failed to eval testData object:', e.message);
    return null;
  }
}

function loadJSDataFile(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const txt = fs.readFileSync(filePath,'utf8');
  // file might be `window.testData = { ... }` or `module.exports = ...`
  if (txt.includes('window.testData')) {
    return extractWindowTestDataFromHTML(txt);
  }
  try {
    const sandbox = {};
    const scriptText = '( ' + txt + ' )';
    return vm.runInNewContext(scriptText, sandbox, {timeout: 2000});
  } catch (e) {
    // fallback: try to find first { ... } block
    const firstBrace = txt.indexOf('{');
    const lastBrace = txt.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      try {
        return vm.runInNewContext('(' + txt.slice(firstBrace, lastBrace+1) + ')', {}, {timeout:2000});
      } catch (e2) {
        console.error('fallback eval failed:', e2.message);
        return null;
      }
    }
    console.error('Could not parse JS data file:', filePath);
    return null;
  }
}

function extractQuestionAnswerPairs(dataObj) {
  const pairs = [];
  if (!dataObj || typeof dataObj !== 'object') return pairs;
  Object.keys(dataObj).forEach(catKey => {
    const cat = dataObj[catKey];
    (cat.tests || []).forEach(test => {
      (test.questions || []).forEach(q => {
        const qText = String(q.question || q.q || '').replace(/\s+/g,' ').trim();
        // resolve correct answer text
        let answerText = '';
        if (typeof q.correct === 'number' && Array.isArray(q.options)) {
          answerText = q.options[q.correct] || '';
        } else if (typeof q.answer === 'string') {
          answerText = q.answer;
        } else if (q.correct && typeof q.correct === 'string') {
          // maybe letter or textual
          const c = q.correct.trim();
          if (/^[A-Z]$/i.test(c) && Array.isArray(q.options)) {
            const idx = c.toUpperCase().charCodeAt(0) - 65;
            answerText = q.options[idx] || '';
          } else answerText = c;
        } else if (q.correctText) answerText = q.correctText;

        answerText = String(answerText).replace(/\s+/g,' ').trim();
        if (qText) pairs.push({category: String(catKey||'').trim(), question: qText, answer: answerText});
      });
    });
  });
  return pairs;
}

function normalize(s){ return String(s||'').replace(/\s+/g,' ').trim().toLowerCase(); }

(async function main(){
  const base = process.cwd();
  const idxHtmlCandidates = [
    base + '/index.html',
    base + '/www/index.html',
    base + '/dist/portable_build/index.html',
    base + '/dist/portable_build/www/index.html'
  ];
  let idxHtml = null;
  for (const p of idxHtmlCandidates) if (fs.existsSync(p)) { idxHtml = p; break; }
  const shareHtml = base + '/index_shareable.html';

  const idxExists = fs.existsSync(idxHtml);
  const shareExists = fs.existsSync(shareHtml);
  if (!idxExists) { console.error('index.html not found at', idxHtml); process.exit(2); }
  if (!shareExists) { console.error('index_shareable.html not found at', shareHtml); process.exit(2); }

  const idxTxt = fs.readFileSync(idxHtml,'utf8');
  const shareTxt = fs.readFileSync(shareHtml,'utf8');

  let idxData = extractWindowTestDataFromHTML(idxTxt);
  // If index.html doesn't inline data, try to find a referenced data file by searching for testData script src
  if (!idxData) {
    // try to find script tag pointing to testData or testData_complete
    const m = idxTxt.match(/<script[^>]+src=["']([^"']*testData[^"']*)["'][^>]*><\/script>/i);
    if (m) {
      const rel = m[1];
      const candidate = require('path').resolve(base, rel);
      if (fs.existsSync(candidate)) {
        idxData = loadJSDataFile(candidate);
      }
    }
  }

  // For shareable extract
  let shareData = extractWindowTestDataFromHTML(shareTxt);

  if (!idxData) { console.error('Could not extract testData from', idxHtml); process.exit(3); }
  if (!shareData) { console.error('Could not extract testData from index_shareable.html'); process.exit(4); }

  const idxPairs = extractQuestionAnswerPairs(idxData);
  const sharePairs = extractQuestionAnswerPairs(shareData);

  const idxMap = new Map();
  idxPairs.forEach(p => {
    const k = normalize(p.category) + '||' + normalize(p.question) + '||' + normalize(p.answer);
    idxMap.set(k, (idxMap.get(k)||0) + 1);
  });
  const shareMap = new Map();
  sharePairs.forEach(p => {
    const k = normalize(p.category) + '||' + normalize(p.question) + '||' + normalize(p.answer);
    shareMap.set(k, (shareMap.get(k)||0) + 1);
  });

  // Count duplicates where key exists in both maps (i.e., same question text and same answer)
  let duplicateCount = 0;
  const duplicates = [];
  for (const [k, v] of idxMap.entries()) {
    if (shareMap.has(k)) {
      // count as min occurrences across both
      const shared = Math.min(v, shareMap.get(k));
      duplicateCount += shared;
      duplicates.push({key:k, countInIndex: v, countInShare: shareMap.get(k), shared});
    }
  }

  // output summary
  console.log('Index question-answer pairs:', idxPairs.length);
  console.log('Shareable question-answer pairs:', sharePairs.length);
  console.log('Duplicated question+same-answer count (sum of shared occurrences):', duplicateCount);
  console.log('Unique duplicated QA entries:', duplicates.length);
  // write details file
  fs.writeFileSync(base + '/tools/duplicates_qa.json', JSON.stringify({duplicates, duplicateCount, uniqueDuplicates: duplicates.length}, null, 2));
  console.log('Details written to tools/duplicates_qa.json');
})();
