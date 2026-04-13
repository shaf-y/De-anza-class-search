import fitz
import re
import json

def extract_courses(pdf_path):
    doc = fitz.open(pdf_path)
    full_text = ""
    # Extract the entire text to ensure we don't miss courses if page numbers differ
    for page_num in range(50, len(doc)):
        full_text += doc[page_num].get_text() + "\n\n"

    course_pattern = re.compile(
        r'([A-Z]{2,5}\s+[0-9]{1,3}[A-Z]?)\s+-\s+(.*?)\n([0-9.]+)\s+Units\n(.*?)(?=\n[A-Z]{2,5}\s+[0-9]{1,3}[A-Z]?\s+-|\Z)', 
        re.DOTALL
    )

    courses = []
    
    for match in course_pattern.finditer(full_text):
        code = match.group(1).strip()
        title = match.group(2).strip()
        units = match.group(3).strip()
        body = match.group(4).strip()
        
        desc_match = re.split(r'\n(General Course|Advisory\(ies\)|Prerequisite\(s\)|Limitation\(s\)|Corequisite\(s\))', body)
        description = desc_match[0].replace('Credit - Degree Applicable', '').replace('Credit - Not Degree Applicable', '').strip()
        description = re.sub(r'\n+', ' ', description)
        
        prereqs = "None"
        if 'Prerequisite(s)' in desc_match:
            idx = desc_match.index('Prerequisite(s)')
            if idx + 1 < len(desc_match):
                prereq_text = desc_match[idx + 1].strip()
                prereq_text = re.sub(r'\n+', ' ', prereq_text)
                prereqs = prereq_text
                
        if len(code) <= 12 and len(title) > 2:
            courses.append({
                "code": code,
                "title": title,
                "units": units,
                "description": description,
                "prerequisites": prereqs
            })
    return courses

def merge():
    print("Parsing new PDF, this may take a moment...")
    new_courses = extract_courses('dac_catalog_2023-2024.pdf')
    print(f"Extracted {len(new_courses)} courses from 2023-2024 catalog.")
    
    with open('src/data/classes.json', 'r') as f:
        existing = json.load(f)
        
    existing_codes = {c['code'] for c in existing}
    
    added_count = 0
    for nc in new_courses:
        if nc['code'] not in existing_codes:
            existing.append(nc)
            existing_codes.add(nc['code'])
            added_count += 1
            
    existing.sort(key=lambda x: x['code'])
    
    with open('src/data/classes.json', 'w') as f:
        json.dump(existing, f, indent=2)
        
    print(f"Added {added_count} new courses.")
    print(f"Total courses now: {len(existing)}")

if __name__ == '__main__':
    merge()
