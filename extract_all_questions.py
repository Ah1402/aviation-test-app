import re
import json
from pathlib import Path
from bs4 import BeautifulSoup

# Define category mapping
category_mapping = {
    'agk1 .htm': 'aircraft-general',
    'Aircraft General Knowledge Test 1.htm': 'aircraft-general',
    'al1.htm': 'air-law',
    'Instrumentation Test 1.htm': 'instrumentation',
    'added/Instrumentation Test 1.htm': 'instrumentation',
    'mass.htm': 'mass-balance',
    'metrology.htm': 'metrology',
    'operational procedure.htm': 'operational-procedures',
    'performance .htm': 'performance',
    'general .htm': 'general-navigation',
    '🗺.htm': 'flight-planning',
    '🧠 Human Performance and Limitations Test 1.htm': 'human-performance',
    '🧠 AON Aviation Knowledge Test 1.htm': 'aon-aviation',
    '617.htm': 'mixed'  # Contains mixed questions
}

def extract_questions_from_html(file_path):
    """Extract questions from HTML file."""
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        soup = BeautifulSoup(content, 'html.parser')
        text = soup.get_text()
        
        questions = []
        
        # Split by question numbers or horizontal rules
        parts = re.split(r'\n\s*\d+\.\s+', text)
        
        for part in parts[1:]:  # Skip first empty part
            if 'Correct Answer:' in part:
                # Extract question text (before options)
                q_match = re.search(r'^(.+?)(?=\s+A\.|Options:|Answers:)', part, re.DOTALL)
                if not q_match:
                    continue
                    
                question_text = q_match.group(1).strip()
                question_text = re.sub(r'\s+', ' ', question_text)
                
                # Extract options A, B, C, D
                options = []
                for letter in ['A', 'B', 'C', 'D']:
                    opt_pattern = rf'{letter}[\.\)]\s*(.+?)(?=\s+[BCD][\.\)]|\s+Correct Answer:)'
                    opt_match = re.search(opt_pattern, part, re.DOTALL)
                    if opt_match:
                        option = opt_match.group(1).strip()
                        option = re.sub(r'\s+', ' ', option)
                        options.append(option)
                
                if len(options) < 4:
                    continue
                
                # Extract correct answer
                correct_match = re.search(r'Correct Answer:\s*([ABCD])', part)
                if not correct_match:
                    continue
                    
                correct_letter = correct_match.group(1)
                correct_index = ord(correct_letter) - ord('A')
                
                # Extract explanation if available
                expl_match = re.search(r'Correct Answer:\s*[ABCD]\s*\((.+?)\)', part, re.DOTALL)
                explanation = ""
                if expl_match:
                    explanation = expl_match.group(1).strip()
                    explanation = re.sub(r'\s+', ' ', explanation)
                
                questions.append({
                    'question': question_text,
                    'options': options,
                    'correct': correct_index,
                    'explanation': explanation
                })
        
        return questions
        
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return []

def main():
    desktop_path = Path(r'c:\Users\ahmed\Desktop')
    all_questions = {}
    
    for filename, category in category_mapping.items():
        file_path = desktop_path / filename
        if file_path.exists():
            print(f"Processing {filename}...")
            questions = extract_questions_from_html(file_path)
            print(f"  Found {len(questions)} questions")
            
            if category not in all_questions:
                all_questions[category] = []
            all_questions[category].extend(questions)
    
    # Save to JSON
    output_path = desktop_path / 'aviation-test-app' / 'extracted_questions.json'
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(all_questions, f, indent=2, ensure_ascii=False)
    
    print(f"\nTotal questions extracted: {sum(len(q) for q in all_questions.values())}")
    print(f"Saved to: {output_path}")
    
    # Print summary
    print("\nQuestions per category:")
    for cat, questions in sorted(all_questions.items()):
        print(f"  {cat}: {len(questions)}")

if __name__ == '__main__':
    main()
