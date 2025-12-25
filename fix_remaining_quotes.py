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

# Process line by line
fixed_count = 0
lines: list[str] = testdata.split('\n')
fixed_lines: list[str] = []

for i, line in enumerate(lines):
    original_line = line
    modified = False
    
    # Fix 1: Curly quotes to straight quotes (and escape them)
    if '"' in line or '"' in line:
        line = line.replace('"', '\\"').replace('"', '\\"')
        modified = True
    
    # Fix 2: Find coordinate patterns like "55°00"N and escape the quote marks
    # Pattern: degrees°minutes"direction where " is inside a string value
    # This pattern looks for: "...<digits>°<digits>"<letter>..."
    # We need to be careful to only match inside string values, not keys
    
    # Check if this line is inside a string value (contains ": ")
    if '": "' in line:
        # Look for patterns like 00"N or 00"W or 00"E or 00"S within quotes
        # Also 00.0"N variations
        pattern = r'(\d+)°(\d+(?:\.\d+)?)"([NSEW])'
        
        # Find all matches
        matches = list(re.finditer(pattern, line))
        if matches:
            # Build replacement by working backwards to preserve positions
            for match in reversed(matches):
                # Replace the quote mark with escaped quote
                line = line[:match.end()-1] + '\\"' + match.group(3) + line[match.end():]
                modified = True
    
    if modified:
        fixed_lines.append(line)
        fixed_count += 1
        if fixed_count <= 25:
            print(f'Line {i+1}: Fixed quotes')
    else:
        fixed_lines.append(line)

# Rebuild content
new_testdata = '\n'.join(fixed_lines)
new_content = before + new_testdata + after

# Write back
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f'✓ Fixed {fixed_count} lines')
print('✓ File updated')
