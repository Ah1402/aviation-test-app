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

# Fix apostrophe possessives: word"s -> word's
# This pattern matches: letter followed by " followed by s
# Common patterns: someone"s, Captain"s, PRM"s, etc.
pattern = r'([a-zA-Z])"s'
replacement = r"\1's"

fixed_testdata = re.sub(pattern, replacement, testdata)

# Count replacements
count = len(re.findall(pattern, testdata))
print(f'Fixed {count} instances of word"s to word\'s')

# Rebuild content
new_content = before + fixed_testdata + after

# Write back
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print('✓ File updated')
