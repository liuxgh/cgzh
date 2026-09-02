import re

with open('src/components/IndustryChain57Hub.tsx', 'r') as f:
    content = f.read()

# 1. Replace state
content = content.replace(
    "  const [searchKeyword, setSearchKeyword] = useState<string>('');",
    "  const [enterpriseSearchKeyword, setEnterpriseSearchKeyword] = useState<string>('');"
)

# 2. Remove filteredChains search logic
old_filtered_chains = """  const filteredChains = INDUSTRY_CHAINS_57_DATA.filter(chain => {
    if (selectedCategory !== '全部产业链' && chain.category !== selectedCategory) return false;
    if (searchKeyword.trim()) {
      const q = searchKeyword.toLowerCase();
      const matchName = chain.name.toLowerCase().includes(q) || chain.summary.toLowerCase().includes(q);
      const matchCollege = chain.jluAdvantageCollege.toLowerCase().includes(q);
      const matchCompany = chain.featuredCompanies.some(c => c.toLowerCase().includes(q));
      if (!matchName && !matchCollege && !matchCompany) return false;
    }
    return true;
  });"""
new_filtered_chains = """  const filteredChains = INDUSTRY_CHAINS_57_DATA.filter(chain => {
    if (selectedCategory !== '全部产业链' && chain.category !== selectedCategory) return false;
    return true;
  });"""
content = content.replace(old_filtered_chains, new_filtered_chains)

# 3. Add filtering logic to chainEnterprises
old_chain_ent = """  const chainEnterprises = TARGET_ENTERPRISES_DATA.filter(ent => {
    if (!ent.chainPosition) return false;
    if (selectedNode !== 'all' && ent.chainPosition.node !== selectedNode) return false;
    
    if (regionFilter.p !== 'all' && !ent.province?.includes(regionFilter.p) && !ent.city?.includes(regionFilter.p)) return false;"""

new_chain_ent = """  const chainEnterprises = TARGET_ENTERPRISES_DATA.filter(ent => {
    if (!ent.chainPosition) return false;
    if (selectedNode !== 'all' && ent.chainPosition.node !== selectedNode) return false;
    
    if (enterpriseSearchKeyword.trim() && !ent.name.includes(enterpriseSearchKeyword.trim())) return false;

    if (regionFilter.p !== 'all' && !ent.province?.includes(regionFilter.p) && !ent.city?.includes(regionFilter.p)) return false;"""
content = content.replace(old_chain_ent, new_chain_ent)

# 4. Also add enterpriseSearchKeyword to dependency array of useEffect
content = content.replace(
    "  }, [regionFilter.p, regionFilter.c, regionFilter.d, selectedNode, selectedChainId]);",
    "  }, [regionFilter.p, regionFilter.c, regionFilter.d, selectedNode, selectedChainId, enterpriseSearchKeyword]);"
)

# 5. Remove search bar from the top
top_search_bar = """          <div className="relative w-full md:w-64 shrink-0">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="搜索产业链名称、学院或企业..."
              className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2 pl-8 text-sm text-slate-900 focus:outline-hidden focus:border-[#0F52BA] focus:bg-white"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
          </div>"""
content = content.replace(top_search_bar, "")

# 6. Add search bar to the bottom (next to filter)
bottom_filter_area = """              <div className="flex items-center gap-2 shrink-0">
                <span className="text-sm font-bold text-slate-500">过滤:</span>
                <RegionFilter onFilterChange={(p, c, d) => setRegionFilter({p, c, d})} />
              </div>"""

new_bottom_filter_area = """              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <div className="relative w-48 sm:w-64">
                  <input
                    type="text"
                    value={enterpriseSearchKeyword}
                    onChange={(e) => setEnterpriseSearchKeyword(e.target.value)}
                    placeholder="搜索企业名称..."
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 pl-8 text-sm text-slate-900 focus:outline-none focus:border-indigo-500 shadow-sm"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                </div>
                <div className="w-px h-6 bg-slate-200 mx-2 hidden sm:block"></div>
                <span className="text-sm font-bold text-slate-500">过滤:</span>
                <RegionFilter onFilterChange={(p, c, d) => setRegionFilter({p, c, d})} />
              </div>"""
content = content.replace(bottom_filter_area, new_bottom_filter_area)

with open('src/components/IndustryChain57Hub.tsx', 'w') as f:
    f.write(content)

