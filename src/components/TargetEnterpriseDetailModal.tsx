import React, { useState } from 'react';
import { TargetEnterprise, PatentItem } from '../types';
import { 
  Building2, 
  X, 
  ExternalLink, 
  Phone, 
  Mail, 
  User, 
  MapPin, 
  Coins, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Package, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  Copy, 
  FileText, 
  ChevronRight,
  AlertTriangle,
  ArrowUpRight
} from 'lucide-react';

interface TargetEnterpriseDetailModalProps {
  isOpen: boolean;
  enterprise: TargetEnterprise | null;
  onClose: () => void;
  onSelectJluPatentForMatch?: (patent: PatentItem) => void;
  onOpenAiAgentWithEnterprise?: (enterprise: TargetEnterprise) => void;
}

export const TargetEnterpriseDetailModal: React.FC<TargetEnterpriseDetailModalProps> = ({
  isOpen,
  enterprise,
  onClose,
  onOpenAiAgentWithEnterprise
}) => {
  const [copied, setCopied] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'similar_patents' | 'chain_position' | 'patent_products'>('similar_patents');

  if (!isOpen || !enterprise) return null;

  const handleCopyContact = () => {
    const text = `【吉大科技成果对接 - 目标企业联络人】\n企业：${enterprise.name}\n部门/职务：${enterprise.contact.dept} / ${enterprise.contact.title}\n联系人：${enterprise.contact.contactPerson}\n电话：${enterprise.contact.phone}\n邮箱：${enterprise.contact.email}\n建议对接策略：${enterprise.contact.suggestedApproach}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-5xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Header */}
        <div className="bg-linear-to-r from-[#082C6C] via-[#0F52BA] to-[#0A3D8F] text-white p-6 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/20 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <h2 className="text-3xl font-black tracking-tight text-white mb-2">
                  {enterprise.name}
                </h2>
                <div className="flex flex-wrap items-center gap-3 text-sm text-blue-100/90 font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                    {enterprise.location}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-blue-300/50" />
                  <span className="font-mono">信用代码: {enterprise.creditCode}</span>
                </div>
              </div>
              
              {onOpenAiAgentWithEnterprise && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenAiAgentWithEnterprise(enterprise);
                  }}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-[0_4px_12px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_16px_rgba(16,185,129,0.4)] shrink-0"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>AI智能体转化分析</span>
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-5 border-t border-white/10">
              <div>
                <span className="text-blue-200 block text-[11px] mb-0.5">专利总数 (发明专利)</span>
                <span className="font-bold text-white text-lg font-mono tracking-tight">{enterprise.patentTotalCount} <span className="text-sm font-medium text-blue-100/70">项</span> ({enterprise.inventionPatentCount} <span className="text-sm font-medium text-blue-100/70">发明</span>)</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <span className="text-blue-200 block text-[11px] mb-0.5">注册资本</span>
                <span className="font-bold text-white text-lg font-mono tracking-tight">{enterprise.registeredCapital}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50/80 px-6 shrink-0 overflow-x-auto gap-2">
          <button
            onClick={() => setActiveSubTab('similar_patents')}
            className={`py-3.5 px-4 text-sm font-bold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeSubTab === 'similar_patents'
                ? 'border-[#003d80] text-[#003d80] bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>【路径一】相似专利对比与技术重叠 ({enterprise.similarPatents?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('chain_position')}
            className={`py-3.5 px-4 text-sm font-bold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeSubTab === 'chain_position'
                ? 'border-[#003d80] text-[#003d80] bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4 text-indigo-600" />
            <span>【路径二】产业链定位与环节</span>
          </button>

          <button
            onClick={() => setActiveSubTab('patent_products')}
            className={`py-3.5 px-4 text-sm font-bold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeSubTab === 'patent_products'
                ? 'border-[#003d80] text-[#003d80] bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Package className="w-4 h-4 text-emerald-600" />
            <span>【路径三】专利密集型产品备案 ({enterprise.patentProducts?.length || 0})</span>
          </button>

          
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-slate-50/40">

          {/* AI Matching Reason Box */}
          <div className="bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4.5">
            <div className="flex items-center gap-2 text-sm font-bold text-[#003d80] mb-1.5">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>佰腾专利大数据与吉大成果智能撮合协同逻辑：</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              {enterprise.synergyReason}
            </p>
          </div>

          {/* Tab 1: Similar Patents */}
          {activeSubTab === 'similar_patents' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span>企业现有相近公开专利 (佰腾中国专利库全量比对)</span>
                    <span className="text-sm font-normal text-slate-500">
                      通过专利权利要求语义向量计算，该企业在该技术分支研发活跃度极高
                    </span>
                  </h4>
                </div>
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                  共检索到 {enterprise.similarPatents?.length || 0} 项高相关专利
                </span>
              </div>

              <div className="space-y-3">
                {enterprise.similarPatents?.map((pat, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:border-blue-300 transition-all">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-sm font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                            {pat.patentNo}
                          </span>
                          <span className="text-sm text-slate-400">IPC: {pat.ipc}</span>
                          <span className="text-sm text-slate-400">授权/公开日: {pat.grantDate}</span>
                        </div>
                        <h5 className="text-base font-bold text-slate-900">{pat.title}</h5>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100 bg-slate-50/70 p-3 rounded-xl">
                      <span className="text-[11px] font-bold text-slate-700 block mb-1">
                        技术互补 / 替代对比分析：
                      </span>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {pat.techOverlapDescription}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Chain Position */}
          {activeSubTab === 'chain_position' && enterprise.chainPosition && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-sm text-slate-500">所属战略性产业链</span>
                    <h4 className="text-lg font-bold text-[#003d80] mt-0.5">
                      {enterprise.chainPosition.chainName}
                    </h4>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-sm font-bold">
                    {enterprise.chainPosition.nodeName}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                    <span className="font-bold text-slate-700 block mb-1">细分赛道 / 技术分支：</span>
                    <p className="text-slate-600">{enterprise.chainPosition.subSegment}</p>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                    <span className="font-bold text-slate-700 block mb-1">企业核心主力产品：</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {enterprise.chainPosition.mainProducts.map((prod, i) => (
                        <span key={i} className="px-2 py-0.5 bg-white rounded border border-slate-200 text-slate-700 font-medium">
                          {prod}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Patent Products */}
          {activeSubTab === 'patent_products' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-slate-900">
                  国家专利密集型产品备案清单 (中国专利保护协会运营)
                </h4>
                <span className="text-sm text-slate-500">具备规模化量产与产业化承接实力</span>
              </div>

              {enterprise.patentProducts && enterprise.patentProducts.length > 0 ? (
                <div className="space-y-3">
                  {enterprise.patentProducts.map((prod, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[11px] font-bold">
                              {prod.productCategory}
                            </span>
                            <span className="text-sm font-mono text-slate-500">{prod.productCode}</span>
                            <span className="text-sm text-slate-400">{prod.filingYear}</span>
                          </div>
                          <h5 className="text-lg font-bold text-slate-900">{prod.productName}</h5>
                        </div>
                        
                      </div>

                      <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-3 text-sm text-emerald-950">
                        <span className="font-bold block mb-1">与吉大专利的产业化结合点：</span>
                        <p>{prod.patentSynergyPoint}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-8 text-center text-slate-500 border border-slate-200 text-sm">
                  暂无独立备案产品信息，企业主要通过技术转让与委托开发方式推进。
                </div>
              )}
            </div>
          )}

          </div>
        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm shrink-0">
          <span className="text-slate-500">
            数据来源：佰腾中国专利全文库、中国专利保护协会专利密集型产品备案库、全国科技型企业工商画像
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl font-semibold transition-colors"
            >
              关闭
            </button>
            {onOpenAiAgentWithEnterprise && (
              <button
                onClick={() => {
                  onClose();
                  onOpenAiAgentWithEnterprise(enterprise);
                }}
                className="px-4 py-2 bg-[#003d80] hover:bg-blue-900 text-white rounded-xl font-bold flex items-center gap-1.5 transition-all shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>进入AI智能体自动撰写转化报告</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
