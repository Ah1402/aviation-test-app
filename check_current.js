const fs = require('fs');

const html = fs.readFileSync('STANDALONE_GENERATED.html', 'utf8');
const match = html.match(/window\.testData = ({[\s\S]*?});/);

if (match) {
  const data = JSON.parse(match[1]);
  let totalQuestions = 0;

  console.log('Current STANDALONE_GENERATED.html:');
  Object.entries(data).forEach(([key, cat]) => {
    const qCount = cat.tests.reduce((sum, test) => sum + test.questions.length, 0);
    totalQuestions += qCount;
    console.log(`${cat.name}: ${qCount} questions`);
  });

  console.log(`Total: ${Object.keys(data).length} categories, ${totalQuestions} questions`);
} else {
  console.log('No embedded data found - checking if it loads external data...');

  // Check if it loads external scripts
  const externalMatch = html.match(/<script src="([^"]*\.js)"><\/script>/g);
  if (externalMatch) {
    console.log('External scripts loaded:');
    externalMatch.forEach(script => console.log(script));
  }
}