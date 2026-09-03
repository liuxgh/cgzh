import { FeatureCollection, Geometry } from 'geojson';

// Standard China Provincial Level Administrative Divisions GeoJSON
// Strictly adhering to standard map boundary specifications (including Taiwan, Hainan, South China Sea Islands, Diaoyu Islands, etc.)
export interface ChinaProvinceFeature {
  type: 'Feature';
  properties: {
    adcode: string;
    name: string;
    shortName: string;
    center: [number, number]; // [lng, lat]
    subregion?: string;
  };
  geometry: Geometry;
}

// Major cities for matching pinpoints [lng, lat]
export interface MatchingCityLocation {
  id: string;
  name: string;
  shortName: string;
  province: string;
  coords: [number, number]; // [lng, lat]
}

export const MATCHING_CITY_COORDINATES: MatchingCityLocation[] = [
  { id: 'wuhan', name: '武汉市', shortName: '武汉', province: '湖北省', coords: [114.3055, 30.5928] },
  { id: 'shanghai', name: '上海市', shortName: '上海', province: '上海市', coords: [121.4737, 31.2304] },
  { id: 'beijing', name: '北京市', shortName: '北京', province: '北京市', coords: [116.4074, 39.9042] },
  { id: 'tianjin', name: '天津市', shortName: '天津', province: '天津市', coords: [117.2008, 39.084] },
  { id: 'hangzhou', name: '杭州市', shortName: '杭州', province: '浙江省', coords: [120.1551, 30.2741] },
  { id: 'ningbo', name: '宁波市', shortName: '宁波', province: '浙江省', coords: [121.5497, 29.8683] },
  { id: 'wenzhou', name: '温州市', shortName: '温州', province: '浙江省', coords: [120.6994, 27.9943] },
  { id: 'nanjing', name: '南京市', shortName: '南京', province: '江苏省', coords: [118.7969, 32.0603] },
  { id: 'suzhou', name: '苏州市', shortName: '苏州', province: '江苏省', coords: [120.5853, 31.2989] },
  { id: 'wuxi', name: '无锡市', shortName: '无锡', province: '江苏省', coords: [120.3119, 31.4912] },
  { id: 'changzhou', name: '常州市', shortName: '常州', province: '江苏省', coords: [119.9741, 31.8112] },
  { id: 'guangzhou', name: '广州市', shortName: '广州', province: '广东省', coords: [113.2644, 23.1291] },
  { id: 'shenzhen', name: '深圳市', shortName: '深圳', province: '广东省', coords: [114.0579, 22.5431] },
  { id: 'chengdu', name: '成都市', shortName: '成都', province: '四川省', coords: [104.0665, 30.5723] },
  { id: 'jinan', name: '济南市', shortName: '济南', province: '山东省', coords: [117.1205, 36.651] },
  { id: 'qingdao', name: '青岛市', shortName: '青岛', province: '山东省', coords: [120.3826, 36.0671] },
  { id: 'changchun', name: '长春市', shortName: '长春', province: '吉林省', coords: [125.3245, 43.8868] },
  { id: 'shenyang', name: '沈阳市', shortName: '沈阳', province: '辽宁省', coords: [123.4315, 41.8057] },
  { id: 'dalian', name: '大连市', shortName: '大连', province: '辽宁省', coords: [121.6147, 38.914] },
  { id: 'zhengzhou', name: '郑州市', shortName: '郑州', province: '河南省', coords: [113.6254, 34.7466] },
  { id: 'ningde', name: '宁德市', shortName: '宁德', province: '福建省', coords: [119.5273, 26.6592] },
  { id: 'fuzhou', name: '福州市', shortName: '福州', province: '福建省', coords: [119.3062, 26.0753] },
  { id: 'xiamen', name: '厦门市', shortName: '厦门', province: '福建省', coords: [118.0894, 24.4798] },
  { id: 'hefei', name: '合肥市', shortName: '合肥', province: '安徽省', coords: [117.2272, 31.8206] },
  { id: 'wuhu', name: '芜湖市', shortName: '芜湖', province: '安徽省', coords: [118.3765, 31.3263] },
  { id: 'changsha', name: '长沙市', shortName: '长沙', province: '湖南省', coords: [112.9388, 28.2282] },
  { id: 'zhuzhou', name: '株洲市', shortName: '株洲', province: '湖南省', coords: [113.1343, 27.8274] },
  { id: 'nanchang', name: '南昌市', shortName: '南昌', province: '江西省', coords: [115.8579, 28.682] },
  { id: 'chongqing', name: '重庆市', shortName: '重庆', province: '重庆市', coords: [106.5516, 29.563] },
  { id: 'xian', name: '西安市', shortName: '西安', province: '陕西省', coords: [108.9398, 34.3416] },
  { id: 'guiyang', name: '贵阳市', shortName: '贵阳', province: '贵州省', coords: [106.6302, 26.6477] },
  { id: 'kunming', name: '昆明市', shortName: '昆明', province: '云南省', coords: [102.8329, 24.8801] },
  { id: 'nanning', name: '南宁市', shortName: '南宁', province: '广西壮族自治区', coords: [108.3661, 22.8172] },
  { id: 'haikou', name: '海口市', shortName: '海口', province: '海南省', coords: [110.3312, 20.0319] },
  { id: 'taipei', name: '台北市', shortName: '台北', province: '台湾省', coords: [121.5654, 25.033] },
  { id: 'hongkong', name: '香港', shortName: '香港', province: '香港特别行政区', coords: [114.1694, 22.3193] },
  { id: 'macao', name: '澳门', shortName: '澳门', province: '澳门特别行政区', coords: [113.5439, 22.1987] },
];

// Nine-Dash / Ten-Dash Line Coordinate Segments for standard cartography
export const SOUTH_CHINA_SEA_DASHES: [number, number][][] = [
  [[122.9, 25.3], [123.3, 24.8]], // East of Taiwan
  [[122.5, 21.8], [122.8, 21.0]], // Bashi Channel
  [[119.5, 18.0], [119.8, 17.0]], // Scarborough Shoal East
  [[118.0, 13.0], [118.2, 12.0]], // South of Scarborough
  [[116.5, 8.5], [116.8, 7.5]],   // Nansha Southeast
  [[112.5, 4.0], [112.8, 3.2]],   // Zengmu Ansha (James Shoal)
  [[109.0, 5.5], [108.6, 6.5]],   // Nansha Southwest
  [[108.0, 10.5], [108.3, 11.5]], // Wan'an Tan East
  [[110.0, 15.5], [110.3, 16.5]], // Xisha West
  [[108.5, 19.5], [108.2, 20.0]], // Beibu Gulf
];

// Diaoyu Island & Chiwei Island
export const DIAOYU_ISLANDS: { name: string; coords: [number, number] }[] = [
  { name: '钓鱼岛', coords: [123.47, 25.74] },
  { name: '赤尾屿', coords: [124.57, 25.92] },
  { name: '黄岩岛', coords: [117.85, 15.15] }
];
