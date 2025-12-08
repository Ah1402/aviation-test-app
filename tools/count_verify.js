const fs = require('fs');
const path = require('path');
const tdSrc = path.join(__dirname, '..', 'testData_complete.js');
let s = fs.readFileSync(tdSrc, 'utf8');
// convert to module export
s = s.replace(/^window\.testData\s*=\s*/, 'module.exports = ');
const tmp = path.join(__dirname, '_tmp_testdata.js');
fs.writeFileSync(tmp, s, 'utf8');
const data = require(tmp);
const html = fs.readFileSync(path.join(__dirname, '..', 'STANDALONE.html'), 'utf8');
const attrs = [];
const re = /data-category="([^"]+)"/g;
let m;
while ((m = re.exec(html)) !== null) attrs.push(m[1]);

function slugify(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const dataKeyBySlug = {};
Object.keys(data).forEach(k => {
  dataKeyBySlug[slugify(k)] = k;
  const name = (data[k] && data[k].name) || '';
  if (name) dataKeyBySlug[slugify(name)] = k;
});

function findMatch(raw) {
  const keyCandidate = raw;
  if (Object.prototype.hasOwnProperty.call(data, keyCandidate)) return keyCandidate;
  const s = slugify(raw);
  if (s && dataKeyBySlug[s]) return dataKeyBySlug[s];
  for (const dk of Object.keys(data)) {
    if (dk.indexOf(raw) !== -1 || raw.indexOf(dk) !== -1) return dk;
    const name = (data[dk] && data[dk].name || '').toLowerCase();
    if (name && name.indexOf(raw.toLowerCase()) !== -1) return dk;
  }
  return null;
}

const results = {};
for (const a of attrs) {
  const mkey = findMatch(a);
  const q = mkey ? (Object.values(data[mkey].tests || {}).reduce((acc,t)=>acc + ((t.questions||[]).length || 0), 0)) : 0;
  const t = mkey ? (Array.isArray(data[mkey].tests) ? data[mkey].tests.length : 0) : 0;
  results[a] = { match: mkey, tests: t, questions: q };
}

console.log(JSON.stringify({ totalKeys: Object.keys(data).length, sampleAttrs: attrs.slice(0,30), results }, null, 2));
