import React, { useState, useEffect } from 'react';
import { PatentItem, TargetEnterprise } from '../types';
import { TARGET_ENTERPRISES_DATA } from '../data/targetEnterprisesData';
import { 
  BrainCircuit, 
  Sparkles, 
  Search, 
  FileText, 
  Building2, 
  ShieldCheck, 
  Layers, 
  Package, 
  CheckCircle2, 
  Send, 
  Copy, 
  RefreshCw, 
  ChevronRight, 
  ExternalLink, 
  Download, 
  Phone, 
  Mail, 
  User, 
  AlertCircle
} from 'lucide-react';

interface AiEnterpriseAgentProps {
  patents: PatentItem[];
  initialQuery?: string;
  initialEnterprise?: TargetEnterprise | null;
  onSelectEnterprise: (enterprise: TargetEnterprise) => void;
}

export const AiEnterpriseAgent: React.FC<AiEnterpriseAgentProps> = ({
  patents,
  initialQuery = '',
  initialEnterprise = null,
  onSelectEnterprise
}) => {
  const [selectedPatentId, setSelectedPatentId] = useState<string>(patents[0]?.id || 'pat-001');
  const [customInputText, setCustomInputText] = useState<string>(initialQuery);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'report' | 'official_letter' | 'call_script'>('report');
  const [copied, setCopied] = useState<boolean>(false);

  const activePatent = patents.find(p => p.id === selectedPatentId) || patents[0];

  const agentSteps = [
    { title: '专利权利要求与技术特征语义解析', desc: '提取核心发明点、微观机理、适用工业场景及潜在替代/互补特征' },
    { title: '佰腾中国专利大模型向量语义比对', desc: '穿透2亿+专利数据库，匹配全国企业同族/相似技术公开专利' },
    { title: '战略产业链上下游供需图谱穿透', desc: '定位上游关键原材料、中游制造模块与下游整机集成商技术痛点' },
    { title: '国家专利密集型产品备案库产业化能力校验', desc: '比对200,000+款已备案量产产品，筛选具备规模化采购实力的规上企业' },
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

  const handleCopyText = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Agent Banner */}
      <div className="bg-linear-to-r from-[#082C6C] via-[#0F52BA] to-[#0A3D8F] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-blue-400/30">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-bold border border-blue-200 flex items-center gap-1.5 backdrop-blur-xs">
            <BrainCircuit className="w-4 h-4 text-blue-700" />
            <span>佰腾吉大 • AI 专利找买家智能体 (Baiteng Patent-to-Buyer Agent)</span>
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-blue-100 text-sm border border-white/20">
            自主执行三维穿透检索与决策推演
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
          AI 自动化专利找买家：从成果特征到精准靶向企业报告
        </h2>
        <p className="text-sm sm:text-base text-blue-100/90 mt-2 max-w-3xl leading-relaxed">
          输入吉大专利或技术交底书，AI 智能体将自主调用<strong>佰腾全国专利库、产业链全景与国家专利密集型产品备案库</strong>进行多跳交叉推理，自动输出靶向买家企业画像清单、痛点契合点及一对一合作对接公文。
        </p>
      </div>

      {/* Input / Config Box */}
      <div className="bg-white rounded-3xl p-6 border border-[#D8E2F0] shadow-md space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          <div className="lg:col-span-6 space-y-1.5">
            <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#0F52BA]" />
              <span>快速选择吉林大学在库专利：</span>
            </label>
            <select
              value={selectedPatentId}
              onChange={(e) => setSelectedPatentId(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-[#0F52BA]"
            >
              {patents.map(p => (
                <option key={p.id} value={p.id}>
                  [{p.patentNo}] {p.title} - {p.inventor} ({p.college.split('/')[0]})
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-6 space-y-1.5">
            <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>或输入未入库技术描述/研究关键词/交底书摘要：</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customInputText}
                onChange={(e) => setCustomInputText(e.target.value)}
                placeholder="例如：高倍率快充单晶硅碳负极纳米自组装包覆..."
                className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0F52BA]"
              />
              <button
                onClick={handleRunAgent}
                disabled={isProcessing}
                className="px-5 py-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold text-sm shadow-md flex items-center gap-1.5 shrink-0 disabled:opacity-50 cursor-pointer"
              >
                {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin text-white" /> : <Sparkles className="w-4 h-4 text-white" />}
                <span>{isProcessing ? 'AI 推理检索中...' : '启动智能体寻客'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Selected Patent Quick Abstract */}
        {activePatent && (
          <div className="bg-[#F8FAFC] p-3 rounded-xl border border-slate-200 text-sm text-slate-600 flex items-center justify-between">
            <span className="line-clamp-1">
              <strong>当前分析标的：</strong>[{activePatent.patentNo}] {activePatent.title}
            </span>
            <span className="text-[#0F52BA] font-bold shrink-0 ml-2 font-mono">
              评估价值: {activePatent.valuationRange}
            </span>
          </div>
        )}
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
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-100'
                      : isCurrent
                      ? 'bg-blue-950/80 border-blue-400 text-white shadow-lg shadow-blue-500/20'
                      : 'bg-white/5 border-white/10 text-slate-500'
                  }`}
                >
                  <div className="mt-0.5">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : isCurrent ? (
                      <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-slate-600 block text-[10px] text-center leading-3.5 text-slate-500 font-mono">
                        {idx + 1}
                      </span>
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <h5 className={`text-sm font-bold ${isCurrent ? 'text-blue-300' : isDone ? 'text-emerald-300' : 'text-slate-400'}`}>
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
          
          {/* Tabs Bar */}
          <div className="flex border-b border-slate-200 bg-slate-50/80 px-6 overflow-x-auto gap-2">
            <button
              onClick={() => setActiveTab('report')}
              className={`py-4 px-4 text-sm font-bold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                activeTab === 'report'
                  ? 'border-[#003d80] text-[#003d80] bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>AI 推荐靶向买家企业全景画像 (Top 8)</span>
            </button>

            <button
              onClick={() => setActiveTab('official_letter')}
              className={`py-4 px-4 text-sm font-bold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                activeTab === 'official_letter'
                  ? 'border-[#003d80] text-[#003d80] bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>定制《产学研科技成果对接推介公函》</span>
            </button>

            <button
              onClick={() => setActiveTab('call_script')}
              className={`py-4 px-4 text-sm font-bold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                activeTab === 'call_script'
                  ? 'border-[#003d80] text-[#003d80] bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Phone className="w-4 h-4 text-indigo-600" />
              <span>成果转化老师电话/上门沟通切入策略 (Talking Points)</span>
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-6">

            {/* TAB 1: Target Enterprises Full Cards */}
            {activeTab === 'report' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-lg font-black text-slate-900">
                      AI 多跳穿透匹配出的高意向靶向企业清单
                    </h4>
                    <p className="text-sm text-slate-500">
                      已综合考量相近专利布局、产业链供需节点、专利密集型产品备案与企业研发资金实力
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-sm font-bold">
                    匹配精准度 94%+
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {TARGET_ENTERPRISES_DATA.map((ent) => (
                    <div
                      key={ent.id}
                      onClick={() => onSelectEnterprise(ent)}
                      className="bg-slate-50/70 hover:bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-blue-100 text-[#003d80] rounded text-[10px] font-bold">
                              {ent.enterpriseType}
                            </span>
                            <span className="text-sm text-slate-500">{ent.location.split('省')[0]}</span>
                          </div>
                          <h5 className="text-lg font-bold text-slate-900">{ent.name}</h5>
                        </div>
                        
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-100 text-sm text-slate-700 space-y-1">
                        <strong className="text-[#003d80] block text-[11px]">💡 AI 撮合突破点：</strong>
                        <p className="line-clamp-2 leading-relaxed text-slate-600">{ent.synergyReason}</p>
                      </div>

                      <div className="flex items-center justify-between text-sm pt-1">
                        <span></span>
                        <span className="text-[#003d80] font-bold flex items-center gap-0.5">
                          <span>查看完整画像</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: Official Letter */}
            {activeTab === 'official_letter' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-black text-slate-900">
                    AI 自动生成的定制化《吉林大学科技成果转化推介公函》
                  </h4>
                  <button
                    onClick={() => handleCopyText(`【吉林大学科技开发中心 - 科技成果精准转化推介函】\n\n致：各战略合作企业技术研发中心及决策管理团队\n\n关于推介吉林大学重大科技成果《${activePatent.title}》（专利号：${activePatent.patentNo}）的函\n\n一、成果背景与核心发明点：\n${activePatent.abstract}\n\n二、企业痛点与协同价值：\n经佰腾专利大数据与产业链全景分析，贵单位在相关产业链具备领先的产业化与量产实力，本技术成果可有效突破当前技术瓶颈，降低生产成本并显著提升产品竞争力。\n\n三、拟合作模式：\n支持技术转让、专利排他/独占实施许可、专利开放许可及共建联合实验室等多维度合作。\n\n联系部门：吉林大学科技开发中心 (技术转移中心)\n联系电话：0431-85168888\n电子邮箱：ttc@jlu.edu.cn`)}
                    className="px-3.5 py-1.5 bg-[#003d80] hover:bg-blue-900 text-white rounded-xl text-sm font-bold flex items-center gap-1.5 transition-all shadow-xs"
                  >
                    {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? '已复制公函全文' : '一键复制公函文本'}</span>
                  </button>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 font-sans text-sm text-slate-800 space-y-4 leading-relaxed max-w-4xl shadow-inner">
                  <div className="text-center pb-4 border-b border-slate-200 space-y-1">
                    <h3 className="text-lg font-bold text-slate-900 tracking-wider">吉林大学科技开发中心 (技术转移中心)</h3>
                    <p className="text-sm text-slate-500">重大科技成果产业化定向推荐公文 (专送目标企业技术管理部)</p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-bold text-slate-900">尊敬的战略合作企业技术研发管理部门：</p>
                    <p className="indent-6">
                      您好！依托<strong>佰腾网专利大数据智能评价与产业链精准匹配系统</strong>，吉林大学科研团队近期完成了一项具有重大产业化价值的技术攻关——<strong>《{activePatent.title}》</strong>（专利号：<span className="font-mono font-bold text-blue-700">{activePatent.patentNo}</span>，所属单位：{activePatent.college}，发明人：{activePatent.inventor}）。
                    </p>
                    <p className="indent-6">
                      <strong>核心创新与性能优势：</strong>{activePatent.abstract}
                    </p>
                    <p className="indent-6">
                      <strong>与贵司技术布局的战略契合点：</strong>经比对贵司公开专利布局与国家专利密集型产品备案清单，该成果可直接补充贵司在关键核心环节的技术短板，大幅缩短贵司新一代产品的研发周期，助力提升单品附加值与市场竞争力。
                    </p>
                    <p className="indent-6">
                      吉林大学诚邀贵司技术高管与研发骨干赴长春吉林大学开展实地考察与技术交流，或由我校成果转化专员带样件上门走访，共同探索技术转让、专利开放许可或共建校企联合实验室等深度合作模式。
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-200 flex justify-between items-end text-slate-600">
                    <div>
                      <p>联系单位：吉林大学科技开发中心</p>
                      <p>办公电话：0431-85168888</p>
                      <p>官方邮箱：ttc@jlu.edu.cn</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-900">吉林大学科技开发中心</p>
                      <p className="font-mono text-slate-400">2026年08月</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Talking Points */}
            {activeTab === 'call_script' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-black text-slate-900">
                    吉大成果转化老师上门走访与电话沟通切入指南 (Talking Points)
                  </h4>
                  <button
                    onClick={() => handleCopyText(`【吉大成果转化沟通切入建议】\n1. 开门见山：表明吉林大学科技成果直推背景，提及佰腾大数据精准匹配贵司现有专利与备案产品。\n2. 抛出痛点数据：直接展示吉大专利测试样件在极端工况下的提升数据。\n3. 降低决策门槛：提出先签排他小批量中试或先试后买/开放许可。\n4. 约定下步动作：提供完整专利授权证书与第三方测试报告，邀约下周视频会议。`)}
                    className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-sm font-bold flex items-center gap-1.5 transition-colors"
                  >
                    {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? '已复制话术' : '复制沟通要点'}</span>
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200 space-y-1.5 text-sm text-slate-800">
                    <span className="font-bold text-[#003d80] flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      1. 开场白与背景介绍（消除戒备心理）
                    </span>
                    <p className="leading-relaxed text-slate-700">
                      “您好，王总监！我是吉林大学科技开发中心的转化老师。我们在佰腾专利大数据系统中关注到贵司近期在相关领域的研发动作与重点产品备案。吉大相关重点实验室正好有一项已完成台架验证的成熟发明专利（{activePatent.patentNo}），与贵司当前攻关方向高度契合，特地向您做针对性推介。”
                    </p>
                  </div>

                  <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 space-y-1.5 text-sm text-slate-800">
                    <span className="font-bold text-emerald-900 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                      2. 直击痛点与实测数据展示（建立技术信任）
                    </span>
                    <p className="leading-relaxed text-slate-700">
                      “我们注意到业内普遍面临生产过程中的稳定性与寿命瓶颈。吉大该成果通过新型机理，在第三方权威测试中实现了显著提升，已通过中试放大。不仅能直接替代进口昂贵方案，且综合成本可下降约25%。”
                    </p>
                  </div>

                  <div className="bg-purple-50/70 p-4 rounded-2xl border border-purple-200 space-y-1.5 text-sm text-slate-800">
                    <span className="font-bold text-purple-900 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                      3. 灵活合作模式与打消顾虑（先试后买 / 开放许可）
                    </span>
                    <p className="leading-relaxed text-slate-700">
                      “吉林大学目前全力落实科技成果赋权与开放许可改革政策。企业可以通过开放许可、先使用后付费或小规模中试验证的方式切入，无需一次性承担高昂转让费，最大程度降低贵司技术导入风险。”
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
