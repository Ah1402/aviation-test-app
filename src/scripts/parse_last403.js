// Parser for last403.html extracting all supported categories with heading context
// Supports two patterns:
// 1) <details><summary class="question-text">..</summary> .. <div class="correct-answer">Correct Answer: X</div> .. <div class="explanation">..</div>
// 2) <div class="question"><p>n. text</p><ol><li>..</li>..</ol><div class="correct-answer">Correct Answer: X. tail</div></div>
// Outputs a JS file with window.addedImports pushes per category
// Usage: node src/scripts/parse_last403.js

const fs = require('fs');
const path = require('path');

const SRC = path.resolve(__dirname, '../../last403.html');
const OUT = path.resolve(__dirname, '../data/last403_explanations_import.js');

function readFileSafe(fp){
  try { return fs.readFileSync(fp, 'utf8'); } catch(e){ console.error('Failed to read', fp, e); process.exit(1);} }

const html = readFileSafe(SRC);

// Helper regex builders
const CATEGORY_PATTERNS = [
  { key: 'air-law', patterns: ['air law'] },
  { key: 'aircraft-general', patterns: ['aircraft general knowledge','aircraft general'] },
  { key: 'aon-aviation', patterns: ['aon aviation'] },
  { key: 'general-navigation', patterns: ['general navigation'] },
  { key: 'meteorology', patterns: ['meteorology'] },
  { key: 'aircraft-performance', patterns: ['aircraft performance','performance test','cap 696'] },
  { key: 'mass-balance', patterns: ['mass & balance','mass and balance','mass balance'] },
  { key: 'human-performance', patterns: ['human performance','limitations'] },
  { key: 'radio-navigation', patterns: ['radio navigation','radio nav'] },
  { key: 'principles-of-flight', patterns: ['principles of flight'] },
  { key: 'operational-procedures', patterns: ['operational procedures'] },
  { key: 'flight-planning', patterns: ['flight planning','monitoring'] },
  { key: 'instrumentation', patterns: ['instrumentation'] },
];

function resolveCategoryKey(heading){
  const h = String(heading||'').toLowerCase();
  for (const c of CATEGORY_PATTERNS){
    if (c.patterns.some(p => h.includes(p))) return c.key;
  }
  return 'misc';
}

function extractSections(html){
  // Build a flat list of all headings (h1/h2/h3) with positions and text
  const re = /<(h1|h2|h3)[^>]*>([\s\S]*?)<\/\1>/gi;
  const headings = [];
  let m;
  while ((m = re.exec(html))) {
    const tag = m[1].toLowerCase();
    const raw = m[2] || '';
    const text = raw
      .replace(/<[^>]+>/g,'')
      .replace(/✈️|⚙️|🧠|⚖️|🌦️|🧭|📋|📡/g,'')
      .trim();
    headings.push({ tag, text, start: m.index, end: m.index + m[0].length });
  }

  // Identify context markers: h1 or h2 that clearly indicate a category
  const contextMarkers = [];
  for (const h of headings){
    const key = resolveCategoryKey(h.text);
    if (key !== 'misc' && (h.tag === 'h1' || h.tag === 'h2')){
      contextMarkers.push({ pos: h.start, key });
    }
  }

  // Build sections: treat h1/h2/h3 as potential test blocks
  const sections = [];
  for (let i = 0; i < headings.length; i++){
    const h = headings[i];
    const nextStart = (i+1 < headings.length) ? headings[i+1].start : html.length;
    const body = html.substring(h.end, nextStart);
    
    // Determine context category: nearest previous context marker
    let contextKey = 'misc';
    for (let j = contextMarkers.length - 1; j >= 0; j--){
      if (contextMarkers[j].pos <= h.start) { contextKey = contextMarkers[j].key; break; }
    }
    
    // For h1 tags, check if they themselves are category markers or test sections
    if (h.tag === 'h1') {
      const directKey = resolveCategoryKey(h.text);
      if (directKey !== 'misc') {
        contextKey = directKey; // H1 sets its own category
      }
    }
    
    sections.push({ heading: h.text, body, contextKey, tag: h.tag });
  }
  return sections;
}

