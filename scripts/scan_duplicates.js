const fs = require('fs');
const path = require('path');
const file = process.argv[2];
if (!file) { console.error('Usage: node scan_duplicates.js <file>'); process.exit(2); }
const txt = fs.readFileSync(file, 'utf8');
const re = /"id"\s*:\s*(\d+)/g;
let m;
const counts = new Map();
let total = 0;
while ((m = re.exec(txt)) !== null) {
  total++;
  const id = Number(m[1]);
  counts.set(id, (counts.get(id) || 0) + 1);
}
let uniques = 0;
let duplicates = [];
for (const [id, c] of counts.entries()) {
  uniques++;
  if (c > 1) duplicates.push({id,c});
}
duplicates.sort((a,b)=>b.c-a.c);
console.log('File:', file);
console.log('Total id occurrences:', total);
console.log('Unique ids:', uniques);
console.log('Duplicate count (unique ids with >1):', duplicates.length);
if (duplicates.length) console.log('Top duplicates:', duplicates.slice(0,20));
process.exit(0);
