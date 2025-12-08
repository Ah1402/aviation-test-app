const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'last403.html');
let html = fs.readFileSync(file, 'utf8');

// Normalize newlines
html = html.replace(/\r\n/g, '\n');

// Extract test-section headings to group questions
const sectionRegex = /<div class="test-section">[\s\S]*?<h2[^>]*>([\s\S]*?)<\//g;
// We'll instead split by <div class="test-section">
const sections = html.split(/<div class="test-section">/).slice(1);
const output = { name: 'Last403 Parsed', tests: [] };
let total = 0;

sections.forEach((sec, si) => {
  // heading
  const h2Match = sec.match(/<h2[^>]*>([\s\S]*?)<\//);
  const title = h2Match ? h2Match[1].replace(/<[^>]+>/g, '').trim() : `Section ${si+1}`;

  // find all question blocks
  const qRegex = /<div class="question">([\s\S]*?)<\/div>\s*(?=(?:<div class="question">|<\/div>|$))/g;
  const questions = [];
  let m;
  while ((m = qRegex.exec(sec)) !== null) {
    const block = m[1];
    // extract question text inside <p>
    const pMatch = block.match(/<p[^>]*>([\s\S]*?)<\/p>/);
    const qText = pMatch ? pMatch[1].replace(/<[^>]+>/g, '').trim() : null;
    // extract options - li inside ol.options-list
    const opts = [];
    const olMatch = block.match(/<ol[^>]*class="options-list"[^>]*>([\s\S]*?)<\/ol>/);
    if (olMatch) {
      const lis = olMatch[1].match(/<li[^>]*>([\s\S]*?)<\/li>/g);
      if (lis) {
        lis.forEach(li => {
          const t = li.replace(/<li[^>]*>/, '').replace(/<\/li>/, '').replace(/<[^>]+>/g, '').trim();
          if (t.length) opts.push(t);
        });
      }
    }
    // extract correct answer from div.correct-answer
    let correctIndex = null;
    const caMatch = block.match(/<div[^>]*class="correct-answer"[^>]*>([\s\S]*?)<\/div>/);
    let correctText = '';
    if (caMatch) {
      correctText = caMatch[1].replace(/<[^>]+>/g, '').trim();
      // look for single letter A/B/C/D after 'Correct Answer:' or first capital letter followed by '.'
      const letterMatch = correctText.match(/Correct Answer:\s*([A-Z])\b/i) || correctText.match(/\b([A-D])\./i);
      if (letterMatch) {
        const letter = letterMatch[1].toUpperCase();
        correctIndex = letter.charCodeAt(0) - 'A'.charCodeAt(0);
      } else {
        // sometimes shown as 'Correct Answer: B. Text' or 'Correct Answer: 2'
        const numMatch = correctText.match(/([A-D])\.|Correct Answer:\s*(?:Option\s*)?(\d+)/i);
        if (numMatch) {
          const letter = numMatch[1];
          if (letter) correctIndex = letter.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
        }
      }
    }

    questions.push({ question: qText || '', options: opts, correct: correctIndex, explanation: '' });
    total++;
  }

  output.tests.push({ name: title, timeLimit: 0, questions });
});

// Flatten test arrays into a single test named "Last403 - Parsed"
const flatQuestions = output.tests.reduce((acc, t) => acc.concat(t.questions), []);
const final = { "last403_parsed": { name: "Last403 (parsed)", icon: "fas fa-file-import", tests: [{ name: "Parsed from last403.html", timeLimit: 0, questions: flatQuestions }] } };

const outPath = path.join(__dirname, '..', 'build', 'last403_parsed.json');
if (!fs.existsSync(path.dirname(outPath))) fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(final, null, 2), 'utf8');
console.log('Parsed questions:', flatQuestions.length, 'output ->', outPath);
