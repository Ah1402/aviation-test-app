// Test search engine functionality
const testData = require('../src/data/testData.js');

// Simple test without full search engine
const data = testData.testData || testData;

console.log('=== Testing Question Bank ===');
let totalQuestions = 0;
let categories = {};

Object.keys(data).forEach(categoryKey => {
    const category = data[categoryKey];
    let catTotal = 0;
    
    category.tests.forEach(test => {
        catTotal += test.questions.length;
    });
    
    categories[category.name] = catTotal;
    totalQuestions += catTotal;
});

console.log('\nCategory Breakdown:');
Object.keys(categories).sort().forEach(name => {
    console.log(`  ${name}: ${categories[name]} questions`);
});

console.log(`\nTotal Questions: ${totalQuestions}`);

// Test question format
console.log('\n=== Testing Question Format ===');
const firstCategory = Object.keys(data)[0];
const firstTest = data[firstCategory].tests[0];
const firstQuestion = firstTest.questions[0];

console.log('Sample question:', firstQuestion.question.substring(0, 60) + '...');
console.log('Options type:', Array.isArray(firstQuestion.options) ? 'Array' : typeof firstQuestion.options);
console.log('Options count:', Array.isArray(firstQuestion.options) ? firstQuestion.options.length : Object.keys(firstQuestion.options || {}).length);

// Check for questions with object-style options
console.log('\n=== Checking Option Formats ===');
let arrayCount = 0;
let objectCount = 0;

Object.keys(data).forEach(categoryKey => {
    const category = data[categoryKey];
    category.tests.forEach(test => {
        test.questions.forEach(q => {
            if (Array.isArray(q.options)) {
                arrayCount++;
            } else if (typeof q.options === 'object') {
                objectCount++;
            }
        });
    });
});

console.log(`Questions with array options: ${arrayCount}`);
console.log(`Questions with object options: ${objectCount}`);

console.log('\n✅ Question bank validation completed!');
