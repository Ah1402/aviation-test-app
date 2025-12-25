import re

# Read the file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace ids from 1528 to 1753 with 1424 to 1649
for old_id in range(1528, 1754):
    new_id = old_id - 104
    content = content.replace(f'"id": {old_id},', f'"id": {new_id},')

# Write back
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('Ids updated')