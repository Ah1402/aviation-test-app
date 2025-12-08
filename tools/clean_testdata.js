// Clean misplaced question objects embedded inside options arrays
// Usage: node tools/clean_testdata.js
const path = require('path');
const fs = require('fs');
const dataPath = path.resolve(__dirname, '..', 'testData_complete.js.fixed.js');
const outPath = path.resolve(__dirname, '..', 'testData_complete.fixed.cleaned.inline.js');

// Require the file (it exports testData at the end)
let testData;
try {
  testData = require(dataPath);
} catch (e) {
  console.error('Failed to require fixed test data:', e);
  process.exit(2);
}

const misplaced = [];

Object.keys(testData).forEach(catKey => {
  const cat = testData[catKey];
  (cat.tests || []).forEach(test => {
    (test.questions || []).forEach(q => {
      if (!Array.isArray(q.options)) return;
      q.options = q.options.filter(opt => {
        if (opt && typeof opt === 'object') {
          // found a misplaced object
          misplaced.push({from: {cat: catKey, testId: test.id, questionId: q.id}, obj: opt});
          return false; // remove from options
        }
        return true;
      });
    });
  });
});

// Insert misplaced objects into target category/test if possible
misplaced.forEach(item => {
  const obj = item.obj;
  // obj should have category and test fields
  const targetCatKey = obj.category || obj.category || null;
  if (targetCatKey && testData[targetCatKey]) {
    const tests = testData[targetCatKey].tests || [];
    // find test by number or id
    const targetTest = tests.find(t => (t.test === obj.test) || (t.id === `flight-planning-and-monitoring-test-${obj.test}`) || (t.id === obj.test));
    if (targetTest) {
      targetTest.questions = targetTest.questions || [];
      // if the obj already has "correct" as index but missing test property, ensure it is present
      targetTest.questions.push(obj);
      return;
    }
  }
  // otherwise, push into a fallback category
  const fallbackKey = 'uncategorized-misplaced';
  testData[fallbackKey] = testData[fallbackKey] || {name: 'Misplaced Questions', icon: '', tests: [{id: 'misc', name: 'Misc', timeLimit: 0, questions: []}] };
  testData[fallbackKey].tests[0].questions.push(obj);
});

// Report
console.log('Found', misplaced.length, 'misplaced objects.');
misplaced.slice(0,10).forEach((m, i) => {
  console.log(i+1, 'from', m.from, '->', (m.obj.id || '<no id>'));
});

// Output an inline JS snippet
const inline = 'window.testData = ' + JSON.stringify(testData, null, 2) + ';&\n';
fs.writeFileSync(outPath, inline, 'utf8');
console.log('Wrote cleaned inline file to', outPath);
