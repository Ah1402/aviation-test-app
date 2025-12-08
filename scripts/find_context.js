const fs = require('fs');
const path = require('path');
const targetArg = process.argv[2];
const f = targetArg ? path.resolve(process.cwd(), targetArg) : path.join(__dirname,'..','testData_complete.dedup.js');
const txt = fs.readFileSync(f,'utf8');
let pos = 0;
let found = 0;
while ((pos = txt.indexOf('"id"', pos)) !== -1) {
  const idx = txt.indexOf(':', pos);
  const near = txt.slice(Math.max(0,pos-400), Math.min(txt.length, pos+800));
  if (/"id"\s*:\s*1498/.test(near)) {
    console.log('---MATCH at', pos, '---');
    console.log(near);
    console.log('\n---snippet end---\n');
    found++;
  }
  pos = pos + 1;
}
console.log('Found matches:', found);
