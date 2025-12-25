const fs = require('fs');

// Read the extracted compass section
const compassSection = fs.readFileSync('compass_section.txt', 'utf8');

// Extract the questions array by finding the positions
const questionsStart = compassSection.indexOf('questions: [');
if (questionsStart === -1) {
    console.error('Could not find questions start');
    process.exit(1);
}

const questionsEnd = compassSection.indexOf('                ]', questionsStart + 1);
if (questionsEnd === -1) {
    console.error('Could not find questions end');
    process.exit(1);
}

const questionsStr = compassSection.substring(questionsStart + 12, questionsEnd + 17);

console.log('Questions string length:', questionsStr.length);
console.log('Full questions string:');
console.log(questionsStr);