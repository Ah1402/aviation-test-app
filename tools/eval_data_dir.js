const fs = require('fs');
const path = require('path');
const vm = require('vm');

const DATA_DIR = path.resolve(__dirname, '..', 'src', 'data');
const OUT_DIR = path.resolve(__dirname, '..', 'build');
const OUT_PATH = path.join(OUT_DIR, 'index_parsed_srcdata_vm.json');

function listJsFiles(dir) {
  return fs.readdirSync(dir).filter(f => f.endsWith('.js')).map(f => path.join(dir, f));
}

if (!fs.existsSync(DATA_DIR)) {
  console.error('data dir not found at', DATA_DIR);
  process.exit(1);
}

const files = listJsFiles(DATA_DIR);
console.log('Found', files.length, 'js files in', DATA_DIR);

const sandbox = { window: { addedImports: [] }, console: { error: console.error, log: () => {} } };
const context = vm.createContext(sandbox);

for (const file of files) {
  try {
    const code = fs.readFileSync(file, 'utf8');
    // run the file in sandbox, it should push to window.addedImports
    try {
      vm.runInContext(code, context, { timeout: 2000, filename: file });
    } catch (e) {
      // try wrapping
      try {
        vm.runInContext('try{' + code + '}catch(e){ /* ignored */ }', context, { timeout: 2000, filename: file });
      } catch (e2) {
        console.error('Failed to exec', file, e2 && e2.message);
      }
    }
  } catch (e) {
    console.error('Error reading', file, e && e.message);
  }
}

const results = Array.isArray(context.window.addedImports) ? context.window.addedImports.slice() : [];

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_PATH, JSON.stringify(results, null, 2), 'utf8');

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

console.log('Extracted payloads from data dir:', results.length);
console.log('Per-category question counts:', counts);
console.log('Total questions:', totalQuestions);
console.log('Wrote', OUT_PATH);

process.exit(0);
