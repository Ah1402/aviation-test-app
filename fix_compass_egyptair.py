import re
from typing import Dict, List, Any

# Read egyptair compass id.js to get all questions
print("Reading egyptair compass id.js...")
with open('egyptair compass id.js', 'r', encoding='utf-8') as f:
    egyptair_content: str = f.read()

# Extract all questions from egyptair compass id.js
# Parse the JavaScript object
questions_match = re.search(r'const questions = \[(.*)\];', egyptair_content, re.DOTALL)
if not questions_match:
    print("ERROR: Could not find questions array in egyptair compass id.js")
    exit(1)

# Parse each question manually
questions_text: str = questions_match.group(1)
questions: List[Dict[str, Any]] = []

# Split by question objects
question_blocks = re.findall(r'\{[^}]*id:\s*(\d+)[^}]*\}', questions_text, re.DOTALL)
for block_match in re.finditer(r'\{([^}]*?id:\s*\d+[^}]*?)\}', questions_text, re.DOTALL):
    block = block_match.group(1)
    
    # Extract fields
    id_match = re.search(r'id:\s*(\d+)', block)
    question_match = re.search(r'question:\s*"([^"]*(?:\\.[^"]*)*)"', block)
    options_match = re.search(r'options:\s*\[(.*?)\]', block, re.DOTALL)
    correct_match = re.search(r'correct:\s*(\d+)', block)
    explanation_match = re.search(r'explanation:\s*"([^"]*(?:\\.[^"]*)*)"', block)
    
    if id_match and question_match and options_match and correct_match:
        q_id = int(id_match.group(1))
        question = question_match.group(1)
        options_str = options_match.group(1)
        correct = int(correct_match.group(1))
        explanation = explanation_match.group(1) if explanation_match else ""
        
        # Parse options
        options = re.findall(r'"([^"]*(?:\\.[^"]*)*)"', options_str)
        
        if len(options) >= 2:
            question_obj = {  # type: ignore[var-annotated]
                "id": q_id,
                "question": question,
                "options": options,
                "correct": correct,
                "explanation": explanation,
                "answer": options[correct] if correct < len(options) else options[0]
            }
            questions.append(question_obj)  # type: ignore[arg-type]

print(f"Extracted {len(questions)} questions from egyptair compass id.js")

# Sort by ID
questions.sort(key=lambda x: x['id'])
print(f"Question ID range: {questions[0]['id']} - {questions[-1]['id']}")

# Now read testData_complete.js
print("\nReading testData_complete.js...")
with open('testData_complete.js', 'r', encoding='utf-8') as f:
    testdata_content = f.read()

# Find Compass EgyptAir category
compass_start = testdata_content.find('"name":  "Compass EgyptAir"')
if compass_start == -1:
    print("ERROR: Could not find Compass EgyptAir category")
    exit(1)

# Find the opening brace of this category
i = compass_start
while i >= 0 and testdata_content[i] != '{':
    i -= 1

start_brace = i
brace_count = 1
i = start_brace + 1

while i < len(testdata_content) and brace_count > 0:
    if testdata_content[i] == '{':
        brace_count += 1
    elif testdata_content[i] == '}':
        brace_count -= 1
    i += 1

category_end = i

# Build new Compass EgyptAir category with all 255 questions divided into tests of 30
print(f"\nBuilding new Compass EgyptAir category with {len(questions)} questions...")

# Divide into tests of 30 questions
tests: List[Dict[str, Any]] = []
test_num: int = 1
for i in range(0, len(questions), 30):
    test_questions = questions[i:i+30]
    test_obj = {  # type: ignore[var-annotated]
        "id": f"compass-egyptair-test-{test_num}",
        "name": f"Test {test_num}",
        "timeLimit": 60,
        "questions": []
    }
    
    for q in test_questions:
        question_obj = {  # type: ignore[var-annotated]
            "category": "compass-egyptair",
            "test": test_num,
            "id": q["id"],
            "question": q["question"],
            "options": q["options"],
            "answer": q["answer"],
            "correct": q["correct"],
            "explanation": q["explanation"]
        }
        test_obj["questions"].append(question_obj)  # type: ignore[arg-type]
    
    tests.append(test_obj)  # type: ignore[arg-type]
    test_num += 1

print(f"Created {len(tests)} tests")
for idx, test in enumerate(tests, 1):
    print(f"  Test {idx}: {len(test['questions'])} questions")

# Build the category JSON string
category_json: Dict[str, Any] = {
    "name": "Compass EgyptAir",
    "icon": "fas fa-compass",
    "tests": tests
}

# Convert to JSON with specific formatting
def format_json_for_js(obj: Any, indent: int = 0) -> str:
    """Format JSON to match the existing JavaScript style"""
    spaces = "    " * indent
    if isinstance(obj, dict):
        lines = ["{"]
        items = list(obj.items())  # type: ignore[var-annotated]
        for idx, (key, value) in enumerate(items):  # type: ignore[var-annotated]
            comma = "," if idx < len(items) - 1 else ""  # type: ignore[arg-type]
            lines.append(f'{spaces}    "{key}":  {format_json_for_js(value, indent + 1)}{comma}')
        lines.append(f'{spaces}}}')
        return '\n'.join(lines)
    elif isinstance(obj, list):
        if not obj:
            return "[]"
        lines = ["["]
        for idx, item in enumerate(obj):  # type: ignore[var-annotated]
            comma = "," if idx < len(obj) - 1 else ""  # type: ignore[arg-type]
            # Add extra spacing for readability
            if isinstance(item, dict):
                lines.append(f'{spaces}                  {format_json_for_js(item, indent + 1).lstrip()}{comma}')
            else:
                lines.append(f'{spaces}                  {format_json_for_js(item, indent + 1)}{comma}')
        lines.append(f'{spaces}              ]')
        return '\n'.join(lines)
    elif isinstance(obj, str):
        # Escape quotes and special characters
        escaped = obj.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
        return f'"{escaped}"'
    elif isinstance(obj, bool):
        return "true" if obj else "false"
    elif obj is None:
        return "null"
    else:
        return str(obj)  # type: ignore[return-value]

new_category_str = format_json_for_js(category_json)

# Replace the old category with the new one
new_testdata = testdata_content[:start_brace] + new_category_str + testdata_content[category_end:]

# Write the updated content
print("\nWriting updated testData_complete.js...")
with open('testData_complete.js', 'w', encoding='utf-8') as f:
    f.write(new_testdata)

print("✓ Successfully updated Compass EgyptAir category!")
print(f"  Total questions: {len(questions)}")
print(f"  Number of tests: {len(tests)}")
print(f"  Questions per test: 30 (last test: {len(tests[-1]['questions'])})")
