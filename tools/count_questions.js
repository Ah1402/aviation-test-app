const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'STANDALONE_GENERATED_with_last403.html');
const txt = fs.readFileSync(file, 'utf8');
function countInSection(startKey, endKey) {
  const start = txt.indexOf(`"${startKey}":`);
  if (start === -1) return 0;
  let end = txt.length;
  if (endKey) {
    const idx = txt.indexOf(`"${endKey}":`, start + 1);
    if (idx !== -1) end = idx;
  }
  const section = txt.slice(start, end);
  const matches = section.match(/"question":/g);
  return matches ? matches.length : 0;
}
const ag = countInSection('aircraft_general', 'air_law');
const al = countInSection('air_law', 'aon_aviation');
const aa = countInSection('aon_aviation', null);
const total = ag + al + aa;
console.log('counts:', { aircraft_general: ag, air_law: al, aon_aviation: aa, total });
if (total !== 264) {
  console.warn('Warning: total != 264');
  process.exitCode = 2;
}
