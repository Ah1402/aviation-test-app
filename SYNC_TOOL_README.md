# 🚀 Sync and Deploy Tool

## What This Does

This tool automatically:
1. ✅ Syncs changes from `testData_complete.js` to `index.html`
2. ✅ Commits changes to Git
3. ✅ Pushes to GitHub
4. ✅ Deploys your app online

---

## 📝 How to Use

### Method 1: Double-Click (Easiest)
1. Edit questions in `testData_complete.js`
2. Save the file (`Ctrl+S`)
3. **Double-click `SYNC_AND_DEPLOY.bat`**
	 - For syncing `924.html` into `index.html`, you can run:
     
		 ```powershell
		 powershell -ExecutionPolicy Bypass -File .\SYNC_924.ps1
		 ```
	 - To re-index IDs in both `testData_complete.js` and `924.html` to a stable scheme:
     
		 ```powershell
		 powershell -ExecutionPolicy Bypass -File .\RE_ID.ps1
		 ```
4. Wait for "DEPLOYMENT COMPLETE!"
5. Visit https://ah1402.github.io/aviation-test-app/ (wait 2-3 min)

### Method 2: PowerShell
```powershell
.\SYNC_AND_DEPLOY.ps1
```

### Method 3: Right-Click
1. Right-click `SYNC_AND_DEPLOY.bat`
2. Click "Run as administrator" (optional)
3. Wait for completion

---

## 🎯 Workflow

**Before:**
```
You edit testData_complete.js
↓
Manually copy to index.html
↓
Git add, commit, push
↓
Wait for deployment
```

**Now:**
```
You edit testData_complete.js
↓
Double-click SYNC_AND_DEPLOY.bat
↓
DONE! ✅
```

---

## ⚠️ Important Notes

1. **Always edit `testData_complete.js`** (not index.html)
2. **Save your changes first** before running the tool
3. **Wait 2-3 minutes** after deployment for changes to appear online
4. **Hard refresh** browser: `Ctrl+Shift+R` to see changes

---

## 🔧 What Gets Synced

The tool syncs the entire `window.testData` section:
- All categories
- All tests
- All questions
- All answers
- All explanations

---

## 📊 Example Usage

```powershell
# Step 1: Edit questions
# Open testData_complete.js
# Find question: "What is V1?"
# Change answer from 0 to 1
# Save file

# Step 2: Run sync tool
.\SYNC_AND_DEPLOY.bat

# Output:
# [1/5] Reading testData_complete.js...
# [2/5] Reading index.html...
# [3/5] Syncing testData to index.html...
#    SUCCESS: testData synced to index.html!
# [4/5] Committing changes to Git...
#    Committed with message: Update questions - 2025-12-08 15:30:00
# [5/5] Pushing to GitHub...
#    SUCCESS: Changes pushed to GitHub!
#
# DEPLOYMENT COMPLETE!
# Your changes will be live in 2-3 minutes at:
# https://ah1402.github.io/aviation-test-app/
```

---

## 🐛 Troubleshooting

### "testData_complete.js not found"
- Make sure you're in the project folder
- Check file name spelling

### "Git push failed"
- Check internet connection
- GitHub might be down (check github.com)
- Run manually: `git pull && git push`

### "No changes to commit"
- You didn't save the file
- Or no actual changes were made
- Check if testData_complete.js has edits

### Changes not showing online
- Wait full 3 minutes
- Hard refresh: `Ctrl+Shift+R`
- Check GitHub Pages status at: https://github.com/Ah1402/aviation-test-app/actions

---

## 🎓 Advanced Usage

### Check what will be synced (dry run)
```powershell
# Compare files manually
git diff testData_complete.js
```

### Sync without pushing
Edit `SYNC_AND_DEPLOY.ps1` and comment out the push section.

### Custom commit message
Edit the script and change:
```powershell
$commitMessage = "Update questions - $timestamp"
```
to:
```powershell
$commitMessage = "Your custom message here"
```

---

## 📁 Files Created

- `SYNC_AND_DEPLOY.bat` - Double-click this file
- `SYNC_AND_DEPLOY.ps1` - PowerShell script (the actual tool)
- `SYNC_TOOL_README.md` - This file

---

## ✅ Quick Reference

**Edit questions:**
1. Open `testData_complete.js`
2. Make changes
3. Save (`Ctrl+S`)

**Deploy:**
1. Double-click `SYNC_AND_DEPLOY.bat`
2. Wait for "DEPLOYMENT COMPLETE!"

**Verify:**
1. Wait 2-3 minutes
2. Visit https://ah1402.github.io/aviation-test-app/
3. Hard refresh: `Ctrl+Shift+R`

---

**Your app is live at:** https://ah1402.github.io/aviation-test-app/ 🚀
