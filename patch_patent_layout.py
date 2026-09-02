import re

filepath = 'src/components/PatentSimilarSearchHub.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Replace the text block in the enterprise patent
target = r'<div className="bg-white/90 p-2\.5 rounded-xl border border-emerald-200/60 text-\[11px\] text-emerald-950">\s*<strong className="block mb-0\.5">专利摘要：</strong>\s*\{enterprise\.similarPatents\[0\]\.techOverlapDescription\}\s*</div>'
replacement = r'''<p className="text-slate-600 text-[11px] line-clamp-3 leading-relaxed">
                    {enterprise.similarPatents[0].techOverlapDescription}
                  </p>'''

content = re.sub(target, replacement, content)

with open(filepath, 'w') as f:
    f.write(content)
print("Updated PatentSimilarSearchHub.tsx")
