import React, { useState, useEffect } from 'react';
import { TargetEnterprise, PatentItem } from '../types';
import { 
  ArrowLeft, 
  BrainCircuit, 
  Sparkles, 
  Building2, 
  FileText, 
  Phone,
  Mail,
  CheckCircle2,
  Copy,
  Save,
  Send
} from 'lucide-react';

interface AiActionPlanPageProps {
  enterprise: TargetEnterprise;
  activePatent: PatentItem;
  onBack: () => void;
}

export const AiActionPlanPage: React.FC<AiActionPlanPageProps> = ({
  enterprise,
  activePatent,
  onBack
}) => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [activeTab, setActiveTab] = useState<'official_letter' | 'call_script'>('official_letter');
  const [letterContent, setLetterContent] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Generate the initial letter content
    const content = `【吉林大学科技开发中心 - 科技成果精准转化推荐函】

致：${enterprise.name} 技术研发中心及决策管理团队

关于推介吉林大学重大科技成果《${activePatent.title}》（专利号：${activePatent.patentNo}）的函

一、成果背景与核心发明点：
${activePatent.abstract}

二、企业痛点与协同价值：
经佰腾专利大数据与产业链全景分析，贵单位在相关产业链具备领先的产业化与量产实力，本技术成果可有效突破当前技术瓶颈，降低生产成本并显著提升产品竞争力。

三、拟合作模式：
支持技术转让、专利排他/独占实施许可、专利开放许可及共建联合实验室等多维度合作。

联系部门：吉林大学科技开发中心 (技术转移中心)
联系电话：0431-85168888
电子邮箱：ttc@jlu.edu.cn`;
    
    setLetterContent(content);

    // Simulate AI generation process
    const timer = setTimeout(() => {
      setIsGenerating(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, [enterprise, activePatent]);

  const handleCopyText = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] space-y-6 animate-in fade-in">
        <div className="relative">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center animate-pulse">
            <BrainCircuit className="w-12 h-12 text-blue-600" />
          </div>
          <div className="absolute -top-2 -right-2 text-emerald-500 animate-bounce">
            <Sparkles className="w-8 h-8" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">AI 智能体正在撰写对接方案...</h2>
          <p className="text-slate-500 font-medium">正在深度分析 {enterprise.name} 产业需求与专利契合点</p>
        </div>
        <div className="w-64 h-2 bg-slate-100 rounded-full overflow-hidden mt-4">
          <div className="h-full bg-linear-to-r from-blue-500 to-indigo-600 rounded-full animate-[progress_2.8s_ease-in-out_forwards] w-full origin-left" style={{ transform: 'scaleX(0)' }}>
            <style>{`
              @keyframes progress {
                0% { transform: scaleX(0); }
                50% { transform: scaleX(0.7); }
                100% { transform: scaleX(1); }
              }
            `}</style>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="w-10 h-10 bg-white border border-slate-200 text-slate-600 rounded-xl flex items-center justify-center hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            AI 成果转化对接方案 <Sparkles className="w-5 h-5 text-blue-600" />
          </h2>
          <p className="text-slate-500 text-sm mt-1 flex items-center gap-2">
            <span>当前对接企业：<strong className="text-slate-800">{enterprise.name}</strong></span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span>企业所属行业：{enterprise.industry}</span>
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden flex flex-col md:flex-row min-h-[650px]">
        
        {/* Left Sidebar (Tabs) */}
        <div className="w-full md:w-72 bg-slate-50 border-r border-slate-200 p-4 shrink-0 flex flex-col gap-2">
          <div className="text-xs font-bold text-slate-400 mb-2 px-2 uppercase tracking-wider">对接方案清单</div>
          
          <button
            onClick={() => setActiveTab('official_letter')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-3 transition-colors ${
              activeTab === 'official_letter'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-200/50'
            }`}
          >
            <FileText className={`w-4 h-4 ${activeTab === 'official_letter' ? 'text-blue-200' : 'text-slate-400'}`} />
            <span>吉林大学科技成果转化推荐函</span>
          </button>
          
          <button
            onClick={() => setActiveTab('call_script')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-3 transition-colors ${
              activeTab === 'call_script'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-200/50'
            }`}
          >
            <Phone className={`w-4 h-4 ${activeTab === 'call_script' ? 'text-blue-200' : 'text-slate-400'}`} />
            <span>走访与电话沟通切入指南</span>
          </button>

          <div className="mt-auto pt-6 px-2">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-blue-700 font-bold text-xs">
                <Building2 className="w-3.5 h-3.5" />
                靶向匹配信息
              </div>
              <p className="text-[11px] text-blue-600/80 leading-relaxed">
                本对接方案由 AI 智能体根据 <strong>{enterprise.name}</strong> 的工商信息、专利图谱与产品备案数据生成，建议核对后再发送。
              </p>
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 p-6 sm:p-8 flex flex-col bg-white">
          
          {activeTab === 'official_letter' && (
            <div className="flex flex-col h-full space-y-4 animate-in fade-in">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-black text-slate-900">吉林大学科技成果转化推荐函</h3>
                  <p className="text-slate-500 text-sm mt-1">您可在此直接编辑并完善 AI 生成的推荐函内容</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleSave}
                    className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-sm font-bold flex items-center gap-1.5 transition-colors"
                  >
                    {isSaved ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Save className="w-3.5 h-3.5" />}
                    <span>{isSaved ? '已保存' : '保存修改'}</span>
                  </button>
                  <button
                    onClick={() => handleCopyText(letterContent)}
                    className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-sm font-bold flex items-center gap-1.5 transition-colors"
                  >
                    {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? '已复制全文' : '复制文本'}</span>
                  </button>
                  <button className="px-3.5 py-1.5 bg-[#0F52BA] hover:bg-[#082C6C] text-white rounded-lg text-sm font-bold flex items-center gap-1.5 transition-colors shadow-sm">
                    <Send className="w-3.5 h-3.5" />
                    <span>一键发送</span>
                  </button>
                </div>
              </div>

              <div className="flex-1 relative mt-4">
                <textarea
                  value={letterContent}
                  onChange={(e) => setLetterContent(e.target.value)}
                  className="w-full h-full min-h-[400px] p-6 text-sm text-slate-800 leading-relaxed border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none bg-slate-50/50 font-sans shadow-inner"
                />
              </div>
            </div>
          )}

          {activeTab === 'call_script' && (
            <div className="flex flex-col h-full space-y-4 animate-in fade-in">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-black text-slate-900">吉大成果转化老师上门走访与电话沟通切入指南</h3>
                  <p className="text-slate-500 text-sm mt-1">针对 {enterprise.name} 的定制化沟通策略</p>
                </div>
                <button
                  onClick={() => handleCopyText(`【针对 ${enterprise.name} 的转化沟通切入建议】\n1. 开门见山：表明吉林大学科技成果直推背景，提及佰腾大数据精准匹配贵司现有专利与备案产品。\n2. 抛出痛点数据：直接展示吉大专利测试样件在极端工况下的提升数据。\n3. 降低决策门槛：提出先签排他小批量中试或先试后买/开放许可。\n4. 约定下步动作：提供完整专利授权证书与第三方测试报告，邀约下周视频会议。`)}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-sm font-bold flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? '已复制话术' : '复制沟通要点'}</span>
                </button>
              </div>

              <div className="space-y-4 mt-4">
                <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 space-y-2 text-sm text-slate-800 shadow-sm">
                  <span className="font-bold text-[#003d80] flex items-center gap-1.5 text-base">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    1. 开场白与背景介绍（消除戒备心理）
                  </span>
                  <p className="leading-relaxed text-slate-700 pl-3.5">
                    “您好，是 {enterprise.name} 的技术总监吗？我是吉林大学科技开发中心的转化专员。我们在佰腾专利大数据系统中关注到贵司近期在相关领域的研发动作。吉大相关重点实验室正好有一项已完成台架验证的成熟发明专利（{activePatent.patentNo}），与贵司当前攻关方向高度契合，特地向您做针对性推介。”
                  </p>
                </div>
                <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100 space-y-2 text-sm text-slate-800 shadow-sm">
                  <span className="font-bold text-emerald-900 flex items-center gap-1.5 text-base">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    2. 直击痛点与实测数据展示（建立技术信任）
                  </span>
                  <p className="leading-relaxed text-slate-700 pl-3.5">
                    “我们注意到业内普遍面临生产过程中的稳定性与寿命瓶颈。吉大该成果通过新型机理，在第三方权威测试中实现了显著提升，已通过中试放大。不仅能直接替代进口昂贵方案，且综合成本可下降约25%。”
                  </p>
                </div>
                <div className="bg-purple-50 p-5 rounded-2xl border border-purple-100 space-y-2 text-sm text-slate-800 shadow-sm">
                  <span className="font-bold text-purple-900 flex items-center gap-1.5 text-base">
                    <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                    3. 灵活合作模式与打消顾虑（先试后买 / 开放许可）
                  </span>
                  <p className="leading-relaxed text-slate-700 pl-3.5">
                    “吉林大学目前全力落实科技成果赋权与开放许可改革政策。{enterprise.shortName || '贵司'}可以通过开放许可、先使用后付费或小规模中试验证的方式切入，无需一次性承担高昂转让费，最大程度降低技术导入风险。”
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
