const fs = require('fs');

let jsContent = fs.readFileSync('testData_complete.js', 'utf8');

const startIndex = jsContent.indexOf('window.testData = ');
if (startIndex === -1) {
  console.error('Could not find window.testData = in testData_complete.js');
  process.exit(1);
}
const objStart = jsContent.indexOf('{', startIndex);
if (objStart === -1) {
  console.error('Could not find { after window.testData =');
  process.exit(1);
}
let braceCount = 0;
let objEnd = -1;
for (let i = objStart; i < jsContent.length; i++) {
  if (jsContent[i] === '{') braceCount++;
  else if (jsContent[i] === '}') {
    braceCount--;
    if (braceCount === 0) {
      objEnd = i;
      break;
    }
  }
}
if (objEnd === -1) {
  console.error('Could not find matching } for testData object');
  process.exit(1);
}
const testDataStr = jsContent.substring(objStart, objEnd + 1);

let testData;
try {
  testData = eval('(' + testDataStr + ')');
} catch (e) {
  console.error('Failed to parse existing testData:', e.message);
  process.exit(1);
}

// Clear all questions
Object.keys(testData).forEach(cat => {
  if (testData[cat].tests) {
    testData[cat].tests.forEach(test => {
      if (test.questions) test.questions = [];
    });
  }
});

const newTestDataStr = JSON.stringify(testData, null, 2);
const fullTestData = jsContent.substring(startIndex, objEnd + 2);
const newJsContent = jsContent.replace(fullTestData, `window.testData = ${newTestDataStr};`);

fs.writeFileSync('testData_complete.js', newJsContent, 'utf8');

console.log('All questions removed from testData_complete.js');