const fs = require('fs');
const path = require('path');
const file = process.argv[2];
const id = process.argv[3];
if (!file || !id) { console.error('Usage: node find_id_occurrences.js <file> <id>'); process.exit(2); }
const s = fs.readFileSync(file, 'utf8');
const re = new RegExp('"id"\\s*:\\s*' + id, 'g');
let m, count = 0;
while ((m = re.exec(s)) !== null) {
  count++;
  console.log('--- Occurrence #' + count + ' at index', m.index);
  console.log(s.slice(Math.max(0, m.index - 120), m.index + 120));
}
console.log('Total matches:', count);
