import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  Building2, 
  FileText, 
  CheckCircle2, 
  Copy, 
  Check, 
  Lightbulb, 
  TrendingUp, 
  ShieldCheck, 
  Handshake, 
  GraduationCap,
  Calendar,
  Layers,
  Award,
  Phone,
  Mail,
  Zap,
  Clock,
  AlertTriangle,
  MapPin,
  ChevronRight,
  Download,
  Share2,
  ExternalLink,
  Target,
  FileCheck2,
  Briefcase,
  Sliders,
  CheckCircle,
  HelpCircle,
  Cpu,
  PackageCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface TechDetailData {
  id: string;
  type: 'patent' | 'knowhow';
  title: string;
  no: string;
  university: string;
  universityKey?: string;
  universityBadge?: string;
  college?: string;
  lab?: string;
  inventor: {
    name: string;
    title?: string;
    team?: string;
  };
  field?: string;
  ipc?: string;
  applicationDate?: string;
  grantDate?: string;
  legalStatus?: string;
  trlLevel?: number;
  trlDescription?: string;
  valuationRange?: string;
  valueScore?: number;
  
  // Patent core content
  abstract: string;
  claimsSummary?: string[];
  innovations: string[];
  techMetrics?: { label: string; value: string; benchmark: string }[];
  
  // AI Summary & Transfer Advisory
  aiSummary: {
    coreHighlights: string;
    industryPainPointsSolved: string[];
    targetEnterpriseProfile: string[];
    recommendedCollabModes: { mode: string; reason: string; suitability: string }[];
    implementationRoadmap: { stage: string; time: string; tasks: string; deliverables: string }[];
    riskAndFtoAdvisory: string[];
  };

  // Transfer contact
  transferContact?: {
    centerName: string;
    phone: string;
    mainPhone: string;
    email: string;
    address: string;
  };
}

interface TechDetailPageProps {
  tech: TechDetailData;
  onBack: () => void;
  onOpenBooking: (tech: TechDetailData) => void;
  universityScope?: string | null;
  onSelectUniversity?: (uniId: string) => void;
}

