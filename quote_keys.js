const fs = require('fs');

// Read the HTML file
const htmlContent = fs.readFileSync('index.html', 'utf8');

// Find the testData section
const start = htmlContent.indexOf('window.testData = {');
const consoleLogPos = htmlContent.indexOf("console.log('window.testData loaded");
const testDataSection = htmlContent.substring(start, consoleLogPos);

// Extract just the object part
const objectStart = 'window.testData = '.length;
const objectStr = testDataSection.substring(objectStart);

// Function to quote unquoted keys (but not inside strings)
function quoteKeys(str) {
    let result = '';
    let inString = false;
    let stringChar = '';
    let escapeNext = false;
    let i = 0;

    while (i < str.length) {
        const char = str[i];

        if (escapeNext) {
            result += char;
            escapeNext = false;
            i++;
            continue;
        }

        if (char === '\\') {
            result += char;
            escapeNext = true;
            i++;
            continue;
        }

        if (!inString) {
            if (char === '"' || char === "'") {
                inString = true;
                stringChar = char;
                result += char;
                i++;
            } else if (char === '{' || char === ',') {
                // Look ahead for a potential unquoted key
                let j = i + 1;
                // Skip whitespace
                while (j < str.length && /\s/.test(str[j])) j++;
                // Check if we have a word followed by :
                let keyStart = j;
                while (j < str.length && /[a-zA-Z_$][a-zA-Z0-9_$]*/.test(str[j])) j++;
                if (j > keyStart && j < str.length && str[j] === ':') {
                    // Found an unquoted key
                    result += char + str.substring(i + 1, keyStart) + '"' + str.substring(keyStart, j) + '"' + str[j];
                    i = j + 1;
                } else {
                    result += char;
                    i++;
                }
            } else {
                result += char;
                i++;
            }
        } else {
            if (char === stringChar) {
                inString = false;
            }
            result += char;
            i++;
        }
    }

    return result;
}

// Quote the keys in the object
const quotedObject = quoteKeys(objectStr);

// Replace the testData section
const newTestDataSection = 'window.testData = ' + quotedObject;
const newHtmlContent = htmlContent.replace(testDataSection, newTestDataSection);

// Write back
fs.writeFileSync('index.html', newHtmlContent);
console.log('Quoted all unquoted keys in testData');