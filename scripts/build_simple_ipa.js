#!/usr/bin/env node

/**
 * Simple IPA Builder
 * Creates IPA for iOS (requires macOS + Xcode)
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('📦 Building Simple IPA for Aviation Test App\n');

function runCommand(command, description) {
    console.log(`⏳ ${description}...`);
    try {
        execSync(command, { stdio: 'inherit', cwd: __dirname + '/..' });
        console.log(`✅ ${description} completed\n`);
        return true;
    } catch (error) {
        console.error(`❌ ${description} failed:`, error.message);
        return false;
    }
}

async function buildSimpleIPA() {
    // Check if running on macOS
    if (process.platform !== 'darwin') {
        console.log('❌ iOS builds require macOS with Xcode installed.');
        console.log('\n💡 Alternative options:');
        console.log('1. Use a Mac with Xcode to run this script');
        console.log('2. Use Xcode Cloud or App Store Connect');
        console.log('3. Use TestFlight for distribution');
        console.log('4. Use Enterprise distribution for direct installs');

        // Create a web app version as fallback
        console.log('\n🌐 Creating web app version for testing...');
        const projectRoot = path.join(__dirname, '..');
        const webAppDir = path.join(projectRoot, 'dist', 'web-app');

        if (!fs.existsSync(webAppDir)) {
            fs.mkdirSync(webAppDir, { recursive: true });
        }

        // Copy web files
        const filesToCopy = ['index.html', 'manifest.json', 'sw.js', 'ahmed.png'];
        filesToCopy.forEach(file => {
            const src = path.join(projectRoot, file);
            const dest = path.join(webAppDir, file);
            if (fs.existsSync(src)) {
                fs.copyFileSync(src, dest);
            }
        });

        console.log('✅ Web app created in dist/web-app/');
        console.log('💡 Open index.html in Safari on iOS device for PWA experience');

        return;
    }

    const projectRoot = path.join(__dirname, '..');

    // Step 1: Ensure www directory is updated
    console.log('📁 Preparing web assets...');
    if (!fs.existsSync(path.join(projectRoot, 'www'))) {
        fs.mkdirSync(path.join(projectRoot, 'www'), { recursive: true });
    }

    // Copy files to www (same as APK build)
    const filesToCopy = ['index.html', 'manifest.json', 'sw.js', 'ahmed.png'];
    filesToCopy.forEach(file => {
        const src = path.join(projectRoot, file);
        const dest = path.join(projectRoot, 'www', file);
        if (fs.existsSync(src)) {
            fs.copyFileSync(src, dest);
            console.log(`✅ Copied ${file} to www/`);
        }
    });

    // Step 2: Sync Capacitor for iOS
    if (!runCommand('npx cap sync ios', 'Syncing Capacitor for iOS')) {
        console.log('⚠️ Capacitor sync failed, but continuing...');
    }

    // Step 3: Try to build with Capacitor
    console.log('🔨 Attempting to build IPA...');

    try {
        // Try Capacitor build
        execSync('npx cap build ios --no-sync', { stdio: 'inherit', cwd: projectRoot });
        console.log('✅ IPA project prepared successfully!');
    } catch (capError) {
        console.log('⚠️ Capacitor build failed, trying Xcode...');

        try {
            // Try opening in Xcode
            execSync('npx cap open ios', { stdio: 'inherit', cwd: projectRoot });
            console.log('✅ Opened in Xcode - manually build/archive from there');
        } catch (xcodeError) {
            console.log('⚠️ Could not open Xcode automatically');
            console.log('💡 Manual steps:');
            console.log('1. Run: npx cap open ios');
            console.log('2. Open ios/App/App.xcworkspace in Xcode');
            console.log('3. Select device/simulator');
            console.log('4. Product → Build');
            console.log('5. Product → Archive for distribution');
        }
    }

    // Step 4: Check for IPA
    const iosBuildDir = path.join(projectRoot, 'ios', 'App', 'build');
    if (fs.existsSync(iosBuildDir)) {
        console.log('\n🎉 iOS build prepared!');
        console.log(`📍 Build directory: ${iosBuildDir}`);
        console.log('\n📱 Next steps:');
        console.log('1. Open ios/App/App.xcworkspace in Xcode');
        console.log('2. Select your development team');
        console.log('3. Build → Archive');
        console.log('4. Distribute → Ad Hoc or Development');
        console.log('5. Install IPA on device via Xcode or TestFlight');
    } else {
        console.log('\n⚠️ Build directory not found');
        console.log('💡 Try: npx cap open ios (to open in Xcode)');
    }

    console.log('\n📋 Distribution Options:');
    console.log('• TestFlight: Free, Apple-reviewed');
    console.log('• Ad Hoc: Direct install (100 devices)');
    console.log('• Enterprise: Unlimited internal distribution');
    console.log('• App Store: Public distribution');
}

buildSimpleIPA().catch(console.error);