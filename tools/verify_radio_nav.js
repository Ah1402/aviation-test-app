const data = require('../src/data/testData.js');
const testData = data.testData || data;
const rn = testData['radio-navigation'];

console.log('Radio Navigation Tests:', rn.tests.length);
let total = 0;
rn.tests.forEach((t, i) => {
  const count = t.questions.length;
  total += count;
  console.log(`  Test ${i + 1}: ${t.name} - ${count} questions`);
});
console.log('Total Radio Nav questions:', total);

let grandTotal = 0;
Object.keys(testData).forEach(cat => {
  testData[cat].tests.forEach(t => grandTotal += t.questions.length);
});
console.log('Grand total all questions:', grandTotal);
