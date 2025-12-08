// Merge fetched MCQs into testData.js structure under a new test "Internet Generated" per category.
// Usage: node tools/merge_fetched_questions.js

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA_PATH = path.resolve(__dirname, '..', 'dist', 'portable_build', 'www', 'src', 'data', 'testData.js');
const FETCHED_PATH = path.join(ROOT, 'data', 'fetched_mcq_raw.json');

function loadCurrent(){
  const content = fs.readFileSync(DATA_PATH,'utf8');
  const anchor = content.indexOf('const testData =');
  if(anchor === -1) throw new Error('testData anchor not found');
  const jsonStart = content.indexOf('{', anchor);
  let brace=0,end=-1,inString=false,strChar=null,esc=false;
  for(let i=jsonStart;i<content.length;i++){
    const ch=content[i];
    if(esc){esc=false;continue;}
    if(ch==='\\'){esc=true;continue;}
    if(inString){ if(ch===strChar) inString=false; continue; }
    if(ch==='"' || ch==='\''){ inString=true; strChar=ch; continue; }
    if(ch==='{' ) brace++; else if(ch==='}'){ brace--; if(brace===0){ end=i+1; break; } }
  }
  const json = content.substring(jsonStart, end);
  const data = eval('('+json+')');
  return { data, content, jsonStart, end };
}

function backupOriginal(original){
  const backupName = 'testData_backup_internet_'+new Date().toISOString().replace(/[:.]/g,'-')+'.js';
  fs.writeFileSync(path.join(path.dirname(DATA_PATH), backupName), original);
  console.log('Backup saved:', backupName);
}

function main(){
  if(!fs.existsSync(FETCHED_PATH)) throw new Error('fetched_mcq_raw.json missing, run parse_sources_to_mcq first');
  const fetched = JSON.parse(fs.readFileSync(FETCHED_PATH,'utf8'));
  const { data, content, jsonStart, end } = loadCurrent();
  if(!Array.isArray(fetched.questions) || !fetched.questions.length){
    console.log('No fetched questions to merge.');
    return;
  }
  // Map categories by name for quick access
  const catMap = {};
  data.forEach((c,i)=>{ catMap[c.category] = { idx:i, obj:c }; });

  // Simple categorization heuristic based on sourceId and term keywords
  function classify(q){
    const t = q.term.toLowerCase();
    if(/instrument|attitude|heading|altimeter|gyroscope/.test(t)) return 'Instrumentation';
    if(/nav|vor|ils|dme|adf|gps/.test(t)) return 'Radio Navigation';
    if(/weather|cloud|front|icing|wind|pressure|temperature/.test(t)) return 'Meteorology';
    if(/lift|drag|stall|aerofoil|angle of attack|airspeed/.test(t)) return 'Principles of Flight';
    if(/weight|balance|cg|center of gravity|mass/.test(t)) return 'Mass & Balance';
    if(/performance|takeoff|landing distance|climb/.test(t)) return 'Performance';
    if(/fatigue|hypoxia|stress|illusion|vision/.test(t)) return 'Human Performance';
    if(/law|regulation|rule|certificate|rating/.test(t)) return 'Air Law';
    if(/aircraft|structure|system|engine|fuselage|wing/.test(t)) return 'Aircraft General Knowledge';
    return 'General Navigation';
  }

  const bucketed = {};
  fetched.questions.forEach(q=>{
    const cat = classify(q);
    if(!bucketed[cat]) bucketed[cat] = [];
    bucketed[cat].push(q);
  });

  Object.entries(bucketed).forEach(([cat, qs])=>{
    const catEntry = catMap[cat];
    if(!catEntry){ console.warn('Category not found in testData:', cat); return; }
    // Find or create test
    let test = catEntry.obj.tests.find(t=>t.name==='Internet Generated');
    if(!test){
      test = { name: 'Internet Generated', questions: [] };
      catEntry.obj.tests.push(test);
    }
    const startLen = test.questions.length;
    qs.forEach(q=>{
      test.questions.push({
        question: q.stem,
        A: q.options[0],
        B: q.options[1],
        C: q.options[2],
        D: q.options[3],
        correct: q.correct,
        explanation: q.explanation,
        sourceRefs: [q.sourceId],
        internetGenerated: true
      });
    });
    console.log(`Category ${cat}: added ${test.questions.length - startLen} questions (total now ${test.questions.length}).`);
  });

  const newJson = JSON.stringify(data, null, 2);
  const header = content.substring(0, jsonStart);
  const footer = content.substring(end);
  backupOriginal(content);
  fs.writeFileSync(DATA_PATH, header + newJson + footer);
  console.log('Merged fetched questions.');
}

if(require.main === module){
  try { main(); } catch(e){ console.error('Fatal:', e); process.exit(1); }
}
