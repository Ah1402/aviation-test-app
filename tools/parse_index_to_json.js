const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'www', 'index.html');
if (!fs.existsSync(file)) { console.error('index.html not found at', file); process.exit(2); }
let html = fs.readFileSync(file, 'utf8');
html = html.replace(/\r\n/g, '\n');
const sections = html.split(/<div class="test-section">/).slice(1);
const questionsAll = [];
sections.forEach((sec) => {
  const parts = sec.split('<div class="question">').slice(1);
  parts.forEach(part => {
    const pMatch = part.match(/<p[^>]*>([\s\S]*?)<\/p>/);
    const qText = pMatch ? pMatch[1].replace(/<[^>]+>/g, '').trim() : '';
    const olMatch = part.match(/<ol[^>]*class="options-list"[^>]*>([\s\S]*?)<\/ol>/);
    const opts = [];
    if (olMatch) {
      const lis = olMatch[1].match(/<li[^>]*>([\s\S]*?)<\/li>/g);
      if (lis) lis.forEach(li => opts.push(li.replace(/<[^>]+>/g, '').trim()));
    }
    const caMatch = part.match(/<div[^>]*class="correct-answer"[^>]*>([\s\S]*?)<\/div>/);
    let correctIndex = null;
    if (caMatch) {
      const correctText = caMatch[1].replace(/<[^>]+>/g, '').trim();
      const letter = correctText.match(/Correct Answer:\s*([A-D])\b/i) || correctText.match(/\b([A-D])\./i);
      if (letter) correctIndex = letter[1].toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
    }
    questionsAll.push({ question: qText, options: opts, correct: correctIndex, explanation: '' });
  });
});
const final = { "index_parsed": { name: "Index Parsed", icon: "fas fa-file-import", tests: [{ name: "Parsed from www/index.html", timeLimit: 0, questions: questionsAll }] } };
const outPath = path.join(__dirname, '..', 'build', 'index_parsed.json');
if (!fs.existsSync(path.dirname(outPath))) fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(final, null, 2), 'utf8');
console.log('Parsed questions:', questionsAll.length, 'output ->', outPath);
