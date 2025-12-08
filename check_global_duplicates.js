const fs = require('fs');

// Read the testData file
let testDataContent = fs.readFileSync('testData_complete.js', 'utf8');

// Remove the window.testData = and the trailing ;
let testDataStr = testDataContent.replace('window.testData = ', '').replace(/;$/, '');

// Parse the JSON
let testData = JSON.parse(testDataStr);

// Collect all questions
let allQuestions = [];
Object.keys(testData).forEach(cat => {
  testData[cat].tests.forEach(test => {
    test.questions.forEach(q => {
      allQuestions.push({
        ...q,
        category: cat,
        testName: test.name
      });
    });
  });
});

// Check for duplicate IDs
const idMap = new Map();
let duplicateIds = [];
allQuestions.forEach(q => {
  if (q.id !== undefined) {
    if (idMap.has(q.id)) {
      duplicateIds.push({ id: q.id, question: q.question, category: q.category, testName: q.testName });
    } else {
      idMap.set(q.id, q);
    }
  }
});

// Check for duplicate questions by text
const textMap = new Map();
let duplicateTexts = [];
allQuestions.forEach(q => {
  const key = q.question.trim().toLowerCase();
  if (textMap.has(key)) {
    duplicateTexts.push({ text: q.question, id: q.id, category: q.category, testName: q.testName });
  } else {
    textMap.set(key, q);
  }
});

console.log(`Total questions: ${allQuestions.length}`);
console.log(`Duplicate IDs: ${duplicateIds.length}`);
if (duplicateIds.length > 0) {
  duplicateIds.forEach(d => console.log(`ID ${d.id}: ${d.question.substring(0, 50)}... in ${d.category} ${d.testName}`));
}

console.log(`Duplicate texts: ${duplicateTexts.length}`);
if (duplicateTexts.length > 0) {
  duplicateTexts.forEach(d => console.log(`Text: ${d.text.substring(0, 50)}... ID ${d.id} in ${d.category} ${d.testName}`));
}