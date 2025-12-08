const fs = require('fs');

function robustExtraction() {
    const inputFile = 'C:\\Users\\ahmed\\Desktop\\617.htm';
    const outputFile = 'C:\\Users\\ahmed\\Desktop\\aviation-test-app\\src\\data\\testData.js';
    
    console.log('🔧 ROBUST EXTRACTION - Handling multi-line questions...');
    
    try {
        const htmlContent = fs.readFileSync(inputFile, 'latin1');
        
        // Remove all HTML tags and normalize spaces, but keep paragraph breaks
        const cleanContent = htmlContent
            .replace(/<\/p>/gi, '\n|||PARAGRAPH_BREAK|||\n')
            .replace(/<[^>]*>/g, ' ')
            .replace(/&[^;]+;/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
        
        // Split into paragraphs
        const paragraphs = cleanContent.split('\n|||PARAGRAPH_BREAK|||\n')
                                     .map(p => p.trim())
                                     .filter(p => p.length > 0);
        
        console.log(`📄 Processing ${paragraphs.length} clean paragraphs...`);
        
        const questions = [];
        let currentCategory = { key: 'aircraft-general', name: 'Aircraft General Knowledge' };
        
        for (const paragraph of paragraphs) {
            // Check for category headers
            const newCategory = detectCategory(paragraph);
            if (newCategory) {
                currentCategory = newCategory;
                console.log(`📂 Found category: ${newCategory.name}`);
                continue;
            }
            
            // Look for questions
            if (paragraph.match(/^\d+\./) && paragraph.includes('Correct Answer:')) {
                const question = parseQuestionParagraph(paragraph);
                
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
        
        if (questions.length > 0) {
            const organized = organizeQuestions(questions);
            saveDatabase(organized, outputFile);
            console.log('🏆 EXTRACTION COMPLETED SUCCESSFULLY!');
        } else {
            console.log('❌ No questions extracted. Debugging...');
            // Debug: show some sample paragraphs
            console.log('\n📝 Sample paragraphs:');
            paragraphs.slice(400, 410).forEach((p, i) => {
                console.log(`${i + 400}: ${p.substring(0, 100)}...`);
            });
        }
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

function detectCategory(text) {
    const lower = text.toLowerCase();
    
    if (lower.includes('aircraft general knowledge test')) {
        return { key: 'aircraft-general', name: 'Aircraft General Knowledge' };
    } else if (lower.includes('air law test')) {
        return { key: 'air-law', name: 'Air Law' };
    } else if (lower.includes('aon aviation test')) {
        return { key: 'aon-aviation', name: 'AON Aviation' };
    } else if (lower.includes('flight planning test')) {
        return { key: 'flight-planning', name: 'Flight Planning' };
    } else if (lower.includes('operational procedures test')) {
        return { key: 'operational-procedures', name: 'Operational Procedures' };
    } else if (lower.includes('radio navigation test')) {
        return { key: 'radio-navigation', name: 'Radio Navigation' };
    }
    
    return null;
}

function parseQuestionParagraph(paragraph) {
    try {
        // Extract question number
        const numberMatch = paragraph.match(/^(\d+)\.\s+/);
        if (!numberMatch) return null;
        
        const questionNumber = parseInt(numberMatch[1]);
        
        // Extract correct answer
        const correctMatch = paragraph.match(/Correct Answer:\s*([A-D])/);
        if (!correctMatch) return null;
        
        const correctLetter = correctMatch[1];
        const correctIndex = correctLetter.charCodeAt(0) - 65;
        
        // Remove question number and correct answer to get question+options
        let content = paragraph
            .replace(/^\d+\.\s+/, '')
            .replace(/\s*Correct Answer:.*$/, '')
            .trim();
        
        // Find where options start
        const optionsStart = content.indexOf(' A. ');
        if (optionsStart === -1) return null;
        
        const questionText = content.substring(0, optionsStart).trim();
        const optionsText = content.substring(optionsStart);
        
        // Extract options using a simple split approach
        const options = [];
        
        // Split by option patterns and extract
        const parts = optionsText.split(/\s+([A-D])\.\s+/);
        
        // parts[0] is empty, parts[1] is 'A', parts[2] is option A text, parts[3] is 'B', etc.
        for (let i = 2; i < parts.length; i += 2) {
            if (parts[i]) {
                const optionText = parts[i].trim();
                if (optionText) {
                    options.push(optionText);
                }
            }
        }
        
        // Validate
        if (questionText && options.length >= 2 && correctIndex >= 0 && correctIndex < options.length) {
            return {
                questionNumber: questionNumber,
                question: questionText,
                options: options,
                correct: correctIndex
            };
        }
        
        return null;
        
    } catch (error) {
        console.log(`Error parsing question: ${error.message}`);
        return null;
    }
}

function organizeQuestions(questions) {
    const categories = {};
    
    questions.sort((a, b) => a.questionNumber - b.questionNumber);
    
    questions.forEach(q => {
        if (!categories[q.category]) {
            categories[q.category] = {
                name: q.categoryName,
                icon: getCategoryIcon(q.category),
                tests: [{
                    name: `${q.categoryName} - Complete Set`,
                    timeLimit: 180,
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

function saveDatabase(data, outputPath) {
    const totalQuestions = Object.values(data).reduce((sum, cat) => sum + cat.tests[0].questions.length, 0);
    
    const jsContent = `// Aviation Test Data - COMPLETE Question Database
// Successfully extracted ${totalQuestions} questions from 617.htm
// Generated: ${new Date().toLocaleString()}

const testData = ${JSON.stringify(data, null, 2)};

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = testData;
}`;
    
    fs.writeFileSync(outputPath, jsContent, 'utf8');
    
    console.log('\n🏆 EXTRACTION SUMMARY:');
    console.log('═'.repeat(50));
    
    Object.keys(data).forEach(categoryKey => {
        const category = data[categoryKey];
        const count = category.tests[0].questions.length;
        console.log(`✈️ ${category.name}: ${count} questions`);
    });
    
    console.log('═'.repeat(50));
    console.log(`🚀 TOTAL: ${totalQuestions} questions extracted`);
    console.log(`📊 Success rate: ${Math.round((totalQuestions / 618) * 100)}%`);
    console.log(`📁 Database size: ${Math.round(fs.statSync(outputPath).size / 1024)}KB`);
    console.log('\n✅ Your aviation app now has a comprehensive question database!');
}

// Run the robust extraction
robustExtraction();