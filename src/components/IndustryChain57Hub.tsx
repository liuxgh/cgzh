import React, { useState } from 'react';
import { TargetEnterprise, PatentItem } from '../types';
import { RegionFilter } from './RegionFilter';
import { INDUSTRY_CHAINS_57_DATA, INDUSTRY_CATEGORIES, IndustryChain57Item } from '../data/industryChains57Data';
import { TARGET_ENTERPRISES_DATA } from '../data/targetEnterprisesData';
import { 
  Layers, 
  Search,
  Inbox,
  ChevronLeft,
  User, 
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
  onOpenAiActionPlan?: (enterprise: TargetEnterprise) => void;
}

export const IndustryChain57Hub: React.FC<IndustryChain57HubProps> = ({
  onSelectEnterprise,
  onOpenAiActionPlan
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('全部产业链');
  const [selectedChainId, setSelectedChainId] = useState<string>('chain-01');
  const [selectedNode, setSelectedNode] = useState<'all' | 'upstream' | 'midstream' | 'downstream'>('all');
  const [enterpriseSearchKeyword, setEnterpriseSearchKeyword] = useState<string>('');
  const [regionFilter, setRegionFilter] = useState<{p: string, c: string, d: string}>({p: 'all', c: 'all', d: 'all'});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;


  const activeChain = INDUSTRY_CHAINS_57_DATA.find(c => c.id === selectedChainId) || INDUSTRY_CHAINS_57_DATA[0];

  const filteredChains = INDUSTRY_CHAINS_57_DATA.filter(chain => {
    if (selectedCategory !== '全部产业链' && chain.category !== selectedCategory) return false;
    return true;
  });

  // Target enterprises matched to this chain
  const chainEnterprises = TARGET_ENTERPRISES_DATA.filter(ent => {
    if (!ent.chainPosition) return false;
    if (selectedNode !== 'all' && ent.chainPosition.node !== selectedNode) return false;
    
    if (enterpriseSearchKeyword.trim() && !ent.name.includes(enterpriseSearchKeyword.trim())) return false;

    if (regionFilter.p !== 'all' && !ent.province?.includes(regionFilter.p) && !ent.city?.includes(regionFilter.p)) return false;
    if (regionFilter.c !== 'all' && !ent.city?.includes(regionFilter.c)) return false;
    if (regionFilter.d !== 'all' && !ent.address?.includes(regionFilter.d) && !ent.location?.includes(regionFilter.d)) return false;

    return true;
  });

  const totalPages = Math.ceil(chainEnterprises.length / itemsPerPage);
  const currentEnterprises = chainEnterprises.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [regionFilter.p, regionFilter.c, regionFilter.d, selectedNode, selectedChainId, enterpriseSearchKeyword]);


  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Module Header */}
      <div className="bg-linear-to-r from-[#082C6C] via-[#0F52BA] to-[#0A3D8F] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-blue-400/30">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full bg-white/15 text-blue-100 text-sm font-bold border border-white/20 flex items-center gap-1.5 backdrop-blur-xs">
            <Layers className="w-4 h-4 text-blue-200" />
            <span>核心寻客路径二：细分战略产业链图谱</span>
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
          通过产业链 ➔ 全链条图谱找企业
        </h2>
        <p className="text-sm sm:text-base text-blue-100/90 mt-2 max-w-3xl leading-relaxed">
          通过佰腾自研产业链全景图谱，分级穿透上游关键材料、中游精密制造、下游整机终端，定位与吉大科技成果对应企业
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
                <RegionFilter onFilterChange={(p, c, d) => setRegionFilter({p, c, d})} />
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
                          {ent.name}
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
