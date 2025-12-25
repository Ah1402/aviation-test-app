from __future__ import annotations

import re

# Read index.html
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the compass-egyptair section
pattern = r'("compass-egyptair":\s*\{[^}]*"tests":\s*\[)(.*?)(\]\s*\})'
match = re.search(pattern, content, re.DOTALL)

if not match:
    print("Could not find compass-egyptair section")
    exit(1)

before_tests = match.group(1)
tests_content = match.group(2)
after_tests = match.group(3)

# Extract all questions from the current test
questions_pattern = r'\{\s*"category":\s*"compass-egyptair-test-\d+",\s*"test":\s*\d+,\s*"id":\s*\d+,.*?\}'
questions = re.findall(questions_pattern, tests_content, re.DOTALL)

print(f"Found {len(questions)} questions in compass-egyptair")

# Split questions into tests of 30 each
questions_per_test = 30
tests: list[str] = []
test_num = 1

for i in range(0, len(questions), questions_per_test):
    test_questions = questions[i:i + questions_per_test]
    
    # Update category and test number for each question
    updated_questions: list[str] = []
    for q in test_questions:
        # Update category and test fields
        q_updated = re.sub(r'"category":\s*"compass-egyptair-test-\d+"', f'"category": "compass-egyptair-test-{test_num}"', q)
        q_updated = re.sub(r'"test":\s*\d+', f'"test": {test_num}', q_updated)
        updated_questions.append(q_updated)
    
    # Create test object
    questions_joined = ',\n          '.join(updated_questions)
    test_obj = f'''      {{
        "id": "compass-egyptair-test-{test_num}",
        "name": "Test {test_num}",
        "timeLimit": 60,
        "questions": [
          {questions_joined}
        ]
      }}'''
    
    tests.append(test_obj)
    print(f"Test {test_num}: {len(test_questions)} questions")
    test_num += 1

# Reconstruct the compass-egyptair section
new_tests_section = ',\n'.join(tests)
new_compass_section = before_tests + '\n' + new_tests_section + '\n    ' + after_tests

# Replace in content
before_compass = content[:match.start()]
after_compass = content[match.end():]
new_content = before_compass + new_compass_section + after_compass

# Write back
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"\n✓ Reorganized compass-egyptair into {len(tests)} tests with ~30 questions each")
print("✓ File updated")
