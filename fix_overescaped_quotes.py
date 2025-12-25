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

# Fix over-escaped quotes: \\\" -> \"
fixes = 0
testdata = re.sub(r'\\\\"', r'\\"', testdata)
fixes = len(re.findall(r'\\\\"', testdata))

# Reconstruct file
new_content = before + testdata + after

# Write back
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"✓ Fixed {fixes} over-escaped quote issues")
print(f"✓ File updated")