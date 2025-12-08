const fs = require('fs');
const vm = require('vm');

console.log('='.repeat(80));
console.log('AON PDF vs TestData - Text & Answer Comparison (Category-Agnostic)');
console.log('='.repeat(80));

// Load AON data from JSON
const aonData = JSON.parse(fs.readFileSync('aon_qa.json', 'utf8'));
const aonQuestions = Object.entries(aonData);
console.log(`\nTotal AON questions loaded: ${aonQuestions.length}`);

// Load testData_complete.js and extract ALL questions from ALL categories
const testDataContent = fs.readFileSync('testData_complete.js', 'utf8');
const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(testDataContent, ctx);
const testData = ctx.window.testData;

// Extract all questions from all categories
const allTestDataQuestions = [];
for (const categoryKey in testData) {
    const category = testData[categoryKey];
    if (category.tests) {
        category.tests.forEach(test => {
            if (test.questions) {
                test.questions.forEach(q => {
                    allTestDataQuestions.push({
                        category: categoryKey,
                        question: q.question,
                        options: q.options || [],
                        correct: q.correct,
                        correctAnswer: q.options && q.options[q.correct] ? q.options[q.correct] : null
                    });
                });
            }
        });
    }
}

console.log(`Total questions in testData (all categories): ${allTestDataQuestions.length}\n`);

// Advanced text normalization
function normalize(text) {
    if (!text) return '';
    return String(text)
        .toLowerCase()
        .replace(/[^\w\s]/g, '') // Remove punctuation
        .replace(/\s+/g, ' ')    // Normalize spaces
        .trim();
}

// Calculate similarity score between two strings
function similarity(s1, s2) {
    const longer = s1.length > s2.length ? s1 : s2;
    const shorter = s1.length > s2.length ? s2 : s1;
    
    if (longer.length === 0) return 1.0;
    
    const editDistance = levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
}

function levenshteinDistance(s1, s2) {
    const costs = [];
    for (let i = 0; i <= s1.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= s2.length; j++) {
            if (i === 0) {
                costs[j] = j;
            } else if (j > 0) {
                let newValue = costs[j - 1];
                if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
                    newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                }
                costs[j - 1] = lastValue;
                lastValue = newValue;
            }
        }
        if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}

// Find matching questions with similarity threshold
const QUESTION_THRESHOLD = 0.75; // 75% similarity for question match
const ANSWER_THRESHOLD = 0.70;   // 70% similarity for answer match

const perfectMatches = [];
const questionMatchAnswerMismatch = [];
const missingFromTestData = [];

console.log('Analyzing questions (this may take a moment)...\n');

let processed = 0;
aonQuestions.forEach(([id, aonQ]) => {
    processed++;
    if (processed % 100 === 0) {
        process.stdout.write(`\rProcessed: ${processed}/${aonQuestions.length}`);
    }
    
    const aonQuestionNorm = normalize(aonQ.question);
    const aonAnswerNorm = normalize(aonQ.answer);
    
    let bestQuestionMatch = null;
    let bestQuestionScore = 0;
    
    // Find best matching question across ALL categories
    for (const testQ of allTestDataQuestions) {
        const testQuestionNorm = normalize(testQ.question);
        const score = similarity(aonQuestionNorm, testQuestionNorm);
        
        if (score > bestQuestionScore) {
            bestQuestionScore = score;
            bestQuestionMatch = testQ;
        }
    }
    
    if (bestQuestionScore >= QUESTION_THRESHOLD && bestQuestionMatch) {
        // Question found, now check answer
        const testAnswerNorm = normalize(bestQuestionMatch.correctAnswer);
        const answerScore = similarity(aonAnswerNorm, testAnswerNorm);
        
        if (answerScore >= ANSWER_THRESHOLD) {
            // Perfect match
            perfectMatches.push({
                id,
                aonQuestion: aonQ.question,
                testQuestion: bestQuestionMatch.question,
                category: bestQuestionMatch.category,
                aonAnswer: aonQ.answer,
                testAnswer: bestQuestionMatch.correctAnswer,
                questionSimilarity: (bestQuestionScore * 100).toFixed(1),
                answerSimilarity: (answerScore * 100).toFixed(1)
            });
        } else {
            // Question matches but answer is different
            questionMatchAnswerMismatch.push({
                id,
                question: aonQ.question,
                testQuestion: bestQuestionMatch.question,
                category: bestQuestionMatch.category,
                aonAnswer: aonQ.answer,
                testAnswer: bestQuestionMatch.correctAnswer || 'NO ANSWER',
                questionSimilarity: (bestQuestionScore * 100).toFixed(1),
                answerSimilarity: (answerScore * 100).toFixed(1)
            });
        }
    } else {
        // No matching question found
        missingFromTestData.push({
            id,
            question: aonQ.question,
            answer: aonQ.answer,
            bestMatchScore: (bestQuestionScore * 100).toFixed(1),
            bestMatchQuestion: bestQuestionMatch ? bestQuestionMatch.question.substring(0, 80) : 'NONE'
        });
    }
});

