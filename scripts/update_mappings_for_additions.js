const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const mapFile = path.join(repoRoot, 'data', 'id_remap_full_seq.json');
const revFile = path.join(repoRoot, 'data', 'id_remap_full_seq_reverse.json');
const summaryFile = path.join(repoRoot, 'data', 'id_remap_full_seq_summary.json');

const additions = [1339, 1340, 1341, 1342, 1343, 1344];

function upsert() {
  if (!fs.existsSync(mapFile) || !fs.existsSync(revFile) || !fs.existsSync(summaryFile)) {
    throw new Error('Mapping or summary file missing');
  }

  const map = JSON.parse(fs.readFileSync(mapFile, 'utf8'));
  const rev = JSON.parse(fs.readFileSync(revFile, 'utf8'));
  const summary = JSON.parse(fs.readFileSync(summaryFile, 'utf8'));

  additions.forEach(n => {
    const key = String(n);
    // old -> new: map identity if not present
    if (!map.hasOwnProperty(key)) map[key] = [n];
    // reverse mapping new -> old
    if (!rev.hasOwnProperty(key)) rev[key] = n;
  });

  // Update summary totals
  const prevTotal = summary.totalQuestions || 0;
  const newMax = Math.max(summary.newMaxId || 0, Math.max(...additions));
  const newTotal = Math.max(prevTotal, newMax);

  summary.totalQuestions = newTotal;
  summary.newMaxId = newMax;
  // update backup reference (optional)
  summary.backup = fs.existsSync(path.join(repoRoot, 'testData_complete.js.bak.2025-11-26T00-20-00')) ? 'testData_complete.js.bak.2025-11-26T00-20-00' : summary.backup;

  fs.writeFileSync(mapFile, JSON.stringify(map, null, 2), 'utf8');
  fs.writeFileSync(revFile, JSON.stringify(rev, null, 2), 'utf8');
  fs.writeFileSync(summaryFile, JSON.stringify(summary, null, 2), 'utf8');

  console.log('Updated mapping files and summary with additions:', additions.join(', '));
}

upsert();
