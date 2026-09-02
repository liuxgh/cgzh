import os

code = """import React from 'react';
import { Network, Layers, Activity, Compass } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  onNavigateToFullMap?: () => void;
}

const scatterData = [
  { year: '2017', domain: 'G01N', value: 379 }, { year: '2018', domain: 'G01N', value: 432 }, { year: '2019', domain: 'G01N', value: 504 }, { year: '2020', domain: 'G01N', value: 535 }, { year: '2021', domain: 'G01N', value: 485 }, { year: '2022', domain: 'G01N', value: 295 },
  { year: '2017', domain: 'G06F', value: 215 }, { year: '2018', domain: 'G06F', value: 312 }, { year: '2019', domain: 'G06F', value: 440 }, { year: '2020', domain: 'G06F', value: 512 }, { year: '2021', domain: 'G06F', value: 531 }, { year: '2022', domain: 'G06F', value: 326 },
  { year: '2017', domain: 'A61B', value: 251 }, { year: '2018', domain: 'A61B', value: 297 }, { year: '2019', domain: 'A61B', value: 350 }, { year: '2020', domain: 'A61B', value: 406 }, { year: '2021', domain: 'A61B', value: 457 }, { year: '2022', domain: 'A61B', value: 236 },
  { year: '2017', domain: 'A61M', value: 89 },  { year: '2018', domain: 'A61M', value: 111 }, { year: '2019', domain: 'A61M', value: 153 }, { year: '2020', domain: 'A61M', value: 202 }, { year: '2021', domain: 'A61M', value: 198 }, { year: '2022', domain: 'A61M', value: 115 },
  { year: '2017', domain: 'A61G', value: 76 },  { year: '2018', domain: 'A61G', value: 92 },  { year: '2019', domain: 'A61G', value: 120 }, { year: '2020', domain: 'A61G', value: 115 }, { year: '2021', domain: 'A61G', value: 105 }, { year: '2022', domain: 'A61G', value: 71 },
  { year: '2017', domain: 'A61K', value: 167 }, { year: '2018', domain: 'A61K', value: 191 }, { year: '2019', domain: 'A61K', value: 220 }, { year: '2020', domain: 'A61K', value: 174 }, { year: '2021', domain: 'A61K', value: 147 }, { year: '2022', domain: 'A61K', value: 98 },
  { year: '2017', domain: 'G01V', value: 156 }, { year: '2018', domain: 'G01V', value: 162 }, { year: '2019', domain: 'G01V', value: 152 }, { year: '2020', domain: 'G01V', value: 127 }, { year: '2021', domain: 'G01V', value: 154 }, { year: '2022', domain: 'G01V', value: 104 },
  { year: '2017', domain: 'A61F', value: 90 },  { year: '2018', domain: 'A61F', value: 104 }, { year: '2019', domain: 'A61F', value: 128 }, { year: '2020', domain: 'A61F', value: 118 }, { year: '2021', domain: 'A61F', value: 119 }, { year: '2022', domain: 'A61F', value: 71 },
  { year: '2017', domain: 'B60W', value: 65 },  { year: '2018', domain: 'B60W', value: 89 },  { year: '2019', domain: 'B60W', value: 112 }, { year: '2020', domain: 'B60W', value: 145 }, { year: '2021', domain: 'B60W', value: 141 }, { year: '2022', domain: 'B60W', value: 117 },
  { year: '2017', domain: 'G01M', value: 151 }, { year: '2018', domain: 'G01M', value: 114 }, { year: '2019', domain: 'G01M', value: 131 }, { year: '2020', domain: 'G01M', value: 114 }, { year: '2021', domain: 'G01M', value: 71 },  { year: '2022', domain: 'G01M', value: 38 }
];

const Y_DOMAINS = ['G01N', 'G06F', 'A61B', 'A61M', 'A61G', 'A61K', 'G01V', 'A61F', 'B60W', 'G01M'];
const X_YEARS = ['2017', '2018', '2019', '2020', '2021', '2022'];
const IPC_DESCRIPTIONS: Record<string, string> = {
  'G01N': '测试或分析材料',
  'G06F': '电数字数据处理',
  'A61B': '诊断外科与鉴定',
  'A61M': '介质输入输到体内',
  'A61G': '残疾人的运输床椅',
  'A61K': '医用牙科配制品',
  'G01V': '地球物理重力测量',
  'A61F': '假体及血管内滤器',
  'B60W': '车辆控制系统',
  'G01M': '部件静或动平衡'
};

const getScatterValue = (year: string, domain: string) => {
  const found = scatterData.find(d => d.year === year && d.domain === domain);
  return found ? found.value : 0;
};

const getDomainStyles = (domain: string) => {
  switch(domain) {
    case 'G01N': return { bg: 'rgba(99, 102, 241, 0.15)', border: 'rgba(99, 102, 241, 0.8)', text: '#4338ca' };
    case 'G06F': return { bg: 'rgba(217, 70, 239, 0.15)', border: 'rgba(217, 70, 239, 0.8)', text: '#a21caf' };
    case 'A61B': return { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.8)', text: '#15803d' };
    case 'A61M': return { bg: 'rgba(74, 222, 128, 0.15)', border: 'rgba(74, 222, 128, 0.8)', text: '#166534' };
    case 'A61G': return { bg: 'rgba(234, 179, 8, 0.15)', border: 'rgba(234, 179, 8, 0.8)', text: '#a16207' };
    case 'A61K': return { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.8)', text: '#1d4ed8' };
    case 'G01V': return { bg: 'rgba(20, 184, 166, 0.15)', border: 'rgba(20, 184, 166, 0.8)', text: '#0f766e' };
    case 'A61F': return { bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.8)', text: '#047857' };
    case 'B60W': return { bg: 'rgba(249, 115, 22, 0.15)', border: 'rgba(249, 115, 22, 0.8)', text: '#c2410c' };
    case 'G01M': return { bg: 'rgba(239, 68, 68, 0.15)', border: 'rgba(239, 68, 68, 0.8)', text: '#b91c1c' };
    default: return { bg: 'rgba(148, 163, 184, 0.15)', border: 'rgba(148, 163, 184, 0.8)', text: '#475569' };
  }
};

const topDomains = [
  { id: 'G01N', count: 4894, name: '测试或分析材料', desc: '利用光学、化学等手段检测物质成分及物化性质，服务于材料科学与医学诊断。' },
  { id: 'G06F', count: 3267, name: '电数字数据处理', desc: '涉及计算机体系结构、信息检索及AI算法，赋能智能制造与大数据分析。' },
  { id: 'A61B', count: 2894, name: '诊断外科与鉴定', desc: '涵盖医疗器械及智能诊断设备研发，体现吉大在医工交叉领域的深厚积累。' },
  { id: 'A61M', count: 1542, name: '介质输入输到体内', desc: '新型给药系统及介入治疗装置，聚焦高附加值医疗器械创新。' }
];

export const JluTechAdvantageShowcase: React.FC<Props> = ({ onNavigateToFullMap }) => {
  return (
    <div className="space-y-6 mt-8">
      {/* 1. 知识产权概览 */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 flex items-center gap-2 mb-6">
          <Layers className="w-5 h-5 text-blue-600" />
          知识产权概览 <span className="text-sm font-normal text-slate-500 tracking-wide ml-2">（仅统计中国专利）</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 relative overflow-hidden">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <div className="text-xs font-bold text-slate-500 mb-1 tracking-wide">全部专利</div>
                  <div className="text-3xl font-mono font-black text-blue-600">
                    49591 <span className="text-xs font-sans text-slate-500 font-normal">件</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 mb-1 tracking-wide">当前有效</div>
                  <div className="text-3xl font-mono font-black text-emerald-600">
                    14879 <span className="text-xs font-sans text-slate-500 font-normal">件</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 mb-1 tracking-wide">已失效</div>
                  <div className="text-3xl font-mono font-black text-rose-500">
                    27324 <span className="text-xs font-sans text-slate-500 font-normal">件</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 text-[11px] font-bold">
                <span className="px-2 py-1 rounded bg-slate-200 text-slate-600">发明专利占比 78%</span>
                <span className="px-2 py-1 rounded bg-slate-200 text-slate-600">高价值专利转化率 12%</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <div className="text-xs font-bold text-slate-500 mb-1 tracking-wide">被引用总数</div>
                <div className="text-2xl font-mono font-black text-indigo-600">218,493 <span className="text-xs font-sans text-slate-500 font-normal">次</span></div>
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-slate-500 mb-1 tracking-wide">核心发明人</div>
                <div className="text-2xl font-mono font-black text-blue-600">3,450 <span className="text-xs font-sans text-slate-500 font-normal">位</span></div>
              </div>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 w-[78%]"></div>
            </div>
            <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-500">
              <span>基础研究主导型 (78%)</span>
              <span>产业应用型 (22%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 核心技术领域 */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 flex items-center gap-2 mb-6">
          <Compass className="w-5 h-5 text-indigo-600" />
          核心技术领域 (Top IPC)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topDomains.map(domain => (
            <div key={domain.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:border-indigo-200 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-black text-slate-800">{domain.id}</span>
                <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{domain.count}件</span>
              </div>
              <h4 className="font-bold text-slate-700 text-sm mb-1">{domain.name}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{domain.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. 核心科技成果演进趋势 */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
           <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
             <Activity className="w-5 h-5 text-emerald-600" />
             核心科技成果演进趋势
           </h3>
           {onNavigateToFullMap && (
             <button
                onClick={onNavigateToFullMap}
               className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors"
             >
               查看完整技术图谱 &rarr;
             </button>
           )}
        </div>
        <p className="text-xs text-slate-500 mb-6">图表展示的是分析对象在不同技术方向专利量的分布情况和发展情况。分析各阶段的技术分布有助于了解特定时期的重要技术分布，挖掘近期热门技术动向，便于对接产学研合作点。</p>

        <div className="w-full flex-1 relative z-10 flex flex-col min-h-[360px]">
          <div className="flex-1 flex relative">
            <div className="w-20 sm:w-28 flex flex-col justify-around py-2 border-r border-slate-200 shrink-0 z-10">
              {Y_DOMAINS.map(domain => (
                <div key={domain} className="text-right pr-2 sm:pr-3 flex flex-col justify-center">
                  <span className="text-[10px] sm:text-xs text-slate-800 font-mono font-bold">{domain}</span>
                  <span className="text-[9px] text-slate-500 font-medium truncate" title={IPC_DESCRIPTIONS[domain]}>
                    {IPC_DESCRIPTIONS[domain].substring(0, 7)}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="flex-1 flex justify-between px-2 sm:px-4 relative">
               <div className="absolute inset-0 flex flex-col justify-around py-2 pointer-events-none">
                 {Y_DOMAINS.map((_, i) => (
                   <div key={i} className="w-full border-b border-slate-100 border-dashed h-0"></div>
                 ))}
               </div>
               
               {X_YEARS.map(year => (
                 <div key={year} className="flex-1 flex flex-col justify-around items-center py-2 relative group/col">
                   <div className="absolute inset-y-0 w-full max-w-[40px] bg-slate-50/0 group-hover/col:bg-slate-100/50 rounded-lg transition-colors z-0"></div>
                   
                   {Y_DOMAINS.map(domain => {
                     const val = getScatterValue(year, domain);
                     const size = val > 0 ? Math.max(16, Math.min(65, Math.sqrt(val) * 3.5)) : 0;
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
                                  {year}年 {domain} - {IPC_DESCRIPTIONS[domain]}
                               </div>
                               <div className="flex items-baseline gap-1 bg-slate-50 px-2 py-0.5 rounded text-[10px] border border-slate-100">
                                 新增成果 <span className="font-mono text-blue-600 text-sm font-black mx-0.5">{val}</span> 项
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
          
          <div className="flex ml-20 sm:ml-28 px-2 sm:px-4 shrink-0 mt-3">
             {X_YEARS.map(year => (
               <div key={year} className="flex-1 text-center text-[10px] sm:text-xs text-slate-500 font-mono font-bold">
                 {year}
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};
"""

with open("src/components/JluTechAdvantageShowcase.tsx", "w") as f:
    f.write(code)
print("Updated JluTechAdvantageShowcase.tsx")
