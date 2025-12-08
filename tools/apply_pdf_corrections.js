// Apply corrections from PDF extracted questions to existing testData.js
// Strategy:
// 1. Load testData.js (require)
// 2. Load pdf_import.json (output of extract_pdf_questions.js)
// 3. For each PDF question, fuzzy match to existing questions in same category (or all if unknown)
// 4. If a match is found and answer differs, update correct index.
// 5. If no match for that category and category exists, append to a new test "<Category Name> - PDF Added".
// 6. If category missing (e.g. principles-of-flight) create the category and test.
// 7. Produce a report of changes in tools/update_report.md

const fs = require('fs');
const path = require('path');

function loadJson(pathStr) {
  return JSON.parse(fs.readFileSync(pathStr, 'utf8'));
}

function similarity(a, b) {
  // Simple normalized Levenshtein distance
  a = a.toLowerCase();
  b = b.toLowerCase();
  const dp = Array(a.length + 1).fill(null).map(() => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }
  const dist = dp[a.length][b.length];
  const maxLen = Math.max(a.length, b.length) || 1;
  return 1 - dist / maxLen; // 1 identical, 0 no similarity
}

function ensureCategory(testData, key, name) {
  if (!testData[key]) {
    testData[key] = {
      name: name,
      icon: 'fas fa-folder-plus',
      tests: []
    };
  }
}

async function main() {
  const pdfJsonPath = path.resolve(__dirname, 'pdf_import.json');
  const testDataPath = path.resolve(__dirname, '..', 'src', 'data', 'testData.js');
  if (!fs.existsSync(pdfJsonPath)) {
    console.error('Missing pdf_import.json. Run extract_pdf_questions first.');
    process.exit(1);
  }
  const pdfData = loadJson(pdfJsonPath);
  let testData;
  try {
    testData = require(testDataPath);
  } catch (e) {
    console.error('Failed to load testData.js via require. Aborting to prevent destructive edits.');
    process.exit(1);
  }

  const reportLines = [];
  const addedByCategory = {};
  let updatedCount = 0;
  let addedCount = 0;

  for (const pq of pdfData.questions) {
    const catKey = pq.category === 'unknown' ? null : pq.category;
    let searchCategories = [];
    if (catKey && testData[catKey]) {
      searchCategories = [catKey];
    } else {
      // broad search if unknown or category missing
      searchCategories = Object.keys(testData);
    }
    let best = { sim: 0, cat: null, testIndex: -1, qIndex: -1 };
    for (const key of searchCategories) {
      const cat = testData[key];
      cat.tests.forEach((t, ti) => {
        t.questions.forEach((q, qi) => {
          const sim = similarity(pq.question, q.question);
          if (sim > best.sim) best = { sim, cat: key, testIndex: ti, qIndex: qi };
        });
      });
    }

    if (best.sim >= 0.82) {
      // Consider it a match - but DON'T update if PDF has no answer (correct === -1)
      const existing = testData[best.cat].tests[best.testIndex].questions[best.qIndex];
      if (pq.correct !== -1 && existing.correct !== pq.correct) {
        reportLines.push(`UPDATE | ${best.cat} | Test:${testData[best.cat].tests[best.testIndex].name} | Q:"${existing.question.substring(0,80)}" | Old:${existing.correct} New:${pq.correct}`);
        existing.correct = pq.correct;
        updatedCount++;
      }
      // Skip this question - already in dataset
    } else {
      // Add new question
      const targetKey = catKey || 'unclassified';
      ensureCategory(testData, targetKey, catKey ? pq.categoryName : 'Unclassified');
      if (!addedByCategory[targetKey]) {
        testData[targetKey].tests.push({ name: `${testData[targetKey].name} - PDF Added`, timeLimit: 180, questions: [] });
        addedByCategory[targetKey] = testData[targetKey].tests.length - 1;
      }
      const idx = addedByCategory[targetKey];
      testData[targetKey].tests[idx].questions.push({ question: pq.question, options: pq.options, correct: pq.correct, explanation: '' });
      reportLines.push(`ADD    | ${targetKey} | Q:"${pq.question.substring(0,80)}"`);
      addedCount++;
    }
  }

  // Write back updated testData.js with backup
  const backupPath = path.resolve(__dirname, 'testData_backup_before_pdf.js');
  if (!fs.existsSync(backupPath)) {
    const originalSource = fs.readFileSync(testDataPath, 'utf8');
    fs.writeFileSync(backupPath, originalSource, 'utf8');
  }
  const header = `// Aviation Test Data - Updated with PDF corrections\n// Generated: ${new Date().toISOString()}\n`;
  const jsOut = header + 'const testData = ' + JSON.stringify(testData, null, 2) + '\n\nif (typeof module !== "undefined" && module.exports) { module.exports = testData; }\n';
  fs.writeFileSync(testDataPath, jsOut, 'utf8');

  // Report
  const reportPath = path.resolve(__dirname, 'update_report.md');
  const report = [
    `# PDF Corrections Report`,
    `Date: ${new Date().toLocaleString()}`,
    `Total PDF questions processed: ${pdfData.questions.length}`,
    `Updated existing answers: ${updatedCount}`,
    `Added new questions: ${addedCount}`,
    '',
    '## Changes',
    'Type | Category | Details',
    '---- | -------- | -------',
    ...reportLines
  ].join('\n');
  fs.writeFileSync(reportPath, report, 'utf8');
  console.log(`Corrections applied. Updated: ${updatedCount}, Added: ${addedCount}`);
  console.log('Report saved to', reportPath);
}

main().catch(err => { console.error(err); process.exit(1); });
