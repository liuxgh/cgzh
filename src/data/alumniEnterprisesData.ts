export interface AlumniEnterpriseRecord {
  id: string;
  alumniName: string;
  graduatedUniversity: string; // 毕业院校 (吉林大学 / 其他高校)
  graduatedCollege: string; // 院系 / 专业
  graduationYear: string; // 毕业届别 / 年份
  degreeLevel?: string; // 本科 / 硕士 / 博士
  companyName: string; // 任职/创办企业全称
  personalPosition: string; // 个人职务 (如 董事长 / CTO / 研发总监)
  industry: string; // 行业领域
  registeredRegion: string; // 企业所在地区
  techNeedsDescription?: string; // 关注或拟合作的技术领域
  contactPhone?: string;
  selfReportedAt: string; // 自主填报时间
  source: 'user_self_report'; // 自主填报
}

export const INITIAL_ALUMNI_ENTERPRISES: AlumniEnterpriseRecord[] = [
  {
    id: 'ALUM-2026-001',
    alumniName: '刘志远',
    graduatedUniversity: '吉林大学',
    graduatedCollege: '汽车工程学院',
    graduationYear: '2008届',
    degreeLevel: '硕士',
    companyName: '长春富维东阳智能车身系统有限公司',
    personalPosition: '副总经理兼研发总监',
    industry: '新能源与智能网联汽车',
    registeredRegion: '吉林省长春市',
    techNeedsDescription: '轻量化底盘压铸、高寒电液比例阀控制算法与空气悬架仿真',
    contactPhone: '138****8888',
    selfReportedAt: '2026-09-01',
    source: 'user_self_report'
  },
  {
    id: 'ALUM-2026-002',
    alumniName: '周逸飞',
    graduatedUniversity: '吉林大学',
    graduatedCollege: '化学学院',
    graduationYear: '2012届',
    degreeLevel: '博士',
    companyName: '江苏吉威光电高新材料有限公司',
    personalPosition: 'CTO / 联合创始人',
    industry: '半导体电子化学品与特种材料',
    registeredRegion: '江苏省苏州市',
    techNeedsDescription: '高纯度石英光纤预制棒、电子级氟化盐纯化与超分子发光材料',
    contactPhone: '139****1234',
    selfReportedAt: '2026-09-03',
    source: 'user_self_report'
  },
  {
    id: 'ALUM-2026-003',
    alumniName: '赵若楠',
    graduatedUniversity: '吉林大学',
    graduatedCollege: '计算机科学与技术学院',
    graduationYear: '2015届',
    degreeLevel: '硕士',
    companyName: '杭州图灵视界智能科技有限公司',
    personalPosition: '技术副总裁',
    industry: '工业视觉与人工智能',
    registeredRegion: '浙江省杭州市',
    techNeedsDescription: '高反光曲面微瑕疵检测、端侧小模型量化剪枝与知识图谱推理',
    contactPhone: '137****5678',
    selfReportedAt: '2026-09-04',
    source: 'user_self_report'
  },
  {
    id: 'ALUM-2026-004',
    alumniName: '孙海涛',
    graduatedUniversity: '吉林大学',
    graduatedCollege: '机械与航空航天工程学院',
    graduationYear: '2005届',
    degreeLevel: '本科',
    companyName: '沈阳精工智造重装股份有限公司',
    personalPosition: '总工程师',
    industry: '高端装备与精密制造',
    registeredRegion: '辽宁省沈阳市',
    techNeedsDescription: '大型数控机床多轴联动伺服补偿、重载齿轮仿生抗疲劳涂层',
    contactPhone: '135****9988',
    selfReportedAt: '2026-09-06',
    source: 'user_self_report'
  }
];
