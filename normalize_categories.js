const fs = require('fs');
const path = require('path');

function readTestDataFromJS(filePath, encoding='utf8'){
  const content = fs.readFileSync(filePath, encoding);
  const start = content.indexOf('window.testData');
  const objStart = content.indexOf('{', start);
  let brace = 0; let endIdx = -1;
  for (let i = objStart; i < content.length; i++){
    const ch = content[i];
    if (ch === '{') brace++;
    else if (ch === '}'){
      brace--; if (brace === 0){ endIdx = i; break; }
    }
  }
  const objStr = content.substring(objStart, endIdx+1);
  const obj = eval('(' + objStr + ')');
  return { obj, pre: content.substring(0, start), post: content.substring(endIdx+1) };
}

function writeTestDataToJS(filePath, obj, pre, post, encoding='utf8'){
  const json = JSON.stringify(obj, null, 2);
  const out = pre + 'window.testData = ' + json + ';' + post;
  fs.writeFileSync(filePath, out, encoding);
}

function normalizeKey(k){
  return k.toString().toLowerCase()
    .replace(/[^a-z0-9]+/g,'-')
    .replace(/-+/g,'-')
    .replace(/(^-|-$)/g,'');
}

const canonicalList = [
  { key: 'aircraft-general-knowledge', tokens: ['aircraft','general','knowledge'] },
  { key: 'air-law', tokens: ['air','law'] },
  { key: 'aon-aviation-knowledge', tokens: ['aon','aviation','knowledge'] },
  { key: 'flight-planning-and-monitoring', tokens: ['flight','planning','monitoring'] },
  { key: 'human-performance-and-limitations', tokens: ['human','performance'] },
  { key: 'instrumentation', tokens: ['instrumentation'] },
  { key: 'mass-and-balance', tokens: ['mass','balance'] },
  { key: 'meteorology', tokens: ['meteorology','weather'] },
  { key: 'operational-procedures', tokens: ['operational','procedures','procedures'] },
  { key: 'principles-of-flight', tokens: ['principles','flight'] },
  { key: 'radio-navigation', tokens: ['radio','navigation','rnav'] },
  { key: 'general-navigation', tokens: ['general','navigation'] },
  { key: 'performance', tokens: ['performance'] }
];

function findCanonicalKey(key, catObj){
  const norm = normalizeKey(key + ' ' + (catObj.name||''));
  for (const c of canonicalList){
    const allMatch = c.tokens.every(t => norm.includes(t));
    if (allMatch) return c.key;
  }
  // fallback heuristics
  if (norm.includes('flight') && norm.includes('planning')) return 'flight-planning-and-monitoring';
  if (norm.includes('human') && norm.includes('performance')) return 'human-performance-and-limitations';
  if (norm.includes('mass') && norm.includes('balance')) return 'mass-and-balance';
  if (norm.includes('radio') && norm.includes('navigation')) return 'radio-navigation';
  if (norm.includes('aon')) return 'aon-aviation-knowledge';
  if (norm.includes('instrument')) return 'instrumentation';
  if (norm.includes('meteor')) return 'meteorology';
  if (norm.includes('performance')) return 'performance';
  return normalizeKey(key);
}

function mergeCategories(testData){
  const merged = {};
  const seenQ = new Set();
  Object.keys(testData).forEach(origKey => {
    const cat = testData[origKey];
    const dest = findCanonicalKey(origKey, cat);
    if (!merged[dest]) merged[dest] = { name: cat.name || dest.replace(/-/g,' ').replace(/\b\w/g,l=>l.toUpperCase()), icon: cat.icon || 'fas fa-question-circle', tests: [] };

    (cat.tests || []).forEach(test => {
      const copyTest = { id: test.id || test.name || ('test-' + Math.random().toString(36).slice(2,8)), name: test.name || test.id || 'Imported', timeLimit: test.timeLimit || 60, questions: [] };
      (test.questions || []).forEach(q => {
        const qid = q.id !== undefined && q.id !== null ? ('id:'+q.id) : ('text:'+((q.question||'').slice(0,120)));
        if (!seenQ.has(qid)){
          seenQ.add(qid);
          copyTest.questions.push(q);
        }
      });
      if (copyTest.questions.length) merged[dest].tests.push(copyTest);
    });
  });
  return merged;
}

(async function main(){
  try{
    const root = process.cwd();
    const tdPath = path.join(root, 'testData_complete.js');
    const saPath = path.join(root, 'STANDALONE.html');

    // Read
    const td = readTestDataFromJS(tdPath, 'utf8');
    const beforeKeys = Object.keys(td.obj);
    console.log('Categories before:', beforeKeys.length, beforeKeys.join(', '));

    const merged = mergeCategories(td.obj);
    const afterKeys = Object.keys(merged);
    console.log('Categories after:', afterKeys.length, afterKeys.join(', '));

    // Backup
    fs.copyFileSync(tdPath, tdPath + '.bak2');
    if (fs.existsSync(saPath)) fs.copyFileSync(saPath, saPath + '.bak2');

    // Write testData_complete
    writeTestDataToJS(tdPath, merged, td.pre, td.post, 'utf8');
    console.log('Wrote updated', tdPath);

    // Update STANDALONE.html
    if (fs.existsSync(saPath)){
      const sa = readTestDataFromJS(saPath, 'utf16le');
      writeTestDataToJS(saPath, merged, sa.pre, sa.post, 'utf16le');
      console.log('Wrote updated', saPath);
    }

    // Summary counts
    let totalQ = 0; Object.values(merged).forEach(c=> c.tests.forEach(t => totalQ += (t.questions||[]).length));
    console.log('Total questions after normalization:', totalQ);

  } catch(e){ console.error('Failed:', e); process.exit(1); }
})();
