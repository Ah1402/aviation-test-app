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

# Fix double backslash quotes -> single backslash quotes
fixed_testdata = testdata.replace('\\\\"', '\\"')

# Count how many we fixed
original_count = testdata.count('\\\\"')
print(f'Fixed {original_count} instances of \\\\" to \\"')

# Rebuild content
new_content = before + fixed_testdata + after

# Write back
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print('✓ File updated')
