const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const start = html.indexOf('window.testData = {');
const consoleLogPos = html.indexOf("console.log('window.testData loaded");
const end = consoleLogPos - 1; // Just before console.log
const dataStr = html.substring(start + 'window.testData = '.length, end - start - 'window.testData = '.length);

try {
    const data = eval('(' + dataStr + ')');
    const compass = data['compass-egyptair'];
    console.log('Compass EgyptAir questions:', compass.tests[0].questions.length);
    console.log('Total compass questions:', compass.tests[0].questions.length);

    // Show first few questions to verify structure
    console.log('\nFirst 3 questions:');
    compass.tests[0].questions.slice(0, 3).forEach((q, i) => {
        console.log(`${i+1}. ID: ${q.id}, Question: ${q.question.substring(0, 50)}...`);
    });

} catch (e) {
    console.error('Error:', e.message);
    console.error('Data string length:', dataStr.length);
    console.error('First 200 chars:', dataStr.substring(0, 200));
    console.error('Last 200 chars:', dataStr.substring(dataStr.length - 200));
}