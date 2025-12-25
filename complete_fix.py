from __future__ import annotations

import re
from typing import Any

print("="*80)
print("COMPLETE FIX: Add Missing Questions + Fix All Errors")
print("="*80)

# Step 1: Read files
print("\n[1/5] Reading files...")
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

with open('egyptair compass id.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

# Step 2: Extract the 9 missing questions from JS file
print("\n[2/5] Extracting 9 missing questions from egyptair compass id.js...")
missing_ids: list[int] = [1457, 1468, 1473, 1483, 1527, 1623, 1624, 1628, 1649]
missing_questions: dict[int, dict[str, Any]] = {}

for missing_id in missing_ids:
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
                missing_questions[missing_id] = {
                    'id': missing_id,
                    'question': question_text,
                    'options': options,
                    'answer': options[correct],
                    'correct': correct,
                    'explanation': explanation
                }
                print(f"  ✓ ID {missing_id}: {question_text[:60]}...")

print(f"\nExtracted {len(missing_questions)} missing questions")

# Step 3: Find compass-egyptair section and add missing questions to appropriate tests
print("\n[3/5] Adding missing questions to appropriate tests...")
compass_match = re.search(r'"compass-egyptair":\s*\{.*?\n\s{4}\}', html, re.DOTALL)
if not compass_match:
    print("✗ Could not find compass-egyptair section!")
    exit(1)

compass_start = compass_match.start()
compass_end = compass_match.end()
compass_section = compass_match.group(0)

# Extract all current questions with their IDs
all_questions: list[tuple[int, str]] = []
question_pattern = r'\{\s*"category":\s*"compass-egyptair-test-(\d+)".*?"explanation":\s*"(?:[^"\\]|\\.)*"\s*\}'

for match in re.finditer(question_pattern, compass_section, re.DOTALL):
    test_num = int(match.group(1))
    q_text = match.group(0)
    id_match = re.search(r'"id":\s*(\d+)', q_text)
    if id_match:
        qid = int(id_match.group(1))
        all_questions.append((qid, q_text))

# Add missing questions
for mid, mq in missing_questions.items():
    # Determine which test this should go in (based on ID range)
    test_num = ((mid - 1424) // 30) + 1
    
    # Build question object
    options_str = ',\n                            '.join([f'"{opt}"' for opt in mq['options']])
    q_obj = f'''                    {{
                        "category": "compass-egyptair-test-{test_num}",
                        "test": {test_num},
                        "id": {mid},
                        "question": "{mq['question']}",
                        "options": [
                            {options_str}
                        ],
                        "answer": "{mq['answer']}",
                        "correct": {mq['correct']},
                        "explanation": "{mq['explanation']}"
                    }}'''
    
    all_questions.append((mid, q_obj))
    print(f"  + Added ID {mid} to Test {test_num}")

# Sort all questions by ID
all_questions.sort(key=lambda x: x[0])
print(f"\nTotal questions after adding missing: {len(all_questions)}")

# Rebuild tests with 30 questions each
tests_built: list[str] = []
for test_start in range(0, len(all_questions), 30):
    test_num = (test_start // 30) + 1
    test_qs: list[tuple[int, str]] = all_questions[test_start:test_start+30]
    
    # Update category and test number in each question
    updated_qs: list[str] = []
    for qid, q_text in test_qs:
        q_updated = re.sub(r'"category":\s*"[^"]*"', f'"category": "compass-egyptair-test-{test_num}"', q_text)
        q_updated = re.sub(r'"test":\s*\d+', f'"test": {test_num}', q_updated)
        updated_qs.append(q_updated)
    
    questions_joined = ',\n'.join(updated_qs)
    
    test_obj = f'''            {{
                "id": "compass-egyptair-test-{test_num}",
                "name": "Test {test_num}",
                "timeLimit": 60,
                "questions": [
{questions_joined}
                ]
            }}'''
    
    tests_built.append(test_obj)

# Build new compass section
tests_joined = ',\n'.join(tests_built)
new_compass_section = f'''    "compass-egyptair": {{
        "name": "Compass EgyptAir",
        "icon": "fas fa-compass",
        "tests": [
{tests_joined}
        ]
    }}'''

# Replace in HTML
html = html[:compass_start] + new_compass_section + html[compass_end:]
print(f"✓ Rebuilt compass-egyptair with {len(all_questions)} questions in {len(tests_built)} tests")

# Step 4: Fix all syntax errors
print("\n[4/5] Fixing all syntax errors...")

# Fix apostrophes in strings (someone's -> someone\\'s)
fixes_count = 0

# Pattern 1: Fix apostrophes in question/answer/explanation strings
apostrophe_patterns = [
    (r'("question":\s*"[^"]*?)(\w)\'s([^"]*?")', r"\1\2\\'s\3"),
    (r'("answer":\s*"[^"]*?)(\w)\'s([^"]*?")', r"\1\2\\'s\3"),
    (r'("explanation":\s*"[^"]*?)(\w)\'s([^"]*?")', r"\1\2\\'s\3"),
    (r'("options":\s*\[[^\]]*?"[^"]*?)(\w)\'s([^"]*?"[^\]]*?\])', r"\1\2\\'s\3"),
]

for pattern, replacement in apostrophe_patterns:
    before_count = len(re.findall(pattern, html))
    html = re.sub(pattern, replacement, html)
    fixes_count += before_count

print(f"  Fixed {fixes_count} apostrophe issues")

# Fix embedded quotes in strings
embedded_quote_pattern = r'("(?:question|answer|explanation)":\s*"[^"]*?)"([^"]*?")'
matches = list(re.finditer(embedded_quote_pattern, html))
for match in reversed(matches):  # Reverse to maintain positions
    start, end = match.span(2)
    html = html[:start] + '\\"' + html[start+1:end-1] + '\\"' + html[end:]
fixes_count += len(matches)
print(f"  Fixed {len(matches)} embedded quote issues")

# Fix coordinate formats (N01°02.3' -> N01°02.3\\')
coord_pattern = r'(\d+°\d+\.\d+)\''
coord_matches = re.findall(coord_pattern, html)
html = re.sub(coord_pattern, r"\1\\'", html)
print(f"  Fixed {len(coord_matches)} coordinate quote issues")

# Step 5: Write the fixed file
print("\n[5/5] Writing fixed index.html...")
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("\n" + "="*80)
print("✓ COMPLETE!")
print("="*80)
print(f"✓ Added {len(missing_questions)} missing questions")
print(f"✓ Total compass-egyptair questions: {len(all_questions)}")
print(f"✓ Number of tests: {len(tests_built)}")
print(f"✓ Fixed approximately {fixes_count + len(coord_matches)} syntax errors")
print("="*80)
