import re

filepath = 'src/components/OverviewDashboard.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Remove the keyInventors block completely
block = re.search(r'\{ent\.keyInventors && ent\.keyInventors\.length > 0 && \(\s*<div className="mt-3 bg-blue-50/50 p-2\.5 rounded-lg border border-blue-100 flex items-start gap-2 text-\[12px\]">[\s\S]*?</div>\s*\)\}', content)
if block:
    content = content.replace(block.group(0), "")
else:
    print("Not found in OverviewDashboard")

with open(filepath, 'w') as f:
    f.write(content)
print("Updated OverviewDashboard.tsx")
