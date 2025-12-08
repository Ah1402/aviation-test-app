const fs = require('fs');
const path = require('path');
const repoRoot = path.join(__dirname,'..');
const inFile = path.join(repoRoot, 'testData_complete.dedup.js');
const outFile = path.join(repoRoot, 'testData_complete.cleaned2.js');
if (!fs.existsSync(inFile)) { console.error('input not found', inFile); process.exit(2); }
let s = fs.readFileSync(inFile,'utf8');
const marker = 'window.testData =';
const idx = s.indexOf(marker);
if (idx === -1) { console.error('marker not found'); process.exit(2); }
const start = s.indexOf('{', idx);
let i = start; let depth=0; let end=-1;
for (; i < s.length; i++){
  const ch = s[i];
  if (ch==='{') depth++; else if (ch==='}') { depth--; if (depth===0){ end=i; break; } }
}
if (end===-1){ console.error('closing brace not found'); process.exit(2); }
const objText = s.slice(start, end+1);
let data;
try { data = JSON.parse(objText); }
catch(e){ const vm=require('vm'); data = vm.runInNewContext('('+objText+')'); }

// Build map of first occurrence per id and remove duplicates
const seen = new Set();
let removed = 0;
for (const catKey of Object.keys(data)){
  const cat = data[catKey];
  if (!cat.tests) continue;
  for (const test of cat.tests){
    if (!Array.isArray(test.questions)) continue;
    const newQs = [];
    for (const q of test.questions){
      const qid = q && q.id;
      if (seen.has(qid)) { removed++; continue; }
      seen.add(qid);
      newQs.push(q);
    }
    test.questions = newQs;
  }
}
const outText = 'window.testData = ' + JSON.stringify(data,null,2) + ';\n';
fs.writeFileSync(outFile,outText,'utf8');
console.log('Wrote', outFile);
console.log('Removed duplicates:', removed);
console.log('Unique remaining:', seen.size);
process.exit(0);
