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
  
  // Extract all <p> content (including tags inside)
  const paragraphs = [];
  const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  let match;
  while ((match = pRegex.exec(html)) !== null) {
    paragraphs.push(match[1]); // Keep HTML tags for bold detection
  }
  
  const questions = [];
  let currentCategory = null;
  let currentTest = null;
  
  for (let i = 0; i < paragraphs.length; i++) {
    const para = paragraphs[i];
    const cleanPara = normalizeText(para.replace(/<[^>]+>/g, ' '));
    
    if (!cleanPara || cleanPara.length < 5) continue;
    
    // Check for category/test header
    const categoryMatch = detectCategory(cleanPara);
    if (categoryMatch && /test\s+\d+/i.test(cleanPara)) {
      const testMatch = cleanPara.match(/test\s+(\d+)/i);
      currentCategory = categoryMatch;
      currentTest = testMatch ? parseInt(testMatch[1]) : 1;
      console.log(`Found: ${categoryMatch.name} Test ${currentTest}`);
      continue;
    }
    
    // Check for "Correct Answer:" - this marks the end of a question
    // Format can be: "Correct Answer:</b> A" or "Correct Answer: A</b>" or "Correct Answer:</b> A ("
    const correctMatch = para.match(/Correct\s+Answer\s*:\s*(?:<\/b>\s*)?([A-D])/i);
    if (correctMatch) {
      const correctLetter = correctMatch[1].toUpperCase();
      const correctIndex = correctLetter.charCodeAt(0) - 65;
      
      // Now parse backwards to find the question and options
      // The question+options are in THIS paragraph before "Correct Answer"
      const beforeAnswer = para.split(/Correct\s+Answer\s*:/i)[0];
      const cleanBefore = normalizeText(beforeAnswer.replace(/<[^>]+>/g, ' '));
      
      // Try to extract question number and text
      const qMatch = cleanBefore.match(/^(\d+)\.\s+(.+?)(?=\s+A\.|$)/s);
      if (!qMatch) continue;
      
      const qNum = parseInt(qMatch[1]);
      const questionText = normalizeText(qMatch[2]);
      
      // Extract options - they might be inline or multi-line
      // Pattern 1: A. ... B. ... C. ... D. ...
      let optionsText = cleanBefore.substring(cleanBefore.indexOf(questionText) + questionText.length);
      
      // Remove trailing numbers like "60B." -> "B."
      optionsText = optionsText.replace(/\s+\d+([A-D])\./g, ' $1.');
      
      const optA = optionsText.match(/A\.\s+(.*?)(?=\s+B\.|$)/s);
      const optB = optionsText.match(/B\.\s+(.*?)(?=\s+C\.|$)/s);
      const optC = optionsText.match(/C\.\s+(.*?)(?=\s+D\.|$)/s);
      const optD = optionsText.match(/D\.\s+(.*?)$/s);
      
      if (optA && optB && optC && optD) {
        questions.push({
          category: currentCategory ? currentCategory.key : 'unknown',
          categoryName: currentCategory ? currentCategory.name : 'Unknown',
          testNumber: currentTest || 1,
          questionNumber: qNum,
          question: questionText,
          options: [
            normalizeText(optA[1]),
            normalizeText(optB[1]),
            normalizeText(optC[1]),
            normalizeText(optD[1])
          ],
          correct: correctIndex
        });
      }
    }
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
  
  // Save to file
  const outputPath = 'tools/parsed_last_htm_v2.json';
  fs.writeFileSync(outputPath, JSON.stringify(questions, null, 2));
  console.log(`\nSaved to: ${outputPath}`);
  
  // Validation
  const validAnswers = questions.filter(q => q.correct >= 0 && q.correct <= 3);
  console.log(`\nQuestions with valid answers: ${validAnswers.length}/${questions.length}`);
  
  // Show sample
  if (questions.length > 0) {
    console.log('\n=== SAMPLE QUESTION ===');
    const sample = questions[0];
    console.log(`Category: ${sample.categoryName} Test ${sample.testNumber}`);
    console.log(`Q${sample.questionNumber}: ${sample.question.substring(0, 80)}...`);
    console.log(`Options: ${sample.options.length}`);
    console.log(`Correct: ${String.fromCharCode(65 + sample.correct)}`);
  }
}

main();
