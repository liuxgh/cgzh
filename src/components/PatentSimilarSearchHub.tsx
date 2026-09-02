import React, { useState, useRef, useEffect } from 'react';
import { PatentItem, TargetEnterprise } from '../types';
import { RegionFilter } from './RegionFilter';
import { TARGET_ENTERPRISES_DATA } from '../data/targetEnterprisesData';
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
  ChevronDown
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

      {/* Patent Selector & Parameter Filter Bar */}
      <div className="bg-white rounded-2xl p-5 border border-[#D8E2F0] shadow-xs space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          
          {/* Patent Search & Select */}
          <div className="lg:col-span-6 space-y-1.5 relative" ref={dropdownRef}>
            <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-700" />
              <span>检索并选择待转化的吉林大学专利：</span>
            </label>
            <div 
              className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 font-medium focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white transition-all cursor-pointer flex items-center justify-between gap-2"
              onClick={() => setIsDropdownOpen(true)}
            >
              <div className="truncate flex-1">
                {activePatent ? `[${activePatent.patentNo}] ${activePatent.title}` : '请选择或搜索专利...'}
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
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
          {/* Selected Patent Quick Information Strip */}
        {activePatent && (
          <div className="pt-3 border-t border-slate-100 bg-blue-50/40 -mx-5 -mb-5 p-4 rounded-b-2xl flex flex-col md:flex-row md:items-center justify-between gap-3 text-sm">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono font-bold text-[#0F52BA] bg-blue-100/80 px-2 py-0.5 rounded text-[11px]">
                  {activePatent.patentNo}
                </span>
                <span className="text-slate-500">IPC: {activePatent.ipc}</span>
                
                
              </div>
              <p className="text-slate-700 line-clamp-1 font-medium">{activePatent.abstract}</p>
            </div>
            
          </div>
        )}
      </div>

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
          <RegionFilter onFilterChange={(p, c, d) => setRegionFilter({p, c, d})} />

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
                  {enterprise.name}
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
                  <span className="font-mono text-[11px]">{activePatent.patentNo}</span>
                </div>
                <h5 className="font-bold text-slate-900">{activePatent.title}</h5>
                <p className="text-slate-600 text-[11px] line-clamp-3 leading-relaxed">
                  {activePatent.abstract}
                </p>
                <div className="flex gap-2 mt-3">
                  <div className="relative group">
                    <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=150&q=80" alt="附图1" className="w-16 h-16 object-cover rounded-md border border-blue-200/60 shadow-xs" />
                    <div className="absolute bottom-0 inset-x-0 bg-black/50 text-[9px] text-center text-white py-0.5 rounded-b-md">附图 1</div>
                  </div>
                  <div className="relative group">
                    <img src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=150&q=80" alt="附图2" className="w-16 h-16 object-cover rounded-md border border-blue-200/60 shadow-xs" />
                    <div className="absolute bottom-0 inset-x-0 bg-black/50 text-[9px] text-center text-white py-0.5 rounded-b-md">附图 2</div>
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
                    <span className="font-mono text-[11px]">{enterprise.similarPatents[0].patentNo}</span>
                  </div>
                  <h5 className="font-bold text-slate-900">{enterprise.similarPatents[0].title}</h5>
                  <p className="text-slate-600 text-[11px] line-clamp-3 leading-relaxed">
                    {enterprise.similarPatents[0].techOverlapDescription}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <div className="relative group">
                      <img src="https://images.unsplash.com/photo-1537498425277-c283d32ef9db?auto=format&fit=crop&w=150&q=80" alt="附图1" className="w-16 h-16 object-cover rounded-md border border-emerald-200/60 shadow-xs" />
                      <div className="absolute bottom-0 inset-x-0 bg-black/50 text-[9px] text-center text-white py-0.5 rounded-b-md">附图 1</div>
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
    </div>
  );
};
