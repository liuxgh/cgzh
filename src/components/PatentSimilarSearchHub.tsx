import { CopyableText } from './CopyableText';
import React, { useState, useRef, useEffect } from 'react';
import { PatentItem, TargetEnterprise } from '../types';
import { RegionFilter } from './RegionFilter';
import { TARGET_ENTERPRISES_DATA } from '../data/targetEnterprisesData';
import { PatentNationalDistributionCard } from './PatentNationalDistributionCard';
import { PatentFigureModal } from './PatentFigureModal';
import { 
  ShieldCheck, 
  Search,
  Inbox,
  ChevronLeft, 
  Building2, 
  Sparkles, 
  ChevronRight, 
  ArrowRight, 
  ExternalLink, 
  FileText, 
  Filter, 
  Layers, 
  CheckCircle2, 
  SlidersHorizontal,
  RefreshCw,
  ChevronDown,
  Download,
  Maximize2,
  Eye
} from 'lucide-react';

interface PatentSimilarSearchHubProps {
  patents: PatentItem[];
  selectedPatent: PatentItem | null;
  onSelectPatent: (patent: PatentItem) => void;
  onSelectEnterprise: (enterprise: TargetEnterprise) => void;
  onOpenAiActionPlan?: (enterprise: TargetEnterprise) => void;
}

