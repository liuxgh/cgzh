import re
with open('src/components/IndustryChain57Hub.tsx', 'r') as f:
    content = f.read()

# ADD IMPORT
if "RegionFilter" not in content:
    content = content.replace("import { TARGET_ENTERPRISES_DATA } from '../data/targetEnterprisesData';", "import { TARGET_ENTERPRISES_DATA } from '../data/targetEnterprisesData';\nimport { RegionFilter } from './RegionFilter';")

# UPDATE STATE VARIABLES
content = content.replace("const [regionFilter, setRegionFilter] = useState<string>('all');", "const [regionFilter, setRegionFilter] = useState<{p: string, c: string, d: string}>({p: 'all', c: 'all', d: 'all'});")

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
    
    if (regionFilter.p !== 'all' && !ent.province?.includes(regionFilter.p) && !ent.city?.includes(regionFilter.p)) return false;
    if (regionFilter.c !== 'all' && !ent.city?.includes(regionFilter.c)) return false;
    if (regionFilter.d !== 'all' && !ent.address?.includes(regionFilter.d) && !ent.location?.includes(regionFilter.d)) return false;

    return true;
  });"""
content = content.replace(filter_logic, new_filter_logic)

# UPDATE UI
ui = """            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-600" />
                <span>该产业链重点靶向企业技术画像 ({chainEnterprises.length}家)</span>
                {selectedNode !== 'all' && (
                  <span className="text-sm font-normal text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                    已筛选：{selectedNode === 'upstream' ? '上游节点' : selectedNode === 'midstream' ? '中游节点' : '下游节点'}
                  </span>
                )}
              </h4>
            </div>"""

new_ui = """            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-600" />
                <span>该产业链重点靶向企业 ({chainEnterprises.length}家)</span>
                {selectedNode !== 'all' && (
                  <span className="text-sm font-normal text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                    已筛选：{selectedNode === 'upstream' ? '上游节点' : selectedNode === 'midstream' ? '中游节点' : '下游节点'}
                  </span>
                )}
              </h4>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-sm font-bold text-slate-500">过滤:</span>
                <RegionFilter onFilterChange={(p, c, d) => setRegionFilter({p, c, d})} />
              </div>
            </div>"""

content = content.replace(ui, new_ui)

with open('src/components/IndustryChain57Hub.tsx', 'w') as f:
    f.write(content)
