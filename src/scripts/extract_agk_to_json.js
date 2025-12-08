const fs = require('fs');

// Extract Aircraft General Knowledge tests from c:\\Users\\ahmed\\Desktop\\added\\agk1 .htm
// and write pure JSON to src/data/extracted_agk_added.json grouped by tests.
(function main() {
  const inputFile = 'C:\\Users\\ahmed\\Desktop\\added\\agk1 .htm';
  const outputJson = __dirname.replace(/\\src\\scripts$/, '') + '\\src\\data\\extracted_agk_added.json';

  console.log('Reading AGK source HTML:', inputFile);
  let html;
  try {
    html = fs.readFileSync(inputFile, 'latin1');
  } catch (e) {
    console.error('Failed to read AGK file:', e.message);
    process.exit(1);
  }

  // Normalize text helper
  const toText = (s) => String(s)
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;|&amp;|&quot;|&lt;|&gt;|&#\d+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const text = toText(html);

  // We'll iterate by each Correct Answer marker and backtrack for Q and options, while detecting nearest Test heading
  const correctRe = /Correct\s*Answer\s*:\s*([A-D])/g;
  const headingRe = /Aircraft General Knowledge Test\s*(\d+)/gi;

  // Build heading positions for mapping index->test name
  const headings = [];
  let hm;
  while ((hm = headingRe.exec(text)) !== null) {
    headings.push({ index: hm.index, name: `Aircraft General Knowledge Test ${hm[1]}` });
  }

  function findTestName(pos) {
    // last heading before pos
    let name = 'Aircraft General Knowledge';
    for (let i = 0; i < headings.length; i++) {
      if (headings[i].index <= pos) name = headings[i].name; else break;
    }
    return name;
  }

  function parseQnA(chunk, correctIndex) {
    // Strip trailing artifacts like footnote digits near option ends
    const cleaned = chunk
      .replace(/\s+(\d{1,3})(?=\s|$)/g, ' ') // drop trailing numbers
      .replace(/\s+\(Note:[^)]*\)$/i, ' ') // drop trailing notes
      .trim();
    // Try with numbered pattern
    let match = cleaned.match(/(?:\d+\.)\s+([^]*?)\s+A\.?\s+([^]*?)\s+B\.?\s+([^]*?)(?:\s+C\.?\s+([^]*?))?(?:\s+D\.?\s+([^]*?))?\s*$/i);
    if (!match) {
      match = cleaned.match(/([^]*?)\s+A\.?\s+([^]*?)\s+B\.?\s+([^]*?)(?:\s+C\.?\s+([^]*?))?(?:\s+D\.?\s+([^]*?))?\s*$/i);
    }
    if (!match) return null;
    const question = match[1].trim();
    const opts = [match[2], match[3], match[4], match[5]].filter(Boolean).map(s => s.trim());
    if (!question || opts.length < 2) return null;
    if (correctIndex < 0 || correctIndex >= opts.length) return null;
    return { question, options: opts, correct: correctIndex };
  }

  const results = [];
  let m;
  let processed = 0;
  while ((m = correctRe.exec(text)) !== null) {
    const letter = m[1];
    const correctIndex = letter.charCodeAt(0) - 65;
    const endPos = m.index;
    const startWindow = Math.max(0, endPos - 4000);
    const chunk = text.substring(startWindow, endPos);

    const qna = parseQnA(chunk, correctIndex);
    if (qna) {
      const testName = findTestName(endPos);
      results.push({ testName, ...qna });
      processed++;
      if (processed % 50 === 0) console.log(`Parsed ${processed}...`);
    }
  }

  console.log(`Total parsed: ${results.length}`);

  // Group into category aircraft-general with tests by name
  const grouped = {
    'aircraft-general': {
      name: 'Aircraft General Knowledge',
      icon: 'fas fa-plane',
      tests: []
    }
  };
  const testMap = new Map();
  for (const r of results) {
    if (!testMap.has(r.testName)) {
      const t = { name: r.testName, timeLimit: 180, questions: [] };
      testMap.set(r.testName, t);
      grouped['aircraft-general'].tests.push(t);
    }
    testMap.get(r.testName).questions.push({
      question: r.question,
      options: r.options,
      correct: r.correct,
      explanation: null
    });
  }

  try {
    fs.writeFileSync(outputJson, JSON.stringify(grouped, null, 2), 'utf8');
    console.log('Wrote extracted JSON to', outputJson);
  } catch (e) {
    console.error('Failed to write extracted JSON:', e.message);
    process.exit(1);
  }
})();
