with open('src/components/PatentSimilarSearchHub.tsx', 'r') as f:
    content = f.read()

old_filter = """          <select
            value={capitalFilter}
            onChange={(e) => setCapitalFilter(e.target.value)}
            className="bg-white border border-[#D8E2F0] rounded-xl px-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:border-[#0F52BA] shadow-sm font-medium"
          >
            <option value="all">注册资本 (不限)</option>
            <option value="10000+">1亿元以上</option>
            <option value="5000-10000">5000万-1亿元</option>
            <option value="1000-5000">1000万-5000万元</option>
          </select>
        </div>"""

new_filter = """          <select
            value={capitalFilter}
            onChange={(e) => setCapitalFilter(e.target.value)}
            className="bg-white border border-[#D8E2F0] rounded-xl px-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:border-[#0F52BA] shadow-sm font-medium"
          >
            <option value="all">注册资本 (不限)</option>
            <option value="10000+">1亿元以上</option>
            <option value="5000-10000">5000万-1亿元</option>
            <option value="1000-5000">1000万-5000万元</option>
          </select>
          <div className="flex-1 min-w-[20px]"></div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm ml-auto">
            <Download className="w-4 h-4" /> 导出列表
          </button>
        </div>"""

content = content.replace(old_filter, new_filter)

# Ensure Download is imported
if "Download" not in content:
    content = content.replace("import { ", "import { Download, ")

with open('src/components/PatentSimilarSearchHub.tsx', 'w') as f:
    f.write(content)

