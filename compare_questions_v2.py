import re
from difflib import SequenceMatcher
from collections import defaultdict

# Read the PDF extracted text
with open('pdf_extracted_text.txt', 'r', encoding='utf-8') as f:
    pdf_text = f.read()

# Parse PDF questions - improved pattern
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

# Read JavaScript file and parse questions directly with regex
with open('testData_complete.js', 'r', encoding='utf-8-sig') as f:
    js_content = f.read()

# Extract questions using regex patterns
js_questions = []
# Pattern to find question objects
question_pattern = r'"question":\s*"([^"]+)"[^}]*?"answer":\s*"([^"]+)"[^}]*?"correct":\s*(\d+)'
question_matches = re.findall(question_pattern, js_content)

for i, (question, answer, correct) in enumerate(question_matches, 1):
    js_questions.append({
        'id': i,
        'question': question,
        'answer': answer,
        'correct': int(correct)
    })

print(f"JS Questions found: {len(js_questions)}")

# Function to normalize text for comparison
def normalize_text(text):
    text = text.lower().strip()
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'[^\w\s]', '', text)
    return text

# Function to calculate similarity
def similarity(text1, text2):
    return SequenceMatcher(None, normalize_text(text1), normalize_text(text2)).ratio()

# Try to match questions
print("\n" + "="*80)
print("MATCHING QUESTIONS...")
print("="*80)

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
    
    if best_similarity > 0.7:  # Threshold for considering it a match
        answer_sim = similarity(pdf_q['answer'], best_match['answer'])
        
        matches.append({
            'pdf_id': pdf_q['id'],
            'js_id': best_match['id'],
            'question_similarity': best_similarity,
            'answer_similarity': answer_sim,
            'answers_match': answer_sim > 0.7,
            'pdf_question': pdf_q['question'],
            'js_question': best_match['question'],
            'pdf_answer': pdf_q['answer'],
            'js_answer': best_match['answer']
        })
        used_js_indices.add(best_idx)

# Generate report
print("\n" + "="*80)
print("COMPARISON REPORT")
print("="*80)

print(f"\nTotal questions in PDF: {len(pdf_questions)}")
print(f"Total questions in JS file: {len(js_questions)}")
print(f"Questions matched: {len(matches)}")
print(f"Unmatched PDF questions: {len(pdf_questions) - len(matches)}")
print(f"Unmatched JS questions: {len(js_questions) - len(used_js_indices)}")

# Analyze answer matches
matching_answers = sum(1 for m in matches if m['answers_match'])
different_answers = len(matches) - matching_answers

print(f"\nOf the matched questions:")
print(f"  - Same answers: {matching_answers}")
print(f"  - Different answers: {different_answers}")
print(f"  - Percentage with matching answers: {(matching_answers/len(matches)*100):.1f}%")

# Show some examples of matched questions
print("\n" + "="*80)
print("EXAMPLES OF MATCHED QUESTIONS (with same answers)")
print("="*80)

matching_examples = [m for m in matches if m['answers_match']][:5]
for i, m in enumerate(matching_examples, 1):
    print(f"\n{i}. PDF Q-{m['pdf_id']} matches JS Question #{m['js_id']}")
    print(f"   Question similarity: {m['question_similarity']:.2%}")
    print(f"   Answer similarity: {m['answer_similarity']:.2%}")
    print(f"   PDF Q: {m['pdf_question'][:150]}...")
    print(f"   JS Q:  {m['js_question'][:150]}...")
    print(f"   PDF A: {m['pdf_answer'][:80]}")
    print(f"   JS A:  {m['js_answer'][:80]}")

# Show examples with different answers
if different_answers > 0:
    print("\n" + "="*80)
    print("EXAMPLES OF MATCHED QUESTIONS WITH DIFFERENT ANSWERS")
    print("="*80)
    
    diff_examples = [m for m in matches if not m['answers_match']][:5]
    for i, m in enumerate(diff_examples, 1):
        print(f"\n{i}. PDF Q-{m['pdf_id']} matches JS Question #{m['js_id']}")
        print(f"   Question similarity: {m['question_similarity']:.2%}")
        print(f"   Answer similarity: {m['answer_similarity']:.2%}")
        print(f"   PDF Q: {m['pdf_question'][:150]}...")
        print(f"   PDF A: {m['pdf_answer']}")
        print(f"   JS A:  {m['js_answer']}")

# Show unmatched questions from PDF
unmatched_pdf = [q for i, q in enumerate(pdf_questions) if not any(m['pdf_id'] == q['id'] for m in matches)]
if unmatched_pdf:
    print("\n" + "="*80)
    print(f"EXAMPLES OF UNMATCHED PDF QUESTIONS (Total: {len(unmatched_pdf)})")
    print("="*80)
    for i, q in enumerate(unmatched_pdf[:5], 1):
        print(f"\n{i}. PDF Q-{q['id']}: {q['question'][:150]}...")
        print(f"   A: {q['answer'][:80]}")

# Summary statistics
print("\n" + "="*80)
print("SUMMARY")
print("="*80)
print(f"Match rate: {(len(matches)/len(pdf_questions)*100):.1f}% of PDF questions found in JS file")
print(f"Answer accuracy: {(matching_answers/len(matches)*100):.1f}% of matched questions have the same answer")

# Overall conclusion
print("\n" + "="*80)
print("CONCLUSION")
print("="*80)
if len(matches) / len(pdf_questions) > 0.9 and matching_answers / len(matches) > 0.9:
    print("✓ These files contain essentially the same questions with the same answers.")
    print("  Minor differences in question IDs but content matches well.")
elif len(matches) / len(pdf_questions) > 0.7:
    print("⚠ These files contain similar questions but there are some differences:")
    if matching_answers / len(matches) < 0.9:
        print("  - Some questions have different correct answers")
    if len(matches) / len(pdf_questions) < 0.9:
        print("  - Some questions exist in one file but not the other")
else:
    print("✗ These files contain significantly different question sets.")

# Save detailed report
with open('comparison_report.txt', 'w', encoding='utf-8') as f:
    f.write("DETAILED COMPARISON REPORT\n")
    f.write("="*80 + "\n\n")
    f.write(f"PDF Questions: {len(pdf_questions)}\n")
    f.write(f"JS Questions: {len(js_questions)}\n")
    f.write(f"Matched: {len(matches)}\n")
    f.write(f"Same answers: {matching_answers}\n")
    f.write(f"Different answers: {different_answers}\n\n")
    
    f.write("ALL MATCHED QUESTIONS:\n")
    f.write("="*80 + "\n")
    for m in matches:
        f.write(f"\nPDF Q-{m['pdf_id']} = JS Q-{m['js_id']}\n")
        f.write(f"Question sim: {m['question_similarity']:.2%}, Answer sim: {m['answer_similarity']:.2%}\n")
        f.write(f"Answers match: {m['answers_match']}\n")
        if not m['answers_match']:
            f.write(f"PDF Answer: {m['pdf_answer']}\n")
            f.write(f"JS Answer: {m['js_answer']}\n")

print("\n✓ Detailed report saved to 'comparison_report.txt'")
