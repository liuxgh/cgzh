import React from 'react';
import { Network, Layers, Activity, Compass , HelpCircle} from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  onNavigateToFullMap?: () => void;
}

const scatterData = [
  // G01N: 测试或分析材料
  { year: '2017', domain: 'G01N', value: 238 }, { year: '2018', domain: 'G01N', value: 314 }, { year: '2019', domain: 'G01N', value: 303 }, { year: '2020', domain: 'G01N', value: 194 }, { year: '2021', domain: 'G01N', value: 231 }, { year: '2022', domain: 'G01N', value: 221 }, { year: '2023', domain: 'G01N', value: 204 }, { year: '2024', domain: 'G01N', value: 223 }, { year: '2025', domain: 'G01N', value: 165 }, { year: '2026', domain: 'G01N', value: 80 },
  // G06F: 电数字数据处理
  { year: '2017', domain: 'G06F', value: 79 },  { year: '2018', domain: 'G06F', value: 79 },  { year: '2019', domain: 'G06F', value: 106 }, { year: '2020', domain: 'G06F', value: 99 },  { year: '2021', domain: 'G06F', value: 133 }, { year: '2022', domain: 'G06F', value: 171 }, { year: '2023', domain: 'G06F', value: 250 }, { year: '2024', domain: 'G06F', value: 318 }, { year: '2025', domain: 'G06F', value: 374 }, { year: '2026', domain: 'G06F', value: 226 },
  // A61B: 诊断外科与鉴定
  { year: '2017', domain: 'A61B', value: 105 }, { year: '2018', domain: 'A61B', value: 132 }, { year: '2019', domain: 'A61B', value: 254 }, { year: '2020', domain: 'A61B', value: 228 }, { year: '2021', domain: 'A61B', value: 208 }, { year: '2022', domain: 'A61B', value: 168 }, { year: '2023', domain: 'A61B', value: 231 }, { year: '2024', domain: 'A61B', value: 180 }, { year: '2025', domain: 'A61B', value: 96 },  { year: '2026', domain: 'A61B', value: 40 },
  // A61M: 介质输入输到体内
  { year: '2017', domain: 'A61M', value: 62 },  { year: '2018', domain: 'A61M', value: 107 }, { year: '2019', domain: 'A61M', value: 301 }, { year: '2020', domain: 'A61M', value: 265 }, { year: '2021', domain: 'A61M', value: 248 }, { year: '2022', domain: 'A61M', value: 144 }, { year: '2023', domain: 'A61M', value: 244 }, { year: '2024', domain: 'A61M', value: 147 }, { year: '2025', domain: 'A61M', value: 112 }, { year: '2026', domain: 'A61M', value: 55 },
  // A61G: 残疾人的运输床椅
  { year: '2017', domain: 'A61G', value: 44 },  { year: '2018', domain: 'A61G', value: 90 },  { year: '2019', domain: 'A61G', value: 198 }, { year: '2020', domain: 'A61G', value: 254 }, { year: '2021', domain: 'A61G', value: 203 }, { year: '2022', domain: 'A61G', value: 118 }, { year: '2023', domain: 'A61G', value: 183 }, { year: '2024', domain: 'A61G', value: 73 },  { year: '2025', domain: 'A61G', value: 62 },  { year: '2026', domain: 'A61G', value: 28 },
  // A61K: 医用牙科配制品
  { year: '2017', domain: 'A61K', value: 72 },  { year: '2018', domain: 'A61K', value: 62 },  { year: '2019', domain: 'A61K', value: 65 },  { year: '2020', domain: 'A61K', value: 52 },  { year: '2021', domain: 'A61K', value: 99 },  { year: '2022', domain: 'A61K', value: 65 },  { year: '2023', domain: 'A61K', value: 109 }, { year: '2024', domain: 'A61K', value: 145 }, { year: '2025', domain: 'A61K', value: 186 }, { year: '2026', domain: 'A61K', value: 116 },
  // G01V: 地球物理重力测量
  { year: '2017', domain: 'G01V', value: 80 },  { year: '2018', domain: 'G01V', value: 86 },  { year: '2019', domain: 'G01V', value: 112 }, { year: '2020', domain: 'G01V', value: 82 },  { year: '2021', domain: 'G01V', value: 53 },  { year: '2022', domain: 'G01V', value: 83 },  { year: '2023', domain: 'G01V', value: 81 },  { year: '2024', domain: 'G01V', value: 77 },  { year: '2025', domain: 'G01V', value: 142 }, { year: '2026', domain: 'G01V', value: 88 },
  // A61F: 假体及血管内滤器
  { year: '2017', domain: 'A61F', value: 36 },  { year: '2018', domain: 'A61F', value: 53 },  { year: '2019', domain: 'A61F', value: 149 }, { year: '2020', domain: 'A61F', value: 149 }, { year: '2021', domain: 'A61F', value: 108 }, { year: '2022', domain: 'A61F', value: 113 }, { year: '2023', domain: 'A61F', value: 102 }, { year: '2024', domain: 'A61F', value: 85 },  { year: '2025', domain: 'A61F', value: 68 },  { year: '2026', domain: 'A61F', value: 32 },
  // B60W: 车辆控制系统
  { year: '2017', domain: 'B60W', value: 38 },  { year: '2018', domain: 'B60W', value: 47 },  { year: '2019', domain: 'B60W', value: 66 },  { year: '2020', domain: 'B60W', value: 62 },  { year: '2021', domain: 'B60W', value: 76 },  { year: '2022', domain: 'B60W', value: 60 },  { year: '2023', domain: 'B60W', value: 87 },  { year: '2024', domain: 'B60W', value: 87 },  { year: '2025', domain: 'B60W', value: 122 }, { year: '2026', domain: 'B60W', value: 76 },
  // G01M: 部件静或动平衡
  { year: '2017', domain: 'G01M', value: 151 }, { year: '2018', domain: 'G01M', value: 114 }, { year: '2019', domain: 'G01M', value: 131 }, { year: '2020', domain: 'G01M', value: 114 }, { year: '2021', domain: 'G01M', value: 71 },  { year: '2022', domain: 'G01M', value: 38 },  { year: '2023', domain: 'G01M', value: 52 },  { year: '2024', domain: 'G01M', value: 46 },  { year: '2025', domain: 'G01M', value: 35 },  { year: '2026', domain: 'G01M', value: 18 }
];

