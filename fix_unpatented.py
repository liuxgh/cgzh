import sys

with open('src/components/UnpatentedTechHub.tsx', 'r') as f:
    content = f.read()

# 1. Add searchQuery state
content = content.replace(
    "const [formData, setFormData] = useState({ title: '', domain: '环境与生态', desc: '', contact: '' });",
    "const [formData, setFormData] = useState({ title: '', domain: '环境与生态', desc: '', contact: '' });\n  const [searchQuery, setSearchQuery] = useState('');"
)

# 2. Add Search Bar
search_bar = """
      {/* Search Bar */}
      <div className="flex gap-2 mb-2">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="在未入库技术池中检索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-hidden focus:border-[#0F52BA] focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
          />
        </div>
      </div>
"""
content = content.replace(
    "{showAddForm && (",
    search_bar + "\n      {showAddForm && ("
)

# 3. Filter techs
content = content.replace(
    "{techs.map(tech => (",
    "{techs.filter(tech => tech.title.includes(searchQuery) || tech.desc.includes(searchQuery) || tech.domain.includes(searchQuery)).map(tech => ("
)

# 4. Remove status badges
badge_code = """                {tech.status === 'seeking' ? (
                  <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded text-xs font-bold border border-emerald-100">
                    <CheckCircle className="w-3 h-3" /> 寻合作中
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-1 rounded text-xs font-bold border border-amber-100">
                    <Clock className="w-3 h-3" /> 洽谈中
                  </span>
                )}"""
content = content.replace(badge_code, "")

with open('src/components/UnpatentedTechHub.tsx', 'w') as f:
    f.write(content)

print("UnpatentedTechHub updated")
