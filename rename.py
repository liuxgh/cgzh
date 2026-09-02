import glob
import os
import re

replacements = [
    ("AI撰写成果转化推荐函", "AI撰写对接方案"),
    ("onOpenAiAgentWithEnterprise", "onOpenAiActionPlan")
]

for filepath in glob.glob('src/**/*.tsx', recursive=True) + glob.glob('src/**/*.ts', recursive=True):
    with open(filepath, 'r') as f:
        content = f.read()
    
    new_content = content
    for old, new in replacements:
        new_content = new_content.replace(old, new)
        
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
            print(f"Updated {filepath}")
