#!/usr/bin/env node

/**
 * Version Updater for testData_complete.js
 * Automatically updates version number when file changes
 */

const fs = require('fs');
const path = require('path');

const testDataPath = path.join(__dirname, '..', 'testData_complete.js');

function updateVersion() {
    try {
        // Read the file
        let content = fs.readFileSync(testDataPath, 'utf8');

        // Get current date
        const now = new Date();
        const dateString = now.toISOString().split('T')[0]; // YYYY-MM-DD
        const timeString = now.toTimeString().split(' ')[0].replace(/:/g, ''); // HHMMSS

        // Generate new version (date.time format)
        const newVersion = `${dateString.replace(/-/g, '')}.${timeString}`;

        // Update version in the content
        content = content.replace(
            /"version":\s*"[^"]*"/,
            `"version": "${newVersion}"`
        );

        // Update lastUpdated
        content = content.replace(
            /"lastUpdated":\s*"[^"]*"/,
            `"lastUpdated": "${dateString}"`
        );

        // Write back to file
        fs.writeFileSync(testDataPath, content, 'utf8');

        console.log(`✅ Version updated to ${newVersion}`);
        console.log(`📅 Last updated: ${dateString}`);

        return newVersion;

    } catch (error) {
        console.error('❌ Error updating version:', error.message);
        return null;
    }
}

// If run directly, update version
if (require.main === module) {
    const newVersion = updateVersion();
    if (newVersion) {
        console.log(`🎯 Ready to rebuild apps with version ${newVersion}`);
    }
}

module.exports = { updateVersion };