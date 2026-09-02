import re

filepath = 'src/components/PatentSimilarSearchHub.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Remove the keyInventors block completely
block = re.search(r'\{enterprise\.keyInventors && enterprise\.keyInventors\.length > 0 && \(\s*<div className="lg:col-span-2 bg-blue-50/50 p-3 rounded-xl border border-blue-100 flex items-center gap-3 text-sm">[\s\S]*?</div>\s*\)\}', content)
if block:
    content = content.replace(block.group(0), "")
else:
    print("Not found in PatentSimilarSearchHub")

with open(filepath, 'w') as f:
    f.write(content)
print("Updated PatentSimilarSearchHub.tsx")
