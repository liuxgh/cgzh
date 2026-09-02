import re

with open('src/components/IndustryChain57Hub.tsx', 'r') as f:
    content = f.read()

if "Inbox" not in content:
    content = content.replace("Search,", "Search,\n  Inbox,\n  ChevronLeft,")

# Add pagination state and logic
state_injection = """  const [regionFilter, setRegionFilter] = useState<{p: string, c: string, d: string}>({p: 'all', c: 'all', d: 'all'});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
"""
content = content.replace("  const [regionFilter, setRegionFilter] = useState<{p: string, c: string, d: string}>({p: 'all', c: 'all', d: 'all'});", state_injection)

logic_injection = """    return true;
  });

  const totalPages = Math.ceil(chainEnterprises.length / itemsPerPage);
  const currentEnterprises = chainEnterprises.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [regionFilter.p, regionFilter.c, regionFilter.d, selectedNode, selectedChainId]);
"""
content = content.replace("""    return true;
  });""", logic_injection)

# Replace UI
old_list = """<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {chainEnterprises.map((ent) => ("""

new_list = """{chainEnterprises.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                    <Inbox className="w-8 h-8 text-slate-300" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">未找到符合条件的企业</h3>
                  <p className="text-sm text-slate-500 max-w-md">当前过滤条件下没有匹配的靶向企业，请尝试放宽筛选条件，或重置区域限制。</p>
                  <button onClick={() => {
                    setRegionFilter({p: 'all', c: 'all', d: 'all'});
                    setSelectedNode('all');
                  }} className="mt-6 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-blue-600 hover:bg-blue-50 transition-colors shadow-sm">
                    重置筛选条件
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentEnterprises.map((ent) => ("""
content = content.replace(old_list, new_list)

# Add pagination controls
end_list_str = """                  </div>
                </div>
              ))}
            </div>"""

new_end_list_str = """                  </div>
                </div>
              ))}
            </div>
            
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-6">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="text-sm font-medium text-slate-600">
                  第 <span className="text-slate-900 font-bold">{currentPage}</span> 页，共 {totalPages} 页
                </div>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
            )}
"""
# use re to replace
content = re.sub(r"</div>\s*</div>\s*\)\)}\s*</div>", new_end_list_str, content, count=1)

with open('src/components/IndustryChain57Hub.tsx', 'w') as f:
    f.write(content)
