// Scan all headings from last403.html
const fs = require('fs');
const path = require('path');

const SRC = path.resolve(__dirname, '../../last403.html');
const html = fs.readFileSync(SRC, 'utf8');

const re = /<(h1|h2|h3)[^>]*>([\s\S]*?)<\/\1>/gi;
let m;
while ((m = re.exec(html))) {
  const tag = m[1].toUpperCase();
  const text = m[2].replace(/<[^>]+>/g, '').replace(/✈️/g, '').trim();
  console.log(`${tag}: ${text}`);
}
