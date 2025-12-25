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
console.log('testData string length:', testDataStr.length);

// Try to find syntax errors by checking brackets and parentheses
let openBraces = 0;
let openBrackets = 0;
let openParens = 0;
let inString = false;
let stringChar = '';
let escapeNext = false;

for (let i = 0; i < testDataStr.length; i++) {
    const char = testDataStr[i];

    if (escapeNext) {
        escapeNext = false;
        continue;
    }

    if (char === '\\') {
        escapeNext = true;
        continue;
    }

    if (!inString) {
        if (char === '"' || char === "'") {
            inString = true;
            stringChar = char;
        } else if (char === '{') {
            openBraces++;
        } else if (char === '}') {
            openBraces--;
        } else if (char === '[') {
            openBrackets++;
        } else if (char === ']') {
            openBrackets--;
        } else if (char === '(') {
            openParens++;
        } else if (char === ')') {
            openParens--;
        }
    } else {
        if (char === stringChar) {
            inString = false;
            stringChar = '';
        }
    }

    // Check for negative counts (would indicate syntax error)
    if (openBraces < 0 || openBrackets < 0 || openParens < 0) {
        console.log(`Syntax error at position ${i}: ${char}`);
        console.log(`Context: ${testDataStr.substring(Math.max(0, i-50), i+50)}`);
        break;
    }
}

console.log(`Final counts - Braces: ${openBraces}, Brackets: ${openBrackets}, Parens: ${openParens}`);