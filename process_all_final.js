// Parse and process all questions from 441.js
const fs = require('fs');

// Read the 441.js file
const content = fs.readFileSync('441.js', 'utf8');

// Function to extract array content by parsing JavaScript
function extractArray(content, startPos) {
  let braceCount = 0;
  let inString = false;
  let escapeNext = false;
  let startFound = false;

  for (let i = startPos; i < content.length; i++) {
    const char = content[i];

    if (escapeNext) {
      escapeNext = false;
      continue;
    }

    if (char === '\\') {
      escapeNext = true;
      continue;
    }

    if (char === '"' || char === "'") {
      inString = !inString;
      continue;
    }

    if (!inString) {
      if (char === '[') {
        braceCount++;
        if (!startFound) startFound = true;
      }
      if (char === ']') {
        braceCount--;
        if (braceCount === 0 && startFound) {
          return content.substring(startPos, i + 1);
        }
      }
    }
  }
  return null;
}

// Find all export statements
const exportRegex = /export const (\w+) = \[/g;
const allQuestions = {};
let totalCount = 0;

let match;
while ((match = exportRegex.exec(content)) !== null) {
  const arrayName = match[1];
  const startPos = match.index + match[0].length - 1;

  const arrayContent = extractArray(content, startPos);
  if (arrayContent) {
    try {
      // Use eval in a safe way - this is risky but necessary for JS object literals
      const questions = eval(arrayContent);
      allQuestions[arrayName] = questions;
      console.log(`Loaded ${arrayName}: ${questions.length} questions`);
      totalCount += questions.length;
    } catch (e) {
      console.error(`Error parsing ${arrayName}:`, e.message);
    }
  }
}

console.log(`\nTotal questions found: ${totalCount}`);
console.log(`Total categories: ${Object.keys(allQuestions).length}`);

// Convert to app format
function convertQuestions(questions, categoryKey, categoryName, icon) {
  const tests = {};

  questions.forEach(q => {
    const testKey = `${categoryKey}-test-${q.test}`;
    if (!tests[testKey]) {
      tests[testKey] = {
        id: testKey,
        name: `Test ${q.test}`,
        timeLimit: 60,
        questions: []
      };
    }

    // Find the correct answer index
    const correctIndex = q.options.indexOf(q.answer);

    tests[testKey].questions.push({
      id: q.id,
      question: q.question,
      options: q.options,
      correct: correctIndex,
      explanation: q.answer
    });
  });

  return {
    [categoryKey]: {
      name: categoryName,
      icon: icon,
      tests: Object.values(tests)
    }
  };
}

// Define all categories
const categories = [
  { arrayName: 'AGKQuestions', key: 'aircraft-general-knowledge', name: 'Aircraft General Knowledge', icon: 'fas fa-plane' },
  { arrayName: 'AirLawQuestions', key: 'air-law', name: 'Air Law', icon: 'fas fa-gavel' },
  { arrayName: 'AONQuestions', key: 'aon-aviation', name: 'AON Aviation Knowledge', icon: 'fas fa-graduation-cap' },
  { arrayName: 'FLTPLNQuestions', key: 'flight-planning', name: 'Flight Planning & Monitoring', icon: 'fas fa-route' },
  { arrayName: 'HPLQuestions', key: 'human-performance', name: 'Human Performance & Limitations', icon: 'fas fa-user-md' },
  { arrayName: 'InstQuestions', key: 'instrument-rating', name: 'Instrument Rating', icon: 'fas fa-compass' },
  { arrayName: 'MassBalQuestions', key: 'mass-and-balance', name: 'Mass and Balance', icon: 'fas fa-balance-scale' },
  { arrayName: 'MetQuestions', key: 'meteorology', name: 'Meteorology', icon: 'fas fa-cloud' },
  { arrayName: 'OpsQuestions', key: 'operational-procedures', name: 'Operational Procedures', icon: 'fas fa-cogs' },
  { arrayName: 'PoFQuestions', key: 'principles-of-flight', name: 'Principles of Flight', icon: 'fas fa-wind' },
  { arrayName: 'RadNavQuestions', key: 'radio-navigation', name: 'Radio Navigation', icon: 'fas fa-satellite' },
  { arrayName: 'GenNavQuestions', key: 'general-navigation', name: 'General Navigation', icon: 'fas fa-map' },
  { arrayName: 'PerformanceQuestions', key: 'performance', name: 'Performance', icon: 'fas fa-chart-line' }
];

const testData = {};
let processedQuestions = 0;

categories.forEach(cat => {
  if (allQuestions[cat.arrayName]) {
    const data = convertQuestions(allQuestions[cat.arrayName], cat.key, cat.name, cat.icon);
    Object.assign(testData, data);
    processedQuestions += allQuestions[cat.arrayName].length;
  }
});

// Write to file
fs.writeFileSync('testData_complete.js', `window.testData = ${JSON.stringify(testData, null, 2)};`);

console.log('\nQuestions converted successfully!');
console.log(`Total questions processed: ${processedQuestions}`);
console.log(`Total categories: ${categories.filter(c => allQuestions[c.arrayName]).length}`);