const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..');
const rebuilt = path.join(repoRoot, 'index_shareable.rebuilt.html');
const dedup = path.join(repoRoot, 'testData_complete.cleaned2.js');
const out = path.join(repoRoot, 'index_shareable.final.html');

if (!fs.existsSync(rebuilt)) { console.error('rebuilt not found:', rebuilt); process.exit(2); }
if (!fs.existsSync(dedup)) { console.error('dedup not found:', dedup); process.exit(2); }

let html = fs.readFileSync(rebuilt, 'utf8');
let ded = fs.readFileSync(dedup, 'utf8');

function removeAssignments(s) {
  const marker = 'window.testData';
  let pos = 0;
  while (true) {
    const idx = s.indexOf(marker, pos);
    if (idx === -1) break;
    const eq = s.indexOf('=', idx);
    if (eq === -1) { pos = idx + marker.length; continue; }
    const ob = s.indexOf('{', eq);
    if (ob === -1) { pos = eq + 1; continue; }
    let i = ob;
    let depth = 0;
    let end = -1;
    for (; i < s.length; i++) {
      const ch = s[i];
      if (ch === '{') depth++;
      else if (ch === '}') {
        depth--;
        if (depth === 0) { end = i; break; }
      }
    }
    if (end === -1) { pos = ob + 1; continue; }
    let j = end + 1;
    while (j < s.length && /[\s;]/.test(s[j])) j++;
    s = s.slice(0, idx) + s.slice(j);
    pos = idx;
  }
  return s;
}

html = removeAssignments(html);
html = html.replace(/new\s+window\.SearchEngine\(\s*window\.testData\s*=\s*/g, 'new window.SearchEngine(window.testData = ');
html = html.replace(/window\.testData\s*=\s*;+/g, '');
html = html.replace(/new\s+window\.SearchEngine\(\s*window\.testData;+/g, 'new window.SearchEngine(window.testData');

const bodyClose = html.lastIndexOf('</body>');
if (bodyClose === -1) { console.error('</body> not found in rebuilt file'); process.exit(2); }

const injection = '<script>\n' + ded + '\n</script>\n';
const finalHtml = html.slice(0, bodyClose) + injection + html.slice(bodyClose);
fs.writeFileSync(out, finalHtml, 'utf8');
console.log('Wrote', out);
process.exit(0);
