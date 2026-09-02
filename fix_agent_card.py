import re
filepath = 'src/components/AiEnterpriseAgent.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# We need to replace the content of TARGET_ENTERPRISES_DATA.map((ent) => ( ... ))
# We can find the start of the map, and then just replace it up to the end of the map.
start_str = "TARGET_ENTERPRISES_DATA.map((ent) => ("
end_str = "))}\n              </div>"
start_idx = content.find(start_str)
end_idx = content.find(end_str)

if start_idx != -1 and end_idx != -1:
    new_map = """TARGET_ENTERPRISES_DATA.map((ent) => (
                  <div
                    key={ent.id}
                    onClick={() => onSelectEnterprise(ent)}
                    className="bg-white rounded-2xl p-5 border border-[#D8E2F0] shadow-xs hover:shadow-lg hover:border-[#0F52BA] transition-all cursor-pointer flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="text-lg font-bold text-slate-900 group-hover:text-[#0F52BA]">
                            {ent.name}
                          </h4>
                        </div>
                      </div>
                      <div className="mt-3 bg-[#F8FAFC] p-3 rounded-xl border border-slate-100 text-[12px] text-slate-600 flex flex-col gap-2">
                        <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                          <div>
                            成立日期：<span className="font-semibold text-slate-800">{ent.establishedDate || '2011-05-18'}</span>
                          </div>
                          <div>
                            注册资本：<span className="font-semibold text-slate-800">{ent.registeredCapital || '-'}</span>
                          </div>
                          <div className="truncate" title={ent.email || '暂无'}>
                            公司邮箱：<span className="font-semibold text-slate-800">{ent.email || 'contact@' + (ent.creditCode?.substring(0,6) || 'qiye') + '.com'}</span>
                          </div>
                          <div>
                            公司电话：<span className="font-semibold text-slate-800">{ent.phone || '暂无'}</span>
                          </div>
                        </div>
                        <div className="pt-2 border-t border-slate-200 mt-1 truncate" title={(ent.location || '') + (ent.address || '')}>
                          企业地址：<span className="font-semibold text-slate-800">{ent.location || '-'}{ent.address ? ' ' + ent.address : ''}</span>
                        </div>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-sm">
                      <span className="text-[#0F52BA] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>查看企业画像</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                      {onOpenAiActionPlan && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenAiActionPlan(ent);
                          }}
                          className="text-white bg-[#0F52BA] px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 shadow-sm hover:bg-[#082C6C] hover:shadow-md transition-all text-xs"
                        >
                          AI撰写对接方案
                        </button>
                      )}
                    </div>
                  </div>
                """
    content = content[:start_idx] + new_map + content[end_idx:]

    with open(filepath, 'w') as f:
        f.write(content)
