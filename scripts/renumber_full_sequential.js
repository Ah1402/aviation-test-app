#!/usr/bin/env node
// Renumber all question IDs across testData_complete.js to a single sequential range (1..N)
// Produces mapping files: data/id_remap_full_seq.json and data/id_remap_full_seq_reverse.json

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const filePath = path.join(root, 'testData_complete.js');
const dataDir = path.join(root, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

function readTestData(src) {
  const content = fs.readFileSync(src, 'utf8');
  // Extract the object literal assigned to window.testData
  const m = content.match(/window\.testData\s*=\s*([\s\S]*);?\s*$/);
  if (!m) throw new Error('Unable to find window.testData assignment in ' + src);
  let jsonText = m[1];
  // Try parse as JSON. If it fails, attempt to trim leading/trailing whitespace.
  try {
    return JSON.parse(jsonText);
  } catch (err) {
    // Try to locate the first { and last } to be robust
    const first = content.indexOf('{', content.indexOf('window.testData'));
    const last = content.lastIndexOf('}');
    if (first >= 0 && last > first) {
      jsonText = content.slice(first, last + 1);
      return JSON.parse(jsonText);
    }
    throw err;
  }
}

function writeTestData(obj) {
  const out = 'window.testData = ' + JSON.stringify(obj, null, 2) + ';\n';
  fs.writeFileSync(filePath, out, 'utf8');
}

function backupFile(src) {
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  const bak = src + '.bak.' + ts;
  fs.copyFileSync(src, bak);
  return bak;
}

function run() {
  console.log('Reading', filePath);
  const data = readTestData(filePath);

  // Flatten traversal order: categories -> tests[] -> questions[] in existing order
  let nextId = 1;
  const old2new = {}; // oldId -> array of new ids
  const new2old = {}; // newId -> old id

  // Backup original file
  const bak = backupFile(filePath);
  console.log('Backup created:', bak);

  let total = 0;
  for (const catKey of Object.keys(data)) {
    const cat = data[catKey];
    if (!cat.tests || !Array.isArray(cat.tests)) continue;
    for (const test of cat.tests) {
      if (!test.questions || !Array.isArray(test.questions)) continue;
      for (const q of test.questions) {
        total++;
        const old = q.id;
        q.id = nextId;
        // Record mapping; allow multiple new ids per old id
        if (!old2new.hasOwnProperty(old)) old2new[old] = [];
        old2new[old].push(nextId);
        new2old[nextId] = old;
        nextId++;
      }
    }
  }

  console.log('Reassigned', total, 'question IDs, new max ID =', nextId - 1);

  // Write mapping files
  const mapFile = path.join(dataDir, 'id_remap_full_seq.json');
  const mapFileR = path.join(dataDir, 'id_remap_full_seq_reverse.json');
  fs.writeFileSync(mapFile, JSON.stringify(old2new, null, 2), 'utf8');
  fs.writeFileSync(mapFileR, JSON.stringify(new2old, null, 2), 'utf8');
  console.log('Generated mapping files:', mapFile, mapFileR);

  // Write updated dataset
  writeTestData(data);
  console.log('Updated', filePath);

  // Save a summary
  const summary = {
    backup: bak,
    totalQuestions: total,
    newMaxId: nextId - 1,
    mappingFile: 'data/id_remap_full_seq.json',
    reverseMappingFile: 'data/id_remap_full_seq_reverse.json'
  };
  fs.writeFileSync(path.join(dataDir, 'id_remap_full_seq_summary.json'), JSON.stringify(summary, null, 2), 'utf8');
  console.log('Summary written to data/id_remap_full_seq_summary.json');
}

if (require.main === module) {
  try {
    run();
  } catch (err) {
    console.error('ERROR:', err && err.message || err);
    process.exit(2);
  }
}

module.exports = { readTestData };
