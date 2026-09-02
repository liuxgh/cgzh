import re

filepath = 'src/components/PatentSimilarSearchHub.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# 1. state hook
if "const [regionFilter" not in content:
    content = content.replace("const [searchKeyword, setSearchKeyword] = useState<string>('');", 
                              "const [searchKeyword, setSearchKeyword] = useState<string>('');\n  const [regionFilter, setRegionFilter] = useState<string>('all');")

# 2. filter logic
filter_target = "if (searchKeyword.trim()) {"
if filter_target in content and "regionFilter !== 'all'" not in content:
    region_logic = """    if (regionFilter !== 'all' && regionFilter !== '其他' && !ent.province?.includes(regionFilter) && !ent.city?.includes(regionFilter)) return false;
    if (regionFilter === '其他' && ['北京', '上海', '广东', '江苏', '浙江', '山东', '福建', '四川', '湖北'].some(r => ent.province?.includes(r) || ent.city?.includes(r))) return false;
    """
    content = content.replace(filter_target, region_logic + filter_target)

# 3. UI
ui_target = r'(<div className="relative w-full sm:w-64">[\s\S]*?<input[\s\S]*?value=\{searchKeyword\}[\s\S]*?/>[\s\S]*?</svg>\s*</div>)'
if re.search(ui_target, content):
    region_select = """
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-700 whitespace-nowrap hidden sm:inline">所在区域:</span>
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="bg-white border border-[#D8E2F0] text-slate-700 text-sm rounded-xl focus:ring-[#0F52BA] focus:border-[#0F52BA] block w-28 sm:w-32 px-3 py-1.5 cursor-pointer font-medium hover:border-[#0F52BA] transition-colors"
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
        </div>
"""
    content = re.sub(ui_target, region_select + r"\g<1>", content)

with open(filepath, 'w') as f:
    f.write(content)
print("Updated PatentSimilarSearchHub.tsx")
