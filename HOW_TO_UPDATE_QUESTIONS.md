# How to Update Questions and Answers

## 📝 Overview
All questions and answers are stored in **`testData_complete.js`** file. This guide shows you how to edit, add, or fix questions, then deploy to GitHub.

---

## 📂 File Location
```
testData_complete.js
```

---

## 🔍 Finding Questions to Edit

### Method 1: Search by Question Text
1. Open `testData_complete.js` in VS Code
2. Press `Ctrl+F` (or `Cmd+F` on Mac)
3. Type part of the question you want to find
4. Click through results until you find it

### Method 2: Browse by Category
The file is organized into these categories:
- `aircraft-general-knowledge` (line 2)
- `air-law` (line 1798)
- `aon-aviation-knowledge` (line 3519)
- `flight-planning-and-monitoring` (line 5371)
- `human-performance-and-limitations` (line 7107)
- `instrumentation` (line 8571)
- `mass-and-balance` (line 11401)
- `meteorology` (line 13108)
- `operational-procedures` (line 14844)
- `principles-of-flight` (line 16580)
- `radio-navigation` (line 18286)
- `general-navigation` (line 19992)
- `performance` (line 19992)

---

## ✏️ How to Edit a Question

### Question Structure
```javascript
{
  "question": "What is the stall speed?",
  "options": [
    "60 knots",
    "70 knots",
    "80 knots",
    "90 knots"
  ],
  "correct": 1,  // Index of correct answer (0=first, 1=second, 2=third, 3=fourth)
  "explanation": "The stall speed is 70 knots for this aircraft."
}
```

### Change Question Text
Find the question and edit the text inside the quotes:
```javascript
"question": "Your new question text here?",
```

### Change Answer Options
Edit the options array:
```javascript
"options": [
  "New option A",
  "New option B",
  "New option C",
  "New option D"
],
```

### Change Correct Answer
Change the `correct` number (remember: 0 = first option, 1 = second, 2 = third, 3 = fourth):
```javascript
"correct": 2,  // This makes the 3rd option correct
```

### Add/Edit Explanation
```javascript
"explanation": "This is why this answer is correct. Detailed explanation here."
```

---

## ➕ How to Add New Questions

### Step 1: Find the Category
Open `testData_complete.js` and find the category section (e.g., `"air-law"`).

### Step 2: Find the Test
Inside the category, find the test array. Example:
```javascript
"air-law": {
  "name": "Air Law",
  "icon": "gavel",
  "tests": [
    {
      "name": "Air Law Test 1",
      "timeLimit": 45,
      "questions": [
        // Questions go here
      ]
    }
  ]
}
```

### Step 3: Add Your Question
At the end of the `questions` array (before the closing `]`), add:
```javascript
,
{
  "question": "Your new question text?",
  "options": [
    "Option A",
    "Option B",
    "Option C",
    "Option D"
  ],
  "correct": 0,
  "explanation": "Explanation for the correct answer."
}
```

**⚠️ IMPORTANT:** Add a comma `,` before the opening `{` if there are questions above it!

---

## 🚀 How to Update on GitHub (Deploy Changes)

### Step 1: Save Your Changes
1. Edit `testData_complete.js`
2. Press `Ctrl+S` (or `Cmd+S`) to save

### Step 2: Copy to index.html
The live site uses `index.html`. Run this command in PowerShell:

```powershell
# Navigate to your project folder
cd "C:\Users\ahmed\Desktop\final younes\final\aviation-test-app"

# Copy updated questions to index.html (this embeds them)
# You'll need to manually update the testData section in index.html
# OR rebuild from 924.html if you have a build script
```

**EASIER WAY:** Update questions directly in `index.html` around line 1950-20000 where testData is embedded.

### Step 3: Commit to Git
```powershell
# Add changed files
& "C:\Program Files\Git\bin\git.exe" add testData_complete.js index.html

# Commit with a message describing what you changed
& "C:\Program Files\Git\bin\git.exe" commit -m "Updated questions: fixed answer for question #123"

# Push to GitHub
& "C:\Program Files\Git\bin\git.exe" push
```

### Step 4: Wait for Deployment
- GitHub Pages will automatically rebuild (2-3 minutes)
- Visit: https://ah1402.github.io/aviation-test-app/
- Hard refresh: `Ctrl+Shift+R` (or `Cmd+Shift+R`)

