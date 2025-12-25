import json
import re

# Read the egyptair file
with open('egyptair compass id.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove comments
content = re.sub(r'//.*', '', content)

# Extract the array part
match = re.search(r'const questions = (\[.*\]);', content, re.DOTALL)
if not match:
    raise ValueError("Could not find questions array")

questions_js = match.group(1)

# Quote the keys
questions_js = re.sub(r'\bid:', r'"id":', questions_js)
questions_js = re.sub(r'\bquestion:', r'"question":', questions_js)
questions_js = re.sub(r'\boptions:', r'"options":', questions_js)
questions_js = re.sub(r'\bcorrect:', r'"correct":', questions_js)
questions_js = re.sub(r'\bexplanation:', r'"explanation":', questions_js)

# Remove trailing commas
questions_js = re.sub(r',\s*(\]|\})', r'\1', questions_js)

# Replace true/false if any, but none.

try:
    questions = json.loads(questions_js)
except json.JSONDecodeError as e:
    print(f"JSON error: {e}")
    with open('debug.txt', 'w') as f:
        f.write(questions_js)
    raise

# Now transform
transformed = []
start_id = 1528
for i, q in enumerate(questions):
    new_q = {
        "category": "compass-egyptair",
        "test": 1,
        "id": start_id + i,
        "question": q["question"],
        "options": q["options"],
        "answer": q["options"][q["correct"]],
        "correct": q["correct"],
        "explanation": q["explanation"]
    }
    transformed.append(new_q)

# Output the category JSON
category = {
    "compass-egyptair": {
        "name": "Compass EgyptAir",
        "icon": "fas fa-compass",
        "tests": [
            {
                "id": "compass-egyptair-test-1",
                "name": "Test 1",
                "timeLimit": 60,
                "questions": transformed
            }
        ]
    }
}

print(json.dumps(category, indent=2))