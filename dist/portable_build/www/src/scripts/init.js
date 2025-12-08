// Application Initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    window.app = new AviationTestApp();
    
    const categoryCount = Object.keys(window.testData || {}).length;
    let totalQuestions = 0;
    Object.keys(window.testData || {}).forEach(cat => {
        (window.testData[cat].tests || []).forEach(t => {
            totalQuestions += (t.questions || []).length;
        });
    });

    console.log('Aviation Test Center loaded successfully!');
    console.log('Features:');
    console.log('- Modern responsive design');
    console.log(`- ${categoryCount} test categories`);
    console.log(`- ${totalQuestions}+ questions`);
    console.log('- Progress tracking');
    console.log('- Timed tests');
    console.log('- Results storage');
    console.log('- Keyboard shortcuts');
    
    // Add keyboard shortcut help
    console.log('\nKeyboard Shortcuts (during test):');
    console.log('← → : Navigate questions');
    console.log('1-4 : Select answer options');
    console.log('Ctrl+F : Toggle flag');
    console.log('Ctrl+O : Show overview');
});