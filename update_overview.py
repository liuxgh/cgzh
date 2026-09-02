import re
filepath = 'src/components/OverviewDashboard.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Add to props
content = content.replace("onSelectPatent: (patent: PatentItem) => void;", "onSelectPatent: (patent: PatentItem) => void;\n  onOpenAiAgentWithEnterprise?: (enterprise: TargetEnterprise) => void;")

# Destructure in component
content = content.replace("onSelectPatent,", "onSelectPatent,\n  onOpenAiAgentWithEnterprise,")

# Add button next to 查看企业画像
old_footer = """<div className="pt-3 border-t border-slate-100 flex items-center justify-between text-sm">
                <div></div>
                <span className="text-[#0F52BA] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>查看企业画像</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>"""
new_footer = """<div className="pt-3 border-t border-slate-100 flex items-center justify-between text-sm">
                <span className="text-[#0F52BA] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>查看企业画像</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
                {onOpenAiAgentWithEnterprise && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenAiAgentWithEnterprise(ent);
                    }}
                    className="text-white bg-[#0F52BA] px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 shadow-sm hover:bg-[#082C6C] hover:shadow-md transition-all text-xs"
                  >
                    AI撰写成果转化推荐函
                  </button>
                )}
              </div>"""

content = content.replace(old_footer, new_footer)

with open(filepath, 'w') as f:
    f.write(content)
