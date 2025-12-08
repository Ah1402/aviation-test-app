const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'last403.html');
if (!fs.existsSync(file)) {
  console.error('File not found:', file);
  process.exit(2);
}
const txt = fs.readFileSync(file, 'utf8');
const matches = txt.match(/"question":|<div class=\"question\"|<div class=\'question\'/g);
const count = matches ? matches.length : 0;
console.log('rawMatches:', count);
// Try to find categories if present as JS object
const jsMatch = txt.match(/window\.testData\s*=\s*(\{[\s\S]*?\});/);
if (jsMatch) {
  try {
    const obj = eval('(' + jsMatch[1] + ')');
    const perCat = {};
    let total = 0;
    for (const k of Object.keys(obj)) {
      const tests = obj[k].tests || [];
      let catCount = 0;
      for (const t of tests) {
        catCount += (t.questions || []).length;
      }
      perCat[k] = catCount;
      total += catCount;
    }
    console.log('jsCounts:', perCat, 'total', total);
  } catch (e) {
    console.error('Failed to parse embedded JS object:', e.message);
  }
} else {
  console.log('No embedded window.testData found in last403.html');
}
