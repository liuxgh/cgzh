import React, { useState, useMemo, useEffect } from 'react';
import { PatentItem } from '../types';
import { getJluPatentsByPage, TOTAL_JLU_VALID_PATENTS_COUNT } from '../data/jluPatentPool';
import { 
  FileText, 
  Search, 
  Sparkles, 
  Flame, 
  Check, 
  SlidersHorizontal, 
  X, 
  GraduationCap, 
  Eye, 
  TrendingUp,
  ArrowRight,
  Copy,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';

interface EnhancedPatentSelectorProps {
  patents: PatentItem[];
  selectedPatentId?: string;
  selectedPatentIds?: string[];
  onSelectPatent: (patent: PatentItem) => void;
  onTogglePatentSelection?: (patentId: string) => void;
  onConfirmSelection?: (selectedPatents: PatentItem[]) => void;
  onOpenPatentDetail?: (patent: PatentItem) => void;
  mode?: 'single' | 'multiple';
  themeMode?: 'light' | 'dark';
  themeColor?: 'blue' | 'emerald' | 'purple';
  stepTitle?: string;
  stepDescription?: string;
}

const QUICK_SEARCH_HOT_KEYWORDS = [
  '线控制动',
  '测温电缆',
  '发光材料',
  '焊接机器人',
  '人参皂苷',
  '新能源电池包',
  '黑土地农机',
  '超快激光',
  '深地钻探',
  '稀土镁合金',
  '工业大模型',
  '航空超导',
  '骨科机器人'
];

export const EnhancedPatentSelector: React.FC<EnhancedPatentSelectorProps> = ({
  patents,
  selectedPatentId,
  selectedPatentIds = [],
  onSelectPatent,
  onTogglePatentSelection,
  onConfirmSelection,
  onOpenPatentDetail,
  mode = 'single',
  themeMode = 'light',
  stepTitle = '第一步：检索并选择待转化的吉林大学专利成果',
  stepDescription = '支持一键快选市场正在关注的成果，或输入关键字在吉大专利库中搜索'
}) => {
  const [isDiscoveryModalOpen, setIsDiscoveryModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTabFilter, setActiveTabFilter] = useState<'all' | 'hot'>('all');
  const [modalCurrentPage, setModalCurrentPage] = useState(1);
  const [jumpPageInput, setJumpPageInput] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Staged IDs state inside the Discovery Modal
  const [stagedSingleId, setStagedSingleId] = useState<string>(
    selectedPatentId || patents[0]?.id || ''
  );
  const [stagedMultiIds, setStagedMultiIds] = useState<string[]>(
    selectedPatentIds.length > 0 ? selectedPatentIds : (patents[0] ? [patents[0].id] : [])
  );

  const isDark = themeMode === 'dark';

  // Sync props to staged state when external selection changes
  useEffect(() => {
    if (selectedPatentId) {
      setStagedSingleId(selectedPatentId);
    }
  }, [selectedPatentId]);

  useEffect(() => {
    if (selectedPatentIds && selectedPatentIds.length > 0) {
      setStagedMultiIds(selectedPatentIds);
    }
  }, [selectedPatentIds]);

  // When modal opens, sync staged state with current active selection
  const handleOpenDiscoveryModal = () => {
    if (selectedPatentId) {
      setStagedSingleId(selectedPatentId);
    }
    if (selectedPatentIds && selectedPatentIds.length > 0) {
      setStagedMultiIds(selectedPatentIds);
    }
    setModalCurrentPage(1);
    setIsDiscoveryModalOpen(true);
  };

  // Active Patent in Single Mode (for page display)
  const activePatent = useMemo(() => {
    if (selectedPatentId) {
      const found = patents.find(p => p.id === selectedPatentId || p.patentNo === selectedPatentId);
      if (found) return found;
    }
    return patents[0];
  }, [patents, selectedPatentId]);

  // Selected Patents in Multi Mode (for page display)
  const multiSelectedPatents = useMemo(() => {
    if (selectedPatentIds.length > 0) {
      return patents.filter(p => selectedPatentIds.includes(p.id) || selectedPatentIds.includes(p.patentNo));
    }
    return [patents[0]].filter(Boolean);
  }, [patents, selectedPatentIds]);

  // Paginated and Filtered patents from full pool for the Discovery Modal
  const modalPageData = useMemo(() => {
    return getJluPatentsByPage(modalCurrentPage, 10, activeTabFilter, searchQuery);
  }, [modalCurrentPage, activeTabFilter, searchQuery]);

  // Staged Patent in Modal for Single Mode
  const stagedActivePatent = useMemo(() => {
    if (stagedSingleId) {
      const inModalPage = modalPageData.patents.find(p => p.id === stagedSingleId || p.patentNo === stagedSingleId);
      if (inModalPage) return inModalPage;
      const inBaseList = patents.find(p => p.id === stagedSingleId || p.patentNo === stagedSingleId);
      if (inBaseList) return inBaseList;
    }
    return activePatent || modalPageData.patents[0] || patents[0];
  }, [stagedSingleId, modalPageData.patents, patents, activePatent]);

  const handleTabChange = (tab: 'all' | 'hot') => {
    setActiveTabFilter(tab);
    setModalCurrentPage(1);
    setJumpPageInput('');
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setModalCurrentPage(1);
    setJumpPageInput('');
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= modalPageData.totalPages) {
      setModalCurrentPage(newPage);
      // Scroll modal body to top
      const scrollEl = document.getElementById('modal-patent-list-body');
      if (scrollEl) scrollEl.scrollTop = 0;
    }
  };

  const handleJumpPage = (e: React.FormEvent) => {
    e.preventDefault();
    const p = parseInt(jumpPageInput.trim(), 10);
    if (!isNaN(p) && p >= 1 && p <= modalPageData.totalPages) {
      handlePageChange(p);
    }
    setJumpPageInput('');
  };

  const handleToggleMultiStaged = (id: string, patentItem?: PatentItem) => {
    setStagedMultiIds(prev => {
      if (prev.includes(id)) {
        if (prev.length <= 1) return prev; // Keep at least one
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Modal Footer: 确认选定并开始匹配企业
  const handleConfirmAndMatchFromModal = () => {
    if (mode === 'single') {
      if (stagedActivePatent) {
        onSelectPatent(stagedActivePatent);
        if (onConfirmSelection) {
          onConfirmSelection([stagedActivePatent]);
        }
      }
    } else {
      // Find all selected patents across modal and active pool
      const pool = [...modalPageData.patents, ...patents];
      const selectedItems = stagedMultiIds.map(id => {
        return pool.find(p => p.id === id || p.patentNo === id) || {
          id,
          patentNo: id,
          title: `吉林大学科技成果 (${id})`,
          inventor: '吉林大学科研团队',
          team: '吉林大学研发组',
          fieldName: '前沿交叉科技',
          ipc: 'G06F / B60 / C07',
          status: 'valid'
        } as PatentItem;
      });

      if (selectedItems.length > 0) {
        if (onSelectPatent && selectedItems[0]) {
          onSelectPatent(selectedItems[0]);
        }
        if (onConfirmSelection) {
          onConfirmSelection(selectedItems);
        } else if (onTogglePatentSelection) {
          stagedMultiIds.forEach(id => {
            if (!selectedPatentIds.includes(id)) {
              onTogglePatentSelection(id);
            }
          });
        }
      }
    }

    setIsDiscoveryModalOpen(false);
  };

  const handleCopy = (text: string, key: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Top Hot Market Trending Patents for top recommendation strip
  const hotMarketPatents = useMemo(() => {
    return patents
      .filter(p => p.isMarketHot || (p.searchCompaniesCount && p.searchCompaniesCount >= 8))
      .slice(0, 8);
  }, [patents]);

  // Render Radio or Checkbox Indicator
  const renderSelectionControl = (isSelected: boolean, isRadio: boolean) => {
    if (isRadio) {
      // 单选框 (Radio)
      return (
        <div 
          className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
            isSelected
              ? isDark 
                ? 'border-cyan-400 bg-cyan-400' 
                : 'border-blue-600 bg-blue-600'
              : isDark
                ? 'border-slate-500 bg-slate-900/80 group-hover:border-cyan-400'
                : 'border-slate-300 bg-white group-hover:border-blue-500'
          }`}
          title={isSelected ? '已选定（单选）' : '点击单选此成果'}
        >
          {isSelected && (
            <div className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-slate-950' : 'bg-white'}`} />
          )}
        </div>
      );
    } else {
      // 复选框 (Checkbox)
      return (
        <div 
          className={`w-4.5 h-4.5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
            isSelected
              ? isDark
                ? 'border-cyan-400 bg-cyan-400 text-slate-950'
                : 'border-blue-600 bg-blue-600 text-white'
              : isDark
                ? 'border-slate-500 bg-slate-900/80 group-hover:border-cyan-400'
                : 'border-slate-300 bg-white group-hover:border-blue-500'
          }`}
          title={isSelected ? '已勾选（支持多选协同）' : '点击勾选此成果'}
        >
          {isSelected && (
            <Check className="w-3 h-3 stroke-[3]" />
          )}
        </div>
      );
    }
  };

  // Generate pagination numeric buttons
  const renderPaginationButtons = () => {
    const total = modalPageData.totalPages;
    const current = modalCurrentPage;
    const pages: (number | string)[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
      if (current > 3) {
        pages.push('...');
      }
      
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);

      for (let i = start; i <= end; i++) {
        if (i > 1 && i < total) {
          pages.push(i);
        }
      }

      if (current < total - 2) {
        pages.push('...');
      }
      pages.push(total);
    }

    return pages.map((p, idx) => {
      if (p === '...') {
        return (
          <span key={`ellipsis-${idx}`} className="px-1 text-slate-400 text-xs">
            ...
          </span>
        );
      }
      const pageNum = Number(p);
      const isCurrent = pageNum === current;
      return (
        <button
          key={`page-${pageNum}`}
          type="button"
          onClick={() => handlePageChange(pageNum)}
          className={`min-w-[32px] h-8 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            isCurrent
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          {pageNum.toLocaleString()}
        </button>
      );
    });
  };

  return (
    <div className={`rounded-2xl p-4 sm:p-5 shadow-xs space-y-4 transition-colors ${
      isDark 
        ? 'bg-[#061026]/90 border border-blue-900/50 text-white' 
        : 'bg-white border border-slate-200 text-slate-900'
    }`}>
      
      {/* 1. Header & Step Bar */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b ${
        isDark ? 'border-blue-900/60' : 'border-slate-100'
      }`}>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shrink-0"></span>
            <h3 className={`text-base font-black flex items-center gap-2 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              <FileText className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-blue-600'}`} />
              <span>{stepTitle}</span>
            </h3>
            {mode === 'multiple' ? (
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                isDark 
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/60' 
                  : 'bg-purple-100 text-purple-800 border border-purple-200'
              }`}>
                <span>☑️ 复选框支持多成果协同</span>
              </span>
            ) : (
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                isDark 
                  ? 'bg-blue-950 text-blue-300 border border-blue-800' 
                  : 'bg-blue-50 text-blue-700 border border-blue-200'
              }`}>
                <span>🔘 单选框精准匹配</span>
              </span>
            )}
          </div>
          <p className={`text-xs mt-1 pl-4.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {stepDescription}
          </p>
        </div>
      </div>

      {/* 2. Top "🔥 市场正在关注的吉大成果（点击一键快选）" Strip */}
      <div className={`space-y-2 p-3.5 rounded-xl border ${
        isDark
          ? 'bg-gradient-to-r from-blue-950/80 via-slate-900/90 to-blue-950/80 border-blue-800/60'
          : 'bg-gradient-to-r from-amber-50/70 via-orange-50/40 to-slate-50 border-amber-200/80'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div className={`flex items-center gap-1.5 text-xs font-extrabold ${
            isDark ? 'text-cyan-300' : 'text-amber-950'
          }`}>
            <Flame className={`w-4 h-4 animate-pulse ${isDark ? 'text-cyan-400' : 'text-amber-600'}`} />
            <span>🔥 市场正在关注的吉大成果推荐 (点击成果即可直接切换)：</span>
          </div>
          <span className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-amber-800'}`}>
            {mode === 'multiple' ? '【复选框】可直接勾选协同成果' : '【单选框】点击一键切换成果'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-2 pt-1">
          {hotMarketPatents.slice(0, 4).map((hotP) => {
            const isSelected = mode === 'single'
              ? (activePatent?.id === hotP.id || activePatent?.patentNo === hotP.patentNo)
              : selectedPatentIds.includes(hotP.id);

            return (
              <div
                key={hotP.id}
                onClick={() => {
                  if (mode === 'multiple') {
                    if (onTogglePatentSelection) {
                      onTogglePatentSelection(hotP.id);
                    }
                  } else {
                    onSelectPatent(hotP);
                  }
                }}
                className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between relative group select-none ${
                  isDark
                    ? isSelected
                      ? 'bg-blue-900/90 border-cyan-400 shadow-md ring-2 ring-cyan-400/50'
                      : 'bg-[#0a1838] hover:bg-[#0c224e] border-blue-800/60'
                    : isSelected
                      ? 'bg-blue-50/90 border-blue-500 shadow-xs ring-2 ring-blue-400'
                      : 'bg-white hover:bg-slate-50 border-slate-200/90 shadow-2xs'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      {renderSelectionControl(isSelected, mode === 'single')}
                      <span className={`font-mono text-[10px] truncate ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                        {hotP.patentNo}
                      </span>
                    </div>
                    {hotP.searchCompaniesCount ? (
                      <span className={`px-1.5 py-0.2 rounded text-[10px] font-black shrink-0 ${
                        isDark ? 'bg-cyan-500 text-slate-950' : 'bg-amber-500 text-white'
                      }`}>
                        {hotP.searchCompaniesCount}家搜过
                      </span>
                    ) : null}
                  </div>

                  <h4 className={`text-xs font-extrabold line-clamp-1 transition-colors ${
                    isDark ? 'text-white group-hover:text-cyan-300' : 'text-slate-900 group-hover:text-blue-600'
                  }`} title={hotP.title}>
                    {hotP.title}
                  </h4>
                </div>

                <div className={`flex items-center justify-between pt-1 mt-1 border-t text-[10px] ${
                  isDark ? 'border-blue-900/50 text-slate-400' : 'border-slate-100 text-slate-500'
                }`}>
                  <span className="truncate">发明人: {hotP.inventor}</span>
                  <span className={`font-bold ${isSelected ? (isDark ? 'text-cyan-300' : 'text-blue-700') : (isDark ? 'text-slate-400' : 'text-slate-500')}`}>
                    {isSelected ? '✓ 已选中' : '点击选择'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Selected Patent(s) Highlight Display (Clean layout without extra page button) */}
      {mode === 'single' && activePatent && (
        <div className={`p-4 rounded-xl border space-y-3.5 ${
          isDark
            ? 'bg-[#0a1838] border-blue-800/60'
            : 'bg-slate-50/90 border-slate-200'
        }`}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Left: Patent Details */}
            <div className="space-y-2 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5">
                  {renderSelectionControl(true, true)}
                  <span className={`px-2 py-0.5 rounded text-xs font-extrabold shadow-2xs ${
                    isDark ? 'bg-cyan-500 text-slate-950' : 'bg-blue-600 text-white'
                  }`}>
                    当前选定待转化成果 (单选)
                  </span>
                </div>
                
                <button
                  type="button"
                  onClick={(e) => handleCopy(activePatent.patentNo, 'main-patno', e)}
                  className={`font-mono text-xs font-bold px-2 py-0.5 rounded border flex items-center gap-1 transition-colors cursor-pointer ${
                    isDark 
                      ? 'bg-blue-950 text-cyan-300 border-blue-700/60 hover:bg-blue-900' 
                      : 'bg-blue-50 text-blue-700 border-blue-200/80 hover:bg-blue-100'
                  }`}
                  title="点击复制专利号"
                >
                  <span>{activePatent.patentNo}</span>
                  {copiedKey === 'main-patno' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 opacity-60" />}
                </button>
                <span className={`text-xs font-medium px-2 py-0.5 rounded border ${
                  isDark 
                    ? 'bg-[#071536] text-slate-300 border-blue-900' 
                    : 'bg-white text-slate-500 border-slate-200'
                }`}>
                  IPC: {activePatent.ipc}
                </span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded border ${
                  isDark 
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60' 
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}>
                  有效授权 (维持中)
                </span>
                {activePatent.searchCompaniesCount ? (
                  <span className={`text-xs font-bold px-2 py-0.5 rounded border ${
                    isDark
                      ? 'bg-blue-950 text-cyan-300 border-cyan-700/60'
                      : 'bg-amber-50 text-amber-900 border-amber-200'
                  }`}>
                    {activePatent.searchCompaniesCount} 家企业搜过
                  </span>
                ) : null}
              </div>

              <h3 className={`text-base font-black leading-snug ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {activePatent.title}
              </h3>

              <div className={`flex flex-wrap items-center gap-3 text-xs ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                <span>发明人：<strong className={isDark ? 'text-white' : 'text-slate-900'}>{activePatent.inventor}</strong> ({activePatent.team || '科研团队'})</span>
                <span>•</span>
                <span>技术领域：<strong className={isDark ? 'text-cyan-300' : 'text-blue-700'}>{activePatent.fieldName}</strong></span>
              </div>

              {activePatent.marketAttentionReason && (
                <div className={`text-xs p-2 rounded-lg border flex items-center gap-1.5 ${
                  isDark 
                    ? 'bg-blue-950/80 text-cyan-200 border-blue-800/60' 
                    : 'bg-amber-50/80 text-amber-900 border-amber-200/60'
                }`}>
                  <TrendingUp className={`w-3.5 h-3.5 shrink-0 ${isDark ? 'text-cyan-400' : 'text-amber-600'}`} />
                  <span><strong>市场关注线索：</strong>{activePatent.marketAttentionReason}</span>
                </div>
              )}
            </div>

            {/* Right: Clean action buttons */}
            <div className={`flex items-center gap-2 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 ${
              isDark ? 'border-blue-900/60' : 'border-slate-200'
            }`}>
              <button
                type="button"
                onClick={handleOpenDiscoveryModal}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                  isDark
                    ? 'bg-blue-600/80 hover:bg-blue-500 text-cyan-100 hover:text-white border border-cyan-400/40'
                    : 'bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>更换其它成果</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Multiple Selected Patents chips in multi-mode */}
      {mode === 'multiple' && (
        <div className={`p-4 rounded-xl border space-y-3.5 ${
          isDark ? 'bg-[#0a1838] border-blue-800/60' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className={`text-xs font-bold flex items-center gap-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                <span>已勾选协同映射成果：</span>
                <span className={`px-2 py-0.5 rounded-full font-mono font-black text-xs ${
                  isDark ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/60' : 'bg-purple-100 text-purple-800 border border-purple-200'
                }`}>
                  {multiSelectedPatents.length} 项成果
                </span>
              </span>

              {/* Eye-catching Add More button */}
              <button
                type="button"
                onClick={handleOpenDiscoveryModal}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-md active:scale-95 ${
                  isDark
                    ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white border border-cyan-300/60 shadow-cyan-500/25 ring-2 ring-cyan-400/30'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-500/25'
                }`}
                title="点击打开成果库检索弹窗并勾选更多协同成果"
              >
                <Search className="w-3.5 h-3.5" />
                <span>+ 打开成果库勾选更多成果</span>
                <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-bold ${
                  isDark ? 'bg-cyan-950/80 text-cyan-200 border border-cyan-400/30' : 'bg-white/20 text-white'
                }`}>
                  {TOTAL_JLU_VALID_PATENTS_COUNT.toLocaleString()}件
                </span>
              </button>
            </div>

            {/* Badges list */}
            <div className="flex flex-wrap gap-2 pt-1">
              {multiSelectedPatents.map((p) => (
                <div 
                  key={p.id}
                  className={`px-2.5 py-1.5 rounded-lg border shadow-2xs flex items-center gap-2 text-xs ${
                    isDark
                      ? 'bg-blue-950/90 text-cyan-200 border-blue-700/80'
                      : 'bg-white text-slate-800 border-purple-200'
                  }`}
                >
                  <div className="flex items-center gap-1">
                    {renderSelectionControl(true, false)}
                    <span className={`font-mono font-bold text-[11px] ${isDark ? 'text-cyan-400' : 'text-purple-700'}`}>
                      {p.patentNo}
                    </span>
                  </div>
                  <span className="font-bold max-w-[200px] truncate">{p.title}</span>
                  {multiSelectedPatents.length > 1 && onTogglePatentSelection && (
                    <button
                      type="button"
                      onClick={() => onTogglePatentSelection(p.id)}
                      className="text-slate-400 hover:text-red-400 transition-colors cursor-pointer ml-1"
                      title="取消勾选此项"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. Full Patent Discovery Modal (吉林大学科技成果库检索与选定，含完整分页) */}
      {/* ========================================================================= */}
      {isDiscoveryModalOpen && (
        <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div 
            className="bg-white w-full max-w-5xl max-h-[92vh] rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 text-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#071738] via-[#0D285F] to-[#0A1F4D] text-white p-5 sm:p-6 relative">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pr-8">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-cyan-300">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-black tracking-tight">
                      吉林大学科技成果库 · 智能选定与检索
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/20 border border-cyan-400/40 text-cyan-200 text-xs font-bold">
                      有效成果总数 {TOTAL_JLU_VALID_PATENTS_COUNT.toLocaleString()} 件
                    </span>
                  </div>
                  <p className="text-xs text-blue-200/90 pl-10">
                    {mode === 'multiple' 
                      ? '在列表前勾选【复选框】可多选协同成果，选定后点击底部“确认选定并开始匹配企业”开始执行匹配'
                      : '在列表前点击【单选框】选定成果，选定后点击底部“确认选定并开始匹配企业”开始执行匹配'}
                  </p>
                </div>

                <div className="flex items-center gap-2 pl-10 sm:pl-0">
                  <span className="text-xs text-slate-300 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 font-medium">
                    {mode === 'multiple' ? (
                      <>已勾选：<strong className="text-cyan-300 font-bold">{stagedMultiIds.length}</strong> 项成果</>
                    ) : (
                      <>已选定：<strong className="text-cyan-300 font-mono">{stagedActivePatent?.patentNo}</strong></>
                    )}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsDiscoveryModalOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search & Filter Toolbar */}
            <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 space-y-3.5">
              {/* Main Search Input */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="输入专利名称、专利号 (如 CN116892341B)、发明人 (如 高镇海/马於光/李骏/任露泉) 或技术关键词搜索..."
                  className="w-full pl-10 pr-10 py-3 bg-white border border-slate-300 rounded-2xl text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => handleSearchChange('')}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Hot Search Keyword Badges */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-slate-500 font-bold flex items-center gap-1 text-[11px] shrink-0">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  热门检索词：
                </span>
                {QUICK_SEARCH_HOT_KEYWORDS.map((kw) => (
                  <button
                    key={kw}
                    type="button"
                    onClick={() => handleSearchChange(kw)}
                    className="px-2.5 py-1 rounded-lg bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 text-[11px] font-medium transition-all cursor-pointer shadow-2xs"
                  >
                    {kw}
                  </button>
                ))}
              </div>

              {/* Tab Filters */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleTabChange('all')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTabFilter === 'all'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>全部有效专利库 ({TOTAL_JLU_VALID_PATENTS_COUNT.toLocaleString()}件)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleTabChange('hot')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTabFilter === 'hot'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 text-amber-600" />
                  <span>🔥 市场正在关注 (48件)</span>
                </button>
              </div>
            </div>

            {/* Patent List Content */}
            <div id="modal-patent-list-body" className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 max-h-[46vh] bg-slate-50/50">
              {modalPageData.patents.length > 0 ? (
                modalPageData.patents.map((p) => {
                  const isSelected = mode === 'single'
                    ? (stagedSingleId === p.id || stagedSingleId === p.patentNo)
                    : stagedMultiIds.includes(p.id);

                  return (
                    <div
                      key={p.id}
                      onClick={() => {
                        if (mode === 'multiple') {
                          handleToggleMultiStaged(p.id, p);
                        } else {
                          setStagedSingleId(p.id);
                        }
                      }}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none group ${
                        isSelected
                          ? 'bg-blue-50/90 border-blue-500 shadow-sm ring-2 ring-blue-400'
                          : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-blue-300 hover:shadow-2xs'
                      }`}
                    >
                      <div className="flex items-start gap-3.5 flex-1 min-w-0">
                        {/* Radio or Checkbox Control */}
                        <div className="pt-0.5">
                          {renderSelectionControl(isSelected, mode === 'single')}
                        </div>

                        <div className="space-y-2 flex-1 min-w-0">
                          {/* Top badges */}
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/80">
                              {p.patentNo}
                            </span>
                            <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                              IPC: {p.ipc}
                            </span>
                            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                              有效授权 (维持中)
                            </span>
                            {p.searchCompaniesCount ? (
                              <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded flex items-center gap-1">
                                <Flame className="w-3 h-3 text-amber-600" />
                                <span>{p.searchCompaniesCount} 家企业搜过</span>
                              </span>
                            ) : null}
                          </div>

                          {/* Patent Title */}
                          <h4 className="text-sm sm:text-base font-black text-slate-900 leading-snug group-hover:text-blue-700 transition-colors">
                            {p.title}
                          </h4>

                          {/* Metadata row */}
                          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                            <span>发明人：<strong className="text-slate-800 font-bold">{p.inventor}</strong> ({p.team || '科研团队'})</span>
                            <span>•</span>
                            <span>技术领域：<span className="text-blue-700 font-semibold">{p.fieldName}</span></span>
                          </div>

                          {/* Market attention notice */}
                          {p.marketAttentionReason && (
                            <div className="text-[11px] text-amber-900 bg-amber-50/80 p-2 rounded-xl border border-amber-200/60 flex items-center gap-1.5">
                              <TrendingUp className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                              <span><strong>市场关注线索：</strong>{p.marketAttentionReason}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right Tag / Status */}
                      <div className="shrink-0 flex items-center justify-end gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                        {isSelected ? (
                          <span className="px-4 py-2 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center gap-1.5 shadow-2xs">
                            <Check className="w-4 h-4 stroke-[3]" />
                            <span>{mode === 'multiple' ? '已勾选协同' : '已选定此成果'}</span>
                          </span>
                        ) : (
                          <button
                            type="button"
                            className="px-4 py-2 rounded-xl bg-slate-100 group-hover:bg-blue-600 text-slate-700 group-hover:text-white font-bold text-xs transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                          >
                            <span>{mode === 'multiple' ? '点击勾选' : '点击单选'}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-12 text-center space-y-2 bg-white rounded-2xl border border-slate-200">
                  <Search className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-sm font-bold text-slate-700">未检索到匹配的吉大专利记录</p>
                  <p className="text-xs text-slate-400">请尝试更换检索关键词或清空筛选条件</p>
                </div>
              )}
            </div>

            {/* Pagination Controls Bar */}
            <div className="px-4 sm:px-6 py-3 border-t border-slate-200 bg-slate-50/80 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="text-slate-600 font-medium">
                第 <strong className="text-blue-700 font-bold">{modalCurrentPage.toLocaleString()}</strong> / <strong>{modalPageData.totalPages.toLocaleString()}</strong> 页
                <span className="text-slate-400 ml-2">（每页 10 件，共 {modalPageData.totalCount.toLocaleString()} 件）</span>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                {/* First Page */}
                <button
                  type="button"
                  disabled={modalCurrentPage <= 1}
                  onClick={() => handlePageChange(1)}
                  className="px-2 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-medium flex items-center"
                  title="第一页"
                >
                  <ChevronsLeft className="w-3.5 h-3.5" />
                </button>

                {/* Prev Page */}
                <button
                  type="button"
                  disabled={modalCurrentPage <= 1}
                  onClick={() => handlePageChange(modalCurrentPage - 1)}
                  className="px-2.5 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-medium flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>上一页</span>
                </button>

                {/* Number Buttons */}
                <div className="hidden sm:flex items-center gap-1">
                  {renderPaginationButtons()}
                </div>

                {/* Next Page */}
                <button
                  type="button"
                  disabled={modalCurrentPage >= modalPageData.totalPages}
                  onClick={() => handlePageChange(modalCurrentPage + 1)}
                  className="px-2.5 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-medium flex items-center gap-1"
                >
                  <span>下一页</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                {/* Last Page */}
                <button
                  type="button"
                  disabled={modalCurrentPage >= modalPageData.totalPages}
                  onClick={() => handlePageChange(modalPageData.totalPages)}
                  className="px-2 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-medium flex items-center"
                  title="最后一页"
                >
                  <ChevronsRight className="w-3.5 h-3.5" />
                </button>

                {/* Jump to Page Input */}
                <form onSubmit={handleJumpPage} className="flex items-center gap-1 ml-2">
                  <span className="text-slate-500">跳至</span>
                  <input
                    type="number"
                    min="1"
                    max={modalPageData.totalPages}
                    value={jumpPageInput}
                    onChange={(e) => setJumpPageInput(e.target.value)}
                    placeholder={String(modalCurrentPage)}
                    className="w-14 h-8 px-1.5 text-center text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <span className="text-slate-500">页</span>
                  <button
                    type="submit"
                    className="px-2 h-8 rounded-lg bg-slate-200 hover:bg-blue-600 hover:text-white text-slate-700 text-xs font-bold transition-all cursor-pointer"
                  >
                    跳转
                  </button>
                </form>
              </div>
            </div>

            {/* Modal Footer with Explicit Confirm & Match Button */}
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                {activeTabFilter === 'all' && !searchQuery && (
                  <span>从吉林大学 <strong>{TOTAL_JLU_VALID_PATENTS_COUNT.toLocaleString()}</strong> 件有效专利库中实时列出 <strong>{TOTAL_JLU_VALID_PATENTS_COUNT.toLocaleString()}</strong> 件成果（当前第 {modalCurrentPage.toLocaleString()} / {modalPageData.totalPages.toLocaleString()} 页）</span>
                )}
                {activeTabFilter === 'hot' && !searchQuery && (
                  <span>从吉林大学有效专利库中筛选出 <strong className="text-amber-600 font-bold">{modalPageData.totalCount}</strong> 件市场正在关注成果（当前第 {modalCurrentPage} / {modalPageData.totalPages} 页）</span>
                )}
                {Boolean(searchQuery) && (
                  <span>关键词 “<strong>{searchQuery}</strong>” 检索共匹配到 <strong className="text-blue-700 font-bold">{modalPageData.totalCount.toLocaleString()}</strong> 件成果（当前第 {modalCurrentPage} / {modalPageData.totalPages.toLocaleString()} 页）</span>
                )}
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsDiscoveryModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all cursor-pointer"
                >
                  取消
                </button>

                <button
                  type="button"
                  onClick={handleConfirmAndMatchFromModal}
                  className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-cyan-200" />
                  <span>
                    {mode === 'multiple' 
                      ? `确认选定 (${stagedMultiIds.length}项成果) 并开始匹配企业` 
                      : '确认选定并开始匹配企业'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
