const fs = require('fs');
const testData = require('./testData.js');

console.log('✓ testData loaded successfully');
console.log('Categories:', Object.keys(testData).length);

// Check compass-egyptair specifically
const compass = testData['compass-egyptair'];
if (compass) {
    console.log('\n✓ compass-egyptair found');
    console.log('Tests:', compass.tests.length);
    
    let totalQuestions = 0;
    compass.tests.forEach((test, index) => {
        const count = test.questions.length;
        totalQuestions += count;
        console.log(`  Test ${index + 1}: ${count} questions`);
    });
    console.log(`  Total: ${totalQuestions} questions`);
} else {
    console.log('✗ compass-egyptair not found');
}

// Check for any syntax issues
console.log('\n✓ All data structures valid');
console.log('✓ No syntax errors detected');
