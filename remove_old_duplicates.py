import json
import re
from collections import defaultdict

print("=" * 70)
print("REMOVING OLD DUPLICATES - KEEPING NEWER ADDITIONS")
print("=" * 70)

# Read the JavaScript file
with open('testData_complete.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

# Extract the testData object
match = re.search(r'window\.testData = ({.*});', js_content, re.DOTALL)
if not match:
    print("ERROR: Could not find testData object")
    exit(1)

json_str = match.group(1)
json_str = re.sub(r'/\*.*?\*/', '', json_str, flags=re.DOTALL)
json_str = re.sub(r'//.*?$', '', json_str, flags=re.MULTILINE)

test_data = json.loads(json_str)

# The newly added questions start from ID 1388 onwards (from unmatched questions)
# So we want to keep higher IDs when there are duplicates

# Collect all questions with their positions in the file
all_questions = []
for category_name, category_data in test_data.items():
    if 'tests' in category_data:
        for test_idx, test in enumerate(category_data['tests']):
            if 'questions' in test:
                for q_idx, q in enumerate(test['questions']):
                    all_questions.append({
                        'id': q.get('id'),
                        'category': category_name,
                        'test_idx': test_idx,
                        'q_idx': q_idx,
                        'question': q.get('question', '').strip(),
                        'answer': q.get('answer', '').strip(),
                        'correct': q.get('correct', -1),
                        'obj': q
                    })

print(f"\n✓ Total questions found: {len(all_questions)}")
print(f"✓ Newly added questions (ID >= 1388): {len([q for q in all_questions if q['id'] and q['id'] >= 1388])}")

# Find duplicates based on question text
question_map = defaultdict(list)
for q in all_questions:
    normalized = ' '.join(q['question'].lower().split())
    question_map[normalized].append(q)

# Identify questions to remove (keep the one with highest ID)
questions_to_remove = []
duplicates_found = 0

for question_text, questions in question_map.items():
    if len(questions) > 1:
        duplicates_found += 1
        # Sort by ID (descending) to keep the newest, handle None values
        questions_sorted = sorted(questions, key=lambda x: x['id'] if x['id'] else 0, reverse=True)
        
        # Keep the first one (highest ID), remove the rest
        keep = questions_sorted[0]
        remove = questions_sorted[1:]
        
        print(f"\n[{duplicates_found}] Duplicate found:")
        print(f"    Question: {question_text[:80]}...")
        print(f"    KEEPING: ID {keep['id']} ({keep['category']})")
        for r in remove:
            print(f"    REMOVING: ID {r['id']} ({r['category']})")
            questions_to_remove.append(r['id'])

print(f"\n{'=' * 70}")
print(f"SUMMARY:")
print(f"  • Total duplicate sets found: {duplicates_found}")
print(f"  • Questions to remove: {len(questions_to_remove)}")
print(f"{'=' * 70}")

if not questions_to_remove:
    print("\nNo questions to remove!")
    exit(0)

# Create backup
import shutil
shutil.copy('testData_complete.js', 'testData_complete.js.backup_before_dedup')
print(f"\n✓ Backup created: testData_complete.js.backup_before_dedup")

# Remove the questions from test_data
removed_count = 0
for category_name, category_data in test_data.items():
    if 'tests' in category_data:
        for test in category_data['tests']:
            if 'questions' in test:
                original_count = len(test['questions'])
                test['questions'] = [q for q in test['questions'] if q.get('id') not in questions_to_remove]
                removed_count += original_count - len(test['questions'])

print(f"\n✓ Removed {removed_count} duplicate questions")

# Write back to file
output_js = f"window.testData = {json.dumps(test_data, indent=2, ensure_ascii=False)};"

with open('testData_complete.js', 'w', encoding='utf-8') as f:
    f.write(output_js)

print(f"✓ Updated testData_complete.js")

# Verify
new_total = sum(len(test['questions']) for cat in test_data.values() if 'tests' in cat for test in cat['tests'] if 'questions' in test)
print(f"\n{'=' * 70}")
print(f"BEFORE: {len(all_questions)} questions")
print(f"AFTER: {new_total} questions")
print(f"REMOVED: {len(all_questions) - new_total} questions")
print(f"{'=' * 70}")
