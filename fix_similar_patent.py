import re
filepath = 'src/components/PatentSimilarSearchHub.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# ADD STATE VARIABLES
state_vars = """  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
"""
new_state_vars = state_vars + """  const [patentScaleFilter, setPatentScaleFilter] = useState<string>('all');
  const [capitalFilter, setCapitalFilter] = useState<string>('all');
"""
content = content.replace(state_vars, new_state_vars)

# UPDATE DEPENDENCY ARRAY FOR CURRENT PAGE
dep_arr = "}, [searchKeyword, regionFilter, currentPatentId]);"
new_dep_arr = "}, [searchKeyword, regionFilter, currentPatentId, enterpriseTypeFilter, patentScaleFilter, capitalFilter]);"
content = content.replace(dep_arr, new_dep_arr)

# UPDATE FILTER LOGIC
filter_logic = """  const matchedEnterprises = TARGET_ENTERPRISES_DATA.filter(ent => {
    if (enterpriseTypeFilter !== 'all' && ent.enterpriseType !== enterpriseTypeFilter) return false;
        if (regionFilter !== 'all' && regionFilter !== '其他' && !ent.province?.includes(regionFilter) && !ent.city?.includes(regionFilter)) return false;
    if (regionFilter === '其他' && ['北京', '上海', '广东', '江苏', '浙江', '山东', '福建', '四川', '湖北'].some(r => ent.province?.includes(r) || ent.city?.includes(r))) return false;
    if (searchKeyword.trim()) {"""

new_filter_logic = """  const matchedEnterprises = TARGET_ENTERPRISES_DATA.filter(ent => {
    if (enterpriseTypeFilter !== 'all' && ent.enterpriseType !== enterpriseTypeFilter) return false;
    if (regionFilter !== 'all' && regionFilter !== '其他' && !ent.province?.includes(regionFilter) && !ent.city?.includes(regionFilter)) return false;
    if (regionFilter === '其他' && ['北京', '上海', '广东', '江苏', '浙江', '山东', '福建', '四川', '湖北'].some(r => ent.province?.includes(r) || ent.city?.includes(r))) return false;
    
    if (patentScaleFilter !== 'all') {
      const count = ent.patentTotalCount || 0;
      if (patentScaleFilter === '1000+' && count < 1000) return false;
      if (patentScaleFilter === '100-1000' && (count < 100 || count >= 1000)) return false;
      if (patentScaleFilter === '0-100' && count >= 100) return false;
    }
    
    if (capitalFilter !== 'all') {
      // 简单处理包含"万"的字符串，转成数字比较
      let capitalStr = (ent.registeredCapital || '').replace(/[^0-9.]/g, '');
      let capital = parseFloat(capitalStr) || 0;
      if (ent.registeredCapital && ent.registeredCapital.includes('亿')) {
        capital = capital * 10000; // 亿转万
      }
      if (capitalFilter === '10000+' && capital < 10000) return false;
      if (capitalFilter === '5000-10000' && (capital < 5000 || capital >= 10000)) return false;
      if (capitalFilter === '1000-5000' && (capital < 1000 || capital >= 5000)) return false;
    }

    if (searchKeyword.trim()) {"""
content = content.replace(filter_logic, new_filter_logic)

# UPDATE UI
old_ui = """      {/* Matching Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-1 items-center gap-2">
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
          <div className="relative flex-1 sm:w-64">
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="搜索企业名或专利关键词..."
            className="w-full bg-white border border-[#D8E2F0] rounded-xl px-3 py-1.5 pl-8 text-sm text-slate-900 focus:outline-hidden focus:border-[#0F52BA]"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
        </div>
        </div>
      </div>"""

new_ui = """      {/* Matching Results Header & Advanced Filters */}
      <div className="flex flex-col gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-1 items-center gap-2">
            <Building2 className="w-5 h-5 shrink-0 text-[#0F52BA]" />
            <h3 className="text-lg font-black text-slate-900">
              基于佰腾大数据，精准匹配到 <span className="text-[#0F52BA] font-mono text-2xl">{matchedEnterprises.length}</span> 家靶向企业
            </h3>
          </div>
          <div className="flex w-full sm:w-auto items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="搜索企业名或专利关键词..."
                className="w-full bg-white border border-[#D8E2F0] rounded-xl px-4 py-2 pl-9 text-sm text-slate-900 focus:outline-hidden focus:border-[#0F52BA] shadow-sm"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200">
          <span className="text-sm font-bold text-slate-600 flex items-center gap-1.5 mr-2">
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
          </select>
          <select
            value={enterpriseTypeFilter}
            onChange={(e) => setEnterpriseTypeFilter(e.target.value)}
            className="bg-white border border-[#D8E2F0] rounded-xl px-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:border-[#0F52BA] shadow-sm font-medium"
          >
            <option value="all">企业资质 (不限)</option>
            <option value="上市企业">上市企业</option>
            <option value="国家级专精特新“小巨人”">专精特新“小巨人”</option>
            <option value="高新技术企业">高新技术企业</option>
            <option value="制造业单项冠军">制造业单项冠军</option>
            <option value="行业龙头国企">行业龙头国企</option>
          </select>
          <select
            value={patentScaleFilter}
            onChange={(e) => setPatentScaleFilter(e.target.value)}
            className="bg-white border border-[#D8E2F0] rounded-xl px-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:border-[#0F52BA] shadow-sm font-medium"
          >
            <option value="all">专利保有量 (不限)</option>
            <option value="1000+">1000件以上 (研发巨头)</option>
            <option value="100-1000">100-1000件 (研发中坚)</option>
            <option value="0-100">100件以下</option>
          </select>
          <select
            value={capitalFilter}
            onChange={(e) => setCapitalFilter(e.target.value)}
            className="bg-white border border-[#D8E2F0] rounded-xl px-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:border-[#0F52BA] shadow-sm font-medium"
          >
            <option value="all">注册资本 (不限)</option>
            <option value="10000+">1亿元以上</option>
            <option value="5000-10000">5000万-1亿元</option>
            <option value="1000-5000">1000万-5000万元</option>
          </select>
        </div>
      </div>"""
content = content.replace(old_ui, new_ui)

with open(filepath, 'w') as f:
    f.write(content)

