const fs = require('fs');
const path = require('path');

const root = path.join(__dirname,'..');
const inPath = path.join(root,'testData_complete.dedup.js');
const outPath = path.join(root,'testData_complete.cleaned2.js');
let txt = fs.readFileSync(inPath,'utf8');

let changes = 0;
let pos = 0;
while (true) {
  const optIdx = txt.indexOf('"options"', pos);
  if (optIdx === -1) break;
  const arrStart = txt.indexOf('[', optIdx);
  if (arrStart === -1) break;
  // find end of this array by bracket matching
  let i = arrStart;
  let depth = 0;
  let arrEnd = -1;
  for (; i < txt.length; i++) {
    const ch = txt[i];
    if (ch === '[') depth++;
    else if (ch === ']') { depth--; if (depth === 0) { arrEnd = i; break; } }
  }
  if (arrEnd === -1) break;
  const arrText = txt.slice(arrStart, arrEnd+1);
  // look inside for object literals that contain "question" key
  let objPos = 0;
  let localChanged = 0;
  while (true) {
    const objIdx = arrText.indexOf('{', objPos);
    if (objIdx === -1) break;
    // find matching closing brace for this object
    let j = objIdx;
    let d = 0;
    let objEnd = -1;
    for (; j < arrText.length; j++) {
      const ch2 = arrText[j];
      if (ch2 === '{') d++;
      else if (ch2 === '}') { d--; if (d === 0) { objEnd = j; break; } }
    }
    if (objEnd === -1) break;
    const candidate = arrText.slice(objIdx, objEnd+1);
    if (/"question"\s*:/.test(candidate)) {
      // remove candidate from the original txt (calculate absolute positions)
      const absStart = arrStart + objIdx;
      const absEnd = arrStart + objEnd + 1;
      // also remove trailing comma or leading comma appropriately
      // remove any spaces/newlines after absEnd
      let remStart = absStart;
      let remEnd = absEnd;
      // remove a trailing comma if present
      let k = remEnd;
      while (k < txt.length && /[\s\n\r]/.test(txt[k])) k++;
      if (txt[k] === ',') remEnd = k+1;
      else {
        // try to remove a preceding comma
        let p = remStart-1;
        while (p >= 0 && /[\s\n\r]/.test(txt[p])) p--;
        if (txt[p] === ',') remStart = p;
      }
      txt = txt.slice(0, remStart) + txt.slice(remEnd);
      changes++;
      localChanged++;
      // restart scanning this array since length changed
      break;
    } else {
      objPos = objEnd + 1;
    }
  }
  // move pos past this array (or restart if changed)
  if (localChanged === 0) pos = arrEnd + 1;
  else pos = Math.max(0, optIdx - 10);
}

fs.writeFileSync(outPath, txt, 'utf8');
console.log('Wrote', outPath);
console.log('Removed embedded question-like objects from options:', changes);
