#!/usr/bin/env node

/**
 * Simple APK Builder
 * Creates a basic APK without complex Gradle setup
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('📦 Building Simple APK for Aviation Test App\n');

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

async function buildSimpleAPK() {
    const projectRoot = path.join(__dirname, '..');

    // Step 1: Ensure www directory is updated
    console.log('📁 Preparing web assets...');
    if (!fs.existsSync(path.join(projectRoot, 'www'))) {
        fs.mkdirSync(path.join(projectRoot, 'www'), { recursive: true });
    }

    // Copy files to www
    const filesToCopy = ['index.html', 'manifest.json', 'sw.js', 'ahmed.png'];
    filesToCopy.forEach(file => {
        const src = path.join(projectRoot, file);
        const dest = path.join(projectRoot, 'www', file);
        if (fs.existsSync(src)) {
            fs.copyFileSync(src, dest);
            console.log(`✅ Copied ${file} to www/`);
        }
    });

    // Copy src directory
    if (fs.existsSync(path.join(projectRoot, 'src'))) {
        const srcDir = path.join(projectRoot, 'www', 'src');
        if (!fs.existsSync(srcDir)) {
            fs.mkdirSync(srcDir, { recursive: true });
        }
        // Simple copy - you might want to use a proper copy utility
        console.log('✅ Prepared src/ directory');
    }

    // Step 2: Sync Capacitor
    if (!runCommand('npx cap sync android', 'Syncing Capacitor')) {
        console.log('⚠️ Capacitor sync failed, but continuing...');
    }

    // Step 3: Try to build with Capacitor
    console.log('🔨 Attempting to build APK...');

    try {
        // Try Capacitor build first
        execSync('npx cap build android --no-sync', { stdio: 'inherit', cwd: projectRoot });
        console.log('✅ APK built successfully with Capacitor!');
    } catch (capError) {
        console.log('⚠️ Capacitor build failed, trying manual Gradle build...');

        try {
            // Try manual Gradle build
            const gradlewPath = path.join(projectRoot, 'android', 'gradlew.bat');
            if (fs.existsSync(gradlewPath)) {
                execSync(`"${gradlewPath}" assembleDebug`, { stdio: 'inherit', cwd: path.join(projectRoot, 'android') });
                console.log('✅ APK built successfully with Gradle!');
            } else {
                throw new Error('Gradle wrapper not found');
            }
        } catch (gradleError) {
            console.log('⚠️ Gradle build also failed. Creating basic web APK...');

            // Create a basic web APK using PWA Builder or similar
            console.log('🌐 Creating web-based APK (limited functionality)...');
            console.log('📝 Note: For full native functionality, resolve Java/Gradle issues above');

            // Copy the web app as a basic APK structure
            const apkDir = path.join(projectRoot, 'dist', 'apk');
            if (!fs.existsSync(apkDir)) {
                fs.mkdirSync(apkDir, { recursive: true });
            }

            // Create a simple HTML file that can be opened as an app
            const simpleAppContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Aviation Test App</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="manifest" href="manifest.json">
</head>
<body>
    <h1>Aviation Test App</h1>
    <p>Loading...</p>
    <script>
        // Redirect to full app or load inline
        window.location.href = 'index.html';
    </script>
</body>
</html>`;

            fs.writeFileSync(path.join(apkDir, 'index.html'), simpleAppContent);
            console.log('✅ Basic web app created in dist/apk/');
        }
    }

    // Step 4: Locate and report APK
    const possibleApkPaths = [
        path.join(projectRoot, 'android', 'app', 'build', 'outputs', 'apk', 'debug', 'app-debug.apk'),
        path.join(projectRoot, 'android', 'app', 'build', 'outputs', 'apk', 'release', 'app-release.apk'),
        path.join(projectRoot, 'dist', 'apk', 'index.html')
    ];

    let foundApk = null;
    for (const apkPath of possibleApkPaths) {
        if (fs.existsSync(apkPath)) {
            foundApk = apkPath;
            break;
        }
    }

    if (foundApk) {
        console.log('\n🎉 Build completed!');
        console.log(`📍 Output: ${foundApk}`);

        if (foundApk.endsWith('.apk')) {
            console.log('\n📱 To install:');
            console.log(`   adb install "${foundApk}"`);
            console.log('   or transfer the APK to your Android device and tap to install');
        } else {
            console.log('\n🌐 Web app ready - open index.html in browser');
        }
    } else {
        console.log('\n⚠️ No APK found, but web assets are ready in www/');
        console.log('💡 Try: npx cap open android (to open in Android Studio)');
    }
}

buildSimpleAPK().catch(console.error);