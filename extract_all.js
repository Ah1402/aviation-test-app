const fs = require('fs');
const vm = require('vm');

const content = fs.readFileSync('testData_complete.js', 'utf8');
const script = new vm.Script(content);
const context = { window: {} };
script.runInNewContext(context);
const data = context.window.testData;

const allQuestions = [];
Object.keys(data).forEach(catId => {
    const cat = data[catId];
    cat.tests.forEach(test => {
        test.questions.forEach(q => {
            allQuestions.push(q.question);
        });
    });
});

console.log(`Total questions in data: ${allQuestions.length}`);
fs.writeFileSync('all_questions.json', JSON.stringify(allQuestions, null, 2));