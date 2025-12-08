// Quick test of list-item parser
const fs = require('fs');
const html = fs.readFileSync('last403.html', 'utf8');

// Get Mass and Balance Test 1 section
const m = html.match(/<h1[^>]*>.*?Mass and Balance Test 1.*?<\/h1>([\s\S]{0,5000})/i);
if (!m) {
  console.log('Section not found');
  process.exit(1);
}

const section = m[1];
console.log('Section length:', section.length, 'chars');

// Test question-item regex
const re = /<li class="question-item">([\s\S]*?)<\/li>/gi;
let count = 0;
let match;
while ((match = re.exec(section))) {
  count++;
  if (count <= 2) {
    console.log(`\n=== Question ${count} ===`);
    console.log(match[0].substring(0, 300) + '...');
  }
}
console.log('\nTotal question-item elements found:', count);
