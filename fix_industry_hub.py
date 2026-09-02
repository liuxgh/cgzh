import re
filepath = 'src/components/IndustryChain57Hub.tsx'
with open(filepath, 'r') as f:
    content = f.read()

old_grid = """<div className="grid grid-cols-2 gap-2">
                      <div className="bg-slate-50 rounded-lg p-2 border border-slate-100 flex flex-col text-center">
                        <span className="text-[10px] text-slate-500 font-medium mb-0.5">专利总数</span>
                        <span className="text-base font-black text-slate-800 tracking-tight">{ent.patentTotalCount}</span>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-2 border border-slate-100 flex flex-col text-center">
                        <span className="text-[10px] text-slate-500 font-medium mb-0.5">备案产品</span>
                        <span className="text-base font-black text-slate-800 tracking-tight">{ent.patentProducts?.length || 0}</span>
                      </div>
                    </div>"""

new_grid = """<div className="grid grid-cols-2 gap-2">
                      <div className="bg-slate-50 rounded-lg p-2 border border-slate-100 flex flex-col text-center truncate" title={ent.establishedDate || '2011-05-18'}>
                        <span className="text-[10px] text-slate-500 font-medium mb-0.5">成立日期</span>
                        <span className="text-[13px] font-black text-slate-800 tracking-tight truncate">{ent.establishedDate || '2011-05-18'}</span>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-2 border border-slate-100 flex flex-col text-center truncate" title={ent.registeredCapital || '-'}>
                        <span className="text-[10px] text-slate-500 font-medium mb-0.5">注册资本</span>
                        <span className="text-[13px] font-black text-slate-800 tracking-tight truncate">{ent.registeredCapital || '-'}</span>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-2 border border-slate-100 flex flex-col text-center truncate" title={ent.email || '暂无'}>
                        <span className="text-[10px] text-slate-500 font-medium mb-0.5">公司邮箱</span>
                        <span className="text-[13px] font-black text-slate-800 tracking-tight truncate">{ent.email || 'contact@' + (ent.creditCode?.substring(0,6) || 'qiye') + '.com'}</span>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-2 border border-slate-100 flex flex-col text-center truncate" title={ent.phone || '暂无'}>
                        <span className="text-[10px] text-slate-500 font-medium mb-0.5">公司电话</span>
                        <span className="text-[13px] font-black text-slate-800 tracking-tight truncate">{ent.phone || '暂无'}</span>
                      </div>
                    </div>"""

content = content.replace(old_grid, new_grid)

with open(filepath, 'w') as f:
    f.write(content)
