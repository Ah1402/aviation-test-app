const fs = require('fs');

const html = fs.readFileSync('STANDALONE_GENERATED_with_last403.html', 'utf8');
const match = html.match(/window\.testData = ({[\s\S]*?});/);

if (match) {
  const data = JSON.parse(match[1]);
  let totalQuestions = 0;

  console.log('Categories and Question Counts:');
  Object.entries(data).forEach(([key, cat]) => {
    const qCount = cat.tests.reduce((sum, test) => sum + test.questions.length, 0);
    totalQuestions += qCount;
    console.log(`${cat.name}: ${qCount} questions`);
  });

  console.log(`Total Categories: ${Object.keys(data).length}`);
  console.log(`Total Questions: ${totalQuestions}`);
} else {
  console.log('Could not find embedded testData');
}