import { TargetEnterprise } from '../types';

export const TARGET_ENTERPRISES_DATA: TargetEnterprise[] = [
  // 1. 汽车及新能源汽车产业链 - 动力电池与复合材料
  {
    id: 'ent-catl',
    name: '宁德时代新能源科技股份有限公司',
    shortName: '宁德时代 (CATL)',
    creditCode: '91350900587526883U',
    registeredCapital: '439,890.35 万元人民币',
    location: '福建省宁德市蕉城区漳湾镇新港路2号',
    province: '福建省',
    city: '宁德市',
    industry: '新能源汽车 / 动力电池与储能系统',
    scale: '全球动力电池市占率第一 / 创业板千亿市值龙头',
    enterpriseType: '上市企业',
    revenue: '4,009 亿元 (2024)',
    rdInvestment: '183.6 亿元 (研发比 4.58%)',
    rdRatio: '4.58%',
    patentTotalCount: 29540,
    inventionPatentCount: 18420,
    matchSource: 'similar_patent',
    matchScore: 97,
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
      chainName: '新能源与智能网联汽车产业链',
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
      chainName: '新能源与智能网联汽车产业链',
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
      chainName: '光电子信息与精密仪器产业链',
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
      chainName: '生物医药与高端医疗器械产业链',
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
      chainName: '智能工业母机与高端数控产业链',
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
      chainName: '光电子信息与精密仪器产业链',
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
      chainName: '先进高分子与高性能复合材料产业链',
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
    synergyReason: '一拖东方红重型智能拖拉机已进入国家专利密集型产品备案库，亟需吉林大学生物与农业工程学院任露泉院士团队的仿生脱土减阻犁体、仿生耐磨触土刀片与北斗自主导航作业算法。',
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
      chainName: '现代农业装备与智能仿生农机产业链',
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
    contact: {
      dept: '大拖研究所 / 农机智能装备重点实验室',
      contactPerson: '郭志强',
      title: '大拖研究所所长兼智能农机总设计师',
      phone: '0379-64968888',
      email: 'guozq@yto.com.cn',
      suggestedApproach: '由吉大农机与仿生学院组织专家团队赴洛阳一拖总部，带上东北黑土地对比试验减阻数据与耐磨样件开展技术对接。'
    }
  }
];
