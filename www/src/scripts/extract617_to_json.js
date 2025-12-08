const fs = require('fs');

// Extract questions from c:\\Users\\ahmed\\Desktop\\617.htm and write pure JSON to src/data/extracted617.json
(function main() {
  const inputFile = 'C:\\Users\\ahmed\\Desktop\\617.htm';
  const outputJson = __dirname.replace(/\\src\\scripts$/, '') + '\\src\\data\\extracted617.json';

  console.log('Reading source HTML:', inputFile);
  let html;
  try {
    html = fs.readFileSync(inputFile, 'latin1');
  } catch (e) {
    console.error('Failed to read 617.htm:', e.message);
    process.exit(1);
  }

  // Use a robust approach: walk through every "Correct Answer:" and backtrack to question/options
  const results = [];
  const correctRe = /Correct Answer:\s*([A-D])/g;
  let m;
  let idx = 0;
  while ((m = correctRe.exec(html)) !== null) {
    const correctLetter = m[1];
    const correctIndex = correctLetter.charCodeAt(0) - 65; // A=0
    const endPos = m.index;

    // Look back a window for the question and options
    const startWindow = Math.max(0, endPos - 3000);
    const chunk = html.substring(startWindow, endPos);

    // Clean to text
    const text = chunk
      .replace(/<[^>]*>/g, ' ')
      .replace(/&[^;]+;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    // Try to find question and options with variants
    const parsed = parseQnA(text, correctIndex);
    if (parsed) {
      // Category inference: look for category headings nearby in chunk
      const det = detectCategory(chunk);
      results.push({
        category: det.key,
        categoryName: det.name,
      question: parsed.question,
        options: parsed.options,
        correct: parsed.correct
      });
      idx++;
      if (idx % 50 === 0) console.log(`Extracted ${idx} questions...`);
    }
  }

  console.log(`Total extracted: ${results.length}`);

  // Group by category and emit JSON structure compatible for merging
  const grouped = {};
  for (const q of results) {
    if (!grouped[q.category]) {
      grouped[q.category] = {
        name: q.categoryName,
        icon: guessIcon(q.category),
        tests: [
          { name: '617 Import', timeLimit: 180, questions: [] }
        ]
      };
    }
    grouped[q.category].tests[0].questions.push({
      question: q.question,
      options: q.options,
      correct: q.correct,
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

function parseQnA(text, correctIndex) {
  // Try with numbered pattern
  let match = text.match(/(\d+)\.\s+([^]*?)\s+A\.\s+([^]*?)\s+B\.\s+([^]*?)(?:\s+C\.\s+([^]*?))?(?:\s+D\.\s+([^]*?))?\s*$/);
  if (!match) {
    // Try without number
    match = text.match(/([^]*?)\s+A\.\s+([^]*?)\s+B\.\s+([^]*?)(?:\s+C\.\s+([^]*?))?(?:\s+D\.\s+([^]*?))?\s*$/);
  }
  if (!match) return null;

  const question = (match[2] ? match[2] : match[1]).trim();
  const options = [match[3], match[4], match[5], match[6]]
    .filter(Boolean)
    .map(s => s.replace(/Correct Answer.*$/i, '').trim())
    .filter(s => s.length > 0);
  if (!question || options.length < 2) return null;
  if (correctIndex < 0 || correctIndex >= options.length) return null;
  return { question, options, correct: correctIndex };
}

function detectCategory(chunk) {
  const t = chunk.toLowerCase();
  if (t.includes('aircraft general')) return { key: 'aircraft-general', name: 'Aircraft General Knowledge' };
  if (t.includes('air law')) return { key: 'air-law', name: 'Air Law' };
  if (t.includes('aon aviation')) return { key: 'aon-aviation', name: 'AON Aviation' };
  if (t.includes('flight planning')) return { key: 'flight-planning', name: 'Flight Planning' };
  if (t.includes('operational procedures')) return { key: 'operational-procedures', name: 'Operational Procedures' };
  if (t.includes('radio navigation')) return { key: 'radio-navigation', name: 'Radio Navigation' };
  if (t.includes('meteorolog') || t.includes('meteo')) return { key: 'metrology', name: 'Meteorology & Weather' };
  if (t.includes('mass') && t.includes('balance')) return { key: 'mass-balance', name: 'Mass & Balance' };
  if (t.includes('instrument')) return { key: 'instrumentation', name: 'Instrumentation' };
  if (t.includes('performance')) return { key: 'performance', name: 'Aircraft Performance' };
  if (t.includes('general navigation')) return { key: 'general-navigation', name: 'General Navigation' };
  if (t.includes('human performance')) return { key: 'human-performance', name: 'Human Performance & Limitations' };
  return { key: 'aircraft-general', name: 'Aircraft General Knowledge' };
}

function guessIcon(category) {
  const icons = {
    'aircraft-general': 'fas fa-plane',
    'air-law': 'fas fa-gavel',
    'aon-aviation': 'fas fa-graduation-cap',
    'flight-planning': 'fas fa-route',
    'operational-procedures': 'fas fa-cogs',
    'radio-navigation': 'fas fa-broadcast-tower',
    'metrology': 'fas fa-cloud-sun',
    'mass-balance': 'fas fa-balance-scale',
    'instrumentation': 'fas fa-gauge',
    'performance': 'fas fa-chart-line',
    'general-navigation': 'fas fa-compass',
    'human-performance': 'fas fa-user-md'
  };
  return icons[category] || 'fas fa-question';
}
