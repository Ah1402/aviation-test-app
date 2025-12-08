const fs = require('fs');
const path = require('path');

// Simple HTML parser for extracting questions
function extractQuestionsFromHTML(htmlContent) {
    const questions = [];
    let currentCategory = null;
    let currentTest = null;
    
    // Split content into lines and process
    const lines = htmlContent.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Skip empty lines
        if (!line) continue;
        
        // Remove HTML tags for text processing
        const cleanText = line.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        
        // Check for category headers
        if (cleanText.includes('Aircraft General Knowledge')) {
            currentCategory = 'aircraft-general';
            currentTest = 'Aircraft General Knowledge';
            continue;
        } else if (cleanText.includes('Air Law')) {
            currentCategory = 'air-law';
            currentTest = 'Air Law';
            continue;
        } else if (cleanText.includes('AON Aviation')) {
            currentCategory = 'aon-aviation';
            currentTest = 'AON Aviation';
            continue;
        } else if (cleanText.includes('Flight Planning')) {
            currentCategory = 'flight-planning';
            currentTest = 'Flight Planning';
            continue;
        } else if (cleanText.includes('Operational Procedures')) {
            currentCategory = 'operational-procedures';
            currentTest = 'Operational Procedures';
            continue;
        } else if (cleanText.includes('Radio Navigation')) {
            currentCategory = 'radio-navigation';
            currentTest = 'Radio Navigation';
            continue;
        }
        
        // Check for questions (starts with number followed by period)
        const questionMatch = cleanText.match(/^(\d+)\.\s+(.+)/);
        if (questionMatch && currentCategory) {
            const questionNum = parseInt(questionMatch[1]);
            const questionText = questionMatch[2];
            
            // Parse the full question with options
            const fullQuestion = parseQuestionWithOptions(cleanText);
            
            if (fullQuestion && fullQuestion.options.length >= 2 && fullQuestion.correct !== null) {
                questions.push({
                    category: currentCategory,
                    test: currentTest,
                    question: fullQuestion
                });
                
                // Log every 10th question for debugging
                if (questions.length % 10 === 0) {
                    console.log(`  Processed ${questions.length} questions...`);
                }
            } else {
                // Debug: log failed questions
                if (questionNum <= 5) {
                    console.log(`  Skipped question ${questionNum}: ${questionText.substring(0, 50)}...`);
                    console.log(`    Options found: ${fullQuestion ? fullQuestion.options.length : 0}`);
                    console.log(`    Correct answer: ${fullQuestion ? fullQuestion.correct : 'none'}`);
                }
            }
        }
    }
    
    return questions;
}

function parseQuestionWithOptions(text) {
    // Extract question text (everything before "A.")
    const questionParts = text.split(' A. ');
    if (questionParts.length < 2) return null;
    
    const question = questionParts[0].replace(/^\d+\.\s*/, '').trim();
    const optionsText = ' A. ' + questionParts[1];
    
    // Extract options A, B, C, D more carefully
    const options = [];
    
    // Split by option letters and clean
    const optionSections = optionsText.split(/\s+([A-D])\.\s+/);
    
    for (let i = 1; i < optionSections.length; i += 2) {
        if (i + 1 < optionSections.length) {
            let optionText = optionSections[i + 1];
            // Remove "Correct Answer" part if it exists
            optionText = optionText.replace(/\s*Correct Answer:.*$/, '').trim();
            if (optionText) {
                options.push(optionText);
            }
        }
    }
    
    // If we didn't get options that way, try regex approach
    if (options.length === 0) {
        const optionRegex = /([A-D])\.\s+([^A-D]*?)(?=\s+[A-D]\.|Correct Answer:|$)/g;
        let match;
        
        while ((match = optionRegex.exec(optionsText)) !== null) {
            const optionText = match[2].trim();
            if (optionText) {
                options.push(optionText);
            }
        }
    }
    
    // Extract correct answer
    const correctMatch = text.match(/Correct Answer:\s*([A-D])/);
    let correct = null;
    if (correctMatch) {
        correct = correctMatch[1].charCodeAt(0) - 65; // Convert A-D to 0-3
    }
    
    // Only return if we have at least 2 options and a correct answer
    if (options.length >= 2 && correct !== null) {
        return {
            question: question,
            options: options,
            correct: correct,
            explanation: null
        };
    }
    
    return null;
}

function organizeQuestionsByCategory(questions) {
    const organized = {};
    
    questions.forEach(q => {
        const category = q.category;
        const testName = q.test;
        
        if (!organized[category]) {
            organized[category] = {
                name: testName,
                icon: getCategoryIcon(category),
                tests: [{
                    name: `${testName} - Complete Set`,
                    timeLimit: 120, // 2 hours
                    questions: []
                }]
            };
        }
        
        organized[category].tests[0].questions.push(q.question);
    });
    
    return organized;
}

function getCategoryIcon(category) {
    const icons = {
        'aircraft-general': 'fas fa-plane',
        'air-law': 'fas fa-gavel',
        'aon-aviation': 'fas fa-graduation-cap',
        'flight-planning': 'fas fa-route',
        'operational-procedures': 'fas fa-cogs',
        'radio-navigation': 'fas fa-broadcast-tower'
    };
    return icons[category] || 'fas fa-question';
}

function generateJavaScriptFile(organizedQuestions, outputPath) {
    const jsContent = `// Aviation Test Data - Extracted from 617.htm
// Generated automatically by extract_questions_node.js

const testData = ${JSON.stringify(organizedQuestions, null, 2)};

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = testData;
}`;
    
    fs.writeFileSync(outputPath, jsContent, 'utf8');
}

// Main extraction process
function main() {
    const inputFile = 'C:\\Users\\ahmed\\Desktop\\617.htm';
    const outputFile = 'C:\\Users\\ahmed\\Desktop\\aviation-test-app\\src\\data\\testData.js';
    
    console.log('Reading 617.htm file...');
    
    try {
        // Try multiple encodings
        let htmlContent;
        try {
            htmlContent = fs.readFileSync(inputFile, 'utf8');
        } catch (err) {
            htmlContent = fs.readFileSync(inputFile, 'latin1');
        }
        
        console.log('Extracting questions...');
        const questions = extractQuestionsFromHTML(htmlContent);
        console.log(`Found ${questions.length} questions`);
        
        console.log('Organizing questions by category...');
        const organized = organizeQuestionsByCategory(questions);
        
        // Print summary
        Object.keys(organized).forEach(category => {
            const data = organized[category];
            const questionCount = data.tests[0].questions.length;
            console.log(`  ${data.name}: ${questionCount} questions`);
        });
        
        console.log(`Generating JavaScript file: ${outputFile}`);
        generateJavaScriptFile(organized, outputFile);
        
        console.log('✅ Extraction complete!');
        const totalQuestions = Object.values(organized).reduce((sum, data) => {
            return sum + data.tests[0].questions.length;
        }, 0);
        console.log(`Total questions extracted: ${totalQuestions}`);
        console.log('Your aviation test app now has the complete question bank!');
        
    } catch (error) {
        console.error('Error during extraction:', error.message);
        console.log('Please make sure the 617.htm file exists and is readable.');
    }
}

// Run the extraction
main();