import re
filepath = 'src/components/IndustryChain57Hub.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# REMOVE UNIVERSITY SECTION
uni_section = """            <div className="bg-indigo-50/80 p-4 rounded-2xl border border-indigo-100 shrink-0 space-y-1">
              <span className="text-[11px] font-bold text-indigo-900 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-indigo-600" />
                吉林大学对口优势学科与国家重点实验室：
              </span>
              <p className="text-sm text-slate-800 font-semibold">{activeChain.jluAdvantageCollege}</p>
            </div>"""
content = content.replace(uni_section, "")

# FIX ENTERPRISE CARD
old_card_map = """{chainEnterprises.map((ent) => (
                <div
                  key={ent.id}
                  onClick={() => onSelectEnterprise(ent)}
                  className="group bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-400 shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 text-[11px] font-bold rounded shadow-sm">
                          {ent.chainPosition?.nodeName.split('：')[0]}
                        </span>
                        <span className="text-[11px] text-slate-500 flex items-center gap-1"><Compass className="w-3 h-3" /> {ent.location}</span>
                      </div>
                      <h5 className="text-[17px] font-black text-slate-900 group-hover:text-indigo-700 transition-colors leading-tight">{ent.name}</h5>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
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
                    </div>

                    
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-sm">
                    <span className="text-white bg-indigo-600 px-3 py-1.5 rounded-md font-bold flex items-center gap-1 shadow-sm group-hover:bg-indigo-700 transition-colors text-xs">
                      查看企业画像
                      <ChevronRight className="w-3 h-3" />
                    </span>
                    {onOpenAiActionPlan && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenAiActionPlan(ent);
                        }}
                        className="text-white bg-emerald-500 px-3 py-1.5 rounded-md font-bold flex items-center gap-1 shadow-sm hover:bg-emerald-600 transition-colors text-xs"
                      >
                        AI撰写对接方案
                      </button>
                    )}
                  </div>
                </div>
              ))}"""

# NEW CARD MATCHING OVERVIEW DASHBOARD STYLE BUT KEEPING TAG
new_card_map = """{chainEnterprises.map((ent) => (
                <div
                  key={ent.id}
                  onClick={() => onSelectEnterprise(ent)}
                  className="bg-white rounded-2xl p-5 border border-[#D8E2F0] shadow-xs hover:shadow-lg hover:border-[#0F52BA] transition-all cursor-pointer flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 text-[11px] font-bold rounded shadow-sm">
                            {ent.chainPosition?.nodeName.split('：')[0]}
                          </span>
                        </div>
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
              ))}"""

content = content.replace(old_card_map, new_card_map)

with open(filepath, 'w') as f:
    f.write(content)
