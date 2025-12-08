const fs = require('fs');
const path = require('path');

// Merge src/data/extracted_agk_added.json into src/data/testData.js (aircraft-general), preserving existing tests and deduping by question text.
(function main(){
  const projectRoot = path.resolve(__dirname, '..', '..');
  const testDataPath = path.join(projectRoot, 'src', 'data', 'testData.js');
  const extractedPath = path.join(projectRoot, 'src', 'data', 'extracted_agk_added.json');

  console.log('Merging extracted AGK questions into testData.js');

  let data;
  try {
    delete require.cache[require.resolve(testDataPath)];
    data = require(testDataPath);
  } catch (e) {
    console.error('Failed to load testData.js:', e.message);
    process.exit(1);
  }

  let extracted;
  try {
    extracted = JSON.parse(fs.readFileSync(extractedPath, 'utf8'));
  } catch (e) {
    console.error('Failed to read extracted_agk_added.json:', e.message);
    process.exit(1);
  }

  function normalize(s){ return String(s).replace(/\s+/g,' ').trim().toLowerCase(); }

  const catKey = 'aircraft-general';
  if (!data[catKey]) {
    data[catKey] = extracted[catKey] || { name: 'Aircraft General Knowledge', icon: 'fas fa-plane', tests: [] };
  }
  const category = data[catKey];

  // Build a set of existing questions across all tests to dedupe
  const seen = new Set();
  for (const t of (category.tests || [])) {
    for (const q of (t.questions || [])) {
      if (q && q.question) seen.add(normalize(q.question));
    }
  }

  let added = 0;
  const srcTests = (extracted[catKey] && extracted[catKey].tests) || [];
  for (const srcTest of srcTests) {
    // find or create test by name
    let dest = (category.tests || []).find(t => (t.name||'').toLowerCase() === (srcTest.name||'').toLowerCase());
    if (!dest) {
      dest = { name: srcTest.name || 'AGK Imported', timeLimit: srcTest.timeLimit || 180, questions: [] };
      category.tests.push(dest);
    }
    // append questions not seen
    for (const q of (srcTest.questions || [])) {
      const key = normalize(q.question);
      if (!seen.has(key)) {
        dest.questions.push(q);
        seen.add(key);
        added++;
      }
    }
  }

  console.log(`Total new questions added to ${catKey}: ${added}`);

  const banner = `// Aviation Test Data - Updated with AGK import\n// Generated: ${new Date().toLocaleString()}\n\n`;
  const content = banner + 'const testData = ' + JSON.stringify(data, null, 2) + ';\n\n' +
    '// Attach to window for browser usage\n' +
    "if (typeof window !== 'undefined') {\n  window.testData = testData;\n}\n\n" +
    '// Export for use in modules (Node/CommonJS)\n' +
    "if (typeof module !== 'undefined' && module.exports) {\n  module.exports = testData;\n}\n";

  try {
    fs.writeFileSync(testDataPath, content, 'utf8');
    console.log('testData.js updated.');
  } catch (e) {
    console.error('Failed to write testData.js:', e.message);
    process.exit(1);
  }
})();
