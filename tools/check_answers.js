const fs = require('fs');
const vm = require('vm');
const path = require('path');

const argv = process.argv.slice(2);
const argFile = argv.find(a => !a.startsWith('-')) || path.join(__dirname, '..', 'testData_complete.js');
const doFix = argv.includes('--fix');

const file = path.resolve(argFile);
const code = fs.readFileSync(file, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
try {
  vm.runInContext(code, sandbox, { timeout: 5000 });
} catch (e) {
  console.error('Error evaluating testData file:', e && e.stack ? e.stack : e);
  process.exit(2);
}

const data = sandbox.window.testData;
if (!data || typeof data !== 'object') {
  console.error('No window.testData found in', file);
  process.exit(3);
}

const mismatches = [];
let total = 0;
for (const [catKey, cat] of Object.entries(data)) {
  if (!cat || !Array.isArray(cat.tests)) continue;
  for (const test of cat.tests) {
    if (!test || !Array.isArray(test.questions)) continue;
    for (const q of test.questions) {
      total++;
      const options = Array.isArray(q.options) ? q.options : [];
      const correct = typeof q.correct === 'number' ? q.correct : null;
      const optionAt = (Number.isInteger(correct) && correct >= 0 && correct < options.length) ? options[correct] : null;
      const answerField = typeof q.answer === 'string' ? q.answer : String(q.answer);
      if (optionAt !== answerField) {
        mismatches.push({
          categoryKey: catKey,
          categoryName: cat.name || null,
          testId: test.id || test.name || null,
          questionId: q.id != null ? q.id : null,
          questionText: q.question ? (q.question.length > 140 ? q.question.slice(0,137)+'...' : q.question) : null,
          correctIndex: correct,
          optionAtIndex: optionAt,
          answerField: answerField
        });
        // If --fix requested, update the in-memory object to keep consistent
        if (doFix && optionAt !== null) {
          q.answer = optionAt;
        }
      }
    }
  }
}

console.log('Checked questions:', total);
console.log('Mismatches found:', mismatches.length);
if (mismatches.length > 0) {
  console.log('\nMISMATCHES:');
  for (const m of mismatches) {
    console.log(`- cat=${m.categoryKey} test=${m.testId} q=${m.questionId} correctIndex=${m.correctIndex} optionAtIndex=${m.optionAtIndex} answerField=${m.answerField}`);
  }
}

if (doFix) {
  const fixedPath = file + '.fixed.js';
  const outObj = sandbox.window.testData;
  const content = '// Auto-generated fixed test data (answers aligned to options[correct])\n' +
    '/* Original file: ' + path.basename(file) + ' */\n' +
    'const testData = ' + JSON.stringify(outObj, null, 2) + ';\n' +
    'if (typeof window !== "undefined") window.testData = testData;\n' +
    'module.exports = testData;\n';
  fs.writeFileSync(fixedPath, content, 'utf8');
  console.log('\nWrote fixed file to:', fixedPath);
}

// Also print JSON summary for machine parsing if needed
console.log('\nJSON-REPORT:');
console.log(JSON.stringify({ checked: total, mismatches }, null, 2));

process.exit(0);
