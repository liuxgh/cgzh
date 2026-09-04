import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  FileText,
  ArrowRight,
  Building,
  Phone,
  Building2,
  ShieldCheck,
  Check,
  Clock,
  User,
  Inbox,
  Calendar
} from 'lucide-react';
import { PatentItem, UserRole } from '../types';
import { useIntents } from '../context/IntentContext';

interface PatentDetailModalProps {
  patent: PatentItem | null;
  onClose: () => void;
  onLaunchAiMatch: (patent: PatentItem) => void;
  onInitiateTransfer: (patent: PatentItem) => void;
  userRole?: UserRole;
  onNavigateToIntentHub?: () => void;
}

export const PatentDetailModal: React.FC<PatentDetailModalProps> = ({
  patent,
  onClose,
  onLaunchAiMatch,
  onInitiateTransfer,
  userRole = 'university',
  onNavigateToIntentHub
}) => {
  const { addIntent, getIntentsByTarget } = useIntents();
  const [showEnterpriseIntentModal, setShowEnterpriseIntentModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form data for enterprise docking
  const [intentFormData, setIntentFormData] = useState({
    companyName: '长春一汽富维汽车零部件股份有限公司',
    contactPerson: '李经理',
    phone: '13843188899',
    email: 'li_manager@faway.com',
    mode: '专利独占实施许可 + 中试产线联合验证',
    demandDesc: '希望就该项专利的核心权利要求参数与高校科研团队深入沟通，拟在企业产线开展中试验证与小批量试制。'
  });

  if (!patent) return null;

  const relatedIntents = getIntentsByTarget(patent.id).concat(getIntentsByTarget(patent.patentNo));

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleEnterpriseSubmitIntent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!intentFormData.companyName.trim() || !intentFormData.phone.trim()) return;

    addIntent({
      targetType: 'patent',
      targetId: patent.id,
      targetTitle: patent.title,
      targetNo: patent.patentNo,
      domain: patent.fieldName,
      inventorOrContact: `${patent.inventor} (${patent.college || '吉林大学'})`,
      companyName: intentFormData.companyName.trim(),
      contactPerson: intentFormData.contactPerson.trim(),
      phone: intentFormData.phone.trim(),
      email: intentFormData.email.trim(),
      mode: intentFormData.mode,
      demandDesc: intentFormData.demandDesc.trim(),
      status: 'pending'
    });

    setShowEnterpriseIntentModal(false);
    showToast(`已成功向吉林大学科研院提交专利《${patent.title.slice(0, 14)}...》对接意向！高校端已收到并在意向工作台中显示。`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-60 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2.5 text-sm font-medium animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="bg-white rounded-3xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-linear-to-r from-[#082C6C] via-[#0F52BA] to-[#0A3D8F] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-sm font-mono px-2.5 py-0.5 rounded-md bg-white/15 text-blue-100 border border-white/20 font-bold">
              {patent.patentNo}
            </span>
            <span className="text-sm px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
              {patent.fieldName}
            </span>
            <a href="https://www.baiten.cn" target="_blank" rel="noreferrer" className="text-sm px-2.5 py-0.5 rounded-md bg-emerald-500/30 hover:bg-emerald-500/50 transition-colors text-emerald-100 flex items-center gap-1 cursor-pointer font-bold">
              综合价值指数: <span>{patent.baitengScore?.overall || 85}</span>
            </a>
          </div>

          <h2 className="text-xl font-black text-white tracking-tight leading-snug mb-3 pr-8">
            {patent.title}
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-xs text-blue-100">
            <div>
              <span className="text-blue-200">发明人:</span>{' '}
              <strong className="text-white">{patent.inventor}</strong>
            </div>
            <div className="text-blue-300/60">|</div>
            <div>
              <span className="text-blue-200">所属学院:</span>{' '}
              <strong className="text-white">{patent.college || '汽车工程学院'}</strong>
            </div>
            <div className="text-blue-300/60">|</div>
            <div>
              <span className="text-blue-200">IPC:</span>{' '}
              <span className="font-mono text-white">{patent.ipc}</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
          {/* Linked Intents Notice */}
          {relatedIntents.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-amber-900">
                <Building className="w-4 h-4 text-amber-600 shrink-0" />
                <span>该专利已收到 <strong>{relatedIntents.length}</strong> 家企业提交的转化对接意向！</span>
              </div>
              {onNavigateToIntentHub && (
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToIntentHub();
                  }}
                  className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-xs transition-colors cursor-pointer"
                >
                  去工作台查看 &rarr;
                </button>
              )}
            </div>
          )}

          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              专利权利要求与技术摘要
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200 font-medium">
              {patent.abstract}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              吉林大学重点攻关核心创新点
            </h4>
            <div className="space-y-2">
              {patent.innovations?.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-blue-50/50 p-3 rounded-xl border border-blue-100">
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
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div>
            <button
              onClick={() => setShowEnterpriseIntentModal(true)}
              className="text-xs font-bold px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>发起企业转化对接意向</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onLaunchAiMatch(patent);
              }}
              className="text-xs font-bold px-4 py-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              启动AI企业精准匹配
            </button>
            <button
              onClick={() => {
                onClose();
                onInitiateTransfer(patent);
              }}
              className="text-xs font-bold px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>AI靶向寻客</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Enterprise Intent Form Modal */}
      {showEnterpriseIntentModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-5 animate-in fade-in duration-200">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 inline-block mb-1">
                  企业转化对接直通车
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  提交《专利科技成果转化对接意向书》
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  提交后将直达吉林大学科技开发中心与专利发明人团队，高校将根据工作排期安排响应对接。
                </p>
              </div>
              <button 
                onClick={() => setShowEnterpriseIntentModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Patent Quick Snapshot */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-[#0F52BA] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                  {patent.patentNo}
                </span>
                <span className="font-bold text-slate-900 truncate">{patent.title}</span>
              </div>
              <div className="text-slate-500 flex items-center gap-2 pt-0.5">
                <span>发明人：<strong>{patent.inventor}</strong></span>
                <span>• 院系：{patent.college || '吉林大学'}</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleEnterpriseSubmitIntent} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    意向企业名称
                  </label>
                  <input
                    required
                    type="text"
                    value={intentFormData.companyName}
                    onChange={e => setIntentFormData({...intentFormData, companyName: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium focus:outline-hidden focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    拟开展合作模式
                  </label>
                  <select
                    value={intentFormData.mode}
                    onChange={e => setIntentFormData({...intentFormData, mode: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium focus:outline-hidden focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="专利独占实施许可 + 中试产线联合验证">专利独占实施许可 + 中试产线联合验证</option>
                    <option value="专利普通实施许可">专利普通实施许可</option>
                    <option value="专利所有权完全转让">专利所有权完全转让</option>
                    <option value="专利作价入股与合资产业化">专利作价入股与合资产业化</option>
                    <option value="校企联合攻关与共建研发中心">校企联合攻关与共建研发中心</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">对接人姓名及职务</label>
                  <input
                    required
                    type="text"
                    value={intentFormData.contactPerson}
                    onChange={e => setIntentFormData({...intentFormData, contactPerson: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium focus:outline-hidden focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    联系电话 / 手机
                  </label>
                  <input
                    required
                    type="text"
                    value={intentFormData.phone}
                    onChange={e => setIntentFormData({...intentFormData, phone: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium focus:outline-hidden focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">企业电子邮箱</label>
                  <input
                    type="email"
                    value={intentFormData.email}
                    onChange={e => setIntentFormData({...intentFormData, email: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium focus:outline-hidden focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">意向对接诉求与具体应用场景说明</label>
                <textarea
                  required
                  rows={3}
                  value={intentFormData.demandDesc}
                  onChange={e => setIntentFormData({...intentFormData, demandDesc: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium focus:outline-hidden focus:border-emerald-500 resize-none"
                />
              </div>

              <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  <strong>官方转化直通保障：</strong>您的对接意向将由吉林大学科技开发中心统一备案，并出具标准对接保密函，保障校企双方商业及知识产权权益。
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEnterpriseIntentModal(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl font-bold hover:bg-slate-50 cursor-pointer"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-sm cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  确认提交对接意向
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
