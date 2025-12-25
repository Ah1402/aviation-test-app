import json
import re

# Load the new questions
with open('new_questions.json', 'r', encoding='utf-8') as f:
    questions = json.load(f)

# Update category to match testData format
for q in questions:
    q['category'] = 'compass-egyptair-test-1'

# Convert to JSON string with indentation
questions_json = json.dumps(questions, indent=2, ensure_ascii=False)

# The compass-egyptair object
compass_object = '''  "compass-egyptair": {
    "name": "Compass EgyptAir",
    "icon": "fas fa-compass",
    "tests": [
      {
        "id": "compass-egyptair-test-1",
        "name": "Test 1",
        "timeLimit": 60,
        "questions": ''' + questions_json + '''
      }
    ]
  }'''

# Read the index.html
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# The old string to replace (the end of testData before console.log)
old_string = '''  }
};

console.log('window.testData loaded with', Object.keys(window.testData || {}).length, 'categories');'''

# The new string with compass-egyptair added
new_string = '''  },
''' + compass_object + '''
};

console.log('window.testData loaded with', Object.keys(window.testData || {}).length, 'categories');'''

# Replace
new_content = content.replace(old_string, new_string, 1)

# Write back
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Compass EgyptAir added to testData successfully.")