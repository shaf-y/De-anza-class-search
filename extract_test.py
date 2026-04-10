import fitz
import re
import json

def parse_courses():
    doc = fitz.open('dac_catalog_2025-2026.pdf')
    # Try finding the first page with "Course Descriptions"
    
    courses = []
    
    for page_num in range(150, 250): # guess
        text = doc[page_num].get_text()
        if "Course Descriptions" in text or "Prerequisite" in text:
            # let's just dump the text to understand the format
            with open('scratch_pdf_sample.txt', 'w') as f:
                f.write(text)
            break
            
if __name__ == '__main__':
    parse_courses()
