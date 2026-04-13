import fitz
import re
import json

def extract_courses():
    doc = fitz.open('dac_catalog_2025-2026.pdf')
    
    # Extract text from page 100 to the end, we can assume course catalog starts somewhere here
    # Join text with double newlines between pages just to be safe
    full_text = ""
    for page_num in range(120, len(doc)):
        full_text += doc[page_num].get_text() + "\n\n"

    # Regex to match a course block
    # Looks for something like "ANTH 1 - Physical Anthropology"
    # followed by "4.0 Units"
    # Then we capture everything until the next course or end of string.
    # Note: Departments are generally uppercase letters, maybe short space, and numbers. e.g. "CIS  4", "MATH 1A"
    course_pattern = re.compile(
        r'([A-Z]{2,5}\s+[0-9]{1,3}[A-Z]{0,3})\s+-\s+(.*?)\n([0-9.]+)\s+Units\n(.*?)(?=\n[A-Z]{2,5}\s+[0-9]{1,3}[A-Z]{0,3}\s+-|\Z)', 
        re.DOTALL
    )

    courses = []
    
    for match in course_pattern.finditer(full_text):
        code = match.group(1).strip()
        title = match.group(2).strip()
        units = match.group(3).strip()
        body = match.group(4).strip()
        
        # Now we parse the body for description and prerequisites
        # The description is typically from the beginning until one of the keywords
        # like "General Course Statement(s)", "Advisory(ies)", "Prerequisite(s)", etc.
        
        desc_match = re.split(r'\n(General Course|Advisory\(ies\)|Prerequisite\(s\)|Limitation\(s\)|Corequisite\(s\))', body)
        description = desc_match[0].replace('Credit - Degree Applicable', '').replace('Credit - Not Degree Applicable', '').strip()
        # Clean up newlines in description
        description = re.sub(r'\n+', ' ', description)
        
        prereqs = "None"
        if 'Prerequisite(s)' in desc_match:
            idx = desc_match.index('Prerequisite(s)')
            if idx + 1 < len(desc_match):
                # The text that follows until the next heading or end
                prereq_text = desc_match[idx + 1].strip()
                prereq_text = re.sub(r'\n+', ' ', prereq_text)
                prereqs = prereq_text
                
        # Some courses might capture noise, so we make sure code looks legit (e.g. less than 10 chars)
        if len(code) <= 12 and len(title) > 2:
            courses.append({
                "code": code,
                "title": title,
                "units": units,
                "description": description,
                "prerequisites": prereqs
            })

    # Sort courses by code
    courses.sort(key=lambda x: x['code'])
    
    # Save to src/data/classes.json
    import os
    os.makedirs('src/data', exist_ok=True)
    with open('src/data/classes.json', 'w') as f:
        json.dump(courses, f, indent=2)
        
    print(f"Extracted {len(courses)} courses.")

if __name__ == '__main__':
    extract_courses()
