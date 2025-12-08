const fs = require('fs');
const path = require('path');

// Load testData
const testDataPath = path.join(__dirname, '../src/data/testData.js');
let testDataContent = fs.readFileSync(testDataPath, 'utf-8');

// Extract the testData object
const match = testDataContent.match(/const testData = ({[\s\S]+});?\s*(?:if|module\.exports)/);
if (!match) {
  console.error('❌ Could not parse testData.js');
  process.exit(1);
}

const testData = eval('(' + match[1] + ')');

console.log('\n🔧 Removing duplicate questions...\n');

// Track unique questions
const questionMap = new Map();
let totalBefore = 0;
let totalRemoved = 0;

// First pass: identify all unique questions
Object.keys(testData).forEach(categoryKey => {
  const category = testData[categoryKey];
  
  category.tests.forEach((test, testIndex) => {
    test.questions.forEach((question, qIndex) => {
      totalBefore++;
      
      const normalizedQ = question.question.toLowerCase().trim().replace(/\s+/g, ' ');
      
      if (!questionMap.has(normalizedQ)) {
        // Store first occurrence
        questionMap.set(normalizedQ, {
          category: categoryKey,
          testIndex: testIndex,
          questionIndex: qIndex,
          question: question
        });
      }
    });
  });
});

// Second pass: remove duplicates (keep first occurrence)
Object.keys(testData).forEach(categoryKey => {
  const category = testData[categoryKey];
  
  category.tests.forEach((test, testIndex) => {
    const uniqueQuestions = [];
    
    test.questions.forEach((question, qIndex) => {
      const normalizedQ = question.question.toLowerCase().trim().replace(/\s+/g, ' ');
      const firstOccurrence = questionMap.get(normalizedQ);
      
      // Keep this question only if it's the first occurrence
      if (firstOccurrence.category === categoryKey && 
          firstOccurrence.testIndex === testIndex && 
          firstOccurrence.questionIndex === qIndex) {
        uniqueQuestions.push(question);
      } else {
        totalRemoved++;
        console.log(`Removing duplicate from ${category.name} > ${test.name}`);
        console.log(`  "${question.question.substring(0, 70)}..."`);
      }
    });
    
    test.questions = uniqueQuestions;
  });
});

// Remove empty tests
Object.keys(testData).forEach(categoryKey => {
  const category = testData[categoryKey];
  category.tests = category.tests.filter(test => test.questions.length > 0);
});

// Count final total
let totalAfter = 0;
Object.keys(testData).forEach(categoryKey => {
  testData[categoryKey].tests.forEach(test => {
    totalAfter += test.questions.length;
  });
});

console.log(`\n📊 Summary:`);
console.log(`   Total questions before: ${totalBefore}`);
console.log(`   Duplicates removed: ${totalRemoved}`);
console.log(`   Total questions after: ${totalAfter}`);
console.log(`   Unique questions: ${questionMap.size}`);

// Write back to testData.js
const newTestDataStr = JSON.stringify(testData, null, 2);
const newContent = testDataContent.replace(
  /const testData = {[\s\S]+?};?\s*(?=if|module\.exports)/,
  `const testData = ${newTestDataStr};\n\n`
);

fs.writeFileSync(testDataPath, newContent);

console.log(`\n✅ testData.js updated successfully!`);
console.log(`   File: ${testDataPath}\n`);

// Generate summary by category
console.log('📋 Questions by category after cleanup:\n');
Object.keys(testData).sort().forEach(categoryKey => {
  const category = testData[categoryKey];
  let categoryTotal = 0;
  category.tests.forEach(test => {
    categoryTotal += test.questions.length;
  });
  console.log(`   ${category.name}: ${categoryTotal} questions in ${category.tests.length} tests`);
});
