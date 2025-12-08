const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname,'..');
const htmlPath = path.join(root,'index_shareable.html');
const dataPath = path.join(root,'testData_complete.dedup.keepfirst.js');
const outPath = path.join(root,'index_shareable.deduped.html');

if (!fs.existsSync(htmlPath)) { console.error('html not found', htmlPath); process.exit(2); }
if (!fs.existsSync(dataPath)) { console.error('data file not found', dataPath); process.exit(2); }

const html = fs.readFileSync(htmlPath,'utf8');
const dataFile = fs.readFileSync(dataPath,'utf8');

const marker = 'window.testData =';
const hi = html.indexOf(marker);
if (hi === -1) { console.error('marker not found in html'); process.exit(2); }
const startObj = html.indexOf('{', hi);
let i = startObj; let depth = 0; let endObj = -1;
for (; i < html.length; i++){
  const ch = html[i];
  if (ch === '{') depth++; else if (ch === '}') { depth--; if (depth === 0){ endObj = i; break; } }
}
if (endObj === -1) { console.error('closing } not found in html'); process.exit(2); }

// Extract object from dataFile
const di = dataFile.indexOf(marker);
if (di === -1) { console.error('marker not found in data file'); process.exit(2); }
const dstart = dataFile.indexOf('{', di);
let j = dstart; let ddepth = 0; let dend = -1;
for (; j < dataFile.length; j++){
  const ch = dataFile[j];
  if (ch === '{') ddepth++; else if (ch === '}') { ddepth--; if (ddepth === 0){ dend = j; break; } }
}
if (dend === -1) { console.error('closing } not found in data file'); process.exit(2); }

const objText = dataFile.slice(dstart, dend+1);

const newHtml = html.slice(0, startObj) + objText + html.slice(endObj+1);
fs.writeFileSync(outPath, newHtml, 'utf8');
console.log('Wrote', outPath);
process.exit(0);
