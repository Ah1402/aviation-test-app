const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const start = html.indexOf('window.testData = {');
const firstCategoryEnd = html.indexOf('\n    },\n    air-law: {', start);
const firstCategoryStr = html.substring(start + 'window.testData = '.length, firstCategoryEnd + 6);

console.log('First category string length:', firstCategoryStr.length);
console.log('First 200 chars:', firstCategoryStr.substring(0, 200));
console.log('Last 200 chars:', firstCategoryStr.substring(firstCategoryStr.length - 200));

try {
    const data = eval('(' + firstCategoryStr + ')');
    console.log('First category parsed successfully');
    console.log('Keys:', Object.keys(data));
} catch (e) {
    console.error('Error parsing first category:', e.message);
}