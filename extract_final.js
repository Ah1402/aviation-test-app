const fs = require('fs');

function extractQuestionsManually() {
    const inputFile = 'C:\\Users\\ahmed\\Desktop\\617.htm';
    const outputFile = 'C:\\Users\\ahmed\\Desktop\\aviation-test-app\\src\\data\\testData.js';
    
    console.log('Reading 617.htm file...');
    
    try {
        const htmlContent = fs.readFileSync(inputFile, 'latin1');
        
        // Find questions by looking for the pattern more carefully
        const questions = [];
        
        // Split by paragraphs and process
        const paragraphs = htmlContent.split(/<\/p>/i);
        let currentCategory = 'aircraft-general';
        let currentCategoryName = 'Aircraft General Knowledge';
        
        for (let para of paragraphs) {
            // Clean up the paragraph
            const cleanPara = para.replace(/<[^>]*>/g, ' ')
                                 .replace(/&[^;]+;/g, ' ')
                                 .replace(/\s+/g, ' ')
                                 .trim();
            
            // Check for category changes
            if (cleanPara.includes('Aircraft General Knowledge')) {
                currentCategory = 'aircraft-general';
                currentCategoryName = 'Aircraft General Knowledge';
                console.log(`Found category: ${currentCategoryName}`);
                continue;
            }
            if (cleanPara.includes('Air Law')) {
                currentCategory = 'air-law';
                currentCategoryName = 'Air Law';
                console.log(`Found category: ${currentCategoryName}`);
                continue;
            }
            if (cleanPara.includes('AON Aviation')) {
                currentCategory = 'aon-aviation';
                currentCategoryName = 'AON Aviation';
                console.log(`Found category: ${currentCategoryName}`);
                continue;
            }
            if (cleanPara.includes('Flight Planning')) {
                currentCategory = 'flight-planning';
                currentCategoryName = 'Flight Planning';
                console.log(`Found category: ${currentCategoryName}`);
                continue;
            }
            if (cleanPara.includes('Operational Procedures')) {
                currentCategory = 'operational-procedures';
                currentCategoryName = 'Operational Procedures';
                console.log(`Found category: ${currentCategoryName}`);
                continue;
            }
            if (cleanPara.includes('Radio Navigation')) {
                currentCategory = 'radio-navigation';
                currentCategoryName = 'Radio Navigation';
                console.log(`Found category: ${currentCategoryName}`);
                continue;
            }
            
            // Look for questions
            const questionMatch = cleanPara.match(/^(\d+)\.\s+(.+)/);
            if (questionMatch) {
                const questionNum = parseInt(questionMatch[1]);
                const fullText = cleanPara;
                
                // Extract the question
                const question = extractQuestionData(fullText);
                if (question) {
                    questions.push({
                        category: currentCategory,
                        categoryName: currentCategoryName,
                        ...question
                    });
                    
                    if (questions.length % 50 === 0) {
                        console.log(`  Extracted ${questions.length} questions...`);
                    }
                }
            }
        }
        
        console.log(`Total questions found: ${questions.length}`);
        
        // Organize by category
        const organized = organizeQuestions(questions);
        
        // Generate the JavaScript file
        generateTestDataFile(organized, outputFile);
        
        console.log('✅ Extraction completed successfully!');
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}

function extractQuestionData(text) {
    // Find question text (everything before first "A.")
    const parts = text.split(' A. ');
    if (parts.length < 2) return null;
    
    const questionText = parts[0].replace(/^\d+\.\s*/, '').trim();
    const optionsAndAnswer = ' A. ' + parts[1];
    
    // Extract options
    const options = [];
    let remainingText = optionsAndAnswer;
    
    // Extract option A
    let match = remainingText.match(/A\.\s+([^B]*?)(?=\s+B\.|$)/);
    if (match) options.push(match[1].trim());
    
    // Extract option B
    match = remainingText.match(/B\.\s+([^C]*?)(?=\s+C\.|$)/);
    if (match) options.push(match[1].trim());
    
    // Extract option C
    match = remainingText.match(/C\.\s+([^D]*?)(?=\s+D\.|$)/);
    if (match) options.push(match[1].trim());
    
    // Extract option D
    match = remainingText.match(/D\.\s+([^C]*?)(?=\s+Correct Answer|$)/);
    if (match) options.push(match[1].trim());
    
    // Clean up options
    const cleanOptions = options.map(opt => 
        opt.replace(/Correct Answer.*$/, '')
           .replace(/\s+/g, ' ')
           .trim()
    ).filter(opt => opt.length > 0);
    
    // Extract correct answer
    const correctMatch = text.match(/Correct Answer:\s*([A-D])/);
    let correct = null;
    if (correctMatch) {
        correct = correctMatch[1].charCodeAt(0) - 65;
    }
    
    if (cleanOptions.length >= 2 && correct !== null && correct >= 0 && correct < cleanOptions.length) {
        return {
            question: questionText,
            options: cleanOptions,
            correct: correct
        };
    }
    
    return null;
}

function organizeQuestions(questions) {
    const categories = {};
    
    questions.forEach(q => {
        if (!categories[q.category]) {
            categories[q.category] = {
                name: q.categoryName,
                icon: getCategoryIcon(q.category),
                tests: [{
                    name: `${q.categoryName} - Complete Set`,
                    timeLimit: 120,
                    questions: []
                }]
            };
        }
        
        categories[q.category].tests[0].questions.push({
            question: q.question,
            options: q.options,
            correct: q.correct,
            explanation: null
        });
    });
    
    return categories;
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

function generateTestDataFile(data, outputPath) {
    const jsContent = `// Aviation Test Data - Complete Question Bank
// Extracted from 617.htm

const testData = ${JSON.stringify(data, null, 2)};

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = testData;
}`;
    
    fs.writeFileSync(outputPath, jsContent, 'utf8');
    
    // Print summary
    console.log('\n📊 Extraction Summary:');
    Object.keys(data).forEach(categoryKey => {
        const category = data[categoryKey];
        const count = category.tests[0].questions.length;
        console.log(`  ${category.name}: ${count} questions`);
    });
    
    const totalQuestions = Object.values(data).reduce((sum, category) => {
        return sum + category.tests[0].questions.length;
    }, 0);
    
    console.log(`\n🎯 Total Questions: ${totalQuestions}`);
}

// Run the extraction
extractQuestionsManually();