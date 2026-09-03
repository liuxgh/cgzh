import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  TrendingUp, 
  Building2, 
  Sparkles, 
  ChevronUp, 
  ChevronDown, 
  Filter
} from 'lucide-react';
import { PatentItem, TargetEnterprise } from '../types';
import { PatentChinaMapVisualizer } from './PatentChinaMapVisualizer';

interface PatentNationalDistributionCardProps {
  activePatent?: PatentItem;
  chainInfo?: {
    name: string;
    category?: string;
    nodeName?: string;
  };
  productInfo?: {
    name: string;
    filingEnterprise?: string;
    industryCategory?: string;
  };
  title?: string;
  enterprises: TargetEnterprise[];
  selectedProvince?: string;
  onSelectProvince?: (province: string) => void;
  filteredCount?: number;
}

export const PatentNationalDistributionCard: React.FC<PatentNationalDistributionCardProps> = ({
  activePatent,
  chainInfo,
  productInfo,
  title,
  enterprises,
  selectedProvince = 'all',
  onSelectProvince,
  filteredCount
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  // Calculate real distribution from enterprises data
  const { 
    totalMatches, 
    provinceData, 
    topProvinces, 
    coveredProvincesCount, 
    coveredCitiesCount
  } = useMemo(() => {
    const total = enterprises.length;
    
    // Group by province & city
    const provCounts: Record<string, number> = {};
    const cityCounts: Record<string, { count: number; province: string }> = {};

    enterprises.forEach(ent => {
      const p = ent.province || '其他';
      const c = ent.city || '其他';
      
      provCounts[p] = (provCounts[p] || 0) + 1;
      
      if (!cityCounts[c]) {
        cityCounts[c] = { count: 0, province: p };
      }
      cityCounts[c].count += 1;
    });

    // Format for top ranking
    const pData = Object.entries(provCounts)
      .map(([name, count]) => ({
        name,
        shortName: name.replace('省', '').replace('市', ''),
        count,
        percentage: total > 0 ? ((count / total) * 100).toFixed(1) : '0'
      }))
      .sort((a, b) => b.count - a.count);

    return {
      totalMatches: total,
      provinceData: pData,
      topProvinces: pData.slice(0, 5),
      coveredProvincesCount: Object.keys(provCounts).length,
      coveredCitiesCount: Object.keys(cityCounts).length
    };
  }, [enterprises]);

  return (
    <div className="bg-white rounded-3xl border border-[#D8E2F0] shadow-xs overflow-hidden transition-all duration-300">
      {/* Top Title & Collapse Toggle */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-50 via-blue-50/30 to-indigo-50/20 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5 min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {activePatent && (
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5 flex-wrap">
                <span>关联专利：</span>
                <strong className="font-mono text-[#0F52BA] bg-blue-50 px-2 py-0.5 rounded border border-blue-200/70 font-bold">
                  {activePatent.patentNo}
                </strong>
                <span className="text-slate-800 font-bold text-xs sm:text-sm">
                  {activePatent.title}
                </span>
              </span>
            )}
            {chainInfo && (
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5 flex-wrap">
                <span>关联产业链：</span>
                <strong className="font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200/70 text-xs sm:text-sm">
                  {chainInfo.name}
                </strong>
                {chainInfo.category && (
                  <span className="text-xs text-slate-500 font-medium">({chainInfo.category})</span>
                )}
                {chainInfo.nodeName && (
                  <span className="px-2 py-0.5 bg-blue-50 text-[#0F52BA] rounded text-xs font-bold border border-blue-200/60">
                    {chainInfo.nodeName}
                  </span>
                )}
              </span>
            )}
            {productInfo && (
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5 flex-wrap">
                <span>关联备案产品：</span>
                <strong className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200/70 text-xs sm:text-sm">
                  {productInfo.name}
                </strong>
                {productInfo.industryCategory && (
                  <span className="text-xs text-slate-500 font-medium">({productInfo.industryCategory})</span>
                )}
                {productInfo.filingEnterprise && (
                  <span className="px-2 py-0.5 bg-blue-50 text-[#0F52BA] rounded text-xs font-bold border border-blue-200/60">
                    {productInfo.filingEnterprise}
                  </span>
                )}
              </span>
            )}
          </div>
          <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <span>{title || (productInfo ? "国家专利密集型产品备案企业全国地理与省市分布" : chainInfo ? "当前产业链重点靶向企业全国地理与省市分布" : "当前技术全国匹配企业总量与省市分布")}</span>
          </h3>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-auto">
          {/* Collapse/Expand Toggle */}
          <button
            id="btn-toggle-distribution-card"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5 text-xs font-bold px-3 py-2"
            title={isCollapsed ? "展开地图与分布" : "收起地图与分布"}
          >
            <span>{isCollapsed ? "展开分布地图" : "收起图表"}</span>
            {isCollapsed ? <ChevronDown className="w-4 h-4 text-slate-500" /> : <ChevronUp className="w-4 h-4 text-slate-500" />}
          </button>
        </div>
      </div>

      {/* KPI Highlight Strip (Clean 2-Metric Layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 bg-slate-50/50 border-b border-slate-100">
        
        {/* Metric 1: Total National Matched Enterprises */}
        <div className="p-4 sm:p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-semibold">全国匹配企业总量</div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl sm:text-3xl font-black font-mono text-[#082C6C]">
                {totalMatches}
              </span>
              <span className="text-xs font-bold text-slate-400">家靶向企业</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Covered Regions */}
        <div className="p-4 sm:p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20 shrink-0">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-semibold">全国辐射省市范围</div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl sm:text-3xl font-black font-mono text-indigo-900">
                {coveredProvincesCount}
              </span>
              <span className="text-xs font-bold text-slate-400">个省区 / {coveredCitiesCount}个重点城市</span>
            </div>
          </div>
        </div>

      </div>

      {/* Main Collapsible China Map and Ranking Content */}
      {!isCollapsed && (
        <div className="p-4 sm:p-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            
            {/* Left: China Map Visualizer (7 cols) */}
            <div className="lg:col-span-7 flex flex-col">
              <PatentChinaMapVisualizer
                enterprises={enterprises}
                selectedProvince={selectedProvince}
                onSelectProvince={onSelectProvince}
              />
            </div>

            {/* Right: Top Regional Distribution Ranking & Quick Action (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200/80 space-y-3">
              <div className="space-y-3 flex-1 flex flex-col justify-start">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-[#0F52BA]" />
                    <h4 className="text-sm font-black text-slate-900">重点匹配省份分布排行</h4>
                  </div>
                  <span className="text-[11px] text-slate-400">按匹配数量降序</span>
                </div>

                {/* Province Rank List */}
                <div className="space-y-2 flex-1 flex flex-col justify-around">
                  {topProvinces.slice(0, 5).map((prov, idx) => {
                    const isSelected = selectedProvince !== 'all' && 
                      (prov.name.includes(selectedProvince) || prov.shortName.includes(selectedProvince));
                    return (
                      <div 
                        key={prov.name}
                        onClick={() => {
                          if (onSelectProvince) {
                            const clean = prov.name.replace('省', '').replace('市', '');
                            onSelectProvince(selectedProvince === clean ? 'all' : clean);
                          }
                        }}
                        className={`group px-3 py-2 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                          isSelected 
                            ? 'bg-blue-50/90 border-blue-500 shadow-2xs' 
                            : 'bg-white hover:bg-blue-50/40 border-slate-200/80 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold font-mono shrink-0 ${
                            idx === 0 
                              ? 'bg-amber-500 text-white shadow-2xs' 
                              : idx === 1 
                                ? 'bg-slate-400 text-white' 
                                : idx === 2 
                                  ? 'bg-amber-700/70 text-white' 
                                  : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}>
                            {idx + 1}
                          </span>
                          <span className="font-bold text-slate-800 text-xs sm:text-sm group-hover:text-blue-700 transition-colors truncate">
                            {prov.name}
                          </span>
                        </div>

                        {/* Progress Bar & Number */}
                        <div className="flex items-center gap-2.5 shrink-0">
                          <div className="w-16 sm:w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden border border-slate-200/60 hidden sm:block">
                            <div 
                              className="bg-[#0F52BA] h-full rounded-full transition-all"
                              style={{ width: `${(prov.count / (provinceData[0]?.count || 1)) * 100}%` }}
                            />
                          </div>
                          <div className="text-right flex items-baseline">
                            <span className="font-mono font-black text-sm text-[#0F52BA]">
                              {prov.count}
                            </span>
                            <span className="text-[11px] text-slate-400 ml-1">家 ({prov.percentage}%)</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Filter Status Indicator */}
              {selectedProvince !== 'all' ? (
                <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between text-xs text-blue-900 mt-2">
                  <div className="flex items-center gap-2">
                    <Filter className="w-3.5 h-3.5 text-blue-600" />
                    <span>已锁定筛选：<strong>{selectedProvince}</strong></span>
                    {filteredCount !== undefined && (
                      <span className="text-blue-600 font-bold">（{filteredCount} 家）</span>
                    )}
                  </div>
                  <button
                    onClick={() => onSelectProvince && onSelectProvince('all')}
                    className="font-bold text-blue-700 hover:text-blue-900 underline cursor-pointer text-xs"
                  >
                    清除
                  </button>
                </div>
              ) : (
                <div className="p-2.5 bg-white border border-slate-200/80 rounded-xl flex items-center justify-between text-xs text-slate-500 mt-2">
                  <span className="flex items-center gap-1.5 text-[11px]">
                    <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                    当前展示全国所有区域企业
                  </span>
                  <span className="text-slate-600 font-bold font-mono text-xs">共 {totalMatches} 家</span>
                </div>
              )}

            </div>

          </div>
        </div>
      )}
    </div>
  );
};
