const fs = require('fs');

// Read the original HTML file
const htmlContent = fs.readFileSync('index.html', 'utf8');

// Read the restructured compass section
const newCompassSection = fs.readFileSync('compass_restructured.txt', 'utf8');

// Find the old compass section
const startMatch = htmlContent.indexOf('    compass-egyptair: {');
if (startMatch === -1) {
    console.error('Could not find compass-egyptair start');
    process.exit(1);
}

// Find the end of the old compass section
const endMatch = htmlContent.indexOf('\n};\n', startMatch + 1);
if (endMatch === -1) {
    console.error('Could not find compass-egyptair end');
    process.exit(1);
}

const oldCompassSection = htmlContent.substring(startMatch, endMatch + 3);

// Replace the old section with the new one
const newHtmlContent = htmlContent.replace(oldCompassSection, newCompassSection);

// Write the updated HTML file
fs.writeFileSync('index_updated.html', newHtmlContent);
console.log('Updated index.html saved as index_updated.html');