import re

print("Reading testData_complete.js...")
with open('testData_complete.js', 'r', encoding='utf-8') as f:
    content = f.read()

print("Renumbering all question IDs sequentially...")

# Find all "id": <number> patterns within question objects
# We need to distinguish question IDs from other IDs (test IDs, etc.)
# Question IDs appear after "question": "..." and before or after other question properties

global_id = 1
question_count = 0

def replace_question_id(match):
    global global_id, question_count
    # Get the full match context
    before = match.group(1)  # Everything before the number
    old_id = match.group(2)   # The old ID number
    after = match.group(3)    # Everything after
    
    # Replace with new sequential ID
    new_id = global_id
    global_id += 1
    question_count += 1
    
    return f'{before}{new_id}{after}'

# Pattern to match: "id": <number>, within question objects
# Look for pattern where we have question properties nearby
pattern = r'("question":\s*"[^"]*"[^}]*?"id":\s*)(\d+)(,)'

# First, let's try a different approach - match id after question field
content_new = content

# Find all question blocks and renumber them
question_pattern = r'(\{\s*"category":[^}]*?"test":\s*\d+,\s*"id":\s*)(\d+)'

def renumber_match(match):
    global global_id
    result = match.group(1) + str(global_id)
    global_id += 1
    return result

content_new = re.sub(question_pattern, renumber_match, content)

total_questions = global_id - 1
print(f"Total questions renumbered: {total_questions}")

# Write back
print("\nWriting updated testData_complete.js...")
with open('testData_complete.js', 'w', encoding='utf-8') as f:
    f.write(content_new)

print(f"✓ Successfully renumbered all {total_questions} questions with sequential IDs!")
