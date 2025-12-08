# ✈️ Aviation Test App - AI-Enabled Version

## 🎯 What's New - AI Search Feature

This version includes **intelligent AI search** powered by Google Gemini. When you search for a question that's not in the question bank, the app automatically queries AI to provide an answer with explanation!

### 🤖 AI Features

- ✅ **Pre-configured Gemini API** - Works out of the box
- ✅ **Automatic fallback** - AI activates only when no local results found
- ✅ **Smart answers** - Aviation-specific responses with explanations
- ✅ **Privacy-first** - API key stored only in your browser
- ✅ **No setup required** - Opens and works immediately

---

## 📦 Distribution Files

### Option 1: Standalone File (Easiest!)
**File:** `aviation-standalone-ai-20251106-0404.zip` (350 KB)

**Contains:** Single HTML file (2.45 MB uncompressed)

**How to use:**
1. Extract the zip
2. Double-click `STANDALONE.html`
3. That's it! No server, no installation needed

**Best for:**
- Quick sharing via email/USB
- Offline use on any device
- No technical setup required

---

### Option 2: Full Portable Build
**File:** `aviation-test-app-portable-ai-20251106-0403.zip` (1.86 MB)

**Contains:** Complete app with offline support

**How to use:**
1. Extract the zip to any folder
2. Option A: Double-click `index.html` (works immediately)
3. Option B: Run a local server for full PWA features

**Best for:**
- Installing on multiple computers
- Full offline PWA experience
- Development/customization

---

## 🚀 Quick Start

### Windows
1. Extract the zip file
2. Double-click `STANDALONE.html` or `index.html`
3. Start searching and testing!

### Mac/Linux
1. Extract the zip file
2. Open `STANDALONE.html` or `index.html` in any browser
3. Done!

### Mobile (Android/iOS)
1. Transfer the `STANDALONE.html` file to your device
2. Open with any browser (Chrome, Safari, Firefox)
3. Works offline!

---

## 🔍 Testing the AI Feature

1. **Open the app** (any version)
2. Click the **Search** tab
3. Search for a question not in the bank, like:
   - "What causes lift on an aircraft wing?"
   - "Explain the Coriolis effect in aviation"
   - "What is hypoxia?"
4. If not in the database, you'll see an **AI-generated answer** with explanation

---

## 📊 App Statistics

- **Question Bank:** 1,785 questions
- **Categories:** 13 (Aircraft General, Air Law, Navigation, etc.)
- **AI Provider:** Google Gemini (gemini-1.5-flash)
- **Offline Support:** Yes (with service worker)
- **Mobile Friendly:** Yes

---

## 🛠️ AI Settings (Optional)

The app comes pre-configured with a Gemini API key, but you can customize:

1. Click the **🤖 robot icon** in the search bar
2. Choose provider (OpenAI or Gemini)
3. Enter your own API key (optional)
4. Adjust model settings

**Get your own free API key:**
- [OpenAI API Keys](https://platform.openai.com/api-keys)
- [Google AI Studio](https://aistudio.google.com/app/apikey)

---

## 🔒 Privacy & Security

### API Key Storage
- Stored in **browser localStorage only**
- Never sent to any server except Google Gemini API
- Only you have access to your browser's storage

### Data Privacy
- All questions stored **locally** in the app
- No tracking or analytics
- No data sent to external servers (except AI queries)
- Works completely offline (except AI features)

---

## 📱 Progressive Web App (PWA)

The full portable build includes PWA support:

1. Open `index.html` via a local server or HTTPS
2. Click "Install" in your browser
3. Use like a native app with offline support

**To run a local server:**

**Python:**
```bash
python -m http.server 8000
```

**Node.js:**
```bash
npx http-server -p 8000
```

**PHP:**
```bash
php -S localhost:8000
```

Then visit: `http://localhost:8000`

---

## 📋 Features Overview

### Study Mode
- Review questions at your own pace
- Immediate feedback
- Track your progress

### Test Mode
- Timed exams
- Realistic test environment
- Detailed results and analytics

### Search Mode
- Fast text search
- **NEW:** AI-powered fallback
- Category filtering

### Camera Search
- Take a photo of a question
- Optical character recognition
- Find matching questions

---

## 🆕 Version History

### v1.4 - AI-Enabled (Nov 6, 2025)
- ✅ Added Google Gemini AI integration
- ✅ Automatic AI fallback for search
- ✅ Pre-configured API key
- ✅ Enhanced no-results experience
- ✅ Updated all service workers
- ✅ Rebuilt standalone with AI

### v1.3 - AGK Import
- Added Aircraft General Knowledge questions from Word import
- Runtime question merging

### v1.2 - Search Enhancement
- Improved search algorithm
- Better phrase matching

---

## 📞 Support

### Common Issues

**Q: AI search isn't working**
A: Check that you have internet connection. AI queries require online access.

**Q: Camera search not working**
A: Camera features require HTTPS or localhost. Use a local server or the standalone version.

**Q: Service worker errors**
A: Clear browser cache and reload. The app will re-cache all files.

**Q: Can I use my own API key?**
A: Yes! Click the 🤖 robot icon in search and enter your own key.

---

## 📄 License

This is an educational tool for aviation students and enthusiasts.

---

## 🎓 Perfect For

- ✅ Student pilots studying for exams
- ✅ Aviation enthusiasts
- ✅ Flight instructors
- ✅ Anyone preparing for aviation knowledge tests

---

**Enjoy your AI-enhanced aviation test preparation! 🚁✈️**

*Last updated: November 6, 2025*
