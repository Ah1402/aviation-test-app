const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

// Map category detection to dataset keys
function detectCategoryBlock(text) {
  const t = text.toLowerCase();
  if (t.includes('air law')) return { key: 'air-law', name: 'Air Law' };
  if (t.includes('aircraft general')) return { key: 'aircraft-general', name: 'Aircraft General' };
  if (t.includes('aon aviation')) return { key: 'aon-aviation', name: 'AON Aviation Knowledge' };
  if (t.includes('flight planning')) return { key: 'flight-planning', name: 'Flight Planning' };
  if (t.includes('operational procedures')) return { key: 'operational-procedures', name: 'Operational Procedures' };
  if (t.includes('radio navigation')) return { key: 'radio-navigation', name: 'Radio Navigation' };
  if (t.includes('instrumentation')) return { key: 'instrumentation', name: 'Instrumentation' };
  if (t.includes('general navigation')) return { key: 'general-navigation', name: 'General Navigation' };
  if (t.includes('meteorology')) return { key: 'meteorology', name: 'Meteorology' };
  if (t.includes('mass and balance') || t.includes('mass & balance') || t.includes('mass-balance')) return { key: 'mass-balance', name: 'Mass & Balance' };
  if (t.includes('aircraft performance') || t.includes('performance test')) return { key: 'aircraft-performance', name: 'Aircraft Performance' };
  if (t.includes('principles of flight') || t.includes('principals of flight')) return { key: 'principles-of-flight', name: 'Principles of Flight' };
  return null;
}

function normalizeSpaces(s) {
  return s
    .replace(/\r/g, '\n')
    .replace(/\f/g, '\n')
    .replace(/\t/g, ' ')
    .replace(/\u00A0/g, ' ')
    .replace(/[\u2000-\u200B\u202F\u205F\u3000]/g, ' ')
    .replace(/ +/g, ' ')
    .replace(/\n{2,}/g, '\n')
    .trim();
}

function parseQuestionsFromText(text) {
  let content = normalizeSpaces(text);
  
  // Find all question blocks using a regex that matches "number followed by capital letter"
  // Pattern: \n followed by digit(s) followed immediately by an uppercase letter
  const questionPattern = /\n(\d+)([A-Z][^\n]*(?:\n(?!\d+[A-Z])[^\n]*)*?)(?=\n\d+[A-Z]|\n*$)/g;
  
  const detectedCategories = [];
  const questions = [];
  let currentCategory = null;

  let match;
  while ((match = questionPattern.exec(content)) !== null) {
    const qNumber = parseInt(match[1], 10);
    const fullBlock = match[2].trim();
    
    const cat = detectCategoryBlock(fullBlock);
    if (cat) { currentCategory = cat; detectedCategories.push(cat); continue; }
    
    // Find where options start (first occurrence of "A.")
    const optionsStartIndex = fullBlock.indexOf('A.');
    if (optionsStartIndex === -1) continue;
    
    const questionText = fullBlock.substring(0, optionsStartIndex).trim()
      .replace(/Flag this question.*$/i, '')
      .replace(/View explanation.*$/i, '')
      .replace(/\s+/g, ' ');
    
    // Extract all options A, B, C, D
    const optionsText = fullBlock.substring(optionsStartIndex);
    const options = [];
    
    // Match each option: letter + period + text until next letter or end marker
    const optRegex = /([A-D])\.\s*([^A-D]*?)(?=[A-D]\.|Flag this question|View explanation|$)/gs;
    let optMatch;
    while ((optMatch = optRegex.exec(optionsText)) !== null) {
      const optText = optMatch[2].trim()
        .replace(/Flag this question.*$/i, '')
        .replace(/View explanation.*$/i, '')
        .replace(/\s+/g, ' ')
        .trim();
      if (optText && optText.length > 0) {
        options.push(optText);
      }
    }
    
    // Must have exactly 4 options
    if (options.length < 4 || !questionText || questionText.length < 5) continue;
    
    questions.push({
      category: currentCategory ? currentCategory.key : 'unknown',
      categoryName: currentCategory ? currentCategory.name : 'Unknown',
      questionNumber: qNumber,
      question: questionText,
      options: options.slice(0, 4),
      correct: -1  // Can't detect from plain text; will match by question content
    });
  }

  return { questions, detectedCategories };
}

async function main() {
  const inputPath = process.argv[2];
  const outJson = process.argv[3] || path.resolve(__dirname, 'pdf_import.json');
  if (!inputPath) {
    console.error('Usage: node tools/extract_pdf_questions.js <PDF_PATH> [OUTPUT_JSON]');
    process.exit(1);
  }
  const pdfBuffer = fs.readFileSync(inputPath);
  const data = await pdfParse(pdfBuffer);
  const { questions, detectedCategories } = parseQuestionsFromText(data.text || '');
  console.log(`Extracted ${questions.length} questions from PDF.`);
  if (detectedCategories.length) {
    console.log('Detected categories:', [...new Set(detectedCategories.map(c => c.name))].join(', '));
  }
  fs.writeFileSync(outJson, JSON.stringify({ questions }, null, 2), 'utf8');
  console.log('Saved JSON to', outJson);
}

main().catch(err => { console.error(err); process.exit(1); });
