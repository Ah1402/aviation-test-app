# Aviation Knowledge Test Center

A modern, interactive web application for aviation knowledge testing. This app transforms your comprehensive aviation test collection into a user-friendly, responsive testing platform.

## Features

### 🎯 Core Functionality
- **6 Test Categories**: Aircraft General Knowledge, Air Law, AON Aviation, Flight Planning, Operational Procedures, Radio Navigation
- **500+ Questions**: Comprehensive question database with detailed explanations
- **Timed Tests**: Configurable time limits with visual countdown
- **Progress Tracking**: Real-time progress indicators and completion status
- **Results Analytics**: Detailed scoring and performance history

### 🎨 Modern Interface
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Clean UI**: Modern, professional interface with intuitive navigation
- **Dark/Light Themes**: Comfortable viewing in any lighting condition
- **Accessibility**: Keyboard navigation and screen reader support

### 🚀 Advanced Features
- **Question Flagging**: Mark questions for review
- **Overview Modal**: Visual question grid with status indicators
- **Local Storage**: Automatic progress and results saving
- **Keyboard Shortcuts**: Quick navigation and answer selection
- **Print Support**: Generate test reports and study materials

## Getting Started

### Installation
1. Download or clone the aviation-test-app folder
2. Open `index.html` in your web browser
3. No server setup required - runs completely in the browser!

**Important:** If you don't see the latest updates (Radio Navigation fixes, camera search, etc.), open `CLEAR_CACHE.html` to force a cache refresh, or press `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac) for a hard refresh.

### Build an Android APK (Capacitor)

This project is pre-wrapped with Capacitor and includes an Android project under `android/`.

Prerequisites:
- Android Studio (includes Android SDK and Gradle)
- JDK 17 (or version supported by your Android Studio)

Steps:
1. Open Android Studio
2. Choose “Open an existing project” and select the `android/` folder in this repo
3. Let Gradle sync finish and install any suggested SDKs
4. To test on a device/emulator: click Run ▶
5. To build an APK: Build > Build Bundle(s)/APK(s) > Build APK(s)

Where to find the APK:
- Android Studio will show a notification with a link when the build finishes, typically under:
    `android/app/build/outputs/apk/debug/app-debug.apk`

If you change web files (index.html or files under `src/`), sync them into the Android app assets with:

```powershell
npx cap copy android
```

You can then rebuild in Android Studio.

### Usage
1. **Select a Category**: Choose from 6 aviation knowledge areas
2. **Take a Test**: Answer questions with multiple choice options
3. **Track Progress**: Monitor completion with visual indicators
4. **Review Results**: View detailed scoring and performance analytics
5. **Study Mode**: Flag questions for later review

## Keyboard Shortcuts

During a test, use these shortcuts for faster navigation:
- `←` `→` : Navigate between questions
- `1` `2` `3` `4` : Select answer options A, B, C, D
- `Ctrl+F` : Toggle question flag
- `Ctrl+O` : Open question overview
- `Esc` : Close modals

## File Structure

```
aviation-test-app/
├── index.html                 # Main application file
├── README.md                  # This file
├── src/
│   ├── styles/
│   │   └── main.css          # Application styles
│   ├── scripts/
│   │   ├── main.js           # Main application logic
│   │   ├── testEngine.js     # Test management
│   │   ├── ui.js             # UI management
│   │   ├── dataExtractor.js  # Question extraction utility
│   │   └── init.js           # Application initialization
│   └── data/
│       └── testData.js       # Question database
```

## Adding More Questions

The app currently includes sample questions from each category. To add more questions from your original HTML file:

### Method 1: Automatic Extraction (Recommended)
1. Open your browser's developer console
2. Load the `dataExtractor.js` script
3. Copy HTML content from your original file
4. Use the extraction functions to convert to JSON format
5. Add to `testData.js`

### Method 2: Manual Addition
Edit `src/data/testData.js` and add questions following this format:

```javascript
{
    id: 1,
    text: 'Question text here?',
    options: [
        'Option A',
        'Option B', 
        'Option C',
        'Option D'
    ],
    correct: 1, // Index of correct answer (0=A, 1=B, 2=C, 3=D)
    explanation: 'Detailed explanation of the correct answer.'
}
```

## Customization

### Styling
- Edit `src/styles/main.css` to customize colors, fonts, and layout
- CSS custom properties (variables) make theme changes easy
- Responsive breakpoints can be adjusted for different devices

### Test Configuration
- Modify time limits in `testData.js`
- Add new test categories following the existing structure
- Customize scoring and progress calculations in `testEngine.js`

### Features
- Add new question types (true/false, multiple select, etc.)
- Implement user accounts and cloud sync
- Add study mode with spaced repetition
- Create performance analytics dashboard

## Technical Details

### Browser Compatibility
- Modern browsers (Chrome 70+, Firefox 65+, Safari 12+, Edge 79+)
- Progressive Web App features for mobile installation
- Offline capability with service worker (can be added)

### Performance
- Lazy loading for large question sets
- Efficient DOM manipulation and memory management
- Optimized for smooth animations and interactions
- Local storage for fast data access

### Security
- No server-side components required
- All data stored locally in browser
- No external API calls or data transmission
- Safe for use in secure environments

## Original Data Source

This application was created to modernize and enhance the aviation knowledge tests from your original `617.htm` file, which contained:

- Aircraft General Knowledge Tests (5 tests, 100 questions)
- Air Law Tests (5 tests, 100 questions)  
- AON Aviation Knowledge Tests (7 tests, 140 questions)
- Flight Planning and Monitoring Tests (2 tests, 40 questions)
- Operational Procedures Tests (5 tests, 100 questions)
- Radio Navigation Tests (5 tests, 100 questions)

## Benefits Over Original HTML

✅ **Modern Interface**: Clean, responsive design vs. Word-generated HTML
✅ **Interactive Testing**: Timed tests with progress tracking vs. static content
✅ **Better Organization**: Categorized tests vs. single long document
✅ **Progress Tracking**: Save results and track improvement over time
✅ **Mobile Friendly**: Works on all devices vs. desktop-only
✅ **Fast Loading**: Optimized performance vs. heavy Word formatting
✅ **Extensible**: Easy to add new questions and features

## Support

For questions or issues:
1. Check the browser console for error messages
2. Verify all files are in the correct directory structure
3. Ensure JavaScript is enabled in your browser
4. Test with a different browser to isolate issues

## License

This application is provided as-is for educational and professional use. The aviation knowledge questions remain the property of their original sources.

---

**Ready to master your aviation knowledge?** Open `index.html` and start testing! ✈️