const fs = require('fs');
const path = require('path');

const INDEX_PATH = path.resolve(__dirname, '..', 'www', 'index.html');
const OUT_DIR = path.resolve(__dirname, '..', 'build');
const OUT_PATH = path.join(OUT_DIR, 'index_parsed.json');

if (!fs.existsSync(INDEX_PATH)) {
  console.error('index.html not found at', INDEX_PATH);
  process.exit(1);
}

const html = fs.readFileSync(INDEX_PATH, 'utf8');

const results = [];
let idx = 0;
while (true) {
  const pushAt = html.indexOf('window.addedImports.push(', idx);
  if (pushAt === -1) break;
  // find first '{' after the push(
  const braceStart = html.indexOf('{', pushAt);
  if (braceStart === -1) break;
  // scan until matching brace
  let i = braceStart;
  let depth = 0;
  let inString = false;
  let stringChar = '';
  let prevChar = '';
  for (; i < html.length; i++) {
    const ch = html[i];
    if (!inString && (ch === '"' || ch === "'")) {
      inString = true;
      stringChar = ch;
    } else if (inString && ch === stringChar && prevChar !== '\\') {
      inString = false;
      stringChar = '';
    }
    if (!inString) {
      if (ch === '{') depth++;
      else if (ch === '}') {
        depth--;
        if (depth === 0) { i++; break; }
      }
    }
    prevChar = ch;
  }
  const objText = html.slice(braceStart, i);
  // attempt to clean up common JS-only tokens (remove JS comments)
  const cleaned = objText.replace(/\/\*[^]*?\*\//g, '')
                         .replace(/\/\/.*$/gm, '');
  try {
    const parsed = JSON.parse(cleaned);
    results.push(parsed);
  } catch (e) {
    // If JSON.parse fails, try a safer eval inside a sandboxed Function
    try {
      const fn = new Function('return (' + objText + ')');
      const val = fn();
      results.push(val);
    } catch (e2) {
      console.error('Failed to parse addedImports payload starting at', pushAt, 'error:', e2.message);
      // store a marker so we can inspect later
      results.push({ _parseError: true, raw: objText.slice(0, 500) });
    }
  }
  idx = i;
}

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_PATH, JSON.stringify(results, null, 2), 'utf8');

// compute counts
let totalQuestions = 0;
const counts = {};
results.forEach(item => {
  if (!item || item._parseError) return;
  const cat = item.category || 'unknown';
  let catCount = 0;
  if (Array.isArray(item.tests)) {
    item.tests.forEach(t => {
      if (Array.isArray(t.questions)) catCount += t.questions.length;
    });
  }
  counts[cat] = (counts[cat] || 0) + catCount;
  totalQuestions += catCount;
});

console.log('Extracted payloads:', results.length);
console.log('Per-category question counts:', counts);
console.log('Total questions:', totalQuestions);
console.log('Wrote', OUT_PATH);

process.exit(0);
