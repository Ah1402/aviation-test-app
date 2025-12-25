from __future__ import annotations

import re
from typing import Any

# Read the source file with all 255 questions
source_file = r'c:\Users\ahmed\Desktop\final younes\final\aviation-test-app\egyptair compass id.js'

with open(source_file, 'r', encoding='utf-8') as f:
    source_content = f.read()

# Extract all questions from the source
# Find all question objects
questions: list[dict[str, Any]] = []
lines: list[str] = source_content.split('\n')

current_question: list[str] = []
brace_count = 0
in_question = False

for line in lines:
    if '{' in line and not in_question:
        in_question = True
        brace_count = 0
        current_question = []
    
    if in_question:
        current_question.append(line)
        brace_count += line.count('{')
        brace_count -= line.count('}')
        
        if brace_count == 0 and len(current_question) > 1:
            question_text = '\n'.join(current_question)
            # Try to parse it
            try:
                # Clean it up for JSON parsing
                question_text = question_text.strip()
                if question_text.endswith(','):
                    question_text = question_text[:-1]
                
                # Extract the ID
                id_match = re.search(r'"id"\s*:\s*(\d+)', question_text)
                if id_match:
                    questions.append({
                        'text': question_text,
                        'id': int(id_match.group(1))
                    })
            except:
                pass
            
            in_question = False
            current_question = []

print(f"Extracted {len(questions)} questions from source file")
print(f"ID range: {min(q['id'] for q in questions)} - {max(q['id'] for q in questions)}")

# Sort by ID
questions.sort(key=lambda x: x['id'])

# Organize into 9 tests
tests: list[dict[str, Any]] = []
questions_per_test = 30

for test_num in range(9):
    start_idx = test_num * questions_per_test
    if test_num == 8:  # Last test gets remaining questions
        test_questions: list[dict[str, Any]] = questions[start_idx:]
    else:
        end_idx = start_idx + questions_per_test
        test_questions = questions[start_idx:end_idx]
    
    test_data: dict[str, Any] = {
        'number': test_num + 1,
        'id': f'compass-egyptair-test-{test_num + 1}',
        'questions': [q['text'] for q in test_questions]
    }
    tests.append(test_data)
    print(f"Test {test_num + 1}: {len(test_questions)} questions (IDs {test_questions[0]['id']}-{test_questions[-1]['id']})")

# Now build the complete compass-egyptair section
compass_section = '''    "compass-egyptair": {
        "name": "Compass Egypt Air",
        "icon": "fas fa-compass",
        "tests": [
'''

for i, test in enumerate(tests):
    compass_section += f'''            {{
                "id": "{test['id']}",
                "name": "Test {test['number']}",
                "timeLimit": 60,
                "questions": [
'''
    
    for j, q_text in enumerate(test['questions']):
        # Add proper indentation
        indented_q = '\n'.join('                    ' + line if line.strip() else line 
                               for line in q_text.split('\n'))
        compass_section += indented_q
        
        # Add comma if not last question
        if j < len(test['questions']) - 1:
            if not indented_q.rstrip().endswith(','):
                compass_section += ','
        compass_section += '\n'
    
    compass_section += '''                ]
            }'''
    
    # Add comma if not last test
    if i < len(tests) - 1:
        compass_section += ','
    compass_section += '\n'

compass_section += '''        ]
    }'''

# Save the rebuilt section
output_file = r'c:\Users\ahmed\Desktop\final younes\final\aviation-test-app\compass_rebuilt.txt'
with open(output_file, 'w', encoding='utf-8') as f:
    f.write(compass_section)

print(f"\n✓ Rebuilt compass-egyptair section saved to: compass_rebuilt.txt")
print(f"✓ Total: {sum(len(t['questions']) for t in tests)} questions in {len(tests)} tests")
