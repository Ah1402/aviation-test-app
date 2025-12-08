const fs = require('fs');
const path = require('path');
const tdPath = path.resolve(__dirname, '..', 'testData_complete.fixed.cleaned.inline.fixed.js');
const shPath = path.resolve(__dirname, '..', 'index_shareable.html');
const outMissing = path.resolve(__dirname, '..', 'missing_in_shareable.txt');
const outExtra = path.resolve(__dirname, '..', 'extra_in_shareable.txt');

function extractIds(text){
  const re = /"id"\s*:\s*(\d+)/g;
  const s = new Set();
  let m;
  while((m = re.exec(text))){
    s.add(m[1]);
  }
  return Array.from(s).map(Number).sort((a,b)=>a-b);
}

try{
  const td = fs.readFileSync(tdPath,'utf8');
  const sh = fs.readFileSync(shPath,'utf8');
  const tdIds = extractIds(td);
  const shIds = extractIds(sh);
  const tdSet = new Set(tdIds.map(String));
  const shSet = new Set(shIds.map(String));
  const missing = tdIds.filter(id => !shSet.has(String(id)));
  const extra = shIds.filter(id => !tdSet.has(String(id)));
  fs.writeFileSync(outMissing, missing.join('\n'), 'utf8');
  fs.writeFileSync(outExtra, extra.join('\n'), 'utf8');
  console.log('TD IDs:', tdIds.length);
  console.log('Shareable IDs:', shIds.length);
  console.log('Missing in shareable:', missing.length);
  console.log('Extra in shareable:', extra.length);
  if(missing.length>0){
    console.log('First 50 missing IDs:', missing.slice(0,50).join(', '));
  }
  if(extra.length>0){
    console.log('First 50 extra IDs:', extra.slice(0,50).join(', '));
  }
  process.exit(0);
} catch (e){
  console.error('Error', e);
  process.exit(2);
}
