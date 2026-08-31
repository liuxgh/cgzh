import React from 'react';
import { Network } from 'lucide-react';

interface Props {
  onNavigateToFullMap?: () => void;
}

const scatterData = [
  { year: '2017', domain: 'G01N', value: 238 }, { year: '2018', domain: 'G01N', value: 314 }, { year: '2019', domain: 'G01N', value: 303 }, { year: '2020', domain: 'G01N', value: 194 }, { year: '2021', domain: 'G01N', value: 231 }, { year: '2022', domain: 'G01N', value: 221 }, { year: '2023', domain: 'G01N', value: 204 }, { year: '2024', domain: 'G01N', value: 223 }, { year: '2025', domain: 'G01N', value: 165 }, { year: '2026', domain: 'G01N', value: 80 },
  { year: '2017', domain: 'G06F', value: 79 }, { year: '2018', domain: 'G06F', value: 79 }, { year: '2019', domain: 'G06F', value: 106 }, { year: '2020', domain: 'G06F', value: 99 }, { year: '2021', domain: 'G06F', value: 133 }, { year: '2022', domain: 'G06F', value: 171 }, { year: '2023', domain: 'G06F', value: 250 }, { year: '2024', domain: 'G06F', value: 318 }, { year: '2025', domain: 'G06F', value: 374 }, { year: '2026', domain: 'G06F', value: 226 },
  { year: '2017', domain: 'A61B', value: 105 }, { year: '2018', domain: 'A61B', value: 132 }, { year: '2019', domain: 'A61B', value: 254 }, { year: '2020', domain: 'A61B', value: 228 }, { year: '2021', domain: 'A61B', value: 208 }, { year: '2022', domain: 'A61B', value: 168 }, { year: '2023', domain: 'A61B', value: 231 }, { year: '2024', domain: 'A61B', value: 180 }, { year: '2025', domain: 'A61B', value: 96 }, { year: '2026', domain: 'A61B', value: 40 },
  { year: '2017', domain: 'A61M', value: 62 }, { year: '2018', domain: 'A61M', value: 107 }, { year: '2019', domain: 'A61M', value: 301 }, { year: '2020', domain: 'A61M', value: 265 }, { year: '2021', domain: 'A61M', value: 248 }, { year: '2022', domain: 'A61M', value: 144 }, { year: '2023', domain: 'A61M', value: 244 }, { year: '2024', domain: 'A61M', value: 147 },
  { year: '2017', domain: 'A61G', value: 44 }, { year: '2018', domain: 'A61G', value: 90 }, { year: '2019', domain: 'A61G', value: 198 }, { year: '2020', domain: 'A61G', value: 254 }, { year: '2021', domain: 'A61G', value: 203 }, { year: '2022', domain: 'A61G', value: 118 }, { year: '2023', domain: 'A61G', value: 183 }, { year: '2024', domain: 'A61G', value: 73 },
  { year: '2017', domain: 'A61K', value: 72 }, { year: '2018', domain: 'A61K', value: 62 }, { year: '2019', domain: 'A61K', value: 65 }, { year: '2020', domain: 'A61K', value: 52 }, { year: '2021', domain: 'A61K', value: 99 }, { year: '2022', domain: 'A61K', value: 65 }, { year: '2023', domain: 'A61K', value: 109 }, { year: '2024', domain: 'A61K', value: 145 }, { year: '2025', domain: 'A61K', value: 186 }, { year: '2026', domain: 'A61K', value: 116 },
  { year: '2017', domain: 'G01V', value: 80 }, { year: '2018', domain: 'G01V', value: 86 }, { year: '2019', domain: 'G01V', value: 112 }, { year: '2020', domain: 'G01V', value: 82 }, { year: '2021', domain: 'G01V', value: 53 }, { year: '2022', domain: 'G01V', value: 83 }, { year: '2023', domain: 'G01V', value: 81 }, { year: '2024', domain: 'G01V', value: 77 }, { year: '2025', domain: 'G01V', value: 142 }, { year: '2026', domain: 'G01V', value: 88 },
  { year: '2017', domain: 'A61F', value: 36 }, { year: '2018', domain: 'A61F', value: 53 }, { year: '2019', domain: 'A61F', value: 149 }, { year: '2020', domain: 'A61F', value: 149 }, { year: '2021', domain: 'A61F', value: 108 }, { year: '2022', domain: 'A61F', value: 113 }, { year: '2023', domain: 'A61F', value: 102 }, { year: '2024', domain: 'A61F', value: 85 },
  { year: '2018', domain: 'B60W', value: 47 }, { year: '2019', domain: 'B60W', value: 66 }, { year: '2020', domain: 'B60W', value: 62 }, { year: '2021', domain: 'B60W', value: 76 }, { year: '2022', domain: 'B60W', value: 60 }, { year: '2023', domain: 'B60W', value: 87 }, { year: '2024', domain: 'B60W', value: 87 }, { year: '2025', domain: 'B60W', value: 122 }, { year: '2026', domain: 'B60W', value: 76 },
  { year: '2017', domain: 'G01M', value: 151 }, { year: '2018', domain: 'G01M', value: 114 }, { year: '2019', domain: 'G01M', value: 131 }, { year: '2020', domain: 'G01M', value: 114 }, { year: '2021', domain: 'G01M', value: 71 }, { year: '2022', domain: 'G01M', value: 38 }
];

