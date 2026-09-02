with open('src/components/AiEnterpriseAgent.tsx', 'r') as f:
    content = f.read()

old_tab = """            <button
              className="py-4 px-4 text-sm font-bold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors border-[#003d80] text-[#003d80] bg-white"
            >
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>AI 推荐靶向企业列表</span>
            </button>
          </div>"""

new_tab = """            <button
              className="py-4 px-4 text-sm font-bold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors border-[#003d80] text-[#003d80] bg-white"
            >
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>AI 推荐靶向企业列表</span>
            </button>
            <div className="flex-1 min-w-[20px]"></div>
            <button className="self-center flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm whitespace-nowrap">
              <Download className="w-4 h-4" /> 导出列表
            </button>
          </div>"""

content = content.replace(old_tab, new_tab)

# Ensure Download is imported
if "Download" not in content:
    content = content.replace("import { ", "import { Download, ")

with open('src/components/AiEnterpriseAgent.tsx', 'w') as f:
    f.write(content)