const Y_DOMAINS = ['G01N', 'G06F', 'A61B', 'A61M', 'A61G', 'A61K', 'G01V', 'A61F', 'B60W', 'G01M'];
const X_YEARS = ['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017'];
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
  { id: 'G01N', count: 4894, name: '测试或分析材料', desc: '理化性质与成分精密检测，服务于新能源、新材料与现代生物医药。' },
  { id: 'G06F', count: 3267, name: '电数字数据处理', desc: '计算机架构、智能算法与大数据分析，赋能智能制造与工业软件。' },
  { id: 'A61B', count: 2894, name: '诊断外科与鉴定', desc: '高端诊疗装备与智能医疗器械研发，医工交叉创新前沿阵地。' },
  { id: 'A61M', count: 1542, name: '介质输入输到体内', desc: '新型精密给药系统与微创介入器械，突破多项临床关键医用技术。' },
  { id: 'A61G', count: 1325, name: '残疾人的运输床椅', desc: '智能康复辅助设备与转运助残系统，实现人机工程学与协同控制。' },
  { id: 'A61K', count: 1041, name: '医用牙科配制品', desc: '创新药物靶向递送与新型牙科生物材料，提供高价值临床转化方案。' },
  { id: 'G01V', count: 899, name: '地球物理重力测量', desc: '重磁电震高端物探仪器与探测方法，支撑深地深海资源勘探安全。' },
  { id: 'A61F', count: 884, name: '假体及血管内滤器', desc: '医工结合植介入假体与组织工程支架，突破生物相容性与结构力学。' },
  { id: 'B60W', count: 685, name: '车辆控制系统', desc: '智能网联汽车线控底盘与动力学协同控制，巩固汽车工程核心高地。' },
  { id: 'G01M', count: 782, name: '部件静或动平衡', desc: '大型高端机械装备减振降噪、转子动平衡校准与结构损伤健康监测。' }
];

