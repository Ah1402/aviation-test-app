const fs = require('fs');
const vm = require('vm');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'FULL_STANDALONE_EMBEDDED_UPDATED.html');
const dataPath = path.join(__dirname, '..', 'testData_complete.js');

function extractFromHtml(html) {
  const marker = 'window.testData =';
  const i = html.indexOf(marker);
  if (i === -1) return null;
  const j = html.indexOf('</script>', i);
  if (j === -1) return null;
  let block = html.substring(i, j);
  block = block.replace(/^window\.testData\s*=\s*/, '');
  // Trim trailing semicolon(s)
  block = block.replace(/;\s*$/, '');
  return block;
}

function computeCounts(data) {
  const categoryCounts = {};
  let total = 0;
  for (const [k, cat] of Object.entries(data || {})) {
    if (!cat || !Array.isArray(cat.tests)) { categoryCounts[k] = 0; continue; }
    let qCount = 0;
    for (const t of cat.tests) {
      qCount += (t.questions || []).length;
    }
    categoryCounts[k] = qCount;
    total += qCount;
  }
  return { totalQuestions: total, categoryCounts };
}

try {
  const html = fs.readFileSync(htmlPath, 'utf8');
  const block = extractFromHtml(html);
  if (!block) { console.error('No embedded testData found in updated standalone HTML'); process.exit(2); }
  // Evaluate the block safely in a vm
  const sandbox = {};
  vm.createContext(sandbox);
  const script = 'data = ' + block + ';';
  vm.runInContext(script, sandbox, { timeout: 5000 });
  const embeddedData = sandbox.data;
  const embeddedCounts = computeCounts(embeddedData);
  console.log('EMBEDDED_COUNTS:', JSON.stringify(embeddedCounts, null, 2));

  // Baseline from testData_complete.js
  const code = fs.readFileSync(dataPath, 'utf8');
  const sb = { window: {} };
  vm.createContext(sb);
  vm.runInContext(code, sb, { timeout: 5000 });
  const fileData = sb.window.testData;
  const fileCounts = computeCounts(fileData);
  console.log('FILE_COUNTS:', JSON.stringify(fileCounts, null, 2));

  if (embeddedCounts.totalQuestions === fileCounts.totalQuestions) {
    console.log('MATCH: embedded total matches file total ->', embeddedCounts.totalQuestions);
    process.exit(0);
  } else {
    console.log('MISMATCH: embedded total', embeddedCounts.totalQuestions, '!= file total', fileCounts.totalQuestions);
    process.exit(3);
  }
} catch (e) {
  console.error('Error verifying embedding:', e && e.stack ? e.stack : e);
  process.exit(1);
}
