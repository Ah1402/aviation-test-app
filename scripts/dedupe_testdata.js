const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'testData_complete.js');
const out = path.join(__dirname, '..', 'testData_complete.dedup.js');

const text = fs.readFileSync(src, 'utf8');
const marker = 'window.testData =';
const idx = text.indexOf(marker);
if (idx === -1) {
  console.error('window.testData marker not found');
  process.exit(2);
}

// find the opening brace after the marker
const start = text.indexOf('{', idx);
if (start === -1) { console.error('opening brace not found'); process.exit(2); }

// brace matching to find the end
let i = start;
let depth = 0;
let end = -1;
for (; i < text.length; i++) {
  const ch = text[i];
  if (ch === '{') depth++;
  else if (ch === '}') {
    depth--;
    if (depth === 0) { end = i; break; }
  }
}
if (end === -1) { console.error('matching closing brace not found'); process.exit(2); }

const objText = text.slice(start, end + 1);
let data;
try {
  data = JSON.parse(objText);
} catch (e) {
  console.error('JSON.parse failed:', e.message);
  // try a forgiving eval in a VM
  try {
    const vm = require('vm');
    data = vm.runInNewContext('(' + objText + ')');
  } catch (e2) {
    console.error('eval fallback failed:', e2.message);
    process.exit(3);
  }
}

// Deduplicate questions globally by numeric id, keeping first occurrence
const seen = new Set();
let removed = 0;
for (const catKey of Object.keys(data)) {
  const cat = data[catKey];
  if (!cat.tests) continue;
  for (const test of cat.tests) {
    if (!Array.isArray(test.questions)) continue;
    const filtered = [];
    for (const q of test.questions) {
      const qid = q.id;
      if (seen.has(qid)) { removed++; continue; }
      seen.add(qid);
      filtered.push(q);
    }
    test.questions = filtered;
  }
}

const outText = 'window.testData = ' + JSON.stringify(data, null, 2) + ';\n';
fs.writeFileSync(out, outText, 'utf8');
console.log('Wrote', out);
console.log('Questions removed (duplicates):', removed);
console.log('Unique questions remaining:', seen.size);
process.exit(0);
