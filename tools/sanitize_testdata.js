// Sanitize www/src/data/testData.js by removing embedded 'Correct Answer:' markers
// and moving rationale into explanation, correcting indices when annotated.
// Usage: node tools/sanitize_testdata.js

const fs = require('fs');
const path = require('path');

function cleanQuestion(q){
  if (!q || !Array.isArray(q.options)) return;
  let explanation = (q.explanation || '').trim();
  const cleaned = [];
  let changed = false;
  for (let i=0;i<q.options.length;i++){
    let opt = q.options[i];
    if (typeof opt !== 'string') { cleaned.push(String(opt)); continue; }
    const original = opt;
    opt = opt.replace(/\s+/g,' ').trim();
    if (opt === ')' && q.options.length > 4) { changed = true; continue; }
    let m = opt.match(/^(.*?)(?:\s*Correct Answer:\s*([A-D])(?:\s*\((.*)\))?)\s*$/i);
    if (m){
      let body = (m[1]||'').trim();
      const letter = m[2].toUpperCase();
      const rationale = (m[3]||'').trim();
      if (!body) body = letter;
      opt = body;
      const idx = letter.charCodeAt(0) - 65;
      if (typeof q.correct === 'number' && q.correct !== idx) q.correct = idx;
      if (!explanation && rationale) explanation = rationale; else if (rationale && !explanation.includes(rationale)) explanation += (explanation?' ':'') + rationale;
      changed = true;
    } else {
      m = opt.match(/^(.*?)(?:\s*Correct Answer:\s*([A-D])(.*))$/i);
      if (m){
        let body = (m[1]||'').trim();
        const letter = m[2].toUpperCase();
        const tail = (m[3]||'').trim();
        opt = body;
        const idx = letter.charCodeAt(0) - 65;
        if (typeof q.correct === 'number' && q.correct !== idx) q.correct = idx;
        if (!explanation && tail) explanation = tail; else if (tail && !explanation.includes(tail)) explanation += (explanation?' ':'') + tail;
        changed = true;
      }
    }
    cleaned.push(opt);
    if (opt !== original) changed = true;
  }
  if (changed){
    if (cleaned.length >= 2) q.options = cleaned;
    if (explanation) q.explanation = explanation.trim();
    if (typeof q.correct !== 'number' || q.correct < 0 || q.correct >= q.options.length) q.correct = 0;
  }
}

function run(){
  const root = process.cwd();
  const srcPath = path.join(root, 'www', 'src', 'data', 'testData.js');
  if (!fs.existsSync(srcPath)) {
    console.error('testData.js not found at', srcPath);
    process.exit(1);
  }
  const testData = require(srcPath);
  Object.values(testData).forEach(cat => (cat.tests||[]).forEach(t => (t.questions||[]).forEach(cleanQuestion)));

  // Serialize back to JS file with header and window/module exposure
  const header = '// Aviation Test Data - Cleaned and normalized\n// Generated: ' + new Date().toLocaleString() + '\n\n';
  const body = 'const testData = ' + JSON.stringify(testData, null, 2) + ';\n\n';
  const footer = `// Attach to window for browser usage\nif (typeof window !== 'undefined') {\n  window.testData = testData;\n}\n\n// Export for use in modules (Node/CommonJS)\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = testData;\n}\n`;

  fs.writeFileSync(srcPath, header + body + footer, 'utf8');
  console.log('Sanitized and wrote', srcPath);
}

run();
