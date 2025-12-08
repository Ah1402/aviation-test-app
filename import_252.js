const fs = require('fs');
const vm = require('vm');
const path = require('path');

const SRC = process.argv[2] || '252.js';
const WORKDIR = process.cwd();
const SRC_PATH = path.isAbsolute(SRC) ? SRC : path.join(WORKDIR, SRC);

function safeEvalArray(str) {
  // Try vm first for safety, but fallback to eval parentheses
  try {
    const script = new vm.Script('(' + str + ')');
    return script.runInNewContext();
  } catch (e) {
    try {
      return eval('(' + str + ')');
    } catch (e2) {
      return null;
    }
  }
}

if (!fs.existsSync(SRC_PATH)) {
  console.error(`Source file not found: ${SRC_PATH}`);
  console.error('Please copy the file `252.js` into this folder and re-run:');
  console.error('  node import_252.js 252.js');
  process.exit(1);
}

console.log('Reading', SRC_PATH);
const content = fs.readFileSync(SRC_PATH, 'utf8');

const allQuestions = [];

// 1) Handle named exports like: export const SomeQuestions = [ ... ];
// Use a greedy match for the array so inner `]` (e.g. option arrays) don't terminate the match early.
// Allow optional trailing semicolon.
const namedRegex = /export\s+const\s+([A-Za-z0-9_$]+)\s*=\s*(\[[\s\S]*\])\s*;?/g;
let m;
while ((m = namedRegex.exec(content)) !== null) {
  const name = m[1];
  const arrStr = m[2];
  const arr = safeEvalArray(arrStr);
  if (Array.isArray(arr)) {
    console.log(`Processing ${name}: ${arr.length} items`);
    arr.forEach(q => allQuestions.push(q));
  }
}

// 2) Match top-level JSON arrays that may not have names (e.g. [ {..}, {...} ])
// Use a greedy match to capture full arrays of objects.
const jsonArrays = [];
const jsonRegex = /(\[[\s\S]*\])/g;
while ((m = jsonRegex.exec(content)) !== null) {
  const arrStr = m[0];
  const arr = safeEvalArray(arrStr);
  if (Array.isArray(arr)) {
    jsonArrays.push(arr);
  }
}
if (jsonArrays.length) {
  jsonArrays.forEach((a, i) => {
    console.log(`Found anonymous JSON array #${i+1}: ${a.length} items`);
    a.forEach(q => allQuestions.push(q));
  });
}

console.log('Total raw questions found:', allQuestions.length);

if (allQuestions.length === 0) {
  console.error('No questions found in the source. Exiting.');
  process.exit(1);
}

// Normalize each question to { question, options: [], correct: index (0-based), category }
function normalize(q) {
  const out = {};
  out.id = q.id !== undefined ? q.id : q.question_number !== undefined ? q.question_number : null;
  out.question = q.question || q.text || q.question_text || '';
  out.options = q.options || q.choices || q.answers || [];

  // find correct index
  let correctIndex = 0;
  if (typeof q.correct === 'number') correctIndex = q.correct;
  else if (q.correct_answer !== undefined) {
    const idx = out.options.indexOf(q.correct_answer);
    correctIndex = idx >= 0 ? idx : 0;
  } else if (q.answer !== undefined) {
    const idx = typeof q.answer === 'number' ? q.answer : out.options.indexOf(q.answer);
    correctIndex = (idx >= 0) ? idx : 0;
  }

  out.correct = correctIndex;
  out.explanation = q.explanation || q.explain || q.note || '';

  // Determine category; if absent set to 'uncategorized'
  const rawCat = (q.category || q.subject || 'uncategorized').toString();
  const key = rawCat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  out.category = key + '-test-5';

  return out;
}

const normalized = allQuestions.map(normalize);

// Group by category key
const categories = {};
normalized.forEach(q => {
  if (!categories[q.category]) categories[q.category] = [];
  categories[q.category].push(q);
});

console.log('Categories to add:', Object.keys(categories).length);
Object.keys(categories).forEach(k => console.log(` - ${k}: ${categories[k].length}`));

