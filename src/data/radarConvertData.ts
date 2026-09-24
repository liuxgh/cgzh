// Data definitions and static mock data for 成果转化雷达 (高校版)
// 三大核心维度: 
// 1. ① 有人在看我的成果
// 2. ② 市场在找什么 ↔ 我的成果
// 3. ③ 我的成果该推给谁

export interface FieldAttentionStat {
  ipc: string;
  name: string;
  myPatentsCount: number;
  enterpriseCount: number;
  agencyCount: number;
  ratio: number; // 关注方数 ÷ 我方专利数
}

export interface EnterpriseHeatmapItem {
  companyName: string;
  shortName: string;
  type: 'enterprise' | 'agency' | 'university';
  isInvoiceClient?: boolean;
  totalAttention: number;
  // Attention values across IPC fields (e.g. B60W: 2, A61K: 0)
  values: Record<string, number>;
}

export interface SuspiciousLeadItem {
  id: string;
  companyName: string;
  daysCount: number;
  patentsCount: number;
  dateRange: string;
  ipCount: number;
  riskLevel: 'high' | 'medium' | 'low';
  tag: string;
}

export interface TechDemandMatchItem {
  id: string;
  keyword: string;
  searchCompanyCount: number;
  companies: {
    name: string;
    searchCount: number;
    lastSearchDate: string;
    isInvoiceClient?: boolean;
    isAgency?: boolean;
    city?: string;
  }[];
  matchedPatent: {
    patentNo: string;
    title: string;
    inventor: string;
    college: string;
    ipc: string;
    status: string;
  };
}

export interface TargetEnterpriseLeadTag {
  id: string;
  name: string;
  evidenceType: 'double' | 'extreme_search' | 'viewed' | 'agency'; // 双重 | 极搜 | 看过 | 代
  coverageCount: number;
  maxScore: number;
  searchedKeywordsSummary: string;
  isAgency?: boolean;
}

export interface PushResultItem {
  id: string;
  patentNo: string;
  title: string;
  ipc: string;
  techKeywords: string[];
  mainRecommendedCompanies: {
    name: string;
    tag: 'double' | 'extreme_search' | 'viewed' | 'agency';
    searchStats: string;
    viewStats?: string;
    downloadStats?: string;
    score: number;
    isAgency?: boolean;
    contactPhone?: string;
  }[];
  sameFieldBackupCompanies: string[];
}

// 1. IPC 领域关注数据 (用于堆叠图 & 被超额关注计算)
export const IPC_FIELD_ATTENTION_DATA: FieldAttentionStat[] = [
  { ipc: 'B60W', name: '车辆控制与智能驾驶', myPatentsCount: 91, enterpriseCount: 4, agencyCount: 0, ratio: 0.04 },
  { ipc: 'A61K', name: '医用配制品与生物制药', myPatentsCount: 98, enterpriseCount: 3, agencyCount: 2, ratio: 0.03 },
  { ipc: 'C12Q', name: '酶/微生物测定与诊断', myPatentsCount: 21, enterpriseCount: 3, agencyCount: 0, ratio: 0.14 },
  { ipc: 'B62D', name: '车辆转向与底盘结构', myPatentsCount: 34, enterpriseCount: 3, agencyCount: 0, ratio: 0.09 },
  { ipc: 'C12N', name: '微生物/重组DNA与发酵', myPatentsCount: 41, enterpriseCount: 3, agencyCount: 0, ratio: 0.07 },
  { ipc: 'G01V', name: '地球物理探测与仪器', myPatentsCount: 45, enterpriseCount: 3, agencyCount: 0, ratio: 0.07 },
  { ipc: 'G01N', name: '材料化学分析与物理测试', myPatentsCount: 135, enterpriseCount: 2, agencyCount: 2, ratio: 0.03 },
  { ipc: 'C01B', name: '非金属元素与无机纳米', myPatentsCount: 37, enterpriseCount: 2, agencyCount: 0, ratio: 0.05 },
  { ipc: 'B01J', name: '化学反应器与催化剂', myPatentsCount: 23, enterpriseCount: 2, agencyCount: 0, ratio: 0.09 },
  { ipc: 'G05B', name: '自动化监控与控制系统', myPatentsCount: 31, enterpriseCount: 2, agencyCount: 1, ratio: 0.06 },
  { ipc: 'G05D', name: '非电量控制系统', myPatentsCount: 21, enterpriseCount: 2, agencyCount: 0, ratio: 0.10 },
  { ipc: 'G06F', name: '电数字数据处理与算法', myPatentsCount: 156, enterpriseCount: 2, agencyCount: 3, ratio: 0.03 }
];

