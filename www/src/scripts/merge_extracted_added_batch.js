const fs = require('fs');
const path = require('path');

// Merge src/data/extracted_added_batch.json into src/data/testData.js across categories with dedupe
(function main(){
  const projectRoot = path.resolve(__dirname, '..', '..');
  const testDataPath = path.join(projectRoot, 'src', 'data', 'testData.js');
  const extractedPath = path.join(projectRoot, 'src', 'data', 'extracted_added_batch.json');

  console.log('Merging extracted_added_batch.json into testData.js');

  let testData;
  try {
    delete require.cache[require.resolve(testDataPath)];
    testData = require(testDataPath);
  } catch (e) {
    console.error('Failed to load testData.js:', e.message);
    process.exit(1);
  }

  let extracted;
  try {
    extracted = JSON.parse(fs.readFileSync(extractedPath, 'utf8'));
  } catch (e) {
    console.error('Failed to read extracted_added_batch.json:', e.message);
    process.exit(1);
  }

  const norm = s => String(s).replace(/\s+/g,' ').trim().toLowerCase();

  let totalAdded = 0;
  for (const [catKey, catData] of Object.entries(extracted)) {
    if (!testData[catKey]) {
      testData[catKey] = { name: catData.name || catKey, icon: catData.icon || 'fas fa-clipboard', tests: [] };
    }
    const destCat = testData[catKey];

    // seen across entire category to prevent duplicates
    const seen = new Set();
    for (const t of (destCat.tests || [])) {
      for (const q of (t.questions || [])) {
        if (q && q.question) seen.add(norm(q.question));
      }
    }

    for (const srcTest of (catData.tests || [])) {
      let destTest = (destCat.tests || []).find(t => norm(t.name||'') === norm(srcTest.name||''));
      if (!destTest) {
        destTest = { name: srcTest.name || 'Added Import', timeLimit: srcTest.timeLimit || 180, questions: [] };
        destCat.tests.push(destTest);
      }
      for (const q of (srcTest.questions || [])) {
        const key = norm(q.question);
        if (!seen.has(key)) {
          destTest.questions.push(q);
          seen.add(key);
          totalAdded++;
        }
      }
    }
  }

  console.log('Total new questions added:', totalAdded);

  const banner = `// Aviation Test Data - Updated with batch import\n// Generated: ${new Date().toLocaleString()}\n\n`;
  const content = banner + 'const testData = ' + JSON.stringify(testData, null, 2) + ';\n\n' +
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
