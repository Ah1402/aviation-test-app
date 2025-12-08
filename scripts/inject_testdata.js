const fs = require('fs');
const path = require('path');

const htmlIn = path.join(__dirname, '..', 'index_shareable.cleaned_final.html');
const htmlOut = path.join(__dirname, '..', 'index_shareable.cleaned_final2.html');
const dedup = path.join(__dirname, '..', 'testData_complete.dedup.js');

let html = fs.readFileSync(htmlIn, 'utf8');
let ded = fs.readFileSync(dedup, 'utf8');

// Remove any existing "window.testData = { ... };" blocks in the HTML
function removeAssignments(s) {
  const marker = 'window.testData';
  let pos = 0;
  while (true) {
    const idx = s.indexOf(marker, pos);
    if (idx === -1) break;
    // find '=' after marker
    const eq = s.indexOf('=', idx);
    if (eq === -1) { pos = idx + marker.length; continue; }
    // find opening brace after '='
    const ob = s.indexOf('{', eq);
    if (ob === -1) { pos = eq + 1; continue; }
    // brace match
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
    // also remove trailing semicolon and any whitespace/newlines
    let j = end + 1;
    while (j < s.length && /[\s;]/.test(s[j])) j++;
    s = s.slice(0, idx) + s.slice(j);
    pos = idx; // continue scanning from idx
  }
  return s;
}

html = removeAssignments(html);

// Replace patterns like new window.SearchEngine(window.testData = with new window.SearchEngine(window.testData
html = html.replace(/new\s+window\.SearchEngine\(\s*window\.testData\s*=\s*/g, 'new window.SearchEngine(window.testData = ');
// The above keeps assignment if present; ensure we don't have double equals. Now normalize any "window.testData = ;" remnants
html = html.replace(/window\.testData\s*=\s*;+/g, '');

// If any occurrences like "new window.SearchEngine(window.testData;;" fix to single arg
html = html.replace(/new\s+window\.SearchEngine\(\s*window\.testData;+/g, 'new window.SearchEngine(window.testData');

// Insert deduped data before </body>
const bodyClose = html.lastIndexOf('</body>');
if (bodyClose === -1) {
  console.error('</body> not found in HTML');
  process.exit(2);
}

const injection = '<script>\n' + ded + '\n</script>\n';
const newHtml = html.slice(0, bodyClose) + injection + html.slice(bodyClose);
fs.writeFileSync(htmlOut, newHtml, 'utf8');
console.log('Wrote', htmlOut);
process.exit(0);
