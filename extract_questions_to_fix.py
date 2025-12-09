import re
from difflib import SequenceMatcher

print("="*80)
print("EXTRACTING ACTUAL QUESTIONS NEEDING REVIEW")
print("="*80)

# Read the PDF extracted text
print("\n[1/4] Reading PDF file...")
with open('pdf_extracted_text.txt', 'r', encoding='utf-8') as f:
    pdf_text = f.read()

# Parse PDF questions
pdf_questions = []
pattern = r'Q-(\d+):\s*(.+?)A-\1:\s*(.+?)(?=Q-\d+:|$)'
matches = re.findall(pattern, pdf_text, re.DOTALL)

for match in matches:
    q_num, question, answer = match
    question = ' '.join(question.split())
    answer = ' '.join(answer.split())
    pdf_questions.append({
        'id': int(q_num),
        'question': question,
        'answer': answer
    })

print(f"   Found {len(pdf_questions)} PDF questions")

# Read JavaScript file
print("\n[2/4] Reading testData_complete.js...")
with open('testData_complete.js', 'r', encoding='utf-8-sig') as f:
    js_content = f.read()

# Extract questions from JS
js_questions = []
question_pattern = r'"question":\s*"([^"]+)"[^}]*?"answer":\s*"([^"]+)"[^}]*?"correct":\s*(\d+)'
question_matches = re.findall(question_pattern, js_content)

for i, (question, answer, correct) in enumerate(question_matches, 1):
    js_questions.append({
        'id': i,
        'question': question,
        'answer': answer
    })

print(f"   Found {len(js_questions)} JS questions")

# Normalize text for comparison
def normalize_text(text):
    text = text.lower().strip()
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'[^\w\s]', '', text)
    return text

# Calculate similarity
def similarity(text1, text2):
    return SequenceMatcher(None, normalize_text(text1), normalize_text(text2)).ratio()

# Match questions
print("\n[3/4] Matching questions...")
matches = []
used_js_indices = set()

for pdf_q in pdf_questions:
    best_match = None
    best_similarity = 0
    best_idx = -1
    
    for idx, js_q in enumerate(js_questions):
        if idx in used_js_indices:
            continue
        sim = similarity(pdf_q['question'], js_q['question'])
        if sim > best_similarity:
            best_similarity = sim
            best_match = js_q
            best_idx = idx
    
    if best_similarity > 0.7:
        answer_sim = similarity(pdf_q['answer'], best_match['answer'])
        matches.append({
            'pdf_id': pdf_q['id'],
            'js_id': best_match['id'],
            'answers_match': answer_sim > 0.7,
            'pdf_question': pdf_q['question'],
            'js_question': best_match['question'],
            'pdf_answer': pdf_q['answer'],
            'js_answer': best_match['answer']
        })
        used_js_indices.add(best_idx)

print(f"   Matched {len(matches)} questions")

# Find unmatched PDF questions (excluding diagram questions)
unmatched_pdf = []
diagram_keywords = ['picture', 'diagram', 'figure', 'illustration', 'shown', 'image', 'refer to']

for pdf_q in pdf_questions:
    if not any(m['pdf_id'] == pdf_q['id'] for m in matches):
        # Check if it's a diagram question
        q_lower = pdf_q['question'].lower()
        is_diagram = any(keyword in q_lower for keyword in diagram_keywords)
        
        if not is_diagram:
            unmatched_pdf.append(pdf_q)

# Find questions with different answers
different_answers = [m for m in matches if not m['answers_match']]

print(f"   Found {len(different_answers)} questions with different answers")
print(f"   Found {len(unmatched_pdf)} unmatched questions (excluding diagrams)")

# Generate detailed report
print("\n[4/4] Creating detailed report...")

output = []
output.append("="*80)
output.append("QUESTIONS REQUIRING REVIEW AND CORRECTION")
output.append("="*80)
output.append(f"Generated: December 9, 2025")
output.append("")
output.append("This file contains:")
output.append(f"  - {len(unmatched_pdf)} unmatched PDF questions (no diagrams)")
output.append(f"  - {len(different_answers)} questions with different answers")
output.append("")
output.append("="*80)
output.append(f"SECTION 1: UNMATCHED QUESTIONS ({len(unmatched_pdf)} Questions)")
output.append("="*80)
output.append("")
output.append("These questions are in the PDF but NOT found in testData_complete.js")
output.append("(Diagram/picture questions excluded)")
output.append("")

for i, q in enumerate(unmatched_pdf, 1):
    output.append(f"\n{'='*80}")
    output.append(f"UNMATCHED QUESTION {i} (PDF Q-{q['id']})")
    output.append(f"{'='*80}")
    output.append(f"Question: {q['question']}")
    output.append(f"")
    output.append(f"Correct Answer: {q['answer']}")
    output.append(f"")
    output.append(f"STATUS: Missing from JavaScript file")
    output.append(f"ACTION: Consider adding this question to testData_complete.js")
    output.append("")

output.append("")
output.append("="*80)
output.append(f"SECTION 2: QUESTIONS WITH WRONG ANSWERS ({len(different_answers)} Questions)")
output.append("="*80)
output.append("")
output.append("These questions exist in both files but have DIFFERENT answers")
output.append("Review each to determine which answer is correct")
output.append("")

for i, m in enumerate(different_answers, 1):
    output.append(f"\n{'='*80}")
    output.append(f"DIFFERENT ANSWER {i} (PDF Q-{m['pdf_id']} = JS Q-{m['js_id']})")
    output.append(f"{'='*80}")
    output.append(f"Question: {m['pdf_question']}")
    output.append(f"")
    output.append(f"PDF Answer (Reference):  {m['pdf_answer']}")
    output.append(f"JS Answer (Current):     {m['js_answer']}")
    output.append(f"")
    output.append(f"STATUS: Answers don't match")
    output.append(f"ACTION: Verify correct answer and update testData_complete.js if needed")
    output.append(f"")

output.append("")
output.append("="*80)
output.append("HOW TO USE THIS FILE")
output.append("="*80)
output.append("")
output.append("For Unmatched Questions:")
output.append("  1. Review each question to see if it should be added")
output.append("  2. Add to the appropriate category in testData_complete.js")
output.append("  3. Use the provided answer from the PDF")
output.append("")
output.append("For Different Answers:")
output.append("  1. Compare PDF answer vs JS answer")
output.append("  2. Verify the correct answer using aviation references")
output.append("  3. Search for the question in testData_complete.js by text")
output.append("  4. Update the 'answer' and 'correct' fields")
output.append("")
output.append("="*80)
output.append("SUMMARY")
output.append("="*80)
output.append(f"")
output.append(f"Total items to review: {len(unmatched_pdf) + len(different_answers)}")
output.append(f"  - Unmatched questions: {len(unmatched_pdf)}")
output.append(f"  - Wrong answers: {len(different_answers)}")
output.append("")
output.append(f"Priority: Review questions with wrong answers first")
output.append("")
output.append("="*80)
output.append("END OF REPORT")
output.append("="*80)

# Write to file
with open('Questions_To_Fix.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(output))

print(f"\n✓ Detailed report created: Questions_To_Fix.txt")
print(f"")
print(f"Summary:")
print(f"  - Unmatched questions: {len(unmatched_pdf)}")
print(f"  - Questions with wrong answers: {len(different_answers)}")
print(f"  - Total questions to review: {len(unmatched_pdf) + len(different_answers)}")
print(f"")
print(f"All questions are listed with their correct/reference answers from the PDF.")
print(f"No diagram questions included.")
