import json
import re

# Read the correctedErrors file
with open('const correctedErrors 15.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove JavaScript syntax to extract JSON
content = content.replace('const correctedErrors = ', '').strip()
if content.endswith('];'):
    content = content[:-1]  # Remove trailing ];
if content.endswith(';'):
    content = content[:-1]  # Remove trailing ;

# Parse the JSON array
corrections = json.loads(content)

print(f"Found {len(corrections)} corrections to apply")

# Read testData_complete.js
with open('testData_complete.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

# Remove JavaScript comments to parse JSON
json_str = re.sub(r'/\*.*?\*/', '', js_content, flags=re.DOTALL)
json_str = json_str.replace('window.testData = ', '').strip()
if json_str.endswith(';'):
    json_str = json_str[:-1]

# Parse the JavaScript object
test_data = json.loads(json_str)

# Category mapping
category_map = {
    'human-performance': 'human-performance-and-limitations',
    'flight-performance': 'performance',
    'communications': 'aircraft-general-knowledge',
    'flight-controls': 'aircraft-general-knowledge',
    'aon-aviation-knowledge': 'aircraft-general-knowledge'
}

# Apply corrections
updated_count = 0
not_found_count = 0
already_correct_count = 0

for correction in corrections:
    # Extract category name from the format "category-test-N"
    category_field = correction.get('category', '')
    
    # Parse the category (remove -test-N suffix if present)
    if '-test-' in category_field:
        category = category_field.rsplit('-test-', 1)[0]
    else:
        category = category_field
    
    # Map category name if needed
    if category in category_map:
        category = category_map[category]
    
    if category not in test_data:
        print(f"✗ Category '{category}' not found, skipping ID {correction.get('id')}")
        not_found_count += 1
        continue
    
    # Search for the question by ID
    question_id = correction.get('id')
    found = False
    
    for test in test_data[category]['tests']:
        for q in test['questions']:
            # Skip if question doesn't have required fields
            if 'question' not in q or 'id' not in q:
                continue
            
            # Match by ID
            if q['id'] == question_id:
                found = True
                
                # Check if already correct
                if (q['answer'] == correction['answer'] and 
                    q['correct'] == correction['correct'] and
                    q.get('explanation', '') == correction.get('explanation', '')):
                    print(f"✓ ID {q['id']}: Already correct - '{q['question'][:60]}...'")
                    already_correct_count += 1
                else:
                    old_answer = q['answer']
                    old_correct = q['correct']
                    old_explanation = q.get('explanation', '')
                    
                    # Update the answer, correct index, and explanation
                    q['answer'] = correction['answer']
                    q['correct'] = correction['correct']
                    q['explanation'] = correction.get('explanation', '')
                    
                    # Update options if provided
                    if 'options' in correction:
                        q['options'] = correction['options']
                    
                    print(f"✓ Updated ID {q['id']}: '{q['question'][:60]}...'")
                    print(f"  Old: {old_answer} (index {old_correct})")
                    print(f"  New: {q['answer']} (index {q['correct']})")
                    if old_explanation != correction.get('explanation', ''):
                        print(f"  Explanation updated")
                    updated_count += 1
                break
        if found:
            break
    
    if not found:
        print(f"✗ Question ID {question_id} not found: '{correction.get('question', '')[:60]}...'")
        not_found_count += 1

print(f"\n" + "="*70)
print(f"SUMMARY")
print(f"="*70)
print(f"✓ Updated: {updated_count}")
print(f"✓ Already correct: {already_correct_count}")
print(f"✗ Not found: {not_found_count}")
print(f"Total processed: {len(corrections)}")

if updated_count > 0:
    # Create backup
    import shutil
    shutil.copy('testData_complete.js', 'testData_complete.js.backup_before_corrections15')
    
    # Write updated data back to file
    with open('testData_complete.js', 'w', encoding='utf-8') as f:
        f.write('window.testData = ')
        f.write(json.dumps(test_data, indent=2, ensure_ascii=False))
        f.write(';')
    
    print(f"\n✓ Backup created: testData_complete.js.backup_before_corrections15")
    print(f"✓ Updated testData_complete.js")
else:
    print("\n✓ No changes needed - all corrections already applied")
