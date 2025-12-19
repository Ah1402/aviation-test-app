import PyPDF2
import json
import re

pdf_path = r"c:\Users\ahmed\Downloads\Phone Link\AON questions.pdf"

# Extract text from PDF
text = ""
with open(pdf_path, 'rb') as file:
    pdf_reader = PyPDF2.PdfReader(file)
    print(f"Total pages: {len(pdf_reader.pages)}")
    
    for page_num in range(len(pdf_reader.pages)):
        page = pdf_reader.pages[page_num]
        text += page.extract_text()
        if page_num < 5:  # Print first few pages for inspection
            print(f"\n=== Page {page_num + 1} ===")
            print(page.extract_text()[:500])

# Save extracted text for manual inspection
with open('pdf_extracted_text.txt', 'w', encoding='utf-8') as f:
    f.write(text)

print(f"\nTotal text length: {len(text)} characters")
print(f"\nText saved to pdf_extracted_text.txt")

# Try to identify question patterns
question_pattern = r'\d+\.\s+(.+?)(?=\d+\.|$)'
matches = re.findall(question_pattern, text, re.DOTALL)
print(f"\nPotential questions found using pattern: {len(matches)}")
