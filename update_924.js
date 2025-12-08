const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync('index.html', 'utf8');

// Read CSS
const mainCss = fs.readFileSync('src/styles/main.css', 'utf8');

// Read JS files
const jsFiles = [
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

let embeddedJs = '';
jsFiles.forEach(file => {
    if (fs.existsSync(file)) {
        embeddedJs += fs.readFileSync(file, 'utf8') + '\n';
    }
});

// Build the HTML - embed CSS and JS but keep testData as external reference
let embeddedHtml = indexHtml
    .replace('<link rel="stylesheet" href="src/styles/main.css">', `<style>${mainCss}</style>`)
    .replace(/<script src="src\/scripts\/[^"]+"><\/script>/g, '') // Remove script tags
    .replace('</body>', `<script>${embeddedJs}</script></body>`);

// Write to 924.html
fs.writeFileSync('924.html', embeddedHtml);

console.log('Updated 924.html with embedded content (testData remains external).');