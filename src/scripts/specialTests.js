// Complete Test and Custom Test functionality
// This extends the main.js with handlers for the new test modes

(function() {
    // Wait for the main app to initialize
    const originalInit = AviationTestApp.prototype.init;
    
    AviationTestApp.prototype.init = function() {
        originalInit.call(this);
        this.bindSpecialTestEvents();
        this.updateCompleteTestCount();
    };
    
    // Bind events for Complete Test and Custom Test
    AviationTestApp.prototype.bindSpecialTestEvents = function() {
        // Complete Test
        document.querySelector('[data-category="complete-test"] .start-btn')?.addEventListener('click', () => {
            this.startCompleteTest();
        });
        
        // Custom Test
        document.querySelector('[data-category="custom-test"] .start-btn')?.addEventListener('click', () => {
            this.showCustomTestModal();
        });
        
        // Custom Test Modal handlers
        document.getElementById('custom-test-close')?.addEventListener('click', () => {
            this.closeModal();
        });
        
        document.getElementById('custom-test-cancel')?.addEventListener('click', () => {
            this.closeModal();
        });
        
        document.getElementById('custom-test-start')?.addEventListener('click', () => {
            this.startCustomTest();
        });
        
        // Auto-calculate time based on question count
        document.getElementById('custom-question-count')?.addEventListener('input', (e) => {
            const questionCount = parseInt(e.target.value) || 50;
            const recommendedTime = Math.ceil(questionCount * 1.2); // 1.2 min per question
            document.getElementById('custom-time-limit').value = recommendedTime;
        });
    };
    
    // Update Complete Test count dynamically
    AviationTestApp.prototype.updateCompleteTestCount = function() {
        let totalQuestions = 0;
        Object.keys(testData).forEach(categoryKey => {
            const category = testData[categoryKey];
            (category.tests || []).forEach(test => {
                totalQuestions += (test.questions || []).length;
            });
        });
        
        const countEl = document.getElementById('complete-test-count');
        if (countEl) {
            countEl.textContent = `${totalQuestions} Questions`;
        }
    };
    
    // Start Complete Test with ALL questions
    AviationTestApp.prototype.startCompleteTest = function() {
        const allQuestions = [];
        
        // Collect all questions from all categories
        Object.keys(testData).forEach(categoryKey => {
            const category = testData[categoryKey];
            (category.tests || []).forEach(test => {
                (test.questions || []).forEach((question, idx) => {
                    allQuestions.push({
                        ...question,
                        id: `${categoryKey}-${test.name}-${idx}`,
                        categoryName: category.name
                    });
                });
            });
        });
        
        // Shuffle questions for variety
        const shuffled = this.shuffleArray(allQuestions);
        
        // Create a mega test
        const completeTest = {
            id: 'complete-test',
            name: 'Complete Test - All Questions',
            timeLimit: Math.ceil(allQuestions.length * 1.2), // 1.2 min per question
            questions: shuffled.map(q => ({
                question: q.question,
                options: q.options,
                correct: q.correct,
                explanation: q.explanation,
                id: q.id
            }))
        };
        
        console.log(`Starting Complete Test with ${allQuestions.length} questions`);
        this.startTest('complete-test', completeTest);
    };
    
    // Show Custom Test configuration modal
    AviationTestApp.prototype.showCustomTestModal = function() {
        const categoriesList = document.getElementById('custom-categories-list');
        if (!categoriesList) return;
        
        // Populate categories checkboxes
        categoriesList.innerHTML = '';
        Object.keys(testData).forEach(categoryKey => {
            const category = testData[categoryKey];
            let questionCount = 0;
            (category.tests || []).forEach(test => {
                questionCount += (test.questions || []).length;
            });
            
            const checkbox = document.createElement('div');
            checkbox.style.cssText = 'padding: 10px; background: #f8fafc; border-radius: 6px; border: 2px solid transparent; cursor: pointer; transition: all 0.2s;';
            checkbox.innerHTML = `
                <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                    <input type="checkbox" 
                           class="custom-category-checkbox" 
                           value="${categoryKey}" 
                           checked
                           style="width: 18px; height: 18px; cursor: pointer;">
                    <span style="flex: 1;">
                        <strong>${category.name}</strong>
                        <small style="display: block; color: #64748b;">${questionCount} questions</small>
                    </span>
                </label>
            `;
            
            checkbox.addEventListener('click', (e) => {
                if (e.target.tagName !== 'INPUT') {
                    const input = checkbox.querySelector('input');
                    input.checked = !input.checked;
                }
                checkbox.style.borderColor = checkbox.querySelector('input').checked ? '#2563eb' : 'transparent';
                checkbox.style.background = checkbox.querySelector('input').checked ? '#eff6ff' : '#f8fafc';
            });
            
            checkbox.style.borderColor = '#2563eb';
            checkbox.style.background = '#eff6ff';
            categoriesList.appendChild(checkbox);
        });
        
        this.showModal('custom-test-modal');
    };
    
    // Start Custom Test with user configuration
    AviationTestApp.prototype.startCustomTest = function() {
        const questionCount = parseInt(document.getElementById('custom-question-count').value) || 50;
        const timeLimit = parseInt(document.getElementById('custom-time-limit').value) || 60;
        const selectedCategories = Array.from(document.querySelectorAll('.custom-category-checkbox:checked'))
            .map(cb => cb.value);
        
        if (selectedCategories.length === 0) {
            alert('Please select at least one category!');
            return;
        }
        
        // Collect questions from selected categories
        const allQuestions = [];
        selectedCategories.forEach(categoryKey => {
            const category = testData[categoryKey];
            (category.tests || []).forEach(test => {
                (test.questions || []).forEach((question, idx) => {
                    allQuestions.push({
                        ...question,
                        id: `${categoryKey}-${test.name}-${idx}`,
                        categoryName: category.name
                    });
                });
            });
        });
        
        if (allQuestions.length === 0) {
            alert('No questions available in selected categories!');
            return;
        }
        
        // Shuffle and limit to requested count
        const shuffled = this.shuffleArray(allQuestions);
        const limitedQuestions = shuffled.slice(0, Math.min(questionCount, allQuestions.length));
        
        // Create custom test
        const customTest = {
            id: 'custom-test',
            name: `Custom Test (${limitedQuestions.length} Questions)`,
            timeLimit: timeLimit,
            questions: limitedQuestions.map(q => ({
                question: q.question,
                options: q.options,
                correct: q.correct,
                explanation: q.explanation,
                id: q.id
            }))
        };
        
        console.log(`Starting Custom Test with ${limitedQuestions.length} questions from ${selectedCategories.length} categories`);
        this.closeModal();
        this.startTest('custom-test', customTest);
    };
    
    // Helper function to shuffle array (if not already present)
    if (!AviationTestApp.prototype.shuffleArray) {
        AviationTestApp.prototype.shuffleArray = function(array) {
            const shuffled = [...array];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        };
    }
    
    console.log('✅ Complete Test and Custom Test features loaded');
})();