// 2. 热力图数据: 谁在盯你的哪个技术
export const HEATMAP_ENTERPRISES: EnterpriseHeatmapItem[] = [
  {
    companyName: '武汉万新科技有限公司',
    shortName: '武汉万新',
    type: 'enterprise',
    totalAttention: 5,
    values: { B60W: 0, A61K: 0, C12Q: 0, B62D: 0, C12N: 1, G01V: 1, G01N: 0, C01B: 0, B01J: 0, G06F: 0 }
  },
  {
    companyName: '四川海顺商贸有限公司',
    shortName: '四川海顺',
    type: 'enterprise',
    totalAttention: 4,
    values: { B60W: 0, A61K: 0, C12Q: 0, B62D: 0, C12N: 0, G01V: 0, G01N: 1, C01B: 0, B01J: 0, G06F: 0 }
  },
  {
    companyName: '世丰集团有限公司',
    shortName: '世丰集团',
    type: 'enterprise',
    totalAttention: 6,
    values: { B60W: 1, A61K: 0, C12Q: 0, B62D: 1, C12N: 0, G01V: 0, G01N: 0, C01B: 0, B01J: 0, G06F: 0 }
  },
  {
    companyName: '上海创维生物科技有限公司',
    shortName: '上海创维生物',
    type: 'enterprise',
    totalAttention: 8,
    values: { B60W: 0, A61K: 1, C12Q: 1, B62D: 0, C12N: 1, G01V: 0, G01N: 0, C01B: 0, B01J: 0, G06F: 0 }
  },
  {
    companyName: '瑞能电力有限公司',
    shortName: '瑞能电力',
    type: 'enterprise',
    totalAttention: 9,
    values: { B60W: 0, A61K: 0, C12Q: 0, B62D: 0, C12N: 0, G01V: 1, G01N: 1, C01B: 0, B01J: 0, G06F: 0 }
  },
  {
    companyName: '南京远韬汇智信息技术有限公司',
    shortName: '南京远韬汇智',
    type: 'enterprise',
    totalAttention: 7,
    values: { B60W: 1, A61K: 0, C12Q: 0, B62D: 0, C12N: 0, G01V: 0, G01N: 0, C01B: 0, B01J: 0, G06F: 1 }
  },
  {
    companyName: '南京华标信息科技有限公司',
    shortName: '南京华标',
    type: 'enterprise',
    totalAttention: 12,
    values: { B60W: 1, A61K: 0, C12Q: 0, B62D: 0, C12N: 4, G01V: 0, G01N: 0, C01B: 0, B01J: 0, G06F: 0 }
  },
  {
    companyName: '华为技术有限公司',
    shortName: '华为技术',
    type: 'enterprise',
    totalAttention: 14,
    values: { B60W: 1, A61K: 0, C12Q: 0, B62D: 1, C12N: 0, G01V: 0, G01N: 0, C01B: 0, B01J: 0, G06F: 1 }
  },
  {
    companyName: '花澜金科科技有限公司',
    shortName: '花澜金科',
    type: 'enterprise',
    totalAttention: 5,
    values: { B60W: 0, A61K: 0, C12Q: 0, B62D: 0, C12N: 0, G01V: 0, G01N: 0, C01B: 0, B01J: 0, G06F: 1 }
  },
  {
    companyName: '哈尔滨工业大学产研院',
    shortName: '哈工大产研',
    type: 'university',
    totalAttention: 6,
    values: { B60W: 0, A61K: 0, C12Q: 0, B62D: 0, C12N: 0, G01V: 1, G01N: 0, C01B: 0, B01J: 0, G06F: 0 }
  },
  {
    companyName: '成都吉智科技有限公司',
    shortName: '成都吉智',
    type: 'enterprise',
    totalAttention: 4,
    values: { B60W: 0, A61K: 0, C12Q: 0, B62D: 0, C12N: 0, G01V: 0, G01N: 1, C01B: 0, B01J: 0, G06F: 0 }
  },
  {
    companyName: '北京思立微生物医学技术有限公司',
    shortName: '北京思立微',
    type: 'enterprise',
    totalAttention: 11,
    values: { B60W: 0, A61K: 2, C12Q: 1, B62D: 0, C12N: 0, G01V: 0, G01N: 0, C01B: 0, B01J: 0, G06F: 0 }
  },
  {
    companyName: '北京瑞森集团',
    shortName: '北京瑞森',
    type: 'enterprise',
    totalAttention: 5,
    values: { B60W: 0, A61K: 0, C12Q: 0, B62D: 0, C12N: 0, G01V: 0, G01N: 0, C01B: 0, B01J: 1, G06F: 0 }
  },
  {
    companyName: '北京高派集团',
    shortName: '北京高派',
    type: 'enterprise',
    totalAttention: 6,
    values: { B60W: 0, A61K: 0, C12Q: 0, B62D: 0, C12N: 0, G01V: 1, G01N: 0, C01B: 0, B01J: 0, G06F: 0 }
  }
];

// 3. 异常持续关注 7 例
export const SUSPICIOUS_ATTENTION_CASES: SuspiciousLeadItem[] = [
  {
    id: 'case-1',
    companyName: '瑞能电力有限公司',
    daysCount: 8,
    patentsCount: 8,
    dateRange: '2026-03-31 ~ 2026-08-05',
    ipCount: 2,
    riskLevel: 'high',
    tag: '跨周期单点研读'
  },
  {
    id: 'case-2',
    companyName: '合肥科睿通信科技有限公司',
    daysCount: 8,
    patentsCount: 10,
    dateRange: '2026-05-06 ~ 2026-08-14',
    ipCount: 5,
    riskLevel: 'high',
    tag: '多IP集中穿透'
  },
  {
    id: 'case-3',
    companyName: '南京华标信息科技有限公司',
    daysCount: 8,
    patentsCount: 8,
    dateRange: '2026-03-27 ~ 2026-06-03',
    ipCount: 3,
    riskLevel: 'high',
    tag: '持续定点研读'
  },
  {
    id: 'case-4',
    companyName: '华为技术有限公司',
    daysCount: 8,
    patentsCount: 6,
    dateRange: '2026-04-05 ~ 2026-09-01',
    ipCount: 6,
    riskLevel: 'high',
    tag: '技术部门重点调研'
  },
  {
    id: 'case-5',
    companyName: '北京品源专利代理有限公司',
    daysCount: 8,
    patentsCount: 8,
    dateRange: '2026-04-03 ~ 2026-09-03',
    ipCount: 3,
    riskLevel: 'medium',
    tag: '代理机构定点监测'
  },
  {
    id: 'case-6',
    companyName: '浙江华姆信息科技有限公司',
    daysCount: 7,
    patentsCount: 7,
    dateRange: '2026-04-17 ~ 2026-09-08',
    ipCount: 4,
    riskLevel: 'medium',
    tag: '全网广谱爬取与研读'
  },
  {
    id: 'case-7',
    companyName: '河北北方商标事务所有限公司',
    daysCount: 7,
    patentsCount: 9,
    dateRange: '2026-04-03 ~ 2026-07-21',
    ipCount: 1,
    riskLevel: 'medium',
    tag: '单IP持续跟踪'
  }
];

