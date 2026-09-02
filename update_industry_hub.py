import re
with open('src/components/IndustryChain57Hub.tsx', 'r') as f:
    content = f.read()

# ADD IMPORT
content = content.replace("import { TARGET_ENTERPRISES_DATA } from '../data/targetEnterprisesData';", "import { TARGET_ENTERPRISES_DATA } from '../data/targetEnterprisesData';\nimport { RegionFilter } from './RegionFilter';")

# UPDATE STATE VARIABLES
content = content.replace("const [regionFilter, setRegionFilter] = useState<string>('all');", "const [regionFilter, setRegionFilter] = useState<{p: string, c: string, d: string}>({p: 'all', c: 'all', d: 'all'});")

# UPDATE TEXT: "该产业链重点靶向企业技术画像" -> "该产业链重点靶向企业"
content = content.replace("该产业链重点靶向企业技术画像", "该产业链重点靶向企业")

# UPDATE FILTER LOGIC
filter_logic = """  // Target enterprises matched to this chain
  const chainEnterprises = TARGET_ENTERPRISES_DATA.filter(ent => {
    if (!ent.chainPosition) return false;
    
    if (selectedNode !== 'all' && ent.chainPosition.node !== selectedNode) return false;
    if (regionFilter !== 'all' && regionFilter !== '其他' && !ent.province?.includes(regionFilter) && !ent.city?.includes(regionFilter)) return false;
    if (regionFilter === '其他' && ['北京', '上海', '广东', '江苏', '浙江', '山东', '福建', '四川', '湖北'].some(r => ent.province?.includes(r) || ent.city?.includes(r))) return false;
    return true;
  });"""

new_filter_logic = """  // Target enterprises matched to this chain
  const chainEnterprises = TARGET_ENTERPRISES_DATA.filter(ent => {
    if (!ent.chainPosition) return false;
    if (selectedNode !== 'all' && ent.chainPosition.node !== selectedNode) return false;
    
    // Region Logic
    if (regionFilter.p !== 'all' && !ent.province?.includes(regionFilter.p) && !ent.city?.includes(regionFilter.p)) return false;
    if (regionFilter.c !== 'all' && !ent.city?.includes(regionFilter.c)) return false;
    if (regionFilter.d !== 'all' && !ent.address?.includes(regionFilter.d) && !ent.location?.includes(regionFilter.d)) return false;
    return true;
  });"""
content = content.replace(filter_logic, new_filter_logic)

# UPDATE UI
old_ui_region = """          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-500">过滤:</span>
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:border-indigo-400 font-medium min-w-[120px]"
            >
              <option value="all">全国区域</option>
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

# Wait, the UI structure in IndustryChain57Hub might be different. Let's grep for regionFilter in UI.
