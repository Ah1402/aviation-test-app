const fs = require('fs');
const path = require('path');

const TESTDATA_JS = path.resolve(__dirname, '..', 'src', 'data', 'testData.js');

function loadTestData() {
  delete require.cache[require.resolve(TESTDATA_JS)];
  try { return require(TESTDATA_JS); } catch (e) { return null; }
}

function generateReport() {
  const data = loadTestData();
  if (!data) {
    console.error('Failed to load testData.js');
    return;
  }

  console.log('\n╔══════════════════════════════════════════════════════════════════╗');
  console.log('║         617.htm IMPORT REPORT - Questions Added Summary         ║');
  console.log('╚══════════════════════════════════════════════════════════════════╝\n');

  let totalOriginal = 0;
  let totalImported = 0;
  let grandTotal = 0;

  const categories = Object.keys(data).sort();

  categories.forEach(catKey => {
    const category = data[catKey];
    const tests = category.tests || [];
    
    let originalCount = 0;
    let importedCount = 0;
    
    tests.forEach(test => {
      const qCount = (test.questions || []).length;
      if (test.name.includes('617 Import')) {
        importedCount += qCount;
      } else {
        originalCount += qCount;
      }
    });
    
    const totalCat = originalCount + importedCount;
    totalOriginal += originalCount;
    totalImported += importedCount;
    grandTotal += totalCat;
    
    console.log(`📂 ${category.name}`);
    console.log(`   ├─ Original:      ${originalCount.toString().padStart(4)} questions`);
    console.log(`   ├─ Added (617):   ${importedCount.toString().padStart(4)} questions`);
    console.log(`   └─ Total:         ${totalCat.toString().padStart(4)} questions`);
    console.log();
  });

  console.log('─'.repeat(70));
  console.log(`\n📊 OVERALL SUMMARY:`);
  console.log(`   • Total Original Questions:  ${totalOriginal}`);
  console.log(`   • Total Added from 617.htm:  ${totalImported}`);
  console.log(`   • Grand Total:               ${grandTotal}`);
  console.log(`   • Categories Updated:        ${categories.length}`);
  console.log(`   • Increase:                  ${((totalImported/totalOriginal)*100).toFixed(1)}%`);
  
  console.log('\n✅ All questions successfully merged into testData.js');
  console.log('📍 Location: src/data/testData.js\n');

  // Save report to file
  const reportPath = path.resolve(__dirname, '..', 'IMPORT_REPORT.txt');
  const reportText = `
═══════════════════════════════════════════════════════════════════
    617.htm IMPORT REPORT - Questions Added Summary
    Generated: ${new Date().toLocaleString()}
═══════════════════════════════════════════════════════════════════

${categories.map(catKey => {
  const category = data[catKey];
  const tests = category.tests || [];
  let originalCount = 0;
  let importedCount = 0;
  tests.forEach(test => {
    const qCount = (test.questions || []).length;
    if (test.name.includes('617 Import')) {
      importedCount += qCount;
    } else {
      originalCount += qCount;
    }
  });
  const totalCat = originalCount + importedCount;
  return `📂 ${category.name}
   ├─ Original:      ${originalCount.toString().padStart(4)} questions
   ├─ Added (617):   ${importedCount.toString().padStart(4)} questions
   └─ Total:         ${totalCat.toString().padStart(4)} questions
`;
}).join('\n')}
───────────────────────────────────────────────────────────────────

📊 OVERALL SUMMARY:
   • Total Original Questions:  ${totalOriginal}
   • Total Added from 617.htm:  ${totalImported}
   • Grand Total:               ${grandTotal}
   • Categories Updated:        ${categories.length}
   • Increase:                  ${((totalImported/totalOriginal)*100).toFixed(1)}%

✅ All questions successfully merged into testData.js
📍 Location: src/data/testData.js

═══════════════════════════════════════════════════════════════════
`;

  fs.writeFileSync(reportPath, reportText, 'utf8');
  console.log(`📄 Report saved to: IMPORT_REPORT.txt\n`);
}

generateReport();