export const JluTechAdvantageShowcase: React.FC<Props> = ({ onNavigateToFullMap }) => {
  return (
    <div className="space-y-6 mt-8">
      
      {/* 1. 知识产权全景 */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 flex items-center gap-2 mb-6">
          <Layers className="w-5 h-5 text-blue-600" />
          知识产权全景
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 border border-slate-100 rounded-2xl overflow-hidden bg-white shadow-xs">
          {/* Card 1: 当前有效专利 (中国) */}
          <div className="bg-[#FAFBFC] p-6 relative overflow-hidden">
            <div className="absolute right-4 top-4 text-[#E9F0FA] pointer-events-none">
              <svg width="110" height="110" viewBox="0 0 100 100" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M46 16 C68 16 84 32 84 52 C84 72 68 86 46 86 L38 86 L38 16 H46 Z M45 30 H42 V72 H45 C59 72 70 63 70 52 C70 40 59 30 45 30 Z" opacity="0.9" />
                <rect x="33" y="14" width="3" height="74" rx="1.5" />
                <path d="M23 26 L24.5 21 L26 26 L31 27.5 L26 29 L24.5 34 L23 29 L18 27.5 Z" />
                <path d="M14 42 L15.5 37 L17 42 L22 43.5 L17 45 L15.5 50 L14 45 L9 43.5 Z" />
                <path d="M19 59 L20.5 54 L22 59 L27 60.5 L22 62 L20.5 67 L19 62 L14 60.5 Z" />
                <path d="M28 73 L29.2 69 L30.4 73 L34.4 74.2 L30.4 75.4 L29.2 79.4 L28 75.4 L24 74.2 Z" />
              </svg>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-[15px] font-normal text-slate-700 mb-2">当前有效专利 ( 中国 )</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-black text-[#0052D9] tracking-tight font-sans">14895</span>
                <span className="text-base font-normal text-slate-700">件</span>
              </div>
              
              <div className="grid grid-cols-3 gap-6 pt-5 border-t border-slate-200">
                <div className="border-l-4 border-[#0052D9] pl-3">
                  <div className="text-[14px] text-slate-600 mb-1">发明</div>
                  <div className="font-bold text-slate-900 text-2xl font-sans tracking-tight">
                    12239 <span className="text-sm font-normal text-slate-600">件</span>
                  </div>
                </div>
                <div className="border-l-4 border-[#00B4B4] pl-3">
                  <div className="text-[14px] text-slate-600 mb-1">实用新型</div>
                  <div className="font-bold text-slate-900 text-2xl font-sans tracking-tight">
                    2566 <span className="text-sm font-normal text-slate-600">件</span>
                  </div>
                </div>
                <div className="border-l-4 border-[#00A870] pl-3">
                  <div className="text-[14px] text-slate-600 mb-1">外观设计</div>
                  <div className="font-bold text-slate-900 text-2xl font-sans tracking-tight">
                    90 <span className="text-sm font-normal text-slate-600">件</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: 2026年度新增授权专利 (中国) */}
          <div className="bg-[#FAFBFC] p-6 relative overflow-hidden">
            <div className="absolute right-4 top-4 text-[#E9F0FA] pointer-events-none">
              <svg width="110" height="110" viewBox="0 0 100 100" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M46 16 C68 16 84 32 84 52 C84 72 68 86 46 86 L38 86 L38 16 H46 Z M45 30 H42 V72 H45 C59 72 70 63 70 52 C70 40 59 30 45 30 Z" opacity="0.9" />
                <rect x="33" y="14" width="3" height="74" rx="1.5" />
                <path d="M23 26 L24.5 21 L26 26 L31 27.5 L26 29 L24.5 34 L23 29 L18 27.5 Z" />
                <path d="M14 42 L15.5 37 L17 42 L22 43.5 L17 45 L15.5 50 L14 45 L9 43.5 Z" />
                <path d="M19 59 L20.5 54 L22 59 L27 60.5 L22 62 L20.5 67 L19 62 L14 60.5 Z" />
                <path d="M28 73 L29.2 69 L30.4 73 L34.4 74.2 L30.4 75.4 L29.2 79.4 L28 75.4 L24 74.2 Z" />
              </svg>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-[15px] font-normal text-slate-700 mb-2">2026年度新增授权专利 ( 中国 )</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-black text-[#0052D9] tracking-tight font-sans">2079</span>
                <span className="text-base font-normal text-slate-700">件</span>
              </div>
              
              <div className="grid grid-cols-3 gap-6 pt-5 border-t border-slate-200">
                <div className="border-l-4 border-[#0052D9] pl-3">
                  <div className="text-[14px] text-slate-600 mb-1">发明</div>
                  <div className="font-bold text-slate-900 text-2xl font-sans tracking-tight">
                    1902 <span className="text-sm font-normal text-slate-600">件</span>
                  </div>
                </div>
                <div className="border-l-4 border-[#00B4B4] pl-3">
                  <div className="text-[14px] text-slate-600 mb-1">实用新型</div>
                  <div className="font-bold text-slate-900 text-2xl font-sans tracking-tight">
                    150 <span className="text-sm font-normal text-slate-600">件</span>
                  </div>
                </div>
                <div className="border-l-4 border-[#00A870] pl-3">
                  <div className="text-[14px] text-slate-600 mb-1">外观设计</div>
                  <div className="font-bold text-slate-900 text-2xl font-sans tracking-tight">
                    27 <span className="text-sm font-normal text-slate-600">件</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* 2. 技术领域（IPC Top10） */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 flex items-center gap-2 mb-5">
          <Compass className="w-5 h-5 text-indigo-600" />
          技术领域（IPC Top10）
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {topDomains.map(domain => {
            const styles = getDomainStyles(domain.id);
            return (
              <div 
                key={domain.id} 
                className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-white hover:border-indigo-200 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: styles.border }}></span>
                      <span className="text-xs sm:text-sm font-black text-slate-800 font-mono">{domain.id}</span>
                    </div>
                    <span 
                      className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded"
                      style={{ backgroundColor: styles.bg, color: styles.text }}
                    >
                      {domain.count}件
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-xs sm:text-sm truncate" title={domain.name}>
                    {domain.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-1 line-clamp-2" title={domain.desc}>
                    {domain.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. 核心科技成果演进趋势 */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
           <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
             <Activity className="w-5 h-5 text-emerald-600" />
             核心科技成果演进趋势
           </h3>
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
