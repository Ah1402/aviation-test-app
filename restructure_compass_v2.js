const fs = require('fs');

// Read the compass section
const compassSection = fs.readFileSync('compass_section.txt', 'utf8');

// Find all question start positions
const questionStarts = [];
let pos = 0;
while (true) {
    const start = compassSection.indexOf("                    {\n                        category: 'compass-egyptair-test-1'", pos);
    if (start === -1) break;
    questionStarts.push(start);
    pos = start + 1;
}

console.log(`Found ${questionStarts.length} question starts`);

// Now find the end of each question (the }, before the next question or the end of questions array)
const questions = [];
for (let i = 0; i < questionStarts.length; i++) {
    const start = questionStarts[i];
    let end;
    if (i < questionStarts.length - 1) {
        end = questionStarts[i + 1] - 1; // Just before the next question
        // Find the }, pattern before that
        const commaPos = compassSection.lastIndexOf('                    },', end);
        if (commaPos > start) {
            end = commaPos + 21; // Include the }, but not the comma
        }
    } else {
        // Last question - find the end before the closing bracket
        end = compassSection.indexOf('\n                ]', start);
    }
    questions.push(compassSection.substring(start, end));
}

console.log(`Extracted ${questions.length} questions`);

// Now create 9 tests
const questionsPerTest = 30;
const numTests = 8; // 8 tests of 30 = 240 questions
const remainingQuestions = questions.length - (numTests * questionsPerTest);

console.log(`Creating ${numTests} tests with ${questionsPerTest} questions each and 1 test with ${remainingQuestions} questions`);

let newCompassSection = `    compass-egyptair: {
        name: 'Compass EgyptAir',
        icon: 'fas fa-compass',
        tests: [
`;

let questionIndex = 0;

for (let testNum = 1; testNum <= numTests; testNum++) {
    const testQuestions = questions.slice(questionIndex, questionIndex + questionsPerTest);
    questionIndex += questionsPerTest;

    // Update the category and test number for each question in this test
    const updatedQuestions = testQuestions.map(q =>
        q.replace(/category: 'compass-egyptair-test-1'/g, `category: 'compass-egyptair-test-${testNum}'`)
         .replace(/test: 1/g, `test: ${testNum}`)
    );

    newCompassSection += `            {
                id: 'compass-egyptair-test-${testNum}',
                name: 'Test ${testNum}',
                timeLimit: 60,
                questions: [
${updatedQuestions.join(',\n')}
                ]
            }`;

    if (testNum < numTests + (remainingQuestions > 0 ? 1 : 0)) {
        newCompassSection += `,
`;
    }
}

// Add the remaining questions test if any
if (remainingQuestions > 0) {
    const remainingTestQuestions = questions.slice(questionIndex);
    const updatedRemainingQuestions = remainingTestQuestions.map(q =>
        q.replace(/category: 'compass-egyptair-test-1'/g, `category: 'compass-egyptair-test-${numTests + 1}'`)
         .replace(/test: 1/g, `test: ${numTests + 1}`)
    );

    newCompassSection += `            {
                id: 'compass-egyptair-test-${numTests + 1}',
                name: 'Test ${numTests + 1}',
                timeLimit: 60,
                questions: [
${updatedRemainingQuestions.join(',\n')}
                ]
            }
`;
}

newCompassSection += `        ]
    }`;

fs.writeFileSync('compass_restructured.txt', newCompassSection);
console.log('Restructured compass section saved to compass_restructured.txt');