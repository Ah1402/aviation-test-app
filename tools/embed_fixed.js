const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (args.length < 3) {
  console.error('Usage: node embed_fixed.js <standalone.html> <fixed_testdata.js> <out.html>');
  process.exit(2);
}

const [standalonePath, fixedDataPath, outPath] = args.map(p => path.resolve(p));

try {
  const html = fs.readFileSync(standalonePath, 'utf8');
  const testData = fs.readFileSync(fixedDataPath, 'utf8');

  const marker = 'window.testData =';
  const idx = html.indexOf(marker);
  if (idx === -1) {
    console.error('Could not find window.testData marker in', standalonePath);
    process.exit(3);
  }
  const scriptOpen = html.lastIndexOf('<script', idx);
  if (scriptOpen === -1) {
    console.error('Could not find opening <script before marker');
    process.exit(4);
  }
  const scriptClose = html.indexOf('</script>', idx);
  if (scriptClose === -1) {
    console.error('Could not find closing </script> after marker');
    process.exit(5);
  }
  const before = html.slice(0, scriptOpen);
  const after = html.slice(scriptClose + '</script>'.length);

  let embedded = testData;
  // If the fixed file contains a wrapper like "const testData = { ... };" extract the object literal
  if (/\bconst\s+testData\s*=/.test(embedded) || /\bvar\s+testData\s*=/.test(embedded) || /\blet\s+testData\s*=/.test(embedded)) {
    const startIdx = embedded.indexOf('{', embedded.indexOf('testData'));
    const endIdx = embedded.lastIndexOf('};');
    if (startIdx !== -1 && endIdx !== -1) {
      embedded = embedded.slice(startIdx, endIdx + 1);
    }
  }
  if (!embedded.trim().startsWith('window.testData')) {
    embedded = 'window.testData = ' + embedded + ';';
  }

  const newHtml = before + '<script>\n' + embedded + '\n</script>' + after;
  fs.writeFileSync(outPath, newHtml, 'utf8');
  console.log('Wrote', outPath);
} catch (e) {
  console.error('Error embedding fixed data:', e && e.stack ? e.stack : e);
  process.exit(6);
}
