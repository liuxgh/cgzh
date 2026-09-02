import re

with open('src/components/OverviewDashboard.tsx', 'r') as f:
    content = f.read()

if "Inbox" not in content:
    content = content.replace("Search,", "Search,\n  Inbox,\n  ChevronLeft,")

# Add pagination state and logic
state_injection = """  const [quickQuery, setQuickQuery] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 4;
  
  const totalPages = Math.ceil(TARGET_ENTERPRISES_DATA.length / itemsPerPage);
  const currentEnterprises = TARGET_ENTERPRISES_DATA.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
"""
content = content.replace("  const [quickQuery, setQuickQuery] = React.useState('');", state_injection)


# Replace mapping over TARGET_ENTERPRISES_DATA with currentEnterprises
old_list = """<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TARGET_ENTERPRISES_DATA.map((ent) => ("""

new_list = """{TARGET_ENTERPRISES_DATA.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
              <Inbox className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">暂无重点推荐企业</h3>
            <p className="text-sm text-slate-500 max-w-md">靶向企业库正在持续扩充中，敬请期待。</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentEnterprises.map((ent) => ("""
content = content.replace(old_list, new_list)

end_list_str = """                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>"""

new_end_list_str = """                  </div>
                </div>
              </div>
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

content = re.sub(r"</div>\s*</div>\s*</div>\s*</div>\s*\)\)}\s*</div>", new_end_list_str, content, count=1)

with open('src/components/OverviewDashboard.tsx', 'w') as f:
    f.write(content)