export const PatentSimilarSearchHub: React.FC<PatentSimilarSearchHubProps> = ({
  patents,
  selectedPatent,
  onSelectPatent,
  onSelectEnterprise,
  onOpenAiActionPlan
}) => {
  const [currentPatentId, setCurrentPatentId] = useState<string>(selectedPatent?.id || patents[0]?.id || 'pat-001');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [patentSearchQuery, setPatentSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const filteredPatents = patents.filter(p => 
    p.title.toLowerCase().includes(patentSearchQuery.toLowerCase()) || 
    p.patentNo.toLowerCase().includes(patentSearchQuery.toLowerCase()) ||
    p.inventor.toLowerCase().includes(patentSearchQuery.toLowerCase())
  );

  const [similarityThreshold, setSimilarityThreshold] = useState<number>(85);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const [regionFilter, setRegionFilter] = useState<{p: string, c: string, d: string}>({p: 'all', c: 'all', d: 'all'});
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [patentScaleFilter, setPatentScaleFilter] = useState<string>('all');
  const [capitalFilter, setCapitalFilter] = useState<string>('all');
  const [figureModalState, setFigureModalState] = useState<{
    isOpen: boolean;
    patentTitle: string;
    patentNo: string;
    ownerType: 'jlu' | 'enterprise';
    ownerName: string;
    initialFigureIndex: number;
  }>({
    isOpen: false,
    patentTitle: '',
    patentNo: '',
    ownerType: 'jlu',
    ownerName: '',
    initialFigureIndex: 0
  });

  
  useEffect(() => {
    setCurrentPage(1);
  }, [searchKeyword, regionFilter.p, regionFilter.c, regionFilter.d, currentPatentId, patentScaleFilter, capitalFilter]);

  const activePatent = patents.find(p => p.id === currentPatentId) || patents[0];

  const handlePatentChange = (id: string) => {
    setCurrentPatentId(id);
    const p = patents.find(item => item.id === id);
    if (p) onSelectPatent(p);
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 400);
  };

  // Filter enterprises matched by similar patents
  const matchedEnterprises = TARGET_ENTERPRISES_DATA.filter(ent => {
    
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
      // 简单处理包含"万"的字符串，转成数字比较
      let capitalStr = (ent.registeredCapital || '').replace(/[^0-9.]/g, '');
      let capital = parseFloat(capitalStr) || 0;
      if (ent.registeredCapital && ent.registeredCapital.includes('亿')) {
        capital = capital * 10000; // 亿转万
      }
      if (capitalFilter === '10000+' && capital < 10000) return false;
      if (capitalFilter === '5000-10000' && (capital < 5000 || capital >= 10000)) return false;
      if (capitalFilter === '1000-5000' && (capital < 1000 || capital >= 5000)) return false;
    }

    if (searchKeyword.trim()) {
      const q = searchKeyword.toLowerCase();
      const matchName = ent.name.toLowerCase().includes(q) || ent.shortName.toLowerCase().includes(q);
      if (!matchName) return false;
    }
    return true;
  });

  const totalPages = Math.ceil(matchedEnterprises.length / itemsPerPage);
  const paginatedEnterprises = matchedEnterprises.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Module Header */}
      <div className="bg-linear-to-r from-[#082C6C] via-[#0F52BA] to-[#0A3D8F] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-blue-400/30">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full bg-white/15 text-blue-100 text-sm font-bold border border-white/20 flex items-center gap-1.5 backdrop-blur-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>核心寻客路径一：专利语义向量大模型</span>
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
          通过吉大专利 ➔ 相似专利找企业
        </h2>
        <p className="text-sm sm:text-base text-blue-100/90 mt-2 max-w-3xl leading-relaxed">
          通过吉大专利匹配拥有相似专利技术或同类技术路线的企业
        </p>
      </div>

      {/* Patent Selector */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#D8E2F0] shadow-xs">
        {/* Patent Search & Select */}
        <div className="w-full space-y-1.5 relative" ref={dropdownRef}>
          <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-blue-700" />
            <span>第一步：检索并选择待转化的吉林大学专利：</span>
          </label>
          <div 
            className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 font-medium focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white transition-all cursor-pointer flex items-center justify-between gap-2"
            onClick={() => setIsDropdownOpen(true)}
          >
            <div className="truncate flex-1">
              {activePatent ? (
                <span className="flex items-center gap-2">
                  <span className="font-mono text-[#0F52BA] bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200/60 text-xs font-bold shrink-0">
                    {activePatent.patentNo}
                  </span>
                  <span className="font-bold text-slate-800 truncate">{activePatent.title}</span>
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
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-sm text-slate-500">
                    没有找到匹配的专利记录
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Selected Patent National Matches & Regional Distribution Visualizer */}
      {activePatent && (
        <PatentNationalDistributionCard 
          activePatent={activePatent}
          enterprises={TARGET_ENTERPRISES_DATA}
          selectedProvince={regionFilter.p}
          onSelectProvince={(prov) => {
            setRegionFilter({ p: prov, c: 'all', d: 'all' });
          }}
          filteredCount={matchedEnterprises.length}
        />
      )}

      {/* Matching Results Header & Advanced Filters */}
      <div className="flex flex-col gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-1 items-center gap-2">
            <Building2 className="w-5 h-5 shrink-0 text-[#0F52BA]" />
            <h3 className="text-lg font-black text-slate-900">
              基于佰腾大数据，精准匹配到 <span className="text-[#0F52BA] font-mono text-2xl">{matchedEnterprises.length}</span> 家靶向企业
            </h3>
          </div>
          <div className="flex w-full sm:w-auto items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="搜索企业名称..."
                className="w-full bg-white border border-[#D8E2F0] rounded-xl px-4 py-2 pl-9 text-sm text-slate-900 focus:outline-hidden focus:border-[#0F52BA] shadow-sm"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200">
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
            <option value="1000+">1000件以上 (研发巨头)</option>
            <option value="100-1000">100-1000件 (研发中坚)</option>
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
          <div className="flex-1 min-w-[20px]"></div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm ml-auto">
            <Download className="w-4 h-4" /> 导出列表
          </button>
        </div>
      </div>

      {/* Matched Enterprise Cards List with Side-by-Side Similar Patent Comparison */}
      <div className="space-y-4">
        {matchedEnterprises.length === 0 ? (
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
            }} className="mt-6 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-blue-600 hover:bg-blue-50 transition-colors shadow-sm">
              重置筛选条件
            </button>
          </div>
        ) : (
        paginatedEnterprises.map((enterprise) => (
          <div
            key={enterprise.id}
            className="bg-white rounded-3xl p-6 border border-[#D8E2F0] shadow-xs hover:shadow-md hover:border-[#0F52BA] transition-all space-y-4"
          >
            {/* Enterprise Top Banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  
                  <span className="text-sm text-slate-500 font-medium">
                    {enterprise.location}
                  </span>
                  
                </div>
                <h4 
                  onClick={() => onSelectEnterprise(enterprise)}
                  className="text-xl font-black text-slate-900 hover:text-[#0F52BA] cursor-pointer flex items-center gap-2"
                >
                  <CopyableText text={enterprise.name}>{enterprise.name}</CopyableText>
                </h4>
              </div>

              <div className="flex items-center gap-3">
                
                <button
                  onClick={() => onSelectEnterprise(enterprise)}
                  className="px-4 py-2.5 bg-[#0F52BA] hover:bg-[#082C6C] text-white rounded-xl text-sm font-bold transition-all shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <span>查看企业画像</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                {onOpenAiActionPlan && (
                  <button 
                    onClick={() => onOpenAiActionPlan(enterprise)}
                    className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold transition-all shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <span>AI撰写对接方案</span>
                  </button>
                )}
              </div>
            </div>

            {/* Side-by-side Patent Comparison Box */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
              
              {/* Full Width Key Inventors */ }
              
              
              {/* Left: JLU Patent */}
              <div className="bg-blue-50/40 p-4 rounded-2xl border border-blue-100 space-y-2">
                <div className="flex items-center justify-between text-[#082C6C] font-bold">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#0F52BA]"></span>
                    吉林大学的专利
                  </span>
                  <span className="font-mono text-[11px] bg-blue-100/80 text-blue-900 px-1.5 py-0.5 rounded font-bold">{activePatent.patentNo}</span>
                </div>
                <h5 className="font-bold text-slate-900 text-sm leading-snug">{activePatent.title}</h5>
                <div className="bg-white/80 p-2.5 rounded-xl border border-blue-100/70 text-[11px] text-slate-700 leading-relaxed">
                  <span className="font-bold text-[#0F52BA] mr-1">【专利摘要】</span>
                  {activePatent.abstract}
                </div>
                {/* JLU Patent Drawings direct thumbnails */}
                <div className="mt-3 pt-2.5 border-t border-blue-100/60">
                  <div className="text-[11px] font-bold text-blue-900 mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-blue-600" />
                      说明书附图
                    </span>
                    <span className="text-[10px] text-blue-600/80 font-normal">点击可查看高清大图</span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2.5">
                    {[
                      { url: 'https://img.baiten.cn/img/80cf1c09b08cbe1163a6718e894efe0b/196/0', title: '图 1 系统总成结构拓扑' },
                      { url: 'https://img.baiten.cn/img/90bc077708a45df95599f087955931b9/196/0', title: '图 2 核心控制算法框图' },
                      { url: 'https://img.baiten.cn/img/917492d999de3001a829443916c67a58/196/0', title: '图 3 实车动态响应曲线' },
                      { url: 'https://img.baiten.cn/img/a61abd83c0a5351d6ddd490dd0f180d4/196/0', title: '图 4 电磁阻尼阀构型图' }
                    ].map((fig, idx) => (
                      <button
                        key={idx}
                        onClick={() => setFigureModalState({
                          isOpen: true,
                          patentTitle: activePatent.title,
                          patentNo: activePatent.patentNo,
                          ownerType: 'jlu',
                          ownerName: '吉林大学',
                          initialFigureIndex: idx
                        })}
                        className="group relative flex flex-col items-center bg-white rounded-lg border border-blue-200/80 hover:border-blue-500 shadow-2xs hover:shadow-md transition-all overflow-hidden p-1 cursor-pointer focus:outline-hidden"
                        title={`点击查看【附图 ${idx + 1}】高清原图`}
                      >
                        <div className="w-18 h-18 sm:w-20 sm:h-20 flex items-center justify-center bg-slate-50 rounded overflow-hidden">
                          <img 
                            src={fig.url} 
                            alt={`附图 ${idx + 1}`} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200" 
                            loading="lazy"
                          />
                        </div>
                        <div className="absolute bottom-0 inset-x-0 bg-slate-900/75 backdrop-blur-2xs text-[10px] text-center text-white py-0.5 font-medium">
                          附图 {idx + 1}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Enterprise's Similar Patent */}
              {enterprise.similarPatents && enterprise.similarPatents[0] ? (
                <div className="bg-emerald-50/40 p-4 rounded-2xl border border-emerald-100 space-y-2">
                  <div className="flex items-center justify-between text-emerald-900 font-bold">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                      企业相近公开专利
                    </span>
                    <span className="font-mono text-[11px] bg-emerald-100/80 text-emerald-900 px-1.5 py-0.5 rounded font-bold">{enterprise.similarPatents[0].patentNo}</span>
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm leading-snug">{enterprise.similarPatents[0].title}</h5>
                  <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100/70 text-[11px] text-slate-700 leading-relaxed">
                    <span className="font-bold text-emerald-800 mr-1">【专利摘要】</span>
                    {enterprise.similarPatents[0].abstract || `本发明公开了一种${enterprise.similarPatents[0].title}，涉及相关高端装备制造与精密控制领域。该技术方案针对传统工艺在响应时滞与稳定性方面的技术难题，提出基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构，显著提升了核心指标的一致性与产品使用寿命。`}
                  </div>
                  
                  {/* Enterprise Similar Patent Drawings direct thumbnails */}
                  <div className="mt-3 pt-2.5 border-t border-emerald-100/60">
                    <div className="text-[11px] font-bold text-emerald-900 mb-2 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-emerald-600" />
                        说明书附图
                      </span>
                      <span className="text-[10px] text-emerald-700/80 font-normal">点击可查看高清大图</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      {[
                        { url: 'https://img.baiten.cn/img/49c35c64b37317e777ff4e72785adcf9/196/0', title: '图 1 执行机构装配剖面图' },
                        { url: 'https://img.baiten.cn/img/6767433c59b4f076aade6acc60002725/196/0', title: '图 2 驱动控制硬件拓扑图' },
                        { url: 'https://img.baiten.cn/img/91a46e14da4eee8b87105d8c7fafdce9/196/0', title: '图 3 阶跃冲击响应试验图' }
                      ].map((fig, idx) => (
                        <button
                          key={idx}
                          onClick={() => setFigureModalState({
                            isOpen: true,
                            patentTitle: enterprise.similarPatents[0].title,
                            patentNo: enterprise.similarPatents[0].patentNo,
                            ownerType: 'enterprise',
                            ownerName: enterprise.name,
                            initialFigureIndex: idx
                          })}
                          className="group relative flex flex-col items-center bg-white rounded-lg border border-emerald-200/80 hover:border-emerald-500 shadow-2xs hover:shadow-md transition-all overflow-hidden p-1 cursor-pointer focus:outline-hidden"
                          title={`点击查看企业专利【说明书附图 ${idx + 1}】高清大图`}
                        >
                          <div className="w-18 h-18 sm:w-20 sm:h-20 flex items-center justify-center bg-slate-50 rounded overflow-hidden">
                            <img 
                              src={fig.url} 
                              alt={`说明书附图 ${idx + 1}`} 
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200" 
                              loading="lazy"
                            />
                          </div>
                          <div className="absolute bottom-0 inset-x-0 bg-slate-900/75 backdrop-blur-2xs text-[10px] text-center text-white py-0.5 font-medium">
                            说明书附图 {idx + 1}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-center text-slate-400 text-sm">
                  暂无公开比对专利
                </div>
              )}

            </div>

            {/* Bottom Actions and Contact Snapshot */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
              <div></div>

              <div className="flex items-center gap-2">

                
              </div>
            </div>

          </div>
        ))
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6 pb-4">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            上一页
          </button>
          <div className="flex items-center gap-1 px-4 text-sm text-slate-600 font-medium">
            第 <span className="text-blue-600 font-bold">{currentPage}</span> 页 / 共 {totalPages} 页
          </div>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            下一页
          </button>
        </div>
      )}

      {/* Patent Figure High-Res Inspection Modal */}
      <PatentFigureModal
        isOpen={figureModalState.isOpen}
        onClose={() => setFigureModalState(s => ({ ...s, isOpen: false }))}
        patentTitle={figureModalState.patentTitle}
        patentNo={figureModalState.patentNo}
        ownerType={figureModalState.ownerType}
        ownerName={figureModalState.ownerName}
        initialFigureIndex={figureModalState.initialFigureIndex}
      />
    </div>
  );
};
