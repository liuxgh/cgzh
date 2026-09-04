import React, { useState } from 'react';
import { CopyableText } from './CopyableText';
import { TargetEnterprise, PatentItem } from '../types';
import { 
  Building2, 
  ArrowLeft, 
  Download, 
  Plus, 
  Shuffle, 
  HelpCircle,
  BarChart2,
  List,
  BrainCircuit, 
  Lightbulb, 
  Package, 
  Layers, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  Globe,
  Search,
  Calendar,
  FileText,
  ChevronDown,
  ChevronUp,
  X,
  LayoutGrid
} from 'lucide-react';
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';

interface EnterpriseProfilePageProps {
  enterprise: TargetEnterprise;
  onBack: () => void;
  onOpenAiActionPlan?: (enterprise: TargetEnterprise) => void;
}

const trendData = [
  { year: '2016', apply: 22, grant: 27 },
  { year: '2017', apply: 56, grant: 29 },
  { year: '2018', apply: 22, grant: 26 },
  { year: '2019', apply: 7, grant: 9 },
  { year: '2020', apply: 11, grant: 11 },
  { year: '2021', apply: 14, grant: 4 },
  { year: '2022', apply: 18, grant: 17 },
  { year: '2023', apply: 22, grant: 18 },
  { year: '2024', apply: 14, grant: 15 },
  { year: '2025', apply: 13, grant: 10 },
  { year: '2026', apply: 2, grant: 12 },
];

const bubbleData = [
  { x: 2017, y: 'H02K', z: 44, name: 'H02K: 电机（电动继电器入H01H53/00...' },
  { x: 2018, y: 'H02K', z: 17, name: 'H02K: 电机（电动继电器入H01H53/00...' },
  { x: 2019, y: 'H02K', z: 3, name: 'H02K: 电机（电动继电器入H01H53/00...' },
  { x: 2020, y: 'H02K', z: 7, name: 'H02K: 电机（电动继电器入H01H53/00...' },
  { x: 2021, y: 'H02K', z: 7, name: 'H02K: 电机（电动继电器入H01H53/00...' },
  { x: 2022, y: 'H02K', z: 11, name: 'H02K: 电机（电动继电器入H01H53/00...' },
  { x: 2023, y: 'H02K', z: 3, name: 'H02K: 电机（电动继电器入H01H53/00...' },
  { x: 2024, y: 'H02K', z: 2, name: 'H02K: 电机（电动继电器入H01H53/00...' },
  { x: 2025, y: 'H02K', z: 1, name: 'H02K: 电机（电动继电器入H01H53/00...' },
  { x: 2026, y: 'H02K', z: 2, name: 'H02K: 电机（电动继电器入H01H53/00...' },

  { x: 2019, y: 'B63H', z: 1, name: 'B63H: 船舶的推进装置或操舵装置...' },
  { x: 2021, y: 'B63H', z: 1, name: 'B63H: 船舶的推进装置或操舵装置...' },
  { x: 2022, y: 'B63H', z: 2, name: 'B63H: 船舶的推进装置或操舵装置...' },
  { x: 2023, y: 'B63H', z: 6, name: 'B63H: 船舶的推进装置或操舵装置...' },
  { x: 2024, y: 'B63H', z: 3, name: 'B63H: 船舶的推进装置或操舵装置...' },
  { x: 2025, y: 'B63H', z: 2, name: 'B63H: 船舶的推进装置或操舵装置...' },
  
  { x: 2023, y: 'B63B', z: 10, name: 'B63B: 船舶或其他水上船只；船用设...' },
  
  { x: 2019, y: 'F04D', z: 3, name: 'F04D: 非变容式泵（发动机燃料喷射...' },
  { x: 2021, y: 'F04D', z: 5, name: 'F04D: 非变容式泵（发动机燃料喷射...' },
  { x: 2022, y: 'F04D', z: 1, name: 'F04D: 非变容式泵（发动机燃料喷射...' },
  
  { x: 2017, y: 'B60K', z: 3, name: 'B60K: 车辆动力装置或传动装置的布...' },
  { x: 2018, y: 'B60K', z: 1, name: 'B60K: 车辆动力装置或传动装置的布...' },
  { x: 2020, y: 'B60K', z: 1, name: 'B60K: 车辆动力装置或传动装置的布...' },
  
  { x: 2018, y: 'B60L', z: 2, name: 'B60L: 电动车辆动力装置（车辆电动...' },
  { x: 2024, y: 'B60L', z: 1, name: 'B60L: 电动车辆动力装置（车辆电动...' },
  
  { x: 2024, y: 'B62M', z: 2, name: 'B62M: 乘骑者驱动的轮式车辆或滑橇...' },
  
  { x: 2022, y: 'F03D', z: 2, name: 'F03D: 风力发动机' },
  
  { x: 2024, y: 'F16H', z: 2, name: 'F16H: 传动装置' },
  
  { x: 2020, y: 'H05B', z: 2, name: 'H05B: 电热；其他类目不包含的电阻...' }
];

