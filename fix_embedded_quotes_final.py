from __future__ import annotations

import re

# Read the file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find testData section
start_marker = 'window.testData = {'
end_marker = "console.log('window.testData loaded"
start = content.find(start_marker)
end = content.find(end_marker)

before = content[:start + len(start_marker)]
after = content[end:]
testdata = content[start + len(start_marker):end]

print(f'Processing testData ({len(testdata)} chars)...')

# Fix embedded quotes in JSON string values
# Pattern: find lines like "key": "value with "embedded" quotes",
# Need to escape the embedded quotes

fixed_count = 0
lines: list[str] = testdata.split('\n')
fixed_lines: list[str] = []

for i, line in enumerate(lines, 1):
    original_line = line
    modified = False
    
    # Check if line contains a key-value pair
    # Pattern: "key": "value"
    match = re.match(r'(\s*)"([^"]+)":\s*"(.+)"\s*(,?)\s*$', line)
    
    if match:
        indent = match.group(1)
        key = match.group(2)
        value = match.group(3)
        trailing_comma = match.group(4)
        
        # Check if value contains unescaped quotes
        # Look for quotes that aren't already escaped
        if '"' in value and '\\"' not in value:
            # Escape all double quotes in value
            escaped_value = value.replace('"', '\\"')
            fixed_line = f'{indent}"{key}": "{escaped_value}"{trailing_comma}'
            fixed_lines.append(fixed_line)
            fixed_count += 1
            if fixed_count <= 10:
                print(f'Line {i}: Fixed quotes in {key}')
            modified = True
    
    if not modified:
        fixed_lines.append(line)

# Rebuild content
new_testdata = '\n'.join(fixed_lines)
new_content = before + new_testdata + after

# Write back
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f'✓ Fixed {fixed_count} lines with embedded quotes')
print('✓ File updated')
