from __future__ import annotations

import re

# Read egyptair compass id.js to get all question IDs
print("Reading egyptair compass id.js...")
with open('egyptair compass id.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

# Extract all IDs from egyptair compass id.js (uses `id:` not `"id":`)
js_ids: set[int] = set()
for match in re.finditer(r'\bid:\s*(\d+)', js_content):
    js_ids.add(int(match.group(1)))

print(f"Found {len(js_ids)} question IDs in egyptair compass id.js: {min(js_ids)} to {max(js_ids)}")

# Read index.html
print("\nReading index.html...")
with open('index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

# Find compass-egyptair section and extract IDs
compass_match = re.search(r'"compass-egyptair":\s*\{.*?"tests":\s*\[.*?\].*?\}(?=,\s*"|\s*\})', html_content, re.DOTALL)
if compass_match:
    compass_section = compass_match.group(0)
    html_ids: set[int] = set()
    for match in re.finditer(r'"id":\s*(\d+)', compass_section):
        html_ids.add(int(match.group(1)))
    
    print(f"Found {len(html_ids)} question IDs in index.html compass-egyptair")
    
    # Find missing IDs
    missing_ids: set[int] = js_ids - html_ids
    if missing_ids:
        print(f"\n⚠ Missing {len(missing_ids)} questions: {sorted(missing_ids)}")
    else:
        print("\n✓ All questions present!")
    
    # Find extra IDs (shouldn't be any)
    extra_ids: set[int] = html_ids - js_ids
    if extra_ids:
        print(f"\n⚠ Extra IDs in HTML (not in source): {sorted(extra_ids)}")
else:
    print("✗ Could not find compass-egyptair section!")
