import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Search, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ArrowRight, 
  Phone, 
  Mail, 
  Calendar, 
  User, 
  Building, 
  ShieldCheck, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Award, 
  Download, 
  Copy, 
  Check, 
  MessageSquare, 
  X, 
  GraduationCap,
  Layers,
  AlertCircle,
  TrendingUp,
  RefreshCw,
  ExternalLink,
  Inbox,
  LayoutList,
  LayoutGrid,
  Eye,
  ArrowUpRight,
  Tag
} from 'lucide-react';
import { useIntents } from '../context/IntentContext';
import { CooperationIntentRecord, IntentStatus, IntentTargetType, UserRole } from '../types';

interface Props {
  userRole?: UserRole;
  onSelectPatent?: (patent: any) => void;
  onNavigateToPatent?: (patentNoOrId: string) => void;
  onNavigateToUnpatented?: () => void;
}

export const IntentManagementHub: React.FC<Props> = ({ 
  userRole = 'university',
  onSelectPatent,
  onNavigateToPatent,
  onNavigateToUnpatented
}) => {
  const { intents, updateIntentStatus, assignStaff, deleteIntent } = useIntents();

  // View Mode: 'table' (structured list, high efficiency & clarity) vs 'grid' (compact cards)
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  // Filter States
  const [activeTypeTab, setActiveTypeTab] = useState<'all' | 'patent' | 'unpatented'>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = viewMode === 'table' ? 8 : 6;

  // Selected Intent for Detailed Dossier & Processing Modal
  const [selectedIntentForDetail, setSelectedIntentForDetail] = useState<CooperationIntentRecord | null>(null);
  const [statusUpdateForm, setStatusUpdateForm] = useState<{
    status: IntentStatus;
    replyNote: string;
    assignedStaff: string;
  }>({
    status: 'pending',
    replyNote: '',
    assignedStaff: ''
  });

  // AI Assistance Plan Modal
  const [aiPlanModalIntent, setAiPlanModalIntent] = useState<CooperationIntentRecord | null>(null);
  const [isGeneratingAiPlan, setIsGeneratingAiPlan] = useState<boolean>(false);
  const [aiPlanResult, setAiPlanResult] = useState<string | null>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Open Detail Modal
  const handleOpenDetail = (intent: CooperationIntentRecord) => {
    setSelectedIntentForDetail(intent);
    setStatusUpdateForm({
      status: intent.status,
      replyNote: intent.replyNote || '',
      assignedStaff: intent.assignedStaff || '吉林大学科技开发中心 成果转化科'
    });
  };

  // Save Status Update
  const handleSaveStatusUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIntentForDetail) return;

    updateIntentStatus(
      selectedIntentForDetail.id,
      statusUpdateForm.status,
      statusUpdateForm.replyNote.trim(),
      userRole === 'university' ? '高校端科技开发专员' : '企业联络人'
    );

    if (statusUpdateForm.assignedStaff && statusUpdateForm.assignedStaff !== selectedIntentForDetail.assignedStaff) {
      assignStaff(selectedIntentForDetail.id, statusUpdateForm.assignedStaff.trim());
    }

    showToast(`已成功更新企业【${selectedIntentForDetail.companyName}】的对接进展与处置记录！`);
    setSelectedIntentForDetail(null);
  };

  // Generate AI Plan
  const handleGenerateAiPlan = (intent: CooperationIntentRecord) => {
    setAiPlanModalIntent(intent);
    setIsGeneratingAiPlan(true);
    setAiPlanResult(null);

    setTimeout(() => {
      setIsGeneratingAiPlan(false);
      setAiPlanResult(`### 📋 吉林大学科技成果转化对接推进方案（AI 智能赋能）

**对接企业**：${intent.companyName}  
**意向成果**：${intent.targetTitle}（${intent.targetType === 'patent' ? '专利号：' + (intent.targetNo || 'CN2023***') : '非专利专有技术'}）  
**拟合作模式**：${intent.mode}  

---

#### 一、 企业诉求与成果技术契合度诊断
1. **技术痛点契合**：企业提出的应用场景与吉林大学${intent.inventorOrContact}的核心技术机理高度吻合。该成果具备较强的工程放大可行性。
2. **合作模式建议**：企业拟采用【${intent.mode}】方式推进，建议高校采取“**先签署标准 NDA 保密协议 ➔ 开展小试参数验证 ➔ 阶段性按节点支付转化许可费/作价入股**”的闭环推进机制。

---

#### 二、 校企对接实施路线建议
- **第 1 阶段（1-3天）**：科技开发中心完成法律审查，协助双方签署《技术秘密与商业信息保密协议（NDA）》。
- **第 2 阶段（第 1 周）**：由${intent.inventorOrContact}团队与企业对接人（${intent.contactPerson}，${intent.phone}）举行线上/线下首次技术交流会，梳理中试工艺边界条件。
- **第 3 阶段（1-2个月）**：在吉大概念验证中心或企业中试车间开展小批量试制，出具权威检测报告。
- **第 4 阶段**：通过吉林省科技成果转化综合服务平台完成正式技术合同认定登记与经费到账。

---

#### 三、 法律风险与知识产权保障提示
- 该成果权属清晰，属于吉林大学职务科技成果，转化收益按照《吉林大学科技成果转化管理办法》严格分配给科研团队（团队享70%-85%收益）。
- 若涉及非专利工艺配方，须严格约定企业使用范围与竞业限制条款。`);
    }, 1000);
  };

  // Domains list
  const domainList = useMemo(() => {
    const set = new Set<string>();
    intents.forEach(i => {
      if (i.domain) set.add(i.domain);
    });
    return ['all', ...Array.from(set)];
  }, [intents]);

  // Filtered List
  const filteredIntents = useMemo(() => {
    return intents.filter(item => {
      // Type Filter
      if (activeTypeTab !== 'all' && item.targetType !== activeTypeTab) return false;

      // Status Filter
      if (selectedStatus !== 'all' && item.status !== selectedStatus) return false;

      // Domain Filter
      if (selectedDomain !== 'all' && item.domain !== selectedDomain) return false;

      // Keyword Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const mCompany = item.companyName.toLowerCase().includes(q);
        const mPerson = item.contactPerson.toLowerCase().includes(q);
        const mPhone = item.phone.toLowerCase().includes(q);
        const mTitle = item.targetTitle.toLowerCase().includes(q);
        const mNo = item.targetNo ? item.targetNo.toLowerCase().includes(q) : false;
        const mMode = item.mode.toLowerCase().includes(q);
        const mDesc = item.demandDesc.toLowerCase().includes(q);
        const mContact = item.inventorOrContact.toLowerCase().includes(q);

        return mCompany || mPerson || mPhone || mTitle || mNo || mMode || mDesc || mContact;
      }

      return true;
    });
  }, [intents, activeTypeTab, selectedStatus, selectedDomain, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    const total = intents.length;
    const pending = intents.filter(i => i.status === 'pending').length;
    const negotiating = intents.filter(i => i.status === 'negotiating').length;
    const meeting = intents.filter(i => i.status === 'meeting_arranged').length;
    const signed = intents.filter(i => i.status === 'contract_signed').length;
    const patentCount = intents.filter(i => i.targetType === 'patent').length;
    const unpatentedCount = intents.filter(i => i.targetType === 'unpatented').length;

    return { total, pending, negotiating, meeting, signed, patentCount, unpatentedCount };
  }, [intents]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredIntents.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedIntents = useMemo(() => {
    const start = (safeCurrentPage - 1) * itemsPerPage;
    return filteredIntents.slice(start, start + itemsPerPage);
  }, [filteredIntents, safeCurrentPage, itemsPerPage]);

  // Copy helper
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`已复制${label}：${text}`);
  };

  // Export helper
  const handleExportCSV = () => {
    const headers = ['意向编号', '成果类型', '成果名称', '成果编号', '学科领域', '意向企业', '对接联系人', '联系电话', '合作模式', '对接诉求', '当前状态', '跟进专员', '提交时间'];
    const rows = filteredIntents.map(i => [
      i.id,
      i.targetType === 'patent' ? '专利成果' : '非专利专有技术',
      `"${i.targetTitle.replace(/"/g, '""')}"`,
      i.targetNo || '-',
      i.domain,
      `"${i.companyName.replace(/"/g, '""')}"`,
      i.contactPerson,
      i.phone,
      i.mode,
      `"${i.demandDesc.replace(/"/g, '""')}"`,
      i.status === 'pending' ? '待高校响应' : i.status === 'negotiating' ? '商务洽谈中' : i.status === 'meeting_arranged' ? '已安排对接会' : i.status === 'contract_signed' ? '已达成转化签约' : '已归档',
      i.assignedStaff || '待分配',
      i.createdAt
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `吉林大学科技成果转化对接意向表_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('已导出对接意向清单 (CSV表格)');
  };

  // Status Badge Helper
  const renderStatusBadge = (status: IntentStatus, isCompact = false) => {
    switch (status) {
      case 'pending':
        return (
          <span className={`inline-flex items-center gap-1.5 font-bold rounded-md whitespace-nowrap ${
            isCompact ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
          } bg-rose-50 text-rose-700 border border-rose-200`}>
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
            待高校响应
          </span>
        );
      case 'negotiating':
        return (
          <span className={`inline-flex items-center gap-1.5 font-bold rounded-md whitespace-nowrap ${
            isCompact ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
          } bg-amber-50 text-amber-700 border border-amber-200`}>
            <Clock className="w-3 h-3 text-amber-500 shrink-0" />
            商务洽谈中
          </span>
        );
      case 'meeting_arranged':
        return (
          <span className={`inline-flex items-center gap-1.5 font-bold rounded-md whitespace-nowrap ${
            isCompact ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
          } bg-blue-50 text-[#0F52BA] border border-blue-200`}>
            <Calendar className="w-3 h-3 text-[#0F52BA] shrink-0" />
            已安排对接会
          </span>
        );
      case 'contract_signed':
        return (
          <span className={`inline-flex items-center gap-1.5 font-bold rounded-md whitespace-nowrap ${
            isCompact ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
          } bg-emerald-50 text-emerald-700 border border-emerald-200`}>
            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
            已达成转化签约
          </span>
        );
      case 'closed':
        return (
          <span className={`inline-flex items-center gap-1.5 font-bold rounded-md whitespace-nowrap ${
            isCompact ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
          } bg-slate-100 text-slate-600 border border-slate-200`}>
            已归档
          </span>
        );
    }
  };

  const isUniversity = userRole === 'university';

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2.5 text-sm font-medium animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner Header */}
      <div className="bg-linear-to-r from-[#0C3547] via-[#104C64] to-[#0A2D3C] text-white rounded-3xl p-6 sm:p-7 shadow-lg border border-teal-400/30 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-teal-400/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/15 text-teal-100 border border-white/20 text-xs font-bold backdrop-blur-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              {isUniversity ? '吉林大学科技开发中心 · 成果转化对接管理工作台' : '高校科技成果转化服务平台 · 企业对接与进度跟踪'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <Building2 className="w-7 h-7 text-teal-300" />
              {isUniversity ? '企业成果转化对接意向库' : '我的成果转化与技术对接记录'}
            </h2>
            <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed">
              {isUniversity 
                ? '集中受理并推进企业针对吉大专利与非专利专有技术提交的合作诉求，提供结构化卡片与清晰列表视图，支持一键处置流转与AI对接方案生成。'
                : '实时跟踪您向吉林大学提交的专利转化、成果许可、联合研发等合作对接进展，查看高校专员跟进意见与闭门技术研讨安排。'
              }
            </p>
          </div>

          {/* Quick Stat Highlights */}
          <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15 shrink-0 self-start md:self-auto">
            <div className="text-center px-3 border-r border-white/10">
              <div className="text-xl sm:text-2xl font-black text-teal-200 font-mono">{stats.total}</div>
              <div className="text-[11px] text-teal-200/80 mt-0.5">累计意向</div>
            </div>
            <div className="text-center px-3 border-r border-white/10">
              <div className="text-xl sm:text-2xl font-black text-rose-300 font-mono flex items-center justify-center gap-1">
                {stats.pending > 0 && <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>}
                {stats.pending}
              </div>
              <div className="text-[11px] text-rose-200 font-bold mt-0.5">待高校响应</div>
            </div>
            <div className="text-center px-3">
              <div className="text-xl sm:text-2xl font-black text-emerald-300 font-mono">{stats.signed}</div>
              <div className="text-[11px] text-emerald-200 mt-0.5">已签约转化</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive KPI Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3">
        <button
          onClick={() => { setSelectedStatus('all'); setCurrentPage(1); }}
          className={`p-3.5 rounded-2xl border transition-all text-left cursor-pointer ${
            selectedStatus === 'all'
              ? 'bg-blue-50/90 border-[#0F52BA] shadow-xs ring-1 ring-[#0F52BA]/30'
              : 'bg-white border-slate-200 hover:border-blue-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600">全量意向池</span>
            <Layers className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-xl font-black text-slate-900 mt-1 font-mono">{stats.total}</div>
          <div className="text-[11px] text-slate-400 mt-0.5 truncate">专利 {stats.patentCount} · 非专利 {stats.unpatentedCount}</div>
        </button>

        <button
          onClick={() => { setSelectedStatus('pending'); setCurrentPage(1); }}
          className={`p-3.5 rounded-2xl border transition-all text-left cursor-pointer ${
            selectedStatus === 'pending'
              ? 'bg-rose-50/90 border-rose-400 shadow-xs ring-2 ring-rose-200'
              : 'bg-white border-slate-200 hover:border-rose-300 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-700 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
              待高校响应
            </span>
            <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
          </div>
          <div className="text-xl font-black text-rose-700 mt-1 font-mono">{stats.pending}</div>
          <div className="text-[11px] text-rose-600/80 mt-0.5 font-medium truncate">新提交待分配</div>
        </button>

        <button
          onClick={() => { setSelectedStatus('negotiating'); setCurrentPage(1); }}
          className={`p-3.5 rounded-2xl border transition-all text-left cursor-pointer ${
            selectedStatus === 'negotiating'
              ? 'bg-amber-50/90 border-amber-400 shadow-xs ring-2 ring-amber-200'
              : 'bg-white border-slate-200 hover:border-amber-300 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-700">商务洽谈中</span>
            <Clock className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="text-xl font-black text-amber-700 mt-1 font-mono">{stats.negotiating}</div>
          <div className="text-[11px] text-amber-600/80 mt-0.5 font-medium truncate">条款与技术磋商</div>
        </button>

        <button
          onClick={() => { setSelectedStatus('meeting_arranged'); setCurrentPage(1); }}
          className={`p-3.5 rounded-2xl border transition-all text-left cursor-pointer ${
            selectedStatus === 'meeting_arranged'
              ? 'bg-blue-50/90 border-blue-400 shadow-xs ring-2 ring-blue-200'
              : 'bg-white border-slate-200 hover:border-blue-300 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#0F52BA]">已安排对接会</span>
            <Calendar className="w-3.5 h-3.5 text-[#0F52BA]" />
          </div>
          <div className="text-xl font-black text-[#0F52BA] mt-1 font-mono">{stats.meeting}</div>
          <div className="text-[11px] text-blue-600/80 mt-0.5 font-medium truncate">校企研讨交流</div>
        </button>

        <button
          onClick={() => { setSelectedStatus('contract_signed'); setCurrentPage(1); }}
          className={`p-3.5 rounded-2xl border transition-all text-left cursor-pointer ${
            selectedStatus === 'contract_signed'
              ? 'bg-emerald-50/90 border-emerald-400 shadow-xs ring-2 ring-emerald-200'
              : 'bg-white border-slate-200 hover:border-emerald-300 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700">已达成转化签约</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-xl font-black text-emerald-700 mt-1 font-mono">{stats.signed}</div>
          <div className="text-[11px] text-emerald-600/80 mt-0.5 font-medium truncate">合同认定签约</div>
        </button>
      </div>

      {/* 3. Filter, Search & View Mode Switcher Controls */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
        {/* Top Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          {/* Type Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 mr-1">成果类型：</span>
            <div className="flex items-center bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => { setActiveTypeTab('all'); setCurrentPage(1); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTypeTab === 'all'
                    ? 'bg-white text-[#0F52BA] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                全部 ({stats.total})
              </button>
              <button
                onClick={() => { setActiveTypeTab('patent'); setCurrentPage(1); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTypeTab === 'patent'
                    ? 'bg-white text-[#0F52BA] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                专利成果 ({stats.patentCount})
              </button>
              <button
                onClick={() => { setActiveTypeTab('unpatented'); setCurrentPage(1); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTypeTab === 'unpatented'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Award className="w-3.5 h-3.5 text-emerald-600" />
                非专利专有技术 ({stats.unpatentedCount})
              </button>
            </div>
          </div>

          {/* Right Tools: View Mode Toggle & Export */}
          <div className="flex items-center gap-2.5 self-end lg:self-auto">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-white text-[#0F52BA] shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="切换至清晰表格明细视图"
              >
                <LayoutList className="w-3.5 h-3.5" />
                <span>表格列表</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#0F52BA] shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="切换至卡片视图"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>卡片视图</span>
              </button>
            </div>

            {/* Export CSV */}
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              title="导出当前筛选结果为Excel/CSV"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>导出列表</span>
            </button>
          </div>
        </div>

        {/* Search & Domain Filter Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-0.5">
          {/* Search Box */}
          <div className="relative md:col-span-2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="快速搜索企业名称、对接人、电话、诉求说明、成果名称或专利号..."
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full pl-9 pr-8 py-2 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-[#0F52BA] rounded-xl text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-[#0F52BA] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(''); setCurrentPage(1); }}
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Domain Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 shrink-0">所属领域:</span>
            <select
              value={selectedDomain}
              onChange={e => { setSelectedDomain(e.target.value); setCurrentPage(1); }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-[#0F52BA] cursor-pointer"
            >
              <option value="all">全部领域方向</option>
              {domainList.filter(d => d !== 'all').map(domain => (
                <option key={domain} value={domain}>{domain}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 4. Main Records Display: Table View OR Compact Grid */}
      {paginatedIntents.length > 0 ? (
        viewMode === 'table' ? (
          /* ========================================================
             4A. STRUCTURED TABLE VIEW (Clear, scannable, no text blobs)
             ======================================================== */
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold">
                    <th className="py-3 px-4 min-w-[190px]">
                      {isUniversity ? '意向企业 / 申请人' : '对接企业信息'}
                    </th>
                    <th className="py-3 px-4 min-w-[240px]">申请对接成果</th>
                    <th className="py-3 px-4 min-w-[110px]">合作模式</th>
                    <th className="py-3 px-4 min-w-[220px]">核心诉求摘要</th>
                    <th className="py-3 px-4 min-w-[150px]">对接状态 / 跟进人</th>
                    <th className="py-3 px-4 text-right min-w-[160px]">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedIntents.map(intent => (
                    <tr 
                      key={intent.id}
                      className={`hover:bg-blue-50/30 transition-colors ${
                        intent.status === 'pending' ? 'bg-rose-50/20' : ''
                      }`}
                    >
                      {/* Column 1: Company & Contact */}
                      <td className="py-3.5 px-4 align-top">
                        <div className="space-y-1">
                          <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                            <Building className="w-3.5 h-3.5 text-[#0F52BA] shrink-0" />
                            <span className="line-clamp-1" title={intent.companyName}>{intent.companyName}</span>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-2 text-[11px] text-slate-500">
                            <span className="text-slate-700 font-medium">{intent.contactPerson}</span>
                            <span>·</span>
                            <span className="font-mono text-slate-600">{intent.phone}</span>
                            <button 
                              onClick={() => copyToClipboard(intent.phone, '电话')}
                              className="text-blue-600 hover:text-blue-800 p-0.5 cursor-pointer inline-flex"
                              title="复制电话"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            提交于 {intent.createdAt}
                          </div>
                        </div>
                      </td>

                      {/* Column 2: Target Tech */}
                      <td className="py-3.5 px-4 align-top">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            {intent.targetType === 'patent' ? (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60 shrink-0">
                                专利
                              </span>
                            ) : (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60 shrink-0">
                                专有技术
                              </span>
                            )}
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600 shrink-0">
                              {intent.domain}
                            </span>
                          </div>

                          <div 
                            onClick={() => handleOpenDetail(intent)}
                            className="font-bold text-slate-800 hover:text-blue-600 cursor-pointer line-clamp-1 text-xs leading-snug transition-colors"
                            title={intent.targetTitle}
                          >
                            {intent.targetTitle}
                          </div>

                          <div className="flex items-center gap-2 text-[11px] text-slate-500">
                            {intent.targetNo && (
                              <span className="font-mono text-blue-700 font-semibold">{intent.targetNo}</span>
                            )}
                            <span>|</span>
                            <span className="truncate max-w-[140px]" title={intent.inventorOrContact}>
                              {intent.inventorOrContact}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Column 3: Mode */}
                      <td className="py-3.5 px-4 align-top">
                        <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-800 rounded-md font-semibold text-[11px] border border-slate-200 whitespace-nowrap">
                          {intent.mode}
                        </span>
                      </td>

                      {/* Column 4: Demand Summary (Single line, expandable in modal) */}
                      <td className="py-3.5 px-4 align-top">
                        <div className="max-w-xs space-y-1">
                          <p 
                            className="text-slate-700 line-clamp-2 leading-relaxed text-[11px] font-medium cursor-pointer hover:text-blue-700 transition-colors"
                            onClick={() => handleOpenDetail(intent)}
                            title="点击查看完整需求与应用场景"
                          >
                            {intent.demandDesc}
                          </p>
                          {intent.expectedDate && (
                            <div className="text-[10px] text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              <span>期望：{intent.expectedDate}</span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Column 5: Status & Follow-up Staff */}
                      <td className="py-3.5 px-4 align-top">
                        <div className="space-y-1.5">
                          <div>{renderStatusBadge(intent.status, true)}</div>
                          <div className="text-[11px] text-slate-500 truncate max-w-[140px]" title={intent.assignedStaff || '待分配专员'}>
                            <span className="text-slate-400">跟进：</span>
                            <strong className="text-slate-700 font-medium">
                              {intent.assignedStaff ? intent.assignedStaff.replace(/吉林大学科技开发中心\s*/, '') : '待分配'}
                            </strong>
                          </div>
                        </div>
                      </td>

                      {/* Column 6: Actions */}
                      <td className="py-3.5 px-4 align-top text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleGenerateAiPlan(intent)}
                            className="p-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition-colors cursor-pointer"
                            title="AI生成校企对接推进方案"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleOpenDetail(intent)}
                            className="px-3 py-1.5 bg-[#0F52BA] hover:bg-[#082C6C] text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1"
                          >
                            <span>{isUniversity ? '处置流转' : '查看详情'}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* ========================================================
             4B. COMPACT CARD VIEW (Streamlined without heavy paragraphs)
             ======================================================== */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {paginatedIntents.map(intent => (
              <div
                key={intent.id}
                className={`bg-white rounded-2xl p-4 border shadow-xs hover:shadow-md transition-all flex flex-col justify-between ${
                  intent.status === 'pending'
                    ? 'border-rose-300 bg-linear-to-b from-rose-50/20 to-white ring-1 ring-rose-100'
                    : 'border-slate-200 hover:border-blue-200'
                }`}
              >
                <div className="space-y-3">
                  {/* Card Header: Enterprise & Status */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">
                          {intent.domain}
                        </span>
                        {intent.targetType === 'patent' ? (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                            专利
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                            专有技术
                          </span>
                        )}
                      </div>
                      <h4 className="font-black text-slate-900 text-sm truncate flex items-center gap-1.5 pt-0.5" title={intent.companyName}>
                        <Building className="w-3.5 h-3.5 text-[#0F52BA] shrink-0" />
                        <span className="truncate">{intent.companyName}</span>
                      </h4>
                    </div>

                    <div className="shrink-0">{renderStatusBadge(intent.status, true)}</div>
                  </div>

                  {/* Target Tech Info Box */}
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs space-y-1">
                    <div className="font-bold text-slate-800 line-clamp-1 leading-snug" title={intent.targetTitle}>
                      {intent.targetTitle}
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                      <span className="font-mono text-blue-700 font-semibold">{intent.targetNo || '专有技术'}</span>
                      <span className="truncate max-w-[130px]">{intent.inventorOrContact}</span>
                    </div>
                  </div>

                  {/* Contact & Mode Metadata Pills */}
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="bg-blue-50/50 p-2 rounded-lg border border-blue-100 text-slate-700">
                      <div className="text-[10px] text-slate-400 font-medium">对接联系人</div>
                      <div className="font-bold text-slate-900 truncate">{intent.contactPerson} ({intent.phone.slice(-4)})</div>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 text-slate-700">
                      <div className="text-[10px] text-slate-400 font-medium">拟合作模式</div>
                      <div className="font-bold text-slate-900 truncate">{intent.mode}</div>
                    </div>
                  </div>

                  {/* Excerpt of Demand */}
                  <div className="bg-slate-50/60 p-2 rounded-lg border border-slate-100 text-[11px] text-slate-600">
                    <p className="line-clamp-2 leading-relaxed text-slate-700">
                      {intent.demandDesc}
                    </p>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[10px] text-slate-400 font-mono">
                    {intent.createdAt}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleGenerateAiPlan(intent)}
                      className="p-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs transition-colors cursor-pointer"
                      title="AI对接方案"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleOpenDetail(intent)}
                      className="px-3 py-1 bg-[#0F52BA] hover:bg-[#082C6C] text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1"
                    >
                      <span>{isUniversity ? '处置流转' : '查看详情'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
            <Inbox className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-slate-900 mb-1">未找到符合条件的企业对接意向</h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
            当前筛选状态或搜索关键词下暂无记录，您可以重置筛选条件或等待企业端提交最新对接申请。
          </p>
          <button
            onClick={() => {
              setActiveTypeTab('all');
              setSelectedStatus('all');
              setSelectedDomain('all');
              setSearchQuery('');
              setCurrentPage(1);
            }}
            className="px-4 py-2 bg-[#0F52BA] text-white text-xs font-bold rounded-xl hover:bg-[#082C6C] transition-colors cursor-pointer"
          >
            重置所有筛选条件
          </button>
        </div>
      )}

      {/* 5. Pagination */}
      {totalPages > 1 && (
        <div className="bg-white border border-slate-200 rounded-2xl px-5 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">
            显示第 <strong className="text-slate-900 font-bold">{(safeCurrentPage - 1) * itemsPerPage + 1}</strong> 至{' '}
            <strong className="text-slate-900 font-bold">{Math.min(safeCurrentPage * itemsPerPage, filteredIntents.length)}</strong> 项，
            共 <strong className="text-[#0F52BA] font-bold">{filteredIntents.length}</strong> 项意向记录
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={safeCurrentPage === 1}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                safeCurrentPage === 1
                  ? 'bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              上一页
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  safeCurrentPage === page
                    ? 'bg-[#0F52BA] text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={safeCurrentPage === totalPages}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                safeCurrentPage === totalPages
                  ? 'bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              下一页
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 6. Detailed Dossier & Processing Modal (清晰排版的详情档案弹窗) */}
      {selectedIntentForDetail && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto space-y-5">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3.5 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                    编号：{selectedIntentForDetail.id}
                  </span>
                  {renderStatusBadge(selectedIntentForDetail.status)}
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  {isUniversity ? '企业转化对接意向档案与跟进处置' : '技术转化对接进度与反馈详情'}
                </h3>
              </div>
              <button
                onClick={() => setSelectedIntentForDetail(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Target & Enterprise Dossier Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* Enterprise Info */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 text-sm pb-1.5 border-b border-slate-200/80">
                  <Building className="w-4 h-4 text-[#0F52BA]" />
                  意向企业档案
                </div>
                <div><span className="text-slate-500">企业全称：</span><strong className="text-slate-800">{selectedIntentForDetail.companyName}</strong></div>
                <div><span className="text-slate-500">对接联系人：</span><strong className="text-slate-800">{selectedIntentForDetail.contactPerson}</strong></div>
                <div className="flex items-center gap-1">
                  <span className="text-slate-500">联系电话：</span>
                  <strong className="text-slate-800 font-mono">{selectedIntentForDetail.phone}</strong>
                  <button 
                    onClick={() => copyToClipboard(selectedIntentForDetail.phone, '电话')}
                    className="text-blue-600 hover:text-blue-800 p-0.5 cursor-pointer ml-1"
                    title="复制电话"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
                {selectedIntentForDetail.email && <div><span className="text-slate-500">电子邮箱：</span><strong className="text-slate-800">{selectedIntentForDetail.email}</strong></div>}
                <div><span className="text-slate-500">期望对接时间：</span><strong className="text-slate-800">{selectedIntentForDetail.expectedDate || '根据排期安排'}</strong></div>
              </div>

              {/* Tech Info */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 text-sm pb-1.5 border-b border-slate-200/80">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  申请对接科研成果
                </div>
                <div><span className="text-slate-500">成果类别：</span><strong className="text-slate-800">{selectedIntentForDetail.targetType === 'patent' ? '专利成果' : '非专利专有技术'}</strong></div>
                <div><span className="text-slate-500">成果名称：</span><strong className="text-slate-800">{selectedIntentForDetail.targetTitle}</strong></div>
                {selectedIntentForDetail.targetNo && <div><span className="text-slate-500">专利编号：</span><strong className="text-[#0F52BA] font-mono">{selectedIntentForDetail.targetNo}</strong></div>}
                <div><span className="text-slate-500">研发团队：</span><strong className="text-slate-800">{selectedIntentForDetail.inventorOrContact}</strong></div>
                <div><span className="text-slate-500">拟合作模式：</span><strong className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">{selectedIntentForDetail.mode}</strong></div>
              </div>
            </div>

            {/* Enterprise Demand Content */}
            <div className="bg-blue-50/40 p-4 rounded-2xl border border-blue-200 text-xs space-y-1.5">
              <div className="font-bold text-blue-900 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-blue-700" />
                企业对接诉求与落地应用场景
              </div>
              <p className="text-slate-800 leading-relaxed font-medium whitespace-pre-wrap">{selectedIntentForDetail.demandDesc}</p>
            </div>

            {/* Historical Status Logs */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#0F52BA]" />
                对接流转时间线与跟进记录
              </div>
              <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                {selectedIntentForDetail.statusLogs?.map((log, index) => (
                  <div key={index} className="flex items-start gap-2.5 text-xs bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <span className="font-mono text-slate-400 text-[11px] shrink-0 mt-0.5">{log.time}</span>
                    <span className="font-bold text-slate-700 shrink-0">{log.operator}</span>
                    <span className="text-slate-900 font-medium">{log.action}</span>
                    {log.note && <span className="text-slate-500 italic">（{log.note}）</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Form to Update Status & Add Notes (Available for University Staff & Enterprise) */}
            <form onSubmit={handleSaveStatusUpdate} className="space-y-3.5 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#0F52BA]" />
                {isUniversity ? '高校技转专员流转处置与答复' : '跟进备注与状态更新'}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">更新合作对接状态</label>
                  <select
                    value={statusUpdateForm.status}
                    onChange={e => setStatusUpdateForm({ ...statusUpdateForm, status: e.target.value as IntentStatus })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-900 focus:outline-hidden focus:border-[#0F52BA] cursor-pointer"
                  >
                    <option value="pending">🔴 待高校响应 (新提交)</option>
                    <option value="negotiating">🟡 商务洽谈中 (正在沟通)</option>
                    <option value="meeting_arranged">🔵 已安排技术对接会 (校企闭门研讨)</option>
                    <option value="contract_signed">🟢 已达成转化签约 (完成用印备案)</option>
                    <option value="closed">⚪ 已归档 (阶段终止)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">负责跟进专员</label>
                  <input
                    type="text"
                    value={statusUpdateForm.assignedStaff}
                    onChange={e => setStatusUpdateForm({ ...statusUpdateForm, assignedStaff: e.target.value })}
                    placeholder="如：吉林大学科技开发中心 李老师"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:outline-hidden focus:border-[#0F52BA]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700">跟进纪要 / 答复意见（将记录至流转时间线）</label>
                <textarea
                  rows={2}
                  value={statusUpdateForm.replyNote}
                  onChange={e => setStatusUpdateForm({ ...statusUpdateForm, replyNote: e.target.value })}
                  placeholder="例如：已转交科研团队技术评估，定于下周举行线上技术对接会..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:outline-hidden focus:border-[#0F52BA] resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setSelectedIntentForDetail(null)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0F52BA] hover:bg-[#082C6C] text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  保存流转记录与处置状态
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. AI Action Plan Modal */}
      {aiPlanModalIntent && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">AI 智能赋能 · 校企成果转化推进方案</h3>
                  <p className="text-xs text-slate-500">基于企业诉求与吉大科研成果生成的专属落地建议书</p>
                </div>
              </div>
              <button
                onClick={() => setAiPlanModalIntent(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isGeneratingAiPlan ? (
              <div className="py-12 text-center space-y-3">
                <RefreshCw className="w-8 h-8 text-[#0F52BA] animate-spin mx-auto" />
                <p className="text-sm font-bold text-slate-700">正在分析企业诉求与吉大科研成果匹配度...</p>
                <p className="text-xs text-slate-400">正在调取吉林大学技术转移管理规范与中试验证路线模型</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-700 leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto font-mono">
                  {aiPlanResult}
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => {
                      if (aiPlanResult) copyToClipboard(aiPlanResult, 'AI对接推进方案');
                    }}
                    className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    一键复制方案文本
                  </button>
                  <button
                    onClick={() => setAiPlanModalIntent(null)}
                    className="px-5 py-2 bg-[#0F52BA] text-white rounded-xl text-xs font-bold hover:bg-[#082C6C] transition-colors cursor-pointer"
                  >
                    关闭
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
