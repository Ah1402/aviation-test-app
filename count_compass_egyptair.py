import re

# Read index.html
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find compass-egyptair section
match = re.search(r'"compass-egyptair":\s*\{[^}]*"tests":\s*\[(.*?)\]\s*\}', content, re.DOTALL)
if match:
    tests_section = match.group(1)
    # Count questions in tests section
    questions = re.findall(r'"id":\s*\d+,\s*"question":', tests_section)
    print(f'Total questions in compass-egyptair category: {len(questions)}')
    
    # Count by test
    test_matches = re.findall(r'"id":\s*"compass-egyptair-test-(\d+)"', tests_section)
    if test_matches:
        print(f'Number of tests: {len(set(test_matches))}')
        for test_num in sorted(set(test_matches), key=int):
            test_questions = re.findall(rf'"test":\s*{test_num},', tests_section)
            print(f'  Test {test_num}: {len(test_questions)} questions')
else:
    print("compass-egyptair section not found")
