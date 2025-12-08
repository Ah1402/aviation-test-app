// Updates the visible test/question counts in index.html and STANDALONE.html
// to reflect the actual numbers from src/data/testData.js

const fs = require('fs');
const path = require('path');
const vm = require('vm');

function loadTestData(testDataPath) {
  const code = fs.readFileSync(testDataPath, 'utf-8');
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(code + '\n;this.testData = testData;', sandbox, { filename: 'testData.js' });
  return sandbox.testData;
}

function computeCounts(testData) {
  const counts = {};
  let totalQuestions = 0;
  Object.entries(testData).forEach(([key, cat]) => {
    const tests = Array.isArray(cat.tests) ? cat.tests : [];
    const testCount = tests.length;
    const questionCount = tests.reduce((sum, t) => sum + ((t.questions || []).length), 0);
    totalQuestions += questionCount;
    counts[key] = { testCount, questionCount };
  });
  return { perCategory: counts, totals: { categories: Object.keys(testData).length, questions: totalQuestions } };
}

function updateHtmlCounts(html, counts) {
  // For each category, update the text inside spans within its card
  Object.entries(counts.perCategory).forEach(([key, { testCount, questionCount }]) => {
    // Build patterns that match the target spans within the specific category card
    // We'll restrict replacements to the nearest card block by using a small window regex
    const cardPattern = new RegExp(
      '(<div\\s+class=\\"category-card\\"\\s+data-category=\\"' + key.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&') + '\\"[\\s\\S]*?)<div\\s+class=\\"category-info\\">([\\s\\S]*?)<\\/div>',
      'i'
    );

    html = html.replace(cardPattern, (match, prefix, infoBlock) => {
      let updatedInfo = infoBlock;
      // Update test-count text
      updatedInfo = updatedInfo.replace(/(<span[^>]*class="test-count"[^>]*>)([\s\S]*?)(<\/span>)/i,
        `$1${testCount} ${testCount === 1 ? 'Test' : 'Tests'}$3`);
      // Update question-count text
      updatedInfo = updatedInfo.replace(/(<span[^>]*class="question-count"[^>]*>)([\s\S]*?)(<\/span>)/i,
        `$1${questionCount} ${questionCount === 1 ? 'Question' : 'Questions'}$3`);
      return prefix + '<div class="category-info">' + updatedInfo + '</div>';
    });
  });

  return html;
}

function updateTotals(html, totals) {
  // Update home stats and about features placeholders
  const replaceById = (id, value) => {
    const re = new RegExp(`(<[^>]+id=["']${id}["'][^>]*>)([\\s\\S]*?)(<\\/[^>]+>)`, 'i');
    return html.replace(re, `$1${value}$3`);
  };

  html = replaceById('stat-categories-count', String(totals.categories));
  html = replaceById('stat-questions-count', String(totals.questions));
  html = replaceById('about-category-count', String(totals.categories));
  html = replaceById('about-questions-count', String(totals.questions));
  return html;
}

function run() {
  const root = process.cwd();
  const testDataPath = path.join(root, 'src', 'data', 'testData.js');
  const indexPath = path.join(root, 'index.html');
  const standalonePath = path.join(root, 'STANDALONE.html');
  const wwwIndexPath = path.join(root, 'www', 'index.html');
  const portableWwwIndexPath = path.join(root, 'dist', 'portable_build', 'www', 'index.html');

  const testData = loadTestData(testDataPath);
  const counts = computeCounts(testData);

  // Update index.html
  if (fs.existsSync(indexPath)) {
    let html = fs.readFileSync(indexPath, 'utf-8');
  let updated = updateHtmlCounts(html, counts);
  updated = updateTotals(updated, counts.totals);
    if (updated !== html) {
      fs.writeFileSync(indexPath, updated, 'utf-8');
      console.log('✅ Updated category counts in index.html');
    } else {
      console.log('ℹ️ No changes needed in index.html');
    }
  }

  // Update STANDALONE.html (static placeholders too)
  if (fs.existsSync(standalonePath)) {
    let html = fs.readFileSync(standalonePath, 'utf-8');
  let updated = updateHtmlCounts(html, counts);
  updated = updateTotals(updated, counts.totals);
    if (updated !== html) {
      fs.writeFileSync(standalonePath, updated, 'utf-8');
      console.log('✅ Updated category counts in STANDALONE.html');
    } else {
      console.log('ℹ️ No changes needed in STANDALONE.html');
    }
  }

  // Update www/index.html if present
  if (fs.existsSync(wwwIndexPath)) {
    let html = fs.readFileSync(wwwIndexPath, 'utf-8');
    let updated = updateHtmlCounts(html, counts);
    updated = updateTotals(updated, counts.totals);
    if (updated !== html) {
      fs.writeFileSync(wwwIndexPath, updated, 'utf-8');
      console.log('✅ Updated category counts in www/index.html');
    } else {
      console.log('ℹ️ No changes needed in www/index.html');
    }
  }

  // Update dist/portable_build/www/index.html if present
  if (fs.existsSync(portableWwwIndexPath)) {
    let html = fs.readFileSync(portableWwwIndexPath, 'utf-8');
    let updated = updateHtmlCounts(html, counts);
    updated = updateTotals(updated, counts.totals);
    if (updated !== html) {
      fs.writeFileSync(portableWwwIndexPath, updated, 'utf-8');
      console.log('✅ Updated category counts in dist/portable_build/www/index.html');
    } else {
      console.log('ℹ️ No changes needed in dist/portable_build/www/index.html');
    }
  }

  // Report summary
  const summary = Object.entries(counts.perCategory).map(([k, v]) => `${k}: ${v.testCount} tests, ${v.questionCount} questions`).join('\n');
  console.log('\nTotals: ' + counts.totals.categories + ' categories, ' + counts.totals.questions + ' questions');
  console.log('\nCategory counts:\n' + summary);
}

run();
