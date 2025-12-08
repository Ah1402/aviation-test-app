const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const dataPath = path.join(root, 'testData_complete.js');
const outDataPath = path.join(root, 'testData_dedup.js');
const duplicatesPath = path.join(root, 'duplicates.json');

function read(p){ return fs.readFileSync(p, 'utf8'); }
function write(p, data){ fs.writeFileSync(p, data, 'utf8'); }

try{
  const data = read(dataPath);
  const sandbox = { window: {} };
  vm.runInNewContext(data + '\n', sandbox, { timeout: 20000 });
  const testData = sandbox.window && sandbox.window.testData;
  if (!testData || typeof testData !== 'object'){
    console.error('Dataset not found or malformed in', dataPath);
    process.exit(2);
  }

  const seen = new Map(); // key -> { kept: {id, catKey, testId}, copies: [...] }
  const duplicatesReport = [];
  let totalQuestions = 0;

  // Build a new testData structure by copying categories/tests and filtering questions
  const newTestData = {};
  Object.keys(testData).forEach(catKey=>{
    const cat = testData[catKey];
    const newCat = Object.assign({}, cat, { tests: [] });
    if (!cat || !Array.isArray(cat.tests)) { newTestData[catKey] = newCat; return; }

    cat.tests.forEach(test=>{
      const newTest = Object.assign({}, test, { questions: [] });
      if (!test || !Array.isArray(test.questions)) { newCat.tests.push(newTest); return; }

      test.questions.forEach(q=>{
        totalQuestions++;
        const qText = (q.question || '').replace(/\s+/g,' ').trim().toLowerCase();
        const opts = Array.isArray(q.options) ? q.options.map(o=> (''+o).replace(/\s+/g,' ').trim().toLowerCase()) : [];
        const optsKey = opts.join('||');
        const key = `${qText}||${optsKey}`;

        if (!seen.has(key)){
          // keep this one
          seen.set(key, { kept: { id: q.id, category: catKey, test: test.id }, copies: [] });
          newTest.questions.push(q);
        } else {
          // record as duplicate, skip adding
          const entry = { id: q.id, category: catKey, test: test.id, question: q.question };
          const info = seen.get(key);
          info.copies.push(entry);
        }
      });

      newCat.tests.push(newTest);
    });

    newTestData[catKey] = newCat;
  });

  // Build duplicates report from seen map
  let duplicateGroups = 0;
  let duplicateEntries = 0;
  for (const [k, v] of seen.entries()){
    if (v.copies.length > 0){
      duplicateGroups++;
      duplicateEntries += v.copies.length;
      duplicatesReport.push({ kept: v.kept, copies: v.copies });
    }
  }

  // Write deduped dataset in same format (window.testData = {...})
  const outContent = 'window.testData = ' + JSON.stringify(newTestData, null, 2) + ';\n';
  write(outDataPath, outContent);
  write(duplicatesPath, JSON.stringify({ totalQuestions, duplicateGroups, duplicateEntries, extraCopies: duplicateEntries - duplicateGroups, groups: duplicatesReport }, null, 2));

  console.log('WROTE', outDataPath);
  console.log('WROTE', duplicatesPath);
  console.log('Totals: originalQuestions=', totalQuestions, 'duplicateGroups=', duplicateGroups, 'duplicateEntries=', duplicateEntries);

}catch(err){
  console.error('Deduplication failed:', err && err.stack || err);
  process.exit(1);
}
