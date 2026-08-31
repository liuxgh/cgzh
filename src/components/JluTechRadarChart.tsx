import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { subject: '化学与新材料', A: 120, fullMark: 150 },
  { subject: '机械与车辆工程', A: 98, fullMark: 150 },
  { subject: '地球与地质科学', A: 86, fullMark: 150 },
  { subject: '仿生与农业工程', A: 99, fullMark: 150 },
  { subject: '医学与生命科学', A: 85, fullMark: 150 },
  { subject: '电子与计算机', A: 65, fullMark: 150 },
];

export const JluTechRadarChart = () => {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="#E2E8F0" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#475569', fontSize: 13, fontWeight: 600 }} 
          />
          <Tooltip 
            formatter={(value) => [`${value} 核心专利群`, '专利强度']}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Radar 
            name="吉林大学" 
            dataKey="A" 
            stroke="#0F52BA" 
            strokeWidth={3}
            fill="#0F52BA" 
            fillOpacity={0.2} 
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
