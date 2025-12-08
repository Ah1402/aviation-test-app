/**
 * Export all questions to CSV.
 * Columns: CategoryKey, CategoryName, TestName, TestIndex, QuestionIndex, QuestionText,
 * CorrectIndex, CorrectOption, Options (pipe-separated), Explanation
 */
const fs = require('fs');
const path = require('path');

const SRC_PATH = path.join(__dirname, '..', 'src', 'data', 'testData.js');
const OUT_DIR = path.join(__dirname, '..', 'exports');

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function extractRootObject(raw) {
  const anchor = raw.indexOf('const testData');
  if (anchor === -1) throw new Error('Could not find "const testData" in testData.js');
  let i = raw.indexOf('{', anchor);
  if (i === -1) throw new Error('Could not find object start');
  let depth = 0;
  let inStr = false;
  let strQuote = '';
  let prev = '';
  for (; i < raw.length; i++) {
    const ch = raw[i];
    if (inStr) {
      if (ch === strQuote && prev !== '\\') { inStr = false; strQuote = ''; }
      prev = ch;
      continue;
    }
    if (ch === '"' || ch === "'") { inStr = true; strQuote = ch; prev = ch; continue; }
    if (ch === '{') {
      if (depth === 0) var start = i; // first opening brace
      depth++;
    } else if (ch === '}') {
      depth--;
      if (depth === 0) { var end = i + 1; break; }
    }
    prev = ch;
  }
  if (typeof start !== 'number' || typeof end !== 'number') {
    throw new Error('Failed to locate balanced root object braces');
  }
  return raw.slice(start, end);
}

function loadTestDataObject() {
  const raw = fs.readFileSync(SRC_PATH, 'utf8');
  const objText = extractRootObject(raw);
  // Remove potential trailing commas in arrays/objects (best effort)
  const cleaned = objText.replace(/,(\s*[}\]])/g, '$1');
  let data;
  try {
    data = Function('return (' + cleaned + ')')();
  } catch (e) {
    throw new Error('Failed to evaluate testData object: ' + e.message);
  }
  return data;
}

function csvEscape(val) {
  if (val === null || val === undefined) return '';
  let s = String(val);
  // normalize whitespace/newlines
  s = s.replace(/\r?\n|\r/g, ' ').replace(/\s+/g, ' ').trim();
  // escape quotes
  s = s.replace(/"/g, '""');
  return '"' + s + '"';
}

function buildCsv(data) {
  const rows = [];
  rows.push([
    'CategoryKey', 'CategoryName', 'TestName', 'TestIndex', 'QuestionIndex',
    'QuestionText', 'CorrectIndex', 'CorrectOption', 'Options', 'Explanation'
  ].join(','));

  for (const [catKey, cat] of Object.entries(data)) {
    if (!cat || typeof cat !== 'object' || !Array.isArray(cat.tests)) continue;
    const catName = cat.name || catKey;
    cat.tests.forEach((test, tIdx) => {
      const testName = test?.name || `Test ${tIdx + 1}`;
      const questions = Array.isArray(test?.questions) ? test.questions : [];
      questions.forEach((q, qIdx) => {
        if (!q) return;
        const question = q.question || '';
        const opts = Array.isArray(q.options) ? q.options : [];
        const correctIndex = typeof q.correct === 'number' ? q.correct : -1;
        const correctOpt = correctIndex >= 0 && correctIndex < opts.length ? opts[correctIndex] : '';
        const optionsJoined = opts.join(' | ');
        const explanation = q.explanation || '';
        rows.push([
          csvEscape(catKey),
          csvEscape(catName),
          csvEscape(testName),
          tIdx + 1,
          qIdx + 1,
          csvEscape(question),
          correctIndex,
          csvEscape(correctOpt),
          csvEscape(optionsJoined),
          csvEscape(explanation)
        ].join(','));
      });
    });
  }
  return rows.join('\n') + '\n';
}

function main() {
  ensureDir(OUT_DIR);
  const data = loadTestDataObject();
  const csv = buildCsv(data);
  const stamp = new Date().toISOString().slice(0,19).replace(/[:T]/g,'-');
  const outPath = path.join(OUT_DIR, `questions_export_${stamp}.csv`);
  fs.writeFileSync(outPath, csv, 'utf8');
  console.log('CSV export written to:', outPath);
}

if (require.main === module) {
  try { main(); } catch (e) { console.error('Error:', e); process.exit(1); }
}
