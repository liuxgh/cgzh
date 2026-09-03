import React, { useState, useMemo, useRef, useEffect } from 'react';
import { TargetEnterprise, PatentItem } from '../types';
import { PATENT_INTENSIVE_PRODUCTS_DATA, PatentIntensiveProduct } from '../data/patentProductsData';
import { TARGET_ENTERPRISES_DATA } from '../data/targetEnterprisesData';
import { INITIAL_PATENTS } from '../data/mockData';
import { PatentNationalDistributionCard } from './PatentNationalDistributionCard';
import { RegionFilter } from './RegionFilter';
import { AiProductSummaryModal } from './AiProductSummaryModal';
import { 
  Package, 
  Search, 
  Building2, 
  Sparkles, 
  ChevronRight, 
  ExternalLink, 
  CheckCircle2, 
  Award, 
  Coins, 
  FileText, 
  TrendingUp, 
  Layers, 
  Filter,
  ChevronDown,
  RefreshCw,
  Cpu,
  ShieldCheck,
  Check
} from 'lucide-react';

interface PatentProductSearchHubProps {
  patents?: PatentItem[];
  selectedPatent?: PatentItem | null;
  onSelectPatent?: (patent: PatentItem) => void;
  onSelectEnterprise: (enterprise: TargetEnterprise) => void;
  onOpenAiActionPlan?: (enterprise: TargetEnterprise) => void;
  onOpenAiProductReport?: (product: PatentIntensiveProduct, patent: PatentItem) => void;
}

