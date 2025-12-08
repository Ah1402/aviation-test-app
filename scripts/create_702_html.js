const fs = require('fs');
const vm = require('vm');
const path = require('path');

const root = path.resolve(__dirname, '..');
const headPath = path.join(root, 'build_templates', 'standalone_head.html');
const datasetPath = path.join(root, 'testData_complete.js');
const tailPath = path.join(root, 'build_templates', 'standalone_tail.html');
const outPath = path.join(root, '702.html');

function safeRead(p){
  if(!fs.existsSync(p)) throw new Error('Missing file: '+p);
  return fs.readFileSync(p,'utf8');
}

const head = safeRead(headPath);
const datasetSrc = safeRead(datasetPath);
const tail = safeRead(tailPath);

// Evaluate dataset in a vm to get window.testData
const ctx = { window: {} };
vm.createContext(ctx);
try{
  vm.runInContext(datasetSrc, ctx, {timeout: 1000});
} catch(e){
  console.error('Error evaluating dataset JS:', e);
  process.exit(2);
}
const data = ctx.window.testData;
if(!data) {
  console.error('window.testData not found after evaluating dataset.');
  process.exit(3);
}

const changelog = [];
let questionCount = 0;
const categorySet = new Set();

function note(qid, field, before, after){
  changelog.push({ qid, field, before, after, ts: (new Date()).toISOString() });
}

function normalizeQuestion(q){
  questionCount++;
  if(q && typeof q.category === 'string') categorySet.add(q.category);
  const beforeCorrect = q.hasOwnProperty('correct') ? q.correct : undefined;
  const hasOptions = Array.isArray(q.options);
  const validCorrect = Number.isFinite(q.correct) && Number.isInteger(q.correct) && hasOptions && q.correct >= 0 && q.correct < q.options.length;
  if(!validCorrect){
    if(beforeCorrect !== null && beforeCorrect !== undefined){
      note(q.id || null, 'correct', beforeCorrect, null);
    }
    q.correct = null;
  }
  if((q.answer === '' || q.answer === null || q.answer === undefined) && Number.isFinite(beforeCorrect) && hasOptions && beforeCorrect >=0 && beforeCorrect < q.options.length){
    // Conservative policy: do NOT auto-fill answer; just log that answer is empty while correct existed.
    note(q.id || null, 'answer-empty', '', null);
  }
}

function walkAndNormalize(obj){
  // Flexible traversal: look for categories/tests/questions structures, but also fallback to scanning for objects with 'question' property.
  if(!obj || typeof obj !== 'object') return;
  if(Array.isArray(obj)){
    for(const it of obj) walkAndNormalize(it);
    return;
  }
  // Known shapes
  if(obj.categories && Array.isArray(obj.categories)){
    for(const cat of obj.categories){
      if(cat.tests && Array.isArray(cat.tests)){
        for(const t of cat.tests){
          if(t.questions && Array.isArray(t.questions)){
            for(const q of t.questions) normalizeQuestion(q);
          }
          // Sometimes questions directly on test
          if(t.questions && Array.isArray(t.questions)){
            // counted above
          }
        }
      }
      // Some categories may have questions[] directly
      if(cat.questions && Array.isArray(cat.questions)){
        for(const q of cat.questions) normalizeQuestion(q);
      }
    }
    return;
  }
  // Other fallback: if object has tests array
  if(obj.tests && Array.isArray(obj.tests)){
    for(const t of obj.tests){
      if(t.questions && Array.isArray(t.questions)){
        for(const q of t.questions) normalizeQuestion(q);
      }
    }
    return;
  }
  // Generic scan: find any array properties that contain objects with 'question' key
  for(const k of Object.keys(obj)){
    const v = obj[k];
    if(Array.isArray(v)){
      if(v.length > 0 && typeof v[0] === 'object'){
        // check if first item looks like a question
        if(v[0] && ('question' in v[0])){
          for(const q of v) normalizeQuestion(q);
        } else {
          walkAndNormalize(v);
        }
      }
    } else if(typeof v === 'object'){
      walkAndNormalize(v);
    }
  }
}

walkAndNormalize(data);

// Prepare normalized dataset source to inline
const normalizedDatasetSrc = 'window.testData = ' + JSON.stringify(data, null, 2) + '\n';

// Build final HTML: head + inlined dataset + tail
const finalHtml = head + '\n<script>\n' + normalizedDatasetSrc + '\n</script>\n' + tail;
fs.writeFileSync(outPath, finalHtml, 'utf8');

// Write changelog file as well for audit
const changelogPath = path.join(root, '702-dataset-changelog.json');
fs.writeFileSync(changelogPath, JSON.stringify({ summary: { categories: Array.from(categorySet).length, questions: questionCount, notes: changelog.length }, notes: changelog }, null, 2), 'utf8');

console.log('WROTE:', outPath);
console.log('CHANGELOG:', changelogPath);
console.log('SUMMARY: categories=', Array.from(categorySet).length, ' questions=', questionCount, ' changelog entries=', changelog.length);

