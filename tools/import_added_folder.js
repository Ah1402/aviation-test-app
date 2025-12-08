/*
Import all .htm files from user's added folder into src/data/testData.js
- Parses Word-style HTML blocks with numbered questions and inline options
- Detects category from filename/content
- Cleans text, enforces 4 options, deduplicates within category by question text
- Creates a timestamped backup before writing
*/

const fs = require('fs');
const path = require('path');

const ADDED_DIR = 'C:/Users/ahmed/Desktop/added';
const DATA_DIR = path.resolve(__dirname, '..', 'src', 'data');
const TESTDATA_JS = path.join(DATA_DIR, 'testData.js');

function readTextGuessingEncoding(file) {
  // Try latin1 first (common for Word HTML), then utf8
  try { return fs.readFileSync(file, 'latin1'); } catch {}
  return fs.readFileSync(file, 'utf8');
}

function clean(s) {
  return String(s || '')
    .replace(/\u00A0/g, ' ')
    .replace(/[\t\r]+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .trim();
}

function detectCategoryFromFilename(fileBase) {
  const f = fileBase.toLowerCase();
  if (f.includes('air law') || f === 'al1' || f.startsWith('al')) return { key: 'air-law', name: 'Air Law', icon: 'fas fa-gavel' };
  if (f.includes('aon')) return { key: 'aon-aviation', name: 'AON Aviation', icon: 'fas fa-graduation-cap' };
  if (f.includes('human performance')) return { key: 'human-performance', name: 'Human Performance and Limitations', icon: 'fas fa-user' };
  if (f.includes('instrumentation')) return { key: 'instrumentation', name: 'Instrumentation', icon: 'fas fa-gauge' };
  if (f.includes('mass')) return { key: 'mass-balance', name: 'Mass and Balance', icon: 'fas fa-weight-scale' };
  if (f.includes('meteo') || f.includes('metrology')) return { key: 'meteorology', name: 'Meteorology', icon: 'fas fa-cloud-sun' };
  if (f.includes('operational')) return { key: 'operational-procedures', name: 'Operational Procedures', icon: 'fas fa-cogs' };
  if (f.includes('performance')) return { key: 'performance', name: 'Aircraft Performance', icon: 'fas fa-tachometer-alt' };
  if (f.includes('principal') || f.includes('principle')) return { key: 'principles-of-flight', name: 'Principles of Flight', icon: 'fas fa-paper-plane' };
  if (f.includes('general navigation') || f === 'general') return { key: 'general-navigation', name: 'General Navigation', icon: 'fas fa-compass' };
  if (f.includes('agk')) return { key: 'aircraft-general', name: 'Aircraft General Knowledge', icon: 'fas fa-plane' };
  return null;
}

function detectCategoryFromContent(text) {
  const t = text.toLowerCase();
  if (t.includes('air law')) return { key: 'air-law', name: 'Air Law', icon: 'fas fa-gavel' };
  if (t.includes('human performance')) return { key: 'human-performance', name: 'Human Performance and Limitations', icon: 'fas fa-user' };
  if (t.includes('instrumentation')) return { key: 'instrumentation', name: 'Instrumentation', icon: 'fas fa-gauge' };
  if (t.includes('mass and balance') || t.includes('mass & balance') || t.includes('mass')) return { key: 'mass-balance', name: 'Mass and Balance', icon: 'fas fa-weight-scale' };
  if (t.includes('meteorology')) return { key: 'meteorology', name: 'Meteorology', icon: 'fas fa-cloud-sun' };
  if (t.includes('operational procedure')) return { key: 'operational-procedures', name: 'Operational Procedures', icon: 'fas fa-cogs' };
  if (t.includes('performance')) return { key: 'performance', name: 'Aircraft Performance', icon: 'fas fa-tachometer-alt' };
  if (t.includes('principles of flight') || t.includes('principle of flight')) return { key: 'principles-of-flight', name: 'Principles of Flight', icon: 'fas fa-paper-plane' };
  if (t.includes('general navigation') || t.includes('navigation test')) return { key: 'general-navigation', name: 'General Navigation', icon: 'fas fa-compass' };
  if (t.includes('aircraft general knowledge')) return { key: 'aircraft-general', name: 'Aircraft General Knowledge', icon: 'fas fa-plane' };
  return null;
}

function parseQuestionParagraph(paragraph) {
  try {
    const numMatch = paragraph.match(/^(\d+)\.\s+/);
    if (!numMatch) return null;

    const corr = paragraph.match(/Correct\s*Answer:\s*([A-D])/i);
    if (!corr) return null;
    const correctIdx = corr[1].toUpperCase().charCodeAt(0) - 65;

    // Extract optional explanation in parentheses after Correct Answer
    const expMatch = paragraph.match(/Correct\s*Answer:\s*[A-D]\s*\((.*?)\)/i);
    const explanation = expMatch ? clean(expMatch[1]) : null;

    let content = paragraph
      .replace(/^\d+\.\s+/, '')
      .replace(/\s*Correct\s*Answer:.*$/i, '')
      .trim();

    // Find where options start (look for ' A. ' or ' A) ')
    const optIdx = content.search(/\sA[\.)]\s/);
    if (optIdx === -1) return null;

    const qText = clean(content.substring(0, optIdx));
    const optsText = content.substring(optIdx);

    // Split options reliably: " A. text B. text C. text D. text"
    const parts = optsText.split(/\s([A-D])[\.)]\s/).filter(Boolean);
    const options = [];
    for (let i = 0; i < parts.length && options.length < 4; i += 2) {
      const letter = parts[i];
      let txt = parts[i + 1] || '';
      // Stop at next option marker if any leftover joined
      txt = txt.replace(/\s+[A-D][\.)]\s[\s\S]*/, '').trim();
      if (letter && txt) options.push(clean(txt));
    }

    if (!qText || options.length !== 4) return null; // enforce 4 options for validator
    if (correctIdx < 0 || correctIdx > 3) return null;

    return { question: qText, options, correct: correctIdx, explanation };
  } catch (e) {
    return null;
  }
}

