const fs = require('fs');
const path = require('path');

const INPUT_HTML = 'C:\\Users\\ahmed\\Desktop\\617.htm';
const OUT_JSON = path.resolve(__dirname, '..', 'src', 'data', 'extracted_from_617.json');
const TESTDATA_JS = path.resolve(__dirname, '..', 'src', 'data', 'testData.js');

function detectCategory(text) {
  const t = text.toLowerCase();
  if (t.includes('aircraft general knowledge test')) return { key: 'aircraft-general', name: 'Aircraft General Knowledge', icon: 'fas fa-plane' };
  if (t.includes('air law test') || (t.includes('air law') && t.includes('test'))) return { key: 'air-law', name: 'Air Law', icon: 'fas fa-gavel' };
  if (t.includes('aon aviation test') || (t.includes('aon aviation') && t.includes('test'))) return { key: 'aon-aviation', name: 'AON Aviation', icon: 'fas fa-graduation-cap' };
  if (t.includes('flight planning test') || (t.includes('flight planning') && t.includes('test'))) return { key: 'flight-planning', name: 'Flight Planning', icon: 'fas fa-route' };
  if (t.includes('operational procedures test') || (t.includes('operational procedures') && t.includes('test'))) return { key: 'operational-procedures', name: 'Operational Procedures', icon: 'fas fa-cogs' };
  if (t.includes('radio navigation test') || (t.includes('radio navigation') && t.includes('test'))) return { key: 'radio-navigation', name: 'Radio Navigation', icon: 'fas fa-broadcast-tower' };
  if (t.includes('instrumentation')) return { key: 'instrumentation', name: 'Instrumentation', icon: 'fas fa-gauge' };
  return null;
}

function parseQuestionParagraph(paragraph) {
  try {
    const numberMatch = paragraph.match(/^(\d+)\.\s+/);
    if (!numberMatch) return null;
    const correctMatch = paragraph.match(/Correct\s*Answer:\s*([A-D])/i);
    if (!correctMatch) return null;
    const correctLetter = correctMatch[1].toUpperCase();
    const correctIndex = correctLetter.charCodeAt(0) - 65;

    let content = paragraph
      .replace(/^\d+\.\s+/, '')
      .replace(/\s*Correct\s*Answer:.*$/i, '')
      .trim();

    // Find where options start (look for ' A. ' or ' A) ' or ' A ) ')
    const optIdx = content.search(/\sA[\.)]\s/);
    if (optIdx === -1) return null;

    const qText = content.substring(0, optIdx).trim();
    const optsText = content.substring(optIdx);

    // Split options: capture letter and text pairs
    const parts = optsText.split(/\s([A-D])[\.)]\s/).filter(Boolean);
    const options = [];
    for (let i = 0; i < parts.length; i += 2) {
      const letter = parts[i];
      const txt = (parts[i + 1] || '').trim();
      if (!letter || !txt) continue;
      // Stop at the next marker if any residual
      const cleaned = txt.replace(/\s+[A-D][\.)]\s[\s\S]*/, '');
      options.push(cleaned.trim());
    }

    if (!qText || options.length < 2) return null;
    if (correctIndex < 0 || correctIndex >= options.length) return null;

    return { question: qText, options, correct: correctIndex };
  } catch {
    return null;
  }
}

function extractFromHtml(html) {
  const token = '|||P|||';
  const withTokens = html.replace(/<\/p>/gi, token);
  const noTags = withTokens.replace(/<[^>]*>/g, ' ');
  const noEntities = noTags.replace(/&[^;]+;/g, ' ');
  const normalized = noEntities
    .replace(/[\t\r]+/g, ' ')
    .replace(/\n+/g, '\n')
    .replace(/ +/g, ' ');
  const paragraphs = normalized.split(token).map(p => p.trim()).filter(Boolean);

  const results = [];
  let currentCategory = { key: 'imported-617', name: 'Imported from 617.htm', icon: 'fas fa-file-import' };

  for (const p of paragraphs) {
    const maybeCat = detectCategory(p);
    if (maybeCat) { currentCategory = maybeCat; continue; }

    if (/^\d+\./.test(p) && /Correct\s*Answer\s*:/i.test(p)) {
      const q = parseQuestionParagraph(p);
      if (q) {
        results.push({ ...q, category: currentCategory.key, categoryName: currentCategory.name });
      }
    }
  }
  return results;
}

function organize(results) {
  const byCat = {};
  for (const r of results) {
    if (!byCat[r.category]) {
      byCat[r.category] = { name: r.categoryName, icon: 'fas fa-file-import', tests: [{ name: r.categoryName + ' - 617 Import', timeLimit: 180, questions: [] }] };
    }
    byCat[r.category].tests[0].questions.push({ question: r.question, options: r.options, correct: r.correct, explanation: null });
  }
  return byCat;
}

function loadTestData() {
  delete require.cache[require.resolve(TESTDATA_JS)];
  try { return require(TESTDATA_JS); } catch (e) { return null; }
}

function mergeIntoExisting(existing, imported) {
  const merged = { ...(existing || {}) };
  for (const [key, cat] of Object.entries(imported)) {
    if (!merged[key]) {
      merged[key] = cat;
      continue;
    }
    // Deduplicate by question text across all tests in category
    const seen = new Set();
    for (const t of merged[key].tests) {
      for (const q of (t.questions || [])) seen.add(q.question.trim());
    }
    const newQs = cat.tests[0].questions.filter(q => !seen.has(q.question.trim()));
    if (newQs.length) {
      merged[key].tests.push({ name: cat.tests[0].name, timeLimit: 180, questions: newQs });
    }
  }
  return merged;
}

function writeTestData(obj) {
  const header = `// Aviation Test Data - Updated with 617.htm import\n// Generated: ${new Date().toLocaleString()}\n\n`;
  const body = 'const testData = ' + JSON.stringify(obj, null, 2) + ';\n\nif (typeof module !== "undefined" && module.exports) { module.exports = testData; }\n';
  fs.writeFileSync(TESTDATA_JS, header + body, 'utf8');
}

async function main() {
  const html = fs.readFileSync(INPUT_HTML, 'latin1');
  const results = extractFromHtml(html);
  console.log(`Extracted ${results.length} questions from 617.htm`);
  const organized = organize(results);
  fs.writeFileSync(OUT_JSON, JSON.stringify(organized, null, 2), 'utf8');
  console.log('Saved extracted JSON to', OUT_JSON);
  const existing = loadTestData();
  const merged = mergeIntoExisting(existing, organized);
  writeTestData(merged);
  console.log('Merged into src/data/testData.js');
}

main().catch(err => { console.error(err); process.exit(1); });
