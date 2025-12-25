from __future__ import annotations

import re
from typing import Any

print("Reading index.html...")
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the compass-egyptair section - be very specific
start_marker = '"compass-egyptair": {'
end_pattern = r'(\s+"compass-egyptair":\s+\{[^}]*?"tests":\s+\[\s+\{[^}]*?"id":\s+"compass-egyptair-test-1"[^}]*?"questions":\s+\[)(.*?)(\]\s+\}\s+\]\s+\})'

match = re.search(end_pattern, content, re.DOTALL)
if not match:
    print("Could not find compass-egyptair section")
    exit(1)

before = match.group(1)
questions_json = match.group(2)
after = match.group(3)

print(f"Found compass-egyptair section")

# Extract all question objects
# Match complete question objects with all their properties
question_pattern = r'\{\s*"category":[^}]*?"explanation":\s*"[^"]*"\s*\}'
questions = re.findall(question_pattern, questions_json, re.DOTALL)

print(f"Extracted {len(questions)} questions")

# Split into tests of 30 questions each
questions_per_test = 30
all_tests: list[dict[str, Any]] = []

for test_num in range(1, (len(questions) // questions_per_test) + 2):
    start_idx = (test_num - 1) * questions_per_test
    end_idx = min(start_idx + questions_per_test, len(questions))
    
    if start_idx >= len(questions):
        break
    
    test_questions = questions[start_idx:end_idx]
    
    # Update category and test number in each question
    updated_questions: list[str] = []
    for q in test_questions:
        # Update the category and test fields
        q_updated = re.sub(r'"category":\s*"compass-egyptair-test-\d+"', 
                          f'"category": "compass-egyptair-test-{test_num}"', q)
        q_updated = re.sub(r'"test":\s*\d+', f'"test": {test_num}', q_updated)
        updated_questions.append(q_updated)
    
    # Build test object
    test: dict[str, Any] = {
        "id": f"compass-egyptair-test-{test_num}",
        "name": f"Test {test_num}",
        "timeLimit": 60,
        "questions": updated_questions
    }
    
    all_tests.append(test)
    print(f"Test {test_num}: {len(updated_questions)} questions")

# Build the tests array JSON manually to preserve formatting
tests_json: list[str] = []
for test in all_tests:
    questions_str = ',\n                    '.join(test['questions'])
    test_str = f'''            {{
                "id": "{test['id']}",
                "name": "{test['name']}",
                "timeLimit": {test['timeLimit']},
                "questions": [
                    {questions_str}
                ]
            }}'''
    tests_json.append(test_str)

# Reconstruct the compass-egyptair section
new_tests_section = ',\n'.join(tests_json)
new_compass = f'''"compass-egyptair": {{
        "name": "Compass EgyptAir",
        "icon": "fas fa-compass",
        "tests": [
{new_tests_section}
        ]
    }}'''

# Find the full compass-egyptair object in content
full_pattern = r'"compass-egyptair":\s*\{.*?\n\s+\}'
content = re.sub(full_pattern, new_compass, content, flags=re.DOTALL)

# Write back
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\n✓ Reorganized compass-egyptair into {len(all_tests)} tests")
print("✓ File updated")
