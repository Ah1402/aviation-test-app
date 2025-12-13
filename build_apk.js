#!/usr/bin/env node

/**
 * APK Builder Script
 * Builds Android APK for the Aviation Test App
 * 
 * Usage: npm run build:apk
 * Requirements: Android SDK, Gradle
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('📦 Building APK for Aviation Test App\n');

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

async function buildAPK() {
    // Step 1: Sync Capacitor
    if (!runCommand('npx cap sync android', 'Syncing Capacitor')) {
        process.exit(1);
    }

    // Step 2: Build Debug APK
    console.log('🔨 Building Debug APK...');
    const gradlewPath = process.platform === 'win32' ? 
        '.\\android\\gradlew.bat' : './android/gradlew';
    
    if (!fs.existsSync(path.join(__dirname, 'android', 'gradlew'))) {
        console.error('❌ Gradle wrapper not found. Please ensure Android project is initialized.');
        process.exit(1);
    }

    if (!runCommand(`${gradlewPath} assembleDebug`, 'Building Debug APK')) {
        console.log('\nℹ️  Trying alternative build method...');
        if (!runCommand('npx cap build android', 'Building with Capacitor')) {
            process.exit(1);
        }
    }

    // Step 3: Locate the APK
    const apkPath = path.join(__dirname, 'android', 'app', 'build', 'outputs', 'apk', 'debug', 'app-debug.apk');
    
    if (fs.existsSync(apkPath)) {
        const stats = fs.statSync(apkPath);
        const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
        
        console.log('\n🎉 APK Built Successfully!');
        console.log(`📍 Location: ${apkPath}`);
        console.log(`📊 Size: ${sizeInMB} MB`);
        
        // Copy to root for easy access
        const outputPath = path.join(__dirname, 'aviation-test-app.apk');
        fs.copyFileSync(apkPath, outputPath);
        console.log(`📦 Copied to: ${outputPath}`);
        
        console.log('\n📱 To install on device:');
        console.log('   adb install aviation-test-app.apk');
    } else {
        console.error('❌ APK not found at expected location');
        console.log('ℹ️  Check android/app/build/outputs/apk/ for the APK file');
        process.exit(1);
    }
}

// Build Release APK function
async function buildReleaseAPK() {
    console.log('🔨 Building Release APK (requires signing)...\n');
    
    const keystorePath = path.join(__dirname, 'android', 'app', 'release.keystore');
    if (!fs.existsSync(keystorePath)) {
        console.log('⚠️  No release keystore found. Creating one...');
        console.log('ℹ️  You will be prompted for keystore password and alias information.\n');
        
        // Create keystore
        const keytoolCmd = `keytool -genkey -v -keystore ${keystorePath} -alias aviation-test -keyalg RSA -keysize 2048 -validity 10000`;
        if (!runCommand(keytoolCmd, 'Creating release keystore')) {
            console.log('❌ Failed to create keystore. Please create manually.');
            process.exit(1);
        }
    }

    const gradlewPath = process.platform === 'win32' ? 
        '.\\android\\gradlew.bat' : './android/gradlew';
    
    if (!runCommand(`${gradlewPath} assembleRelease`, 'Building Release APK')) {
        process.exit(1);
    }

    const releaseApkPath = path.join(__dirname, 'android', 'app', 'build', 'outputs', 'apk', 'release', 'app-release-unsigned.apk');
    
    if (fs.existsSync(releaseApkPath)) {
        console.log('\n🎉 Release APK Built!');
        console.log(`📍 Location: ${releaseApkPath}`);
        console.log('\n⚠️  Note: This APK is unsigned. For production:');
        console.log('1. Sign the APK with your release keystore');
        console.log('2. Align and optimize with zipalign');
        console.log('3. Upload to Google Play Console');
    }
}

// Main execution
const buildType = process.argv[2] || 'debug';

if (buildType === 'release') {
    buildReleaseAPK().catch(console.error);
} else {
    buildAPK().catch(console.error);
}
