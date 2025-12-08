// Data Extraction Script
// This script can help extract questions from the original HTML file

class DataExtractor {
    constructor() {
        this.extractedData = {};
    }

    // Extract questions from HTML content
    extractQuestionsFromHTML(htmlContent) {
        // Create a temporary DOM element to parse HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;

        const questions = [];
        const paragraphs = tempDiv.querySelectorAll('p.MsoNormal');
        
        let currentQuestion = null;
        let questionNumber = 1;

        paragraphs.forEach(p => {
            const text = p.textContent.trim();
            
            // Check if this is the start of a question (starts with number and period)
            const questionMatch = text.match(/^(\d+)\.\s*(.+)/);
            
            if (questionMatch) {
                // Save previous question if exists
                if (currentQuestion) {
                    questions.push(currentQuestion);
                }
                
                // Start new question
                currentQuestion = {
                    id: questionNumber++,
                    text: this.cleanQuestionText(questionMatch[2]),
                    options: [],
                    correct: null,
                    explanation: ''
                };
            } else if (currentQuestion && text.startsWith('Correct Answer:')) {
                // Extract correct answer
                const answerMatch = text.match(/Correct Answer:\s*([A-D])/);
                if (answerMatch) {
                    const letter = answerMatch[1];
                    currentQuestion.correct = letter.charCodeAt(0) - 65; // Convert A-D to 0-3
                }
            } else if (currentQuestion && this.isOptionText(text)) {
                // Extract options (A, B, C, D)
                const cleanOption = this.cleanOptionText(text);
                if (cleanOption) {
                    currentQuestion.options.push(cleanOption);
                }
            }
        });

        // Don't forget the last question
        if (currentQuestion) {
            questions.push(currentQuestion);
        }

        return questions;
    }

    cleanQuestionText(text) {
        return text
            .replace(/\s+/g, ' ')
            .replace(/[""]/g, '"')
            .replace(/['']/g, "'")
            .trim();
    }

    isOptionText(text) {
        // Check if text starts with A., B., C., or D.
        return /^[A-D]\.\s/.test(text);
    }

    cleanOptionText(text) {
        // Remove the letter prefix (A., B., C., D.)
        return text
            .replace(/^[A-D]\.\s*/, '')
            .replace(/\s+/g, ' ')
            .trim();
    }

    // Convert extracted questions to the app's data format
    formatForApp(questions, testName, timeLimit = 30) {
        return {
            id: this.generateTestId(testName),
            name: testName,
            timeLimit: timeLimit,
            questions: questions.map(q => ({
                id: q.id,
                text: q.text,
                options: q.options,
                correct: q.correct,
                explanation: q.explanation || 'No explanation provided.'
            }))
        };
    }

    generateTestId(testName) {
        return testName
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '-');
    }

    // Export data as JSON
    exportAsJSON(data) {
        return JSON.stringify(data, null, 2);
    }

    // Instructions for manual extraction
    getExtractionInstructions() {
        return `
        To extract more questions from your original HTML file:
        
        1. Open your original 617.htm file
        2. Copy the HTML content for a specific test section
        3. Use the browser console:
           
           const extractor = new DataExtractor();
           const htmlContent = \`[paste your HTML content here]\`;
           const questions = extractor.extractQuestionsFromHTML(htmlContent);
           const testData = extractor.formatForApp(questions, "Test Name", 30);
           console.log(extractor.exportAsJSON(testData));
        
        4. Copy the JSON output and add it to your testData.js file
        
        Manual cleanup may be needed for:
        - Complex mathematical expressions
        - Special formatting
        - Multi-line questions
        - Questions with images or diagrams
        `;
    }
}

// Sample usage function
function extractSampleData() {
    console.log('Data Extractor loaded. Use the following format to extract questions:');
    console.log('const extractor = new DataExtractor();');
    console.log('const questions = extractor.extractQuestionsFromHTML(htmlContent);');
    console.log('console.log(extractor.exportAsJSON(questions));');
}

// Auto-run if in browser console
if (typeof window !== 'undefined') {
    window.DataExtractor = DataExtractor;
    window.extractSampleData = extractSampleData;
}

// Example of how to manually add more questions to testData.js:
const additionalQuestions = {
    // Add more test categories here following the same structure
    // You can copy questions from your original HTML file and format them
};

// Merge function to add new data
function mergeTestData(newData) {
    Object.keys(newData).forEach(categoryKey => {
        if (testData[categoryKey]) {
            // Add tests to existing category
            testData[categoryKey].tests.push(...newData[categoryKey].tests);
        } else {
            // Add new category
            testData[categoryKey] = newData[categoryKey];
        }
    });
}