export const PatentProductSearchHub: React.FC<PatentProductSearchHubProps> = ({
  patents = INITIAL_PATENTS,
  selectedPatent,
  onSelectPatent,
  onSelectEnterprise,
  onOpenAiActionPlan,
  onOpenAiProductReport
}) => {
  const [currentPatentId, setCurrentPatentId] = useState<string>(selectedPatent?.id || patents[0]?.id || 'pat-001');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [patentSearchQuery, setPatentSearchQuery] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [regionFilter, setRegionFilter] = useState<{ p: string; c: string; d: string }>({ p: 'all', c: 'all', d: 'all' });
  const [industryFilter, setIndustryFilter] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<PatentIntensiveProduct>(PATENT_INTENSIVE_PRODUCTS_DATA[0]);
  const [summaryModalProduct, setSummaryModalProduct] = useState<PatentIntensiveProduct | null>(null);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (selectedPatent?.id) {
      setCurrentPatentId(selectedPatent.id);
    }
  }, [selectedPatent]);

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

  const handlePatentChange = (id: string) => {
    setCurrentPatentId(id);
    const p = patents.find(item => item.id === id);
    if (p && onSelectPatent) {
      onSelectPatent(p);
    }
  };

  // Filter products by UI controls (industry, region, search keyword)
  const finalFilteredProducts = useMemo(() => {
    return PATENT_INTENSIVE_PRODUCTS_DATA.filter(prod => {
      if (industryFilter !== 'all' && !prod.industryCategory.includes(industryFilter)) {
        return false;
      }
      
      const ent = TARGET_ENTERPRISES_DATA.find(e => e.id === prod.targetEnterpriseId);
      
      // Region Filter Logic
      if (regionFilter.p !== 'all') {
        const matchProv = (ent && (ent.province?.includes(regionFilter.p) || ent.city?.includes(regionFilter.p))) || prod.location.includes(regionFilter.p);
        if (!matchProv) return false;
      }
      if (regionFilter.c !== 'all') {
        const matchCity = (ent && ent.city?.includes(regionFilter.c)) || prod.location.includes(regionFilter.c);
        if (!matchCity) return false;
      }
      if (regionFilter.d !== 'all' && ent) {
        const matchDist = (ent.address?.includes(regionFilter.d) || ent.location?.includes(regionFilter.d));
        if (!matchDist) return false;
      }

      if (searchKeyword.trim()) {
        const q = searchKeyword.toLowerCase().trim();
        const matchName = prod.productName.toLowerCase().includes(q) || prod.filingEnterprise.toLowerCase().includes(q);
        const matchCode = prod.productCode.toLowerCase().includes(q);
        const matchSynergy = prod.jluSynergyPatentField.toLowerCase().includes(q) || prod.matchedJluPatentTitle.toLowerCase().includes(q);
        const matchComponent = prod.keyComponents?.some(c => c.toLowerCase().includes(q));
        if (!matchName && !matchCode && !matchSynergy && !matchComponent) return false;
      }
      return true;
    });
  }, [industryFilter, regionFilter, searchKeyword]);

  // Target enterprises mapped to patent-intensive products (for map visualizer)
  const productMatchedEnterprises = useMemo(() => {
    return finalFilteredProducts.map(p => {
      const ent = TARGET_ENTERPRISES_DATA.find(e => e.id === p.targetEnterpriseId);
      if (ent) return ent;
      // Fallback synthetic target enterprise for mapping if not found
      return {
        id: `ent-${p.id}`,
        name: p.filingEnterprise,
        shortName: p.filingEnterprise.substring(0, 4),
        creditCode: '91310000XXXXXXXXXX',
        location: p.location,
        province: p.location.substring(0, 3),
        city: p.location.substring(3),
        industry: p.industryCategory,
        registeredCapital: '10000 万元人民币',
        scale: '大型企业',
        enterpriseType: '股份有限公司',
        revenue: '100亿以上',
        financingStage: '已上市',
        establishedDate: '2015-01-01',
        legalRep: '负责人',
        patentScale: '50-100件',
        totalPatents: p.corePatentsTotal,
        inventionPatentCount: p.corePatentsTotal,
        matchSource: 'similar_patent',
        matchScore: p.matchScore,
        status: '存续',
        address: p.location,
        phone: '010-88888888',
        email: 'info@enterprise.com',
        website: 'www.enterprise.com',
        businessScope: '智能制造及研发'
      } as unknown as TargetEnterprise;
    });
  }, [finalFilteredProducts]);

  const handleOpenEnterpriseByProduct = (targetEnterpriseId: string) => {
    const ent = TARGET_ENTERPRISES_DATA.find(e => e.id === targetEnterpriseId);
    if (ent) {
      onSelectEnterprise(ent);
    }
  };

  const handleOpenAiByProduct = (targetEnterpriseId: string) => {
    if (!onOpenAiActionPlan) return;
    const ent = TARGET_ENTERPRISES_DATA.find(e => e.id === targetEnterpriseId);
    if (ent) {
      onOpenAiActionPlan(ent);
    }
  };

  const currentProduct = selectedProduct || finalFilteredProducts[0] || PATENT_INTENSIVE_PRODUCTS_DATA[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Module Header */}
      <div className="bg-linear-to-r from-[#082C6C] via-[#0F52BA] to-[#0A3D8F] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-blue-400/30">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full bg-white/15 text-blue-100 text-sm font-bold border border-white/20 flex items-center gap-1.5 backdrop-blur-xs">
            <Package className="w-4 h-4 text-emerald-300" />
            <span>核心寻客路径三：国家专利密集型产品备案公开数据</span>
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
          通过吉大专利 ➔ 国家专利密集型产品找企业
        </h2>
        <p className="text-sm sm:text-base text-blue-100/90 mt-2 max-w-3xl leading-relaxed">
          先检索并选择待转化的吉林大学专利成果，系统将自动关联国家专利密集型产品备案公开数据，穿透匹配具备技术协同与采购升级需求的目标制造企业。
        </p>
      </div>

      {/* Step 1: Search & Select JLU Patent */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#D8E2F0] shadow-xs">
        <div className="w-full space-y-1.5 relative" ref={dropdownRef}>
          <label className="text-sm font-bold text-slate-700 flex items-center justify-between gap-1.5">
            <span className="flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#0F52BA]" />
              <span>第一步：检索并选择待转化的吉林大学专利：</span>
            </span>
            <span className="text-xs text-slate-500 font-normal">
              已选专利将自动穿透关联国家专利密集型产品公开数据
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
      </div>

      {/* Step 2: National Geographic Map & Province Distribution Visualizer */}
      <PatentNationalDistributionCard
        activePatent={activePatent}
        title="当前吉大专利匹配的国家专利密集型产品与备案制造企业分布"
        enterprises={productMatchedEnterprises}
        selectedProvince={regionFilter.p}
        onSelectProvince={(prov) => {
          setRegionFilter({ p: prov, c: 'all', d: 'all' });
        }}
        filteredCount={finalFilteredProducts.length}
      />

      {/* Step 3: Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-5 border border-[#D8E2F0] shadow-xs space-y-4">
        {/* Industry Category Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-bold text-slate-700 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5 text-[#0F52BA]" />
            行业门类：
          </span>
          {['all', '动力蓄电池', '乘用车', '光学仪器', '体外诊断', '机床', '显示器件', '高性能纤维', '农业机械'].map((cat) => (
            <button
              key={cat}
              onClick={() => setIndustryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                industryFilter === cat
                  ? 'bg-[#0F52BA] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? '全部行业' : cat}
            </button>
          ))}
        </div>

        {/* Region Cascader & Search Keyword */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-3 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-bold text-slate-600 flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-[#0F52BA]" /> 地区过滤:
            </span>
            <RegionFilter 
              value={regionFilter} 
              onFilterChange={(p, c, d) => setRegionFilter({ p, c, d })} 
            />
            {regionFilter.p !== 'all' && (
              <button
                onClick={() => setRegionFilter({ p: 'all', c: 'all', d: 'all' })}
                className="text-xs text-[#0F52BA] hover:underline font-bold bg-blue-50 px-2 py-1 rounded-md border border-blue-100 cursor-pointer"
              >
                清除地区筛选
              </button>
            )}
          </div>

          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="搜索备案产品、企业或技术关键词..."
              className="w-full bg-[#F8FAFC] border border-[#D8E2F0] rounded-xl px-3.5 py-2 pl-9 pr-8 text-sm text-slate-900 focus:outline-hidden focus:border-[#0F52BA] focus:bg-white font-medium"
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
        </div>
      </div>

      {/* Products Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-emerald-600" />
          <h3 className="text-lg font-black text-slate-900">
            备案专利密集型产品与吉大对口技术 ({finalFilteredProducts.length}项)
          </h3>
        </div>
        <div className="text-xs text-slate-500 font-medium">
          点击卡片可与上方全国地图联动下钻分析
        </div>
      </div>

      {/* Step 4: Matched Products & Enterprises Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {finalFilteredProducts.length > 0 ? (
          finalFilteredProducts.map((prod) => {
            const isSelected = selectedProduct?.id === prod.id;
            return (
              <div
                key={prod.id}
                onClick={() => setSelectedProduct(prod)}
                className={`bg-white rounded-3xl p-6 border-2 transition-all cursor-pointer space-y-4 shadow-xs hover:shadow-md ${
                  isSelected
                    ? 'border-emerald-600 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 hover:border-emerald-300'
                }`}
              >
                {/* Top Filing Badges */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                        {prod.industryCategory}
                      </span>
                      <span className="font-mono text-xs text-slate-400">
                        {prod.productCode}
                      </span>
                    </div>
                    <h4 className="text-xl font-black text-slate-900 group-hover:text-emerald-700">
                      {prod.productName}
                    </h4>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100/70 text-emerald-800 text-[11px] font-bold shrink-0">
                    {prod.status}
                  </span>
                </div>

                {/* Product Description */}
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {prod.productDescription}
                </p>

                {/* Key Components Tags */}
                {prod.keyComponents && prod.keyComponents.length > 0 && (
                  <div className="space-y-1">
                    <div className="text-[11px] font-bold text-slate-500">核心组成与关键零部件：</div>
                    <div className="flex flex-wrap gap-1.5">
                      {prod.keyComponents.map((comp, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs font-medium border border-slate-200/60">
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Enterprise Info Strip */}
                <div className="bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 text-sm">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 text-xs">备案生产企业：</span>
                      <span 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenEnterpriseByProduct(prod.targetEnterpriseId);
                        }}
                        className="font-bold text-[#003d80] hover:underline flex items-center gap-1 cursor-pointer text-sm"
                      >
                        <Building2 className="w-4 h-4 text-[#0F52BA]" />
                        {prod.filingEnterprise}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">{prod.location}</span>
                  </div>
                </div>

                {/* Matched JLU Technology Box */}
                <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 text-sm space-y-2">
                  <div className="flex items-center justify-between text-emerald-950 font-bold flex-wrap gap-1">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      吉林大学对口匹配专利成果：
                    </span>
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm">
                    <span className="font-mono text-[#0F52BA] bg-blue-50 px-1.5 py-0.5 rounded mr-1.5 text-xs">
                      {activePatent.patentNo}
                    </span>
                    {activePatent.title}
                  </h5>
                  <div className="text-xs text-slate-600 leading-relaxed bg-white/80 p-2.5 rounded-xl border border-emerald-100">
                    <strong className="text-emerald-900 font-bold">专利摘要：</strong>
                    <span>{activePatent.abstract || activePatent.description || '暂无摘要'}</span>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-sm">
                  <button
                    onClick={() => handleOpenEnterpriseByProduct(prod.targetEnterpriseId)}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer text-xs sm:text-sm"
                  >
                    <Building2 className="w-4 h-4 text-slate-500" />
                    <span>查看企业画像</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenAiProductReport) {
                        onOpenAiProductReport(prod, activePatent);
                      } else {
                        setSummaryModalProduct(prod);
                        setIsSummaryModalOpen(true);
                      }
                    }}
                    className="px-4 py-2 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer text-xs sm:text-sm"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-200" />
                    <span>AI转化建议</span>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-2 bg-white rounded-3xl p-12 border border-dashed border-slate-300 text-center space-y-3">
            <Package className="w-10 h-10 text-slate-300 mx-auto" />
            <div className="text-slate-700 font-bold">当前筛选条件下暂无匹配的国家备案专利产品</div>
            <p className="text-xs text-slate-500">尝试重置筛选条件以查看全部产品</p>
            <button
              onClick={() => {
                setIndustryFilter('all');
                setRegionFilter({ p: 'all', c: 'all', d: 'all' });
                setSearchKeyword('');
              }}
              className="text-xs font-bold text-[#0F52BA] hover:underline bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 cursor-pointer"
            >
              重置筛选条件
            </button>
          </div>
        )}
      </div>

      {/* AI Product Summary Modal */}
      <AiProductSummaryModal
        isOpen={isSummaryModalOpen}
        onClose={() => setIsSummaryModalOpen(false)}
        product={summaryModalProduct}
        patent={activePatent}
        onOpenAiActionPlan={(entId) => {
          setIsSummaryModalOpen(false);
          handleOpenAiByProduct(entId);
        }}
      />

    </div>
  );
};
