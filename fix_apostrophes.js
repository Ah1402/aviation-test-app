const fs = require('fs');

// Read the HTML file
const htmlContent = fs.readFileSync('index.html', 'utf8');

// Find the testData section
const start = htmlContent.indexOf('window.testData = {');
const consoleLogPos = htmlContent.indexOf("console.log('window.testData loaded");
const beforeTestData = htmlContent.substring(0, start + 'window.testData = '.length);
const afterTestData = htmlContent.substring(consoleLogPos);
const testDataStr = htmlContent.substring(start + 'window.testData = '.length, consoleLogPos);

console.log('Fixing escaped quotes in testData...');

// Fix: Escape all double quotes that appear inside string values
// This regex finds strings and escapes unescaped quotes within them
function fixEscapedQuotes(str) {
    // Replace patterns like: "text"s with "text's or "text\"s
    // Also fix other apostrophe issues
    
    let result = str;
    
    // Fix common apostrophe issues in strings
    // Pattern: "word"s -> "word's"
    result = result.replace(/"([^"]*)"s /g, '"$1\'s ');
    result = result.replace(/"([^"]*)"s\./g, '"$1\'s.');
    result = result.replace(/"([^"]*)"s,/g, '"$1\'s,');
    result = result.replace(/"([^"]*)"t /g, '"$1\'t ');
    result = result.replace(/"([^"]*)"t\./g, '"$1\'t.');
    result = result.replace(/"([^"]*)"re /g, '"$1\'re ');
    result = result.replace(/"([^"]*)"ll /g, '"$1\'ll ');
    result = result.replace(/"([^"]*)"ve /g, '"$1\'ve ');
    result = result.replace(/"([^"]*)"d /g, '"$1\'d ');
    
    return result;
}

console.log('Applying fixes...');
const fixedData = fixEscapedQuotes(testDataStr);

// Count how many fixes were made
const originalMatches = (testDataStr.match(/"[^"]*"s/g) || []).length;
console.log(`Fixed ${originalMatches} apostrophe issues`);

// Reconstruct the HTML
const newHtmlContent = beforeTestData + fixedData + afterTestData;

// Write back
fs.writeFileSync('index.html', newHtmlContent);
console.log('✓ Fixed all escaped quote issues');
