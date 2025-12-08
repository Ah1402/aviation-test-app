const fs = require('fs');

const filePath = '924.html';
const content = fs.readFileSync(filePath, 'utf8');

console.log('File size:', content.length, 'characters');

// Find the script tag that contains window.testData
const testDataMarker = 'window.testData = {';
const markerIndex = content.indexOf(testDataMarker);
if (markerIndex === -1) {
    console.log('window.testData not found in file');
    process.exit(1);
}

// Find the <script> before this marker
const scriptStartBefore = content.lastIndexOf('<script>', markerIndex);
if (scriptStartBefore === -1) {
    console.log('Script start not found before window.testData');
    process.exit(1);
}

// Find the </script> after this marker
const scriptEndAfter = content.indexOf('</script>', markerIndex);
if (scriptEndAfter === -1) {
    console.log('Script end not found after window.testData');
    process.exit(1);
}

const scriptContent = content.substring(scriptStartBefore + '<script>'.length, scriptEndAfter).trim();

console.log('Script content length:', scriptContent.length);

// Find window.testData within the script
const dataStartIndex = scriptContent.indexOf(testDataMarker);
if (dataStartIndex === -1) {
    console.log('window.testData not found in script content');
    console.log('First 200 chars:', scriptContent.substring(0, 200));
    process.exit(1);
}

// Find the end of the assignment: };
const assignmentEnd = scriptContent.indexOf('};', dataStartIndex);
if (assignmentEnd === -1) {
    console.log('End of assignment not found');
    process.exit(1);
}

const testDataStr = scriptContent.substring(dataStartIndex + testDataMarker.length - 1, assignmentEnd).trim();

// Try to parse the JSON
try {
    const testData = JSON.parse(testDataStr);

    // Count categories and questions
    const categories = Object.keys(testData);
    let totalQuestions = 0;
    categories.forEach(cat => {
        if (testData[cat].tests) {
            testData[cat].tests.forEach(test => {
                if (test.questions) {
                    totalQuestions += test.questions.length;
                }
            });
        }
    });

    console.log('Categories:', categories.length);
    console.log('Total questions:', totalQuestions);

} catch (e) {
    console.log('Error parsing JSON:', e.message);
    console.log('TestData string length:', testDataStr.length);
    console.log('First 100 chars:', testDataStr.substring(0, 100));
    console.log('Last 100 chars:', testDataStr.substring(testDataStr.length - 100));
}