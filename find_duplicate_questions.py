import re
from collections import defaultdict
from typing import Dict, List, Tuple

files: List[Tuple[str, str]] = [
    ('index.html', 'index'),
    ('testData_complete.js', 'testData_complete'),
    ('egyptair compass id.js', 'egyptair_compass_id')
]

id_locations: Dict[int, List[Tuple[str, str]]] = defaultdict(list)

for path,label in files:
    print('Scanning', path)
    with open(path,'r',encoding='utf-8') as f:
        text = f.read()
    # find all occurrences of "id": 123 or id: 123
    ids = re.findall(r'"id"\s*:\s*(\d+)', text)
    # fallback for patterns like id: 123 (no quotes)
    ids2 = re.findall(r'\b id \s*:\s*(\d+)', text) if False else []
    for mid in ids:
        id_locations[int(mid)].append((path,label))

# find duplicates
dups: Dict[int, List[Tuple[str, str]]] = {k:v for k,v in id_locations.items() if len(v)>1}
print('\nFound', len(dups), 'duplicate IDs across scanned files')
for qid,locs in list(dups.items())[:50]:
    print(qid, '->', locs)

# Also check duplicates within egyptair_compass_id.js itself
print('\nChecking duplicates within egyptair compass id.js')
with open('egyptair compass id.js','r',encoding='utf-8') as f:
    e: str = f.read()
ids = re.findall(r'\bid:\s*(\d+)', e)
counts: Dict[int, int] = defaultdict(int)
for mid in ids:
    counts[int(mid)] +=1
intra: Dict[int, int] = {k:v for k,v in counts.items() if v>1}
print('Within egyptair compass id.js duplicates:', len(intra))
if intra:
    for k,v in list(intra.items())[:50]:
        print(k,v)

# Check duplicates within testData_complete.js
print('\nChecking duplicates within testData_complete.js')
with open('testData_complete.js','r',encoding='utf-8') as f:
    t: str = f.read()
ids = re.findall(r'"id"\s*:\s*(\d+)', t)
counts: Dict[int, int] = defaultdict(int)
for mid in ids:
    counts[int(mid)] +=1
intra2 = {k:v for k,v in counts.items() if v>1}
print('Within testData_complete.js duplicates:', len(intra2))
if intra2:
    for k,v in list(intra2.items())[:50]:
        print(k,v)

print('\nDone')
