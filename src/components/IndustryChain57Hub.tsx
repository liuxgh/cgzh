import { CopyableText } from './CopyableText';
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { TargetEnterprise, PatentItem } from '../types';
import { RegionFilter } from './RegionFilter';
import { PatentNationalDistributionCard } from './PatentNationalDistributionCard';
import { INDUSTRY_CHAINS_57_DATA, INDUSTRY_CATEGORIES, IndustryChain57Item } from '../data/industryChains57Data';
import { TARGET_ENTERPRISES_DATA } from '../data/targetEnterprisesData';
import { INITIAL_PATENTS } from '../data/mockData';
import { 
  Layers, 
  Search,
  Inbox,
  ChevronLeft,
  Building2, 
  Sparkles, 
  ChevronRight, 
  CheckCircle2, 
  Award, 
  Cpu, 
  Zap, 
  Filter,
  ChevronDown,
  Download,
  FileText,
  Workflow,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface IndustryChain57HubProps {
  patents?: PatentItem[];
  selectedPatent?: PatentItem | null;
  onSelectPatent?: (patent: PatentItem) => void;
  onSelectEnterprise: (enterprise: TargetEnterprise) => void;
  onOpenAiActionPlan?: (enterprise: TargetEnterprise) => void;
}

// Map each known JLU patent to its optimal industry chain & node
interface PatentChainMappingInfo {
  chainId: string;
  chainName: string;
  category: string;
  recommendedNode: 'upstream' | 'midstream' | 'downstream';
  nodeTitle: string;
  nodeReason: string;
  applicationScenarios: string[];
}

const PATENT_CHAIN_MAP: Record<string, PatentChainMappingInfo> = {
  'pat-001': {
    chainId: 'chain-2',
    chainName: '新能源汽车',
    category: '新能源汽车',
    recommendedNode: 'midstream',
    nodeTitle: '中游 • 精密制造与模块总成 (线控底盘/电液制动执行系统)',
    nodeReason: '线控电液复合制动系统属于新能源商用车中游核心电控与底盘执行总成，可直接对接中游制动模块制造厂与下游整车集成厂。',
    applicationScenarios: ['新能源重卡与物流车线控底盘', '高附着/低附着自适应防侧滑制动', '商用车制动能量回馈回收']
  },
  'pat-002': {
    chainId: 'chain-18',
    chainName: '纳米新材料',
    category: '新材料',
    recommendedNode: 'upstream',
    nodeTitle: '上游 • 核心材料与元器件 (超分子TADF高纯发光原料与升华材料)',
    nodeReason: '高纯度TADF超分子发光材料属于显示面板产业最上游核心发光原料与升华耗材，是突破高端OLED显示屏核心材料瓶颈的关键节点。',
    applicationScenarios: ['OLED高端高世代面板蒸镀', '超高清显示模组封装', 'VR/AR近眼微显示芯片']
  },
  'pat-003': {
    chainId: 'chain-16',
    chainName: '传感器',
    category: '电子信息与智能算力',
    recommendedNode: 'midstream',
    nodeTitle: '中游 • 精密装备与系统集成 (皮秒激光超快微纳加工与微结构光栅)',
    nodeReason: '皮秒超快激光微纳传感芯片处于光电与传感器中游精密加工与微结构器件制造节点，可大幅提升微纳传感器灵敏度与量产一致性。',
    applicationScenarios: ['光栅干涉位移传感器制造', '微纳光学器件超精细加工', '精密半导体激光装备配套']
  },
  'pat-004': {
    chainId: 'chain-1',
    chainName: '高端医疗器械',
    category: '生物医药与健康',
    recommendedNode: 'upstream',
    nodeTitle: '上游 • 核心材料与天然原料 (道地药材稀有皂苷生物转化与纳米载药体)',
    nodeReason: '人参稀有皂苷Rg3/Rh2酶促转化与纳米脂质体属于医药上游高活性道地药材提取与原料药递送载体环节，赋能下游创新抗肿瘤药物开发。',
    applicationScenarios: ['抗肿瘤靶向纳米创新药', '现代中药新药配方颗粒', '高纯生物医药原料提取']
  },
  'pat-005': {
    chainId: 'chain-10',
    chainName: '数控机床',
    category: '高端装备制造',
    recommendedNode: 'midstream',
    nodeTitle: '中游 • 核心部件与智能机具 (黑土地免耕播种防堵与智能压实总成)',
    nodeReason: '免耕少耕播种机防堵与智能压实装置属于智能农业机械中游核心工作机具与智能农机部件总成，可为大型农机制造龙头提供配套。',
    applicationScenarios: ['黑土地保护性免耕播种机整机', '大马力拖拉机配套智能机具', '智能仿生农机核心破土压实部件']
  },
  'pat-006': {
    chainId: 'chain-19',
    chainName: '船舶海工',
    category: '高端装备制造',
    recommendedNode: 'midstream',
    nodeTitle: '中游 • 核心装备与动力感知 (深部科学钻探智能化自适应控制与井下感知)',
    nodeReason: '深部科学钻探智能化自适应钻进系统属于深地特种探测装备中游自适应控制与井下传感总成，解决极端地层卡钻断钻工程难题。',
    applicationScenarios: ['深部地质科学钻探装备', '极地与极端工况特种钻机配套', '特种勘探装备智能化控制升级']
  },
  'pat-007': {
    chainId: 'chain-2',
    chainName: '新能源汽车',
    category: '新能源汽车',
    recommendedNode: 'upstream',
    nodeTitle: '上游 • 核心材料与大型压铸件 (耐热稀土镁合金材料与车身一体化压铸工艺)',
    nodeReason: '耐热稀土镁合金车身大型一体化压铸技术属于轻量化汽车上游高强结构材料熔炼与大型压铸件，满足车企减重增程硬性需求。',
    applicationScenarios: ['新能源汽车一体化压铸车身', '轻量化底盘支架与电池包壳体', '低空飞行器与无人机超轻结构件']
  },
  'pat-008': {
    chainId: 'chain-8',
    chainName: '工业视觉系统',
    category: '电子信息与智能算力',
    recommendedNode: 'midstream',
    nodeTitle: '中游 • 装备制造与软硬一体 (小样本多模态工业缺陷智能AOI检测系统)',
    nodeReason: '小样本工业表面微瑕疵视觉智能检测属于工业视觉中游AOI检测装备、智能检测仪器与软硬件一体系统，直接对标精密制造产线质检。',
    applicationScenarios: ['半导体晶圆与封装外观质检', '精密汽车零部件微瑕疵在线筛查', '3C电子产线高精度在线质检']
  },
  'pat-009': {
    chainId: 'chain-16',
    chainName: '传感器',
    category: '电子信息与智能算力',
    recommendedNode: 'downstream',
    nodeTitle: '下游 • 终端仪器与勘探工程 (航空低温超导全张量磁力梯度仪及构造反演)',
    nodeReason: '航空低温超导全张量磁力梯度仪属于地球深部探测下游高端集成仪器与勘探工程服务，服务国家重大战略资源普查。',
    applicationScenarios: ['航空航天地球物理勘探', '战略性矿产资源深部精细普查', '重大工程地质隐患探测']
  },
  'pat-010': {
    chainId: 'chain-1',
    chainName: '高端医疗器械',
    category: '生物医药与健康',
    recommendedNode: 'midstream',
    nodeTitle: '中游 • 装备制造与伺服机构 (微创手术辅助穿刺机器人末端柔顺力控与导航)',
    nodeReason: '骨科微创手术辅助穿刺机器人末端柔顺力控装置属于手术机器人中游力感知机械臂与导航伺服系统，赋能医疗机器人整机厂商。',
    applicationScenarios: ['脊柱微创手术导航系统', '骨科精准穿刺手术机器人', '医用高精度力控机械臂总成']
  },
  'pat-011': {
    chainId: 'chain-1',
    chainName: '高端医疗器械',
    category: '生物医药与健康',
    recommendedNode: 'upstream',
    nodeTitle: '上游 • 核心材料与递送载体 (重组人白蛋白与多肽偶联纳米靶向系统)',
    nodeReason: '重组人白蛋白特异性多肽偶联纳米递送系统处于生物创新药研发上游靶向载体与偶联赋形剂环节，显著提升大分子药物靶向富集效率。',
    applicationScenarios: ['抗肿瘤靶向纳米偶联药物', '大分子蛋白药物递送系统', '创新生物制剂靶向改良']
  },
  'pat-012': {
    chainId: 'chain-6',
    chainName: '碳纤维',
    category: '新材料',
    recommendedNode: 'upstream',
    nodeTitle: '上游 • 高性能聚合物与预浸料 (耐500℃ PEEK热塑性复合材料预浸料与连续拉挤)',
    nodeReason: '耐500℃ PEEK热塑性复合材料预浸料属于高性能复合材料上游特种工程塑料与连续纤维预浸带制造，打破航空航天关键材料封锁。',
    applicationScenarios: ['航空航天高温结构件', '新能源汽车高耐热耐压部件', '高端特种工业拉挤管材与型材']
  }
};

export const IndustryChain57Hub: React.FC<IndustryChain57HubProps> = ({
  patents = INITIAL_PATENTS,
  selectedPatent,
  onSelectPatent,
  onSelectEnterprise,
  onOpenAiActionPlan
}) => {
  // Patent Selection State
  const [currentPatentId, setCurrentPatentId] = useState<string>(selectedPatent?.id || patents[0]?.id || 'pat-001');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [patentSearchQuery, setPatentSearchQuery] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync selectedPatent prop
  useEffect(() => {
    if (selectedPatent?.id) {
      setCurrentPatentId(selectedPatent.id);
    }
  }, [selectedPatent]);

  // Dropdown outside click handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const activePatent = useMemo(() => {
    return patents.find(p => p.id === currentPatentId) || patents[0] || INITIAL_PATENTS[0];
  }, [patents, currentPatentId]);

  const filteredPatents = useMemo(() => {
    return patents.filter(p => 
      p.title.toLowerCase().includes(patentSearchQuery.toLowerCase()) || 
      p.patentNo.toLowerCase().includes(patentSearchQuery.toLowerCase()) ||
      p.inventor.toLowerCase().includes(patentSearchQuery.toLowerCase()) ||
      (p.fieldName && p.fieldName.toLowerCase().includes(patentSearchQuery.toLowerCase()))
    );
  }, [patents, patentSearchQuery]);

  // Determine smart recommended chain & node based on selected patent
  const recommendedMapping = useMemo<PatentChainMappingInfo>(() => {
    if (PATENT_CHAIN_MAP[activePatent.id]) {
      return PATENT_CHAIN_MAP[activePatent.id];
    }
    // Dynamic fallback matching based on field or title keywords
    const title = activePatent.title || '';
    const field = activePatent.field || '';
    if (field.includes('auto') || title.includes('车') || title.includes('制动') || title.includes('底盘')) {
      return {
        chainId: 'chain-2',
        chainName: '新能源汽车',
        category: '新能源汽车',
        recommendedNode: 'midstream',
        nodeTitle: '中游 • 精密制造与模块总成',
        nodeReason: `该专利涉及智能网联与新能源汽车关键技术，推荐对接汽车产业链中下游零部件及整车企业。`,
        applicationScenarios: ['新能源汽车关键总成', '整车集成与智能制造']
      };
    }
    if (field.includes('material') || title.includes('材料') || title.includes('高分子') || title.includes('合金')) {
      return {
        chainId: 'chain-6',
        chainName: '碳纤维',
        category: '新材料',
        recommendedNode: 'upstream',
        nodeTitle: '上游 • 核心材料与元器件',
        nodeReason: `该专利属于高性能新材料领域，处于产业链上游关键基础材料供给节点。`,
        applicationScenarios: ['高性能复合材料制造', '特种功能结构件']
      };
    }
    if (field.includes('bio') || field.includes('medical') || title.includes('药') || title.includes('医') || title.includes('生化')) {
      return {
        chainId: 'chain-1',
        chainName: '高端医疗器械',
        category: '生物医药与健康',
        recommendedNode: 'upstream',
        nodeTitle: '上游 • 核心材料与天然原料',
        nodeReason: `该专利属于现代生物医药与医疗健康领域，具备良好的临床转化与药械协同前景。`,
        applicationScenarios: ['创新药物研发', '高端医疗器械配套']
      };
    }
    // Default fallback
    return {
      chainId: 'chain-2',
      chainName: '新能源汽车',
      category: '全部产业链',
      recommendedNode: 'midstream',
      nodeTitle: '中游 • 装备制造与系统集成',
      nodeReason: `该专利具备较强的工程实用性，可广泛对接战略产业链中下游制造企业。`,
      applicationScenarios: ['工业智能装备制造', '系统总成与工艺集成']
    };
  }, [activePatent]);

  // Category & Chain & Node states
  const [selectedCategory, setSelectedCategory] = useState<string>('全部产业链');
  const [selectedChainId, setSelectedChainId] = useState<string>('chain-2');
  const [selectedNode, setSelectedNode] = useState<'all' | 'upstream' | 'midstream' | 'downstream'>('all');
  const [enterpriseSearchKeyword, setEnterpriseSearchKeyword] = useState<string>('');
  const [regionFilter, setRegionFilter] = useState<{p: string, c: string, d: string}>({p: 'all', c: 'all', d: 'all'});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  // Auto-switch chain and node recommendation when patent changes
  useEffect(() => {
    if (recommendedMapping) {
      setSelectedChainId(recommendedMapping.chainId);
      if (recommendedMapping.category && recommendedMapping.category !== '全部产业链') {
        setSelectedCategory(recommendedMapping.category);
      }
      setSelectedNode(recommendedMapping.recommendedNode);
    }
  }, [recommendedMapping]);

  const activeChain = useMemo(() => {
    return INDUSTRY_CHAINS_57_DATA.find(c => c.id === selectedChainId) || INDUSTRY_CHAINS_57_DATA[0];
  }, [selectedChainId]);

  const filteredChains = useMemo(() => {
    return INDUSTRY_CHAINS_57_DATA.filter(chain => {
      if (selectedCategory !== '全部产业链' && chain.category !== selectedCategory) return false;
      return true;
    });
  }, [selectedCategory]);

  const handlePatentChange = (id: string) => {
    setCurrentPatentId(id);
    const p = patents.find(item => item.id === id);
    if (p && onSelectPatent) {
      onSelectPatent(p);
    }
  };

  // Calculate node counts derived directly from TARGET_ENTERPRISES_DATA (matching chainPosition)
  const nodeCounts = useMemo(() => {
    const upstream = TARGET_ENTERPRISES_DATA.filter(e => e.chainPosition?.node === 'upstream').length;
    const midstream = TARGET_ENTERPRISES_DATA.filter(e => e.chainPosition?.node === 'midstream').length;
    const downstream = TARGET_ENTERPRISES_DATA.filter(e => e.chainPosition?.node === 'downstream').length;
    return {
      upstream,
      midstream,
      downstream,
      total: upstream + midstream + downstream
    };
  }, []);

  // Full target enterprises matched to this chain/node (used for the national map visualizer)
  const nodeMatchedEnterprises = useMemo(() => {
    return TARGET_ENTERPRISES_DATA.filter(ent => {
      if (!ent.chainPosition) return false;
      if (selectedNode !== 'all' && ent.chainPosition.node !== selectedNode) return false;
      return true;
    });
  }, [selectedNode]);

  // Target enterprises matched to this chain & filtered by search and region
  const chainEnterprises = useMemo(() => {
    return TARGET_ENTERPRISES_DATA.filter(ent => {
      if (!ent.chainPosition) return false;
      if (selectedNode !== 'all' && ent.chainPosition.node !== selectedNode) return false;
      
      if (enterpriseSearchKeyword.trim() && !ent.name.includes(enterpriseSearchKeyword.trim())) return false;

      if (regionFilter.p !== 'all' && !ent.province?.includes(regionFilter.p) && !ent.city?.includes(regionFilter.p)) return false;
      if (regionFilter.c !== 'all' && !ent.city?.includes(regionFilter.c)) return false;
      if (regionFilter.d !== 'all' && !ent.address?.includes(regionFilter.d) && !ent.location?.includes(regionFilter.d)) return false;

      return true;
    });
  }, [selectedNode, enterpriseSearchKeyword, regionFilter]);

  const totalPages = Math.ceil(chainEnterprises.length / itemsPerPage);
  const currentEnterprises = chainEnterprises.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [regionFilter.p, regionFilter.c, regionFilter.d, selectedNode, selectedChainId, enterpriseSearchKeyword]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Module Header */}
      <div className="bg-linear-to-r from-[#17133C] via-[#2A246B] to-[#161238] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-indigo-400/30">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full bg-white/15 text-indigo-100 text-sm font-bold border border-white/20 flex items-center gap-1.5 backdrop-blur-xs">
            <Layers className="w-4 h-4 text-indigo-300" />
            <span>核心寻客路径二：细分战略产业链图谱</span>
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
          通过吉大专利 ➔ 产业链全链条图谱找企业
        </h2>
        <p className="text-sm sm:text-base text-indigo-100/90 mt-2 max-w-3xl leading-relaxed">
          先检索并选择待转化的吉林大学专利成果，系统将自动穿透关联 57 条战略产业链图谱，智能定位上游关键材料、中游精密制造与下游整机集成节点中的靶向企业。
        </p>
      </div>

      {/* Step 1: Search & Select JLU Patent */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#D8E2F0] shadow-xs space-y-4">
        <div className="w-full space-y-1.5 relative" ref={dropdownRef}>
          <label className="text-sm font-bold text-slate-700 flex items-center justify-between gap-1.5">
            <span className="flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#0F52BA]" />
              <span>第一步：检索并选择待转化的吉林大学专利：</span>
            </span>
            <span className="text-xs text-slate-500 font-normal">
              已选专利将自动穿透关联 57 条战略产业链图谱
            </span>
          </label>

          <div 
            className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 font-medium focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white transition-all cursor-pointer flex items-center justify-between gap-2"
            onClick={() => setIsDropdownOpen(true)}
          >
            <div className="truncate flex-1">
              {activePatent ? (
                <span className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                  <span className="font-mono text-[#0F52BA] bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60 text-xs font-bold shrink-0">
                    {activePatent.patentNo}
                  </span>
                  <span className="font-bold text-slate-800 truncate">{activePatent.title}</span>
                  <span className="text-xs text-slate-500 shrink-0">({activePatent.inventor})</span>
                </span>
              ) : (
                '请选择或搜索专利...'
              )}
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform shrink-0 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </div>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden flex flex-col max-h-[350px]">
              <div className="p-2 border-b border-slate-100 bg-slate-50 sticky top-0 z-10">
                 <div className="relative">
                   <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                   <input 
                     type="text"
                     autoFocus
                     placeholder="输入专利名称、专利号或发明人进行模糊检索..."
                     value={patentSearchQuery}
                     onChange={e => setPatentSearchQuery(e.target.value)}
                     className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                   />
                 </div>
              </div>
              <div className="overflow-y-auto p-1.5">
                {filteredPatents.length > 0 ? (
                  filteredPatents.map(p => (
                    <div 
                      key={p.id}
                      onClick={() => {
                        handlePatentChange(p.id);
                        setIsDropdownOpen(false);
                        setPatentSearchQuery('');
                      }}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${currentPatentId === p.id ? 'bg-blue-50 border border-blue-100' : 'hover:bg-slate-50 border border-transparent'}`}
                    >
                      <div className="font-bold text-slate-900 text-sm line-clamp-1">{p.title}</div>
                      <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-slate-500">
                         <span className="font-mono text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">{p.patentNo}</span>
                         <span>•</span>
                         <span className="font-medium text-slate-700">{p.inventor}</span>
                         <span>•</span>
                         <span className="text-slate-500">{p.fieldName || '战略科技成果'}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-sm text-slate-500">
                    没有找到匹配的吉大专利记录
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* AI Intelligent Chain Synergy Banner */}
        {recommendedMapping && (
          <div className="bg-linear-to-r from-blue-50/80 via-indigo-50/50 to-slate-50 p-4 rounded-xl border border-blue-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-md bg-blue-600 text-white font-black text-xs flex items-center gap-1 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  AI 产业链智能穿透定位
                </span>
                <span className="text-xs font-bold text-slate-700">
                  已匹配对口链条：<strong className="text-blue-700">{recommendedMapping.chainName}</strong>
                </span>
                <span className="text-xs text-slate-400">|</span>
                <span className="text-xs font-bold text-slate-700">
                  推荐定位环节：<strong className="text-indigo-700">{recommendedMapping.nodeTitle.split('(')[0]}</strong>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {recommendedMapping.nodeReason}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <button
                onClick={() => {
                  setSelectedChainId(recommendedMapping.chainId);
                  if (recommendedMapping.category && recommendedMapping.category !== '全部产业链') {
                    setSelectedCategory(recommendedMapping.category);
                  }
                  setSelectedNode(recommendedMapping.recommendedNode);
                }}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Workflow className="w-3.5 h-3.5" />
                <span>聚焦推荐链条与节点</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Step 2: Category Filter Chips & 57 Chains Grid Selector */}
      <div className="bg-white rounded-2xl p-5 border border-[#D8E2F0] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-[#0F52BA]" />
              <span>第二步：选择细分战略产业链 ({filteredChains.length} 条)：</span>
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {INDUSTRY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0F52BA] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 57 Chains Grid Selector */}
        <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-h-56 overflow-y-auto pr-1">
          {filteredChains.map((chain) => {
            const isSelected = selectedChainId === chain.id;
            const isRecommended = recommendedMapping?.chainId === chain.id;
            return (
              <button
                key={chain.id}
                onClick={() => setSelectedChainId(chain.id)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between space-y-2 cursor-pointer relative ${
                  isSelected
                    ? 'bg-blue-50/80 border-[#0F52BA] shadow-xs ring-2 ring-[#0F52BA]/20'
                    : 'bg-white border-[#D8E2F0] hover:border-[#0F52BA]/60 hover:bg-slate-50/60'
                }`}
              >
                {isRecommended && (
                  <span className="absolute -top-2 right-2 px-1.5 py-0.2 rounded bg-amber-500 text-white text-[10px] font-black shadow-xs flex items-center gap-0.5">
                    <Sparkles className="w-2.5 h-2.5" /> 专利对口
                  </span>
                )}
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-mono font-bold text-[#0F52BA]">{chain.code}</span>
                    <span className="text-slate-400">{chain.category.split('与')[0]}</span>
                  </div>
                  <h5 className={`text-sm font-bold line-clamp-1 ${isSelected ? 'text-[#082C6C] font-black' : 'text-slate-800'}`}>
                    {chain.name}
                  </h5>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                  <span>匹配吉大专利: <strong className="text-slate-800 font-mono">{chain.jluPatentsCount}项</strong></span>
                  <span className="text-[#0F52BA] font-semibold">{chain.totalEnterprises}家企业</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Chain Detailed Visual Decomposition Map */}
      {activeChain && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
          
          {/* Chain Top Info */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-sm font-black font-mono">
                  {activeChain.code}
                </span>
                <span className="text-sm text-slate-500 font-medium">
                  {activeChain.category}
                </span>
                {recommendedMapping?.chainId === activeChain.id && (
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 当前吉大专利直接赋能链条
                  </span>
                )}
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {activeChain.name}
              </h3>
              <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
                {activeChain.summary}
              </p>
            </div>
          </div>

          {/* Upstream / Midstream / Downstream Node Interactive Tabs */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
                <span>产业链上中下游关键技术节点图谱分解</span>
                <span className="text-sm font-normal text-slate-500">（点击节点可快速筛选该环节靶向企业）</span>
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Upstream Node */}
              <div 
                onClick={() => setSelectedNode(selectedNode === 'upstream' ? 'all' : 'upstream')}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer space-y-3 relative ${
                  selectedNode === 'upstream'
                    ? 'border-blue-600 bg-blue-50/70 shadow-md ring-2 ring-blue-400/20'
                    : 'border-slate-200 bg-white hover:border-blue-300'
                }`}
              >
                {recommendedMapping?.chainId === activeChain.id && recommendedMapping.recommendedNode === 'upstream' && (
                  <div className="absolute -top-2.5 right-3 bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" /> 吉大专利突破节点
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-bold text-[11px]">
                    上游 • 核心材料与元器件
                  </span>
                  <span className="text-sm font-mono font-bold text-blue-600">
                    {nodeCounts.upstream} 家企业
                  </span>
                </div>
                <h5 className="text-base font-bold text-slate-900">{activeChain.upstreamNode.name}</h5>
                <div className="space-y-1 text-sm text-slate-600">
                  <span className="text-[11px] font-semibold text-slate-500 block">关键攻关技术特征：</span>
                  {activeChain.upstreamNode.keyTechs.map((t, idx) => (
                    <div key={idx} className="flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-3 h-3 text-blue-500 shrink-0" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Midstream Node */}
              <div 
                onClick={() => setSelectedNode(selectedNode === 'midstream' ? 'all' : 'midstream')}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer space-y-3 relative ${
                  selectedNode === 'midstream'
                    ? 'border-indigo-600 bg-indigo-50/70 shadow-md ring-2 ring-indigo-400/20'
                    : 'border-slate-200 bg-white hover:border-indigo-300'
                }`}
              >
                {recommendedMapping?.chainId === activeChain.id && recommendedMapping.recommendedNode === 'midstream' && (
                  <div className="absolute -top-2.5 right-3 bg-indigo-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" /> 吉大专利突破节点
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded font-bold text-[11px]">
                    中游 • 精密制造与模块总成
                  </span>
                  <span className="text-sm font-mono font-bold text-indigo-600">
                    {nodeCounts.midstream} 家企业
                  </span>
                </div>
                <h5 className="text-base font-bold text-slate-900">{activeChain.midstreamNode.name}</h5>
                <div className="space-y-1 text-sm text-slate-600">
                  <span className="text-[11px] font-semibold text-slate-500 block">关键攻关技术特征：</span>
                  {activeChain.midstreamNode.keyTechs.map((t, idx) => (
                    <div key={idx} className="flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-3 h-3 text-indigo-500 shrink-0" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Downstream Node */}
              <div 
                onClick={() => setSelectedNode(selectedNode === 'downstream' ? 'all' : 'downstream')}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer space-y-3 relative ${
                  selectedNode === 'downstream'
                    ? 'border-purple-600 bg-purple-50/70 shadow-md ring-2 ring-purple-400/20'
                    : 'border-slate-200 bg-white hover:border-purple-300'
                }`}
              >
                {recommendedMapping?.chainId === activeChain.id && recommendedMapping.recommendedNode === 'downstream' && (
                  <div className="absolute -top-2.5 right-3 bg-purple-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" /> 吉大专利突破节点
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded font-bold text-[11px]">
                    下游 • 整机终端与系统集成
                  </span>
                  <span className="text-sm font-mono font-bold text-purple-600">
                    {nodeCounts.downstream} 家企业
                  </span>
                </div>
                <h5 className="text-base font-bold text-slate-900">{activeChain.downstreamNode.name}</h5>
                <div className="space-y-1 text-sm text-slate-600">
                  <span className="text-[11px] font-semibold text-slate-500 block">关键攻关技术特征：</span>
                  {activeChain.downstreamNode.keyTechs.map((t, idx) => (
                    <div key={idx} className="flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-3 h-3 text-purple-500 shrink-0" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Target Enterprises within this Chain */}
          <div className="pt-6 border-t border-slate-200 space-y-5">
            
            {/* National Geographic Map & Province Distribution for this Industry Chain */}
            <PatentNationalDistributionCard
              activePatent={activePatent}
              chainInfo={{
                name: activeChain.name,
                category: activeChain.category,
                nodeName: selectedNode === 'all' 
                  ? '全链条节点' 
                  : selectedNode === 'upstream' 
                    ? `上游：${activeChain.upstreamNode.name}` 
                    : selectedNode === 'midstream' 
                      ? `中游：${activeChain.midstreamNode.name}` 
                      : `下游：${activeChain.downstreamNode.name}`
              }}
              title="当前产业链重点靶向企业全国地理与省市分布"
              enterprises={nodeMatchedEnterprises}
              selectedProvince={regionFilter.p}
              onSelectProvince={(prov) => {
                setRegionFilter({ p: prov, c: 'all', d: 'all' });
              }}
              filteredCount={chainEnterprises.length}
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-600" />
                <span>该产业链重点靶向企业 ({chainEnterprises.length}家)</span>
                {selectedNode !== 'all' && (
                  <span className="text-sm font-normal text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                    已筛选：{selectedNode === 'upstream' ? '上游节点' : selectedNode === 'midstream' ? '中游节点' : '下游节点'}
                  </span>
                )}
              </h4>
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <div className="relative w-48 sm:w-64">
                  <input
                    type="text"
                    value={enterpriseSearchKeyword}
                    onChange={(e) => setEnterpriseSearchKeyword(e.target.value)}
                    placeholder="搜索企业名称..."
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 pl-8 text-sm text-slate-900 focus:outline-none focus:border-indigo-500 shadow-sm"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                </div>
                <div className="w-px h-6 bg-slate-200 mx-2 hidden sm:block"></div>
                <span className="text-sm font-bold text-slate-500">过滤:</span>
                <RegionFilter 
                  value={regionFilter} 
                  onFilterChange={(p, c, d) => setRegionFilter({p, c, d})} 
                />
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm ml-2">
                  <Download className="w-4 h-4" /> 导出
                </button>
              </div>
            </div>

            {chainEnterprises.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                    <Inbox className="w-8 h-8 text-slate-300" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">未找到符合条件的企业</h3>
                  <p className="text-sm text-slate-500 max-w-md">当前过滤条件下没有匹配的靶向企业，请尝试放宽筛选条件，或重置区域限制。</p>
                  <button onClick={() => {
                    setRegionFilter({p: 'all', c: 'all', d: 'all'});
                    setSelectedNode('all');
                  }} className="mt-6 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-blue-600 hover:bg-blue-50 transition-colors shadow-sm">
                    重置筛选条件
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentEnterprises.map((ent) => (
                <div
                  key={ent.id}
                  onClick={() => onSelectEnterprise(ent)}
                  className="bg-white rounded-2xl p-5 border border-[#D8E2F0] shadow-xs hover:shadow-lg hover:border-[#0F52BA] transition-all cursor-pointer flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 text-[11px] font-bold rounded shadow-sm">
                            {ent.chainPosition?.nodeName.split('：')[0]}
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 group-hover:text-[#0F52BA]">
                          <CopyableText text={ent.name}>{ent.name}</CopyableText>
                        </h4>
                      </div>
                    </div>
                    <div className="mt-3 bg-[#F8FAFC] p-3 rounded-xl border border-slate-100 text-[12px] text-slate-600 flex flex-col gap-2">
                      <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                        <div>
                          成立日期：<span className="font-semibold text-slate-800">{ent.establishedDate || '2011-05-18'}</span>
                        </div>
                        <div>
                          注册资本：<span className="font-semibold text-slate-800">{ent.registeredCapital || '-'}</span>
                        </div>
                        <div className="truncate" title={ent.email || '暂无'}>
                          公司邮箱：<span className="font-semibold text-slate-800">{ent.email || 'contact@' + (ent.creditCode?.substring(0,6) || 'qiye') + '.com'}</span>
                        </div>
                        <div>
                          公司电话：<span className="font-semibold text-slate-800">{ent.phone || '暂无'}</span>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-slate-200 mt-1 truncate" title={(ent.location || '') + (ent.address || '')}>
                        企业地址：<span className="font-semibold text-slate-800">{ent.location || '-'}{ent.address ? ' ' + ent.address : ''}</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-sm">
                    <span className="text-[#0F52BA] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>查看企业画像</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                    {onOpenAiActionPlan && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenAiActionPlan(ent);
                        }}
                        className="text-white bg-[#0F52BA] px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 shadow-sm hover:bg-[#082C6C] hover:shadow-md transition-all text-xs"
                      >
                        AI撰写对接方案
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            )}
            
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-6">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="text-sm font-medium text-slate-600">
                  第 <span className="text-slate-900 font-bold">{currentPage}</span> 页，共 {totalPages} 页
                </div>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
};
