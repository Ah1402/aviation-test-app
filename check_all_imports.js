const fs = require('fs');

const js = fs.readFileSync('src/data/last403_explanations_import.js', 'utf8');
const matches = js.match(/window\.addedImports\.push\(({[\s\S]*?})\);/g);

if (matches) {
  let totalAll = 0;
  console.log('All categories in last403_explanations_import.js:');

  matches.forEach((match, index) => {
    const data = JSON.parse(match.replace('window.addedImports.push(', '').replace(');', ''));
    let totalQuestions = 0;

    console.log(`\nCategory ${index + 1}: ${data.category}`);
    data.tests.forEach(test => {
      totalQuestions += test.questions.length;
      console.log(`  ${test.name}: ${test.questions.length} questions`);
    });

    console.log(`  Total for ${data.category}: ${totalQuestions} questions`);
    totalAll += totalQuestions;
  });

  console.log(`\nGrand Total: ${totalAll} questions across ${matches.length} categories`);
} else {
  console.log('Could not parse the import file');
}