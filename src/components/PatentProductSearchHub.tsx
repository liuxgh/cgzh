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
  ChevronLeft,
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
  Check,
  Globe
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

  // Pagination states for 备案专利密集型产品与吉大对口技术列表
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(4);

  useEffect(() => {
    if (selectedPatent?.id) {
      setCurrentPatentId(selectedPatent.id);
    }
  }, [selectedPatent]);

  // Reset to first page when any search/filter criteria or patent changes
  useEffect(() => {
    setCurrentPage(1);
  }, [industryFilter, regionFilter, searchKeyword, currentPatentId]);

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

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(finalFilteredProducts.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedProducts = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * pageSize;
    return finalFilteredProducts.slice(startIndex, startIndex + pageSize);
  }, [finalFilteredProducts, safeCurrentPage, pageSize]);

  // Distinct target enterprises mapped to patent-intensive products (for map visualizer & metrics)
  const productMatchedEnterprises = useMemo(() => {
    const seen = new Set<string>();
    const list: TargetEnterprise[] = [];
    finalFilteredProducts.forEach(p => {
      const ent = TARGET_ENTERPRISES_DATA.find(e => e.id === p.targetEnterpriseId);
      const key = ent?.id || p.filingEnterprise;
      if (!seen.has(key)) {
        seen.add(key);
        if (ent) {
          list.push(ent);
        } else {
          list.push({
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
            matchSource: 'patent_product',
            matchScore: 95,
            status: '存续',
            address: p.location,
            phone: '010-88888888',
            email: 'info@enterprise.com',
            website: 'www.enterprise.com',
            businessScope: '智能制造及研发'
          } as unknown as TargetEnterprise);
        }
      }
    });
    return list;
  }, [finalFilteredProducts]);

  const handleOpenEnterpriseByProduct = (targetEnterpriseId: string, prod?: PatentIntensiveProduct) => {
    let ent = TARGET_ENTERPRISES_DATA.find(e => e.id === targetEnterpriseId);
    if (!ent && prod) {
      ent = productMatchedEnterprises.find(e => e.id === `ent-${prod.id}` || e.name === prod.filingEnterprise);
    }
    if (ent) {
      onSelectEnterprise(ent);
    }
  };

  const handleOpenAiByProduct = (targetEnterpriseId: string, prod?: PatentIntensiveProduct) => {
    if (!onOpenAiActionPlan) return;
    let ent = TARGET_ENTERPRISES_DATA.find(e => e.id === targetEnterpriseId);
    if (!ent && prod) {
      ent = productMatchedEnterprises.find(e => e.id === `ent-${prod.id}` || e.name === prod.filingEnterprise);
    }
    if (ent) {
      onOpenAiActionPlan(ent);
    }
  };

  const currentProduct = selectedProduct || finalFilteredProducts[0] || PATENT_INTENSIVE_PRODUCTS_DATA[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Module Header */}
      <div className="bg-linear-to-r from-[#06382F] via-[#0B5345] to-[#052E26] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-emerald-400/30">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full bg-white/15 text-emerald-100 text-sm font-bold border border-white/20 flex items-center gap-1.5 backdrop-blur-xs">
            <Package className="w-4 h-4 text-emerald-300" />
            <span>核心寻客路径三：国家专利密集型产品备案公开数据</span>
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
          通过吉大专利 ➔ 国家专利密集型产品找企业
        </h2>
        <p className="text-sm sm:text-base text-emerald-100/90 mt-2 max-w-3xl leading-relaxed">
          先检索并选择待转化的吉林大学专利成果，系统将自动关联国家专利密集型产品备案公开数据，穿透匹配具备技术协同与采购升级需求的目标制造企业。
        </p>
      </div>

      {/* Prominent Introduction to National Patent-Intensive Products */}
      <div className="bg-linear-to-r from-blue-50/90 via-indigo-50/60 to-emerald-50/70 rounded-2xl p-5 sm:p-6 border border-blue-200/80 shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 relative z-10">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0F52BA] text-white text-xs font-bold shadow-2xs">
                <Award className="w-3.5 h-3.5 text-amber-300" />
                什么是“国家专利密集型产品”？
              </span>
            </div>
            
            <p className="text-sm sm:text-[15px] text-slate-800 leading-relaxed font-semibold">
              国家专利密集型产品是全国企业在《<span className="text-[#0F52BA] font-bold">国家专利密集型产品备案认定试点平台</span>》上进行备案或认定的专利密集型产品。
            </p>
          </div>

          {/* Eye-catching Platform Link Button */}
          <div className="shrink-0 w-full lg:w-auto flex flex-col items-stretch lg:items-end gap-1.5">
            <a
              href="https://www.zlcp.org.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#0F52BA] hover:bg-[#082C6C] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-lg cursor-pointer group"
              title="点击在新窗口打开：国家专利密集型产品备案认定试点平台 (https://www.zlcp.org.cn/)"
            >
              <Globe className="w-4 h-4 text-blue-200 group-hover:rotate-12 transition-transform" />
              <span>国家专利密集型产品备案认定试点平台</span>
              <ExternalLink className="w-4 h-4 text-blue-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <div className="text-[11px] text-slate-500 font-mono text-center lg:text-right flex items-center justify-center lg:justify-end gap-1">
              <span>官方访问入口：</span>
              <a 
                href="https://www.zlcp.org.cn/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#0F52BA] hover:underline font-bold"
              >
                https://www.zlcp.org.cn/
              </a>
            </div>
          </div>
        </div>
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
        matchedProductsCount={finalFilteredProducts.length}
        defaultCollapsed={true}
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

      {/* Step 4: Matched Products & Enterprises Cards List */}
      <div className="space-y-4">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((prod) => {
            const isSelected = selectedProduct?.id === prod.id;
            const ent = TARGET_ENTERPRISES_DATA.find(e => e.id === prod.targetEnterpriseId);

            return (
              <div
                key={prod.id}
                onClick={() => setSelectedProduct(prod)}
                className={`bg-white rounded-2xl border transition-all cursor-pointer shadow-xs hover:shadow-md p-5 space-y-4 group ${
                  isSelected
                    ? 'border-[#0F52BA] ring-2 ring-[#0F52BA]/20'
                    : 'border-slate-200 hover:border-blue-300'
                }`}
              >
                {/* 1. Top Enterprise Banner: Prominent Enterprise Name + Location + Action Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="p-1 rounded-lg bg-blue-50 text-[#0F52BA]">
                        <Building2 className="w-4 h-4" />
                      </span>
                      {/* 企业名称显眼设计 */}
                      <h4
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenEnterpriseByProduct(prod.targetEnterpriseId, prod);
                        }}
                        className="text-lg sm:text-xl font-black text-slate-900 hover:text-[#0F52BA] transition-colors cursor-pointer tracking-tight"
                        title={prod.filingEnterprise}
                      >
                        {prod.filingEnterprise}
                      </h4>
                      <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-[#0F52BA] border border-blue-200/60 shrink-0">
                        {prod.location}
                      </span>
                      {ent?.scale && (
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600 shrink-0">
                          {ent.scale}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons: 保留“查看企业画像”、“AI转化建议按钮” */}
                  <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenEnterpriseByProduct(prod.targetEnterpriseId, prod);
                      }}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl flex items-center gap-1.5 transition-all text-xs sm:text-sm cursor-pointer border border-slate-200/80 shadow-2xs"
                      title="查看该企业的企业画像详情"
                    >
                      <Building2 className="w-4 h-4 text-slate-500" />
                      <span>查看企业画像</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onOpenAiProductReport) {
                          onOpenAiProductReport(prod, activePatent);
                        } else {
                          setSummaryModalProduct(prod);
                          setIsSummaryModalOpen(true);
                        }
                      }}
                      className="px-4 py-2 bg-linear-to-r from-blue-600 via-[#0F52BA] to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-xs text-xs sm:text-sm cursor-pointer"
                      title="AI转化对接建议分析"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>AI转化建议</span>
                    </button>
                  </div>
                </div>

                {/* 2. Product Body: Product Image + Product Details & Specs */}
                <div className="flex flex-col md:flex-row gap-5 items-stretch">
                  {/* Product Image Column */}
                  <div className="w-full md:w-56 lg:w-64 shrink-0 bg-slate-50 rounded-xl border border-slate-200/90 p-2.5 flex flex-col items-center justify-between relative overflow-hidden">
                    <div className="w-full h-36 sm:h-40 flex items-center justify-center overflow-hidden rounded-lg bg-white">
                      {prod.productImageUrl ? (
                        <img
                          src={prod.productImageUrl}
                          alt={prod.productName}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                            const fallback = (e.target as HTMLElement).nextElementSibling;
                            if (fallback) (fallback as HTMLElement).style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div
                        className="w-full h-full flex flex-col items-center justify-center text-blue-400 p-4 text-center"
                        style={{ display: prod.productImageUrl ? 'none' : 'flex' }}
                      >
                        <Package className="w-10 h-10 text-blue-300 mb-1.5" />
                        <span className="text-xs text-slate-500 font-semibold">{prod.productName}</span>
                      </div>
                    </div>

                    {/* Image Footer Tags */}
                    <div className="mt-2 w-full flex items-center justify-between text-[11px] text-slate-500 font-medium px-1">
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {prod.filingYear || '2025年度'}备案
                      </span>
                      <span className="text-slate-500 font-mono font-bold">
                        关联专利: {prod.corePatentsTotal}项
                      </span>
                    </div>
                  </div>

                  {/* Product Information Column */}
                  <div className="flex-1 space-y-3 flex flex-col justify-between">
                    <div>
                      {/* Product Name and Code */}
                      <div className="flex items-center gap-2 flex-wrap mb-2.5">
                        <span className="text-xs font-bold px-2.5 py-0.5 bg-[#0F52BA]/10 text-[#0F52BA] rounded-md">
                          备案产品
                        </span>
                        <h5 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#0F52BA] transition-colors">
                          {prod.productName}
                        </h5>
                        <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          备案号: {prod.productCode}
                        </span>
                      </div>

                      {/* 4-Column Metadata Strip */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 py-2.5 px-3 bg-slate-50/80 rounded-xl border border-slate-100 text-xs mb-3">
                        <div>
                          <div className="text-[11px] text-slate-400 font-medium">产品分类层级</div>
                          <div className="font-semibold text-slate-700 truncate mt-0.5" title={prod.productCategoryHierarchy || prod.industryCategory}>
                            {prod.productCategoryHierarchy || prod.industryCategory}
                          </div>
                        </div>
                        <div>
                          <div className="text-[11px] text-slate-400 font-medium">关联核心专利</div>
                          <div className="font-bold text-slate-900 font-mono mt-0.5">
                            {prod.corePatentsTotal} 项
                          </div>
                        </div>
                        <div>
                          <div className="text-[11px] text-slate-400 font-medium">年产值估算</div>
                          <div className="font-bold text-emerald-700 font-mono mt-0.5">
                            {prod.annualOutputValue || '50亿-100亿元'}
                          </div>
                        </div>
                        <div>
                          <div className="text-[11px] text-slate-400 font-medium">备案状态</div>
                          <div className="font-bold text-blue-700 mt-0.5">
                            {prod.status}
                          </div>
                        </div>
                      </div>

                      {/* Product Description */}
                      <div className="text-xs text-slate-600 leading-relaxed line-clamp-2 text-justify bg-white p-2.5 rounded-lg border border-slate-200/70">
                        <span className="font-bold text-slate-700 mr-1">【产品简介】</span>
                        {prod.productDescription}
                      </div>
                    </div>

                    {/* 吉大对口技术协同转化点 */}
                    {prod.techSynergyDetail && (
                      <div className="pt-2 border-t border-slate-100 flex items-start gap-2 text-xs">
                        <span className="px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded font-bold shrink-0">
                          吉大对口协同
                        </span>
                        <span className="text-slate-600 line-clamp-1 leading-snug">
                          {prod.techSynergyDetail}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-2xl p-12 border border-dashed border-slate-300 text-center space-y-3">
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

      {/* Pagination Bar */}
      {finalFilteredProducts.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3.5 pb-2.5 px-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium flex items-center gap-1 flex-wrap">
            <span>显示第</span>
            <span className="font-bold text-slate-800 font-mono">
              {(safeCurrentPage - 1) * pageSize + 1}
            </span>
            <span>至</span>
            <span className="font-bold text-slate-800 font-mono">
              {Math.min(safeCurrentPage * pageSize, finalFilteredProducts.length)}
            </span>
            <span>项，共</span>
            <span className="font-bold text-[#0F52BA] font-mono">
              {finalFilteredProducts.length}
            </span>
            <span>项备案专利产品</span>
            <span className="text-slate-400 ml-1">
              (第 <strong className="text-slate-700 font-mono">{safeCurrentPage}</strong> / {totalPages} 页)
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Page Size Selector */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mr-1">
              <span>每页</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-700 font-bold focus:outline-hidden focus:border-[#0F52BA] cursor-pointer"
              >
                <option value={4}>4 条</option>
                <option value={5}>5 条</option>
                <option value={8}>8 条</option>
                <option value={10}>10 条</option>
              </select>
            </div>

            {/* Previous Page Button */}
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safeCurrentPage === 1}
              className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>上一页</span>
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                    safeCurrentPage === pageNum
                      ? 'bg-[#0F52BA] text-white shadow-2xs font-mono'
                      : 'text-slate-600 hover:bg-slate-100 font-mono'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            {/* Next Page Button */}
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safeCurrentPage === totalPages}
              className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>下一页</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

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
