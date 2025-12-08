const fs = require('fs');

const file = 'C:\\Users\\ahmed\\Desktop\\617.htm';
const html = fs.readFileSync(file, 'latin1');

function count(pattern) {
  const m = html.match(new RegExp(pattern, 'g'));
  return m ? m.length : 0;
}

console.log('File length chars:', html.length);
console.log('Numbered lines like "1.":', count('(?:^|\n)\s*\\d+\\.'));
console.log('Option markers A.) :', count('[\
\r\t\s>]A[\
\r\t\s]*[\
\r\t\s]*[\.)]'));
console.log('Option markers B.) :', count('[\
\r\t\s>]B[\
\r\t\s]*[\
\r\t\s]*[\.)]'));
console.log('Contains word "Correct":', /Correct/i.test(html));
console.log('Contains "Answer":', /Answer/i.test(html));
console.log('Contains "Ans":', /\bAns\.?/i.test(html));
console.log('Contains "Key":', /\bKey\b/i.test(html));

// Dump a sanitized text around the first 5 occurrences of numbers like '1.'
const lines = html.split(/<\/p>/i);
let dumped = 0;
for (let i = 0; i < lines.length && dumped < 8; i++) {
  const seg = lines[i];
  if (/\b\d+\./.test(seg)) {
    const clean = seg.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    console.log(`\n--- Block ${dumped + 1} ---\n`, clean.slice(0, 400));
    dumped++;
  }
}
