const fs = require('fs');
const path = require('path');

// Input files from the Desktop/added folder
const inputFiles = [
  'C:\\Users\\ahmed\\Desktop\\added\\Instrumentation Test 1.htm',
  'C:\\Users\\ahmed\\Desktop\\added\\mass.htm',
  'C:\\Users\\ahmed\\Desktop\\added\\metrology.htm',
  'C:\\Users\\ahmed\\Desktop\\added\\operational procedure.htm',
  'C:\\Users\\ahmed\\Desktop\\added\\performance .htm',
  'C:\\Users\\ahmed\\Desktop\\added\\🗺.htm',
  'C:\\Users\\ahmed\\Desktop\\added\\🧠 AON Aviation Knowledge Test 1.htm',
  'C:\\Users\\ahmed\\Desktop\\added\\🧠 Human Performance and Limitations Test 1.htm',
  'C:\\Users\\ahmed\\Desktop\\added\\agk1 .htm',
  'C:\\Users\\ahmed\\Desktop\\added\\al1.htm'
];

// Category mapping based on file names and test titles
function detectCategory(text, filename) {
  const lower = text.toLowerCase();
  const fname = filename.toLowerCase();
  
  if (lower.includes('instrumentation test') || fname.includes('instrumentation')) {
    return { key: 'instrumentation', name: 'Instrumentation', icon: '🎛️' };
  }
  if (lower.includes('mass and balance') || fname.includes('mass')) {
    return { key: 'mass-balance', name: 'Mass & Balance', icon: '⚖️' };
  }
  if (lower.includes('meteorology test') || fname.includes('metrology')) {
    return { key: 'meteorology', name: 'Meteorology', icon: '🌦️' };
  }
  if (lower.includes('operational procedure') || fname.includes('operational')) {
    return { key: 'operational-procedures', name: 'Operational Procedures', icon: '📋' };
  }
  if (lower.includes('performance test') || fname.includes('performance')) {
    return { key: 'performance', name: 'Performance', icon: '✈️' };
  }
  if (lower.includes('flight planning') || fname.includes('🗺')) {
    return { key: 'flight-planning', name: 'Flight Planning', icon: '🗺️' };
  }
  if (lower.includes('aon aviation knowledge') || fname.includes('🧠 aon')) {
    return { key: 'aon-aviation', name: 'AON Aviation', icon: '🧠' };
  }
  if (lower.includes('human performance') || fname.includes('human performance')) {
    return { key: 'human-performance', name: 'Human Performance', icon: '🧠' };
  }
  if (lower.includes('aircraft general knowledge') || fname.includes('agk')) {
    return { key: 'aircraft-general', name: 'Aircraft General', icon: '✈️' };
  }
  if (lower.includes('air law') || fname.includes('al1')) {
    return { key: 'air-law', name: 'Air Law', icon: '📜' };
  }
  
  return null;
}

// Parse question from paragraph text
function parseQuestionParagraph(text) {
  // Match question number at start
  const numberMatch = text.match(/^(\d+)\.\s+/);
  if (!numberMatch) return null;
  
  const questionNumber = parseInt(numberMatch[1]);
  
  // Find correct answer
  const correctMatch = text.match(/Correct\s*Answer:\s*([A-D])/i);
  if (!correctMatch) return null;
  
  const correctAnswer = correctMatch[1];
  
  // Extract question text (before options)
  let questionText = text.substring(numberMatch[0].length);
  
  // Split by options (A. B. C. D.)
  const optionPattern = /\s+([A-D])[\.)]\s+/g;
  const parts = questionText.split(optionPattern);
  
  if (parts.length < 9) return null; // Need question + 4 options (A, text, B, text, C, text, D, text)
  
  // First part is the question
  const question = parts[0].trim();
  
  // Extract options
  const options = {
    A: parts[2]?.split(/Correct\s*Answer:/i)[0]?.trim() || '',
    B: parts[4]?.split(/Correct\s*Answer:/i)[0]?.trim() || '',
    C: parts[6]?.split(/Correct\s*Answer:/i)[0]?.trim() || '',
    D: parts[8]?.split(/Correct\s*Answer:/i)[0]?.trim() || ''
  };
  
  // Extract explanation if present (text after Correct Answer)
  let explanation = '';
  const explainMatch = text.match(/Correct\s*Answer:\s*[A-D]\s*(.+?)$/is);
  if (explainMatch) {
    explanation = explainMatch[1]
      .replace(/^\(/, '')
      .replace(/\)\.?$/, '')
      .replace(/\s*\d+$/, '') // Remove trailing numbers
      .trim();
  }
  
  return {
    number: questionNumber,
    question: question,
    options: options,
    correct: correctAnswer,
    explanation: explanation
  };
}

