// Script to extract questions from HTML files and update testData.js
const fs = require('fs');
const path = require('path');

// Function to parse HTML content and extract questions
function parseQuestions(htmlContent, categoryName) {
  const questions = [];

  // Split by test sections (Test 1, Test 2, etc.)
  const testSections = htmlContent.split(/<b><span[^>]*>.*Test \d+<\/span><\/b>/);

  // Remove the first part (header)
  testSections.shift();

  testSections.forEach((section, testIndex) => {
    const testQuestions = [];

    // Split by question number pattern
    const questionBlocks = section.split(/\d+\.\s/);

    // Remove empty first element
    questionBlocks.shift();

    questionBlocks.forEach(block => {
      if (block.trim()) {
        try {
          // Extract question text (everything before the options)
          const questionMatch = block.match(/^(.+?)(?=A\.)/s);
          if (!questionMatch) return;

          const questionText = questionMatch[1].trim();

          // Extract options
          const optionsMatch = block.match(/A\.\s*(.+?)\s*B\.\s*(.+?)\s*C\.\s*(.+?)\s*D\.\s*(.+?)(?=\s*<b>Correct Answer:|\s*$)/s);
          if (!optionsMatch) return;

          const options = [
            optionsMatch[1].trim(),
            optionsMatch[2].trim(),
            optionsMatch[3].trim(),
            optionsMatch[4].trim()
          ];

          // Extract correct answer
          const correctMatch = block.match(/<b>Correct Answer:\s*<\/b>\s*([A-D])/);
          if (!correctMatch) return;

          const correctLetter = correctMatch[1];
          const correctIndex = correctLetter.charCodeAt(0) - 'A'.charCodeAt(0);

          // Extract explanation if present
          let explanation = "";
          const explanationMatch = block.match(/\(Note: (.+?)\)/);
          if (explanationMatch) {
            explanation = explanationMatch[1].trim();
          }

          testQuestions.push({
            question: questionText,
            options: options,
            correct: correctIndex,
            explanation: explanation
          });
        } catch (error) {
          console.log(`Error parsing question in ${categoryName} Test ${testIndex + 1}:`, error.message);
        }
      }
    });

    if (testQuestions.length > 0) {
      questions.push({
        name: `${categoryName} Test ${testIndex + 1}`,
        timeLimit: 60,
        questions: testQuestions
      });
    }
  });

  return questions;
}

// Function to parse simple question format (for some files)
function parseSimpleQuestions(htmlContent, categoryName) {
  const questions = [];

  // Split content by question blocks
  const lines = htmlContent.split('\n');
  let currentQuestion = null;
  let currentOptions = [];
  let correctAnswer = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Check for question start
    if (line.match(/^\d+\.\s/) && !line.includes('Correct Answer:')) {
      // Save previous question if exists
      if (currentQuestion && currentOptions.length === 4 && correctAnswer !== null) {
        const correctIndex = correctAnswer.charCodeAt(0) - 'A'.charCodeAt(0);
        questions.push({
          question: currentQuestion,
          options: currentOptions,
          correct: correctIndex,
          explanation: ""
        });
      }

      // Start new question
      currentQuestion = line.replace(/^\d+\.\s/, '').trim();
      currentOptions = [];
      correctAnswer = null;
    }
    // Check for options
    else if (line.match(/^[A-D]\.\s/)) {
      const optionText = line.replace(/^[A-D]\.\s/, '').trim();
      currentOptions.push(optionText);
    }
    // Check for correct answer
    else if (line.includes('Correct Answer:')) {
      const match = line.match(/Correct Answer:\s*([A-D])/);
      if (match) {
        correctAnswer = match[1];
      }
    }
  }

  // Add last question
  if (currentQuestion && currentOptions.length === 4 && correctAnswer !== null) {
    const correctIndex = correctAnswer.charCodeAt(0) - 'A'.charCodeAt(0);
    questions.push({
      question: currentQuestion,
      options: currentOptions,
      correct: correctIndex,
      explanation: ""
    });
  }

  return [{
    name: `${categoryName} Test 1`,
    timeLimit: 60,
    questions: questions
  }];
}

// Main function to process all files
function processQuestionFiles() {
  const addedDir = path.join(__dirname, 'added');
  const testDataPath = path.join(__dirname, 'src', 'data', 'testData.js');

  // Read current testData.js
  const testDataContent = fs.readFileSync(testDataPath, 'utf8');
  const testData = eval('(' + testDataContent.replace('const testData = ', '').replace(';', '') + ')');

  // File mappings
  const fileMappings = {
    'Instrumentation Test 1.htm': 'instrumentation',
    'metrology.htm': 'meteorology',
    'performance .htm': 'aircraft-performance',
    'mass.htm': 'mass-balance',
    '🧠 Human Performance and Limitations Test 1.htm': 'human-performance',
    'agk1 .htm': 'aircraft-general',
    'al1.htm': 'air-law',
    'general .htm': 'general-navigation',
    'operational procedure.htm': 'operational-procedures',
    '🧠 AON Aviation Knowledge Test 1.htm': 'aon-aviation'
  };

  // Process each file
  Object.entries(fileMappings).forEach(([filename, category]) => {
    const filePath = path.join(addedDir, filename);

    if (fs.existsSync(filePath)) {
      console.log(`Processing ${filename} for category ${category}`);

      const htmlContent = fs.readFileSync(filePath, 'utf8');

      let questions;
      if (filename === 'Instrumentation Test 1.htm') {
        questions = parseQuestions(htmlContent, 'Instrumentation');
      } else {
        questions = parseSimpleQuestions(htmlContent, getCategoryDisplayName(category));
      }

      // Update testData
      if (testData[category] && questions.length > 0) {
        // Replace the first test with the parsed questions
        testData[category].tests[0] = questions[0];

        // Add additional tests if they exist
        for (let i = 1; i < questions.length; i++) {
          testData[category].tests.push(questions[i]);
        }

        console.log(`Added ${questions[0].questions.length} questions to ${category}`);
      }
    } else {
      console.log(`File not found: ${filename}`);
    }
  });

  // Write updated testData.js
  const updatedContent = `// Aviation Test Data - Updated with Questions
// Generated: ${new Date().toISOString()}

const testData = ${JSON.stringify(testData, null, 2)};

// Attach to window for browser usage
if (typeof window !== "undefined") {
  window.testData = testData;
}

// Export for use in modules (Node/CommonJS)
if (typeof module !== "undefined" && module.exports) {
  module.exports = testData;
}`;

  fs.writeFileSync(testDataPath, updatedContent);
  console.log('Updated testData.js with new questions');
}

function getCategoryDisplayName(category) {
  const names = {
    'instrumentation': 'Instrumentation',
    'meteorology': 'Meteorology',
    'aircraft-performance': 'Aircraft Performance',
    'mass-balance': 'Mass & Balance',
    'human-performance': 'Human Performance & Limitations',
    'aircraft-general': 'Aircraft General',
    'air-law': 'Air Law',
    'general-navigation': 'General Navigation',
    'operational-procedures': 'Operational Procedures',
    'aon-aviation': 'AON Aviation Knowledge'
  };
  return names[category] || category;
}

// Run the script
processQuestionFiles();