---

## 📝 Quick Examples

### Example 1: Fix Wrong Answer
**Before:**
```javascript
{
  "question": "What is V1?",
  "options": ["Takeoff speed", "Decision speed", "Rotation speed", "Stall speed"],
  "correct": 0,  // Wrong!
}
```

**After:**
```javascript
{
  "question": "What is V1?",
  "options": ["Takeoff speed", "Decision speed", "Rotation speed", "Stall speed"],
  "correct": 1,  // Correct: Decision speed
}
```

### Example 2: Add Explanation
**Before:**
```javascript
{
  "question": "What is the minimum visibility for VFR?",
  "options": ["1 mile", "3 miles", "5 miles", "10 miles"],
  "correct": 2
}
```

**After:**
```javascript
{
  "question": "What is the minimum visibility for VFR?",
  "options": ["1 mile", "3 miles", "5 miles", "10 miles"],
  "correct": 2,
  "explanation": "For VFR flight in Class E airspace below 10,000 feet, minimum visibility is 5 statute miles."
}
```

### Example 3: Add New Question
Find the last question in a test, then add:
```javascript
      },  // <- Last question ends here
      {
        "question": "What does METAR stand for?",
        "options": [
          "Meteorological Aerodrome Report",
          "Weather Terminal Report",
          "Aviation Weather Report",
          "Routine Weather Observation"
        ],
        "correct": 0,
        "explanation": "METAR is French for Meteorological Aerodrome Report, used worldwide for aviation weather."
      }
    ]  // <- End of questions array
```

---

## 🛠️ Common Mistakes to Avoid

### ❌ Mistake 1: Wrong Correct Index
```javascript
"correct": 4,  // ERROR: Only 0-3 are valid for 4 options!
```

### ❌ Mistake 2: Missing Comma
```javascript
},
{  // Missing comma here causes error!
```

### ❌ Mistake 3: Unescaped Quotes
```javascript
"question": "What is "V1" speed?",  // ERROR: Use \" inside quotes
```

**Fix:**
```javascript
"question": "What is \"V1\" speed?",  // Correct
```

---

## 🔄 Full Update Workflow

1. **Edit** `testData_complete.js` (or `index.html` directly)
2. **Save** the file (`Ctrl+S`)
3. **Test locally** (open `index.html` in browser)
4. **Add to Git**: `git add testData_complete.js index.html`
5. **Commit**: `git commit -m "Fixed question 123 answer"`
6. **Push**: `git push`
7. **Wait** 2-3 minutes
8. **Verify** at https://ah1402.github.io/aviation-test-app/

---

## 📞 Need Help?

**Common Issues:**
- **Changes not showing?** Hard refresh browser: `Ctrl+Shift+R`
- **Syntax error?** Check for missing commas, quotes, or brackets
- **Git push failed?** Run `git pull` first, then `git push` again

**Testing Locally:**
- Open `index.html` directly in browser
- No server needed - works offline!

---

## 📊 Where Questions Are Stored

```
index.html
└── Around lines 1950-20000
    └── window.testData = { ... }
        ├── "aircraft-general-knowledge": { ... }
        ├── "air-law": { ... }
        ├── "meteorology": { ... }
        └── ... (all categories)
```

Each category has:
- **name**: Display name
- **icon**: Icon name
- **tests**: Array of test objects
  - **name**: Test name
  - **timeLimit**: Minutes
  - **questions**: Array of question objects

---

**🎯 Quick Command Reference**

```powershell
# Go to project folder
cd "C:\Users\ahmed\Desktop\final younes\final\aviation-test-app"

# Check what changed
& "C:\Program Files\Git\bin\git.exe" status

# Add all changes
& "C:\Program Files\Git\bin\git.exe" add .

# Commit changes
& "C:\Program Files\Git\bin\git.exe" commit -m "Your message here"

# Push to GitHub
& "C:\Program Files\Git\bin\git.exe" push

# Pull latest from GitHub
& "C:\Program Files\Git\bin\git.exe" pull
```

---

**Your app is live at:** https://ah1402.github.io/aviation-test-app/

Any changes you push will appear there within 2-3 minutes! 🚀
