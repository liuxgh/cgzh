import React, { useMemo } from 'react';
import { 
  Calendar, 
  Search, 
  FileText, 
  Clock, 
  TrendingUp, 
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { BaitenVisitorRecord, SearchSession, ViewedPatentItem } from '../data/baitenVisitorTrackerData';

interface EnterpriseActivityTimelineProps {
  lead: BaitenVisitorRecord;
  onJumpToPatent?: (patentNo: string) => void;
}

export const EnterpriseActivityTimeline: React.FC<EnterpriseActivityTimelineProps> = ({
  lead,
  onJumpToPatent
}) => {
  // 按日期归纳该企业的检索与调阅记录
  const timelineData = useMemo(() => {
    const sessions = lead.searchSessions || [
      {
        sessionId: 'sess-default',
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

    // 按日期聚合
    const dateMap: Record<string, {
      date: string;
      fullDate: string;
      searchCount: number;
      patentViewCount: number;
      durationSeconds: number;
      keywords: string[];
      patents: ViewedPatentItem[];
      sessions: SearchSession[];
    }> = {};

    sessions.forEach(sess => {
      const d = sess.searchDate; // e.g. "2026-09-10"
      const shortDate = d.slice(5); // e.g. "09-10"
      if (!dateMap[d]) {
        dateMap[d] = {
          date: shortDate,
          fullDate: d,
          searchCount: 0,
          patentViewCount: 0,
          durationSeconds: 0,
          keywords: [],
          patents: [],
          sessions: []
        };
      }
      dateMap[d].searchCount += 1;
      dateMap[d].patentViewCount += sess.patents.length;
      dateMap[d].durationSeconds += sess.viewDurationSeconds;
      if (!dateMap[d].keywords.includes(sess.searchKeyword)) {
        dateMap[d].keywords.push(sess.searchKeyword);
      }
      sess.patents.forEach(p => {
        if (!dateMap[d].patents.some(ep => ep.patentNo === p.patentNo)) {
          dateMap[d].patents.push(p);
        }
      });
      dateMap[d].sessions.push(sess);
    });

    // 排序日期升序
    const sorted = Object.values(dateMap).sort((a, b) => a.fullDate.localeCompare(b.fullDate));
    return sorted;
  }, [lead]);

  const totalSearches = useMemo(() => {
    return timelineData.reduce((acc, curr) => acc + curr.searchCount, 0);
  }, [timelineData]);

  const totalPatentsViewed = useMemo(() => {
    return timelineData.reduce((acc, curr) => acc + curr.patentViewCount, 0);
  }, [timelineData]);

  return (
    <div className="bg-slate-50/90 rounded-2xl p-5 border border-slate-200/90 space-y-5">
      {/* 头部标题与统计指标 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>{lead.shortName || lead.companyName} 检索与调阅时间线图表</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                时序动态追踪
              </span>
            </h4>
            <p className="text-xs text-slate-500">
              按日追踪该企业的检索频次与对应查看吉大专利成果的时序轨迹
            </p>
          </div>
        </div>

        {/* 右侧核心概览指标 */}
        <div className="flex items-center gap-2 text-xs">
          <div className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-slate-500">累计检索：</span>
            <strong className="text-blue-700 font-bold">{totalSearches} 次</strong>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-indigo-600" />
            <span className="text-slate-500">查阅专利：</span>
            <strong className="text-indigo-700 font-bold">{totalPatentsViewed} 件次</strong>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-slate-500">活跃天数：</span>
            <strong className="text-emerald-700 font-bold">{timelineData.length} 天</strong>
          </div>
        </div>
      </div>

      {/* 柱状时序图表与时间轴节点 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* 左侧：每日检索次数 vs 查阅专利件数 柱状对比图 */}
        <div className="lg:col-span-6 bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>各日期检索频次与调阅专利件数对比</span>
            </span>
            <span className="text-[11px] text-slate-400">单位：次 / 件</span>
          </div>

          <div className="h-52 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timelineData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 11, fill: '#475569', fontWeight: 500 }} 
                  axisLine={{ stroke: '#E2E8F0' }} 
                  tickLine={false} 
                />
                <YAxis 
                  allowDecimals={false} 
                  tick={{ fontSize: 10, fill: '#64748B' }} 
                  axisLine={false} 
                  tickLine={false} 
                />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-lg text-xs space-y-1.5 border border-slate-700">
                          <div className="font-bold text-slate-200 border-b border-slate-800 pb-1">
                            📅 {data.fullDate} 检索行为记录
                          </div>
                          <div className="flex items-center justify-between gap-4 text-blue-300">
                            <span>🔍 检索次数:</span>
                            <span className="font-bold">{data.searchCount} 次</span>
                          </div>
                          <div className="flex items-center justify-between gap-4 text-indigo-300">
                            <span>📑 调阅吉大专利:</span>
                            <span className="font-bold">{data.patentViewCount} 件</span>
                          </div>
                          <div className="flex items-center justify-between gap-4 text-emerald-300">
                            <span>⏱️ 停留时长:</span>
                            <span className="font-bold">{data.durationSeconds} 秒</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend 
                  verticalAlign="top" 
                  height={28}
                  formatter={(value) => <span className="text-xs text-slate-700 font-medium">{value}</span>}
                />
                <Bar 
                  dataKey="searchCount" 
                  name="检索次数 (次)" 
                  fill="#3B82F6" 
                  radius={[4, 4, 0, 0]} 
                  barSize={20}
                />
                <Bar 
                  dataKey="patentViewCount" 
                  name="调阅专利 (件)" 
                  fill="#6366F1" 
                  radius={[4, 4, 0, 0]} 
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 右侧：时序节点卡片流 (清晰显示某一天检索了什么，又查看了哪些专利) */}
        <div className="lg:col-span-6 bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              <span>时序详情明细流</span>
            </span>
            <span className="text-[11px] text-slate-400">共 {timelineData.length} 个活跃记录点</span>
          </div>

          <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
            {timelineData.map((item, idx) => (
              <div 
                key={idx} 
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all space-y-2"
              >
                {/* 节点头部：日期 + 次数 + 篇数 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-blue-600 text-white text-xs font-mono font-bold">
                      {item.fullDate}
                    </span>
                    <span className="text-xs text-slate-500">
                      停留 <strong className="text-slate-700">{item.durationSeconds}秒</strong>
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200 text-[11px]">
                      检索 {item.searchCount} 次
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-200 text-[11px]">
                      调阅 {item.patentViewCount} 篇
                    </span>
                  </div>
                </div>

                {/* 检索关键词列表 */}
                <div className="text-xs flex flex-wrap items-center gap-1.5 text-slate-600">
                  <span className="font-semibold text-slate-700">🔍 检索关键词：</span>
                  {item.keywords.map((kw, kIdx) => (
                    <span 
                      key={kIdx} 
                      className="px-2 py-0.5 rounded bg-white text-blue-800 border border-blue-200 font-medium text-[11px]"
                    >
                      "{kw}"
                    </span>
                  ))}
                </div>

                {/* 查看的专利列表 */}
                <div className="text-xs space-y-1">
                  <div className="font-semibold text-slate-700">📑 调阅吉大专利清单：</div>
                  <div className="space-y-1 pl-1">
                    {item.patents.map((p, pIdx) => (
                      <div 
                        key={pIdx}
                        className="flex items-center justify-between gap-2 text-[11px] text-slate-700 hover:text-blue-600 transition-colors"
                      >
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="font-mono font-bold text-indigo-600 shrink-0">[{p.patentNo}]</span>
                          <span className="truncate">{p.title}</span>
                          <span className="text-slate-400 shrink-0">({p.inventor} 团队)</span>
                        </div>
                        {onJumpToPatent && (
                          <button
                            onClick={() => onJumpToPatent(p.patentNo)}
                            className="text-blue-600 hover:underline shrink-0 text-[10px] flex items-center gap-0.5 cursor-pointer"
                          >
                            <span>调阅</span>
                            <ArrowRight className="w-2.5 h-2.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