const ipcCategories = ['H05B', 'F16H', 'F03D', 'B62M', 'B60L', 'B60K', 'F04D', 'B63B', 'B63H', 'H02K'];

const CustomBubbleShape = (props: any) => {
  const { cx, cy, z, payload } = props;
  const radius = Math.max(z * 2.5, 12); // Minimum radius
  
  // Choose color based on category
  let fill = "#83A2E7"; // H02K blue
  if (payload.y === 'B63H') fill = "#F4A3DF";
  if (payload.y === 'B63B') fill = "#BB8ED6";
  if (payload.y === 'F04D') fill = "#6AC48E";
  if (payload.y === 'B60K') fill = "#FCD179";
  if (payload.y === 'B60L') fill = "#4882EC";
  if (payload.y === 'B62M') fill = "#89C9D7";
  if (payload.y === 'F03D') fill = "#ACDB8A";
  if (payload.y === 'F16H') fill = "#FC9374";
  if (payload.y === 'H05B') fill = "#EE717D";

  return (
    <g>
      <circle cx={cx} cy={cy} r={radius} fill={fill} opacity={0.8} />
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fill="#fff" fontSize={11} fontWeight="bold">
        {z}
      </text>
    </g>
  );
};


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

export const EnterpriseProfilePage: React.FC<EnterpriseProfilePageProps> = ({ enterprise, onBack, onOpenAiActionPlan }) => {
  const [patentSearch, setPatentSearch] = useState('');
  const [patentViewMode, setPatentViewMode] = useState<'card' | 'table'>('card');
  const [patentPage, setPatentPage] = useState(1);
  const [expandedAbstracts, setExpandedAbstracts] = useState<Record<string, boolean>>({});

  const toggleAbstract = (patentNo: string) => {
    setExpandedAbstracts(prev => ({
      ...prev,
      [patentNo]: !prev[patentNo]
    }));
  };
  
  const establishedDate = enterprise.establishedDate || "2017-02-24";
  const registeredCapital = enterprise.registeredCapital || "9100 万元人民币";
  const phone = enterprise.phone || "0593-2768080";
  const email = enterprise.email || "423358641@qq.com";
  
  const shortName = enterprise.shortName || "时代";
  const oldName = enterprise.oldName || "-";
  
  const address = enterprise.address || "福建省宁德市蕉城区疏港路118号";
  const website = enterprise.website || "www.cetlmotor.com";

  const legalRep = enterprise.legalRep || "卢友文";

  const businessScope = enterprise.businessScope || "一般项目：技术服务、技术开发、技术咨询、技术交流、技术转让、技术推广；电动机制造；发电机及发电机组制造；发电机及发电机组销售；微特电机及组件制造；微特电机及组件销售；齿轮及齿轮减、变速箱制造；齿轮及齿轮减、变速箱销售；模具销售；输配电及控制设备制造；智能输配电及控制设备销售；机械零件、零部件加工；机械零件、零部件销售；电子元器件与机电组件设备销售；电池制造；电池销售；新能源汽车整车销售；新能源汽车电附件销售；新能源汽车换电设施销售；电动汽车充电基础设施运营；汽车新车销售；集中式快速充电站；分布式交流充电桩销售；二手车经销；船舶销售；建筑工程用机械销售；非居住房地产租赁 ( 除依法须经批准的项目外, 凭营业执照依法自主开展经营活动 ) 许可项目：技术进出口；货物进出口 ( 依法须经批准的项目，经相关部门批准后方可开展经营活动，具体经营项目以相关部门批准文件或许可证件为准 )";
  const status = enterprise.status || "存续";
  
  const logoText = shortName.length >= 2 ? shortName.substring(0, 2) : shortName;

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-300">
      <div className="flex items-center gap-3 cursor-pointer group w-fit" onClick={onBack}>
        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
          <ArrowLeft className="w-4 h-4 text-slate-600" />
        </div>
        <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">返回列表</span>
      </div>

      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 md:p-8">
        
        {/* Section 1: Basic Info */}
        <div className="flex items-center gap-2 mb-6">
          <Building2 className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-black text-slate-900">基本信息</h2>
        </div>

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-[#00A1D6] rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-sm shrink-0">
              {logoText}
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <CopyableText text={enterprise.name}><h1 className="text-2xl font-black text-slate-900">{enterprise.name}</h1></CopyableText>
                <span className="px-2.5 py-0.5 border border-[#89E198] text-[#34A853] text-[13px] bg-[#E8F8EE] rounded-sm font-medium shrink-0">
                  {status}
                </span>
                <div className="flex items-center gap-1.5 text-sm text-slate-600 shrink-0">
                  <span className="text-slate-400">注册地址：</span>
                  <CopyableText text={address}><span className="text-slate-700 hover:text-blue-700 cursor-pointer font-medium">{address}</span></CopyableText>
                </div>
              </div>
            </div>
          </div>

          
          <div className="flex flex-wrap items-center gap-3 shrink-0">
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
          </div>

        </div>

        <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-y-5 gap-x-8 text-sm">
          <div className="flex gap-4">
            <span className="text-slate-500 shrink-0 w-24">成立日期：</span>
            <CopyableText text={establishedDate}><span className="text-slate-800">{establishedDate}</span></CopyableText>
          </div>
          <div className="flex gap-4">
            <span className="text-slate-500 shrink-0 w-24">注册资本：</span>
            <CopyableText text={registeredCapital}><span className="text-slate-800">{registeredCapital}</span></CopyableText>
          </div>
          <div className="flex gap-4">
            <span className="text-slate-500 shrink-0 w-24">法定代表人：</span>
            <CopyableText text={legalRep}><span className="text-slate-800">{legalRep}</span></CopyableText>
          </div>

          <div className="flex gap-4">
            <span className="text-slate-500 shrink-0 w-24">企业简称：</span>
            <CopyableText text={shortName}><span className="text-slate-800">{shortName}</span></CopyableText>
          </div>
          
          <div className="flex gap-4">
            <span className="text-slate-500 shrink-0 w-24">曾用名：</span>
            <CopyableText text={oldName}><span className="text-slate-800">{oldName}</span></CopyableText>
          </div>

          <div className="hidden md:block"></div>

          <div className="flex gap-4 items-center">
            <span className="text-slate-500 shrink-0 w-24 whitespace-nowrap">
              公司电话：
            </span>
            <CopyableText text={phone}><span className="text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{phone}</span></CopyableText>
          </div>
          
          <div className="flex gap-4 items-center">
            <span className="text-slate-500 shrink-0 w-24 whitespace-nowrap">
              公司邮箱：
            </span>
            <CopyableText text={email}><span className="text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{email}</span></CopyableText>
          </div>

          <div className="flex gap-4 items-center">
            <span className="text-slate-500 shrink-0 w-24 whitespace-nowrap">
              企业网址：
            </span>
            <CopyableText text={website}><span className="text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-100 hover:underline cursor-pointer">{website}</span></CopyableText>
          </div>

          <div className="flex gap-4 items-center md:col-span-3">
            <span className="text-slate-500 shrink-0 w-24 whitespace-nowrap">
              主要发明人：
            </span>
            <div className="flex flex-wrap items-center gap-3">
              {enterprise.keyInventors && enterprise.keyInventors.length > 0 ? (
                enterprise.keyInventors.slice(0, 2).map((inv, idx) => (
                  <CopyableText key={idx} text={inv.name}>
                    <span className="text-blue-700 font-bold hover:underline cursor-pointer">
                      {inv.name}
                    </span>
                  </CopyableText>
                ))
              ) : (
                <>
                  <CopyableText text="卢友文">
                    <span className="text-blue-700 font-bold hover:underline cursor-pointer">
                      卢友文
                    </span>
                  </CopyableText>
                  <CopyableText text="陈金柱">
                    <span className="text-blue-700 font-bold hover:underline cursor-pointer">
                      陈金柱
                    </span>
                  </CopyableText>
                </>
              )}
            </div>
          </div>

          <div className="flex gap-4 md:col-span-3">
            <span className="text-slate-500 shrink-0 w-24">经营范围：</span>
            <span className="text-slate-800 leading-relaxed text-justify">{businessScope}</span>
          </div>
        </div>
      </div>

      {/* Section 2: IP Overview */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="w-1 h-4 bg-blue-600 rounded-sm"></span>
            <span className="w-1 h-4 bg-blue-400 rounded-sm transform translate-x-1 rotate-12 -ml-2"></span>
          </div>
          <h2 className="text-lg font-black text-slate-900 ml-1">知识产权全景</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {/* Card 1 */}
          <div className="p-6 relative overflow-hidden">
            <div className="absolute right-4 top-4 text-[#F0F4FA] pointer-events-none">
              <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor">
                <path d="M40,20 C60,20 80,40 80,60 C80,80 60,100 40,100 C35,100 30,99 25,97 L25,23 C30,21 35,20 40,20 Z" />
                <circle cx="85" cy="30" r="3" />
                <circle cx="95" cy="45" r="4" />
                <circle cx="85" cy="65" r="2.5" />
              </svg>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-[15px] font-medium text-slate-700 mb-2">当前有效专利 (中国)</h3>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-5xl font-black text-[#0052D9] tracking-tight">{enterprise.patentTotalCount > 0 ? enterprise.patentTotalCount : 152}</span>
                <span className="text-sm font-medium text-slate-600">件</span>
              </div>
              
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="border-l-4 border-[#0052D9] pl-3">
                  <div className="text-[13px] text-slate-500 mb-1">发明</div>
                  <div className="font-bold text-slate-800 text-lg">{(enterprise.patentTotalCount > 0 ? Math.floor(enterprise.patentTotalCount * 0.22) : 34)} <span className="text-xs font-normal text-slate-500">件</span></div>
                </div>
                <div className="border-l-4 border-[#00B4B4] pl-3">
                  <div className="text-[13px] text-slate-500 mb-1">实用新型</div>
                  <div className="font-bold text-slate-800 text-lg">{(enterprise.patentTotalCount > 0 ? Math.floor(enterprise.patentTotalCount * 0.61) : 93)} <span className="text-xs font-normal text-slate-500">件</span></div>
                </div>
                <div className="border-l-4 border-[#00A870] pl-3">
                  <div className="text-[13px] text-slate-500 mb-1">外观设计</div>
                  <div className="font-bold text-slate-800 text-lg">{(enterprise.patentTotalCount > 0 ? Math.floor(enterprise.patentTotalCount * 0.17) : 25)} <span className="text-xs font-normal text-slate-500">件</span></div>
                </div>
              </div>
              
              <div className="flex items-center gap-10 border-t border-slate-100 pt-6">
                <div className="border-l-4 border-[#E34D59] pl-3">
                  <div className="text-[13px] text-slate-500 mb-1 flex items-center gap-1">自主研发专利 <HelpCircle className="w-3 h-3 text-slate-300" /></div>
                  <div className="font-bold text-slate-800 text-lg">{(enterprise.patentTotalCount > 0 ? Math.floor(enterprise.patentTotalCount * 0.81) : 124)} <span className="text-xs font-normal text-slate-500">件</span></div>
                </div>
                <div className="border-l-4 border-[#8B3A87] pl-3">
                  <div className="text-[13px] text-slate-500 mb-1 flex items-center gap-1">引进技术专利 <HelpCircle className="w-3 h-3 text-slate-300" /></div>
                  <div className="font-bold text-slate-800 text-lg">{(enterprise.patentTotalCount > 0 ? Math.floor(enterprise.patentTotalCount * 0.19) : 28)} <span className="text-xs font-normal text-slate-500">件</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 relative overflow-hidden">
            <div className="absolute right-4 top-4 text-[#F0F4FA] pointer-events-none">
              <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor">
                <path d="M40,20 C60,20 80,40 80,60 C80,80 60,100 40,100 C35,100 30,99 25,97 L25,23 C30,21 35,20 40,20 Z" />
                <circle cx="85" cy="30" r="3" />
                <circle cx="95" cy="45" r="4" />
                <circle cx="85" cy="65" r="2.5" />
              </svg>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-[15px] font-medium text-slate-700 mb-2">2026年度新增授权专利 (中国)</h3>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-5xl font-black text-[#0052D9] tracking-tight">12</span>
                <span className="text-sm font-medium text-slate-600">件</span>
              </div>
              
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="border-l-4 border-[#0052D9] pl-3">
                  <div className="text-[13px] text-slate-500 mb-1">发明</div>
                  <div className="font-bold text-slate-800 text-lg">0 <span className="text-xs font-normal text-slate-500">件</span></div>
                </div>
                <div className="border-l-4 border-[#00B4B4] pl-3">
                  <div className="text-[13px] text-slate-500 mb-1">实用新型</div>
                  <div className="font-bold text-slate-800 text-lg">2 <span className="text-xs font-normal text-slate-500">件</span></div>
                </div>
                <div className="border-l-4 border-[#00A870] pl-3">
                  <div className="text-[13px] text-slate-500 mb-1">外观设计</div>
                  <div className="font-bold text-slate-800 text-lg">10 <span className="text-xs font-normal text-slate-500">件</span></div>
                </div>
              </div>
              
              <div className="flex items-center gap-10 border-t border-slate-100 pt-6">
                <div className="border-l-4 border-[#E34D59] pl-3">
                  <div className="text-[13px] text-slate-500 mb-1 flex items-center gap-1">自主研发专利 <HelpCircle className="w-3 h-3 text-slate-300" /></div>
                  <div className="font-bold text-slate-800 text-lg">12 <span className="text-xs font-normal text-slate-500">件</span></div>
                </div>
                <div className="border-l-4 border-[#8B3A87] pl-3">
                  <div className="text-[13px] text-slate-500 mb-1 flex items-center gap-1">引进技术专利 <HelpCircle className="w-3 h-3 text-slate-300" /></div>
                  <div className="font-bold text-slate-800 text-lg">0 <span className="text-xs font-normal text-slate-500">件</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 企业相似专利 */}
      {(() => {
        const similarPatentsList = enterprise.similarPatents || [];
        const filteredPatents = similarPatentsList.filter(p => {
          if (!patentSearch.trim()) return true;
          const q = patentSearch.toLowerCase().trim();
          return (
            p.title?.toLowerCase().includes(q) ||
            p.patentNo?.toLowerCase().includes(q) ||
            (p.ipc && p.ipc.toLowerCase().includes(q)) ||
            (p.abstract && p.abstract.toLowerCase().includes(q))
          );
        });

        const pageSize = 4;
        const totalPages = Math.ceil(filteredPatents.length / pageSize) || 1;
        const safeCurrentPage = Math.min(patentPage, totalPages);
        const currentPatents = filteredPatents.slice((safeCurrentPage - 1) * pageSize, safeCurrentPage * pageSize);

        return (
          <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden flex flex-col">
            {/* Header with Title, Count, Search, View Mode Switcher */}
            <div className="px-6 py-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-black text-slate-900">企业相似专利</h2>
                    {similarPatentsList.length > 0 && (
                      <span className="text-xs font-bold px-2.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-full">
                        共 {similarPatentsList.length} 项高相关专利
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    企业拥有的与本项成果IPC技术领域密切相关的中国有效专利
                  </p>
                </div>
              </div>

              {/* Action Toolbar: Search & View Switcher */}
              <div className="flex items-center gap-3 self-end md:self-center">
                {similarPatentsList.length > 0 && (
                  <div className="relative w-52 sm:w-64">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={patentSearch}
                      onChange={(e) => {
                        setPatentSearch(e.target.value);
                        setPatentPage(1);
                      }}
                      placeholder="搜索专利名称/编号/IPC..."
                      className="w-full pl-8.5 pr-7 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-slate-700 placeholder:text-slate-400"
                    />
                    {patentSearch && (
                      <button
                        onClick={() => {
                          setPatentSearch('');
                          setPatentPage(1);
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}

                {/* View Switch Buttons */}
                <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setPatentViewMode('card')}
                    className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                      patentViewMode === 'card'
                        ? 'bg-white text-slate-900 shadow-2xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    title="卡片视图"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">卡片</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPatentViewMode('table')}
                    className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                      patentViewMode === 'table'
                        ? 'bg-white text-slate-900 shadow-2xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    title="表格视图"
                  >
                    <List className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">表格</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6">
              {similarPatentsList.length === 0 ? (
                <div className="py-12 flex flex-col items-center justify-center text-slate-400 text-sm">
                  <FileText className="w-8 h-8 text-slate-300 mb-2" />
                  <span>暂无相似专利数据</span>
                </div>
              ) : filteredPatents.length === 0 ? (
                <div className="py-12 flex flex-col items-center justify-center text-slate-400 text-sm">
                  <Search className="w-8 h-8 text-slate-300 mb-2" />
                  <span>未匹配到符合“{patentSearch}”的相似专利</span>
                  <button
                    onClick={() => {
                      setPatentSearch('');
                      setPatentPage(1);
                    }}
                    className="mt-3 text-xs text-amber-600 hover:underline cursor-pointer"
                  >
                    清除搜索条件
                  </button>
                </div>
              ) : patentViewMode === 'card' ? (
                /* Card Mode */
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentPatents.map((p, idx) => {
                      const isExpanded = !!expandedAbstracts[p.patentNo];
                      return (
                        <div
                          key={idx}
                          className="bg-slate-50/70 hover:bg-white p-4.5 rounded-xl border border-slate-200 hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden"
                        >
                          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-linear-to-b from-amber-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          
                          <div>
                            {/* Top Meta: Patent No & IPC & Grant Date */}
                            <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-mono text-[11px] font-semibold text-slate-700 bg-white px-2.5 py-1 rounded shadow-2xs border border-slate-200">
                                  <CopyableText text={p.patentNo}>{p.patentNo}</CopyableText>
                                </span>
                                {p.ipc && (
                                  <span className="font-mono text-[11px] text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded">
                                    IPC: {p.ipc}
                                  </span>
                                )}
                              </div>
                              {p.grantDate && (
                                <div className="flex items-center gap-1 text-[11px] text-slate-400 shrink-0">
                                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                  <span>公布/授权日：{p.grantDate}</span>
                                </div>
                              )}
                            </div>

                            {/* Title */}
                            <div className="text-[14px] text-slate-900 font-bold mb-2.5 leading-snug group-hover:text-blue-700 transition-colors">
                              {p.title}
                            </div>
                          </div>

                          {/* Collapsible Abstract */}
                          {p.abstract && (
                            <div className="pt-2 border-t border-slate-200/60 mt-1">
                              <button
                                type="button"
                                onClick={() => toggleAbstract(p.patentNo)}
                                className="w-full flex items-center justify-between text-[11px] text-slate-500 hover:text-amber-700 py-0.5 font-medium transition-colors cursor-pointer"
                              >
                                <span className="flex items-center gap-1">
                                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                                  {isExpanded ? '收起技术摘要' : '展开技术摘要'}
                                </span>
                                {isExpanded ? (
                                  <ChevronUp className="w-3.5 h-3.5" />
                                ) : (
                                  <ChevronDown className="w-3.5 h-3.5" />
                                )}
                              </button>
                              {isExpanded ? (
                                <div className="mt-2 text-[11px] text-slate-600 leading-relaxed bg-white p-2.5 rounded-lg border border-slate-200 text-justify animate-in fade-in duration-200">
                                  <span className="font-bold text-slate-700 mr-1">摘要：</span>
                                  {p.abstract}
                                </div>
                              ) : (
                                <div className="mt-1 text-[11px] text-slate-500 line-clamp-2 leading-relaxed text-justify">
                                  {p.abstract}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* Table Mode */
                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                      <tr>
                        <th className="py-3 px-3 w-10 text-center">#</th>
                        <th className="py-3 px-3 w-36">专利号</th>
                        <th className="py-3 px-4 min-w-[200px]">专利名称</th>
                        <th className="py-3 px-3 w-28">IPC分类</th>
                        <th className="py-3 px-3 w-28 whitespace-nowrap">公布/授权日</th>
                        <th className="py-3 px-4 min-w-[260px]">技术摘要</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {currentPatents.map((p, idx) => (
                        <tr key={idx} className="hover:bg-amber-50/20 transition-colors">
                          <td className="py-3 px-3 text-center font-mono text-slate-400">
                            {(safeCurrentPage - 1) * pageSize + idx + 1}
                          </td>
                          <td className="py-3 px-3 font-mono font-medium text-slate-800 whitespace-nowrap">
                            <CopyableText text={p.patentNo}>{p.patentNo}</CopyableText>
                          </td>
                          <td className="py-3 px-4 font-bold text-slate-900 leading-snug">
                            {p.title}
                          </td>
                          <td className="py-3 px-3 font-mono text-slate-500 whitespace-nowrap">
                            {p.ipc || '-'}
                          </td>
                          <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
                            {p.grantDate || '-'}
                          </td>
                          <td className="py-3 px-4 text-slate-600 leading-relaxed text-justify">
                            {p.abstract || '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination Bar when multiple patents exist */}
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 mt-4 border-t border-slate-100 text-xs">
                  <span className="text-slate-500">
                    显示第 {(safeCurrentPage - 1) * pageSize + 1} - {Math.min(safeCurrentPage * pageSize, filteredPatents.length)} 项，共 {filteredPatents.length} 项
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      disabled={safeCurrentPage <= 1}
                      onClick={() => setPatentPage(p => Math.max(1, p - 1))}
                      className="px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    >
                      上一页
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                      <button
                        key={pg}
                        type="button"
                        onClick={() => setPatentPage(pg)}
                        className={`w-7 h-7 rounded text-xs font-bold transition-colors cursor-pointer ${
                          safeCurrentPage === pg
                            ? 'bg-amber-500 text-white shadow-2xs'
                            : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {pg}
                      </button>
                    ))}
                    <button
                      type="button"
                      disabled={safeCurrentPage >= totalPages}
                      onClick={() => setPatentPage(p => Math.min(totalPages, p + 1))}
                      className="px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    >
                      下一页
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })()}


      {/* Section 3: 10-year Trend */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200">
        <div className="px-6 py-5 border-b border-slate-100">
          <h2 className="text-lg font-black text-slate-900">近10年专利申请/授权趋势</h2>
        </div>
        
        <div className="p-6 flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-6 mb-6 px-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full border-2 border-[#5479E6] bg-white"></span>
                <span className="text-sm font-medium text-slate-600">申请量</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full border-2 border-[#7ECEEE] bg-white"></span>
                <span className="text-sm font-medium text-slate-600">授权量</span>
              </div>
            </div>
            
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorApply" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#5479E6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#5479E6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorGrant" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7ECEEE" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#7ECEEE" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EDF2F7" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Area type="monotone" dataKey="grant" stroke="#7ECEEE" strokeWidth={2} fillOpacity={1} fill="url(#colorGrant)" dot={{ stroke: '#7ECEEE', strokeWidth: 2, r: 4, fill: '#fff' }} activeDot={{ r: 6, fill: '#7ECEEE' }} />
                  <Area type="monotone" dataKey="apply" stroke="#5479E6" strokeWidth={2} fillOpacity={1} fill="url(#colorApply)" dot={{ stroke: '#5479E6', strokeWidth: 2, r: 4, fill: '#fff' }} activeDot={{ r: 6, fill: '#5479E6' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="lg:w-[350px] shrink-0">
            <div className="flex items-center gap-2 mb-4">
              <select className="border border-slate-200 rounded px-2 py-1 text-sm bg-white text-slate-700">
                <option>2016</option>
              </select>
              <span className="text-slate-400">-</span>
              <select className="border border-slate-200 rounded px-2 py-1 text-sm bg-white text-slate-700">
                <option>2026</option>
              </select>
              <select className="border border-slate-200 rounded px-2 py-1 text-sm bg-white text-slate-700 ml-auto">
                <option>全部类型</option>
              </select>
            </div>
            
            <div className="border border-slate-100 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-[#F8FAFC] border-b border-slate-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-bold text-slate-700 w-1/3">年份</th>
                    <th className="px-4 py-3 text-left font-bold text-slate-700 w-1/3">专利申请量</th>
                    <th className="px-4 py-3 text-left font-bold text-slate-700 w-1/3">专利授权量</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[...trendData].reverse().map((row) => (
                    <tr key={row.year} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-2.5 text-slate-600">{row.year}</td>
                      <td className="px-4 py-2.5 text-blue-600">{row.apply}</td>
                      <td className="px-4 py-2.5 text-blue-600">{row.grant}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
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
               
               {[2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017].map(year => (
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

    </div>
  );
};
