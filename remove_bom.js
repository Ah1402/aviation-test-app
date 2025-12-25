const fs = require('fs');

// Read the file as binary
const buffer = fs.readFileSync('index.html');

// Check for BOM
if (buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF) {
    console.log('BOM detected, removing...');
    // Remove BOM
    const contentWithoutBOM = buffer.slice(3);
    fs.writeFileSync('index_no_bom.html', contentWithoutBOM);
    console.log('BOM removed');
} else {
    console.log('No BOM detected');
}