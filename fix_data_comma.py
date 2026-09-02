filepath = 'src/data/targetEnterprisesData.ts'
with open(filepath, 'r') as f:
    content = f.read()

content = content.replace("}\n  {", "},\n  {")

with open(filepath, 'w') as f:
    f.write(content)
