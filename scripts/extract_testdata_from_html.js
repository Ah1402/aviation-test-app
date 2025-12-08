const fs = require('fs');
const path = require('path');
const vm = require('vm');

const repoRoot = path.join(__dirname,'..');
const htmlFile = path.join(repoRoot,'index_shareable.final.html');
const outFile = path.join(repoRoot,'testData_complete.js');
const backup = outFile + '.bak.' + Date.now();

if (!fs.existsSync(htmlFile)) { console.error('input html not found', htmlFile); process.exit(2); }
const html = fs.readFileSync(htmlFile,'utf8');
const marker = 'window.testData =';
const idx = html.indexOf(marker);
if (idx === -1){ console.error('marker not found in html'); process.exit(2); }
const start = html.indexOf('{', idx);
let i = start; let depth = 0; let end = -1;
for (; i < html.length; i++){
  const ch = html[i];
  if (ch === '{') depth++; else if (ch === '}') { depth--; if (depth === 0){ end = i; break; } }
}
if (end === -1){ console.error('closing brace not found'); process.exit(2); }
const objText = html.slice(start, end+1);
let data;
try { data = JSON.parse(objText); }
catch(e){ data = vm.runInNewContext('('+objText+')'); }

// Backup existing testData_complete.js
if (fs.existsSync(outFile)) fs.copyFileSync(outFile, backup);
const outText = 'window.testData = ' + JSON.stringify(data, null, 2) + ';\n';
fs.writeFileSync(outFile, outText, 'utf8');
console.log('Wrote', outFile, 'backup at', backup);
console.log('Total top-level categories:', Object.keys(data).length);
process.exit(0);
