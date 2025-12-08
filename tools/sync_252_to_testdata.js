const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const file252 = path.join(root, '252.js');
const fileTest = path.join(root, 'testData_complete.js');
const outMerged = path.join(root, 'testData_complete_merged.js');
const addedReport = path.join(root, 'added_from_252.json');

function read(p){ return fs.readFileSync(p, 'utf8'); }
function write(p, d){ fs.writeFileSync(p, d, 'utf8'); }

try{
  // load 252.js by extracting the consolidatedQuestionBank array literal robustly
  const raw252 = read(file252);
  const marker = 'consolidatedQuestionBank';
  const idx = raw252.indexOf(marker);
  if (idx === -1) throw new Error('consolidatedQuestionBank marker not found in 252.js');
  const eqIdx = raw252.indexOf('=', idx);
  if (eqIdx === -1) throw new Error('Could not find = after consolidatedQuestionBank');
  // find first '[' after the '='
  let arrStart = raw252.indexOf('[', eqIdx);
  if (arrStart === -1) throw new Error('Could not find array start for consolidatedQuestionBank');

  // scan to matching closing bracket
  let i = arrStart;
  let depth = 0;
  let inString = false;
  let stringChar = '';
  while (i < raw252.length){
    const ch = raw252[i];
    if (inString){
      if (ch === '\\') { i += 2; continue; }
      if (ch === stringChar) inString = false;
      i++; continue;
    }
    if (ch === '"' || ch === "'") { inString = true; stringChar = ch; i++; continue; }
    if (ch === '[') { depth++; }
    else if (ch === ']') { depth--; if (depth === 0){ i++; break; } }
    i++;
  }
  if (depth !== 0) throw new Error('Failed to find end of consolidatedQuestionBank array');

  const arrayText = raw252.slice(arrStart, i);
  const evalCode = 'consolidatedQuestionBank = ' + arrayText + ';';
  const sandbox252 = {};
  vm.runInNewContext(evalCode + '\n', sandbox252, { timeout: 20000 });
  const bank = sandbox252.consolidatedQuestionBank;
  if (!Array.isArray(bank)) throw new Error('Could not extract consolidatedQuestionBank from 252.js');

  // load testData_complete.js
  const codeTest = read(fileTest);
  const sandboxTest = { window: {} };
  vm.runInNewContext(codeTest + '\n', sandboxTest, { timeout: 20000 });
  const testData = sandboxTest.window && sandboxTest.window.testData;
  if (!testData || typeof testData !== 'object') throw new Error('Could not extract window.testData from testData_complete.js');

  // gather existing ids
  const existingIds = new Set();
  Object.keys(testData).forEach(catKey=>{
    const cat = testData[catKey];
    if (!cat || !Array.isArray(cat.tests)) return;
    cat.tests.forEach(test=>{
      if (!test || !Array.isArray(test.questions)) return;
      test.questions.forEach(q=>{
        if (q && typeof q.id !== 'undefined') existingIds.add(Number(q.id));
      });
    });
  });

  const added = [];

  function makeKeyFromName(name){
    return name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
  }

  for (const q of bank){
    const qid = Number(q.id);
    if (existingIds.has(qid)) continue;

    // find category key by matching name
    const catName = q.category || 'uncategorized';
    let catKey = Object.keys(testData).find(k => (testData[k] && testData[k].name === catName));
    if (!catKey){
      // create new category key
      catKey = makeKeyFromName(catName);
      let suffix = 1;
      const base = catKey;
      while (testData[catKey]){ catKey = base + '-' + (suffix++); }
      testData[catKey] = { name: catName, icon: 'fas fa-question-circle', tests: [] };
    }

    const cat = testData[catKey];

    // find test object by test number
    const testNum = Number(q.test) || 1;
    let testObj = (cat.tests || []).find(t=> String(t.id).endsWith(`-test-${testNum}`) || (t.name && t.name.replace(/[^0-9]/g,'')==String(testNum)) );
    if (!testObj){
      // create a new test object
      const tid = `${catKey}-test-${testNum}`;
      testObj = { id: tid, name: `Test ${testNum}`, timeLimit: 60, questions: [] };
      cat.tests.push(testObj);
    }

    const newQ = {
      category: `${catKey}-test-${testNum}`,
      test: testNum,
      id: qid,
      question: q.question || '',
      options: Array.isArray(q.options) ? q.options : (q.options? [q.options]: []),
      answer: q.answer || '',
      correct: null,
      explanation: q.explanation || ''
    };

    testObj.questions.push(newQ);
    existingIds.add(qid);
    added.push({ id: qid, category: catKey, test: testNum });
  }

  // write merged file
  const out = 'window.testData = ' + JSON.stringify(testData, null, 2) + ';\n';
  write(outMerged, out);
  write(addedReport, JSON.stringify({ addedCount: added.length, added }, null, 2));

  console.log('Merged written to', outMerged);
  console.log('Added report written to', addedReport);
  console.log('Added questions count:', added.length);

}catch(err){
  console.error('Sync failed:', err && err.stack || err);
  process.exit(1);
}
