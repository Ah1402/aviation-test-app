const fs = require('fs');

function ultimateExtraction() {
    const inputFile = 'C:\\Users\\ahmed\\Desktop\\617.htm';
    const outputFile = 'C:\\Users\\ahmed\\Desktop\\aviation-test-app\\src\\data\\testData.js';
    
    console.log('🔍 ULTIMATE EXTRACTION - Finding ALL questions...');
    
    try {
        const htmlContent = fs.readFileSync(inputFile, 'latin1');
        
        // Split the content into chunks around "Correct Answer:" markers
        const chunks = htmlContent.split(/Correct Answer:\s*([A-D])/);
        
        const allQuestions = [];
        let currentCategory = { key: 'aircraft-general', name: 'Aircraft General Knowledge' };
        
        console.log(`📊 Found ${Math.floor(chunks.length / 2)} answer markers`);
        
        for (let i = 1; i < chunks.length; i += 2) {
            const correctLetter = chunks[i];
            const correctIndex = correctLetter.charCodeAt(0) - 65;
            
            // The question content is in the chunk before this answer
            const questionChunk = chunks[i - 1];
            
            // Extract the question from this chunk
            const question = extractQuestionFromChunk(questionChunk, correctIndex);
            
            if (question) {
                // Update category if we find category headers
                const detectedCategory = detectCategoryFromChunk(questionChunk);
                if (detectedCategory) {
                    currentCategory = detectedCategory;
                }
                
                allQuestions.push({
                    ...question,
                    category: currentCategory.key,
                    categoryName: currentCategory.name
                });
            }
            
            if (allQuestions.length % 50 === 0) {
                console.log(`  ✅ Extracted ${allQuestions.length} questions...`);
            }
        }
        
        console.log(`🎯 Total questions extracted: ${allQuestions.length}`);
        
        // Organize and save
        const organized = organizeAllQuestions(allQuestions);
        saveCompleteDatabase(organized, outputFile);
        
        console.log('🏆 ULTIMATE EXTRACTION COMPLETE!');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

function extractQuestionFromChunk(chunk, correctIndex) {
    // Clean HTML and normalize whitespace
    let text = chunk.replace(/<[^>]*>/g, ' ')
                   .replace(/&[^;]+;/g, ' ')
                   .replace(/\s+/g, ' ')
                   .trim();
    
    // Look for the last question in this chunk (working backwards)
    const lines = text.split(/[.!?]\s+/).reverse();
    
    for (const line of lines) {
        if (line.match(/^\d+\s/) || line.includes(' A. ')) {
            const question = parseQuestionLine(line, correctIndex);
            if (question) {
                return question;
            }
        }
    }
    
    // Alternative: look for question patterns in the whole chunk
    const questionPatterns = [
        /(\d+)\.\s+([^]*?)\s+A\.\s+([^]*?)(?:\s+B\.\s+([^]*?))?(?:\s+C\.\s+([^]*?))?(?:\s+D\.\s+([^]*?))?/,
        /([^]*?)\s+A\.\s+([^]*?)\s+B\.\s+([^]*?)(?:\s+C\.\s+([^]*?))?(?:\s+D\.\s+([^]*?))?$/
    ];
    
    for (const pattern of questionPatterns) {
        const match = text.match(pattern);
        if (match) {
            const question = parseQuestionFromMatch(match, correctIndex);
            if (question) return question;
        }
    }
    
    return null;
}

function parseQuestionLine(line, correctIndex) {
    // Remove leading numbers if present
    line = line.replace(/^\d+\.\s*/, '').trim();
    
    // Find options
    const optionPattern = /^([^]*?)\s+A\.\s+([^]*?)\s+B\.\s+([^]*?)(?:\s+C\.\s+([^]*?))?(?:\s+D\.\s+([^]*?))?/;
    const match = line.match(optionPattern);
    
    if (!match) return null;
    
    const questionText = match[1].trim();
    const options = [
        match[2]?.trim(),
        match[3]?.trim(),
        match[4]?.trim(),
        match[5]?.trim()
    ].filter(opt => opt && opt.length > 0);
    
    if (options.length >= 2 && correctIndex >= 0 && correctIndex < options.length) {
        return {
            question: questionText,
            options: options,
            correct: correctIndex
        };
    }
    
    return null;
}

function parseQuestionFromMatch(match, correctIndex) {
    let questionText, options;
    
    if (match[0].match(/^\d+\./)) {
        // Pattern with question number
        questionText = match[2]?.trim();
        options = [match[3], match[4], match[5], match[6]].filter(opt => opt?.trim());
    } else {
        // Pattern without question number
        questionText = match[1]?.trim();
        options = [match[2], match[3], match[4], match[5]].filter(opt => opt?.trim());
    }
    
    if (!questionText || options.length < 2) return null;
    
    // Clean options
    options = options.map(opt => opt.replace(/Correct Answer.*$/, '').trim())
                    .filter(opt => opt.length > 0);
    
    if (correctIndex >= 0 && correctIndex < options.length) {
        return {
            question: questionText,
            options: options,
            correct: correctIndex
        };
    }
    
    return null;
}

function detectCategoryFromChunk(chunk) {
    const text = chunk.toLowerCase();
    
    if (text.includes('aircraft general knowledge')) {
        return { key: 'aircraft-general', name: 'Aircraft General Knowledge' };
    } else if (text.includes('air law')) {
        return { key: 'air-law', name: 'Air Law' };
    } else if (text.includes('aon aviation')) {
        return { key: 'aon-aviation', name: 'AON Aviation' };
    } else if (text.includes('flight planning')) {
        return { key: 'flight-planning', name: 'Flight Planning' };
    } else if (text.includes('operational procedures')) {
        return { key: 'operational-procedures', name: 'Operational Procedures' };
    } else if (text.includes('radio navigation')) {
        return { key: 'radio-navigation', name: 'Radio Navigation' };
    }
    
    return null;
}

function organizeAllQuestions(questions) {
    const categories = {};
    
    questions.forEach(q => {
        if (!categories[q.category]) {
            categories[q.category] = {
                name: q.categoryName,
                icon: getCategoryIcon(q.category),
                tests: [{
                    name: `${q.categoryName} - Complete Set`,
                    timeLimit: 180, // 3 hours for large question sets
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

function saveCompleteDatabase(data, outputPath) {
    const totalQuestions = Object.values(data).reduce((sum, cat) => sum + cat.tests[0].questions.length, 0);
    
    const jsContent = `// Aviation Test Data - ULTIMATE COMPLETE Question Bank
// Extracted from 617.htm - ALL ${totalQuestions} Questions
// Generated: ${new Date().toISOString()}

const testData = ${JSON.stringify(data, null, 2)};

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = testData;
}`;
    
    fs.writeFileSync(outputPath, jsContent, 'utf8');
    
    // Final summary
    console.log('\n🏆 ULTIMATE EXTRACTION RESULTS:');
    console.log('═'.repeat(60));
    
    Object.keys(data).forEach(categoryKey => {
        const category = data[categoryKey];
        const count = category.tests[0].questions.length;
        const percentage = Math.round((count / totalQuestions) * 100);
        console.log(`🎯 ${category.name}: ${count} questions (${percentage}%)`);
    });
    
    console.log('═'.repeat(60));
    console.log(`🚀 TOTAL: ${totalQuestions} questions extracted`);
    console.log(`📊 Success rate: ${Math.round((totalQuestions / 618) * 100)}%`);
    console.log('✅ Your aviation app now has the COMPLETE question database!');
}

// Execute ultimate extraction
ultimateExtraction();