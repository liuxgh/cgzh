import React, { useState } from 'react';
import { UserRole, PatentItem } from '../types';
import { Beaker, Car, Microchip, Leaf, Stethoscope, Cpu, CheckCircle2, Search, ArrowRight, Activity, Network, LineChart as LineChartIcon, BarChart3, Star, ShieldCheck, PieChart, Layers, Handshake, X, Building2, CheckCircle, Loader2, Check, Sparkles, GraduationCap, Users } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { LatestTechAchievementsSection } from './LatestTechAchievementsSection';
import { TechDetailPage, TechDetailData } from './TechDetailPage';
import { mapPatentToTechDetail } from '../utils/techDetailMapper';
import { AlumniEnterpriseRecord, INITIAL_ALUMNI_ENTERPRISES } from '../data/alumniEnterprisesData';
import { AlumniSelfRegisterModal } from './AlumniSelfRegisterModal';

const techDomains = [
  {
    id: 'ipc-c01',
    title: 'C01：无机化学',
    icon: <Beaker className="w-5 h-5" />,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-400',
    glowColor: 'shadow-[0_0_20px_rgba(59,130,246,0.2)]',
    description: '涵盖无机化合物、非金属元素及其化合物的制备。吉林大学在无机合成与制备化学国家重点实验室支撑下，C01分类专利储备处于国内顶尖梯队。',
    stats: { patentCount: 3450, grantedCount: 1820, pctCount: 145 },
    corePatents: [
      { id: 'pat-c1', name: '一种高镍正极材料表面异质外延包覆层及其制备方法', no: 'CN115832104B', tags: ['IPC: C01G', '新能源电池'] },
      { id: 'pat-c2', name: '多孔配位聚合物晶体材料的定向合成方法', no: 'CN108923412B', tags: ['IPC: C01B', '无机合成'] },
      { id: 'pat-c3', name: '一种纳米级介孔硅铝酸盐的模板剂无导向合成工艺', no: 'CN113456789B', tags: ['IPC: C01B', '多孔材料'] },
    ]
  },
  {
    id: 'ipc-b60',
    title: 'B60：车辆一般类',
    icon: <Car className="w-5 h-5" />,
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    textColor: 'text-emerald-400',
    glowColor: 'shadow-[0_0_20px_rgba(16,185,129,0.2)]',
    description: '涉及车辆动力学、底盘悬架、车轮等。依托汽车底盘集成与仿生全国重点实验室，吉林大学在B60分类（特别是B60L电动车辆、B60W车辆控制系统）拥有海量底层核心专利。',
    stats: { patentCount: 4120, grantedCount: 2150, pctCount: 182 },
    corePatents: [
      { id: 'pat-b1', name: '分布式驱动电动汽车线控底盘协同控制方法', no: 'CN114389012B', tags: ['IPC: B60L', '底盘控制'] },
      { id: 'pat-b2', name: '一种高适应性自排泥仿生非充气安全轮胎', no: 'CN110987654B', tags: ['IPC: B60C', '特种轮胎'] },
      { id: 'pat-b3', name: '基于路面附着系数估计的车辆横摆稳定性控制系统', no: 'CN116789012B', tags: ['IPC: B60W', '车辆控制'] },
    ]
  },
  {
    id: 'ipc-a61',
    title: 'A61：医学或兽医学',
    icon: <Stethoscope className="w-5 h-5" />,
    color: 'from-rose-500 to-pink-600',
    bgColor: 'bg-rose-500/10',
    borderColor: 'border-rose-500/30',
    textColor: 'text-rose-400',
    glowColor: 'shadow-[0_0_20px_rgba(244,63,94,0.2)]',
    description: '涵盖医疗器械、诊断设备、制药及兽医仪器。吉林大学在人兽共患病防治及创新药物靶点发现(A61K)等方面具有显著专利优势。',
    stats: { patentCount: 2890, grantedCount: 1340, pctCount: 96 },
    corePatents: [
      { id: 'pat-a1', name: '靶向EGFR突变的新型小分子激酶抑制剂', no: 'CN115678901B', tags: ['IPC: A61K', '靶向药'] },
      { id: 'pat-a2', name: '快速检测呼吸道病毒的微流控诊断芯片', no: 'CN114567890B', tags: ['IPC: A61B', '体外诊断'] },
      { id: 'pat-a3', name: '功能化间充质干细胞软骨缺损修复制剂', no: 'CN113456789B', tags: ['IPC: A61L', '干细胞'] },
    ]
  },
  {
    id: 'ipc-g06',
    title: 'G06：计算；推算',
    icon: <Microchip className="w-5 h-5" />,
    color: 'from-violet-500 to-purple-600',
    bgColor: 'bg-violet-500/10',
    borderColor: 'border-violet-500/30',
    textColor: 'text-violet-400',
    glowColor: 'shadow-[0_0_20px_rgba(139,92,246,0.2)]',
    description: '包含数据处理、人工智能算法模型及图像处理。吉大在知识图谱推理(G06N)与机器视觉(G06V)方向拥有大量高价值专利布局。',
    stats: { patentCount: 3750, grantedCount: 1680, pctCount: 120 },
    corePatents: [
      { id: 'pat-g1', name: '基于动态知识图谱的大规模复杂推理系统', no: 'CN116543210B', tags: ['IPC: G06N', '人工智能'] },
      { id: 'pat-g2', name: '基于多模态融合的自动驾驶车辆目标检测模型', no: 'CN113547890B', tags: ['IPC: G06V', '计算机视觉'] },
      { id: 'pat-g3', name: '一种基于联邦学习的医疗隐私数据协同训练方法', no: 'CN114321098B', tags: ['IPC: G06F', '数据处理'] },
    ]
  },
  {
    id: 'ipc-a01',
    title: 'A01：农业；林业',
    icon: <Leaf className="w-5 h-5" />,
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    textColor: 'text-amber-400',
    glowColor: 'shadow-[0_0_20px_rgba(245,158,11,0.2)]',
    description: '涉及农业机械、土壤作业及畜牧业。依托仿生工程交叉学科，吉大在仿生减阻深松铲(A01B)及智能农机装备领域独树一帜。',
    stats: { patentCount: 1980, grantedCount: 920, pctCount: 45 },
    corePatents: [
      { id: 'pat-h1', name: '基于土壤动物体表形态的仿生减阻深松铲', no: 'CN111245678B', tags: ['IPC: A01B', '仿生农机'] },
      { id: 'pat-h2', name: '智能型免耕播种机仿生破茬与防堵装置', no: 'CN109876543B', tags: ['IPC: A01C', '保护性耕作'] },
      { id: 'pat-h3', name: '复杂地形下无人驾驶拖拉机路径规划与避障控制', no: 'CN116789012B', tags: ['IPC: A01B', '智慧农业'] },
    ]
  }
];