// 4. Tab 2: 市场在找什么 ↔ 我的成果 (12项对接需求)
export const MARKET_TECH_DEMANDS_MATCH: TechDemandMatchItem[] = [
  {
    id: 'tech-01',
    keyword: '电缆',
    searchCompanyCount: 35,
    companies: [
      { name: '贵州遵赐供应链管理有限责任公司', searchCount: 46, lastSearchDate: '2026-09-04', city: '贵阳市' },
      { name: '四川易宏炎科技有限公司', searchCount: 22, lastSearchDate: '2026-09-04', isInvoiceClient: true, city: '成都市' },
      { name: '西南智能网络科技有限公司', searchCount: 20, lastSearchDate: '2026-09-04', city: '重庆市' },
      { name: '广州市科奥科技咨询有限公司', searchCount: 13, lastSearchDate: '2026-09-04', isAgency: true, city: '广州市' },
      { name: '北京清亦华知识产权代理事务所', searchCount: 9, lastSearchDate: '2026-09-04', isAgency: true, city: '北京市' },
      { name: '浙江华姆信息科技有限公司', searchCount: 6, lastSearchDate: '2026-09-04', isInvoiceClient: true, city: '杭州市' },
      { name: '上海萃法智能科技有限公司', searchCount: 5, lastSearchDate: '2026-09-04', city: '上海市' },
      { name: '合肥初云信息科技有限公司', searchCount: 5, lastSearchDate: '2026-09-04', isInvoiceClient: true, city: '合肥市' },
      { name: '合肥瞬创信息科技有限公司', searchCount: 5, lastSearchDate: '2026-09-04', city: '合肥市' },
      { name: '宜春市绿梦技术服务有限公司', searchCount: 5, lastSearchDate: '2026-09-04', city: '宜春市' },
      { name: '杭州浩印信息技术有限公司', searchCount: 5, lastSearchDate: '2026-09-04', isInvoiceClient: true, city: '杭州市' },
      { name: '桂林航天工业学院', searchCount: 5, lastSearchDate: '2026-09-04', isInvoiceClient: true, city: '桂林市' }
    ],
    matchedPatent: {
      patentNo: 'CN201810407280.6',
      title: '一种测温电缆及其在线状态监测与早期过热预警系统',
      inventor: '张文峰, 李明远',
      college: '通信工程学院 / 仪器科学与电气工程学院',
      ipc: 'H01B 7/42, G01K 11/32',
      status: '有效授权 (维持中)'
    }
  },
  {
    id: 'tech-02',
    keyword: '3D打印',
    searchCompanyCount: 12,
    companies: [
      { name: '盛岛机械重工（河源）有限公司', searchCount: 19, lastSearchDate: '2026-07-22', isInvoiceClient: true, city: '河源市' },
      { name: '匠心融创（浙江）企业管理有限公司', searchCount: 8, lastSearchDate: '2026-07-22', isInvoiceClient: true, city: '杭州市' },
      { name: '维未知信信息科技有限公司', searchCount: 3, lastSearchDate: '2026-07-22', isInvoiceClient: true, city: '南京市' },
      { name: '北京市奇立达医疗器械股份有限公司', searchCount: 2, lastSearchDate: '2026-07-22', city: '北京市' },
      { name: '广东联润实业发展有限公司', searchCount: 2, lastSearchDate: '2026-07-22', city: '东莞市' },
      { name: '江苏益缘药业股份有限公司', searchCount: 2, lastSearchDate: '2026-07-22', city: '苏州市' },
      { name: '深圳翠易电子科技有限公司', searchCount: 2, lastSearchDate: '2026-07-22', city: '深圳市' },
      { name: '上海捷菲汽车技术有限公司', searchCount: 1, lastSearchDate: '2026-07-22', isInvoiceClient: true, city: '上海市' },
      { name: '北京金爪网络科技有限公司哈尔滨分公司', searchCount: 1, lastSearchDate: '2026-07-22', city: '哈尔滨市' },
      { name: '南京苏科专利代理有限责任公司', searchCount: 1, lastSearchDate: '2026-07-22', isAgency: true, city: '南京市' },
      { name: '苏州凡喆科技有限公司', searchCount: 1, lastSearchDate: '2026-07-22', city: '苏州市' },
      { name: '贝尔（广州）智能信息科技股份有限公司', searchCount: 1, lastSearchDate: '2026-07-22', city: '广州市' }
    ],
    matchedPatent: {
      patentNo: 'CN201720694851.X',
      title: '一种3D打印的圆形柱梁节点模板及金属粉末激光烧结成型装置',
      inventor: '赵振宇, 王海龙',
      college: '建设工程学院 / 机械与航空航天工程学院',
      ipc: 'B29C 67/00, B22F 3/105',
      status: '有效授权 (维持中)'
    }
  },
  {
    id: 'tech-03',
    keyword: '焊接机器人',
    searchCompanyCount: 11,
    companies: [
      { name: '南京中高专利代理有限公司', searchCount: 14, lastSearchDate: '2026-08-11', isInvoiceClient: true, isAgency: true, city: '南京市' },
      { name: '聚轩信息科技有限公司', searchCount: 6, lastSearchDate: '2026-08-11', city: '合肥市' },
      { name: '长沙奇源科技信息咨询有限公司', searchCount: 5, lastSearchDate: '2026-08-11', isInvoiceClient: true, city: '长沙市' },
      { name: '合肥瞬创信息科技有限公司', searchCount: 4, lastSearchDate: '2026-08-11', city: '合肥市' },
      { name: '北京中索科技有限公司', searchCount: 2, lastSearchDate: '2026-08-11', city: '北京市' },
      { name: '天津市金企力信息管理有限公司', searchCount: 2, lastSearchDate: '2026-08-11', isInvoiceClient: true, city: '天津市' },
      { name: '广州市维弘信息科技咨询有限公司', searchCount: 2, lastSearchDate: '2026-08-11', isInvoiceClient: true, city: '广州市' },
      { name: '浙江东航联科专利代理有限公司', searchCount: 2, lastSearchDate: '2026-08-11', isInvoiceClient: true, isAgency: true, city: '杭州市' },
      { name: '维未知信信息科技有限公司', searchCount: 2, lastSearchDate: '2026-08-11', isInvoiceClient: true, city: '南京市' },
      { name: '旺科企业管理咨询有限公司', searchCount: 1, lastSearchDate: '2026-08-11', city: '成都市' },
      { name: '河南金企专科代理有限公司', searchCount: 1, lastSearchDate: '2026-08-11', isInvoiceClient: true, isAgency: true, city: '郑州市' }
    ],
    matchedPatent: {
      patentNo: 'CN201520264832.4',
      title: '基于计算机视觉的车身焊接机器人路径校正装置与自适应熔深监控',
      inventor: '刘亚东, 孙建民',
      college: '机械与航空航天工程学院 / 智能制造研究院',
      ipc: 'B23K 9/127, B25J 9/16',
      status: '有效授权 (维持中)'
    }
  },
  {
    id: 'tech-04',
    keyword: '开关柜',
    searchCompanyCount: 9,
    companies: [
      { name: '合肥初云信息科技有限公司', searchCount: 5, lastSearchDate: '2026-08-21', isInvoiceClient: true, city: '合肥市' },
      { name: '四川泰盈达科技有限公司', searchCount: 4, lastSearchDate: '2026-08-21', isInvoiceClient: true, city: '成都市' },
      { name: '德州市凤翔信息科技有限公司', searchCount: 4, lastSearchDate: '2026-08-21', city: '德州市' },
      { name: '聚轩信息科技有限公司', searchCount: 3, lastSearchDate: '2026-08-21', city: '合肥市' },
      { name: '安徽金蜂利建筑劳务公司', searchCount: 2, lastSearchDate: '2026-08-21', city: '合肥市' },
      { name: '江苏恒顺科技有限责任公司', searchCount: 2, lastSearchDate: '2026-08-21', city: '南京市' },
      { name: '维未知信信息科技有限公司', searchCount: 2, lastSearchDate: '2026-08-21', isInvoiceClient: true, city: '南京市' },
      { name: '强盛集团有限公司', searchCount: 1, lastSearchDate: '2026-08-21', city: '济南市' },
      { name: '浙江科锐科技有限责任公司', searchCount: 1, lastSearchDate: '2026-08-21', isInvoiceClient: true, city: '杭州市' }
    ],
    matchedPatent: {
      patentNo: 'CN202311709306.X',
      title: '一种变电站高压开关柜间操作机器人系统及智能锁闭机构',
      inventor: '陈立群, 黄文浩',
      college: '仪器科学与电气工程学院',
      ipc: 'H02B 1/30, B25J 11/00',
      status: '有效授权 (维持中)'
    }
  },
  {
    id: 'tech-05',
    keyword: '离合器',
    searchCompanyCount: 8,
    companies: [
      { name: '厦门鑫诺机械有限公司', searchCount: 53, lastSearchDate: '2026-09-03', isInvoiceClient: true, city: '厦门市' },
      { name: '安徽研宇工程技术咨询有限公司', searchCount: 3, lastSearchDate: '2026-09-03', city: '合肥市' },
      { name: '瑞安市项顶科技信息咨询有限公司', searchCount: 3, lastSearchDate: '2026-09-03', city: '温州市' },
      { name: '奥源认证有限公司', searchCount: 2, lastSearchDate: '2026-09-03', isInvoiceClient: true, city: '深圳市' },
      { name: '杭州润魂专利代理有限公司', searchCount: 2, lastSearchDate: '2026-09-03', isInvoiceClient: true, isAgency: true, city: '杭州市' },
      { name: '台州诚果网络科技有限公司', searchCount: 1, lastSearchDate: '2026-09-03', isInvoiceClient: true, city: '台州市' },
      { name: '沧州市高企企业管理咨询有限公司', searchCount: 1, lastSearchDate: '2026-09-03', city: '沧州市' },
      { name: '纳米维景上海医疗科技有限公司', searchCount: 1, lastSearchDate: '2026-09-03', city: '上海市' }
    ],
    matchedPatent: {
      patentNo: 'CN201510149461.X',
      title: '双模复合功率分流式混联混合动力系统及湿式多片离合器控制',
      inventor: '李骏, 高镇海',
      college: '汽车工程学院 / 汽车底盘集成与仿生全国重点实验室',
      ipc: 'B60K 6/365, F16D 48/02',
      status: '有效授权 (维持中)'
    }
  },
  {
    id: 'tech-06',
    keyword: '水泥',
    searchCompanyCount: 8,
    companies: [
      { name: '黄山创新特材服务有限公司', searchCount: 9, lastSearchDate: '2026-06-30', isInvoiceClient: true, city: '黄山市' },
      { name: '合肥瞬创信息科技有限公司', searchCount: 7, lastSearchDate: '2026-06-30', city: '合肥市' },
      { name: '北京清亦华知识产权代理事务所', searchCount: 5, lastSearchDate: '2026-06-30', isAgency: true, city: '北京市' },
      { name: '内蒙古雅胜科技有限公司', searchCount: 2, lastSearchDate: '2026-06-30', isInvoiceClient: true, city: '呼和浩特市' },
      { name: '黑龙江正泽信息外包服务有限公司', searchCount: 2, lastSearchDate: '2026-06-30', city: '哈尔滨市' },
      { name: '南京新制化企业服务有限公司', searchCount: 1, lastSearchDate: '2026-06-30', city: '南京市' },
      { name: '安徽宏鑫工程技术服务有限公司', searchCount: 1, lastSearchDate: '2026-06-30', city: '合肥市' },
      { name: '湖南聚泽生物医药科技有限公司', searchCount: 1, lastSearchDate: '2026-06-30', isInvoiceClient: true, city: '长沙市' }
    ],
    matchedPatent: {
      patentNo: 'CN202610591125.9',
      title: '一种基于物理信息神经网络的套管井水驱环属性参数反演方法与固井水泥耐蚀评测',
      inventor: '张晓东, 林柏泉',
      college: '地球探测科学与技术学院 / 建设工程学院',
      ipc: 'G01V 1/40, G06N 3/08',
      status: '有效授权 (维持中)'
    }
  }
];

