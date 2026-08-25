import React, { useState } from 'react';
import { PatentItem, TargetEnterprise } from '../types';
import { TARGET_ENTERPRISES_DATA } from '../data/targetEnterprisesData';
import { 
  ShieldCheck, 
  Search, 
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
  RefreshCw
} from 'lucide-react';

interface PatentSimilarSearchHubProps {
  patents: PatentItem[];
  selectedPatent: PatentItem | null;
  onSelectPatent: (patent: PatentItem) => void;
  onSelectEnterprise: (enterprise: TargetEnterprise) => void;
  onOpenAiAgentWithEnterprise?: (enterprise: TargetEnterprise) => void;
}

export const PatentSimilarSearchHub: React.FC<PatentSimilarSearchHubProps> = ({
  patents,
  selectedPatent,
  onSelectPatent,
  onSelectEnterprise,
  onOpenAiAgentWithEnterprise
}) => {
  const [currentPatentId, setCurrentPatentId] = useState<string>(selectedPatent?.id || patents[0]?.id || 'pat-001');
  const [similarityThreshold, setSimilarityThreshold] = useState<number>(85);
  const [enterpriseTypeFilter, setEnterpriseTypeFilter] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

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
    if (enterpriseTypeFilter !== 'all' && ent.enterpriseType !== enterpriseTypeFilter) return false;
    if (searchKeyword.trim()) {
      const q = searchKeyword.toLowerCase();
      const matchName = ent.name.toLowerCase().includes(q) || ent.shortName.toLowerCase().includes(q);
      const matchPatent = ent.similarPatents?.some(p => p.title.toLowerCase().includes(q) || p.patentNo.toLowerCase().includes(q));
      if (!matchName && !matchPatent) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Module Header */}
      <div className="bg-linear-to-r from-[#082C6C] via-[#0F52BA] to-[#0A3D8F] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-blue-400/30">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full bg-white/15 text-blue-100 text-sm font-bold border border-white/20 flex items-center gap-1.5 backdrop-blur-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>核心寻客路径一：专利语义向量大模型</span>
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-sm font-semibold">
            佰腾中国专利数据库（2亿+篇）全量比对
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
          通过吉大专利 ➔ 匹配全国相似专利找买家企业
        </h2>
        <p className="text-sm sm:text-base text-blue-100/90 mt-2 max-w-3xl leading-relaxed">
          基于吉大专利的<strong>独立权利要求、技术特征词与IPC分类号</strong>，在佰腾全国企业专利池中进行多维向量相似度检索。精准找出已经在该领域申请了相近技术路线专利的全国企业——这些企业具备成熟的研发体系，是技术受让、许可与合作研发的最精准买家。
        </p>
      </div>

      {/* Patent Selector & Parameter Filter Bar */}
      <div className="bg-white rounded-2xl p-5 border border-[#D8E2F0] shadow-xs space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          
          {/* Patent Dropdown */}
          <div className="lg:col-span-6 space-y-1.5">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#0F52BA]" />
              <span>选择待转化的吉林大学专利（或从专利库挑选）：</span>
            </label>
            <select
              value={currentPatentId}
              onChange={(e) => handlePatentChange(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-[#0F52BA] focus:bg-white transition-all cursor-pointer"
            >
              {patents.map(p => (
                <option key={p.id} value={p.id}>
                  [{p.patentNo}] {p.title} ({p.college} - {p.inventor})
                </option>
              ))}
            </select>
          </div>

          {/* Similarity Threshold Slider */}
          <div className="lg:col-span-3 space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold text-slate-700">相似度阈值过滤</span>
              <span className="font-mono font-bold text-[#0F52BA]">{similarityThreshold}%+</span>
            </div>
            <input
              type="range"
              min="70"
              max="98"
              value={similarityThreshold}
              onChange={(e) => setSimilarityThreshold(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0F52BA]"
            />
          </div>

          {/* Enterprise Type Filter */}
          <div className="lg:col-span-3 space-y-1.5">
            <label className="text-sm font-bold text-slate-700 block">企业资质类型筛选</label>
            <select
              value={enterpriseTypeFilter}
              onChange={(e) => setEnterpriseTypeFilter(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-[#0F52BA] cursor-pointer"
            >
              <option value="all">全部企业类型</option>
              <option value="上市企业">上市企业</option>
              <option value="国家级专精特新“小巨人”">国家级专精特新“小巨人”</option>
              <option value="制造业单项冠军">制造业单项冠军</option>
              <option value="行业龙头国企">行业龙头国企</option>
            </select>
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
                <span className="text-slate-500">成熟度: {activePatent.trlDescription.split('-')[0]}</span>
                <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  佰腾评分: {activePatent.baitengScore.overall}分
                </span>
              </div>
              <p className="text-slate-700 line-clamp-1 font-medium">{activePatent.abstract}</p>
            </div>
            <div className="shrink-0 flex items-center gap-2">
              <span className="text-sm text-slate-500">评估价值：<strong className="text-slate-900">{activePatent.valuationRange}</strong></span>
            </div>
          </div>
        )}
      </div>

      {/* Matching Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-[#0F52BA]" />
          <h3 className="text-lg font-black text-slate-900">
            已成功匹配到 <span className="text-[#0F52BA] font-mono">{matchedEnterprises.length}</span> 家拥有高度相近专利的全国靶向企业
          </h3>
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="搜索企业名或专利关键词..."
            className="w-full bg-white border border-[#D8E2F0] rounded-xl px-3 py-1.5 pl-8 text-sm text-slate-900 focus:outline-hidden focus:border-[#0F52BA]"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
        </div>
      </div>

      {/* Matched Enterprise Cards List with Side-by-Side Similar Patent Comparison */}
      <div className="space-y-4">
        {matchedEnterprises.map((enterprise) => (
          <div
            key={enterprise.id}
            className="bg-white rounded-3xl p-6 border border-[#D8E2F0] shadow-xs hover:shadow-md hover:border-[#0F52BA] transition-all space-y-4"
          >
            {/* Enterprise Top Banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0F52BA] text-sm font-bold border border-blue-200">
                    {enterprise.enterpriseType}
                  </span>
                  <span className="text-sm text-slate-500 font-medium">
                    {enterprise.location}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-sm text-slate-500">
                    研发投入：<strong className="text-slate-800 font-mono">{enterprise.rdInvestment}</strong> (占比{enterprise.rdRatio})
                  </span>
                </div>
                <h4 
                  onClick={() => onSelectEnterprise(enterprise)}
                  className="text-xl font-black text-slate-900 hover:text-[#0F52BA] cursor-pointer flex items-center gap-2"
                >
                  {enterprise.name}
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </h4>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block">综合技术协同度</span>
                  <span className="text-2xl font-black text-emerald-600 font-mono">
                    {enterprise.matchScore} <span className="text-sm font-normal text-slate-400">分</span>
                  </span>
                </div>
                <button
                  onClick={() => onSelectEnterprise(enterprise)}
                  className="px-4 py-2.5 bg-[#0F52BA] hover:bg-[#082C6C] text-white rounded-xl text-sm font-bold transition-all shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <span>查看企业完整档案</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Side-by-side Patent Comparison Box */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
              
              {/* Left: JLU Patent */}
              <div className="bg-blue-50/40 p-4 rounded-2xl border border-blue-100 space-y-2">
                <div className="flex items-center justify-between text-[#082C6C] font-bold">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#0F52BA]"></span>
                    吉林大学标的专利
                  </span>
                  <span className="font-mono text-[11px]">{activePatent.patentNo}</span>
                </div>
                <h5 className="font-bold text-slate-900">{activePatent.title}</h5>
                <p className="text-slate-600 text-[11px] line-clamp-3 leading-relaxed">
                  {activePatent.abstract}
                </p>
              </div>

              {/* Right: Enterprise's Similar Patent */}
              {enterprise.similarPatents && enterprise.similarPatents[0] ? (
                <div className="bg-emerald-50/40 p-4 rounded-2xl border border-emerald-100 space-y-2">
                  <div className="flex items-center justify-between text-emerald-900 font-bold">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                      企业相近公开专利 (佰腾专利库标定)
                    </span>
                    <span className="font-mono text-[11px]">{enterprise.similarPatents[0].patentNo}</span>
                  </div>
                  <h5 className="font-bold text-slate-900">{enterprise.similarPatents[0].title}</h5>
                  <div className="bg-white/90 p-2.5 rounded-xl border border-emerald-200/60 text-[11px] text-emerald-950">
                    <strong className="block mb-0.5">技术重叠与互补点：</strong>
                    {enterprise.similarPatents[0].techOverlapDescription}
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
              <div className="text-slate-600">
                <span className="text-slate-400">高校产学研对接人：</span>
                <strong className="text-slate-800">{enterprise.contact.contactPerson}</strong> ({enterprise.contact.title} - {enterprise.contact.dept})
                <span className="text-slate-400 ml-2 font-mono">{enterprise.contact.phone}</span>
              </div>

              <div className="flex items-center gap-2">
                {onOpenAiAgentWithEnterprise && (
                  <button
                    onClick={() => onOpenAiAgentWithEnterprise(enterprise)}
                    className="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg font-bold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>AI撰写对接方案</span>
                  </button>
                )}
                <button
                  onClick={() => onSelectEnterprise(enterprise)}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-semibold transition-colors cursor-pointer"
                >
                  查看攻关痛点
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
