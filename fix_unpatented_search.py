import sys

with open('src/components/UnpatentedTechHub.tsx', 'r') as f:
    content = f.read()

import_replacement = "import { Plus, Search, Filter, Briefcase, FileText, CheckCircle, Clock, Trash2, Edit3, X, Building2, Sparkles } from 'lucide-react';"
content = content.replace("import { Plus, Search, Filter, Briefcase, FileText, CheckCircle, Clock, Trash2, Edit3, X, Building2 } from 'lucide-react';", import_replacement)

# Remove the old simple search bar
old_search_bar = """      {/* Search Bar */}
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
      </div>"""

new_search_bar = """      {/* Enhanced Search Bar */}
      <div className="relative group mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500 opacity-50 group-hover:opacity-100"></div>
        <div className="relative flex items-center bg-white border border-slate-200 group-hover:border-blue-300 rounded-2xl shadow-sm transition-all duration-300 overflow-hidden focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:border-blue-400">
          <div className="pl-5 pr-2 flex items-center justify-center">
            <Search className="w-6 h-6 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-300" />
          </div>
          <input 
            type="text" 
            placeholder="在海量未公开的隐形专有技术（Know-how）资产池中探索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-4 px-2 text-base bg-transparent border-none focus:outline-hidden text-slate-700 placeholder-slate-400"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="px-4 text-slate-300 hover:text-slate-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <div className="pr-2 pl-1 py-2">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-md hover:bg-slate-800 transition-colors duration-300 whitespace-nowrap">
              <Sparkles className="w-4 h-4 text-blue-300" />
              精准发现
            </button>
          </div>
        </div>
      </div>"""

content = content.replace(old_search_bar, new_search_bar)

with open('src/components/UnpatentedTechHub.tsx', 'w') as f:
    f.write(content)