// 5. Tab 3: 可联系主体清单 (546家) 精选样例
export const TARGET_ENTERPRISE_LEAD_TAGS: TargetEnterpriseLeadTag[] = [
  { id: 'ent-01', name: '福建塑新信息科技有限公司', evidenceType: 'double', coverageCount: 134, maxScore: 16.5, searchedKeywordsSummary: '覆盖 134 件 · 最高 16.5 分 · 搜过 车身×2244次、汽车×39次、汽车整车×10次、轮毂×8次' },
  { id: 'ent-02', name: '浙江北方重力有限责任公司', evidenceType: 'double', coverageCount: 124, maxScore: 27.2, searchedKeywordsSummary: '覆盖 124 件 · 最高 27.2 分 · 搜过 散热器×517次、快速×493次、升降×437次、夹具×260次' },
  { id: 'ent-03', name: '深圳市中兴达专利代理有限公司', evidenceType: 'agency', coverageCount: 99, maxScore: 36.0, searchedKeywordsSummary: '覆盖 99 件 · 最高 36 分 · 搜过 控制系统×1155次、支架×330次、软件×225次、无线×81次', isAgency: true },
  { id: 'ent-04', name: '合肥腾飞微电子科技有限公司', evidenceType: 'extreme_search', coverageCount: 82, maxScore: 8.5, searchedKeywordsSummary: '覆盖 82 件 · 最高 8.5 分 · 搜过 动力×1640次' },
  { id: 'ent-05', name: '杭州信联信息服务有限公司', evidenceType: 'extreme_search', coverageCount: 80, maxScore: 28.8, searchedKeywordsSummary: '覆盖 80 件 · 最高 28.8 分 · 搜过 电机×1166次、模具×880次、电极×72次、电池×48次' },
  { id: 'ent-06', name: '重庆赛通科技有限公司', evidenceType: 'extreme_search', coverageCount: 72, maxScore: 34.4, searchedKeywordsSummary: '覆盖 72 件 · 最高 34.4 分 · 搜过 无人机×154次、车辆×85次' },
  { id: 'ent-07', name: '北京高派律群事务所', evidenceType: 'agency', coverageCount: 66, maxScore: 40.0, searchedKeywordsSummary: '覆盖 66 件 · 最高 40 分', isAgency: true },
  { id: 'ent-08', name: '合肥初云信息科技有限公司', evidenceType: 'extreme_search', coverageCount: 62, maxScore: 32.8, searchedKeywordsSummary: '覆盖 62 件 · 最高 32.8 分 · 搜过 无人机×528次、供电×344次、温度传感器×77次、数据处理×56次' },
  { id: 'ent-09', name: '合肥润创信息科技有限公司', evidenceType: 'extreme_search', coverageCount: 62, maxScore: 24.0, searchedKeywordsSummary: '覆盖 62 件 · 最高 24 分 · 搜过 电机×2268次、座椅×60次、轮毂×21次、储量×18次' },
  { id: 'ent-10', name: '郑州睿知知识产权代理有限公司', evidenceType: 'agency', coverageCount: 50, maxScore: 44.4, searchedKeywordsSummary: '覆盖 50 件 · 最高 44.4 分 · 搜过 5-氨基糠醛×5次、钠纳米颗粒×2次、放射性×2次、降血压×1次', isAgency: true },
  { id: 'ent-11', name: '铭特拉茂（江西）传动系统有限公司', evidenceType: 'extreme_search', coverageCount: 48, maxScore: 18.7, searchedKeywordsSummary: '覆盖 48 件 · 最高 18.7 分 · 搜过 压变×1080次、活塞×100次、比例阀×10次、检测×10次' },
  { id: 'ent-12', name: '西安华和科技有限公司', evidenceType: 'extreme_search', coverageCount: 46, maxScore: 12.7, searchedKeywordsSummary: '覆盖 46 件 · 最高 12.7 分 · 搜过 数据采集×855次、无人机×27次、神经网络×24次、采集×21次' },
  { id: 'ent-13', name: '银杏制药有限责任公司', evidenceType: 'viewed', coverageCount: 36, maxScore: 9.3, searchedKeywordsSummary: '覆盖 36 件 · 最高 9.3 分 · 搜过 燃料电池×792次' },
  { id: 'ent-14', name: '北京首信智诚专利代理有限公司', evidenceType: 'agency', coverageCount: 51, maxScore: 30.0, searchedKeywordsSummary: '覆盖 51 件 · 最高 30 分 · 搜过 智能网联×26次、盐酸×1次', isAgency: true },
  { id: 'ent-15', name: '南京欧恰企业服务有限公司', evidenceType: 'extreme_search', coverageCount: 31, maxScore: 11.2, searchedKeywordsSummary: '覆盖 31 件 · 最高 11.2 分 · 搜过 电动车×36次、转向节×12次、空调×10次' },
  { id: 'ent-16', name: '济南圣达知识产权代理有限公司', evidenceType: 'agency', coverageCount: 30, maxScore: 26.0, searchedKeywordsSummary: '覆盖 30 件 · 最高 26 分 · 搜过 图像×2次、去除×1次', isAgency: true },
  { id: 'ent-17', name: '长安大学', evidenceType: 'extreme_search', coverageCount: 30, maxScore: 24.0, searchedKeywordsSummary: '覆盖 30 件 · 最高 24 分' },
  { id: 'ent-18', name: '北京市东派有限公司', evidenceType: 'extreme_search', coverageCount: 29, maxScore: 6.8, searchedKeywordsSummary: '覆盖 29 件 · 最高 6.8 分 · 搜过 计算机×464次' },
  { id: 'ent-19', name: '中审（深圳）认证有限公司', evidenceType: 'extreme_search', coverageCount: 27, maxScore: 12.4, searchedKeywordsSummary: '覆盖 27 件 · 最高 12.4 分 · 搜过 无人机×504次、脚踏柄×28次、编码器×13次、伺服电机×6次' },
  { id: 'ent-20', name: '深圳市诺亚微企企业服务有限公司', evidenceType: 'extreme_search', coverageCount: 26, maxScore: 60.0, searchedKeywordsSummary: '覆盖 26 件 · 最高 60 分 · 搜过 电压×209次、探头×144次、手机态×79次' },
  { id: 'ent-21', name: '上海创维能源科技有限公司', evidenceType: 'viewed', coverageCount: 24, maxScore: 9.8, searchedKeywordsSummary: '覆盖 24 件 · 最高 9.8 分 · 搜过 燃料电池×575次' },
  { id: 'ent-22', name: '广州市德创科技咨询有限公司', evidenceType: 'extreme_search', coverageCount: 24, maxScore: 45.1, searchedKeywordsSummary: '覆盖 24 件 · 最高 45.1 分 · 搜过 漆压区×408次、电压线缆×60次、电缆线缆×34次、阀组×14次' },
  { id: 'ent-23', name: '山东德谊建设工程有限公司', evidenceType: 'extreme_search', coverageCount: 23, maxScore: 23.6, searchedKeywordsSummary: '覆盖 23 件 · 最高 23.6 分 · 搜过 报警×736次' },
  { id: 'ent-24', name: '四川易宏炎科技有限公司', evidenceType: 'double', coverageCount: 22, maxScore: 36.9, searchedKeywordsSummary: '覆盖 22 件 · 最高 36.9 分 · 搜过 人参×360次、人工智能×162次、电缆×44次、高压开关×26次' },
  { id: 'ent-25', name: '天津品源科技有限公司', evidenceType: 'viewed', coverageCount: 22, maxScore: 18.0, searchedKeywordsSummary: '覆盖 22 件 · 最高 18 分' },
  { id: 'ent-26', name: '东莞市尚高技术产业协会', evidenceType: 'extreme_search', coverageCount: 21, maxScore: 60.0, searchedKeywordsSummary: '覆盖 21 件 · 最高 60 分 · 搜过 电机×900次、极板×136次、油箱×13次、铝材×9次' },
  { id: 'ent-27', name: '南京知羽电子科技有限公司', evidenceType: 'double', coverageCount: 21, maxScore: 49.6, searchedKeywordsSummary: '覆盖 21 件 · 最高 49.6 分 · 搜过 电缆×1972次、热敏电阻×152次、热敏×8次、温度传感器×1次' },
  { id: 'ent-28', name: '成都九天智行商务服务有限公司', evidenceType: 'viewed', coverageCount: 21, maxScore: 14.2, searchedKeywordsSummary: '覆盖 21 件 · 最高 14.2 分 · 搜过 模具×380次、钕铁硼永磁体×14次、合金×9次、传感器×1次' },
  { id: 'ent-29', name: '金华市佑拓科技咨询有限公司', evidenceType: 'extreme_search', coverageCount: 20, maxScore: 56.3, searchedKeywordsSummary: '覆盖 20 件 · 最高 56.3 分 · 搜过 超级电容器×230次、皮带×80次、钠离子电池×67次、离心风机×63次' },
  { id: 'ent-30', name: '南通言奥科技有限公司', evidenceType: 'viewed', coverageCount: 20, maxScore: 24.7, searchedKeywordsSummary: '覆盖 20 件 · 最高 24.7 分 · 搜过 电压×289次、发热×29次、复合物×19次、抗体×2次' },
  { id: 'ent-31', name: '河北金冀科技有限公司', evidenceType: 'viewed', coverageCount: 19, maxScore: 24.0, searchedKeywordsSummary: '覆盖 19 件 · 最高 24 分 · 搜过 神经网×8次、钝化方法×5次、排压排气×5次、接线线缆×4次' }
];

