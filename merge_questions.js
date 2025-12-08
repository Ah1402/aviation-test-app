const fs = require('fs');
const vm = require('vm');

const content = fs.readFileSync('testData_complete.js', 'utf8');
const script = new vm.Script(content);
const context = { window: {} };
script.runInNewContext(context);
const data = context.window.testData;

const newQuestions = JSON.parse(fs.readFileSync('categorized_questions.json', 'utf8'));

// For each category in newQuestions, add to data
Object.keys(newQuestions).forEach(catId => {
    if (!data[catId]) {
        // New category, need to add name and icon
        data[catId] = {
            name: catId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            icon: 'fas fa-question-circle', // default
            tests: []
        };
    }
    const cat = data[catId];
    Object.keys(newQuestions[catId]).forEach(testId => {
        const testNum = testId.split('-')[1];
        const existingTest = cat.tests.find(t => t.id === `${catId}-test-${testNum}`);
        if (!existingTest) {
            // Add new test
            const newTest = {
                id: `${catId}-test-${testNum}`,
                name: `Test ${testNum}`,
                timeLimit: 60,
                questions: newQuestions[catId][testId]
            };
            cat.tests.push(newTest);
        } else {
            // Add questions to existing test, but check for duplicates
            const existingQuestions = new Set(existingTest.questions.map(q => q.question.toLowerCase().trim()));
            newQuestions[catId][testId].forEach(q => {
                if (!existingQuestions.has(q.question.toLowerCase().trim())) {
                    existingTest.questions.push(q);
                }
            });
        }
    });
});

// Write back
const newContent = `window.testData = ${JSON.stringify(data, null, 2)};`;
fs.writeFileSync('testData_complete.js', newContent);

console.log('Updated testData_complete.js with new questions.');