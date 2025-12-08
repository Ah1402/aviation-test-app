/**
 * Generate per-category study reports (Markdown) with all questions, options,
 * correct answer, and explanation. Useful for category-by-category review.
 */
const fs = require('fs');
const path = require('path');

const SRC_PATH = path.join(__dirname, '..', 'src', 'data', 'testData.js');
const OUT_DIR = path.join(__dirname, '..', 'exports', 'category_reports');

function ensureDir(p){ if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true }); }

function extractRootObject(raw) {
  const anchor = raw.indexOf('const testData');
  if (anchor === -1) throw new Error('Could not find testData declaration');
  let i = raw.indexOf('{', anchor);
  if (i === -1) throw new Error('Could not find object start');
  let depth = 0; let start=-1; let end=-1; let inStr=false, q='', prev='';
  for (; i < raw.length; i++){
    const ch = raw[i];
    if (inStr){ if (ch===q && prev!=='\\') { inStr=false; } prev=ch; continue; }
    if (ch==='"' || ch==="'"){ inStr=true; q=ch; prev=ch; continue; }
    if (ch==='{' ){ if (depth===0) start=i; depth++; }
    else if (ch==='}'){ depth--; if (depth===0){ end=i+1; break; } }
    prev=ch;
  }
  if (start<0 || end<0) throw new Error('Failed to balance root object');
  return raw.slice(start, end);
}

function loadTestData(){
  const raw = fs.readFileSync(SRC_PATH, 'utf8');
  const objText = extractRootObject(raw);
  const cleaned = objText.replace(/,(\s*[}\]])/g, '$1');
  let data;
  try { data = Function('return ('+ cleaned + ')')(); } catch(e){ throw new Error('Eval failed: '+e.message); }
  return data;
}

function mdEscape(s){ return String(s||'').replace(/\r?\n|\r/g,' ').replace(/\s+/g,' ').trim(); }

function correctLetter(idx){ return (idx>=0 && idx<26)? String.fromCharCode(65+idx) : ''; }

function buildCategoryMd(catKey, cat){
  const lines = [];
  const title = cat.name || catKey;
  lines.push(`# ${title} (${catKey})`);
  lines.push('');
  let qCount = 0;
  (cat.tests||[]).forEach((t, tIdx)=>{
    const testName = t?.name || `Test ${tIdx+1}`;
    lines.push(`## ${testName}`);
    lines.push('');
    (t.questions||[]).forEach((q, qIdx)=>{
      if (!q) return;
      qCount++;
      const opts = Array.isArray(q.options)? q.options: [];
      const correctIdx = typeof q.correct==='number'? q.correct : -1;
      const correctOpt = (correctIdx>=0 && correctIdx<opts.length)? opts[correctIdx] : '';
      const letter = correctLetter(correctIdx);
      lines.push(`### Q${qIdx+1}. ${mdEscape(q.question)}`);
      lines.push('');
      opts.forEach((o, oi)=>{ lines.push(`- ${correctLetter(oi)}. ${mdEscape(o)}`); });
      lines.push('');
      lines.push(`Answer: ${letter} — ${mdEscape(correctOpt)}`);
      const exp = q.explanation ? mdEscape(q.explanation) : '';
      lines.push(`Explanation: ${exp || '(not provided)'}`);
      lines.push('');
    });
  });
  lines.unshift(`> Total questions in this category: ${(cat.tests||[]).reduce((a,t)=>a+((t.questions||[]).length),0)}`);
  lines.unshift('');
  return lines.join('\n');
}

function main(){
  ensureDir(OUT_DIR);
  const data = loadTestData();
  let total = 0; let files = 0;
  for (const [catKey, cat] of Object.entries(data)){
    if (!cat || !Array.isArray(cat.tests)) continue;
    const md = buildCategoryMd(catKey, cat);
    const outPath = path.join(OUT_DIR, `${catKey.replace(/[^a-z0-9_-]/gi,'_')}.md`);
    fs.writeFileSync(outPath, md, 'utf8');
    const count = (cat.tests||[]).reduce((a,t)=>a+((t.questions||[]).length),0);
    total += count; files++;
    console.log(`Wrote ${count} questions to ${outPath}`);
  }
  console.log(`Done. Categories: ${files}. Total questions: ${total}.`);
}

if (require.main === module){
  try { main(); } catch(e){ console.error('Error:', e); process.exit(1); }
}
