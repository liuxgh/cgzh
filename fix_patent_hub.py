import re

with open('src/components/PatentSimilarSearchHub.tsx', 'r') as f:
    content = f.read()

# Remove stray )}
content = content.replace("      </div>\n      )}\n      {totalPages > 1", "      </div>\n      {totalPages > 1")

# Add the empty state
old_list = """      <div className="space-y-4">
        {paginatedEnterprises.map((enterprise) => ("""

new_list = """      <div className="space-y-4">
        {matchedEnterprises.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
              <Inbox className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">未找到符合条件的企业</h3>
            <p className="text-sm text-slate-500 max-w-md">当前过滤条件下没有匹配的靶向企业，请尝试放宽筛选条件，或重置区域与资质限制。</p>
            <button onClick={() => {
              setRegionFilter({p: 'all', c: 'all', d: 'all'});
              setEnterpriseTypeFilter('all');
              setPatentScaleFilter('all');
              setCapitalFilter('all');
              setSearchKeyword('');
            }} className="mt-6 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-blue-600 hover:bg-blue-50 transition-colors shadow-sm">
              重置筛选条件
            </button>
          </div>
        ) : (
        paginatedEnterprises.map((enterprise) => ("""
content = content.replace(old_list, new_list)

# We also need to close the ternary operator at the end of the mapping.
end_list = """          </div>
        ))}
      </div>
      {totalPages > 1"""

new_end_list = """          </div>
        ))}
        )}
      </div>
      {totalPages > 1"""
content = content.replace(end_list, new_end_list)

# Ensure Inbox is imported
if "Inbox" not in content:
    content = content.replace("import { \n", "import { \n  Inbox,\n")

with open('src/components/PatentSimilarSearchHub.tsx', 'w') as f:
    f.write(content)
