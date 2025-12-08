#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const testDataPath = path.join(root, 'testData_complete.js');
const mapPath = path.join(root, 'data', 'id_remap_full_seq.json');
const revMapPath = path.join(root, 'data', 'id_remap_full_seq_reverse.json');

function loadTestData() {
  const content = fs.readFileSync(testDataPath, 'utf8');
  const m = content.match(/window\.testData\s*=\s*([\s\S]*);?\s*$/);
  if (m) {
    try { return JSON.parse(m[1]); } catch (e) { /* fallback below */ }
  }
  // Fallback: extract from first '{' after window.testData to final '}' in file
  const start = content.indexOf('{', content.indexOf('window.testData'));
  const end = content.lastIndexOf('}');
  if (start >= 0 && end > start) {
    const jsonText = content.slice(start, end + 1);
    return JSON.parse(jsonText);
  }
  throw new Error('Cannot parse testData from ' + testDataPath);
}

function findByNewId(data, id) {
  const matches = [];
  for (const catKey of Object.keys(data)) {
    const cat = data[catKey];
    if (!cat.tests) continue;
    for (const test of cat.tests) {
      if (!test.questions) continue;
      for (const q of test.questions) {
        if (Number(q.id) === Number(id)) {
          matches.push({ category: catKey, test: test.name || test.id || test.name, testIndex: test.test, question: q });
        }
      }
    }
  }
  return matches;
}

function main() {
  const argv = process.argv.slice(2);
  if (!argv.length) {
    console.error('Usage: node find_question_by_id.js <id>');
    process.exit(1);
  }
  const query = argv[0];

  const data = loadTestData();
  let map = null;
  if (fs.existsSync(mapPath)) map = JSON.parse(fs.readFileSync(mapPath, 'utf8'));

  // If the query is present in the old->new mapping prefer that (legacy id redirect)
  if (map && map.hasOwnProperty(query)) {
    console.log('Old id', query, 'was remapped to new id(s):', map[query].join(', '));
    for (const nid of map[query]) {
      const r = findByNewId(data, nid);
      if (r.length) {
        console.log('Found newId', nid);
        console.log(r[0].question.question);
      } else {
        console.log('New id', nid, 'not present in data?');
      }
    }
    return;
  }

  // Try exact new id next
  const asNum = Number(query);
  let results = findByNewId(data, asNum);
  if (results.length) {
    console.log('Found by newId =', asNum);
    for (const r of results) {
      console.log('---', r.category, '>', r.test);
      console.log('id:', r.question.id, 'question:', r.question.question);
      console.log('options:', r.question.options.join(' | '));
      console.log('answer:', r.question.answer, 'correct index:', r.question.correct);
      console.log();
    }
    return;
  }

  // If not found as a new id and not in mapping, report not found

  console.log('Not found as new id and no old->new mapping for:', query);
}

if (require.main === module) main();
