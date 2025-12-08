const fs = require('fs');
const path = require('path');

function slugify(name) {
  return String(name || 'uncategorized')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'uncategorized';
}

function buildTestData(consolidated) {
  const grouped = {};
  consolidated.forEach(q => {
    const catName = q.category || 'Uncategorized';
    const slug = slugify(catName);
    if (!grouped[slug]) grouped[slug] = { name: catName, icon: 'fas fa-question-circle', tests: [] };

    const testNum = q.test || 1;
    const testId = `${slug}-test-${testNum}`;
    let testObj = grouped[slug].tests.find(t => t.id === testId);
    if (!testObj) {
      testObj = { id: testId, name: `Test ${testNum}`, timeLimit: 60, questions: [] };
      grouped[slug].tests.push(testObj);
    }

    let correctIndex = -1;
    if (Array.isArray(q.options) && typeof q.answer === 'string') {
      correctIndex = q.options.findIndex(opt => String(opt).trim() === String(q.answer).trim());
    }

    const questionObj = {
      category: testId,
      test: testNum,
      id: q.id,
      question: q.question || '',
      options: Array.isArray(q.options) ? q.options : [],
      answer: q.answer || '',
      correct: correctIndex,
      explanation: q.explanation || ''
    };

    testObj.questions.push(questionObj);
  });

  return grouped;
}

function readConsolidated(filePath) {
  const txt = fs.readFileSync(filePath, 'utf8');
  const first = txt.indexOf('[');
  const last = txt.lastIndexOf(']');
  if (first === -1 || last === -1 || last <= first) throw new Error('Could not parse consolidated array in ' + filePath);
  const arrText = txt.slice(first, last + 1);
  // eslint-disable-next-line no-eval
  const consolidated = eval('(' + arrText + ')');
  return consolidated;
}

function writePrebuilt(obj, outPath) {
  const content = 'window.testData = ' + JSON.stringify(obj, null, 2) + ';\n';
  fs.writeFileSync(outPath, content, 'utf8');
  console.log('Wrote:', outPath, ' (', Object.keys(obj).length, 'categories )');
}

function main() {
  const repoRoot = path.resolve(__dirname, '..');
  const source = path.join(repoRoot, '252.js');
  if (!fs.existsSync(source)) {
    console.error('Source 252.js not found at', source);
    process.exit(1);
  }

  const consolidated = readConsolidated(source);
  const grouped = buildTestData(consolidated);

  // Write main prebuilt file at repository root named testData_complete.js
  const outRoot = path.join(repoRoot, 'testData_complete.js');
  writePrebuilt(grouped, outRoot);

  // Also write a compact prebuilt to src/data/testData_prebuilt.js to support local builds
  const outSrc = path.join(repoRoot, 'src', 'data', 'testData_prebuilt.js');
  writePrebuilt(grouped, outSrc);

  console.log('Generation complete');
}

if (require.main === module) main();
