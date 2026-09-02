import re

filepath = 'src/components/EnterpriseProfilePage.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# 1. Insert Similar Patents and Key Inventors between Section 2 and 3
insertion_point = r'(\s*\{/\* Section 3: 10-year Trend \*/\})'
new_section = """
      {/* 相似专利清单与主要发明人 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden flex flex-col h-full">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2 shrink-0">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-black text-slate-900">相似专利清单</h2>
          </div>
          <div className="p-6 flex-1 flex flex-col gap-3">
            {enterprise.similarPatents && enterprise.similarPatents.length > 0 ? (
              enterprise.similarPatents.map((p, idx) => (
                <div key={idx} className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex flex-col">
                  <div className="flex items-center gap-2 mb-2 font-bold text-blue-900">
                    <span className="font-mono text-slate-500 mr-2 text-[11px] bg-white px-1.5 py-0.5 rounded border border-blue-100">[{p.patentNo}]</span>
                  </div>
                  <div className="text-sm text-slate-800 font-medium">
                    {p.title}
                  </div>
                  {p.techOverlapDescription && (
                    <div className="mt-2 text-[11px] text-slate-600 line-clamp-2">
                      {p.techOverlapDescription}
                    </div>
                  )}
                </div>
              ))
            ) : (
               <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
                 暂无相似专利数据
               </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden flex flex-col h-full">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2 shrink-0">
            <User className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-black text-slate-900">主要发明人</h2>
          </div>
          <div className="p-6 flex-1 flex flex-col gap-4">
            {enterprise.keyInventors && enterprise.keyInventors.length > 0 ? (
              enterprise.keyInventors.slice(0, 3).map((inv, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 border border-slate-100 rounded-xl bg-slate-50 hover:bg-white hover:border-indigo-200 transition-colors shadow-xs">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold shrink-0">
                    {inv.name.charAt(0)}
                  </div>
                  <div className="flex flex-col justify-center min-h-10">
                    <h4 className="font-bold text-slate-900">{inv.name}</h4>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                <Briefcase className="w-10 h-10 mb-3 text-slate-200" />
                <p className="text-sm">暂未收录具体联系人信息</p>
              </div>
            )}
          </div>
        </div>
      </div>
"""
if re.search(insertion_point, content):
    content = re.sub(insertion_point, new_section + r'\1', content)
else:
    print("Could not find Section 3 marker to insert the new blocks.")


# 2. Rewrite Section 4 to match the dashboard bubble chart style.
# The user wants "技术申请趋势" to look like "核心科技成果演进趋势"
# Let's extract the chart code from JluTechAdvantageShowcase.tsx first.
with open(filepath, 'w') as f:
    f.write(content)
print("Updated basic sections in EnterpriseProfilePage.tsx")
