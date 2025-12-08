const fs = require('fs');
const path = require('path');

// Load testData
const testDataPath = path.join(__dirname, '../src/data/testData.js');
let testDataContent = fs.readFileSync(testDataPath, 'utf-8');

// Extract the testData object (robust, independent of following comments)
const match = testDataContent.match(/const\s+testData\s*=\s*(\{[\s\S]*?\});/);
if (!match) {
  console.error('❌ Could not parse testData.js');
  process.exit(1);
}

const testData = eval('(' + match[1] + ')');

// Track all questions and find duplicates
const questionMap = new Map();
const duplicates = [];
let totalQuestions = 0;

console.log('\n🔍 Scanning for duplicate questions...\n');

Object.keys(testData).forEach(categoryKey => {
  const category = testData[categoryKey];
  
  category.tests.forEach((test, testIndex) => {
    test.questions.forEach((question, qIndex) => {
      totalQuestions++;
      
      // Create a normalized version of the question for comparison
      const normalizedQ = question.question.toLowerCase().trim().replace(/\s+/g, ' ');
      
      if (questionMap.has(normalizedQ)) {
        // Found a duplicate
        const original = questionMap.get(normalizedQ);
        duplicates.push({
          original: {
            category: original.category,
            categoryName: testData[original.category].name,
            test: original.test,
            questionIndex: original.questionIndex,
            question: original.question
          },
          duplicate: {
            category: categoryKey,
            categoryName: category.name,
            test: test.name,
            questionIndex: qIndex,
            question: question.question
          }
        });
      } else {
        // Store this question
        questionMap.set(normalizedQ, {
          category: categoryKey,
          categoryName: category.name,
          test: test.name,
          questionIndex: qIndex,
          question: question.question
        });
      }
    });
  });
});

console.log(`📊 Total questions scanned: ${totalQuestions}`);
console.log(`📊 Unique questions: ${questionMap.size}`);
console.log(`📊 Duplicate questions found: ${duplicates.length}\n`);

if (duplicates.length > 0) {
  console.log('🔴 DUPLICATES FOUND:\n');
  duplicates.forEach((dup, index) => {
    console.log(`${index + 1}. "${dup.duplicate.question.substring(0, 80)}..."`);
    console.log(`   Original: ${dup.original.categoryName} > ${dup.original.test}`);
    console.log(`   Duplicate: ${dup.duplicate.categoryName} > ${dup.duplicate.test}`);
    console.log('');
  });
  
  // Save duplicate info to file
  fs.writeFileSync(
    path.join(__dirname, 'duplicates_found.json'),
    JSON.stringify(duplicates, null, 2)
  );
  console.log('💾 Duplicate details saved to tools/duplicates_found.json\n');
} else {
  console.log('✅ No duplicates found! All questions are unique.\n');
}

// Check for near-duplicates (similar questions)
console.log('🔍 Checking for similar questions (potential near-duplicates)...\n');
const questions = Array.from(questionMap.values());
const similarPairs = [];

for (let i = 0; i < questions.length; i++) {
  for (let j = i + 1; j < questions.length; j++) {
    const q1 = questions[i].question.toLowerCase();
    const q2 = questions[j].question.toLowerCase();
    
    // Calculate simple similarity (word overlap)
    const words1 = new Set(q1.split(/\s+/).filter(w => w.length > 3));
    const words2 = new Set(q2.split(/\s+/).filter(w => w.length > 3));
    
    const intersection = new Set([...words1].filter(w => words2.has(w)));
    const union = new Set([...words1, ...words2]);
    
    const similarity = intersection.size / union.size;
    
    if (similarity > 0.7 && q1 !== q2) { // More than 70% similar
      similarPairs.push({
        q1: questions[i],
        q2: questions[j],
        similarity: (similarity * 100).toFixed(1) + '%'
      });
    }
  }
}

if (similarPairs.length > 0) {
  console.log(`⚠️ Found ${similarPairs.length} pairs of similar questions (>70% word overlap):\n`);
  similarPairs.slice(0, 10).forEach((pair, index) => {
    console.log(`${index + 1}. Similarity: ${pair.similarity}`);
    console.log(`   Q1: "${pair.q1.question.substring(0, 60)}..." (${pair.q1.categoryName})`);
    console.log(`   Q2: "${pair.q2.question.substring(0, 60)}..." (${pair.q2.categoryName})`);
    console.log('');
  });
  if (similarPairs.length > 10) {
    console.log(`   ... and ${similarPairs.length - 10} more similar pairs\n`);
  }
} else {
  console.log('✅ No highly similar questions found.\n');
}

console.log('✅ Duplicate check complete!');