function extractFromHtml(html, fallbackCategory) {
  // Tokenize by </p> then strip tags and entities
  const token = '|||P|||';
  const withTokens = html.replace(/<\/(p|P)>/g, token);
  const noTags = withTokens.replace(/<[^>]*>/g, ' ');
  const noEntities = noTags.replace(/&[^;]+;/g, ' ');
  const normalized = clean(noEntities);
  const paragraphs = normalized.split(token).map((p) => clean(p)).filter(Boolean);

  let currentCategory = fallbackCategory || { key: 'imported', name: 'Imported', icon: 'fas fa-file-import' };
  const results = [];

  for (const p of paragraphs) {
    const byContent = detectCategoryFromContent(p);
    if (byContent) { currentCategory = byContent; continue; }
    if (/^\d+\./.test(p) && /Correct\s*Answer\s*:/i.test(p)) {
      const q = parseQuestionParagraph(p);
      if (q) results.push({ ...q, category: currentCategory.key, categoryName: currentCategory.name });
    }
  }
  return results;
}

function organizeByCategory(results, fileBase) {
  const byCat = {};
  for (const r of results) {
    if (!byCat[r.category]) {
      byCat[r.category] = { name: r.categoryName, icon: 'fas fa-file-import', tests: [] };
    }
    // Create a test per file for clarity
    let test = byCat[r.category].tests.find(t => t.name === `${r.categoryName} - ${fileBase}`);
    if (!test) {
      test = { name: `${r.categoryName} - ${fileBase}`, timeLimit: 180, questions: [] };
      byCat[r.category].tests.push(test);
    }
    test.questions.push({ question: r.question, options: r.options, correct: r.correct, explanation: r.explanation || null });
  }
  return byCat;
}

function loadExisting() {
  delete require.cache[require.resolve(TESTDATA_JS)];
  return require(TESTDATA_JS);
}

function mergeCategory(merged, key, catToAdd) {
  if (!merged[key]) { merged[key] = catToAdd; return; }
  const target = merged[key];
  // Seen set of normalized questions across all tests in target category
  const norm = (s) => clean(String(s||'')).toLowerCase();
  const seen = new Set();
  target.tests.forEach(t => (t.questions||[]).forEach(q => seen.add(norm(q.question))));
  for (const srcTest of catToAdd.tests) {
    const newQs = (srcTest.questions||[]).filter(q => !seen.has(norm(q.question)));
    if (newQs.length) {
      target.tests.push({ name: srcTest.name, timeLimit: srcTest.timeLimit || 180, questions: newQs });
      newQs.forEach(q => seen.add(norm(q.question)));
    }
  }
}

function backupTestData() {
  const ts = Date.now();
  const backupPath = path.join(DATA_DIR, `testData.backup_${ts}.js`);
  fs.copyFileSync(TESTDATA_JS, backupPath);
  return backupPath;
}

function writeTestData(obj) {
  const header = `// Aviation Test Data - Updated with added folder import\n// Generated: ${new Date().toISOString()}\n\n`;
  const body = 'const testData = ' + JSON.stringify(obj, null, 2) + `;\n\n// Attach to window for browser usage\nif (typeof window !== 'undefined') {\n  window.testData = testData;\n}\n\n// Export for use in modules (Node/CommonJS)\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = testData;\n}\n`;
  fs.writeFileSync(TESTDATA_JS, header + body, 'utf8');
}

function main() {
  if (!fs.existsSync(ADDED_DIR)) {
    console.error('Added folder not found:', ADDED_DIR);
    process.exit(1);
  }
  const files = fs.readdirSync(ADDED_DIR).filter(f => /\.htm(l)?$/i.test(f));
  if (files.length === 0) {
    console.log('No .htm files found in', ADDED_DIR);
    return;
  }

  console.log('Importing from files:', files.join(', '));
  const existing = loadExisting();
  const merged = { ...existing };

  let totalExtracted = 0;
  for (const f of files) {
    const full = path.join(ADDED_DIR, f);
    const base = path.basename(f, path.extname(f)).trim();
    const html = readTextGuessingEncoding(full);
    const fallbackCat = detectCategoryFromFilename(base) || { key: 'imported', name: 'Imported', icon: 'fas fa-file-import' };
    const results = extractFromHtml(html, fallbackCat);
    totalExtracted += results.length;
    const byCat = organizeByCategory(results, base);
    for (const [key, cat] of Object.entries(byCat)) {
      mergeCategory(merged, key, cat);
    }
    console.log(` - ${f}: extracted ${results.length} questions`);
  }

  console.log(`Total extracted: ${totalExtracted}`);
  const backupPath = backupTestData();
  console.log('Backup created at', backupPath);
  writeTestData(merged);
  console.log('Updated testData.js with imported questions.');
}

if (require.main === module) {
  try { main(); } catch (e) { console.error(e); process.exit(1); }
}