// 6. Tab 3: 逐件成果推送明细样例
export const PUSH_RESULTS_DATA: PushResultItem[] = [
  {
    id: 'push-01',
    patentNo: 'CN202311124550.X',
    title: '一件高光纤保偏双导模一体化结构的光纤结构及其拉丝制备工艺',
    ipc: 'B23K1/005, G02B6/02',
    techKeywords: ['纤芯', '一体化结构', '锁模', '锁模微晶表面', '表面处理', '保偏光纤'],
    mainRecommendedCompanies: [
      {
        name: '浙江华姆信息科技有限公司',
        tag: 'double',
        searchStats: '搜过 361 次: 软铁锁模×361次',
        viewStats: '看过该文件 0 次',
        downloadStats: '其中下载全文 1 次',
        score: 70.0,
        contactPhone: '13857182143'
      },
      {
        name: '成都九天智行商务服务有限公司',
        tag: 'viewed',
        searchStats: '搜过 14 次: 钕铁硼永磁体×14次',
        score: 14.2,
        contactPhone: '18628082390'
      }
    ],
    sameFieldBackupCompanies: ['益阳长春储能科技有限公司', '天地寰宇武汉网络有限公司', '浙江通达电路有限公司', '烽火通信科技股份有限公司']
  },
  {
    id: 'push-02',
    patentNo: 'CN202310768876.X',
    title: '一种仿生抗冲击轻量化新能源汽车电池包箱体结构与多胞吸能缓冲筋',
    ipc: 'H01M10/61, B60K1/04',
    techKeywords: ['电池包', '新能源汽车', '抗冲击', '轻量化', '仿生蜂窝', '热失控阻隔'],
    mainRecommendedCompanies: [
      {
        name: '东莞浩德防水分透气膜材料有限公司',
        tag: 'extreme_search',
        searchStats: '搜过 209 次: 防爆阀×209次',
        score: 70.0,
        contactPhone: '13976989088'
      }
    ],
    sameFieldBackupCompanies: ['上海新禾谱智能科技有限公司', '伊腾特饰必胜（贵州）有限公司', '余姚市博曼特网络通信设备有限公司', '欣旺达电子股份有限公司']
  },
  {
    id: 'push-03',
    patentNo: 'CN202011543850.8',
    title: '一种兼具花盒中异瓣皮苷的提取方法、导出及衍生化合物在抗炎药物中的制备与应用',
    ipc: 'C07H1/08, A61K31/70',
    techKeywords: ['异瓣皮苷', '葵花盘', '葡萄糖醛酸衍生物制剂', '提取物', '抗炎药物'],
    mainRecommendedCompanies: [
      {
        name: '华为技术有限公司',
        tag: 'extreme_search',
        searchStats: '看过这件 21 次',
        score: 65.5,
        contactPhone: '18907550808'
      },
      {
        name: '长春高新技术产业（集团）股份有限公司',
        tag: 'viewed',
        searchStats: '看过这件 1 次，其中下载全文 1 次',
        score: 14.0,
        contactPhone: '13504318899'
      }
    ],
    sameFieldBackupCompanies: ['南京国蓝化工有限公司', '攀枝花市海瀚鑫化工有限公司', '深圳硕特科技有限公司', '通化东宝药业股份有限公司']
  },
  {
    id: 'push-04',
    patentNo: 'CN20251011508.6',
    title: '一种用于无人驾驶装载机作业的群料点自主选取方法及三维激光点云位姿估计',
    ipc: 'B65G65/00, G05D1/02',
    techKeywords: ['无人驾驶装载机', '数据集集合', '抓斗', '点云数据', '马尔可夫决策过程', '轨迹规划'],
    mainRecommendedCompanies: [
      {
        name: '重庆赛通科技有限公司',
        tag: 'extreme_search',
        searchStats: '搜过 40 次: 抓斗×40次',
        score: 65.1,
        contactPhone: '13702367890'
      }
    ],
    sameFieldBackupCompanies: ['江苏嘉德科技有限公司', '佛山市工正包装设备科技股份有限公司', '北京碧水源水务科技有限公司', '徐工集团工程机械股份有限公司']
  }
];

