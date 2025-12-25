from __future__ import annotations

import re
from typing import Match

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

# Pattern to match coordinate strings with unescaped quotes in array items
# Matches patterns like: "81°30""  or "55°00"N 174°22"W"
# These appear in options arrays

fixes: int = 0

# Fix pattern: "NUMBER°NUMBER"" at end of option string
pattern1 = r'(\s+)"(\d{1,3}°\d{2})""\s*'
def replacer1(match: Match[str]) -> str:
    global fixes
    fixes += 1
    return f'{match.group(1)}"{match.group(2)}\\""'

testdata = re.sub(pattern1, replacer1, testdata)

# Fix pattern: "NUMBER°NUMBER"N/S NUMBER°NUMBER"E/W" (coordinates with direction)
pattern2 = r'(\s+)"(\d{1,3}°\d{2})"([NS])\s+(\d{1,3}°\d{2})"([EW])"\s*'
def replacer2(match: Match[str]) -> str:
    global fixes
    fixes += 1
    indent = match.group(1)
    lat = match.group(2)
    lat_dir = match.group(3)
    lon = match.group(4)
    lon_dir = match.group(5)
    return f'{indent}"{lat}\\"{lat_dir} {lon}\\"{lon_dir}"'

testdata = re.sub(pattern2, replacer2, testdata)

# Fix pattern: standalone coordinates at end of option (without comma after, just closing quote)
pattern3 = r'(\s+)"(\d{1,3}°\d{2})""\s*$'
def replacer3(match: Match[str]) -> str:
    global fixes
    fixes += 1
    return f'{match.group(1)}"{match.group(2)}\\""'

testdata = re.sub(pattern3, replacer3, testdata, flags=re.MULTILINE)

# Reconstruct file
new_content = before + testdata + after

# Write back
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"✓ Fixed {fixes} coordinate quote issues")
print(f"✓ File updated")
