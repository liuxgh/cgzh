with open('src/components/OverviewDashboard.tsx', 'r') as f:
    content = f.read()

old_header = """          <button
            onClick={() => setActiveTab('patent-similar')}
            className="text-sm font-bold text-[#0F52BA] hover:underline flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <span>查看全部匹配企业</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>"""

new_header = """          <div className="flex items-center gap-4 shrink-0">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
              <Download className="w-4 h-4" /> 导出列表
            </button>
            <button
              onClick={() => setActiveTab('patent-similar')}
              className="text-sm font-bold text-[#0F52BA] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>查看全部匹配企业</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>"""

content = content.replace(old_header, new_header)

# Ensure Download is imported
if "Download" not in content:
    content = content.replace("import { ", "import { Download, ")

with open('src/components/OverviewDashboard.tsx', 'w') as f:
    f.write(content)

