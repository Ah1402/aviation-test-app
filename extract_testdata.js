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

// Write to a JS file for linting
fs.writeFileSync('testData.js', testDataStr);
console.log('testData extracted to testData.js');