const Y_DOMAINS = ['G01N', 'G06F', 'A61B', 'A61M', 'A61G', 'A61K', 'G01V', 'A61F', 'B60W', 'G01M'];
const X_YEARS = ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026'];
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

// Light theme styles
const getDomainStyles = (domain: string) => {
  switch(domain) {
    case 'G01N': return { bg: 'rgba(99, 102, 241, 0.15)', border: 'rgba(99, 102, 241, 0.8)', text: '#4338ca' }; // indigo
    case 'G06F': return { bg: 'rgba(217, 70, 239, 0.15)', border: 'rgba(217, 70, 239, 0.8)', text: '#a21caf' }; // fuchsia
    case 'A61B': return { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.8)', text: '#15803d' }; // green
    case 'A61M': return { bg: 'rgba(74, 222, 128, 0.15)', border: 'rgba(74, 222, 128, 0.8)', text: '#166534' }; // green light
    case 'A61G': return { bg: 'rgba(234, 179, 8, 0.15)', border: 'rgba(234, 179, 8, 0.8)', text: '#a16207' }; // yellow
    case 'A61K': return { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.8)', text: '#1d4ed8' }; // blue
    case 'G01V': return { bg: 'rgba(20, 184, 166, 0.15)', border: 'rgba(20, 184, 166, 0.8)', text: '#0f766e' }; // teal
    case 'A61F': return { bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.8)', text: '#047857' }; // emerald
    case 'B60W': return { bg: 'rgba(249, 115, 22, 0.15)', border: 'rgba(249, 115, 22, 0.8)', text: '#c2410c' }; // orange
    case 'G01M': return { bg: 'rgba(239, 68, 68, 0.15)', border: 'rgba(239, 68, 68, 0.8)', text: '#b91c1c' }; // red
    default: return { bg: 'rgba(148, 163, 184, 0.15)', border: 'rgba(148, 163, 184, 0.8)', text: '#475569' };
  }
};

export const JluTechAdvantageShowcase: React.FC<Props> = ({ onNavigateToFullMap }) => {
  return (
    <div className="w-full relative bg-slate-50 border border-slate-200 rounded-3xl p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-4 relative z-20">
         <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2">
           <Network className="w-4 h-4 text-blue-600" />
           近十年核心科技成果演进图谱
         </h4>
         {onNavigateToFullMap && (
           <button 
             onClick={onNavigateToFullMap}
             className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors"
           >
             查看技术全景图谱 &rarr;
           </button>
         )}
      </div>

      <div className="w-full flex-1 relative z-10 flex flex-col min-h-[360px] pt-2">
        <div className="flex-1 flex relative">
          {/* Y Axis Labels */}
          <div className="w-20 sm:w-28 flex flex-col justify-around py-2 border-r border-slate-300 shrink-0 z-10">
            {Y_DOMAINS.map(domain => (
              <div key={domain} className="text-right pr-2 sm:pr-3 flex flex-col justify-center">
                <span className="text-[10px] sm:text-xs text-slate-800 font-mono font-bold">{domain}</span>
                <span className="text-[9px] text-slate-500 font-medium truncate" title={IPC_DESCRIPTIONS[domain]}>
                  {IPC_DESCRIPTIONS[domain].substring(0, 7)}
                </span>
              </div>
            ))}
          </div>

          {/* Grid Area */}
          <div className="flex-1 flex justify-between px-2 sm:px-4 relative">
             {/* Horizontal Grid Lines */}
             <div className="absolute inset-0 flex flex-col justify-around py-2 pointer-events-none">
               {Y_DOMAINS.map((_, i) => (
                 <div key={i} className="w-full border-b border-slate-200 border-dashed h-0"></div>
               ))}
             </div>

             {/* Columns (Years) */}
             {X_YEARS.map(year => (
               <div key={year} className="flex-1 flex flex-col justify-around items-center py-2 relative group/col">
                 <div className="absolute inset-y-0 w-full max-w-[40px] bg-blue-50/0 group-hover/col:bg-blue-50/80 rounded-lg transition-colors z-0"></div>
                    
                 {/* Bubbles */}
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
                              
                           {/* Tooltip */}
                           <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max bg-white border border-slate-200 text-slate-600 text-xs px-3 py-2 rounded-xl shadow-xl opacity-0 invisible group-hover/bubble:opacity-100 group-hover/bubble:visible transition-all duration-300 z-[100] pointer-events-none transform translate-y-2 group-hover/bubble:translate-y-0 flex flex-col gap-1.5 items-center">
                             <div className="font-bold text-slate-800 tracking-wider flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: styles.border }}></span>
                                {year}年 {domain} - {IPC_DESCRIPTIONS[domain]}
                             </div>
                             <div className="flex items-baseline gap-1 bg-slate-50 px-2 py-0.5 rounded text-[10px] border border-slate-100">
                               新增成果 <span className="font-mono text-blue-600 text-sm font-black mx-0.5">{val}</span> 项
                             </div>
                             {/* Tooltip Arrow */}
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

        {/* X Axis Labels */}
        <div className="flex ml-20 sm:ml-28 px-2 sm:px-4 shrink-0 mt-3">
           {X_YEARS.map(year => (
             <div key={year} className="flex-1 text-center text-[10px] sm:text-xs text-slate-500 font-mono font-bold">
               {year}
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};