// Exit success
process.exit(0);
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const root = path.resolve(__dirname, '..');
const headPath = path.join(root, 'build_templates', 'standalone_head.html');
const datasetPath = path.join(root, 'testData_complete.js');
const tailPath = path.join(root, 'build_templates', 'standalone_tail.html');
const outPath = path.join(root, '702.html');

function safeRead(p){
  if(!fs.existsSync(p)) throw new Error('Missing file: '+p);
  return fs.readFileSync(p,'utf8');
}

const head = safeRead(headPath);
const datasetSrc = safeRead(datasetPath);
const tail = safeRead(tailPath);

// Evaluate dataset in a vm to get window.testData
const ctx = { window: {} };
vm.createContext(ctx);
try{
  vm.runInContext(datasetSrc, ctx, {timeout: 1000});
} catch(e){
  console.error('Error evaluating dataset JS:', e);
  process.exit(2);
}
const data = ctx.window.testData;
if(!data) {
  console.error('window.testData not found after evaluating dataset.');
  process.exit(3);
}

const changelog = [];
let questionCount = 0;
const categorySet = new Set();

function note(qid, field, before, after){
  changelog.push({ qid, field, before, after, ts: (new Date()).toISOString() });
}

function normalizeQuestion(q){
  questionCount++;
  if(q && typeof q.category === 'string') categorySet.add(q.category);
  const beforeCorrect = q.hasOwnProperty('correct') ? q.correct : undefined;
  const hasOptions = Array.isArray(q.options);
  const validCorrect = Number.isFinite(q.correct) && Number.isInteger(q.correct) && hasOptions && q.correct >= 0 && q.correct < q.options.length;
  if(!validCorrect){
    if(beforeCorrect !== null && beforeCorrect !== undefined){
      note(q.id || null, 'correct', beforeCorrect, null);
    }
    q.correct = null;
  }
  if((q.answer === '' || q.answer === null || q.answer === undefined) && Number.isFinite(beforeCorrect) && hasOptions && beforeCorrect >=0 && beforeCorrect < q.options.length){
    // Conservative policy: do NOT auto-fill answer; just log that answer is empty while correct existed.
    note(q.id || null, 'answer-empty', '', null);
  }
}

function walkAndNormalize(obj){
  // Flexible traversal: look for categories/tests/questions structures, but also fallback to scanning for objects with 'question' property.
  if(!obj || typeof obj !== 'object') return;
  if(Array.isArray(obj)){
    for(const it of obj) walkAndNormalize(it);
    return;
  }
  // Known shapes
  if(obj.categories && Array.isArray(obj.categories)){
    for(const cat of obj.categories){
      if(cat.tests && Array.isArray(cat.tests)){
        for(const t of cat.tests){
          if(t.questions && Array.isArray(t.questions)){
            for(const q of t.questions) normalizeQuestion(q);
          }
          // Sometimes questions directly on test
          if(t.questions && Array.isArray(t.questions)){
            // counted above
          }
        }
      }
      // Some categories may have questions[] directly
      if(cat.questions && Array.isArray(cat.questions)){
        for(const q of cat.questions) normalizeQuestion(q);
      }
    }
    return;
  }
  // Other fallback: if object has tests array
  if(obj.tests && Array.isArray(obj.tests)){
    for(const t of obj.tests){
      if(t.questions && Array.isArray(t.questions)){
        for(const q of t.questions) normalizeQuestion(q);
      }
    }
    return;
  }
  // Generic scan: find any array properties that contain objects with 'question' key
  for(const k of Object.keys(obj)){
    const v = obj[k];
    if(Array.isArray(v)){
      if(v.length > 0 && typeof v[0] === 'object'){
        // check if first item looks like a question
        if(v[0] && ('question' in v[0])){
          for(const q of v) normalizeQuestion(q);
        } else {
          walkAndNormalize(v);
        }
      }
    } else if(typeof v === 'object'){
      walkAndNormalize(v);
    }
  }
}

walkAndNormalize(data);

// Prepare normalized dataset source to inline
const normalizedDatasetSrc = 'window.testData = ' + JSON.stringify(data, null, 2) + '\n';

// Build final HTML: head + inlined dataset + tail
const finalHtml = head + '\n<script>\n' + normalizedDatasetSrc + '\n</script>\n' + tail;
fs.writeFileSync(outPath, finalHtml, 'utf8');

// Write changelog file as well for audit
const changelogPath = path.join(root, '702-dataset-changelog.json');
fs.writeFileSync(changelogPath, JSON.stringify({ summary: { categories: Array.from(categorySet).length, questions: questionCount, notes: changelog.length }, notes: changelog }, null, 2), 'utf8');

console.log('WROTE:', outPath);
console.log('CHANGELOG:', changelogPath);
console.log('SUMMARY: categories=', Array.from(categorySet).length, ' questions=', questionCount, ' changelog entries=', changelog.length);

