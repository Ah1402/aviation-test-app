const fs = require('fs');

// Read the HTML file
const htmlContent = fs.readFileSync('index.html', 'utf8');

// Extract the testData object
const testDataMatch = htmlContent.match(/window\.testData\s*=\s*({[\s\S]*?});/);
if (!testDataMatch) {
    console.error('Could not find testData object');
    process.exit(1);
}

const testDataStr = testDataMatch[1];

// Clean up the string to make it valid JSON
let cleanStr = testDataStr
    .replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":')  // Quote unquoted keys
    .replace(/'/g, '"');  // Replace single quotes with double quotes

// Parse the JSON
let testData;
try {
    testData = JSON.parse(cleanStr);
} catch (e) {
    console.error('Failed to parse testData:', e.message);
    process.exit(1);
}

// Count questions in compass-egyptair
const compassCategory = testData['compass-egyptair'];
if (!compassCategory) {
    console.error('compass-egyptair category not found');
    process.exit(1);
}

const tests = compassCategory.tests;
let totalQuestions = 0;

tests.forEach((test, index) => {
    const questionCount = test.questions.length;
    totalQuestions += questionCount;
    console.log(`Test ${index + 1}: ${questionCount} questions`);
});

console.log(`Total questions in compass-egyptair: ${totalQuestions}`);