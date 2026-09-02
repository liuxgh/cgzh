import re

filepath = 'src/components/AiEnterpriseAgent.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Remove the keyInventors block completely
block = re.search(r'\{ent\.keyInventors && ent\.keyInventors\.length > 0 && \(\s*<div className="bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 flex items-center gap-3 text-\[13px\]">[\s\S]*?</div>\s*\)\}', content)
if block:
    content = content.replace(block.group(0), "")
else:
    print("Not found")

with open(filepath, 'w') as f:
    f.write(content)
print("Updated AiEnterpriseAgent.tsx")
