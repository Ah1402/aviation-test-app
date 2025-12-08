const fs = require('fs');

// Mapping parsed categories to testData keys
const CATEGORY_MAPPING = {
  'agk': 'aircraft-general',
  'air_law': 'air-law',
  'aon': 'aon-aviation',
  'flight_planning': 'flight-planning',
  'human_performance': 'human-performance',
  'instrumentation': 'instrumentation',
  'mass_balance': 'mass-balance',
  'meteorology': 'meteorology',
  'general_navigation': 'general-navigation',
  'performance': 'aircraft-performance',
  'principles_of_flight': 'principles-of-flight',
  'operational_procedures': 'operational-procedures',
  'radio_navigation': 'radio-navigation'
};

function norm(str){
  return str.toLowerCase().replace(/\s+/g,' ').replace(/[^a-z0-9 ]/g,'').trim();
}

// Levenshtein distance
function lev(a,b){
  const m=[];for(let i=0;i<=b.length;i++){m[i]=[i];}
  for(let j=0;j<=a.length;j++){m[0][j]=j;}
  for(let i=1;i<=b.length;i++){
    for(let j=1;j<=a.length;j++){
      if(b[i-1]===a[j-1]) m[i][j]=m[i-1][j-1]; else m[i][j]=Math.min(m[i-1][j-1]+1,m[i][j-1]+1,m[i-1][j]+1);
    }
  }
  return m[b.length][a.length];
}
function similarity(a,b){
  if(!a && !b) return 1; const max = Math.max(a.length,b.length); if(!max) return 1; return 1 - lev(a,b)/max;
}

function optionSetSimilarity(optsA, optsB){
  if(!optsA || !optsB || optsA.length!==optsB.length) return 0;
  let total=0; for(let i=0;i<optsA.length;i++){ total+= similarity(norm(optsA[i]), norm(optsB[i])); }
  return total/optsA.length;
}

function loadTestData(){
  const content = fs.readFileSync('src/data/testData.js','utf8');
  const startMatch = content.match(/const testData = /);
  if(!startMatch) throw new Error('testData start not found');
  const startPos = startMatch.index + startMatch[0].length;
  let brace=0,endPos=startPos,inString=false,esc=false,strChar=null;
  for(let i=startPos;i<content.length;i++){
    const ch=content[i];
    if(esc){esc=false;continue;}
    if(ch==='\\'){esc=true;continue;}
    if((ch==='"'||ch==="'")&&!esc){ if(!inString){inString=true;strChar=ch;} else if(ch===strChar){inString=false;strChar=null;} continue; }
    if(inString) continue;
    if(ch==='{' ){brace++;}
    else if(ch==='}'){brace--; if(brace===0){ endPos=i+1; break; }}
  }
  const json = content.substring(startPos,endPos);
  return JSON.parse(json);
}