export const TechDetailPage: React.FC<TechDetailPageProps> = ({
  tech,
  onBack,
  onOpenBooking,
  universityScope,
  onSelectUniversity
}) => {
  const [activeTab, setActiveTab] = useState<'decision_brief' | 'technical_specs' | 'transfer_policy'>('decision_brief');
  const [copyToast, setCopyToast] = useState<string | null>(null);
  
  // Quick enterprise fit calculator state
  const [enterpriseType, setEnterpriseType] = useState<string>('tier1');
  const [hasPilotLine, setHasPilotLine] = useState<boolean>(true);

  const showToast = (msg: string) => {
    setCopyToast(msg);
    setTimeout(() => setCopyToast(null), 2500);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`已复制${label}：${text}`);
  };

  const handleExportReport = () => {
    showToast(`正在导出《${tech.title} - 企业落地评估与技术交底报告》`);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 pb-20 animate-in fade-in duration-200">
      {/* Toast Notification */}
      <AnimatePresence>
        {copyToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 text-white px-5 py-2.5 rounded-full text-xs font-semibold shadow-xl backdrop-blur-xs flex items-center gap-2 border border-slate-700"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{copyToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Breadcrumb & Action Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <button 
              id="btn-back-to-list"
              onClick={onBack}
              className="font-bold text-slate-700 hover:text-blue-600 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> 返回技术列表
            </button>
            <span className="text-slate-300">/</span>
            <span className="font-medium text-slate-700">{tech.universityBadge || tech.university}</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-bold truncate max-w-sm">{tech.title}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleExportReport}
              className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" /> 导出交底简报
            </button>
            
            <button
              id="btn-top-open-booking"
              onClick={() => onOpenBooking(tech)}
              className="px-4 py-1.5 bg-[#0F52BA] hover:bg-[#082C6C] text-white font-bold rounded-xl text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Handshake className="w-3.5 h-3.5" /> 预约闭门对接
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
        
        {/* COMPACT & HIGH-SIGNAL HEADER CARD */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs mb-5 relative overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-[#0F52BA] via-indigo-600 to-emerald-500 absolute top-0 left-0 right-0" />
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-blue-50 border border-blue-200 font-mono text-xs font-bold text-blue-800">
                  {tech.no}
                </span>
                
                <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold text-xs">
                  {tech.type === 'patent' ? '发明专利' : '非专利成果'}
                </span>

                <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-bold flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                  {tech.universityBadge || tech.university}
                </span>

                <span className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 text-xs font-medium border border-slate-200">
                  {tech.legalStatus || '专利权维持有效'}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                {tech.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5 text-xs text-slate-600 pt-1">
                <div>
                  <span className="text-slate-400">研发团队：</span>
                  <strong className="text-slate-800">{tech.inventor.name}</strong>
                </div>
                <div>
                  <span className="text-slate-400">IPC领域：</span>
                  <span className="font-mono font-semibold text-slate-700">{tech.ipc || 'G06N 3/04'}</span>
                </div>
                <div>
                  <span className="text-slate-400">参考转化估值：</span>
                  <strong className="text-blue-700 font-bold">{tech.valuationRange || '260万 - 580万元'}</strong>
                </div>
              </div>
            </div>

            {/* Quick Action Button in Header */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
              <button
                onClick={() => onOpenBooking(tech)}
                className="w-full sm:w-auto px-4 py-2.5 bg-[#0F52BA] hover:bg-[#082C6C] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Handshake className="w-3.5 h-3.5" /> 立即对接该成果
              </button>
            </div>
          </div>
        </div>

        {/* HIGH-VALUE SEGMENT TABS */}
        <div className="flex items-center gap-2 mb-5 border-b border-slate-200 pb-2 overflow-x-auto">
          <button
            id="tab-decision-brief"
            onClick={() => setActiveTab('decision_brief')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'decision_brief'
                ? 'bg-[#0F52BA] text-white shadow-xs'
                : 'text-slate-600 hover:bg-white bg-slate-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>企业采纳决策要点（技术、指标、痛点、导入条件）</span>
          </button>
          
          <button
            id="tab-technical-specs"
            onClick={() => setActiveTab('technical_specs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'technical_specs'
                ? 'bg-[#0F52BA] text-white shadow-xs'
                : 'text-slate-600 hover:bg-white bg-slate-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>权利要求与完整交底详情</span>
          </button>

          <button
            id="tab-transfer-policy"
            onClick={() => setActiveTab('transfer_policy')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'transfer_policy'
                ? 'bg-[#0F52BA] text-white shadow-xs'
                : 'text-slate-600 hover:bg-white bg-slate-100'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>官方转化机构直联与先用后转政策</span>
          </button>
        </div>

        {/* MAIN 2-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* LEFT 8 COLS: CORE CONTENT */}
          <div className="lg:col-span-8 space-y-5">
            
            {/* TAB 1: EXECUTIVE DECISION BRIEF */}
            {activeTab === 'decision_brief' && (
              <motion.div 
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5"
              >
                {/* 1. 核心技术突破与量化指标对比 (Core Breakthrough & Specs Table) */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-[#0F52BA]" />
                      一、核心发明突破与关键技术指标
                    </h3>
                    <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      实测数据说话 • 拒绝虚夸
                    </span>
                  </div>

                  {/* 3 Core Innovations */}
                  <div className="space-y-2">
                    {tech.innovations.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-800 bg-blue-50/40 p-3 rounded-xl border border-blue-100/80">
                        <span className="w-4 h-4 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-[10px] mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="leading-relaxed font-medium">{item}</p>
                      </div>
                    ))}
                  </div>

                  {/* Quantitative Benchmark Table */}
                  {tech.techMetrics && tech.techMetrics.length > 0 && (
                    <div className="pt-2">
                      <div className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                        实测关键性能参数 vs 传统行业方案基准：
                      </div>
                      <div className="overflow-x-auto rounded-xl border border-slate-200">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                              <th className="p-2.5 font-bold">考核参数维度</th>
                              <th className="p-2.5 font-bold text-blue-700 bg-blue-50/50">本成果实测数据</th>
                              <th className="p-2.5 font-bold text-slate-500">传统行业通用基准</th>
                              <th className="p-2.5 font-bold text-emerald-700">优化幅度</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {tech.techMetrics.map((m, idx) => (
                              <tr key={idx} className="hover:bg-slate-50/40">
                                <td className="p-2.5 font-medium text-slate-800">{m.label}</td>
                                <td className="p-2.5 font-bold text-blue-700 bg-blue-50/30">{m.value}</td>
                                <td className="p-2.5 text-slate-500">{m.benchmark}</td>
                                <td className="p-2.5 font-bold text-emerald-600">
                                  {idx === 0 ? '+15.3% 提升' : idx === 1 ? '-69% 延迟' : '-68% 占用'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. 解决企业生产/研发痛点 (Enterprise Pain Points) */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                    <Target className="w-4 h-4 text-emerald-600" />
                    二、直接解决企业的实际工程与业务痛点
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {tech.aiSummary.industryPainPointsSolved.map((point, idx) => (
                      <div key={idx} className="bg-emerald-50/40 p-3.5 rounded-xl border border-emerald-100 flex flex-col justify-between space-y-2 text-xs">
                        <div className="flex items-center gap-1.5 font-bold text-emerald-950">
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>痛点解决 #{idx + 1}</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. 企业导入条件、交付物与推进周期 (Implementation & Deliverables) */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                    <PackageCheck className="w-4 h-4 text-indigo-600" />
                    三、企业落地导入条件、交付清单与推进路线
                  </h3>

                  {/* Deliverables Checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-1.5">
                      <div className="font-bold text-slate-800 flex items-center gap-1.5">
                        <FileCheck2 className="w-3.5 h-3.5 text-blue-600" /> 转化交付物清单：
                      </div>
                      <ul className="space-y-1 text-slate-600 pl-4 list-disc">
                        <li>完整算法核心工程源码 / C++ 部署 SDK</li>
                        <li>AUTOSAR 符合性架构说明与测试用例包</li>
                        <li>全套 CAD 结构图纸与关键电磁阀选型清单</li>
                        <li>现场实车标定与参数微调工程指南手册</li>
                      </ul>
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-1.5">
                      <div className="font-bold text-slate-800 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-indigo-600" /> 企业导入资源要求：
                      </div>
                      <ul className="space-y-1 text-slate-600 pl-4 list-disc">
                        <li>具备常规嵌入式/工控机开发调试环境</li>
                        <li>配备 1-2 名机电/算法工程师对接技术交底</li>
                        <li>具备小批量试制或整车/台架测试验证条件</li>
                        <li>平均产线导入周期预计：1 - 3 个月</li>
                      </ul>
                    </div>
                  </div>

                  {/* 3-Stage Roadmap */}
                  <div className="space-y-2 pt-1">
                    <div className="text-xs font-bold text-slate-700">阶段实施推进计划（交底 ➔ 中试 ➔ 量产）：</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      {tech.aiSummary.implementationRoadmap.map((step, idx) => (
                        <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                          <div className="flex items-center justify-between font-bold text-slate-900">
                            <span>{step.stage.split('：')[0]}</span>
                            <span className="font-mono text-[10px] text-blue-700 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                              {step.time}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 line-clamp-2"><strong>任务：</strong>{step.tasks}</p>
                          <p className="text-[11px] text-blue-700 font-medium line-clamp-2"><strong>交付：</strong>{step.deliverables}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4. 合作模式与商务估值方案 (Collaboration Modes) */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                    <Handshake className="w-4 h-4 text-[#0F52BA]" />
                    四、推荐合作模式与参考商务方案
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {tech.aiSummary.recommendedCollabModes.map((item, idx) => (
                      <div key={idx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex flex-col justify-between space-y-2 text-xs">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-slate-900">{item.mode}</span>
                            <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 font-bold text-[10px] rounded">
                              {item.suitability}
                            </span>
                          </div>
                          <p className="text-slate-600 text-[11px] leading-relaxed">{item.reason}</p>
                        </div>
                        <button
                          onClick={() => onOpenBooking(tech)}
                          className="w-full py-1.5 bg-white hover:bg-blue-50 text-blue-700 font-bold text-[11px] rounded-lg border border-blue-200 transition-colors"
                        >
                          咨询该模式意向
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* FTO & Risk Shield Summary */}
                  <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200 text-xs flex items-start gap-2 text-amber-900">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold">知识产权尽调结论：</strong>
                      <span>已完成PCT检索与自由实施(FTO)排查，专利权属清晰，不含开源传染组件，支持独占实施与商务转让。</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: TECHNICAL SPECS & CLAIMS */}
            {activeTab === 'technical_specs' && (
              <motion.div 
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5"
              >
                {/* Abstract */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    专利公开技术说明与保护范围
                  </h3>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                    {tech.abstract}
                  </div>
                </div>

                {/* Patent Drawings (说明书附图) */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      官方专利说明书附图与结构拓扑
                    </h3>
                    <span className="text-[11px] text-slate-500 font-mono">共 4 幅公开图纸</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { url: 'https://img.baiten.cn/img/80cf1c09b08cbe1163a6718e894efe0b/196/0', title: '图 1 系统总成结构拓扑' },
                      { url: 'https://img.baiten.cn/img/90bc077708a45df95599f087955931b9/196/0', title: '图 2 核心控制算法框图' },
                      { url: 'https://img.baiten.cn/img/917492d999de3001a829443916c67a58/196/0', title: '图 3 实车动态响应曲线' },
                      { url: 'https://img.baiten.cn/img/a61abd83c0a5351d6ddd490dd0f180d4/196/0', title: '图 4 电磁阻尼阀构型图' }
                    ].map((fig, idx) => (
                      <div key={idx} className="group relative bg-slate-50 rounded-xl border border-slate-200 p-2 overflow-hidden hover:border-blue-400 hover:shadow-xs transition-all flex flex-col items-center">
                        <div className="w-full h-28 flex items-center justify-center bg-white rounded-lg p-1 border border-slate-100 overflow-hidden">
                          <img 
                            src={fig.url} 
                            alt={fig.title} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                            loading="lazy"
                          />
                        </div>
                        <div className="mt-2 text-[11px] font-bold text-slate-700 text-center truncate w-full">
                          {fig.title}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Claims */}
                {tech.claimsSummary && tech.claimsSummary.length > 0 && (
                  <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <FileCheck2 className="w-4 h-4 text-indigo-600" />
                      核心权利要求保护范围提炼
                    </h3>
                    <div className="space-y-2">
                      {tech.claimsSummary.map((claim, idx) => (
                        <div key={idx} className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                          <strong className="text-blue-800">【权利要求 {idx + 1}】</strong> {claim}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* TAB 3: TRANSFER POLICY & CONTACT */}
            {activeTab === 'transfer_policy' && (
              <motion.div 
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5"
              >
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-blue-600" />
                      官方科技成果转化直通服务专班
                    </h3>
                    <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-200">
                      直属办理通道
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-slate-400 block text-[11px]">专线电话 (专人接听)</span>
                        <span className="font-mono font-bold text-slate-900 text-sm">{tech.transferContact?.phone || '0431-85167421'}</span>
                      </div>
                      <button 
                        onClick={() => handleCopy(tech.transferContact?.phone || '0431-85167421', '专线电话')}
                        className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded text-xs text-blue-600 font-bold"
                      >
                        复制
                      </button>
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-slate-400 block text-[11px]">官方受理邮箱</span>
                        <span className="font-mono font-bold text-slate-900 text-xs">{tech.transferContact?.email || 'kjkf@jlu.edu.cn'}</span>
                      </div>
                      <button 
                        onClick={() => handleCopy(tech.transferContact?.email || 'kjkf@jlu.edu.cn', '受理邮箱')}
                        className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded text-xs text-blue-600 font-bold"
                      >
                        复制
                      </button>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                    <span className="text-slate-400 block text-[11px] mb-0.5">负责机构及办公地址</span>
                    <strong className="text-slate-800">{tech.transferContact?.centerName || '吉林大学科技成果转化办公室 / 工业技术研究总院'}</strong>
                    <div className="text-slate-500 mt-0.5">{tech.transferContact?.address || '吉林省长春市前进大街2699号鼎新楼'}</div>
                  </div>
                </div>

                {/* Policy Support Mechanisms */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    企业产学研转化利好支持政策
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                      <strong className="text-slate-900 block">“先用后转”试用机制</strong>
                      <p className="text-slate-500 leading-relaxed">允许企业先行试用技术并进行中试验证，验证达到量产指标后再结算转化款项。</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                      <strong className="text-slate-900 block">赋权改革与决策效率</strong>
                      <p className="text-slate-500 leading-relaxed">科研团队拥有自主转化权，校内审批流程精简，商务合同签署周期缩短50%以上。</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                      <strong className="text-slate-900 block">联合申报研发补贴</strong>
                      <p className="text-slate-500 leading-relaxed">支持校企联合申报国家重点研发计划与省部级重大专项，最高可获500万资金配套。</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* RIGHT 4 COLS: ACTION & DECISION ASSISTANT SIDEBAR */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Primary Booking Card */}
            <div className="bg-linear-to-br from-slate-900 via-[#082C6C] to-slate-900 text-white rounded-2xl p-5 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-1.5 text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Handshake className="w-3.5 h-3.5 text-blue-400" /> 闭门对接直通车
              </div>
              <h3 className="text-base font-bold text-white mb-1">
                预约发明人闭门技术研讨
              </h3>
              <p className="text-xs text-blue-100/80 leading-relaxed mb-4">
                1个工作日内安排专职经纪人与技术发明人对接，支持线上保密视频会或实地技术考察。
              </p>

              <button
                id="btn-sidebar-book-docking"
                onClick={() => onOpenBooking(tech)}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer mb-2.5"
              >
                <Handshake className="w-4 h-4" /> 立即发起预约
              </button>

              <button
                onClick={() => handleCopy(tech.transferContact?.phone || '0431-85167421', '转化电话')}
                className="w-full py-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-blue-300" /> 拨打官方转化专线
              </button>
            </div>

            {/* Quick Enterprise Fit Calculator */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-blue-600" />
                  企业适配度测算
                </span>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  匹配度 96% (极高)
                </span>
              </div>

              <div className="space-y-2">
                <div>
                  <label className="text-slate-500 text-[11px] block mb-1">您的企业角色：</label>
                  <select 
                    value={enterpriseType}
                    onChange={(e) => setEnterpriseType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-800 focus:outline-hidden"
                  >
                    <option value="tier1">Tier-1 / 关键系统核心供应商</option>
                    <option value="oem">整车 / 主机装备制造厂</option>
                    <option value="specialized">专精特新 / 细分行业领军企业</option>
                  </select>
                </div>

                <div className="pt-1">
                  <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={hasPilotLine}
                      onChange={(e) => setHasPilotLine(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span>具备工程测试台架或试制产线</span>
                  </label>
                </div>
              </div>

              <div className="p-2.5 bg-blue-50/60 rounded-xl border border-blue-100 text-[11px] text-blue-900 space-y-1">
                <strong>测算建议：</strong>
                <p>该成果中试完备，适合作为企业升级核心子模块，预计可缩短自研周期 6-9 个月。</p>
              </div>
            </div>

            {/* Jump to JLU Tech Map */}
            {!universityScope && tech.universityKey === 'jlu' && onSelectUniversity && (
              <button
                onClick={() => onSelectUniversity('jlu')}
                className="w-full py-2.5 bg-blue-50 hover:bg-blue-100 text-[#0F52BA] font-bold rounded-xl text-xs border border-blue-200 transition-all flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
              >
                查看吉林大学战略产业技术图谱 &rarr;
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
