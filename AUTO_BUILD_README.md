# Aviation Test App - Auto-Build System

## 🚀 Quick Start

### For Automatic Updates (Recommended)
1. **Run the auto-updater**: Double-click `auto_update.bat`
2. **Edit `testData_complete.js`** with new questions
3. **Save the file** - apps rebuild automatically!
4. **Share the updated files** from the output folder

### For Manual Builds
1. **Update questions** in `testData_complete.js`
2. **Run build script**: Double-click `build_apps.bat`
3. **Share the generated files**

## 📁 File Locations

### Input Files
- `testData_complete.js` - Your aviation questions database
- `index.html` - Main app interface
- `sw.js` - Service worker for offline functionality

### Output Files (Ready for Sharing)
```
📦 Aviation-Test-App_LATEST.apk  (485 KB) - Android install file
📦 Aviation-Test-App_LATEST.ipa  (484 KB) - iOS install file
📦 Aviation-Test-App_YYYYMMDD_HHMMSS.apk  - Versioned APK
📦 Aviation-Test-App_YYYYMMDD_HHMMSS.ipa  - Versioned IPA
```

## 🔄 Auto-Update Features

### What Happens Automatically:
- ✅ **Version tracking** - Each change gets a unique version number
- ✅ **APK/IPA rebuilding** - Both platforms updated simultaneously
- ✅ **File organization** - Latest files always available for sharing
- ✅ **User notifications** - Apps notify users when updates are available

### Update Notifications in Apps:
- 📱 **Android**: Push notifications when app is closed
- 🍎 **iOS**: PWA notifications and in-app alerts
- 🔄 **Auto-refresh**: Users can update with one tap

## 📱 User Installation

### Android Users:
1. Receive the `.apk` file
2. Tap to install (no Play Store needed!)
3. App works offline with all features

### iOS Users:
1. Receive the `.ipa` file
2. Use iTunes/Finder or third-party tools
3. Or use the web version: Open in Safari → Add to Home Screen

## 🛠️ Advanced Usage

### Manual Version Update
```bash
npm run update-version
```

### Force Rebuild
```bash
npm run build:direct-install
```

### Monitor File Changes
```bash
# Run once to start monitoring
auto_update.bat
```

## 📊 Version History

Each build creates timestamped files:
- `Aviation-Test-App_20251214_143052.apk`
- `Aviation-Test-App_20251214_143052.ipa`

Keep these for rollback if needed!

## 🎯 Similar to Aviation Manager

This system provides:
- **Automatic updates** when data changes
- **Cross-platform builds** (Android + iOS)
- **Direct installation** without app stores
- **Offline functionality** with service worker
- **Push notifications** for user engagement
- **Version management** for updates

## 🚨 Important Notes

- **Windows only**: BAT files require Windows
- **Node.js required**: Install from nodejs.org
- **File monitoring**: `auto_update.bat` runs continuously
- **Large files**: APK/IPA are ~500KB each

## 📞 Support

If you encounter issues:
1. Check that Node.js is installed
2. Ensure you're in the project root directory
3. Verify `testData_complete.js` exists and is valid JSON

---

**Happy Testing! ✈️**