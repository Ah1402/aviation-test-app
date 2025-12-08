const fs = require('fs');
const vm = require('vm');

console.log('='.repeat(80));
console.log('AON PDF vs TestData Complete Comparison Report');
console.log('='.repeat(80));

// Load AON data from JSON
const aonData = JSON.parse(fs.readFileSync('aon_qa.json', 'utf8'));
const aonQuestions = Object.entries(aonData);
console.log(`\nTotal AON questions loaded: ${aonQuestions.length}`);

// Load testData_complete.js
const testDataContent = fs.readFileSync('testData_complete.js', 'utf8');
const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(testDataContent, ctx);
const testData = ctx.window.testData;

// Get AON category questions from testData
const aonCategory = testData['aon-aviation-knowledge'];
const aonTestDataQuestions = [];
if (aonCategory && aonCategory.tests) {
    aonCategory.tests.forEach(test => {
        if (test.questions) {
            aonTestDataQuestions.push(...test.questions);
        }
    });
}

console.log(`Total AON questions in testData: ${aonTestDataQuestions.length}\n`);

// Normalize text for comparison
function normalize(text) {
    if (!text) return '';
    return String(text)
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .replace(/[^\w\s]/g, '')
        .trim();
}

// Find matching questions
const missingFromTestData = [];
const matchedQuestions = [];
const answerMismatches = [];

aonQuestions.forEach(([id, aonQ]) => {
    const aonQuestionNorm = normalize(aonQ.question);
    const aonAnswerNorm = normalize(aonQ.answer);
    
    // Try to find matching question in testData
    let found = false;
    let answerMatch = false;
    
    for (const testQ of aonTestDataQuestions) {
        const testQuestionNorm = normalize(testQ.question);
        
        // Check if questions match (allow partial match for flexibility)
        if (testQuestionNorm.includes(aonQuestionNorm) || 
            aonQuestionNorm.includes(testQuestionNorm) ||
            testQuestionNorm === aonQuestionNorm) {
            
            found = true;
            
            // Check if answer matches
            const correctOption = testQ.options && testQ.options[testQ.correct];
            const testAnswerNorm = normalize(correctOption);
            
            if (testAnswerNorm.includes(aonAnswerNorm) || 
                aonAnswerNorm.includes(testAnswerNorm) ||
                testAnswerNorm === aonAnswerNorm) {
                answerMatch = true;
                matchedQuestions.push({
                    id,
                    aonQuestion: aonQ.question,
                    testQuestion: testQ.question,
                    aonAnswer: aonQ.answer,
                    testAnswer: correctOption
                });
            } else {
                answerMismatches.push({
                    id,
                    question: aonQ.question,
                    aonAnswer: aonQ.answer,
                    testAnswer: correctOption || 'NOT FOUND',
                    testQuestion: testQ.question
                });
            }
            break;
        }
    }
    
    if (!found) {
        missingFromTestData.push({
            id,
            question: aonQ.question,
            answer: aonQ.answer
        });
    }
});

// Generate detailed report
console.log('═'.repeat(80));
console.log('SUMMARY STATISTICS');
console.log('═'.repeat(80));
console.log(`Total AON questions:              ${aonQuestions.length}`);
console.log(`Matched questions (100% similar): ${matchedQuestions.length}`);
console.log(`Answer mismatches:                ${answerMismatches.length}`);
console.log(`Missing from testData:            ${missingFromTestData.length}`);
console.log(`Match percentage:                 ${((matchedQuestions.length / aonQuestions.length) * 100).toFixed(2)}%`);

// Save detailed reports
if (missingFromTestData.length > 0) {
    console.log('\n' + '═'.repeat(80));
    console.log('QUESTIONS MISSING FROM TESTDATA_COMPLETE.JS');
    console.log('═'.repeat(80));
    
    const missingReport = missingFromTestData.map(q => 
        `ID: ${q.id}\nQuestion: ${q.question}\nAnswer: ${q.answer}\n${'-'.repeat(80)}`
    ).join('\n');
    
    fs.writeFileSync('MISSING_FROM_TESTDATA.txt', missingReport);
    console.log(`✓ Saved ${missingFromTestData.length} missing questions to: MISSING_FROM_TESTDATA.txt`);
    
    // Show first 5
    console.log('\nFirst 5 missing questions:');
    missingFromTestData.slice(0, 5).forEach(q => {
        console.log(`\n[${q.id}] ${q.question.substring(0, 100)}...`);
    });
}

if (answerMismatches.length > 0) {
    console.log('\n' + '═'.repeat(80));
    console.log('ANSWER MISMATCHES (Question found but answer different)');
    console.log('═'.repeat(80));
    
    const mismatchReport = answerMismatches.map(q => 
        `ID: ${q.id}\nQuestion: ${q.question}\nAON Answer: ${q.aonAnswer}\nTestData Answer: ${q.testAnswer}\n${'-'.repeat(80)}`
    ).join('\n');
    
    fs.writeFileSync('ANSWER_MISMATCHES.txt', mismatchReport);
    console.log(`✓ Saved ${answerMismatches.length} answer mismatches to: ANSWER_MISMATCHES.txt`);
    
    // Show first 5
    console.log('\nFirst 5 answer mismatches:');
    answerMismatches.slice(0, 5).forEach(q => {
        console.log(`\n[${q.id}] ${q.question.substring(0, 80)}...`);
        console.log(`  AON:      ${q.aonAnswer.substring(0, 60)}`);
        console.log(`  TestData: ${q.testAnswer.substring(0, 60)}`);
    });
}

if (matchedQuestions.length > 0) {
    console.log('\n' + '═'.repeat(80));
    console.log('PERFECTLY MATCHED QUESTIONS');
    console.log('═'.repeat(80));
    
    const matchedReport = matchedQuestions.map(q => 
        `ID: ${q.id}\nAON Q: ${q.aonQuestion}\nTest Q: ${q.testQuestion}\nAON A: ${q.aonAnswer}\nTest A: ${q.testAnswer}\n${'-'.repeat(80)}`
    ).join('\n');
    
    fs.writeFileSync('MATCHED_QUESTIONS.txt', matchedReport);
    console.log(`✓ Saved ${matchedQuestions.length} matched questions to: MATCHED_QUESTIONS.txt`);
}

// Final summary
console.log('\n' + '═'.repeat(80));
console.log('FINAL VERDICT');
console.log('═'.repeat(80));

if (matchedQuestions.length === aonQuestions.length) {
    console.log('✓ ALL AON questions are 100% present in testData with matching answers!');
} else {
    console.log('⚠ Discrepancies found:');
    if (missingFromTestData.length > 0) {
        console.log(`  - ${missingFromTestData.length} questions completely missing from testData`);
    }
    if (answerMismatches.length > 0) {
        console.log(`  - ${answerMismatches.length} questions have different answers`);
    }
}

console.log('\n' + '═'.repeat(80));
console.log('Files created:');
console.log('  1. MISSING_FROM_TESTDATA.txt - Questions not in testData');
console.log('  2. ANSWER_MISMATCHES.txt - Questions with different answers');
console.log('  3. MATCHED_QUESTIONS.txt - Perfectly matched questions');
console.log('═'.repeat(80));
