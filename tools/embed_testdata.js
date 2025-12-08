const fs = require('fs');
const path = require('path');

const standalonePath = path.join(__dirname, '..', 'FULL_STANDALONE_EMBEDDED.html');
const testDataPath = path.join(__dirname, '..', 'testData_complete.js');
const outPath = path.join(__dirname, '..', 'FULL_STANDALONE_EMBEDDED_UPDATED.html');

const html = fs.readFileSync(standalonePath, 'utf8');
const testData = fs.readFileSync(testDataPath, 'utf8');

const marker = 'window.testData =';
const idx = html.indexOf(marker);
if (idx === -1) {
  console.error('Could not find window.testData marker in', standalonePath);
  process.exit(2);
}
// find opening <script tag before marker
const scriptOpen = html.lastIndexOf('<script', idx);
if (scriptOpen === -1) {
  console.error('Could not find opening <script before marker');
  process.exit(2);
}
// find closing </script> after marker
const scriptClose = html.indexOf('</script>', idx);
if (scriptClose === -1) {
  console.error('Could not find closing </script> after marker');
  process.exit(2);
}
const before = html.slice(0, scriptOpen);
const after = html.slice(scriptClose + '</script>'.length);

// Ensure testData content is a script block (it may already start with window.testData)
let embedded = testData;
if (!embedded.trim().startsWith('window.testData')) {
  embedded = 'window.testData = ' + embedded + ';';
}

const newHtml = before + '<script>\n' + embedded + '\n</script>' + after;
fs.writeFileSync(outPath, newHtml, 'utf8');
console.log('Wrote', outPath);
