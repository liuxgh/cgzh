import React, { useState } from 'react';
import { TargetEnterprise, PatentItem } from '../types';
import { INDUSTRY_CHAINS_57_DATA, INDUSTRY_CATEGORIES, IndustryChain57Item } from '../data/industryChains57Data';
import { TARGET_ENTERPRISES_DATA } from '../data/targetEnterprisesData';
import { 
  Layers, 
  Search, 
  Building2, 
  Sparkles, 
  Compass, 
  ChevronRight, 
  ArrowRight, 
  ExternalLink, 
  CheckCircle2, 
  Award, 
  Cpu, 
  Zap, 
  Filter,
  ArrowDown
} from 'lucide-react';

interface IndustryChain57HubProps {
  onSelectEnterprise: (enterprise: TargetEnterprise) => void;
  onSelectPatent?: (patent: PatentItem) => void;
  onOpenAiAgentWithEnterprise?: (enterprise: TargetEnterprise) => void;
}

export const IndustryChain57Hub: React.FC<IndustryChain57HubProps> = ({
  onSelectEnterprise,
  onOpenAiAgentWithEnterprise
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('全部产业链');
  const [selectedChainId, setSelectedChainId] = useState<string>('chain-01');
  const [selectedNode, setSelectedNode] = useState<'all' | 'upstream' | 'midstream' | 'downstream'>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const activeChain = INDUSTRY_CHAINS_57_DATA.find(c => c.id === selectedChainId) || INDUSTRY_CHAINS_57_DATA[0];

  const filteredChains = INDUSTRY_CHAINS_57_DATA.filter(chain => {
    if (selectedCategory !== '全部产业链' && chain.category !== selectedCategory) return false;
    if (searchKeyword.trim()) {
      const q = searchKeyword.toLowerCase();
      const matchName = chain.name.toLowerCase().includes(q) || chain.summary.toLowerCase().includes(q);
      const matchCollege = chain.jluAdvantageCollege.toLowerCase().includes(q);
      const matchCompany = chain.featuredCompanies.some(c => c.toLowerCase().includes(q));
      if (!matchName && !matchCollege && !matchCompany) return false;
    }
    return true;
  });

  // Target enterprises matched to this chain
  const chainEnterprises = TARGET_ENTERPRISES_DATA.filter(ent => {
    if (!ent.chainPosition) return false;
    if (selectedNode !== 'all' && ent.chainPosition.node !== selectedNode) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Module Header */}
      <div className="bg-linear-to-r from-[#082C6C] via-[#0F52BA] to-[#0A3D8F] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-blue-400/30">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full bg-white/15 text-blue-100 text-sm font-bold border border-white/20 flex items-center gap-1.5 backdrop-blur-xs">
            <Layers className="w-4 h-4 text-blue-200" />
            <span>核心寻客路径二：细分战略产业链图谱</span>
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-sm font-semibold">
            上中下游节点精准穿透 • 吉大优势实验室直连
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
          通过产业链 ➔ 全链条图谱穿透找买家企业
        </h2>
        <p className="text-sm sm:text-base text-blue-100/90 mt-2 max-w-3xl leading-relaxed">
          深入拆解战略新兴产业链的<strong>上游关键原材料、中游精密制造与下游整机终端</strong>。吉大老师可按所属产业链技术节点，直接定位该环节全国龙头企业与专精特新企业的急迫攻关痛点，开展成果推介与产学研合作。
        </p>
      </div>

      {/* Category Filter Chips & Search Bar */}
      <div className="bg-white rounded-2xl p-5 border border-[#D8E2F0] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {INDUSTRY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0F52BA] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64 shrink-0">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="搜索产业链名称、学院或企业..."
              className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2 pl-8 text-sm text-slate-900 focus:outline-hidden focus:border-[#0F52BA] focus:bg-white"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
          </div>
        </div>

        {/* 57 Chains Grid Selector */}
        <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-h-56 overflow-y-auto pr-1">
          {filteredChains.map((chain) => {
            const isSelected = selectedChainId === chain.id;
            return (
              <button
                key={chain.id}
                onClick={() => setSelectedChainId(chain.id)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between space-y-2 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50/80 border-[#0F52BA] shadow-xs ring-2 ring-[#0F52BA]/20'
                    : 'bg-white border-[#D8E2F0] hover:border-[#0F52BA]/60 hover:bg-slate-50/60'
                }`}
              >
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
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {activeChain.name}
              </h3>
              <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
                {activeChain.summary}
              </p>
            </div>

            <div className="bg-indigo-50/80 p-4 rounded-2xl border border-indigo-100 shrink-0 space-y-1">
              <span className="text-[11px] font-bold text-indigo-900 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-indigo-600" />
                吉林大学对口优势学科与国家重点实验室：
              </span>
              <p className="text-sm text-slate-800 font-semibold">{activeChain.jluAdvantageCollege}</p>
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
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-bold text-[11px]">
                    上游 • 核心材料与元器件
                  </span>
                  <span className="text-sm font-mono font-bold text-blue-600">
                    {activeChain.upstreamNode.matchedEnterprises} 家企业
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
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded font-bold text-[11px]">
                    中游 • 精密制造与模块总成
                  </span>
                  <span className="text-sm font-mono font-bold text-indigo-600">
                    {activeChain.midstreamNode.matchedEnterprises} 家企业
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
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded font-bold text-[11px]">
                    下游 • 整机终端与系统集成
                  </span>
                  <span className="text-sm font-mono font-bold text-purple-600">
                    {activeChain.downstreamNode.matchedEnterprises} 家企业
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
          <div className="pt-6 border-t border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-600" />
                <span>该产业链重点靶向企业技术画像 ({chainEnterprises.length}家)</span>
                {selectedNode !== 'all' && (
                  <span className="text-sm font-normal text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                    已筛选：{selectedNode === 'upstream' ? '上游节点' : selectedNode === 'midstream' ? '中游节点' : '下游节点'}
                  </span>
                )}
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {chainEnterprises.map((ent) => (
                <div
                  key={ent.id}
                  onClick={() => onSelectEnterprise(ent)}
                  className="bg-slate-50/80 hover:bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 text-[10px] font-bold rounded">
                          {ent.chainPosition?.nodeName.split('：')[0]}
                        </span>
                        <span className="text-[11px] text-slate-500">{ent.location}</span>
                      </div>
                      <h5 className="text-lg font-bold text-slate-900">{ent.name}</h5>
                    </div>
                    
                  </div>

                  <div className="text-sm text-slate-600 bg-white p-3 rounded-xl border border-slate-100 space-y-1">
                    <div className="text-[#003d80] font-semibold line-clamp-1">
                      技术痛点：{ent.techPainPoints[0]}
                    </div>
                    <div className="text-slate-500 text-[11px]">
                      对口合作模式：<strong className="text-slate-800">{ent.preferredCollabMode}</strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm pt-1">
                    <span className="text-slate-500">
                      联络人：{ent.contact.contactPerson} ({ent.contact.title})
                    </span>
                    <span className="text-indigo-600 font-bold flex items-center gap-0.5">
                      <span>查看详情</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
