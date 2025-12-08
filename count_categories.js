const fs = require('fs');
const path = require('path');
const src = path.join(__dirname, '252.js');
let s = fs.readFileSync(src, 'utf8');
// Convert ESM export to CommonJS so we can require it safely
s = s.replace(/export\s+const\s+consolidatedQuestionBank\s*=\s*/, 'module.exports = ');
const tmp = path.join(__dirname, '_252_cjs.js');
fs.writeFileSync(tmp, s, 'utf8');
try {
  const data = require(tmp);
  const counts = {};
  let total = 0;
  for (const q of data) {
    const cat = q && (q.category || '(no category)');
    counts[cat] = (counts[cat] || 0) + 1;
    total++;
  }
  const sorted = Object.entries(counts).sort((a,b)=>b[1]-a[1]);
  console.log(JSON.stringify({ total, counts: Object.fromEntries(sorted) }, null, 2));
} catch (err) {
  console.error('Error loading _252_cjs.js:', err && err.stack || err);
  process.exit(1);
}
