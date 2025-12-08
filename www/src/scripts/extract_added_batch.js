const fs = require('fs');
const path = require('path');

// Scan C:\\Users\\ahmed\\Desktop\\added for .htm files and extract questions to src/data/extracted_added_batch.json
(function main(){
  const inputDir = 'C:\\Users\\ahmed\\Desktop\\added';
  const outputJson = path.resolve(__dirname, '..', 'data', 'extracted_added_batch.json');

  console.log('Reading directory:', inputDir);
  let files = [];
  try {
    files = fs.readdirSync(inputDir).filter(f => f.toLowerCase().endsWith('.htm') || f.toLowerCase().endsWith('.html'));
  } catch (e) {
    console.error('Failed to list added folder:', e.message);
    process.exit(1);
  }
  if (!files.length) {
    console.log('No HTML files found under', inputDir);
    fs.writeFileSync(outputJson, JSON.stringify({}, null, 2), 'utf8');
    process.exit(0);
  }

  function normalizeHtmlToText(html){
    return String(html)
      .replace(/<[^>]*>/g, ' ')
      .replace(/&[^;]+;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function guessCategory(chunk){
    const t = chunk.toLowerCase();
    if (t.includes('aircraft general')) return { key: 'aircraft-general', name: 'Aircraft General Knowledge', icon: 'fas fa-plane' };
    if (t.includes('air law')) return { key: 'air-law', name: 'Air Law', icon: 'fas fa-gavel' };
    if (t.includes('aon aviation')) return { key: 'aon-aviation', name: 'AON Aviation', icon: 'fas fa-graduation-cap' };
    if (t.includes('flight planning')) return { key: 'flight-planning', name: 'Flight Planning', icon: 'fas fa-route' };
    if (t.includes('operational procedures')) return { key: 'operational-procedures', name: 'Operational Procedures', icon: 'fas fa-cogs' };
    if (t.includes('radio navigation') || t.includes('nav ') || t.includes('vor ') || t.includes('ils ') ) return { key: 'radio-navigation', name: 'Radio Navigation', icon: 'fas fa-broadcast-tower' };
    if (t.includes('meteorolog') || t.includes('weather')) return { key: 'metrology', name: 'Meteorology & Weather', icon: 'fas fa-cloud-sun' };
    if (t.includes('mass') && t.includes('balance')) return { key: 'mass-balance', name: 'Mass & Balance', icon: 'fas fa-balance-scale' };
    if (t.includes('instrument')) return { key: 'instrumentation', name: 'Instrumentation', icon: 'fas fa-gauge' };
    if (t.includes('performance')) return { key: 'performance', name: 'Aircraft Performance', icon: 'fas fa-chart-line' };
    if (t.includes('general navigation')) return { key: 'general-navigation', name: 'General Navigation', icon: 'fas fa-compass' };
    if (t.includes('human performance')) return { key: 'human-performance', name: 'Human Performance & Limitations', icon: 'fas fa-user-md' };
    return { key: 'aircraft-general', name: 'Aircraft General Knowledge', icon: 'fas fa-plane' };
  }

  function parseQnA(text, correctIndex){
    const cleaned = text
      .replace(/\s+(\d{1,3})(?=\s|$)/g, ' ')
      .replace(/\s+\(Note:[^)]*\)$/i, ' ')
      .trim();
    let match = cleaned.match(/(?:\d+\.)\s+([^]*?)\s+A\.?\s+([^]*?)\s+B\.?\s+([^]*?)(?:\s+C\.?\s+([^]*?))?(?:\s+D\.?\s+([^]*?))?\s*$/i);
    if (!match) match = cleaned.match(/([^]*?)\s+A\.?\s+([^]*?)\s+B\.?\s+([^]*?)(?:\s+C\.?\s+([^]*?))?(?:\s+D\.?\s+([^]*?))?\s*$/i);
    if (!match) return null;
    const question = match[1].trim();
    const opts = [match[2], match[3], match[4], match[5]].filter(Boolean).map(s=>s.trim());
    if (!question || opts.length < 2) return null;
    if (correctIndex < 0 || correctIndex >= opts.length) return null;
    return { question, options: opts, correct: correctIndex };
  }

  // Grouped output structure
  const grouped = {};

  for (const file of files) {
    const full = path.join(inputDir, file);
    console.log('Parsing:', full);
    let html;
    try { html = fs.readFileSync(full, 'latin1'); } catch (e) { console.warn('Skip (read failed):', e.message); continue; }
    const text = normalizeHtmlToText(html);
    const correctRe = /Correct\s*Answer\s*:\s*([A-D])/g;
    const headings = [];
    const headingRe = /(Aircraft General Knowledge|[A-Za-z ]+?)\s+Test\s*(\d+)/gi;
    let hm;
    while ((hm = headingRe.exec(text)) !== null) {
      headings.push({ index: hm.index, name: `${hm[1]} Test ${hm[2]}` });
    }
    function findTestName(pos) {
      let name = path.parse(file).name;
      for (let i=0;i<headings.length;i++) {
        if (headings[i].index <= pos) name = headings[i].name; else break;
      }
      return name;
    }

    const catInfo = guessCategory(text);
    if (!grouped[catInfo.key]) grouped[catInfo.key] = { name: catInfo.name, icon: catInfo.icon, tests: [] };
    const testsMap = new Map(grouped[catInfo.key].tests.map(t => [t.name, t]));

    let m;
    let parsed = 0;
    while ((m = correctRe.exec(text)) !== null) {
      const correctIndex = m[1].charCodeAt(0) - 65;
      const endPos = m.index;
      const startWindow = Math.max(0, endPos - 5000);
      const chunk = text.substring(startWindow, endPos);
      const qna = parseQnA(chunk, correctIndex);
      if (!qna) continue;
      const testName = findTestName(endPos);
      if (!testsMap.has(testName)) {
        const t = { name: testName, timeLimit: 180, questions: [] };
        testsMap.set(testName, t);
        grouped[catInfo.key].tests.push(t);
      }
      testsMap.get(testName).questions.push({ ...qna, explanation: null });
      parsed++;
    }
    console.log(`  -> Parsed ${parsed} questions`);
  }

  try {
    fs.writeFileSync(outputJson, JSON.stringify(grouped, null, 2), 'utf8');
    console.log('Wrote batch extracted JSON to', outputJson);
  } catch (e) {
    console.error('Failed to write output JSON:', e.message);
    process.exit(1);
  }
})();