// ------------- Merge into testData_complete.js -------------
const TESTDATA = 'testData_complete.js';
if (fs.existsSync(TESTDATA)) {
  let js = fs.readFileSync(TESTDATA, 'utf8');
  const startIndex = js.indexOf('window.testData = ');
  if (startIndex === -1) {
    console.error('Could not find window.testData in', TESTDATA);
  } else {
    const objStart = js.indexOf('{', startIndex);
    let braceCount = 0;
    let objEnd = -1;
    for (let i = objStart; i < js.length; i++) {
      if (js[i] === '{') braceCount++;
      else if (js[i] === '}') {
        braceCount--;
        if (braceCount === 0) { objEnd = i; break; }
      }
    }
    if (objEnd === -1) {
      console.error('Failed to parse testData object in', TESTDATA);
    } else {
      const testDataStr = js.substring(objStart, objEnd+1);
      let testData;
      try { testData = eval('(' + testDataStr + ')'); }
      catch (e) { console.error('Failed to eval existing testData:', e.message); }

      if (testData) {
        Object.keys(categories).forEach(cat => {
          const questionsForCat = categories[cat].map(q => ({
            id: q.id,
            category: q.category,
            question: q.question,
            options: q.options,
            correct: q.correct,
            explanation: q.explanation
          }));

          if (testData[cat]) {
            // append to first test with questions
            const test = (testData[cat].tests || []).find(t => Array.isArray(t.questions));
            if (test) {
              test.questions = test.questions.concat(questionsForCat);
              console.log(`Appended ${questionsForCat.length} questions to existing category ${cat} in ${TESTDATA}`);
            } else {
              // add a new test entry
              testData[cat].tests = testData[cat].tests || [];
              testData[cat].tests.push({ id: cat, name: 'Imported', timeLimit: 60, questions: questionsForCat });
              console.log(`Added new test with ${questionsForCat.length} questions to existing category ${cat} in ${TESTDATA}`);
            }
          } else {
            // create new category
            testData[cat] = {
              name: cat.replace(/-test-5$/, '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
              icon: 'fas fa-question-circle',
              tests: [{ id: cat, name: 'Imported', timeLimit: 60, questions: questionsForCat }]
            };
            console.log(`Created new category ${cat} with ${questionsForCat.length} questions in ${TESTDATA}`);
          }
        });

        const newStr = JSON.stringify(testData, null, 2);
        const fullBlock = js.substring(startIndex, objEnd+2);
        const newJs = js.replace(fullBlock, 'window.testData = ' + newStr + ';\n');
        fs.writeFileSync(TESTDATA, newJs, 'utf8');
        console.log('Updated', TESTDATA);
      }
    }
  }
} else {
  console.warn(TESTDATA, 'not found; skipping update of that file.');
}

// ------------- Merge into STANDALONE.html -------------
const STANDALONE = 'STANDALONE.html';
if (fs.existsSync(STANDALONE)) {
  let html = fs.readFileSync(STANDALONE, 'utf16le');
  const startIndex = html.indexOf('window.testData = ');
  if (startIndex === -1) {
    console.error('Could not find window.testData in', STANDALONE);
  } else {
    const objStart = html.indexOf('{', startIndex);
    let braceCount = 0;
    let objEnd = -1;
    for (let i = objStart; i < html.length; i++) {
      if (html[i] === '{') braceCount++;
      else if (html[i] === '}') { braceCount--; if (braceCount === 0) { objEnd = i; break; } }
    }
    if (objEnd === -1) console.error('Failed to find end of testData in', STANDALONE);
    else {
      const testDataStr = html.substring(objStart, objEnd+1);
      let testData;
      try { testData = eval('(' + testDataStr + ')'); }
      catch (e) { console.error('Failed to eval existing testData in STANDALONE:', e.message); }

      if (testData) {
        Object.keys(categories).forEach(cat => {
          const questionsForCat = categories[cat].map(q => ({
            id: q.id,
            category: q.category,
            question: q.question,
            options: q.options,
            correct: q.correct,
            explanation: q.explanation
          }));

          if (testData[cat]) {
            const test = (testData[cat].tests || []).find(t => Array.isArray(t.questions));
            if (test) {
              test.questions = test.questions.concat(questionsForCat);
              console.log(`Appended ${questionsForCat.length} questions to existing category ${cat} in ${STANDALONE}`);
            } else {
              testData[cat].tests = testData[cat].tests || [];
              testData[cat].tests.push({ id: cat, name: 'Imported', timeLimit: 60, questions: questionsForCat });
              console.log(`Added new test with ${questionsForCat.length} questions to existing category ${cat} in ${STANDALONE}`);
            }
          } else {
            testData[cat] = {
              name: cat.replace(/-test-5$/, '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
              icon: 'fas fa-question-circle',
              tests: [{ id: cat, name: 'Imported', timeLimit: 60, questions: questionsForCat }]
            };
            console.log(`Created new category ${cat} with ${questionsForCat.length} questions in ${STANDALONE}`);
          }
        });

        const newStr = JSON.stringify(testData, null, 2);
        const fullBlock = html.substring(startIndex, objEnd+2);
        const newHtml = html.replace(fullBlock, 'window.testData = ' + newStr + ';');
        fs.writeFileSync(STANDALONE, newHtml, 'utf16le');
        console.log('Updated', STANDALONE);
      }
    }
  }
} else {
  console.warn(STANDALONE, 'not found; skipping update of that file.');
}

console.log('Import complete. Summary:');
console.log(' - Raw questions found:', allQuestions.length);
console.log(' - Categories added/merged:', Object.keys(categories).length);
console.log('\nNext steps:');
console.log(' - Open the app (`index.html` or `STANDALONE.html`) and verify the imported questions.');
console.log(' - Rebuild or refresh the search index if needed (there are helper scripts in the repo).');
