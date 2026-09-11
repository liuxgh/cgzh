import React, { useState, useMemo, useRef } from 'react';
import { 
  Sparkles, 
  Search, 
  Cpu, 
  Hash, 
  Building2, 
  FileText, 
  TrendingUp,
  BarChart2,
  PieChart as PieIcon,
  Tag,
  Clock,
  Layers,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Copy,
  Check
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  CartesianGrid, 
  Cell 
} from 'recharts';
import { BaitenVisitorRecord, ViewedPatentItem } from '../data/baitenVisitorTrackerData';

interface CompanyInfo {
  name: string;
  shortName: string;
  industry: string;
  province: string;
  city: string;
  searchCount: number;
  viewDurationSeconds: number;
}

interface KeywordDetailedData {
  keyword: string;
  type: 'search_term' | 'tech_keyword';
  count: number;
  category?: string;
  isDirect?: boolean;
  companies: CompanyInfo[];
  patents: ViewedPatentItem[];
}

interface PopoverPosition {
  left: number;
  top: number;
  placement: 'top' | 'bottom';
  arrowOffset: number;
}

interface BaitenWordCloudSectionProps {
  leads: BaitenVisitorRecord[];
  onSelectKeyword: (keyword: string) => void;
  activeFilterKeyword?: string;
}

// 悬停卡片专用的复制微组件（纯图标展示、点击即时状态反馈、无文字）
const CopyIconButton: React.FC<{
  text: string;
  className?: string;
  tooltipTitle?: string;
}> = ({ text, className = '', tooltipTitle }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(String(text));
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`p-1 rounded-md transition-all cursor-pointer inline-flex items-center justify-center shrink-0 ${
        copied
          ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50 scale-105'
          : 'bg-slate-700/80 hover:bg-blue-600 text-slate-300 hover:text-white border border-slate-600/60'
      } ${className}`}
      title={copied ? '已复制到剪贴板' : (tooltipTitle || `复制: ${text}`)}
    >
      {copied ? (
        <Check className="w-3 h-3 text-emerald-400 shrink-0" />
      ) : (
        <Copy className="w-3 h-3 shrink-0" />
      )}
    </button>
  );
};

