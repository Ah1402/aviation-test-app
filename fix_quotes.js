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

// Function to convert single quotes to double quotes, but be careful about quotes inside strings
function convertQuotes(str) {
    let result = '';
    let inString = false;
    let stringChar = '';
    let escapeNext = false;

    for (let i = 0; i < str.length; i++) {
        const char = str[i];

        if (escapeNext) {
            result += char;
            escapeNext = false;
            continue;
        }

        if (char === '\\') {
            result += char;
            escapeNext = true;
            continue;
        }

        if (!inString) {
            if (char === '"' || char === "'") {
                inString = true;
                stringChar = char;
                result += '"'; // Convert to double quote
            } else {
                result += char;
            }
        } else {
            if (char === stringChar) {
                inString = false;
                result += '"'; // Convert closing quote to double quote
            } else {
                result += char;
            }
        }
    }

    return result;
}

// Convert quotes in the object
const convertedObject = convertQuotes(objectStr);

// Replace the testData section
const newTestDataSection = 'window.testData = ' + convertedObject;
const newHtmlContent = htmlContent.replace(testDataSection, newTestDataSection);

// Write back
fs.writeFileSync('index.html', newHtmlContent);
console.log('Converted all quotes to double quotes in testData');