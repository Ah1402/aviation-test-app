import re

print("="*80)
print("FIX CURLY QUOTES - Only Inside String Values")
print("="*80)

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

original_len = len(html)

# Fix curly quotes ONLY inside JSON string values
# We need to be surgical - only replace within "value" strings, not structural JSON

fixes = 0

# Pattern: Find JSON string values and fix curly quotes within them
# Match: "key": "value with possible curly quotes"

def fix_curly_in_value(match):
    global fixes
    key = match.group(1)
    value = match.group(2)
    
    original_value = value
    # Replace curly quotes with escaped straight quotes
    value = value.replace('"', '\\"')   # Left double quotation mark
    value = value.replace('"', '\\"')   # Right double quotation mark  
    value = value.replace(''', "\\'")   # Left single quotation mark
    value = value.replace(''', "\\'")   # Right single quotation mark
    
    if value != original_value:
        fixes += 1
    
    return f'"{key}": "{value}"'

# Apply to question, answer, explanation fields (they might have curly quotes)
for field in ['question', 'answer', 'explanation', 'name', 'icon', 'id', 'category']:
    pattern = rf'"({field})":\s*"((?:[^"\\]|\\.)*?)"'
    html = re.sub(pattern, fix_curly_in_value, html)

# Also fix in options array elements
def fix_option_value(match):
    global fixes
    value = match.group(1)
    original_value = value
    
    value = value.replace('"', '\\"')
    value = value.replace('"', '\\"')
    value = value.replace(''', "\\'")
    value = value.replace(''', "\\'")
    
    if value != original_value:
        fixes += 1
    
    return f'"{value}"'

# Pattern for array elements within options
within_options = []
for match in re.finditer(r'"options":\s*\[(.*?)\]', html, re.DOTALL):
    start, end = match.span(1)
    within_options.append((start, end, match.group(1)))

# Process in reverse to maintain positions
for start, end, options_content in reversed(within_options):
    fixed_content = re.sub(r'"((?:[^"\\]|\\.)*?)"', fix_option_value, options_content)
    html = html[:start] + fixed_content + html[end:]

print(f"✓ Fixed {fixes} curly quotes inside string values")
print(f"✓ File size: {original_len:,} -> {len(html):,} bytes")

# Write file
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("="*80)
