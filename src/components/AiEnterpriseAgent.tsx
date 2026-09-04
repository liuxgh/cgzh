import { CopyableText } from './CopyableText';
import React, { useState, useEffect, useRef } from 'react';
import { PatentItem, TargetEnterprise } from '../types';
import { RegionFilter } from './RegionFilter';
import { PatentNationalDistributionCard } from './PatentNationalDistributionCard';
import { TARGET_ENTERPRISES_DATA } from '../data/targetEnterprisesData';
import { UNPATENTED_TECH_LIST, UnpatentedTechItem } from '../data/unpatentedTechData';
import { 
  BrainCircuit, 
  Sparkles, 
  Search,
  Filter,
  Inbox,
  ChevronLeft, 
  Building2, 
  RefreshCw, 
  ChevronRight, 
  ChevronDown,
  Download,
  FileText,
  Edit3,
  Lightbulb,
  Target,
  Zap,
  CheckCircle2,
  Briefcase,
  Layers,
  X
} from 'lucide-react';

interface AiEnterpriseAgentProps {
  patents: PatentItem[];
  initialQuery?: string;
  initialEnterprise?: TargetEnterprise | null;
  onSelectEnterprise: (enterprise: TargetEnterprise) => void;
  onOpenAiActionPlan?: (enterprise: TargetEnterprise) => void;
}

