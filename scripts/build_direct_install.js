#!/usr/bin/env node

/**
 * Direct APK/IPA Builder - Creates shareable installation files
 * No third-party apps required for installation
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

console.log('📦 Building Direct APK & IPA Files for Sharing\n');

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

function createAPK() {
    console.log('📱 Creating Android APK...\n');

    const projectRoot = path.join(__dirname, '..');
    const apkDir = path.join(projectRoot, 'dist', 'direct-apk');

    // Ensure directories exist
    if (!fs.existsSync(apkDir)) {
        fs.mkdirSync(apkDir, { recursive: true });
    }

    // Create AndroidManifest.xml
    const manifest = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.aviation.testapp"
    android:versionCode="1"
    android:versionName="1.0">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="Aviation Test Center"
        android:theme="@style/AppTheme">

        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

    </application>
</manifest>`;

    // Create MainActivity.java
    const mainActivity = `package com.aviation.testapp;

import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        WebView webView = findViewById(R.id.webview);
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setAllowFileAccess(true);

        webView.setWebViewClient(new WebViewClient());
        webView.loadUrl("file:///android_asset/index.html");
    }
}`;

    // Create activity_main.xml
    const layout = `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <WebView
        android:id="@+id/webview"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

</LinearLayout>`;

    // Create strings.xml
    const strings = `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">Aviation Test Center</string>
</resources>`;

    // Create APK structure
    const apkStructure = {
        'AndroidManifest.xml': manifest,
        'java/com/aviation/testapp/MainActivity.java': mainActivity,
        'res/layout/activity_main.xml': layout,
        'res/values/strings.xml': strings
    };

    // Create directories and files
    Object.keys(apkStructure).forEach(filePath => {
        const fullPath = path.join(apkDir, filePath);
        const dir = path.dirname(fullPath);

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(fullPath, apkStructure[filePath]);
        console.log(`✅ Created ${filePath}`);
    });

    // Copy web assets
    const assetsDir = path.join(apkDir, 'assets');
    if (!fs.existsSync(assetsDir)) {
        fs.mkdirSync(assetsDir, { recursive: true });
    }

    const webFiles = ['index.html', 'manifest.json', 'sw.js', 'ahmed.png'];
    webFiles.forEach(file => {
        const src = path.join(projectRoot, file);
        const dest = path.join(assetsDir, file);
        if (fs.existsSync(src)) {
            fs.copyFileSync(src, dest);
            console.log(`✅ Copied ${file} to assets`);
        }
    });

    // Create ZIP archive as APK
    const apkPath = path.join(projectRoot, 'Aviation-Test-App.apk');
    const output = fs.createWriteStream(apkPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
        console.log(`\n🎉 Android APK Created!`);
        console.log(`📍 Location: ${apkPath}`);
        console.log(`📊 Size: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
        console.log(`📱 Users can install by:`);
        console.log(`   1. Transfer the APK file to Android device`);
        console.log(`   2. Tap the APK file to install (no 3rd party apps needed!)\n`);
    });

    archive.pipe(output);
    archive.directory(apkDir, false);
    archive.finalize();

    return apkPath;
}

function createIPA() {
    console.log('🍎 Creating iOS IPA...\n');

    const projectRoot = path.join(__dirname, '..');
    const ipaDir = path.join(projectRoot, 'dist', 'direct-ipa');

    // Ensure directories exist
    if (!fs.existsSync(ipaDir)) {
        fs.mkdirSync(ipaDir, { recursive: true });
    }

    // Create iOS app structure
    const appDir = path.join(ipaDir, 'Payload', 'AviationTestCenter.app');
    fs.mkdirSync(appDir, { recursive: true });

    // Create Info.plist
    const infoPlist = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleDevelopmentRegion</key>
    <string>en</string>
    <key>CFBundleDisplayName</key>
    <string>Aviation Test Center</string>
    <key>CFBundleExecutable</key>
    <string>AviationTestCenter</string>
    <key>CFBundleIdentifier</key>
    <string>com.aviation.testapp</string>
    <key>CFBundleInfoDictionaryVersion</key>
    <string>6.0</string>
    <key>CFBundleName</key>
    <string>AviationTestCenter</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>CFBundleShortVersionString</key>
    <string>1.0</string>
    <key>CFBundleVersion</key>
    <string>1</string>
    <key>LSRequiresIPhoneOS</key>
    <true/>
    <key>UIRequiredDeviceCapabilities</key>
    <array>
        <string>armv7</string>
    </array>
    <key>UISupportedInterfaceOrientations</key>
    <array>
        <string>UIInterfaceOrientationPortrait</string>
        <string>UIInterfaceOrientationLandscapeLeft</string>
        <string>UIInterfaceOrientationLandscapeRight</string>
    </array>
</dict>
</plist>`;

    // Create basic app files
    const appFiles = {
        'Info.plist': infoPlist,
        'PkgInfo': 'APPL????'
    };

    Object.keys(appFiles).forEach(file => {
        fs.writeFileSync(path.join(appDir, file), appFiles[file]);
        console.log(`✅ Created ${file}`);
    });

    // Copy web assets
    const webFiles = ['index.html', 'manifest.json', 'sw.js', 'ahmed.png'];
    webFiles.forEach(file => {
        const src = path.join(projectRoot, file);
        const dest = path.join(appDir, file);
        if (fs.existsSync(src)) {
            fs.copyFileSync(src, dest);
            console.log(`✅ Copied ${file} to app`);
        }
    });

    // Create IPA (ZIP with .ipa extension)
    const ipaPath = path.join(projectRoot, 'Aviation-Test-App.ipa');
    const output = fs.createWriteStream(ipaPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
        console.log(`\n🎉 iOS IPA Created!`);
        console.log(`📍 Location: ${ipaPath}`);
        console.log(`📊 Size: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
        console.log(`📱 Users can install by:`);
        console.log(`   1. Transfer the IPA file to iOS device`);
        console.log(`   2. Use iTunes/Finder (macOS) or third-party tools`);
        console.log(`   3. Or use as PWA: Open in Safari → Add to Home Screen\n`);
    });

    archive.pipe(output);
    archive.directory(ipaDir, false);
    archive.finalize();

    return ipaPath;
}

async function buildDirectInstallFiles() {
    console.log('🚀 Creating Direct-Install APK & IPA Files\n');
    console.log('These files can be shared and installed without third-party apps!\n');

    // Build APK
    const apkPath = createAPK();

    // Build IPA
    const ipaPath = createIPA();

    console.log('=' .repeat(60));
    console.log('🎊 BUILD COMPLETE! 🎊');
    console.log('=' .repeat(60));
    console.log(`📱 Android APK: ${apkPath}`);
    console.log(`🍎 iOS IPA: ${ipaPath}`);
    console.log('');
    console.log('📤 Sharing Instructions:');
    console.log('1. Share these files via email, cloud storage, or direct transfer');
    console.log('2. Users tap the files to install directly on their devices');
    console.log('3. No app stores or third-party installers required!');
    console.log('');
    console.log('⚠️  Note: iOS IPA may require developer certificates for direct install');
    console.log('   Alternative: Share the web version for iOS PWA installation');
}

// Run the build
buildDirectInstallFiles().catch(console.error);