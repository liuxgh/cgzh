import { CopyableText } from './CopyableText';
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { TargetEnterprise, PatentItem } from '../types';
import { RegionFilter } from './RegionFilter';
import { PatentNationalDistributionCard } from './PatentNationalDistributionCard';
import { IndustryChainPanoramaView } from './IndustryChainPanoramaView';
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
  ShieldCheck,
  ArrowDown
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
  const [isChainSelectorOpen, setIsChainSelectorOpen] = useState<boolean>(false);
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
    <div className="space-y-3.5 animate-in fade-in duration-300">
      
      {/* Module Header - Compact Command Bar */}
      <div className="bg-gradient-to-r from-[#06122d] via-[#091b40] to-[#040d21] text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl shadow-xl border border-blue-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-cyan-300 text-xs font-bold border border-cyan-400/30 flex items-center gap-1 shadow-xs">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>核心寻客路径二</span>
          </span>
          <h2 className="text-sm sm:text-base font-black tracking-tight text-white flex items-center gap-1.5">
            <span>通过吉大专利</span>
            <span className="text-cyan-400 font-mono text-xs">➔</span>
            <span>细分战略产业链图谱穿透找企业</span>
          </h2>
          <span className="hidden xl:inline-block text-[11px] text-slate-400">
            （全链覆盖 57 条战略产业链、上中下游核心节点与靶向企业）
          </span>
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('panorama-section');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="px-3 py-1 rounded-xl bg-blue-600/80 hover:bg-blue-500 text-cyan-200 hover:text-white border border-cyan-400/40 text-xs font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <span>直达全景图谱</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-cyan-300" />
          </button>
        </div>
      </div>

      {/* Step 1 & Step 2: High Efficiency 2-Column Responsive Selector Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        
        {/* Step 1: Select JLU Patent */}
        <div className="bg-[#061026]/90 rounded-2xl p-3.5 border border-blue-900/50 shadow-xl space-y-2 flex flex-col justify-between">
          <div className="space-y-1.5 relative" ref={dropdownRef}>
            <label className="text-xs sm:text-sm font-bold text-slate-200 flex items-center justify-between gap-1.5">
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>第一步：选择待转化的吉大专利</span>
              </span>
              <span className="text-[11px] text-slate-400 font-normal">
                已收录 {patents.length} 项成果
              </span>
            </label>

            <div 
              className="w-full bg-[#0a1838] border border-blue-800/60 rounded-xl px-3 py-2 text-xs sm:text-sm text-white font-medium focus-within:ring-2 focus-within:ring-cyan-400 focus-within:bg-[#0c224e] transition-all cursor-pointer flex items-center justify-between gap-2 hover:border-cyan-400/60"
              onClick={() => setIsDropdownOpen(true)}
            >
              <div className="truncate flex-1">
                {activePatent ? (
                  <span className="flex items-center gap-1.5 truncate">
                    <span className="font-mono text-cyan-300 bg-blue-950/80 px-1.5 py-0.5 rounded border border-blue-700/60 text-[11px] font-bold shrink-0">
                      {activePatent.patentNo}
                    </span>
                    <span className="font-bold text-white truncate text-xs sm:text-sm">{activePatent.title}</span>
                    <span className="text-[11px] text-slate-400 shrink-0">({activePatent.inventor})</span>
                  </span>
                ) : (
                  '请选择或搜索专利...'
                )}
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform shrink-0 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </div>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#071536] border border-blue-700/80 rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[320px]">
                <div className="p-2 border-b border-blue-800/60 bg-[#05102a] sticky top-0 z-10">
                   <div className="relative">
                     <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                     <input 
                       type="text"
                       autoFocus
                       placeholder="输入专利名称、专利号或发明人进行模糊检索..."
                       value={patentSearchQuery}
                       onChange={e => setPatentSearchQuery(e.target.value)}
                       className="w-full bg-[#0c224e] border border-blue-600/50 rounded-lg py-1.5 pl-8 pr-3 text-xs text-white placeholder-slate-400 focus:outline-hidden focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
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
                        className={`p-2.5 rounded-lg cursor-pointer transition-colors ${currentPatentId === p.id ? 'bg-blue-900/80 border border-cyan-400/60' : 'hover:bg-blue-900/40 border border-transparent'}`}
                      >
                        <div className="font-bold text-white text-xs sm:text-sm line-clamp-1">{p.title}</div>
                        <div className="flex flex-wrap items-center gap-1.5 mt-1 text-[11px] text-slate-400">
                           <span className="font-mono text-cyan-300 bg-blue-950 px-1.5 py-0.5 rounded border border-blue-800/60">{p.patentNo}</span>
                           <span>•</span>
                           <span className="font-medium text-slate-300">{p.inventor}</span>
                           <span>•</span>
                           <span className="text-slate-400">{p.fieldName || '战略科技成果'}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-xs text-slate-400">
                      没有找到匹配的吉大专利记录
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* AI Recommended Chain Strip */}
          {recommendedMapping && (
            <div className="bg-gradient-to-r from-blue-950/80 via-indigo-950/60 to-[#071536] px-2.5 py-1.5 rounded-xl border border-cyan-500/30 flex items-center justify-between gap-2 shadow-sm text-xs">
              <div className="flex items-center gap-1.5 truncate">
                <span className="px-1.5 py-0.5 rounded bg-blue-600 text-white font-black text-[10px] shrink-0 flex items-center gap-0.5">
                  <Sparkles className="w-2.5 h-2.5 text-cyan-200" />
                  AI穿透
                </span>
                <span className="text-slate-300 truncate text-[11px] sm:text-xs">
                  推荐链条：<strong className="text-cyan-300">{recommendedMapping.chainName}</strong> ➔ <span className="text-indigo-300">{recommendedMapping.nodeTitle.split('(')[0]}</span>
                </span>
              </div>
              <button
                onClick={() => {
                  setSelectedChainId(recommendedMapping.chainId);
                  if (recommendedMapping.category && recommendedMapping.category !== '全部产业链') {
                    setSelectedCategory(recommendedMapping.category);
                  }
                  setSelectedNode(recommendedMapping.recommendedNode);
                }}
                className="px-2 py-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg text-[11px] font-bold transition-all shadow-xs shrink-0 cursor-pointer border border-blue-400/40 active:scale-95"
              >
                聚焦推荐
              </button>
            </div>
          )}
        </div>

        {/* Step 2: Select Strategic Industry Chain */}
        <div className="bg-[#061026]/90 rounded-2xl p-3.5 border border-blue-900/50 shadow-xl space-y-2 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs sm:text-sm font-bold text-slate-200 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-cyan-400" />
              <span>第二步：当前战略产业链</span>
            </span>
            <button
              onClick={() => setIsChainSelectorOpen(!isChainSelectorOpen)}
              className="text-xs font-bold text-cyan-300 hover:text-white px-2.5 py-1 rounded-lg bg-blue-950/80 hover:bg-blue-900 border border-blue-700/60 transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>{isChainSelectorOpen ? '收起 57 条产业链' : '切换细分产业链 (57条)'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isChainSelectorOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Active Chain Preview Card */}
          <div 
            onClick={() => setIsChainSelectorOpen(!isChainSelectorOpen)}
            className="w-full bg-[#0a1838] border border-blue-800/60 hover:border-cyan-400/60 rounded-xl px-3 py-2 text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2 truncate">
              <span className="font-mono text-cyan-300 bg-blue-950/80 px-1.5 py-0.5 rounded border border-blue-700/60 text-[11px] font-bold shrink-0">
                {activeChain?.code || 'NEV01'}
              </span>
              <span className="font-bold text-white truncate text-xs sm:text-sm">
                {activeChain?.name || '新能源汽车'}
              </span>
              <span className="text-[11px] text-slate-400 hidden sm:inline truncate">
                ({activeChain?.category})
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] shrink-0">
              <span className="text-cyan-400 font-semibold">{activeChain?.totalEnterprises || 428}家企业</span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-300">吉大专利: <strong className="text-white font-mono">{activeChain?.jluPatentsCount || 24}项</strong></span>
            </div>
          </div>
        </div>

      </div>

      {/* Expandable 57 Chains Grid Modal / Panel when isChainSelectorOpen */}
      {isChainSelectorOpen && (
        <div className="bg-[#061026] rounded-2xl p-4 border border-cyan-500/40 shadow-2xl space-y-3 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-blue-900/50">
            <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>选择战略产业链分类筛选：</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {INDUSTRY_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-cyan-400 shadow-sm'
                      : 'bg-[#091838] text-slate-300 hover:bg-blue-900/50 hover:text-white border-blue-900/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 max-h-56 overflow-y-auto pr-1">
            {filteredChains.map((chain) => {
              const isSelected = selectedChainId === chain.id;
              const isRecommended = recommendedMapping?.chainId === chain.id;
              return (
                <button
                  key={chain.id}
                  onClick={() => {
                    setSelectedChainId(chain.id);
                    setIsChainSelectorOpen(false);
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between space-y-1.5 cursor-pointer relative ${
                    isSelected
                      ? 'bg-gradient-to-br from-blue-950 to-indigo-950 border-cyan-400 shadow-md ring-1 ring-cyan-500/40 text-white'
                      : 'bg-[#08183a]/80 border-blue-900/50 hover:border-cyan-400/60 hover:bg-[#0c2352] text-slate-300'
                  }`}
                >
                  {isRecommended && (
                    <span className="absolute -top-2 right-2 px-1.5 py-0.2 rounded bg-amber-500 text-white text-[9px] font-black shadow-xs flex items-center gap-0.5">
                      <Sparkles className="w-2.5 h-2.5" /> 专利对口
                    </span>
                  )}
                  <div>
                    <div className="flex items-center justify-between text-[10px] mb-0.5">
                      <span className="font-mono font-bold text-cyan-400">{chain.code}</span>
                      <span className="text-slate-400">{chain.category.split('与')[0]}</span>
                    </div>
                    <h5 className={`text-xs font-bold line-clamp-1 ${isSelected ? 'text-cyan-200 font-black' : 'text-slate-200'}`}>
                      {chain.name}
                    </h5>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-blue-900/40">
                    <span>专利: <strong className="text-slate-200 font-mono">{chain.jluPatentsCount}项</strong></span>
                    <span className="text-cyan-400 font-semibold">{chain.totalEnterprises}家企业</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 步骤三：产业链全景图与供应链匹配（选项卡切换） */}
      <div id="panorama-section" className="scroll-mt-4">
        <IndustryChainPanoramaView chainName={activeChain?.name || '新能源汽车'} />
      </div>

    </div>
  );
};
