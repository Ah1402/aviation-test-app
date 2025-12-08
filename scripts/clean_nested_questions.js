const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname,'..');
const dedupPath = path.join(root, 'testData_complete.dedup.js');
const outPath = path.join(root, 'testData_complete.cleaned.js');

const txt = fs.readFileSync(dedupPath,'utf8');
// extract RHS object by finding first '{' after '='
const idx = txt.indexOf('=');
const start = txt.indexOf('{', idx);
let i = start, depth = 0, end = -1;
for (; i < txt.length; i++){
  if (txt[i] === '{') depth++;
  else if (txt[i] === '}') { depth--; if (depth === 0) { end = i; break; } }
}
if (end === -1) { console.error('Could not find object bounds'); process.exit(2); }
const objText = txt.slice(start, end+1);
let data;
try { data = JSON.parse(objText); }
catch(e){ try { data = vm.runInNewContext('(' + objText + ')'); } catch(e2){ console.error('Parse failed', e2.message); process.exit(3);} }

const seen = new Set();
let removedNested = 0;
let removedDup = 0;

function isQuestionLike(o){
  return o && typeof o === 'object' && ('question' in o) && ('id' in o) && ('options' in o);
}

function walk(parent, key, node){
  if (Array.isArray(node)){
    // iterate backwards to allow splice
    for (let i = node.length-1; i >=0; i--) {
      const child = node[i];
      if (isQuestionLike(child)){
        if (key !== 'questions'){
          node.splice(i,1);
          removedNested++;
          continue;
        }
        const qid = child.id;
        if (seen.has(qid)) { node.splice(i,1); removedDup++; continue; }
        seen.add(qid);
      } else if (child && typeof child === 'object'){
        // pass the array's property key down so elements know their parent array name
        walk(node, key, child);
      }
    }
  } else if (node && typeof node === 'object'){
    for (const k of Object.keys(node)){
      walk(node, k, node[k]);
    }
  }
}

walk(null, null, data);

const outText = 'window.testData = ' + JSON.stringify(data, null, 2) + ';\n';
fs.writeFileSync(outPath, outText, 'utf8');
console.log('Wrote', outPath);
console.log('Removed nested question-like objects:', removedNested);
console.log('Removed duplicate questions while cleaning (extra):', removedDup);
console.log('Unique question ids kept:', seen.size);
