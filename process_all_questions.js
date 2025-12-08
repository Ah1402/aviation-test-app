// Process all questions from 441.js and convert to app format
const fs = require('fs');

// Read the 441.js file
const questionsData = fs.readFileSync('441.js', 'utf8');

// Function to extract array content between start and end positions
function extractArray(startPos, content) {
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

// Find all export const statements
const exportMatches = [];
const regex = /export const (\w+) = \[/g;
let match;

while ((match = regex.exec(questionsData)) !== null) {
  exportMatches.push({
    name: match[1],
    startPos: match.index + match[0].length - 1 // Position of the opening [
  });
}

const allQuestions = {};

exportMatches.forEach(({ name, startPos }) => {
  const arrayContent = extractArray(startPos, questionsData);
  if (arrayContent) {
    try {
      const questions = eval(arrayContent);
      allQuestions[name] = questions;
      console.log(`Loaded ${name}: ${questions.length} questions`);
    } catch (e) {
      console.error(`Error parsing ${name}:`, e.message);
    }
  }
});

// Function to convert questions to app format
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
    const correctIndex = q.options.findIndex(option => option === q.answer);

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

// Define all categories with proper mappings
const categories = [
  { questions: allQuestions.AGKQuestions, key: 'aircraft-general-knowledge', name: 'Aircraft General Knowledge', icon: 'fas fa-plane' },
  { questions: allQuestions.AirLawQuestions, key: 'air-law', name: 'Air Law', icon: 'fas fa-gavel' },
  { questions: allQuestions.AONQuestions, key: 'aon-aviation', name: 'AON Aviation Knowledge', icon: 'fas fa-graduation-cap' },
  { questions: allQuestions.FLTPLNQuestions, key: 'flight-planning', name: 'Flight Planning & Monitoring', icon: 'fas fa-route' },
  { questions: allQuestions.HPLQuestions, key: 'human-performance', name: 'Human Performance & Limitations', icon: 'fas fa-user-md' },
  { questions: allQuestions.InstQuestions, key: 'instrument-rating', name: 'Instrument Rating', icon: 'fas fa-compass' },
  { questions: allQuestions.MassBalQuestions, key: 'mass-and-balance', name: 'Mass and Balance', icon: 'fas fa-balance-scale' },
  { questions: allQuestions.MetQuestions, key: 'meteorology', name: 'Meteorology', icon: 'fas fa-cloud' },
  { questions: allQuestions.OpsQuestions, key: 'operational-procedures', name: 'Operational Procedures', icon: 'fas fa-cogs' },
  { questions: allQuestions.PoFQuestions, key: 'principles-of-flight', name: 'Principles of Flight', icon: 'fas fa-wind' },
  { questions: allQuestions.RadNavQuestions, key: 'radio-navigation', name: 'Radio Navigation', icon: 'fas fa-satellite' },
  { questions: allQuestions.GenNavQuestions, key: 'general-navigation', name: 'General Navigation', icon: 'fas fa-map' },
  { questions: allQuestions.PerformanceQuestions, key: 'performance', name: 'Performance', icon: 'fas fa-chart-line' }
];

// Process
const testData = {};
let totalQuestions = 0;

categories.forEach(cat => {
  if (cat.questions) {
    const data = convertQuestions(cat.questions, cat.key, cat.name, cat.icon);
    Object.assign(testData, data);
    totalQuestions += cat.questions.length;
  }
});

// Write to file
fs.writeFileSync('testData_complete.js', `window.testData = ${JSON.stringify(testData, null, 2)};`);

console.log('\nQuestions converted successfully!');
console.log(`Total questions processed: ${totalQuestions}`);
console.log(`Total categories: ${categories.length}`);