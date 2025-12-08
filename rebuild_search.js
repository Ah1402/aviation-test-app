// Search Engine Update Script
// Run this in the browser console to manually rebuild the search engine

(function() {
    console.log('🔍 Search Engine Update Script');
    console.log('================================');
    
    // Check if the app and SearchEngine are available
    if (typeof window.app === 'undefined') {
        console.error('❌ Aviation test app not found. Make sure the app is loaded.');
        return;
    }
    
    if (typeof window.SearchEngine === 'undefined') {
        console.error('❌ SearchEngine class not found. Make sure searchIndex.js is loaded.');
        return;
    }
    
    if (typeof window.testData === 'undefined') {
        console.error('❌ testData not found. Make sure testData.js is loaded.');
        return;
    }
    
    // Count questions before rebuild
    let totalQuestions = 0;
    let totalCategories = 0;
    
    Object.keys(window.testData).forEach(cat => {
        totalCategories++;
        window.testData[cat].tests.forEach(test => {
            totalQuestions += (test.questions ? test.questions.length : 0);
        });
    });
    
    console.log(`📊 Current testData contains: ${totalCategories} categories, ${totalQuestions} questions`);
    
    // Rebuild the search engine
    console.log('🔄 Rebuilding search engine...');
    
    try {
        const success = window.app.rebuildSearchEngine();
        
        if (success) {
            console.log('✅ Search engine successfully rebuilt!');
            console.log(`🎯 Search index now contains ${totalQuestions} questions across ${totalCategories} categories`);
            
            // Test search functionality
            console.log('🧪 Testing search functionality...');
            const testResults = window.app.searchEngine.search('aircraft engine', 'all', 3);
            console.log(`✅ Search test successful! Found ${testResults.length} results for "aircraft engine"`);
            
            console.log('================================');
            console.log('🎉 Search engine update complete!');
            console.log('You can now search through all updated questions.');
        } else {
            console.error('❌ Failed to rebuild search engine');
        }
    } catch (error) {
        console.error('❌ Error during search engine rebuild:', error);
    }
})();

// To use this script:
// 1. Copy and paste this entire script into the browser console
// 2. Press Enter to execute
// 3. The search engine will be rebuilt with the latest questions

console.log('📝 Search Engine Update Script loaded. Execute the script to update the search index.');