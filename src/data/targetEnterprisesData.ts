// @ts-nocheck
import { TargetEnterprise } from '../types';

export const TARGET_ENTERPRISES_DATA: TargetEnterprise[] = [
  // 1. 汽车及新能源汽车产业链 - 动力电池与复合材料
  {
    id: 'ent-catl',
    name: '宁德时代电机科技有限公司',
    shortName: '时代',
    creditCode: '91350900587526883U',
    registeredCapital: '8000 万元人民币',
    location: '福建省宁德市',
    province: '福建省',
    city: '宁德市',
    industry: '新能源汽车 / 动力电池与储能系统',
    scale: '全球动力电池市占率第一 / 创业板千亿市值龙头',
    enterpriseType: '上市企业',
    revenue: '4,009 亿元 (2024)',
    rdInvestment: '183.6 亿元 (研发比 4.58%)',
    rdRatio: '4.58%',
    patentTotalCount: 152,
    inventionPatentCount: 34,
    matchSource: 'similar_patent',
    matchScore: 97,
    legalRep: '曾毓群',
    address: '福建省宁德市蕉城区疏港路118号',
    phone: '0593-8991832',
    email: 'xm@catlmotor.com',
    website: 'www.catl.com',
    establishedDate: '2017-02-24',
    businessScope: '一般项目：技术服务、技术开发、技术咨询、技术交流、技术转让、技术推广；电动机制造；发电机及发电机组制造；发电机及发电机组销售；微特电机及组件制造；微特电机及组件销售；齿轮及齿轮减、变速箱制造；齿轮及齿轮减、变速箱销售；模具销售；输配电及控制设备制造；智能输配电及控制设备销售；机械零件、零部件加工；机械零件、零部件销售；电子元器件与机电组件设备销售；电池制造；电池销售；新能源汽车整车销售；新能源汽车电附件销售；新能源汽车换电设施销售；电动汽车充电基础设施运营；汽车新车销售；集中式快速充电站；分布式交流充电桩销售；二手车经销；船舶销售；建筑工程用机械销售；非居住房地产租赁 ( 除依法须经批准的项目外, 凭营业执照依法自主开展经营活动 ) 许可项目：技术进出口；货物进出口 ( 依法须经批准的项目，经相关部门批准后方可开展经营活动，具体经营项目以相关部门批准文件或许可证件为准 )',
    status: '存续',
    oldName: '-',
    synergyReason: '企业在固态电解质与高镍三元材料包覆技术路线上布局了多项申请，与吉林大学化学学院崔教授团队的高镍单晶多维修饰专利存在极高技术互补度，能直接解决高倍率循环微裂纹问题。',
    similarPatents: [
      {
        patentNo: 'CN115832104B',
        title: '一种高镍正极材料表面异质外延包覆层及其制备方法',
        ipc: 'H01M4/36, H01M4/525',
        grantDate: '2023-11-14',
        similarityScore: 95.8,
        techOverlapDescription: '宁德时代该专利主要采用干法高压包覆，吉大专利采用液相自组装单分子膜技术，二者在界面阻抗降低与热失控抑制上具备直接技术嫁接价值。'
      },
      {
        patentNo: 'CN116416102A',
        title: '全固态锂硫电池复合固态电解质膜结构',
        ipc: 'H01M10/0562',
        grantDate: '2024-03-02',
        similarityScore: 92.4,
        techOverlapDescription: '在硫化物固态电解质空气稳定性改性方案上，与吉大无机合成国家重点实验室的掺杂钝化方案属于平行互补路线。'
      }
    ],
    chainPosition: {
      chainId: 'chain-ev-auto',
      chainName: '新能源汽车',
      node: 'upstream',
      nodeName: '上游：动力电池关键材料与电芯制造',
      subSegment: '高镍正极材料 / 固态电解质包覆 / 隔膜涂层',
      mainProducts: ['麒麟电池', '神行超充电池', '凝聚态电池', '钠离子电芯']
    },
    patentProducts: [
      {
        productCode: 'CP-2023-EV-001',
        productName: '神行4C超充动力电池模组系统',
        filingYear: '2023年备案',
        productCategory: '国家专利密集型产品',
        annualOutputValue: '100亿-500亿元',
        corePatentCount: 142,
        patentSynergyPoint: '吉大快速锂离子导电涂层专利可直接应用于神行超充电池极片界面改性。'
      }
    ],
    techPainPoints: [
      '超高镍（Ni92+）单晶材料在长循环过程中内部微裂纹导致的气胀与容量快速衰减',
      '全固态硫化物电解质易吸水产生硫化氢气体的耐湿性改性难题',
      '极端低温（-30℃）下锂离子迁移速率过慢导致的充放电断崖式衰减'
    ],
    rdDirections: [
      '能量密度突破 400Wh/kg 的全固态电池体系',
      '超快充 6C-8C 级耐高温电极界面化学工程',
      '钠离子动力电池低温衰减控制与低成本产业化'
    ],
    preferredCollabMode: '共建联合创新中心 / 核心专利排他许可 / 委托定制攻关',
    keyInventors: [
      { name: '王伟', patentCount: 120, title: '核心发明人/技术总监' },
      { name: '李强', patentCount: 80, title: '核心发明人/研发骨干' }
    ],
    contact: {
      dept: '21C创新实验室 / 前沿技术预研部',
      contactPerson: '欧阳晨',
      title: '前瞻材料研发总监 / 产学研合作首席专家',
      phone: '0593-8901888 (转产学研专线)',
      email: 'ouyangc@catl.com',
      suggestedApproach: '以吉大化学学院「高镍单晶自组装纳米包覆」测试数据切入，直接约见21C创新实验室前沿材料组，重点展示-30℃循环寿命提升35%的实测图谱。'
    }
  },

  // 2. 智能底盘与仿生结构 - 一汽红旗 / 一汽解放
  {
    id: 'ent-faw',
    name: '中国第一汽车集团有限公司 (一汽研发总院)',
    shortName: '中国一汽 (FAW)',
    creditCode: '91220101123999824F',
    registeredCapital: '3,540,000 万元人民币',
    location: '吉林省长春市汽开区新红旗大街1号',
    province: '吉林省',
    city: '长春市',
    industry: '汽车整车制造 / 智能底盘与智能座舱',
    scale: '中央直管特大型汽车企业集团 / 2024中国企业500强前列',
    enterpriseType: '行业龙头国企',
    revenue: '6,380 亿元',
    rdInvestment: '215 亿元',
    rdRatio: '3.37%',
    patentTotalCount: 38200,
    inventionPatentCount: 22400,
    matchSource: 'industry_chain',
    matchScore: 99,
    synergyReason: '一汽研发总院正全力攻关红旗高端旗舰车型的线控智能底盘与仿生减阻车身，与吉林大学汽车工程学院及仿生教育部重点实验室有多项底座级技术契合。',
    similarPatents: [
      {
        patentNo: 'CN114506283B',
        title: '一种线控主动悬架自适应阻尼调节系统及其控制策略',
        ipc: 'B60G17/015',
        grantDate: '2023-08-19',
        similarityScore: 94.2,
        techOverlapDescription: '一汽专利主要基于传统路面预瞄，吉大专利结合了仿生猫爪足垫缓冲力学与AI路况多模态预测，响应时间缩短40%。'
      }
    ],
    chainPosition: {
      chainId: 'chain-ev-auto',
      chainName: '新能源汽车',
      node: 'downstream',
      nodeName: '下游：整车集成与整机高端制造',
      subSegment: '豪华乘用车整车 / 智能网联商用车 / 线控底盘平台',
      mainProducts: ['红旗H9 / E-HS9', '红旗国礼', '解放J7重卡', '红旗FMEs纯电架构']
    },
    patentProducts: [
      {
        productCode: 'CP-2023-FAW-008',
        productName: '红旗天工纯电智能底盘平台系统',
        filingYear: '2023年备案',
        productCategory: '国家专利密集型产品',
        annualOutputValue: '100亿-500亿元',
        corePatentCount: 88,
        patentSynergyPoint: '吉大汽车底盘集成与仿生全国重点实验室的线控多轴分布式驱动协同控制算法已完成台架验证。'
      }
    ],
    techPainPoints: [
      '极端冰雪路面下线控转向与四轮独立电驱毫秒级防滑失稳控制',
      '高速工况下车身复杂涡流阻力与风噪控制瓶颈',
      '重卡商用车智能驾驶域控制器高可靠容错与底盘执行机构冗余'
    ],
    rdDirections: [
      '全线控滑板底盘分布式智能驱动架构',
      '基于多模态大模型的智能座舱与整车AI中央大脑',
      '仿生微纳减阻复合车身覆盖件工程化应用'
    ],
    preferredCollabMode: '共建国家重点实验室联合分室 / 重大横向专项 / 专利开放许可打包',
    keyInventors: [
      { name: '李磊', patentCount: 127, title: '核心发明人/技术总监' },
      { name: '张洋', patentCount: 93, title: '核心发明人/研发骨干' }
    ],
    contact: {
      dept: '一汽研发总院创新技术研究院 / 科技创新管理部',
      contactPerson: '李海峰',
      title: '底盘与智能网联领域首席科学家',
      phone: '0431-85789999',
      email: 'lihf_rd@faw.com.cn',
      suggestedApproach: '直接对接一汽科技创新部高校合作办公室，安排吉大汽车学院与仿生学院青年领军教授带成果实地技术答辩。'
    }
  },

  // 3. 光电信息与精密仪器 - 舜宇光学 / 长光卫星
  {
    id: 'ent-sunny',
    name: '舜宇光学科技（集团）有限公司',
    shortName: '舜宇光学 (Sunny Optical)',
    creditCode: '91330200720448123C',
    registeredCapital: '109,680 万元人民币',
    location: '浙江省余姚市舜科路66-68号',
    province: '浙江省',
    city: '宁波市',
    industry: '光电子器件 / 车载光学与精密镜头模组',
    scale: '全球车载镜头市占率第一 / 全球手机镜头出货量前列',
    enterpriseType: '上市企业',
    revenue: '382 亿元',
    rdInvestment: '32.1 亿元 (研发比 8.4%)',
    rdRatio: '8.4%',
    patentTotalCount: 12800,
    inventionPatentCount: 7600,
    matchSource: 'patent_product',
    matchScore: 96,
    synergyReason: '舜宇光学多款车载ADAS镜头已通过国家专利密集型产品备案，亟需吉林大学集成光电子学国家重点实验室的超表面微纳透镜与抗极端温差色散镀膜技术。',
    similarPatents: [
      {
        patentNo: 'CN115016021B',
        title: '一种大视场车载广角消色差光学镜头系统',
        ipc: 'G02B13/06',
        grantDate: '2023-05-12',
        similarityScore: 93.6,
        techOverlapDescription: '舜宇镜头在-40℃至105℃极端温区存在像面漂移，吉大电子学院的动态自补偿非球面复合透镜设计可彻底消除温漂畸变。'
      }
    ],
    chainPosition: {
      chainId: 'chain-opto-semi',
      chainName: '集成电路',
      node: 'midstream',
      nodeName: '中游：光学精密元器件与传感器模组制造',
      subSegment: '车载激光雷达发射光学模组 / 机器视觉镜头 / 晶圆级光学器件',
      mainProducts: ['车载ADAS高清摄像模组', '手机潜望式长焦镜头', 'AR光机波导模组']
    },
    patentProducts: [
      {
        productCode: 'CP-2023-OPTO-019',
        productName: '800万像素高动态车载智能驾驶镜头模组',
        filingYear: '2023年备案',
        productCategory: '国家专利密集型产品',
        annualOutputValue: '10亿-50亿元',
        corePatentCount: 64,
        patentSynergyPoint: '吉大抗强光眩光微纳抗反射涂层专利可降低鬼影与杂散光达80%。'
      }
    ],
    techPainPoints: [
      '800万像素车载镜头在极热极寒温度剧变下的热散焦与解析力下降',
      '车载LiDAR激光雷达多波长滤光片透射率与带外截止度矛盾',
      '晶圆级玻璃模压非球面微透镜的高良品率量产工艺'
    ],
    rdDirections: [
      '超构表面（Metalens）平面超透镜工程化量产',
      '车载固态激光雷达发射/接收一体化微光学芯片',
      '医疗内窥镜超微型4K超广角光学系统'
    ],
    preferredCollabMode: '专利技术独占许可 / 委托中试开发 / 产学研联合攻关',
    keyInventors: [
      { name: '张勇', patentCount: 134, title: '核心发明人/技术总监' },
      { name: '刘军', patentCount: 106, title: '核心发明人/研发骨干' }
    ],
    contact: {
      dept: '集团中央研究院 / 车载光学研发中心',
      contactPerson: '郑建安',
      title: '中央研究院副院长兼先进光学所所长',
      phone: '0574-62538888',
      email: 'zhengja@sunnyoptical.com',
      suggestedApproach: '携带吉大电子学院微纳透镜消色差测试实物样品，直奔余姚舜宇中央研究院展示实测MTF曲线对比报告。'
    }
  },

  // 4. 生物医药与高端医疗器械 - 迈瑞医疗
  {
    id: 'ent-mindray',
    name: '深圳迈瑞生物医疗电子股份有限公司',
    shortName: '迈瑞医疗 (Mindray)',
    creditCode: '914403007152062325',
    registeredCapital: '121,244 万元人民币',
    location: '广东省深圳市南山区高新技术产业园区科技南十二路迈瑞大厦',
    province: '广东省',
    city: '深圳市',
    industry: '高端医疗器械 / 生命信息支持与体外诊断(IVD)',
    scale: '中国最大医疗器械龙头企业 / 全球医疗器械前30强',
    enterpriseType: '上市企业',
    revenue: '395 亿元',
    rdInvestment: '37.8 亿元 (研发比 9.57%)',
    rdRatio: '9.57%',
    patentTotalCount: 10450,
    inventionPatentCount: 7100,
    matchSource: 'patent_product',
    matchScore: 98,
    synergyReason: '迈瑞体外诊断与化学发光免疫分析仪已入选国家专利密集型产品备案，与吉林大学化学学院及白求恩医学院的荧光探针及纳米磁珠分离专利技术高度互补。',
    similarPatents: [
      {
        patentNo: 'CN114878652B',
        title: '一种全自动化学发光免疫分析反应杯及混匀检测系统',
        ipc: 'G01N33/543',
        grantDate: '2023-07-28',
        similarityScore: 94.8,
        techOverlapDescription: '迈瑞该设备目前采用机械涡旋混匀，吉大发明采用声表面波（SAW）微流控微滴无接触混匀，避免气泡产生且反应时间缩短60%。'
      }
    ],
    chainPosition: {
      chainId: 'chain-bio-med',
      chainName: '高端医疗器械',
      node: 'midstream',
      nodeName: '中游：高端医疗装备与核心诊断元部件制造',
      subSegment: '全自动化学发光分析仪 / 医用超声影像 / 体外生命支持ECMO',
      mainProducts: ['Resona A20高端超声', 'CL-8000i全自动化学发光系统', 'BeneVision N系列监护仪']
    },
    patentProducts: [
      {
        productCode: 'CP-2023-MED-033',
        productName: '全自动高速化学发光免疫分析流水线系统',
        filingYear: '2023年备案',
        productCategory: '国家专利密集型产品',
        annualOutputValue: '10亿-50亿元',
        corePatentCount: 92,
        patentSynergyPoint: '吉大超分子荧光探针合成专利可大幅提高弱阳性肿瘤标志物检出下限（提升2个数量级）。'
      }
    ],
    techPainPoints: [
      '超高敏化学发光底物非特异性吸附背景荧光噪声压制',
      '高端医用单晶超声探头压电复合材料关键配方依赖进口',
      '急危重症监护设备呼吸力学多参数无创连续高精度监测算法'
    ],
    rdDirections: [
      '单分子免疫诊断与超多重数字PCR一体化检测',
      '4D超高频手术导航医用内窥镜影像系统',
      'AI赋能的ICU重症多器官状态早期预警智能决策系统'
    ],
    preferredCollabMode: '建立校企联合研发中心 / 专利买断转让 / 临床中试验证转化',
    keyInventors: [
      { name: '刘杰', patentCount: 141, title: '核心发明人/技术总监' },
      { name: '陈涛', patentCount: 119, title: '核心发明人/研发骨干' }
    ],
    contact: {
      dept: '迈瑞集团研发技术合作部 / 试剂研发部',
      contactPerson: '陈默',
      title: '技术合作部高级总监',
      phone: '0755-81888998',
      email: 'chenmo@mindray.com',
      suggestedApproach: '联合吉大白求恩第一医院临床专家与化学学院科研团队，向迈瑞体外诊断事业部推介微流控芯片与高敏磁珠探针组合技术方案。'
    }
  },

  // 5. 智能工业母机与高端数控 - 科德数控
  {
    id: 'ent-kede',
    name: '科德数控股份有限公司',
    shortName: '科德数控 (Kede CNC)',
    creditCode: '91210213702157833K',
    registeredCapital: '10,230 万元人民币',
    location: '辽宁省大连市经济技术开发区天府街1号',
    province: '辽宁省',
    city: '大连市',
    industry: '高端装备制造 / 五轴联动数控机床与数控系统',
    scale: '国家级制造业单项冠军 / 国内五轴联动数控机床领头羊',
    enterpriseType: '国家级专精特新“小巨人”',
    revenue: '4.5 亿元',
    rdInvestment: '1.2 亿元 (研发比 26.6%)',
    rdRatio: '26.6%',
    patentTotalCount: 380,
    inventionPatentCount: 220,
    matchSource: 'similar_patent',
    matchScore: 95,
    synergyReason: '科德数控自主研发的高端五轴数控机床在航空叶轮、机匣加工中，亟需吉林大学机械与航空航天工程学院的五轴刀轨自适应抑振与热变形在线补偿专利。',
    similarPatents: [
      {
        patentNo: 'CN114147481B',
        title: '一种基于动力学特征的五轴数控加工进给速度平滑规划方法',
        ipc: 'G05B19/4103',
        grantDate: '2023-04-18',
        similarityScore: 96.1,
        techOverlapDescription: '科德该专利针对复杂曲面加工过渡，吉大机械学院专利提出多轴向离心力耦合动态补偿，加工表面光洁度提升1个等级。'
      }
    ],
    chainPosition: {
      chainId: 'chain-machinery',
      chainName: '数控机床',
      node: 'midstream',
      nodeName: '中游：高档五轴数控机床整机制造与总装',
      subSegment: '五轴卧式铣车复合加工中心 / 航天复杂结构件加工机床',
      mainProducts: ['KMC800系列五轴加工中心', 'GMC系列龙门加工中心', 'GNC68高档数控系统']
    },
    patentProducts: [
      {
        productCode: 'CP-2023-CNC-004',
        productName: 'KMC系列大型五轴联动立式加工中心',
        filingYear: '2023年备案',
        productCategory: '国家专利密集型产品',
        annualOutputValue: '1亿-5亿元',
        corePatentCount: 31,
        patentSynergyPoint: '吉大机床主轴动态热平衡自适应控温专利可将机床热平衡时间由2小时缩短至15分钟。'
      }
    ],
    techPainPoints: [
      '航空钛合金薄壁叶盘高速铣削过程中的颤振抑制与刀具磨损在线预警',
      '大型五轴机床主轴与回转工作台在重载工况下的空间几何误差实时补偿',
      '国产自主高档数控系统纳米级高精插补核心算子优化'
    ],
    rdDirections: [
      '超精密五轴微细加工机床与激光复合加工中心',
      '数字孪生驱动的工业母机全生命周期自进化数控系统',
      '碳纤维复合材料构件超声辅助高精切削装备'
    ],
    preferredCollabMode: '专利开放许可 / 共同申报国家重大科技专项 / 联合人才培养',
    keyInventors: [
      { name: '陈超', patentCount: 148, title: '核心发明人/技术总监' },
      { name: '杨明', patentCount: 92, title: '核心发明人/研发骨干' }
    ],
    contact: {
      dept: '技术中心 / 数控算法研究所',
      contactPerson: '张树生',
      title: '技术副总经理兼总工程师',
      phone: '0411-87569999',
      email: 'zhangss@kede-cnc.com',
      suggestedApproach: '以东北制造业同根同源为纽带，邀请吉大机械学院数控与振动控制团队赴大连工厂现场观摩加工切削实验，切入产学研技术转让。'
    }
  },

  // 6. 新型显示与半导体材料 - 京东方科技集团
  {
    id: 'ent-boe',
    name: '京东方科技集团股份有限公司',
    shortName: '京东方 (BOE)',
    creditCode: '911100001011014479',
    registeredCapital: '3,819,636 万元人民币',
    location: '北京市朝阳区酒仙桥路10号',
    province: '北京市',
    city: '北京市',
    industry: '半导体显示 / OLED与量子点发光材料',
    scale: '全球半导体显示器件出货量第一 / 科技部国家技术创新中心依托单位',
    enterpriseType: '上市企业',
    revenue: '1,745 亿元',
    rdInvestment: '125.6 亿元 (研发比 7.2%)',
    rdRatio: '7.2%',
    patentTotalCount: 89000,
    inventionPatentCount: 75000,
    matchSource: 'similar_patent',
    matchScore: 99,
    synergyReason: '京东方在柔性OLED发光器件和Micro-LED微显示领域专利布局密集，与吉林大学化学学院马於光院士团队、段羽教授团队的高效率蓝光热活化延迟荧光（TADF）及阻隔水氧封装专利极度契合。',
    similarPatents: [
      {
        patentNo: 'CN114256488B',
        title: '一种有机发光二极管及其封装结构与显示装置',
        ipc: 'H01L51/52',
        grantDate: '2023-09-05',
        similarityScore: 97.4,
        techOverlapDescription: '京东方专利重点解决薄膜封装弯折开裂，吉大专利开发了原子层沉积（ALD）无机-有机杂化交替阻隔层，水汽透过率达10^-6 g/m^2/day。'
      }
    ],
    chainPosition: {
      chainId: 'chain-opto-semi',
      chainName: '集成电路',
      node: 'downstream',
      nodeName: '下游：高端半导体显示面板与终端模组制造',
      subSegment: '柔性OLED显示面板 / 车载贯穿式双联屏 / Micro-LED微显示芯片',
      mainProducts: ['第6代柔性AMOLED显示屏', 'Oxide高刷电竞显示模组', '8K超高清Mini-LED背光屏']
    },
    patentProducts: [
      {
        productCode: 'CP-2023-BOE-001',
        productName: '第6代超薄柔性AMOLED折叠显示屏幕',
        filingYear: '2023年备案',
        productCategory: '国家专利密集型产品',
        annualOutputValue: '100亿-500亿元',
        corePatentCount: 310,
        patentSynergyPoint: '吉大柔性透明电极与耐折叠封装专利可大幅提高折叠屏20万次弯折寿命无折痕。'
      }
    ],
    techPainPoints: [
      '蓝光OLED材料发光效率与使用寿命（LT95）衰减快，至今难突破商业瓶颈',
      'Micro-LED巨量转移良率瓶颈与RGB全彩化均匀性色偏',
      '车载超大曲面OLED屏幕抗震抗冲击与强光直射下的高对比度保持'
    ],
    rdDirections: [
      '高色纯度深蓝光TADF材料与钙钛矿发光器件产业化',
      '硅基Micro-OLED近眼微显示光机系统',
      '柔性传感与显示集成（Sensor-on-Panel）智能触控技术'
    ],
    preferredCollabMode: '联合申报国家重点研发计划 / 核心材料先导中试研发 / 独家专利授权许可',
    keyInventors: [
      { name: '杨刚', patentCount: 155, title: '核心发明人/技术总监' },
      { name: '黄平', patentCount: 105, title: '核心发明人/研发骨干' }
    ],
    contact: {
      dept: '集团技术研发中心 (Central Research Institute) / 先进材料研究所',
      contactPerson: '邵喜斌',
      title: '集团副总裁兼首席显示技术科学家',
      phone: '010-64318888',
      email: 'shaoxibin@boe.com.cn',
      suggestedApproach: '由吉大化学学院超分子国家重点实验室直接组织「吉大-京东方柔性发光与封装前沿技术对接会」，直击蓝光寿命与ALD封装核心痛点。'
    }
  },

  // 7. 先进高分子与复合材料 - 恒力石化 / 中复神鹰
  {
    id: 'ent-sycarbon',
    name: '中复神鹰碳纤维股份有限公司',
    shortName: '中复神鹰 (Zhongfu Shenying)',
    creditCode: '91320700787688206W',
    registeredCapital: '90,000 万元人民币',
    location: '江苏省连云港市经济技术开发区大浦工业区大浦南路',
    province: '江苏省',
    city: '连云港市',
    industry: '新材料 / 高性能碳纤维及复合材料',
    scale: '科创板上市企业 / 国内首家干喷湿纺高强高模碳纤维万吨级企业',
    enterpriseType: '上市企业',
    revenue: '22.8 亿元',
    rdInvestment: '1.9 亿元 (研发比 8.33%)',
    rdRatio: '8.33%',
    patentTotalCount: 320,
    inventionPatentCount: 180,
    matchSource: 'industry_chain',
    matchScore: 94,
    synergyReason: '中复神鹰作为T1000/T1100超高强度碳纤维龙头，正寻求下游航空航天用耐高温热塑性树脂基体复合工艺，吉林大学特种工程塑料教育部重点实验室的聚醚醚酮（PEEK）与聚酰亚胺（PI）专利技术是其首选匹配标的。',
    similarPatents: [
      {
        patentNo: 'CN113881512B',
        title: '一种航空级碳纤维增强热塑性复合材料预浸料及其制备方法',
        ipc: 'C08J5/04',
        grantDate: '2023-01-10',
        similarityScore: 92.5,
        techOverlapDescription: '中复神鹰侧重原丝与碳布制备，吉大专利在特种PEEK树脂界面浸润性改性与预浸带快速熔融固化上具有关键专利保护。'
      }
    ],
    chainPosition: {
      chainId: 'chain-materials',
      chainName: '纳米新材料',
      node: 'midstream',
      nodeName: '中游：高性能纤维编织与特种预浸料制造',
      subSegment: '高强高模型碳纤维布 / 热塑性树脂基预浸料 / 航空构件预成型体',
      mainProducts: ['SYT55S (T800级) 碳纤维', 'SYM40J 高模量碳纤维', '航空用热塑性预浸带']
    },
    patentProducts: [
      {
        productCode: 'CP-2023-CARB-006',
        productName: '干喷湿纺高性能PAN基碳纤维(T800级)',
        filingYear: '2023年备案',
        productCategory: '国家专利密集型产品',
        annualOutputValue: '10亿-50亿元',
        corePatentCount: 28,
        patentSynergyPoint: '吉大耐500℃特种工程塑料浸润剂专利使碳纤维界面剪切强度提升42%。'
      }
    ],
    techPainPoints: [
      '热塑性树脂（PEEK/PPS）高粘度熔体对密实碳纤维束完全浸润难',
      '复合材料结构件在极端高低温交变环境下的界面微裂纹扩展',
      '民机复合材料大部件自动化快速热压罐外成型工艺与模具设计'
    ],
    rdDirections: [
      'M60J / M65J 级超高模量航天用碳纤维制备技术',
      '连续碳纤维增强耐高温热塑性复合材料快速冲压成型',
      '低成本高阻燃大丝束风电叶片用碳纤维复材开发'
    ],
    preferredCollabMode: '联合共建热塑性复材工程技术中心 / 专利授权与工艺包转让',
    keyInventors: [
      { name: '黄辉', patentCount: 162, title: '核心发明人/技术总监' },
      { name: '赵峰', patentCount: 118, title: '核心发明人/研发骨干' }
    ],
    contact: {
      dept: '技术中心 / 复合材料应用研究所',
      contactPerson: '金亮',
      title: '总工程师兼研发总监',
      phone: '0518-85709999',
      email: 'jinliang@shenyingcarbon.com',
      suggestedApproach: '向中复神鹰复材事业部推介吉大特种工程塑料国家工程中心的高分子基体配方与界面改性专利包。'
    }
  },

  // 8. 现代农业与智能仿生农机 - 一拖股份
  {
    id: 'ent-ytogroup',
    name: '第一拖拉机股份有限公司 (中国一拖)',
    shortName: '中国一拖 (YTO Group)',
    creditCode: '914103001711201887',
    registeredCapital: '112,364 万元人民币',
    location: '河南省洛阳市涧西区建设路154号',
    province: '河南省',
    city: '洛阳市',
    industry: '现代农机装备 / 智能拖拉机与重型动力机械',
    scale: '中国农机工业领军企业 / “东方红”农机品牌创造者',
    enterpriseType: '上市企业',
    revenue: '128 亿元',
    rdInvestment: '5.8 亿元 (研发比 4.53%)',
    rdRatio: '4.53%',
    patentTotalCount: 2600,
    inventionPatentCount: 1100,
    matchSource: 'patent_product',
    matchScore: 97,
    synergyReason: '一拖东方红重型智能拖拉机已进入国家专利密集型产品备案公开数据，亟需吉林大学生物与农业工程学院任露泉院士团队的仿生脱土减阻犁体、仿生耐磨触土刀片与北斗自主导航作业算法。',
    similarPatents: [
      {
        patentNo: 'CN114342502B',
        title: '一种用于深翻作业的低阻力仿生翻转犁体曲面设计',
        ipc: 'A01B15/06',
        grantDate: '2023-06-20',
        similarityScore: 96.5,
        techOverlapDescription: '一拖传统犁体在东北黑土地湿黏土壤下易结泥黏附，吉大仿生动物体表凸起几何与微纳米疏水涂层使牵引阻力降低18%-25%。'
      }
    ],
    chainPosition: {
      chainId: 'chain-agriculture',
      chainName: '农业机械设备',
      node: 'downstream',
      nodeName: '下游：大马力高端智能农机整机制造',
      subSegment: '200马力以上动力换挡拖拉机 / 智能联合收割机 / 仿生免耕播种机',
      mainProducts: ['东方红LF2204动力换挡拖拉机', '东方红自走式谷物联合收获机', '智能电驱动播种机']
    },
    patentProducts: [
      {
        productCode: 'CP-2023-AGRI-002',
        productName: '东方红LW2604重型轮式智能拖拉机系统',
        filingYear: '2023年备案',
        productCategory: '国家专利密集型产品',
        annualOutputValue: '10亿-50亿元',
        corePatentCount: 42,
        patentSynergyPoint: '吉大地面机械仿生重点实验室的仿生耐磨犁铧专利直接延长触土作业寿命2.5倍。'
      }
    ],
    techPainPoints: [
      '重负荷作业工况下拖拉机无级变速器（CVT）重载离合打滑与发热',
      '黏重土壤与残茬地块触土部件严重磨损与功耗激增',
      '复杂坡地作业农机底盘车身主动调平与防侧翻控制'
    ],
    rdDirections: [
      '大功率新能源农机与混合动力拖拉机系统',
      '基于机器视觉与LiDAR的无人驾驶农田精准作业作业控制',
      '仿生深松减阻整地与土壤墒情在线监测一体化机具'
    ],
    preferredCollabMode: '重大横向攻关 / 核心专利技术转让 / 国家级农机创新平台共建',
    keyInventors: [
      { name: '赵健', patentCount: 169, title: '核心发明人/技术总监' },
      { name: '吴斌', patentCount: 91, title: '核心发明人/研发骨干' }
    ],
    contact: {
      dept: '大拖研究所 / 农机智能装备重点实验室',
      contactPerson: '郭志强',
      title: '大拖研究所所长兼智能农机总设计师',
      phone: '0379-64968888',
      email: 'guozq@yto.com.cn',
      suggestedApproach: '由吉大农机与仿生学院组织专家团队赴洛阳一拖总部，带上东北黑土地对比试验减阻数据与耐磨样件开展技术对接。'
    }
  },
  {
    id: 'ent-mock-1',
    name: '智能制造与新能源创新科技(测试1)股份有限公司',
    shortName: '创新科技1',
    creditCode: '9135090045164U',
    registeredCapital: '1885 万元人民币',
    location: '广东省广州市',
    province: '广东省',
    city: '广州市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '13 亿元 (2024)',
    rdInvestment: '226 百万元',
    rdRatio: '9.33%',
    patentTotalCount: 24,
    inventionPatentCount: 16,
    matchSource: 'similar_patent',
    matchScore: 80,
    legalRep: '张三1',
    address: '广东省广州市高新技术产业园1号',
    phone: '044-18728595',
    email: 'contact@mock1.com',
    website: 'www.mock1.com',
    establishedDate: '2011-04-12',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11776473A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13834630954',
      email: 'lisi@mock1.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-2',
    name: '智能制造与新能源创新科技(测试2)股份有限公司',
    shortName: '创新科技2',
    creditCode: '9135090018415U',
    registeredCapital: '1077 万元人民币',
    location: '浙江省宁波市',
    province: '浙江省',
    city: '宁波市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '16 亿元 (2024)',
    rdInvestment: '131 百万元',
    rdRatio: '9.03%',
    patentTotalCount: 73,
    inventionPatentCount: 27,
    matchSource: 'similar_patent',
    matchScore: 79,
    legalRep: '张三2',
    address: '浙江省宁波市高新技术产业园2号',
    phone: '027-89063594',
    email: 'contact@mock2.com',
    website: 'www.mock2.com',
    establishedDate: '2017-04-14',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11792341A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13810498017',
      email: 'lisi@mock2.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-3',
    name: '智能制造与新能源创新科技(测试3)股份有限公司',
    shortName: '创新科技3',
    creditCode: '9135090091795U',
    registeredCapital: '4998 万元人民币',
    location: '湖北省武汉市',
    province: '湖北省',
    city: '武汉市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '39 亿元 (2024)',
    rdInvestment: '437 百万元',
    rdRatio: '4.00%',
    patentTotalCount: 115,
    inventionPatentCount: 34,
    matchSource: 'similar_patent',
    matchScore: 90,
    legalRep: '张三3',
    address: '湖北省武汉市高新技术产业园3号',
    phone: '056-41897631',
    email: 'contact@mock3.com',
    website: 'www.mock3.com',
    establishedDate: '2011-09-15',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11268580A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13845475116',
      email: 'lisi@mock3.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-4',
    name: '智能制造与新能源创新科技(测试4)股份有限公司',
    shortName: '创新科技4',
    creditCode: '9135090082780U',
    registeredCapital: '5540 万元人民币',
    location: '上海市上海市',
    province: '上海市',
    city: '上海市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '35 亿元 (2024)',
    rdInvestment: '45 百万元',
    rdRatio: '6.59%',
    patentTotalCount: 63,
    inventionPatentCount: 31,
    matchSource: 'similar_patent',
    matchScore: 84,
    legalRep: '张三4',
    address: '上海市上海市高新技术产业园4号',
    phone: '090-35646450',
    email: 'contact@mock4.com',
    website: 'www.mock4.com',
    establishedDate: '2018-02-12',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11939198A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13811466388',
      email: 'lisi@mock4.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-5',
    name: '智能制造与新能源创新科技(测试5)股份有限公司',
    shortName: '创新科技5',
    creditCode: '9135090060833U',
    registeredCapital: '5397 万元人民币',
    location: '上海市上海市',
    province: '上海市',
    city: '上海市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '29 亿元 (2024)',
    rdInvestment: '132 百万元',
    rdRatio: '3.06%',
    patentTotalCount: 71,
    inventionPatentCount: 48,
    matchSource: 'similar_patent',
    matchScore: 88,
    legalRep: '张三5',
    address: '上海市上海市高新技术产业园5号',
    phone: '029-39947095',
    email: 'contact@mock5.com',
    website: 'www.mock5.com',
    establishedDate: '2016-05-15',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11977832A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13823438733',
      email: 'lisi@mock5.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-6',
    name: '智能制造与新能源创新科技(测试6)股份有限公司',
    shortName: '创新科技6',
    creditCode: '9135090092902U',
    registeredCapital: '3515 万元人民币',
    location: '北京市北京市',
    province: '北京市',
    city: '北京市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '5 亿元 (2024)',
    rdInvestment: '435 百万元',
    rdRatio: '8.31%',
    patentTotalCount: 73,
    inventionPatentCount: 13,
    matchSource: 'similar_patent',
    matchScore: 78,
    legalRep: '张三6',
    address: '北京市北京市高新技术产业园6号',
    phone: '041-70409862',
    email: 'contact@mock6.com',
    website: 'www.mock6.com',
    establishedDate: '2015-03-13',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11694981A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13847507140',
      email: 'lisi@mock6.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-7',
    name: '智能制造与新能源创新科技(测试7)股份有限公司',
    shortName: '创新科技7',
    creditCode: '9135090030687U',
    registeredCapital: '5324 万元人民币',
    location: '江苏省苏州市',
    province: '江苏省',
    city: '苏州市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '17 亿元 (2024)',
    rdInvestment: '266 百万元',
    rdRatio: '7.58%',
    patentTotalCount: 84,
    inventionPatentCount: 8,
    matchSource: 'similar_patent',
    matchScore: 85,
    legalRep: '张三7',
    address: '江苏省苏州市高新技术产业园7号',
    phone: '021-34810217',
    email: 'contact@mock7.com',
    website: 'www.mock7.com',
    establishedDate: '2016-05-18',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11415125A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13879506394',
      email: 'lisi@mock7.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-8',
    name: '智能制造与新能源创新科技(测试8)股份有限公司',
    shortName: '创新科技8',
    creditCode: '9135090069819U',
    registeredCapital: '6245 万元人民币',
    location: '北京市北京市',
    province: '北京市',
    city: '北京市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '44 亿元 (2024)',
    rdInvestment: '92 百万元',
    rdRatio: '7.16%',
    patentTotalCount: 34,
    inventionPatentCount: 32,
    matchSource: 'similar_patent',
    matchScore: 90,
    legalRep: '张三8',
    address: '北京市北京市高新技术产业园8号',
    phone: '029-62680875',
    email: 'contact@mock8.com',
    website: 'www.mock8.com',
    establishedDate: '2014-08-10',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11497539A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13876818112',
      email: 'lisi@mock8.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-9',
    name: '智能制造与新能源创新科技(测试9)股份有限公司',
    shortName: '创新科技9',
    creditCode: '9135090038115U',
    registeredCapital: '3105 万元人民币',
    location: '山东省济南市',
    province: '山东省',
    city: '济南市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '41 亿元 (2024)',
    rdInvestment: '400 百万元',
    rdRatio: '8.25%',
    patentTotalCount: 26,
    inventionPatentCount: 23,
    matchSource: 'similar_patent',
    matchScore: 73,
    legalRep: '张三9',
    address: '山东省济南市高新技术产业园9号',
    phone: '017-72647166',
    email: 'contact@mock9.com',
    website: 'www.mock9.com',
    establishedDate: '2015-08-12',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11587665A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13822556061',
      email: 'lisi@mock9.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-10',
    name: '智能制造与新能源创新科技(测试10)股份有限公司',
    shortName: '创新科技10',
    creditCode: '9135090091151U',
    registeredCapital: '1140 万元人民币',
    location: '四川省成都市',
    province: '四川省',
    city: '成都市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '16 亿元 (2024)',
    rdInvestment: '194 百万元',
    rdRatio: '8.86%',
    patentTotalCount: 99,
    inventionPatentCount: 34,
    matchSource: 'similar_patent',
    matchScore: 88,
    legalRep: '张三10',
    address: '四川省成都市高新技术产业园10号',
    phone: '046-31236613',
    email: 'contact@mock10.com',
    website: 'www.mock10.com',
    establishedDate: '2016-04-17',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11354683A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13884743207',
      email: 'lisi@mock10.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-11',
    name: '智能制造与新能源创新科技(测试11)股份有限公司',
    shortName: '创新科技11',
    creditCode: '9135090036474U',
    registeredCapital: '7459 万元人民币',
    location: '江苏省无锡市',
    province: '江苏省',
    city: '无锡市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '37 亿元 (2024)',
    rdInvestment: '44 百万元',
    rdRatio: '4.65%',
    patentTotalCount: 136,
    inventionPatentCount: 47,
    matchSource: 'similar_patent',
    matchScore: 75,
    legalRep: '张三11',
    address: '江苏省无锡市高新技术产业园11号',
    phone: '061-98475714',
    email: 'contact@mock11.com',
    website: 'www.mock11.com',
    establishedDate: '2019-03-17',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11751036A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13836859102',
      email: 'lisi@mock11.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-12',
    name: '智能制造与新能源创新科技(测试12)股份有限公司',
    shortName: '创新科技12',
    creditCode: '9135090061001U',
    registeredCapital: '8842 万元人民币',
    location: '上海市上海市',
    province: '上海市',
    city: '上海市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '40 亿元 (2024)',
    rdInvestment: '51 百万元',
    rdRatio: '4.26%',
    patentTotalCount: 86,
    inventionPatentCount: 14,
    matchSource: 'similar_patent',
    matchScore: 86,
    legalRep: '张三12',
    address: '上海市上海市高新技术产业园12号',
    phone: '075-24356084',
    email: 'contact@mock12.com',
    website: 'www.mock12.com',
    establishedDate: '2011-01-11',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11399016A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13833802253',
      email: 'lisi@mock12.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-13',
    name: '智能制造与新能源创新科技(测试13)股份有限公司',
    shortName: '创新科技13',
    creditCode: '9135090015568U',
    registeredCapital: '6085 万元人民币',
    location: '北京市北京市',
    province: '北京市',
    city: '北京市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '36 亿元 (2024)',
    rdInvestment: '192 百万元',
    rdRatio: '3.01%',
    patentTotalCount: 112,
    inventionPatentCount: 27,
    matchSource: 'similar_patent',
    matchScore: 81,
    legalRep: '张三13',
    address: '北京市北京市高新技术产业园13号',
    phone: '074-54844669',
    email: 'contact@mock13.com',
    website: 'www.mock13.com',
    establishedDate: '2013-03-10',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11894542A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13888001508',
      email: 'lisi@mock13.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-14',
    name: '智能制造与新能源创新科技(测试14)股份有限公司',
    shortName: '创新科技14',
    creditCode: '9135090046497U',
    registeredCapital: '3867 万元人民币',
    location: '湖北省武汉市',
    province: '湖北省',
    city: '武汉市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '11 亿元 (2024)',
    rdInvestment: '82 百万元',
    rdRatio: '9.94%',
    patentTotalCount: 130,
    inventionPatentCount: 15,
    matchSource: 'similar_patent',
    matchScore: 73,
    legalRep: '张三14',
    address: '湖北省武汉市高新技术产业园14号',
    phone: '091-18157049',
    email: 'contact@mock14.com',
    website: 'www.mock14.com',
    establishedDate: '2019-05-17',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11843920A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13847733685',
      email: 'lisi@mock14.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-15',
    name: '智能制造与新能源创新科技(测试15)股份有限公司',
    shortName: '创新科技15',
    creditCode: '9135090039075U',
    registeredCapital: '3486 万元人民币',
    location: '上海市上海市',
    province: '上海市',
    city: '上海市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '2 亿元 (2024)',
    rdInvestment: '484 百万元',
    rdRatio: '4.91%',
    patentTotalCount: 26,
    inventionPatentCount: 8,
    matchSource: 'similar_patent',
    matchScore: 78,
    legalRep: '张三15',
    address: '上海市上海市高新技术产业园15号',
    phone: '063-23965757',
    email: 'contact@mock15.com',
    website: 'www.mock15.com',
    establishedDate: '2014-09-13',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11592357A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13846595239',
      email: 'lisi@mock15.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-16',
    name: '智能制造与新能源创新科技(测试16)股份有限公司',
    shortName: '创新科技16',
    creditCode: '9135090048674U',
    registeredCapital: '2106 万元人民币',
    location: '江苏省南京市',
    province: '江苏省',
    city: '南京市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '49 亿元 (2024)',
    rdInvestment: '54 百万元',
    rdRatio: '6.82%',
    patentTotalCount: 176,
    inventionPatentCount: 26,
    matchSource: 'similar_patent',
    matchScore: 79,
    legalRep: '张三16',
    address: '江苏省南京市高新技术产业园16号',
    phone: '056-77932689',
    email: 'contact@mock16.com',
    website: 'www.mock16.com',
    establishedDate: '2013-02-15',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11439064A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13830994847',
      email: 'lisi@mock16.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-17',
    name: '智能制造与新能源创新科技(测试17)股份有限公司',
    shortName: '创新科技17',
    creditCode: '9135090026010U',
    registeredCapital: '3316 万元人民币',
    location: '上海市上海市',
    province: '上海市',
    city: '上海市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '47 亿元 (2024)',
    rdInvestment: '172 百万元',
    rdRatio: '6.82%',
    patentTotalCount: 20,
    inventionPatentCount: 26,
    matchSource: 'similar_patent',
    matchScore: 82,
    legalRep: '张三17',
    address: '上海市上海市高新技术产业园17号',
    phone: '028-93908025',
    email: 'contact@mock17.com',
    website: 'www.mock17.com',
    establishedDate: '2015-09-13',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11271983A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13812250877',
      email: 'lisi@mock17.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-18',
    name: '智能制造与新能源创新科技(测试18)股份有限公司',
    shortName: '创新科技18',
    creditCode: '9135090050330U',
    registeredCapital: '5697 万元人民币',
    location: '北京市北京市',
    province: '北京市',
    city: '北京市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '49 亿元 (2024)',
    rdInvestment: '78 百万元',
    rdRatio: '6.95%',
    patentTotalCount: 79,
    inventionPatentCount: 10,
    matchSource: 'similar_patent',
    matchScore: 84,
    legalRep: '张三18',
    address: '北京市北京市高新技术产业园18号',
    phone: '052-14291112',
    email: 'contact@mock18.com',
    website: 'www.mock18.com',
    establishedDate: '2017-08-19',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11821161A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13852923417',
      email: 'lisi@mock18.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-19',
    name: '智能制造与新能源创新科技(测试19)股份有限公司',
    shortName: '创新科技19',
    creditCode: '9135090058047U',
    registeredCapital: '6061 万元人民币',
    location: '山东省青岛市',
    province: '山东省',
    city: '青岛市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '3 亿元 (2024)',
    rdInvestment: '226 百万元',
    rdRatio: '6.96%',
    patentTotalCount: 99,
    inventionPatentCount: 35,
    matchSource: 'similar_patent',
    matchScore: 87,
    legalRep: '张三19',
    address: '山东省青岛市高新技术产业园19号',
    phone: '022-62474110',
    email: 'contact@mock19.com',
    website: 'www.mock19.com',
    establishedDate: '2016-03-14',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11977557A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13850659111',
      email: 'lisi@mock19.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-20',
    name: '智能制造与新能源创新科技(测试20)股份有限公司',
    shortName: '创新科技20',
    creditCode: '9135090046817U',
    registeredCapital: '7952 万元人民币',
    location: '江苏省南京市',
    province: '江苏省',
    city: '南京市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '44 亿元 (2024)',
    rdInvestment: '154 百万元',
    rdRatio: '6.67%',
    patentTotalCount: 132,
    inventionPatentCount: 23,
    matchSource: 'similar_patent',
    matchScore: 76,
    legalRep: '张三20',
    address: '江苏省南京市高新技术产业园20号',
    phone: '085-96922952',
    email: 'contact@mock20.com',
    website: 'www.mock20.com',
    establishedDate: '2011-03-14',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11777785A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13848849694',
      email: 'lisi@mock20.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-21',
    name: '智能制造与新能源创新科技(测试21)股份有限公司',
    shortName: '创新科技21',
    creditCode: '9135090060827U',
    registeredCapital: '8245 万元人民币',
    location: '江苏省南京市',
    province: '江苏省',
    city: '南京市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '45 亿元 (2024)',
    rdInvestment: '149 百万元',
    rdRatio: '6.32%',
    patentTotalCount: 24,
    inventionPatentCount: 50,
    matchSource: 'similar_patent',
    matchScore: 81,
    legalRep: '张三21',
    address: '江苏省南京市高新技术产业园21号',
    phone: '032-17240685',
    email: 'contact@mock21.com',
    website: 'www.mock21.com',
    establishedDate: '2015-05-10',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11459620A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13853841762',
      email: 'lisi@mock21.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-22',
    name: '智能制造与新能源创新科技(测试22)股份有限公司',
    shortName: '创新科技22',
    creditCode: '9135090013227U',
    registeredCapital: '3582 万元人民币',
    location: '湖北省武汉市',
    province: '湖北省',
    city: '武汉市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '15 亿元 (2024)',
    rdInvestment: '450 百万元',
    rdRatio: '8.83%',
    patentTotalCount: 106,
    inventionPatentCount: 24,
    matchSource: 'similar_patent',
    matchScore: 86,
    legalRep: '张三22',
    address: '湖北省武汉市高新技术产业园22号',
    phone: '091-77449552',
    email: 'contact@mock22.com',
    website: 'www.mock22.com',
    establishedDate: '2018-02-12',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11231875A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13818084770',
      email: 'lisi@mock22.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-23',
    name: '智能制造与新能源创新科技(测试23)股份有限公司',
    shortName: '创新科技23',
    creditCode: '9135090029001U',
    registeredCapital: '1368 万元人民币',
    location: '湖北省武汉市',
    province: '湖北省',
    city: '武汉市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '29 亿元 (2024)',
    rdInvestment: '201 百万元',
    rdRatio: '6.31%',
    patentTotalCount: 55,
    inventionPatentCount: 41,
    matchSource: 'similar_patent',
    matchScore: 72,
    legalRep: '张三23',
    address: '湖北省武汉市高新技术产业园23号',
    phone: '042-21911389',
    email: 'contact@mock23.com',
    website: 'www.mock23.com',
    establishedDate: '2019-01-14',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11399249A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13852499262',
      email: 'lisi@mock23.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-24',
    name: '智能制造与新能源创新科技(测试24)股份有限公司',
    shortName: '创新科技24',
    creditCode: '9135090077538U',
    registeredCapital: '6224 万元人民币',
    location: '广东省深圳市',
    province: '广东省',
    city: '深圳市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '8 亿元 (2024)',
    rdInvestment: '100 百万元',
    rdRatio: '3.61%',
    patentTotalCount: 128,
    inventionPatentCount: 46,
    matchSource: 'similar_patent',
    matchScore: 75,
    legalRep: '张三24',
    address: '广东省深圳市高新技术产业园24号',
    phone: '043-75573578',
    email: 'contact@mock24.com',
    website: 'www.mock24.com',
    establishedDate: '2012-03-12',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11382955A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13820797642',
      email: 'lisi@mock24.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-25',
    name: '智能制造与新能源创新科技(测试25)股份有限公司',
    shortName: '创新科技25',
    creditCode: '9135090019393U',
    registeredCapital: '1747 万元人民币',
    location: '广东省广州市',
    province: '广东省',
    city: '广州市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '45 亿元 (2024)',
    rdInvestment: '397 百万元',
    rdRatio: '7.33%',
    patentTotalCount: 175,
    inventionPatentCount: 46,
    matchSource: 'similar_patent',
    matchScore: 78,
    legalRep: '张三25',
    address: '广东省广州市高新技术产业园25号',
    phone: '025-30001824',
    email: 'contact@mock25.com',
    website: 'www.mock25.com',
    establishedDate: '2017-03-12',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11801145A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13864602856',
      email: 'lisi@mock25.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-26',
    name: '智能制造与新能源创新科技(测试26)股份有限公司',
    shortName: '创新科技26',
    creditCode: '9135090089387U',
    registeredCapital: '2734 万元人民币',
    location: '浙江省杭州市',
    province: '浙江省',
    city: '杭州市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '33 亿元 (2024)',
    rdInvestment: '485 百万元',
    rdRatio: '5.33%',
    patentTotalCount: 55,
    inventionPatentCount: 34,
    matchSource: 'similar_patent',
    matchScore: 93,
    legalRep: '张三26',
    address: '浙江省杭州市高新技术产业园26号',
    phone: '011-44146104',
    email: 'contact@mock26.com',
    website: 'www.mock26.com',
    establishedDate: '2014-02-14',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11521829A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13837330666',
      email: 'lisi@mock26.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-27',
    name: '智能制造与新能源创新科技(测试27)股份有限公司',
    shortName: '创新科技27',
    creditCode: '9135090021299U',
    registeredCapital: '6013 万元人民币',
    location: '四川省成都市',
    province: '四川省',
    city: '成都市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '14 亿元 (2024)',
    rdInvestment: '202 百万元',
    rdRatio: '3.23%',
    patentTotalCount: 170,
    inventionPatentCount: 44,
    matchSource: 'similar_patent',
    matchScore: 74,
    legalRep: '张三27',
    address: '四川省成都市高新技术产业园27号',
    phone: '077-61046438',
    email: 'contact@mock27.com',
    website: 'www.mock27.com',
    establishedDate: '2015-08-17',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11219142A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13830572778',
      email: 'lisi@mock27.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-28',
    name: '智能制造与新能源创新科技(测试28)股份有限公司',
    shortName: '创新科技28',
    creditCode: '9135090025878U',
    registeredCapital: '8185 万元人民币',
    location: '湖北省武汉市',
    province: '湖北省',
    city: '武汉市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '43 亿元 (2024)',
    rdInvestment: '215 百万元',
    rdRatio: '3.37%',
    patentTotalCount: 159,
    inventionPatentCount: 13,
    matchSource: 'similar_patent',
    matchScore: 83,
    legalRep: '张三28',
    address: '湖北省武汉市高新技术产业园28号',
    phone: '047-99767724',
    email: 'contact@mock28.com',
    website: 'www.mock28.com',
    establishedDate: '2014-04-16',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11306279A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13815936649',
      email: 'lisi@mock28.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-29',
    name: '智能制造与新能源创新科技(测试29)股份有限公司',
    shortName: '创新科技29',
    creditCode: '9135090030806U',
    registeredCapital: '8705 万元人民币',
    location: '浙江省宁波市',
    province: '浙江省',
    city: '宁波市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '4 亿元 (2024)',
    rdInvestment: '21 百万元',
    rdRatio: '8.36%',
    patentTotalCount: 115,
    inventionPatentCount: 33,
    matchSource: 'similar_patent',
    matchScore: 86,
    legalRep: '张三29',
    address: '浙江省宁波市高新技术产业园29号',
    phone: '097-71825923',
    email: 'contact@mock29.com',
    website: 'www.mock29.com',
    establishedDate: '2012-09-13',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11765970A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13851798913',
      email: 'lisi@mock29.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-30',
    name: '智能制造与新能源创新科技(测试30)股份有限公司',
    shortName: '创新科技30',
    creditCode: '9135090010228U',
    registeredCapital: '1578 万元人民币',
    location: '浙江省杭州市',
    province: '浙江省',
    city: '杭州市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '20 亿元 (2024)',
    rdInvestment: '247 百万元',
    rdRatio: '6.73%',
    patentTotalCount: 198,
    inventionPatentCount: 42,
    matchSource: 'similar_patent',
    matchScore: 71,
    legalRep: '张三30',
    address: '浙江省杭州市高新技术产业园30号',
    phone: '053-80728703',
    email: 'contact@mock30.com',
    website: 'www.mock30.com',
    establishedDate: '2014-05-18',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11595845A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13854307049',
      email: 'lisi@mock30.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-31',
    name: '智能制造与新能源创新科技(测试31)股份有限公司',
    shortName: '创新科技31',
    creditCode: '9135090021922U',
    registeredCapital: '3756 万元人民币',
    location: '湖北省武汉市',
    province: '湖北省',
    city: '武汉市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '38 亿元 (2024)',
    rdInvestment: '407 百万元',
    rdRatio: '3.99%',
    patentTotalCount: 96,
    inventionPatentCount: 11,
    matchSource: 'similar_patent',
    matchScore: 91,
    legalRep: '张三31',
    address: '湖北省武汉市高新技术产业园31号',
    phone: '077-77996528',
    email: 'contact@mock31.com',
    website: 'www.mock31.com',
    establishedDate: '2014-02-17',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11604825A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13896995796',
      email: 'lisi@mock31.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-32',
    name: '智能制造与新能源创新科技(测试32)股份有限公司',
    shortName: '创新科技32',
    creditCode: '9135090084879U',
    registeredCapital: '5035 万元人民币',
    location: '上海市上海市',
    province: '上海市',
    city: '上海市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '18 亿元 (2024)',
    rdInvestment: '39 百万元',
    rdRatio: '9.48%',
    patentTotalCount: 53,
    inventionPatentCount: 19,
    matchSource: 'similar_patent',
    matchScore: 89,
    legalRep: '张三32',
    address: '上海市上海市高新技术产业园32号',
    phone: '087-96995094',
    email: 'contact@mock32.com',
    website: 'www.mock32.com',
    establishedDate: '2010-07-15',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11701311A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13816782910',
      email: 'lisi@mock32.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-33',
    name: '智能制造与新能源创新科技(测试33)股份有限公司',
    shortName: '创新科技33',
    creditCode: '9135090052301U',
    registeredCapital: '1338 万元人民币',
    location: '上海市上海市',
    province: '上海市',
    city: '上海市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '36 亿元 (2024)',
    rdInvestment: '26 百万元',
    rdRatio: '5.83%',
    patentTotalCount: 41,
    inventionPatentCount: 22,
    matchSource: 'similar_patent',
    matchScore: 93,
    legalRep: '张三33',
    address: '上海市上海市高新技术产业园33号',
    phone: '013-44028127',
    email: 'contact@mock33.com',
    website: 'www.mock33.com',
    establishedDate: '2018-03-15',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11476916A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13846155902',
      email: 'lisi@mock33.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-34',
    name: '智能制造与新能源创新科技(测试34)股份有限公司',
    shortName: '创新科技34',
    creditCode: '9135090034079U',
    registeredCapital: '6570 万元人民币',
    location: '湖北省武汉市',
    province: '湖北省',
    city: '武汉市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '20 亿元 (2024)',
    rdInvestment: '82 百万元',
    rdRatio: '9.59%',
    patentTotalCount: 99,
    inventionPatentCount: 10,
    matchSource: 'similar_patent',
    matchScore: 75,
    legalRep: '张三34',
    address: '湖北省武汉市高新技术产业园34号',
    phone: '044-60024719',
    email: 'contact@mock34.com',
    website: 'www.mock34.com',
    establishedDate: '2015-02-13',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11959489A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13898167669',
      email: 'lisi@mock34.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-35',
    name: '智能制造与新能源创新科技(测试35)股份有限公司',
    shortName: '创新科技35',
    creditCode: '9135090070991U',
    registeredCapital: '6966 万元人民币',
    location: '上海市上海市',
    province: '上海市',
    city: '上海市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '19 亿元 (2024)',
    rdInvestment: '382 百万元',
    rdRatio: '5.40%',
    patentTotalCount: 87,
    inventionPatentCount: 22,
    matchSource: 'similar_patent',
    matchScore: 73,
    legalRep: '张三35',
    address: '上海市上海市高新技术产业园35号',
    phone: '020-56270307',
    email: 'contact@mock35.com',
    website: 'www.mock35.com',
    establishedDate: '2010-06-12',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11903798A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13826185582',
      email: 'lisi@mock35.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-36',
    name: '智能制造与新能源创新科技(测试36)股份有限公司',
    shortName: '创新科技36',
    creditCode: '9135090034423U',
    registeredCapital: '6400 万元人民币',
    location: '江苏省苏州市',
    province: '江苏省',
    city: '苏州市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '45 亿元 (2024)',
    rdInvestment: '254 百万元',
    rdRatio: '5.48%',
    patentTotalCount: 106,
    inventionPatentCount: 50,
    matchSource: 'similar_patent',
    matchScore: 79,
    legalRep: '张三36',
    address: '江苏省苏州市高新技术产业园36号',
    phone: '098-71650672',
    email: 'contact@mock36.com',
    website: 'www.mock36.com',
    establishedDate: '2018-02-19',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11970182A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13886726963',
      email: 'lisi@mock36.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-37',
    name: '智能制造与新能源创新科技(测试37)股份有限公司',
    shortName: '创新科技37',
    creditCode: '9135090058520U',
    registeredCapital: '6946 万元人民币',
    location: '湖北省武汉市',
    province: '湖北省',
    city: '武汉市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '14 亿元 (2024)',
    rdInvestment: '120 百万元',
    rdRatio: '4.06%',
    patentTotalCount: 94,
    inventionPatentCount: 22,
    matchSource: 'similar_patent',
    matchScore: 95,
    legalRep: '张三37',
    address: '湖北省武汉市高新技术产业园37号',
    phone: '010-15412162',
    email: 'contact@mock37.com',
    website: 'www.mock37.com',
    establishedDate: '2010-02-10',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11743400A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13838484682',
      email: 'lisi@mock37.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-38',
    name: '智能制造与新能源创新科技(测试38)股份有限公司',
    shortName: '创新科技38',
    creditCode: '9135090016273U',
    registeredCapital: '2646 万元人民币',
    location: '四川省成都市',
    province: '四川省',
    city: '成都市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '1 亿元 (2024)',
    rdInvestment: '345 百万元',
    rdRatio: '7.52%',
    patentTotalCount: 104,
    inventionPatentCount: 28,
    matchSource: 'similar_patent',
    matchScore: 90,
    legalRep: '张三38',
    address: '四川省成都市高新技术产业园38号',
    phone: '076-31339872',
    email: 'contact@mock38.com',
    website: 'www.mock38.com',
    establishedDate: '2018-05-13',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11668860A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13876475324',
      email: 'lisi@mock38.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-39',
    name: '智能制造与新能源创新科技(测试39)股份有限公司',
    shortName: '创新科技39',
    creditCode: '9135090041427U',
    registeredCapital: '8681 万元人民币',
    location: '湖北省武汉市',
    province: '湖北省',
    city: '武汉市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '39 亿元 (2024)',
    rdInvestment: '483 百万元',
    rdRatio: '4.89%',
    patentTotalCount: 101,
    inventionPatentCount: 31,
    matchSource: 'similar_patent',
    matchScore: 93,
    legalRep: '张三39',
    address: '湖北省武汉市高新技术产业园39号',
    phone: '028-23561968',
    email: 'contact@mock39.com',
    website: 'www.mock39.com',
    establishedDate: '2011-08-14',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11417461A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13895786865',
      email: 'lisi@mock39.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-40',
    name: '智能制造与新能源创新科技(测试40)股份有限公司',
    shortName: '创新科技40',
    creditCode: '9135090035775U',
    registeredCapital: '2338 万元人民币',
    location: '广东省深圳市',
    province: '广东省',
    city: '深圳市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '21 亿元 (2024)',
    rdInvestment: '192 百万元',
    rdRatio: '5.84%',
    patentTotalCount: 30,
    inventionPatentCount: 12,
    matchSource: 'similar_patent',
    matchScore: 72,
    legalRep: '张三40',
    address: '广东省深圳市高新技术产业园40号',
    phone: '029-20984849',
    email: 'contact@mock40.com',
    website: 'www.mock40.com',
    establishedDate: '2017-05-17',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11820254A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13896644256',
      email: 'lisi@mock40.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-41',
    name: '智能制造与新能源创新科技(测试41)股份有限公司',
    shortName: '创新科技41',
    creditCode: '9135090012991U',
    registeredCapital: '4585 万元人民币',
    location: '浙江省宁波市',
    province: '浙江省',
    city: '宁波市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '7 亿元 (2024)',
    rdInvestment: '130 百万元',
    rdRatio: '6.47%',
    patentTotalCount: 188,
    inventionPatentCount: 14,
    matchSource: 'similar_patent',
    matchScore: 72,
    legalRep: '张三41',
    address: '浙江省宁波市高新技术产业园41号',
    phone: '040-30209963',
    email: 'contact@mock41.com',
    website: 'www.mock41.com',
    establishedDate: '2013-04-17',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11475783A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13877782740',
      email: 'lisi@mock41.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-42',
    name: '智能制造与新能源创新科技(测试42)股份有限公司',
    shortName: '创新科技42',
    creditCode: '9135090045336U',
    registeredCapital: '3426 万元人民币',
    location: '四川省成都市',
    province: '四川省',
    city: '成都市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '11 亿元 (2024)',
    rdInvestment: '424 百万元',
    rdRatio: '3.95%',
    patentTotalCount: 93,
    inventionPatentCount: 48,
    matchSource: 'similar_patent',
    matchScore: 88,
    legalRep: '张三42',
    address: '四川省成都市高新技术产业园42号',
    phone: '019-62812212',
    email: 'contact@mock42.com',
    website: 'www.mock42.com',
    establishedDate: '2014-03-11',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11827655A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13824832469',
      email: 'lisi@mock42.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-43',
    name: '智能制造与新能源创新科技(测试43)股份有限公司',
    shortName: '创新科技43',
    creditCode: '9135090078977U',
    registeredCapital: '7168 万元人民币',
    location: '浙江省宁波市',
    province: '浙江省',
    city: '宁波市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '24 亿元 (2024)',
    rdInvestment: '156 百万元',
    rdRatio: '9.00%',
    patentTotalCount: 108,
    inventionPatentCount: 24,
    matchSource: 'similar_patent',
    matchScore: 82,
    legalRep: '张三43',
    address: '浙江省宁波市高新技术产业园43号',
    phone: '044-78893846',
    email: 'contact@mock43.com',
    website: 'www.mock43.com',
    establishedDate: '2019-08-16',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11898915A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13822545674',
      email: 'lisi@mock43.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
  {
    id: 'ent-mock-44',
    name: '智能制造与新能源创新科技(测试44)股份有限公司',
    shortName: '创新科技44',
    creditCode: '9135090025228U',
    registeredCapital: '3853 万元人民币',
    location: '北京市北京市',
    province: '北京市',
    city: '北京市',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '16 亿元 (2024)',
    rdInvestment: '377 百万元',
    rdRatio: '3.56%',
    patentTotalCount: 156,
    inventionPatentCount: 9,
    matchSource: 'similar_patent',
    matchScore: 83,
    legalRep: '张三44',
    address: '北京市北京市高新技术产业园44号',
    phone: '032-60393463',
    email: 'contact@mock44.com',
    website: 'www.mock44.com',
    establishedDate: '2014-06-14',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      { name: '李四', role: '首席科学家', domain: '自动化控制' },
      { name: '王五', role: '研发总监', domain: '电力电子' }
    ],
    similarPatents: [
      { patentNo: 'CN11130143A', title: '一种基于机器视觉的自动化校准方法' }
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '13836433108',
      email: 'lisi@mock44.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }
  },
];
