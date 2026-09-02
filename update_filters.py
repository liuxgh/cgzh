import re
import os

files_to_update = [
    'src/components/PatentSimilarSearchHub.tsx',
    'src/components/IndustryChain57Hub.tsx',
    'src/components/PatentProductSearchHub.tsx'
]

regions = ['全部区域', '北京', '上海', '广东', '江苏', '浙江', '山东', '福建', '四川', '湖北', '其他']

def inject_region_filter(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # 1. Add region filter state
    if "const [regionFilter" not in content:
        state_hook = r"const \[enterpriseTypeFilter, setEnterpriseTypeFilter\] = useState<string>\('all'\);"
        if re.search(state_hook, content):
            content = re.sub(state_hook, r"\g<0>\n  const [regionFilter, setRegionFilter] = useState<string>('all');", content)
        else:
            print(f"Could not find state hook in {filepath}")
            return
            
    # 2. Update filtering logic
    if "regionFilter !== 'all'" not in content:
        filter_logic_match = r"if \(enterpriseTypeFilter !== 'all' && ent.enterpriseType !== enterpriseTypeFilter\) return false;"
        if re.search(filter_logic_match, content):
            content = re.sub(filter_logic_match, r"\g<0>\n    if (regionFilter !== 'all' && regionFilter !== '其他' && !ent.province?.includes(regionFilter) && !ent.city?.includes(regionFilter)) return false;\n    if (regionFilter === '其他' && ['北京', '上海', '广东', '江苏', '浙江', '山东', '福建', '四川', '湖北'].some(r => ent.province?.includes(r) || ent.city?.includes(r))) return false;", content)
        else:
            print(f"Could not find filter logic in {filepath}")
            return

    # 3. Add region filter UI
    # Find the enterprise type filter select and add a region select next to it
    if "onChange={(e) => setRegionFilter(e.target.value)}" not in content:
        ui_match = r"(<select[\s\S]*?value=\{enterpriseTypeFilter\}[\s\S]*?</select>)"
        if re.search(ui_match, content):
            region_select = """
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-700 whitespace-nowrap">所在区域:</span>
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2 cursor-pointer font-medium hover:border-blue-400 transition-colors"
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
            
            # Make sure we don't break the layout. In IndustryChain57Hub, it might be in a flex row.
            # Usually they are inside a div wrapping the select.
            content = re.sub(ui_match, r"\g<1>\n" + region_select, content)
        else:
            print(f"Could not find UI element in {filepath}")
            return

    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Updated {filepath}")

for filepath in files_to_update:
    inject_region_filter(filepath)

