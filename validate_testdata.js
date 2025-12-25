const fs = require('fs');

// Read the file
const html = fs.readFileSync('c:/Users/ahmed/Desktop/final younes/final/aviation-test-app/index.html', 'utf8');

// Extract testData
const startMatch = html.indexOf('window.testData = {');
if (startMatch === -1) {
    console.log('testData not found');
    process.exit(1);
}

// Robustly extract the testData object by scanning braces and respecting strings
const braceStart = html.indexOf('{', startMatch + 'window.testData = '.length);
if (braceStart === -1) {
    console.log('Could not find opening brace for testData');
    process.exit(1);
}

let depth = 0;
let inString = false;
let stringChar = null;
let escapeNext = false;
let end = -1;
for (let i = braceStart; i < html.length; i++) {
    const ch = html[i];
    if (escapeNext) { escapeNext = false; continue; }
    if (ch === '\\') { escapeNext = true; continue; }
    if (!inString && (ch === '"' || ch === "'")) { inString = true; stringChar = ch; continue; }
    if (inString) { if (ch === stringChar) { inString = false; stringChar = null; } continue; }
    if (ch === '{') depth++; else if (ch === '}') { depth--; if (depth === 0) { end = i + 1; break; } }
}

if (end === -1) { console.log('Could not find end of testData object'); process.exit(1); }
const testDataCode = html.substring(braceStart, end);

try {
    const testData = eval('(' + testDataCode + ')');
    console.log('✓ testData is VALID JavaScript');
    console.log('Categories:', Object.keys(testData).length);
    
    let totalQuestions = 0;
    Object.entries(testData).forEach(([catKey, cat]) => {
        let catQuestions = 0;
        if (cat.tests) {
            cat.tests.forEach(test => {
                if (test.questions) {
                    catQuestions += test.questions.length;
                }
            });
        }
        totalQuestions += catQuestions;
        console.log(`  ${catKey}: ${catQuestions} questions`);
    });
    
    console.log('\nTotal questions:', totalQuestions);
} catch (e) {
    console.log('✗ Syntax error:', e.message);
    console.log('Stack:', e.stack);
}