const scatterData = [
  // G01N
  { year: '2017', domain: 'G01N', value: 238 }, { year: '2018', domain: 'G01N', value: 314 }, { year: '2019', domain: 'G01N', value: 303 }, { year: '2020', domain: 'G01N', value: 194 }, { year: '2021', domain: 'G01N', value: 231 }, { year: '2022', domain: 'G01N', value: 221 }, { year: '2023', domain: 'G01N', value: 204 }, { year: '2024', domain: 'G01N', value: 223 }, { year: '2025', domain: 'G01N', value: 165 }, { year: '2026', domain: 'G01N', value: 80 },
  // G06F
  { year: '2017', domain: 'G06F', value: 79 }, { year: '2018', domain: 'G06F', value: 79 }, { year: '2019', domain: 'G06F', value: 106 }, { year: '2020', domain: 'G06F', value: 99 }, { year: '2021', domain: 'G06F', value: 133 }, { year: '2022', domain: 'G06F', value: 171 }, { year: '2023', domain: 'G06F', value: 250 }, { year: '2024', domain: 'G06F', value: 318 }, { year: '2025', domain: 'G06F', value: 374 }, { year: '2026', domain: 'G06F', value: 226 },
  // A61B
  { year: '2017', domain: 'A61B', value: 105 }, { year: '2018', domain: 'A61B', value: 132 }, { year: '2019', domain: 'A61B', value: 254 }, { year: '2020', domain: 'A61B', value: 228 }, { year: '2021', domain: 'A61B', value: 208 }, { year: '2022', domain: 'A61B', value: 168 }, { year: '2023', domain: 'A61B', value: 231 }, { year: '2024', domain: 'A61B', value: 180 }, { year: '2025', domain: 'A61B', value: 96 }, { year: '2026', domain: 'A61B', value: 40 },
  // A61M
  { year: '2017', domain: 'A61M', value: 62 }, { year: '2018', domain: 'A61M', value: 107 }, { year: '2019', domain: 'A61M', value: 301 }, { year: '2020', domain: 'A61M', value: 265 }, { year: '2021', domain: 'A61M', value: 248 }, { year: '2022', domain: 'A61M', value: 144 }, { year: '2023', domain: 'A61M', value: 244 }, { year: '2024', domain: 'A61M', value: 147 },
  // A61G
  { year: '2017', domain: 'A61G', value: 44 }, { year: '2018', domain: 'A61G', value: 90 }, { year: '2019', domain: 'A61G', value: 198 }, { year: '2020', domain: 'A61G', value: 254 }, { year: '2021', domain: 'A61G', value: 203 }, { year: '2022', domain: 'A61G', value: 118 }, { year: '2023', domain: 'A61G', value: 183 }, { year: '2024', domain: 'A61G', value: 73 },
  // A61K
  { year: '2017', domain: 'A61K', value: 72 }, { year: '2018', domain: 'A61K', value: 62 }, { year: '2019', domain: 'A61K', value: 65 }, { year: '2020', domain: 'A61K', value: 52 }, { year: '2021', domain: 'A61K', value: 99 }, { year: '2022', domain: 'A61K', value: 65 }, { year: '2023', domain: 'A61K', value: 109 }, { year: '2024', domain: 'A61K', value: 145 }, { year: '2025', domain: 'A61K', value: 186 }, { year: '2026', domain: 'A61K', value: 116 },
  // G01V
  { year: '2017', domain: 'G01V', value: 80 }, { year: '2018', domain: 'G01V', value: 86 }, { year: '2019', domain: 'G01V', value: 112 }, { year: '2020', domain: 'G01V', value: 82 }, { year: '2021', domain: 'G01V', value: 53 }, { year: '2022', domain: 'G01V', value: 83 }, { year: '2023', domain: 'G01V', value: 81 }, { year: '2024', domain: 'G01V', value: 77 }, { year: '2025', domain: 'G01V', value: 142 }, { year: '2026', domain: 'G01V', value: 88 },
  // A61F
  { year: '2017', domain: 'A61F', value: 36 }, { year: '2018', domain: 'A61F', value: 53 }, { year: '2019', domain: 'A61F', value: 149 }, { year: '2020', domain: 'A61F', value: 149 }, { year: '2021', domain: 'A61F', value: 108 }, { year: '2022', domain: 'A61F', value: 113 }, { year: '2023', domain: 'A61F', value: 102 }, { year: '2024', domain: 'A61F', value: 85 },
  // B60W
  { year: '2018', domain: 'B60W', value: 47 }, { year: '2019', domain: 'B60W', value: 66 }, { year: '2020', domain: 'B60W', value: 62 }, { year: '2021', domain: 'B60W', value: 76 }, { year: '2022', domain: 'B60W', value: 60 }, { year: '2023', domain: 'B60W', value: 87 }, { year: '2024', domain: 'B60W', value: 87 }, { year: '2025', domain: 'B60W', value: 122 }, { year: '2026', domain: 'B60W', value: 76 },
  // G01M
  { year: '2017', domain: 'G01M', value: 151 }, { year: '2018', domain: 'G01M', value: 114 }, { year: '2019', domain: 'G01M', value: 131 }, { year: '2020', domain: 'G01M', value: 114 }, { year: '2021', domain: 'G01M', value: 71 }, { year: '2022', domain: 'G01M', value: 38 }
];

