from __future__ import annotations

import json
import re
from typing import Any

# Step 1: Count and verify current state
print("Counting questions in compass-egyptair section...")
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

compass_questions_count = html.count('"category": "compass-egyptair-test-1"')
print(f"Current count: {compass_questions_count} questions in index.html")

# Step 2: Extract the ENTIRE testData object
print("\nExtracting testData object...")
testdata_match = re.search(r'window\.testData\s*=\s*(\{.*?\n\s*\});', html, re.DOTALL)
if not testdata_match:
    print("✗ Could not find testData!")
    exit(1)

testdata_str = testdata_match.group(1)
print(f"Extracted testData ({len(testdata_str)} chars)")

# Parse as JSON
try:
    testdata = json.loads(testdata_str)
    print(f"✓ Successfully parsed testData JSON")
except Exception as e:
    print(f"✗ JSON parse error: {e}")
    exit(1)

# Step 3: Get existing compass questions
existing_compass = testdata.get('compass-egyptair', {})
existing_tests = existing_compass.get('tests', [])
all_existing_questions: list[dict[str, Any]] = []

for test in existing_tests:
    all_existing_questions.extend(test.get('questions', []))

print(f"\nExtracted {len(all_existing_questions)} existing questions from compass-egyptair")
existing_ids: set[int] = {int(q['id']) for q in all_existing_questions}
print(f"ID range: {min(existing_ids)} to {max(existing_ids)}")

# Step 4: Get missing questions from egyptair compass id.js
print("\nReading egyptair compass id.js...")
with open('egyptair compass id.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

# Parse the JavaScript - find the questions array
js_array_match = re.search(r'const questions = \[(.*)\];', js_content, re.DOTALL)
if not js_array_match:
    print("✗ Could not find questions array!")
    exit(1)

js_array_str = '[' + js_array_match.group(1) + ']'

# Convert JavaScript to JSON (replace unquoted property names)
js_json = re.sub(r'(\w+):', r'"\1":', js_array_str)

try:
    js_questions: list[dict[str, Any]] = json.loads(js_json)
    print(f"✓ Parsed {len(js_questions)} questions from JS file")
except Exception as e:
    print(f"✗ Could not parse JS as JSON: {e}")
    # Try manual parsing
    exit(1)

js_ids: set[int] = {int(q['id']) for q in js_questions}
print(f"ID range: {min(js_ids)} to {max(js_ids)}")

# Find missing
missing_ids: set[int] = js_ids - existing_ids
print(f"\n⚠ Missing {len(missing_ids)} questions: {sorted(missing_ids)}")

# Step 5: Add missing questions
for js_q in js_questions:
    if js_q['id'] in missing_ids:
        # Convert to HTML format
        html_q: dict[str, Any] = {
            'category': 'compass-egyptair-test-1',
            'test': 1,
            'id': js_q['id'],
            'question': js_q['question'],
            'options': js_q['options'],
            'answer': js_q['options'][js_q['correct']],
            'correct': js_q['correct'],
            'explanation': js_q['explanation']
        }
        all_existing_questions.append(html_q)
        print(f"  + Added ID {js_q['id']}")

# Sort all questions by ID
def _question_id(question: dict[str, Any]) -> int:
    return int(question['id'])

all_existing_questions.sort(key=_question_id)
print(f"\nTotal after adding missing: {len(all_existing_questions)} questions")

# Step 6: Reorganize into tests of 30
print("\nReorganizing into tests of 30...")
new_tests: list[dict[str, Any]] = []
for i in range(0, len(all_existing_questions), 30):
    test_num = (i // 30) + 1
    test_questions: list[dict[str, Any]] = all_existing_questions[i:i+30]
    
    # Update category/test for each question
    for q in test_questions:
        q['category'] = f'compass-egyptair-test-{test_num}'
        q['test'] = test_num
    
    new_test: dict[str, Any] = {
        'id': f'compass-egyptair-test-{test_num}',
        'name': f'Test {test_num}',
        'timeLimit': 60,
        'questions': test_questions
    }
    new_tests.append(new_test)
    print(f"  Test {test_num}: {len(test_questions)} questions (IDs {test_questions[0]['id']}-{test_questions[-1]['id']})")

# Update testData
testdata['compass-egyptair'] = {
    'name': 'Compass EgyptAir',
    'icon': 'fas fa-compass',
    'tests': new_tests
}

# Step 7: Write back
print("\nWriting updated testData...")
new_testdata_str = json.dumps(testdata, indent=4, ensure_ascii=False)
new_html = html.replace(testdata_str, new_testdata_str)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_html)

print("\n" + "="*60)
print("✓ COMPLETE!")
print("="*60)
print(f"✓ Added {len(missing_ids)} missing questions")
print(f"✓ Total questions: {len(all_existing_questions)}")
print(f"✓ Number of tests: {len(new_tests)}")
test_summary = ', '.join([
    f'Test {i + 1} ({len(test["questions"])} Q)'
    for i, test in enumerate(new_tests)
])
print(f"✓ Format: {test_summary}")
print("="*60)
