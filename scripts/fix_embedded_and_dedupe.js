const fs = require('fs');
const path = require('path');
const vm = require('vm');

const repoRoot = path.join(__dirname,'..');
const inFile = path.join(repoRoot,'testData_complete.js');
const outFile = path.join(repoRoot,'testData_complete.fixed.extracted.js');

if (!fs.existsSync(inFile)) { console.error('input not found', inFile); process.exit(2); }
const s = fs.readFileSync(inFile,'utf8');
const marker = 'window.testData =';
const idx = s.indexOf(marker);
if (idx === -1) { console.error('marker not found'); process.exit(2); }
const start = s.indexOf('{', idx);
let i = start; let depth = 0; let end = -1;
for (; i < s.length; i++){
  const ch = s[i];
  if (ch === '{') depth++; else if (ch === '}') { depth--; if (depth === 0){ end = i; break; } }
}
if (end === -1){ console.error('closing brace not found'); process.exit(2); }
const objText = s.slice(start, end+1);
let data;
try { data = JSON.parse(objText); }
catch(e){ data = vm.runInNewContext('('+objText+')'); }

// Extract embedded test objects inside options arrays and move them to their category.tests
const extracted = [];
for (const catKey of Object.keys(data)){
  const cat = data[catKey];
  if (!Array.isArray(cat.tests)) continue;
  for (const test of cat.tests){
    if (!Array.isArray(test.options)) continue;
    for (let k = test.options.length - 1; k >= 0; k--){
      const opt = test.options[k];
      if (opt && typeof opt === 'object' && opt.id && opt.question){
        // remove from options
        test.options.splice(k,1);
        // ensure target category exists
        const targetCat = opt.category || catKey;
        if (!data[targetCat]) data[targetCat] = { name: targetCat, tests: [] };
        // remove category property from the extracted object to avoid duplication
        const copy = Object.assign({}, opt);
        delete copy.category;
        data[targetCat].tests.push(copy);
        extracted.push(copy.id);
      }
    }
  }
}

// Deduplicate by id: keep first occurrence encountered (category/test order)
const seen = new Set();
let removed = 0;
for (const catKey of Object.keys(data)){
  const cat = data[catKey];
  if (!Array.isArray(cat.tests)) continue;
  const newTests = [];
  for (const t of cat.tests){
    const tid = t && t.id;
    if (tid == null){ newTests.push(t); continue; }
    if (seen.has(tid)){ removed++; continue; }
    seen.add(tid);
    newTests.push(t);
  }
  cat.tests = newTests;
}

const outText = 'window.testData = ' + JSON.stringify(data, null, 2) + ';\n';
fs.writeFileSync(outFile, outText, 'utf8');
console.log('Wrote', outFile);
console.log('Extracted embedded ids count:', extracted.length, extracted.slice(0,20));
console.log('Removed duplicate ids during dedupe:', removed);
console.log('Unique remaining tests:', seen.size);
process.exit(0);
