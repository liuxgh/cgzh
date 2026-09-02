import re

filepath = 'src/components/PatentSimilarSearchHub.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# 1. Change "吉林大学标的专利" -> "吉林大学的专利"
content = content.replace("吉林大学标的专利", "吉林大学的专利")

# 2. Change "技术重叠与互补点" -> "专利摘要"
content = content.replace("技术重叠与互补点", "专利摘要")

# 3. Add patent figures
# For JLU patent, it's after:
#                 <p className="text-slate-600 text-[11px] line-clamp-3 leading-relaxed">
#                   {activePatent.abstract}
#                 </p>
jlu_patent_target = r'(<p className="text-slate-600 text-\[11px\] line-clamp-3 leading-relaxed">\s*\{activePatent\.abstract\}\s*</p>)'
jlu_patent_images = """\\g<1>
                <div className="flex gap-2 mt-3">
                  <div className="relative group">
                    <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=150&q=80" alt="附图1" className="w-16 h-16 object-cover rounded-md border border-blue-200/60 shadow-xs" />
                    <div className="absolute bottom-0 inset-x-0 bg-black/50 text-[9px] text-center text-white py-0.5 rounded-b-md">附图 1</div>
                  </div>
                  <div className="relative group">
                    <img src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=150&q=80" alt="附图2" className="w-16 h-16 object-cover rounded-md border border-blue-200/60 shadow-xs" />
                    <div className="absolute bottom-0 inset-x-0 bg-black/50 text-[9px] text-center text-white py-0.5 rounded-b-md">附图 2</div>
                  </div>
                </div>"""
content = re.sub(jlu_patent_target, jlu_patent_images, content)

# For Enterprise Patent, it's after the techOverlapDescription box
ent_patent_target = r'(<div className="bg-white/90 p-2\.5 rounded-xl border border-emerald-200/60 text-\[11px\] text-emerald-950">\s*<strong className="block mb-0\.5">专利摘要：</strong>\s*\{enterprise\.similarPatents\[0\]\.techOverlapDescription\}\s*</div>)'
ent_patent_images = """\\g<1>
                  <div className="flex gap-2 mt-3">
                    <div className="relative group">
                      <img src="https://images.unsplash.com/photo-1537498425277-c283d32ef9db?auto=format&fit=crop&w=150&q=80" alt="附图1" className="w-16 h-16 object-cover rounded-md border border-emerald-200/60 shadow-xs" />
                      <div className="absolute bottom-0 inset-x-0 bg-black/50 text-[9px] text-center text-white py-0.5 rounded-b-md">附图 1</div>
                    </div>
                  </div>"""
content = re.sub(ent_patent_target, ent_patent_images, content)

with open(filepath, 'w') as f:
    f.write(content)
print("Updated PatentSimilarSearchHub.tsx")