// 6. Tab 1: 有人在看我的成果 —— 真实访客画像卡片数据 (与图表一致)
export interface Tab1VisitorCardItem {
  id: string;
  companyName: string;
  isInvoiceClient?: boolean;
  entityType: string;
  badgeType: string;
  badgeStyle?: 'orange' | 'purple' | 'slate';
  relationText: string;
  summary: string;
  metrics: {
    viewCount: number | string;
    viewPatentCountText: string;
    downloadFulltext: number | string;
    downloadSignalText: string;
    deepReadLevel: string;
    deepReadLevelLabel: string;
    deepReadSubText: string;
    dateSpan: string;
    timeAndIpSpan: string;
  };
  profile: {
    whoIsHe: {
      entityNature: string;
      ownPatents: string;
      coveredEntityCount: string;
      techFocus: string[];
      overlap: string;
    };
    whyHeFollowsMe: {
      behaviorSummary: string;
      evidenceChain: string[];
    };
    whatShouldIDo: {
      recommendation: string;
    };
  };
  viewedPatents: {
    patentNo: string;
    title: string;
    inventor: string;
    college: string;
    ipc: string;
    status: string;
  }[];
}

export const TAB1_VISITOR_CARDS_DATA: Tab1VisitorCardItem[] = [
  {
    id: 'lead-gx-01',
    companyName: '泰州市格兴医疗用品股份有限公司',
    isInvoiceClient: false,
    entityType: '企业',
    badgeType: '一般调研',
    badgeStyle: 'slate',
    relationText: '与我的关系：未知',
    summary: '查看了你 2 次、1 件专利，下载 2 次 —— 常规技术调研，持续观察即可。',
    metrics: {
      viewCount: 2,
      viewPatentCountText: '涉及 1 件专利',
      downloadFulltext: 2,
      downloadSignalText: '最强信号',
      deepReadLevel: 'L1',
      deepReadLevelLabel: '价值分级',
      deepReadSubText: '价值分 17 / 100 · 无深读记录',
      dateSpan: '2026-07-24',
      timeAndIpSpan: '11:47:23~11:47:23 · 1 个 IP'
    },
    profile: {
      whoIsHe: {
        entityNature: '企业 · 常规',
        ownPatents: '未获取到 (名称未命中或本身无专利)',
        coveredEntityCount: '5 家 (中等)',
        techFocus: [],
        overlap: '不可判定'
      },
      whyHeFollowsMe: {
        behaviorSummary: '常规检索行为，未发现明显敌意。',
        evidenceChain: ['下载了 2 次全文']
      },
      whatShouldIDo: {
        recommendation: '保持关注即可。查看 2 次、1 件专利，未发现下载或定向行为。'
      }
    },
    viewedPatents: [
      {
        patentNo: 'CN202110543210.8',
        title: '一种医用高分子抗菌水凝胶敷料及其制备方法',
        inventor: '李晶, 王海',
        college: '白求恩第一临床医学院 / 材料科学与工程学院',
        ipc: 'A61L 15/44, A61L 15/22',
        status: '有效授权 (维持中)'
      }
    ]
  },
  {
    id: 'lead-yq-02',
    companyName: '元启半导体（杭州）有限公司',
    isInvoiceClient: true,
    entityType: '企业',
    badgeType: '一般调研',
    badgeStyle: 'slate',
    relationText: '与我的关系：未知',
    summary: '查看了你 2 次、1 件专利，下载 2 次 —— 常规技术调研，持续观察即可。',
    metrics: {
      viewCount: 2,
      viewPatentCountText: '涉及 1 件专利',
      downloadFulltext: 2,
      downloadSignalText: '批量打包，非逐件取证',
      deepReadLevel: '仅批量导出',
      deepReadLevelLabel: '深读层级',
      deepReadSubText: '导出 1 件 · 零深读记录',
      dateSpan: '2026-07-24',
      timeAndIpSpan: '12:56:38~12:56:38 · 1 个 IP'
    },
    profile: {
      whoIsHe: {
        entityNature: '企业 · 常规',
        ownPatents: '8 件',
        coveredEntityCount: '5 家 (中等)',
        techFocus: ['H04L1', 'G06F11', 'H03H21', 'H03L7'],
        overlap: '不可判定'
      },
      whyHeFollowsMe: {
        behaviorSummary: '常规检索行为，未发现明显敌意。',
        evidenceChain: ['下载了 2 次全文']
      },
      whatShouldIDo: {
        recommendation: '保持关注即可。查看 2 次、1 件专利，未发现下载或定向行为。'
      }
    },
    viewedPatents: [
      {
        patentNo: 'CN202210893421.5',
        title: '一种高速锁相环时钟发生电路与低抖动频率合成器',
        inventor: '杜菲, 张建军',
        college: '电子科学与工程学院',
        ipc: 'H03L 7/08, H03H 21/00',
        status: '有效授权 (维持中)'
      }
    ]
  },
  {
    id: 'lead-bt-03',
    companyName: '广州百拓共享科技应用有限公司',
    isInvoiceClient: false,
    entityType: '企业',
    badgeType: '一般调研',
    badgeStyle: 'slate',
    relationText: '与我的关系：未知',
    summary: '查看了你 1 次、1 件专利，下载 1 次 —— 常规技术调研，持续观察即可。',
    metrics: {
      viewCount: 1,
      viewPatentCountText: '涉及 1 件专利',
      downloadFulltext: 1,
      downloadSignalText: '批量打包，非逐件取证',
      deepReadLevel: '仅批量导出',
      deepReadLevelLabel: '深读层级',
      deepReadSubText: '导出 1 件 · 零深读记录',
      dateSpan: '2026-04-17',
      timeAndIpSpan: '14:02:14~14:02:14 · 1 个 IP'
    },
    profile: {
      whoIsHe: {
        entityNature: '企业 · 常规',
        ownPatents: '未获取到 (名称未命中或本身无专利)',
        coveredEntityCount: '10 家 (中等)',
        techFocus: [],
        overlap: '不可判定'
      },
      whyHeFollowsMe: {
        behaviorSummary: '常规检索行为，未发现明显敌意。',
        evidenceChain: ['下载了 1 次全文']
      },
      whatShouldIDo: {
        recommendation: '保持关注即可。查看 1 次、1 件专利，未发现下载或定向行为。'
      }
    },
    viewedPatents: [
      {
        patentNo: 'CN202010412890.3',
        title: '一种分布式共享储能云平台资源自适应调度系统',
        inventor: '刘亚东, 孙建民',
        college: '计算机科学与技术学院',
        ipc: 'G06F 9/50, H02J 3/38',
        status: '有效授权 (维持中)'
      }
    ]
  },
  {
    id: 'lead-zy-04',
    companyName: '上海震业环境科技有限公司',
    isInvoiceClient: true,
    entityType: '企业',
    badgeType: '代理疑虑',
    badgeStyle: 'purple',
    relationText: '与我的关系：未知',
    summary: '上海震业环境科技有限公司 的主体是「企业」，但浏览行为很像代理/服务机构 —— 它在 1,203 家公司的专利下都出现过、成批扫、不挑领域。企业这样画像更像在批量收集情报，建议结合业务判断。',
    metrics: {
      viewCount: 16,
      viewPatentCountText: '涉及 6 件专利',
      downloadFulltext: 10,
      downloadSignalText: '批量打包，非逐件取证',
      deepReadLevel: '仅批量导出',
      deepReadLevelLabel: '深读层级',
      deepReadSubText: '导出 2 件 · 零深读记录',
      dateSpan: '2026-03-16 ~ 2026-09-01',
      timeAndIpSpan: '15:00:20~17:51:39 · 5 个 IP'
    },
    profile: {
      whoIsHe: {
        entityNature: '企业 · 广谱扫描',
        ownPatents: '123 件',
        coveredEntityCount: '1203 家 (广谱扫描型)',
        techFocus: ['F24F7', 'B01D46', 'B01D45', 'F16K17'],
        overlap: '不可判定'
      },
      whyHeFollowsMe: {
        behaviorSummary: '这个账号在广谱扫描 —— 成批看很多家公司的专利、不挑领域。这种模式在代理/服务机构里最常见，但企业竞品库、高校做调研也会长成这样。身份判断以卡片上的「主体性质」为准，这里说的是行为。',
        evidenceChain: [
          '下载了 10 次全文',
          '来自 5 个不同出口 IP（可能不止一个人在看）'
        ]
      },
      whatShouldIDo: {
        recommendation: '先确认身份和用途。企业做广谱扫描通常是建竞争情报库或找技术方案 —— 如果它只在你的领域密集出现，值得主动核实意向。'
      }
    },
    viewedPatents: [
      {
        patentNo: 'CN201910672109.1',
        title: '一种用于工业VOCs废气催化燃烧净化的蜂窝整体式催化剂及制备',
        inventor: '张文峰, 李明远',
        college: '化学学院 / 环境与资源学院',
        ipc: 'B01D 53/86, B01J 23/89',
        status: '有效授权 (维持中)'
      },
      {
        patentNo: 'CN202110298374.X',
        title: '高风量低阻力工业袋式除尘滤筒反吹清灰控制系统',
        inventor: '王振华, 陈立',
        college: '机械与航空航天工程学院',
        ipc: 'B01D 46/00',
        status: '有效授权'
      }
    ]
  }
];
