const fs = require('fs');
const vm = require('vm');

console.log('Reading testData_complete.js...');
const content = fs.readFileSync('testData_complete.js', 'utf8');
const startMarker = 'window.testData = ';
const start = content.indexOf(startMarker);
if (start === -1) { console.error('Could not find window.testData in testData_complete.js'); process.exit(1); }
const braceStart = content.indexOf('{', start);
let depth = 0, inString = false, stringChar = null, escapeNext = false, end = -1;
for (let i = braceStart; i < content.length; i++) {
  const ch = content[i];
  if (escapeNext) { escapeNext = false; continue; }
  if (ch === '\\') { escapeNext = true; continue; }
  if (!inString && (ch === '"' || ch === "'")) { inString = true; stringChar = ch; continue; }
  if (inString) { if (ch === stringChar) { inString = false; stringChar = null; } continue; }
  if (ch === '{') depth++; else if (ch === '}') { depth--; if (depth === 0) { end = i; break; } }
}
if (end === -1) { console.error('Could not find end of testData object'); process.exit(1); }
const objCode = content.substring(braceStart, end+1);

console.log('Parsing testData into memory...');
const sandbox = {};
vm.runInNewContext('testData = ' + objCode, sandbox);
const testData = sandbox.testData;

// Build occurrences map
const occurrences = new Map();
for (const [catKey, cat] of Object.entries(testData)) {
  if (!cat || !cat.tests) continue;
  for (let t = 0; t < cat.tests.length; t++) {
    const test = cat.tests[t];
    if (!test.questions) continue;
    for (let q = 0; q < test.questions.length; q++) {
      const question = test.questions[q];
      const id = question.id;
      if (!occurrences.has(id)) occurrences.set(id, []);
      occurrences.get(id).push({catKey, t, q, question});
    }
  }
}

console.log('Total unique IDs found:', occurrences.size);

// Decide which occurrences to keep using Option A
const keepMap = new Map();
let removedCount = 0;
for (const [id, occs] of occurrences.entries()) {
  if (occs.length === 1) { keepMap.set(id, occs[0]); continue; }
  // prefer occurrence in compass-egyptair
  const preferred = occs.find(o => o.catKey === 'compass-egyptair');
  if (preferred) {
    keepMap.set(id, preferred);
  } else {
    keepMap.set(id, occs[0]);
  }
  removedCount += (occs.length - 1);
}

console.log('Determined keep list. Total questions to remove (approx):', removedCount);

// Rebuild tests by filtering out not-kept questions
for (const [catKey, cat] of Object.entries(testData)) {
  if (!cat || !cat.tests) continue;
  for (let t = 0; t < cat.tests.length; t++) {
    const test = cat.tests[t];
    if (!test.questions) continue;
    const filtered = test.questions.filter(q => {
      const keep = keepMap.get(q.id);
      // keep only if this is the selected occurrence
      return keep && keep.catKey === catKey && keep.t === t && keep.q === test.questions.indexOf(q);
    });
    test.questions = filtered;
  }
}

// After filtering, some tests may be empty; keep structure but that's fine

// Write updated testData_complete.js using JSON formatting
console.log('Writing updated testData_complete.js...');
const out = 'window.testData = ' + JSON.stringify(testData, null, 2) + ';\n';
fs.writeFileSync('testData_complete.js', out, 'utf8');

console.log('Wrote testData_complete.js - now updating index.html by syncing');
console.log('Done.');
