# Build Tools Guide

This guide explains how to build APK and IPA files for the Aviation Test App.

## 📦 Building Android APK

### Prerequisites
- Node.js installed
- Android SDK installed
- ANDROID_HOME environment variable set
- Gradle (comes with Android Studio)

### Quick Build

**Debug APK** (for testing):
```bash
npm run build:apk
```

**Release APK** (for production):
```bash
npm run build:apk:release
```

### Output Location
- Debug APK: `aviation-test-app.apk` (copied to root)
- Original: `android/app/build/outputs/apk/debug/app-debug.apk`

### Installing APK
```bash
# Connect device via USB and enable USB debugging
adb install aviation-test-app.apk

# Or share the APK file and install manually on device
```

## 📱 Building iOS IPA

### Prerequisites
- macOS with Xcode installed
- Apple Developer Account
- Valid signing certificates and provisioning profiles

### Quick Build

**Open in Xcode**:
```bash
npm run open:ios
```

**Automated Build** (requires certificates):
```bash
npm run build:ios
```

### Manual Build (Recommended)

1. Open Xcode:
   ```bash
   npm run open:ios
   ```

2. In Xcode:
   - Select **Signing & Capabilities** tab
   - Choose your development team
   - Ensure bundle identifier is unique

3. Archive:
   - Product > Archive
   - Wait for build to complete

4. Export IPA:
   - Window > Organizer
   - Select your archive
   - Click **Distribute App**
   - Choose distribution method:
     - **Development**: For testing on registered devices
     - **Ad Hoc**: For limited distribution
     - **App Store**: For App Store submission

5. Save IPA file

### Distribution Methods

**Development**:
- For testing on your own devices
- Requires device UDID registered in Apple Developer portal

**Ad Hoc**:
- For beta testing (up to 100 devices)
- Requires TestFlight or manual distribution

**App Store**:
- For public release
- Requires App Store submission and review

## 🔧 Troubleshooting

### Android Issues

**Gradle build failed**:
```bash
cd android
./gradlew clean
cd ..
npm run build:apk
```

**SDK not found**:
- Install Android Studio
- Set ANDROID_HOME: `C:\Users\YourName\AppData\Local\Android\Sdk`
- Add to PATH: `%ANDROID_HOME%\platform-tools`

**Signing errors**:
- For debug builds, no signing required
- For release builds, create keystore:
  ```bash
  keytool -genkey -v -keystore release.keystore -alias aviation-test -keyalg RSA -keysize 2048 -validity 10000
  ```

### iOS Issues

**No developer team**:
- Open Xcode
- Preferences > Accounts
- Add your Apple ID
- Select team in project settings

**Provisioning profile errors**:
- Xcode > Preferences > Accounts
- Manage Certificates > Download Manual Profiles
- Or use Automatic signing

**Archive failed**:
- Ensure all dependencies are installed: `npm install`
- Sync Capacitor: `npm run sync`
- Clean build folder: Product > Clean Build Folder

## 📤 Deploying to GitHub

Before building, ensure you've committed and pushed your changes:

```bash
# Add all changes
git add .

# Commit with message
git commit -m "Your commit message"

# Push to GitHub
git push origin main

# Or use the shortcut
npm run deploy
```

## 🚀 Release Checklist

### Before Building:
- [ ] Test app thoroughly
- [ ] Update version number in package.json
- [ ] Update version in capacitor.config.json
- [ ] Commit all changes to Git
- [ ] Push to GitHub

### Android Release:
- [ ] Create release keystore (if first time)
- [ ] Build release APK
- [ ] Sign APK
- [ ] Test on multiple devices
- [ ] Upload to Google Play Console

### iOS Release:
- [ ] Update provisioning profiles
- [ ] Archive in Xcode
- [ ] Validate archive
- [ ] Export IPA
- [ ] Upload to App Store Connect
- [ ] Submit for review

## 📊 Build Commands Summary

```bash
# Sync Capacitor
npm run sync

# Build Android APK (debug)
npm run build:apk

# Build Android APK (release)
npm run build:apk:release

# Open iOS in Xcode
npm run open:ios

# Build iOS IPA
npm run build:ios

# Deploy to GitHub
npm run deploy
```

## 🔐 Security Notes

- **Never commit** keystore files or passwords to Git
- **Never commit** provisioning profiles or certificates
- Store sensitive files securely
- Use environment variables for secrets
- `.gitignore` already configured to exclude sensitive files

## 📝 Version Management

Update version in these files before release:
1. `package.json` - version field
2. `capacitor.config.json` - version field
3. `android/app/build.gradle` - versionCode and versionName
4. `ios/App/App.xcodeproj/project.pbxproj` - CFBundleShortVersionString

## 🆘 Need Help?

- **Android**: [Capacitor Android Documentation](https://capacitorjs.com/docs/android)
- **iOS**: [Capacitor iOS Documentation](https://capacitorjs.com/docs/ios)
- **General**: Check the error logs in the terminal
- **Issues**: Create an issue on GitHub repository
