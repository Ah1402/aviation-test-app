import json
import ast
from collections import defaultdict

# Load the testData
with open('testData_clean.json', 'r', encoding='utf-8-sig') as f:
    content = f.read()

testData = ast.literal_eval(content)

# Flatten all questions
all_questions = []
for category_key, category in testData.items():
    for test in category.get('tests', []):
        for question in test.get('questions', []):
            all_questions.append(question)

print(f"Total questions: {len(all_questions)}")

# Group by (options, correct) using json string as key
groups = defaultdict(list)
for q in all_questions:
    key = json.dumps({'options': q['options'], 'correct': q['correct']}, sort_keys=True)
    groups[key].append(q)

# Find duplicates
duplicate_groups = {k: v for k, v in groups.items() if len(v) > 1}
num_duplicate_groups = len(duplicate_groups)
total_duplicates = sum(len(v) - 1 for v in duplicate_groups.values())

print(f"Number of unique duplicate groups: {num_duplicate_groups}")
print(f"Number of duplicated questions (extras): {total_duplicates}")