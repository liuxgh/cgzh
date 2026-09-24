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
  ChevronUp,
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
  ShieldCheck,
  Download,
  Flame,
  Check,
  Copy,
  HelpCircle,
  Eye,
  Crosshair,
  Share2,
  Lock,
  ArrowUpRight,
  Info,
  GraduationCap
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell, 
  CartesianGrid
} from 'recharts';
import { TabType, PatentItem, TargetEnterprise } from '../types';
import { 
  BAITEN_SEARCH_DAILY_LEADS, 
  BaitenVisitorRecord, 
  SearchSession,
  ViewedPatentItem 
} from '../data/baitenVisitorTrackerData';
import { 
  IPC_FIELD_ATTENTION_DATA,
  HEATMAP_ENTERPRISES,
  SUSPICIOUS_ATTENTION_CASES,
  MARKET_TECH_DEMANDS_MATCH,
  TARGET_ENTERPRISE_LEAD_TAGS,
  PUSH_RESULTS_DATA,
  TAB1_VISITOR_CARDS_DATA,
  TechDemandMatchItem,
  TargetEnterpriseLeadTag,
  PushResultItem,
  Tab1VisitorCardItem
} from '../data/radarConvertData';
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
  // 当前高校固定为吉林大学
  const selectedUniversity = '吉林大学';

  // 三大核心转化雷达 Tab:
  // 1: ① 有人在看我的成果
  // 2: ② 市场在找什么 ↔ 我的成果
  // 3: ③ 我的成果该推给谁
  const [radarSubTab, setRadarSubTab] = useState<'tab1_visitors' | 'tab2_market_demand' | 'tab3_push_target'>('tab1_visitors');

  // ---------------------------------------------------------------------------
  // TAB 1 相关状态
  // ---------------------------------------------------------------------------
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<string>('all');
  const [selectedEntityType, setSelectedEntityType] = useState<'enterprise_only' | 'all'>('all');
  const [onlyFulltextDownloaded, setOnlyFulltextDownloaded] = useState<boolean>(false);
  const [onlyInvoiceClients, setOnlyInvoiceClients] = useState<boolean>(false);
  const [tab1SearchText, setTab1SearchText] = useState<string>('');
  const [tab1CurrentPage, setTab1CurrentPage] = useState<number>(1);
  const [tab1PageSize, setTab1PageSize] = useState<number>(5);
  const [expandedLeadId, setExpandedLeadId] = useState<string | null>('lead-06'); // 默认展开展示浙江华姆
  const [hoveredHeatmapCell, setHoveredHeatmapCell] = useState<{ company: string; field: string; count: number } | null>(null);
  const [selectedHeatmapField, setSelectedHeatmapField] = useState<string | null>(null);
  const [isIndicatorsDocOpen, setIsIndicatorsDocOpen] = useState<boolean>(false);

  // ---------------------------------------------------------------------------
  // TAB 2 相关状态 (市场在找什么 ↔ 我的成果)
  // ---------------------------------------------------------------------------
  const [tab2SearchText, setTab2SearchText] = useState<string>('');
  const [tab2FilterType, setTab2FilterType] = useState<'all' | 'has_invoice_client'>('all');

  // ---------------------------------------------------------------------------
  // TAB 3 相关状态 (我的成果该推给谁)
  // ---------------------------------------------------------------------------
  const [tab3SelectedEnterpriseId, setTab3SelectedEnterpriseId] = useState<string | null>(null);
  const [tab3SearchText, setTab3SearchText] = useState<string>('');
  const [tab3OnlyMainPush, setTab3OnlyMainPush] = useState<boolean>(false);
  const [tab3HideAgencies, setTab3HideAgencies] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // 复制辅助函数
  const handleCopyText = (text: string, key: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  // ---------------------------------------------------------------------------
  // TAB 1 过滤计算
  // ---------------------------------------------------------------------------
  const tab1FilteredLeads = useMemo(() => {
    return TAB1_VISITOR_CARDS_DATA.filter(lead => {
      if (selectedEntityType === 'enterprise_only' && lead.entityType !== '企业') return false;
      if (onlyFulltextDownloaded && (typeof lead.metrics.downloadFulltext === 'number' ? lead.metrics.downloadFulltext <= 0 : false)) return false;
      if (onlyInvoiceClients && !lead.isInvoiceClient) return false;
      if (selectedRiskFilter === 'high' && lead.badgeType !== '代理疑虑') return false;

      if (tab1SearchText.trim()) {
        const q = tab1SearchText.toLowerCase();
        const matchComp = lead.companyName.toLowerCase().includes(q);
        const matchSummary = lead.summary.toLowerCase().includes(q);
        const matchPatent = lead.viewedPatents.some(p => p.title.toLowerCase().includes(q) || p.patentNo.toLowerCase().includes(q));
        if (!matchComp && !matchSummary && !matchPatent) return false;
      }
      return true;
    });
  }, [selectedEntityType, onlyFulltextDownloaded, onlyInvoiceClients, selectedRiskFilter, tab1SearchText]);

  const tab1TotalPages = Math.ceil(tab1FilteredLeads.length / tab1PageSize) || 1;
  const tab1PaginatedLeads = useMemo(() => {
    const start = (tab1CurrentPage - 1) * tab1PageSize;
    return tab1FilteredLeads.slice(start, start + tab1PageSize);
  }, [tab1FilteredLeads, tab1CurrentPage, tab1PageSize]);

  // TAB 1 导出 CSV
  const handleExportTab1 = () => {
    const headers = [
      '序号', '企业名称', '开票客户', '主体性质', '调研类型', '查看次数', 
      '涉及专利数', '下载全文次数', '深读层级', '关注时间跨度', 'IP数', 
      '研判摘要', '他为什么盯我', '我该做什么'
    ];
    const rows = tab1FilteredLeads.map((lead, idx) => {
      return [
        idx + 1,
        `"${(lead.companyName || '').replace(/"/g, '""')}"`,
        lead.isInvoiceClient ? '是' : '否',
        `"${lead.profile.whoIsHe.entityNature}"`,
        `"${lead.badgeType}"`,
        lead.metrics.viewCount,
        `"${lead.metrics.viewPatentCountText}"`,
        lead.metrics.downloadFulltext,
        `"${lead.metrics.deepReadLevel} (${lead.metrics.deepReadSubText})"`,
        `"${lead.metrics.dateSpan}"`,
        `"${lead.metrics.timeAndIpSpan}"`,
        `"${lead.summary.replace(/"/g, '""')}"`,
        `"${lead.profile.whyHeFollowsMe.behaviorSummary.replace(/"/g, '""')}"`,
        `"${lead.profile.whatShouldIDo.recommendation.replace(/"/g, '""')}"`
      ].join(',');
    });
    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `访客企业调研明细_${selectedUniversity}_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // ---------------------------------------------------------------------------
  // TAB 2 过滤计算
  // ---------------------------------------------------------------------------
  const tab2FilteredDemands = useMemo(() => {
    return MARKET_TECH_DEMANDS_MATCH.filter(item => {
      if (tab2FilterType === 'has_invoice_client') {
        const hasInvoice = item.companies.some(c => c.isInvoiceClient);
        if (!hasInvoice) return false;
      }
      if (tab2SearchText.trim()) {
        const q = tab2SearchText.toLowerCase();
        const matchKw = item.keyword.toLowerCase().includes(q);
        const matchPatent = item.matchedPatent.title.toLowerCase().includes(q) || item.matchedPatent.patentNo.toLowerCase().includes(q);
        const matchComp = item.companies.some(c => c.name.toLowerCase().includes(q));
        if (!matchKw && !matchPatent && !matchComp) return false;
      }
      return true;
    });
  }, [tab2FilterType, tab2SearchText]);

  // TAB 2 导出 CSV
  const handleExportTab2 = () => {
    const headers = ['序号', '技术需求词', '搜过企业数', '重点检索企业', '我方匹配成果专利号', '我方匹配成果名称', '发明人', '所属学院'];
    const rows = tab2FilteredDemands.map((item, idx) => {
      const comps = item.companies.map(c => `${c.name}(${c.searchCount}次 · ${c.lastSearchDate})`).join('; ');
      return [
        idx + 1,
        `"${item.keyword}"`,
        item.searchCompanyCount,
        `"${comps.replace(/"/g, '""')}"`,
        `"${item.matchedPatent.patentNo}"`,
        `"${item.matchedPatent.title.replace(/"/g, '""')}"`,
        `"${item.matchedPatent.inventor}"`,
        `"${item.matchedPatent.college}"`
      ].join(',');
    });
    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `市场需求与我方成果匹配表_${selectedUniversity}_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // ---------------------------------------------------------------------------
  // TAB 3 过滤计算
  // ---------------------------------------------------------------------------
  const tab3FilteredPushResults = useMemo(() => {
    return PUSH_RESULTS_DATA.filter(item => {
      if (tab3HideAgencies) {
        // filter out agency companies in main recommendations
      }
      if (tab3SelectedEnterpriseId) {
        const ent = TARGET_ENTERPRISE_LEAD_TAGS.find(e => e.id === tab3SelectedEnterpriseId);
        if (ent) {
          const matchMain = item.mainRecommendedCompanies.some(c => c.name.includes(ent.name.slice(0, 4)));
          const matchBackup = item.sameFieldBackupCompanies.some(c => c.includes(ent.name.slice(0, 4)));
          if (!matchMain && !matchBackup) return false;
        }
      }
      if (tab3SearchText.trim()) {
        const q = tab3SearchText.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchPatent = item.patentNo.toLowerCase().includes(q);
        const matchKw = item.techKeywords.some(k => k.toLowerCase().includes(q));
        const matchComp = item.mainRecommendedCompanies.some(c => c.name.toLowerCase().includes(q));
        if (!matchTitle && !matchPatent && !matchKw && !matchComp) return false;
      }
      return true;
    });
  }, [tab3SelectedEnterpriseId, tab3SearchText, tab3HideAgencies]);

    // TAB 3 导出 CSV
  const handleExportTab3 = () => {
    const headers = ['序号', '成果专利号', '成果名称', 'IPC分类', '核心技术词', '主推企业推荐', '同领域备选企业'];
    const rows = tab3FilteredPushResults.map((item, idx) => {
      const mainComps = item.mainRecommendedCompanies.map(c => `[${c.tag}] ${c.name} (${c.searchStats}, 手机:${c.contactPhone || '—'})`).join('; ');
      const backupComps = item.sameFieldBackupCompanies.join('; ');
      return [
        idx + 1,
        `"${item.patentNo}"`,
        `"${item.title.replace(/"/g, '""')}"`,
        `"${item.ipc}"`,
        `"${item.techKeywords.join('、')}"`,
        `"${mainComps.replace(/"/g, '""')}"`,
        `"${backupComps.replace(/"/g, '""')}"`
      ].join(',');
    });
    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `我的成果该推给谁_${selectedUniversity}_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Helper to get Tag badge styling
  const renderEvidenceBadge = (type: 'double' | 'extreme_search' | 'viewed' | 'agency') => {
    switch (type) {
      case 'double':
        return <span className="px-1.5 py-0.5 rounded text-[11px] font-black bg-purple-600 text-white shadow-2xs">双重</span>;
      case 'extreme_search':
        return <span className="px-1.5 py-0.5 rounded text-[11px] font-black bg-blue-600 text-white shadow-2xs">极搜</span>;
      case 'viewed':
        return <span className="px-1.5 py-0.5 rounded text-[11px] font-black bg-emerald-600 text-white shadow-2xs">看过</span>;
      case 'agency':
        return <span className="px-1.5 py-0.5 rounded text-[11px] font-bold bg-slate-200 text-slate-700">代</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto animate-in fade-in duration-300 pb-12">
      
      {/* ========================================================================= */}
      {/* 0. 顶部高校雷达总览导航与高校切换条 */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <RadarIcon className="w-5 h-5 text-blue-600" />
              成果转化雷达 <span className="text-xs font-bold text-white bg-blue-600 px-2 py-0.5 rounded-full">吉林大学</span>
            </h1>
            <span className="text-xs text-slate-500 hidden sm:inline">
              看清三件事：谁在看你的成果、市场正在找什么技术、你的哪件成果该推给谁
            </span>
          </div>
        </div>

        {/* 核心三 Tab 切换导航 */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setRadarSubTab('tab1_visitors')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              radarSubTab === 'tab1_visitors'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span>① 有人在看我的成果</span>
          </button>

          <button
            type="button"
            onClick={() => setRadarSubTab('tab2_market_demand')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              radarSubTab === 'tab2_market_demand'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span>② 市场在找什么 ↔ 我的成果</span>
          </button>

          <button
            type="button"
            onClick={() => setRadarSubTab('tab3_push_target')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              radarSubTab === 'tab3_push_target'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span>③ 我的成果该推给谁</span>
          </button>
        </div>

        {/* Sub-tab Explanatory Banner */}
        <div className="text-xs text-slate-600 bg-slate-50/80 p-3 rounded-xl border border-slate-200/80">
          {radarSubTab === 'tab1_visitors' && (
            <p>
              <strong className="text-blue-700 font-bold">① 有人在看我的成果</strong> —— 哪些企业在翻你的专利、看了多深、有没有下载全文、有没有定向搜你的字号。这是跟进清单: 谁值得打一个电话，企业主动来看高校专利，是最直接的转化线索。
            </p>
          )}
          {radarSubTab === 'tab2_market_demand' && (
            <p>
              <strong className="text-emerald-700 font-bold">② 市场在找什么 ↔ 我的成果</strong> —— 把全站检索行为聚合成 600 个技术需求词，再和你的成果库做匹配。会直接告诉你「有人在找 X 技术，你有相关专利」。高校有成果但不知道卖给谁，而佰腾知道全市场在搜什么 —— 这个匹配只有佰腾能做。
            </p>
          )}
          {radarSubTab === 'tab3_push_target' && (
            <p>
              <strong className="text-purple-700 font-bold">③ 我的成果该推给谁</strong> —— 逐件成果算出应该推给哪些企业，并区分存量线索(已经接触过你)和增量线索(从未看过你任何专利的企业)。增量机会才是真正能创造价值的部分。
            </p>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 视图 1: ① 有人在看我的成果 */}
      {/* ========================================================================= */}
      {radarSubTab === 'tab1_visitors' && (
        <div className="space-y-6">

          {/* 1. 核心洞察卡片 (他们把注意力放在你哪些技术上) */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                <h2 className="text-base font-bold text-slate-900">
                  他们把注意力放在你哪些技术上
                </h2>
                <span className="text-xs text-slate-400">按 IPC 大类 · 细分分类统计真实浏览</span>
              </div>
            </div>

            {/* 洞察高亮结论 */}
            <div className="p-3.5 bg-rose-50/60 border border-rose-200/80 rounded-xl text-xs text-rose-950 leading-relaxed space-y-1">
              <div>
                最受关注的是 <strong className="font-extrabold text-rose-800">B60W (4家企业)</strong>、<strong className="font-extrabold text-rose-800">A61K (3家企业 + 2家代理)</strong>、<strong className="font-extrabold text-rose-800">C12Q (3家企业)</strong>，其中 <strong>B60W、C12Q、B62D</strong> 只有企业在看、没有代理机构跟风 —— 这几类更可能是真实的技术需求。按‘单位专利被关注度’算，<strong className="font-bold text-blue-700">C12Q 最高（你方 21 件，3 家企业关注）</strong>。
              </div>
              <div className="text-[11px] text-slate-500 pt-1 border-t border-rose-200/60">
                口径：只算有深度浏览记录的深读（打开过权利要求/说明书），批量导出不计入 —— 导出只说明专利被拿走，不说明关注了哪个技术方向。
              </div>
            </div>

            {/* 图表 1: 各技术领域被多少家关注 (堆叠条形图) */}
            <div className="pt-2 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="font-bold text-slate-800 flex items-center gap-2">
                  <span>① 各技术领域被多少家关注</span>
                  <span className="text-slate-400 font-normal">(堆叠 = 企业 / 代理机构)</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 bg-blue-600 rounded-sm inline-block"></span>
                    <span className="text-slate-600 font-medium">企业 (产学研的真实买方)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 bg-slate-300 rounded-sm inline-block"></span>
                    <span className="text-slate-500 font-medium">代理机构 (多为批量扫)</span>
                  </span>
                </div>
              </div>

              {/* 堆叠图表渲染 */}
              <div className="h-80 w-full pt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={IPC_FIELD_ATTENTION_DATA}
                    layout="vertical"
                    margin={{ top: 5, right: 90, left: 30, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                    <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} allowDecimals={false} />
                    <YAxis dataKey="ipc" type="category" tick={{ fontSize: 11, fill: '#334155', fontWeight: 600 }} />
                    <Tooltip
                      formatter={(val: any, name: string) => {
                        if (name === 'enterpriseCount') return [`${val} 家企业`, '企业主体关注数'];
                        if (name === 'agencyCount') return [`${val} 家代理`, '代理服务机构'];
                        return [val, name];
                      }}
                      labelFormatter={(label) => {
                        const item = IPC_FIELD_ATTENTION_DATA.find(i => i.ipc === label);
                        return `【${label}】${item?.name || ''} (我方专利总底数: ${item?.myPatentsCount || 0} 件)`;
                      }}
                    />
                    <Bar dataKey="enterpriseCount" stackId="a" fill="#2563eb" name="enterpriseCount" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="agencyCount" stackId="a" fill="#cbd5e1" name="agencyCount" radius={[0, 4, 4, 0]}>
                      {IPC_FIELD_ATTENTION_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="#cbd5e1" />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* 图表右侧注释补全 */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                {IPC_FIELD_ATTENTION_DATA.slice(0, 6).map(item => (
                  <div key={item.ipc} className="bg-slate-50 p-1.5 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-800">{item.ipc}</span>: 你方 <strong className="text-blue-700">{item.myPatentsCount}</strong> 件
                  </div>
                ))}
              </div>
            </div>

            {/* 图表 2: 谁在盯你的哪个技术 (Heatmap 交互矩阵) */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <span>② 谁在盯你的哪个技术</span>
                  <span className="text-slate-400 font-normal">颜色越深 = 看得越多</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  横轴 = 你的技术领域，纵轴 = 关注方企业 (只列企业，按关注广度排序)
                </div>
              </div>

              <p className="text-[11px] text-slate-500 italic">
                💡 研判规则：只有一两个格子的，通常是有明确技术需求的企业买方；横向铺满一整行的，多为代理机构或泛泛扫描。
              </p>

              {/* 矩阵表格 */}
              <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white shadow-2xs">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-2.5 min-w-[160px]">关注企业</th>
                      {IPC_FIELD_ATTENTION_DATA.slice(0, 10).map(f => (
                        <th key={f.ipc} className="p-2 text-center min-w-[54px]">
                          <span className="block">{f.ipc}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {HEATMAP_ENTERPRISES.map(ent => (
                      <tr key={ent.companyName} className="hover:bg-blue-50/40 transition-colors">
                        <td className="p-2.5 font-medium text-slate-900 flex items-center justify-between gap-2">
                          <span className="truncate" title={ent.companyName}>{ent.companyName}</span>
                          {ent.type === 'university' && (
                            <span className="text-[10px] px-1 py-0.2 rounded bg-amber-100 text-amber-800">高校</span>
                          )}
                        </td>
                        {IPC_FIELD_ATTENTION_DATA.slice(0, 10).map(f => {
                          const val = ent.values[f.ipc] || 0;
                          let bgClass = 'bg-slate-50 text-transparent';
                          if (val === 1) bgClass = 'bg-blue-100 text-blue-800 font-bold';
                          if (val === 2) bgClass = 'bg-blue-300 text-blue-900 font-bold';
                          if (val >= 3) bgClass = 'bg-blue-600 text-white font-extrabold';

                          return (
                            <td 
                              key={f.ipc} 
                              className="p-1 text-center"
                              title={`${ent.companyName} 在 ${f.ipc} 领域调阅查看了 ${val} 次`}
                            >
                              <div className={`w-8 h-7 mx-auto rounded flex items-center justify-center text-xs transition-transform hover:scale-110 ${bgClass}`}>
                                {val > 0 ? val : ''}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 图表 3: 被超额关注的技术领域 (关注方数 ÷ 我方专利数) */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <span>③ 被超额关注的技术领域</span>
                  <span className="text-blue-600 font-semibold">(关注方数 ÷ 我方专利数)</span>
                </div>
                <span className="text-[11px] text-slate-400">这些方向外部需求密度最高，最值得优先接洽</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {IPC_FIELD_ATTENTION_DATA.filter(f => f.ratio >= 0.03).sort((a, b) => b.ratio - a.ratio).map(item => (
                  <div key={item.ipc} className="p-3 bg-slate-50 hover:bg-blue-50/60 rounded-xl border border-slate-200 space-y-1.5 transition-colors">
                    <div className="flex items-center justify-between text-xs">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <span className="text-blue-600 font-extrabold">{item.ipc}</span>
                        <span className="text-slate-600 text-[11px] truncate max-w-[140px]">{item.name}</span>
                      </div>
                      <span className="font-black text-blue-700 text-xs">{item.ratio.toFixed(2)}</span>
                    </div>

                    {/* 进度条 */}
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-blue-600 h-full rounded-full" 
                        style={{ width: `${Math.min(100, item.ratio * 500)}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>你方 {item.myPatentsCount} 件</span>
                      <span>被 <strong className="text-slate-800">{item.enterpriseCount}</strong> 家企业关注</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* 2. 我的档案 · 吉林大学 */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-slate-700">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-black text-sm text-slate-900 flex items-center gap-1">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                我的档案 · {selectedUniversity}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                自有专利 <strong className="text-slate-900">2,148</strong> 件
              </span>
              <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-800">
                被 <strong className="text-blue-700 font-bold">294</strong> 个主体查看
              </span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800">
                全文被下载 <strong className="text-emerald-700 font-bold">488</strong> 次
              </span>
            </div>
          </div>

          {/* 3. 核心列表：检索记录企业明细列表与企业深度画像 */}
          <div className="space-y-4">
            
            {/* 筛选过滤条 */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {/* Search input */}
                  <div className="relative w-full md:w-64">
                    <input
                      type="text"
                      value={tab1SearchText}
                      onChange={(e) => {
                        setTab1SearchText(e.target.value);
                        setTab1CurrentPage(1);
                      }}
                      placeholder="按来源关注者 / 检索过的词..."
                      className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 font-medium"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
                  </div>

                  {/* 危险程度筛选 */}
                  <select
                    value={selectedRiskFilter}
                    onChange={(e) => {
                      setSelectedRiskFilter(e.target.value);
                      setTab1CurrentPage(1);
                    }}
                    className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-bold focus:outline-none"
                  >
                    <option value="all">按危险程度 (全部)</option>
                    <option value="high">高危持续关注</option>
                    <option value="medium">中度定向调研</option>
                  </select>

                  {/* 企业类型 */}
                  <select
                    value={selectedEntityType}
                    onChange={(e) => {
                      setSelectedEntityType(e.target.value as any);
                      setTab1CurrentPage(1);
                    }}
                    className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-bold focus:outline-none"
                  >
                    <option value="all">全部类型 (企业/中介/高校)</option>
                    <option value="enterprise_only">只看企业</option>
                  </select>

                  {/* Checkbox: 只看下载过全文 */}
                  <label className="inline-flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={onlyFulltextDownloaded}
                      onChange={(e) => {
                        setOnlyFulltextDownloaded(e.target.checked);
                        setTab1CurrentPage(1);
                      }}
                      className="rounded text-blue-600"
                    />
                    <span>只看下载过全文</span>
                  </label>

                  {/* Checkbox: 只看开票客户 */}
                  <label className="inline-flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={onlyInvoiceClients}
                      onChange={(e) => {
                        setOnlyInvoiceClients(e.target.checked);
                        setTab1CurrentPage(1);
                      }}
                      className="rounded text-blue-600"
                    />
                    <span>只看开票客户</span>
                  </label>
                </div>

                {/* 导出按钮 */}
                <button
                  type="button"
                  onClick={handleExportTab1}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs whitespace-nowrap"
                  title="导出当前检索明细为 CSV 表格"
                >
                  <Download className="w-3.5 h-3.5 text-blue-600" />
                  <span>导出明细 ({tab1FilteredLeads.length}家)</span>
                </button>
              </div>

              <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-100">
                <span>已默认隐藏非企业主体 · 切「全部类型」可看全部主体</span>
                <span>当前显示 {tab1FilteredLeads.length} 家关注主体</span>
              </div>
            </div>

            {/* 企业明细卡片流 */}
            <div className="space-y-4">
              {tab1PaginatedLeads.map((lead) => {
                const isExpanded = expandedLeadId === lead.id;

                return (
                  <div 
                    key={lead.id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all duration-200 hover:border-blue-300"
                  >
                    {/* 卡片头部 */}
                    <div className="p-5 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            className="px-2.5 py-0.5 rounded text-xs font-bold bg-blue-600 text-white cursor-pointer hover:bg-blue-700 transition-colors"
                          >
                            关注
                          </button>
                          <h3 className="text-base font-black text-slate-900">
                            {lead.companyName}
                          </h3>
                          {lead.isInvoiceClient && (
                            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-white text-emerald-700 border border-emerald-300 flex items-center gap-0.5">
                              <Check className="w-3 h-3 text-emerald-600" />
                              开票客户
                            </span>
                          )}
                          <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-900 border border-amber-200">
                            {lead.entityType}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                            lead.badgeStyle === 'purple' 
                              ? 'bg-purple-50 text-purple-900 border border-purple-200' 
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}>
                            {lead.badgeType}
                          </span>
                        </div>

                        <div className="text-xs text-slate-400">
                          {lead.relationText}
                        </div>
                      </div>

                      {/* 研判摘要短评 */}
                      <div className="text-xs font-extrabold text-slate-900 leading-relaxed">
                        {lead.summary}
                      </div>

                      {/* 4 个核心数据指标方块 */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                        <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-200">
                          <div className="text-xl font-black text-slate-900 leading-tight">{lead.metrics.viewCount}</div>
                          <div className="text-slate-500 text-[11px] mt-0.5">查看了我几次</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{lead.metrics.viewPatentCountText}</div>
                        </div>

                        <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-200">
                          <div className="text-xl font-black text-slate-900 leading-tight">{lead.metrics.downloadFulltext}</div>
                          <div className="text-slate-500 text-[11px] mt-0.5">下载全文</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{lead.metrics.downloadSignalText}</div>
                        </div>

                        <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-200">
                          <div className="text-lg font-black text-slate-900 leading-tight truncate">{lead.metrics.deepReadLevel}</div>
                          <div className="text-slate-500 text-[11px] mt-0.5">{lead.metrics.deepReadLevelLabel}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5 truncate">{lead.metrics.deepReadSubText}</div>
                        </div>

                        <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-200">
                          <div className="text-xs font-bold text-slate-900 leading-tight truncate">{lead.metrics.dateSpan}</div>
                          <div className="text-slate-500 text-[11px] mt-0.5">关注时间跨度</div>
                          <div className="text-[10px] text-slate-400 mt-0.5 truncate">{lead.metrics.timeAndIpSpan}</div>
                        </div>
                      </div>

                      {/* 结构化画像分析：① 他是谁 & ② 他为什么盯我 */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 text-xs">
                        {/* ① 他是谁 */}
                        <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/80 space-y-1.5">
                          <div className="font-bold text-slate-900">
                            ① 他是谁
                          </div>
                          <div className="text-xs text-slate-600 space-y-1">
                            <div className="flex items-center gap-1">
                              <span className="text-slate-500 min-w-[70px]">主体性质：</span>
                              <span className="text-slate-900 font-medium">{lead.profile.whoIsHe.entityNature}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-slate-500 min-w-[70px]">自有专利：</span>
                              <span className="text-slate-900 font-medium">{lead.profile.whoIsHe.ownPatents}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-slate-500 min-w-[70px]">覆盖主体数：</span>
                              <span className="text-slate-900 font-medium">{lead.profile.whoIsHe.coveredEntityCount}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-slate-500 min-w-[70px]">技术重心：</span>
                              {lead.profile.whoIsHe.techFocus.length > 0 ? (
                                <div className="flex flex-wrap gap-1">
                                  {lead.profile.whoIsHe.techFocus.map((tf, tIdx) => (
                                    <span key={tIdx} className="px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 text-[10px] font-mono font-bold border border-blue-200">
                                      {tf}
                                    </span>
                                  ))}
                                </div>
                              ) : (
                                <span className="text-slate-400">—</span>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-slate-500 min-w-[70px]">与我的重叠：</span>
                              <span className="text-slate-900 font-medium">{lead.profile.whoIsHe.overlap}</span>
                            </div>
                          </div>
                        </div>

                        {/* ② 他为什么盯我 */}
                        <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/80 space-y-2">
                          <div className="font-bold text-slate-900">
                            ② 他为什么盯我
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {lead.profile.whyHeFollowsMe.behaviorSummary}
                          </p>
                          <div className="pt-1 border-t border-slate-200/60">
                            <div className="text-[11px] font-bold text-slate-700 mb-1">证据链</div>
                            <div className="space-y-0.5 text-xs text-slate-600">
                              {lead.profile.whyHeFollowsMe.evidenceChain.map((ev, evIdx) => (
                                <div key={evIdx} className="flex items-start gap-1">
                                  <span className="text-slate-400">·</span>
                                  <span>{ev}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* ③ 我该做什么 */}
                      <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/80 space-y-1 text-xs">
                        <div className="font-bold text-slate-900">
                          ③ 我该做什么
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {lead.profile.whatShouldIDo.recommendation}
                        </p>
                      </div>

                      {/* 展开/收起具体专利调阅列表 */}
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => setExpandedLeadId(isExpanded ? null : lead.id)}
                          className="text-xs text-slate-500 hover:text-blue-700 flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <span className="text-[11px]">{isExpanded ? '▲' : '▼'}</span>
                          <span>{isExpanded ? '收起：他具体看了我哪些专利 · 他的检索原文' : '展开：他具体看了我哪些专利 · 他的检索原文'}</span>
                        </button>
                      </div>
                    </div>

                    {/* 展开的专利明细列表 */}
                    {isExpanded && (
                      <div className="bg-slate-50/90 p-4 border-t border-slate-200 space-y-3 animate-in fade-in duration-200">
                        <div className="text-xs font-bold text-slate-700 flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5 text-blue-600" />
                          <span>该企业调阅的具体吉林大学专利清单：</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {lead.viewedPatents.map((patent, pIdx) => (
                            <div 
                              key={pIdx} 
                              className="bg-white p-3 rounded-xl border border-slate-200 space-y-1.5 shadow-2xs hover:border-blue-400 transition-colors"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <span className="font-mono text-[11px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                                  {patent.patentNo}
                                </span>
                                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">
                                  {patent.status || '有效'}
                                </span>
                              </div>
                              <h4 className="text-xs font-bold text-slate-900 leading-snug">
                                {patent.title}
                              </h4>
                              <p className="text-[11px] text-slate-500">
                                发明人: {patent.inventor} · {patent.college}
                              </p>
                              <div className="flex items-center justify-between pt-1 text-[11px]">
                                <span className="text-slate-400">分类：{patent.ipc}</span>
                                <button
                                  type="button"
                                  onClick={() => onSelectPatent(patent as any)}
                                  className="text-blue-600 font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
                                >
                                  <span>查看详情</span>
                                  <ArrowUpRight className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* TAB 1 分页栏 */}
            {tab1FilteredLeads.length > 0 && (
              <div className="bg-white px-4 py-3 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <span>
                    显示第 <strong className="text-slate-900 font-bold">{(tab1CurrentPage - 1) * tab1PageSize + 1}</strong> 至 <strong className="text-slate-900 font-bold">{Math.min(tab1CurrentPage * tab1PageSize, tab1FilteredLeads.length)}</strong> 条，共 <strong className="text-slate-900 font-bold">{tab1FilteredLeads.length}</strong> 条记录
                  </span>
                  <span className="text-slate-300">|</span>
                  <div className="flex items-center gap-1.5">
                    <span>每页</span>
                    <select
                      value={tab1PageSize}
                      onChange={(e) => {
                        setTab1PageSize(Number(e.target.value));
                        setTab1CurrentPage(1);
                      }}
                      className="bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 text-xs font-bold text-slate-700 focus:outline-none"
                    >
                      <option value={5}>5 条</option>
                      <option value={10}>10 条</option>
                      <option value={20}>20 条</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setTab1CurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={tab1CurrentPage <= 1}
                    className="px-2.5 py-1 rounded-lg border border-slate-300 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 cursor-pointer"
                  >
                    上一页
                  </button>
                  <span className="px-3 py-1 font-bold text-slate-800">
                    {tab1CurrentPage} / {tab1TotalPages}
                  </span>
                  <button
                    onClick={() => setTab1CurrentPage(prev => Math.min(tab1TotalPages, prev + 1))}
                    disabled={tab1CurrentPage >= tab1TotalPages}
                    className="px-2.5 py-1 rounded-lg border border-slate-300 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 cursor-pointer"
                  >
                    下一页
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 视图 2: ② 市场在找什么 ↔ 我的成果 */}
      {/* ========================================================================= */}
      {radarSubTab === 'tab2_market_demand' && (
        <div className="space-y-6">

          {/* 1. 攻防说明卡片 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              这一页解决什么问题
            </h2>

            <div className="space-y-2 text-xs text-slate-700 leading-relaxed bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
              <p>
                • <strong>『谁在看我的专利』是防守</strong> —— 只能看到已经发生的事。
              </p>
              <p>
                • <strong className="text-emerald-800">这一页是进攻</strong> —— 有人在搜「机器人」「固态电池」，而有这些成果的高校/企业现在就能主动找上去。
              </p>
              <p>
                • 搜过这个词的企业是<strong>真实企业名（来自检索记录，不是 IP 推测）</strong> —— 这就是可以直接联系的需求方。
              </p>
              <p>
                • <strong>双向撮合：</strong>① 企业视角 —— 选一个技术需求，看谁能供(高校优先)；② 高校视角 —— 选一所高校，看它的成果能接哪些正在发生的需求，<strong>该联系哪几家企业</strong>。
              </p>
            </div>
          </div>

          {/* 2. 四大统计指标卡片 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-2xl font-black text-slate-900">600</div>
              <div className="text-xs font-bold text-slate-700 mt-1">技术需求词</div>
              <div className="text-[11px] text-slate-400">可撮合</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-2xl font-black text-emerald-600">1,084</div>
              <div className="text-xs font-bold text-slate-700 mt-1">可对接高校/院所</div>
              <div className="text-[11px] text-slate-400">每成果可匹配</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-2xl font-black text-blue-600">867</div>
              <div className="text-xs font-bold text-slate-700 mt-1">库内供给企业</div>
              <div className="text-[11px] text-slate-400">可作为技术来源</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-2xl font-black text-amber-500">1</div>
              <div className="text-xs font-bold text-slate-700 mt-1">需求上升的词</div>
              <div className="text-[11px] text-slate-400">近 3 天 vs 前 3 天</div>
            </div>
          </div>

          {/* 3. 对接清单列表 */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-slate-50/50">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <span>{selectedUniversity}</span>
                  <span className="text-xs font-normal text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    可对接 {tab2FilteredDemands.length} 个正在发生的技术需求
                  </span>
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  只看正在被搜的技术和你方成果的交集。右栏是真的是在搜这些技术的企业名 —— 建议直接联系他们（搜得多 = 需求更强）。
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative w-48">
                  <input
                    type="text"
                    value={tab2SearchText}
                    onChange={(e) => setTab2SearchText(e.target.value)}
                    placeholder="按技术词/企业搜索..."
                    className="w-full pl-7 pr-2 py-1 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-1.5" />
                </div>

                <button
                  type="button"
                  onClick={handleExportTab2}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>导出清单</span>
                </button>
              </div>
            </div>

            {/* 匹配表格 */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3 w-32">技术需求</th>
                    <th className="p-3">谁在搜 · 建议联系这几家</th>
                    <th className="p-3 w-72">你方的相关成果</th>
                    <th className="p-3 w-36">申请号 / 详情</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {tab2FilteredDemands.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3 align-top font-bold text-slate-900">
                        <div className="text-sm font-extrabold text-blue-700">{item.keyword}</div>
                        <div className="text-[11px] text-slate-400 font-normal mt-0.5">{item.searchCompanyCount} 家搜过</div>
                      </td>

                      <td className="p-3 align-top">
                        <div className="space-y-1">
                          {item.companies.slice(0, 5).map((comp, cIdx) => (
                            <div key={cIdx} className="flex flex-wrap items-center gap-2 text-xs">
                              <span className="font-semibold text-slate-900">{comp.name}</span>
                              {comp.isInvoiceClient && (
                                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-0.5">
                                  <Check className="w-2.5 h-2.5 text-emerald-600" />
                                  开票客户
                                </span>
                              )}
                              <span className="text-[11px] text-slate-400">
                                {comp.searchCount} 次 · {comp.lastSearchDate}
                              </span>
                            </div>
                          ))}
                          {item.companies.length > 5 && (
                            <div className="text-[11px] text-blue-600 cursor-pointer hover:underline pt-0.5">
                              + 另有 {item.companies.length - 5} 家企业也在搜该词
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="p-3 align-top">
                        <div className="font-bold text-slate-900 leading-snug">
                          {item.matchedPatent.title}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1">
                          {item.matchedPatent.inventor} · {item.matchedPatent.college}
                        </div>
                      </td>

                      <td className="p-3 align-top">
                        <div className="space-y-1.5">
                          <span className="font-mono text-[11px] font-bold text-blue-700 block">
                            {item.matchedPatent.patentNo}
                          </span>
                          <button
                            type="button"
                            onClick={() => onSelectPatent(item.matchedPatent as any)}
                            className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>查看成果</span>
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

        </div>
      )}

      {/* ========================================================================= */}
      {/* 视图 3: ③ 我的成果该推给谁 */}
      {/* ========================================================================= */}
      {radarSubTab === 'tab3_push_target' && (
        <div className="space-y-6">

          {/* 1. 四大全局统计指标卡片 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-2xl font-black text-slate-900">309,357 <span className="text-xs font-normal text-slate-400">件</span></div>
              <div className="text-xs font-bold text-slate-700 mt-1">专利年成果池</div>
              <div className="text-[11px] text-slate-400">本平台专利成果库总计包含高校/院所日偏成果总数</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-2xl font-black text-purple-600">306,829 <span className="text-xs font-normal text-slate-400">件</span></div>
              <div className="text-xs font-bold text-slate-700 mt-1">其中找到需求</div>
              <div className="text-[11px] text-slate-400">至少有一条线索(有人搜过或看过)的成果</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-2xl font-black text-blue-600">343,607 <span className="text-xs font-normal text-slate-400">条</span></div>
              <div className="text-xs font-bold text-slate-700 mt-1">主推推荐关系</div>
              <div className="text-[11px] text-slate-400">「一件成果 → 一家值得联系的企业」，每件最多 6 条</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-2xl font-black text-emerald-600">876,795 <span className="text-xs font-normal text-slate-400">条</span></div>
              <div className="text-xs font-bold text-slate-700 mt-1">同领域备选</div>
              <div className="text-[11px] text-slate-400">弱证据 (同技术领域)，已单独区块，不混进主推荐</div>
            </div>
          </div>

          {/* 2. 指标怎么看 & 4 种证据标签说明卡片 (可折叠) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <button
              type="button"
              onClick={() => setIsIndicatorsDocOpen(prev => !prev)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 cursor-pointer"
            >
              <div className="flex items-center gap-2 text-xs font-black text-slate-900">
                <BookOpen className="w-4 h-4 text-purple-600" />
                <span>指标怎么看 · 转化漏斗与 4 种证据标签定义 (点击{isIndicatorsDocOpen ? '收起' : '展开'}规则说明)</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isIndicatorsDocOpen ? 'rotate-180' : ''}`} />
            </button>

            {isIndicatorsDocOpen && (
              <div className="p-5 border-t border-slate-200 bg-slate-50/50 space-y-4 text-xs text-slate-700 animate-in fade-in duration-200">
                {/* 漏斗关系 */}
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900">一、高校表里的 4 个数字 —— 前 3 个是「件」层级空收；第 4 个是「家」</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-1 text-[11px]">
                    <div className="bg-white p-2 rounded-lg border border-slate-200">
                      <div className="font-bold text-slate-900">2,148 件</div>
                      <div className="text-slate-500">成果在专利库</div>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-slate-200">
                      <div className="font-bold text-slate-900">2,140 件</div>
                      <div className="text-slate-500">已找到需求线索</div>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-slate-200">
                      <div className="font-bold text-purple-700">1,481 件</div>
                      <div className="text-slate-500">有主推荐 (精选)</div>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-slate-200">
                      <div className="font-bold text-blue-700">546 家</div>
                      <div className="text-slate-500">可联系主体</div>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-slate-200">
                      <div className="font-bold text-emerald-700">448 家</div>
                      <div className="text-slate-500">其中实体企业</div>
                    </div>
                  </div>
                </div>

                {/* 证据标签 */}
                <div className="space-y-2 pt-2 border-t border-slate-200">
                  <h4 className="font-bold text-slate-900">二、每一条为什么推荐 —— 4 种证据标签</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-[11px]">
                    <div className="bg-purple-50 p-2.5 rounded-xl border border-purple-200 space-y-1">
                      <div className="flex items-center gap-1">
                        <span className="px-1.5 py-0.2 rounded font-black bg-purple-600 text-white text-[10px]">双重</span>
                        <span className="font-bold text-purple-950">最强证据</span>
                      </div>
                      <p className="text-purple-900">既搜过这件成果的技术词，又看过这件专利。最该马上联系。</p>
                    </div>

                    <div className="bg-blue-50 p-2.5 rounded-xl border border-blue-200 space-y-1">
                      <div className="flex items-center gap-1">
                        <span className="px-1.5 py-0.2 rounded font-black bg-blue-600 text-white text-[10px]">极搜</span>
                        <span className="font-bold text-blue-950">强证据</span>
                      </div>
                      <p className="text-blue-900">企业在佰腾搜索过与这件成果极相同/相近的具体技术词。可主动联系。</p>
                    </div>

                    <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 space-y-1">
                      <div className="flex items-center gap-1">
                        <span className="px-1.5 py-0.2 rounded font-black bg-emerald-600 text-white text-[10px]">看过</span>
                        <span className="font-bold text-emerald-950">强证据</span>
                      </div>
                      <p className="text-emerald-900">企业曾翻阅过这一件专利。可主动联系。</p>
                    </div>

                    <div className="bg-slate-100 p-2.5 rounded-xl border border-slate-200 space-y-1">
                      <div className="flex items-center gap-1">
                        <span className="px-1.5 py-0.2 rounded font-bold bg-slate-300 text-slate-700 text-[10px]">同领域</span>
                        <span className="font-bold text-slate-800">弱证据 (备选)</span>
                      </div>
                      <p className="text-slate-600">搜过该技术领域，但不代表具体需求，放在同领域备选。</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 3. 可联系主体清单 (546家) 标签流/卡片 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                <h3 className="text-sm font-extrabold text-slate-900">
                  ② 可联系主体清单 —— 546 家
                </h3>
                <span className="text-[11px] text-slate-400">点击任意一家，可在下方只看推给它的成果</span>
              </div>

              {tab3SelectedEnterpriseId && (
                <button
                  type="button"
                  onClick={() => setTab3SelectedEnterpriseId(null)}
                  className="text-xs text-purple-600 font-bold hover:underline cursor-pointer"
                >
                  清除企业筛选 (查看全部)
                </button>
              )}
            </div>

            {/* 主体卡片网格 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 max-h-96 overflow-y-auto pr-1">
              {TARGET_ENTERPRISE_LEAD_TAGS.map((tagItem) => {
                const isSelected = tab3SelectedEnterpriseId === tagItem.id;
                return (
                  <button
                    key={tagItem.id}
                    type="button"
                    onClick={() => setTab3SelectedEnterpriseId(isSelected ? null : tagItem.id)}
                    className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-purple-50 border-purple-500 shadow-xs ring-2 ring-purple-400'
                        : 'bg-slate-50/70 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        {renderEvidenceBadge(tagItem.evidenceType)}
                        <span className="font-extrabold text-xs text-slate-900 truncate" title={tagItem.name}>
                          {tagItem.name}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 line-clamp-2">
                        {tagItem.searchedKeywordsSummary}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400 border-t border-slate-200/50 mt-1">
                      <span>覆盖 {tagItem.coverageCount} 件</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. 成果推送明细列表 */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="font-extrabold text-slate-900">
                  {selectedUniversity} 2,140 件
                </span>

                <label className="inline-flex items-center gap-1.5 cursor-pointer select-none text-slate-700">
                  <input
                    type="checkbox"
                    checked={tab3OnlyMainPush}
                    onChange={(e) => setTab3OnlyMainPush(e.target.checked)}
                    className="rounded text-purple-600"
                  />
                  <span>只看有主推荐</span>
                </label>

                <label className="inline-flex items-center gap-1.5 cursor-pointer select-none text-slate-700">
                  <input
                    type="checkbox"
                    checked={tab3HideAgencies}
                    onChange={(e) => setTab3HideAgencies(e.target.checked)}
                    className="rounded text-purple-600"
                  />
                  <span>隐藏代理/中介</span>
                </label>

                {/* Search */}
                <div className="relative w-56">
                  <input
                    type="text"
                    value={tab3SearchText}
                    onChange={(e) => setTab3SearchText(e.target.value)}
                    placeholder="按检索/专利号/技术词..."
                    className="w-full pl-7 pr-2 py-1 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-1.5" />
                </div>
              </div>

              <button
                type="button"
                onClick={handleExportTab3}
                className="px-3.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs whitespace-nowrap"
                title="导出推荐成果表为 CSV"
              >
                <Download className="w-3.5 h-3.5 text-purple-600" />
                <span>导出推荐表 ({tab3FilteredPushResults.length}件)</span>
              </button>
            </div>

            {/* 成果卡片列表 */}
            <div className="space-y-4">
              {tab3FilteredPushResults.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4 hover:border-purple-300 transition-colors"
                >
                  {/* 成果标题与基本信息 */}
                  <div className="space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-extrabold text-slate-900">
                          {item.title}
                        </h3>
                        <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                          {item.patentNo}
                        </span>
                        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {item.ipc}
                        </span>
                      </div>

                      <div className="text-xs text-slate-400">
                        推荐联系 <strong className="text-purple-700 font-bold">{item.mainRecommendedCompanies.length}</strong> 家 · 其中强证据 {item.mainRecommendedCompanies.filter(c => c.tag !== 'agency').length} 条
                      </div>
                    </div>

                    {/* 技术词标签 */}
                    <div className="flex flex-wrap items-center gap-1 text-xs">
                      <span className="text-slate-400 font-medium">这件成果的技术词：</span>
                      {item.techKeywords.map((kw, kIdx) => (
                        <span key={kIdx} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px]">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 主推企业列表 */}
                  <div className="space-y-2 border-t border-slate-100 pt-3">
                    {item.mainRecommendedCompanies.map((comp, compIdx) => (
                      <div 
                        key={compIdx}
                        className="bg-slate-50/80 p-3 rounded-xl border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          {renderEvidenceBadge(comp.tag)}
                          <span className="font-extrabold text-slate-900">{comp.name}</span>
                          <span className="text-slate-500">|</span>
                          <span className="text-slate-600">{comp.searchStats}</span>
                          {comp.viewStats && <span className="text-slate-500">，{comp.viewStats}</span>}
                          {comp.downloadStats && <span className="text-emerald-700 font-bold">，{comp.downloadStats}</span>}
                        </div>

                        <div className="flex items-center gap-3">
                          {comp.contactPhone && (
                            <button
                              type="button"
                              onClick={() => handleCopyText(comp.contactPhone!, `phone-${item.id}-${compIdx}`)}
                              className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                              title="点击复制手机号码"
                            >
                              <Phone className="w-3 h-3 text-emerald-600" />
                              <span>{copiedKey === `phone-${item.id}-${compIdx}` ? '已复制手机' : `手机：${comp.contactPhone}`}</span>
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => onSelectEnterprise({
                              id: `ent-${item.id}-${compIdx}`,
                              name: comp.name,
                              shortName: comp.name.slice(0, 4),
                              industry: '相关高新技术产业',
                              province: '全国',
                              city: '主要城市',
                              matchScore: 90,
                              revenue: '1000万-5000万',
                              demandKeywords: item.techKeywords,
                              recommendedPatents: []
                            })}
                            className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-bold cursor-pointer transition-colors shadow-2xs"
                          >
                            发起对接
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 同领域备选 (弱证据) */}
                  {item.sameFieldBackupCompanies.length > 0 && (
                    <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
                      <span className="text-slate-400 font-medium">同领域备选 (弱证据 · 只搜过技术领域，不是具体技术词)：</span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {item.sameFieldBackupCompanies.map((bk, bIdx) => (
                          <span key={bIdx} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[11px] hover:bg-slate-200 transition-colors">
                            {bk}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

// Simple Radar Icon SVG helper
function RadarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19.07 4.93A10 10 0 0 0 6.99 3.34" />
      <path d="M4 6h.01" />
      <path d="M2.29 9.62A10 10 0 1 0 21.31 8.35" />
      <path d="M16.24 7.76A6 6 0 1 0 8.23 16.64" />
      <path d="M12 12l4-4" />
    </svg>
  );
}
