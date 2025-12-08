const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..');
const inFile = path.join(repoRoot, 'index_shareable.fixed.html');
const outFile = path.join(repoRoot, 'index_shareable.cleaned.html');

if (!fs.existsSync(inFile)) {
  console.error('input not found:', inFile);
  process.exit(2);
}

let s = fs.readFileSync(inFile, 'utf8');
const idx = s.indexOf('</html>');
if (idx === -1) {
  console.error('</html> not found in file');
  process.exit(2);
}
const cut = s.slice(0, idx + '</html>'.length);
fs.writeFileSync(outFile, cut, 'utf8');
console.log('Wrote', outFile);
process.exit(0);
