const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const start = html.indexOf('window.testData = {');
const end = html.lastIndexOf('};', html.indexOf("console.log('window.testData loaded")) + 2;
const dataStr = html.substring(start + 'window.testData = '.length, end - start - 'window.testData = '.length);

// Try to eval just the first 1000 characters
const smallDataStr = dataStr.substring(0, 1000);
console.log('Small data string:');
console.log(smallDataStr);

try {
    const data = eval(smallDataStr);
    console.log('Small portion parsed successfully');
} catch (e) {
    console.error('Error parsing small portion:', e.message);
}