function parseQuestionsFromDetails(body){
  // For Air Law & AON style <details><summary>Question...</summary> option divs ... correct-answer ... explanation
  const qRegex = /<details>[\s\S]*?<summary class="question-text">([\s\S]*?)<\/summary>([\s\S]*?)<div class="correct-answer">\s*Correct Answer:\s*([A-D])[^<]*<\/div>([\s\S]*?)<\/details>/gi;
  const questions = [];
  let m;
  while((m = qRegex.exec(body))){
    const qText = clean(m[1]);
    const block = m[2];
    const letter = m[3].trim();
    const post = m[4];
    // Options inside block
    const options = [];
    const optRegex = /<div class="option">\s*(?:[A-D]\.|)(.*?)<\/div>/g;
    let om; while((om = optRegex.exec(block))){ options.push(clean(om[1])); }
    if(options.length < 2){ // fallback: list items or li inside ol
      const liRegex = /<li>([\s\S]*?)<\/li>/g; let lm; while((lm = liRegex.exec(block))){ options.push(clean(lm[1])); }
    }
    const explanationMatch = post.match(/<div class="explanation">([\s\S]*?)<\/div>/i);
    const explanation = explanationMatch ? clean(explanationMatch[1]) : '';
    const correctIndex = letter.charCodeAt(0) - 65; // A=0
    questions.push({ question: qText, options, correct: correctIndex, explanation });
  }
  return questions;
}

function parseQuestionsSimple(body){
  // For AGK style <div class="question"> <p>n. text</p> <ol><li>...</li>..</ol> <div class="correct-answer">Correct Answer: X. rest</div>
  const qRegex = /<div class="question">[\s\S]*?<p>\s*\d+\.\s*([\s\S]*?)<\/p>([\s\S]*?)<div class="correct-answer">\s*Correct Answer:\s*([A-D])\.?([^<]*)<\/div>[\s\S]*?<\/div>/gi;
  const questions = []; let m;
  while((m = qRegex.exec(body))){
    const qText = clean(m[1]);
    const optionsBlock = m[2];
    const letter = m[3].trim();
    const tail = clean(m[4]);
    const options = [];
    const liRegex = /<li>([\s\S]*?)<\/li>/g; let lm; while((lm = liRegex.exec(optionsBlock))){ options.push(clean(lm[1])); }
    const correctIndex = letter.charCodeAt(0) - 65;
    // Use tail of correct answer line as explanation if available
    const explanation = tail ? tail : '';
    questions.push({ question: qText, options, correct: correctIndex, explanation });
  }
  return questions;
}

function parseQuestionsBlock(body){
  // For third format: <div class="question-block"> <div class="question">n. text</div> <div class="option">A. opt</div>... <div class="correct-answer">Correct Answer: X</div> <div class="explanation">text</div>
  // Also handles variant with <p>A. opt</p> instead of <div class="option">
  const blockRegex = /<div class="question-block">([\s\S]*?)<\/div>\s*(?=<div class="question-block">|<h\d|$)/gi;
  const questions = [];
  let m;
  while ((m = blockRegex.exec(body))) {
    const block = m[1];
    
    // Extract question text
    const qMatch = block.match(/<div class="question">(?:\d+\.\s*)?([\s\S]*?)<\/div>/i);
    if (!qMatch) continue;
    const qText = clean(qMatch[1]);
    
    // Extract options - try <div class="option"> first, then <p> tags
    const options = [];
    const optDivRegex = /<div class="option">(?:[A-D]\.\s*)?([\s\S]*?)<\/div>/gi;
    let om;
    while ((om = optDivRegex.exec(block))) {
      options.push(clean(om[1]));
    }
    
    // If no div options found, try <p> tags
    if (options.length === 0) {
      const optPRegex = /<p>(?:[A-D]\.\s*)?([\s\S]*?)<\/p>/gi;
      while ((om = optPRegex.exec(block))) {
        const optText = clean(om[1]);
        if (optText) options.push(optText);
      }
    }
    
    if (options.length < 2) continue;
    
    // Extract correct answer
    const ansMatch = block.match(/<div class="correct-answer">\s*Correct Answer:\s*([A-D])/i);
    if (!ansMatch) continue;
    const letter = ansMatch[1].trim();
    const correctIndex = letter.charCodeAt(0) - 65;
    
    // Extract explanation
    const expMatch = block.match(/<div class="explanation">([\s\S]*?)<\/div>/i);
    const explanation = expMatch ? clean(expMatch[1]) : '';
    
    questions.push({ question: qText, options, correct: correctIndex, explanation });
  }
  return questions;
}

