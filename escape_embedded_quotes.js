const fs = require('fs');

// Read the HTML file
const htmlContent = fs.readFileSync('index.html', 'utf8');

// Find the testData section
const start = htmlContent.indexOf('window.testData = {');
const consoleLogPos = htmlContent.indexOf("console.log('window.testData loaded");
const beforeTestData = htmlContent.substring(0, start + 'window.testData = '.length);
const afterTestData = htmlContent.substring(consoleLogPos);
let testDataStr = htmlContent.substring(start + 'window.testData = '.length, consoleLogPos);

console.log('Original testData length:', testDataStr.length);

// Step 1: Find all string values and fix quotes inside them
function escapeQuotesInStrings(str) {
    let result = '';
    let inKey = false;
    let inValue = false;
    let quoteChar = '';
    let i = 0;
    let escapeNext = false;
    let currentString = '';
    let bracketDepth = 0;

    while (i < str.length) {
        const char = str[i];
        const prevChar = i > 0 ? str[i - 1] : '';
        const nextChar = i < str.length - 1 ? str[i + 1] : '';

        if (escapeNext) {
            if (inValue) currentString += char;
            else result += char;
            escapeNext = false;
            i++;
            continue;
        }

        if (char === '\\') {
            escapeNext = true;
            if (inValue) currentString += char;
            else result += char;
            i++;
            continue;
        }

        // Track bracket depth
        if (!inValue) {
            if (char === '{' || char === '[') bracketDepth++;
            if (char === '}' || char === ']') bracketDepth--;
        }

        // Start of string
        if (!inValue && char === '"') {
            // Check if this is a key or value
            // Look ahead for :
            let j = i + 1;
            while (j < str.length && str[j] !== '"') {
                if (str[j] === '\\') j++; // skip escaped chars
                j++;
            }
            if (j < str.length) {
                j++; // skip closing quote
                while (j < str.length && /\s/.test(str[j])) j++; // skip whitespace
                if (j < str.length && str[j] === ':') {
                    // This is a key, just pass through
                    result += char;
                    i++;
                    continue;
                }
            }
            
            // This is the start of a value
            inValue = true;
            quoteChar = '"';
            currentString = '';
            i++;
            continue;
        }

        if (inValue) {
            if (char === '"' && quoteChar === '"') {
                // End of string value
                // Escape any unescaped quotes in currentString
                const escapedString = currentString.replace(/"/g, '\\"');
                result += '"' + escapedString + '"';
                currentString = '';
                inValue = false;
                quoteChar = '';
                i++;
                continue;
            } else {
                currentString += char;
                i++;
                continue;
            }
        }

        result += char;
        i++;
    }

    return result;
}

console.log('Escaping quotes in string values...');
testDataStr = escapeQuotesInStrings(testDataStr);

console.log('New testData length:', testDataStr.length);

// Reconstruct the HTML
const newHtmlContent = beforeTestData + testDataStr + afterTestData;

// Write back
fs.writeFileSync('index.html', newHtmlContent);
console.log('✓ All embedded quotes escaped');
