const fs = require('fs');
const path = require('path');

// Paths
const testDataPath = path.join(__dirname, '../src/data/testData.js');
const reportPath = path.join(__dirname, 'dedupe_report.json');

function timestamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return (
    d.getFullYear() +
    pad(d.getMonth() + 1) +
    pad(d.getDate()) +
    '_' +
    pad(d.getHours()) +
    pad(d.getMinutes()) +
    pad(d.getSeconds())
  );
}

function normalizeQuestionText(q) {
  return (q || '')
    .toLowerCase()
    .replace(/\r\n|\n|\r/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function readTestDataFile() {
  const content = fs.readFileSync(testDataPath, 'utf-8');
  // Extract object literal
  const match = content.match(/const\s+testData\s*=\s*(\{[\s\S]*?\});/);
  if (!match) {
    throw new Error('Could not locate const testData = {...}; in testData.js');
  }
  const objLiteral = match[1];
  let dataObj;
  try {
    // Evaluate safely by wrapping in parentheses
    dataObj = eval('(' + objLiteral + ')');
  } catch (e) {
    throw new Error('Failed to eval testData object: ' + e.message);
  }
  return { content, objLiteral, dataObj, matchStart: match.index, matchEnd: match.index + match[0].length };
}

function writeBackup(originalContent) {
  const backupName = `testData.backup_${timestamp()}.js`;
  const backupPath = path.join(path.dirname(testDataPath), backupName);
  fs.writeFileSync(backupPath, originalContent, 'utf-8');
  return backupPath;
}

function rewriteTestData(content, newObject) {
  const pre = content.replace(/(const\s+testData\s*=\s*)(\{[\s\S]*?\};)/, '$1__PLACEHOLDER__');
  const newLiteral = JSON.stringify(newObject, null, 2);
  const replaced = pre.replace('__PLACEHOLDER__', newLiteral + ';');

  // Update generated timestamp comment if present
  const updated = replaced.replace(/(Generated:\s*)\d{4}-\d{2}-\d{2}T[^\n]+/, `$1${new Date().toISOString()}`);
  fs.writeFileSync(testDataPath, updated, 'utf-8');
}

function dedupe(dataObj) {
  const seen = new Map(); // normalized text -> {categoryKey, testName, index}
  const removed = [];
  let beforeCount = 0;
  let afterCount = 0;

  const newData = {};

  for (const [catKey, category] of Object.entries(dataObj)) {
    const newTests = [];
    for (const test of category.tests) {
      const keptQuestions = [];
      for (const q of test.questions) {
        beforeCount += 1;
        const norm = normalizeQuestionText(q.question);
        if (!norm) {
          // Skip empty question texts
          removed.push({ reason: 'empty-question', catKey, testName: test.name, question: q.question?.slice(0, 120) || '' });
          continue;
        }
        if (seen.has(norm)) {
          const first = seen.get(norm);
          removed.push({ reason: 'duplicate', firstSeen: first, duplicate: { catKey, testName: test.name, question: q.question?.slice(0, 200) || '' } });
          continue;
        }
        // Keep and mark as seen
        seen.set(norm, { catKey, testName: test.name, question: q.question?.slice(0, 200) || '' });
        keptQuestions.push(q);
      }
      afterCount += keptQuestions.length;
      newTests.push({ ...test, questions: keptQuestions });
    }
    newData[catKey] = { ...category, tests: newTests };
  }

  return { newData, removed, beforeCount, afterCount, uniqueCount: seen.size };
}

function main() {
  console.log('\n🧹 Deduplicating questions across all categories/tests...');
  const { content, dataObj } = readTestDataFile();

  const backupPath = writeBackup(content);
  console.log(`💾 Backup created: ${path.relative(process.cwd(), backupPath)}`);

  const { newData, removed, beforeCount, afterCount, uniqueCount } = dedupe(dataObj);

  // Write report
  const report = {
    timestamp: new Date().toISOString(),
    beforeCount,
    afterCount,
    removedCount: removed.length,
    uniqueCount,
    samples: removed.slice(0, 50),
  };
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
  console.log(`📝 Dedupe report written: tools/dedupe_report.json`);

  // Rewrite testData.js
  rewriteTestData(content, newData);
  console.log(`✅ testData.js rewritten. Questions: ${afterCount} (was ${beforeCount}, removed ${removed.length}).`);

  console.log('Done.');
}

if (require.main === module) {
  try {
    main();
  } catch (err) {
    console.error('❌ Dedupe failed:', err.message);
    process.exit(1);
  }
}