function main(){
  console.log('Verifying answers against last.htm authoritative parse...');
  const parsed = JSON.parse(fs.readFileSync('tools/parsed_last_htm_final.json','utf8'));
  const testData = loadTestData();

  const mismatches=[]; // {category, testName, testIndex, questionIndex, question, currentCorrect, authoritativeCorrect, similarityScore, optionSimilarity}
  const unmatchedParsed=[];

  // Build lookup per category of all questions
  const categoryQuestionPool={};
  Object.keys(testData).forEach(catKey=>{
    const cat = testData[catKey];
    const pool=[];
    (cat.tests||[]).forEach((t,tIdx)=>{
      (t.questions||[]).forEach((q,qIdx)=>{
        pool.push({catKey, testIndex:tIdx, questionIndex:qIdx, testName:t.name, data:q});
      });
    });
    categoryQuestionPool[catKey]=pool;
  });

  for(const pq of parsed){
    const tdCatKey = CATEGORY_MAPPING[pq.category];
    if(!tdCatKey || !categoryQuestionPool[tdCatKey]){ unmatchedParsed.push(pq); continue; }
    const pool = categoryQuestionPool[tdCatKey];
    let best=null;
    const pqNorm = norm(pq.question);
    for(const candidate of pool){
      const candNorm = norm(candidate.data.question);
      const sim = similarity(pqNorm, candNorm);
      if(sim < 0.7) continue; // ignore weak
      const optSim = optionSetSimilarity(candidate.data.options, pq.options);
      const composite = (sim*0.6) + (optSim*0.4);
      if(!best || composite>best.composite){ best={...candidate, sim, optSim, composite}; }
    }
    if(!best || best.composite < 0.75){ unmatchedParsed.push(pq); continue; }
    const currentCorrect = best.data.correct;
    const authoritativeCorrect = pq.correct;
    if(currentCorrect !== authoritativeCorrect){
      mismatches.push({
        category: tdCatKey,
        testName: best.testName,
        testIndex: best.testIndex,
        questionIndex: best.questionIndex,
        question: best.data.question,
        currentCorrect,
        authoritativeCorrect,
        similarityScore: best.sim.toFixed(3),
        optionSimilarity: best.optSim.toFixed(3),
        composite: best.composite.toFixed(3),
        options: best.data.options
      });
    }
  }

  // Group mismatches by category/test
  const grouped={};
  mismatches.forEach(m=>{
    const key = m.category+'||'+m.testName;
    if(!grouped[key]) grouped[key]=[];
    grouped[key].push(m);
  });

  // Sort groups by count desc
  const summary = Object.keys(grouped).map(k=>({key:k, count: grouped[k].length})).sort((a,b)=>b.count-a.count);

  console.log('\n=== MISMATCH SUMMARY ===');
  if(summary.length===0){
    console.log('No answer mismatches detected at current thresholds.');
  } else {
    summary.slice(0,25).forEach(s=>{
      const [cat,testName]=s.key.split('||');
      console.log(`${cat} / ${testName}: ${s.count} suspect answers`);
    });
    if(summary.length>25) console.log(`... ${summary.length-25} more groups.`);
  }

  console.log(`\nTotal mismatches: ${mismatches.length}`);
  console.log(`Parsed questions unmatched (low similarity or new): ${unmatchedParsed.length}`);

  // Save detailed report
  const report = { generatedAt: new Date().toISOString(), mismatches, unmatchedParsedCount: unmatchedParsed.length, thresholds:{questionSimilarityMin:0.7, compositeMin:0.75}, groups: summary };
  fs.writeFileSync('tools/answer_verification_report.json', JSON.stringify(report,null,2));
  console.log('\nReport written to tools/answer_verification_report.json');

  // Provide quick fix script suggestion
  const autoFixCount = mismatches.length;
  console.log(`\nRun auto-fix (to apply authoritative answers) by executing: node tools/apply_verified_fixes.js`);
  // Generate auto-fix script separately if not exists
  if(!fs.existsSync('tools/apply_verified_fixes.js')){
    fs.writeFileSync('tools/apply_verified_fixes.js', `const fs=require('fs');\n${loadTestData.toString()}\nconst report=JSON.parse(fs.readFileSync('tools/answer_verification_report.json','utf8'));\nconst td=loadTestData();\nconst backup='testData_backup_autofix_'+new Date().toISOString().replace(/[:.]/g,'-')+'.js';\nconst original=fs.readFileSync('src/data/testData.js','utf8');\nfs.writeFileSync(backup, original);\nlet applied=0;\nreport.mismatches.forEach(m=>{ const q=td[m.category].tests[m.testIndex].questions[m.questionIndex]; if(q){ q.correct=m.authoritativeCorrect; applied++; }});\nconst startMatch=original.match(/const testData = /);\nlet startPos=startMatch.index+startMatch[0].length,brace=0,endPos=startPos,inString=false,esc=false,strChar=null;\nfor(let i=startPos;i<original.length;i++){const ch=original[i]; if(esc){esc=false;continue;} if(ch==='\\'){esc=true;continue;} if((ch==='"'||ch==="'")&&!esc){ if(!inString){inString=true;strChar=ch;} else if(ch===strChar){inString=false;strChar=null;} continue;} if(inString) continue; if(ch==='{' ) brace++; else if(ch==='}'){brace--; if(brace===0){ endPos=i+1; break; }} }\nconst header=original.substring(0,startMatch.index); const footer=original.substring(endPos); const newJson=JSON.stringify(td,null,2); const newContent= header+ 'const testData = '+newJson+';\\n\\nexport default testData'; fs.writeFileSync('src/data/testData.js', newContent);\nconsole.log('Auto-fix applied answers:', applied); console.log('Backup saved to', backup);`);
    console.log('Auto-fix script created: tools/apply_verified_fixes.js');
  }
}

main();
