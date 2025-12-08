# How to Send and Run Aviation Test App on Any Device

## Option 1: Send Complete Folder (RECOMMENDED - Full Features)

### What to Send:
1. Zip the entire `aviation-test-app` folder
2. Send the ZIP file via:
   - Email
   - USB drive
   - Cloud storage (Google Drive, Dropbox, OneDrive)
   - WhatsApp/Telegram
   - AirDrop (Mac/iPhone)

### On Receiving Device:

#### Windows:
1. Extract the ZIP folder
2. Double-click `index.html` to open in browser
3. **For full features**: Right-click empty space → Open in Terminal → type:
   ```
   python -m http.server 8000
   ```
   Then open browser to: `http://localhost:8000`

#### Mac:
1. Extract the ZIP folder
2. Double-click `index.html` to open in Safari
3. **For full features**: Open Terminal → navigate to folder → type:
   ```
   python3 -m http.server 8000
   ```
   Then open browser to: `http://localhost:8000`

#### Android:
1. Extract the ZIP folder using any file manager
2. Install "Simple HTTP Server" app from Play Store
3. Point it to the aviation-test-app folder
4. Open in browser
5. **OR** just open `index.html` with Chrome (limited features)

#### iPhone/iPad:
1. Extract the ZIP folder
2. Use "Documents" app by Readdle (free)
3. Open `index.html` with built-in browser
4. **For full features**: Use "WebDav Server" app

---

## Option 2: Single HTML File (Limited - No Corrections)

If you want a SINGLE file that works everywhere but without the corrections feature:

### Instructions:
1. Send only the file: `aviation-standalone.html` (I can create this)
2. Recipient opens it directly - works on ANY device
3. All features work EXCEPT the corrections from "fixed questions.htm"

---

## Option 3: Host Online (Access Anywhere with Internet)

### Easiest - Use Netlify Drop:
1. Go to: https://app.netlify.com/drop
2. Drag the `aviation-test-app` folder
3. Get a URL like: `https://aviation-test-xxx.netlify.app`
4. Share this URL - works on ALL devices with internet!

### GitHub Pages (Free Forever):
1. Create GitHub account (free)
2. Create new repository
3. Upload the aviation-test-app files
4. Enable GitHub Pages in Settings
5. Get URL: `https://yourusername.github.io/aviation-test-app`

---

## What Works Where?

| Feature | Double-click HTML | With Local Server | Hosted Online | Android APK |
|---------|------------------|-------------------|---------------|-------------|
| Take tests | ✅ YES | ✅ YES | ✅ YES | ✅ YES |
| Save results | ✅ YES | ✅ YES | ✅ YES | ✅ YES |
| Search | ✅ YES | ✅ YES | ✅ YES | ✅ YES |
| Study mode | ✅ YES | ✅ YES | ✅ YES | ✅ YES |
| Print tests | ✅ YES | ✅ YES | ✅ YES | ✅ YES |
| Icons/logos | ✅ YES* | ✅ YES | ✅ YES | ✅ YES |
| Corrections file | ❌ NO | ✅ YES | ✅ YES | ✅ YES |
| Offline mode | ❌ NO | ✅ YES | ✅ YES | ✅ YES |

*Requires internet first time for icons

---

## Recommended Method by Device:

### Sending to Windows/Mac User:
→ Send ZIP of folder + tell them to double-click index.html

### Sending to Android User:
→ Send APK file (once you build it) - easiest!
→ OR send ZIP + tell them to use file manager

### Sending to iPhone User:
→ Host online (Netlify) and share URL
→ OR send ZIP + tell them to use Documents app

### For Maximum Compatibility:
→ Host on Netlify (5 minutes setup, works forever)
