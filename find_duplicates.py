import json
import re
from collections import defaultdict

print("=" * 70)
print("ANALYZING DUPLICATED QUESTIONS IN testData_complete.js")
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
# Remove JavaScript comments that might break JSON parsing
json_str = re.sub(r'/\*.*?\*/', '', json_str, flags=re.DOTALL)
json_str = re.sub(r'//.*?$', '', json_str, flags=re.MULTILINE)

try:
    test_data = json.loads(json_str)
except json.JSONDecodeError as e:
    print(f"ERROR: Could not parse JSON: {e}")
    # Try to load from the file more carefully
    print("Attempting alternative parsing...")
    exit(1)

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
    # Normalize question text (remove extra spaces, lowercase for comparison)
    normalized = ' '.join(q['question'].lower().split())
    question_map[normalized].append(q)

# Find exact duplicates (same question AND same answer)
exact_duplicates = []
question_duplicates = []

for question_text, questions in question_map.items():
    if len(questions) > 1:
        question_duplicates.append((question_text, questions))
        
        # Group by answer to find exact duplicates
        answer_groups = defaultdict(list)
        for q in questions:
            answer_key = (q['answer'], q['correct'])
            answer_groups[answer_key].append(q)
        
        for answer_key, same_answer_questions in answer_groups.items():
            if len(same_answer_questions) > 1:
                exact_duplicates.append((question_text, answer_key, same_answer_questions))

# Report findings
print(f"\n{'=' * 70}")
print("DUPLICATE ANALYSIS RESULTS")
print(f"{'=' * 70}")

print(f"\n📊 SUMMARY:")
print(f"  • Questions with same text (any answer): {len(question_duplicates)}")
print(f"  • Questions with same text AND same answer: {len(exact_duplicates)}")

if exact_duplicates:
    print(f"\n{'=' * 70}")
    print("EXACT DUPLICATES (Same Question + Same Answer):")
    print(f"{'=' * 70}")
    
    for idx, (question_text, answer_key, questions) in enumerate(exact_duplicates, 1):
        print(f"\n[{idx}] Duplicate Set ({len(questions)} instances):")
        print(f"    Question: {question_text[:80]}...")
        print(f"    Answer: '{answer_key[0][:60]}...' (index {answer_key[1]})")
        print(f"    Found in:")
        for q in questions:
            print(f"      - ID {q['id']}: {q['category']}")

if question_duplicates and not exact_duplicates:
    print(f"\n{'=' * 70}")
    print("QUESTION DUPLICATES (Same Question, Different Answers):")
    print(f"{'=' * 70}")
    
    for idx, (question_text, questions) in enumerate(question_duplicates, 1):
        if len(questions) > 1:
            # Check if they have different answers
            answers = set((q['answer'], q['correct']) for q in questions)
            if len(answers) > 1:
                print(f"\n[{idx}] Question appears {len(questions)} times with DIFFERENT answers:")
                print(f"    Question: {question_text[:80]}...")
                for q in questions:
                    print(f"      - ID {q['id']} ({q['category']}): Answer '{q['answer'][:40]}...' (index {q['correct']})")

# Count total duplicate questions
total_duplicate_instances = sum(len(questions) - 1 for _, questions in question_duplicates)

print(f"\n{'=' * 70}")
print(f"TOTAL DUPLICATE INSTANCES: {total_duplicate_instances}")
print(f"  (This means {total_duplicate_instances} questions could potentially be removed)")
print(f"{'=' * 70}")
