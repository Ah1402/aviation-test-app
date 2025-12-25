const fs = require('fs');

// Read the extracted compass section
const compassSection = fs.readFileSync('compass_section.txt', 'utf8');

// Extract the questions array
const questionsMatch = compassSection.match(/questions:\s*\[([\s\S]*?)\s*\]/);
if (!questionsMatch) {
    console.error('Could not find questions array');
    process.exit(1);
}

const questionsStr = questionsMatch[1];

// Split questions by the pattern }, followed by newline and {
const questionBlocks = questionsStr.split(/\s*},\s*\n\s*{\s*/);

console.log(`Found ${questionBlocks.length} question blocks`);

// Reconstruct questions with proper braces
const questions = questionBlocks.map((block, index) => {
    if (index === 0) {
        return `                    {
${block}
                    }`;
    } else {
        return `                    {
                        ${block}
                    }`;
    }
});

console.log(`After reconstruction: ${questions.length} questions`);

// Now create 9 tests
const questionsPerTest = 30;
const numTests = 8; // 8 tests of 30 = 240 questions
const remainingQuestions = questions.length - (numTests * questionsPerTest); // 6 questions

console.log(`Total questions: ${questions.length}`);
console.log(`Creating ${numTests} tests with ${questionsPerTest} questions each and 1 test with ${remainingQuestions} questions`);

// Generate the new compass-egyptair structure
let newCompassSection = `    compass-egyptair: {
        name: 'Compass EgyptAir',
        icon: 'fas fa-compass',
        tests: [
`;

let questionIndex = 0;

for (let testNum = 1; testNum <= numTests; testNum++) {
    const testQuestions = questions.slice(questionIndex, questionIndex + questionsPerTest);
    questionIndex += questionsPerTest;

    newCompassSection += `            {
                id: 'compass-egyptair-test-${testNum}',
                name: 'Test ${testNum}',
                timeLimit: 60,
                questions: [
${testQuestions.join(',\n')}
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
    newCompassSection += `            {
                id: 'compass-egyptair-test-${numTests + 1}',
                name: 'Test ${numTests + 1}',
                timeLimit: 60,
                questions: [
${remainingTestQuestions.join(',\n')}
                ]
            }
`;
}

newCompassSection += `        ]
    }`;

fs.writeFileSync('compass_restructured.txt', newCompassSection);
console.log('Restructured compass section saved to compass_restructured.txt');