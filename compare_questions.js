const fs = require('fs');

const htmlQuestions = JSON.parse(fs.readFileSync('extracted_questions.json', 'utf8'));
const dataQuestions = JSON.parse(fs.readFileSync('all_questions.json', 'utf8'));

const dataSet = new Set(dataQuestions.map(q => q.toLowerCase().trim()));

let notInData = 0;
let matches = 0;
htmlQuestions.forEach(q => {
    const cleanQ = q.replace(/^\d+\.\s*/, '').split('Correct Answer:')[0].split('A\.')[0].trim().toLowerCase();
    if (dataSet.has(cleanQ)) {
        matches++;
    } else {
        notInData++;
    }
});

console.log(`HTML questions: ${htmlQuestions.length}`);
console.log(`Data questions: ${dataQuestions.length}`);
console.log(`Matches: ${matches}`);
console.log(`Questions in HTML not in data: ${notInData}`);