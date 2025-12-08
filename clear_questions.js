const fs = require('fs');

let htmlContent = fs.readFileSync('STANDALONE.html', 'utf16le');

const startIndex = htmlContent.indexOf('window.testData = ');
if (startIndex === -1) {
  console.error('Could not find window.testData = in STANDALONE.html');
  process.exit(1);
}
const objStart = htmlContent.indexOf('{', startIndex);
if (objStart === -1) {
  console.error('Could not find { after window.testData =');
  process.exit(1);
}
let braceCount = 0;
let objEnd = -1;
for (let i = objStart; i < htmlContent.length; i++) {
  if (htmlContent[i] === '{') braceCount++;
  else if (htmlContent[i] === '}') {
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
const testDataStr = htmlContent.substring(objStart, objEnd + 1);

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
const fullTestData = htmlContent.substring(startIndex, objEnd + 2);
const newHtmlContent = htmlContent.replace(fullTestData, `window.testData = ${newTestDataStr};`);

fs.writeFileSync('STANDALONE.html', newHtmlContent, 'utf16le');

console.log('All questions removed from STANDALONE.html');