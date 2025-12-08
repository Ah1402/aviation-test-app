const fs = require('fs');

const js = fs.readFileSync('src/data/last403_explanations_import.js', 'utf8');
const match = js.match(/window\.addedImports\.push\(({[\s\S]*?})\);/);

if (match) {
  const data = JSON.parse(match[1]);
  let totalQuestions = 0;

  console.log('last403_explanations_import.js content:');
  console.log(`Category: ${data.category}`);

  data.tests.forEach(test => {
    totalQuestions += test.questions.length;
    console.log(`${test.name}: ${test.questions.length} questions`);
  });

  console.log(`Total questions in import: ${totalQuestions}`);
} else {
  console.log('Could not parse the import file');
}