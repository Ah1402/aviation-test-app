// Parse questions from c:\\Users\\ahmed\\Desktop\\added HTML files and write src/data/added_imports.js
// Robust against Word-exported HTML with patterns like:
//  12. Question text ... A. ... B. ... C. ... D. ... Correct Answer: B (optional explanation)

const fs = require('fs');
const path = require('path');

const SOURCE_DIR = 'c:/Users/ahmed/Desktop/added';
const OUTPUT_FILE = path.resolve(__dirname, '..', 'src', 'data', 'added_imports.js');

function readHtml(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  // Normalize breaks to newlines to help parsing
  html = html.replace(/<\s*br\s*\/?>/gi, '\n');
  html = html.replace(/<\/(p|div|li|tr)\s*>/gi, '\n');
  // Strip tags
  const text = html.replace(/<[^>]*>/g, ' ')
                   .replace(/&nbsp;/gi, ' ')
                   .replace(/&amp;/gi, '&')
                   .replace(/&lt;/gi, '<')
                   .replace(/&gt;/gi, '>')
                   .replace(/\r/g, '')
                   .replace(/[\u00A0\u200B]/g, ' ');
  return text;
}

function clean(s) {
  return String(s || '')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function extractQuestions(text) {
  const blocks = [];
  // Ensure each question starts on new line like "1. "
  const normalized = text.replace(/\n+/g, '\n').replace(/\s+\./g, '.');
  const parts = normalized.split(/\n\s*(?=\d+\.)/g);
  for (const part of parts) {
    const p = part.trim();
    if (!/^\d+\./.test(p)) continue;
    blocks.push(p);
  }

  const questions = [];
  for (const blk of blocks) {
    try {
      // Remove the leading number
  let qBody = blk.replace(/^\d+\.[\s\u00A0]*/, '');
  // Normalize options to start on new lines to help extraction
  qBody = qBody.replace(/([ABCD])[\.)]\s+/g, '\n$1. ');

      // Find correct letter and optional explanation
      const cMatch = qBody.match(/Correct\s*Answer:\s*([ABCD])/i);
      const correctLetter = cMatch ? cMatch[1].toUpperCase() : null;
      const eMatch = qBody.match(/Correct\s*Answer:\s*[ABCD]\s*\((.*?)\)/is);
      const explanation = eMatch ? clean(eMatch[1]) : '';

      // Extract options A-D
      const options = [];
  const optRegex = /\b([ABCD])[\.)]\s+([\s\S]*?)(?=(?:\n|\s)+[ABCD][\.)]\s+|\s*Correct\s*Answer:|$)/gi;
      let m;
      while ((m = optRegex.exec(qBody)) !== null) {
        const letter = m[1].toUpperCase();
        const text = clean(m[2]);
        const idx = letter.charCodeAt(0) - 65;
        options[idx] = text;
      }

      // Build question text (before first option or Correct Answer)
  let qText = qBody.split(/\s+[A][\.)]\s+|\s*Correct\s*Answer:/i)[0];
      qText = clean(qText);

      // Fill any missing options with empty strings
      for (let i = 0; i < 4; i++) options[i] = clean(options[i] || '');

      // Validation
      if (!qText || options.filter(Boolean).length < 2) continue;
      const correct = typeof correctLetter === 'string' ? (correctLetter.charCodeAt(0) - 65) : 0;

      questions.push({ question: qText, options, correct, explanation });
    } catch (_) {
      // skip on parse error
    }
  }
  return questions;
}

function mapCategory(fileName) {
  const n = fileName.toLowerCase();
  if (n.includes('agk') || n.includes('aircraft')) return { key: 'aircraft_general', name: 'Aircraft General Knowledge' };
  if (n.includes('al') || n.includes('law')) return { key: 'air_law', name: 'Air Law' };
  if (n.includes('human')) return { key: 'human_performance', name: 'Human Performance' };
  if (n.includes('instrument')) return { key: 'instrumentation', name: 'Instrumentation' };
  if (n.includes('mass')) return { key: 'mass_balance', name: 'Mass & Balance' };
  if (n.includes('meteo') || n.includes('metrology')) return { key: 'meteorology', name: 'Meteorology' };
  if (n.includes('perform')) return { key: 'performance', name: 'Performance' };
  if (n.includes('general') || n.includes('617') || n.includes('nav')) return { key: 'general_navigation', name: 'General Navigation' };
  if (n.includes('principal') || n.includes('principle')) return { key: 'principles', name: 'Principles of Flight' };
  if (n.includes('operational')) return { key: 'operational_procedures', name: 'Operational Procedures' };
  if (n.includes('aon')) return { key: 'aon_aviation', name: 'AON Aviation Knowledge' };
  return { key: 'misc', name: 'Miscellaneous' };
}

function buildImports() {
  const entries = fs.readdirSync(SOURCE_DIR).filter(f => /\.htm(l)?$/i.test(f));
  const map = new Map();
  for (const file of entries) {
    const filePath = path.join(SOURCE_DIR, file);
    const text = readHtml(filePath);
    const questions = extractQuestions(text);
    if (!questions.length) continue;

    const cat = mapCategory(file);
    if (!map.has(cat.key)) {
      map.set(cat.key, { category: cat.key, tests: [] });
    }
    const testName = path.basename(file).replace(/\.(htm|html)$/i, '');
    map.get(cat.key).tests.push({ name: testName, timeLimit: 60, questions });
  }
  return Array.from(map.values());
}

function writeAddedImports(imports) {
  const header = `// Auto-generated on ${new Date().toISOString()} from ${SOURCE_DIR}\n`;
  const payload = 'window.addedImports = ' + JSON.stringify(imports, null, 2) + ';\n';
  fs.writeFileSync(OUTPUT_FILE, header + payload, 'utf8');
}

(function run(){
  console.log('Reading HTML files from', SOURCE_DIR);
  const imports = buildImports();
  writeAddedImports(imports);
  const total = imports.reduce((s, c) => s + c.tests.reduce((a,t)=>a + t.questions.length, 0), 0);
  console.log(`Wrote added_imports.js with ${imports.length} categories and ${total} questions.`);
})();
