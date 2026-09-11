import React, { useState, useMemo, useEffect } from 'react';
import { 
  Building2, 
  Search, 
  Clock, 
  ArrowRight, 
  Filter, 
  ChevronRight, 
  FileText, 
  Mail, 
  Target, 
  Zap, 
  AlertCircle, 
  Award, 
  ChevronDown,
  Calendar,
  Compass,
  PieChart as PieChartIcon,
  BarChart3,
  TrendingUp,
  Activity,
  Layers,
  Sparkles,
  Bot,
  Lightbulb,
  CheckCircle2,
  FolderSearch,
  ExternalLink,
  BookOpen,
  ChevronLeft,
  Phone,
  ShieldCheck
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell, 
  PieChart, 
  Pie, 
  AreaChart, 
  Area,
  CartesianGrid
} from 'recharts';
import { TabType, PatentItem, TargetEnterprise } from '../types';
import { 
  BAITEN_SEARCH_DAILY_LEADS, 
  BaitenVisitorRecord, 
  SearchSession,
  ViewedPatentItem 
} from '../data/baitenVisitorTrackerData';
import { EnterpriseActivityTimeline } from './EnterpriseActivityTimeline';
import { BaitenWordCloudSection } from './BaitenWordCloudSection';

interface BaitenVisitorTrackerPageProps {
  patents: PatentItem[];
  setActiveTab: (tab: TabType) => void;
  onSelectEnterprise: (enterprise: TargetEnterprise) => void;
  onSelectPatent: (patent: PatentItem) => void;
  onOpenAiActionPlan?: (enterprise: TargetEnterprise) => void;
  onLaunchAiAgentWithQuery?: (query: string) => void;
}

