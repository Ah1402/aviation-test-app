import re

# Read index.html
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find compass-egyptair section - more flexible pattern
pattern = r'"compass-egyptair":\s*\{.*?"tests":\s*\[(.*?)\n\s*\]\s*\}'
match = re.search(pattern, content, re.DOTALL)

if match:
    tests_section = match.group(1)
    
    # Find all test objects
    test_pattern = r'\{\s*"id":\s*"compass-egyptair-test-(\d+)".*?"questions":\s*\[(.*?)\]'
    tests = re.findall(test_pattern, tests_section, re.DOTALL)
    
    print(f"Found {len(tests)} tests in compass-egyptair category")
    total_questions = 0
    
    for test_num, questions_section in tests:
        # Count questions in this test
        question_count = len(re.findall(r'"id":\s*\d+', questions_section))
        total_questions += question_count
        print(f"  Test {test_num}: {question_count} questions")
    
    print(f"\nTotal: {total_questions} questions")
else:
    print("compass-egyptair section not found")
