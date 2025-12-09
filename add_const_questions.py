import json
import re

# Read the const aviationQuestions file
with open('const aviationQuestions = [.txt', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the questions manually since it's JavaScript format
# Parse the two questions
questions_to_add = []

# Question 1
q1 = {
    "category": "aircraft-general-knowledge",
    "test": 1,
    "id": None,  # Will assign later
    "question": "What is the primary purpose of the flaps on an airplane?",
    "options": [
        "To increase lift and drag to allow for steeper approaches and slower landing speeds.",
        "To decrease drag and increase lift for higher cruising speeds.",
        "To increase lateral stability during turns."
    ],
    "answer": "To increase lift and drag to allow for steeper approaches and slower landing speeds.",
    "correct": 0,
    "explanation": "Extending flaps increases the camber of the wing, which increases both lift and drag. This allows the aircraft to descend at a steeper angle without increasing airspeed."
}

# Question 2
q2 = {
    "category": "aircraft-general-knowledge",
    "test": 1,
    "id": None,  # Will assign later
    "question": "Which V-speed represents maneuvering speed?",
    "options": [
        "Vne",
        "Va",
        "Vno"
    ],
    "answer": "Va",
    "correct": 1,
    "explanation": "Va is the design maneuvering speed. Do not use full or abrupt control movements above this speed."
}

questions_to_add = [q1, q2]

print(f"Found {len(questions_to_add)} questions to add")

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

# Add new questions
added_count = 0
skipped_count = 0
next_id = max_id + 1

for new_q in questions_to_add:
    category = 'aircraft-general-knowledge'
    
    if category not in test_data:
        print(f"Category '{category}' not found, skipping")
        skipped_count += 1
        continue
    
    # Find test 1
    test_found = False
    for test in test_data[category]['tests']:
        test_id_parts = test['id'].split('-test-')
        if len(test_id_parts) == 2 and int(test_id_parts[1]) == 1:
            test_found = True
            
            # Check if question already exists (by question text)
            question_text = new_q['question'].lower().strip()
            exists = False
            for existing_q in test['questions']:
                if 'question' in existing_q and existing_q['question'].lower().strip() == question_text:
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
            print(f"✓ Added question ID {new_q['id']}: '{new_q['question'][:60]}...'")
            break
    
    if not test_found:
        print(f"Warning: Test 1 not found in {category}, skipping question")
        skipped_count += 1

print(f"\n✓ Added {added_count} new questions")
print(f"✗ Skipped {skipped_count} questions (duplicates)")
print(f"New max ID: {next_id - 1}")

if added_count > 0:
    # Create backup
    import shutil
    shutil.copy('testData_complete.js', 'testData_complete.js.backup_before_const_questions')
    
    # Write updated data back to file
    with open('testData_complete.js', 'w', encoding='utf-8') as f:
        f.write('window.testData = ')
        f.write(json.dumps(test_data, indent=2, ensure_ascii=False))
        f.write(';')
    
    print(f"\n✓ Backup created: testData_complete.js.backup_before_const_questions")
    print(f"✓ Updated testData_complete.js")
else:
    print("\nNo changes made to testData_complete.js")