console.log('\n\n');

// Generate detailed report
console.log('═'.repeat(80));
console.log('SUMMARY STATISTICS');
console.log('═'.repeat(80));
console.log(`Total AON questions:                     ${aonQuestions.length}`);
console.log(`Total testData questions (all cats):     ${allTestDataQuestions.length}`);
console.log(`Perfect matches (Q+A both similar):      ${perfectMatches.length}`);
console.log(`Question found, Answer different:        ${questionMatchAnswerMismatch.length}`);
console.log(`Missing from testData:                   ${missingFromTestData.length}`);
console.log(`Match percentage:                        ${((perfectMatches.length / aonQuestions.length) * 100).toFixed(2)}%`);

// Category breakdown for matched questions
if (perfectMatches.length > 0) {
    console.log('\n' + '-'.repeat(80));
    console.log('MATCHED QUESTIONS BY CATEGORY:');
    const categoryCount = {};
    perfectMatches.forEach(m => {
        categoryCount[m.category] = (categoryCount[m.category] || 0) + 1;
    });
    Object.entries(categoryCount).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
        console.log(`  ${cat.padEnd(40)} ${count}`);
    });
}

// Save detailed reports
if (missingFromTestData.length > 0) {
    console.log('\n' + '═'.repeat(80));
    console.log('QUESTIONS MISSING FROM TESTDATA');
    console.log('═'.repeat(80));
    
    const missingReport = missingFromTestData.map(q => 
        `ID: ${q.id}\nQuestion: ${q.question}\nAnswer: ${q.answer}\nBest Match Score: ${q.bestMatchScore}%\nBest Match: ${q.bestMatchQuestion}\n${'-'.repeat(80)}`
    ).join('\n');
    
    fs.writeFileSync('AON_MISSING_QUESTIONS.txt', missingReport);
    console.log(`✓ Saved ${missingFromTestData.length} missing questions to: AON_MISSING_QUESTIONS.txt`);
    
    // Show first 10
    console.log('\nFirst 10 missing questions:');
    missingFromTestData.slice(0, 10).forEach(q => {
        console.log(`\n[${q.id}] ${q.question.substring(0, 100)}...`);
        console.log(`    Best match: ${q.bestMatchScore}% - ${q.bestMatchQuestion.substring(0, 70)}...`);
    });
}

