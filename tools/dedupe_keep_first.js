const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const dataPath = path.join(root, 'testData_complete.js');
const backupPath = dataPath + '.bak.' + Date.now();
const outPath = path.join(root, 'testData_complete.dedup.keepfirst.js');

function read(p){ return fs.readFileSync(p, 'utf8'); }

try{
  // backup
  fs.copyFileSync(dataPath, backupPath);
  console.log('Backup written to', backupPath);

  const data = read(dataPath);
  const sandbox = { window: {} };
  vm.runInNewContext(data + '\n', sandbox, { timeout: 20000 });
  const testData = sandbox.window && sandbox.window.testData;
  if (!testData || typeof testData !== 'object'){
    console.error('Dataset not found or malformed in', dataPath);
    process.exit(2);
  }

  // Build dedup map: key is question+options normalized; keep first occurrence only
  const seenKeys = new Set();
  let removed = 0;

  Object.keys(testData).forEach(catKey=>{
    const cat = testData[catKey];
    if (!cat || !Array.isArray(cat.tests)) return;
    cat.tests.forEach(test=>{
      if (!test || !Array.isArray(test.questions)) return;
      const newQs = [];
      test.questions.forEach(q=>{
        const qText = (q.question || '').replace(/\s+/g,' ').trim().toLowerCase();
        const opts = Array.isArray(q.options) ? q.options.map(o=>(''+o).replace(/\s+/g,' ').trim().toLowerCase()) : [];
        const key = qText + '||' + opts.join('||');
        if (seenKeys.has(key)) { removed++; return; }
        seenKeys.add(key);
        newQs.push(q);
      });
      test.questions = newQs;
    });
  });

  const outText = 'window.testData = ' + JSON.stringify(testData, null, 2) + ';\n';
  fs.writeFileSync(outPath, outText, 'utf8');
  console.log('Wrote deduped file at', outPath);
  console.log('Removed duplicate question entries:', removed);
  console.log('Unique remaining by key:', seenKeys.size);
  process.exit(0);

}catch(err){
  console.error('Error during dedupe:', err && err.stack || err);
  process.exit(1);
}
