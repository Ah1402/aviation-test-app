from __future__ import annotations

import json
import re
from typing import Any

print("Step 1: Extract missing questions from egyptair compass id.js...")
with open('egyptair compass id.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

# Extract the missing questions
missing_ids: list[int] = [1457, 1468, 1473, 1483, 1527, 1623, 1624, 1628, 1649]
missing_questions: list[dict[str, Any]] = []

# Parse the JavaScript array
# Find each question object
pattern = r'\{\s*id:\s*(\d+),\s*question:\s*"((?:[^"\\]|\\.)*)"\s*,\s*options:\s*\[((?:[^\]]|\][^,}])*)\]\s*,\s*correct:\s*(\d+)\s*,\s*explanation:\s*"((?:[^"\\]|\\.)*)"\s*\}'

for match in re.finditer(pattern, js_content, re.DOTALL):
    qid = int(match.group(1))
    if qid in missing_ids:
        question_text = match.group(2)
        options_text = match.group(3)
        correct = int(match.group(4))
        explanation = match.group(5)
        
        # Parse options
        options: list[str] = []
        for opt_match in re.finditer(r'"((?:[^"\\]|\\.)*)"', options_text):
            options.append(opt_match.group(1))
        
        missing_questions.append({
            'id': qid,
            'question': question_text,
            'options': options,
            'correct': correct,
            'explanation': explanation
        })

print(f"Found {len(missing_questions)} missing questions")
for q in missing_questions:
    print(f"  ID {q['id']}: {q['question'][:50]}...")

print("\nStep 2: Read current compass-egyptair section from index.html...")
with open('index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

# Find the compass-egyptair section
compass_start = html_content.find('"compass-egyptair": {')
if compass_start == -1:
    print("✗ Could not find compass-egyptair section!")
    exit(1)

# Find the end of this category (next category or closing brace)
temp_content = html_content[compass_start:]
brace_count = 0
in_category = False
end_pos = 0

for i, char in enumerate(temp_content):
    if char == '{':
        brace_count += 1
        in_category = True
    elif char == '}':
        brace_count -= 1
        if in_category and brace_count == 0:
            end_pos = i + 1
            break

compass_section = temp_content[:end_pos]
print(f"Extracted compass-egyptair section ({len(compass_section)} chars)")

# Extract all existing questions from the compass section
existing_questions: list[dict[str, Any]] = []
question_pattern = r'\{\s*"category":\s*"([^"]+)"\s*,\s*"test":\s*(\d+)\s*,\s*"id":\s*(\d+)\s*,\s*"question":\s*"((?:[^"\\]|\\.)*)"\s*,\s*"options":\s*\[((?:[^\]]|\][^,}])*)\]\s*,\s*"answer":\s*(\d+)\s*,\s*"correct":\s*(\d+)\s*,\s*"explanation":\s*"((?:[^"\\]|\\.)*)"\s*\}'

for match in re.finditer(question_pattern, compass_section, re.DOTALL):
    category = match.group(1)
    test = int(match.group(2))
    qid = int(match.group(3))
    question_text = match.group(4)
    options_text = match.group(5)
    answer = int(match.group(6))
    correct = int(match.group(7))
    explanation = match.group(8)
    
    # Parse options
    options: list[str] = []
    for opt_match in re.finditer(r'"((?:[^"\\]|\\.|[^"])*?)"(?:\s*,|\s*\])', options_text):
        options.append(opt_match.group(1))
    
    existing_questions.append({
        'category': category,
        'test': test,
        'id': qid,
        'question': question_text,
        'options': options,
        'answer': answer,
        'correct': correct,
        'explanation': explanation
    })

print(f"Extracted {len(existing_questions)} existing questions")

# Add the missing questions in the correct format
print("\nStep 3: Adding missing questions...")
for mq in missing_questions:
    existing_questions.append({
        'category': 'compass-egyptair',
        'test': 1,  # Will be reorganized later
        'id': mq['id'],
        'question': mq['question'],
        'options': mq['options'],
        'answer': mq['correct'],
        'correct': mq['correct'],
        'explanation': mq['explanation']
    })

# Sort by ID
def _question_id(question: dict[str, Any]) -> int:
    return int(question['id'])

existing_questions.sort(key=_question_id)
print(f"Total questions after adding missing ones: {len(existing_questions)}")

# Step 4: Organize into tests of 30 questions each
print("\nStep 4: Organizing into tests of 30 questions...")
tests: list[list[dict[str, Any]]] = []
current_test: list[dict[str, Any]] = []
test_num = 1

for i, q in enumerate(existing_questions):
    q['test'] = test_num
    q['category'] = f'compass-egyptair-test-{test_num}'
    current_test.append(q)
    
    if len(current_test) == 30:
        tests.append(current_test)
        print(f"Test {test_num}: 30 questions (IDs {current_test[0]['id']}-{current_test[-1]['id']})")
        current_test = []
        test_num += 1

# Add any remaining questions as the last test
if current_test:
    tests.append(current_test)
    print(f"Test {test_num}: {len(current_test)} questions (IDs {current_test[0]['id']}-{current_test[-1]['id']})")

# Step 5: Build the new compass-egyptair JSON
print("\nStep 5: Building new compass-egyptair section...")
new_tests: list[dict[str, Any]] = []
for test_idx, test_questions in enumerate(tests, 1):
    test_obj: dict[str, Any] = {
        'id': f'compass-egyptair-test-{test_idx}',
        'testNum': test_idx,
        'questions': test_questions
    }
    new_tests.append(test_obj)

new_compass: dict[str, Any] = {
    'name': 'EGYPTAIR Compass Test',
    'tests': new_tests
}

# Convert to JSON with proper formatting
new_compass_json = json.dumps(new_compass, indent=10, ensure_ascii=False)

# Build the replacement string
new_compass_str = f'"compass-egyptair": {new_compass_json}'

# Step 6: Replace in the HTML
print("\nStep 6: Replacing in index.html...")
before_compass = html_content[:compass_start]
after_compass = html_content[compass_start + len(compass_section):]

new_html = before_compass + new_compass_str + after_compass

# Save the result
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_html)

print(f"\n✓ Successfully updated index.html!")
print(f"✓ Total questions: {len(existing_questions)}")
print(f"✓ Number of tests: {len(tests)}")
print(f"✓ All questions organized into tests of 30 (last test may have fewer)")
