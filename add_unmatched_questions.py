import json
import re

# Read the file and handle multiple JSON arrays
with open('unmatched questions.txt', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the [cite_start] markers
content = content.replace('[cite_start]', '')

# Find all JSON arrays in the file
arrays = []
current_pos = 0
while True:
    # Find the start of a JSON array
    start = content.find('[', current_pos)
    if start == -1:
        break
    
    # Find the matching closing bracket
    bracket_count = 0
    pos = start
    while pos < len(content):
        if content[pos] == '[':
            bracket_count += 1
        elif content[pos] == ']':
            bracket_count -= 1
            if bracket_count == 0:
                # Found the end of this array
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

print(f"Found {len(all_questions)} questions in total")

# Read the testData_complete.js file
with open('testData_complete.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the testData object
match = re.search(r'window\.testData = ({.*});', content, re.DOTALL)
if not match:
    print("ERROR: Could not find testData object")
    exit(1)

test_data = json.loads(match.group(1))

# Find the highest current ID
max_id = 1387

# Group unmatched questions by category and test
questions_by_category_test = {}
for q in all_questions:
    category = q['category']
    test = q['test']
    key = (category, test)
    if key not in questions_by_category_test:
        questions_by_category_test[key] = []
    questions_by_category_test[key].append(q)

print(f"\nGrouped into {len(questions_by_category_test)} category-test combinations:")
for key, questions in questions_by_category_test.items():
    print(f"  {key[0]}, test {key[1]}: {len(questions)} questions")

# Add questions to the appropriate sections
next_id = max_id + 1
added_count = 0

for (category, test_num), questions in questions_by_category_test.items():
    # Find the category in test_data
    if category not in test_data:
        print(f"WARNING: Category '{category}' not found in testData")
        continue
    
    # Find the test within the category
    category_data = test_data[category]
    if 'tests' not in category_data:
        print(f"WARNING: No 'tests' array in category '{category}'")
        continue
    
    # Find the specific test
    test_found = False
    for test_obj in category_data['tests']:
        # Match by test number (extract from id or compare directly)
        if 'id' in test_obj:
            test_id_match = re.search(r'-(\d+)$', test_obj['id'])
            if test_id_match and int(test_id_match.group(1)) == test_num:
                test_found = True
                # Add questions to this test
                for q in questions:
                    new_q = {
                        'category': f"{category}-test-{test_num}",
                        'test': test_num,
                        'id': next_id,
                        'question': q['question'],
                        'options': q['options'],
                        'answer': q['answer'],
                        'correct': q['correct'],
                        'explanation': q.get('explanation', '')
                    }
                    test_obj['questions'].append(new_q)
                    next_id += 1
                    added_count += 1
                    print(f"Added question ID {new_q['id']} to {category}-test-{test_num}")
                break
    
    if not test_found:
        print(f"WARNING: Test {test_num} not found in category '{category}'")

# Write back to file
output_js = f"window.testData = {json.dumps(test_data, indent=2, ensure_ascii=False)};"

with open('testData_complete.js', 'w', encoding='utf-8') as f:
    f.write(output_js)

print(f"\n✓ Successfully added {added_count} questions to testData_complete.js")
print(f"✓ New ID range: {max_id + 1} to {next_id - 1}")
print(f"✓ Total questions now: {next_id - 1}")
