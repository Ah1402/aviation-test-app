const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const file252 = path.join(root, '252.js');
const fileTest = path.join(root, 'testData_complete.js');
const outDiff = path.join(root, '252_vs_testdata_diffs.json');

function read(p){ return fs.readFileSync(p, 'utf8'); }
function write(p,d){ fs.writeFileSync(p,d,'utf8'); }

function extractBank(code){
  const marker = 'consolidatedQuestionBank';
  const idx = code.indexOf(marker);
  if (idx === -1) throw new Error('marker not found');
  const eqIdx = code.indexOf('=', idx);
  const arrStart = code.indexOf('[', eqIdx);
  let i = arrStart; let depth = 0; let inString = false; let sc='';
  while(i<code.length){
    const ch = code[i];
    if (inString){ if (ch==='\\') { i+=2; continue; } if (ch===sc) inString=false; i++; continue; }
    if (ch==='"' || ch==="'"){ inString=true; sc=ch; i++; continue; }
    if (ch==='[') depth++; else if (ch===']'){ depth--; if (depth===0){ i++; break; } }
    i++; }
  const arrayText = code.slice(arrStart, i);
  const sb = {}; vm.runInNewContext('consolidatedQuestionBank=' + arrayText + ';', sb);
  return sb.consolidatedQuestionBank;
}

try{
  const code252 = read(file252);
  const bank = extractBank(code252);

  const codeTest = read(fileTest);
  const sbt = { window: {} };
  vm.runInNewContext(codeTest + '\n', sbt);
  const testData = sbt.window.testData;

  const byId = new Map();
  Object.keys(testData).forEach(catKey=>{
    const cat = testData[catKey];
    if (!cat || !Array.isArray(cat.tests)) return;
    cat.tests.forEach(test=>{
      if (!test || !Array.isArray(test.questions)) return;
      test.questions.forEach(q=>{ if (q && typeof q.id!=='undefined') byId.set(Number(q.id), q); });
    });
  });

  const mode = process.argv[2] || 'strict';

  function normalize(s){ return (''+ (s||'')).replace(/\s+/g,' ').trim(); }

  function normForCompare(s){ return normalize(s).toLowerCase().replace(/[\W_]+/g,' '); }

  function levenshtein(a,b){
    a = ''+a; b = ''+b; if (!a.length) return b.length; if (!b.length) return a.length;
    const m = a.length, n = b.length; const d = Array(m+1).fill(null).map(()=>Array(n+1).fill(0));
    for(let i=0;i<=m;i++) d[i][0]=i; for(let j=0;j<=n;j++) d[0][j]=j;
    for(let i=1;i<=m;i++){
      for(let j=1;j<=n;j++){
        const cost = a[i-1]===b[j-1] ? 0 : 1;
        d[i][j] = Math.min(d[i-1][j]+1, d[i][j-1]+1, d[i-1][j-1]+cost);
      }
    }
    return d[m][n];
  }

  function similarityRatio(a,b){
    a = ''+a; b = ''+b; const len = Math.max(a.length, b.length); if (len===0) return 1;
    const dist = levenshtein(a,b); return 1 - (dist/len);
  }

  const diffs = [];
  for (const q of bank){
    const id = Number(q.id);
    const td = byId.get(id);
    if (!td){ diffs.push({ id, type: 'missing_in_testData', q252: q }); continue; }

    const issues = [];
    const q252text = normalize(q.question);
    const tdtext = normalize(td.question);
    if (mode === 'strict'){
      if (q252text !== tdtext) issues.push({ field:'question', left: q252text, right: tdtext });
    }else{
      const qn = normForCompare(q252text), tn = normForCompare(tdtext);
      const sim = similarityRatio(qn, tn);
      if (sim < 0.90) issues.push({ field:'question.similarity', left: q252text, right: tdtext, similarity: Number(sim.toFixed(3)) });
    }

    const opts252 = Array.isArray(q.options) ? q.options.map(s=>normalize(s)) : [];
    const optstd = Array.isArray(td.options) ? td.options.map(s=>normalize(s)) : [];
    if (opts252.length !== optstd.length) issues.push({ field:'options.length', left:opts252.length, right:optstd.length });
    else{
      for (let i=0;i<opts252.length;i++){
        if (mode === 'strict'){
          if (opts252[i] !== optstd[i]) issues.push({ field:`option[${i}]`, left: opts252[i], right: optstd[i] });
        }else{
          const sim = similarityRatio(normForCompare(opts252[i]), normForCompare(optstd[i]));
          if (sim < 0.90) issues.push({ field:`option[${i}].similarity`, left: opts252[i], right: optstd[i], similarity: Number(sim.toFixed(3)) });
        }
      }
    }

    const a252 = normalize(q.answer);
    const atd = normalize(td.answer);
    if (mode === 'strict'){
      if (a252 !== atd) issues.push({ field:'answer', left:a252, right:atd });
    }else{
      const sim = similarityRatio(normForCompare(a252), normForCompare(atd));
      if (sim < 0.90) issues.push({ field:'answer.similarity', left:a252, right:atd, similarity: Number(sim.toFixed(3)) });
    }

    if (issues.length) diffs.push({ id, issues });
  }

  write(outDiff, JSON.stringify({ diffs, count: diffs.length }, null, 2));
  console.log('Comparison done. Diffs written to', outDiff, 'diff count=', diffs.length);

}catch(err){ console.error('Compare failed:', err && err.stack || err); process.exit(1); }
