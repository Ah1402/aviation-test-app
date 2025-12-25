import json
import re

# Read the egyptair compass id.js file
with open(r'c:\Users\ahmed\Desktop\final younes\final\aviation-test-app\egyptair compass id.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

# Remove the const questions = and the ;
js_content = re.sub(r'^const questions = ', '', js_content)
js_content = re.sub(r';$', '', js_content)

# Parse the JSON
questions = json.loads(js_content)

# Transform to the required format
new_questions = []
for q in questions:
    new_q = {
        "category": "compass-egyptair",
        "test": 1,
        "id": q["id"],
        "question": q["question"],
        "options": q["options"],
        "answer": q["options"][q["correct"]],
        "correct": q["correct"],
        "explanation": q["explanation"]
    }
    new_questions.append(new_q)

# Read the index.html file
with open(r'c:\Users\ahmed\Desktop\final younes\final\aviation-test-app\index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the compass-egyptair section
start = content.find('"compass-egyptair": {')
if start == -1:
    print("Compass-egyptair not found")
    exit()

# Find the questions array start
questions_start = content.find('"questions": [', start)
if questions_start == -1:
    print("Questions array not found")
    exit()

# Find the end of the questions array
# Use regex to find the questions array
pattern = r'"questions": \[(.*?)\]'
match = re.search(pattern, content[questions_start:], re.DOTALL)
if not match:
    print("Questions array not matched")
    exit()

old_questions_str = '"questions": ' + match.group(1)

# Create the new questions string
# To match the indentation, but since it's JS, as long as valid, ok.
new_questions_json = json.dumps(new_questions, indent=10)  # indent to match roughly

# Replace
new_content = content.replace(old_questions_str, '"questions": ' + new_questions_json)

# Write back
with open(r'c:\Users\ahmed\Desktop\final younes\final\aviation-test-app\index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Replaced successfully")