// Inject specialTests.js into index.html
const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// Check if script already exists
if (html.includes('src/scripts/specialTests.js')) {
    console.log('✅ specialTests.js script already included in index.html');
    process.exit(0);
}

// Find the script tag before </body> and inject our script
const scriptTag = '<script src="src/scripts/specialTests.js"></script>\n</body>';
html = html.replace('</body>', scriptTag);

fs.writeFileSync(indexPath, html, 'utf-8');
console.log('✅ Added specialTests.js script to index.html');
