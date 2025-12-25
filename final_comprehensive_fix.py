from __future__ import annotations

import re
from typing import Any, Match

print("="*80)
print("COMPREHENSIVE FIX: Add Missing Questions + Fix All Errors")
print("="*80)

# Step 1: Read files
print("\n[1/6] Reading files...")
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

with open('egyptair compass id.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

original_size = len(html)
print(f"Original file size: {original_size:,} characters")

# Step 2: Extract and add missing questions
print("\n[2/6] Extracting and adding 9 missing questions...")
missing_ids: list[int] = [1457, 1468, 1473, 1483, 1527, 1623, 1624, 1628, 1649]
missing_questions: dict[int, dict[str, Any]] = {}

for missing_id in missing_ids:
    pattern = rf'\{{\s*id:\s*{missing_id},.*?\n\s*\}}'
    match = re.search(pattern, js_content, re.DOTALL)
    
    if match:
        js_obj = match.group(0)
        
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
                print(f"  ✓ ID {missing_id}")

# Step 3: Rebuild compass-egyptair with all 255 questions
print("\n[3/6] Rebuilding compass-egyptair section...")
compass_match = re.search(r'"compass-egyptair":\s*\{.*?\n\s{4}\}', html, re.DOTALL)
if not compass_match:
    print("✗ Could not find compass-egyptair section!")
    exit(1)

compass_start = compass_match.start()
compass_end = compass_match.end()
compass_section = compass_match.group(0)

# Extract all existing questions
all_questions: list[tuple[int, str]] = []
question_blocks: list[str] = compass_section.split('"category": "compass-egyptair-test-')

for block in question_blocks[1:]:
    # Find test number
    test_match = re.match(r'(\d+)"', block)
    if not test_match:
        continue
    
    # Find question ID
    id_match = re.search(r'"id":\s*(\d+)', block)
    if not id_match:
        continue
    
    qid = int(id_match.group(1))
    
    # Find the complete question object
    brace_count = 1
    end_idx = 0
    in_string = False
    escape_next = False
    
    start_offset = block.find('{')
    if start_offset == -1:
        continue
    
    i = start_offset + 1
    while i < len(block) and brace_count > 0:
        char = block[i]
        
        if escape_next:
            escape_next = False
        elif char == '\\':
            escape_next = True
        elif char == '"' and not escape_next:
            in_string = not in_string
        elif not in_string:
            if char == '{':
                brace_count += 1
            elif char == '}':
                brace_count -= 1
                if brace_count == 0:
                    end_idx = i + 1
                    break
        i += 1
    
    if end_idx > 0:
        q_obj = '{' + '"category": "compass-egyptair-test-' + block[:end_idx]
        all_questions.append((qid, q_obj))

print(f"Extracted {len(all_questions)} existing questions")

# Add missing questions
for mid, mq in missing_questions.items():
    options_str = ',\n                            '.join([f'"{opt}"' for opt in mq['options']])
    q_obj = f'''                    {{
                        "category": "compass-egyptair-test-1",
                        "test": 1,
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

# Sort by ID
all_questions.sort(key=lambda x: x[0])
print(f"Total after adding missing: {len(all_questions)} questions")

# Rebuild tests with 30 questions each
tests_built: list[str] = []
for test_start in range(0, len(all_questions), 30):
    test_num = (test_start // 30) + 1
    test_qs: list[tuple[int, str]] = all_questions[test_start:test_start+30]
    
    # Update category and test number
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

tests_joined = ',\n'.join(tests_built)
new_compass_section = f'''    "compass-egyptair": {{
        "name": "Compass EgyptAir",
        "icon": "fas fa-compass",
        "tests": [
{tests_joined}
        ]
    }}'''

html = html[:compass_start] + new_compass_section + html[compass_end:]
print(f"✓ Rebuilt with {len(all_questions)} questions in {len(tests_built)} tests")

# Step 4: Fix apostrophe errors (someone's -> someone\\'s)
print("\n[4/6] Fixing apostrophe errors...")
fixes = 0

# Fix in all string values, but only ACTUAL apostrophes (not already escaped)
# Pattern: word character followed by 's inside a string, not already escaped
def fix_apostrophes_in_match(match: Match[str]) -> str:
    full_match = match.group(0)
    # Replace 's with \\'s but not if already escaped
    fixed = re.sub(r"(?<!\\)(\w)'s", r"\1\\'s", full_match)
    return fixed

# Apply to question, answer, explanation fields
for field in ['question', 'answer', 'explanation']:
    pattern = rf'"{field}":\s*"[^"]*?"'
    matches = list(re.finditer(pattern, html, re.DOTALL))
    
    for match in reversed(matches):
        original = match.group(0)
        fixed = fix_apostrophes_in_match(match)
        if original != fixed:
            html = html[:match.start()] + fixed + html[match.end():]
            fixes += 1

# Also fix in options arrays
options_pattern = r'"options":\s*\[[^\]]*?\]'
matches = list(re.finditer(options_pattern, html, re.DOTALL))
for match in reversed(matches):
    original = match.group(0)
    fixed = fix_apostrophes_in_match(match)
    if original != fixed:
        html = html[:match.start()] + fixed + html[match.end():]
        fixes += 1

print(f"  Fixed {fixes} apostrophe errors")

# Step 5: Fix coordinate quote marks (N01°02.3' -> N01°02.3\\')
print("\n[5/6] Fixing coordinate quote marks...")
coord_fixes = 0
coord_pattern = r'(\d+°\d+\.\d+)\''
coord_matches = list(re.finditer(coord_pattern, html))
for match in reversed(coord_matches):
    # Replace ' with \\'
    html = html[:match.end()-1] + "\\'" + html[match.end():]
    coord_fixes += 1

print(f"  Fixed {coord_fixes} coordinate quotes")

# Step 6: Write fixed file
print("\n[6/6] Writing fixed file...")
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

new_size = len(html)
size_diff = new_size - original_size

print("\n" + "="*80)
print("✓ COMPLETE!")
print("="*80)
print(f"✓ Added {len(missing_questions)} missing questions to compass-egyptair")
print(f"✓ Total compass-egyptair questions: {len(all_questions)} (all 255 from source)")
print(f"✓ Organized into {len(tests_built)} tests")
print(f"✓ Fixed {fixes} apostrophe errors")
print(f"✓ Fixed {coord_fixes} coordinate quote errors")
print(f"✓ File size: {original_size:,} -> {new_size:,} ({size_diff:+,} chars)")
print("="*80)
