import React, { useState } from 'react';
import { 
  X, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Download, 
  Share2, 
  Building2, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Clock, 
  FileText,
  TrendingUp,
  Tag,
  ArrowRight
} from 'lucide-react';
import { PatentItem } from '../types';

interface PatentDetailModalProps {
  patent: PatentItem | null;
  onClose: () => void;
  onLaunchAiMatch: (patent: PatentItem) => void;
  onInitiateTransfer: (patent: PatentItem) => void;
}

export const PatentDetailModal: React.FC<PatentDetailModalProps> = ({
  patent,
  onClose,
  onLaunchAiMatch,
  onInitiateTransfer
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'info' | 'valuation' | 'industries' | 'docs'>('info');

  if (!patent) return null;

  const modeLabels: Record<string, string> = {
    transfer: '专利权转让',
    exclusive_license: '独占实施许可',
    general_license: '普通实施许可',
    open_license: '开放许可 (公开标价)',
    equity: '作价入股 / 股权合作'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-linear-to-r from-[#082C6C] via-[#0F52BA] to-[#0A3D8F] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/15 text-blue-100 border border-white/20">
              {patent.patentNo}
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-[#FF7A00]/20 text-[#FFB800] border border-[#FF7A00]/40">
              {patent.fieldName}
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/30 text-emerald-200">
              TRL {patent.trlLevel} 级成熟度
            </span>
          </div>

          <h2 className="text-xl font-bold text-white tracking-tight leading-snug mb-3 pr-8">
            {patent.title}
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-xs text-blue-100">
            <div>
              <span className="text-blue-200">发明人团队:</span>{' '}
              <strong className="text-white">{patent.inventor}</strong>
            </div>
            <div className="text-blue-300/60">|</div>
            <div>
              <span className="text-blue-200">院系/重点实验室:</span>{' '}
              <span className="text-white">{patent.college}</span>
            </div>
            <div className="text-blue-300/60">|</div>
            <div>
              <span className="text-blue-200">IPC:</span>{' '}
              <span className="font-mono text-white">{patent.ipc}</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-[#F8FAFC] px-6 gap-6 text-xs font-semibold">
          <button
            onClick={() => setActiveSubTab('info')}
            className={`py-3 border-b-2 transition-all cursor-pointer ${
              activeSubTab === 'info'
                ? 'border-[#0F52BA] text-[#0F52BA]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            成果摘要与核心创新点
          </button>
          <button
            onClick={() => setActiveSubTab('valuation')}
            className={`py-3 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSubTab === 'valuation'
                ? 'border-[#0F52BA] text-[#0F52BA]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-[#FF7A00]" />
            佰腾价值度与成熟度(TRL)
          </button>
          <button
            onClick={() => setActiveSubTab('industries')}
            className={`py-3 border-b-2 transition-all cursor-pointer ${
              activeSubTab === 'industries'
                ? 'border-[#0F52BA] text-[#0F52BA]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            应用场景与转化模式
          </button>
          <button
            onClick={() => setActiveSubTab('docs')}
            className={`py-3 border-b-2 transition-all cursor-pointer ${
              activeSubTab === 'docs'
                ? 'border-[#0F52BA] text-[#0F52BA]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            技术文档与检测报告 ({patent.documents.length})
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {activeSubTab === 'info' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  专利权利要求与技术摘要
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                  {patent.abstract}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  吉林大学重点攻关核心创新点
                </h4>
                <div className="space-y-2">
                  {patent.innovations.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400">申请日期:</span> <strong className="text-slate-800 font-mono ml-1">{patent.applicationDate}</strong>
                </div>
                <div>
                  <span className="text-slate-400">授权公告日:</span> <strong className="text-slate-800 font-mono ml-1">{patent.grantDate}</strong>
                </div>
                <div>
                  <span className="text-slate-400">科研团队归属:</span> <span className="text-slate-800 ml-1">{patent.team}</span>
                </div>
                <div>
                  <span className="text-slate-400">平台匹配热度:</span> <span className="text-blue-600 font-bold ml-1">{patent.matchCount} 家对接意向企业</span>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'valuation' && (
            <div className="space-y-5">
              {/* Baiteng Score Overview */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-xl border border-amber-200 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-5 h-5 text-amber-600" />
                    <h4 className="text-sm font-bold text-amber-950">佰腾网高价值专利综合评估</h4>
                  </div>
                  <p className="text-xs text-amber-800 max-w-md">
                    基于佰腾专利大数据AI多维评价模型认证，技术先进性与市场转化潜力处于同IPC领域前 <strong>5%</strong> 梯队。
                  </p>
                </div>
                <div className="text-center px-4 py-2 bg-white rounded-xl shadow-xs border border-amber-200 shrink-0">
                  <span className="text-[10px] text-slate-500 font-medium block">综合价值指数</span>
                  <span className="text-3xl font-extrabold text-amber-600 font-mono">{patent.baitengScore.overall}</span>
                  <span className="text-xs text-slate-400"> / 100</span>
                </div>
              </div>

              {/* Breakdown Bars */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600 font-medium">技术先进性 (权重35%)</span>
                    <strong className="font-mono text-slate-900">{patent.baitengScore.technical} 分</strong>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: `${patent.baitengScore.technical}%` }}></div>
                  </div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600 font-medium">法律稳定性 (权重25%)</span>
                    <strong className="font-mono text-slate-900">{patent.baitengScore.legal} 分</strong>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${patent.baitengScore.legal}%` }}></div>
                  </div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600 font-medium">市场前景度 (权重25%)</span>
                    <strong className="font-mono text-slate-900">{patent.baitengScore.market} 分</strong>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${patent.baitengScore.market}%` }}></div>
                  </div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600 font-medium">竞争壁垒 (权重15%)</span>
                    <strong className="font-mono text-slate-900">{patent.baitengScore.barrier} 分</strong>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-600 h-full rounded-full" style={{ width: `${patent.baitengScore.barrier}%` }}></div>
                  </div>
                </div>
              </div>

              {/* TRL Detail */}
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 space-y-2">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-blue-700" />
                  <h5 className="text-xs font-bold text-blue-900">技术就绪度 (TRL) 详细验证阶段</h5>
                </div>
                <p className="text-xs text-blue-800 leading-relaxed font-medium">
                  {patent.trlDescription}
                </p>
                <div className="flex items-center gap-1 pt-1">
                  {[1,2,3,4,5,6,7,8,9].map((step) => (
                    <div
                      key={step}
                      className={`flex-1 h-2 rounded-full ${
                        step <= patent.trlLevel ? 'bg-blue-600' : 'bg-slate-200'
                      }`}
                      title={`TRL ${step} 级`}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>TRL 1 (基础原理)</span>
                  <span>TRL 5 (中试验证)</span>
                  <span>TRL 9 (产业量产)</span>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'industries' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-blue-600" />
                  目标应用产业与下游制造环节
                </h4>
                <div className="flex flex-wrap gap-2">
                  {patent.applicableIndustries.map((ind, i) => (
                    <span key={i} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 flex items-center gap-1">
                      <Tag className="w-3 h-3 text-slate-400" />
                      {ind}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-600" />
                  支持的成果转化流转模式
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {patent.transferModes.map((mode) => (
                    <div key={mode} className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg text-center">
                      <span className="text-xs font-bold text-emerald-800">{modeLabels[mode] || mode}</span>
                    </div>
                  ))}
                </div>
              </div>

              {patent.openLicensePrice && (
                <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-purple-950 block">开放许可挂牌价格</span>
                    <span className="text-xs text-purple-700">实行先使用后付费 / 阶梯定额标准合同</span>
                  </div>
                  <span className="text-sm font-extrabold text-purple-900 font-mono">{patent.openLicensePrice}</span>
                </div>
              )}
            </div>
          )}

          {activeSubTab === 'docs' && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                授权认证材料与第三方评测报告
              </h4>
              {patent.documents.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs">
                      PDF
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">{doc.title}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{doc.size} • 官方盖章版</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert(`正在下载: ${doc.title}`)}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 px-3 py-1 rounded bg-white border border-blue-200 hover:bg-blue-50 transition-colors flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    下载查阅
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            公允参考估值: <strong className="text-slate-900 font-mono">{patent.valuationRange}</strong>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onLaunchAiMatch(patent);
              }}
              className="text-xs font-bold px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-xs transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              启动AI企业精准匹配
            </button>

            <button
              onClick={() => {
                onClose();
                onInitiateTransfer(patent);
              }}
              className="text-xs font-bold px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-colors flex items-center gap-1.5"
            >
              <span>发起立项转化</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
