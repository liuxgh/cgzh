import re
filepath = 'src/components/IndustryChain57Hub.tsx'
with open(filepath, 'r') as f:
    content = f.read()

old_footer = """<div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-sm">
                    <span></span>
                    <span className="text-white bg-indigo-600 px-3 py-1.5 rounded-md font-bold flex items-center gap-1 shadow-sm group-hover:bg-indigo-700 transition-colors text-xs">
                      查看企业画像
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>"""

new_footer = """<div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-sm">
                    <span className="text-white bg-indigo-600 px-3 py-1.5 rounded-md font-bold flex items-center gap-1 shadow-sm group-hover:bg-indigo-700 transition-colors text-xs">
                      查看企业画像
                      <ChevronRight className="w-3 h-3" />
                    </span>
                    {onOpenAiAgentWithEnterprise && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenAiAgentWithEnterprise(ent);
                        }}
                        className="text-white bg-emerald-500 px-3 py-1.5 rounded-md font-bold flex items-center gap-1 shadow-sm hover:bg-emerald-600 transition-colors text-xs"
                      >
                        AI撰写成果转化推荐函
                      </button>
                    )}
                  </div>"""

content = content.replace(old_footer, new_footer)

with open(filepath, 'w') as f:
    f.write(content)