// Extract from HTML
function extractFromHtml(html) {
  // Remove HTML tags but keep newlines
  let text = html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<hr[^>]*>/gi, '|||SEPARATOR|||')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<br[^>]*>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#\d+;/g, ' ');
  
  // Split by separator
  const sections = text.split('|||SEPARATOR|||');
  
  const questions = [];
  for (const section of sections) {
    const trimmed = section.trim();
    if (!trimmed || trimmed.length < 50) continue;
    
    const parsed = parseQuestionParagraph(trimmed);
    if (parsed) {
      questions.push({
        question: parsed.question,
        options: parsed.options,
        correct: parsed.correct,
        explanation: parsed.explanation
      });
    }
  }
  
  return questions;
}

// Process all files
const allResults = [];

for (const filePath of inputFiles) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`Skipping missing file: ${filePath}`);
      continue;
    }
    
    console.log(`Processing: ${path.basename(filePath)}`);
    const html = fs.readFileSync(filePath, 'utf-8');
    const category = detectCategory(html, path.basename(filePath));
    
    if (!category) {
      console.log(`  ⚠️  Could not detect category for ${path.basename(filePath)}`);
      continue;
    }
    
    const questions = extractFromHtml(html);
    console.log(`  Extracted ${questions.length} questions for ${category.name}`);
    
    allResults.push({
      category: category,
      questions: questions,
      sourceFile: path.basename(filePath)
    });
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

// Organize by category
const organized = {};
for (const result of allResults) {
  const catKey = result.category.key;
  if (!organized[catKey]) {
    organized[catKey] = {
      name: result.category.name,
      icon: result.category.icon,
      tests: []
    };
  }
  
  organized[catKey].tests.push({
    name: result.category.name + ' - Added Import',
    timeLimit: 60,
    questions: result.questions
  });
}

// Save extracted data
const outputPath = path.join(__dirname, '../src/data/extracted_from_added.json');
fs.writeFileSync(outputPath, JSON.stringify(organized, null, 2));
console.log(`\n✅ Saved extracted JSON to ${outputPath}`);

// Now merge into testData.js
const testDataPath = path.join(__dirname, '../src/data/testData.js');
let testDataContent = fs.readFileSync(testDataPath, 'utf-8');

// Extract the testData object
const match = testDataContent.match(/const testData = ({[\s\S]+});?\s*(?:if|module\.exports)/);
if (!match) {
  console.error('Could not parse testData.js');
  process.exit(1);
}

const testData = eval('(' + match[1] + ')');

// Merge questions
let totalAdded = 0;
const existingQuestions = new Set();

// First, collect all existing questions to avoid duplicates
for (const catKey of Object.keys(testData)) {
  for (const test of testData[catKey].tests) {
    for (const q of test.questions) {
      existingQuestions.add(q.question.toLowerCase().trim());
    }
  }
}

console.log(`\n📊 Current database has ${existingQuestions.size} unique questions`);

// Merge new questions
for (const catKey of Object.keys(organized)) {
  if (!testData[catKey]) {
    console.log(`\n⚠️  Category '${catKey}' not found in testData, skipping`);
    continue;
  }
  
  for (const test of organized[catKey].tests) {
    const newQuestions = test.questions.filter(q => {
      const qLower = q.question.toLowerCase().trim();
      return !existingQuestions.has(qLower);
    });
    
    if (newQuestions.length > 0) {
      testData[catKey].tests.push({
        name: test.name,
        timeLimit: test.timeLimit,
        questions: newQuestions
      });
      
      totalAdded += newQuestions.length;
      console.log(`  ✅ Added ${newQuestions.length} new questions to ${testData[catKey].name}`);
    } else {
      console.log(`  ℹ️  No new questions to add for ${testData[catKey].name} (all duplicates)`);
    }
  }
}

// Write back to testData.js
const newTestDataStr = JSON.stringify(testData, null, 2);
const newContent = testDataContent.replace(
  /const testData = {[\s\S]+?};?\s*(?=if|module\.exports)/,
  `const testData = ${newTestDataStr};\n\n`
);

fs.writeFileSync(testDataPath, newContent);

console.log(`\n✅ Successfully added ${totalAdded} new questions to testData.js`);
console.log(`📊 Total questions now: ${existingQuestions.size + totalAdded}`);
