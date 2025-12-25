from __future__ import annotations

import json
import re
from typing import Any

print("=" * 60)
print("COMPASS-EGYPTAIR COMPLETE FIX")
print("=" * 60)

print("\nStep 1: Extract missing questions from egyptair compass id.js...")
with open('egyptair compass id.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

# Extract the missing questions (ID format: `id: 1234,`)
missing_ids: list[int] = [1457, 1468, 1473, 1483, 1527, 1623, 1624, 1628, 1649]
missing_questions_raw: dict[int, str] = {}

# Find each question block
current_id = None
current_question = ""
brace_depth = 0
in_question = False

lines: list[str] = js_content.split('\n')
for line in lines:
    # Check if this line starts a question object
    id_match = re.search(r'^\s*{\s*$', line)
    if id_match:
        in_question = True
        current_question = line + '\n'
        brace_depth = 1
        continue
    
    if in_question:
        current_question += line + '\n'
        brace_depth += line.count('{') - line.count('}')
        
        if brace_depth == 0:
            # End of question, check if it's one we need
            id_match = re.search(r'id:\s*(\d+)', current_question)
            if id_match:
                qid = int(id_match.group(1))
                if qid in missing_ids:
                    missing_questions_raw[qid] = current_question
            
            in_question = False
            current_question = ""

print(f"Found {len(missing_questions_raw)} missing question objects")

# Now parse each missing question properly
missing_questions: list[dict[str, Any]] = []
for qid in sorted(missing_questions_raw.keys()):
    q_text = missing_questions_raw[qid]
    
    # Extract fields using regex
    id_match = re.search(r'id:\s*(\d+)', q_text)
    question_match = re.search(r'question:\s*"((?:[^"\\]|\\.)*)"', q_text, re.DOTALL)
    options_match = re.search(r'options:\s*\[(.*?)\]', q_text, re.DOTALL)
    correct_match = re.search(r'correct:\s*(\d+)', q_text)
    explanation_match = re.search(r'explanation:\s*"((?:[^"\\]|\\.)*)"', q_text, re.DOTALL)
    
    if (
        id_match
        and question_match
        and options_match
        and correct_match
        and explanation_match
    ):
        qid = int(id_match.group(1))
        question_text = question_match.group(1)
        options_text = options_match.group(1)
        correct = int(correct_match.group(1))
        explanation = explanation_match.group(1)
        
        # Parse options array
        options: list[str] = []
        for opt_match in re.finditer(r'"((?:[^"\\]|\\.)*)"', options_text):
            options.append(opt_match.group(1))
        
        # Store with answer as text
        answer_text = options[correct] if correct < len(options) else ""
        
        missing_questions.append({
            'id': qid,
            'question': question_text,
            'options': options,
            'answer': answer_text,
            'correct': correct,
            'explanation': explanation
        })
        print(f"  ✓ ID {qid}: {question_text[:60]}...")

print(f"\nStep 2: Read existing questions from index.html...")
with open('index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

# Find compass-egyptair section
compass_start = html_content.find('"compass-egyptair": {')
if compass_start == -1:
    print("✗ Could not find compass-egyptair!")
    exit(1)

# Find the end (closing brace at same indentation level)
temp_content = html_content[compass_start:]
brace_count = 0
end_pos = 0
for i, char in enumerate(temp_content):
    if char == '{':
        brace_count += 1
    elif char == '}':
        brace_count -= 1
        if brace_count == 0:
            end_pos = i + 1
            break

compass_section = temp_content[:end_pos]

# Extract existing questions - match the actual format
existing_questions: list[dict[str, Any]] = []
pattern = r'\{\s*"category":\s*"([^"]+)"\s*,\s*"test":\s*(\d+)\s*,\s*"id":\s*(\d+)\s*,\s*"question":\s*"((?:[^"\\]|\\.)*)"\s*,'

for match in re.finditer(pattern, compass_section, re.DOTALL):
    category = match.group(1)
    test = int(match.group(2))
    qid = int(match.group(3))
    question_text = match.group(4)
    
    # Find the complete question object starting from this match
    start_pos = match.start()
    question_start = compass_section.rfind('{', 0, start_pos) + 1
    
    # Find the closing brace for this question
    brace_count = 1
    pos = question_start
    while brace_count > 0 and pos < len(compass_section):
        pos += 1
        if compass_section[pos] == '{':
            brace_count += 1
        elif compass_section[pos] == '}':
            brace_count -= 1
    
    question_obj_text = '{' + compass_section[question_start:pos]
    
    # Try to parse it as JSON
    try:
        q_obj = json.loads(question_obj_text)
        existing_questions.append(q_obj)
    except:
        # If JSON parsing fails, skip (might be malformed)
        continue

print(f"Extracted {len(existing_questions)} existing questions")

# Add missing questions to existing list
print("\nStep 3: Merging missing questions...")
for mq in missing_questions:
    existing_questions.append({
        'category': 'compass-egyptair-test-1',
        'test': 1,
        'id': mq['id'],
        'question': mq['question'],
        'options': mq['options'],
        'answer': mq['answer'],
        'correct': mq['correct'],
        'explanation': mq['explanation']
    })

# Sort by ID
def _question_id(question: dict[str, Any]) -> int:
    return int(question['id'])

existing_questions.sort(key=_question_id)
total_questions = len(existing_questions)
print(f"Total questions: {total_questions}")

# Step 4: Reorganize into tests of 30
print("\nStep 4: Creating tests of 30 questions each...")
tests: list[dict[str, Any]] = []
for i in range(0, total_questions, 30):
    test_num = (i // 30) + 1
    test_questions: list[dict[str, Any]] = existing_questions[i:i+30]
    
    # Update category and test number for each question
    for q in test_questions:
        q['category'] = f'compass-egyptair-test-{test_num}'
        q['test'] = test_num
    
    test_obj: dict[str, Any] = {
        'id': f'compass-egyptair-test-{test_num}',
        'name': f'Test {test_num}',
        'timeLimit': 60,
        'questions': test_questions
    }
    tests.append(test_obj)
    print(f"  Test {test_num}: {len(test_questions)} questions (IDs {test_questions[0]['id']}-{test_questions[-1]['id']})")

# Build new compass-egyptair object
new_compass_obj: dict[str, Any] = {
    'name': 'Compass EgyptAir',
    'icon': 'fas fa-compass',
    'tests': tests
}

# Convert to properly formatted JSON
new_compass_json = json.dumps(new_compass_obj, indent=4, ensure_ascii=False)

# Add the proper indentation (4 spaces for the category level)
indented_lines: list[str] = []
for line in new_compass_json.split('\n'):
    indented_lines.append('    ' + line)
new_compass_json_indented = '\n'.join(indented_lines)

# Build replacement
new_compass_str = '"compass-egyptair": ' + new_compass_json_indented.lstrip()

# Replace in HTML
print("\nStep 5: Writing to index.html...")
before_compass = html_content[:compass_start]
after_compass = html_content[compass_start + len(compass_section):]

new_html = before_compass + new_compass_str + after_compass

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_html)

print("\n" + "=" * 60)
print("✓ SUCCESS!")
print("=" * 60)
print(f"✓ Added {len(missing_questions)} missing questions")
print(f"✓ Total questions: {total_questions}")
print(f"✓ Number of tests: {len(tests)}")
print(f"✓ Each test has 30 questions (except last test may have fewer)")
print("=" * 60)
