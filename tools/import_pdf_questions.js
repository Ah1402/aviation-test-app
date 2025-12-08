const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

// Heuristic category detection from text blocks
function detectCategoryBlock(text) {
  const t = text.toLowerCase();
  if (t.includes('air law')) return { key: 'air-law', name: 'Air Law', icon: 'fas fa-gavel' };
  if (t.includes('aircraft general')) return { key: 'aircraft-general', name: 'Aircraft General Knowledge', icon: 'fas fa-plane' };
  if (t.includes('aon aviation')) return { key: 'aon-aviation', name: 'AON Aviation', icon: 'fas fa-graduation-cap' };
  if (t.includes('flight planning')) return { key: 'flight-planning', name: 'Flight Planning', icon: 'fas fa-route' };
  if (t.includes('operational procedures')) return { key: 'operational-procedures', name: 'Operational Procedures', icon: 'fas fa-cogs' };
  if (t.includes('radio navigation')) return { key: 'radio-navigation', name: 'Radio Navigation', icon: 'fas fa-broadcast-tower' };
  if (t.includes('instrumentation')) return { key: 'instrumentation', name: 'Instrumentation', icon: 'fas fa-gauge' };
  return null;
}

// Parse questions from plain text extracted from PDF
function parseQuestionsFromText(text) {
  // Normalize whitespace
  let content = text
    .replace(/\r/g, '\n')
    .replace(/\f/g, '\n')
    .replace(/\t/g, ' ')
    .replace(/\u00A0/g, ' ')
    .replace(/[\u2000-\u200B\u202F\u205F\u3000]/g, ' ')
    .replace(/ +/g, ' ')
    .replace(/\n{2,}/g, '\n')
    .trim();

  // Combine lines into paragraphs while preserving option markers
  content = content
    .replace(/\n([A-D][\.)]\s)/g, ' $1')
    .replace(/\n(Correct Answer\s*:\s*)/gi, ' $1');

  const lines = content.split(/\n/);
  const blocks = [];
  let current = [];
  for (const line of lines) {
    if (/^\d+\./.test(line.trim())) {
      if (current.length) blocks.push(current.join(' '));
      current = [line.trim()];
    } else if (current.length) {
      current.push(line.trim());
    }
  }
  if (current.length) blocks.push(current.join(' '));

  const detectedCategories = [];
  const questions = [];
  let currentCategory = { key: 'imported-pdf', name: 'Imported from PDF', icon: 'fas fa-file-import' };

  for (let block of blocks) {
    // Check if this block is a category header
    const cat = detectCategoryBlock(block);
    if (cat) {
      currentCategory = cat;
      detectedCategories.push(cat);
      continue;
    }

    // Look for a question containing options and a correct answer indicator
    const hasOptions = /(\s|^)[A-D][\.)]\s/.test(block) && /(\s|^)Correct\s*Answer\s*:\s*[A-D]/i.test(block);
    if (!hasOptions) continue;

    try {
      // Extract question number
      const numMatch = block.match(/^(\d+)\./);
      const qNumber = numMatch ? parseInt(numMatch[1], 10) : null;

      // Remove leading number
      let rest = block.replace(/^\d+\.\s*/, '').trim();

      // Remove trailing "Correct Answer: X"
      const correctMatch = rest.match(/Correct\s*Answer\s*:\s*([A-D])/i);
      const correctLetter = correctMatch ? correctMatch[1].toUpperCase() : null;
      rest = rest.replace(/\s*Correct\s*Answer\s*:\s*[A-D].*$/i, '').trim();

      // Split into question text and options (first option marker)
      const optStart = rest.search(/\s[A-D][\.)]\s/);
      if (optStart === -1) continue;
      const qText = rest.substring(0, optStart).trim();
      const optsText = rest.substring(optStart).trim();

      // Extract options by markers A./B./C./D.
      const optParts = optsText.split(/\s([A-D])[\.)]\s/).filter(s => s !== '');
      const options = [];
      for (let i = 0; i < optParts.length; i += 2) {
        const letter = optParts[i];
        const textPart = (optParts[i + 1] || '').trim();
        // The text may include the next marker; cut at the next marker if present
        const cleaned = textPart.replace(/\s+[A-D][\.)]\s[\s\S]*/, (m) => '');
        if (cleaned) options.push(cleaned.trim());
      }

      if (!qText || options.length < 2 || !correctLetter) continue;
      const correctIndex = correctLetter.charCodeAt(0) - 65;
      if (correctIndex < 0 || correctIndex >= options.length) continue;

      questions.push({
        category: currentCategory.key,
        categoryName: currentCategory.name,
        questionNumber: qNumber,
        question: qText,
        options,
        correct: correctIndex
      });
    } catch (e) {
      // skip block
    }
  }

  return { questions, detectedCategories };
}

async function main() {
  const inputPath = process.argv[2];
  const outJson = process.argv[3] || path.resolve(__dirname, '..', 'src', 'data', 'imported_from_pdf.json');
  if (!inputPath) {
    console.error('Usage: node tools/import_pdf_questions.js <PDF_PATH> [OUTPUT_JSON]');
    process.exit(1);
  }
  const pdfBuffer = fs.readFileSync(inputPath);
  const data = await pdfParse(pdfBuffer);
  const { questions, detectedCategories } = parseQuestionsFromText(data.text || '');
  console.log(`Extracted ${questions.length} questions.`);
  if (detectedCategories.length) {
    console.log('Detected categories:', detectedCategories.map(c => c.name).join(', '));
  }
  fs.writeFileSync(outJson, JSON.stringify({ questions }, null, 2), 'utf8');
  console.log('Saved JSON to', outJson);

  // Merge into testData.js if present
  const testDataPath = path.resolve(__dirname, '..', 'src', 'data', 'testData.js');
  if (fs.existsSync(testDataPath)) {
    let testData;
    try {
      // Attempt to load existing testData (supports module.exports in many generated versions)
      testData = require(testDataPath);
    } catch (e) {
      console.warn('Could not load testData.js as a module. Will try to append category by string manipulation.');
      testData = null;
    }

    const byCategory = {};
    for (const q of questions) {
      if (!byCategory[q.category]) {
        byCategory[q.category] = { name: q.categoryName, icon: 'fas fa-file-import', tests: [{ name: `${q.categoryName} - PDF Import`, timeLimit: 180, questions: [] }] };
      }
      byCategory[q.category].tests[0].questions.push({ question: q.question, options: q.options, correct: q.correct, explanation: null });
    }

    let merged;
    if (testData && typeof testData === 'object') {
      merged = { ...testData };
      for (const [key, cat] of Object.entries(byCategory)) {
        if (!merged[key]) merged[key] = cat; else {
          // Append as a new test inside existing category
          merged[key].tests.push({ name: `${cat.name} - PDF Import`, timeLimit: 180, questions: cat.tests[0].questions });
        }
      }
    } else {
      // Fallback: create new object
      merged = { ...byCategory };
    }

    const header = `// Aviation Test Data - Merged with PDF import\n// Generated: ${new Date().toLocaleString()}\n\n`;
    const jsOut = header + 'const testData = ' + JSON.stringify(merged, null, 2) + ';\n\nif (typeof module !== "undefined" && module.exports) { module.exports = testData; }\n';
    fs.writeFileSync(testDataPath, jsOut, 'utf8');
    console.log('Merged imported questions into src/data/testData.js');
  }
}

main().catch(err => { console.error(err); process.exit(1); });
