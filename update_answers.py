import json
import re

print("=" * 60)
print("UPDATING ANSWERS FOR UNMATCHED ANSWERS")
print("=" * 60)

# Read the unmatched answers file
with open('unmatched answers.txt', 'r', encoding='utf-8') as f:
    content = f.read()

# Parse the JSON (it should be one array)
unmatched_answers = json.loads(content)

print(f"\n✓ Found {len(unmatched_answers)} questions to update")

# Read the JavaScript file
with open('testData_complete.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

updated_count = 0
not_found = []

# For each question, find it in the file and update the answer
for q in unmatched_answers:
    question_text = q['question']
    new_answer = q['answer']
    new_correct = q['correct']
    new_explanation = q.get('explanation', '')
    
    # Search for this question in the file
    # We'll search for the question text
    question_pattern = re.escape(question_text[:80])  # Use first 80 chars to be unique
    
    matches = list(re.finditer(question_pattern, js_content))
    
    if not matches:
        print(f"  ⚠ Could not find: {question_text[:60]}...")
        not_found.append(question_text)
        continue
    
    if len(matches) > 1:
        print(f"  ⚠ Multiple matches for: {question_text[:60]}...")
        continue
    
    # Found exactly one match
    match_pos = matches[0].start()
    
    # Find the complete question object
    # Go backwards to find the opening {
    pos = match_pos
    while pos > 0 and js_content[pos] != '{':
        pos -= 1
    
    question_start = pos
    
    # Go forward to find the closing }
    bracket_count = 0
    pos = question_start
    while pos < len(js_content):
        if js_content[pos] == '{':
            bracket_count += 1
        elif js_content[pos] == '}':
            bracket_count -= 1
            if bracket_count == 0:
                break
        pos += 1
    
    question_end = pos + 1
    
    # Extract the question object
    question_json_str = js_content[question_start:question_end]
    
    # Parse it
    try:
        question_obj = json.loads(question_json_str)
    except json.JSONDecodeError:
        print(f"  ⚠ Could not parse JSON for: {question_text[:60]}...")
        continue
    
    # Check if answer or correct index needs updating
    old_answer = question_obj.get('answer', '')
    old_correct = question_obj.get('correct', -1)
    old_explanation = question_obj.get('explanation', '')
    
    if old_answer == new_answer and old_correct == new_correct and old_explanation == new_explanation:
        print(f"  ✓ Already correct (ID {question_obj['id']}): {question_text[:60]}...")
        continue
    
    # Update the answer, correct index, and explanation
    question_obj['answer'] = new_answer
    question_obj['correct'] = new_correct
    question_obj['explanation'] = new_explanation
    
    # Convert back to JSON
    new_question_json = json.dumps(question_obj, indent=2, ensure_ascii=False)
    
    # Indent it properly (10 spaces to match existing format)
    lines = new_question_json.split('\n')
    indented_lines = ['          ' + line for line in lines]
    new_question_json = '\n'.join(indented_lines)
    
    # Calculate the proper indentation for the original
    original_lines = question_json_str.split('\n')
    if len(original_lines) > 0:
        first_line = original_lines[0]
        indent_match = re.match(r'^(\s*)', first_line)
        if indent_match:
            indent = indent_match.group(1)
            # Re-indent with the correct amount
            lines = new_question_json.split('\n')
            indented_lines = [indent + line.lstrip() for line in lines]
            new_question_json = '\n'.join(indented_lines)
    
    # Replace in the content
    js_content = js_content[:question_start] + new_question_json + js_content[question_end:]
    
    print(f"  ✓ Updated ID {question_obj['id']}: {question_text[:60]}...")
    print(f"      Old answer: '{old_answer}' (index {old_correct})")
    print(f"      New answer: '{new_answer}' (index {new_correct})")
    updated_count += 1

# Write back to file
with open('testData_complete.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"\n{'=' * 60}")
print(f"✓ SUCCESS: Updated {updated_count} questions")
if not_found:
    print(f"⚠ Could not find {len(not_found)} questions:")
    for q in not_found:
        print(f"  - {q[:70]}...")
print(f"{'=' * 60}")
