const fs = require('fs');

console.log('Reading index.html...');
const html = fs.readFileSync('index.html', 'utf-8');

// Extract testData
const match = html.match(/window\.testData\s*=\s*(\{[\s\S]*?\});/);
if (!match) {
    console.log('ERROR: Could not find window.testData in index.html');
    process.exit(1);
}

console.log('Parsing testData...');
let testData;
try {
    testData = eval('(' + match[1] + ')');
} catch(e) {
    console.error('ERROR: Syntax error in testData:', e.message);
    process.exit(1);
}

console.log('✓ testData parsed successfully\n');

// Check for duplicates
const categories = Object.keys(testData);
const allIds = [];
const dupMap = {};

categories.forEach(cat => {
    testData[cat].tests.forEach(test => {
        test.questions.forEach(q => {
            const questionText = q.question ? q.question.substring(0, 60) : '(no question text)';
            if (dupMap[q.id]) {
                dupMap[q.id].push({
                    cat, 
                    test: test.name, 
                    question: questionText
                });
            } else {
                dupMap[q.id] = [{
                    cat, 
                    test: test.name, 
                    question: questionText
                }];
            }
            allIds.push(q.id);
        });
    });
});

const uniqueIds = new Set(allIds);
const duplicates = Object.entries(dupMap).filter(([id, locs]) => locs.length > 1);

console.log('📊 Question Statistics:');
console.log('  Total questions:', allIds.length);
console.log('  Unique IDs:', uniqueIds.size);
console.log('  Duplicate IDs:', duplicates.length);
console.log('');

if (duplicates.length > 0) {
    console.log('❌ FOUND DUPLICATES:\n');
    duplicates.slice(0, 20).forEach(([id, locs]) => {
        console.log(`ID ${id} appears ${locs.length} times:`);
        locs.forEach(loc => {
            console.log(`  - ${loc.cat} / ${loc.test}: "${loc.question}..."`);
        });
        console.log('');
    });
    
    if (duplicates.length > 20) {
        console.log(`... and ${duplicates.length - 20} more duplicates\n`);
    }
} else {
    console.log('✅ No duplicate question IDs found!');
}

// Category breakdown
console.log('\n📋 Questions per category:');
categories.forEach(cat => {
    const total = testData[cat].tests.reduce((sum, test) => sum + test.questions.length, 0);
    console.log(`  ${cat}: ${total} questions`);
});
