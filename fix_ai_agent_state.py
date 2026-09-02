import re

with open('src/components/AiEnterpriseAgent.tsx', 'r') as f:
    content = f.read()

# I need to add 'report' back to the useState and the buttons.
# Currently: const [activeTab, setActiveTab] = useState<'official_letter' | 'call_script'>('official_letter');
state_pattern = r"const \[activeTab, setActiveTab\] = useState\<'official_letter' \| 'call_script'\>\('official_letter'\);"
replacement = "const [activeTab, setActiveTab] = useState<'report' | 'official_letter' | 'call_script'>(initialEnterprise ? 'official_letter' : 'report');\n  const [localEnterprise, setLocalEnterprise] = useState<TargetEnterprise | null>(initialEnterprise);"

content = re.sub(state_pattern, replacement, content)

# I need to replace `initialEnterprise` with `localEnterprise` in the letter text!
content = content.replace("initialEnterprise ?", "localEnterprise ?")
content = content.replace("initialEnterprise.name", "localEnterprise.name")
content = content.replace("initialEnterprise.shortName", "localEnterprise.shortName")

# I need to add the 'report' tab button back.
# It should go before the official_letter button.
buttons_pattern = r"(\<div className=\"flex border-b border-slate-200 bg-slate-50/80 px-6 overflow-x-auto gap-2\"\>\s*\<button)"
report_button = """<div className="flex border-b border-slate-200 bg-slate-50/80 px-6 overflow-x-auto gap-2">
            <button
              onClick={() => setActiveTab('report')}
              className={`py-4 px-4 text-sm font-bold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                activeTab === 'report'
                  ? 'border-[#003d80] text-[#003d80] bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>AI 推荐靶向企业列表</span>
            </button>
            <button"""
content = re.sub(buttons_pattern, report_button, content)

# I need to add the 'report' content back.
# It goes right after `<div className="p-6 sm:p-8 space-y-6">`
report_content = """            {/* TAB 1: Target Enterprises Full Cards */}
            {activeTab === 'report' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {TARGET_ENTERPRISES_DATA.map((ent) => (
                    <div
                      key={ent.id}
                      className="group bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#0F52BA]/50 transition-all flex flex-col justify-between relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="space-y-5">
                        <div className="cursor-pointer" onClick={() => onSelectEnterprise(ent)}>
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <h4 className="text-[19px] font-black text-slate-900 group-hover:text-[#0F52BA] transition-colors leading-tight">
                              {ent.name}
                            </h4>
                          </div>
                          <div className="flex items-center gap-2 text-[12px] text-slate-500 mb-4">
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded flex items-center gap-1"><Building2 className="w-3 h-3" /> {ent.industry}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="bg-blue-50/50 rounded-xl p-3 border border-blue-100/50 flex flex-col items-center justify-center text-center">
                            <span className="text-[11px] text-blue-600 font-bold mb-1">专利总数</span>
                            <span className="text-lg font-black text-slate-900 tracking-tight">{ent.patentTotalCount}</span>
                          </div>
                          <div className="bg-emerald-50/50 rounded-xl p-3 border border-emerald-100/50 flex flex-col items-center justify-center text-center">
                            <span className="text-[11px] text-emerald-600 font-bold mb-1">发明专利</span>
                            <span className="text-lg font-black text-slate-900 tracking-tight">{ent.inventionPatentCount}</span>
                          </div>
                          <div className="bg-indigo-50/50 rounded-xl p-3 border border-indigo-100/50 flex flex-col items-center justify-center text-center">
                            <span className="text-[11px] text-indigo-600 font-bold mb-1">注册资本</span>
                            <span className="text-sm font-black text-slate-900 tracking-tight flex items-center h-full">{ent.registeredCapital?.replace(' 万元人民币', '万') || '-'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-sm">
                        <span className="text-slate-400 text-xs font-medium">AI 匹配推荐</span>
                        <button 
                          onClick={() => { 
                            setLocalEnterprise(ent);
                            setActiveTab('official_letter');
                          }}
                          className="text-white bg-[#0F52BA] px-4 py-2 rounded-lg font-bold flex items-center gap-1 shadow-sm hover:bg-[#082C6C] hover:shadow-md transition-all"
                        >
                          AI智能体自动撰写转化报告
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
"""

content = content.replace('{/* TAB 2: Official Letter */}', report_content + '\n            {/* TAB 2: Official Letter */}')

with open('src/components/AiEnterpriseAgent.tsx', 'w') as f:
    f.write(content)
print("Updated AiEnterpriseAgent.tsx")
