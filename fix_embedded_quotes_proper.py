from __future__ import annotations

import re

# Read the file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the testData section
start_marker = '<script>window.testData = {'
end_marker = '</script>'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker, start_idx)

if start_idx == -1 or end_idx == -1:
    print("Could not find testData section")
    exit(1)

before = content[:start_idx + len(start_marker)]
testdata = content[start_idx + len(start_marker):end_idx]
after = content[end_idx:]

print(f'Processing testData ({len(testdata)} chars)...')

# Better logic: only escape quotes that are not already escaped
def fix_quotes_in_value(value: str) -> str:
    # Replace unescaped quotes with escaped ones
    # This regex finds quotes that are not preceded by a backslash
    return re.sub(r'(?<!\\)"', r'\\"', value)

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
        # Count total quotes and escaped quotes
        total_quotes = value.count('"')
        escaped_quotes = value.count('\\"')

        if total_quotes > escaped_quotes:
            # There are unescaped quotes, fix them
            fixed_value = fix_quotes_in_value(value)
            fixed_line = f'{indent}"{key}": "{fixed_value}"{trailing_comma}'
            fixed_lines.append(fixed_line)
            fixed_count += 1
            if fixed_count <= 10:  # Show first 10
                print(f'Line {i+1}: Fixed {total_quotes - escaped_quotes} unescaped quote(s)')
        else:
            fixed_lines.append(line)
    else:
        fixed_lines.append(line)

testdata = '\n'.join(fixed_lines)

# Reconstruct file
new_content = before + testdata + after

# Write back
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"✓ Fixed {fixed_count} lines with unescaped embedded quotes")
print(f"✓ File updated")