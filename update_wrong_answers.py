import json
import re

# Read the wrong answers file
with open('wrong answers .txt', 'r', encoding='utf-8-sig') as f:
    content = f.read()

# Remove any [cite_start] markers and [cite: X] citations
content = content.replace('[cite_start]', '')
content = re.sub(r'\[cite:\s*\d+\]', '', content)

# Parse the JSON
corrections = json.loads(content)

print(f"Found {len(corrections)} answer corrections to apply")

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

# Update answers
updated_count = 0
not_found_count = 0
already_correct_count = 0

for correction in corrections:
    # Map category name if needed
    category = correction.get('category', '')
    if category in category_map:
        category = category_map[category]
    
    if category not in test_data:
        print(f"Category '{correction.get('category')}' not found, skipping")
        not_found_count += 1
        continue
    
    # Search for the question by ID
    question_id = correction.get('id')
    question_text = correction['question'].lower().strip()
    found = False
    
    for test in test_data[category]['tests']:
        for q in test['questions']:
            # Skip if question doesn't have required fields
            if 'question' not in q:
                continue
            
            # Match by ID or by question text
            if (q.get('id') == question_id) or (q['question'].lower().strip() == question_text):
                found = True
                
                # Check if already correct
                if q['answer'] == correction['answer'] and q['correct'] == correction['correct']:
                    print(f"✓ ID {q['id']}: Already correct - '{q['question'][:60]}...'")
                    already_correct_count += 1
                else:
                    old_answer = q['answer']
                    old_correct = q['correct']
                    
                    # Update the answer
                    q['answer'] = correction['answer']
                    q['correct'] = correction['correct']
                    q['explanation'] = correction.get('explanation', q.get('explanation', ''))
                    
                    print(f"✓ Updated ID {q['id']}: '{q['question'][:60]}...'")
                    print(f"  Old answer: {old_answer} (index {old_correct})")
                    print(f"  New answer: {q['answer']} (index {q['correct']})")
                    updated_count += 1
                break
        if found:
            break
    
    if not found:
        print(f"✗ Question not found: '{correction['question'][:60]}...' (ID: {question_id})")
        not_found_count += 1

print(f"\n✓ Updated {updated_count} answers")
print(f"✓ Already correct: {already_correct_count}")
print(f"✗ Not found: {not_found_count}")

# Create backup
import shutil
shutil.copy('testData_complete.js', 'testData_complete.js.backup_before_wrong_answers')

# Write updated data back to file
with open('testData_complete.js', 'w', encoding='utf-8') as f:
    f.write('window.testData = ')
    f.write(json.dumps(test_data, indent=2, ensure_ascii=False))
    f.write(';')

print(f"\n✓ Backup created: testData_complete.js.backup_before_wrong_answers")
print(f"✓ Updated testData_complete.js")

# Create report
with open('WRONG_ANSWERS_CORRECTED.md', 'w', encoding='utf-8') as f:
    f.write("# Wrong Answers Correction Report\n\n")
    f.write(f"**Date**: 2025-12-09\n\n")
    f.write(f"## Summary\n\n")
    f.write(f"- **Total corrections in file**: {len(corrections)}\n")
    f.write(f"- **Answers updated**: {updated_count}\n")
    f.write(f"- **Already correct**: {already_correct_count}\n")
    f.write(f"- **Not found**: {not_found_count}\n\n")
    
    if updated_count > 0:
        f.write(f"## Updated Questions\n\n")
        for correction in corrections:
            category = correction.get('category', '')
            if category in category_map:
                category = category_map[category]
            
            if category in test_data:
                for test in test_data[category]['tests']:
                    for q in test['questions']:
                        # Skip if question doesn't have required fields
                        if 'question' not in q:
                            continue
                        
                        if q.get('id') == correction.get('id') or q['question'].lower().strip() == correction['question'].lower().strip():
                            if q['answer'] == correction['answer']:
                                f.write(f"### ID {q['id']} - {category}/Test {correction.get('test', 'N/A')}\n\n")
                                f.write(f"**Question**: {q['question']}\n\n")
                                f.write(f"**Correct Answer**: {q['answer']} (Option {q['correct']})\n\n")
                                f.write(f"**Explanation**: {q['explanation']}\n\n")
                                f.write(f"---\n\n")
                            break

print(f"✓ Report created: WRONG_ANSWERS_CORRECTED.md")
