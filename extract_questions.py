#!/usr/bin/env python3
"""
Question Extractor for Aviation Test App
Extracts questions from the original 617.htm file and converts them to JavaScript format
"""

import re
import json
from bs4 import BeautifulSoup
import sys

def extract_questions_from_html(file_path):
    """Extract all questions from the HTML file"""
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
    except UnicodeDecodeError:
        # Try with windows-1252 encoding if UTF-8 fails
        with open(file_path, 'r', encoding='windows-1252', errors='ignore') as f:
            content = f.read()
    
    # Parse HTML
    soup = BeautifulSoup(content, 'html.parser')
    
    # Find all paragraphs
    paragraphs = soup.find_all('p')
    
    questions = []
    current_category = None
    current_test = None
    
    for p in paragraphs:
        text = p.get_text().strip()
        
        # Skip empty paragraphs
        if not text:
            continue
            
        # Check if this is a category/test header
        if any(keyword in text.lower() for keyword in ['test 1', 'test 2', 'knowledge', 'aviation', 'procedures', 'navigation', 'law']):
            if 'aircraft general knowledge' in text.lower():
                current_category = 'aircraft-general'
                current_test = 'Aircraft General Knowledge'
            elif 'air law' in text.lower():
                current_category = 'air-law'
                current_test = 'Air Law'
            elif 'aon aviation' in text.lower():
                current_category = 'aon-aviation'
                current_test = 'AON Aviation'
            elif 'flight planning' in text.lower():
                current_category = 'flight-planning'
                current_test = 'Flight Planning'
            elif 'operational procedures' in text.lower():
                current_category = 'operational-procedures'
                current_test = 'Operational Procedures'
            elif 'radio navigation' in text.lower():
                current_category = 'radio-navigation'
                current_test = 'Radio Navigation'
            continue
        
        # Check if this is a question (starts with number followed by period)
        question_match = re.match(r'^(\d+)\.\s+(.+)', text)
        if question_match:
            question_num = question_match.group(1)
            question_text = question_match.group(2)
            
            # Parse the question and options
            parts = question_text.split(' A. ')
            if len(parts) < 2:
                continue
                
            question = parts[0].strip()
            remaining = ' A. ' + parts[1]
            
            # Extract options and correct answer
            options = []
            correct_answer = None
            
            # Look for options A, B, C, D
            option_pattern = r'([A-D])\.\s+([^A-D]*?)(?=\s+[A-D]\.|Correct Answer:|$)'
            option_matches = re.findall(option_pattern, remaining)
            
            for letter, option_text in option_matches:
                options.append(option_text.strip())
            
            # Extract correct answer
            correct_match = re.search(r'Correct Answer:\s*([A-D])', text)
            if correct_match:
                correct_letter = correct_match.group(1)
                correct_answer = ord(correct_letter) - ord('A')
            
            # Only add if we have all required parts
            if len(options) >= 2 and correct_answer is not None and current_category:
                question_data = {
                    'question': question,
                    'options': options,
                    'correct': correct_answer,
                    'explanation': None  # Will be added if found
                }
                
                questions.append({
                    'category': current_category,
                    'test': current_test,
                    'question_data': question_data
                })
    
    return questions

def organize_questions_by_category(questions):
    """Organize questions into categories and tests"""
    organized = {}
    
    for q in questions:
        category = q['category']
        test_name = q['test']
        question_data = q['question_data']
        
        if category not in organized:
            organized[category] = {
                'name': test_name,
                'icon': get_category_icon(category),
                'tests': [{
                    'name': f'{test_name} - Complete Set',
                    'timeLimit': 120,  # 2 hours
                    'questions': []
                }]
            }
        
        organized[category]['tests'][0]['questions'].append(question_data)
    
    return organized

def get_category_icon(category):
    """Get icon for category"""
    icons = {
        'aircraft-general': 'fas fa-plane',
        'air-law': 'fas fa-gavel',
        'aon-aviation': 'fas fa-graduation-cap',
        'flight-planning': 'fas fa-route',
        'operational-procedures': 'fas fa-cogs',
        'radio-navigation': 'fas fa-broadcast-tower'
    }
    return icons.get(category, 'fas fa-question')

def generate_javascript_file(organized_questions, output_path):
    """Generate the JavaScript testData.js file"""
    js_content = """// Aviation Test Data - Extracted from 617.htm
// Generated automatically by extract_questions.py

const testData = """
    
    js_content += json.dumps(organized_questions, indent=2)
    js_content += ";\n\n// Export for use in modules\nif (typeof module !== 'undefined' && module.exports) {\n    module.exports = testData;\n}"
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(js_content)

def main():
    input_file = 'C:\\Users\\ahmed\\Desktop\\617.htm'
    output_file = 'C:\\Users\\ahmed\\Desktop\\aviation-test-app\\src\\data\\testData.js'
    
    print("Extracting questions from 617.htm...")
    questions = extract_questions_from_html(input_file)
    print(f"Found {len(questions)} questions")
    
    print("Organizing questions by category...")
    organized = organize_questions_by_category(questions)
    
    # Print summary
    for category, data in organized.items():
        question_count = len(data['tests'][0]['questions'])
        print(f"  {data['name']}: {question_count} questions")
    
    print(f"Generating JavaScript file: {output_file}")
    generate_javascript_file(organized, output_file)
    
    print("✅ Extraction complete!")
    print(f"Total questions extracted: {sum(len(data['tests'][0]['questions']) for data in organized.values())}")
    print("\nYour aviation test app now has the complete question bank!")

if __name__ == "__main__":
    main()