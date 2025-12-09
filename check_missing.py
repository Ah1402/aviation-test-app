import json

# Read the unmatched questions file
with open('unmatched questions.txt', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('[cite_start]', '')

# Parse the two arrays
arrays = []
current_pos = 0
while True:
    start = content.find('[', current_pos)
    if start == -1:
        break
    
    bracket_count = 0
    pos = start
    while pos < len(content):
        if content[pos] == '[':
            bracket_count += 1
        elif content[pos] == ']':
            bracket_count -= 1
            if bracket_count == 0:
                try:
                    array_text = content[start:pos+1]
                    array = json.loads(array_text)
                    arrays.append(array)
                    current_pos = pos + 1
                    break
                except json.JSONDecodeError as e:
                    current_pos = pos + 1
                    break
        pos += 1
    else:
        break

all_questions = []
for array in arrays:
    all_questions.extend(array)

# Find questions that weren't added (those with categories that weren't found)
missing_categories = {
    'aerodromes': [],
    'communications': [],
    'flight-controls': [],
    'flight-performance': [],
    'human-performance': []
}

for q in all_questions:
    if q['category'] in missing_categories:
        missing_categories[q['category']].append(q)

print("Questions that weren't added:\n")
for cat, questions in missing_categories.items():
    if questions:
        print(f"{cat}: {len(questions)} questions")
        for q in questions:
            print(f"  - Test {q['test']}, Original ID {q['id']}: {q['question'][:60]}...")
