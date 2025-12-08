/*
  Cleans src/data/testData.js by removing any trailing "Correct Answer:" (and anything after)
  from option strings, trimming whitespace, and enforcing exactly 4 options per question.
  Creates a timestamped backup of the original file.
*/

const fs = require('fs');
const path = require('path');

const DATA_PATH = path.resolve(__dirname, '..', 'src', 'data', 'testData.js');

function loadTestDataModule() {
  // Require the JS data file directly
  // It attaches window.testData in browser; in Node it exports via module.exports
  delete require.cache[require.resolve(DATA_PATH)];
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const data = require(DATA_PATH);
  return JSON.parse(JSON.stringify(data)); // deep clone
}

function cleanOptionText(text) {
  if (typeof text !== 'string') return '';
  // Remove anything from "Correct Answer:" onward (with possible newlines or spacing)
  let s = text.replace(/\s*Correct\s*Answer:\s*[A-D]?.*$/is, '');
  // If an option accidentally captured the next question start like "\n\d+.", remove it
  s = s.replace(/\n\d+\.[\s\S]*$/s, '');
  // Clean stray closing parentheses or trailing punctuation that were left alone
  s = s.replace(/^\s*[\)\]\.;:,]+/, '');
  s = s.replace(/[\)\]\.;:,]+\s*$/, '');
  // Collapse internal whitespace
  s = s.replace(/\s+/g, ' ').trim();
  return s;
}

function cleanQuestionText(text) {
  if (typeof text !== 'string') return '';
  let s = text.replace(/\s+/g, ' ').trim();
  // If the question accidentally contains previous question's tail like "Correct Answer: X 7. Next question..."
  if (/Correct\s*Answer:/i.test(s)) {
    // Prefer the last numbered-question pattern after any 'Correct Answer:'
    const numbered = s.match(/(\b\d{1,3}\.\s)[^]*$/);
    if (numbered) {
      // Use the text after the last number-dot-space
      const idx = s.lastIndexOf(numbered[1]);
      if (idx !== -1) {
        s = s.substring(idx + numbered[1].length).trim();
      }
    }
    // Strip any remaining 'Correct Answer:' fragments
    s = s.replace(/\s*Correct\s*Answer:.*$/i, '').trim();
  }
  // If it still starts with an option like "A. text" (garbled), and later contains another number-dot pattern, keep the latter
  if (/^[ABCD]\.\s/.test(s)) {
    const m = s.match(/\b\d{1,3}\.\s(.*)$/);
    if (m) s = m[1].trim();
  }
  // Remove any stray leading option fragments (e.g., lone letters or punctuation)
  s = s.replace(/^[\)\]\.;:,]+\s*/, '');
  return s;
}

function cleanData(data) {
  let mutated = 0;
  let droppedExtras = 0;
  let fixedCounts = 0;
  let emptiesFixed = 0;
  let questionsDropped = 0;
  for (const categoryKey of Object.keys(data)) {
    const category = data[categoryKey];
    if (!category || !Array.isArray(category.tests)) continue;
    for (const test of category.tests) {
      if (!test.questions) continue;
      const newQuestions = [];
      for (const q of test.questions) {
        // Clean question text too
        if (q && typeof q.question === 'string') {
          q.question = cleanQuestionText(q.question);
        }
        // Drop questions with empty question text after cleaning
        if (!q.question || !String(q.question).trim()) {
          questionsDropped += 1;
          continue;
        }
        if (!Array.isArray(q.options)) continue;
        const originalLength = q.options.length;
        // Clean each option
        let opts = q.options.map(cleanOptionText).filter(Boolean);
        // Trim to 4 options; if more than 4, keep first 4
        if (opts.length > 4) {
          droppedExtras += opts.length - 4;
          opts = opts.slice(0, 4);
        }
        // If fewer than 4, try to pad with placeholders so the app doesn't break
        // If we end up with fewer than 4 non-empty options, drop the question entirely
        if (opts.length < 4) {
          questionsDropped += 1;
          continue;
        }
        // If any are empty, attempt to recover from the original (pre-clean) slice, else mark placeholder
        const hadEmpty = opts.some((x) => !x);
        if (hadEmpty) emptiesFixed += 1;
        q.options = opts;
        // Ensure correct index is within 0..3
        if (typeof q.correct !== 'number' || q.correct < 0 || q.correct > 3) {
          q.correct = 0;
        }
        if (originalLength !== opts.length) fixedCounts += 1;
        mutated += 1;
        newQuestions.push(q);
      }
      test.questions = newQuestions;
    }
  }
  return { data, stats: { mutated, droppedExtras, fixedCounts, emptiesFixed, questionsDropped } };
}

function writeDataFile(data) {
  const outPath = DATA_PATH;
  const backupPath = DATA_PATH.replace(/\.js$/, `.backup_${Date.now()}.js`);
  const original = fs.readFileSync(outPath, 'utf8');
  fs.writeFileSync(backupPath, original, 'utf8');

  const header = `// Aviation Test Data - Cleaned automatically\n// Generated: ${new Date().toISOString()}\n\n`;
  const body = 'const testData = ' + JSON.stringify(data, null, 2) + ';\n\n' +
`// Attach to window for browser usage\nif (typeof window !== 'undefined') {\n  window.testData = testData;\n}\n\n// Export for use in modules (Node/CommonJS)\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = testData;\n}\n`;
  fs.writeFileSync(outPath, header + body, 'utf8');
  return { outPath, backupPath };
}

(function main() {
  const data = loadTestDataModule();
  const { data: cleaned, stats } = cleanData(data);
  const { outPath, backupPath } = writeDataFile(cleaned);
  console.log('Clean complete:', stats);
  console.log('Written:', outPath);
  console.log('Backup:', backupPath);
})();
