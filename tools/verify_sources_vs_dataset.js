// Verify dataset vs provided sources (*_new.txt and added/*.htm)
// Usage: node tools/verify_sources_vs_dataset.js

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC_DATA = path.join(ROOT, 'src', 'data', 'testData.js');
const ADDED_DIR = path.join(ROOT, 'added');

function safeRequire(p) {
  // testData.js exports const; wrap to evaluate in isolated context
  const content = fs.readFileSync(p, 'utf8');
  // Extract the object literal assigned to testData
  const match = content.match(/const\s+testData\s*=\s*(\{[\s\S]*\});\s*$/m);
  let dataObj;
  if (match) {
    const code = 'module.exports = ' + match[1];
    const mod = { exports: {} };
    const func = new Function('module', 'exports', code);
    func(mod, mod.exports);
    dataObj = mod.exports;
  } else {
    dataObj = require(p);
  }
  return dataObj;
}

function countDataset() {
  const data = safeRequire(SRC_DATA);
  const result = {};
  for (const [key, cat] of Object.entries(data)) {
    if (!cat || !Array.isArray(cat.tests)) continue;
    const tests = cat.tests;
    let totalQ = 0;
    const perTest = [];
    tests.forEach(t => {
      const n = Array.isArray(t.questions) ? t.questions.length : 0;
      perTest.push({ name: t.name, count: n });
      totalQ += n;
    });
    result[key] = { name: cat.name, totalQ, tests: perTest };
  }
  return result;
}

function countTxtSources() {
  const files = fs.readdirSync(ROOT).filter(f => f.endsWith('_new.txt'));
  const result = {};
  files.forEach(f => {
    const full = path.join(ROOT, f);
    const txt = fs.readFileSync(full, 'utf8');
    // Try to get category key from first quoted key
    const keyMatch = txt.match(/"([^"]+)"\s*:\s*\{/);
    const key = keyMatch ? keyMatch[1] : f.replace('_new.txt', '');
    const qCount = (txt.match(/"question"\s*:/g) || []).length;
    // Count tests by finding names "... Test X"
    const testMatches = [...txt.matchAll(/"name"\s*:\s*"([^"]*Test\s*\d+)/g)].map(m => m[1]);
    const testCounts = {};
    // Simple state machine to count questions within each test by splitting
    const testsSplit = txt.split(/\{\s*\"name\"\s*:\s*\"/).slice(1);
    testsSplit.forEach(block => {
      const name = block.split('"')[0];
      const questionsSegment = block.split('\n').join('\n');
      const q = (questionsSegment.match(/\"question\"\s*:/g) || []).length;
      testCounts[name] = q;
    });
    result[key] = { file: f, totalQ: qCount, testCounts };
  });
  return result;
}

function countHtmlSources() {
  // Count questions by <hr ...> separators as a proxy
  const result = {};
  if (!fs.existsSync(ADDED_DIR)) return result;
  const files = fs.readdirSync(ADDED_DIR).filter(f => f.toLowerCase().endsWith('.htm'));
  files.forEach(f => {
    const full = path.join(ADDED_DIR, f);
    const html = fs.readFileSync(full, 'utf8');
    const hr = (html.match(/<hr\b/gi) || []).length;
    result[f] = { file: f, approxQ: hr };
  });
  return result;
}

function main() {
  const ds = countDataset();
  const txt = countTxtSources();
  const html = countHtmlSources();

  const interesting = [
    'air-law',
    'aircraft-general',
    'aircraft-performance',
    'mass-balance',
    'human-performance',
    'general-navigation',
    'radio-navigation',
    'operational-procedures',
    'meteorology',
    'instrumentation',
    'flight-planning',
    'principles-of-flight',
  ];

  console.log('Dataset counts by category:');
  interesting.forEach(key => {
    if (ds[key]) {
      console.log(`- ${key} (${ds[key].name}): ${ds[key].totalQ} Q across ${ds[key].tests.length} tests`);
      ds[key].tests.forEach(t => console.log(`   • ${t.name}: ${t.count}`));
    }
  });

  console.log('\nText source (*_new.txt) counts:');
  Object.entries(txt).forEach(([key, info]) => {
    console.log(`- ${key} <- ${info.file}: ${info.totalQ} Q`);
    Object.entries(info.testCounts).forEach(([name, c]) => console.log(`   • ${name}: ${c}`));
  });

  console.log('\nAdded HTML approx question counts (<hr> as proxy):');
  Object.values(html).forEach(info => console.log(`- ${info.file}: ~${info.approxQ}`));

  // Quick diff for categories where text exists
  console.log('\nDiff (dataset vs text) where applicable:');
  Object.entries(txt).forEach(([key, info]) => {
    const dsCat = ds[key];
    if (!dsCat) {
      console.log(`- ${key}: missing category in dataset (text has ${info.totalQ} Q)`);
      return;
    }
    const dsTotal = dsCat.totalQ;
    const delta = info.totalQ - dsTotal;
    console.log(`- ${key}: text ${info.totalQ} vs dataset ${dsTotal} => Δ ${delta}`);
  });
}

if (require.main === module) {
  main();
}
