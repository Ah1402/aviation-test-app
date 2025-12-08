// Parse downloaded FAA PDFs into candidate MCQs.
// Heuristic approach: extract headings / key terms and build definition questions.
// Usage: node tools/parse_sources_to_mcq.js
// Output: data/fetched_mcq_raw.json

const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

const ROOT = path.resolve(__dirname, '..');
const SOURCES_JSON = path.join(__dirname, 'question_sources.json');
const SRC_DIR = path.join(ROOT, 'data', 'sources');
const OUT_FILE = path.join(ROOT, 'data', 'fetched_mcq_raw.json');

function loadSources(){ return JSON.parse(fs.readFileSync(SOURCES_JSON,'utf8')); }

async function extractText(pdfPath){
  const data = fs.readFileSync(pdfPath);
  const parsed = await pdfParse(data);
  return parsed.text;
}

function findCandidateLines(text){
  // Split by lines and keep those that look like headings or definitions.
  const lines = text.split(/\r?\n/).map(l=>l.trim()).filter(l=>l.length>0);
  return lines.filter(l=> /^(Chapter|FIGURE|Table)/i.test(l) === false );
}

function buildQuestionsFromLines(lines, sourceId){
  // Pick lines with 3-12 words that start with uppercase letter and contain no colon.
  const termLines = lines.filter(l=>/^[A-Z][A-Za-z0-9 \-]{2,}$/ .test(l) && !/:/.test(l) && l.split(/\s+/).length<=12);
  const uniqueTerms = Array.from(new Set(termLines)).slice(0, 150); // cap per source to avoid explosion
  const distractorPool = uniqueTerms;
  const questions = [];
  for(const term of uniqueTerms){
    // Find a definition line nearby (within next 25 lines)
    const idx = lines.indexOf(term);
    let definition = '';
    for(let i=idx+1;i<Math.min(lines.length, idx+25);i++){
      const ln = lines[i];
      if(ln.length > 30 && /[a-z]/.test(ln)) { definition = ln; break; }
    }
    if(!definition) continue;
    // Create distractors by choosing other random terms
    const shuffled = distractorPool.filter(d=>d!==term).sort(()=>Math.random()-0.5).slice(0,3);
    if(shuffled.length < 3) continue;
    const options = [definition, ...shuffled.map(d=> 'Definition or concept related to '+d.toLowerCase())];
    // Shuffle options and track correct index
    const labeled = options.map(o=>({ text: o }));
    const correctIndex = 0; // definition currently first before shuffle
    // We'll reorder to A-D but keep track
    const finalOptions = labeled.sort(()=>Math.random()-0.5);
    const newCorrect = finalOptions.findIndex(o=>o.text===definition);
    questions.push({
      sourceId,
      stem: 'What best describes: '+term+'?',
      options: finalOptions.map(o=>o.text),
      correct: newCorrect,
      explanation: 'Derived from '+sourceId+' near term "'+term+'".',
      generated: true,
      term
    });
  }
  return questions;
}

async function main(){
  const sources = loadSources();
  let all = [];
  for(const src of sources){
    const pdfPath = path.join(SRC_DIR, src.id + '.pdf');
    if(!fs.existsSync(pdfPath)) { console.warn('Skip (missing):', src.id); continue; }
    console.log('Parsing', src.id);
    const text = await extractText(pdfPath);
    const lines = findCandidateLines(text);
    const qs = buildQuestionsFromLines(lines, src.id);
    console.log('Generated', qs.length, 'questions from', src.id);
    all = all.concat(qs);
  }
  fs.writeFileSync(OUT_FILE, JSON.stringify({ generatedAt: new Date().toISOString(), count: all.length, questions: all }, null, 2));
  console.log('Written', OUT_FILE);
}

if(require.main === module){
  main().catch(e=>{ console.error('Fatal:', e); process.exit(1); });
}
