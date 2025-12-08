const fs = require('fs');
const path = require('path');
const vm = require('vm');

const INDEX_PATH = path.resolve(__dirname, '..', 'www', 'index.html');
const OUT_DIR = path.resolve(__dirname, '..', 'build');
const OUT_PATH = path.join(OUT_DIR, 'index_parsed_vm.json');

if (!fs.existsSync(INDEX_PATH)) {
  console.error('index.html not found at', INDEX_PATH);
  process.exit(1);
}

const html = fs.readFileSync(INDEX_PATH, 'utf8');

const pushRegex = /window\.addedImports\.push\s*\(/g;
let match;
const statements = [];
while ((match = pushRegex.exec(html)) !== null) {
  const start = match.index;
  // find the matching ')' that closes the push call
  let i = html.indexOf('(', start);
  if (i === -1) continue;
  // find the semi-colon after the closing parenthesis using depth counting
  let depth = 0;
  let inString = false;
  let stringChar = '';
  let prev = '';
  let j = i;
  for (; j < html.length; j++) {
    const ch = html[j];
    if (!inString && (ch === '"' || ch === "'")) { inString = true; stringChar = ch; }
    else if (inString && ch === stringChar && prev !== '\\') { inString = false; stringChar = ''; }
    if (!inString) {
      if (ch === '(') depth++;
      else if (ch === ')') {
        depth--;
        if (depth === 0) { j++; break; }
      }
    }
    prev = ch;
  }
  // include trailing semicolon if present
  let k = j;
  while (k < html.length && /[\s\n\r]/.test(html[k])) k++;
  if (html[k] === ';') k++;
  const stmt = html.slice(start, k);
  statements.push(stmt);
}

const sandbox = { window: { addedImports: [] }, console: { error: console.error, log: () => {} } };
const context = vm.createContext(sandbox);

const results = [];
for (let s of statements) {
  try {
    vm.runInContext(s, context, { timeout: 2000 });
  } catch (e) {
    // try to salvage by wrapping in try/catch to continue
    try {
      vm.runInContext('try{' + s + '}catch(e){ /* ignored */ }', context, { timeout: 2000 });
    } catch (e2) {
      console.error('Failed to exec statement:', e2.message);
    }
  }
}

// copy out the addedImports
if (Array.isArray(context.window.addedImports)) {
  context.window.addedImports.forEach(x => results.push(x));
}

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_PATH, JSON.stringify(results, null, 2), 'utf8');

// compute counts
let totalQuestions = 0;
const counts = {};
results.forEach(item => {
  if (!item) return;
  const cat = item.category || 'unknown';
  let catCount = 0;
  if (Array.isArray(item.tests)) {
    item.tests.forEach(t => { if (Array.isArray(t.questions)) catCount += t.questions.length; });
  }
  counts[cat] = (counts[cat] || 0) + catCount;
  totalQuestions += catCount;
});

console.log('VM-extracted payloads:', results.length);
console.log('Per-category question counts:', counts);
console.log('Total questions:', totalQuestions);
console.log('Wrote', OUT_PATH);

process.exit(0);
