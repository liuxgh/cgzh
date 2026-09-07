import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Search, 
  User, 
  Calendar, 
  X, 
  Layers,
  Clock,
  Compass,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { PatentItem, UserRole } from '../types';
import { INITIAL_PATENTS } from '../data/mockData';
import { UNPATENTED_TECH_LIST, UnpatentedTechItem } from '../data/unpatentedTechData';

interface Props {
  userRole?: UserRole;
  onSelectPatent?: (patent: PatentItem) => void;
  onNavigateToSearch?: () => void;
  onNavigateToUnpatented?: () => void;
}

export type TechTypeFilter = 'all' | 'patent' | 'unpatented';

export const LatestTechAchievementsSection: React.FC<Props> = ({
  userRole = 'enterprise',
  onSelectPatent,
  onNavigateToSearch,
  onNavigateToUnpatented
}) => {
  const [techType, setTechType] = useState<TechTypeFilter>('all');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 6;

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [techType, selectedDomain, searchQuery]);

  // Domains for filtering
  const domains = [
    { key: 'all', label: '全部领域' },
    { key: 'automotive', label: '汽车与智能装备' },
    { key: 'materials', label: '新材料与化学' },
    { key: 'ai_electronics', label: '人工智能与信息' },
    { key: 'biomedicine', label: '生物医药与健康' },
    { key: 'environment', label: '环境与新能源' }
  ];

  // Map patent fields to unified domains
  const matchDomain = (domainKey: string, itemType: 'patent' | 'unpatented', fieldOrDomain: string) => {
    if (domainKey === 'all') return true;
    const str = fieldOrDomain.toLowerCase();
    if (domainKey === 'automotive') {
      return str.includes('汽车') || str.includes('装备') || str.includes('机械') || str.includes('automotive');
    }
    if (domainKey === 'materials') {
      return str.includes('材料') || str.includes('化学') || str.includes('超分子') || str.includes('materials');
    }
    if (domainKey === 'ai_electronics') {
      return str.includes('人工智能') || str.includes('电子') || str.includes('信息') || str.includes('通信') || str.includes('ai');
    }
    if (domainKey === 'biomedicine') {
      return str.includes('生物') || str.includes('医药') || str.includes('类器官') || str.includes('药');
    }
    if (domainKey === 'environment') {
      return str.includes('环境') || str.includes('生态') || str.includes('能源') || str.includes('地热');
    }
    return true;
  };

  // Helper to format date with current 2026 data
  const formatLatestDate = (dateStr?: string) => {
    if (!dateStr) return '2026年';
    return dateStr.replace(/^2024/, '2026').replace(/^2023/, '2026').replace(/^2022/, '2026');
  };

  // Filter Patents
  const filteredPatents = INITIAL_PATENTS.filter(p => {
    if (techType === 'unpatented') return false;
    if (!matchDomain(selectedDomain, 'patent', `${p.field} ${p.fieldName} ${p.title}`)) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return p.title.toLowerCase().includes(q) || 
             p.patentNo.toLowerCase().includes(q) || 
             p.inventor.toLowerCase().includes(q) || 
             p.abstract.toLowerCase().includes(q);
    }
    return true;
  });

  // Filter Unpatented Tech
  const filteredUnpatented = UNPATENTED_TECH_LIST.filter(u => {
    if (techType === 'patent') return false;
    if (!matchDomain(selectedDomain, 'unpatented', `${u.domain} ${u.title}`)) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return u.title.toLowerCase().includes(q) || 
             u.desc.toLowerCase().includes(q) || 
             u.contact.toLowerCase().includes(q) || 
             (u.keywords && u.keywords.some(k => k.toLowerCase().includes(q)));
    }
    return true;
  });

  // Combined and sorted items
  interface UnifiedItem {
    id: string;
    type: 'patent' | 'unpatented';
    title: string;
    badgeText: string;
    subBadge: string;
    tagList: string[];
    teamOrInventor: string;
    date: string;
    description: string;
    rawPatent?: PatentItem;
    rawUnpatented?: UnpatentedTechItem;
  }

  const unifiedList: UnifiedItem[] = [
    ...filteredPatents.map(p => ({
      id: p.id,
      type: 'patent' as const,
      title: p.title,
      badgeText: '专利技术',
      subBadge: p.patentNo,
      tagList: [p.fieldName, ...(p.applicableIndustries?.slice(0, 2) || [])],
      teamOrInventor: `${p.inventor} 团队 · ${p.team}`,
      date: formatLatestDate(p.grantDate || p.applicationDate),
      description: p.abstract,
      rawPatent: p
    })),
    ...filteredUnpatented.map(u => ({
      id: u.id,
      type: 'unpatented' as const,
      title: u.title,
      badgeText: '非专利技术/成果',
      subBadge: '专有技术秘密',
      tagList: [u.domain, ...(u.keywords?.slice(0, 2) || [])],
      teamOrInventor: `${u.contact} · ${u.team || '吉大科研团队'}`,
      date: formatLatestDate(u.date),
      description: u.desc,
      rawUnpatented: u
    }))
  ];

  const totalPages = Math.max(1, Math.ceil(unifiedList.length / pageSize));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  const currentItems = unifiedList.slice((safeCurrentPage - 1) * pageSize, safeCurrentPage * pageSize);

  const getPageNumbers = (current: number, total: number): (number | string)[] => {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    if (current <= 4) {
      return [1, 2, 3, 4, 5, '...', total];
    }
    if (current >= total - 3) {
      return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
    }
    return [1, '...', current - 1, current, current + 1, '...', total];
  };

  return (
    <div id="latest-tech-achievements-module" className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-700/50 shadow-2xl relative overflow-hidden group flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/15 transition-all duration-700"></div>
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/15 transition-all duration-700"></div>

      {/* Module Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-700/50 pb-6 relative z-10">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-cyan-500/30 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              吉林大学最新技术成果
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-light">
            汇聚吉林大学2026年授权专利与特色专有技术成果，精准赋能重点产业创新升级。
          </p>
        </div>

        {/* Global Action Links */}
        <div className="flex items-center gap-3 shrink-0">
          {onNavigateToUnpatented && (
            <button
              onClick={onNavigateToUnpatented}
              className="px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-600 hover:border-slate-500 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="前往非专利技术专区"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              非专利技术专区
            </button>
          )}
          {onNavigateToSearch && (
            <button
              onClick={onNavigateToSearch}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-blue-500/20 border border-blue-400/30"
            >
              <Search className="w-3.5 h-3.5 text-cyan-300" />
              AI智能检索更多
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        {/* Type Toggle: All / Patent / Unpatented */}
        <div className="flex items-center p-1 rounded-xl bg-slate-800/80 border border-slate-700/60 shadow-inner max-w-max">
          <button
            onClick={() => setTechType('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              techType === 'all'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            全部成果 (2,568)
          </button>
          <button
            onClick={() => setTechType('patent')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              techType === 'patent'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
            专利技术 (2,079)
          </button>
          <button
            onClick={() => setTechType('unpatented')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              techType === 'unpatented'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-300" />
            非专利技术/成果 (489)
          </button>
        </div>

        {/* Search Input Box */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="检索最新技术关键词、团队、成果名称..."
            className="w-full bg-slate-800/70 border border-slate-700/80 rounded-xl px-4 py-2 pl-9 text-xs text-white placeholder-slate-400 focus:outline-hidden focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Domain Quick Chips */}
      <div className="flex flex-wrap items-center gap-2 relative z-10">
        <span className="text-xs text-slate-400 font-medium mr-1">前沿赛道:</span>
        {domains.map(d => (
          <button
            key={d.key}
            onClick={() => setSelectedDomain(d.key)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
              selectedDomain === d.key
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-[0_0_10px_rgba(6,182,212,0.2)] font-bold'
                : 'bg-slate-800/40 text-slate-400 border-slate-700/50 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Unified Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10 pt-2">
        {unifiedList.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-400 bg-slate-800/30 rounded-2xl border border-slate-700/40">
            <Compass className="w-10 h-10 mx-auto text-slate-600 mb-2 animate-bounce" />
            <p className="text-sm font-medium">未找到符合筛选条件的吉大最新技术成果</p>
            <button
              onClick={() => { setTechType('all'); setSelectedDomain('all'); setSearchQuery(''); }}
              className="mt-3 px-4 py-1.5 rounded-lg bg-slate-700 text-xs text-white hover:bg-slate-600 transition-all cursor-pointer"
            >
              重置筛选条件
            </button>
          </div>
        ) : (
          currentItems.map(item => {
            const isPatent = item.type === 'patent';
            return (
              <div
                key={`${item.type}-${item.id}`}
                onClick={() => {
                  if (isPatent && item.rawPatent && onSelectPatent) {
                    onSelectPatent(item.rawPatent);
                  }
                }}
                className={`bg-slate-800/50 hover:bg-slate-800/80 border border-slate-700/60 hover:border-blue-500/50 rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between group/card shadow-lg hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:-translate-y-1 relative overflow-hidden ${
                  isPatent && onSelectPatent ? 'cursor-pointer' : ''
                }`}
              >
                {/* Top Accent Strip */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${
                  isPatent 
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500' 
                    : 'bg-gradient-to-r from-amber-500 to-emerald-500'
                }`}></div>

                <div className="flex flex-col h-full">
                  {/* Card Header Badges & Date */}
                  <div className="flex items-center justify-between gap-2 mb-3 pt-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${
                        isPatent 
                          ? 'bg-blue-900/60 text-blue-300 border-blue-700/70' 
                          : 'bg-amber-900/60 text-amber-300 border-amber-700/70'
                      }`}>
                        {item.badgeText}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 truncate max-w-[140px]">
                        {item.subBadge}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-slate-400 shrink-0">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>{item.date}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h4 
                    className="text-white font-bold text-base leading-snug line-clamp-2 group-hover/card:text-cyan-300 transition-colors mb-2.5" 
                    title={item.title}
                  >
                    {item.title}
                  </h4>

                  {/* Inventor / Team */}
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                    <User className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="truncate">{item.teamOrInventor}</span>
                  </div>

                  {/* Abstract Snippet */}
                  <p className="text-xs text-slate-300/90 leading-relaxed line-clamp-3 mb-4 font-light">
                    {item.description}
                  </p>

                  {/* Tag Chips */}
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-slate-700/40">
                    {item.tagList.filter(Boolean).map((t, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-700/50 text-slate-300 border border-slate-600/40">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-700/50 relative z-10 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span>
              共 <strong className="text-white font-mono">{unifiedList.length}</strong> 项成果
            </span>
            <span className="text-slate-600">|</span>
            <span>
              第 <strong className="text-cyan-400 font-mono font-bold">{safeCurrentPage}</strong> / <strong className="text-white font-mono">{totalPages}</strong> 页
            </span>
            <span className="text-slate-400 text-[11px]">（每页 6 条）</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={safeCurrentPage <= 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all flex items-center gap-1 shadow-sm font-medium"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>上一页</span>
            </button>

            {getPageNumbers(safeCurrentPage, totalPages).map((pg, idx) => {
              if (pg === '...') {
                return (
                  <span key={`dots-${idx}`} className="w-8 h-8 flex items-center justify-center text-slate-500">
                    ...
                  </span>
                );
              }
              const pageNum = Number(pg);
              const isActive = safeCurrentPage === pageNum;
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                    isActive
                      ? 'bg-blue-600 text-white border border-blue-400 shadow-md shadow-blue-500/20'
                      : 'bg-slate-800/80 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              type="button"
              disabled={safeCurrentPage >= totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all flex items-center gap-1 shadow-sm font-medium"
            >
              <span>下一页</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Bottom Hint Banner */}
      <div className="pt-2 border-t border-slate-700/40 flex items-center gap-2 text-xs text-slate-400 relative z-10">
        <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
        <span>吉林大学重点聚焦关键核心技术突破与高质量科技供给，推动高校成果与产业需求深度融合。</span>
      </div>
    </div>
  );
};
