with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find start of second compass-egyptair
start = None
for i, line in enumerate(lines):
    if '"compass-egyptair": {' in line:
        if i > 27293:
            start = i
            break

print(f'Start found at {start}')

# Find start of next category
next_cat = None
for i in range(start + 1, len(lines)):
    if '"aircraft-general-knowledge-test-1": {' in lines[i]:
        next_cat = i
        break

print(f'Next cat at {next_cat}')

if start and next_cat:
    # The end is next_cat - 1
    end = next_cat - 1
    print(f'Start: {start}, End: {end}')
    del lines[start:end+1]
    print('Removed', end - start + 1, 'lines')

with open('index.html', 'w', encoding='utf-8') as f:
    f.writelines(lines)

print('Duplicate removed')