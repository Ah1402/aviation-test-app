const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const dataPath = path.join(root, 'testData_complete.js');

function read(p){ return fs.readFileSync(p, 'utf8'); }

try{
  const data = read(dataPath);
  const sandbox = { window: {} };
  vm.runInNewContext(data + '\n', sandbox, { timeout: 10000 });
  const testData = sandbox.window && sandbox.window.testData;
  if (!testData || typeof testData !== 'object'){
    console.error('Dataset not found or malformed in', dataPath);
    process.exit(2);
  }

  const keyMap = new Map();
  let totalQuestions = 0;

  Object.keys(testData).forEach(catKey=>{
    const cat = testData[catKey];
    if (!cat || !Array.isArray(cat.tests)) return;
    cat.tests.forEach(test=>{
      if (!test || !Array.isArray(test.questions)) return;
      test.questions.forEach(q=>{
        totalQuestions++;
        const qText = (q.question || '').replace(/\s+/g,' ').trim().toLowerCase();
        const opts = Array.isArray(q.options) ? q.options.map(o=> (''+o).replace(/\s+/g,' ').trim().toLowerCase()) : [];
        const optsKey = opts.join('||');
        const key = `${qText}||${optsKey}`;

        if (!keyMap.has(key)) keyMap.set(key, []);
        keyMap.get(key).push({ id: q.id, category: catKey, test: test.id, question: q.question, options: q.options });
      });
    });
  });

  // analyze duplicates
  let duplicateGroups = 0;
  let duplicateEntries = 0; // total entries that are part of a duplicate group
  const samples = [];
  for (const [k, arr] of keyMap.entries()){
    if (arr.length > 1){
      duplicateGroups++;
      duplicateEntries += arr.length;
      if (samples.length < 20) samples.push({ count: arr.length, examples: arr.slice(0,10).map(x=>({id:x.id,category:x.category,test:x.test})) });
    }
  }

  console.log('Total questions:', totalQuestions);
  console.log('Unique question keys:', keyMap.size);
  console.log('Duplicate groups (identical question+options):', duplicateGroups);
  console.log('Total duplicated entries (sum of counts for duplicate groups):', duplicateEntries);
  if (samples.length) {
    console.log('\nSample duplicate groups (up to 20):');
    samples.forEach((s,i)=>{
      console.log(`Group ${i+1}: count=${s.count} examples=`, s.examples);
    });
  }

  // exit success
  process.exit(0);

}catch(err){
  console.error('Error while analyzing duplicates:', err && err.stack || err);
  process.exit(1);
}
