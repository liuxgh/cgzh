import re

filepath = 'src/components/EnterpriseProfilePage.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# First, define the new helper functions and constants somewhere around the top of the file, maybe before `export const EnterpriseProfilePage`.
helper_functions = """
const getDomainStyles = (domain: string) => {
  switch(domain) {
    case 'H02K': return { bg: 'rgba(99, 102, 241, 0.15)', border: 'rgba(99, 102, 241, 0.8)', text: '#4338ca' };
    case 'B63H': return { bg: 'rgba(217, 70, 239, 0.15)', border: 'rgba(217, 70, 239, 0.8)', text: '#a21caf' };
    case 'B63B': return { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.8)', text: '#15803d' };
    case 'F04D': return { bg: 'rgba(74, 222, 128, 0.15)', border: 'rgba(74, 222, 128, 0.8)', text: '#166534' };
    case 'B60K': return { bg: 'rgba(234, 179, 8, 0.15)', border: 'rgba(234, 179, 8, 0.8)', text: '#a16207' };
    case 'B60L': return { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.8)', text: '#1d4ed8' };
    default: return { bg: 'rgba(148, 163, 184, 0.15)', border: 'rgba(148, 163, 184, 0.8)', text: '#475569' };
  }
};
"""

# Inject before EnterpriseProfilePage component
if "const getDomainStyles" not in content:
    content = content.replace("export const EnterpriseProfilePage", helper_functions + "\nexport const EnterpriseProfilePage")

# Generate the new section 4 JSX
# Needs `ipcCategories` for Y_DOMAINS, and `[2017, ..., 2026]` for X_YEARS.
# Actually `ipcCategories` is defined in the component: `const ipcCategories = Array.from(new Set(bubbleData.map(d => d.y)));`
new_section_4 = """
      {/* Section 4: Technology Application Trend */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
           <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
             <BarChart2 className="w-5 h-5 text-emerald-600" />
             技术申请趋势
           </h3>
        </div>
        <p className="text-xs text-slate-500 mb-6">
          图表展示的是分析对象<span className="font-bold text-slate-800">在不同技术方向专利量</span>的分布情况和发展情况。分析各阶段的<span className="font-bold text-slate-800">技术分布情况</span>，有助于了解特定时期的重要技术分布，挖掘近期的热门技术方向和发展动向，有助于对企业自身技术发展有一个整体认识，<span className="font-bold text-slate-800">并对研发重点和研发路线进行适应性调整</span>，对比各技术方向的发展趋势有助于识别哪些技术发展更早更成熟。
        </p>
        <div className="w-full flex-1 relative z-10 flex flex-col min-h-[460px]">
          <div className="flex-1 flex relative">
            <div className="w-20 sm:w-28 flex flex-col justify-around py-2 border-r border-slate-200 shrink-0 z-10">
              {ipcCategories.map(domain => {
                const item = bubbleData.find(d => d.y === domain);
                const desc = item?.name?.split(': ')[1] || '其他类别';
                return (
                  <div key={domain} className="text-right pr-2 sm:pr-3 flex flex-col justify-center">
                    <span className="text-[10px] sm:text-xs text-slate-800 font-mono font-bold">{domain}</span>
                    <span className="text-[9px] text-slate-500 font-medium truncate" title={desc}>
                      {desc.substring(0, 7)}
                    </span>
                  </div>
                );
              })}
            </div>
            
            <div className="flex-1 flex justify-between px-2 sm:px-4 relative">
               <div className="absolute inset-0 flex flex-col justify-around py-2 pointer-events-none">
                 {ipcCategories.map((_, i) => (
                   <div key={i} className="w-full border-b border-slate-100 border-dashed h-0"></div>
                 ))}
               </div>
               
               {[2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026].map(year => (
                 <div key={year} className="flex-1 flex flex-col justify-around items-center py-2 relative group/col">
                   <div className="absolute inset-y-0 w-full max-w-[40px] bg-slate-50/0 group-hover/col:bg-slate-100/50 rounded-lg transition-colors z-0"></div>
                   <div className="absolute -bottom-6 font-mono text-[10px] text-slate-500">{year}</div>
                   
                   {ipcCategories.map(domain => {
                     const found = bubbleData.find(d => d.x === year && d.y === domain);
                     const val = found ? found.z : 0;
                     const size = val > 0 ? Math.max(16, Math.min(65, Math.sqrt(val) * 7.5)) : 0;
                     const styles = getDomainStyles(domain);
                     
                     return (
                       <div key={`${year}-${domain}`} className="h-[32px] sm:h-10 w-full flex items-center justify-center relative z-10 group/bubble">
                         {val > 0 && (
                           <>
                             <div
                               style={{ 
                                 width: size,
                                 height: size,
                                 backgroundColor: styles.bg,
                                 borderColor: styles.border,
                                 color: styles.text
                               }}
                               className="rounded-full flex items-center justify-center font-mono text-[10px] sm:text-[11px] font-bold transition-all duration-300 hover:scale-[1.15] cursor-pointer peer relative z-20 border-[1.5px]"
                             >
                               {size > 20 ? val : ''}
                             </div>
                             
                             <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max bg-white border border-slate-200 text-slate-600 text-xs px-3 py-2 rounded-xl shadow-xl opacity-0 invisible group-hover/bubble:opacity-100 group-hover/bubble:visible transition-all duration-300 z-[100] pointer-events-none transform translate-y-2 group-hover/bubble:translate-y-0 flex flex-col gap-1.5 items-center">
                               <div className="font-bold text-slate-800 tracking-wider flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: styles.border }}></span>
                                  {year}年 {domain} - {found?.name?.split(': ')[1] || '其他类别'}
                               </div>
                               <div className="flex items-baseline gap-1 bg-slate-50 px-2 py-0.5 rounded text-[10px] border border-slate-100">
                                 申请量 <span className="font-mono text-blue-600 text-sm font-black mx-0.5">{val}</span> 件
                               </div>
                               <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-solid border-t-white border-t-8 border-x-transparent border-x-8 border-b-0 drop-shadow-sm"></div>
                             </div>
                           </>
                         )}
                       </div>
                     );
                   })}
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
"""

# Replace the old Section 4
section4_pattern = r'(\s*\{/\* Section 4: Technology Application Trend \*/\}[\s\S]*?)    </div>\n  \);\n\};'
if re.search(section4_pattern, content):
    content = re.sub(section4_pattern, new_section_4 + r'\n    </div>\n  );\n};', content)
else:
    print("Could not find section 4 pattern")

with open(filepath, 'w') as f:
    f.write(content)
print("Updated Section 4 in EnterpriseProfilePage.tsx")
