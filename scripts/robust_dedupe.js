const fs = require('fs');
const path = require('path');
const inFile = path.join(__dirname,'..','testData_complete.dedup.js');
const outFile = path.join(__dirname,'..','testData_complete.cleaned.robust.js');
if (!fs.existsSync(inFile)) { console.error('input missing', inFile); process.exit(2); }
const txt = fs.readFileSync(inFile,'utf8');
const marker = 'window.testData =';
const idx = txt.indexOf(marker);
if (idx === -1) { console.error('marker not found'); process.exit(2); }
const start = txt.indexOf('{', idx);
let i = start, depth=0, end=-1;
for (; i < txt.length; i++){
  const ch = txt[i]; if (ch==='{') depth++; else if (ch==='}') { depth--; if (depth===0) { end=i; break; } }
}
if (end===-1){ console.error('closing brace not found'); process.exit(2); }
const objText = txt.slice(start, end+1);
let data;
try { data = JSON.parse(objText); } catch(e) { const vm=require('vm'); data=vm.runInNewContext('('+objText+')'); }

// Flatten all questions in order of appearance; keep first occurrence of each id
const idMap = new Map();
const order = [];
for (const catKey of Object.keys(data)){
  const cat = data[catKey];
  if (!cat.tests) continue;
  for (const test of cat.tests){
    if (!Array.isArray(test.questions)) continue;
    for (const q of test.questions){
      if (!q || typeof q.id === 'undefined') continue;
      const qid = Number(q.id);
      if (!idMap.has(qid)) { idMap.set(qid, q); order.push(qid); }
    }
  }
}

console.log('Total unique ids found in flatten pass:', idMap.size);

// Now rebuild the data structure, keeping questions only if their id is the first occurrence (per idMap)
let removed=0;
for (const catKey of Object.keys(data)){
  const cat = data[catKey];
  if (!cat.tests) continue;
  for (const test of cat.tests){
    if (!Array.isArray(test.questions)) continue;
    const newQs = [];
    for (const q of test.questions){
      const qid = Number(q.id);
      if (idMap.has(qid) && idMap.get(qid)===q) {
        newQs.push(q);
        // mark as kept by removing from map so subsequent occurrences not kept
        idMap.delete(qid);
      } else {
        removed++;
      }
    }
    test.questions = newQs;
  }
}

// After this pass, some ids may remain in idMap if their first occurrence was skipped (unlikely). We'll ignore.

const outText = 'window.testData = ' + JSON.stringify(data,null,2) + ';\n';
fs.writeFileSync(outFile,outText,'utf8');
console.log('Wrote', outFile);
console.log('Removed duplicate question objects:', removed);
process.exit(0);
