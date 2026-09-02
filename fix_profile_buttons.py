with open('src/components/EnterpriseProfilePage.tsx', 'r') as f:
    content = f.read()

old_top_header = """    <div className="space-y-6 pb-20 animate-in fade-in duration-300">
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

new_top_header = """    <div className="space-y-6 pb-20 animate-in fade-in duration-300">
      <div className="flex items-center gap-3 cursor-pointer group w-fit" onClick={onBack}>
        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
          <ArrowLeft className="w-4 h-4 text-slate-600" />
        </div>
        <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">返回列表</span>
      </div>"""

content = content.replace(old_top_header, new_top_header)

old_buttons = """          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {onOpenAiActionPlan && (
              <button 
                onClick={() => onOpenAiActionPlan(enterprise)}
                className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all"
              >
                <BrainCircuit className="w-5 h-5" />
                AI撰写对接方案
              </button>
            )}
          </div>"""

new_buttons = """          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {onOpenAiActionPlan && (
              <button 
                onClick={() => onOpenAiActionPlan(enterprise)}
                className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all"
              >
                <BrainCircuit className="w-5 h-5" />
                AI撰写对接方案
              </button>
            )}
            <button className="flex items-center gap-2 px-5 py-2.5 text-slate-700 bg-white border border-slate-200 rounded-xl font-bold shadow-sm hover:bg-slate-50 transition-all">
              <Download className="w-5 h-5" />
              PDF导出
            </button>
          </div>"""

content = content.replace(old_buttons, new_buttons)

with open('src/components/EnterpriseProfilePage.tsx', 'w') as f:
    f.write(content)

