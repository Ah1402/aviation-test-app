/*
  Validates src/data/testData.js for common issues:
  - Each question has exactly 4 non-empty options
  - No option contains 'Correct Answer:'
  Prints a compact summary and exits with code 1 on failure.
*/

const path = require('path');
const DATA_PATH = path.resolve(__dirname, '..', 'src', 'data', 'testData.js');
const data = require(DATA_PATH);

let totalQuestions = 0;
let badCount = 0;
let badRecords = [];

function hasCorrectAnswerGarbage(s) {
  return /Correct\s*Answer:/i.test(s || '');
}

for (const catKey of Object.keys(data)) {
  const cat = data[catKey];
  if (!cat || !Array.isArray(cat.tests)) continue;
  cat.tests.forEach((test, ti) => {
    (test.questions || []).forEach((q, qi) => {
      totalQuestions += 1;
      const opts = Array.isArray(q.options) ? q.options : [];
      const problems = [];
      if (opts.length !== 4) problems.push(`has ${opts.length} options`);
      const empties = opts.filter((s) => !s || !String(s).trim()).length;
      if (empties) problems.push(`${empties} empty options`);
      const contaminated = opts.filter(hasCorrectAnswerGarbage).length;
      if (contaminated) problems.push(`contains 'Correct Answer:' in ${contaminated} option(s)`);
      if (hasCorrectAnswerGarbage(q.question)) problems.push("question contains 'Correct Answer:'");
      if (!q.question || !String(q.question).trim()) problems.push('empty question text');
      if (problems.length) {
        badCount += 1;
        badRecords.push({ catKey, testName: test.name, question: q.question?.slice(0, 80), problems });
      }
    });
  });
}

console.log(`Checked ${totalQuestions} questions.`);
if (badCount) {
  console.log(`Found ${badCount} problematic questions.`);
  console.log(badRecords.slice(0, 20));
  process.exitCode = 1;
} else {
  console.log('All questions look good.');
}
