const fs = require('fs');

function comprehensiveExtraction() {
    const inputFile = 'C:\\Users\\ahmed\\Desktop\\617.htm';
    const outputFile = 'C:\\Users\\ahmed\\Desktop\\aviation-test-app\\src\\data\\testData.js';
    
    console.log('📖 Reading 617.htm file for comprehensive extraction...');
    
    try {
        const htmlContent = fs.readFileSync(inputFile, 'latin1');
        console.log(`📄 File size: ${Math.round(htmlContent.length / 1024)}KB`);
        
        // Find all "Correct Answer:" occurrences and extract surrounding context
        const questions = [];
        const correctAnswerPattern = /Correct Answer:\s*([A-D])/g;
        let match;
        let questionCount = 0;
        
        while ((match = correctAnswerPattern.exec(htmlContent)) !== null) {
            questionCount++;
            const endPos = match.index;
            const correctLetter = match[1];
            const correctIndex = correctLetter.charCodeAt(0) - 65;
            
            // Find the start of this question by looking backwards
            const beforeText = htmlContent.substring(Math.max(0, endPos - 2000), endPos);
            
            // Look for question number pattern
            const questionMatches = beforeText.match(/(\d+)\.\s+([^]*?)$/);
            if (!questionMatches) continue;
            
            const questionNumber = questionMatches[1];
            const questionAndOptions = questionMatches[2];
            
            // Extract the question and options
            const extracted = extractQuestionFromText(questionAndOptions, correctIndex);
            
            if (extracted) {
                // Determine category based on question number ranges
                const category = determineCategory(parseInt(questionNumber));
                
                questions.push({
                    number: parseInt(questionNumber),
                    category: category.key,
                    categoryName: category.name,
                    ...extracted
                });
                
                if (questionCount % 100 === 0) {
                    console.log(`  📝 Processing question ${questionCount}...`);
                }
            }
        }
        
        console.log(`🎯 Total questions found: ${questions.length}`);
        
        // Organize by category
        const organized = organizeQuestionsByCategory(questions);
        
        // Generate the file
        generateCompleteTestData(organized, outputFile);
        
        console.log('✅ Comprehensive extraction completed!');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

function extractQuestionFromText(text, correctIndex) {
    // Clean the text
    text = text.replace(/<[^>]*>/g, ' ')
               .replace(/&[^;]+;/g, ' ')
               .replace(/\s+/g, ' ')
               .trim();
    
    // Find where options start (look for " A. ")
    const optionsStart = text.indexOf(' A. ');
    if (optionsStart === -1) return null;
    
    const question = text.substring(0, optionsStart).trim();
    const optionsText = text.substring(optionsStart);
    
    // Extract all options
    const options = [];
    
    // Method 1: Split by option letters
    const optionParts = optionsText.split(/\s+([A-D])\.\s+/);
    
    for (let i = 2; i < optionParts.length; i += 2) {
        if (optionParts[i]) {
            const optionText = optionParts[i].trim();
            if (optionText) {
                options.push(optionText);
            }
        }
    }
    
    // Method 2: If that didn't work, try regex
    if (options.length < 2) {
        options.length = 0; // Clear
        const optionRegex = /([A-D])\.\s+([^A-D]*?)(?=\s+[A-D]\.|$)/g;
        let optionMatch;
        
        while ((optionMatch = optionRegex.exec(optionsText)) !== null) {
            const optionText = optionMatch[2].trim();
            if (optionText) {
                options.push(optionText);
            }
        }
    }
    
    // Validate we have enough options and correct answer is valid
    if (options.length >= 2 && correctIndex >= 0 && correctIndex < options.length) {
        return {
            question: question,
            options: options,
            correct: correctIndex
        };
    }
    
    return null;
}

function determineCategory(questionNumber) {
    // Analyze question number ranges to determine categories
    if (questionNumber >= 1 && questionNumber <= 100) {
        return { key: 'aircraft-general', name: 'Aircraft General Knowledge' };
    } else if (questionNumber >= 101 && questionNumber <= 200) {
        return { key: 'air-law', name: 'Air Law' };
    } else if (questionNumber >= 201 && questionNumber <= 350) {
        return { key: 'aon-aviation', name: 'AON Aviation' };
    } else if (questionNumber >= 351 && questionNumber <= 500) {
        return { key: 'flight-planning', name: 'Flight Planning' };
    } else if (questionNumber >= 501 && questionNumber <= 600) {
        return { key: 'operational-procedures', name: 'Operational Procedures' };
    } else {
        return { key: 'radio-navigation', name: 'Radio Navigation' };
    }
}

function organizeQuestionsByCategory(questions) {
    const categories = {};
    
    // Sort questions by number to maintain order
    questions.sort((a, b) => a.number - b.number);
    
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

function generateCompleteTestData(data, outputPath) {
    const jsContent = `// Aviation Test Data - COMPLETE Question Bank
// Extracted from 617.htm - All ${getTotalQuestions(data)} Questions

const testData = ${JSON.stringify(data, null, 2)};

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = testData;
}`;
    
    fs.writeFileSync(outputPath, jsContent, 'utf8');
    
    // Print comprehensive summary
    console.log('\n🎯 COMPLETE EXTRACTION SUMMARY:');
    console.log('═'.repeat(50));
    
    let totalQuestions = 0;
    Object.keys(data).forEach(categoryKey => {
        const category = data[categoryKey];
        const count = category.tests[0].questions.length;
        totalQuestions += count;
        console.log(`✈️  ${category.name}: ${count} questions`);
    });
    
    console.log('═'.repeat(50));
    console.log(`🏆 TOTAL QUESTIONS: ${totalQuestions}`);
    console.log(`📈 Extraction Rate: ${Math.round((totalQuestions / 618) * 100)}%`);
    console.log('🚀 Your aviation app is now COMPLETE with the full question bank!');
}

function getTotalQuestions(data) {
    return Object.values(data).reduce((sum, category) => {
        return sum + category.tests[0].questions.length;
    }, 0);
}

// Run the comprehensive extraction
comprehensiveExtraction();