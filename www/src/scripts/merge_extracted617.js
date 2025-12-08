const fs = require('fs');
const path = require('path');

// Merge src/data/extracted617.json into src/data/testData.js without losing existing content
(function main() {
  const projectRoot = path.resolve(__dirname, '..', '..');
  const testDataPath = path.join(projectRoot, 'src', 'data', 'testData.js');
  const extractedPath = path.join(projectRoot, 'src', 'data', 'extracted617.json');

  console.log('Merging extracted617.json into testData.js');

  // Load current testData (Node export supported by file)
  let current;
  try {
    delete require.cache[require.resolve(testDataPath)];
    current = require(testDataPath);
  } catch (e) {
    console.error('Failed to load current testData.js:', e.message);
    process.exit(1);
  }

  // Load extracted JSON
  let extracted;
  try {
    extracted = JSON.parse(fs.readFileSync(extractedPath, 'utf8'));
  } catch (e) {
    console.error('Failed to read extracted617.json:', e.message);
    process.exit(1);
  }

  // Helper to gather all existing questions in a category (across tests)
  function getExistingQuestionsSet(categoryObj) {
    const set = new Set();
    if (!categoryObj || !Array.isArray(categoryObj.tests)) return set;
    for (const t of categoryObj.tests) {
      for (const q of (t.questions || [])) {
        if (q && q.question) {
          set.add(normalize(q.question));
        }
      }
    }
    return set;
  }

  function normalize(s) {
    return String(s).replace(/\s+/g, ' ').trim().toLowerCase();
  }

  let addedCount = 0;

  // Merge per category
  Object.entries(extracted).forEach(([catKey, catData]) => {
    if (!current[catKey]) {
      // New category entirely
      current[catKey] = catData;
      const count = (catData.tests?.[0]?.questions || []).length;
      addedCount += count;
      console.log(`Added new category ${catKey} (${count} questions)`);
      return;
    }

    // Existing category: append into a dedicated test "617 Import" and dedupe by question text
    const existing = current[catKey];
    let importTest = existing.tests.find(t => t.name && t.name.toLowerCase().includes('617 import'));
    if (!importTest) {
      importTest = { name: '617 Import', timeLimit: 180, questions: [] };
      existing.tests.push(importTest);
    }

    const seen = getExistingQuestionsSet(existing); // includes all tests
    for (const q of (catData.tests?.[0]?.questions || [])) {
      const key = normalize(q.question);
      if (!seen.has(key)) {
        importTest.questions.push(q);
        seen.add(key);
        addedCount++;
      }
    }
  });

  console.log(`Total new questions added: ${addedCount}`);

  // Write back testData.js with module export
  const banner = `// Aviation Test Data - Updated with 617.htm merge\n// Generated: ${new Date().toLocaleString()}\n\n`;
  const content = banner + 'const testData = ' + JSON.stringify(current, null, 2) + ';\n\n' +
    '// Export for use in modules\n' +
    "if (typeof module !== 'undefined' && module.exports) {\n    module.exports = testData;\n}\n";

  try {
    fs.writeFileSync(testDataPath, content, 'utf8');
    console.log('Merged testData.js written.');
  } catch (e) {
    console.error('Failed to write testData.js:', e.message);
    process.exit(1);
  }
})();
