// Count questions in 441.js
const fs = require('fs');

// Read the 441.js file
const questionsData = fs.readFileSync('441.js', 'utf8');

// Split by export const statements
const exportParts = questionsData.split(/export const (\w+) = \[/);

let totalQuestions = 0;
const categoryCounts = {};

for (let i = 1; i < exportParts.length; i += 2) {
  const arrayName = exportParts[i];
  const arrayContent = exportParts[i + 1];

  // Count the number of "id:" occurrences in this section
  const idMatches = arrayContent.match(/id:/g);
  const questionCount = idMatches ? idMatches.length : 0;

  categoryCounts[arrayName] = questionCount;
  totalQuestions += questionCount;
  console.log(`${arrayName}: ${questionCount} questions`);
}

console.log(`\nTotal questions: ${totalQuestions}`);
console.log(`Total categories: ${Object.keys(categoryCounts).length}`);
console.log('\nCategory breakdown:');
Object.entries(categoryCounts).forEach(([cat, count]) => {
  console.log(`- ${cat}: ${count}`);
});