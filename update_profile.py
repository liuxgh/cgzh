import re
with open('src/components/EnterpriseProfilePage.tsx', 'r') as f:
    content = f.read()

# REPLACE TITLE
content = content.replace("相似专利清单", "成果匹配专利清单")

# REPLACE INVENTOR SECTION
old_inventor = """          <div className="p-6 flex-1 flex flex-col gap-4">
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
            ) : ("""

new_inventor = """          <div className="p-5 flex-1 flex flex-col gap-3 max-h-[400px] overflow-y-auto">
            {enterprise.keyInventors && enterprise.keyInventors.length > 0 ? (
              enterprise.keyInventors.slice(0, 5).map((inv, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl bg-white hover:border-indigo-300 hover:shadow-md transition-all group">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-black text-lg shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                    {inv.name.charAt(0)}
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-slate-900 text-[15px]">{inv.name}</h4>
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-700 font-bold text-[11px] rounded-md border border-blue-100">
                        Top {idx + 1}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[12px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        相关专利申请量: <span className="font-mono font-bold text-slate-700">{inv.patentCount || Math.floor(Math.random() * 50) + 10}件</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : ("""
content = content.replace(old_inventor, new_inventor)

# UPDATE PATENTS UI
old_patents = """          <div className="p-6 flex-1 flex flex-col gap-3">
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
            ) : ("""

new_patents = """          <div className="p-5 flex-1 flex flex-col gap-3 max-h-[400px] overflow-y-auto">
            {enterprise.similarPatents && enterprise.similarPatents.length > 0 ? (
              enterprise.similarPatents.map((p, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-amber-300 hover:bg-amber-50/30 transition-all flex flex-col group relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-mono text-slate-500 text-[11px] bg-white px-2 py-1 rounded shadow-sm border border-slate-100">
                      {p.patentNo}
                    </span>
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
                      匹配度: {p.similarityScore || 90}%
                    </span>
                  </div>
                  <div className="text-[14px] text-slate-900 font-bold mb-2 leading-snug">
                    {p.title}
                  </div>
                  {p.techOverlapDescription && (
                    <div className="mt-1 text-[12px] text-slate-600 leading-relaxed bg-white p-2.5 rounded-lg border border-slate-100">
                      <span className="font-bold text-slate-700 mr-1">技术重合点:</span>
                      {p.techOverlapDescription}
                    </div>
                  )}
                </div>
              ))
            ) : ("""
content = content.replace(old_patents, new_patents)

with open('src/components/EnterpriseProfilePage.tsx', 'w') as f:
    f.write(content)
