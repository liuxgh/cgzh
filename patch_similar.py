import re

filepath = 'src/components/PatentSimilarSearchHub.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# 1. Add pagination states.
state_pattern = r'const \[searchKeyword, setSearchKeyword\] = useState<string>\(\'\'\);'
if state_pattern in content:
    content = content.replace(state_pattern, "const [searchKeyword, setSearchKeyword] = useState<string>('');\n  const [currentPage, setCurrentPage] = useState<number>(1);\n  const itemsPerPage = 10;")
else:
    print("State pattern not found")

# 2. Reset page on filter changes (in handlePatentChange)
handle_change_pattern = r'const handlePatentChange = \(id: string\) => \{'
content = content.replace(handle_change_pattern, "const handlePatentChange = (id: string) => {\n    setCurrentPage(1);")

# Wait, searchKeyword and regionFilter changes also need to reset the page.
# Using an effect:
effect_code = """
  useEffect(() => {
    setCurrentPage(1);
  }, [searchKeyword, regionFilter, currentPatentId]);
"""
content = content.replace("const activePatent = patents.find(p => p.id === currentPatentId) || patents[0];", effect_code + "\n  const activePatent = patents.find(p => p.id === currentPatentId) || patents[0];")

# 3. Add pagination logic after filtering
filter_end_pattern = r'return true;\n  \}\);'
pagination_logic = """return true;
  });

  const totalPages = Math.ceil(matchedEnterprises.length / itemsPerPage);
  const paginatedEnterprises = matchedEnterprises.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );"""
content = content.replace('return true;\n  });', pagination_logic)

# 4. Replace mapping from matchedEnterprises to paginatedEnterprises
content = content.replace('matchedEnterprises.map((enterprise)', 'paginatedEnterprises.map((enterprise)')

# 5. Add Region Filter UI in the Header next to searchKeyword
header_pattern = r"""<div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-[#0F52BA]" />
          <h3 className="text-lg font-black text-slate-900">
            已成功匹配到 <span className="text-[#0F52BA] font-mono">\{matchedEnterprises\.length\}</span> 家拥有高度相近专利的全国靶向企业
          </h3>
        </div>
        <div className="relative w-full sm:w-64">"""
        
new_header = """<div className="flex flex-1 items-center gap-2">
          <Building2 className="w-5 h-5 shrink-0 text-[#0F52BA]" />
          <h3 className="text-lg font-black text-slate-900">
            已成功匹配到 <span className="text-[#0F52BA] font-mono">{matchedEnterprises.length}</span> 家靶向企业
          </h3>
        </div>
        <div className="flex w-full sm:w-auto items-center gap-3">
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="bg-white border border-[#D8E2F0] rounded-xl px-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:border-[#0F52BA] min-w-[120px]"
          >
            <option value="all">全部区域</option>
            <option value="北京">北京</option>
            <option value="上海">上海</option>
            <option value="广东">广东</option>
            <option value="江苏">江苏</option>
            <option value="浙江">浙江</option>
            <option value="山东">山东</option>
            <option value="福建">福建</option>
            <option value="四川">四川</option>
            <option value="湖北">湖北</option>
            <option value="其他">其他</option>
          </select>
          <div className="relative flex-1 sm:w-64">"""
content = re.sub(r'<div className="flex items-center gap-2">\s*<Building2 className="w-5 h-5 text-\[#0F52BA\]" />\s*<h3 className="text-lg font-black text-slate-900">\s*已成功匹配到 <span className="text-\[#0F52BA\] font-mono">\{matchedEnterprises\.length\}</span> 家拥有高度相近专利的全国靶向企业\s*</h3>\s*</div>\s*<div className="relative w-full sm:w-64">', new_header, content)

# 6. Add Pagination Controls at the bottom
end_list_pattern = r'</div\s*>\s*</div\s*>\s*\);\s*\}\s*;\s*$'
# actually let's find the end of the <div className="space-y-4"> list
content = content.replace("    </div>\n  );\n};", """
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6 pb-4">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            上一页
          </button>
          <div className="flex items-center gap-1 px-4 text-sm text-slate-600 font-medium">
            第 <span className="text-blue-600 font-bold">{currentPage}</span> 页 / 共 {totalPages} 页
          </div>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            下一页
          </button>
        </div>
      )}
    </div>
  );
};""")

with open(filepath, 'w') as f:
    f.write(content)
print("Updated PatentSimilarSearchHub.tsx")
