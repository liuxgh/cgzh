import re

filepath = 'src/components/IndustryChain57Hub.tsx'
with open(filepath, 'r') as f:
    content = f.read()

if "const [regionFilter" not in content:
    content = content.replace("const [searchKeyword, setSearchKeyword] = useState<string>('');", 
                              "const [searchKeyword, setSearchKeyword] = useState<string>('');\n  const [regionFilter, setRegionFilter] = useState<string>('all');")

filter_target = "if (selectedNode !== 'all' && ent.chainPosition.node !== selectedNode) return false;"
if filter_target in content and "regionFilter !== 'all'" not in content:
    region_logic = """    if (selectedNode !== 'all' && ent.chainPosition.node !== selectedNode) return false;
    if (regionFilter !== 'all' && regionFilter !== '其他' && !ent.province?.includes(regionFilter) && !ent.city?.includes(regionFilter)) return false;
    if (regionFilter === '其他' && ['北京', '上海', '广东', '江苏', '浙江', '山东', '福建', '四川', '湖北'].some(r => ent.province?.includes(r) || ent.city?.includes(r))) return false;"""
    content = content.replace(filter_target, region_logic)

# For UI, let's insert it near the "该产业链重点靶向企业技术画像" header
ui_target = r'(<h4 className="text-lg font-black text-slate-900 flex items-center gap-2">[\s\S]*?</h4>)'
if re.search(ui_target, content) and "onChange={(e) => setRegionFilter" not in content:
    region_select = """
              <div className="flex items-center gap-2 mt-2 md:mt-0">
                <span className="text-sm font-bold text-slate-700 whitespace-nowrap">筛选区域:</span>
                <select
                  value={regionFilter}
                  onChange={(e) => setRegionFilter(e.target.value)}
                  className="bg-white border border-slate-200 text-slate-700 text-sm rounded-xl focus:ring-indigo-500 focus:border-indigo-500 block w-28 sm:w-32 px-3 py-1.5 cursor-pointer font-medium hover:border-indigo-400 transition-colors shadow-sm"
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
                </select>
              </div>"""
    
    # Needs to go inside the flex header container
    # <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
    content = re.sub(r'(<div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">[\s\S]*?</div>)', 
                     lambda m: m.group(1).replace('</div>', region_select + '\n            </div>', 1), content)
    
with open(filepath, 'w') as f:
    f.write(content)
print("Updated IndustryChain57Hub.tsx")
