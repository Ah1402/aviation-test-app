import json
import re

# Load the new questions from the JSON file
with open('new_questions.json', 'r') as f:
    new_questions = json.load(f)

# Read the HTML file with utf-8 encoding
with open('index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

# Find the compass-egyptair section and replace the questions array
# The pattern looks for the "compass-egyptair" key and the questions array after it
pattern = r'("compass-egyptair"\s*:\s*\{\s*"tests"\s*:\s*\[\s*\{\s*"questions"\s*:\s*\[)([^\]]*?)(\]\s*\}\s*\]\s*\})'

def replace_questions(match):
    prefix = match.group(1)
    old_questions = match.group(2)
    suffix = match.group(3)
    # Convert new_questions to JSON string with proper formatting
    new_questions_str = json.dumps(new_questions, indent=2)
    return prefix + new_questions_str + suffix

# Apply the replacement
new_html_content = re.sub(pattern, replace_questions, html_content, flags=re.DOTALL)

# Write back to the file with utf-8 encoding
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_html_content)

print("Questions replaced successfully.")