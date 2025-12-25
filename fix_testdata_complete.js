const fs = require('fs');

// Read the HTML file
const htmlContent = fs.readFileSync('index.html', 'utf8');

// Find the testData section
const start = htmlContent.indexOf('window.testData = {');
const consoleLogPos = htmlContent.indexOf("console.log('window.testData loaded");
const beforeTestData = htmlContent.substring(0, start + 'window.testData = '.length);
const afterTestData = htmlContent.substring(consoleLogPos);
const testDataStr = htmlContent.substring(start + 'window.testData = '.length, consoleLogPos);

console.log('Processing testData...');
console.log('testData length:', testDataStr.length);

// Function to safely convert single quotes to double quotes in values and quote keys
function fixTestData(str) {
    let result = '';
    let inString = false;
    let stringChar = '';
    let escapeNext = false;
    let i = 0;

    while (i < str.length) {
        const char = str[i];

        if (escapeNext) {
            // If we're escaping a single quote in a double-quoted string, remove the escape
            if (char === "'" && stringChar === '"') {
                result += char;
            } else if (char === '"' && stringChar === '"') {
                // Keep the escape for double quotes
                result += '\\' + char;
            } else {
                result += '\\' + char;
            }
            escapeNext = false;
            i++;
            continue;
        }

        if (char === '\\') {
            escapeNext = true;
            i++;
            continue;
        }

        if (!inString) {
            if (char === '"') {
                inString = true;
                stringChar = '"';
                result += char;
                i++;
            } else if (char === "'") {
                inString = true;
                stringChar = "'";
                result += '"'; // Convert to double quote
                i++;
            } else {
                result += char;
                i++;
            }
        } else {
            if (char === stringChar) {
                if (stringChar === "'") {
                    result += '"'; // Convert closing single quote to double quote
                } else {
                    result += char;
                }
                inString = false;
                stringChar = '';
                i++;
            } else {
                result += char;
                i++;
            }
        }
    }

    return result;
}

// Function to quote unquoted keys
function quoteKeys(str) {
    const lines = str.split('\n');
    const result = [];

    for (let line of lines) {
        // Match unquoted keys followed by colon
        // Pattern: whitespace + word + whitespace + colon
        line = line.replace(/^(\s*)([a-zA-Z_$][a-zA-Z0-9_$-]*)\s*:/g, '$1"$2":');
        result.push(line);
    }

    return result.join('\n');
}

console.log('Step 1: Converting quotes...');
let fixedData = fixTestData(testDataStr);

console.log('Step 2: Quoting keys...');
fixedData = quoteKeys(fixedData);

// Reconstruct the HTML
const newHtmlContent = beforeTestData + fixedData + afterTestData;

// Write back
fs.writeFileSync('index.html', newHtmlContent);
console.log('✓ Fixed testData structure');
console.log('✓ All quotes standardized to double quotes');
console.log('✓ All object keys are now quoted');
