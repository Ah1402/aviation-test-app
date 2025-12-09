import json
import re
from collections import defaultdict

print("=" * 70)
print("DETAILED DUPLICATE ANALYSIS")
print("=" * 70)

# Read the JavaScript file
with open('testData_complete.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

# Extract the testData object
match = re.search(r'window\.testData = ({.*});', js_content, re.DOTALL)
if not match:
    print("ERROR: Could not find testData object")
    exit(1)

# Parse with handling for comments
json_str = match.group(1)
json_str = re.sub(r'/\*.*?\*/', '', json_str, flags=re.DOTALL)
json_str = re.sub(r'//.*?$', '', json_str, flags=re.MULTILINE)

test_data = json.loads(json_str)

# Collect all questions
all_questions = []
for category_name, category_data in test_data.items():
    if 'tests' in category_data:
        for test in category_data['tests']:
            if 'questions' in test:
                for q in test['questions']:
                    all_questions.append({
                        'id': q.get('id'),
                        'category': q.get('category', ''),
                        'question': q.get('question', '').strip(),
                        'answer': q.get('answer', '').strip(),
                        'correct': q.get('correct', -1),
                        'options': q.get('options', [])
                    })

print(f"\n✓ Total questions found: {len(all_questions)}")

# Find duplicates based on question text
question_map = defaultdict(list)
for q in all_questions:
    normalized = ' '.join(q['question'].lower().split())
    question_map[normalized].append(q)

# Analyze duplicates
same_answer_count = 0
different_answer_count = 0
same_answer_duplicates = []
different_answer_duplicates = []

for question_text, questions in question_map.items():
    if len(questions) > 1:
        # Get all unique answers
        answers = set((q['answer'], q['correct']) for q in questions)
        
        if len(answers) == 1:
            # All have the same answer
            same_answer_count += len(questions)
            same_answer_duplicates.append((question_text, questions))
        else:
            # Different answers
            different_answer_count += len(questions)
            different_answer_duplicates.append((question_text, questions))

print(f"\n{'=' * 70}")
print("BREAKDOWN:")
print(f"{'=' * 70}")
print(f"\n✓ Questions with SAME answer: {same_answer_count} instances")
print(f"  (across {len(same_answer_duplicates)} unique questions)")
print(f"\n✗ Questions with DIFFERENT answers: {different_answer_count} instances")
print(f"  (across {len(different_answer_duplicates)} unique questions)")

if different_answer_duplicates:
    print(f"\n{'=' * 70}")
    print("QUESTIONS WITH DIFFERENT ANSWERS (CONFLICTS!):")
    print(f"{'=' * 70}")
    
    for idx, (question_text, questions) in enumerate(different_answer_duplicates, 1):
        print(f"\n[{idx}] Question appears {len(questions)} times with DIFFERENT answers:")
        print(f"    Question: {question_text[:100]}...")
        answers = {}
        for q in questions:
            answer_key = (q['answer'], q['correct'])
            if answer_key not in answers:
                answers[answer_key] = []
            answers[answer_key].append(q)
        
        for (answer, correct_idx), qs in answers.items():
            print(f"\n    Answer: '{answer[:60]}...' (index {correct_idx})")
            print(f"    Found in:")
            for q in qs:
                print(f"      - ID {q['id']}: {q['category']}")

print(f"\n{'=' * 70}")
print("SUMMARY:")
print(f"{'=' * 70}")
print(f"• Total duplicate instances: {same_answer_count + different_answer_count}")
print(f"• Safe to remove (same answer): {same_answer_count - len(same_answer_duplicates)}")
print(f"  (keep 1 of each, remove {same_answer_count - len(same_answer_duplicates)} duplicates)")
print(f"• CONFLICTS (different answers): {different_answer_count} instances need manual review")
print(f"{'=' * 70}")