function parseQuestionsListItem(body){
  // For fourth format: <ol> <li class="question-item"> <span class="question-text">text</span> <ul class="options"><li>A. opt</li>...</ul> <div class="correct-answer-box">Correct Answer: X</div> <div class="explanation">text</div>
  const itemRegex = /<li class="question-item">([\s\S]*?)<\/li>\s*(?=<li class="question-item">|<\/ol>|<h\d|$)/gi;
  const questions = [];
  let m;
  while ((m = itemRegex.exec(body))) {
    const item = m[1];
    
    // Extract question text
    const qMatch = item.match(/<span class="question-text">([\s\S]*?)<\/span>/i);
    if (!qMatch) continue;
    const qText = clean(qMatch[1]);
    
    // Extract options from ul.options
    const options = [];
    const ulMatch = item.match(/<ul class="options">([\s\S]*?)<\/ul>/i);
    if (ulMatch) {
      const optRegex = /<li>(?:[A-D]\.\s*)?([\s\S]*?)<\/li>/gi;
      let om;
      while ((om = optRegex.exec(ulMatch[1]))) {
        options.push(clean(om[1]));
      }
    }
    if (options.length < 2) continue;
    
    // Extract correct answer
    const ansMatch = item.match(/<div class="correct-answer-box">\s*Correct Answer:\s*([A-D])/i);
    if (!ansMatch) continue;
    const letter = ansMatch[1].trim();
    const correctIndex = letter.charCodeAt(0) - 65;
    
    // Extract explanation
    const expMatch = item.match(/<div class="explanation">([\s\S]*?)<\/div>/i);
    const explanation = expMatch ? clean(expMatch[1]) : '';
    
    questions.push({ question: qText, options, correct: correctIndex, explanation });
  }
  return questions;
}

function parseQuestionsOlFormat(body){
  // For fifth format: <div class="question"> <p class="q-text">n. text</p> <ol class="options" type="A"><li><span class="option-letter">A.</span>opt</li>...</ol> <div class="answer-box"><span class="correct-answer-label">Correct Answer: X</span><span class="explanation">text</span></div>
  const qRegex = /<div class="question">([\s\S]*?)<\/div>\s*(?=<div class="question">|<\/div>\s*<\/div>|<h\d|$)/gi;
  const questions = [];
  let m;
  while ((m = qRegex.exec(body))) {
    const block = m[1];
    
    // Extract question text
    const qMatch = block.match(/<p class="q-text">(?:\d+\.\s*)?([\s\S]*?)<\/p>/i);
    if (!qMatch) continue;
    const qText = clean(qMatch[1]);
    
    // Extract options from ol.options
    const options = [];
    const olMatch = block.match(/<ol class="options"[^>]*>([\s\S]*?)<\/ol>/i);
    if (olMatch) {
      const optRegex = /<li>(?:<span class="option-letter">[A-D]\.<\/span>\s*)?([\s\S]*?)<\/li>/gi;
      let om;
      while ((om = optRegex.exec(olMatch[1]))) {
        options.push(clean(om[1]));
      }
    }
    if (options.length < 2) continue;
    
    // Extract correct answer
    const ansMatch = block.match(/<span class="correct-answer-label">\s*Correct Answer:\s*([A-D])/i);
    if (!ansMatch) continue;
    const letter = ansMatch[1].trim();
    const correctIndex = letter.charCodeAt(0) - 65;
    
    // Extract explanation
    const expMatch = block.match(/<span class="explanation">([\s\S]*?)<\/span>/i);
    const explanation = expMatch ? clean(expMatch[1]) : '';
    
    questions.push({ question: qText, options, correct: correctIndex, explanation });
  }
  return questions;
}

