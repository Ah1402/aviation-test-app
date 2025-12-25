import json

# Read the compass category as text
with open('compass_category.json', 'r') as f:
    lines = f.readlines()

# Remove first and last lines
compass_inner = ''.join(lines[1:-1]).strip()

# Read testData_complete.js
with open('testData_complete.js', 'r') as f:
    content = f.read()

# Find the insertion point
# After "aon-aviation-knowledge"
# The end is ] } ] }, \n  "flight-planning-and-monitoring": {

# Replace
old = '''  },
  "flight-planning-and-monitoring": {'''

new = '''        ]
      }
    ]
  },
''' + compass_inner + ''',
  "flight-planning-and-monitoring": {'''

# Find the position of "flight-planning-and-monitoring"
pos = content.find('"flight-planning-and-monitoring": {')
if pos == -1:
    print("Not found")
else:
    # Find the start of the line before, to insert after the previous category's }
    # Find the last } before pos
    last_brace = content.rfind('  },', 0, pos)
    if last_brace == -1:
        print("No last }")
    else:
        insert_pos = last_brace + 4  # after  },
        content = content[:insert_pos] + '\n' + compass_inner + ',' + content[insert_pos:]
        print("Inserted")

# Write back
with open('testData_complete.js', 'w') as f:
    f.write(content)