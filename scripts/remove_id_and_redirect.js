#!/usr/bin/env node
// Usage: node remove_id_and_redirect.js <removeId> <keepId>
// Removes questions with id==removeId from testData_complete.js and writes a redirect mapping

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const filePath = path.join(root, 'testData_complete.js');
const dataDir = path.join(root, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: node remove_id_and_redirect.js <removeId> <keepId>');
  process.exit(2);
}
const removeId = Number(args[0]);
const keepId = Number(args[1]);

function readTestData(src) {
  const content = fs.readFileSync(src, 'utf8');
  const json = content.replace(/^\s*window\.testData\s*=\s*/,'').trim().replace(/;$/,'');
  return JSON.parse(json);
}

function backup(src) {
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  const bak = src + '.bak.remove.' + removeId + '.' + ts;
  fs.copyFileSync(src, bak);
  return bak;
}

function run() {
  console.log('Reading', filePath);
  const data = readTestData(filePath);
  const bak = backup(filePath);
  console.log('Backup created:', bak);

  let removedCount = 0;
  for (const catKey of Object.keys(data)) {
    const cat = data[catKey];
    if (!cat.tests || !Array.isArray(cat.tests)) continue;
    for (const test of cat.tests) {
      if (!test.questions || !Array.isArray(test.questions)) continue;
      const before = test.questions.length;
      test.questions = test.questions.filter(q => Number(q.id) !== removeId);
      const after = test.questions.length;
      removedCount += (before - after);
    }
  }

  if (removedCount === 0) {
    console.log('No questions with id', removeId, 'found — nothing removed');
  } else {
    console.log('Removed', removedCount, 'occurrence(s) of id', removeId);
  }

  // write redirect mapping file: map removedId -> keepId
  const redirect = { [String(removeId)]: [keepId] };
  const redirectFile = path.join(dataDir, `removed_${removeId}_to_${keepId}.json`);
  fs.writeFileSync(redirectFile, JSON.stringify(redirect, null, 2), 'utf8');
  console.log('Wrote redirect mapping to', redirectFile);

  // Save updated dataset
  const out = 'window.testData = ' + JSON.stringify(data, null, 2) + ';\n';
  fs.writeFileSync(filePath, out, 'utf8');
  console.log('Wrote updated', filePath);

  console.log('Summary: removedCount=', removedCount, 'redirectFile=', redirectFile);
}

if (require.main === module) run();
