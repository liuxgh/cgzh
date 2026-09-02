import React, { useState } from 'react';

const REGION_DATA: Record<string, Record<string, string[]>> = {
  '北京': { '北京市': ['朝阳区', '海淀区', '大兴区'] },
  '上海': { '上海市': ['浦东新区', '闵行区', '嘉定区'] },
  '广东': { '深圳市': ['南山区', '福田区', '宝安区'], '广州市': ['天河区', '黄埔区'], '东莞市': ['松山湖'] },
  '江苏': { '苏州市': ['工业园区', '昆山市'], '南京市': ['江宁区', '建邺区'], '常州市': ['武进区', '新北区'] },
  '浙江': { '杭州市': ['滨江区', '余杭区', '西湖区'], '宁波市': ['鄞州区', '慈溪市'] },
  '山东': { '青岛市': ['黄岛区', '崂山区'], '济南市': ['历下区', '高新区'] },
  '福建': { '宁德市': ['蕉城区', '福安市'], '福州市': ['鼓楼区', '仓山区'], '厦门市': ['思明区', '湖里区'] },
  '四川': { '成都市': ['高新区', '武侯区', '双流区'] },
  '湖北': { '武汉市': ['东湖高新区', '洪山区'] }
};

interface RegionFilterProps {
  onFilterChange: (province: string, city: string, district: string) => void;
}

export const RegionFilter: React.FC<RegionFilterProps> = ({ onFilterChange }) => {
  const [province, setProvince] = useState<string>('all');
  const [city, setCity] = useState<string>('all');
  const [district, setDistrict] = useState<string>('all');

  const provinces = Object.keys(REGION_DATA);
  const cities = province !== 'all' && REGION_DATA[province] ? Object.keys(REGION_DATA[province]) : [];
  const districts = city !== 'all' && REGION_DATA[province]?.[city] ? REGION_DATA[province][city] : [];

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const p = e.target.value;
    setProvince(p);
    setCity('all');
    setDistrict('all');
    onFilterChange(p, 'all', 'all');
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const c = e.target.value;
    setCity(c);
    setDistrict('all');
    onFilterChange(province, c, 'all');
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const d = e.target.value;
    setDistrict(d);
    onFilterChange(province, city, d);
  };

  return (
    <div className="flex items-center gap-1.5">
      <select
        value={province}
        onChange={handleProvinceChange}
        className="bg-white border border-[#D8E2F0] rounded-xl px-2.5 py-1.5 text-sm text-slate-700 focus:outline-none focus:border-[#0F52BA] shadow-sm font-medium min-w-[90px]"
      >
        <option value="all">全国省份</option>
        {provinces.map(p => <option key={p} value={p}>{p}</option>)}
      </select>

      {cities.length > 0 && (
        <select
          value={city}
          onChange={handleCityChange}
          className="bg-white border border-[#D8E2F0] rounded-xl px-2.5 py-1.5 text-sm text-slate-700 focus:outline-none focus:border-[#0F52BA] shadow-sm font-medium min-w-[90px] animate-in fade-in"
        >
          <option value="all">全市</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      )}

      {districts.length > 0 && (
        <select
          value={district}
          onChange={handleDistrictChange}
          className="bg-white border border-[#D8E2F0] rounded-xl px-2.5 py-1.5 text-sm text-slate-700 focus:outline-none focus:border-[#0F52BA] shadow-sm font-medium min-w-[90px] animate-in fade-in"
        >
          <option value="all">全区</option>
          {districts.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      )}
    </div>
  );
};
