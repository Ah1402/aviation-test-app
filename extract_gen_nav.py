"""
Extract General Navigation questions from HTML file and format for testData.js
"""
import re
import html
import json

def clean_text(text):
    """Clean HTML entities and extra whitespace"""
    text = html.unescape(text)
    text = re.sub(r'\s+', ' ', text)
    text = text.strip()
    return text

def extract_questions(html_content):
    """Extract all General Navigation test questions"""
    
    tests = []
    
    # Find all General Navigation Test sections
    test_pattern = r'General Navigation Test (\d+)</b></p>(.*?)(?=General Navigation Test \d+</b></p>|$)'
    test_matches = re.findall(test_pattern, html_content, re.DOTALL)
    
    for test_num, test_content in test_matches:
        print(f"\nProcessing Test {test_num}...")
        questions = []
        
        # Extract individual questions
        # Pattern: <b>number. question text:</b> A. option B. option C. option D. option
        question_pattern = r'<p class=MsoNormal><b>(\d+)\.\s+(.*?)</b>\s+A\.\s+(.*?)\s+B\.\s+(.*?)\s+C\.\s+(.*?)\s+D\.\s+(.*?)(?:</p>|<i>)'
        
        q_matches = re.findall(question_pattern, test_content, re.DOTALL)
        
        for q_num, q_text, opt_a, opt_b, opt_c, opt_d in q_matches:
            # Find which option is marked as correct (bold text)
            correct_idx = 0
            options_raw = [opt_a, opt_b, opt_c, opt_d]
            options = []
            
            for idx, opt in enumerate(options_raw):
                # Remove bold markers
                clean_opt = re.sub(r'</?b>', '', opt)
                clean_opt = clean_text(clean_opt)
                options.append(clean_opt)
                
                # Check if this was the bold (correct) option
                if '<b>' in opt:
                    correct_idx = idx
            
            # Extract explanation if present
            explanation = ""
            expl_match = re.search(rf'<b>{q_num}\.\s+.*?<i>\((.*?)\)</i>', test_content, re.DOTALL)
            if expl_match:
                explanation = clean_text(expl_match.group(1))
                # Remove calculation details, keep rationale
                if 'Calculation:' in explanation:
                    explanation = explanation.split('Calculation:')[0].strip()
                if 'Rationale:' in explanation:
                    explanation = explanation.split('Rationale:')[1].strip()
                if not explanation:
                    explanation = "Navigation calculation required."
            else:
                explanation = "Apply navigation principles and formulas."
            
            question_obj = {
                "question": clean_text(q_text),
                "options": options,
                "correct": correct_idx,
                "explanation": explanation
            }
            
            questions.append(question_obj)
            print(f"  Question {q_num}: {question_obj['question'][:60]}...")
        
        if questions:
            test_obj = {
                "name": f"General Navigation Test {test_num}",
                "timeLimit": 60,
                "questions": questions
            }
            tests.append(test_obj)
            print(f"Test {test_num}: {len(questions)} questions extracted")
    
    return tests

# Read the HTML file
print("Reading navigation.htm...")
with open('navigation.htm', 'r', encoding='utf-8', errors='ignore') as f:
    html_content = f.read()

# Extract tests
print("\nExtracting General Navigation tests...")
tests = extract_questions(html_content)

# Create the complete section
general_nav_section = {
    "name": "General Navigation",
    "icon": "fas fa-compass",
    "tests": tests
}

# Format as JavaScript object string
js_output = f'''  "general-navigation": {{
    "name": "General Navigation",
    "icon": "fas fa-compass",
    "tests": {json.dumps(tests, indent=6, ensure_ascii=False)}
  }},'''

# Write to file
print("\nWriting to general_navigation_new.txt...")
with open('general_navigation_new.txt', 'w', encoding='utf-8') as f:
    f.write(js_output)

print(f"\n✓ Complete! Extracted {len(tests)} tests")
print(f"Total questions: {sum(len(test['questions']) for test in tests)}")
