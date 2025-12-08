const fs = require('fs');
const path = require('path');

// Read the HTML file
const htmlPath = path.join(__dirname, '..', '..', 'last.htm');
const html = fs.readFileSync(htmlPath, 'utf-8');

// Extract test sections by looking for the title pattern
const testTitleRegex = /Aircraft General Knowledge Test (\d+)<\/b><\/p>/g;
const sections = [];
let match;

while ((match = testTitleRegex.exec(html)) !== null) {
    sections.push({
        testNumber: parseInt(match[1]),
        startIndex: match.index + match[0].length
    });
}

// Find where AGK tests end (look for first non-AGK test title after last AGK test)
const stopTitleRegex = /<b>.*?(Air Law Test|AON Aviation Knowledge Test|Flight Planning|Human Performance|Instrumentation|Mass and Balance|Meteorology|Principles of Flight).*?<\/b>/i;
const stopMatch = stopTitleRegex.exec(html);
const agkEndIndex = stopMatch ? stopMatch.index : html.length;

console.log(`Found ${sections.length} AGK test titles, content ends at index ${agkEndIndex}`);

// Set end indices (constrained by AGK section boundary)
for (let i = 0; i < sections.length; i++) {
    let endIndex;
    if (i < sections.length - 1) {
        endIndex = sections[i + 1].startIndex;
    } else {
        endIndex = agkEndIndex; // Last AGK test ends where other tests begin
    }
    sections[i].content = html.substring(sections[i].startIndex, endIndex);
}

console.log(`Found ${sections.length} Aircraft General Knowledge tests\n`);

// Parse each section
const allTests = [];

sections.forEach(section => {
    const questions = [];
    
    // Try format 1: number. question text A. option B. option... <b>Correct Answer:</b> X
    const format1Regex = /<p class=MsoNormal>(\d+)\.\s+(.*?)<b>Correct Answer:<\/b>\s+([A-D])\s*<\/p>/gs;
    
    let qMatch;
    while ((qMatch = format1Regex.exec(section.content)) !== null) {
        const questionNum = parseInt(qMatch[1]);
        const fullText = qMatch[2].trim();
        const correctLetter = qMatch[3].trim();
        
        // Extract question text and options
        const parts = fullText.split(/\s+([A-D])\.\s+/);
        const questionText = parts[0].replace(/\s+/g, ' ').trim();
        
        const options = [];
        for (let i = 1; i < parts.length; i += 2) {
            if (parts[i] && parts[i+1]) {
                options.push(parts[i+1].replace(/\s+/g, ' ').trim());
            }
        }
        
        // Convert letter to index
        const correctIndex = correctLetter.charCodeAt(0) - 65; // A=0, B=1, C=2, D=3
        
        questions.push({
            id: questionNum,
            text: questionText,
            options: options,
            correct: correctIndex,
            correctLetter: correctLetter
        });
    }
    
    // Try format 2: question and options on separate <p> tags, Correct Answer: X on its own line
    // Pattern: <p>1. question</p> <p>A. opt</p> <p>B. opt</p> <p>C. opt</p> <p>D. opt</p> <p>Correct Answer: X</p>
    // Using [\s\S] instead of . to match across newlines within tags
    const format2Regex = /<p class=MsoNormal>(\d+)\.\s+([\s\S]*?)<\/p>\s*<p class=MsoNormal>A\.\s+([\s\S]*?)<\/p>\s*<p class=MsoNormal>B\.\s+([\s\S]*?)<\/p>\s*<p class=MsoNormal>C\.\s+([\s\S]*?)<\/p>\s*<p class=MsoNormal>D\.\s+([\s\S]*?)<\/p>\s*<p class=MsoNormal>Correct Answer:\s*([A-D])/g;
    
    while ((qMatch = format2Regex.exec(section.content)) !== null) {
        const questionNum = parseInt(qMatch[1]);
        const questionText = qMatch[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').replace(/\d+\s*$/g, '').trim();
        
        const options = [
            qMatch[3].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').replace(/\d+\s*$/g, '').trim(),
            qMatch[4].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').replace(/\d+\s*$/g, '').trim(),
            qMatch[5].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').replace(/\d+\s*$/g, '').trim(),
            qMatch[6].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').replace(/\d+\s*$/g, '').trim()
        ];
        
        const correctLetter = qMatch[7].trim();
        const correctIndex = correctLetter.charCodeAt(0) - 65;
        
        questions.push({
            id: questionNum,
            text: questionText,
            options: options,
            correct: correctIndex,
            correctLetter: correctLetter
        });
    }
    
    allTests.push({
        testNumber: section.testNumber,
        name: `Aircraft General Knowledge Test ${section.testNumber}`,
        questions: questions
    });
    
    console.log(`Test ${section.testNumber}: Found ${questions.length} questions`);
});

// Output results
console.log('\n=== Summary ===');
allTests.forEach(test => {
    console.log(`\nTest ${test.testNumber}: ${test.questions.length} questions`);
    if (test.questions.length > 0) {
        console.log(`  First question: ${test.questions[0].text.substring(0, 60)}...`);
        console.log(`  Last question: ${test.questions[test.questions.length-1].text.substring(0, 60)}...`);
    }
});

// Write to JSON for review
const outputPath = path.join(__dirname, 'parsed_last_htm.json');
fs.writeFileSync(outputPath, JSON.stringify(allTests, null, 2));
console.log(`\n✓ Parsed data saved to: ${outputPath}`);

// Show sample question
if (allTests.length > 0 && allTests[0].questions.length > 0) {
    const sample = allTests[0].questions[0];
    console.log('\n=== Sample Question ===');
    console.log(`Q${sample.id}: ${sample.text}`);
    sample.options.forEach((opt, i) => {
        const letter = String.fromCharCode(65 + i);
        const marker = i === sample.correct ? ' ✓' : '';
        console.log(`  ${letter}. ${opt}${marker}`);
    });
}

module.exports = allTests;
