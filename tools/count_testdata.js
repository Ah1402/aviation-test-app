const fs = require('fs');
const vm = require('vm');
const path = require('path');
const argFile = process.argv[2];
const file = argFile ? path.resolve(argFile) : path.join(__dirname, '..', 'testData_complete.js');
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
function computeCounts(data) {
  let totalQuestions = 0;
  const categoryCounts = {};
  if (!data || typeof data !== 'object') return { totalQuestions: 0, categoryCounts: {}, categoryTotal: 0 };
  for (const [rawKey, cat] of Object.entries(data)) {
    if (!cat || !Array.isArray(cat.tests)) continue;
    let qCount = 0;
    for (const test of cat.tests) {
      if (test && Array.isArray(test.questions)) {
        qCount += test.questions.length;
      }
    }
    categoryCounts[rawKey] = qCount;
    totalQuestions += qCount;
  }
  const categoryTotal = Object.values(categoryCounts).filter(n => n > 0).length;
  return { totalQuestions, categoryCounts, categoryTotal };
}
const result = computeCounts(data);
console.log(JSON.stringify(result, null, 2));
console.log('TOTAL_QUESTIONS:', result.totalQuestions);
