import json
import re
from difflib import SequenceMatcher

# Read the JavaScript file
with open('testData_complete.js', 'r', encoding='utf-8-sig') as f:
    js_content = f.read()

# Extract the JSON data from the JavaScript file
# Remove "window.testData = " and any trailing semicolons
json_str = js_content.replace('window.testData = ', '').rstrip(';').strip()
test_data = json.loads(json_str)

# Read the PDF extracted text
with open('pdf_extracted_text.txt', 'r', encoding='utf-8') as f:
    pdf_text = f.read()

# Parse PDF questions
pdf_questions = []
# Pattern to match Q-number: question text A-number: answer text
pattern = r'Q-(\d+):\s*(.+?)A-\1:\s*(.+?)(?=Q-\d+:|$)'
matches = re.findall(pattern, pdf_text, re.DOTALL)

for match in matches:
    q_num, question, answer = match
    # Clean up the text
    question = ' '.join(question.split())
    answer = ' '.join(answer.split())
    pdf_questions.append({
        'id': int(q_num),
        'question': question,
        'answer': answer
    })

print(f"PDF Questions found: {len(pdf_questions)}")
print(f"\nFirst 5 PDF questions:")
for i, q in enumerate(pdf_questions[:5], 1):
    print(f"{i}. Q-{q['id']}: {q['question'][:80]}...")
    print(f"   A: {q['answer'][:80]}...")

# Extract all questions from testData_complete.js
js_questions = []
for category_key, category in test_data.items():
    if 'tests' in category:
        for test in category['tests']:
            if 'questions' in test:
                for q in test['questions']:
                    js_questions.append({
                        'id': q.get('id'),
                        'category': category_key,
                        'test': q.get('test'),
                        'question': q.get('question', ''),
                        'answer': q.get('answer', ''),
                        'options': q.get('options', []),
                        'correct': q.get('correct')
                    })

print(f"\nJS Questions found: {len(js_questions)}")
print(f"\nFirst 5 JS questions:")
for i, q in enumerate(js_questions[:5], 1):
    print(f"{i}. ID {q['id']}: {q['question'][:80]}...")
    print(f"   A: {q['answer'][:80]}...")

# Function to normalize text for comparison
def normalize_text(text):
    # Remove extra spaces, punctuation variations
    text = text.lower().strip()
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'[^\w\s]', '', text)
    return text

# Function to calculate similarity
def similarity(text1, text2):
    return SequenceMatcher(None, normalize_text(text1), normalize_text(text2)).ratio()

# Try to match PDF questions with JS questions
matches = []
unmatched_pdf = []
unmatched_js = list(range(len(js_questions)))

print("\n" + "="*80)
print("MATCHING QUESTIONS...")
print("="*80)

for pdf_q in pdf_questions:
    best_match = None
    best_similarity = 0
    best_idx = -1
    
    for idx in unmatched_js:
        js_q = js_questions[idx]
        sim = similarity(pdf_q['question'], js_q['question'])
        
        if sim > best_similarity:
            best_similarity = sim
            best_match = js_q
            best_idx = idx
    
    if best_similarity > 0.7:  # Threshold for considering it a match
        # Check if answers match
        answer_sim = similarity(pdf_q['answer'], best_match['answer'])
        
        matches.append({
            'pdf_id': pdf_q['id'],
            'js_id': best_match['id'],
            'question_similarity': best_similarity,
            'answer_similarity': answer_sim,
            'answers_match': answer_sim > 0.7,
            'pdf_question': pdf_q['question'][:100],
            'js_question': best_match['question'][:100],
            'pdf_answer': pdf_q['answer'][:100],
            'js_answer': best_match['answer'][:100]
        })
        unmatched_js.remove(best_idx)
    else:
        unmatched_pdf.append(pdf_q)

# Generate report
print("\n" + "="*80)
print("COMPARISON REPORT")
print("="*80)

print(f"\nTotal questions in PDF: {len(pdf_questions)}")
print(f"Total questions in JS file: {len(js_questions)}")
print(f"Questions matched: {len(matches)}")
print(f"Unmatched PDF questions: {len(unmatched_pdf)}")
print(f"Unmatched JS questions: {len(unmatched_js)}")

# Analyze answer matches
matching_answers = sum(1 for m in matches if m['answers_match'])
different_answers = len(matches) - matching_answers

print(f"\nOf the matched questions:")
print(f"  - Same answers: {matching_answers}")
print(f"  - Different answers: {different_answers}")

# Show some examples of matched questions
print("\n" + "="*80)
print("EXAMPLES OF MATCHED QUESTIONS (with same answers)")
print("="*80)

matching_examples = [m for m in matches if m['answers_match']][:5]
for i, m in enumerate(matching_examples, 1):
    print(f"\n{i}. PDF Q-{m['pdf_id']} matches JS ID {m['js_id']}")
    print(f"   Question similarity: {m['question_similarity']:.2%}")
    print(f"   PDF Q: {m['pdf_question']}...")
    print(f"   JS Q:  {m['js_question']}...")
    print(f"   PDF A: {m['pdf_answer']}...")
    print(f"   JS A:  {m['js_answer']}...")

# Show examples of questions with different answers
if different_answers > 0:
    print("\n" + "="*80)
    print("EXAMPLES OF MATCHED QUESTIONS WITH DIFFERENT ANSWERS")
    print("="*80)
    
    diff_examples = [m for m in matches if not m['answers_match']][:5]
    for i, m in enumerate(diff_examples, 1):
        print(f"\n{i}. PDF Q-{m['pdf_id']} matches JS ID {m['js_id']}")
        print(f"   Question similarity: {m['question_similarity']:.2%}")
        print(f"   Answer similarity: {m['answer_similarity']:.2%}")
        print(f"   PDF Q: {m['pdf_question']}...")
        print(f"   JS Q:  {m['js_question']}...")
        print(f"   PDF A: {m['pdf_answer']}...")
        print(f"   JS A:  {m['js_answer']}...")

# Show some unmatched questions
if unmatched_pdf:
    print("\n" + "="*80)
    print("EXAMPLES OF UNMATCHED PDF QUESTIONS")
    print("="*80)
    for i, q in enumerate(unmatched_pdf[:5], 1):
        print(f"\n{i}. PDF Q-{q['id']}: {q['question'][:100]}...")
        print(f"   A: {q['answer'][:100]}...")

# Save detailed report to file
with open('comparison_report.txt', 'w', encoding='utf-8') as f:
    f.write("DETAILED COMPARISON REPORT\n")
    f.write("="*80 + "\n\n")
    f.write(f"Total questions in PDF: {len(pdf_questions)}\n")
    f.write(f"Total questions in JS file: {len(js_questions)}\n")
    f.write(f"Questions matched: {len(matches)}\n")
    f.write(f"Questions with same answers: {matching_answers}\n")
    f.write(f"Questions with different answers: {different_answers}\n")
    f.write(f"Unmatched PDF questions: {len(unmatched_pdf)}\n")
    f.write(f"Unmatched JS questions: {len(unmatched_js)}\n")
    
print("\n\nDetailed report saved to 'comparison_report.txt'")
