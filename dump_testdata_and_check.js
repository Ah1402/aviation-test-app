const fs = require('fs');

const html = fs.readFileSync('index.html','utf8');
const startMatch = html.indexOf('window.testData = ');
if (startMatch === -1) { console.error('testData not found'); process.exit(1); }
const start = html.indexOf('{', startMatch);
if (start === -1) { console.error('Could not find opening brace'); process.exit(1); }

let depth = 0;
let inString = false;
let stringChar = null;
let escapeNext = false;
let end = -1;
for (let i = start; i < html.length; i++) {
    const ch = html[i];
    if (escapeNext) { escapeNext = false; continue; }
    if (ch === '\\') { escapeNext = true; continue; }
    if (!inString && (ch === '"' || ch === "'")) { inString = true; stringChar = ch; continue; }
    if (inString) {
        if (ch === stringChar) { inString = false; stringChar = null; }
        continue;
    }
    if (ch === '{') depth++;
    else if (ch === '}') {
        depth--;
        if (depth === 0) { end = i; break; }
    }
}

if (end === -1) { console.error('Could not find matching closing brace'); process.exit(1); }

const testDataCode = html.substring(start, end+1);
fs.writeFileSync('tmp_testdata.js', 'const testData = ' + testDataCode + ';', 'utf8');
console.log('Wrote tmp_testdata.js ('+testDataCode.length+' chars)');
console.log('Now running node tmp_testdata.js to get syntax errors (if any)...');
try {
  require('./tmp_testdata.js');
  console.log('\nNo syntax errors in tmp_testdata.js');
} catch (e) {
  console.error('\nSYNTAX ERROR detected:');
  console.error(e && e.stack ? e.stack : e);
}