export const AiEnterpriseAgent: React.FC<AiEnterpriseAgentProps> = ({
  patents,
  initialQuery = '',
  initialEnterprise = null,
  onSelectEnterprise,
  onOpenAiActionPlan
}) => {
  // Input Modes: 'patent' = select from JLU patent list; 'custom' = unpatented tech / freeform description
  const [searchMode, setSearchMode] = useState<'patent' | 'custom'>(initialQuery ? 'custom' : 'patent');
  const [selectedPatentId, setSelectedPatentId] = useState<string>(patents[0]?.id || 'pat-001');
  const [customInputText, setCustomInputText] = useState<string>(initialQuery || '');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  
  const [regionFilter, setRegionFilter] = useState<{p: string, c: string, d: string}>({p: 'all', c: 'all', d: 'all'});
  const [patentScaleFilter, setPatentScaleFilter] = useState<string>('all');
  const [capitalFilter, setCapitalFilter] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [patentSearchQuery, setPatentSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Non-patented tech selector state
  const [isUnpatentedDropdownOpen, setIsUnpatentedDropdownOpen] = useState(false);
  const [unpatentedSearchQuery, setUnpatentedSearchQuery] = useState('');
  const [unpatentedDomainFilter, setUnpatentedDomainFilter] = useState('all');
  const [selectedUnpatentedId, setSelectedUnpatentedId] = useState<string | null>(null);
  const unpatentedDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (unpatentedDropdownRef.current && !unpatentedDropdownRef.current.contains(event.target as Node)) {
        setIsUnpatentedDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredPatents = patents.filter(p => {
    if (!patentSearchQuery.trim()) return true;
    const q = patentSearchQuery.toLowerCase();
    return p.title.toLowerCase().includes(q) || 
           p.patentNo.toLowerCase().includes(q) || 
           p.inventor.toLowerCase().includes(q);
  });

  const filteredUnpatentedTechs = UNPATENTED_TECH_LIST.filter(item => {
    if (unpatentedDomainFilter !== 'all' && item.domain !== unpatentedDomainFilter) return false;
    if (!unpatentedSearchQuery.trim()) return true;
    const q = unpatentedSearchQuery.toLowerCase();
    return item.title.toLowerCase().includes(q) || 
           item.desc.toLowerCase().includes(q) || 
           item.contact.toLowerCase().includes(q) ||
           item.domain.toLowerCase().includes(q) ||
           (item.keywords && item.keywords.some(k => k.toLowerCase().includes(q)));
  });

  const activePatent = patents.find(p => p.id === selectedPatentId) || patents[0];
  const activeUnpatented = UNPATENTED_TECH_LIST.find(u => u.id === selectedUnpatentedId);

  const quickPresets = [
    '一种高效降解水体微塑料的新型微生物菌剂与中试发酵工艺',
    '基于大模型的工业设备预测性维护与时序故障诊断系统底座',
    '耐超低温高强韧钛合金冶炼工艺参数控制技术与特殊微量元素配比',
    '基于高表达酵母工程菌中试发酵生产类胡萝卜素代谢调控工艺',
    '智能仿生农业收获机械减阻耐磨刀片表面激光熔覆与微织构工艺'
  ];

  const unpatentedDomains = ['全部', '环境与生态', '人工智能', '材料科学', '生物医药', '机械工程', '电子信息'];

  const filteredEnterprises = TARGET_ENTERPRISES_DATA.filter(ent => {
    // Enterprise name / keyword fuzzy search
    if (searchKeyword.trim()) {
      const q = searchKeyword.toLowerCase().trim();
      const matchName = ent.name?.toLowerCase().includes(q);
      const matchShort = ent.shortName?.toLowerCase().includes(q);
      const matchIndustry = ent.industry?.toLowerCase().includes(q);
      if (!matchName && !matchShort && !matchIndustry) return false;
    }
    
    // Region Logic
    if (regionFilter.p !== 'all' && !ent.province?.includes(regionFilter.p) && !ent.city?.includes(regionFilter.p)) return false;
    if (regionFilter.c !== 'all' && !ent.city?.includes(regionFilter.c)) return false;
    if (regionFilter.d !== 'all' && !ent.address?.includes(regionFilter.d) && !ent.location?.includes(regionFilter.d)) return false;

    if (patentScaleFilter !== 'all') {
      const count = ent.patentTotalCount || 0;
      if (patentScaleFilter === '1000+' && count < 1000) return false;
      if (patentScaleFilter === '100-1000' && (count < 100 || count >= 1000)) return false;
      if (patentScaleFilter === '0-100' && count >= 100) return false;
    }
    
    if (capitalFilter !== 'all') {
      let capitalStr = (ent.registeredCapital || '').replace(/[^0-9.]/g, '');
      let capital = parseFloat(capitalStr) || 0;
      if (ent.registeredCapital && ent.registeredCapital.includes('亿')) {
        capital = capital * 10000;
      }
      if (capitalFilter === '10000+' && capital < 10000) return false;
      if (capitalFilter === '5000-10000' && (capital < 5000 || capital >= 10000)) return false;
      if (capitalFilter === '1000-5000' && (capital < 1000 || capital >= 5000)) return false;
    }
    return true;
  });

  const totalPages = Math.ceil(filteredEnterprises.length / itemsPerPage);
  const currentEnterprises = filteredEnterprises.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [regionFilter.p, regionFilter.c, regionFilter.d, patentScaleFilter, capitalFilter, searchKeyword]);

  const agentSteps = [
    { title: '专利权利要求与技术特征语义解析', desc: '提取核心发明点、微观机理、适用工业场景及潜在替代/互补特征' },
    { title: '佰腾中国专利大模型向量语义比对', desc: '穿透2亿+专利数据库，匹配全国企业同族/相似技术公开专利' },
    { title: '战略产业链上下游供需图谱穿透', desc: '定位上游关键原材料、中游制造模块与下游整机集成商技术痛点' },
    { title: '国家专利密集型产品备案公开数据产业化能力校验', desc: '比对200,000+款已备案量产产品，筛选具备规模化采购实力的规上企业' },
    { title: '企业工商信用画像与产学研决策人匹配', desc: '生成企业研发预算、技术高管联系方式与定制化上门走访沟通策略' }
  ];

  const handleRunAgent = () => {
    setIsProcessing(true);
    setCurrentStep(0);
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= agentSteps.length - 1) {
          clearInterval(interval);
          setIsProcessing(false);
          return agentSteps.length;
        }
        return prev + 1;
      });
    }, 600);
  };

  useEffect(() => {
    if (initialQuery) {
      setSearchMode('custom');
      setCustomInputText(initialQuery);
      handleRunAgent();
    }
  }, [initialQuery]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Agent Banner */}
      <div className="bg-linear-to-r from-[#1A0E38] via-[#2F1D6A] to-[#1B0F3B] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-purple-400/30">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-purple-100 text-xs font-bold border border-white/20 mb-3 backdrop-blur-xs">
          <BrainCircuit className="w-4 h-4 text-purple-300" />
          <span>全自动化 AI 智能体寻客系统</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
          AI 自动化专利找买家：从成果特征到精准靶向企业报告
        </h2>
        <p className="text-sm sm:text-base text-purple-100/90 mt-2 max-w-3xl leading-relaxed">
          依托佰腾 2 亿+ 专利大数据与中国战略性新兴产业图谱，AI 智能体一键解析吉林大学成果发明点，穿透匹配具有量产采购实力与真实技术痛点的目标规上企业，自动生成《科技成果转化推荐函》与走访话术。
        </p>
      </div>

      {/* Clear Step-by-Step AI Agent Operational Hub */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#D8E2F0] shadow-xs space-y-5">
        
        {/* Step Header with Mode Switch Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-[#0F52BA]" />
              <span>第一步：选择寻客方式与输入技术目标</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              您可以直接从吉大专利成果库中选取已有专利，也可以输入非专利技术或正在研发的技术
            </p>
          </div>

          {/* Mode Tabs */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
            <button
              onClick={() => setSearchMode('patent')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                searchMode === 'patent'
                  ? 'bg-white text-[#0F52BA] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>方式一：从吉大专利库选取</span>
            </button>
            <button
              onClick={() => setSearchMode('custom')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                searchMode === 'custom'
                  ? 'bg-white text-[#0F52BA] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>方式二：输入非专利技术/成果</span>
            </button>
          </div>
        </div>

        {/* Content for Mode 1: Select JLU Patent */}
        {searchMode === 'patent' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#0F52BA]"></span>
                <span>检索并选择待转化的吉林大学专利：</span>
              </label>
              <span className="text-[11px] text-slate-500">
                支持输入专利号、发明人或名称快速过滤
              </span>
            </div>

            <div className="relative" ref={dropdownRef}>
              <div 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full bg-[#F8FAFC] border border-slate-300 hover:border-blue-400 rounded-xl px-4 py-3 text-sm text-slate-900 font-medium focus-within:ring-2 focus-within:ring-[#0F52BA] focus-within:bg-white transition-all cursor-pointer flex items-center justify-between gap-3 shadow-2xs"
              >
                <div className="truncate flex-1">
                  {activePatent ? (
                    <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                      <span className="font-mono text-[#0F52BA] bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60 text-xs font-bold shrink-0">
                        {activePatent.patentNo}
                      </span>
                      <span className="font-bold text-slate-900 truncate">{activePatent.title}</span>
                      <span className="text-xs text-slate-500 shrink-0">（发明人：{activePatent.inventor}）</span>
                    </div>
                  ) : (
                    <span className="text-slate-400">点击展开选择待转化的吉林大学专利...</span>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-blue-600 font-bold hidden sm:inline-block">更换专利</span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
              </div>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[360px] animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-2.5 border-b border-slate-100 bg-slate-50 sticky top-0 z-10">
                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input 
                        type="text"
                        autoFocus
                        placeholder="输入专利名称、专利号或发明人搜索..."
                        value={patentSearchQuery}
                        onChange={e => setPatentSearchQuery(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-hidden focus:border-[#0F52BA] focus:ring-1 focus:ring-[#0F52BA]"
                        onClick={e => e.stopPropagation()}
                      />
                    </div>
                  </div>
                  <div className="overflow-y-auto p-1.5">
                    {filteredPatents.length > 0 ? (
                      filteredPatents.map(p => (
                        <div 
                          key={p.id}
                          onClick={() => {
                            setSelectedPatentId(p.id);
                            setIsDropdownOpen(false);
                            setPatentSearchQuery('');
                          }}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedPatentId === p.id ? 'bg-blue-50 border border-blue-200 text-blue-950' : 'hover:bg-slate-50 border border-transparent'}`}
                        >
                          <div className="font-bold text-slate-900 text-sm line-clamp-1">{p.title}</div>
                          <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-500">
                            <span className="font-mono text-blue-700 bg-blue-100/70 px-1.5 py-0.2 rounded font-semibold">{p.patentNo}</span>
                            <span>•</span>
                            <span className="font-medium text-slate-700">{p.inventor}</span>
                            <span>•</span>
                            <span className="text-slate-500">{p.fieldName || '战略高价值成果'}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-8 text-center text-slate-400 text-sm">
                        未检索到匹配的专利，请尝试更换关键词
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3 text-xs text-blue-900 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>自动特征提取说明：</strong>选择该专利后，AI 智能体将自动提取该成果的独立权利要求及核心发明点，与全国专利、57条产业链上下游及国家专利密集型产品公开数据进行多维向量匹配。
              </span>
            </div>
          </div>
        )}

        {/* Content for Mode 2: Non-patent / In-development Tech Input & Selection */}
        {searchMode === 'custom' && (
          <div className="space-y-4">
            {/* Filter & Select from Unpatented Tech Pool */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#0F52BA]" />
                  <span>快捷选择已有“非专利技术/成果”：</span>
                </label>
                <span className="text-[11px] text-slate-500">
                  可直接从成果库选取，或在下方输入自定义描述
                </span>
              </div>

              <div className="relative" ref={unpatentedDropdownRef}>
                <div 
                  onClick={() => setIsUnpatentedDropdownOpen(!isUnpatentedDropdownOpen)}
                  className="w-full bg-[#F8FAFC] border border-slate-300 hover:border-blue-400 rounded-xl px-4 py-3 text-sm text-slate-900 font-medium focus-within:ring-2 focus-within:ring-[#0F52BA] focus-within:bg-white transition-all cursor-pointer flex items-center justify-between gap-3 shadow-2xs"
                >
                  <div className="truncate flex-1">
                    {activeUnpatented ? (
                      <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                        <span className="text-xs font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-200 shrink-0">
                          {activeUnpatented.domain}
                        </span>
                        <span className="font-bold text-slate-900 truncate">{activeUnpatented.title}</span>
                        <span className="text-xs text-slate-500 shrink-0">（{activeUnpatented.contact}）</span>
                      </div>
                    ) : (
                      <span className="text-slate-500 text-xs sm:text-sm">
                        点击展开从吉大“非专利技术/成果”库中筛选并快速导入...
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-blue-600 font-bold hidden sm:inline-block">筛选成果</span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isUnpatentedDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                </div>

                {isUnpatentedDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[380px] animate-in fade-in zoom-in-95 duration-150">
                    <div className="p-2.5 border-b border-slate-100 bg-slate-50 sticky top-0 z-10 space-y-2">
                      <div className="relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input 
                          type="text"
                          autoFocus
                          placeholder="搜索非专利成果名称、描述、团队或学科领域..."
                          value={unpatentedSearchQuery}
                          onChange={e => setUnpatentedSearchQuery(e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-hidden focus:border-[#0F52BA] focus:ring-1 focus:ring-[#0F52BA]"
                          onClick={e => e.stopPropagation()}
                        />
                      </div>
                      <div className="flex items-center gap-1 overflow-x-auto pb-0.5 no-scrollbar text-xs">
                        {unpatentedDomains.map(dom => (
                          <button
                            key={dom}
                            onClick={(e) => {
                              e.stopPropagation();
                              setUnpatentedDomainFilter(dom === '全部' ? 'all' : dom);
                            }}
                            className={`px-2.5 py-1 rounded-md whitespace-nowrap font-medium transition-colors cursor-pointer ${
                              (dom === '全部' && unpatentedDomainFilter === 'all') || unpatentedDomainFilter === dom
                                ? 'bg-[#0F52BA] text-white'
                                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {dom}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="overflow-y-auto p-1.5 divide-y divide-slate-100">
                      {filteredUnpatentedTechs.length > 0 ? (
                        filteredUnpatentedTechs.map(item => (
                          <div 
                            key={item.id}
                            onClick={() => {
                              setSelectedUnpatentedId(item.id);
                              setCustomInputText(`${item.title}：${item.desc}`);
                              setIsUnpatentedDropdownOpen(false);
                            }}
                            className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedUnpatentedId === item.id ? 'bg-amber-50/70 text-amber-950' : 'hover:bg-slate-50'}`}
                          >
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="font-bold text-slate-900 text-sm line-clamp-1">{item.title}</span>
                              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#0F52BA] border border-blue-100 shrink-0">
                                {item.domain}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 line-clamp-2 mb-1.5">{item.desc}</p>
                            <div className="flex items-center gap-3 text-[11px] text-slate-500">
                              <span className="font-medium text-slate-700">{item.contact}</span>
                              {item.team && <span>• {item.team}</span>}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="py-8 text-center text-slate-400 text-sm">
                          未检索到匹配的非专利成果，请尝试更换筛选条件
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Direct Textarea Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#0F52BA]"></span>
                  <span>输入非专利技术、成果描述：</span>
                </label>
                {customInputText && (
                  <button 
                    onClick={() => {
                      setCustomInputText('');
                      setSelectedUnpatentedId(null);
                    }}
                    className="text-[11px] text-slate-400 hover:text-slate-600 flex items-center gap-1 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                    清空输入
                  </button>
                )}
              </div>

              <div className="relative">
                <textarea
                  value={customInputText}
                  onChange={(e) => setCustomInputText(e.target.value)}
                  rows={3}
                  placeholder="例如：一种高效降解水体微塑料的新型微生物菌剂中试工艺、耐超低温高强韧钛合金冶炼工艺参数控制技术、基于大模型的工业设备预测性维护系统底座..."
                  className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl p-3.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F52BA] focus:bg-white transition-all shadow-2xs font-medium resize-none leading-relaxed"
                />
              </div>
            </div>

            {/* Quick Presets */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                点击快速填入非专利技术/成果示例：
              </span>
              <div className="flex flex-wrap gap-1.5">
                {quickPresets.map((preset, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => {
                      setCustomInputText(preset);
                      const matched = UNPATENTED_TECH_LIST.find(u => preset.includes(u.title));
                      if (matched) setSelectedUnpatentedId(matched.id);
                    }}
                    className="text-left text-xs bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-300 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 text-xs text-amber-950 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>非专利与在研技术穿透说明：</strong>针对尚未申请专利的专有技术秘密或在研项目，AI 智能体将解析核心技术机理与应用场景，与全国专利、57条产业链上下游及国家专利密集型产品公开数据进行多维向量匹配。
              </span>
            </div>
          </div>
        )}

        {/* Step 2: Action Trigger Bar */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-50/80 -mx-5 -mb-5 sm:-mx-6 sm:-mb-6 p-4 sm:p-5 rounded-b-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-[#0F52BA] shrink-0 font-bold text-sm">
              2
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800 flex items-center gap-1">
                <span>准备就绪：</span>
                <span className="text-[#0F52BA]">
                  {searchMode === 'patent' ? (
                    `将解析已选专利【${activePatent?.patentNo}】`
                  ) : (
                    customInputText ? `将分析非专利技术/成果【${customInputText.slice(0, 20)}...】` : '请输入非专利技术、成果描述'
                  )}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                将调用 2 亿+ 专利大数据、57 条产业链图谱及国家专利密集型产品公开数据
              </p>
            </div>
          </div>

          <button
            onClick={handleRunAgent}
            disabled={isProcessing || (searchMode === 'custom' && !customInputText.trim())}
            className="px-6 py-3 bg-linear-to-r from-[#0F52BA] to-indigo-600 hover:from-[#082C6C] hover:to-indigo-700 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-50 cursor-pointer group"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>AI 智能体推理穿透寻客中...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
                <span>启动智能体寻客</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Reasoning Process Flow */}
      {isProcessing && (
        <div className="bg-slate-900 text-white rounded-3xl p-6 border border-blue-500/30 shadow-xl space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-base font-bold text-cyan-300">
              <BrainCircuit className="w-5 h-5 animate-pulse" />
              <span>佰腾 AI 智能体正在进行多维跨数据库穿透检索与关联推理...</span>
            </div>
            <span className="text-sm font-mono text-blue-300">
              步骤 {Math.min(currentStep + 1, agentSteps.length)} / {agentSteps.length}
            </span>
          </div>
          <div className="space-y-3 pt-2">
            {agentSteps.map((step, idx) => {
              const isDone = currentStep > idx;
              const isCurrent = currentStep === idx;
              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                    isDone
                      ? 'bg-blue-900/30 border-blue-800/50 opacity-50'
                      : isCurrent
                      ? 'bg-blue-800/50 border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.15)]'
                      : 'bg-slate-800/50 border-slate-700/50 opacity-40'
                  }`}
                >
                  <div className="mt-0.5">
                    {isDone ? (
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                        <Sparkles className="w-3 h-3 text-white" />
                      </div>
                    ) : isCurrent ? (
                      <div className="w-5 h-5 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin"></div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-600"></div>
                    )}
                  </div>
                  <div>
                    <h5 className={`font-bold text-sm ${isCurrent ? 'text-cyan-300' : 'text-slate-200'}`}>
                      {step.title}
                    </h5>
                    <p className="text-[11px] text-slate-400">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected Patent National Matches & Regional Distribution Visualizer */}
      {!isProcessing && activePatent && (
        <PatentNationalDistributionCard 
          activePatent={activePatent}
          enterprises={TARGET_ENTERPRISES_DATA}
          selectedProvince={regionFilter.p}
          onSelectProvince={(prov) => {
            setRegionFilter({ p: prov, c: 'all', d: 'all' });
          }}
          filteredCount={filteredEnterprises.length}
        />
      )}

      {/* Generated Intelligence Report Tabs */}
      {!isProcessing && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden space-y-0">
          
          <div className="flex flex-wrap items-center justify-between border-b border-slate-200 bg-slate-50/80 px-6 py-3 gap-3">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#0F52BA]" />
              <span className="font-black text-base text-slate-900">AI 推荐靶向企业列表</span>
              <span className="ml-2 px-2.5 py-0.5 rounded-full bg-blue-100/80 text-[#0F52BA] text-xs font-bold font-mono">
                共 {filteredEnterprises.length} 家
              </span>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="搜索企业名称 / 简称..."
                  className="w-full bg-white border border-[#D8E2F0] rounded-xl px-4 py-2 pl-9 text-sm text-slate-900 focus:outline-hidden focus:border-[#0F52BA] shadow-2xs font-medium"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                {searchKeyword && (
                  <button
                    onClick={() => setSearchKeyword('')}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 text-xs cursor-pointer font-bold px-1"
                  >
                    ✕
                  </button>
                )}
              </div>
              <button className="flex items-center gap-1.5 px-3 py-2 text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs whitespace-nowrap cursor-pointer">
                <Download className="w-4 h-4" /> 导出列表
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="space-y-4">
              
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3 pb-4 border-b border-slate-100">
                <span className="text-sm font-bold text-slate-600 flex items-center gap-1.5 mr-2">
                  <Filter className="w-4 h-4 text-[#0F52BA]" /> 过滤:
                </span>
                <RegionFilter 
                  value={regionFilter} 
                  onFilterChange={(p, c, d) => setRegionFilter({p, c, d})} 
                />

                <select
                  value={patentScaleFilter}
                  onChange={(e) => setPatentScaleFilter(e.target.value)}
                  className="bg-white border border-[#D8E2F0] rounded-xl px-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:border-[#0F52BA] shadow-sm font-medium"
                >
                  <option value="all">专利保有量 (不限)</option>
                  <option value="1000+">1000件以上</option>
                  <option value="100-1000">100-1000件</option>
                  <option value="0-100">100件以下</option>
                </select>
                <select
                  value={capitalFilter}
                  onChange={(e) => setCapitalFilter(e.target.value)}
                  className="bg-white border border-[#D8E2F0] rounded-xl px-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:border-[#0F52BA] shadow-sm font-medium"
                >
                  <option value="all">注册资本 (不限)</option>
                  <option value="10000+">1亿元以上</option>
                  <option value="5000-10000">5000万-1亿元</option>
                  <option value="1000-5000">1000万-5000万元</option>
                </select>
              </div>

              {currentEnterprises.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                    <Inbox className="w-8 h-8 text-slate-300" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">未找到符合条件的企业</h3>
                  <p className="text-sm text-slate-500 max-w-md">当前过滤条件下没有匹配的靶向企业，请尝试放宽筛选条件，或重置区域与规模限制。</p>
                  <button onClick={() => {
                    setRegionFilter({p: 'all', c: 'all', d: 'all'});
                    setPatentScaleFilter('all');
                    setCapitalFilter('all');
                    setSearchKeyword('');
                  }} className="mt-6 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-blue-600 hover:bg-blue-50 transition-colors shadow-sm cursor-pointer">
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
        </div>
      )}
    </div>
  );
};

