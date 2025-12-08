// Test Engine - Handles test logic and scoring
class TestEngine {
    constructor() {
        this.currentTest = null;
        this.currentQuestion = 0;
        this.userAnswers = {};
        this.startTime = null;
        this.endTime = null;
    }

    startTest(categoryId, testId) {
        const category = testData[categoryId];
        if (!category) throw new Error('Category not found');
        
        const test = category.tests.find(t => t.id === testId);
        if (!test) throw new Error('Test not found');

        this.currentTest = {
            category: categoryId,
            categoryName: category.name,
            test: test,
            totalQuestions: test.questions.length
        };
        
        this.currentQuestion = 0;
        this.userAnswers = {};
        this.startTime = new Date();
        this.endTime = null;

        return this.currentTest;
    }

    answerQuestion(questionId, answerIndex) {
        if (!this.currentTest) return false;
        
        this.userAnswers[questionId] = answerIndex;
        return true;
    }

    getQuestion(index = this.currentQuestion) {
        if (!this.currentTest || index < 0 || index >= this.currentTest.totalQuestions) {
            return null;
        }
        
        return this.currentTest.test.questions[index];
    }

    nextQuestion() {
        if (!this.currentTest) return false;
        
        if (this.currentQuestion < this.currentTest.totalQuestions - 1) {
            this.currentQuestion++;
            return true;
        }
        return false;
    }

    previousQuestion() {
        if (!this.currentTest) return false;
        
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            return true;
        }
        return false;
    }

    goToQuestion(index) {
        if (!this.currentTest || index < 0 || index >= this.currentTest.totalQuestions) {
            return false;
        }
        
        this.currentQuestion = index;
        return true;
    }

    calculateScore() {
        if (!this.currentTest) return null;

        let correct = 0;
        const questions = this.currentTest.test.questions;
        
        questions.forEach(question => {
            const userAnswer = this.userAnswers[question.id];
            if (userAnswer === question.correct) {
                correct++;
            }
        });

        const total = questions.length;
        const percentage = Math.round((correct / total) * 100);
        
        this.endTime = new Date();
        const duration = this.endTime - this.startTime;

        return {
            correct,
            incorrect: total - correct,
            total,
            percentage,
            duration,
            startTime: this.startTime,
            endTime: this.endTime,
            answers: { ...this.userAnswers }
        };
    }

    getProgress() {
        if (!this.currentTest) return null;

        const answered = Object.keys(this.userAnswers).length;
        const total = this.currentTest.totalQuestions;
        
        return {
            current: this.currentQuestion + 1,
            total,
            answered,
            percentage: Math.round((answered / total) * 100)
        };
    }

    getQuestionSummary() {
        if (!this.currentTest) return [];

        return this.currentTest.test.questions.map((question, index) => ({
            number: index + 1,
            id: question.id,
            answered: this.userAnswers.hasOwnProperty(question.id),
            userAnswer: this.userAnswers[question.id],
            isCorrect: this.userAnswers[question.id] === question.correct
        }));
    }

    isTestComplete() {
        if (!this.currentTest) return false;
        
        const totalQuestions = this.currentTest.totalQuestions;
        const answeredQuestions = Object.keys(this.userAnswers).length;
        
        return answeredQuestions === totalQuestions;
    }

    getUnansweredQuestions() {
        if (!this.currentTest) return [];

        const unanswered = [];
        this.currentTest.test.questions.forEach((question, index) => {
            if (!this.userAnswers.hasOwnProperty(question.id)) {
                unanswered.push(index + 1);
            }
        });

        return unanswered;
    }

    resetTest() {
        this.currentTest = null;
        this.currentQuestion = 0;
        this.userAnswers = {};
        this.startTime = null;
        this.endTime = null;
    }
}