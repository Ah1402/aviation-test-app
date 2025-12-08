const fs = require('fs');

// Read both files
const indexPath = 'index.html';
const testDataPath = 'testData_complete.js';

let indexContent = fs.readFileSync(indexPath, 'utf8');
let testDataContent = fs.readFileSync(testDataPath, 'utf8');

// Context-aware encoding fixes for aviation terminology
const fixes = [
  // Fix degree symbol before numbers with units (should be ±)
  { from: /°(\d+)\s*ft/g, to: '±$1 ft', desc: '°25 ft → ±25 ft' },
  { from: /°(\d+)\s*NM/g, to: '±$1 NM', desc: '°40 NM → ±40 NM' },
  { from: /°(\d+)\s*km/g, to: '±$1 km', desc: '°50 km → ±50 km' },
  { from: /°(\d+)\s*m/g, to: '±$1 m', desc: '°100 m → ±100 m' },
  // Fix degree symbol with space before degrees (° 5° → ± 5°)
  { from: /°\s+(\d+)°/g, to: '± $1°', desc: '° 5° → ± 5°' },
];

let indexFixed = 0;
let testDataFixed = 0;
const fixDetails = [];

// Apply fixes to index.html
fixes.forEach(fix => {
  const beforeIndex = indexContent;
  indexContent = indexContent.replace(fix.from, fix.to);
  if (beforeIndex !== indexContent) {
    const matches = beforeIndex.match(fix.from);
    if (matches) {
      indexFixed += matches.length;
      fixDetails.push(`  ${fix.desc} (${matches.length} times in index.html)`);
    }
  }
});

// Apply fixes to testData_complete.js
fixes.forEach(fix => {
  const beforeTestData = testDataContent;
  testDataContent = testDataContent.replace(fix.from, fix.to);
  if (beforeTestData !== testDataContent) {
    const matches = beforeTestData.match(fix.from);
    if (matches) {
      testDataFixed += matches.length;
      fixDetails.push(`  ${fix.desc} (${matches.length} times in testData_complete.js)`);
    }
  }
});

// Write the fixed files
fs.writeFileSync(indexPath, indexContent, 'utf8');
fs.writeFileSync(testDataPath, testDataContent, 'utf8');

console.log(`✓ Fixed ${indexFixed} encoding issues in index.html`);
console.log(`✓ Fixed ${testDataFixed} encoding issues in testData_complete.js`);
console.log('\nFixes applied:');
fixDetails.forEach(detail => console.log(detail));
