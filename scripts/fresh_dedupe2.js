const fs = require('fs');
const path = require('path');
const inFile = path.join(__dirname,'..','testData_complete.js');
const outFile = path.join(__dirname,'..','testData_complete.cleaned.from_original.js');
if (!fs.existsSync(inFile)) { console.error('input missing', inFile); process.exit(2); }
const txt = fs.readFileSync(inFile,'utf8');
const marker = 'window.testData =';
const idx = txt.indexOf(marker);
if (idx === -1) { console.error('marker not found'); process.exit(2); }
const start = txt.indexOf('{', idx);
let i=start,depth=0,end=-1;
for (; i<txt.length;i++){const ch=txt[i]; if(ch==='{') depth++; else if(ch==='}') { depth--; if(depth===0){ end=i; break; }}}
if(end===-1){console.error('closing brace not found'); process.exit(2);}
const objText = txt.slice(start,end+1);
let data;
try{ data = JSON.parse(objText);}catch(e){ const vm=require('vm'); data = vm.runInNewContext('('+objText+')'); }

const seen = new Set();
let removed = 0;
for (const catKey of Object.keys(data)){
  const cat = data[catKey];
  if(!cat.tests) continue;
  for (const test of cat.tests){
    if(!Array.isArray(test.questions)) continue;
    const newQs = [];
    for (const q of test.questions){
      const qid = Number(q.id);
      if (seen.has(qid)) { removed++; continue; }
      seen.add(qid);
      newQs.push(q);
    }
    test.questions = newQs;
  }
}
const out = 'window.testData = ' + JSON.stringify(data,null,2) + ';\n';
fs.writeFileSync(outFile,out,'utf8');
console.log('Wrote', outFile);
console.log('Removed duplicates:', removed);
console.log('Remaining unique:', seen.size);
process.exit(0);
