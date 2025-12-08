const fs = require('fs');
const path = require('path');

/**
 * Complete parser for last.htm with ALL questions and correct answers
 * Extracts all categories and questions with proper answer mapping
 */

function normalizeText(text) {
  return text
    .replace(/\s+/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(code))
    .trim();
}

function detectCategory(text) {
  const lower = text.toLowerCase();
  const patterns = [
    { key: 'aircraft-general', name: 'Aircraft General Knowledge', pattern: /aircraft\s+general/i },
    { key: 'air-law', name: 'Air Law', pattern: /air\s+law/i },
    { key: 'human-performance', name: 'Human Performance', pattern: /human\s+performance/i },
    { key: 'meteorology', name: 'Meteorology', pattern: /meteorology/i },
    { key: 'general-navigation', name: 'General Navigation', pattern: /general\s+navigation/i },
    { key: 'flight-planning', name: 'Flight Planning', pattern: /flight\s+planning/i },
    { key: 'instrumentation', name: 'Instrumentation', pattern: /instrumentation/i },
    { key: 'radio-navigation', name: 'Radio Navigation', pattern: /radio\s+navigation/i },
    { key: 'operational-procedures', name: 'Operational Procedures', pattern: /operational\s+procedures/i },
    { key: 'mass-balance', name: 'Mass & Balance', pattern: /mass\s+(and|&|balance)/i },
    { key: 'aircraft-performance', name: 'Aircraft Performance', pattern: /aircraft\s+performance|performance\s+test/i },
    { key: 'principles-of-flight', name: 'Principles of Flight', pattern: /principles?\s+of\s+flight/i },
    { key: 'aon-aviation', name: 'AON Aviation Knowledge', pattern: /aon\s+aviation/i }
  ];
  
  for (const p of patterns) {
    if (p.pattern.test(lower)) {
      return p;
    }
  }
  return null;
}

function parseHTML(htmlPath) {
  console.log('Reading HTML file...');
  const html = fs.readFileSync(htmlPath, 'utf8');
  
  // Split by <p> tags
  const paragraphs = [];
  const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  let match;
  while ((match = pRegex.exec(html)) !== null) {
    const cleaned = normalizeText(match[1].replace(/<[^>]+>/g, ' '));
    if (cleaned.trim()) {
      paragraphs.push(cleaned);
    }
  }
  
  const questions = [];
  let currentCategory = null;
  let currentTest = null;
  
  for (let i = 0; i < paragraphs.length; i++) {
    const para = paragraphs[i];
    
    // Check for category/test header
    const categoryMatch = detectCategory(para);
    if (categoryMatch && /test\s+\d+/i.test(para)) {
      const testMatch = para.match(/test\s+(\d+)/i);
      currentCategory = categoryMatch;
      currentTest = testMatch ? parseInt(testMatch[1]) : 1;
      console.log(`Found: ${categoryMatch.name} Test ${currentTest}`);
      continue;
    }
    
    // Check for question start (number followed by period and text)
    const qMatch = para.match(/^(\d+)\.\s+(.+)/);
    if (!qMatch) continue;
    
    const qNum = parseInt(qMatch[1]);
    const questionText = qMatch[2];
    
    // Next paragraph should have options (A. ... B. ... C. ... D. ...)
    if (i + 1 >= paragraphs.length) continue;
    const optionsPara = paragraphs[i + 1];
    
    // Extract options - they're on one line with trailing numbers
    // Format: A. text 123B. text 124C. text 125D. text 126
    let optionsMatch = optionsPara.match(/A\.\s+(.*?)\s+\d+B\.\s+(.*?)\s+\d+C\.\s+(.*?)\s+\d+D\.\s+(.*?)(?:\s+\d+|$)/);
    if (!optionsMatch) {
      // Try without trailing numbers
      optionsMatch = optionsPara.match(/A\.\s+(.*?)\s+B\.\s+(.*?)\s+C\.\s+(.*?)\s+D\.\s+(.*?)$/);
      if (!optionsMatch) continue;
    }
    
    const options = [
      normalizeText(optionsMatch[1]),
      normalizeText(optionsMatch[2]),
      normalizeText(optionsMatch[3]),
      normalizeText(optionsMatch[4])
    ];
    
    // Next paragraph should be "Correct Answer: X"
    if (i + 2 >= paragraphs.length) continue;
    const answerPara = paragraphs[i + 2];
    const answerMatch = answerPara.match(/Correct\s+Answer\s*:\s*([A-D])/i);
    if (!answerMatch) continue;
    
    const correctAnswer = answerMatch[1].toUpperCase().charCodeAt(0) - 65;
    
    questions.push({
      category: currentCategory ? currentCategory.key : 'unknown',
      categoryName: currentCategory ? currentCategory.name : 'Unknown',
      testNumber: currentTest || 1,
      questionNumber: qNum,
      question: normalizeText(questionText),
      options: options,
      correct: correctAnswer
    });
    
    // Skip the paragraphs we just processed
    i += 2;
  }
  
  return questions;
}

function main() {
  const htmlPath = process.argv[2] || 'C:\\Users\\ahmed\\Desktop\\last.htm';
  const outputPath = process.argv[3] || 'tools/parsed_last_htm_complete.json';
  
  if (!fs.existsSync(htmlPath)) {
    console.error('HTML file not found:', htmlPath);
    process.exit(1);
  }
  
  const questions = parseHTML(htmlPath);
  
  console.log(`\n=== EXTRACTION COMPLETE ===`);
  console.log(`Total questions extracted: ${questions.length}`);
  
  // Group by category
  const byCategory = {};
  questions.forEach(q => {
    if (!byCategory[q.category]) {
      byCategory[q.category] = { name: q.categoryName, questions: [] };
    }
    byCategory[q.category].questions.push(q);
  });
  
  console.log('\nBy Category:');
  Object.entries(byCategory).forEach(([key, data]) => {
    console.log(`  ${data.name}: ${data.questions.length} questions`);
  });
  
  // Save results
  fs.writeFileSync(outputPath, JSON.stringify({ questions, byCategory }, null, 2));
  console.log(`\nSaved to: ${outputPath}`);
  
  // Verify correct answers
  const withAnswers = questions.filter(q => q.correct >= 0 && q.correct <= 3);
  console.log(`\nQuestions with valid answers: ${withAnswers.length}/${questions.length}`);
}

main();
