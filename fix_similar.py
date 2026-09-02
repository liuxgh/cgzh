import re

with open('src/components/PatentSimilarSearchHub.tsx', 'r') as f:
    content = f.read()

# Make sure Inbox is imported
if "Inbox" not in content:
    content = content.replace("Search,", "Search,\n  Inbox,\n  ChevronLeft,")

# Replace empty state for SimilarSearchHub
old_grid = """<div className="grid grid-cols-1 gap-4">
        {currentEnterprises.map((enterprise) => ("""

new_grid = """
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
      <div className="grid grid-cols-1 gap-4">
        {currentEnterprises.map((enterprise) => ("""

content = content.replace(old_grid, new_grid)

# Add closing bracket for the ternary operator
content = content.replace("""        ))}
      </div>


      {totalPages > 1 && (""", """        ))}
      </div>
      )}

      {totalPages > 1 && (""")

with open('src/components/PatentSimilarSearchHub.tsx', 'w') as f:
    f.write(content)
