import re
filepath = 'src/components/PatentProductSearchHub.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Add handleOpenAiByProduct
handle_logic = """  const handleOpenEnterpriseByProduct = (targetEnterpriseId: string) => {
    const ent = TARGET_ENTERPRISES_DATA.find(e => e.id === targetEnterpriseId);
    if (ent) {
      onSelectEnterprise(ent);
    }
  };"""
new_handle_logic = handle_logic + """

  const handleOpenAiByProduct = (targetEnterpriseId: string) => {
    if (!onOpenAiAgentWithEnterprise) return;
    const ent = TARGET_ENTERPRISES_DATA.find(e => e.id === targetEnterpriseId);
    if (ent) {
      onOpenAiAgentWithEnterprise(ent);
    }
  };"""

content = content.replace(handle_logic, new_handle_logic)

# Replace the footer buttons
old_footer = """<div className="pt-2 flex items-center justify-end text-sm">
                <button
                  onClick={() => handleOpenEnterpriseByProduct(prod.targetEnterpriseId)}
                  className="px-3.5 py-1.5 bg-[#003d80] hover:bg-blue-900 text-white font-bold rounded-xl flex items-center gap-1 transition-all shadow-xs"
                >
                  <span>查看企业画像</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>"""
new_footer = """<div className="pt-2 flex items-center justify-end gap-2 text-sm">
                <button
                  onClick={() => handleOpenEnterpriseByProduct(prod.targetEnterpriseId)}
                  className="px-3.5 py-1.5 bg-[#003d80] hover:bg-blue-900 text-white font-bold rounded-xl flex items-center gap-1 transition-all shadow-xs"
                >
                  <span>查看企业画像</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                {onOpenAiAgentWithEnterprise && (
                  <button
                    onClick={() => handleOpenAiByProduct(prod.targetEnterpriseId)}
                    className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl flex items-center gap-1 transition-all shadow-xs"
                  >
                    <span>AI撰写成果转化推荐函</span>
                  </button>
                )}
              </div>"""

content = content.replace(old_footer, new_footer)

with open(filepath, 'w') as f:
    f.write(content)
