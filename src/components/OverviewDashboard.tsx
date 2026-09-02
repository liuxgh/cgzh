import { CopyableText } from './CopyableText';
import React from 'react';
import { JluTechAdvantageShowcase } from './JluTechAdvantageShowcase';
import { TabType, PatentItem, TargetEnterprise } from '../types';
import { TARGET_ENTERPRISES_DATA } from '../data/targetEnterprisesData';
import { INDUSTRY_CHAINS_57_DATA } from '../data/industryChains57Data';
import { PATENT_INTENSIVE_PRODUCTS_DATA } from '../data/patentProductsData';
import { 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Package, 
  ArrowRight, 
  Database, 
  TrendingUp, 
  Award, 
  Compass, 
  FileText, 
  BrainCircuit, 
  ExternalLink,
  ChevronRight,
  Search,
  Inbox,
  ChevronLeft,
  CheckCircle2,
  Cpu
, Download } from 'lucide-react';


interface OverviewDashboardProps {
  patents: PatentItem[];
  setActiveTab: (tab: TabType) => void;
  onSelectEnterprise: (enterprise: TargetEnterprise) => void;
  onSelectPatent: (patent: PatentItem) => void;
  onOpenAiActionPlan?: (enterprise: TargetEnterprise) => void;
  onLaunchAiAgentWithQuery?: (query: string) => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  patents,
  setActiveTab,
  onSelectEnterprise,
  onSelectPatent,
  onOpenAiActionPlan,
  onLaunchAiAgentWithQuery
}) => {
  const [quickQuery, setQuickQuery] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 4;
  
  const totalPages = Math.ceil(TARGET_ENTERPRISES_DATA.length / itemsPerPage);
  const currentEnterprises = TARGET_ENTERPRISES_DATA.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


  const handleQuickAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickQuery.trim()) {
      if (onLaunchAiAgentWithQuery) {
        onLaunchAiAgentWithQuery(quickQuery.trim());
      } else {
        setActiveTab('ai-agent');
      }
    } else {
      setActiveTab('ai-agent');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Hero Banner: Direct SaaS Value for JLU Faculty */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#082C6C] via-[#0F52BA] to-[#0A3D8F] text-white p-6 sm:p-8 shadow-xl border border-blue-400/30">
        <div className="absolute -right-12 -bottom-12 w-96 h-96 bg-[#1677FF]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute right-10 top-8 opacity-10 pointer-events-none">
          <Database className="w-64 h-64 text-white" />
        </div>

        <div className="relative z-10 max-w-4xl space-y-4">

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            让吉大每一项科技成果 <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-300 via-blue-200 to-white">
              精准直达靶向企业、产业链
            </span>
          </h2>

          <p className="text-base sm:text-lg text-blue-100 leading-relaxed max-w-3xl mt-4">
            告别传统被动等待与盲目走访。系统依托佰腾网全球专利库、全国专利密集型产品备案公开数据、165万+企业工商数据与产业链全景数据，通过「相似专利找企业」、「产业链找企业」、「专利密集型产品找企业」三大路径与AI智能体，为吉大老师自动化挖掘最契合的受让与合作企业。
          </p>

          {/* Quick AI Agent Trigger Bar */}
          <form onSubmit={handleQuickAgent} className="pt-2 flex flex-col sm:flex-row gap-2 max-w-2xl">
            <div className="relative flex-1">
              <input
                type="text"
                value={quickQuery}
                onChange={(e) => setQuickQuery(e.target.value)}
                placeholder="输入吉大专利号（如 CN202310892341.2）、研究关键词或成果名称..."
                className="w-full bg-white text-slate-900 placeholder-slate-400 px-4 py-3 pl-10 rounded-2xl text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-md border border-slate-200"
              />
              <BrainCircuit className="w-4 h-4 text-[#0F52BA] absolute left-3.5 top-3.5" />
            </div>
            <button
              type="submit"
              className="px-5 py-3 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl font-black text-sm shadow-lg flex items-center justify-center gap-1.5 transition-all shrink-0 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>AI智能体一键寻客</span>
            </button>
          </form>
        </div>
      </div>

      <div className="mt-2">
        <JluTechAdvantageShowcase onNavigateToFullMap={() => setActiveTab('tech-map')} />
      </div>
      {/* 3. Three Core Enterprise Discovery Paths (三大靶向寻客路径直接入口) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#0F52BA] rounded-full"></span>
              <span>三大核心靶向寻客路径</span>
              <span className="text-sm font-normal text-slate-500">（点击直接进入专属工具模块）</span>
            </h3>
            <p className="text-sm text-slate-500 mt-0.5">
              从专利技术特征、产业上下游图谱、专利产品备案三个维度，全方位锁定具有受让与合作意愿的目标企业
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Path 1: Similar Patents */}
          <div 
            onClick={() => setActiveTab('patent-similar')}
            className="group bg-white rounded-3xl p-6 border-2 border-blue-100/80 hover:border-[#0F52BA] shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/80 rounded-bl-full pointer-events-none group-hover:bg-blue-100/60 transition-colors"></div>
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#0F52BA] text-white flex items-center justify-center shadow-md">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-blue-50 text-[#0F52BA] border border-blue-200">
                  路径一 • 语义大模型
                </span>
              </div>

              <h4 className="text-lg font-black text-slate-900 group-hover:text-[#0F52BA] transition-colors">
                通过吉大专利 ➔ 相似专利找企业
              </h4>

              <p className="text-sm text-slate-600 leading-relaxed mt-2">
                通过吉大专利匹配拥有相似专利技术或同类技术路线的企业
              </p>

              </div>
            <div className="mt-6 flex items-center justify-between text-sm font-bold text-[#0F52BA] group-hover:translate-x-1 transition-transform">
              <span>立即查询相似专利找企业</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Path 2: 57 Industry Chains */}
          <div 
            onClick={() => setActiveTab('industry-chain')}
            className="group bg-white rounded-3xl p-6 border-2 border-indigo-100/80 hover:border-indigo-600 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50/80 rounded-bl-full pointer-events-none group-hover:bg-indigo-100/60 transition-colors"></div>
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
                  <Layers className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200">
                  路径二 • 产业链
                </span>
              </div>

              <h4 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                通过产业链 ➔ 全链条图谱找企业
              </h4>

              <p className="text-sm text-slate-600 leading-relaxed mt-2">
                通过佰腾自研产业链全景图谱，分级穿透上游关键材料、中游精密制造、下游整机终端，定位与吉大科技成果对应企业
              </p>

              </div>
            <div className="mt-6 flex items-center justify-between text-sm font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
              <span>立即浏览产业链找企业</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Path 3: Patent-intensive Products */}
          <div 
            onClick={() => setActiveTab('patent-product')}
            className="group bg-white rounded-3xl p-6 border-2 border-emerald-100/80 hover:border-emerald-600 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50/80 rounded-bl-full pointer-events-none group-hover:bg-emerald-100/60 transition-colors"></div>
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                  <Package className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  路径三 • 产品备案库
                </span>
              </div>

              <h4 className="text-lg font-black text-slate-900 group-hover:text-emerald-600 transition-colors">
                通过国家专利密集型产品找企业
              </h4>

              <p className="text-sm text-slate-600 leading-relaxed mt-2">
                通过国家专利密集型产品备案公开数据，筛选已有高产值专利产品的制造企业，对接其技术升级需求与产学研意愿。
              </p>

              </div>
            <div className="mt-6 flex items-center justify-between text-sm font-bold text-emerald-600 group-hover:translate-x-1 transition-transform">
              <span>立即查询专利产品找企业</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

        </div>
      </div>

      {/* 4. Interactive AI Agent Showcase Card */}
      <div className="bg-linear-to-r from-[#082C6C] via-[#0F52BA] to-[#0A3D8F] rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-blue-400/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-sm font-bold">
            <BrainCircuit className="w-4 h-4 text-blue-700" />
            <span>佰腾吉大 • AI 专利找买家智能体 (Patent-to-Enterprise Agent)</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black">
            AI 智能体一键寻客，自动推演企业画像与转化策略
          </h3>
          <p className="text-base text-slate-200 leading-relaxed">
            AI Agent 深度解析专利技术特征，自主在佰腾全球专利库、产业链节点及专利密集型产品公开数据中多维交叉推理，一键生成包含成果匹配、联络策略的《靶向企业转化对接方案》。
          </p>
        </div>

        <button
          onClick={() => setActiveTab('ai-agent')}
          className="px-6 py-4 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl font-black text-base shadow-xl flex items-center gap-2 shrink-0 transition-all cursor-pointer"
        >
          <Sparkles className="w-5 h-5 text-white" />
          <span>进入 AI 智能体工作台</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 5. Recommended Target Enterprise Dossiers (最新靶向企业精准推荐流) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-blue-600 rounded-full"></span>
              <span>当前重点推荐靶向企业画像库</span>
              <span className="text-sm font-normal text-slate-500">（已通过三大路径与吉大优势成果深度标定）</span>
            </h3>
            
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
              <Download className="w-4 h-4" /> 导出列表
            </button>
            <button
              onClick={() => setActiveTab('patent-similar')}
              className="text-sm font-bold text-[#0F52BA] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>查看全部匹配企业</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {TARGET_ENTERPRISES_DATA.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
              <Inbox className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">暂无重点推荐企业</h3>
            <p className="text-sm text-slate-500 max-w-md">靶向企业库正在持续扩充中，敬请期待。</p>
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

      <div className="mt-12 pt-8 border-t border-slate-200">
        <div className="text-center text-xs font-bold text-slate-400 mb-6 tracking-widest">—— 底层数据资源支持 ——</div>
      {/* 底层数据资源支持 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-100 flex flex-col gap-2 hover:bg-white hover:shadow-sm transition-all text-slate-500 blue-400/50 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <span className="text-sm text-slate-500 font-semibold block mb-1">全球专利数据底座</span>
            <div className="text-xl font-bold text-slate-700 font-mono tracking-tight">2 亿+</div>
          </div>
        </div>

        <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-100 flex flex-col gap-2 hover:bg-white hover:shadow-sm transition-all text-slate-500 emerald-400/50 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <span className="text-sm text-slate-500 font-semibold block mb-1">专利密集型产品备案公开数据</span>
            <div className="text-xl font-bold text-slate-700 font-mono tracking-tight">20 万+</div>
          </div>
        </div>

        <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-100 flex flex-col gap-2 hover:bg-white hover:shadow-sm transition-all text-slate-500 purple-400/50 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-sm text-slate-500 font-semibold block mb-1">企业工商数据</span>
            <div className="text-xl font-bold text-slate-700 font-mono tracking-tight">165 万+</div>
          </div>
        </div>

        <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-100 flex flex-col gap-2 hover:bg-white hover:shadow-sm transition-all text-slate-500 indigo-400/50 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-sm text-slate-500 font-semibold block mb-1">重点产业链</span>
            <div className="text-xl font-bold text-slate-700 tracking-tight">57+</div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