const Y_DOMAINS = ['G01N', 'G06F', 'A61B', 'A61M', 'A61G', 'A61K', 'G01V', 'A61F', 'B60W', 'G01M'];
const X_YEARS = ['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017'];
const IPC_DESCRIPTIONS: Record<string, string> = {
  'G01N': '借助于测定材料的化学或物理...',
  'G06F': '电数字数据处理（基于特定计...',
  'A61B': '诊断；外科；鉴定（分析生物...',
  'A61M': '将介质输入体内或输到人体...',
  'A61G': '专门适用于病人或残疾人的运...',
  'A61K': '医用、牙科用或化妆用的配制...',
  'G01V': '地球物理；重力测量；物质或...',
  'A61F': '可植入血管内的滤器；假体；为...',
  'B60W': '车辆控制系统...',
  'G01M': '机器或结构部件的静或动平衡...'
};


const getDomainStyles = (domain) => {
  switch(domain) {
    case 'G01N': return { bg: 'rgba(99, 102, 241, 0.45)', border: 'rgba(99, 102, 241, 0.9)', text: '#ffffff', shadow: 'rgba(99, 102, 241, 0.6)' };
    case 'G06F': return { bg: 'rgba(217, 70, 239, 0.45)', border: 'rgba(217, 70, 239, 0.9)', text: '#ffffff', shadow: 'rgba(217, 70, 239, 0.6)' };
    case 'A61B': return { bg: 'rgba(34, 197, 94, 0.45)', border: 'rgba(34, 197, 94, 0.9)', text: '#ffffff', shadow: 'rgba(34, 197, 94, 0.6)' };
    case 'A61M': return { bg: 'rgba(74, 222, 128, 0.45)', border: 'rgba(74, 222, 128, 0.9)', text: '#ffffff', shadow: 'rgba(74, 222, 128, 0.6)' };
    case 'A61G': return { bg: 'rgba(234, 179, 8, 0.45)', border: 'rgba(234, 179, 8, 0.9)', text: '#ffffff', shadow: 'rgba(234, 179, 8, 0.6)' };
    case 'A61K': return { bg: 'rgba(59, 130, 246, 0.45)', border: 'rgba(59, 130, 246, 0.9)', text: '#ffffff', shadow: 'rgba(59, 130, 246, 0.6)' };
    case 'G01V': return { bg: 'rgba(20, 184, 166, 0.45)', border: 'rgba(20, 184, 166, 0.9)', text: '#ffffff', shadow: 'rgba(20, 184, 166, 0.6)' };
    case 'A61F': return { bg: 'rgba(16, 185, 129, 0.45)', border: 'rgba(16, 185, 129, 0.9)', text: '#ffffff', shadow: 'rgba(16, 185, 129, 0.6)' };
    case 'B60W': return { bg: 'rgba(249, 115, 22, 0.45)', border: 'rgba(249, 115, 22, 0.9)', text: '#ffffff', shadow: 'rgba(249, 115, 22, 0.6)' };
    case 'G01M': return { bg: 'rgba(239, 68, 68, 0.45)', border: 'rgba(239, 68, 68, 0.9)', text: '#ffffff', shadow: 'rgba(239, 68, 68, 0.6)' };
    default: return { bg: 'rgba(148, 163, 184, 0.45)', border: 'rgba(148, 163, 184, 0.9)', text: '#ffffff', shadow: 'rgba(148, 163, 184, 0.6)' };
  }
};

