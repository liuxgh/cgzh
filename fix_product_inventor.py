import re

filepath = 'src/components/PatentProductSearchHub.tsx'
with open(filepath, 'r') as f:
    content = f.read()

block = re.search(r'\{(?:\s*//.*?\n)*\s*\(\(\) => \{\s*const ent = TARGET_ENTERPRISES_DATA\.find\(e => e\.id === prod\.targetEnterpriseId\);\s*if \(ent && ent\.keyInventors && ent\.keyInventors\.length > 0\) \{\s*return \([\s\S]*?\);\s*\}\s*return null;\s*\}\)\(\)\s*\}', content)
if block:
    content = content.replace(block.group(0), "")
else:
    print("Not found IIFE")

with open(filepath, 'w') as f:
    f.write(content)
print("Updated PatentProductSearchHub.tsx")
