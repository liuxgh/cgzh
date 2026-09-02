import re
with open('src/components/IndustryChain57Hub.tsx', 'r') as f:
    content = f.read()

lines = content.split('\n')
for i, line in enumerate(lines):
    if '吉林大学对口优势学科与国家重点实验室' in line:
        print(f"Found at {i}")
        # print some context
        print("\n".join(lines[max(0, i-20):i+50]))
        break
