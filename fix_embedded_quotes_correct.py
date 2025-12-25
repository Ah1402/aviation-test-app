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

# Process line by line to fix embedded quotes
fixed_count = 0
lines: list[str] = testdata.split('\n')
fixed_lines: list[str] = []

for i, line in enumerate(lines):
    original_line = line
    
    # Check if line has a key-value pattern with double quotes
    # Match: whitespace + "key": "value..."
    match = re.match(r'(\s*)"([^"]+)":\s*"(.*)"\s*(,?)\s*$', line)
    
    if match:
        indent = match.group(1)
        key = match.group(2)
        value = match.group(3)
        trailing_comma = match.group(4)
        
        # Check if value contains quotes that need escaping
        # Look for patterns like: something "word" something
        # But ignore already escaped quotes \" or \\"
        
        # First, temporarily replace already-escaped quotes
        temp_value = value.replace('\\"', '___ESCAPED_QUOTE___')
        temp_value = temp_value.replace('\\\\', '___DOUBLE_BACKSLASH___')
        
        # Now check if there are any remaining unescaped quotes
        if '"' in temp_value:
            # Replace unescaped quotes with escaped ones
            temp_value = temp_value.replace('"', '\\"')
            # Restore the already-escaped quotes
            temp_value = temp_value.replace('___ESCAPED_QUOTE___', '\\"')
            temp_value = temp_value.replace('___DOUBLE_BACKSLASH___', '\\\\')
            
            fixed_line = f'{indent}"{key}": "{temp_value}"{trailing_comma}'
            fixed_lines.append(fixed_line)
            fixed_count += 1
            if fixed_count <= 15:  # Show first 15
                print(f'Line {i+1}: Fixed quotes in {key}')
        else:
            # Restore original escaping
            value = value.replace('___ESCAPED_QUOTE___', '\\"')
            value = value.replace('___DOUBLE_BACKSLASH___', '\\\\')
            fixed_lines.append(line)
    else:
        fixed_lines.append(line)

# Rebuild content
new_testdata = '\n'.join(fixed_lines)
new_content = before + new_testdata + after

# Write back
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f'✓ Fixed {fixed_count} lines with embedded quotes')
print('✓ File updated')
