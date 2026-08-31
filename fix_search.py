import sys

with open('src/components/TechSearchHub.tsx', 'r') as f:
    content = f.read()

# 1. Add Image to imports
content = content.replace(
    "import { Search, Building2, ChevronLeft, ArrowRight, User, Star, Beaker, FileText, ChevronDown, ChevronUp } from 'lucide-react';",
    "import { Search, Building2, ChevronLeft, ArrowRight, User, Star, Beaker, FileText, ChevronDown, ChevronUp, Image } from 'lucide-react';"
)

# 2. Add currentQuery state
content = content.replace(
    "const [expandedId, setExpandedId] = useState<string | null>(null);",
    "const [expandedId, setExpandedId] = useState<string | null>(null);\n  const [currentQuery, setCurrentQuery] = useState(query);"
)

# 3. Insert the search input area before the results list
search_area = """
      {/* Search Input Area */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Search className="w-5 h-5 text-[#0F52BA]" />
          <h3 className="font-bold text-slate-800 text-lg">AI 智能匹配分析</h3>
        </div>
        <div className="relative">
          <textarea 
            rows={4}
            value={currentQuery}
            onChange={(e) => setCurrentQuery(e.target.value)}
            placeholder="输入您的技术需求、应用场景或业务痛点，支持多行文本..."
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 pb-14 resize-none focus:outline-hidden focus:border-[#0F52BA] focus:ring-2 focus:ring-blue-100 transition-all text-sm leading-relaxed"
          />
          <div className="absolute right-3 bottom-3 flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-[#0F52BA] bg-white rounded-lg border border-slate-200 shadow-xs hover:border-[#0F52BA] transition-colors" title="上传需求文档">
              <FileText className="w-4 h-4" />
            </button>
            <button className="p-2 text-slate-400 hover:text-[#0F52BA] bg-white rounded-lg border border-slate-200 shadow-xs hover:border-[#0F52BA] transition-colors" title="上传产品/场景图片">
              <Image className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
            重新深度匹配
          </button>
        </div>
      </div>
"""

content = content.replace(
    '<div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">',
    search_area + '\n      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">'
)

# 4. Modify the result title to not show the query inline anymore since it's above
content = content.replace(
    "{isGlobalSearch ? '全网' : '本校'}匹配结果: <span className=\"text-[#0F52BA]\">\"{query}\"</span>",
    "{isGlobalSearch ? '全网' : '本校'}匹配结果"
)

with open('src/components/TechSearchHub.tsx', 'w') as f:
    f.write(content)

print("TechSearchHub updated")
