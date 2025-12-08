// Parse a Microsoft Word HTML export of AGK tests and emit a JS data blob
// Usage: node tools/extract_agk_word.js "C:\\Users\\ahmed\\Desktop\\Aircraft General Knowledge Test 1.htm"

const fs = require('fs');
const path = require('path');

function readFileSmart(p) {
  try { return fs.readFileSync(p, 'utf8'); } catch (e) {}
  try { return fs.readFileSync(p, 'latin1'); } catch (e) {}
  return fs.readFileSync(p);
}

function htmlToText(html) {
  // Replace <br> and <p> with newlines for better segmentation
  html = html.replace(/<\s*br\s*\/?\s*>/gi, '\n');
  html = html.replace(/<\s*\/p\s*>/gi, '\n');
  // Strip remaining tags
  html = html.replace(/<[^>]+>/g, ' ');
  // Decode common entities
  html = html
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"');
  // Normalize unicode oddities
  html = html.replace(/[\u00A0\u200B\uFEFF]/g, ' ');
  // Normalize degrees artifacts
  html = html.replace(/[°º]/g, '°');
  // Collapse whitespace
  return html.replace(/\r/g, '\n').replace(/[\t ]+/g, ' ').replace(/\n{2,}/g, '\n').trim();
}

function splitSections(text) {
  const re = /(Aircraft\s+General\s+Knowledge\s+Test\s+(\d+))/gi;
  const sections = [];
  let lastIndex = 0;
  let m;
  while ((m = re.exec(text)) !== null) {
    if (sections.length) {
      sections[sections.length - 1].content = text.slice(lastIndex, m.index).trim();
    }
    sections.push({ title: m[1].replace(/\s+/g, ' ').trim(), number: m[2], content: '' });
    lastIndex = m.index + m[0].length;
  }
  if (sections.length) {
    sections[sections.length - 1].content = text.slice(lastIndex).trim();
  } else {
    // Fallback single section
    sections.push({ title: 'AGK Import', number: 'N/A', content: text });
  }
  return sections;
}

function parseQuestions(sectionText) {
  const blocks = [];
  // Ensure each question starts at a new line like "1. "
  const normalized = sectionText
    .replace(/\n\s*\(Note:[^\n]*\)/gi, '\n')
    .replace(/\s+Correct\s*Answer\s*:/gi, ' Correct Answer:')
    .replace(/\s+/g, ' ')
    .replace(/\s*\n\s*/g, '\n');

  const qre = /(\n|^)(\d{1,3})\.\s+([\s\S]*?)(?=(\n\d{1,3}\.\s)|$)/g;
  let m;
  while ((m = qre.exec(normalized)) !== null) {
    const raw = m[3].trim();
    const q = extractQA(raw);
    if (q) blocks.push(q);
  }
  return blocks;
}

function cleanOptionText(s) {
  // Remove stray trailing digits (from Word export artifacts)
  s = s.replace(/\s+[0-9]{1,2}\s*$/, '').trim();
  // Remove double spaces and artifact markers
  s = s.replace(/\s{2,}/g, ' ').trim();
  // Remove enclosing quotes
  s = s.replace(/^"|"$/g, '');
  return s;
}

function extractQA(raw) {
  // Find Correct Answer letter
  const caMatch = raw.match(/Correct\s*Answer\s*:\s*([A-D])/i);
  const correctLetter = caMatch ? caMatch[1].toUpperCase() : null;
  const rawNoCA = caMatch ? raw.slice(0, caMatch.index).trim() : raw;

  // Split options by A. B. C. D.
  // Allow for artifacts like 3B. by matching optional digits before the letter
  const splitRe = /(?:(?:^|\s))(?:[0-9]{0,2})?([A-D])\.\s+/g;
  const parts = [];
  let lastIdx = 0; let sm;
  while ((sm = splitRe.exec(rawNoCA)) !== null) {
    const letter = sm[1].toUpperCase();
    if (parts.length) {
      const prev = parts[parts.length - 1];
      prev.text = rawNoCA.slice(prev.start, sm.index).trim();
    }
    parts.push({ letter, start: splitRe.lastIndex, text: '' });
  }
  if (parts.length) {
    parts[parts.length - 1].text = rawNoCA.slice(parts[parts.length - 1].start).trim();
  }

  // Question stem = portion before first option marker
  let qStem = rawNoCA;
  if (parts.length) {
    const firstStart = rawNoCA.indexOf('A.');
    if (firstStart > 0) qStem = rawNoCA.slice(0, firstStart).trim();
  }

  if (!parts.length || parts.length < 2) {
    // Not a valid MCQ
    return null;
  }

  const optionsMap = { A: '', B: '', C: '', D: '' };
  for (const p of parts) {
    if (optionsMap.hasOwnProperty(p.letter)) {
      optionsMap[p.letter] = cleanOptionText(p.text);
    }
  }
  const options = ['A', 'B', 'C', 'D'].map(k => optionsMap[k]).filter(Boolean);
  if (options.length < 2) return null;

  let correct = null;
  if (correctLetter && optionsMap[correctLetter]) {
    correct = ['A','B','C','D'].indexOf(correctLetter);
  }

  // Final cleanup
  qStem = qStem.replace(/\s{2,}/g, ' ').replace(/^\d+\.?\s*/, '').trim();

  return { question: qStem, options, correct };
}

function buildImport(text) {
  const sections = splitSections(text);
  const tests = [];
  for (const s of sections) {
    const qs = parseQuestions(s.content);
    if (qs.length) tests.push({ name: s.title, timeLimit: 60, questions: qs });
  }
  return { category: 'aircraft-general', tests };
}

function writeJs(outPath, data) {
  const banner = `// Generated from Word HTML on ${new Date().toISOString()}\n`;
  const body = `window.agkWordImport = ${JSON.stringify(data, null, 2)};\n`;
  fs.writeFileSync(outPath, banner + body, 'utf8');
}

(function main(){
  const inPath = process.argv[2] || path.join(process.env.USERPROFILE || 'C:/Users', 'ahmed', 'Desktop', 'Aircraft General Knowledge Test 1.htm');
  const outPath = path.join(process.cwd(), 'src', 'data', 'agk_word_import.js');
  const raw = readFileSmart(inPath);
  const text = htmlToText(raw.toString());
  const data = buildImport(text);
  writeJs(outPath, data);
  console.log(`✅ Parsed ${data.tests.reduce((n,t)=>n+t.questions.length,0)} questions across ${data.tests.length} tests → ${outPath}`);
})();
