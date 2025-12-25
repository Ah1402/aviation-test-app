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

# Find all patterns where we have ": " followed by a string that contains unescaped quotes
# This regex finds: "key": "value with "nested" quotes"
# We need to escape the nested quotes

fixed_count = 0
lines: list[str] = testdata.split('\n')
fixed_lines: list[str] = []

for i, line in enumerate(lines):
    original_line = line
    
    # Check if line has a key-value pattern
    # Match: whitespace + "key": "value..."
    match = re.match(r'(\s*)"([^"]+)":\s*"(.*)"\s*,?\s*$', line)
    
    if match:
        indent = match.group(1)
        key = match.group(2)
        value = match.group(3)
        trailing_comma = ',' if line.rstrip().endswith(',') else ''
        
        # Check if value contains unescaped double quotes
        if '"' in value and '\\"' not in value.replace('"', ''):
            # This has unescaped quotes, fix them
            fixed_value = value.replace('"', '\\"')
            fixed_line = f'{indent}"{key}": "{fixed_value}"{trailing_comma}'
            fixed_lines.append(fixed_line)
            fixed_count += 1
            if fixed_count <= 10:  # Show first 10
                print(f'Line {i+1}: Fixed {value.count(chr(34))} quote(s)')
        else:
            fixed_lines.append(line)
    else:
        fixed_lines.append(line)

fixed_testdata = '\n'.join(fixed_lines)

print(f'\n✓ Fixed {fixed_count} lines with embedded quotes')

# Reconstruct
new_content = before + fixed_testdata + after

# Write
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print('✓ File updated')
