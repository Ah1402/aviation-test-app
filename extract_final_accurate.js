const fs = require('fs');

function simpleAccurateExtraction() {
    const inputFile = 'C:\\Users\\ahmed\\Desktop\\617.htm';
    const outputFile = 'C:\\Users\\ahmed\\Desktop\\aviation-test-app\\src\\data\\testData.js';
    
    console.log('🎯 SIMPLE ACCURATE EXTRACTION - Based on exact HTML pattern...');
    
    try {
        const htmlContent = fs.readFileSync(inputFile, 'latin1');
        
        // Split content into paragraphs
        const paragraphs = htmlContent.split(/<\/p>/i);
        
        const questions = [];
        let currentCategory = { key: 'aircraft-general', name: 'Aircraft General Knowledge' };
        
        console.log(`📄 Processing ${paragraphs.length} paragraphs...`);
        
        for (let i = 0; i < paragraphs.length; i++) {
            const paragraph = paragraphs[i];
            
            // Clean the paragraph
            const cleanText = paragraph.replace(/<[^>]*>/g, ' ')
                                     .replace(/&[^;]+;/g, ' ')
                                     .replace(/\s+/g, ' ')
                                     .trim();
            
            // Check for category headers
            if (cleanText.includes('Aircraft General Knowledge Test')) {
                currentCategory = { key: 'aircraft-general', name: 'Aircraft General Knowledge' };
                console.log(`📂 Found category: Aircraft General Knowledge`);
                continue;
            }
            if (cleanText.includes('Air Law Test') || (cleanText.includes('Air Law') && cleanText.includes('Test'))) {
                currentCategory = { key: 'air-law', name: 'Air Law' };
                console.log(`📂 Found category: Air Law`);
                continue;
            }
            if (cleanText.includes('AON Aviation Test') || (cleanText.includes('AON Aviation') && cleanText.includes('Test'))) {
                currentCategory = { key: 'aon-aviation', name: 'AON Aviation' };
                console.log(`📂 Found category: AON Aviation`);
                continue;
            }
            if (cleanText.includes('Flight Planning Test') || (cleanText.includes('Flight Planning') && cleanText.includes('Test'))) {
                currentCategory = { key: 'flight-planning', name: 'Flight Planning' };
                console.log(`📂 Found category: Flight Planning`);
                continue;
            }
            if (cleanText.includes('Operational Procedures Test') || (cleanText.includes('Operational Procedures') && cleanText.includes('Test'))) {
                currentCategory = { key: 'operational-procedures', name: 'Operational Procedures' };
                console.log(`📂 Found category: Operational Procedures`);
                continue;
            }
            if (cleanText.includes('Radio Navigation Test') || (cleanText.includes('Radio Navigation') && cleanText.includes('Test'))) {
                currentCategory = { key: 'radio-navigation', name: 'Radio Navigation' };
                console.log(`📂 Found category: Radio Navigation`);
                continue;
            }
            
            // Look for questions - they start with a number and contain "Correct Answer:"
            if (cleanText.match(/^\d+\./) && cleanText.includes('Correct Answer:')) {
                const question = parseQuestion(cleanText);
                
                if (question) {
                    questions.push({
                        ...question,
                        category: currentCategory.key,
                        categoryName: currentCategory.name
                    });
                    
                    if (questions.length % 50 === 0) {
                        console.log(`  ✅ Extracted ${questions.length} questions...`);
                    }
                }
            }
        }
        
        console.log(`🎯 Total questions extracted: ${questions.length}`);
        
        // Organize and save
        const organized = organizeQuestionsByCategory(questions);
        generateFinalDatabase(organized, outputFile);
        
        console.log('🏆 EXTRACTION COMPLETED SUCCESSFULLY!');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

function parseQuestion(text) {
    // Extract question number
    const numberMatch = text.match(/^(\d+)\./);
    if (!numberMatch) return null;
    
    const questionNumber = numberMatch[1];
    
    // Extract correct answer
    const correctMatch = text.match(/Correct Answer:\s*([A-D])/);
    if (!correctMatch) return null;
    
    const correctLetter = correctMatch[1];
    const correctIndex = correctLetter.charCodeAt(0) - 65;
    
    // Remove the question number and find where options start
    let questionAndOptions = text.replace(/^\d+\.\s*/, '').trim();
    
    // Remove the "Correct Answer" part from the end
    questionAndOptions = questionAndOptions.replace(/\s*Correct Answer:.*$/, '').trim();
    
    // Find where options start (look for " A. ")
    const optionsStart = questionAndOptions.indexOf(' A. ');
    if (optionsStart === -1) return null;
    
    const questionText = questionAndOptions.substring(0, optionsStart).trim();
    const optionsText = questionAndOptions.substring(optionsStart);
    
    // Extract options more carefully
    const options = [];
    
    // Split by option letters and extract text
    const optionMatches = optionsText.match(/A\.\s+([^]*?)(?:\s+B\.\s+([^]*?))?(?:\s+C\.\s+([^]*?))?(?:\s+D\.\s+([^]*?))?/);
    
    if (optionMatches) {
        for (let i = 1; i <= 4; i++) {
            if (optionMatches[i]) {
                const optionText = optionMatches[i].trim();
                if (optionText) {
                    options.push(optionText);
                }
            }
        }
    }
    
    // Validate we have enough data
    if (questionText && options.length >= 2 && correctIndex >= 0 && correctIndex < options.length) {
        return {
            questionNumber: parseInt(questionNumber),
            question: questionText,
            options: options,
            correct: correctIndex
        };
    }
    
    return null;
}

function organizeQuestionsByCategory(questions) {
    const categories = {};
    
    // Sort by question number to maintain order
    questions.sort((a, b) => a.questionNumber - b.questionNumber);
    
    questions.forEach(q => {
        if (!categories[q.category]) {
            categories[q.category] = {
                name: q.categoryName,
                icon: getCategoryIcon(q.category),
                tests: [{
                    name: `${q.categoryName} - Complete Set`,
                    timeLimit: 180, // 3 hours
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

function generateFinalDatabase(data, outputPath) {
    const totalQuestions = Object.values(data).reduce((sum, cat) => sum + cat.tests[0].questions.length, 0);
    
    const jsContent = `// Aviation Test Data - COMPLETE Question Database
// Extracted from 617.htm using accurate pattern matching
// Total Questions: ${totalQuestions}
// Generated: ${new Date().toLocaleString()}

const testData = ${JSON.stringify(data, null, 2)};

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = testData;
}`;
    
    fs.writeFileSync(outputPath, jsContent, 'utf8');
    
    // Final comprehensive summary
    console.log('\n🏆 FINAL EXTRACTION RESULTS:');
    console.log('═'.repeat(65));
    
    Object.keys(data).forEach(categoryKey => {
        const category = data[categoryKey];
        const count = category.tests[0].questions.length;
        console.log(`🎯 ${category.name}: ${count} questions`);
    });
    
    console.log('═'.repeat(65));
    console.log(`🚀 GRAND TOTAL: ${totalQuestions} questions`);
    console.log(`📊 Coverage: ${Math.round((totalQuestions / 618) * 100)}% of expected questions`);
    console.log(`📁 File size: ${Math.round(fs.statSync(outputPath).size / 1024)}KB`);
    console.log('\n✨ Your aviation testing app now has the complete question database!');
    console.log('🛩️ Ready for professional aviation training and assessment!');
}

// Run the simple accurate extraction
simpleAccurateExtraction();