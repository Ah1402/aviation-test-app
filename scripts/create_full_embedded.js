const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const indexPath = path.join(root, 'index.html');
const cssPath = path.join(root, 'src', 'styles', 'main.css');
const outPath = path.join(root, '924_full.html');

// Scripts to embed in order
const scripts = [
  'testData_complete.js',
  'src/scripts/aiProviders.js',
  'src/scripts/aiInit.js',
  'src/scripts/testEngine.js',
  'src/scripts/searchIndex.js',
  'src/scripts/searchEngineUpdater.js',
  'src/scripts/cameraSearch.js',
  'src/scripts/ui.js',
  'src/scripts/main.js',
  'src/scripts/syncVerbatim.js',
  'src/scripts/applyCorrections.js',
  'src/scripts/init.js',
  'src/scripts/updateStats.js',
  'src/scripts/specialTests.js'
];

function safeRead(p) {
  if (!fs.existsSync(p)) throw new Error('Missing file: ' + p);
  return fs.readFileSync(p, 'utf8');
}

let html = safeRead(indexPath);
const css = safeRead(cssPath);

// Replace external CSS link with embedded style
const cssLinkRegex = /<link rel="stylesheet" href="src\/styles\/main\.css">/;
html = html.replace(cssLinkRegex, `<style>\n${css}\n</style>`);

// Remove FontAwesome link since it's external
const faLinkRegex = /<link rel="stylesheet" href="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/font-awesome\/6\.0\.0\/css\/all\.min\.css">/;
html = html.replace(faLinkRegex, '');

// Remove manifest link
const manifestRegex = /<link rel="manifest" href="manifest\.json">/;
html = html.replace(manifestRegex, '');

// Remove icon links
const iconRegexes = [
  /<link rel="icon" type="image\/png" sizes="192x192" href="src\/images\/logo\.jpg">/,
  /<link rel="icon" type="image\/png" sizes="512x512" href="src\/images\/logo\.jpg">/,
  /<link rel="apple-touch-icon" href="src\/images\/logo\.jpg">/,
  /<link rel="shortcut icon" href="src\/images\/logo\.jpg">/
];
iconRegexes.forEach(regex => {
  html = html.replace(regex, '');
});

// Replace script tags with embedded scripts
scripts.forEach(scriptPath => {
  const fullPath = path.join(root, scriptPath);
  const scriptContent = safeRead(fullPath);
  const scriptTagRegex = new RegExp(`<script src="${scriptPath.replace(/\//g, '\\/')}"><\/script>`);
  html = html.replace(scriptTagRegex, `<script>\n${scriptContent}\n</script>`);
});

// Write the output
fs.writeFileSync(outPath, html, 'utf8');

console.log('Created full embedded version:', outPath);