if (questionMatchAnswerMismatch.length > 0) {
    console.log('\n' + '═'.repeat(80));
    console.log('ANSWER MISMATCHES (Question similar but answer different)');
    console.log('═'.repeat(80));
    
    const mismatchReport = questionMatchAnswerMismatch.map(q => 
        `ID: ${q.id}\nAON Question: ${q.question}\nTestData Question: ${q.testQuestion}\nCategory: ${q.category}\nQuestion Similarity: ${q.questionSimilarity}%\nAnswer Similarity: ${q.answerSimilarity}%\nAON Answer: ${q.aonAnswer}\nTestData Answer: ${q.testAnswer}\n${'-'.repeat(80)}`
    ).join('\n');
    
    fs.writeFileSync('AON_ANSWER_MISMATCHES.txt', mismatchReport);
    console.log(`✓ Saved ${questionMatchAnswerMismatch.length} answer mismatches to: AON_ANSWER_MISMATCHES.txt`);
    
    // Show first 10
    console.log('\nFirst 10 answer mismatches:');
    questionMatchAnswerMismatch.slice(0, 10).forEach(q => {
        const aonAns = q.aonAnswer || 'NULL';
        const testAns = q.testAnswer || 'NULL';
        console.log(`\n[${q.id}] ${q.question.substring(0, 80)}...`);
        console.log(`  Category: ${q.category}`);
        console.log(`  Q Similarity: ${q.questionSimilarity}% | A Similarity: ${q.answerSimilarity}%`);
        console.log(`  AON:      ${aonAns.substring(0, 60)}`);
        console.log(`  TestData: ${testAns.substring(0, 60)}`);
    });
}

if (perfectMatches.length > 0) {
    console.log('\n' + '═'.repeat(80));
    console.log('PERFECTLY MATCHED QUESTIONS');
    console.log('═'.repeat(80));
    
    const matchedReport = perfectMatches.map(q => 
        `ID: ${q.id}\nCategory: ${q.category}\nQuestion Similarity: ${q.questionSimilarity}%\nAnswer Similarity: ${q.answerSimilarity}%\nAON Q: ${q.aonQuestion}\nTest Q: ${q.testQuestion}\nAON A: ${q.aonAnswer}\nTest A: ${q.testAnswer}\n${'-'.repeat(80)}`
    ).join('\n');
    
    fs.writeFileSync('AON_MATCHED_QUESTIONS.txt', matchedReport);
    console.log(`✓ Saved ${perfectMatches.length} matched questions to: AON_MATCHED_QUESTIONS.txt`);
}

// Final summary
console.log('\n' + '═'.repeat(80));
console.log('FINAL VERDICT');
console.log('═'.repeat(80));

const totalAccountedFor = perfectMatches.length + questionMatchAnswerMismatch.length;
const percentAccountedFor = ((totalAccountedFor / aonQuestions.length) * 100).toFixed(2);

console.log(`Questions found in testData: ${totalAccountedFor}/${aonQuestions.length} (${percentAccountedFor}%)`);
console.log(`  - With correct answers: ${perfectMatches.length} (${((perfectMatches.length / aonQuestions.length) * 100).toFixed(2)}%)`);
console.log(`  - With wrong answers: ${questionMatchAnswerMismatch.length} (${((questionMatchAnswerMismatch.length / aonQuestions.length) * 100).toFixed(2)}%)`);
console.log(`Missing completely: ${missingFromTestData.length} (${((missingFromTestData.length / aonQuestions.length) * 100).toFixed(2)}%)`);

if (perfectMatches.length === aonQuestions.length) {
    console.log('\n✓ ALL AON questions are present with correct answers!');
} else {
    console.log('\n⚠ ISSUES FOUND:');
    if (missingFromTestData.length > 0) {
        console.log(`  ❌ ${missingFromTestData.length} questions are MISSING from testData`);
    }
    if (questionMatchAnswerMismatch.length > 0) {
        console.log(`  ⚠️  ${questionMatchAnswerMismatch.length} questions have WRONG ANSWERS`);
    }
}

console.log('\n' + '═'.repeat(80));
console.log('FILES CREATED:');
console.log('  1. AON_MISSING_QUESTIONS.txt - Questions not found in testData');
console.log('  2. AON_ANSWER_MISMATCHES.txt - Questions with incorrect answers');
console.log('  3. AON_MATCHED_QUESTIONS.txt - Correctly matched questions');
console.log('═'.repeat(80));
