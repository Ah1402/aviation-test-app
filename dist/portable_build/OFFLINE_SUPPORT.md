# Offline Support Added

## What Changed

The Aviation Test Center app now works fully offline! Here's what was implemented:

### 1. Service Worker (`sw.js`)
- Caches all app assets (HTML, CSS, JavaScript, data files)
- Implements cache-first strategy with network fallback
- Automatically updates when new versions are deployed
- Registered in `index.html` to activate on page load

### 2. Removed External Dependencies
**Before:**
- FontAwesome CDN
- Google Fonts CDN

**After:**
- Local minimal FontAwesome CSS (`src/assets/css/fontawesome-minimal.css`)
- System fonts (native to all devices)

### 3. Updated Files
- `index.html` - Service worker registration + local resources
- `src/styles/main.css` - System font stack
- `sw.js` - Complete offline caching strategy
- `www/` - Synced for Capacitor Android build

## How to Test Offline

### In Browser:
1. Open the app in a browser
2. Open DevTools (F12)
3. Go to Application > Service Workers
4. Check "Offline" checkbox
5. Refresh the page - app still works!

### In Android APK:
1. Open the app
2. Turn on Airplane mode
3. App continues to work perfectly

## Files Cached for Offline Use:
- index.html
- All CSS (main.css + fontawesome-minimal.css)
- All JavaScript files (testData, testEngine, ui, main, etc.)
- Corrections file (fixed questions.htm)

## Benefits:
✅ Works without internet connection
✅ Faster load times (cached assets)
✅ No external CDN dependencies
✅ Perfect for studying on planes, trains, or remote areas
✅ Reduced data usage

## For Android APK:
Run `npx cap copy android` to sync these changes to your Android build.

## Note on FontAwesome:
The app currently uses a minimal local FontAwesome CSS with only the icons used in the app. 
For full icon support, download the complete FontAwesome package from fontawesome.com and 
place the webfonts in `src/assets/fonts/`.
