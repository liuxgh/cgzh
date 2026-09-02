import re
with open('src/components/PatentSimilarSearchHub.tsx', 'r') as f:
    content = f.read()

# ADD IMPORT
content = content.replace("import { TargetEnterprise, PatentItem } from '../types';", "import { TargetEnterprise, PatentItem } from '../types';\nimport { RegionFilter } from './RegionFilter';")

# UPDATE STATE VARIABLES
state_vars = """  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [enterpriseTypeFilter, setEnterpriseTypeFilter] = useState<string>('all');
  const [patentScaleFilter, setPatentScaleFilter] = useState<string>('all');
  const [capitalFilter, setCapitalFilter] = useState<string>('all');"""

new_state_vars = """  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const [regionFilter, setRegionFilter] = useState<{p: string, c: string, d: string}>({p: 'all', c: 'all', d: 'all'});
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [enterpriseTypeFilter, setEnterpriseTypeFilter] = useState<string>('all');
  const [patentScaleFilter, setPatentScaleFilter] = useState<string>('all');
  const [capitalFilter, setCapitalFilter] = useState<string>('all');"""
content = content.replace(state_vars, new_state_vars)

# UPDATE DEPENDENCY
content = content.replace("}, [searchKeyword, regionFilter, currentPatentId, enterpriseTypeFilter, patentScaleFilter, capitalFilter]);", "}, [searchKeyword, regionFilter.p, regionFilter.c, regionFilter.d, currentPatentId, enterpriseTypeFilter, patentScaleFilter, capitalFilter]);")

# UPDATE FILTER LOGIC
filter_logic = """  const matchedEnterprises = TARGET_ENTERPRISES_DATA.filter(ent => {
    if (enterpriseTypeFilter !== 'all' && ent.enterpriseType !== enterpriseTypeFilter) return false;
    if (regionFilter !== 'all' && regionFilter !== '其他' && !ent.province?.includes(regionFilter) && !ent.city?.includes(regionFilter)) return false;
    if (regionFilter === '其他' && ['北京', '上海', '广东', '江苏', '浙江', '山东', '福建', '四川', '湖北'].some(r => ent.province?.includes(r) || ent.city?.includes(r))) return false;"""

new_filter_logic = """  const matchedEnterprises = TARGET_ENTERPRISES_DATA.filter(ent => {
    if (enterpriseTypeFilter !== 'all' && ent.enterpriseType !== enterpriseTypeFilter) return false;
    
    // Region Logic
    if (regionFilter.p !== 'all' && !ent.province?.includes(regionFilter.p) && !ent.city?.includes(regionFilter.p)) return false;
    if (regionFilter.c !== 'all' && !ent.city?.includes(regionFilter.c)) return false;
    if (regionFilter.d !== 'all' && !ent.address?.includes(regionFilter.d) && !ent.location?.includes(regionFilter.d)) return false;
"""
content = content.replace(filter_logic, new_filter_logic)

# UPDATE UI
old_ui_region = """<span className="text-sm font-bold text-slate-600 flex items-center gap-1.5 mr-2">
            <Filter className="w-4 h-4 text-[#0F52BA]" /> 佰腾图谱深度过滤:
          </span>
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="bg-white border border-[#D8E2F0] rounded-xl px-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:border-[#0F52BA] shadow-sm font-medium"
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
          </select>"""

new_ui_region = """<span className="text-sm font-bold text-slate-600 flex items-center gap-1.5 mr-2">
            <Filter className="w-4 h-4 text-[#0F52BA]" /> 过滤:
          </span>
          <RegionFilter onFilterChange={(p, c, d) => setRegionFilter({p, c, d})} />"""

content = content.replace(old_ui_region, new_ui_region)

# REPLACE FAKE IMAGES WITH BETTER ONES
img1 = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80"
new_img1 = "https://images.unsplash.com/photo-1536697246787-1f27d35490bc?w=500&q=80"

img2 = "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80"
new_img2 = "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?w=500&q=80"

img3 = "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800&q=80"
new_img3 = "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=500&q=80"

content = content.replace(img1, new_img1)
content = content.replace(img2, new_img2)
content = content.replace(img3, new_img3)

with open('src/components/PatentSimilarSearchHub.tsx', 'w') as f:
    f.write(content)
