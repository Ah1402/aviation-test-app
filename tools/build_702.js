const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const headPath = path.join(root, 'build_templates', 'standalone_head.html');
const dataPath = path.join(root, 'testData_complete.js');
const tailPath = path.join(root, 'build_templates', 'standalone_tail.html');
const outPath = path.join(root, '702.html');

function read(p){ return fs.readFileSync(p, 'utf8'); }

try{
  const head = read(headPath);
  const data = read(dataPath);
  const tail = read(tailPath);

  // Assemble final HTML
  const out = head + '\n' + data + '\n' + tail;
  fs.writeFileSync(outPath, out, 'utf8');
  console.log('WROTE', outPath);

  // Quick QA: load dataset from testData_complete.js into a VM and simulate normalization
  const sandbox = { window: {} };
  try{
    vm.runInNewContext(data + '\n', sandbox, { timeout: 5000 });
  }catch(e){
    console.error('Failed to evaluate dataset in VM:', e && e.message);
    process.exitCode = 2;
  }

  const testData = sandbox.window && sandbox.window.testData;
  if (!testData || typeof testData !== 'object'){
    console.error('Dataset not found in testData_complete.js');
    process.exitCode = 3;
    return;
  }

  let totalQuestions = 0;
  const changelog = [];
  function note(qid, field, before, after){ changelog.push({id: qid, field, before, after}); }

  Object.keys(testData).forEach(catKey=>{
    const cat = testData[catKey];
    if (!cat || !Array.isArray(cat.tests)) return;
    cat.tests.forEach(test=>{
      if (!test || !Array.isArray(test.questions)) return;
      test.questions.forEach(q=>{
        totalQuestions++;
        const qid = q && (q.id || `${catKey}:${test.id}`);
        const beforeCorrect = q.hasOwnProperty('correct') ? q.correct : null;
        let ok = true;
        if (typeof beforeCorrect !== 'number' || !isFinite(beforeCorrect)) ok = false;
        else if (beforeCorrect < 0) ok = false;
        else if (!Array.isArray(q.options) || beforeCorrect >= q.options.length) ok = false;
        if (!ok){ if (beforeCorrect !== null) note(qid,'correct', beforeCorrect, null); }
        else {
          const clamped = Math.floor(beforeCorrect);
          if (clamped !== beforeCorrect) note(qid,'correct', beforeCorrect, clamped);
        }
        const beforeAnswer = q.hasOwnProperty('answer') ? q.answer : null;
        if (typeof beforeAnswer !== 'string' || beforeAnswer.trim() === ''){
          if (q.hasOwnProperty('correct') && q.correct !== null){ note(qid,'answer', beforeAnswer, null); }
        }
      });
    });
  });

  console.log('QA SUMMARY: categories=', Object.keys(testData).length, 'questions=', totalQuestions, 'changelog_entries=', changelog.length);
  if (changelog.length>0) console.log('SAMPLE CHANGE:', JSON.stringify(changelog.slice(0,5), null, 2));

}catch(err){
  console.error('Build failed:', err && err.stack || err);
  process.exitCode = 1;
}