// Exit success
process.exit(0);
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const root = path.resolve(__dirname, '..');
const headPath = path.join(root, 'build_templates', 'standalone_head.html');
const datasetPath = path.join(root, 'testData_complete.js');
const tailPath = path.join(root, 'build_templates', 'standalone_tail.html');
const outPath = path.join(root, '702.html');

function safeRead(p){
  if(!fs.existsSync(p)) throw new Error('Missing file: '+p);
  return fs.readFileSync(p,'utf8');
}

const head = safeRead(headPath);
const datasetSrc = safeRead(datasetPath);
const tail = safeRead(tailPath);

// Evaluate dataset in a vm to get window.testData
const ctx = { window: {} };
vm.createContext(ctx);
try{
  vm.runInContext(datasetSrc, ctx, {timeout: 1000});
} catch(e){
  console.error('Error evaluating dataset JS:', e);
  process.exit(2);
}
const data = ctx.window.testData;
if(!data) {
  console.error('window.testData not found after evaluating dataset.');
  process.exit(3);
}

const changelog = [];
let questionCount = 0;
const categorySet = new Set();

function note(qid, field, before, after){
  changelog.push({ qid, field, before, after, ts: (new Date()).toISOString() });
}

function normalizeQuestion(q){
  questionCount++;
  if(q && typeof q.category === 'string') categorySet.add(q.category);
  const beforeCorrect = q.hasOwnProperty('correct') ? q.correct : undefined;
  const hasOptions = Array.isArray(q.options);
  const validCorrect = Number.isFinite(q.correct) && Number.isInteger(q.correct) && hasOptions && q.correct >= 0 && q.correct < q.options.length;
  if(!validCorrect){
    if(beforeCorrect !== null && beforeCorrect !== undefined){
      note(q.id || null, 'correct', beforeCorrect, null);
    }
    q.correct = null;
  }
  if((q.answer === '' || q.answer === null || q.answer === undefined) && Number.isFinite(beforeCorrect) && hasOptions && beforeCorrect >=0 && beforeCorrect < q.options.length){
    // Conservative policy: do NOT auto-fill answer; just log that answer is empty while correct existed.
    note(q.id || null, 'answer-empty', '', null);
  }
}

function walkAndNormalize(obj){
  // Flexible traversal: look for categories/tests/questions structures, but also fallback to scanning for objects with 'question' property.
  if(!obj || typeof obj !== 'object') return;
  if(Array.isArray(obj)){
    for(const it of obj) walkAndNormalize(it);
    return;
  }
  // Known shapes
  if(obj.categories && Array.isArray(obj.categories)){
    for(const cat of obj.categories){
      if(cat.tests && Array.isArray(cat.tests)){
        for(const t of cat.tests){
          if(t.questions && Array.isArray(t.questions)){
            for(const q of t.questions) normalizeQuestion(q);
          }
          // Sometimes questions directly on test
          if(t.questions && Array.isArray(t.questions)){
            // counted above
          }
        }
      }
      // Some categories may have questions[] directly
      if(cat.questions && Array.isArray(cat.questions)){
        for(const q of cat.questions) normalizeQuestion(q);
      }
    }
    return;
  }
  // Other fallback: if object has tests array
  if(obj.tests && Array.isArray(obj.tests)){
    for(const t of obj.tests){
      if(t.questions && Array.isArray(t.questions)){
        for(const q of t.questions) normalizeQuestion(q);
      }
    }
    return;
  }
  // Generic scan: find any array properties that contain objects with 'question' key
  for(const k of Object.keys(obj)){
    const v = obj[k];
    if(Array.isArray(v)){
      if(v.length > 0 && typeof v[0] === 'object'){
        // check if first item looks like a question
        if(v[0] && ('question' in v[0])){
          for(const q of v) normalizeQuestion(q);
        } else {
          walkAndNormalize(v);
        }
      }
    } else if(typeof v === 'object'){
      walkAndNormalize(v);
    }
  }
}

walkAndNormalize(data);

// Prepare normalized dataset source to inline
const normalizedDatasetSrc = 'window.testData = ' + JSON.stringify(data, null, 2) + ';
';

// Build final HTML: head + inlined dataset + tail
const finalHtml = head + '\n<script>\n' + normalizedDatasetSrc + '\n</script>\n' + tail;
fs.writeFileSync(outPath, finalHtml, 'utf8');

// Write changelog file as well for audit
const changelogPath = path.join(root, '702-dataset-changelog.json');
fs.writeFileSync(changelogPath, JSON.stringify({ summary: { categories: Array.from(categorySet).length, questions: questionCount, notes: changelog.length }, notes: changelog }, null, 2), 'utf8');

console.log('WROTE:', outPath);
console.log('CHANGELOG:', changelogPath);
console.log('SUMMARY: categories=', Array.from(categorySet).length, ' questions=', questionCount, ' changelog entries=', changelog.length);

// Exit success
process.exit(0);
