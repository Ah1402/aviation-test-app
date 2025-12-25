const fs = require('fs');

// Read the HTML file
const htmlContent = fs.readFileSync('index.html', 'utf8');

// Find the testData section
const start = htmlContent.indexOf('window.testData = {');
const consoleLogPos = htmlContent.indexOf("console.log('window.testData loaded");
const testDataSection = htmlContent.substring(start, consoleLogPos);

// Count single quotes
const singleQuotes = (testDataSection.match(/'/g) || []).length;
console.log('Single quotes in testData:', singleQuotes);

// Count unquoted keys (pattern: word followed by :, not preceded by " or ')
const unquotedKeyMatches = testDataSection.match(/[^"']\s+([a-zA-Z_$][a-zA-Z0-9_$-]*)\s*:/g) || [];
console.log('Unquoted key patterns found:', unquotedKeyMatches.length);

if (unquotedKeyMatches.length > 0) {
    console.log('First few unquoted keys:');
    unquotedKeyMatches.slice(0, 5).forEach(match => {
        console.log('  ', match.trim());
    });
}

// Try to parse a small section
try {
    const firstCategoryEnd = htmlContent.indexOf('\n    },\n    "air-law"', start);
    const firstCategory = htmlContent.substring(start + 'window.testData = '.length, firstCategoryEnd + 6);
    const data = JSON.parse(firstCategory);
    console.log('\n✓ First category parses as valid JSON');
    console.log('Keys:', Object.keys(data));
} catch (e) {
    console.log('\n✗ JSON parsing error:', e.message);
}
