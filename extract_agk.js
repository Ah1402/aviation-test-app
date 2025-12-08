const fs = require('fs');
const vm = require('vm');

const content = fs.readFileSync('testData_complete.js', 'utf8');
const script = new vm.Script(content);
const context = { window: {} };
script.runInNewContext(context);
const data = context.window.testData;

const agkQuestions = [];
if (data['aircraft-general-knowledge']) {
    const cat = data['aircraft-general-knowledge'];
    cat.tests.forEach(test => {
        test.questions.forEach(q => {
            agkQuestions.push(q.question);
        });
    });
}

console.log(`Total AGK questions in data: ${agkQuestions.length}`);
fs.writeFileSync('agk_questions.json', JSON.stringify(agkQuestions, null, 2));