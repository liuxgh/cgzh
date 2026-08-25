import React from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  FileText,
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
  if (!patent) return null;

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
            <span className="text-sm font-mono px-2 py-0.5 rounded bg-white/15 text-blue-100 border border-white/20">
              {patent.patentNo}
            </span>
            <span className="text-sm px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
              {patent.fieldName}
            </span>
            <a href="https://www.baiten.cn" target="_blank" rel="noreferrer" className="text-sm px-2 py-0.5 rounded bg-emerald-500/30 hover:bg-emerald-500/50 transition-colors text-emerald-100 flex items-center gap-1 cursor-pointer">
              综合价值指数: <span className="font-bold">{patent.baitengScore?.overall || 85}</span>
            </a>
          </div>

          <h2 className="text-xl font-bold text-white tracking-tight leading-snug mb-3 pr-8">
            {patent.title}
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-sm text-blue-100">
            <div>
              <span className="text-blue-200">发明人:</span>{' '}
              <strong className="text-white">{patent.inventor}</strong>
            </div>
            <div className="text-blue-300/60">|</div>
            <div>
              <span className="text-blue-200">IPC:</span>{' '}
              <span className="font-mono text-white">{patent.ipc}</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          <div className="space-y-5">
            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                专利权利要求与技术摘要
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                {patent.abstract}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                吉林大学重点攻关核心创新点
              </h4>
              <div className="space-y-2">
                {patent.innovations.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-400">申请日期:</span> <strong className="text-slate-800 font-mono ml-1">{patent.applicationDate}</strong>
              </div>
              <div>
                <span className="text-slate-400">授权公告日:</span> <strong className="text-slate-800 font-mono ml-1">{patent.grantDate}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div>
            <a href="https://www.baiten.cn" target="_blank" rel="noreferrer" className="text-sm font-semibold text-slate-600 hover:text-blue-600 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-blue-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm">
              <FileText className="w-4 h-4" />
              查看专利详情
            </a>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onLaunchAiMatch(patent);
              }}
              className="text-sm font-bold px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-xs transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              启动AI企业精准匹配
            </button>
            <button
              onClick={() => {
                onClose();
                onInitiateTransfer(patent);
              }}
              className="text-sm font-bold px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-colors flex items-center gap-1.5"
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
