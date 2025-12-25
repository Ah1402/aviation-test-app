from __future__ import annotations

import re

with open(r'c:\Users\ahmed\Desktop\final younes\final\aviation-test-app\index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find window.testData
match = re.search(r'window\.testData\s*=\s*\{', content)
if not match:
    print("testData not found")
    exit()

start_pos = match.start()
start_line = content[:start_pos].count('\n') + 1

# Find the matching closing brace
pos = match.end() - 1  # Start at the opening brace
depth = 0
in_string = False
escape = False
string_char = None
end_pos: int | None = None

for i in range(pos, len(content)):
    char = content[i]
    
    # Handle string escaping
    if escape:
        escape = False
        continue
    if char == '\\':
        escape = True
        continue
    
    # Handle strings
    if char in ['"', "'"]:
        if not in_string:
            in_string = True
            string_char = char
        elif char == string_char:
            in_string = False
            string_char = None
        continue
    
    if in_string:
        continue
    
    # Count braces
    if char == '{':
        depth += 1
    elif char == '}':
        depth -= 1
        if depth == 0:
            end_pos = i + 1
            break

# Check if we found the closing brace
if end_pos is None:
    print("Error: Could not find matching closing brace for testData object")
    exit(1)

# Extract the JavaScript object
js_code = content[pos:end_pos]

# Try to validate it
print(f"testData starts at line {start_line}")
print(f"testData object is {len(js_code)} characters")

# Look for common JSON errors
lines = js_code.split('\n')
for idx, line in enumerate(lines):
    actual_line = start_line + idx
    # Check for trailing commas before closing braces/brackets
    stripped = line.strip()
    if re.match(r',\s*[\]}]', stripped):
        print(f"⚠ Line {actual_line}: Trailing comma before closing: {line[:100]}")
    # Check for missing commas
    if re.search(r'["\d\]}]\s*$', lines[idx-1] if idx > 0 else '') and re.match(r'\s*["\[\{]', stripped):
        prev_line = start_line + idx - 1
        print(f"⚠ Line {prev_line}: Possible missing comma: {lines[idx-1][:100]}")

print("\nChecking structure...")
