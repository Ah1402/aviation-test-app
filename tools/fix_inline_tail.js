const fs = require('fs');
const path = require('path');
const p = path.resolve(__dirname, '..', 'testData_complete.fixed.cleaned.inline.js');
const out = path.resolve(__dirname, '..', 'testData_complete.fixed.cleaned.inline.fixed.js');
let s = fs.readFileSync(p, 'utf8');
s = s.replace(/}\;&\s*$/m, '};\n');
fs.writeFileSync(out, s, 'utf8');
console.log('Wrote', out);