const getScatterValue = (year, domain) => {
  const found = scatterData.find(d => d.year === year && d.domain === domain);
  return found ? found.value : 0;
};

const trendData = [
  { year: '2016', 申请量: 216, 授权量: 119 },
  { year: '2017', 申请量: 264, 授权量: 194 },
  { year: '2018', 申请量: 340, 授权量: 225 },
  { year: '2019', 申请量: 237, 授权量: 273 },
  { year: '2020', 申请量: 306, 授权量: 163 },
  { year: '2021', 申请量: 333, 授权量: 161 },
  { year: '2022', 申请量: 318, 授权量: 187 },
  { year: '2023', 申请量: 244, 授权量: 233 },
  { year: '2024', 申请量: 264, 授权量: 268 },
  { year: '2025', 申请量: 209, 授权量: 203 },
  { year: '2026', 申请量: 60,  授权量: 133 },
];

const getDomainChineseName = (domainCode: string) => {
  const found = techDomains.find(t => t.title.startsWith(domainCode));
  return found ? found.title.split('：')[1] : '';
};

const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/90 border border-slate-700 p-4 rounded-xl shadow-2xl backdrop-blur-md">
        <p className="text-slate-300 font-bold mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm mb-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
            <span className="text-slate-400">{entry.name}:</span>
            <span className="text-white font-mono font-bold">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

interface Props { 
  userRole?: UserRole; 
  onNavigateToSearch?: () => void; 
  onSelectPatent?: (patent: PatentItem) => void; 
  onNavigateToUnpatented?: () => void;
  onNavigateToDemandPublish?: () => void;
  alumniList?: AlumniEnterpriseRecord[];
  onAddAlumniRecord?: (record: AlumniEnterpriseRecord) => void;
}

