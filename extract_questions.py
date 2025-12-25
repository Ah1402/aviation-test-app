import json
import re

with open('egyptair compass id.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove comments
content = re.sub(r'//.*', '', content)

# Find the two arrays
parts = content.split('const questions = [')
if len(parts) == 3:
    # First part is empty, second is first array, third is second array
    first_array = parts[1].split('];')[0]
    second_array = parts[2].split('];')[0]
    combined = '[' + first_array + ',' + second_array + ']'
else:
    # Single array
    combined = content.replace('const questions = [', '[').replace('];', ']')

# Add quotes to keys
combined = combined.replace('id:', '"id":')
combined = combined.replace('question:', '"question":')
combined = combined.replace('options:', '"options":')
combined = combined.replace('correct:', '"correct":')
combined = combined.replace('explanation:', '"explanation":')

# Load as JSON
questions = json.loads(combined)

# Transform
result = []
for q in questions:
    obj = {
        'category': 'compass-egyptair',
        'test': 1,
        'id': q['id'],
        'question': q['question'],
        'options': q['options'],
        'answer': q['options'][q['correct']],
        'correct': q['correct'],
        'explanation': q['explanation']
    }
    result.append(obj)

print(json.dumps(result))