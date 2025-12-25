const fs = require('fs');

function extractTestData(filePath) {
    const html = fs.readFileSync(filePath, 'utf8');
    const startMatch = html.indexOf('window.testData = {');
    if (startMatch === -1) return null;

    const start = startMatch + 'window.testData = '.length;
    let depth = 0;
    let end = start;
    let inString = false;
    let stringChar = null;

    for (let i = start; i < html.length; i++) {
        const char = html[i];
        const prevChar = i > 0 ? html[i-1] : '';

        if ((char === '"' || char === "'") && prevChar !== '\\') {
            if (!inString) {
                inString = true;
                stringChar = char;
            } else if (char === stringChar) {
                inString = false;
            }
            continue;
        }

        if (inString) continue;

        if (char === '{') depth++;
        else if (char === '}') {
            depth--;
            if (depth === 0) {
                end = i + 1;
                break;
            }
        }
    }

    const testDataCode = html.substring(start, end);
    try {
        return eval('(' + testDataCode + ')');
    } catch (e) {
        console.error(`Error parsing ${filePath}:`, e.message);
        return null;
    }
}

function findDuplicateQuestions(testData) {
    const questionMap = new Map(); // key: question text, value: array of {id, correct, category, test}
    const duplicates = [];

    Object.entries(testData).forEach(([catKey, cat]) => {
        if (!cat.tests) return;

        cat.tests.forEach(test => {
            if (!test.questions) return;

            test.questions.forEach(question => {
                const key = question.question?.trim();
                if (!key) return;

                const questionInfo = {
                    id: question.id,
                    correct: question.correct,
                    category: question.category || catKey,
                    test: question.test || test.id,
                    answer: question.answer,
                    options: question.options
                };

                if (!questionMap.has(key)) {
                    questionMap.set(key, [questionInfo]);
                } else {
                    questionMap.get(key).push(questionInfo);
                }
            });
        });
    });

    // Find duplicates with same correct answer
    questionMap.forEach((questions, questionText) => {
        if (questions.length > 1) {
            // Group by correct answer
            const byCorrect = new Map();

            questions.forEach(q => {
                const correctKey = q.correct;
                if (!byCorrect.has(correctKey)) {
                    byCorrect.set(correctKey, []);
                }
                byCorrect.get(correctKey).push(q);
            });

            // Find groups with multiple questions having same correct answer
            byCorrect.forEach((group, correctAnswer) => {
                if (group.length > 1) {
                    duplicates.push({
                        question: questionText,
                        correct: correctAnswer,
                        count: group.length,
                        questions: group
                    });
                }
            });
        }
    });

    return duplicates;
}

console.log('Analyzing testData for duplicate questions with same correct answers...');
const testData = extractTestData('c:/Users/ahmed/Desktop/final younes/final/aviation-test-app/index.html');

if (!testData) {
    console.log('Error: Could not extract testData');
    process.exit(1);
}

const duplicates = findDuplicateQuestions(testData);

console.log('\n' + '='.repeat(80));
console.log('DUPLICATE QUESTIONS ANALYSIS');
console.log('='.repeat(80));

console.log(`\n📊 SUMMARY:`);
console.log(`Total unique question texts: ${duplicates.length}`);
console.log(`Total duplicate groups: ${duplicates.reduce((sum, dup) => sum + dup.count, 0)}`);

let totalDuplicateQuestions = 0;
duplicates.forEach(dup => {
    totalDuplicateQuestions += dup.count;
});

console.log(`Total questions involved in duplicates: ${totalDuplicateQuestions}`);

console.log('\n📋 DETAILED DUPLICATES:');
console.log('Format: Question (Correct Answer) - Count - IDs');

duplicates.forEach((dup, index) => {
    console.log(`\n${index + 1}. "${dup.question}"`);
    console.log(`   Correct Answer: ${dup.correct}`);
    console.log(`   Count: ${dup.count}`);
    console.log(`   IDs: ${dup.questions.map(q => q.id).join(', ')}`);
    console.log(`   Categories: ${[...new Set(dup.questions.map(q => q.category))].join(', ')}`);
});

console.log('\n' + '='.repeat(80));
console.log('ANALYSIS COMPLETE');
console.log('='.repeat(80));