export const BaitenVisitorTrackerPage: React.FC<BaitenVisitorTrackerPageProps> = ({
  patents,
  setActiveTab,
  onSelectEnterprise,
  onSelectPatent,
  onOpenAiActionPlan,
  onLaunchAiAgentWithQuery
}) => {
  const [selectedSearchType, setSelectedSearchType] = useState<'all' | 'direct_keyword' | 'tech_search_jlu_view'>('all');
  const [dateRangePreset, setDateRangePreset] = useState<'all' | 'today' | 'last3days' | 'last7days' | 'custom'>('last7days');
  const [startDate, setStartDate] = useState<string>('2026-09-01');
  const [endDate, setEndDate] = useState<string>('2026-09-10');
  const [searchFilter, setSearchFilter] = useState('');
  
  // 分页状态
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // 展开的企业ID
  const [expandedLeadId, setExpandedLeadId] = useState<string | null>(null);
  // 每个企业内部选中的搜索词 Tab Index
  const [activeSessionIndexMap, setActiveSessionIndexMap] = useState<Record<string, number>>({});
  // 控制是否展示整体图表看板
  const [showVisualCharts, setShowVisualCharts] = useState(true);

  // 当筛选条件变化时，自动重置分页到第一页
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSearchType, dateRangePreset, startDate, endDate, searchFilter]);

  // 筛选数据（已去除学科领域过滤）
  const filteredLeads = useMemo(() => {
    return BAITEN_SEARCH_DAILY_LEADS.filter(lead => {
      // 1. 行为路径过滤
      if (selectedSearchType !== 'all' && lead.searchType !== selectedSearchType) return false;
      
      // 2. 日期范围过滤
      if (dateRangePreset === 'today') {
        if (lead.searchDate !== '2026-09-10') return false;
      } else if (dateRangePreset === 'last3days') {
        if (lead.searchDate < '2026-09-08' || lead.searchDate > '2026-09-10') return false;
      } else if (dateRangePreset === 'last7days') {
        if (lead.searchDate < '2026-09-04' || lead.searchDate > '2026-09-10') return false;
      } else if (dateRangePreset === 'custom') {
        if (startDate && lead.searchDate < startDate) return false;
        if (endDate && lead.searchDate > endDate) return false;
      }

      // 3. 关键词与文本过滤
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase();
        const matchCompany = lead.companyName.toLowerCase().includes(q) || lead.shortName.toLowerCase().includes(q);
        const matchKw = lead.searchKeyword.toLowerCase().includes(q) || lead.matchedKeywords.some(k => k.toLowerCase().includes(q));
        const matchPatent = lead.viewedPatents.some(p => p.title.toLowerCase().includes(q) || p.inventor.toLowerCase().includes(q));
        return matchCompany || matchKw || matchPatent;
      }
      return true;
    });
  }, [selectedSearchType, dateRangePreset, startDate, endDate, searchFilter]);

  // 分页计算
  const totalPages = Math.ceil(filteredLeads.length / pageSize) || 1;
  const paginatedLeads = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredLeads.slice(start, start + pageSize);
  }, [filteredLeads, currentPage, pageSize]);

  // 统计指标
  const totalLeads = filteredLeads.length;
  const directKeywordCount = filteredLeads.filter(l => l.searchType === 'direct_keyword').length;
  const techSearchCount = filteredLeads.filter(l => l.searchType === 'tech_search_jlu_view').length;

  // 收集当前筛选条件下查阅的所有吉大专利总数（去重）
  const allFilteredViewedPatents = useMemo(() => {
    const pMap = new Map<string, ViewedPatentItem>();
    filteredLeads.forEach(l => {
      l.viewedPatents.forEach(p => {
        if (!pMap.has(p.patentNo)) {
          pMap.set(p.patentNo, p);
        }
      });
    });
    return Array.from(pMap.values());
  }, [filteredLeads]);

  // --- 全局宏观图表数据 ---
  // 1. 学科领域分布 (环形图)
  const fieldDistributionData = useMemo(() => {
    const counts: Record<string, { name: string; value: number; color: string }> = {
      automotive: { name: '汽车与智能网联', value: 0, color: '#3B82F6' },
      materials: { name: '化学与超分子材料', value: 0, color: '#10B981' },
      biomedicine: { name: '生物医药与健康', value: 0, color: '#F59E0B' },
      semiconductor: { name: '芯片与微电子', value: 0, color: '#6366F1' },
      cleanenergy: { name: '清洁能源与储能', value: 0, color: '#06B6D4' },
      machinery: { name: '高端仿生与装备', value: 0, color: '#EC4899' }
    };
    filteredLeads.forEach(l => {
      if (counts[l.fieldCategory]) {
        counts[l.fieldCategory].value += 1;
      }
    });
    return Object.values(counts).filter(item => item.value > 0);
  }, [filteredLeads]);

  // 2. 日期走势趋势数据 (面积折线图)
  const dateTrendData = useMemo(() => {
    const dates = ['09-02', '09-04', '09-06', '09-07', '09-08', '09-09', '09-10'];
    const map: Record<string, { direct: number; tech: number }> = {
      '09-02': { direct: 0, tech: 1 },
      '09-04': { direct: 1, tech: 0 },
      '09-06': { direct: 0, tech: 1 },
      '09-07': { direct: 0, tech: 1 },
      '09-08': { direct: 1, tech: 0 },
      '09-09': { direct: 1, tech: 1 },
      '09-10': { direct: 1, tech: 2 }
    };
    return dates.map(d => ({
      date: d,
      直接检索吉大: map[d]?.direct || 0,
      技术词命中吉大: map[d]?.tech || 0,
      总计: (map[d]?.direct || 0) + (map[d]?.tech || 0)
    }));
  }, []);

  // 3. 被关注最热吉大发明人团队 (Top 5 柱状图)
  const topInventorsData = useMemo(() => {
    const invMap: Record<string, { name: string; count: number; college: string }> = {};
    filteredLeads.forEach(l => {
      l.viewedPatents.forEach(p => {
        const inv = p.inventor;
        if (!invMap[inv]) {
          invMap[inv] = { name: inv, count: 0, college: p.college.split('/')[0].trim() };
        }
        invMap[inv].count += 1;
      });
    });
    return Object.values(invMap)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [filteredLeads]);

  // 4. 企业地域前5
  const provinceDistribution = useMemo(() => {
    const pMap: Record<string, number> = {};
    filteredLeads.forEach(l => {
      const p = l.province.split('/')[0].replace('省', '').replace('市', '').trim();
      pMap[p] = (pMap[p] || 0) + 1;
    });
    return Object.entries(pMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [filteredLeads]);

  // 导航到成果详情
  const handleJumpToPatent = (patentNo: string) => {
    const target = patents.find(p => p.patentNo === patentNo || patentNo.includes(p.patentNo));
    if (target) {
      onSelectPatent(target);
      setActiveTab('detail');
    } else {
      const fallbackPatent = patents[0];
      if (fallbackPatent) {
        onSelectPatent(fallbackPatent);
        setActiveTab('detail');
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* 1. 顶部 Header 简明展板 */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex flex-wrap items-center gap-3">
              <span>企业实时检索动态追踪</span>
              <span className="text-xs font-normal px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                实时动态追踪
              </span>
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              基于佰腾网每日专利检索日志，精准捕捉直接搜索<strong>吉林大学</strong>成果或通过技术关键词命中并调阅吉大专利的企业。深入剖析企业底层研发痛点与采购选型意图，助力高校科研团队主动精准对接。
            </p>
          </div>

          {/* 右侧核心数据看板 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
              <div className="text-xs text-blue-200 flex items-center gap-1.5 font-medium">
                <Target className="w-4 h-4 text-emerald-400" />
                周期关注企业
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white mt-1">
                {totalLeads} <span className="text-xs font-normal text-slate-300">家</span>
              </div>
              <div className="text-[11px] text-slate-300 mt-0.5">调阅吉大发明专利</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
              <div className="text-xs text-blue-200 flex items-center gap-1.5 font-medium">
                <Zap className="w-4 h-4 text-amber-400" />
                直接检索吉大
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-300 mt-1">
                {directKeywordCount} <span className="text-xs font-normal text-slate-300">家</span>
              </div>
              <div className="text-[11px] text-slate-300 mt-0.5">精准锁定吉大成果</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
              <div className="text-xs text-blue-200 flex items-center gap-1.5 font-medium">
                <Search className="w-4 h-4 text-cyan-400" />
                技术词命中调阅
              </div>
              <div className="text-2xl sm:text-3xl font-black text-cyan-300 mt-1">
                {techSearchCount} <span className="text-xs font-normal text-slate-300">家</span>
              </div>
              <div className="text-[11px] text-slate-300 mt-0.5">技术词匹配并深度查阅</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 检索路径与日期范围筛选工具栏 (放于词云与宏观看板上方，实时驱动下方图表与明细) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
        
        {/* 顶部筛选行：行为路径 + 搜索框 */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> 行为路径：
            </span>
            <button
              onClick={() => setSelectedSearchType('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedSearchType === 'all'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              全部动态 ({totalLeads})
            </button>
            <button
              onClick={() => setSelectedSearchType('direct_keyword')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedSearchType === 'direct_keyword'
                  ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-400/30'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>直接检索吉大 ({directKeywordCount})</span>
            </button>
            <button
              onClick={() => setSelectedSearchType('tech_search_jlu_view')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedSearchType === 'tech_search_jlu_view'
                  ? 'bg-cyan-600 text-white shadow-sm ring-2 ring-cyan-400/30'
                  : 'bg-cyan-50 text-cyan-800 hover:bg-cyan-100 border border-cyan-200'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>技术词命中并调阅 ({techSearchCount})</span>
            </button>
          </div>

          {/* 搜索框 */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="搜索企业、发明人、技术词..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>
        </div>

        {/* 日期范围选择行 */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-600 font-bold flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              检索日期范围：
            </span>
            {[
              { id: 'today', label: '今日最新' },
              { id: 'last3days', label: '近3天' },
              { id: 'last7days', label: '近7天 (推荐)' },
              { id: 'all', label: '近30天全部' },
              { id: 'custom', label: '自定义区间' }
            ].map(d => (
              <button
                key={d.id}
                onClick={() => setDateRangePreset(d.id as any)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-medium ${
                  dateRangePreset === d.id
                    ? 'bg-blue-50 text-blue-700 font-bold border border-blue-300 shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {d.label}
              </button>
            ))}

            {/* 自定义日期选择器 */}
            {dateRangePreset === 'custom' && (
              <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="px-2 py-1 border border-slate-200 rounded-md text-xs bg-slate-50 focus:bg-white focus:outline-none"
                />
                <span className="text-slate-400">至</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="px-2 py-1 border border-slate-200 rounded-md text-xs bg-slate-50 focus:bg-white focus:outline-none"
                />
              </div>
            )}
          </div>

          <div className="text-slate-400 flex items-center gap-3">
            <span>
              匹配到 <strong className="text-slate-700">{filteredLeads.length}</strong> 条企业检索行为记录
            </span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="hidden sm:inline">
              💡 点击卡片右侧「查看专利与详情记录」可查看时间线图表与深度研判
            </span>
          </div>
        </div>

      </div>

      {/* 3. 企业检索热度与专利技术关键词洞察及宏观态势看板区 (位于筛选模块下方) */}
      {showVisualCharts && (
        <div className="space-y-5 animate-in fade-in duration-300">
          
          {/* 双维度检索洞察词云看板 */}
          <BaitenWordCloudSection 
            leads={filteredLeads}
            onSelectKeyword={(kw) => setSearchFilter(kw)}
            activeFilterKeyword={searchFilter}
          />

          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <span>全校专利被检索宏观态势看板</span>
            </div>
            <span className="text-xs text-slate-400">
              多维度图表直观洞察企业关注热点与日度走势
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            
            {/* 图表 1: 关注学科领域分布 (环形图) */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <PieChartIcon className="w-4 h-4 text-indigo-600" />
                    <span>企业关注的技术领域分布</span>
                  </h3>
                  <span className="text-[11px] text-slate-400">共 {fieldDistributionData.length} 个领域</span>
                </div>
                <p className="text-[11px] text-slate-500 mb-3">
                  显示被企业查阅最多的吉大重点优势学科领域
                </p>

                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={fieldDistributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={70}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {fieldDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(val: any) => [`${val} 家企业查阅`, '关注数量']}
                        contentStyle={{ fontSize: '12px', borderRadius: '8px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* 底部图例列表 */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                {fieldDistributionData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
                      <span className="text-slate-700 truncate text-[11px]">{item.name}</span>
                    </div>
                    <span className="font-bold text-slate-900 text-[11px] shrink-0">{item.value}家</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 图表 2: 近期企业检索行为趋势 (堆叠面积图) */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span>近期企业检索吉大专利日度走势</span>
                  </h3>
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <Activity className="w-3 h-3" /> 持续活跃
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mb-3">
                  展示近一周企业在佰腾检索吉大成果的频次与行为路径构成
                </p>

                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={dateTrendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorDirect" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorTech" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                      <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
                      <Area type="monotone" dataKey="直接检索吉大" stroke="#F59E0B" fillOpacity={1} fill="url(#colorDirect)" />
                      <Area type="monotone" dataKey="技术词命中吉大" stroke="#06B6D4" fillOpacity={1} fill="url(#colorTech)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* 底部指标说明 */}
              <div className="flex items-center justify-around pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-1.5 text-amber-700">
                  <span className="w-2.5 h-2.5 rounded-sm bg-amber-500"></span>
                  <span className="text-[11px]">直接输入吉大</span>
                </div>
                <div className="flex items-center gap-1.5 text-cyan-700">
                  <span className="w-2.5 h-2.5 rounded-sm bg-cyan-500"></span>
                  <span className="text-[11px]">技术词命中调阅</span>
                </div>
              </div>
            </div>

            {/* 图表 3: 被企业关注最热的发明人团队与企业省份 (横向柱图) */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-blue-600" />
                    <span>企业最关注的吉大发明人团队 (Top 5)</span>
                  </h3>
                  <span className="text-[11px] text-slate-400">被查阅次数</span>
                </div>
                <p className="text-[11px] text-slate-500 mb-3">
                  展示哪些老师的专利成果最常被外部企业深度调阅与关注
                </p>

                <div className="space-y-2.5">
                  {topInventorsData.map((inv, idx) => {
                    const maxVal = topInventorsData[0]?.count || 1;
                    const pct = Math.round((inv.count / maxVal) * 100);
                    return (
                      <div key={idx} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5">
                            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                              idx === 0 ? 'bg-amber-100 text-amber-800' :
                              idx === 1 ? 'bg-slate-200 text-slate-800' :
                              idx === 2 ? 'bg-amber-50 text-amber-900' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {idx + 1}
                            </span>
                            <span className="font-bold text-slate-900">{inv.name} 教授</span>
                            <span className="text-slate-400 text-[10px]">({inv.college})</span>
                          </div>
                          <span className="text-xs font-semibold text-blue-600">{inv.count} 篇专利被调阅</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-500"
                            style={{ width: `${Math.max(pct, 20)}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 关注企业地域前5 */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>关注企业主要来自：</span>
                <div className="flex items-center gap-1.5 font-medium text-slate-700">
                  {provinceDistribution.map((p, i) => (
                    <span key={i} className="px-1.5 py-0.5 bg-slate-100 rounded text-[10px]">
                      {p.name} ({p.count})
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 4. 核心列表：检索记录企业明细列表 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            <h2 className="text-base font-bold text-slate-900">
              检索记录企业明细列表
            </h2>
            <span className="text-xs text-slate-500">
              (共 <strong className="text-blue-600">{filteredLeads.length}</strong> 家关注企业，当前显示第 {filteredLeads.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} - {Math.min(currentPage * pageSize, filteredLeads.length)} 家)
            </span>
          </div>

          <div className="text-xs text-slate-400 hidden sm:block">
            数据来源：佰腾网专利检索日志 • 已剔除网络爬虫并完成实体消歧
          </div>
        </div>

        {filteredLeads.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
            <AlertCircle className="w-10 h-10 text-slate-300 mx-auto" />
            <div className="text-sm font-semibold text-slate-700">所选日期范围或筛选条件下无检索记录</div>
            <p className="text-xs text-slate-500">建议切换为“近7天”或“近30天全部”查看历史关注记录</p>
            <button
              onClick={() => {
                setSelectedSearchType('all');
                setDateRangePreset('last7days');
                setSearchFilter('');
              }}
              className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl hover:bg-blue-700 cursor-pointer"
            >
              查看近7天记录
            </button>
          </div>
        ) : (
          paginatedLeads.map((lead) => {
            const isExpanded = expandedLeadId === lead.id;
            const isDirect = lead.searchType === 'direct_keyword';

            // 获取该企业的多检索词 Sessions（若无则兜底构建一个单 session）
            const sessions: SearchSession[] = lead.searchSessions && lead.searchSessions.length > 0 
              ? lead.searchSessions 
              : [{
                  sessionId: `${lead.id}-default`,
                  searchKeyword: lead.searchKeyword,
                  searchType: lead.searchType,
                  searchDate: lead.searchDate,
                  searchTime: lead.searchTime,
                  viewDurationSeconds: lead.viewDurationSeconds,
                  matchedKeywords: lead.matchedKeywords,
                  patents: lead.viewedPatents,
                  aiAnalysis: {
                    intentSummary: `该企业针对【${lead.searchKeyword}】开展了深入技术检索，重点关注吉大在${lead.fieldName}领域的前沿专利。`,
                    techFocus: lead.matchedKeywords.slice(0, 3).join('、'),
                    cooperationOpportunity: lead.suggestedAction
                  }
                }];

            const activeSessionIndex = activeSessionIndexMap[lead.id] || 0;
            const currentSession = sessions[activeSessionIndex] || sessions[0];
            const totalCompanyPatentsCount = lead.viewedPatents.length;

            return (
              <div 
                key={lead.id}
                className="bg-white rounded-2xl border border-slate-200 transition-all duration-300 overflow-hidden shadow-2xs hover:shadow-md"
              >
                {/* 卡片头部：突出企业检索频次与调阅专利篇数，弱化路径标签 */}
                <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-50/70 via-white to-slate-50/30 border-b border-slate-100">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                    
                    {/* 左侧：企业名称与突出核心指标 */}
                    <div className="space-y-3 flex-1 min-w-0">
                      
                      {/* 企业主标题 + 地域 + 行业 */}
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 
                          onClick={() => setExpandedLeadId(isExpanded ? null : lead.id)}
                          className="text-lg sm:text-xl font-black text-slate-900 hover:text-blue-600 transition-colors cursor-pointer tracking-tight"
                        >
                          {lead.companyName}
                        </h3>

                        <span className="text-xs px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-md font-medium border border-slate-200">
                          {lead.industry}
                        </span>

                        <span className="text-xs text-slate-400">
                          📍 {lead.province} · {lead.city}
                        </span>

                        {/* 弱化后的路径标签：低调轻量辅助展示 */}
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] bg-slate-100/80 text-slate-500 border border-slate-200/60 font-normal">
                          <span className={`w-1.5 h-1.5 rounded-full ${isDirect ? 'bg-amber-500' : 'bg-cyan-500'}`}></span>
                          {isDirect ? '直接搜吉大' : '技术词命中'}
                        </span>
                      </div>

                      {/* 核心重点突出指标：检索次数 + 对应查看专利件数 + 停留时长 */}
                      <div className="flex flex-wrap items-center gap-3">
                        {/* 突出指标 1：检索频次 */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200/80 text-blue-900 shadow-2xs">
                          <Search className="w-3.5 h-3.5 text-blue-600" />
                          <span className="text-xs text-slate-600">检索频次：</span>
                          <span className="text-sm font-black text-blue-700">{sessions.length}</span>
                          <span className="text-xs text-blue-600/80">次 ({sessions.length} 组检索词)</span>
                        </div>

                        {/* 突出指标 2：对应查阅专利件数 */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200/80 text-indigo-900 shadow-2xs">
                          <FileText className="w-3.5 h-3.5 text-indigo-600" />
                          <span className="text-xs text-slate-600">对应查看专利：</span>
                          <span className="text-sm font-black text-indigo-700">{totalCompanyPatentsCount}</span>
                          <span className="text-xs text-indigo-600/80">件吉大成果</span>
                        </div>

                        {/* 辅助指标：停留时长 & 最近检索 */}
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200/70 text-slate-600 text-xs">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>累计停留 <strong className="text-slate-800">{lead.viewDurationSeconds}秒</strong></span>
                          <span className="text-slate-300">|</span>
                          <span className="text-slate-400">最近: {lead.searchTime}</span>
                        </div>
                      </div>

                    </div>

                    {/* 右侧操作按钮 */}
                    <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-2 shrink-0 pt-2 lg:pt-0">
                      <button
                        onClick={() => setExpandedLeadId(isExpanded ? null : lead.id)}
                        className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer border shadow-2xs ${
                          isExpanded 
                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                            : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300'
                        }`}
                      >
                        <FolderSearch className={`w-4 h-4 ${isExpanded ? 'text-white' : 'text-blue-600'}`} />
                        <span>{isExpanded ? '收起专利与详情记录' : '查看专利与详情记录'}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>

                      <div className="text-[11px] text-slate-400">
                        点击展开时间线与查阅专利
                      </div>
                    </div>

                  </div>
                </div>

                {/* 展开区域：企业检索时间线图表 ➔ 搜索词 Tab 页 ➔ 该搜索词下查阅的吉大专利 ➔ AI 综合研判整合模块 */}
                {isExpanded && (
                  <div className="p-5 sm:p-6 space-y-6 bg-white animate-in fade-in duration-200">
                    
                    {/* 1. 【新增】企业检索与专利调阅时序走势图表 (某一天检索了多少次，又查看了多少件专利) */}
                    <EnterpriseActivityTimeline 
                      lead={lead} 
                      onJumpToPatent={handleJumpToPatent} 
                    />

                    {/* 2. 搜索词 Tab 页导航条 */}
                    <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/90 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                          <Search className="w-4 h-4 text-blue-600" />
                          <span>企业在佰腾的搜索词记录（切换不同搜索词查看对应调阅专利与分析）：</span>
                        </div>
                        <span className="text-[11px] text-slate-400">
                          共记录到 {sessions.length} 组独立检索词行为
                        </span>
                      </div>

                      {/* Tab 选项卡 */}
                      <div className="flex flex-wrap items-center gap-2">
                        {sessions.map((sess, sIdx) => {
                          const isCur = sIdx === activeSessionIndex;
                          return (
                            <button
                              key={sess.sessionId}
                              onClick={() => setActiveSessionIndexMap(prev => ({ ...prev, [lead.id]: sIdx }))}
                              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 border ${
                                isCur
                                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm ring-2 ring-blue-300/40'
                                  : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
                              }`}
                            >
                              <span className={`w-2 h-2 rounded-full ${
                                sess.searchType === 'direct_keyword' ? 'bg-amber-400' : 'bg-cyan-400'
                              }`}></span>
                              <span>"{sess.searchKeyword}"</span>
                              <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                                isCur ? 'bg-blue-700 text-blue-100' : 'bg-slate-100 text-slate-600'
                              }`}>
                                {sess.patents.length} 篇专利
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* 当前选中搜索词的行为元信息 */}
                      <div className="pt-2 border-t border-slate-200/70 flex flex-wrap items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center gap-3">
                          <span>
                            检索时间：<strong className="text-slate-800">{currentSession.searchTime}</strong>
                          </span>
                          <span>•</span>
                          <span>
                            检索停留：<strong className="text-slate-800">{currentSession.viewDurationSeconds} 秒</strong>
                          </span>
                          <span>•</span>
                          <span>
                            检索路径：<strong className={currentSession.searchType === 'direct_keyword' ? 'text-amber-700 font-semibold' : 'text-cyan-700 font-semibold'}>
                              {currentSession.searchType === 'direct_keyword' ? '直接检索吉大关键词' : '技术词命中吉大专利'}
                            </strong>
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-slate-600">命中关联技术词：</span>
                          {currentSession.matchedKeywords.map((kw, i) => (
                            <span key={i} className="px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700 text-[11px]">
                              #{kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 3. 在该搜索词下查阅的吉大专利清单 */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                          <FileText className="w-4 h-4 text-blue-600" />
                          <span>在该搜索词下查阅的吉大专利 ({currentSession.patents.length} 篇)</span>
                        </div>
                        <span className="text-xs text-slate-400">
                          点击专利标题可直接调阅吉大专库成果档案
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentSession.patents.map((pat, pIdx) => (
                          <div 
                            key={pIdx}
                            className="bg-slate-50/80 rounded-xl p-4 border border-slate-200 hover:border-blue-400 transition-all space-y-2.5 group"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="text-xs font-mono font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                                {pat.patentNo}
                              </span>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                                {pat.status}
                              </span>
                            </div>

                            <h4 
                              onClick={() => handleJumpToPatent(pat.patentNo)}
                              className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer line-clamp-2 leading-snug"
                            >
                              {pat.title}
                            </h4>

                            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                              {pat.abstractHighlight}
                            </p>

                            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                              <div>
                                发明人：<strong className="text-slate-800">{pat.inventor}</strong> ({pat.college.split('/')[0]})
                              </div>
                              <button
                                onClick={() => handleJumpToPatent(pat.patentNo)}
                                className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 cursor-pointer"
                              >
                                <span>调阅成果档案</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 4. 【整合模块】AI 智能综合研判与对接推进中枢 (聚合痛点、研发方向、推进建议与联系方式) */}
                    <div className="bg-gradient-to-br from-indigo-50/80 via-blue-50/50 to-slate-50 rounded-2xl p-5 border border-indigo-200/80 shadow-xs space-y-4">
                      
                      {/* 模块头部 */}
                      <div className="flex items-center justify-between pb-3 border-b border-indigo-100">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                            <Sparkles className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                              <span>AI 智能综合研判与对接决策中枢</span>
                              <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 text-[10px] rounded-full font-semibold border border-indigo-200">
                                深度聚合：检索词 + 调阅专利 + 企业业务背景
                              </span>
                            </h4>
                            <p className="text-xs text-slate-500">
                              为高校老师与技术转移办提供从意图识别到闭门对接的全流程落地依据
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* 研判内容第一行：痛点、核心指标、企业业务画像 */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        
                        {/* 卡片 1: 搜索意图与痛点 */}
                        <div className="bg-white/90 backdrop-blur-xs rounded-xl p-4 border border-indigo-100 space-y-2">
                          <div className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                            <Target className="w-3.5 h-3.5 text-indigo-600" />
                            <span>企业搜索意图与技术痛点</span>
                          </div>
                          <p className="text-xs text-slate-700 leading-relaxed">
                            {currentSession.aiAnalysis.intentSummary}
                          </p>
                        </div>

                        {/* 卡片 2: 关注的核心技术指标 */}
                        <div className="bg-white/90 backdrop-blur-xs rounded-xl p-4 border border-indigo-100 space-y-2">
                          <div className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                            <Lightbulb className="w-3.5 h-3.5 text-blue-600" />
                            <span>攻关核心技术指标与诉求</span>
                          </div>
                          <p className="text-xs text-slate-700 leading-relaxed">
                            {currentSession.aiAnalysis.techFocus}
                          </p>
                        </div>

                        {/* 卡片 3: 企业研发方向与业务背景 */}
                        <div className="bg-white/90 backdrop-blur-xs rounded-xl p-4 border border-indigo-100 space-y-2">
                          <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-blue-600" />
                            <span>企业前瞻研发背景与方向</span>
                          </div>
                          <p className="text-xs text-slate-700 leading-relaxed">
                            {lead.enterpriseProfileSummary}
                          </p>
                        </div>

                      </div>

                      {/* 研判内容第二行：对接推进参考建议 + 合作契机 + 联络信息 */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-1">
                        
                        {/* 转化契机 */}
                        <div className="bg-white/90 backdrop-blur-xs rounded-xl p-4 border border-emerald-200/80 space-y-2">
                          <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>转化对接推进契机研判</span>
                          </div>
                          <p className="text-xs text-slate-700 leading-relaxed font-medium">
                            {currentSession.aiAnalysis.cooperationOpportunity}
                          </p>
                        </div>

                        {/* 高校老师与转化办具体对接行动建议 */}
                        <div className="lg:col-span-2 bg-emerald-50/80 rounded-xl p-4 border border-emerald-200 space-y-2.5">
                          <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                            <Zap className="w-4 h-4 text-emerald-600" />
                            <span>高校老师 / 转化办闭环对接推进建议</span>
                          </div>
                          
                          <p className="text-xs text-emerald-950 leading-relaxed font-medium">
                            {lead.suggestedAction}
                          </p>

                          {/* 对接部门与联络线索 */}
                          {lead.contactPerson && (
                            <div className="pt-2 border-t border-emerald-200/80 flex flex-wrap items-center justify-between gap-2 text-xs text-emerald-900">
                              <div className="flex items-center gap-2">
                                <span>建议对接部门/负责人：<strong>{lead.contactPerson}</strong></span>
                              </div>
                              <div className="flex items-center gap-3">
                                {lead.phone && (
                                  <span className="font-mono text-emerald-800 flex items-center gap-1">
                                    <Phone className="w-3 h-3 text-emerald-600" />
                                    {lead.phone}
                                  </span>
                                )}
                                {lead.email && (
                                  <span className="font-mono text-emerald-800 flex items-center gap-1">
                                    <Mail className="w-3 h-3 text-emerald-600" />
                                    {lead.email}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                      </div>

                    </div>

                    {/* 5. 底部快速操作通道 */}
                    <div className="pt-3 flex flex-wrap items-center justify-end gap-3 border-t border-slate-100">
                      <button
                        onClick={() => {
                          if (onLaunchAiAgentWithQuery) {
                            onLaunchAiAgentWithQuery(`为吉林大学老师起草一份针对【${lead.companyName}】的专利技术合作意向函，结合他们检索的【${currentSession.searchKeyword}】与吉大【${currentSession.patents[0]?.title || ''}】`);
                          } else {
                            setActiveTab('ai-agent');
                          }
                        }}
                        className="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-blue-200 transition-colors cursor-pointer"
                      >
                        <Mail className="w-3.5 h-3.5 text-blue-600" />
                        <span>起草该搜索词合作意向函/公函</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab('patent-similar');
                        }}
                        className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Compass className="w-3.5 h-3.5 text-slate-600" />
                        <span>查看该专利在全国的相似企业分布</span>
                      </button>
                    </div>

                  </div>
                )}

              </div>
            );
          })
        )}

        {/* 分页导航控制器 */}
        {filteredLeads.length > 0 && (
          <div className="bg-white rounded-2xl p-4 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-2xs">
            <div className="text-slate-500 flex items-center gap-2">
              <span>
                显示第 <strong className="text-slate-800">{(currentPage - 1) * pageSize + 1}</strong> 到 <strong className="text-slate-800">{Math.min(currentPage * pageSize, filteredLeads.length)}</strong> 条
              </span>
              <span>/</span>
              <span>共 <strong className="text-blue-600">{filteredLeads.length}</strong> 家企业</span>
            </div>

            <div className="flex items-center gap-1.5">
              {/* 上一页 */}
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1 transition-colors ${
                  currentPage === 1
                    ? 'text-slate-300 bg-slate-50 cursor-not-allowed border border-slate-100'
                    : 'text-slate-700 bg-slate-100 hover:bg-slate-200 cursor-pointer border border-slate-200'
                }`}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>上一页</span>
              </button>

              {/* 页码按钮 */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                const isActive = pageNum === currentPage;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {/* 下一页 */}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1 transition-colors ${
                  currentPage === totalPages
                    ? 'text-slate-300 bg-slate-50 cursor-not-allowed border border-slate-100'
                    : 'text-slate-700 bg-slate-100 hover:bg-slate-200 cursor-pointer border border-slate-200'
                }`}
              >
                <span>下一页</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>

      {/* 5. 底部说明 */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-slate-50 rounded-2xl p-6 border border-blue-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            <span>以企业真实检索行为为线索</span>
          </div>
          <h3 className="text-base font-bold text-slate-900">
            关注企业检索行为的价值
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            研发人员在佰腾网上检索特定工艺并深入调阅吉林大学专利时，代表企业对该项技术正在进行前期调研与选型。高校老师可结合搜索词 Tab 页、查阅专利清单、调阅动因深度归因图表与 AI 综合研判中枢，自主判断对接时机并主动出击。
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('overview')}
            className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>进入高校转化全景驾驶舱</span>
            <ArrowRight className="w-4 h-4 text-slate-500" />
          </button>
        </div>
      </div>

    </div>
  );
};
