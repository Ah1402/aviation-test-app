/**
 * Audit verification coverage and highlight potential issues:
 * - Coverage stats (verified vs unverified, confidence levels)
 * - Duplicate/conflicting questions (same normalized text, different correct indices)
 * - Suspicious explanations (contain letter markers contradicting stored correct)
 * - Out-of-range indices or malformed options
 * Outputs JSON summary and CSV suspects.
 */
const fs = require('fs');
const path = require('path');

const DATA_PATH = path.resolve(__dirname, '..', 'dist', 'portable_build', 'www', 'src', 'data', 'testData.js');
const OUT_SUMMARY = path.resolve(__dirname, 'answers_audit_summary.json');
const OUT_SUSPECTS = path.resolve(__dirname, 'answers_suspects.csv');

function extractRootObject(raw) {
  const anchor = raw.indexOf('const testData');
  if (anchor === -1) throw new Error('testData declaration not found');
  let i = raw.indexOf('{', anchor);
  if (i === -1) throw new Error('Opening brace not found');
  let depth = 0, start = -1, end = -1; let inStr=false, q=''; let prev='';
  for (; i < raw.length; i++) {
    const ch = raw[i];
    if (inStr) { if (ch === q && prev !== '\\') { inStr=false; } prev=ch; continue; }
    if (ch === '"' || ch === "'") { inStr=true; q=ch; prev=ch; continue; }
    if (ch === '{') { if (depth===0) start=i; depth++; }
    else if (ch === '}') { depth--; if (depth===0){ end=i+1; break; } }
    prev=ch;
  }
  if (start === -1 || end === -1) throw new Error('Failed to bracket object');
  return { slice: raw.slice(start, end) };
}

function parseObject(text){
  const cleaned = text.replace(/,(\s*[}\]])/g, '$1');
  // eslint-disable-next-line no-new-func
  return Function('return ('+ cleaned + ')')();
}

function norm(s){ return (s||'').toString().replace(/\s+/g,' ').trim(); }
function optionsArray(opt){ if (Array.isArray(opt)) return opt; if (opt && typeof opt==='object') return Object.values(opt); return []; }

function main(){
  const raw = fs.readFileSync(DATA_PATH,'utf8');
  const { slice } = extractRootObject(raw);
  const data = parseObject(slice);

  let total=0, verified=0, confHigh=0, confMedium=0;
  let malformed=0, outOfRange=0;
  const dupMap = new Map();
  const suspects = [];

  const pushSuspect = (category,testName,index,reason,details,q) => {
    suspects.push({category,testName,index,reason,details,question: q.question});
  };

  for (const catKey of Object.keys(data)){
    const cat = data[catKey];
    if (!cat || !Array.isArray(cat.tests)) continue;
    for (const test of cat.tests){
      if (!test || !Array.isArray(test.questions)) continue;
      test.questions.forEach((q, idx) => {
        total++;
        if (q.answerVerified) verified++;
        if (q.answerConfidence === 'high') confHigh++;
        if (q.answerConfidence === 'medium') confMedium++;

        const opts = optionsArray(q.options);
        if (!Array.isArray(opts) || opts.length === 0){
          malformed++;
          pushSuspect(cat.name||catKey, test.name||'', idx+1, 'Malformed options', 'Options missing or not array', q);
        }
        const correct = q.correct;
        if (typeof correct === 'number' && (correct < 0 || correct >= opts.length)){
          outOfRange++;
          pushSuspect(cat.name||catKey, test.name||'', idx+1, 'Correct index out of range', `correct=${correct}, options=${opts.length}`, q);
        }

        // Duplicate/conflict check key: normalized question text
        const key = norm(q.question).toLowerCase();
        if (key){
          const entry = dupMap.get(key) || [];
          entry.push({correct, options: opts.map(norm), cat: cat.name||catKey, test: test.name||'', index: idx+1});
          dupMap.set(key, entry);
        }

        // Explanation mentions a different explicit letter than stored correct
        if (q.explanation){
          const m = q.explanation.match(/\b(correct answer|answer is)\s*[:\-]?\s*([A-D])/i);
          if (m){
            const letter = m[2].toUpperCase();
            const letterIdx = letter.charCodeAt(0)-65;
            if (typeof correct==='number' && letterIdx !== correct){
              pushSuspect(cat.name||catKey, test.name||'', idx+1, 'Explanation/answer letter mismatch', `explains ${letter} but correct=${String.fromCharCode(65+correct)}`, q);
            }
          }
        }
      });
    }
  }

  // Find conflicts among duplicates with identical options but different correct
  dupMap.forEach((arr, key) => {
    if (arr.length <= 1) return;
    // Compare by serialized options
    const groups = new Map();
    arr.forEach(item => {
      const sig = JSON.stringify(item.options);
      const g = groups.get(sig) || [];
      g.push(item);
      groups.set(sig, g);
    });
    groups.forEach(items => {
      if (items.length <= 1) return;
      const distinct = new Set(items.map(i => i.correct));
      if (distinct.size > 1){
        // Conflict found
        items.forEach(i => {
          const where = `${i.cat} / ${i.test} #${i.index}`;
          suspects.push({category: i.cat, testName: i.test, index: i.index, reason: 'Duplicate conflict', details: `Same question/options with different correct indices across entries`, question: key});
        });
      }
    });
  });

  const summary = {
    totals: { total, verified, unverified: total-verified },
    confidence: { high: confHigh, medium: confMedium },
    dataIssues: { malformedOptions: malformed, correctIndexOutOfRange: outOfRange },
    suspects: suspects.length
  };

  fs.writeFileSync(OUT_SUMMARY, JSON.stringify(summary, null, 2),'utf8');
  const csvHeader = 'category,test,index,reason,details,question';
  const csvRows = suspects.map(s => [s.category, s.testName, s.index, s.reason, s.details, s.question].map(v => {
    const t = (v==null?'':String(v));
    return '"'+ t.replace(/"/g,'""') +'"';
  }).join(','));
  fs.writeFileSync(OUT_SUSPECTS, [csvHeader, ...csvRows].join('\n'), 'utf8');

  console.log('Audit complete:', JSON.stringify(summary));
  console.log('Reports:', OUT_SUMMARY, 'and', OUT_SUSPECTS);
}

if (require.main === module){
  try { main(); } catch (e) { console.error('Error:', e); process.exit(1); }
}
