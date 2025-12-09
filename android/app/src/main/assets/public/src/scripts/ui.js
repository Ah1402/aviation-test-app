// UI Manager - Handles all UI updates and interactions
if (typeof window !== 'undefined' && !window.safeLetter) {
    window.safeLetter = function(n){ if (typeof n !== 'number' || isNaN(n) || n < 0) return ''; return String.fromCharCode(65 + n); };
}

class UIManager {
    constructor() {
        this.activeSection = 'home';
        this.modals = new Map();
        this.tooltips = new Map();
    }

    // Section Management
    showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            this.activeSection = sectionId;
            
            // Update navigation
            this.updateNavigation(sectionId);
            
            // Trigger section-specific initialization
            this.onSectionShown(sectionId);
        }
    }

    updateNavigation(activeSection) {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeBtn = document.querySelector(`[data-section="${activeSection}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
    }

    onSectionShown(sectionId) {
        switch (sectionId) {
            case 'results':
                this.loadResultsSection();
                break;
            case 'tests':
                this.loadTestsSection();
                break;
        }
    }

    // Test Categories UI
    loadTestsSection() {
        const categoriesContainer = document.querySelector('.test-categories');
        if (!categoriesContainer) return;

        // Update category cards with real data
        Object.entries(testData).forEach(([categoryId, categoryData]) => {
            const card = document.querySelector(`[data-category="${categoryId}"]`);
            if (card) {
                const testCount = categoryData.tests.length;
                const questionCount = categoryData.tests.reduce((total, test) => total + test.questions.length, 0);
                
                card.querySelector('.test-count').textContent = `${testCount} Tests`;
                card.querySelector('.question-count').textContent = `${questionCount} Questions`;
            }
        });
    }

    // Test Interface UI
    updateTestHeader(testData) {
        document.getElementById('current-test-title').textContent = testData.name;
        document.getElementById('total-questions').textContent = testData.questions.length;
    }

    updateQuestionDisplay(question, questionNumber, total) {
        document.getElementById('current-question').textContent = questionNumber;
        document.getElementById('q-number').textContent = questionNumber;
        document.getElementById('question-text').innerHTML = this.formatQuestionText(question.text);
        
        this.renderOptions(question.options, question.id);
        this.updateNavigationButtons(questionNumber, total);
    }

    formatQuestionText(text) {
        // Handle mathematical expressions and special formatting
        return text
            .replace(/\$([^$]+)\$/g, '<span class="math">$1</span>')
            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
            .replace(/\*([^*]+)\*/g, '<em>$1</em>');
    }

    renderOptions(options, questionId) {
        const container = document.getElementById('options-container');
        container.innerHTML = '';

        options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.dataset.index = index;
            optionElement.dataset.questionId = questionId;

            optionElement.innerHTML = `
                <div class="option-letter">${(typeof window !== 'undefined' && window.safeLetter) ? window.safeLetter(index) : String.fromCharCode(65 + index)}</div>
                <div class="option-text">${this.formatQuestionText(option)}</div>
            `;

            container.appendChild(optionElement);
        });
    }

    selectOption(optionElement, isSelected = true) {
        // Clear other selections in the same question
        const container = optionElement.closest('.options-container');
        container.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('selected');
        });

        if (isSelected) {
            optionElement.classList.add('selected');
        }
    }

    updateNavigationButtons(current, total) {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        prevBtn.disabled = current === 1;
        nextBtn.textContent = current === total ? 'Finish Test' : 'Next';
        nextBtn.innerHTML = current === total ? 
            'Finish Test <i class="fas fa-check"></i>' : 
            'Next <i class="fas fa-chevron-right"></i>';
    }

    updateProgressBar(percentage) {
        const progressFill = document.getElementById('progress-fill');
        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
        }
    }

    updateTimer(timeRemaining) {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        const display = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        const timerElement = document.getElementById('timer');
        if (timerElement) {
            timerElement.textContent = display;
            
            // Update timer color based on remaining time
            if (timeRemaining < 300) { // Less than 5 minutes
                timerElement.style.color = 'var(--danger-color)';
            } else if (timeRemaining < 600) { // Less than 10 minutes
                timerElement.style.color = 'var(--warning-color)';
            } else {
                timerElement.style.color = 'var(--primary-color)';
            }
        }
    }

    updateFlagButton(isFlagged) {
        const flagBtn = document.getElementById('flag-btn');
        if (flagBtn) {
            if (isFlagged) {
                flagBtn.classList.add('active');
                flagBtn.innerHTML = '<i class="fas fa-flag"></i> Flagged';
            } else {
                flagBtn.classList.remove('active');
                flagBtn.innerHTML = '<i class="far fa-flag"></i> Flag';
            }
        }
    }

    // Modal Management
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            this.modals.set(modalId, modal);
        }
    }

    closeModal(modalId = null) {
        if (modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.remove('active');
                this.modals.delete(modalId);
            }
        } else {
            // Close all modals
            document.querySelectorAll('.modal.active').forEach(modal => {
                modal.classList.remove('active');
            });
            this.modals.clear();
        }
    }

    // Question Overview Modal
    renderQuestionOverview(questions, currentIndex, userAnswers, flaggedQuestions) {
        const grid = document.getElementById('question-grid');
        if (!grid) return;

        grid.innerHTML = questions.map((question, index) => {
            let className = 'question-grid-item';
            
            if (index === currentIndex) {
                className += ' current';
            }
            
            if (userAnswers.hasOwnProperty(question.id)) {
                className += ' answered';
            }
            
            if (flaggedQuestions.has(question.id)) {
                className += ' flagged';
            }
            
            return `<div class="${className}" data-index="${index}">${index + 1}</div>`;
        }).join('');
    }

    // Results Display
    showTestResults(results) {
        document.getElementById('final-percentage').textContent = `${results.percentage}%`;
        document.getElementById('final-fraction').textContent = `${results.correct}/${results.total}`;
        document.getElementById('correct-count').textContent = results.correct;
        document.getElementById('incorrect-count').textContent = results.incorrect;
        
        const minutes = Math.floor(results.duration / 60000);
        const seconds = Math.floor((results.duration % 60000) / 1000);
        document.getElementById('time-taken').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        // Update score circle color based on performance
        const scoreCircle = document.querySelector('.score-circle');
        if (scoreCircle) {
            if (results.percentage >= 80) {
                scoreCircle.style.background = 'linear-gradient(135deg, var(--success-color), #059669)';
            } else if (results.percentage >= 60) {
                scoreCircle.style.background = 'linear-gradient(135deg, var(--warning-color), #d97706)';
            } else {
                scoreCircle.style.background = 'linear-gradient(135deg, var(--danger-color), #dc2626)';
            }
        }
        
        this.showModal('results-modal');
    }

    loadResultsSection() {
        const savedResults = JSON.parse(localStorage.getItem('aviationTestResults') || '[]');
        const recentResultsContainer = document.getElementById('recent-results');
        
        if (!recentResultsContainer) return;

        if (savedResults.length === 0) {
            recentResultsContainer.innerHTML = `
                <div style="text-align: center; padding: var(--spacing-xl); color: var(--text-secondary);">
                    <i class="fas fa-chart-line" style="font-size: 3rem; margin-bottom: var(--spacing-lg); opacity: 0.5;"></i>
                    <p>No test results available yet.</p>
                    <p>Take a test to see your progress!</p>
                </div>
            `;
            return;
        }

        const recentResults = savedResults.slice(-10).reverse();
        
        recentResultsContainer.innerHTML = recentResults.map(result => `
            <div class="result-item">
                <div class="result-info">
                    <h4>${result.testName}</h4>
                    <p class="result-date">${new Date(result.date).toLocaleDateString()}</p>
                    <p class="result-category">${testData[result.category]?.name || result.category}</p>
                </div>
                <div class="result-score">
                    <span class="score-percentage ${this.getScoreClass(result.score.percentage)}">
                        ${result.score.percentage}%
                    </span>
                    <span class="score-details">${result.score.correct}/${result.score.total}</span>
                </div>
            </div>
        `).join('');

        // Add CSS for result items
        if (!document.getElementById('results-css')) {
            const style = document.createElement('style');
            style.id = 'results-css';
            style.textContent = `
                .result-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: var(--spacing-md);
                    background: var(--bg-secondary);
                    border-radius: var(--radius-md);
                    margin-bottom: var(--spacing-sm);
                    transition: all 0.2s ease;
                }
                .result-item:hover {
                    background: var(--bg-primary);
                    box-shadow: var(--shadow-md);
                }
                .result-info h4 {
                    margin: 0 0 var(--spacing-xs) 0;
                    font-size: var(--font-size-base);
                    font-weight: 600;
                }
                .result-date, .result-category {
                    margin: 0;
                    font-size: var(--font-size-sm);
                    color: var(--text-secondary);
                }
                .result-score {
                    text-align: right;
                }
                .score-percentage {
                    font-size: var(--font-size-lg);
                    font-weight: 600;
                    display: block;
                }
                .score-percentage.excellent { color: var(--success-color); }
                .score-percentage.good { color: var(--warning-color); }
                .score-percentage.needs-improvement { color: var(--danger-color); }
                .score-details {
                    font-size: var(--font-size-sm);
                    color: var(--text-secondary);
                }
            `;
            document.head.appendChild(style);
        }
    }

    getScoreClass(percentage) {
        if (percentage >= 80) return 'excellent';
        if (percentage >= 60) return 'good';
        return 'needs-improvement';
    }

    // Utility methods
    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add notification styles if not present
        if (!document.getElementById('notification-css')) {
            const style = document.createElement('style');
            style.id = 'notification-css';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: var(--spacing-md) var(--spacing-lg);
                    border-radius: var(--radius-md);
                    color: white;
                    font-weight: 500;
                    z-index: 1001;
                    transform: translateX(100%);
                    transition: transform 0.3s ease;
                }
                .notification.show {
                    transform: translateX(0);
                }
                .notification-info { background: var(--primary-color); }
                .notification-success { background: var(--success-color); }
                .notification-warning { background: var(--warning-color); }
                .notification-error { background: var(--danger-color); }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove after duration
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }

    showConfirmDialog(message, onConfirm, onCancel = null) {
        const result = confirm(message);
        if (result && onConfirm) {
            onConfirm();
        } else if (!result && onCancel) {
            onCancel();
        }
        return result;
    }
}