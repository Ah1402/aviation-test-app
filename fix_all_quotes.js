const fs = require('fs');

// Read the HTML file
const htmlContent = fs.readFileSync('index.html', 'utf8');

// Find the testData section
const start = htmlContent.indexOf('window.testData = {');
const consoleLogPos = htmlContent.indexOf("console.log('window.testData loaded");
const beforeTestData = htmlContent.substring(0, start + 'window.testData = '.length);
const afterTestData = htmlContent.substring(consoleLogPos);
const testDataStr = htmlContent.substring(start + 'window.testData = '.length, consoleLogPos);

console.log('Searching for all quote issues...');

// Find all instances of double-quote issues
const issues = [];
let pos = 0;
while ((pos = testDataStr.indexOf('"', pos)) !== -1) {
    // Look ahead to see if this could be a problematic quote
    const nextChar = testDataStr[pos + 1];
    if (nextChar && /[a-z]/i.test(nextChar)) {
        // Check if it's like "s or "t etc.
        const context = testDataStr.substring(Math.max(0, pos - 30), pos + 30);
        if (context.includes('"s ') || context.includes('"t ') || context.includes('"re ') || 
            context.includes('"ll ') || context.includes('"ve ') || context.includes('"d ') ||
            context.includes('"s.') || context.includes('"t.') || context.includes('"s,')) {
            issues.push({pos, context});
        }
    }
    pos++;
}

console.log(`Found ${issues.length} potential issues`);

// More aggressive fix
function fixAllQuotes(str) {
    let result = str;
    
    // Fix ALL apostrophe contractions
    const patterns = [
        [/"([^"]*)"s(\s|,|\.|:|;)/g, '"$1\'s$2'],
        [/"([^"]*)"t(\s|,|\.|:|;)/g, '"$1\'t$2'],
        [/"([^"]*)"re(\s|,|\.|:|;)/g, '"$1\'re$2'],
        [/"([^"]*)"ll(\s|,|\.|:|;)/g, '"$1\'ll$2'],
        [/"([^"]*)"ve(\s|,|\.|:|;)/g, '"$1\'ve$2'],
        [/"([^"]*)"d(\s|,|\.|:|;)/g, '"$1\'d$2'],
        [/"([^"]*)"m(\s|,|\.|:|;)/g, '"$1\'m$2'],
    ];
    
    for (const [pattern, replacement] of patterns) {
        const before = result.length;
        result = result.replace(pattern, replacement);
        const changes = (before - result.length) / 2;
        if (changes > 0) {
            console.log(`  Fixed ${Math.abs(changes)} instances with pattern: ${pattern.source}`);
        }
    }
    
    return result;
}

console.log('Applying comprehensive fixes...');
const fixedData = fixAllQuotes(testDataStr);

// Reconstruct the HTML
const newHtmlContent = beforeTestData + fixedData + afterTestData;

// Write back
fs.writeFileSync('index.html', newHtmlContent);
console.log('✓ All quote issues fixed');

// Verify
const verifyIssues = (fixedData.match(/"[a-z]"[a-z]/gi) || []).length;
console.log(`Remaining potential issues: ${verifyIssues}`);
