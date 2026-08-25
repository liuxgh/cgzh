import React, { useState } from 'react';
import { TargetEnterprise, PatentItem } from '../types';
import { PATENT_INTENSIVE_PRODUCTS_DATA, PatentIntensiveProduct } from '../data/patentProductsData';
import { TARGET_ENTERPRISES_DATA } from '../data/targetEnterprisesData';
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
  Filter
} from 'lucide-react';

interface PatentProductSearchHubProps {
  onSelectEnterprise: (enterprise: TargetEnterprise) => void;
  onSelectPatent?: (patent: PatentItem) => void;
  onOpenAiAgentWithEnterprise?: (enterprise: TargetEnterprise) => void;
}

export const PatentProductSearchHub: React.FC<PatentProductSearchHubProps> = ({
  onSelectEnterprise,
  onOpenAiAgentWithEnterprise
}) => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [industryFilter, setIndustryFilter] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<PatentIntensiveProduct>(PATENT_INTENSIVE_PRODUCTS_DATA[0]);

  const filteredProducts = PATENT_INTENSIVE_PRODUCTS_DATA.filter(prod => {
    if (industryFilter !== 'all' && !prod.industryCategory.includes(industryFilter)) return false;
    if (searchKeyword.trim()) {
      const q = searchKeyword.toLowerCase();
      const matchName = prod.productName.toLowerCase().includes(q) || prod.filingEnterprise.toLowerCase().includes(q);
      const matchCode = prod.productCode.toLowerCase().includes(q);
      const matchSynergy = prod.jluSynergyPatentField.toLowerCase().includes(q);
      if (!matchName && !matchCode && !matchSynergy) return false;
    }
    return true;
  });

  const handleOpenEnterpriseByProduct = (targetEnterpriseId: string) => {
    const ent = TARGET_ENTERPRISES_DATA.find(e => e.id === targetEnterpriseId);
    if (ent) {
      onSelectEnterprise(ent);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Module Header */}
      <div className="bg-linear-to-r from-[#082C6C] via-[#0F52BA] to-[#0A3D8F] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-blue-400/30">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full bg-white/15 text-blue-100 text-sm font-bold border border-white/20 flex items-center gap-1.5 backdrop-blur-xs">
            <Package className="w-4 h-4 text-emerald-300" />
            <span>核心寻客路径三：国家专利密集型产品备案库</span>
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-sm font-semibold">
            中国专利保护协会运营 • 20万+量产高产值产品
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
          通过专利密集型产品 ➔ 锁定真实量产与采购实力企业
        </h2>
        <p className="text-sm sm:text-base text-blue-100/90 mt-2 max-w-3xl leading-relaxed">
          专利密集型产品是指以高质量发明专利为核心支撑、具备显著市场规模与工业量产能力的标志性高技术产品。通过穿透备案产品与其关键零部件供应链，吉大老师可以直接找到<strong>正在大规模量产、对技术升级有真实采购与承接能力</strong>的实力规上企业。
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-5 border border-[#D8E2F0] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-bold text-slate-700 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            行业门类：
          </span>
          {['all', '动力蓄电池', '乘用车', '光学仪器', '体外诊断', '机床', '显示器件', '高性能纤维', '农业机械'].map((cat) => (
            <button
              key={cat}
              onClick={() => setIndustryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                industryFilter === cat
                  ? 'bg-[#0F52BA] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? '全部行业' : cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="搜索备案产品、企业或吉大技术..."
            className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2 pl-8 text-sm text-slate-900 focus:outline-hidden focus:border-[#0F52BA] focus:bg-white"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
        </div>
      </div>

      {/* Products Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredProducts.map((prod) => {
          const isSelected = selectedProduct.id === prod.id;
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
                    <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 text-[11px] font-bold rounded-md border border-emerald-200">
                      {prod.status}
                    </span>
                    <span className="font-mono text-sm text-slate-400">{prod.productCode}</span>
                    <span className="text-sm text-slate-400">{prod.location}</span>
                  </div>
                  <h4 className="text-xl font-black text-slate-900 group-hover:text-emerald-700">
                    {prod.productName}
                  </h4>
                </div>

                
              </div>

              {/* Enterprise Info Strip */}
              <div className="flex items-center justify-between bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 text-sm">
                <span className="text-slate-500">备案生产企业：</span>
                <span 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenEnterpriseByProduct(prod.targetEnterpriseId);
                  }}
                  className="font-bold text-[#003d80] hover:underline flex items-center gap-1"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  {prod.filingEnterprise}
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </span>
              </div>

              {/* Key Components */}
              <div className="space-y-1.5 text-sm">
                <span className="text-slate-500 font-semibold block text-[11px]">关键技术零部件 / 核心模块：</span>
                <div className="flex flex-wrap gap-1.5">
                  {prod.keyComponents.map((comp, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-[11px] font-medium">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Matched JLU Technology Synergy Box */}
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 text-sm space-y-2">
                <div className="flex items-center justify-between text-emerald-950 font-bold">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    吉林大学对口匹配专利成果：
                  </span>
                  <span className="text-[11px] text-emerald-700">{prod.matchedJluInventor} ({prod.matchedJluCollege.split('(')[0]})</span>
                </div>
                <h5 className="font-bold text-slate-900">{prod.matchedJluPatentTitle}</h5>
                <p className="text-emerald-900 text-[11px] leading-relaxed bg-white/70 p-2.5 rounded-xl border border-emerald-100">
                  <strong>🎯 采购与产业化切入点：</strong>
                  {prod.techSynergyDetail}
                </p>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-2 flex items-center justify-between text-sm">
                <span className="text-slate-400 text-[11px]">
                  核心发明专利保护：<strong className="text-slate-700 font-mono">{prod.corePatentsTotal} 项</strong>
                </span>
                <button
                  onClick={() => handleOpenEnterpriseByProduct(prod.targetEnterpriseId)}
                  className="px-3.5 py-1.5 bg-[#003d80] hover:bg-blue-900 text-white font-bold rounded-xl flex items-center gap-1 transition-all shadow-xs"
                >
                  <span>查看企业与联络人</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
