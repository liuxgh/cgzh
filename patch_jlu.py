import re

filepath = 'src/components/JluTechAdvantageShowcase.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Define the new section
new_overview = """
      {/* 1. 知识产权概览 */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 flex items-center gap-2 mb-6">
          <Layers className="w-5 h-5 text-blue-600" />
          知识产权概览 <span className="text-sm font-normal text-slate-500 tracking-wide ml-2">（仅统计中国专利）</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 border border-slate-100 rounded-2xl overflow-hidden">
          {/* Card 1 */}
          <div className="bg-[#FAFBFC] p-6 relative">
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div>
                <div className="text-[13px] font-bold text-slate-600 mb-1">全部专利</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#0052D9] tracking-tight">49591</span>
                  <span className="text-sm font-medium text-slate-500">件</span>
                </div>
              </div>
              <div>
                <div className="text-[13px] font-bold text-slate-600 mb-1">当前有效</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#00A870] tracking-tight">14879</span>
                  <span className="text-sm font-medium text-slate-500">件</span>
                </div>
              </div>
              <div>
                <div className="text-[13px] font-bold text-slate-600 mb-1">已失效</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#E34D59] tracking-tight">27324</span>
                  <span className="text-sm font-medium text-slate-500">件</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-6 mb-8 border-t border-slate-200 pt-6">
              <div className="border-l-4 border-[#0052D9] pl-3">
                <div className="text-[12px] text-slate-500 mb-1">发明总计/当前有效</div>
                <div className="font-bold text-slate-800 text-lg flex items-baseline gap-1">
                  36789 <span className="text-[11px] font-normal text-slate-400">/</span> 12222 <span className="text-[10px] font-normal text-slate-400">件</span>
                </div>
              </div>
              <div className="border-l-4 border-[#00B4B4] pl-3">
                <div className="text-[12px] text-slate-500 mb-1">新型总计/当前有效</div>
                <div className="font-bold text-slate-800 text-lg flex items-baseline gap-1">
                  12567 <span className="text-[11px] font-normal text-slate-400">/</span> 2567 <span className="text-[10px] font-normal text-slate-400">件</span>
                </div>
              </div>
              <div className="border-l-4 border-[#00A870] pl-3">
                <div className="text-[12px] text-slate-500 mb-1">外观总计/当前有效</div>
                <div className="font-bold text-slate-800 text-lg flex items-baseline gap-1">
                  235 <span className="text-[10px] font-normal text-slate-400">件 /</span> 90 <span className="text-[10px] font-normal text-slate-400">件</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-10">
              <div className="border-l-4 border-[#E34D59] pl-3">
                <div className="text-[12px] text-slate-500 mb-1 flex items-center gap-1">自主研发专利 <HelpCircle className="w-3 h-3 text-slate-300" /></div>
                <div className="font-bold text-slate-800 text-lg flex items-baseline gap-1">
                  14825 <span className="text-[10px] font-normal text-slate-400">件</span>
                </div>
              </div>
              <div className="border-l-4 border-[#8B3A87] pl-3">
                <div className="text-[12px] text-slate-500 mb-1 flex items-center gap-1">引进技术专利 <HelpCircle className="w-3 h-3 text-slate-300" /></div>
                <div className="font-bold text-slate-800 text-lg flex items-baseline gap-1">
                  54 <span className="text-[10px] font-normal text-slate-400">件</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#FAFBFC] p-6 relative">
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <div className="text-[13px] font-bold text-slate-600 mb-1">2026年度新专利申请</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#0052D9] tracking-tight">1925</span>
                  <span className="text-sm font-medium text-slate-500">件</span>
                </div>
              </div>
              <div>
                <div className="text-[13px] font-bold text-slate-600 mb-1">2026年度专利授权</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#0052D9] tracking-tight">2059</span>
                  <span className="text-sm font-medium text-slate-500">件</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-6 mb-8 border-t border-slate-200 pt-6">
              <div className="border-l-4 border-[#0052D9] pl-3">
                <div className="text-[12px] text-slate-500 mb-1">发明申请/授权</div>
                <div className="font-bold text-slate-800 text-lg flex items-baseline gap-1">
                  1918 <span className="text-[11px] font-normal text-slate-400">/</span> 1883 <span className="text-[10px] font-normal text-slate-400">件</span>
                </div>
              </div>
              <div className="border-l-4 border-[#00B4B4] pl-3">
                <div className="text-[12px] text-slate-500 mb-1">实用新型申请/授权</div>
                <div className="font-bold text-slate-800 text-lg flex items-baseline gap-1">
                  1 <span className="text-[10px] font-normal text-slate-400">件 /</span> 149 <span className="text-[10px] font-normal text-slate-400">件</span>
                </div>
              </div>
              <div className="border-l-4 border-[#00A870] pl-3">
                <div className="text-[12px] text-slate-500 mb-1">外观设计申请/授权</div>
                <div className="font-bold text-slate-800 text-lg flex items-baseline gap-1">
                  6 <span className="text-[10px] font-normal text-slate-400">件 /</span> 27 <span className="text-[10px] font-normal text-slate-400">件</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-10">
              <div className="border-l-4 border-[#E34D59] pl-3">
                <div className="text-[12px] text-slate-500 mb-1 flex items-center gap-1">自主研发专利 <HelpCircle className="w-3 h-3 text-slate-300" /></div>
                <div className="font-bold text-slate-800 text-lg flex items-baseline gap-1">
                  2056 <span className="text-[10px] font-normal text-slate-400">件</span>
                </div>
              </div>
              <div className="border-l-4 border-[#8B3A87] pl-3">
                <div className="text-[12px] text-slate-500 mb-1 flex items-center gap-1">引进技术专利 <HelpCircle className="w-3 h-3 text-slate-300" /></div>
                <div className="font-bold text-slate-800 text-lg flex items-baseline gap-1">
                  3 <span className="text-[10px] font-normal text-slate-400">件</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
"""

# Find and replace Section 1
section1_pattern = r'\{\/\* 1\. 知识产权概览 \*\/\}.*?(?=\{\/\* 2\. 核心技术领域 \*\/\})'
if re.search(section1_pattern, content, re.DOTALL):
    content = re.sub(section1_pattern, new_overview + '\n\n      ', content, flags=re.DOTALL)
else:
    print("Could not find Section 1")

# We also need to make sure we import HelpCircle if it's not already imported
if 'HelpCircle' not in content:
    content = content.replace('import {', 'import { HelpCircle,', 1)

with open(filepath, 'w') as f:
    f.write(content)
print("Updated JluTechAdvantageShowcase.tsx")