function parseQuestionsCard(body){
  // For sixth format: <div class="question-card"> <div class="question-text">n. text</div> <div class="option" data-answer="X">A. opt</div>... <div class="rationale"><div class="rationale-title">Rationale:</div>text</div>
  const cardRegex = /<div class="question-card">([\s\S]*?)<\/div>\s*(?=<!--.*?Question \d+|<div class="question-card">|<h\d|$)/gi;
  const questions = [];
  let m;
  while ((m = cardRegex.exec(body))) {
    const card = m[1];
    
    // Extract question text
    const qMatch = card.match(/<div class="question-text">(?:\d+\.\s*)?([\s\S]*?)<\/div>/i);
    if (!qMatch) continue;
    const qText = clean(qMatch[1]);
    
    // Extract options and find correct answer
    const options = [];
    let correctIndex = -1;
    const optRegex = /<div class="option(?:\s+correct)?"[^>]*data-answer="([A-D])"[^>]*>(?:[A-D]\.\s*)?([\s\S]*?)<\/div>/gi;
    let om;
    while ((om = optRegex.exec(card))) {
      const letter = om[1];
      const optText = clean(om[2]);
      options.push(optText);
      if (om[0].includes('class="option correct"')) {
        correctIndex = letter.charCodeAt(0) - 65;
      }
    }
    if (options.length < 2 || correctIndex === -1) continue;
    
    // Extract rationale/explanation
    const ratMatch = card.match(/<div class="rationale">([\s\S]*?)<\/div>/i);
    let explanation = '';
    if (ratMatch) {
      explanation = clean(ratMatch[1].replace(/<div class="rationale-title">.*?<\/div>/i, ''));
    }
    
    questions.push({ question: qText, options, correct: correctIndex, explanation });
  }
  return questions;
}

