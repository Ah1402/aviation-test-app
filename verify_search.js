// Search Engine Verification Script
// Run this to verify the search engine has been updated with all questions

function verifySearchEngine() {
    console.log('🔍 Verifying Search Engine Status');
    console.log('=================================');
    
    // Check if search engine exists
    if (!window.app || !window.app.searchEngine) {
        console.error('❌ Search engine not initialized');
        return false;
    }
    
    // Count questions in testData
    let totalQuestions = 0;
    let totalCategories = 0;
    
    Object.keys(window.testData || {}).forEach(cat => {
        totalCategories++;
        (window.testData[cat].tests || []).forEach(test => {
            totalQuestions += (test.questions || []).length;
        });
    });
    
    // Count questions in search engine
    const searchEngineDocCount = window.app.searchEngine.docs ? window.app.searchEngine.docs.length : 0;
    
    console.log(`📊 Data Summary:`);
    console.log(`   TestData: ${totalQuestions} questions in ${totalCategories} categories`);
    console.log(`   Search Engine: ${searchEngineDocCount} indexed documents`);
    
    // Verify counts match
    if (searchEngineDocCount === totalQuestions) {
        console.log('✅ Search engine is properly synchronized with testData');
        
        // Test some searches
        const testQueries = ['aircraft', 'altitude', 'engine', 'navigation', 'weather'];
        console.log('🧪 Testing search queries:');
        
        let totalResults = 0;
        testQueries.forEach(query => {
            const results = window.app.searchEngine.search(query, 'all', 10);
            totalResults += results.length;
            console.log(`   "${query}": ${results.length} results`);
        });
        
        if (totalResults > 0) {
            console.log('✅ Search engine is working correctly');
            return true;
        } else {
            console.warn('⚠️  Search engine returns no results - may need rebuilding');
            return false;
        }
    } else {
        console.warn(`⚠️  Search engine count (${searchEngineDocCount}) doesn't match testData count (${totalQuestions})`);
        console.log('🔄 Attempting to rebuild search engine...');
        
        if (window.app.rebuildSearchEngine && window.app.rebuildSearchEngine()) {
            console.log('✅ Search engine rebuilt successfully');
            return verifySearchEngine(); // Recursive verification
        } else {
            console.error('❌ Failed to rebuild search engine');
            return false;
        }
    }
}

// Auto-run verification
if (typeof window !== 'undefined' && window.app) {
    setTimeout(verifySearchEngine, 500);
} else {
    console.log('⏳ Waiting for app to initialize...');
    let attempts = 0;
    const checkInterval = setInterval(() => {
        attempts++;
        if (window.app && window.app.searchEngine) {
            clearInterval(checkInterval);
            verifySearchEngine();
        } else if (attempts > 20) {
            clearInterval(checkInterval);
            console.error('❌ Timeout waiting for app initialization');
        }
    }, 250);
}

// Expose for manual use
window.verifySearchEngine = verifySearchEngine;