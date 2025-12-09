import json
import re

print("=" * 60)
print("ADDING UNMATCHED QUESTIONS TO testData_complete.js")
print("=" * 60)

# Read the file and handle multiple JSON arrays
with open('unmatched questions.txt', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the [cite_start] markers
content = content.replace('[cite_start]', '')

# Find all JSON arrays in the file
arrays = []
current_pos = 0
while True:
    start = content.find('[', current_pos)
    if start == -1:
        break
    
    bracket_count = 0
    pos = start
    while pos < len(content):
        if content[pos] == '[':
            bracket_count += 1
        elif content[pos] == ']':
            bracket_count -= 1
            if bracket_count == 0:
                try:
                    array_text = content[start:pos+1]
                    array = json.loads(array_text)
                    arrays.append(array)
                    current_pos = pos + 1
                    break
                except json.JSONDecodeError as e:
                    print(f"Error parsing array starting at {start}: {e}")
                    current_pos = pos + 1
                    break
        pos += 1
    else:
        break

# Combine all arrays
all_questions = []
for array in arrays:
    all_questions.extend(array)

print(f"\n✓ Found {len(all_questions)} questions in unmatched questions.txt")

# Group questions by category and test
questions_by_category_test = {}
for q in all_questions:
    category = q['category']
    test = q['test']
    key = (category, test)
    if key not in questions_by_category_test:
        questions_by_category_test[key] = []
    questions_by_category_test[key].append(q)

print(f"✓ Grouped into {len(questions_by_category_test)} category-test combinations\n")

# Read the JavaScript file
with open('testData_complete.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

# Find the highest current ID
id_matches = re.findall(r'"id":\s*(\d+),', js_content)
max_id = max([int(id_val) for id_val in id_matches])
print(f"✓ Current highest ID in testData_complete.js: {max_id}")

next_id = max_id + 1
added_count = 0

# For each category-test combination, find the section and add questions
for (category, test_num), questions in sorted(questions_by_category_test.items()):
    # Create the section identifier - it should be category-test-number
    section_id = f"{category}-test-{test_num}"
    
    print(f"\nProcessing {section_id} ({len(questions)} questions)...")
    
    # Find this section in the file
    # First, find the category block
    category_pattern = r'"' + re.escape(category) + r'":\s*\{'
    category_match = re.search(category_pattern, js_content)
    
    if not category_match:
        print(f"  ⚠ WARNING: Could not find category '{category}'")
        continue
    
    # Now find the specific test within that category
    # Look for the test ID
    test_pattern = r'"id":\s*"' + re.escape(section_id) + r'"'
    test_match = re.search(test_pattern, js_content[category_match.start():])
    
    if not test_match:
        print(f"  ⚠ WARNING: Could not find test '{section_id}' in category")
        continue
    
    # Find the questions array for this test
    # Adjust position to be relative to full content
    test_start = category_match.start() + test_match.end()
    
    # Look for "questions": [
    questions_pattern = r'"questions":\s*\['
    questions_match = re.search(questions_pattern, js_content[test_start:test_start + 500])
    
    if not questions_match:
        print(f"  ⚠ WARNING: Could not find questions array for '{section_id}'")
        continue
    
    # Find the end of the questions array for this section
    # We need to find the closing ] of the questions array
    start_pos = test_start + questions_match.end()
    bracket_count = 1
    pos = start_pos
    
    while pos < len(js_content) and bracket_count > 0:
        if js_content[pos] == '[':
            bracket_count += 1
        elif js_content[pos] == ']':
            bracket_count -= 1
        pos += 1
    
    if bracket_count != 0:
        print(f"⚠ WARNING: Could not find end of questions array for '{section_id}'")
        continue
    
    # pos is now right after the closing ] 
    # We need to insert before the ]
    insert_pos = pos - 1
    
    # Find the last question in this section to see if we need a comma
    # Look backwards for the last }
    temp_pos = insert_pos - 1
    while temp_pos > start_pos and js_content[temp_pos].isspace():
        temp_pos -= 1
    
    needs_comma = js_content[temp_pos] == '}'
    
    # Build the questions to insert
    questions_json = []
    for q in questions:
        new_q = {
            'category': section_id,
            'test': test_num,
            'id': next_id,
            'question': q['question'],
            'options': q['options'],
            'answer': q['answer'],
            'correct': q['correct'],
            'explanation': q.get('explanation', '')
        }
        questions_json.append(new_q)
        next_id += 1
        added_count += 1
    
    # Convert to JSON string with proper indentation
    questions_str = json.dumps(questions_json, indent=2, ensure_ascii=False)
    # Remove the outer array brackets
    questions_str = questions_str[1:-1].strip()
    
    # Add proper indentation (10 spaces to match existing format)
    questions_str = '\n'.join(['          ' + line for line in questions_str.split('\n')])
    
    # Add comma before if needed
    if needs_comma:
        questions_str = ',\n' + questions_str
    
    # Insert into the file
    js_content = js_content[:insert_pos] + questions_str + '\n' + js_content[insert_pos:]
    
    print(f"  ✓ Added {len(questions)} questions (IDs {next_id - len(questions)} to {next_id - 1})")

# Write back to file
with open('testData_complete.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"\n{'=' * 60}")
print(f"✓ SUCCESS: Added {added_count} questions to testData_complete.js")
print(f"✓ New ID range: {max_id + 1} to {next_id - 1}")
print(f"✓ Total questions now: {next_id - 1}")
print(f"{'=' * 60}")
