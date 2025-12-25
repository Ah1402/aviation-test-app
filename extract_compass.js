const fs = require('fs');

// Read the HTML file
const htmlContent = fs.readFileSync('index.html', 'utf8');

// Find the compass-egyptair section start and end
const startMatch = htmlContent.indexOf('    compass-egyptair: {');
if (startMatch === -1) {
    console.error('Could not find compass-egyptair start');
    process.exit(1);
}

// Find the end - look for the closing brace followed by semicolon (last category)
const searchFrom = startMatch + 20;
const endPattern = htmlContent.indexOf('\n};\n', searchFrom);
if (endPattern === -1) {
    console.error('Could not find compass-egyptair end');
    process.exit(1);
}

const compassSection = htmlContent.substring(startMatch, endPattern + 3);
console.log('Extracted compass-egyptair section length:', compassSection.length);

// Write to a file for inspection
fs.writeFileSync('compass_section.txt', compassSection);
console.log('Compass section extracted to compass_section.txt');