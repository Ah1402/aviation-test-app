// Main Application Controller
class AviationTestApp {
    constructor() {
        this.currentSection = 'home';
        this.currentTest = null;
        this.currentQuestionIndex = 0;
        this.userAnswers = {};
        this.testStartTime = null;
        this.timer = null;
        this.timeRemaining = 0;
        this.flaggedQuestions = new Set();
        this.searchTimeout = null;
        this.mainSearchTimeout = null;
        
        // Study session variables
        this.currentStudySession = null;
        this.studyQuestions = [];
        this.currentStudyIndex = 0;
        this.studyStartTime = null;
        this.studyProgress = {
            totalStudied: 0,
            studyStreak: 0,
            studyTime: 0
        };
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadUserProgress();
        this.showSection('home');

        // Populate dynamic UI pieces
        this.updateHomeStats();
        this.populateCategorySelectors();
        this.updateCategoryCards();
    }

    bindEvents() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                this.showSection(section);
            });
        });

        // Category selection
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.showTestSelection(category);
            });
        });

        // Test interface controls
        document.getElementById('prev-btn')?.addEventListener('click', () => this.previousQuestion());
        document.getElementById('next-btn')?.addEventListener('click', () => this.nextQuestion());
        document.getElementById('flag-btn')?.addEventListener('click', () => this.toggleFlag());
        document.getElementById('overview-btn')?.addEventListener('click', () => this.showOverview());
        document.getElementById('pause-btn')?.addEventListener('click', () => this.pauseTest());
        document.getElementById('quit-btn')?.addEventListener('click', () => this.quitTest());

        // Modal controls
        document.getElementById('modal-close')?.addEventListener('click', () => this.closeModal());
        document.getElementById('close-overview')?.addEventListener('click', () => this.closeModal());
        document.getElementById('back-to-tests')?.addEventListener('click', () => {
            this.closeModal();
            this.showSection('tests');
        });

        // Answer selection
        document.addEventListener('click', (e) => {
            if (e.target.closest('.option')) {
                this.selectOption(e.target.closest('.option'));
            }
        });

        // Search functionality with auto-search
        document.getElementById('searchBtn')?.addEventListener('click', () => this.performHeaderSearch());
        
        // Auto-search as user types in header search
        document.getElementById('searchInput')?.addEventListener('input', () => {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => {
                this.performHeaderSearch();
            }, 300); // 300ms delay for better performance
        });
        
        document.getElementById('mainSearchBtn')?.addEventListener('click', () => this.performMainSearch());
        
        // Auto-search as user types in main search
        document.getElementById('mainSearchInput')?.addEventListener('input', () => {
            clearTimeout(this.mainSearchTimeout);
            this.mainSearchTimeout = setTimeout(() => {
                this.performMainSearch();
            }, 300); // 300ms delay for better performance
        });
        
        document.getElementById('categoryFilter')?.addEventListener('change', () => this.performMainSearch());
        document.getElementById('clearSearchBtn')?.addEventListener('click', () => this.clearSearch());

        // Study session functionality
        document.getElementById('startStudyBtn')?.addEventListener('click', () => this.startStudySession());
        document.getElementById('studyPrevBtn')?.addEventListener('click', () => this.previousStudyQuestion());
        document.getElementById('studyNextBtn')?.addEventListener('click', () => this.nextStudyQuestion());
        document.getElementById('studyPauseBtn')?.addEventListener('click', () => this.pauseStudySession());
        document.getElementById('studyQuitBtn')?.addEventListener('click', () => this.quitStudySession());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (this.currentSection === 'test-interface') {
                this.handleKeyboardShortcuts(e);
            } else if (this.currentSection === 'study-interface') {
                this.handleStudyKeyboardShortcuts(e);
            }
        });
    }

    showSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Show selected section
        const targetSection = document.getElementById(sectionName);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`)?.classList.add('active');

        this.currentSection = sectionName;

        // Load section-specific data
        if (sectionName === 'results') {
            this.loadResults();
        } else if (sectionName === 'study') {
            this.loadStudyStats();
        } else if (sectionName === 'tests') {
            this.updateCategoryCards();
        }
    }

    // Ensure category cards reflect live data from testData (tests and question counts)
    updateCategoryCards() {
        try {
            const categoriesContainer = document.querySelector('.test-categories');
            if (!categoriesContainer || typeof testData !== 'object') return;

            Object.entries(testData).forEach(([categoryId, categoryData]) => {
                const card = document.querySelector(`[data-category="${categoryId}"]`);
                if (card) {
                    const testCount = (categoryData.tests || []).length;
                    const questionCount = (categoryData.tests || []).reduce((sum, t) => sum + ((t.questions || []).length), 0);
                    const testCountEl = card.querySelector('.test-count');
                    const questionCountEl = card.querySelector('.question-count');
                    if (testCountEl) testCountEl.textContent = `${testCount} ${testCount === 1 ? 'Test' : 'Tests'}`;
                    if (questionCountEl) questionCountEl.textContent = `${questionCount} ${questionCount === 1 ? 'Question' : 'Questions'}`;
                }
            });
        } catch (e) {
            console.warn('Failed to update category cards', e);
        }
    }

    showTestSelection(category) {
        const categoryData = testData[category];
        if (!categoryData) return;

        // For now, start the first test directly
        // In a full implementation, you'd show a test selection screen
        this.startTest(category, categoryData.tests[0]);
    }

    // Search functionality methods
    performHeaderSearch() {
        const searchInput = document.getElementById('searchInput');
        const query = searchInput.value.trim();
        
        if (query) {
            // Switch to search section and perform search
            this.showSection('search');
            document.getElementById('mainSearchInput').value = query;
            this.performMainSearch();
        }
    }

    performMainSearch() {
        const searchInput = document.getElementById('mainSearchInput');
        const categoryFilter = document.getElementById('categoryFilter');
        const resultsContainer = document.getElementById('searchResults');
        
        const query = searchInput.value.trim();
        const selectedCategory = categoryFilter.value;
        
        if (!query) {
            this.showSearchPlaceholder();
            return;
        }

        const results = this.searchQuestions(query, selectedCategory);
        this.displaySearchResults(results, query);
    }

    searchQuestions(query, categoryFilter = 'all') {
        const results = [];
        const queryLower = query.toLowerCase();
        
        // Search through all test data
        Object.keys(testData).forEach(categoryKey => {
            const category = testData[categoryKey];
            
            // Skip if category filter is applied and doesn't match
            if (categoryFilter !== 'all' && categoryKey !== categoryFilter) {
                return;
            }
            
            category.tests.forEach(test => {
                test.questions.forEach((question, questionIndex) => {
                    let matchFound = false;
                    let matchContext = '';
                    
                    // Search in question text
                    if (question.question.toLowerCase().includes(queryLower)) {
                        matchFound = true;
                        matchContext = 'question';
                    }
                    
                    // Search in answer options
                    if (!matchFound) {
                        question.options.forEach((option, optionIndex) => {
                            if (option.toLowerCase().includes(queryLower)) {
                                matchFound = true;
                                matchContext = `option-${optionIndex}`;
                            }
                        });
                    }
                    
                    // Search in explanation
                    if (!matchFound && question.explanation && question.explanation.toLowerCase().includes(queryLower)) {
                        matchFound = true;
                        matchContext = 'explanation';
                    }
                    
                    if (matchFound) {
                        results.push({
                            category: categoryKey,
                            categoryName: category.name,
                            test: test,
                            question: question,
                            questionIndex: questionIndex,
                            matchContext: matchContext
                        });
                    }
                });
            });
        });
        
        return results;
    }

    displaySearchResults(results, query) {
        const resultsContainer = document.getElementById('searchResults');
        
        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="search-no-results">
                    <i class="fas fa-search"></i>
                    <h3>No results found</h3>
                    <p>No questions found matching "${query}". Try different keywords or check your spelling.</p>
                </div>
            `;
            return;
        }
        
        // Create results HTML
        const statsHtml = `
            <div class="search-stats">
                Found ${results.length} question${results.length !== 1 ? 's' : ''} matching "${query}"
            </div>
        `;
        
        const resultsHtml = results.map((result, index) => {
            const highlightedQuestion = this.highlightText(result.question.question, query);
            const previewText = this.getResultPreview(result, query);
            const correctIndex = typeof result.question.correct === 'number' ? result.question.correct : 0;
            const correctLetter = (typeof window !== 'undefined' && window.safeLetter) ? window.safeLetter(correctIndex) : String.fromCharCode(65 + correctIndex);
            const correctText = result.question.options?.[correctIndex] || '';
            const explanation = result.question.explanation || '';
            
            return `
                <div class="search-result-item" data-result-index="${index}">
                    <div class="search-result-header">
                        <span class="search-result-category">
                            <i class="fas fa-tag"></i>
                            ${result.categoryName}
                        </span>
                    </div>
                    <div class="search-result-question">
                        ${highlightedQuestion}
                    </div>
                    <div class="search-result-preview">
                        ${previewText}
                    </div>
                    <div class="search-result-answer">
                        <div class="answer-title"><i class="fas fa-check-circle"></i> Correct Answer</div>
                        <div class="answer-option"><span class="option-letter">${correctLetter}</span> ${this.highlightText(correctText, query)}</div>
                        ${explanation ? `<div class="answer-explanation"><i class="fas fa-info-circle"></i> ${this.highlightText(explanation, query)}</div>` : ''}
                    </div>
                </div>
            `;
        }).join('');
        
        resultsContainer.innerHTML = `
            <div class="search-results-container">
                ${statsHtml}
                ${resultsHtml}
            </div>
        `;
        
        // Add click handlers to results
        document.querySelectorAll('.search-result-item').forEach((item, index) => {
            item.addEventListener('click', () => {
                this.startTestFromSearchResult(results[index]);
            });
        });
    }

    highlightText(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<span class="search-highlight">$1</span>');
    }

    getResultPreview(result, query) {
        const { question, matchContext } = result;
        
        if (matchContext === 'question') {
            return `Question matches your search term`;
        } else if (matchContext.startsWith('option-')) {
            const optionIndex = parseInt(matchContext.split('-')[1]);
            return `Answer option: "${this.highlightText(question.options[optionIndex], query)}"`;
        } else if (matchContext === 'explanation') {
            const explanation = question.explanation || '';
            const words = explanation.split(' ');
            const queryIndex = words.findIndex(word => word.toLowerCase().includes(query.toLowerCase()));
            const start = Math.max(0, queryIndex - 10);
            const end = Math.min(words.length, queryIndex + 10);
            const excerpt = words.slice(start, end).join(' ');
            return `Explanation: "${this.highlightText(excerpt, query)}..."`;
        }
        
        return 'Match found in question content';
    }

    startTestFromSearchResult(result) {
        // Start the test with the specific question
        this.startTest(result.category, result.test);
        this.currentQuestionIndex = result.questionIndex;
        this.displayQuestion();
    }

    updateHomeStats() {
        try {
            const categories = Object.keys(testData);
            const totalCategories = categories.length;
            let totalQuestions = 0;
            categories.forEach(cat => {
                testData[cat].tests.forEach(t => {
                    totalQuestions += (t.questions?.length || 0);
                });
            });

            const catEl = document.getElementById('stat-categories-count');
            const qEl = document.getElementById('stat-questions-count');
            const aboutCatEl = document.getElementById('about-category-count');
            const aboutQEl = document.getElementById('about-questions-count');

            if (catEl) catEl.textContent = String(totalCategories);
            if (qEl) qEl.textContent = String(totalQuestions);
            if (aboutCatEl) aboutCatEl.textContent = String(totalCategories);
            if (aboutQEl) aboutQEl.textContent = String(totalQuestions);
        } catch (e) {
            console.warn('Failed to update home stats', e);
        }
    }

    populateCategorySelectors() {
        const categories = Object.keys(testData);
        const categoryFilter = document.getElementById('categoryFilter');
        const studyCategory = document.getElementById('studyCategory');

        if (categoryFilter) {
            const current = categoryFilter.value;
            categoryFilter.innerHTML = '';
            const allOpt = document.createElement('option');
            allOpt.value = 'all';
            allOpt.textContent = 'All Categories';
            categoryFilter.appendChild(allOpt);
            categories.forEach(key => {
                const opt = document.createElement('option');
                opt.value = key;
                opt.textContent = testData[key]?.name || key;
                categoryFilter.appendChild(opt);
            });
            // Restore selection if possible
            if ([...categoryFilter.options].some(o => o.value === current)) {
                categoryFilter.value = current;
            }
        }

        if (studyCategory) {
            const current = studyCategory.value;
            studyCategory.innerHTML = '';
            const allOpt2 = document.createElement('option');
            allOpt2.value = 'all';
            allOpt2.textContent = 'All Categories';
            studyCategory.appendChild(allOpt2);
            categories.forEach(key => {
                const opt = document.createElement('option');
                opt.value = key;
                opt.textContent = testData[key]?.name || key;
                studyCategory.appendChild(opt);
            });
            if ([...studyCategory.options].some(o => o.value === current)) {
                studyCategory.value = current;
            }
        }
    }

    showSearchPlaceholder() {
        const resultsContainer = document.getElementById('searchResults');
        resultsContainer.innerHTML = `
            <div class="search-placeholder">
                <i class="fas fa-search"></i>
                <h3>Search the Question Bank</h3>
                <p>Enter keywords above to search through all aviation questions. You can search by question text, answer options, or explanations.</p>
            </div>
        `;
    }

    clearSearch() {
        document.getElementById('mainSearchInput').value = '';
        document.getElementById('searchInput').value = '';
        document.getElementById('categoryFilter').value = 'all';
        this.showSearchPlaceholder();
    }

    // Study Session Methods
    startStudySession() {
        const category = document.getElementById('studyCategory').value;
        const mode = document.getElementById('studyMode').value;
        const questionCount = document.getElementById('questionCount').value;
        
        // Collect questions based on selection
        this.studyQuestions = this.collectStudyQuestions(category, mode, questionCount);
        
        if (this.studyQuestions.length === 0) {
            alert('No questions available for the selected criteria.');
            return;
        }
        
        // Initialize study session
        this.currentStudySession = {
            category,
            mode,
            questionCount,
            startTime: new Date(),
            questionsAnswered: 0,
            correctAnswers: 0
        };
        
        this.currentStudyIndex = 0;
        this.studyStartTime = new Date();
        
        // Switch to study interface
        this.showSection('study-interface');
        this.displayStudyQuestion();
        this.updateStudyProgress();
    }
    
    collectStudyQuestions(category, mode, questionCount) {
        let questions = [];
        
        // Collect questions from selected categories
        if (category === 'all') {
            Object.keys(testData).forEach(categoryKey => {
                testData[categoryKey].tests.forEach(test => {
                    test.questions.forEach((question, index) => {
                        questions.push({
                            category: categoryKey,
                            categoryName: testData[categoryKey].name,
                            test: test,
                            question: question,
                            questionIndex: index
                        });
                    });
                });
            });
        } else {
            const categoryData = testData[category];
            if (categoryData) {
                categoryData.tests.forEach(test => {
                    test.questions.forEach((question, index) => {
                        questions.push({
                            category: category,
                            categoryName: categoryData.name,
                            test: test,
                            question: question,
                            questionIndex: index
                        });
                    });
                });
            }
        }
        
        // Filter based on mode
        if (mode === 'weak-areas') {
            // Filter to show questions that were answered incorrectly before
            const weakQuestions = this.getWeakAreaQuestions();
            questions = questions.filter(q => 
                weakQuestions.some(weak => 
                    weak.category === q.category && 
                    weak.questionIndex === q.questionIndex
                )
            );
        }
        
        // Shuffle questions for variety
        questions = this.shuffleArray(questions);
        
        // Limit number of questions
        if (questionCount !== 'all') {
            const count = parseInt(questionCount);
            questions = questions.slice(0, count);
        }
        
        return questions;
    }
    
    getWeakAreaQuestions() {
        // Return questions that user got wrong in previous tests
        const results = JSON.parse(localStorage.getItem('test-results') || '[]');
        const weakQuestions = [];
        
        results.forEach(result => {
            if (result.answers) {
                Object.keys(result.answers).forEach(questionIndex => {
                    const answer = result.answers[questionIndex];
                    if (!answer.correct) {
                        weakQuestions.push({
                            category: result.category,
                            questionIndex: parseInt(questionIndex)
                        });
                    }
                });
            }
        });
        
        return weakQuestions;
    }
    
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
    displayStudyQuestion() {
        if (this.currentStudyIndex >= this.studyQuestions.length) {
            this.completeStudySession();
            return;
        }
        
        const currentItem = this.studyQuestions[this.currentStudyIndex];
        const question = currentItem.question;
        
        // Update question display
        document.getElementById('studyQuestionText').innerHTML = question.question;
        document.getElementById('studyQNumber').textContent = this.currentStudyIndex + 1;
        
        // Update progress
        document.getElementById('studyCurrentQuestion').textContent = this.currentStudyIndex + 1;
        document.getElementById('studyTotalQuestions').textContent = this.studyQuestions.length;
        
        // Clear and populate options
        const optionsContainer = document.getElementById('studyOptionsContainer');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option study-option';
            optionElement.dataset.index = index;
            
            optionElement.innerHTML = `
                <div class="option-letter">${(typeof window !== 'undefined' && window.safeLetter) ? window.safeLetter(index) : String.fromCharCode(65 + index)}</div>
                <div class="option-text">${option}</div>
            `;
            
            // Add click handler for study mode
            optionElement.addEventListener('click', () => this.selectStudyOption(optionElement, index, question.correct));
            
            optionsContainer.appendChild(optionElement);
        });
        
        // Hide feedback initially
        document.getElementById('studyFeedback').style.display = 'none';
        
        // Update navigation buttons
        document.getElementById('studyPrevBtn').disabled = this.currentStudyIndex === 0;
        document.getElementById('studyNextBtn').disabled = this.currentStudyIndex >= this.studyQuestions.length - 1;
        
        this.updateStudyProgress();
    }
    
    selectStudyOption(optionElement, selectedIndex, correctIndex) {
        const currentItem = this.studyQuestions[this.currentStudyIndex];
        const question = currentItem.question;
        
        // Disable all options after selection
        document.querySelectorAll('.study-option').forEach(opt => {
            opt.style.pointerEvents = 'none';
        });
        
        // Show correct and incorrect answers
        document.querySelectorAll('.study-option').forEach((opt, index) => {
            if (index === correctIndex) {
                opt.classList.add('correct');
            } else if (index === selectedIndex && selectedIndex !== correctIndex) {
                opt.classList.add('incorrect');
            }
        });
        
        // Show feedback
        const feedbackDiv = document.getElementById('studyFeedback');
        const isCorrect = selectedIndex === correctIndex;
        
        let feedbackHTML = '';
        if (isCorrect) {
            feedbackHTML = `
                <div class="feedback-correct">
                    <i class="fas fa-check-circle"></i>
                    <strong>Correct!</strong>
                </div>
            `;
            this.studyProgress.studyStreak++;
        } else {
            feedbackHTML = `
                <div class="feedback-incorrect">
                    <i class="fas fa-times-circle"></i>
                    <strong>Incorrect.</strong> The correct answer is <strong>${(typeof window !== 'undefined' && window.safeLetter) ? window.safeLetter(correctIndex) : String.fromCharCode(65 + correctIndex)}</strong>.
                </div>
            `;
            this.studyProgress.studyStreak = 0;
        }
        
        // Add explanation if available
        if (question.explanation) {
            feedbackHTML += `
                <div class="feedback-explanation">
                    <strong>Explanation:</strong> ${question.explanation}
                </div>
            `;
        }
        
        feedbackDiv.innerHTML = feedbackHTML;
        feedbackDiv.style.display = 'block';
        
        // Record progress
        this.recordStudyProgress(isCorrect ? 'easy' : 'hard');
        
        // Auto-advance after 3 seconds
        setTimeout(() => {
            if (this.currentStudyIndex < this.studyQuestions.length - 1) {
                this.nextStudyQuestion();
            }
        }, 3000);
    }
    
    handleSelfAssessment(button) {
        // This method is no longer needed in MCQ mode
        // Kept for compatibility
    }
    
    recordStudyProgress(difficulty) {
        // Update study statistics
        this.studyProgress.totalStudied++;
        
        if (difficulty === 'easy') {
            this.studyProgress.studyStreak++;
        } else if (difficulty === 'hard') {
            this.studyProgress.studyStreak = 0;
        }
        
        // Calculate study time
        const now = new Date();
        const timeDiff = (now - this.studyStartTime) / (1000 * 60); // minutes
        this.studyProgress.studyTime = Math.round(timeDiff);
        
        // Save progress to localStorage
        localStorage.setItem('study-progress', JSON.stringify(this.studyProgress));
        
        this.updateStudyStats();
    }
    
    updateStudyProgress() {
        const progressPercent = ((this.currentStudyIndex + 1) / this.studyQuestions.length) * 100;
        document.getElementById('studyProgressFill').style.width = `${progressPercent}%`;
    }
    
    updateStudyStats() {
        document.getElementById('totalStudied').textContent = this.studyProgress.totalStudied;
        document.getElementById('studyStreak').textContent = this.studyProgress.studyStreak;
        document.getElementById('studyTime').textContent = this.studyProgress.studyTime;
    }
    
    previousStudyQuestion() {
        if (this.currentStudyIndex > 0) {
            this.currentStudyIndex--;
            this.displayStudyQuestion();
        }
    }
    
    nextStudyQuestion() {
        if (this.currentStudyIndex < this.studyQuestions.length - 1) {
            this.currentStudyIndex++;
            this.displayStudyQuestion();
        } else {
            this.completeStudySession();
        }
    }
    
    pauseStudySession() {
        // Simple pause - just go back to study setup
        this.showSection('study');
    }
    
    quitStudySession() {
        if (confirm('Are you sure you want to end this study session?')) {
            this.completeStudySession();
        }
    }
    
    completeStudySession() {
        // Calculate session stats
        const endTime = new Date();
        const sessionTime = Math.round((endTime - this.studyStartTime) / (1000 * 60));
        
        // Show completion message
        alert(`Study session complete!\n\nQuestions reviewed: ${this.studyQuestions.length}\nTime spent: ${sessionTime} minutes`);
        
        // Return to study setup
        this.showSection('study');
        this.loadStudyStats();
    }
    
    loadStudyStats() {
        // Load study progress from localStorage
        const savedProgress = JSON.parse(localStorage.getItem('study-progress') || '{}');
        this.studyProgress = {
            totalStudied: savedProgress.totalStudied || 0,
            studyStreak: savedProgress.studyStreak || 0,
            studyTime: savedProgress.studyTime || 0
        };
        
        this.updateStudyStats();
    }
    
    handleStudyKeyboardShortcuts(e) {
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                this.previousStudyQuestion();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.nextStudyQuestion();
                break;
            case '1':
            case '2':
            case '3':
            case '4':
                if (!e.ctrlKey && !e.metaKey) {
                    const optionIndex = parseInt(e.key) - 1;
                    const option = document.querySelectorAll('.study-option')[optionIndex];
                    if (option && option.style.pointerEvents !== 'none') {
                        option.click();
                    }
                }
                break;
        }
    }

    startTest(category, test) {
        this.currentTest = {
            category,
            test,
            startTime: new Date(),
            answers: {},
            flagged: new Set()
        };
        
        this.currentQuestionIndex = 0;
        this.timeRemaining = test.timeLimit * 60; // Convert to seconds
        this.userAnswers = {};
        this.flaggedQuestions = new Set();

        this.showSection('test-interface');
        this.setupTestInterface();
        this.displayQuestion();
        this.startTimer();
    }

    setupTestInterface() {
        const test = this.currentTest.test;
        
        // Update test header
        document.getElementById('current-test-title').textContent = test.name;
        document.getElementById('total-questions').textContent = test.questions.length;
        
        // Reset progress
        this.updateProgress();
    }

    displayQuestion() {
        const test = this.currentTest.test;
        const question = test.questions[this.currentQuestionIndex];
        
        if (!question) return;

        // Update question info
        document.getElementById('current-question').textContent = this.currentQuestionIndex + 1;
        document.getElementById('q-number').textContent = this.currentQuestionIndex + 1;
        document.getElementById('question-text').textContent = question.question;

        // Clear and populate options
        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.dataset.index = index;
            
            if (this.userAnswers[this.currentQuestionIndex] === index) {
                optionElement.classList.add('selected');
            }

            optionElement.innerHTML = `
                <div class="option-letter">${(typeof window !== 'undefined' && window.safeLetter) ? window.safeLetter(index) : String.fromCharCode(65 + index)}</div>
                <div class="option-text">${option}</div>
            `;

            optionsContainer.appendChild(optionElement);
        });

        // Update navigation buttons
        document.getElementById('prev-btn').disabled = this.currentQuestionIndex === 0;
        document.getElementById('next-btn').textContent = 
            this.currentQuestionIndex === test.questions.length - 1 ? 'Finish Test' : 'Next';

        // Update flag button
        const flagBtn = document.getElementById('flag-btn');
        if (this.flaggedQuestions.has(this.currentQuestionIndex)) {
            flagBtn.classList.add('active');
            flagBtn.innerHTML = '<i class="fas fa-flag"></i> Flagged';
        } else {
            flagBtn.classList.remove('active');
            flagBtn.innerHTML = '<i class="far fa-flag"></i> Flag';
        }

        this.updateProgress();
    }

    selectOption(optionElement) {
        const selectedIndex = parseInt(optionElement.dataset.index);

        // Clear previous selection
        document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
        
        // Select current option
        optionElement.classList.add('selected');
        
        // Store answer using question index
        this.userAnswers[this.currentQuestionIndex] = selectedIndex;
        
        this.updateProgress();
    }

    nextQuestion() {
        const test = this.currentTest.test;
        
        if (this.currentQuestionIndex < test.questions.length - 1) {
            this.currentQuestionIndex++;
            this.displayQuestion();
        } else {
            this.finishTest();
        }
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.displayQuestion();
        }
    }

    toggleFlag() {
        if (this.flaggedQuestions.has(this.currentQuestionIndex)) {
            this.flaggedQuestions.delete(this.currentQuestionIndex);
        } else {
            this.flaggedQuestions.add(this.currentQuestionIndex);
        }
        
        this.displayQuestion();
    }

    updateProgress() {
        const test = this.currentTest.test;
        const answered = Object.keys(this.userAnswers).length;
        const total = test.questions.length;
        const percentage = (answered / total) * 100;

        document.getElementById('progress-fill').style.width = `${percentage}%`;
    }

    startTimer() {
        this.updateTimerDisplay();
        
        this.timer = setInterval(() => {
            this.timeRemaining--;
            this.updateTimerDisplay();
            
            if (this.timeRemaining <= 0) {
                this.finishTest();
            }
        }, 1000);
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.timeRemaining / 60);
        const seconds = this.timeRemaining % 60;
        const display = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        document.getElementById('timer').textContent = display;
        
        // Change color when time is running out
        const timerElement = document.getElementById('timer');
        if (this.timeRemaining < 300) { // Less than 5 minutes
            timerElement.style.color = 'var(--danger-color)';
        } else if (this.timeRemaining < 600) { // Less than 10 minutes
            timerElement.style.color = 'var(--warning-color)';
        }
    }

    pauseTest() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
            document.getElementById('pause-btn').innerHTML = '<i class="fas fa-play"></i> Resume';
        } else {
            this.startTimer();
            document.getElementById('pause-btn').innerHTML = '<i class="fas fa-pause"></i> Pause';
        }
    }

    quitTest() {
        if (confirm('Are you sure you want to quit this test? Your progress will be lost.')) {
            this.endTest();
            this.showSection('tests');
        }
    }

    finishTest() {
        this.endTest();
        this.calculateScore();
        this.showResults();
        this.saveResults();
    }

    endTest() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    calculateScore() {
        const test = this.currentTest.test;
        let correct = 0;
        let total = test.questions.length;

        test.questions.forEach((question, index) => {
            const userAnswer = this.userAnswers[index];
            if (userAnswer === question.correct) {
                correct++;
            }
        });

        this.currentTest.score = {
            correct,
            total,
            percentage: Math.round((correct / total) * 100),
            timeUsed: test.timeLimit * 60 - this.timeRemaining
        };
    }

    showResults() {
        const score = this.currentTest.score;
        const modal = document.getElementById('results-modal');
        
        // Update score display
        document.getElementById('final-percentage').textContent = `${score.percentage}%`;
        document.getElementById('final-fraction').textContent = `${score.correct}/${score.total}`;
        document.getElementById('correct-count').textContent = score.correct;
        document.getElementById('incorrect-count').textContent = score.total - score.correct;
        
        const minutes = Math.floor(score.timeUsed / 60);
        const seconds = score.timeUsed % 60;
        document.getElementById('time-taken').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        document.getElementById('test-result-title').textContent = this.currentTest.test.name;
        
        this.showModal('results-modal');
    }

    saveResults() {
        const testResult = {
            category: this.currentTest.category,
            testId: this.currentTest.test.id,
            testName: this.currentTest.test.name,
            score: this.currentTest.score,
            date: new Date().toISOString(),
            answers: this.userAnswers
        };

        // Get existing results
        let savedResults = JSON.parse(localStorage.getItem('aviationTestResults') || '[]');
        savedResults.push(testResult);
        
        // Keep only last 50 results
        if (savedResults.length > 50) {
            savedResults = savedResults.slice(-50);
        }
        
        localStorage.setItem('aviationTestResults', JSON.stringify(savedResults));
    }

    loadResults() {
        const savedResults = JSON.parse(localStorage.getItem('aviationTestResults') || '[]');
        const recentResultsContainer = document.getElementById('recent-results');
        
        if (savedResults.length === 0) {
            recentResultsContainer.innerHTML = '<p>No test results available yet. Take a test to see your progress!</p>';
            return;
        }

        // Show last 10 results
        const recentResults = savedResults.slice(-10).reverse();
        
        recentResultsContainer.innerHTML = recentResults.map(result => `
            <div class="result-item" style="display: flex; justify-content: space-between; align-items: center; padding: var(--spacing-md); background: var(--bg-secondary); border-radius: var(--radius-md); margin-bottom: var(--spacing-sm);">
                <div>
                    <strong>${result.testName}</strong>
                    <br>
                    <small style="color: var(--text-secondary);">${new Date(result.date).toLocaleDateString()}</small>
                </div>
                <div style="text-align: right;">
                    <span style="font-size: var(--font-size-lg); font-weight: 600; color: ${result.score.percentage >= 70 ? 'var(--success-color)' : 'var(--danger-color)'};">
                        ${result.score.percentage}%
                    </span>
                    <br>
                    <small style="color: var(--text-secondary);">${result.score.correct}/${result.score.total}</small>
                </div>
            </div>
        `).join('');
    }

    loadUserProgress() {
        // Load user progress from localStorage
        const saved = localStorage.getItem('aviationTestProgress');
        if (saved) {
            Object.assign(userProgress, JSON.parse(saved));
        }
    }

    showOverview() {
        const test = this.currentTest.test;
        const grid = document.getElementById('question-grid');
        
        grid.innerHTML = test.questions.map((question, index) => {
            let className = 'question-grid-item';
            
            if (index === this.currentQuestionIndex) {
                className += ' current';
            } else if (this.userAnswers[index] !== undefined) {
                className += ' answered';
            }
            
            if (this.flaggedQuestions.has(index)) {
                className += ' flagged';
            }
            
            return `<div class="${className}" data-index="${index}">${index + 1}</div>`;
        }).join('');

        // Add click handlers for grid items
        grid.querySelectorAll('.question-grid-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.currentQuestionIndex = index;
                this.displayQuestion();
                this.closeModal();
            });
        });

        this.showModal('overview-modal');
    }

    showModal(modalId) {
        document.getElementById(modalId).classList.add('active');
    }

    closeModal() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
    }

    handleKeyboardShortcuts(e) {
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                this.previousQuestion();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.nextQuestion();
                break;
            case 'f':
            case 'F':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    this.toggleFlag();
                }
                break;
            case 'o':
            case 'O':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    this.showOverview();
                }
                break;
            case '1':
            case '2':
            case '3':
            case '4':
                if (!e.ctrlKey && !e.metaKey) {
                    const optionIndex = parseInt(e.key) - 1;
                    const option = document.querySelector(`[data-index="${optionIndex}"]`);
                    if (option) {
                        this.selectOption(option);
                    }
                }
                break;
        }
    }
}

// Global functions for inline event handlers
function showSection(sectionName) {
    window.app.showSection(sectionName);
}