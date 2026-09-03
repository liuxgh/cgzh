import React, { useEffect, useRef, useMemo } from 'react';
import * as echarts from 'echarts';
import chinaStandardGeoJson from '../data/china_standard.json';
import { TargetEnterprise } from '../types';
import { Info, RotateCcw } from 'lucide-react';

interface PatentChinaMapVisualizerProps {
  enterprises: TargetEnterprise[];
  selectedProvince?: string;
  onSelectProvince?: (province: string) => void;
}

// Register official standard China GeoJSON once
if (!echarts.getMap('china')) {
  echarts.registerMap('china', chinaStandardGeoJson as any);
}

export const PatentChinaMapVisualizer: React.FC<PatentChinaMapVisualizerProps> = ({
  enterprises,
  selectedProvince = 'all',
  onSelectProvince
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<echarts.ECharts | null>(null);

  // Compute province statistics
  const { provinceStats, totalCount, provinceDataList } = useMemo(() => {
    const pMap: Record<string, { count: number; names: string[]; shortName: string; fullName: string }> = {};

    enterprises.forEach(ent => {
      const p = ent.province || '其他';
      const cleanP = p.replace('省', '').replace('市', '');

      if (!pMap[cleanP]) {
        pMap[cleanP] = { count: 0, names: [], shortName: cleanP, fullName: p };
      }
      pMap[cleanP].count += 1;
      if (pMap[cleanP].names.length < 3 && ent.name) {
        pMap[cleanP].names.push(ent.shortName || ent.name);
      }
    });

    // Map list for ECharts series data (name matching standard GeoJSON provinces)
    const pList = (chinaStandardGeoJson as any).features.map((f: any) => {
      const name = f.properties.name;
      const shortName = name.replace('省', '').replace('市', '').replace('自治区', '').replace('特别行政区', '').replace('壮族', '').replace('回族', '').replace('维吾尔', '');
      
      // Match by exact name or short name
      let foundStat = pMap[shortName] || pMap[name] || null;
      if (!foundStat) {
        const matchedKey = Object.keys(pMap).find(k => name.includes(k) || k.includes(shortName));
        if (matchedKey) foundStat = pMap[matchedKey];
      }

      const count = foundStat ? foundStat.count : 0;
      return {
        name: name,
        shortName: shortName,
        value: count,
        topEnterprises: foundStat ? foundStat.names : [],
        percentage: ((count / (enterprises.length || 1)) * 100).toFixed(1)
      };
    });

    return {
      provinceStats: pMap,
      totalCount: enterprises.length || 1,
      provinceDataList: pList
    };
  }, [enterprises]);

  // Initialize & Update ECharts Map Instance
  useEffect(() => {
    if (!chartContainerRef.current) return;

    if (!chartInstanceRef.current) {
      chartInstanceRef.current = echarts.init(chartContainerRef.current, undefined, {
        renderer: 'canvas'
      });

      // Handle map click for province drilldown
      chartInstanceRef.current.on('click', (params: any) => {
        if (!onSelectProvince) return;
        let provName = params.data?.shortName || params.name?.replace('省', '').replace('市', '');

        if (provName) {
          if (selectedProvince === provName) {
            onSelectProvince('all');
          } else {
            onSelectProvince(provName);
          }
        }
      });
    }

    const chart = chartInstanceRef.current;

    const series: any[] = [
      {
        name: '全国省份匹配',
        type: 'map',
        map: 'china',
        roam: false,
        zoom: 1.22,
        center: [104.5, 36.2],
        aspectScale: 0.75,
        layoutCenter: ['50%', '50%'],
        layoutSize: '98%',
        selectedMode: 'single',
        data: provinceDataList.map(item => ({
          ...item,
          selected: selectedProvince !== 'all' && (item.name.includes(selectedProvince) || item.shortName.includes(selectedProvince))
        })),
        itemStyle: {
          areaColor: '#EDF5FC',
          borderColor: '#94A3B8',
          borderWidth: 0.8
        },
        emphasis: {
          itemStyle: {
            areaColor: '#1D4ED8',
            borderColor: '#FFFFFF',
            borderWidth: 1.5,
            shadowBlur: 8,
            shadowColor: 'rgba(0, 0, 0, 0.2)'
          },
          label: {
            show: true,
            color: '#FFFFFF',
            fontWeight: 'bold',
            fontSize: 10.5
          }
        },
        select: {
          itemStyle: {
            areaColor: '#1E40AF',
            borderColor: '#FFFFFF',
            borderWidth: 2
          },
          label: {
            show: true,
            color: '#FFFFFF',
            fontWeight: 'bold'
          }
        },
        label: {
          show: true,
          formatter: (params: any) => {
            if (params.value > 0) {
              const sName = params.data?.shortName || params.name;
              return `${sName} ${params.value}`;
            }
            return '';
          },
          color: '#0F172A',
          fontSize: 10,
          fontWeight: 'bold'
        }
      }
    ];

    const option: echarts.EChartsOption = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        borderColor: '#334155',
        borderWidth: 1,
        padding: [8, 12],
        textStyle: {
          color: '#FFFFFF',
          fontSize: 12
        },
        formatter: (params: any) => {
          const data = params.data;
          if (!data) return `<div class="font-bold">${params.name}</div><div class="text-slate-400">暂无入库企业</div>`;
          const count = data.value || 0;
          const topList = data.topEnterprises || [];
          return `
            <div style="min-width: 160px;">
              <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #334155; padding-bottom: 4px; margin-bottom: 4px;">
                <strong style="color: #60A5FA; font-size: 13px;">${params.name}</strong>
                <span style="background: #2563EB; color: #fff; padding: 1px 5px; border-radius: 4px; font-weight: bold; font-family: monospace; font-size: 11px;">${count} 家企业</span>
              </div>
              <div style="font-size: 11px; color: #94A3B8; margin-bottom: 3px;">
                全国占比: <strong style="color: #34D399;">${data.percentage || 0}%</strong>
              </div>
              ${topList.length > 0 ? `
                <div style="font-size: 11px; color: #CBD5E1; margin-top: 3px; border-top: 1px solid #1E293B; padding-top: 3px;">
                  <span style="color: #94A3B8;">代表企业:</span> ${topList.join('、')}
                </div>
              ` : ''}
              <div style="font-size: 10px; color: #93C5FD; margin-top: 5px; text-align: right;">
                点击可在下方列表快速筛选
              </div>
            </div>
          `;
        }
      },
      visualMap: {
        min: 0,
        max: 9,
        show: false,
        inRange: {
          color: [
            '#EDF5FC', // 0 matches
            '#BFDBFE', // 1-2 matches
            '#60A5FA', // 3-4 matches
            '#2563EB', // 5-7 matches
            '#0F52BA'  // >= 8 matches
          ]
        }
      },
      series: series
    };

    chart.setOption(option, true);

    const handleResize = () => {
      chart.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [provinceDataList, selectedProvince, onSelectProvince]);

  return (
    <div className="relative w-full h-full bg-[#F8FAFC] rounded-2xl border border-slate-200/80 p-4 flex flex-col justify-between overflow-hidden select-none">
      
      {/* Map Header */}
      <div className="w-full flex items-center justify-between gap-2 mb-1 z-10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0F52BA]"></span>
          <h4 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
            全国匹配企业地理分布图
            <span className="text-xs font-normal text-slate-500 hidden sm:inline">（标准行政底图·标注匹配数量）</span>
          </h4>
        </div>

        {selectedProvince !== 'all' && (
          <button
            id="btn-reset-map-filter"
            onClick={() => onSelectProvince && onSelectProvince('all')}
            className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            重置选中 ({selectedProvince})
          </button>
        )}
      </div>

      {/* Standard ECharts China Map Canvas (Optimized Compact Height) */}
      <div className="relative w-full h-[300px] sm:h-[320px] flex-1 flex items-center justify-center">
        <div 
          ref={chartContainerRef} 
          className="w-full h-full"
          style={{ minHeight: '290px' }}
        />

        {/* Standard Cartography Footnote */}
        <div className="absolute bottom-0 left-1 text-[9.5px] text-slate-400 pointer-events-none">
          审图依据：自然资源部标准地图服务系统（GS标准底图）
        </div>
      </div>

      {/* Map Footer Legend & Instructions */}
      <div className="w-full flex flex-wrap items-center justify-between gap-2 pt-2.5 mt-1 border-t border-slate-200/70 text-[11px] text-slate-500">
        
        {/* Heatmap Legend */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-slate-600">图例:</span>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#0F52BA]"></span>
            <span>≥8家</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#2563EB]"></span>
            <span>5-7家</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#60A5FA]"></span>
            <span>3-4家</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#BFDBFE]"></span>
            <span>1-2家</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#EDF5FC] border border-slate-300"></span>
            <span>0家</span>
          </div>
        </div>

        {/* Hint */}
        <div className="flex items-center gap-1 text-[10.5px] text-slate-400">
          <Info className="w-3 h-3 text-blue-500" />
          <span>点击省份可在下方穿透筛选</span>
        </div>

      </div>

    </div>
  );
};
