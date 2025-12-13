#!/usr/bin/env node

/**
 * IPA Builder Script
 * Builds iOS IPA for the Aviation Test App
 * 
 * Usage: npm run build:ios
 * Requirements: Xcode, macOS, Apple Developer Account
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('📦 Building IPA for Aviation Test App\n');

function runCommand(command, description) {
    console.log(`⏳ ${description}...`);
    try {
        execSync(command, { stdio: 'inherit', cwd: __dirname });
        console.log(`✅ ${description} completed\n`);
        return true;
    } catch (error) {
        console.error(`❌ ${description} failed:`, error.message);
        return false;
    }
}

async function buildIOS() {
    // Check if running on macOS
    if (process.platform !== 'darwin') {
        console.error('❌ iOS builds require macOS with Xcode installed.');
        console.log('\nℹ️  To build IPA:');
        console.log('1. Use a Mac with Xcode installed');
        console.log('2. Run: npm run build:ios');
        console.log('3. Or open in Xcode: npx cap open ios');
        process.exit(1);
    }

    // Step 1: Sync Capacitor
    if (!runCommand('npx cap sync ios', 'Syncing Capacitor')) {
        process.exit(1);
    }

    // Step 2: Check if Xcode project exists
    const xcworkspacePath = path.join(__dirname, 'ios', 'App', 'App.xcworkspace');
    if (!fs.existsSync(xcworkspacePath)) {
        console.error('❌ Xcode workspace not found.');
        console.log('ℹ️  Initialize iOS project: npx cap add ios');
        process.exit(1);
    }

    console.log('📱 Building iOS App...\n');
    console.log('⚠️  Manual steps required:');
    console.log('1. Open Xcode: npx cap open ios');
    console.log('2. Select your development team in Signing & Capabilities');
    console.log('3. Choose Product > Archive');
    console.log('4. Distribute App > Ad Hoc or App Store');
    console.log('5. Export IPA file');

    console.log('\n🔧 Attempting automated build (requires proper certificates)...\n');

    // Try automated build
    const scheme = 'App';
    const configuration = 'Release';
    const archivePath = path.join(__dirname, 'build', 'App.xcarchive');
    
    // Create build directory
    if (!fs.existsSync(path.join(__dirname, 'build'))) {
        fs.mkdirSync(path.join(__dirname, 'build'));
    }

    const buildCmd = `xcodebuild -workspace "${xcworkspacePath}" -scheme ${scheme} -configuration ${configuration} -archivePath "${archivePath}" archive`;
    
    if (runCommand(buildCmd, 'Archiving iOS App')) {
        console.log('✅ Archive created successfully!');
        console.log(`📍 Location: ${archivePath}`);
        
        console.log('\n📦 Exporting IPA...');
        const exportPath = path.join(__dirname, 'build', 'ios-export');
        const exportOptionsPath = path.join(__dirname, 'exportOptions.plist');
        
        // Create export options plist if not exists
        if (!fs.existsSync(exportOptionsPath)) {
            const exportOptions = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>method</key>
    <string>development</string>
    <key>teamID</key>
    <string>YOUR_TEAM_ID</string>
    <key>compileBitcode</key>
    <false/>
    <key>uploadSymbols</key>
    <true/>
</dict>
</plist>`;
            fs.writeFileSync(exportOptionsPath, exportOptions);
            console.log('⚠️  Created exportOptions.plist - Update YOUR_TEAM_ID with your Apple Developer Team ID');
        }

        const exportCmd = `xcodebuild -exportArchive -archivePath "${archivePath}" -exportPath "${exportPath}" -exportOptionsPlist "${exportOptionsPath}"`;
        
        if (runCommand(exportCmd, 'Exporting IPA')) {
            console.log('\n🎉 IPA Built Successfully!');
            console.log(`📍 Location: ${exportPath}`);
        } else {
            console.log('\n⚠️  Automatic export failed. Please export manually from Xcode.');
        }
    } else {
        console.log('\n⚠️  Automatic build failed. Please build manually from Xcode:');
        console.log('   npx cap open ios');
    }
}

// Alternative: Open in Xcode
function openInXcode() {
    console.log('🚀 Opening project in Xcode...\n');
    runCommand('npx cap open ios', 'Opening Xcode');
    
    console.log('\n📝 Manual Build Steps:');
    console.log('1. In Xcode, select a real device or "Any iOS Device"');
    console.log('2. Product > Archive');
    console.log('3. Window > Organizer');
    console.log('4. Select your archive > Distribute App');
    console.log('5. Choose distribution method (Ad Hoc, App Store, etc.)');
    console.log('6. Follow prompts to export IPA');
}

// Main execution
const action = process.argv[2] || 'build';

if (action === 'open') {
    openInXcode();
} else {
    buildIOS().catch(console.error);
}
