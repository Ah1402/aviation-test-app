const fs = require('fs');

const js = fs.readFileSync('src/data/added_imports.js', 'utf8');
const start = js.indexOf('window.addedImports = [');
const end = js.lastIndexOf('];');

if (start !== -1 && end !== -1) {
  const jsonStr = js.substring(start + 22, end + 1);
  const data = JSON.parse(jsonStr);

  console.log('added_imports.js has', data.length, 'categories');
  let totalQuestions = 0;

  data.forEach(cat => {
    const qCount = cat.tests.reduce((sum, test) => sum + test.questions.length, 0);
    totalQuestions += qCount;
    console.log(`${cat.category}: ${qCount} questions`);
  });

  console.log(`Total additional questions: ${totalQuestions}`);
} else {
  console.log('Could not parse added_imports.js');
}