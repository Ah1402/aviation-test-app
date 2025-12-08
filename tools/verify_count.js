const fs = require('fs');
const path = require('path');

const TESTDATA_JS = path.resolve(__dirname, '..', 'src', 'data', 'testData.js');

function verifyQuestionCount() {
  delete require.cache[require.resolve(TESTDATA_JS)];
  const data = require(TESTDATA_JS);
  
  let total = 0;
  const categories = Object.keys(data);
  
  console.log('\n🔍 VERIFYING QUESTION COUNT IN testData.js\n');
  
  categories.forEach(catKey => {
    const category = data[catKey];
    const tests = category.tests || [];
    let catTotal = 0;
    
    tests.forEach(test => {
      const qCount = (test.questions || []).length;
      catTotal += qCount;
      console.log(`  ${test.name}: ${qCount} questions`);
    });
    
    console.log(`✅ ${category.name}: ${catTotal} total\n`);
    total += catTotal;
  });
  
  console.log('═'.repeat(50));
  console.log(`🎯 GRAND TOTAL: ${total} questions`);
  console.log('═'.repeat(50));
  console.log('\nIf your app shows a different number:');
  console.log('1. Hard refresh: Ctrl+Shift+R (Chrome) or Ctrl+F5');
  console.log('2. Clear cache: Ctrl+Shift+Delete');
  console.log('3. Restart your local server (START_APP.bat)');
  console.log('4. Check browser console for errors\n');
}

verifyQuestionCount();
