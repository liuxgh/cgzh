import re

filepath = 'src/components/IndustryChain57Hub.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Remove the keyInventors block completely
block = re.search(r'\{ent\.keyInventors && ent\.keyInventors\.length > 0 && \(\s*<div className="bg-indigo-50/50 px-3 py-2 rounded-xl border border-indigo-100/50 flex items-center gap-2 text-\[12px\]">[\s\S]*?</div>\s*\)\}', content)
if block:
    content = content.replace(block.group(0), "")
else:
    print("Not found in IndustryChain57Hub")

with open(filepath, 'w') as f:
    f.write(content)
print("Updated IndustryChain57Hub.tsx")