export const BaitenWordCloudSection: React.FC<BaitenWordCloudSectionProps> = ({
  leads,
  onSelectKeyword,
  activeFilterKeyword
}) => {
  const [activeTab, setActiveTab] = useState<'both' | 'search_terms' | 'tech_keywords'>('both');
  const [viewMode, setViewMode] = useState<'cloud' | 'chart'>('cloud');
  
  // 悬停气泡详情状态与视口位置
  const [hoveredKeyword, setHoveredKeyword] = useState<KeywordDetailedData | null>(null);
  const [popoverPos, setPopoverPos] = useState<PopoverPosition | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. 深度聚合：企业检索词 (包含对应查看的企业与专利)
  const searchTermsData: KeywordDetailedData[] = useMemo(() => {
    const termMap: Record<string, KeywordDetailedData> = {};

    leads.forEach(lead => {
      const compInfo: CompanyInfo = {
        name: lead.companyName,
        shortName: lead.shortName || lead.companyName,
        industry: lead.industry,
        province: lead.province,
        city: lead.city,
        searchCount: lead.searchSessions ? lead.searchSessions.length : 1,
        viewDurationSeconds: lead.viewDurationSeconds
      };

      const sessions = lead.searchSessions || [
        { 
          sessionId: 'sess-single',
          searchKeyword: lead.searchKeyword, 
          searchType: lead.searchType,
          searchDate: lead.searchDate,
          searchTime: lead.searchTime,
          viewDurationSeconds: lead.viewDurationSeconds,
          matchedKeywords: lead.matchedKeywords,
          patents: lead.viewedPatents,
          aiAnalysis: {
            intentSummary: lead.enterpriseProfileSummary,
            techFocus: lead.matchedKeywords.join('、'),
            cooperationOpportunity: lead.suggestedAction
          }
        }
      ];

      sessions.forEach(sess => {
        const kw = sess.searchKeyword.trim();
        if (!kw) return;
        
        if (!termMap[kw]) {
          termMap[kw] = {
            keyword: kw,
            type: 'search_term',
            count: 0,
            category: lead.fieldName,
            isDirect: sess.searchType === 'direct_keyword',
            companies: [],
            patents: []
          };
        }

        termMap[kw].count += 1;
        
        // 添加企业（去重）
        if (!termMap[kw].companies.some(c => c.name === compInfo.name)) {
          termMap[kw].companies.push(compInfo);
        }

        // 添加该搜索词下对应的专利（去重）
        sess.patents.forEach(p => {
          if (!termMap[kw].patents.some(ep => ep.patentNo === p.patentNo)) {
            termMap[kw].patents.push(p);
          }
        });
      });
    });

    return Object.values(termMap)
      .sort((a, b) => b.count - a.count || b.companies.length - a.companies.length)
      .slice(0, 20);
  }, [leads]);

  // 2. 深度聚合：查阅专利对应的技术关键词 (包含对应查看的企业与专利)
  const techKeywordsData: KeywordDetailedData[] = useMemo(() => {
    const techMap: Record<string, KeywordDetailedData> = {};

    leads.forEach(lead => {
      const compInfo: CompanyInfo = {
        name: lead.companyName,
        shortName: lead.shortName || lead.companyName,
        industry: lead.industry,
        province: lead.province,
        city: lead.city,
        searchCount: lead.searchSessions ? lead.searchSessions.length : 1,
        viewDurationSeconds: lead.viewDurationSeconds
      };

      // 汇总该企业的所有技术关键词与对应的专利
      const allKws = new Set<string>();
      lead.matchedKeywords?.forEach(k => allKws.add(k));
      lead.searchSessions?.forEach(s => s.matchedKeywords?.forEach(k => allKws.add(k)));

      allKws.forEach(kw => {
        if (!kw || kw.length < 2) return;
        
        if (!techMap[kw]) {
          techMap[kw] = {
            keyword: kw,
            type: 'tech_keyword',
            count: 0,
            category: lead.fieldName,
            companies: [],
            patents: []
          };
        }

        techMap[kw].count += 1;

        if (!techMap[kw].companies.some(c => c.name === compInfo.name)) {
          techMap[kw].companies.push(compInfo);
        }

        // 关联此企业的专利
        lead.viewedPatents.forEach(p => {
          if (!techMap[kw].patents.some(ep => ep.patentNo === p.patentNo)) {
            techMap[kw].patents.push(p);
          }
        });
      });
    });

    return Object.values(techMap)
      .sort((a, b) => b.count - a.count || b.companies.length - a.companies.length)
      .slice(0, 24);
  }, [leads]);

  // 计算最大频次
  const maxSearchCount = searchTermsData[0]?.count || 1;
  const maxTechCount = techKeywordsData[0]?.count || 1;

  // 颜色与尺寸样式计算
  const getBubbleStyle = (count: number, maxCount: number, colorFamily: 'blue' | 'indigo') => {
    const ratio = count / (maxCount || 1);
    if (ratio >= 0.7) {
      return colorFamily === 'blue'
        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md text-sm font-bold ring-2 ring-blue-400/40 px-3.5 py-2'
        : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md text-sm font-bold ring-2 ring-indigo-400/40 px-3.5 py-2';
    } else if (ratio >= 0.4) {
      return colorFamily === 'blue'
        ? 'bg-blue-100 text-blue-900 border border-blue-300/80 shadow-2xs text-xs font-semibold px-3 py-1.5 hover:bg-blue-200'
        : 'bg-indigo-100 text-indigo-900 border border-indigo-300/80 shadow-2xs text-xs font-semibold px-3 py-1.5 hover:bg-indigo-200';
    } else {
      return colorFamily === 'blue'
        ? 'bg-slate-50 text-slate-700 border border-slate-200/90 text-xs font-medium px-2.5 py-1 hover:bg-blue-50 hover:text-blue-800'
        : 'bg-slate-50 text-slate-700 border border-slate-200/90 text-xs font-medium px-2.5 py-1 hover:bg-indigo-50 hover:text-indigo-800';
    }
  };

  // 处理鼠标移入：严格避开当前关键词并确保在浏览器可视窗口范围内
  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>, item: KeywordDetailedData) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    const targetRect = e.currentTarget.getBoundingClientRect();
    const cardWidth = Math.min(390, window.innerWidth - 32);
    const estimatedCardHeight = 340;
    
    // 1. 水平位置计算：居中对齐关键词，同时确保不会超出屏幕左右边缘 (留 16px 边距)
    const targetCenterX = targetRect.left + targetRect.width / 2;
    let left = targetCenterX - cardWidth / 2;
    left = Math.max(16, Math.min(left, window.innerWidth - cardWidth - 16));
    
    // 计算指示箭头相对卡片的水平偏移
    const arrowOffset = Math.max(24, Math.min(targetCenterX - left, cardWidth - 24));

    // 2. 垂直位置计算：严格避开当前关键词元素本身（上下预留 10px 间隙，绝不遮挡）
    let top: number;
    let placement: 'top' | 'bottom' = 'top';

    const spaceAbove = targetRect.top;
    const spaceBelow = window.innerHeight - targetRect.bottom;

    // 优先放置在上方（如果上方空间充足）
    if (spaceAbove >= estimatedCardHeight + 14) {
      top = targetRect.top - estimatedCardHeight - 10;
      placement = 'top';
    } else if (spaceBelow >= estimatedCardHeight + 14) {
      // 上方空间不够则放在下方
      top = targetRect.bottom + 10;
      placement = 'bottom';
    } else {
      // 屏幕高度极小极端情况，选择空间更大的一侧并限制在可视区域内
      if (spaceAbove >= spaceBelow) {
        top = Math.max(12, targetRect.top - estimatedCardHeight - 8);
        placement = 'top';
      } else {
        top = Math.min(window.innerHeight - estimatedCardHeight - 12, targetRect.bottom + 8);
        placement = 'bottom';
      }
    }

    setPopoverPos({ left, top, placement, arrowOffset });
    setHoveredKeyword(item);
  };

  // 鼠标移出：设置 260ms 缓冲延时，确保鼠标能够顺畅平滑移入到悬停卡片中
  const handleMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setHoveredKeyword(null);
      setPopoverPos(null);
    }, 260);
  };

  // 鼠标移入卡片内部：清除关闭定时器，保持卡片展示
  const handlePopoverMouseEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  // 鼠标移出卡片内部：触发关闭
  const handlePopoverMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setHoveredKeyword(null);
      setPopoverPos(null);
    }, 200);
  };

  return (
    <div ref={containerRef} className="relative bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-5">
      
      {/* 头部标题与控制工具栏 */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2.5">
              <span>企业检索热度与专利技术关键词洞察</span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                交互式双向透视
              </span>
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            <strong>鼠标悬停任意关键词</strong>可穿透查看企业名单与调阅吉大专利清单；鼠标可直接移入卡片<strong>一键复制核心字段</strong>。
          </p>
        </div>

        {/* 视图切换与展示模式 */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          
          {/* Tab 切换 */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('both')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'both' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              双维度图表
            </button>
            <button
              onClick={() => setActiveTab('search_terms')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'search_terms' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              企业检索词 ({searchTermsData.length})
            </button>
            <button
              onClick={() => setActiveTab('tech_keywords')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'tech_keywords' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              专利技术词 ({techKeywordsData.length})
            </button>
          </div>

          {/* 展现形态：词云气泡 vs 柱状排行 */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('cloud')}
              className={`px-2.5 py-1.5 rounded-lg font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'cloud' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="气泡词云图"
            >
              <PieIcon className="w-3.5 h-3.5 text-blue-600" />
              <span>词云</span>
            </button>
            <button
              onClick={() => setViewMode('chart')}
              className={`px-2.5 py-1.5 rounded-lg font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'chart' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="热度柱状图"
            >
              <BarChart2 className="w-3.5 h-3.5 text-indigo-600" />
              <span>排行柱图</span>
            </button>
          </div>

        </div>
      </div>

      {/* 主展示区 */}
      <div className={`grid gap-6 ${activeTab === 'both' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        
        {/* 维度 1: 企业高频检索词图表 (在查什么) */}
        {(activeTab === 'both' || activeTab === 'search_terms') && (
          <div className="bg-gradient-to-br from-blue-50/40 via-white to-slate-50/70 rounded-2xl p-5 border border-blue-200/80 shadow-2xs space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-blue-100">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                  <Search className="w-4 h-4 text-blue-600" />
                  <span>企业高频搜索词 (Enterprise Queries)</span>
                </div>
                <span className="text-[11px] text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-full font-semibold">
                  反映企业外部真实需求
                </span>
              </div>

              {viewMode === 'cloud' ? (
                // 气泡词云布局
                <div className="pt-3 flex flex-wrap items-center justify-center gap-2.5 min-h-[240px] p-3 bg-white/80 rounded-xl border border-blue-100">
                  {searchTermsData.map((item, idx) => {
                    const isSelected = activeFilterKeyword === item.keyword;
                    const bubbleStyle = getBubbleStyle(item.count, maxSearchCount, 'blue');
                    
                    return (
                      <div
                        key={idx}
                        onMouseEnter={(e) => handleMouseEnter(e, item)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => onSelectKeyword(item.keyword)}
                        className={`rounded-2xl transition-all duration-200 cursor-pointer flex items-center gap-2 group transform active:scale-95 ${bubbleStyle} ${
                          isSelected ? 'ring-3 ring-blue-500 scale-105 shadow-md' : 'hover:scale-105 hover:shadow-sm'
                        }`}
                      >
                        {idx < 3 && (
                          <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-amber-400 text-amber-950">
                            TOP {idx + 1}
                          </span>
                        )}
                        <span>{item.keyword}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-black/15 font-bold">
                          {item.count}次
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                // 优化高度与间距的柱状排行图（高度扩展至 340px，间距舒适不拥挤）
                <div className="h-80 sm:h-[340px] w-full pt-3">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={searchTermsData.slice(0, 8)} 
                      layout="vertical"
                      margin={{ top: 10, right: 30, left: 15, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                      <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                      <YAxis 
                        type="category" 
                        dataKey="keyword" 
                        width={140} 
                        tick={{ fontSize: 11, fill: '#1E293B', fontWeight: 500 }} 
                      />
                      <RechartsTooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload as KeywordDetailedData;
                            return (
                              <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs space-y-1.5 border border-slate-700">
                                <div className="font-bold text-blue-300 text-sm">{data.keyword}</div>
                                <div className="text-slate-300">检索频次: <strong className="text-amber-400">{data.count} 次</strong></div>
                                <div className="text-slate-300">涉及企业: {data.companies.map(c => c.shortName).join('、')}</div>
                                <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800">点击柱条可在下方快速筛选此企业</div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar 
                        dataKey="count" 
                        name="检索频次" 
                        fill="#3B82F6" 
                        barSize={18}
                        radius={[0, 6, 6, 0]} 
                        onClick={(data) => onSelectKeyword(data.keyword)}
                      >
                        {searchTermsData.slice(0, 8).map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={index === 0 ? '#2563EB' : index === 1 ? '#3B82F6' : '#60A5FA'} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
              <span className="flex items-center gap-1 text-slate-600">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                <span>悬停查看查阅该词的<strong>企业名单及对应的吉大专利</strong></span>
              </span>
              {activeFilterKeyword && (
                <button
                  onClick={() => onSelectKeyword('')}
                  className="text-blue-600 hover:underline font-bold cursor-pointer"
                >
                  清除当前筛选
                </button>
              )}
            </div>
          </div>
        )}

        {/* 维度 2: 查看专利对应的核心技术关键词 (成果技术点) */}
        {(activeTab === 'both' || activeTab === 'tech_keywords') && (
          <div className="bg-gradient-to-br from-indigo-50/40 via-white to-purple-50/50 rounded-2xl p-5 border border-indigo-200/80 shadow-2xs space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-indigo-100">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-900">
                  <Cpu className="w-4 h-4 text-indigo-600" />
                  <span>调阅专利技术特征词 (Patent Tech Features)</span>
                </div>
                <span className="text-[11px] text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded-full font-semibold">
                  吉大被查成果技术聚类
                </span>
              </div>

              {viewMode === 'cloud' ? (
                // 气泡词云布局
                <div className="pt-3 flex flex-wrap items-center justify-center gap-2.5 min-h-[240px] p-3 bg-white/80 rounded-xl border border-indigo-100">
                  {techKeywordsData.map((item, idx) => {
                    const isSelected = activeFilterKeyword === item.keyword;
                    const bubbleStyle = getBubbleStyle(item.count, maxTechCount, 'indigo');
                    
                    return (
                      <div
                        key={idx}
                        onMouseEnter={(e) => handleMouseEnter(e, item)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => onSelectKeyword(item.keyword)}
                        className={`rounded-2xl transition-all duration-200 cursor-pointer flex items-center gap-2 group transform active:scale-95 ${bubbleStyle} ${
                          isSelected ? 'ring-3 ring-indigo-500 scale-105 shadow-md' : 'hover:scale-105 hover:shadow-sm'
                        }`}
                      >
                        <Hash className="w-3.5 h-3.5 opacity-60 shrink-0" />
                        <span>{item.keyword}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-black/15 font-bold">
                          {item.count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                // 优化高度与间距的柱状排行图（高度扩展至 340px，舒适呼吸空间）
                <div className="h-80 sm:h-[340px] w-full pt-3">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={techKeywordsData.slice(0, 8)} 
                      layout="vertical"
                      margin={{ top: 10, right: 30, left: 15, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                      <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                      <YAxis 
                        type="category" 
                        dataKey="keyword" 
                        width={140} 
                        tick={{ fontSize: 11, fill: '#1E293B', fontWeight: 500 }} 
                      />
                      <RechartsTooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload as KeywordDetailedData;
                            return (
                              <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs space-y-1.5 border border-slate-700">
                                <div className="font-bold text-indigo-300 text-sm">#{data.keyword}</div>
                                <div className="text-slate-300">关联调阅频次: <strong className="text-amber-400">{data.count} 次</strong></div>
                                <div className="text-slate-300">调阅企业: {data.companies.map(c => c.shortName).join('、')}</div>
                                <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800">点击柱条可在下方快速筛选此企业</div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar 
                        dataKey="count" 
                        name="关联调阅次数" 
                        fill="#6366F1" 
                        barSize={18}
                        radius={[0, 6, 6, 0]} 
                        onClick={(data) => onSelectKeyword(data.keyword)}
                      >
                        {techKeywordsData.slice(0, 8).map((entry, index) => (
                          <Cell 
                            key={`tech-cell-${index}`} 
                            fill={index === 0 ? '#4F46E5' : index === 1 ? '#6366F1' : '#818CF8'} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
              <span className="flex items-center gap-1 text-slate-600">
                <Tag className="w-3.5 h-3.5 text-indigo-500" />
                <span>悬停查看被哪些企业调阅及覆盖的<strong>吉大发明专利清单</strong></span>
              </span>
              {activeFilterKeyword && (
                <button
                  onClick={() => onSelectKeyword('')}
                  className="text-indigo-600 hover:underline font-bold cursor-pointer"
                >
                  清除当前筛选
                </button>
              )}
            </div>
          </div>
        )}

      </div>

      {/* 悬停穿透卡片 (Floating Interactive Rich Popover - 视口固定、绝不遮挡关键词、支持鼠标移入并内置复制按钮) */}
      {hoveredKeyword && popoverPos && (
        <div 
          onMouseEnter={handlePopoverMouseEnter}
          onMouseLeave={handlePopoverMouseLeave}
          className="fixed z-[9999] w-[360px] sm:w-[390px] bg-slate-900/98 backdrop-blur-xl text-white rounded-2xl p-4 shadow-2xl border border-slate-700/90 pointer-events-auto transition-all duration-150 animate-in fade-in zoom-in-95 space-y-3"
          style={{
            left: `${popoverPos.left}px`,
            top: `${popoverPos.top}px`
          }}
        >
          {/* 指向关键词的小三角箭头指示器 */}
          <div 
            className={`absolute w-3 h-3 bg-slate-900 border-slate-700/90 pointer-events-none ${
              popoverPos.placement === 'top' 
                ? '-bottom-1.5 border-b border-r' 
                : '-top-1.5 border-t border-l'
            }`}
            style={{
              left: `${popoverPos.arrowOffset}px`,
              transform: 'translateX(-50%) rotate(45deg)'
            }}
          />

          {/* 卡片头部：词名 + 类型 + 复制关键词 + 次数 */}
          <div className="flex items-start justify-between gap-2 border-b border-slate-700/80 pb-2.5">
            <div className="space-y-1 pr-2">
              <div className="flex items-center gap-1.5">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  hoveredKeyword.type === 'search_term' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-indigo-500 text-white'
                }`}>
                  {hoveredKeyword.type === 'search_term' ? '企业检索词' : '专利技术特征'}
                </span>
                <span className="text-[11px] text-slate-400">
                  {hoveredKeyword.category || '科技前沿'}
                </span>
              </div>
              
              <div className="flex items-center gap-2 group/title">
                <h4 className="text-sm font-bold text-white leading-snug">
                  {hoveredKeyword.type === 'search_term' ? `"${hoveredKeyword.keyword}"` : `#${hoveredKeyword.keyword}`}
                </h4>
                {/* 关键词复制按钮 */}
                <CopyIconButton text={hoveredKeyword.keyword} tooltipTitle="复制关键词" />
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-lg font-black text-amber-400">{hoveredKeyword.count}</span>
              <span className="text-[10px] text-slate-400 block">次检索/关联</span>
            </div>
          </div>

          {/* 哪个企业查看的 (企业名单 - 移入即显示复制按钮) */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-bold text-blue-300 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-blue-400" />
                <span>检索与关注此词的企业 ({hoveredKeyword.companies.length} 家)：</span>
              </span>
            </div>

            <div className="space-y-1.5 max-h-24 overflow-y-auto pr-1">
              {hoveredKeyword.companies.map((comp, cIdx) => (
                <div 
                  key={cIdx} 
                  className="group/comp bg-slate-800/90 hover:bg-slate-800 rounded-lg p-1.5 px-2 text-xs flex items-center justify-between gap-2 border border-slate-700/60 transition-colors"
                >
                  <div className="truncate flex items-center gap-1.5">
                    <span className="font-bold text-white text-xs">{comp.shortName}</span>
                    <span className="text-[10px] text-slate-400">({comp.province})</span>
                    {/* 悬停出现企业名称复制按钮 */}
                    <div className="opacity-0 group-hover/comp:opacity-100 transition-opacity">
                      <CopyIconButton text={comp.name} tooltipTitle="复制企业全称" className="p-0.5" />
                    </div>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-900/60 text-blue-200 shrink-0 font-medium">
                    {comp.industry.split('/')[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 对应查看的专利 (专利列表 - 移入即显示专利号/名称复制按钮) */}
          <div className="space-y-1.5 pt-1 border-t border-slate-800">
            <div className="text-[11px] font-bold text-indigo-300 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                <span>对应调阅的吉大专利成果 ({hoveredKeyword.patents.length} 篇)：</span>
              </span>
            </div>

            <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1">
              {hoveredKeyword.patents.map((pat, pIdx) => (
                <div 
                  key={pIdx} 
                  className="group/pat bg-slate-800/90 hover:bg-slate-800 rounded-lg p-1.5 px-2 text-xs space-y-1 border border-slate-700/60 transition-colors"
                >
                  <div className="flex items-center justify-between gap-1 text-[10px]">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-amber-300">[{pat.patentNo}]</span>
                      {/* 悬停出现专利号复制按钮 */}
                      <div className="opacity-0 group-hover/pat:opacity-100 transition-opacity">
                        <CopyIconButton text={pat.patentNo} tooltipTitle="复制专利号" className="p-0.5" />
                      </div>
                    </div>
                    <span className="text-slate-300 truncate">{pat.inventor} 教授 ({pat.college.split('/')[0]})</span>
                  </div>
                  
                  <div className="flex items-center justify-between gap-1">
                    <div className="text-[11px] text-slate-200 font-medium truncate">
                      {pat.title}
                    </div>
                    {/* 悬停出现标题复制按钮 */}
                    <div className="opacity-0 group-hover/pat:opacity-100 transition-opacity shrink-0">
                      <CopyIconButton text={`${pat.patentNo} ${pat.title}`} tooltipTitle="复制专利成果名称" className="p-0.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 底部点击引导 */}
          <div className="pt-1.5 border-t border-slate-800 text-[10px] text-amber-300/90 flex items-center font-medium">
            <span>🖱️ 点击此词可联动筛选企业列表</span>
          </div>

        </div>
      )}

    </div>
  );
};
