import json
import re

print("=" * 60)
print("ADDING REMAINING UNMATCHED QUESTIONS")
print("=" * 60)

# Category name mappings
category_mapping = {
    'human-performance': 'human-performance-and-limitations',
    'flight-performance': 'performance',
    # communications and flight-controls might be part of aircraft-general-knowledge or instrumentation
}

# Read the file
with open('unmatched questions.txt', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('[cite_start]', '')

# Parse arrays
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
                except json.JSONDecodeError:
                    current_pos = pos + 1
                    break
        pos += 1
    else:
        break

all_questions = []
for array in arrays:
    all_questions.extend(array)

# Filter to only the categories that weren't added
remaining_questions = []
for q in all_questions:
    original_cat = q['category']
    if original_cat in ['human-performance', 'flight-performance', 'communications', 'flight-controls']:
        # Map category if needed
        mapped_cat = category_mapping.get(original_cat, original_cat)
        q['mapped_category'] = mapped_cat
        remaining_questions.append(q)

print(f"\nFound {len(remaining_questions)} remaining questions to add")

# Read the JavaScript file
with open('testData_complete.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

# Find current max ID
id_matches = re.findall(r'"id":\s*(\d+),', js_content)
max_id = max([int(id_val) for id_val in id_matches])
print(f"Current max ID: {max_id}")

# Group by mapped category and test
questions_by_section = {}
for q in remaining_questions:
    cat = q['mapped_category']
    test = q['test']
    key = (cat, test)
    if key not in questions_by_section:
        questions_by_section[key] = []
    questions_by_section[key].append(q)

next_id = max_id + 1
added_count = 0

# Add each group
for (category, test_num), questions in sorted(questions_by_section.items()):
    section_id = f"{category}-test-{test_num}"
    
    print(f"\nProcessing {section_id} ({len(questions)} questions)...")
    
    # Find the category
    category_pattern = r'"' + re.escape(category) + r'":\s*\{'
    category_match = re.search(category_pattern, js_content)
    
    if not category_match:
        print(f"  ⚠ Could not find category '{category}'")
        # Try adding to aircraft-general-knowledge if it's flight-controls or communications
        if category in ['flight-controls', 'communications']:
            print(f"  → Trying aircraft-general-knowledge instead...")
            category = 'aircraft-general-knowledge'
            section_id = f"{category}-test-{test_num}"
            category_pattern = r'"' + re.escape(category) + r'":\s*\{'
            category_match = re.search(category_pattern, js_content)
            if not category_match:
                print(f"  ⚠ Still could not find category")
                continue
        else:
            continue
    
    # Find the test
    test_pattern = r'"id":\s*"' + re.escape(section_id) + r'"'
    test_match = re.search(test_pattern, js_content[category_match.start():])
    
    if not test_match:
        print(f"  ⚠ Could not find test '{section_id}'")
        continue
    
    test_start = category_match.start() + test_match.end()
    
    # Find questions array
    questions_pattern = r'"questions":\s*\['
    questions_match = re.search(questions_pattern, js_content[test_start:test_start + 500])
    
    if not questions_match:
        print(f"  ⚠ Could not find questions array")
        continue
    
    # Find end of questions array
    start_pos = test_start + questions_match.end()
    bracket_count = 1
    pos = start_pos
    
    while pos < len(js_content) and bracket_count > 0:
        if js_content[pos] == '[':
            bracket_count += 1
        elif js_content[pos] == ']':
            bracket_count -= 1
        pos += 1
    
    insert_pos = pos - 1
    
    # Check if we need a comma
    temp_pos = insert_pos - 1
    while temp_pos > start_pos and js_content[temp_pos].isspace():
        temp_pos -= 1
    
    needs_comma = js_content[temp_pos] == '}'
    
    # Build questions
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
    
    # Convert to JSON
    questions_str = json.dumps(questions_json, indent=2, ensure_ascii=False)
    questions_str = questions_str[1:-1].strip()
    questions_str = '\n'.join(['          ' + line for line in questions_str.split('\n')])
    
    if needs_comma:
        questions_str = ',\n' + questions_str
    
    # Insert
    js_content = js_content[:insert_pos] + questions_str + '\n' + js_content[insert_pos:]
    
    print(f"  ✓ Added {len(questions)} questions (IDs {next_id - len(questions)} to {next_id - 1})")

# Write back
with open('testData_complete.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"\n{'=' * 60}")
print(f"✓ SUCCESS: Added {added_count} more questions")
print(f"✓ New ID range: {max_id + 1} to {next_id - 1}")
print(f"✓ Total questions now: {next_id - 1}")
print(f"{'=' * 60}")
