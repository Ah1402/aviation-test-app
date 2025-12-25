const fs = require('fs');

// Read the HTML file
const htmlContent = fs.readFileSync('index.html', 'utf8');

// Find the compass-egyptair section
const compassMatch = htmlContent.match(/compass-egyptair:\s*{\s*name:\s*'Compass EgyptAir',\s*icon:\s*'fas fa-compass',\s*tests:\s*\[([\s\S]*?)\s*\]\s*}/);

if (!compassMatch) {
    console.error('Could not find compass-egyptair section');
    process.exit(1);
}

const compassSection = compassMatch[1];

// Count the number of question objects by counting opening braces for questions
const questionMatches = compassSection.match(/{\s*category:\s*'compass-egyptair-test-1',\s*test:\s*\d+,\s*id:\s*\d+,/g);

if (questionMatches) {
    console.log(`Total questions in compass-egyptair: ${questionMatches.length}`);
} else {
    console.log('No questions found');
}