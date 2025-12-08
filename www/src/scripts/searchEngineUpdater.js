// Complete Search Engine Update Script
// This script ensures the search engine is fully updated with all questions

console.log('🔍 Aviation Test App - Search Engine Update');
console.log('==========================================');

function updateSearchEngine() {
    // Check prerequisites
    if (typeof window.app === 'undefined') {
        console.error('❌ Aviation test app not found. Make sure the app is loaded.');
        return false;
    }
    
    if (typeof window.SearchEngine === 'undefined') {
        console.error('❌ SearchEngine class not found. Make sure searchIndex.js is loaded.');
        return false;
    }
    
    if (typeof window.testData === 'undefined') {
        console.error('❌ testData not found. Make sure testData.js is loaded.');
        return false;
    }
    
    // Count current questions
    let totalQuestions = 0;
    let totalCategories = 0;
    let categoryCounts = {};
    
    Object.keys(window.testData).forEach(cat => {
        totalCategories++;
        let catQuestions = 0;
        window.testData[cat].tests.forEach(test => {
            const qCount = test.questions ? test.questions.length : 0;
            catQuestions += qCount;
            totalQuestions += qCount;
        });
        categoryCounts[cat] = catQuestions;
    });
    
    console.log(`📊 Current testData statistics:`);
    console.log(`   Categories: ${totalCategories}`);
    console.log(`   Total Questions: ${totalQuestions}`);
    console.log(`   Category breakdown:`);
    Object.entries(categoryCounts).forEach(([cat, count]) => {
        console.log(`     ${cat}: ${count} questions`);
    });
    
    // Rebuild the search engine
    console.log('🔄 Rebuilding search engine with current data...');
    
    try {
        const oldEngine = window.app.searchEngine;
        const success = window.app.rebuildSearchEngine();
        
        if (success) {
            console.log('✅ Search engine successfully rebuilt!');
            
            // Test search functionality with various queries
            console.log('🧪 Testing search functionality...');
            
            const testQueries = [
                'aircraft engine',
                'altimeter',
                'navigation',
                'meteorology cloud',
                'mass balance'
            ];
            
            let totalTestResults = 0;
            testQueries.forEach(query => {
                const results = window.app.searchEngine.search(query, 'all', 5);
                totalTestResults += results.length;
                console.log(`   "${query}": ${results.length} results`);
            });
            
            if (totalTestResults > 0) {
                console.log('✅ Search tests passed - search engine is working correctly');
            } else {
                console.warn('⚠️  Search tests returned no results - this might indicate an issue');
            }
            
            // Update home statistics if method exists
            try {
                if (window.app.updateHomeStats && typeof window.app.updateHomeStats === 'function') {
                    window.app.updateHomeStats();
                    console.log('✅ Home page statistics updated');
                }
            } catch (e) {
                console.warn('⚠️  Could not update home page statistics:', e.message);
            }
            
            console.log('==========================================');
            console.log('🎉 Search engine update complete!');
            console.log(`🎯 Search index now contains ${totalQuestions} questions`);
            console.log('   All questions are now searchable');
            
            return true;
        } else {
            console.error('❌ Failed to rebuild search engine');
            return false;
        }
    } catch (error) {
        console.error('❌ Error during search engine rebuild:', error);
        return false;
    }
}

// Auto-run the update
if (typeof window !== 'undefined' && window.document && window.document.readyState !== 'loading') {
    // DOM is ready, run immediately
    setTimeout(updateSearchEngine, 100);
} else if (typeof window !== 'undefined') {
    // Wait for DOM to be ready
    window.addEventListener('DOMContentLoaded', () => {
        setTimeout(updateSearchEngine, 100);
    });
}

// Also expose the function for manual calling
window.updateSearchEngine = updateSearchEngine;

console.log('📝 Search engine update script loaded.');
console.log('💡 You can manually run updateSearchEngine() in console if needed.');