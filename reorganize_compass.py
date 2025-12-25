from __future__ import annotations

import re

print("="*70)
print("COMPASS-EGYPTAIR REORGANIZATION - FINAL VERSION")
print("="*70)

# Read files
print("\n[1/6] Reading files...")
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

with open('egyptair compass id.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

# Count current questions
current_count = html.count('"category": "compass-egyptair-test-1"')
print(f"Current questions in compass-egyptair: {current_count}")

# Extract all IDs from JS file
print("\n[2/6] Extracting all question IDs from egyptair compass id.js...")
js_ids: set[int] = set()
for match in re.finditer(r'\bid:\s*(\d+)', js_content):
    js_ids.add(int(match.group(1)))

print(f"Found {len(js_ids)} questions in JS file (IDs {min(js_ids)}-{max(js_ids)})")

# Extract current IDs from HTML
print("\n[3/6] Extracting current IDs from index.html...")
compass_start = html.find('"compass-egyptair": {')
compass_end_pattern = r'"compass-egyptair":\s*\{.*?\n\s{4}\}'
compass_match = re.search(compass_end_pattern, html, re.DOTALL)
if not compass_match:
    print("✗ Could not find compass section!")
    exit(1)

compass_section = compass_match.group(0)
html_ids: set[int] = set()
for match in re.finditer(r'"id":\s*(\d+)', compass_section):
    html_ids.add(int(match.group(1)))

print(f"Found {len(html_ids)} IDs in current HTML")

# Find missing IDs
missing_ids: list[int] = sorted(js_ids - html_ids)
print(f"\n⚠ Missing {len(missing_ids)} IDs: {missing_ids}")

if len(missing_ids) == 0:
    print("\n✓ No missing questions! Proceeding with reorganization only...")
    # Extract all existing questions and rebuild with tests of 30

# Create a mapping of existing questions (just reorganize, don't add missing yet)
print("\n[4/6] Extracting all existing questions...")
# Find all questions in compass section - now correctly extract the full question object
questions_list: list[tuple[int, str]] = []

# Better pattern - find { starting with "category": "compass-egyptair-test-1"
for match in re.finditer(r'\{[^{}]*?"category":\s*"compass-egyptair-test-1"[^{}]*?\}', compass_section, re.DOTALL):
    q_text = match.group(0)
    
    # Extract ID
    id_match = re.search(r'"id":\s*(\d+)', q_text)
    if id_match:
        qid = int(id_match.group(1))
        questions_list.append((qid, q_text))

print(f"Extracted {len(questions_list)} existing questions")

if len(questions_list) != current_count:
    print(f"⚠ WARNING: Extracted {len(questions_list)} but counted {current_count}!")
    print("Using simple question extraction approach...")
    
    # Fallback: extract using simpler pattern
    fallback_questions: list[tuple[int, str]] = []
    question_blocks: list[str] = compass_section.split('"category": "compass-egyptair-test-1"')
    
    for block in question_blocks[1:]:  # Skip first empty split
        # Find the end of this question object
        brace_count = 1  # We already saw the opening brace
        end_idx = 0
        in_string = False
        escape_next = False
        
        i = 0
        while i < len(block) and brace_count > 0:
            char = block[i]
            
            if escape_next:
                escape_next = False
                i += 1
                continue
            
            if char == '\\':
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
            q_obj = '{' + '"category": "compass-egyptair-test-1"' + block[:end_idx-1]
            id_match = re.search(r'"id":\s*(\d+)', q_obj)
            if id_match:
                qid = int(id_match.group(1))
                fallback_questions.append((qid, q_obj))
    
    questions_list = fallback_questions
    print(f"Fallback extraction found {len(questions_list)} questions")

# Sort by ID
questions_list.sort(key=lambda x: x[0])

print("\n[5/6] Organizing into tests of 30...")
tests_built: list[str] = []

for test_start in range(0, len(questions_list), 30):
    test_num = (test_start // 30) + 1
    test_qs: list[tuple[int, str]] = questions_list[test_start:test_start+30]
    
    # Update each question's category and test number
    updated_qs: list[str] = []
    for qid, q_text in test_qs:
        # Replace category and test
        q_updated = re.sub(r'"category":\s*"[^"]*"', f'"category": "compass-egyptair-test-{test_num}"', q_text)
        q_updated = re.sub(r'"test":\s*\d+', f'"test": {test_num}', q_updated)
        updated_qs.append(q_updated)
    
    # Build test object with proper indentation
    questions_joined = ',\n'.join(['                    ' + q for q in updated_qs])
    
    test_obj = f'''            {{
                "id": "compass-egyptair-test-{test_num}",
                "name": "Test {test_num}",
                "timeLimit": 60,
                "questions": [
{questions_joined}
                ]
            }}'''
    
    tests_built.append(test_obj)
    print(f"  Test {test_num}: {len(test_qs)} questions (IDs {test_qs[0][0]}-{test_qs[-1][0]})")

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
print("\n[6/6] Replacing in index.html...")
new_html = html.replace(compass_section, new_compass_section)

# Write to file
output_path = 'index.html'
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(new_html)

print("\n" + "="*70)
print("✓ SUCCESS!")
print("="*70)
print(f"✓ Total questions: {len(questions_list)}")
print(f"✓ Number of tests: {len(tests_built)}")
print(f"✓ Organization: Tests of 30 questions (last test: {len(questions_list) % 30 or 30} questions)")
print("="*70)
