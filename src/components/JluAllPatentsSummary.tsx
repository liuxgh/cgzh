import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Sparkles, 
  Download, 
  PlusCircle, 
  Award, 
  CheckCircle2, 
  Clock, 
  ArrowUpDown, 
  LayoutGrid, 
  Table as TableIcon, 
  RefreshCw,
  FileSpreadsheet,
  Building2,
  ChevronRight
} from 'lucide-react';
import { PatentItem } from '../types';

interface JluAllPatentsSummaryProps {
  patents: PatentItem[];
  onSelectPatent: (patent: PatentItem) => void;
  onLaunchAiMatch: (patent: PatentItem) => void;
  onInitiateTransfer: (patent: PatentItem) => void;
  onOpenNewPatent?: () => void;
  initialSearchQuery?: string;
}

export function JluAllPatentsSummary({
  patents,
  onSelectPatent,
  onLaunchAiMatch,
  onInitiateTransfer,
  onOpenNewPatent,
  initialSearchQuery = ''
}: JluAllPatentsSummaryProps) {
  // View mode: 'table' or 'cards'
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCollege, setSelectedCollege] = useState('all');
  const [selectedField, setSelectedField] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedBaitengScoreRange, setSelectedBaitengScoreRange] = useState('all');
  const [selectedTrlLevel, setSelectedTrlLevel] = useState('all');
  const [sortBy, setSortBy] = useState<'score_desc' | 'score_asc' | 'date_desc' | 'trl_desc' | 'view_desc'>('score_desc');
  const [showExportToast, setShowExportToast] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter patents
  const filteredPatents = useMemo(() => {
    return patents.filter((p) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchNo = p.patentNo.toLowerCase().includes(q);
        const matchInventor = p.inventor.toLowerCase().includes(q);
        const matchCollege = p.college.toLowerCase().includes(q);
        const matchIpc = p.ipc.toLowerCase().includes(q);
        const matchInnov = p.innovations.some(i => i.toLowerCase().includes(q));
        if (!matchTitle && !matchNo && !matchInventor && !matchCollege && !matchIpc && !matchInnov) {
          return false;
        }
      }

      // College filter
      if (selectedCollege !== 'all' && !p.college.includes(selectedCollege)) {
        return false;
      }

      // Field filter
      if (selectedField !== 'all' && p.field !== selectedField) {
        return false;
      }

      // Status filter
      if (selectedStatus !== 'all' && p.status !== selectedStatus) {
        return false;
      }

      // Score range filter
      if (selectedBaitengScoreRange !== 'all') {
        const score = p.baitengScore.overall;
        if (selectedBaitengScoreRange === '90plus' && score < 90) return false;
        if (selectedBaitengScoreRange === '80_89' && (score < 80 || score >= 90)) return false;
        if (selectedBaitengScoreRange === '70_79' && (score < 70 || score >= 80)) return false;
        if (selectedBaitengScoreRange === 'below70' && score >= 70) return false;
      }

      // TRL level filter
      if (selectedTrlLevel !== 'all') {
        if (selectedTrlLevel === '7_9' && p.trlLevel < 7) return false;
        if (selectedTrlLevel === '4_6' && (p.trlLevel < 4 || p.trlLevel > 6)) return false;
        if (selectedTrlLevel === '1_3' && p.trlLevel > 3) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'score_desc') return b.baitengScore.overall - a.baitengScore.overall;
      if (sortBy === 'score_asc') return a.baitengScore.overall - b.baitengScore.overall;
      if (sortBy === 'date_desc') return new Date(b.grantDate).getTime() - new Date(a.grantDate).getTime();
      if (sortBy === 'trl_desc') return b.trlLevel - a.trlLevel;
      if (sortBy === 'view_desc') return b.viewCount - a.viewCount;
      return 0;
    });
  }, [
    patents,
    searchQuery,
    selectedCollege,
    selectedField,
    selectedStatus,
    selectedBaitengScoreRange,
    selectedTrlLevel,
    sortBy
  ]);

  // Paginated items
  const totalPages = Math.ceil(filteredPatents.length / itemsPerPage) || 1;
  const paginatedPatents = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPatents.slice(start, start + itemsPerPage);
  }, [filteredPatents, currentPage, itemsPerPage]);

  const handleExportData = () => {
    setShowExportToast(true);
    setTimeout(() => {
      setShowExportToast(false);
    }, 3500);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCollege('all');
    setSelectedField('all');
    setSelectedStatus('all');
    setSelectedBaitengScoreRange('all');
    setSelectedTrlLevel('all');
    setSortBy('score_desc');
    setCurrentPage(1);
  };

  const getStatusBadge = (status: PatentItem['status']) => {
    switch (status) {
      case 'valid':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            有效维持 (可转让/许可)
          </span>
        );
      case 'open_licensed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
            <Award className="w-3 h-3 text-[#0F52BA]" />
            开放许可挂牌
          </span>
        );
      case 'in_negotiation':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
            <Clock className="w-3 h-3 text-blue-600" />
            重点推进洽谈中
          </span>
        );
      case 'transferred':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-purple-50 text-purple-700 border border-purple-200">
            <CheckCircle2 className="w-3 h-3 text-purple-600" />
            已完成转化/备案
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* 1. 一段文字（汇总形式）- Summary Text Block */}
      <div className="bg-linear-to-r from-[#082C6C] via-[#0F52BA] to-[#0A3D8F] text-white p-6 sm:p-7 rounded-3xl shadow-xl border border-blue-400/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/15 text-blue-100 text-sm font-bold border border-white/20 flex items-center gap-1.5 backdrop-blur-xs">
                <Building2 className="w-3.5 h-3.5 text-blue-200" />
                <span>吉林大学专利全量资产库</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-sm font-semibold">
                佰腾网大数据联合赋能 • 全量四维价值与TRL定级
              </span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              吉林大学存量有效专利全量汇总与检索中心
            </h2>

            {/* 核心汇总文字 */}
            <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed pt-1">
              截至目前，吉林大学共建档存量有效专利 <strong>8,826</strong> 件（有效发明占比 <strong>88.4%</strong>），重点覆盖汽车工程与智能网联（2,160件）、化学与超分子新材料（2,012件）、光电子与精密仪器（1,456件）、生物医药与大健康（1,341件）及高端装备制造等优势学科。全量成果已 <strong>100%</strong> 完成佰腾知识产权大数据四维价值度（技术、法律、市场、竞争）评估与 TRL 成熟度分级，其中高价值转化专利（≥85分）达 2,140 件，产业就绪级（TRL≥6）达 1,680 件，开放许可挂牌 530 件，累计促成产学研转化金额逾 18.6 亿元。支持全校科研人员及意向企业直接按关键词、学院、领域及成熟度开展高精度列表查询与撮合对接。
            </p>
          </div>

          <div className="flex md:flex-col items-center justify-end gap-2.5 shrink-0">
            <button
              onClick={handleExportData}
              className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-blue-200" />
              <span>导出专利清单 (Excel)</span>
            </button>
            {onOpenNewPatent && (
              <button
                onClick={onOpenNewPatent}
                className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-bold rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white transition-all shadow-md cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5 text-white" />
                <span>成果披露与赋权登记</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Export Toast Notification */}
      {showExportToast && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl flex items-center justify-between text-sm transition-all shadow-sm">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>
              <strong>清单已准备就绪：</strong> 已将吉林大学全量 8,826 项专利（含著录项、发明人、学院、IPC号、佰腾四维评分、转化指导价）导出为 <strong>吉林大学全量科技成果专利数据库.xlsx</strong>。
            </span>
          </div>
          <span className="text-[10px] text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded font-semibold">下载完成</span>
        </div>
      )}

      {/* 2. 列表查询与展示容器 (Search & Table / Card Directory) */}
      <div className="bg-white rounded-3xl border border-[#D8E2F0] shadow-xs overflow-hidden">
        
        {/* 查询过滤工具栏 */}
        <div className="p-5 border-b border-slate-200 bg-[#F8FAFC] space-y-4">
          
          {/* 主搜索栏与排序模式 */}
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* 搜索框 */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="快速检索吉林大学专利名称、专利号 (如 CN2023...)、发明人团队、学院、IPC分类号、创新点关键词..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0F52BA] focus:border-transparent placeholder:text-slate-400 font-medium"
              />
            </div>

            {/* 排序与视图切换 */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              {/* 排序下拉 */}
              <div className="flex items-center gap-1.5 text-sm text-slate-600 shrink-0">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-[#0F52BA] cursor-pointer"
                >
                  <option value="score_desc">按佰腾价值评分 (高到低)</option>
                  <option value="score_asc">按佰腾价值评分 (低到高)</option>
                  <option value="date_desc">按最新授权日期</option>
                  <option value="trl_desc">按成熟度等级 (TRL 9→1)</option>
                  <option value="view_desc">按浏览热度</option>
                </select>
              </div>

              {/* 表格 / 卡片视图切换 */}
              <div className="flex items-center bg-slate-200/80 p-1 rounded-xl shrink-0">
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-2.5 py-1.5 rounded-lg text-sm flex items-center gap-1 transition-all cursor-pointer ${
                    viewMode === 'table' ? 'bg-white text-[#0F52BA] shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="表格视图"
                >
                  <TableIcon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">表格</span>
                </button>
                <button
                  onClick={() => setViewMode('cards')}
                  className={`px-2.5 py-1.5 rounded-lg text-sm flex items-center gap-1 transition-all cursor-pointer ${
                    viewMode === 'cards' ? 'bg-white text-[#0F52BA] shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="卡片视图"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">卡片</span>
                </button>
              </div>
            </div>
          </div>

          {/* 二级维度多条件快速筛选 */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1 text-sm">
            <span className="text-slate-500 font-bold flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              条件筛选:
            </span>

            {/* 学院筛选 */}
            <select
              value={selectedCollege}
              onChange={(e) => { setSelectedCollege(e.target.value); setCurrentPage(1); }}
              className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-sm text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-[#0F52BA] cursor-pointer"
            >
              <option value="all">全部学院 / 国重室</option>
              <option value="汽车">汽车工程学院 / 国重室</option>
              <option value="化学">化学学院 / 超分子国重室</option>
              <option value="电子">电子科学与工程学院</option>
              <option value="材料">材料科学与工程学院</option>
              <option value="计算机">计算机科学与技术学院</option>
              <option value="地球探测">地球探测科学与技术学院</option>
              <option value="机械">机械与航空航天工程学院</option>
              <option value="白求恩">白求恩第一临床医学院 / 药学院</option>
              <option value="农业">生物与农业工程学院</option>
              <option value="建设工程">建设工程学院</option>
              <option value="生命科学">生命科学学院</option>
            </select>

            {/* 领域筛选 */}
            <select
              value={selectedField}
              onChange={(e) => { setSelectedField(e.target.value); setCurrentPage(1); }}
              className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-sm text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-[#0F52BA] cursor-pointer"
            >
              <option value="all">全部产业技术领域</option>
              <option value="automotive">汽车与智能网联</option>
              <option value="materials">化学与超分子新材料</option>
              <option value="optoelectronics">电子信息与精密仪器</option>
              <option value="biomedicine">生物医药与健康</option>
              <option value="equipment">高端装备与机器人</option>
              <option value="geology">智能勘探与特种装备</option>
              <option value="agriculture">现代农业与黑土地</option>
              <option value="ai_computing">人工智能与算力</option>
            </select>

            {/* 状态筛选 */}
            <select
              value={selectedStatus}
              onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
              className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-sm text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-[#0F52BA] cursor-pointer"
            >
              <option value="all">全部专利状态</option>
              <option value="valid">有效维持 (待转化)</option>
              <option value="open_licensed">开放许可挂牌中</option>
              <option value="in_negotiation">重点推进洽谈中</option>
              <option value="transferred">已完成转化/备案</option>
            </select>

            {/* 成熟度 TRL */}
            <select
              value={selectedTrlLevel}
              onChange={(e) => { setSelectedTrlLevel(e.target.value); setCurrentPage(1); }}
              className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-sm text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-[#0F52BA] cursor-pointer"
            >
              <option value="all">全部成熟度 (TRL 1~9)</option>
              <option value="7_9">TRL 7~9 (产业级/实线验证)</option>
              <option value="4_6">TRL 4~6 (工程级/中试样机)</option>
              <option value="1_3">TRL 1~3 (实验室基础原理)</option>
            </select>

            {/* 佰腾评分 */}
            <select
              value={selectedBaitengScoreRange}
              onChange={(e) => { setSelectedBaitengScoreRange(e.target.value); setCurrentPage(1); }}
              className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-sm text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-[#0F52BA] cursor-pointer"
            >
              <option value="all">全部佰腾价值分</option>
              <option value="90plus">≥90分 (顶级战略高价值)</option>
              <option value="80_89">80~89分 (重点转化梯队)</option>
              <option value="70_79">70~79分 (良好商用储备)</option>
              <option value="below70">&lt;70分 (基础储备)</option>
            </select>

            {/* 重置 */}
            <button
              onClick={handleResetFilters}
              className="ml-auto text-sm text-slate-500 hover:text-[#0F52BA] font-medium flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>重置条件</span>
            </button>
          </div>
        </div>

        {/* 结果统计指示条 */}
        <div className="px-5 py-2.5 bg-slate-100/70 border-b border-slate-200 flex items-center justify-between text-sm text-slate-600">
          <div>
            共检索到吉林大学专利成果 <strong className="text-slate-900 font-mono font-bold">{filteredPatents.length}</strong> 项
            {(selectedCollege !== 'all' || selectedField !== 'all' || selectedStatus !== 'all' || selectedBaitengScoreRange !== 'all' || selectedTrlLevel !== 'all' || searchQuery) && (
              <span className="text-[#0F52BA] ml-1 font-semibold">(已应用筛选条件)</span>
            )}
          </div>
          <div className="text-[11px] text-slate-500">
            第 {currentPage} / {totalPages} 页 (每页 {itemsPerPage} 项)
          </div>
        </div>

        {/* 列表展示 - 表格模式 */}
        {viewMode === 'table' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
                  <th className="py-3.5 px-4">专利成果名称 / 专利号</th>
                  <th className="py-3.5 px-3">所属学院 / 发明人团队</th>
                  <th className="py-3.5 px-3">技术领域 / IPC号</th>
                  <th className="py-3.5 px-3 text-center">TRL成熟度</th>
                  <th className="py-3.5 px-3 text-center">佰腾四维评分</th>
                  <th className="py-3.5 px-3">指导估值 / 挂牌价</th>
                  <th className="py-3.5 px-3">当前状态</th>
                  <th className="py-3.5 px-4 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedPatents.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <FileText className="w-8 h-8 text-slate-300" />
                        <div className="text-base font-medium text-slate-600">未找到符合筛选条件的专利成果</div>
                        <button
                          onClick={handleResetFilters}
                          className="mt-2 text-sm text-[#0F52BA] underline cursor-pointer"
                        >
                          清除所有筛选条件重新检索
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedPatents.map((patent) => (
                    <tr 
                      key={patent.id}
                      className="hover:bg-blue-50/40 transition-colors group cursor-pointer"
                      onClick={() => onSelectPatent(patent)}
                    >
                      {/* Title & Patent No */}
                      <td className="py-3.5 px-4 max-w-xs sm:max-w-sm">
                        <div className="font-bold text-slate-900 group-hover:text-[#0F52BA] transition-colors leading-snug line-clamp-2">
                          {patent.title}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-mono text-[11px] text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded font-medium">
                            {patent.patentNo}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            授权: {patent.grantDate}
                          </span>
                        </div>
                      </td>

                      {/* College & Team */}
                      <td className="py-3.5 px-3 max-w-[180px]">
                        <div className="text-slate-800 font-semibold truncate" title={patent.college}>
                          {patent.college.split(' / ')[0]}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate" title={patent.inventor}>
                          {patent.inventor}
                        </div>
                      </td>

                      {/* Field & IPC */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="text-slate-800 font-semibold">{patent.fieldName}</div>
                        <div className="font-mono text-[10px] text-slate-400 truncate max-w-[120px]">
                          {patent.ipc}
                        </div>
                      </td>

                      {/* TRL Level */}
                      <td className="py-3.5 px-3 text-center whitespace-nowrap">
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700">
                          <span>TRL {patent.trlLevel}</span>
                          <span className="text-[10px] font-normal text-slate-400">
                            {patent.trlLevel >= 7 ? '产业级' : patent.trlLevel >= 4 ? '中试' : '基础'}
                          </span>
                        </div>
                      </td>

                      {/* Baiteng Score */}
                      <td className="py-3.5 px-3 text-center whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          <div className={`text-base font-black font-mono ${
                            patent.baitengScore.overall >= 90 ? 'text-[#0F52BA]' :
                            patent.baitengScore.overall >= 80 ? 'text-emerald-600' : 'text-slate-700'
                          }`}>
                            {patent.baitengScore.overall}分
                          </div>
                          <span className={`text-[9px] px-1 py-0.2 rounded font-bold ${
                            patent.baitengScore.overall >= 90 ? 'bg-blue-100 text-[#0F52BA]' :
                            patent.baitengScore.overall >= 80 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {patent.baitengScore.overall >= 90 ? '战略高价值' : patent.baitengScore.overall >= 80 ? '重点转化' : '良好'}
                          </span>
                        </div>
                      </td>

                      {/* Valuation */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="font-bold text-slate-900 font-mono">
                          {patent.openLicensePrice ? patent.openLicensePrice.split(' ')[0] : patent.valuationRange}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {patent.openLicensePrice ? '开放许可定价' : '估值区间'}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        {getStatusBadge(patent.status)}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onLaunchAiMatch(patent)}
                            className="px-2.5 py-1 rounded-lg text-sm font-bold bg-[#FFF7E6] text-[#D46B08] hover:bg-[#FFE7BA] border border-[#FFD591] transition-colors flex items-center gap-1 cursor-pointer"
                            title="AI精准匹配产业需求"
                          >
                            <Sparkles className="w-3 h-3 text-blue-600" />
                            <span>撮合</span>
                          </button>
                          <button
                            onClick={() => onSelectPatent(patent)}
                            className="px-2.5 py-1 rounded-lg text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                          >
                            详情
                          </button>
                          <button
                            onClick={() => onInitiateTransfer(patent)}
                            className="px-2.5 py-1 rounded-lg text-sm font-bold bg-[#0F52BA] text-white hover:bg-[#082C6C] transition-colors cursor-pointer shadow-xs"
                            title="立项进入转化推进工作台"
                          >
                            立项
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* 列表展示 - 卡片模式 */}
        {viewMode === 'cards' && (
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {paginatedPatents.map((patent) => (
              <div
                key={patent.id}
                onClick={() => onSelectPatent(patent)}
                className="bg-white rounded-2xl border border-[#D8E2F0] hover:border-[#0F52BA] hover:shadow-md transition-all p-5 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  {/* Top Meta */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded font-medium">
                      {patent.patentNo}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold font-mono text-[#0F52BA] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        佰腾: {patent.baitengScore.overall}分
                      </span>
                      {getStatusBadge(patent.status)}
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-[#0F52BA] transition-colors line-clamp-2 leading-snug">
                    {patent.title}
                  </h4>

                  {/* Faculty & Inventor */}
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
                    <span className="font-medium text-slate-700">{patent.college}</span>
                    <span>•</span>
                    <span>{patent.inventor}</span>
                  </div>

                  {/* Abstract */}
                  <p className="text-sm text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                    {patent.abstract}
                  </p>

                  {/* Innovations */}
                  <div className="mt-3 space-y-1 bg-[#F8FAFC] p-2.5 rounded-xl border border-slate-100">
                    <div className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                      <Award className="w-3 h-3 text-[#0F52BA]" />
                      核心创新点与技术指标:
                    </div>
                    {patent.innovations.slice(0, 2).map((innov, idx) => (
                      <div key={idx} className="text-[11px] text-slate-600 truncate flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#0F52BA] shrink-0"></span>
                        <span className="truncate">{innov}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[11px] text-slate-400">参考估值 / 转化价格</div>
                    <div className="text-sm font-bold text-slate-900 font-mono">
                      {patent.openLicensePrice || patent.valuationRange}
                    </div>
                  </div>

                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onLaunchAiMatch(patent)}
                      className="px-2.5 py-1.5 rounded-lg text-sm font-bold bg-[#FFF7E6] text-[#D46B08] hover:bg-[#FFE7BA] border border-[#FFD591] transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>AI撮合</span>
                    </button>
                    <button
                      onClick={() => onInitiateTransfer(patent)}
                      className="px-3 py-1.5 rounded-lg text-sm font-bold bg-[#0F52BA] text-white hover:bg-[#082C6C] transition-colors cursor-pointer shadow-xs"
                    >
                      立即立项
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 分页控制栏 */}
        <div className="px-5 py-3.5 bg-[#F8FAFC] border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <div className="text-slate-500">
            显示第 <strong className="text-slate-800 font-mono">{(currentPage - 1) * itemsPerPage + 1}</strong> 到 <strong className="text-slate-800 font-mono">{Math.min(currentPage * itemsPerPage, filteredPatents.length)}</strong> 项，共 <strong className="text-slate-800 font-mono">{filteredPatents.length}</strong> 项吉大专利
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors cursor-pointer font-medium"
            >
              上一页
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-7 h-7 rounded-lg text-sm font-mono font-bold transition-colors cursor-pointer ${
                    currentPage === pageNum
                      ? 'bg-[#0F52BA] text-white shadow-xs'
                      : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors cursor-pointer font-medium"
            >
              下一页
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
