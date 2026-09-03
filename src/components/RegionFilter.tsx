import React, { useState, useEffect } from 'react';

const REGION_DATA: Record<string, Record<string, string[]>> = {
  '北京': { '北京市': ['朝阳区', '海淀区', '大兴区', '昌平区', '丰台区', '西城区', '东城区', '顺义区', '通州区'] },
  '上海': { '上海市': ['浦东新区', '闵行区', '嘉定区', '徐汇区', '静安区', '松江区', '奉贤区', '杨浦区'] },
  '广东': { '深圳市': ['南山区', '福田区', '宝安区', '龙岗区', '光明区'], '广州市': ['天河区', '黄埔区', '番禺区', '越秀区'], '东莞市': ['松山湖', '南城', '东城'], '佛山市': ['顺德区', '南海区', '禅城区'], '珠海市': ['香洲区', '金湾区'], '惠州市': ['惠城区', '惠阳区'] },
  '江苏': { '苏州市': ['工业园区', '昆山市', '吴中区', '相城区', '虎丘区'], '南京市': ['江宁区', '建邺区', '鼓楼区', '雨花台区'], '常州市': ['武进区', '新北区'], '无锡市': ['新吴区', '梁溪区', '锡山区'], '南通市': ['崇川区', '通州区'] },
  '浙江': { '杭州市': ['滨江区', '余杭区', '西湖区', '钱塘区', '上城区'], '宁波市': ['鄞州区', '慈溪市', '北仑区', '海曙区'], '嘉兴市': ['南湖区', '秀洲区', '海宁市'], '绍兴市': ['柯桥区', '越城区'] },
  '吉林': { '长春市': ['朝阳区', '南关区', '高新区', '绿园区', '宽城区', '经开区', '净月高新区'], '吉林市': ['船营区', '丰满区', '高新区'], '四平市': ['铁西区', '铁东区'], '松原市': ['宁江区'], '延边朝鲜族自治州': ['延吉市'] },
  '辽宁': { '沈阳市': ['浑南区', '和平区', '沈河区', '铁西区'], '大连市': ['甘井子区', '金州区', '高新园区', '沙河口区'], '鞍山市': ['铁东区', '铁西区'] },
  '黑龙江': { '哈尔滨市': ['松北区', '南岗区', '道里区', '平房区'], '大庆市': ['萨尔图区', '让胡路区', '高新区'] },
  '山东': { '青岛市': ['黄岛区', '崂山区', '市南区', '市北区', '城阳区'], '济南市': ['历下区', '高新区', '市中区', '历城区'], '烟台市': ['芝罘区', '福山区'], '潍坊市': ['奎文区', '潍城区'] },
  '福建': { '宁德市': ['蕉城区', '福安市'], '福州市': ['鼓楼区', '仓山区', '晋安区', '闽侯县'], '厦门市': ['思明区', '湖里区', '集美区', '海沧区'], '泉州市': ['丰泽区', '鲤城区', '晋江市'] },
  '四川': { '成都市': ['高新区', '武侯区', '双流区', '锦江区', '青羊区', '天府新区'], '绵阳市': ['涪城区', '游仙区'], '宜宾市': ['翠屏区'] },
  '湖北': { '武汉市': ['东湖高新区', '洪山区', '江夏区', '武昌区', '江汉区'], '襄阳市': ['襄城区', '樊城区'], '宜昌市': ['西陵区'] },
  '湖南': { '长沙市': ['岳麓区', '雨花区', '天心区', '开福区', '芙蓉区'], '株洲市': ['天元区'], '湘潭市': ['岳塘区'] },
  '河南': { '郑州市': ['金水区', '高新区', '中原区', '管城回族区', '郑东新区'], '洛阳市': ['洛龙区', '西工区'], '新乡市': ['红旗区'] },
  '河北': { '石家庄市': ['长安区', '裕华区', '桥西区', '高新区'], '唐山市': ['路北区', '路南区'], '保定市': ['竞秀区', '莲池区'] },
  '安徽': { '合肥市': ['蜀山区', '高新区', '包河区', '庐阳区', '经开区'], '芜湖市': ['镜湖区', '鸠江区'] },
  '江西': { '南昌市': ['高新区', '红谷滩区', '西湖区', '东湖区'], '赣州市': ['章贡区'] },
  '陕西': { '西安市': ['雁塔区', '高新区', '未央区', '碑林区', '长安区'], '咸阳市': ['秦都区'] },
  '重庆': { '重庆市': ['渝北区', '江北区', '九龙坡区', '沙坪坝区', '渝中区', '南岸区'] },
  '天津': { '天津市': ['滨海新区', '和平区', '河西区', '南开区', '西青区', '武清区'] },
  '山西': { '太原市': ['小店区', '迎泽区', '杏花岭区'] },
  '广西': { '南宁市': ['青秀区', '西乡塘区'], '桂林市': ['七星区', '象山区'], '柳州市': ['城中区'] },
  '海南': { '海口市': ['龙华区', '美兰区'], '三亚市': ['吉阳区', '天涯区'] },
  '贵州': { '贵阳市': ['观山湖区', '南明区', '云岩区'] },
  '云南': { '昆明市': ['五华区', '盘龙区', '官渡区', '呈贡区'] },
  '内蒙古': { '呼和浩特市': ['赛罕区', '新城区'], '包头市': ['昆都仑区'] },
  '新疆': { '乌鲁木齐市': ['天山区', '水磨沟区', '高新区'] },
  '甘肃': { '兰州市': ['城关区', '安宁区'] },
  '宁夏': { '银川市': ['金凤区', '兴庆区'] },
  '青海': { '西宁市': ['城西区', '城中区'] },
  '西藏': { '拉萨市': ['城关区'] },
  '香港': { '香港特别行政区': ['中西区', '湾仔区', '九龙城区'] },
  '澳门': { '澳门特别行政区': ['花地玛堂区', '大堂区'] },
  '台湾': { '台湾省': ['台北市', '新竹市', '台中市'] }
};

