const fs = require('fs');

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
    .substring(0, 200); // Compare first 200 chars
}

function findMatchingQuestion(newQ, existingQuestions) {
  const newText = normalizeForMatch(newQ.question);
  
  for (const existing of existingQuestions) {
    const existingText = normalizeForMatch(existing.question);
    const sim = similarity(newText, existingText);
    
    if (sim >= 0.85) { // 85% similarity threshold
      return { question: existing, similarity: sim };
    }
  }
  
  return null;
}

function main() {
  console.log('Loading parsed questions from last.htm...');
  const parsedQuestions = JSON.parse(fs.readFileSync('tools/parsed_last_htm_final.json', 'utf8'));
  console.log(`Loaded ${parsedQuestions.length} questions from last.htm\n`);
  
  console.log('Loading current testData.js...');
  const testDataPath = 'src/data/testData_prebuilt.js';
  const testDataContent = fs.readFileSync(testDataPath, 'utf8');
  
  // Extract the testData object - it's in format: window.testData = { ... };
  // Find the opening { after window.testData =
  const startMatch = testDataContent.match(/window\.testData = /);
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
  
  // Find the matching closing brace
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
  
  let testData;
  try {
    testData = JSON.parse(testDataJson);
  } catch (e) {
    console.error('Error parsing testData JSON:', e);
    console.log('First 500 chars:', testDataJson.substring(0, 500));
    return;
  }
  
  console.log(`Loaded testData with ${Object.keys(testData).length} categories\n`);
  
  // Create backup
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').replace('T', '_').substring(0, 19);
  const backupPath = `testData_backup_answers_${timestamp}.js`;
  fs.writeFileSync(backupPath, testDataContent);
  console.log(`Created backup: ${backupPath}\n`);
  
  // Statistics
  let matched = 0;
  let updated = 0;
  let noChange = 0;
  let notFound = 0;
  
  const changeLog = [];
  
  // Group parsed questions by category
  const parsedByCategory = {};
  parsedQuestions.forEach(q => {
    if (!parsedByCategory[q.category]) {
      parsedByCategory[q.category] = [];
    }
    parsedByCategory[q.category].push(q);
  });
  
  // Process each category
  for (const [categoryKey, categoryData] of Object.entries(testData)) {
    const parsedForCategory = parsedByCategory[categoryKey] || [];
    console.log(`Processing ${categoryKey}: ${parsedForCategory.length} questions from last.htm`);
    
    if (!categoryData.tests || !Array.isArray(categoryData.tests)) {
      console.log(`  Skipping - no tests array`);
      continue;
    }
    
    // Collect all existing questions in this category
    const allExistingQuestions = [];
    categoryData.tests.forEach((test, testIdx) => {
      if (test.questions && Array.isArray(test.questions)) {
        test.questions.forEach((q, qIdx) => {
          allExistingQuestions.push({
            ...q,
            testIndex: testIdx,
            questionIndex: qIdx
          });
        });
      }
    });
    
    console.log(`  Found ${allExistingQuestions.length} existing questions`);
    
    // Match and update
    for (const parsedQ of parsedForCategory) {
      const match = findMatchingQuestion(parsedQ, allExistingQuestions);
      
      if (match) {
        matched++;
        const existing = match.question;
        const test = categoryData.tests[existing.testIndex];
        const question = test.questions[existing.questionIndex];
        
        if (question.correct !== parsedQ.correct) {
          changeLog.push({
            category: categoryKey,
            categoryName: categoryData.name,
            test: existing.testIndex + 1,
            qNum: existing.questionIndex + 1,
            question: question.question.substring(0, 60) + '...',
            oldAnswer: String.fromCharCode(65 + question.correct),
            newAnswer: String.fromCharCode(65 + parsedQ.correct),
            similarity: (match.similarity * 100).toFixed(1) + '%'
          });
          
          question.correct = parsedQ.correct;
          updated++;
        } else {
          noChange++;
        }
      } else {
        notFound++;
      }
    }
  }
  
  console.log('\n=== UPDATE SUMMARY ===');
  console.log(`Matched questions: ${matched}`);
  console.log(`  - Updated answers: ${updated}`);
  console.log(`  - No change needed: ${noChange}`);
  console.log(`Not matched: ${notFound}`);
  
  if (changeLog.length > 0) {
    console.log(`\n=== CHANGES MADE (${changeLog.length} total) ===`);
    changeLog.slice(0, 20).forEach(log => {
      console.log(`${log.categoryName} Test ${log.test} Q${log.qNum}: ${log.oldAnswer} → ${log.newAnswer}`);
      console.log(`  "${log.question}"`);
    });
    
    if (changeLog.length > 20) {
      console.log(`\n... and ${changeLog.length - 20} more changes`);
    }
    
    // Save change log
    fs.writeFileSync('tools/answer_corrections_log.json', JSON.stringify(changeLog, null, 2));
    console.log('\nDetailed log saved to: tools/answer_corrections_log.json');
  }
  
  // Write updated testData
  console.log('\nWriting updated testData.js...');
  const header = testDataContent.substring(0, startMatch.index);
  const footer = testDataContent.substring(endPos);
  const newTestDataJson = JSON.stringify(testData, null, 2);
  const newContent = header + `window.testData = ${newTestDataJson};` + footer;
  
  fs.writeFileSync(testDataPath, newContent);
  console.log('✓ testData.js updated successfully!');
  
  console.log('\n=== COMPLETE ===');
  console.log(`Backup created: ${backupPath}`);
  console.log(`${updated} answers corrected`);
  console.log(`${notFound} questions from last.htm not found in testData (may be new questions)`);
}

main();
