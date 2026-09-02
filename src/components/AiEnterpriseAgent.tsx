import React, { useState, useEffect, useRef } from 'react';
import { PatentItem, TargetEnterprise } from '../types';
import { RegionFilter } from './RegionFilter';
import { TARGET_ENTERPRISES_DATA } from '../data/targetEnterprisesData';
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
  ChevronDown
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
  const [selectedPatentId, setSelectedPatentId] = useState<string>(patents[0]?.id || 'pat-001');
  const [customInputText, setCustomInputText] = useState<string>(initialQuery);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  
  const [regionFilter, setRegionFilter] = useState<{p: string, c: string, d: string}>({p: 'all', c: 'all', d: 'all'});
  const [patentScaleFilter, setPatentScaleFilter] = useState<string>('all');
  const [capitalFilter, setCapitalFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [patentSearchQuery, setPatentSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
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

  const activePatent = patents.find(p => p.id === selectedPatentId) || patents[0];

  const filteredEnterprises = TARGET_ENTERPRISES_DATA.filter(ent => {
    
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
  }, [regionFilter.p, regionFilter.c, regionFilter.d, patentScaleFilter, capitalFilter]);

  
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
      handleRunAgent();
    }
  }, [initialQuery]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Agent Banner */}
      <div className="bg-linear-to-r from-[#082C6C] via-[#0F52BA] to-[#0A3D8F] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-blue-400/30">
        <div className="flex flex-wrap items-center gap-2 mb-2"></div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
          AI 自动化专利找买家：从成果特征到精准靶向企业报告
        </h2>
        <p className="text-sm sm:text-base text-blue-100/90 mt-2 max-w-3xl leading-relaxed">
          依托佰腾 2 亿+ 专利大数据与中国战略性新兴产业图谱，AI 智能体一键解析吉林大学成果发明点，穿透匹配具有量产采购实力与真实技术痛点的目标规上企业，自动生成《科技成果转化推荐函》与走访话术。
        </p>

        {/* Input Bar */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1" ref={dropdownRef}>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            
            <div 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full h-full min-h-[48px] bg-white text-slate-900 rounded-xl pl-12 pr-10 py-2 font-bold cursor-pointer flex items-center shadow-inner hover:bg-slate-50 transition-colors border-2 border-transparent focus-within:border-blue-400"
            >
              <div className="truncate">
                <span className="text-blue-600 mr-2">当前成果:</span>
                {activePatent.title}
              </div>
              <ChevronDown className={`w-5 h-5 absolute right-4 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </div>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 overflow-hidden flex flex-col">
                <div className="p-3 border-b border-slate-100 bg-slate-50">
                  <input
                    type="text"
                    value={patentSearchQuery}
                    onChange={(e) => setPatentSearchQuery(e.target.value)}
                    placeholder="输入专利号、名称或发明人搜索..."
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {filteredPatents.length > 0 ? (
                    filteredPatents.map(patent => (
                      <div 
                        key={patent.id}
                        onClick={() => {
                          setSelectedPatentId(patent.id);
                          setIsDropdownOpen(false);
                          setPatentSearchQuery('');
                          setCustomInputText(patent.title);
                        }}
                        className={`p-4 border-b last:border-0 border-slate-100 cursor-pointer hover:bg-blue-50 transition-colors ${selectedPatentId === patent.id ? 'bg-blue-50/50' : ''}`}
                      >
                        <div className="font-bold text-slate-900 text-sm mb-1">{patent.title}</div>
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span className="font-mono">{patent.patentNo}</span>
                          <span>发明人: {patent.inventor}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-slate-500 text-sm">
                      没有找到匹配的专利
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex gap-2">
              <input
                type="text"
                value={customInputText}
                onChange={(e) => setCustomInputText(e.target.value)}
                placeholder="例如：高倍率快充单晶硅碳负极纳米自组装包覆..."
                className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F52BA]"
              />
              <button
                onClick={handleRunAgent}
                disabled={isProcessing}
                className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold text-sm shadow-md flex items-center gap-1.5 shrink-0 disabled:opacity-50 cursor-pointer"
              >
                {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin text-white" /> : <Sparkles className="w-4 h-4 text-white" />}
                <span>{isProcessing ? 'AI 推理检索中...' : '启动智能体寻客'}</span>
              </button>
            </div>
          </div>
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

      {/* Generated Intelligence Report Tabs */}
      {!isProcessing && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden space-y-0">
          
          <div className="flex border-b border-slate-200 bg-slate-50/80 px-6 overflow-x-auto gap-2">
            <button
              className="py-4 px-4 text-sm font-bold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors border-[#003d80] text-[#003d80] bg-white"
            >
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>AI 推荐靶向企业列表</span>
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="space-y-4">
              
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3 pb-4 border-b border-slate-100">
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
        </div>
      )}
    </div>
  );
};
