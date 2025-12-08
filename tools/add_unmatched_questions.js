const fs = require('fs');

// Category mapping from parsed format to testData format
const CATEGORY_MAPPING = {
  'agk': 'aircraft-general',
  'air_law': 'air-law',
  'aon': 'aon-aviation',
  'flight_planning': 'flight-planning',
  'human_performance': 'human-performance',
  'instrumentation': 'instrumentation',
  'mass_balance': 'mass-balance',
  'meteorology': 'meteorology',
  'general_navigation': 'general-navigation',
  'performance': 'aircraft-performance',
  'principles_of_flight': 'principles-of-flight',
  'operational_procedures': 'operational-procedures',
  'radio_navigation': 'radio-navigation'
};

// Levenshtein distance for fuzzy matching
function levenshtein(a, b) {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

function similarity(a, b) {
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1;
  return 1 - levenshtein(a, b) / maxLen;
}

function normalizeForMatch(text) {
  return text.toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .substring(0, 200);
}

function isQuestionMatched(newQ, existingQuestions) {
  const newText = normalizeForMatch(newQ.question);
  
  for (const existing of existingQuestions) {
    const existingText = normalizeForMatch(existing.question);
    const sim = similarity(newText, existingText);
    
    if (sim >= 0.85) {
      return true;
    }
  }
  
  return false;
}

function main() {
  console.log('Loading parsed questions from last.htm...');
  const parsedQuestions = JSON.parse(fs.readFileSync('tools/parsed_last_htm_final.json', 'utf8'));
  console.log(`Loaded ${parsedQuestions.length} questions\n`);
  
  console.log('Loading testData.js...');
  const testDataPath = 'src/data/testData.js';
  const testDataContent = fs.readFileSync(testDataPath, 'utf8');
  
  // Extract testData object
  const startMatch = testDataContent.match(/const testData = /);
  if (!startMatch) {
    console.error('Error: Could not find testData declaration');
    return;
  }
  
  const startPos = startMatch.index + startMatch[0].length;
  let braceCount = 0;
  let endPos = startPos;
  let inString = false;
  let stringChar = null;
  let escaped = false;
  
  for (let i = startPos; i < testDataContent.length; i++) {
    const char = testDataContent[i];
    
    if (escaped) {
      escaped = false;
      continue;
    }
    
    if (char === '\\') {
      escaped = true;
      continue;
    }
    
    if ((char === '"' || char === "'") && !escaped) {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (char === stringChar) {
        inString = false;
        stringChar = null;
      }
      continue;
    }
    
    if (inString) continue;
    
    if (char === '{') braceCount++;
    else if (char === '}') {
      braceCount--;
      if (braceCount === 0) {
        endPos = i + 1;
        break;
      }
    }
  }
  
  const testDataJson = testDataContent.substring(startPos, endPos);
  let testData = JSON.parse(testDataJson);
  
  console.log(`Loaded testData with ${Object.keys(testData).length} categories\n`);
  
  // Create backup
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').replace('T', '_').substring(0, 19);
  const backupPath = `testData_backup_add_questions_${timestamp}.js`;
  fs.writeFileSync(backupPath, testDataContent);
  console.log(`Created backup: ${backupPath}\n`);
  
  // Group parsed questions by category
  const parsedByCategory = {};
  parsedQuestions.forEach(q => {
    if (!parsedByCategory[q.category]) {
      parsedByCategory[q.category] = [];
    }
    parsedByCategory[q.category].push(q);
  });
  
  // Statistics
  let totalAdded = 0;
  let totalSkipped = 0;
  const addLog = [];
  
  // Process each category
  for (const [parsedCatKey, questions] of Object.entries(parsedByCategory)) {
    const testDataCatKey = CATEGORY_MAPPING[parsedCatKey];
    
    if (!testDataCatKey) {
      console.log(`Warning: No mapping for category ${parsedCatKey}`);
      continue;
    }
    
    if (!testData[testDataCatKey]) {
      console.log(`Warning: Category ${testDataCatKey} not found in testData`);
      continue;
    }
    
    const categoryData = testData[testDataCatKey];
    console.log(`\nProcessing ${categoryData.name}: ${questions.length} questions from last.htm`);
    
    // Collect all existing questions
    const allExisting = [];
    (categoryData.tests || []).forEach(test => {
      (test.questions || []).forEach(q => allExisting.push(q));
    });
    
    console.log(`  Current: ${allExisting.length} questions in ${categoryData.tests.length} tests`);
    
    // Find unmatched questions
    const newQuestions = [];
    for (const q of questions) {
      if (!isQuestionMatched(q, allExisting)) {
        newQuestions.push({
          question: q.question,
          options: q.options,
          correct: q.correct,
          explanation: ""
        });
      }
    }
    
    if (newQuestions.length === 0) {
      console.log(`  ✓ No new questions to add`);
      totalSkipped += questions.length;
      continue;
    }
    
    console.log(`  → Adding ${newQuestions.length} new questions`);
    
    // Group new questions into tests of 20 each
    const testsToAdd = [];
    for (let i = 0; i < newQuestions.length; i += 20) {
      const chunk = newQuestions.slice(i, i + 20);
      const testNumber = categoryData.tests.length + testsToAdd.length + 1;
      
      testsToAdd.push({
        name: `${categoryData.name} Test ${testNumber}`,
        timeLimit: 60,
        questions: chunk
      });
    }
    
    // Add tests to category
    categoryData.tests.push(...testsToAdd);
    
    addLog.push({
      category: categoryData.name,
      testsAdded: testsToAdd.length,
      questionsAdded: newQuestions.length
    });
    
    totalAdded += newQuestions.length;
    totalSkipped += (questions.length - newQuestions.length);
    
    console.log(`  ✓ Added ${testsToAdd.length} new test(s)`);
  }
  
  console.log('\n=== SUMMARY ===');
  console.log(`Questions added: ${totalAdded}`);
  console.log(`Questions skipped (already exist): ${totalSkipped}`);
  
  if (addLog.length > 0) {
    console.log('\n=== DETAILS ===');
    addLog.forEach(log => {
      console.log(`${log.category}: +${log.questionsAdded} questions in ${log.testsAdded} new test(s)`);
    });
    
    fs.writeFileSync('tools/questions_added_log.json', JSON.stringify(addLog, null, 2));
    console.log('\nDetailed log saved to: tools/questions_added_log.json');
  }
  
  // Write updated testData
  console.log('\nWriting updated testData.js...');
  const header = testDataContent.substring(0, startMatch.index);
  const footer = testDataContent.substring(endPos);
  const newTestDataJson = JSON.stringify(testData, null, 2);
  const newContent = header + `const testData = ${newTestDataJson};\n\nexport default testData` + footer.replace(/;\s*export default testData.*$/s, '');
  
  fs.writeFileSync(testDataPath, newContent);
  console.log('✓ testData.js updated successfully!');
  
  console.log('\n=== COMPLETE ===');
  console.log(`Backup: ${backupPath}`);
  console.log(`Added ${totalAdded} new questions to your test database`);
  
  // Show new totals
  console.log('\n=== NEW TOTALS ===');
  Object.keys(testData).sort().forEach(cat => {
    const tests = testData[cat].tests || [];
    const total = tests.reduce((sum, t) => sum + (t.questions ? t.questions.length : 0), 0);
    console.log(`${testData[cat].name}: ${tests.length} tests, ${total} questions`);
  });
}

main();
