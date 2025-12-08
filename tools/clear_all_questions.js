/**
 * Clear all questions from the dataset while preserving category and test structure.
 * Makes a timestamped backup of the original file.
 */
const fs = require('fs');
const path = require('path');

const DATA_PATH = path.resolve(__dirname, '..', 'dist', 'portable_build', 'www', 'src', 'data', 'testData.js');

function extractRootObject(raw) {
  const anchor = raw.indexOf('const testData');
  if (anchor === -1) throw new Error('testData declaration not found');
  let i = raw.indexOf('{', anchor);
  if (i === -1) throw new Error('Opening brace not found');
  let depth = 0, start = -1, end = -1; let inStr=false, q=''; let prev='';
  for (; i < raw.length; i++) {
    const ch = raw[i];
    if (inStr) { if (ch === q && prev !== '\\') { inStr=false; } prev=ch; continue; }
    if (ch === '"' || ch === "'") { inStr=true; q=ch; prev=ch; continue; }
    if (ch === '{') { if (depth===0) start=i; depth++; }
    else if (ch === '}') { depth--; if (depth===0){ end=i+1; break; } }
    prev=ch;
  }
  if (start === -1 || end === -1) throw new Error('Failed to bracket object');
  return { slice: raw.slice(start, end), start, end };
}

function parseObject(text){
  const cleaned = text.replace(/,(\s*[}\]])/g, '$1');
  // eslint-disable-next-line no-new-func
  return Function('return ('+ cleaned + ')')();
}

function main(){
  const raw = fs.readFileSync(DATA_PATH,'utf8');
  const { slice, start, end } = extractRootObject(raw);
  const data = parseObject(slice);

  let categories=0, tests=0, questions=0;
  for (const k of Object.keys(data)){
    const cat = data[k];
    categories++;
    if (!Array.isArray(cat.tests)) continue;
    cat.tests.forEach(t => {
      tests++;
      questions += (t.questions?.length || 0);
      t.questions = [];
    });
  }

  const backupPath = path.resolve(path.dirname(DATA_PATH), `testData.cleared_backup_${Date.now()}.js`);
  fs.writeFileSync(backupPath, raw, 'utf8');

  const newRaw = raw.slice(0, start) + JSON.stringify(data, null, 2) + raw.slice(end);
  fs.writeFileSync(DATA_PATH, newRaw, 'utf8');

  console.log(`Cleared questions. Categories: ${categories}, Tests: ${tests}, Questions removed: ${questions}.`);
  console.log('Backup saved to:', backupPath);
}

if (require.main === module){
  try { main(); } catch (e) { console.error('Error:', e); process.exit(1); }
}
