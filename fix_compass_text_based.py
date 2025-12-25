from __future__ import annotations

import re

print("="*70)
print("COMPASS-EGYPTAIR FIX - Text-based approach")
print("="*70)

# Read both files
print("\n[1/6] Reading files...")
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

with open('egyptair compass id.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

# Extract current compass IDs
print("\n[2/6] Finding current compass-egyptair question IDs...")
compass_section_match = re.search(r'"compass-egyptair":\s*\{.*?"tests":\s*\[.*?\]', html, re.DOTALL)
if not compass_section_match:
    print("✗ Could not find compass-egyptair section!")
    exit(1)

compass_text = compass_section_match.group(0)
current_ids: set[int] = set()
for match in re.finditer(r'"id":\s*(\d+)', compass_text):
    current_ids.add(int(match.group(1)))

print(f"Found {len(current_ids)} questions, IDs: {min(current_ids)}-{max(current_ids)}")

# Extract JS file IDs
print("\n[3/6] Finding all IDs in egyptair compass id.js...")
js_ids: set[int] = set()
for match in re.finditer(r'\bid:\s*(\d+)', js_content):
    js_ids.add(int(match.group(1)))

print(f"Found {len(js_ids)} questions, IDs: {min(js_ids)}-{max(js_ids)}")

# Find missing
missing_ids: list[int] = sorted(js_ids - current_ids)
print(f"\n⚠ Missing {len(missing_ids)} IDs: {missing_ids}")

# Extract missing question objects from JS file
print("\n[4/6] Extracting missing questions from JS file...")
missing_questions_text: list[tuple[int, str]] = []

for missing_id in missing_ids:
    # Find the question object for this ID
    # Pattern: { id: 1234, ...entire object... }
    pattern = rf'\{{\s*id:\s*{missing_id},.*?\n\s*\}}'
    match = re.search(pattern, js_content, re.DOTALL)
    
    if match:
        js_obj = match.group(0)
        
        # Extract fields
        question_match = re.search(r'question:\s*"((?:[^"\\]|\\.)*)"', js_obj, re.DOTALL)
        options_match = re.search(r'options:\s*\[(.*?)\]', js_obj, re.DOTALL)
        correct_match = re.search(r'correct:\s*(\d+)', js_obj)
        explanation_match = re.search(r'explanation:\s*"((?:[^"\\]|\\.)*)"', js_obj, re.DOTALL)
        
        if (
            question_match
            and options_match
            and correct_match
            and explanation_match
        ):
            question_text = question_match.group(1)
            options_text = options_match.group(1)
            correct = int(correct_match.group(1))
            explanation = explanation_match.group(1)
            
            # Parse options
            options: list[str] = []
            for opt in re.finditer(r'"((?:[^"\\]|\\.)*)"', options_text):
                options.append(opt.group(1))
            
            if len(options) > correct:
                answer_text = options[correct]
                
                # Build HTML-format question object
                options_json = ',\n                            '.join([f'"{opt}"' for opt in options])
                
                html_question = f'''                    {{
                        "category": "compass-egyptair-test-1",
                        "test": 1,
                        "id": {missing_id},
                        "question": "{question_text}",
                        "options": [
                            {options_json}
                        ],
                        "answer": "{answer_text}",
                        "correct": {correct},
                        "explanation": "{explanation}"
                    }}'''
                
                missing_questions_text.append((missing_id, html_question))
                print(f"  ✓ ID {missing_id}: {question_text[:60]}...")

print(f"\n[5/6] Building complete question list...")
# Find all existing question objects in compass-egyptair
existing_question_objects: list[tuple[int, str]] = []
pattern = r'(\{\s*"category":\s*"compass-egyptair-test-1".*?"explanation":\s*"(?:[^"\\]|\\.)*"\s*\})'

for match in re.finditer(pattern, compass_text, re.DOTALL):
    q_text = match.group(1)
    id_match = re.search(r'"id":\s*(\d+)', q_text)
    if id_match:
        qid = int(id_match.group(1))
        existing_question_objects.append((qid, q_text))

# Add missing questions
all_questions: list[tuple[int, str]] = (
    existing_question_objects + missing_questions_text
)
all_questions.sort(key=lambda x: x[0])

print(f"Total questions: {len(all_questions)}")

# Organize into tests of 30
print("\n[6/6] Organizing into tests of 30 questions each...")
tests_text: list[str] = []
for test_idx in range(0, len(all_questions), 30):
    test_num = (test_idx // 30) + 1
    test_questions: list[tuple[int, str]] = all_questions[test_idx:test_idx+30]
    
    # Update category and test in each question
    updated_questions: list[str] = []
    for qid, q_text in test_questions:
        # Replace category and test values
        q_updated = re.sub(r'"category":\s*"[^"]*"', f'"category": "compass-egyptair-test-{test_num}"', q_text)
        q_updated = re.sub(r'"test":\s*\d+', f'"test": {test_num}', q_updated)
        updated_questions.append(q_updated)
    
    questions_joined = ',\n'.join(updated_questions)
    
    test_obj = f'''            {{
                "id": "compass-egyptair-test-{test_num}",
                "name": "Test {test_num}",
                "timeLimit": 60,
                "questions": [
{questions_joined}
                ]
            }}'''
    
    tests_text.append(test_obj)
    q_range = f"{test_questions[0][0]}-{test_questions[-1][0]}"
    print(f"  Test {test_num}: {len(test_questions)} questions (IDs {q_range})")

tests_joined = ',\n'.join(tests_text)

# Build new compass-egyptair section
new_compass_section = f'''    "compass-egyptair": {{
        "name": "Compass EgyptAir",
        "icon": "fas fa-compass",
        "tests": [
{tests_joined}
        ]
    }}'''

# Find and replace the entire compass-egyptair section
print("\n[7/7] Replacing in index.html...")
# Find the section more precisely
start_pattern = r'"compass-egyptair":\s*\{'
start_match = re.search(start_pattern, html)
if not start_match:
    print("✗ Could not find start!")
    exit(1)

start_pos = start_match.start()
temp = html[start_pos:]

# Count braces to find the end
brace_count = 0
end_pos = 0
for i, char in enumerate(temp):
    if char == '{':
        brace_count += 1
    elif char == '}':
        brace_count -= 1
        if brace_count == 0:
            end_pos = i + 1
            break

old_compass_section = temp[:end_pos]
new_html = html[:start_pos] + new_compass_section + html[start_pos + end_pos:]

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_html)

print("\n" + "="*70)
print("✓ SUCCESS!")
print("="*70)
print(f"✓ Added {len(missing_ids)} missing questions: {missing_ids}")
print(f"✓ Total questions: {len(all_questions)}")
print(f"✓ Number of tests: {len(tests_text)}")
print(f"✓ Questions per test: 30 (last test: {len(all_questions) % 30 or 30})")
print("="*70)