function parseQuestionsJavaScript(body){
  // For seventh format: JavaScript const questions = [ { q: "text", options: ["A. opt", ...], correct: "X" or { text: "opt", correct: true/false }, explanation: "text" } ]
  const questions = [];
  
  // Extract the questions array from JavaScript
  const scriptMatch = body.match(/<script>([\s\S]*?)<\/script>/i);
  if (!scriptMatch) return questions;
  
  const scriptContent = scriptMatch[1];
  
  // Use regex to extract individual question objects
  // Match pattern: { q: "...", options: [...], correct: "X" or options with correct: true, explanation: "..." }
  const qObjRegex = /\{\s*q:\s*["']([\s\S]*?)["'],\s*options:\s*\[([\s\S]*?)\],\s*correct:\s*["']?([A-D])["']?,\s*(?:explanation|rationale):\s*["']([\s\S]*?)["'](?:,\s*calculation:\s*(?:null|["'].*?["']))?\s*\}/gi;
  
  let m;
  while ((m = qObjRegex.exec(scriptContent))) {
    const qText = clean(m[1]);
    const optionsStr = m[2];
    const correctLetter = m[3];
    const explanation = clean(m[4]);
    
    // Parse options - could be array of strings or array of objects
    const options = [];
    
    // Try string array first: ["A. text", "B. text"]
    const stringOptRegex = /["']([\s\S]*?)["']/g;
    let optMatch;
    while ((optMatch = stringOptRegex.exec(optionsStr))) {
      const optText = clean(optMatch[1].replace(/^[A-D]\.\s*/, ''));
      if (optText) options.push(optText);
    }
    
    if (options.length < 2) continue;
    
    const correctIndex = correctLetter.charCodeAt(0) - 65;
    
    questions.push({ question: qText, options, correct: correctIndex, explanation });
  }
  
  // Also try format with options: [{text: "...", correct: true}, ...]
  if (questions.length === 0) {
    const qObjRegex2 = /\{\s*q:\s*["']([\s\S]*?)["'],\s*options:\s*\[([\s\S]*?)\],\s*(?:explanation|rationale):\s*["']([\s\S]*?)["']\s*\}/gi;
    
    while ((m = qObjRegex2.exec(scriptContent))) {
      const qText = clean(m[1]);
      const optionsStr = m[2];
      const explanation = clean(m[3]);
      
      // Parse options as objects: {text: "...", correct: true}
      const options = [];
      let correctIndex = -1;
      
      const objOptRegex = /\{\s*text:\s*["']([\s\S]*?)["'],\s*correct:\s*(true|false)\s*\}/gi;
      let optMatch;
      let idx = 0;
      while ((optMatch = objOptRegex.exec(optionsStr))) {
        const optText = clean(optMatch[1]);
        options.push(optText);
        if (optMatch[2] === 'true') {
          correctIndex = idx;
        }
        idx++;
      }
      
      if (options.length < 2 || correctIndex === -1) continue;
      
      questions.push({ question: qText, options, correct: correctIndex, explanation });
    }
  }
  
  return questions;
}

function parseQuestionsLabel(body){
  // For eighth format: <div class="question-card"> <p>n. question</p> <label class="option-label">A. opt</label>... <div class="solution"><p>Correct Answer: X</p><p><strong>Rationale:</strong> text</p></div>
  const cardRegex = /<div class="question-card"[^>]*>([\s\S]*?)<\/div>\s*(?=<!--.*?Question \d+|<div class="question-card"|<script|$)/gi;
  const questions = [];
  let m;
  while ((m = cardRegex.exec(body))) {
    const card = m[1];
    
    // Extract question text from <p> tag
    const qMatch = card.match(/<p[^>]*>(?:\d+\.\s*)?([\s\S]*?)<\/p>/i);
    if (!qMatch) continue;
    const qText = clean(qMatch[1]);
    if (!qText || qText.length < 10) continue;
    
    // Extract options from <label class="option-label">
    const options = [];
    const optRegex = /<label class="option-label">(?:[A-D]\.\s*)?([\s\S]*?)<\/label>/gi;
    let om;
    while ((om = optRegex.exec(card))) {
      options.push(clean(om[1]));
    }
    if (options.length < 2) continue;
    
    // Extract correct answer from solution div
    const solMatch = card.match(/<div class="solution"[^>]*>([\s\S]*?)<\/div>/i);
    if (!solMatch) continue;
    
    const solContent = solMatch[1];
    const ansMatch = solContent.match(/Correct Answer:\s*([A-D])/i);
    if (!ansMatch) continue;
    const letter = ansMatch[1].trim();
    const correctIndex = letter.charCodeAt(0) - 65;
    
    // Extract rationale/explanation
    const ratMatch = solContent.match(/<strong>Rationale:<\/strong>\s*([\s\S]*?)(?:<\/p>|$)/i);
    const explanation = ratMatch ? clean(ratMatch[1]) : '';
    
    questions.push({ question: qText, options, correct: correctIndex, explanation });
  }
  return questions;
}

function parseQuestionsBorderDiv(body){
  // For ninth format: <div class="...border..."> <p>n. question</p> <div class="space-y-2"><p>A. opt</p>...</div> <div class="correct-answer"><p>Correct Answer: X. text</p><p><span>Rationale:</span> text</p></div>
  const divRegex = /<div class="[^"]*border[^"]*">([\s\S]*?)<\/div>\s*(?=<!--.*?Question \d+|<div class="[^"]*border|<script|$)/gi;
  const questions = [];
  let m;
  while ((m = divRegex.exec(body))) {
    const block = m[1];
    
    // Extract question text - first <p> with substantial content
    const allP = [];
    const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
    let pm;
    while ((pm = pRegex.exec(block))) {
      const text = clean(pm[1]);
      if (text && text.length > 5) allP.push(text);
    }
    
    if (allP.length < 3) continue; // Need at least Q + 2 options
    
    const qText = allP[0];
    if (qText.match(/^(Correct Answer|Rationale)/i)) continue;
    
    // Extract correct answer from div.correct-answer
    const ansMatch = block.match(/<div class="[^"]*correct-answer[^"]*">([\s\S]*?)<\/div>/i);
    if (!ansMatch) continue;
    
    const ansContent = ansMatch[1];
    const correctMatch = ansContent.match(/Correct Answer:\s*([A-D])/i);
    if (!correctMatch) continue;
    const letter = correctMatch[1].trim();
    const correctIndex = letter.charCodeAt(0) - 65;
    
    // Options are the <p> tags between question and answer (skip first p which is question)
    const options = allP.slice(1).filter(p => !p.match(/^(Correct Answer|Rationale)/i));
    if (options.length < 2) continue;
    // Take only first 4 as options
    const finalOptions = options.slice(0, 4).map(o => o.replace(/^[A-D]\.\s*/, ''));
    
    // Extract rationale
    const ratMatch = ansContent.match(/<span[^>]*>Rationale:<\/span>\s*([\s\S]*?)(?:<\/p>|$)/i);
    const explanation = ratMatch ? clean(ratMatch[1]) : '';
    
    questions.push({ question: qText, options: finalOptions, correct: correctIndex, explanation });
  }
  return questions;
}

function clean(s){
  return String(s||'')
    .replace(/<[^>]+>/g,' ')
    .replace(/&quot;/g,'"')
    .replace(/&amp;/g,'&')
    .replace(/\s+/g,' ')
    .trim();
}

const sections = extractSections(html);

// Group sections by category with parsed questions
const grouped = new Map();
let skippedSections = [];
for (const sec of sections){
  let key = resolveCategoryKey(sec.heading);
  if (key === 'misc' && sec.contextKey && sec.contextKey !== 'misc') {
    key = sec.contextKey; // inherit from nearest category heading
  }
  let questions = [];
  // Prefer details-based parser if the body contains details/summary
  if (/(<details\b[\s\S]*?<summary\b)/i.test(sec.body)) {
    questions = parseQuestionsFromDetails(sec.body);
  } else if (/<div class="question-block">/i.test(sec.body)) {
    questions = parseQuestionsBlock(sec.body);
  } else if (/<li class="question-item">/i.test(sec.body)) {
    questions = parseQuestionsListItem(sec.body);
  } else if (/<p class="q-text">/i.test(sec.body)) {
    questions = parseQuestionsOlFormat(sec.body);
  } else if (/<div class="question-card">/i.test(sec.body) && /<div class="question-text">/i.test(sec.body)) {
    questions = parseQuestionsCard(sec.body);
  } else if (/<label class="option-label">/i.test(sec.body)) {
    questions = parseQuestionsLabel(sec.body);
  } else if (/<div[^>]*class="[^"]*correct-answer[^"]*">/i.test(sec.body)) {
    questions = parseQuestionsBorderDiv(sec.body);
  } else if (/<script>[\s\S]*?const\s+questions\s*=/i.test(sec.body)) {
    questions = parseQuestionsJavaScript(sec.body);
  } else {
    questions = parseQuestionsSimple(sec.body);
  }
  if (!questions.length) {
    // Fallback: try all parsers
    const a = parseQuestionsFromDetails(sec.body);
    const b = parseQuestionsSimple(sec.body);
    const c = parseQuestionsBlock(sec.body);
    const d = parseQuestionsListItem(sec.body);
    const e = parseQuestionsOlFormat(sec.body);
    const f = parseQuestionsCard(sec.body);
    const g = parseQuestionsJavaScript(sec.body);
    const h = parseQuestionsLabel(sec.body);
    const i = parseQuestionsBorderDiv(sec.body);
    questions = [a, b, c, d, e, f, g, h, i].sort((x, y) => y.length - x.length)[0];
  }
  if (!questions.length) {
    skippedSections.push({ heading: sec.heading, tag: sec.tag, key, bodyLength: sec.body.length, body: sec.body });
    continue;
  }
  if (!grouped.has(key)) grouped.set(key, []);
  grouped.get(key).push({ heading: sec.heading, questions });
}

console.log('\nSkipped sections (no questions parsed):');
skippedSections.forEach(s => {
  console.log(`  [${s.tag}] ${s.heading.substring(0, 60)} (${s.key}) - body: ${s.bodyLength} chars`);
});
console.log(`Total skipped: ${skippedSections.length}`);

// Sample a large skipped section to debug
const largeSample = skippedSections.find(s => s.bodyLength > 10000);
if (largeSample) {
  console.log('\n=== Sample of large skipped section ===');
  console.log('Heading:', largeSample.heading.substring(0, 80));
  console.log('First 500 chars of body will be saved...');
  fs.writeFileSync(path.resolve(__dirname, 'debug_skipped_sample.txt'), 
    'Heading: ' + largeSample.heading + '\n\n' + largeSample.body.substring(0, 2000), 'utf8');
  console.log('Saved to debug_skipped_sample.txt');
}

function toTestName(h){
  // Keep original heading text for uniqueness
  return h.replace(/✈️/g,'').trim();
}

function buildImportObject(){
  const imports = [];
  for (const [category, tests] of grouped.entries()){
    const valid = (tests||[]).filter(t => (t.questions||[]).length);
    if (!valid.length) continue;
    imports.push({
      category,
      tests: valid.map(t => ({ name: toTestName(t.heading), timeLimit: 60, questions: t.questions }))
    });
  }
  return imports;
}

const importData = buildImportObject();

const outLines = [
  '// Generated by parse_last403.js',
  'window.addedImports = window.addedImports || [];'
];
importData.forEach(obj => {
  outLines.push('window.addedImports.push(' + JSON.stringify(obj, null, 2) + ');');
});

fs.writeFileSync(OUT, outLines.join('\n'), 'utf8');
console.log('Wrote import file with categories:', importData.map(i=>i.category).join(', '));
let totalQuestions = 0, totalTests = 0;
for (const imp of importData){
  totalTests += (imp.tests||[]).length;
  for (const t of (imp.tests||[])) totalQuestions += (t.questions||[]).length;
}
console.log('Summary: categories =', importData.length, 'tests =', totalTests, 'questions =', totalQuestions);