interface RegionFilterProps {
  value?: { p: string; c: string; d: string };
  selectedProvince?: string;
  selectedCity?: string;
  selectedDistrict?: string;
  onFilterChange: (province: string, city: string, district: string) => void;
}

export const RegionFilter: React.FC<RegionFilterProps> = ({
  value,
  selectedProvince,
  selectedCity,
  selectedDistrict,
  onFilterChange
}) => {
  const [province, setProvince] = useState<string>(() => {
    return value?.p || selectedProvince || 'all';
  });
  const [city, setCity] = useState<string>(() => {
    return value?.c || selectedCity || 'all';
  });
  const [district, setDistrict] = useState<string>(() => {
    return value?.d || selectedDistrict || 'all';
  });

  // Helper to normalize province to key in REGION_DATA
  const findMatchingProvinceKey = (raw: string) => {
    if (!raw || raw === 'all') return 'all';
    const clean = raw.replace('省', '').replace('市', '').replace('自治区', '').replace('特别行政区', '').replace('壮族', '').replace('回族', '').replace('维吾尔', '').trim();
    if (REGION_DATA[clean]) return clean;
    const found = Object.keys(REGION_DATA).find(k => k === clean || raw.includes(k) || k.includes(clean));
    return found || clean;
  };

  // Sync state when controlled props change
  useEffect(() => {
    const targetP = value?.p !== undefined ? value.p : selectedProvince;
    const targetC = value?.c !== undefined ? value.c : selectedCity;
    const targetD = value?.d !== undefined ? value.d : selectedDistrict;

    if (targetP !== undefined) {
      const matchedKey = findMatchingProvinceKey(targetP);
      setProvince(matchedKey);
    }
    if (targetC !== undefined) {
      setCity(targetC);
    }
    if (targetD !== undefined) {
      setDistrict(targetD);
    }
  }, [value?.p, value?.c, value?.d, selectedProvince, selectedCity, selectedDistrict]);

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
        id="select-region-province"
        value={province}
        onChange={handleProvinceChange}
        className="bg-white border border-[#D8E2F0] rounded-xl px-2.5 py-1.5 text-sm text-slate-700 focus:outline-none focus:border-[#0F52BA] shadow-sm font-medium min-w-[95px]"
      >
        <option value="all">全国省份</option>
        {provinces.map(p => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      {cities.length > 0 && (
        <select
          id="select-region-city"
          value={city}
          onChange={handleCityChange}
          className="bg-white border border-[#D8E2F0] rounded-xl px-2.5 py-1.5 text-sm text-slate-700 focus:outline-none focus:border-[#0F52BA] shadow-sm font-medium min-w-[90px] animate-in fade-in"
        >
          <option value="all">全市</option>
          {cities.map(c => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      )}

      {districts.length > 0 && (
        <select
          id="select-region-district"
          value={district}
          onChange={handleDistrictChange}
          className="bg-white border border-[#D8E2F0] rounded-xl px-2.5 py-1.5 text-sm text-slate-700 focus:outline-none focus:border-[#0F52BA] shadow-sm font-medium min-w-[90px] animate-in fade-in"
        >
          <option value="all">全区</option>
          {districts.map(d => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};
