const fs = require('fs');

// Normalize text
function normalizeText(text) {
  return text
    .replace(/&#\d+;/g, (match) => {
      const code = parseInt(match.slice(2, -1));
      return String.fromCharCode(code);
    })
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

// Category detection
const CATEGORIES = [
  { key: 'agk', name: 'Aircraft General Knowledge', patterns: ['aircraft general', 'agk'] },
  { key: 'air_law', name: 'Air Law', patterns: ['air law'] },
  { key: 'aon', name: 'AON Aviation Knowledge', patterns: ['aon aviation', 'aon'] },
  { key: 'flight_planning', name: 'Flight Planning', patterns: ['flight planning'] },
  { key: 'human_performance', name: 'Human Performance', patterns: ['human performance'] },
  { key: 'instrumentation', name: 'Instrumentation', patterns: ['instrumentation'] },
  { key: 'mass_balance', name: 'Mass & Balance', patterns: ['mass', 'balance'] },
  { key: 'meteorology', name: 'Meteorology', patterns: ['meteorology', 'meteo'] },
  { key: 'general_navigation', name: 'General Navigation', patterns: ['general navigation', 'gen nav'] },
  { key: 'performance', name: 'Aircraft Performance', patterns: ['aircraft performance', 'performance'] },
  { key: 'principles_of_flight', name: 'Principles of Flight', patterns: ['principles of flight', 'pof'] },
  { key: 'operational_procedures', name: 'Operational Procedures', patterns: ['operational procedure'] },
  { key: 'radio_navigation', name: 'Radio Navigation', patterns: ['radio navigation', 'radio nav'] }
];

function detectCategory(text) {
  const lower = text.toLowerCase();
  for (const cat of CATEGORIES) {
    if (cat.patterns.some(p => lower.includes(p))) {
      return cat;
    }
  }
  return null;
}

function parseHTML(htmlPath) {
  console.log('Reading HTML file...');
  const html = fs.readFileSync(htmlPath, 'utf8');
  
  // Split by "Correct Answer:" to get question blocks
  const blocks = html.split(/Correct\s+Answer\s*:\s*(?:<\/b>\s*)?([A-D])/i);
  
  const questions = [];
  let currentCategory = null;
  let currentTest = null;
  
  // Process blocks - every odd index is an answer letter, every even is question content
  for (let i = 0; i < blocks.length - 1; i += 2) {
    const questionBlock = blocks[i];
    const answerLetter = blocks[i + 1];
    
    if (!answerLetter || !/^[A-D]$/i.test(answerLetter)) continue;
    
    const correctIndex = answerLetter.toUpperCase().charCodeAt(0) - 65;
    
    // Clean the block
    const cleanBlock = normalizeText(questionBlock.replace(/<[^>]+>/g, ' '));
    
    // Check for category/test header in this block
    const categoryMatch = detectCategory(cleanBlock);
    if (categoryMatch && /test\s+\d+/i.test(cleanBlock)) {
      const testMatch = cleanBlock.match(/test\s+(\d+)/i);
      if (testMatch) {
        currentCategory = categoryMatch;
        currentTest = parseInt(testMatch[1]);
        console.log(`Found: ${categoryMatch.name} Test ${currentTest}`);
      }
    }
    
    // Extract the LAST question from this block (there might be multiple paragraphs)
    // Find the last occurrence of a question number pattern
    const qMatches = Array.from(cleanBlock.matchAll(/(\d+)[.)]\s+([^]*?)(?=\d+[.)]\s+|$)/g));
    if (qMatches.length === 0) continue;
    
    const lastQMatch = qMatches[qMatches.length - 1];
    const qNum = parseInt(lastQMatch[1]);
    let content = lastQMatch[2];
    
    // Extract question and options from content
    // Question ends where options start (A. ...)
    const optStartMatch = content.match(/\s+A[.)]\s+/);
    if (!optStartMatch) continue;
    
    const questionText = content.substring(0, optStartMatch.index).trim();
    const optionsText = content.substring(optStartMatch.index);
    
    // Remove trailing numbers from options (like "60B." -> "B.")
    const cleanOptions = optionsText.replace(/\s+\d+([A-D])[.)]/g, ' $1.');
    
    // Extract each option
    const optA = cleanOptions.match(/A[.)]\s+(.*?)(?=\s+B[.)]\s+|$)/s);
    const optB = cleanOptions.match(/B[.)]\s+(.*?)(?=\s+C[.)]\s+|$)/s);
    const optC = cleanOptions.match(/C[.)]\s+(.*?)(?=\s+D[.)]\s+|$)/s);
    const optD = cleanOptions.match(/D[.)]\s+(.*?)$/s);
    
    if (!optA || !optB || !optC || !optD) {
      console.log(`Warning: Could not extract options for Q${qNum}`);
      continue;
    }
    
    questions.push({
      category: currentCategory ? currentCategory.key : 'unknown',
      categoryName: currentCategory ? currentCategory.name : 'Unknown',
      testNumber: currentTest || 1,
      questionNumber: qNum,
      question: normalizeText(questionText),
      options: [
        normalizeText(optA[1]),
        normalizeText(optB[1]),
        normalizeText(optC[1]),
        normalizeText(optD[1])
      ],
      correct: correctIndex
    });
  }
  
  return questions;
}

function main() {
  const htmlPath = 'C:\\Users\\ahmed\\Desktop\\last.htm';
  
  console.log('Starting extraction from last.htm...\n');
  
  const questions = parseHTML(htmlPath);
  
  console.log('\n=== EXTRACTION COMPLETE ===');
  console.log(`Total questions extracted: ${questions.length}`);
  
  // Group by category
  const byCategory = {};
  questions.forEach(q => {
    if (!byCategory[q.categoryName]) {
      byCategory[q.categoryName] = [];
    }
    byCategory[q.categoryName].push(q);
  });
  
  console.log('\nBy Category:');
  Object.keys(byCategory).sort().forEach(cat => {
    console.log(`  ${cat}: ${byCategory[cat].length} questions`);
  });
  
  // Group by test
  const byTest = {};
  questions.forEach(q => {
    const key = `${q.categoryName} Test ${q.testNumber}`;
    if (!byTest[key]) {
      byTest[key] = [];
    }
    byTest[key].push(q);
  });
  
  console.log('\nBy Test:');
  Object.keys(byTest).sort().forEach(test => {
    console.log(`  ${test}: ${byTest[test].length} questions`);
  });
  
  // Save to file
  const outputPath = 'tools/parsed_last_htm_final.json';
  fs.writeFileSync(outputPath, JSON.stringify(questions, null, 2));
  console.log(`\nSaved to: ${outputPath}`);
  
  // Validation
  const validAnswers = questions.filter(q => q.correct >= 0 && q.correct <= 3);
  console.log(`\nQuestions with valid answers: ${validAnswers.length}/${questions.length}`);
  
  // Show sample
  if (questions.length > 0) {
    console.log('\n=== SAMPLE QUESTION ===');
    const sample = questions[Math.floor(questions.length / 2)];
    console.log(`Category: ${sample.categoryName} Test ${sample.testNumber}`);
    console.log(`Q${sample.questionNumber}: ${sample.question.substring(0, 100)}...`);
    console.log(`A. ${sample.options[0].substring(0, 60)}...`);
    console.log(`B. ${sample.options[1].substring(0, 60)}...`);
    console.log(`C. ${sample.options[2].substring(0, 60)}...`);
    console.log(`D. ${sample.options[3].substring(0, 60)}...`);
    console.log(`Correct: ${String.fromCharCode(65 + sample.correct)}`);
  }
}

main();