export const JluTechMapPage: React.FC<Props> = ({ 
  userRole = 'university', 
  onNavigateToSearch, 
  onSelectPatent,
  onNavigateToUnpatented,
  onNavigateToDemandPublish,
  alumniList = INITIAL_ALUMNI_ENTERPRISES,
  onAddAlumniRecord
}) => {
  const [activeDomain, setActiveDomain] = useState(techDomains[0]);
  const [selectedTechForDetail, setSelectedTechForDetail] = useState<TechDetailData | null>(null);

  // Alumni Self-Reporting Modal State
  const [showAlumniModal, setShowAlumniModal] = useState(false);
  const [localAlumniList, setLocalAlumniList] = useState<AlumniEnterpriseRecord[]>(alumniList);

  const handleAddAlumni = (record: AlumniEnterpriseRecord) => {
    setLocalAlumniList([record, ...localAlumniList]);
    if (onAddAlumniRecord) {
      onAddAlumniRecord(record);
    }
  };

  // Booking Modal State
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedTechForBooking, setSelectedTechForBooking] = useState<TechDetailData | null>(null);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingFormData, setBookingFormData] = useState({
    companyName: '吉林省智能网联汽车产业研究院有限公司',
    contactPerson: '李总',
    contactPhone: '13904318888',
    collabMode: '线上视频技术研讨会',
    notes: '希望与吉大科研团队开展技术研讨与中试落地对接'
  });

  const handleOpenBooking = (tech: TechDetailData) => {
    setSelectedTechForBooking(tech);
    setBookingSubmitted(false);
    setShowBookingModal(true);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
    setTimeout(() => {
      setShowBookingModal(false);
      setBookingSubmitted(false);
    }, 2000);
  };

  const handlePatentClick = (pat: any) => {
    const mockPatent: PatentItem = {
      id: pat.id,
      patentNo: pat.no,
      title: pat.name,
      college: '吉林大学',
      inventor: '张发明 (示例)',
      team: '核心技术研发团队',
      field: 'automotive',
      fieldName: activeDomain.title,
      ipc: pat.tags[0]?.replace('IPC: ', '') || 'A01',
      applicationDate: '2023-01-10',
      grantDate: '2024-02-15',
      status: 'valid',
      trlLevel: 7,
      trlDescription: '已完成实验室小试，进入中试阶段。',
      baitengScore: { overall: 92, technical: 95, legal: 88, market: 90, barrier: 95 },
      valuationRange: '100万 - 300万',
      transferModes: ['transfer', 'exclusive_license'],
      abstract: `【核心专利】${pat.name}。该专利属于${activeDomain.title}技术领域的重点高潜转化成果。`,
      innovations: ['打破国外技术垄断', '显著提升关键性能指标', '具备极高的市场应用前景'],
      applicableIndustries: ['智能制造', '新能源', '高端装备'],
      viewCount: 1542,
      matchCount: 36,
      documents: [{ title: '专利公开说明书与权利要求书.pdf', size: '2.8 MB', type: 'PDF' }]
    };
    setSelectedTechForDetail(mapPatentToTechDetail(mockPatent));
  };

  // If Detail Page is Selected, render TechDetailPage as a full top-level page
  if (selectedTechForDetail) {
    return (
      <div className="w-full relative min-h-screen bg-slate-50">
        <TechDetailPage
          tech={selectedTechForDetail}
          onBack={() => {
            setSelectedTechForDetail(null);
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          }}
          onOpenBooking={(t) => handleOpenBooking(t)}
          universityScope="jlu"
        />

        {/* 预约技术转移中心对接弹窗 */}
        <AnimatePresence>
          {showBookingModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
              >
                <div className="bg-slate-900 p-5 text-white relative">
                  <button 
                    onClick={() => setShowBookingModal(false)}
                    className="absolute right-4 top-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-1.5 text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
                    <Building2 className="w-3.5 h-3.5 text-blue-400" />
                    官方产学研对接通道
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    预约吉林大学科技开发中心对接
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    成果转化专线：0431-85168225 • 专班科技经纪人全程跟进
                  </p>
                </div>

                {bookingSubmitted ? (
                  <div className="p-8 text-center space-y-4">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-7 h-7" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900">对接需求已提交成功</h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                      吉林大学科技开发中心专员与科研团队将根据工作排期与您取得联系，确认对接研讨安排与技术资料准备。
                    </p>
                    <div className="pt-2">
                      <Loader2 className="w-4 h-4 text-blue-600 animate-spin mx-auto" />
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitBooking} className="p-5 space-y-3.5">
                    {selectedTechForBooking && (
                      <div className="bg-blue-50/80 p-3 rounded-xl border border-blue-200/60 text-xs space-y-1">
                        <div className="text-blue-700 font-bold flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" /> 拟对接成果：
                        </div>
                        <div className="font-bold text-slate-800 text-xs leading-snug">{selectedTechForBooking.title}</div>
                        <div className="text-slate-500 font-mono text-[11px]">{selectedTechForBooking.no} • {selectedTechForBooking.university}</div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">企业全称</label>
                        <input 
                          type="text"
                          required
                          value={bookingFormData.companyName}
                          onChange={(e) => setBookingFormData({...bookingFormData, companyName: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">对接联系人</label>
                        <input 
                          type="text"
                          required
                          value={bookingFormData.contactPerson}
                          onChange={(e) => setBookingFormData({...bookingFormData, contactPerson: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-blue-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">联系电话</label>
                        <input 
                          type="tel"
                          required
                          value={bookingFormData.contactPhone}
                          onChange={(e) => setBookingFormData({...bookingFormData, contactPhone: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">期望对接形式</label>
                        <select
                          value={bookingFormData.collabMode}
                          onChange={(e) => setBookingFormData({...bookingFormData, collabMode: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-blue-600"
                        >
                          <option value="线上视频技术研讨会">线上闭门技术研讨会</option>
                          <option value="专家进企现场指导">高校专家进企现场指导</option>
                          <option value="来校考察与实验室参观">来校考察与重点实验室参观</option>
                          <option value="专利排他转让/许可商务谈判">专利转让 / 许可商务谈判</option>
                          <option value="校企联合攻关申报专项">校企联合申报科技重大专项</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">需求细节与预期目标</label>
                      <textarea 
                        rows={2}
                        value={bookingFormData.notes}
                        onChange={(e) => setBookingFormData({...bookingFormData, notes: e.target.value})}
                        placeholder="请简要阐述企业目前的具体指标要求或产业化场景..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-blue-600 resize-none"
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-end gap-2.5">
                      <button 
                        type="button"
                        onClick={() => setShowBookingModal(false)}
                        className="px-3.5 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 cursor-pointer"
                      >
                        取消
                      </button>
                      <button 
                        type="submit"
                        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" /> 确认提交
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="w-full relative">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse duration-10000 z-0"></div>
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 relative z-10 space-y-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-blue-500/30 text-blue-300 text-xs font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <Network className="w-4 h-4" />
            全球技术底座 / Tech Nexus
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-blue-400 drop-shadow-sm pb-2">
            吉林大学核心成果技术全景图谱
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed max-w-3xl font-light">
            基于自然语言处理与引用网络分析，深度挖掘 <span className="text-cyan-400 font-mono font-bold tracking-wider">4.9万+</span> 存量专利数据。<br className="hidden sm:block" />
            自动聚合吉林大学最具转化潜力的 <span className="text-blue-300 font-bold">高价值技术群</span>，为您提供精准的技术导航与资产透视。
          </p>
          {userRole !== 'university' && (
          <div className="pt-2 pb-4 flex flex-wrap justify-center items-center gap-4">
            <button className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] active:scale-95 border border-white/10 cursor-pointer">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              <span className="relative z-10 flex items-center gap-2 drop-shadow-md">
                <Handshake className="w-6 h-6" />
                发起合作意向
              </span>
            </button>

            <button 
              onClick={onNavigateToSearch}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-slate-800 text-white font-bold text-lg rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95 border border-slate-600 hover:border-slate-400 cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2 drop-shadow-md">
                <Search className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                匹配技术
              </span>
            </button>

            {/* 校友企业自主标注入口 */}
            <button 
              onClick={() => setShowAlumniModal(true)}
              className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-base rounded-full overflow-hidden transition-all duration-300 hover:scale-105 border border-amber-500/40 hover:border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.15)] cursor-pointer"
            >
              <GraduationCap className="w-5 h-5 text-amber-400" />
              <span>校友身份自主标注 / 校友企业库</span>
              <span className="px-2 py-0.5 bg-amber-400/20 text-amber-200 text-xs rounded-full border border-amber-400/30">
                {localAlumniList.length}
              </span>
            </button>
          </div>
)}
        </div>

        {/* IP Overview Section */}
        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-400" />
            知识产权全景
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: 当前有效专利 (中国) */}
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/50 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none transition-all group-hover:bg-blue-500/15"></div>
              <div className="absolute right-4 top-4 text-blue-400/10 pointer-events-none group-hover:text-blue-400/15 transition-colors duration-500">
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
                <h3 className="text-[15px] font-medium text-slate-300 mb-2">当前有效专利 ( 中国 )</h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-mono font-black text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.6)]">14895</span>
                  <span className="text-base font-normal text-slate-400 font-sans">件</span>
                </div>
                
                <div className="grid grid-cols-3 gap-6 pt-5 border-t border-slate-700/50">
                  <div className="border-l-4 border-blue-500 pl-3">
                    <div className="text-[14px] text-slate-400 mb-1">发明</div>
                    <div className="font-bold text-slate-100 text-2xl font-mono">
                      12239 <span className="text-xs font-normal text-slate-400 font-sans">件</span>
                    </div>
                  </div>
                  <div className="border-l-4 border-cyan-400 pl-3">
                    <div className="text-[14px] text-slate-400 mb-1">实用新型</div>
                    <div className="font-bold text-slate-100 text-2xl font-mono">
                      2566 <span className="text-xs font-normal text-slate-400 font-sans">件</span>
                    </div>
                  </div>
                  <div className="border-l-4 border-emerald-400 pl-3">
                    <div className="text-[14px] text-slate-400 mb-1">外观设计</div>
                    <div className="font-bold text-slate-100 text-2xl font-mono">
                      90 <span className="text-xs font-normal text-slate-400 font-sans">件</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: 2026年度新增授权专利 (中国) */}
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/50 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none transition-all group-hover:bg-cyan-500/15"></div>
              <div className="absolute right-4 top-4 text-cyan-400/10 pointer-events-none group-hover:text-cyan-400/15 transition-colors duration-500">
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
                <h3 className="text-[15px] font-medium text-slate-300 mb-2">2026年度新增授权专利 ( 中国 )</h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-mono font-black text-cyan-400 drop-shadow-[0_0_12px_rgba(6,182,212,0.6)]">2079</span>
                  <span className="text-base font-normal text-slate-400 font-sans">件</span>
                </div>
                
                <div className="grid grid-cols-3 gap-6 pt-5 border-t border-slate-700/50">
                  <div className="border-l-4 border-blue-500 pl-3">
                    <div className="text-[14px] text-slate-400 mb-1">发明</div>
                    <div className="font-bold text-slate-100 text-2xl font-mono">
                      1902 <span className="text-xs font-normal text-slate-400 font-sans">件</span>
                    </div>
                  </div>
                  <div className="border-l-4 border-cyan-400 pl-3">
                    <div className="text-[14px] text-slate-400 mb-1">实用新型</div>
                    <div className="font-bold text-slate-100 text-2xl font-mono">
                      150 <span className="text-xs font-normal text-slate-400 font-sans">件</span>
                    </div>
                  </div>
                  <div className="border-l-4 border-emerald-400 pl-3">
                    <div className="text-[14px] text-slate-400 mb-1">外观设计</div>
                    <div className="font-bold text-slate-100 text-2xl font-mono">
                      27 <span className="text-xs font-normal text-slate-400 font-sans">件</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Analytics Charts Section */}
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
          
          {/* Chart 1: R&D Trend - Custom Bubble Grid (Guaranteed Rendering) */}
          <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/50 shadow-2xl relative overflow-hidden group flex flex-col">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-400/20 transition-all duration-700"></div>
            <div className="flex flex-col mb-4 relative z-10 shrink-0">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-400" />
                核心科技成果演进趋势
              </h3>
              <p className="text-xs text-slate-400 mt-1">图表展示的是分析对象在不同技术方向专利量的分布情况和发展情况。分析各阶段的技术分布情况，有助于了解特定时期的重要技术分布，挖掘近期的热门技术方向和发展动向，有助于对自身技术发展有一个整体认识，并对研发重点和研发路线进行适应性调整，对比各技术方向的发展趋势有助于识别哪些技术发展更早更成熟。</p>
            </div>
            
            {/* Custom SVG-free Bubble Grid to avoid Recharts bugs */}
            <div className="w-full flex-1 relative z-10 flex flex-col min-h-[260px] pt-2">
              <div className="flex-1 flex relative">
                {/* Y Axis Labels */}
                <div className="w-20 sm:w-24 flex flex-col justify-around py-2 border-r border-slate-700/50 shrink-0 z-10">
                  {Y_DOMAINS.map(domain => (
                    <div key={domain} className="text-right pr-2 sm:pr-3 flex flex-col justify-center">
                      <span className="text-[10px] sm:text-xs text-slate-300 font-mono font-bold">{domain}</span>
                      <span className="text-[9px] text-slate-500 font-medium truncate" title={IPC_DESCRIPTIONS[domain] || getDomainChineseName(domain)}>{(IPC_DESCRIPTIONS[domain] || getDomainChineseName(domain)).substring(0, 6)}</span>
                    </div>
                  ))}
                </div>

                {/* Grid Area */}
                <div className="flex-1 flex justify-between px-2 sm:px-4 relative">
                   {/* Horizontal Grid Lines */}
                   <div className="absolute inset-0 flex flex-col justify-around py-2 pointer-events-none">
                     {Y_DOMAINS.map((_, i) => (
                       <div key={i} className="w-full border-b border-slate-700/30 border-dashed h-0"></div>
                     ))}
                   </div>

                   {/* Columns (Years) */}
                   {X_YEARS.map(year => (
                     <div key={year} className="flex-1 flex flex-col justify-around items-center py-2 relative group/col">
                       {/* Column hover highlight */}
                       <div className="absolute inset-y-0 w-full max-w-[40px] bg-slate-800/0 group-hover/col:bg-slate-800/40 rounded-lg transition-colors z-0"></div>
                       
                       {/* Bubbles */}
                       {Y_DOMAINS.map(domain => {
                         const val = getScatterValue(year, domain);
                         // Math formula to map value (3 - 120) to pixel size (12 - 50)
                         const size = val > 0 ? Math.max(16, Math.min(75, Math.sqrt(val) * 3.5)) : 0;
                         const styles = getDomainStyles(domain);
                         
                         return (
                           <div key={`${year}-${domain}`} className="h-10 w-full flex items-center justify-center relative z-10 group/bubble">
                             {val > 0 && (
                               <>
                                 <div
                                   style={{ 
                                     width: size, 
                                     height: size, 
                                     backgroundColor: styles.bg, 
                                     borderColor: styles.border, 
                                     color: styles.text,
                                     boxShadow: `0 0 15px ${styles.shadow}, inset 0 0 10px ${styles.shadow}`
                                   }}
                                   className="rounded-full flex items-center justify-center font-mono text-[11px] sm:text-xs font-bold transition-all duration-300 hover:scale-[1.15] cursor-pointer peer relative z-20 border-[1.5px] backdrop-blur-[2px] hover:brightness-125"
                                 >
                                   {size > 20 ? val : ''}
                                 </div>
                                 
                                 {/* Custom High-Tech Tooltip */}
                                 <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max bg-slate-900/95 border border-slate-700 text-slate-300 text-xs px-3 py-2 rounded-xl shadow-2xl backdrop-blur-md opacity-0 invisible group-hover/bubble:opacity-100 group-hover/bubble:visible transition-all duration-300 z-[100] pointer-events-none transform translate-y-2 group-hover/bubble:translate-y-0 flex flex-col gap-1.5 items-center">
                                   <div className="font-bold text-white tracking-wider flex items-center gap-1.5">
                                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: styles.border }}></span>
                                      {year}年 {domain} - {IPC_DESCRIPTIONS[domain] || getDomainChineseName(domain)}
                                   </div>
                                   <div className="flex items-baseline gap-1 bg-slate-800/50 px-2 py-0.5 rounded text-[10px]">
                                     新增成果 <span className="font-mono text-cyan-400 text-sm font-black mx-0.5">{val}</span> 项
                                   </div>
                                   {/* Tooltip Arrow */}
                                   <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-solid border-t-slate-700 border-t-8 border-x-transparent border-x-8 border-b-0"></div>
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
              <div className="flex ml-20 sm:ml-24 px-2 sm:px-4 shrink-0 mt-3">
                 {X_YEARS.map(year => (
                   <div key={year} className="flex-1 text-center text-[10px] sm:text-xs text-slate-400 font-mono font-bold">
                     {year}
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>

        {/* 最新技术成果模块 (含专利技术及非专利技术/成果内容) */}
        <LatestTechAchievementsSection
          userRole={userRole}
          onSelectPatent={onSelectPatent}
          onSelectTechDetail={(tech) => setSelectedTechForDetail(tech)}
          onNavigateToSearch={onNavigateToSearch}
          onNavigateToUnpatented={onNavigateToUnpatented}
        />

        {/* Main Interactive Matrix */}
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-700/50 shadow-2xl flex flex-col min-h-[500px] animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
          
          {/* Nav Tabs */}
          <div className="flex gap-3 overflow-x-auto pt-2 pb-6 px-1 scrollbar-hide shrink-0 border-b border-slate-800">
            {techDomains.map(domain => (
              <button
                key={domain.id}
                onClick={() => setActiveDomain(domain)}
                className={`px-6 py-3.5 rounded-2xl text-sm font-bold whitespace-nowrap transition-all duration-300 flex items-center gap-2 border backdrop-blur-sm ${
                  activeDomain.id === domain.id
                    ? `bg-slate-800 border-${domain.color.split(' ')[1].split('-')[1]}-500/50 ${domain.textColor} ${domain.glowColor} -translate-y-1`
                    : 'bg-slate-800/30 border-slate-700/50 text-slate-500 hover:bg-slate-800/80 hover:text-slate-300'
                }`}
              >
                {domain.icon}
                {domain.title}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 mt-8 animate-in fade-in zoom-in-95 duration-500" key={activeDomain.id}>
             <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-10">
                <div className="space-y-4 max-w-2xl">
                  <h3 className={`text-3xl font-black ${activeDomain.textColor} flex items-center gap-3 drop-shadow-md`}>
                    {activeDomain.title} 成果剖析
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {activeDomain.description}
                  </p>
                </div>
                
                {/* Digital Stats Display */}
                <div className="grid grid-cols-3 gap-4 shrink-0">
                   <div className={`p-5 rounded-2xl ${activeDomain.bgColor} ${activeDomain.borderColor} border backdrop-blur-md text-center flex flex-col justify-center`}>
                     <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider">专利总数</div>
                     <div className={`text-3xl font-mono font-black ${activeDomain.textColor}`}>{activeDomain.stats.patentCount}</div>
                   </div>
                   <div className={`p-5 rounded-2xl ${activeDomain.bgColor} ${activeDomain.borderColor} border backdrop-blur-md text-center flex flex-col justify-center`}>
                     <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider">发明授权专利</div>
                     <div className={`text-3xl font-mono font-black ${activeDomain.textColor}`}>{activeDomain.stats.grantedCount}</div>
                   </div>
                   <div className={`p-5 rounded-2xl ${activeDomain.bgColor} ${activeDomain.borderColor} border backdrop-blur-md text-center flex flex-col justify-center`}>
                     <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider">有产品</div>
                     <div className={`text-3xl font-mono font-black ${activeDomain.textColor}`}>{activeDomain.stats.pctCount}</div>
                   </div>
                </div>
             </div>

             <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                   <div className="h-px bg-slate-800 flex-1"></div>
                   <h4 className="text-xs font-bold text-slate-500 tracking-widest uppercase flex items-center gap-2">
                     <Star className="w-3 h-3" />
                     高潜转化成果节点 (Top 3)
                   </h4>
                   <div className="h-px bg-slate-800 flex-1"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {activeDomain.corePatents.map(pat => (
                    <div key={pat.id} onClick={() => handlePatentClick(pat)} className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-blue-500/50 hover:bg-slate-800/80 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300 cursor-pointer group flex flex-col justify-between relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/5 to-transparent pointer-events-none"></div>
                       
                       <div>
                         <div className="flex items-center justify-between mb-4">
                           <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/50 px-2 py-1 rounded border border-cyan-900/50 group-hover:bg-cyan-900 transition-colors">
                             {pat.no}
                           </span>
                           <CheckCircle2 className="w-4 h-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition-all transform scale-50 group-hover:scale-100" />
                         </div>
                         <h5 className="font-bold text-slate-200 group-hover:text-white transition-colors line-clamp-2 text-sm leading-relaxed mb-5">
                           {pat.name}
                         </h5>
                       </div>
                       
                       <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-700/50">
                         <div className="flex gap-2 flex-wrap">
                           {pat.tags.map(tag => (
                             <span key={tag} className="text-[9px] font-mono font-semibold bg-slate-900 text-slate-400 px-2 py-1 rounded-full border border-slate-800 group-hover:border-slate-600 transition-colors">
                               {tag}
                             </span>
                           ))}
                         </div>
                         <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors shrink-0 -translate-x-2 group-hover:translate-x-0" />
                       </div>
                    </div>
                  ))}
                </div>
             </div>
             
          </div>
        </div>
      </div>

      {/* Alumni Self Register Modal */}
      <AlumniSelfRegisterModal
        isOpen={showAlumniModal}
        onClose={() => setShowAlumniModal(false)}
        alumniList={localAlumniList}
        onAddAlumniRecord={handleAddAlumni}
        onNavigateToDemandPublish={onNavigateToDemandPublish}
      />
    </div>
  );
};
