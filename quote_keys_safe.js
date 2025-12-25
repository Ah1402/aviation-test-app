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

// Function to quote unquoted keys more carefully
function quoteUnquotedKeys(str) {
    // Split by lines to process more carefully
    const lines = str.split('\n');
    const result = [];

    for (const line of lines) {
        let processedLine = line;

        // Look for patterns like: category: "value" or test: 1
        // These are likely unquoted keys
        const keyPatterns = [
            /\b(category):\s*"/g,
            /\b(test):\s*\d+/g,
            /\b(id):\s*\d+/g,
            /\b(question):\s*"/g,
            /\b(options):\s*\[/g,
            /\b(answer):\s*"/g,
            /\b(correct):\s*\d+/g,
            /\b(explanation):\s*"/g,
            /\b(name):\s*"/g,
            /\b(icon):\s*"/g,
            /\b(timeLimit):\s*\d+/g
        ];

        for (const pattern of keyPatterns) {
            processedLine = processedLine.replace(pattern, '"$1": ');
        }

        result.push(processedLine);
    }

    return result.join('\n');
}

// Quote the keys in the object
const quotedObject = quoteUnquotedKeys(objectStr);

// Replace the testData section
const newTestDataSection = 'window.testData = ' + quotedObject;
const newHtmlContent = htmlContent.replace(testDataSection, newTestDataSection);

// Write back
fs.writeFileSync('index.html', newHtmlContent);
console.log('Quoted specific unquoted keys in testData');