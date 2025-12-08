const fs = require('fs');
const pdfParse = require('pdf-parse');

(async () => {
  const file = process.argv[2];
  if (!file) {
    console.error('Usage: node tools/dump_pdf_text.js <PDF_PATH>');
    process.exit(1);
  }
  const buf = fs.readFileSync(file);
  const data = await pdfParse(buf);
  const outPath = 'tools/tmp_pdf_text.txt';
  fs.writeFileSync(outPath, data.text || '', 'utf8');
  console.log('Wrote extracted text to', outPath, '(', (data.text || '').length, 'chars )');
})();