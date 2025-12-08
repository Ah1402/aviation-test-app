const fs = require('fs');
const path = require('path');

/**
 * Sync 924.html with latest testData from testData_complete.js
 * This tool automatically updates the inline testData in 924.html
 * whenever changes are made to testData_complete.js
 */

function sync924() {
    try {
        console.log('🔄 Syncing 924.html with testData_complete.js...');

        // Read testData_complete.js
        const testDataPath = path.join(__dirname, 'testData_complete.js');
        const testDataContent = fs.readFileSync(testDataPath, 'utf8');

        // Extract the testData object
        const testDataMatch = testDataContent.match(/\s*window\.testData\s*=\s*(\{[\s\S]*?\});/);
        if (!testDataMatch) {
            throw new Error('Could not find window.testData in testData_complete.js');
        }

        const testDataJson = testDataMatch[1];

        // Read 924.html
        const htmlPath = path.join(__dirname, '924.html');
        const htmlContent = fs.readFileSync(htmlPath, 'utf8');

        // Find the start of the inline testData
        const startPattern = /window\.dataLoaded\s*=\s*window\.testData\s*=\s*\{/;
        const startMatch = htmlContent.match(startPattern);
        if (!startMatch) {
            throw new Error('Could not find start of inline testData in 924.html');
        }
        const startIndex = startMatch.index;

        // Find the end marker
        const endMarker = '// Complete Search Engine Update Script';
        const endIndex = htmlContent.indexOf(endMarker, startIndex);
        if (endIndex === -1) {
            throw new Error('Could not find end marker in 924.html');
        }

        // Find the last }; before the end marker
        const beforeEnd = htmlContent.substring(startIndex, endIndex);
        const lastBraceIndex = beforeEnd.lastIndexOf('};');
        if (lastBraceIndex === -1) {
            throw new Error('Could not find closing }; in 924.html');
        }

        const fullEndIndex = startIndex + lastBraceIndex + 2; // +2 for };

        // Extract the old inline testData
        const oldInline = htmlContent.substring(startIndex, fullEndIndex);

        // Replace with new one
        const newHtmlContent = htmlContent.replace(oldInline, `window.dataLoaded = window.testData = ${testDataJson};`);

        // Write back to 924.html
        fs.writeFileSync(htmlPath, newHtmlContent, 'utf8');

        // Count questions for verification
        const testData = JSON.parse(testDataJson);
        let questionCount = 0;
        for (const cat in testData) {
            if (testData[cat].tests) {
                testData[cat].tests.forEach(test => {
                    if (test.questions) questionCount += test.questions.length;
                });
            }
        }

        console.log(`✅ 924.html synced successfully!`);
        console.log(`📊 Total questions: ${questionCount}`);
        console.log(`📁 Updated: ${htmlPath}`);

    } catch (error) {
        console.error('❌ Error syncing 924.html:', error.message);
        process.exit(1);
    }
}

// Watch mode for continuous syncing
function watchMode() {
    const chokidar = require('chokidar');

    console.log('👀 Watching testData_complete.js for changes...');
    console.log('Press Ctrl+C to stop watching');

    const watcher = chokidar.watch('testData_complete.js', {
        persistent: true,
        ignoreInitial: true
    });

    watcher.on('change', (path) => {
        console.log(`📝 ${path} changed, syncing 924.html...`);
        sync924();
    });

    watcher.on('error', (error) => {
        console.error('Watch error:', error);
    });
}

// Main execution
const args = process.argv.slice(2);
if (args.includes('--watch') || args.includes('-w')) {
    // Check if chokidar is available
    try {
        require('chokidar');
        watchMode();
    } catch (e) {
        console.error('❌ chokidar not found. Install with: npm install chokidar --save-dev');
        console.log('Running one-time sync instead...');
        sync924();
    }
} else {
    sync924();
}

module.exports = { sync924 };