from __future__ import annotations

import re
from typing import Match

# Read the file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find testData section
start = content.find('window.testData = {')
end = content.find("console.log('window.testData loaded")
before_testdata = content[:start + len('window.testData = ')]
after_testdata = content[end:]
testdata_str = content[start + len('window.testData = '):end]

print(f'Original testData length: {len(testdata_str)}')

# Function to escape quotes inside JSON string values
def escape_quotes_in_values(match: Match[str]) -> str:
    key = match.group(1)
    value = match.group(2)
    # Escape any unescaped quotes in the value
    escaped_value = value.replace('\\"', '___ESCAPED___').replace('"', '\\"').replace('___ESCAPED___', '\\"')
    return f'"{key}": "{escaped_value}"'

# Pattern to match key-value pairs
# This finds patterns like: "key": "value with "quotes" inside"
pattern = r'"([^"]+)":\s*"([^"]*(?:"[^"]*)*)"(?=[,\n\r])'

# Apply fixes
fixed_testdata = testdata_str

# Simple approach: find all values with embedded quotes and fix them
lines: list[str] = testdata_str.split('\n')
fixed_lines: list[str] = []

for line in lines:
    # Check if line contains a string value with embedded quotes
    # Pattern: "key": "value with "embedded" quotes"
    if '": "' in line:
        # Find the value part
        match = re.search(r'("(?:[^"\\]|\\.)*"):\s*("(?:[^"\\]|\\.)+")', line)
        if match:
            key = match.group(1)
            value = match.group(2)
            # Check if value has unescaped quotes
            if '"' in value[1:-1] and '\\"' not in value:
                # Fix by escaping quotes in value
                inner_value = value[1:-1]  # Remove outer quotes
                escaped_inner = inner_value.replace('"', '\\"')
                fixed_value = f'"{escaped_inner}"'
                new_line = line.replace(value, fixed_value)
                fixed_lines.append(new_line)
                if line != new_line:
                    print(f'Fixed line: {line[:80]}...')
                continue
    
    fixed_lines.append(line)

fixed_testdata = '\n'.join(fixed_lines)

print(f'New testData length: {len(fixed_testdata)}')

# Reconstruct
new_content = before_testdata + fixed_testdata + after_testdata

# Write back
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print('✓ Fixed embedded quotes')
