with open('src/components/IndustryChain57Hub.tsx', 'r') as f:
    content = f.read()

old_filters = """                <div className="w-px h-6 bg-slate-200 mx-2 hidden sm:block"></div>
                <span className="text-sm font-bold text-slate-500">过滤:</span>
                <RegionFilter onFilterChange={(p, c, d) => setRegionFilter({p, c, d})} />
              </div>"""

new_filters = """                <div className="w-px h-6 bg-slate-200 mx-2 hidden sm:block"></div>
                <span className="text-sm font-bold text-slate-500">过滤:</span>
                <RegionFilter onFilterChange={(p, c, d) => setRegionFilter({p, c, d})} />
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm ml-2">
                  <Download className="w-4 h-4" /> 导出
                </button>
              </div>"""

content = content.replace(old_filters, new_filters)

# Ensure Download is imported
if "Download" not in content:
    content = content.replace("import { ", "import { Download, ")

with open('src/components/IndustryChain57Hub.tsx', 'w') as f:
    f.write(content)
