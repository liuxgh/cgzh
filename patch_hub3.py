import re

filepath = 'src/components/PatentProductSearchHub.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Make sure regionFilter state exists (it should from the previous attempt, but we'll check)
if "const [regionFilter" not in content:
    content = content.replace("const [searchKeyword, setSearchKeyword] = useState<string>('');", 
                              "const [searchKeyword, setSearchKeyword] = useState<string>('');\n  const [regionFilter, setRegionFilter] = useState<string>('all');")

filter_logic = """
  const filteredProducts = PATENT_INTENSIVE_PRODUCTS_DATA.filter(prod => {
    if (industryFilter !== 'all' && !prod.industryCategory.includes(industryFilter)) return false;
    if (searchKeyword.trim()) {
"""
if filter_logic in content and "regionFilter !== 'all'" not in content:
    new_logic = """
  const filteredProducts = PATENT_INTENSIVE_PRODUCTS_DATA.filter(prod => {
    if (industryFilter !== 'all' && !prod.industryCategory.includes(industryFilter)) return false;
    
    if (regionFilter !== 'all') {
      const ent = TARGET_ENTERPRISES_DATA.find(e => e.id === prod.targetEnterpriseId);
      if (ent) {
        if (regionFilter !== '其他' && !ent.province?.includes(regionFilter) && !ent.city?.includes(regionFilter)) return false;
        if (regionFilter === '其他' && ['北京', '上海', '广东', '江苏', '浙江', '山东', '福建', '四川', '湖北'].some(r => ent.province?.includes(r) || ent.city?.includes(r))) return false;
      }
    }

    if (searchKeyword.trim()) {
"""
    content = content.replace(filter_logic, new_logic)
    
ui_target = r'(<div className="flex flex-wrap items-center gap-3">[\s\S]*?</select>\s*</div>)'
if re.search(ui_target, content) and "onChange={(e) => setRegionFilter" not in content:
    region_select = """
          <div className="w-px h-6 bg-slate-200 hidden sm:block mx-1"></div>
          <span className="text-sm font-bold text-slate-700 flex items-center gap-1 hidden sm:flex">
            所在区域：
          </span>
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl focus:ring-[#0F52BA] focus:border-[#0F52BA] block w-28 px-3 py-1.5 cursor-pointer font-medium hover:border-[#0F52BA] transition-colors"
          >
            <option value="all">全国</option>
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
          </select>"""
    
    content = re.sub(ui_target, r"\g<1>\n" + region_select, content)

with open(filepath, 'w') as f:
    f.write(content)
print("Updated PatentProductSearchHub.tsx logic and UI")
