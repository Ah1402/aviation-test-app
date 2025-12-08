const fs = require('fs');
const path = require('path');

const fixes = [
  ['â€”', '—'],
  ['â€“', '–'],
  ['â€™', '’'],
  ['â€œ', '“'],
  ['â€�', '”'],
  ['â€¦', '…'],
  ['Â°C', '°C'],
  ['Â·', '·'],
  ['Ã©', 'é'],
  ['Ã¨', 'è'],
  ['Ãª', 'ê'],
  ['Ã¡', 'á'],
  ['Ã±', 'ñ'],
  ['Ã´', 'ô'],
  ['Ã§', 'ç'],
  ['Ã€', 'À'],
  ['â‰ˆ', '≈'],
  ['â‰¥', '≥'],
  ['â‰¤', '≤'],
  ['â€¢', '•'],
  ['â„¢', '™'],
  ['â‚¬', '€'],
  ['Â', '']
];

function applyFixes(filePath) {
  if (!fs.existsSync(filePath)) return {file: filePath, updated: false, reason: 'missing'};
  let txt = fs.readFileSync(filePath, 'utf8');
  const beforeSample = txt.substr(0, 2000);
  let changed = false;
  fixes.forEach(([bad, good]) => {
    if (txt.indexOf(bad) !== -1) {
      txt = txt.split(bad).join(good);
      changed = true;
    }
  });
  if (changed) {
    fs.writeFileSync(filePath, txt, 'utf8');
  }
  const afterSample = txt.substr(0, 2000);
  return {file: filePath, updated: changed, before: beforeSample, after: afterSample};
}

function main() {
  const repo = path.resolve(__dirname, '..');
  const targets = [
    path.join(repo, 'STANDALONE.html'),
    path.join(repo, 'www', 'STANDALONE.html')
  ];
  const results = [];
  targets.forEach(t => {
    try { results.push(applyFixes(t)); } catch (e) { results.push({file: t, error: e.message}); }
  });
  console.log(JSON.stringify(results, null, 2));
}

if (require.main === module) main();
