import glob
import os
import re

replacements = [
    ("AI智能体自动撰写转化报告", "AI撰写成果转化推荐函"),
    ("吉林大学科技成果转化推介公函", "吉林大学科技成果转化推荐函")
]

for filepath in glob.glob('src/components/**/*.tsx', recursive=True) + glob.glob('src/**/*.ts', recursive=True):
    with open(filepath, 'r') as f:
        content = f.read()
    
    new_content = content
    for old, new in replacements:
        new_content = new_content.replace(old, new)
        
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
            print(f"Updated {filepath}")
