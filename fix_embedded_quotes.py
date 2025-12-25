import re

print("="*80)
print("FIX REMAINING ERRORS - Embedded Quotes")
print("="*80)

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Find and fix embedded quotes like: someone"s -> someone\\"s
# This happens when curly quotes or straight quotes appear inside JSON strings

fixes = 0

# Pattern: Find strings that contain unescaped " in the middle
# Look for: "text"text" (embedded quote breaking the string)

# Fix specific cases first
known_bad_patterns = [
    (r'someone"s', r'someone\\"s'),
    (r'Captain"s', r'Captain\\"s'),
    (r'pilot"s', r'pilot\\"s'),
    (r'aircraft"s', r'aircraft\\"s'),
    (r'crew"s', r'crew\\"s'),
    (r'operator"s', r'operator\\"s'),
    (r'passenger"s', r'passenger\\"s'),
    (r'controller"s', r'controller\\"s'),
    (r'ATC"s', r'ATC\\"s'),
]

for pattern, replacement in known_bad_patterns:
    count = len(re.findall(pattern, html))
    if count > 0:
        html = re.sub(pattern, replacement, html)
        fixes += count
        print(f"  Fixed {count} x {pattern}")

# Also look for curly quotes and fix them
curly_quote_patterns = [
    ('"', '\\"'),   # Left double quotation mark
    ('"', '\\"'),   # Right double quotation mark  
    (''', "\\'"),   # Left single quotation mark
    (''', "\\'"),   # Right single quotation mark
]

for bad_char, good_char in curly_quote_patterns:
    count = html.count(bad_char)
    if count > 0:
        html = html.replace(bad_char, good_char)
        fixes += count
        print(f"  Fixed {count} curly quotes")

# Write file
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print(f"\n✓ Fixed {fixes} embedded quote/curly quote errors")
print("="*80)
