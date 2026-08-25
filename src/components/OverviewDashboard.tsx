import React from 'react';
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
  CheckCircle2,
  Cpu
} from 'lucide-react';

interface OverviewDashboardProps {
  patents: PatentItem[];
  setActiveTab: (tab: TabType) => void;
  onSelectEnterprise: (enterprise: TargetEnterprise) => void;
  onSelectPatent: (patent: PatentItem) => void;
  onLaunchAiAgentWithQuery?: (query: string) => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  patents,
  setActiveTab,
  onSelectEnterprise,
  onSelectPatent,
  onLaunchAiAgentWithQuery
}) => {
  const [quickQuery, setQuickQuery] = React.useState('');

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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-semibold text-blue-100">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>高校名称：吉林大学 • 佰腾网-科技成果转化应用</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            吉林大学科技成果 <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-300 via-blue-200 to-white">
              智能靶向转化引擎
            </span>
          </h2>

          <p className="text-base sm:text-lg text-blue-100 leading-relaxed max-w-2xl mt-4">
            依托佰腾全球专利大数据与 57 条产业链知识图谱，通过相似专利、产业链节点与密集型产品三大路径，结合大模型 AI 智能体，为您精准锁定具有真实受让意愿的靶向企业。
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

      {/* 2. Four Core Data Pillars (佰腾底层数据资产) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col gap-3 hover:border-blue-400/50 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <span className="text-sm text-slate-500 font-semibold block mb-1">全球专利数据底座</span>
            <div className="text-2xl font-black text-slate-900 font-mono tracking-tight">2 亿+</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col gap-3 hover:border-emerald-400/50 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <span className="text-sm text-slate-500 font-semibold block mb-1">密集型产品备案库</span>
            <div className="text-2xl font-black text-slate-900 font-mono tracking-tight">20 万+</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col gap-3 hover:border-purple-400/50 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-sm text-slate-500 font-semibold block mb-1">专利企业工商画像</span>
            <div className="text-2xl font-black text-slate-900 font-mono tracking-tight">165 万+</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col gap-3 hover:border-indigo-400/50 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-sm text-slate-500 font-semibold block mb-1">战略重点产业链</span>
            <div className="text-2xl font-black text-slate-900 font-mono tracking-tight">57 条</div>
          </div>
        </div>
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
              从专利技术特征、产业上下游图谱、量产产品备案三个维度，全方位锁定具有受让与合作意愿的目标企业
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
                选择吉大专利或输入权利要求，通过佰腾全国专利语义向量相似度模型，穿透检索布局了相似/同族技术、处于相同路线的全国企业。
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-sm text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0F52BA]" />
                  <span>精准比对企业相近公开专利与权利要求</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0F52BA]" />
                  <span>定位技术替代、互补与专利补全买家</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between text-sm font-bold text-[#0F52BA] group-hover:translate-x-1 transition-transform">
              <span>立即进入相似专利寻客</span>
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
                  路径二 • 57条产业链
                </span>
              </div>

              <h4 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                通过57条产业链 ➔ 全链条图谱找企业
              </h4>

              <p className="text-sm text-slate-600 leading-relaxed mt-2">
                进入佰腾57条战略性产业链全景图谱，上游关键材料、中游精密制造、下游整机终端分级穿透，精准匹配企业攻关痛点与吉大优势学科。
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-sm text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
                  <span>57条细分产业链上中下游节点全景分解</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
                  <span>直连吉大汽车、化学、电子、机械等优势实验室</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between text-sm font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
              <span>立即浏览57条产业链找买家</span>
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
                通过专利密集型产品 ➔ 产业化企业库
              </h4>

              <p className="text-sm text-slate-600 leading-relaxed mt-2">
                穿透国家专利密集型产品备案数据库，锁定已有高产值量产产品的规上制造企业，其拥有最迫切的技术升级诉求与真实采购承接实力。
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-sm text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>200,000+ 款经国家认定的专利密集型产品</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>掌握单品产值、关键核心组件与采购需求</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between text-sm font-bold text-emerald-600 group-hover:translate-x-1 transition-transform">
              <span>立即进入产品备案库找企业</span>
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
            AI Agent 深度解析专利技术特征，自主在佰腾全球专利库、产业链节点及密集型产品库中多维交叉推理，一键生成包含痛点匹配、联络策略的《靶向企业转化对接方案》。
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
            <p className="text-sm text-slate-500 mt-0.5">
              点击任意企业可查看其工商信用、相近专利比对、产业链环节、密集型备案产品及大学联络人
            </p>
          </div>

          <button
            onClick={() => setActiveTab('patent-similar')}
            className="text-sm font-bold text-[#0F52BA] hover:underline flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <span>查看全部匹配企业</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TARGET_ENTERPRISES_DATA.map((ent) => (
            <div
              key={ent.id}
              onClick={() => onSelectEnterprise(ent)}
              className="bg-white rounded-2xl p-5 border border-[#D8E2F0] shadow-xs hover:shadow-lg hover:border-[#0F52BA] transition-all cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                      <span className="px-2 py-0.5 bg-blue-50 text-[#0F52BA] rounded font-bold text-[10px] border border-blue-200">
                        {ent.enterpriseType}
                      </span>
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px]">
                        {ent.location}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 group-hover:text-[#0F52BA]">
                      {ent.name}
                    </h4>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-sm text-slate-500 block">协同匹配得分</span>
                    <span className="text-xl font-black text-emerald-600 font-mono">
                      {ent.matchScore} <span className="text-sm font-normal text-slate-400">分</span>
                    </span>
                  </div>
                </div>

                <div className="mt-3 bg-[#F8FAFC] p-3 rounded-xl border border-slate-100 text-sm text-slate-700 space-y-1.5">
                  <div className="font-semibold text-[#0F52BA] line-clamp-1">
                    🎯 撮合逻辑：{ent.synergyReason}
                  </div>
                  <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-1">
                    <span>相近公开专利：<strong className="text-slate-800 font-mono">{ent.similarPatents?.length || 0}项</strong></span>
                    <span>备案产品：<strong className="text-slate-800 font-mono">{ent.patentProducts?.length || 0}款</strong></span>
                    <span>研发投入：<strong className="text-slate-800 font-mono">{ent.rdInvestment}</strong></span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-sm">
                <div className="text-slate-500 text-[11px]">
                  对接人：<span className="font-semibold text-slate-800">{ent.contact.contactPerson} ({ent.contact.title})</span>
                </div>
                <span className="text-[#0F52BA] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>查看企业画像全景</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
