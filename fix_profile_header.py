with open('src/components/EnterpriseProfilePage.tsx', 'r') as f:
    content = f.read()

old_header = """    <div className="space-y-6 pb-20 animate-in fade-in duration-300">
      <div className="flex items-center gap-3 cursor-pointer group" onClick={onBack}>
        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
          <ArrowLeft className="w-4 h-4 text-slate-600" />
        </div>
        <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">返回列表</span>
      </div>"""

new_header = """    <div className="space-y-6 pb-20 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 cursor-pointer group w-fit" onClick={onBack}>
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
            <ArrowLeft className="w-4 h-4 text-slate-600" />
          </div>
          <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">返回列表</span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {onOpenAiActionPlan && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onOpenAiActionPlan(enterprise);
              }}
              className="text-white bg-[#0F52BA] px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow-sm hover:bg-[#082C6C] hover:shadow-md transition-all text-sm"
            >
              <BrainCircuit className="w-4 h-4" />
              AI撰写对接方案
            </button>
          )}
          <button className="text-slate-700 bg-white border border-slate-200 px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow-sm hover:bg-slate-50 transition-all text-sm">
            <Download className="w-4 h-4" />
            PDF导出
          </button>
        </div>
      </div>"""

content = content.replace(old_header, new_header)

with open('src/components/EnterpriseProfilePage.tsx', 'w') as f:
    f.write(content)
