import json
import re

# Read the unmatched questions file
with open('unmatched question 2.txt', 'r', encoding='utf-8-sig') as f:
    content = f.read()

# Remove any [cite_start] markers and [cite: X] citations
content = content.replace('[cite_start]', '')
content = re.sub(r'\[cite:\s*\d+\]', '', content)

# Parse the JSON
new_questions = json.loads(content)

print(f"Found {len(new_questions)} questions to add")

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

# Get current max ID
max_id = 0
for category in test_data.values():
    if 'tests' in category:
        for test in category['tests']:
            if 'questions' in test:
                for q in test['questions']:
                    if q.get('id') and q['id'] > max_id:
                        max_id = q['id']

print(f"Current max ID: {max_id}")

# Category mapping
category_map = {
    'human-performance': 'human-performance-and-limitations',
    'flight-performance': 'performance',
    'communications': 'aircraft-general-knowledge',
    'flight-controls': 'aircraft-general-knowledge',
    'aon-aviation-knowledge': 'aircraft-general-knowledge'
}

# Add new questions
added_count = 0
skipped_count = 0
next_id = max_id + 1

for new_q in new_questions:
    # Map category name if needed
    category = new_q.get('category', '')
    if category in category_map:
        category = category_map[category]
    
    # If category doesn't exist, try to add to aircraft-general-knowledge
    if category not in test_data:
        if 'aircraft-general-knowledge' in test_data:
            category = 'aircraft-general-knowledge'
        else:
            print(f"Skipping question - category '{new_q.get('category')}' not found")
            skipped_count += 1
            continue
    
    test_num = new_q.get('test', 1)
    
    # Find the test in the tests array
    test_found = False
    for test in test_data[category]['tests']:
        # Extract test number from test id (e.g., "aircraft-general-knowledge-test-1" -> 1)
        test_id_parts = test['id'].split('-test-')
        if len(test_id_parts) == 2:
            current_test_num = int(test_id_parts[1])
            if current_test_num == test_num:
                test_found = True
                
                # Check if question already exists (by question text)
                question_text = new_q['question'].lower().strip()
                exists = False
                for existing_q in test['questions']:
                    if existing_q['question'].lower().strip() == question_text:
                        exists = True
                        print(f"Question already exists: '{new_q['question'][:60]}...'")
                        break
                
                if exists:
                    skipped_count += 1
                    break
                
                # Update category field to match format
                new_q['category'] = test['id']
                
                # Assign new sequential ID
                new_q['id'] = next_id
                next_id += 1
                
                # Add to the test questions
                test['questions'].append(new_q)
                added_count += 1
                print(f"Added question ID {new_q['id']}: '{new_q['question'][:60]}...' to {category}/test{test_num}")
                break
    
    if not test_found and category in test_data:
        print(f"Warning: Test {test_num} not found in {category}, skipping question")
        skipped_count += 1

print(f"\n✓ Added {added_count} new questions")
print(f"✗ Skipped {skipped_count} questions (duplicates or missing category)")
print(f"New max ID: {next_id - 1}")

# Create backup
import shutil
shutil.copy('testData_complete.js', 'testData_complete.js.backup_before_unmatched2')

# Write updated data back to file
with open('testData_complete.js', 'w', encoding='utf-8') as f:
    f.write('window.testData = ')
    f.write(json.dumps(test_data, indent=2, ensure_ascii=False))
    f.write(';')

print(f"\n✓ Backup created: testData_complete.js.backup_before_unmatched2")
print(f"✓ Updated testData_complete.js")

# Create report
with open('UNMATCHED_QUESTIONS_2_ADDED.md', 'w', encoding='utf-8') as f:
    f.write("# Unmatched Questions 2 Addition Report\n\n")
    f.write(f"**Date**: {re.sub(r'[0-9]{4}-[0-9]{2}-[0-9]{2}', '2025-12-09', '2025-12-09')}\n\n")
    f.write(f"## Summary\n\n")
    f.write(f"- **Total questions in file**: {len(new_questions)}\n")
    f.write(f"- **Questions added**: {added_count}\n")
    f.write(f"- **Questions skipped**: {skipped_count}\n")
    f.write(f"- **New ID range**: {max_id + 1} to {next_id - 1}\n\n")
    
    if added_count > 0:
        f.write(f"## Added Questions\n\n")
        for new_q in new_questions:
            if new_q.get('id') and new_q['id'] > max_id:
                f.write(f"### ID {new_q['id']} - {new_q.get('category', 'N/A')}/Test {new_q.get('test', 'N/A')}\n\n")
                f.write(f"**Question**: {new_q['question']}\n\n")
                f.write(f"**Answer**: {new_q['answer']}\n\n")
                f.write(f"---\n\n")

print(f"✓ Report created: UNMATCHED_QUESTIONS_2_ADDED.md")
