const fs = require('fs');
const html = fs.readFileSync('index_shareable.html', 'utf8');
const data = fs.readFileSync('testData.txt', 'utf8');
const newScript = '<script>window.testData = ' + data + ';</script>';
const oldScript = '<script>if(typeof window.testData === "undefined") window.testData = {};</script>';
const newHtml = html.replace(oldScript, newScript);
fs.writeFileSync('index_shareable_updated.html', newHtml);