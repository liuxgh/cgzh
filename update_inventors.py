import re

with open('src/data/targetEnterprisesData.ts', 'r') as f:
    content = f.read()

# We need to find the `keyInventors` block and add a 3rd inventor.
# The structure is:
#     keyInventors: [
#       { name: '...', patentCount: ..., title: '...' },
#       { name: '...', patentCount: ..., title: '...' }
#     ],

import random

names = ['赵明', '钱多多', '孙浩', '李娜', '周宇', '吴迪', '郑强', '王磊', '冯博', '陈伟']
titles = ['研发骨干', '资深工程师', '高级研究员', '技术专员', '核心成员']

def repl(match):
    # match.group(0) is the entire keyInventors array
    # match.group(1) is the content inside the array
    inside = match.group(1)
    
    # Generate a random 3rd inventor
    new_name = random.choice(names)
    new_patent = random.randint(40, 75)
    new_title = f"核心发明人/{random.choice(titles)}"
    
    new_inventor = f",\n      {{ name: '{new_name}', patentCount: {new_patent}, title: '{new_title}' }}"
    
    return f"keyInventors: [{inside}{new_inventor}\n    ]"

# Use regex to find and replace
new_content = re.sub(r"keyInventors:\s*\[(.*?)\]", repl, content, flags=re.DOTALL)

with open('src/data/targetEnterprisesData.ts', 'w') as f:
    f.write(new_content)
