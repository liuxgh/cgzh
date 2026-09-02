import re
filepath = 'src/components/PatentSimilarSearchHub.tsx'
with open(filepath, 'r') as f:
    content = f.read()

old_buttons = """<button
                  onClick={() => onSelectEnterprise(enterprise)}
                  className="px-4 py-2.5 bg-[#0F52BA] hover:bg-[#082C6C] text-white rounded-xl text-sm font-bold transition-all shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <span>查看企业画像</span>
                  <ChevronRight className="w-4 h-4" />
                </button>"""

new_buttons = """<button
                  onClick={() => onSelectEnterprise(enterprise)}
                  className="px-4 py-2.5 bg-[#0F52BA] hover:bg-[#082C6C] text-white rounded-xl text-sm font-bold transition-all shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <span>查看企业画像</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                {onOpenAiAgentWithEnterprise && (
                  <button 
                    onClick={() => onOpenAiAgentWithEnterprise(enterprise)}
                    className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold transition-all shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <span>AI撰写成果转化推荐函</span>
                  </button>
                )}"""

content = content.replace(old_buttons, new_buttons)

with open(filepath, 'w') as f:
    f.write(content)
