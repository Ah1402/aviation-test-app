from __future__ import annotations

import re

print("="*80)
print("ADD MISSING QUESTIONS + FIX ALL ERRORS")
print("="*80)

# Read files
print("\n[1/4] Reading files...")
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

with open('egyptair compass id.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

# Step 1: Add the 9 missing questions
print("\n[2/4] Adding 9 missing questions to compass-egyptair...")
missing_ids: list[int] = [1457, 1468, 1473, 1483, 1527, 1623, 1624, 1628, 1649]
missing_questions: list[tuple[int, int, str]] = []

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
                # Calculate which test this question belongs to (based on ID range)
                test_num = ((missing_id - 1424) // 30) + 1
                
                options_str = ',\n                            '.join([f'"{opt}"' for opt in options])
                q_obj = f'''                    {{
                        "category": "compass-egyptair-test-{test_num}",
                        "test": {test_num},
                        "id": {missing_id},
                        "question": "{question_text}",
                        "options": [
                            {options_str}
                        ],
                        "answer": "{options[correct]}",
                        "correct": {correct},
                        "explanation": "{explanation}"
                    }}'''
                
                missing_questions.append((missing_id, test_num, q_obj))
                print(f"  ✓ ID {missing_id} -> Test {test_num}")

# Now insert each missing question into the appropriate test
for mid, test_num, q_obj in sorted(missing_questions):
    # Find the test section
    test_pattern = rf'"id":\s*"compass-egyptair-test-{test_num}".*?"questions":\s*\['
    test_match = re.search(test_pattern, html, re.DOTALL)
    
    if test_match:
        # Find all questions in this test to determine where to insert
        test_start = test_match.end()
        
        # Find questions until the closing bracket of this test
        questions_section_match = re.search(r'\[.*?\n\s{16}\]', html[test_match.start():], re.DOTALL)
        if questions_section_match:
            questions_section = questions_section_match.group(0)
            
            # Find the position to insert (before the closing bracket)
            insert_pos = test_match.start() + questions_section_match.end() - len('\n                ]')
            
            # Get the last question to see if we need a comma
            last_question_match = re.search(r'\}\s*$', questions_section[:questions_section_match.end() - len('\n                ]')])
            if last_question_match:
                # Insert with leading comma
                html = html[:insert_pos] + ',\n' + q_obj + html[insert_pos:]
            else:
                # First question in test
                html = html[:insert_pos] + q_obj + html[insert_pos:]

print(f"Added {len(missing_questions)} questions")

# Step 2: Fix apostrophe errors
print("\n[3/4] Fixing apostrophe errors...")
apostrophe_fixes = 0

# Find all string values and fix unescaped apostrophes
# Pattern: word + 's that is NOT already escaped
def fix_apostrophes(text: str) -> str:
    # Replace 's with \\'s but only if not already escaped
    return re.sub(r"(?<!\\)(\w)'s", r"\1\\'s", text)

# Process each field type
for field in ['question', 'answer', 'explanation']:
    pattern = rf'("{field}":\s*")([^"]*?)(")'
    matches = list(re.finditer(pattern, html, re.DOTALL))
    
    for match in reversed(matches):
        original_value = match.group(2)
        fixed_value = fix_apostrophes(original_value)
        
        if original_value != fixed_value:
            html = html[:match.start(2)] + fixed_value + html[match.end(2):]
            apostrophe_fixes += 1

# Fix in options
option_pattern = r'("options":\s*\[)(.*?)(\])'
matches = list(re.finditer(option_pattern, html, re.DOTALL))

for match in reversed(matches):
    original_value = match.group(2)
    fixed_value = fix_apostrophes(original_value)
    
    if original_value != fixed_value:
        html = html[:match.start(2)] + fixed_value + html[match.end(2):]
        apostrophe_fixes += 1

print(f"  Fixed {apostrophe_fixes} apostrophe errors")

# Step 3: Fix coordinate quotes
print("\n[4/4] Fixing coordinate quote marks...")
coord_fixes = 0
coord_pattern = r'(\d+°\d+\.\d+)\''
coord_matches = list(re.finditer(coord_pattern, html))

for match in reversed(coord_matches):
    html = html[:match.end()-1] + "\\'" + html[match.end():]
    coord_fixes += 1

print(f"  Fixed {coord_fixes} coordinate quotes")

# Write file
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("\n" + "="*80)
print("✓ COMPLETE!")
print("="*80)
print(f"✓ Added {len(missing_questions)} missing questions")
print(f"✓ Fixed {apostrophe_fixes} apostrophe errors")
print(f"✓ Fixed {coord_fixes} coordinate quote errors")
print(f"✓ Total errors fixed: {apostrophe_fixes + coord_fixes}")
print("="*80)
