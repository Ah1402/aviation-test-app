const fs = require('fs');
const s = fs.readFileSync('index.html','utf8');
const start = s.indexOf('window.testData = ');
if (start === -1) { console.log('no testData'); process.exit(1); }
const b = s.indexOf('{', start);
const e = s.indexOf('};', b);
console.log('end index', e);
console.log('after end (200 chars):');
console.log(s.slice(e, e+200));

// find occurrences of ')' around region
let arr = [];
for (let i = Math.max(b-200,0); i < Math.min(e+500, s.length); i++) {
  if (s[i] === ')') arr.push({pos:i, ctx: s.slice(Math.max(b,i-40), Math.min(i+40, s.length))});
}
console.log(') occurrences near region:', arr.length);
if (arr.length) console.log(arr.slice(0,10));
