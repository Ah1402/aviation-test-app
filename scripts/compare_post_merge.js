const fs = require('fs');
const src = JSON.parse(fs.readFileSync('tmp_137_parsed.json','utf8'));
const tgt = JSON.parse(fs.readFileSync('testData_complete.js','utf8').replace(/^\s*window\.testData\s*=\s*/,'').trim().replace(/;$/,''));
function norm(s){ return (s||'').replace(/\s+/g,' ').trim().toLowerCase(); }
function optsKey(opts){ if(!Array.isArray(opts)) return JSON.stringify(opts); return opts.map(o=>norm(o)).join('|'); }
const tgtIndex = new Map();
Object.keys(tgt).forEach(catKey=>{
  (tgt[catKey].tests||[]).forEach(test=>{
    (test.questions||[]).forEach(q=>{
      const key = norm(q.question);
      if(!tgtIndex.has(key)) tgtIndex.set(key, []);
      tgtIndex.get(key).push({catKey, testId:test.id, q});
    });
  });
});
let missing = [], mismatched = [], matched = 0;
Object.keys(src).forEach(catKey=>{
  const cat = src[catKey];
  (cat.tests||[]).forEach(test=>{
    (test.questions||[]).forEach(q=>{
      const key = norm(q.question);
      const candidates = tgtIndex.get(key) || [];
      if(candidates.length === 0){ missing.push({cat:catKey,test:test.id,id:q.id,question:q.question}); }
      else {
        const found = candidates.find(c=> optsKey(c.q.options) === optsKey(q.options));
        if(!found) {
          mismatched.push({src:q.question, candidates: candidates.map(c=>({cat:c.catKey,testId:c.testId,id:c.q.id}))});
        } else {
          const tgtq = found.q; const diffs=[];
          if(JSON.stringify(tgtq.options)!==JSON.stringify(q.options)) diffs.push('options');
          if((tgtq.correct!==q.correct) && !(String(tgtq.correct)===String(q.correct))) diffs.push('correct');
          if((tgtq.answer||'')!==(q.answer||'')) diffs.push('answer');
          if((tgtq.explanation||'')!==(q.explanation||'')) diffs.push('explanation');
          if(diffs.length>0) mismatched.push({question:q.question,diffs,dstId:tgtq.id}); else matched++;
        }
      }
    });
  });
});
const report = { srcTotal: Object.keys(src).reduce((sum,cat)=> sum + ((src[cat].tests||[]).reduce((s,t)=> s + (t.questions?t.questions.length:0),0)),0), tgtTotal: Object.keys(tgt).reduce((sum,cat)=> sum + ((tgt[cat].tests||[]).reduce((s,t)=> s + (t.questions?t.questions.length:0),0)),0), matched, missingCount: missing.length, mismatchedCount: mismatched.length, missing, mismatched };
fs.writeFileSync('compare_post_merge.json', JSON.stringify(report,null,2));
console.log('Compare post-merge -> compare_post_merge.json ; srcTotal', report.srcTotal, 'tgtTotal', report.tgtTotal, 'matched', matched, 'missing', missing.length, 'mismatched', mismatched.length);
