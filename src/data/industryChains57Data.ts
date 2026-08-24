export interface IndustryChain57Item {
  id: string;
  code: string;
  name: string;
  category: '新能源与智能网联汽车' | '集成电路与新一代信息技术' | '高端装备与工业母机' | '新材料与特种高分子' | '生物医药与现代大健康' | '现代农业与绿色生态' | '绿色低碳与新能源储能';
  summary: string;
  jluAdvantageCollege: string;
  upstreamNode: { name: string; keyTechs: string[]; matchedEnterprises: number };
  midstreamNode: { name: string; keyTechs: string[]; matchedEnterprises: number };
  downstreamNode: { name: string; keyTechs: string[]; matchedEnterprises: number };
  totalEnterprises: number;
  jluPatentsCount: number;
  featuredCompanies: string[];
}

export const INDUSTRY_CHAINS_57_DATA: IndustryChain57Item[] = [
  // 1-8 新能源与智能网联汽车
  {
    id: 'chain-01',
    code: 'IC-01',
    name: '新能源汽车动力电池与固态电解质产业链',
    category: '新能源与智能网联汽车',
    summary: '涵盖超高镍三元正极、硅碳负极、固态电解质、涂覆隔膜、电芯制造及电池管理系统(BMS)。',
    jluAdvantageCollege: '化学学院、无机合成与制备化学国家重点实验室',
    upstreamNode: { name: '正负极材料/电解质/隔膜', keyTechs: ['高镍单晶材料包覆', '硫化物固态电解质', '硅碳负极纳米化'], matchedEnterprises: 28 },
    midstreamNode: { name: '动力电芯/Pack总成/BMS', keyTechs: ['高一致性电芯化成', '智能热管理算法', '4C快充结构件'], matchedEnterprises: 34 },
    downstreamNode: { name: '新能源乘用车/商用车/储能', keyTechs: ['整车高压架构', '底盘一体化CTC', '退役动力电池梯次利用'], matchedEnterprises: 19 },
    totalEnterprises: 81,
    jluPatentsCount: 420,
    featuredCompanies: ['宁德时代', '亿纬锂能', '国轩高科', '中创新航', '璞泰来']
  },
  {
    id: 'chain-02',
    code: 'IC-02',
    name: '智能网联汽车线控底盘与智能座舱产业链',
    category: '新能源与智能网联汽车',
    summary: '涵盖线控制动(EMB/1-Box)、线控转向(SBW)、主动空气悬架、仿生减阻车身及多模态智能座舱。',
    jluAdvantageCollege: '汽车工程学院、仿生科学与工程教育部重点实验室',
    upstreamNode: { name: '汽车传感器/MCU芯片/液压执行器', keyTechs: ['高精度轮速传感器', '车规级功率驱动', '电磁比例阀'], matchedEnterprises: 22 },
    midstreamNode: { name: '线控转向/制动/悬架总成', keyTechs: ['分布式驱动协同控制', '线控多轴主动转向', '自适应空气悬架减震'], matchedEnterprises: 31 },
    downstreamNode: { name: '智能网联乘用车/自动驾驶物流车', keyTechs: ['全线控滑板底盘', '整车中央计算平台', '智能座舱多模交互'], matchedEnterprises: 16 },
    totalEnterprises: 69,
    jluPatentsCount: 560,
    featuredCompanies: ['中国一汽', '伯特利', '拓普集团', '保隆科技', '德赛西威']
  },
  {
    id: 'chain-03',
    code: 'IC-03',
    name: '车用氢燃料电池与车载储氢系统产业链',
    category: '新能源与智能网联汽车',
    summary: '涵盖催化剂、质子交换膜、膜电极(MEA)、双极板、燃料电池电堆及IV型高压储氢瓶。',
    jluAdvantageCollege: '材料科学与工程学院、超硬材料国家重点实验室',
    upstreamNode: { name: '铂合金催化剂/质子膜/碳纸', keyTechs: ['低铂/非贵金属催化剂', '全氟磺酸树脂膜', '碳纤维编织微孔层'], matchedEnterprises: 19 },
    midstreamNode: { name: '膜电极/金属双极板/电堆总成', keyTechs: ['超薄金属极板冲压', '电堆水热管理', '百千瓦级电堆封装'], matchedEnterprises: 25 },
    downstreamNode: { name: '氢能重卡/客车/加氢装备', keyTechs: ['70MPa IV型储氢系统', '氢能整车能量控制', '大流量加氢机'], matchedEnterprises: 14 },
    totalEnterprises: 58,
    jluPatentsCount: 215,
    featuredCompanies: ['亿华通', '重塑能源', '中集安瑞科', '国鸿氢能', '潍柴动力']
  },
  {
    id: 'chain-04',
    code: 'IC-04',
    name: '车规级第三代半导体功率模块产业链',
    category: '新能源与智能网联汽车',
    summary: '碳化硅(SiC)单晶衬底、外延片、MOSFET芯片、车规功率模块及800V高压电驱逆变器。',
    jluAdvantageCollege: '电子科学与工程学院、集成光电子学国家重点实验室',
    upstreamNode: { name: 'SiC晶体生长/高纯石墨/外延片', keyTechs: ['8英寸碳化硅晶体PVT法', '低缺陷微管控制', '原子级化学机械抛光'], matchedEnterprises: 16 },
    midstreamNode: { name: '车规SiC MOSFET芯片与先进封装', keyTechs: ['双面纳米银烧结', '铜线键合工艺', '集成温度传感封装'], matchedEnterprises: 24 },
    downstreamNode: { name: '800V高压主驱控制器/OBC/充电桩', keyTechs: ['超高频电驱逆变器', '兆瓦级超快充桩', '整车高压配电单元'], matchedEnterprises: 18 },
    totalEnterprises: 58,
    jluPatentsCount: 180,
    featuredCompanies: ['三安光电', '斯达半导', '时代电气', '士兰微', '汇川技术']
  },

  // 9-16 集成电路与新一代信息技术
  {
    id: 'chain-05',
    code: 'IC-05',
    name: '光电信息与半导体微纳显示产业链',
    category: '集成电路与新一代信息技术',
    summary: '涵盖TADF有机发光材料、钙钛矿发光器件、柔性AMOLED面板、Micro-LED巨量转移与近眼AR显示。',
    jluAdvantageCollege: '化学学院、超分子结构与材料国家重点实验室、电子科学与工程学院',
    upstreamNode: { name: '高纯有机发光材料/光刻胶/特气', keyTechs: ['深蓝光TADF材料合成', '超纯精馏升华', 'KrF/ArF光刻胶树脂'], matchedEnterprises: 32 },
    midstreamNode: { name: 'OLED面板蒸镀/薄膜封装(TFE)/模组', keyTechs: ['ALD低温无机阻水封装', '柔性PI基板剥离', 'Micro-LED高精度巨量转移'], matchedEnterprises: 29 },
    downstreamNode: { name: '智能手机/折叠屏/车载显示/AR眼镜', keyTechs: ['折叠屏超薄玻璃UTG', '车载防眩光双联屏', '光波导微显示光机'], matchedEnterprises: 21 },
    totalEnterprises: 82,
    jluPatentsCount: 680,
    featuredCompanies: ['京东方', 'TCL华星', '维信诺', '奥来德光电', '歌尔股份']
  },
  {
    id: 'chain-06',
    code: 'IC-06',
    name: '高精度光学镜头与机器视觉传感器产业链',
    category: '集成电路与新一代信息技术',
    summary: '非球面光学玻璃透镜、超构表面(Metalens)、车载ADAS镜头模组、工业机器视觉检测系统。',
    jluAdvantageCollege: '仪器科学与电气工程学院、电子科学与工程学院',
    upstreamNode: { name: '光学玻璃毛坯/纳米光学镀膜靶材', keyTechs: ['低色散高折射玻璃', '超宽带多层增透膜', '超精密模具抛光'], matchedEnterprises: 20 },
    midstreamNode: { name: '精密非球面模压/镜头总成制造', keyTechs: ['晶圆级超构透镜加工', '极端温差无热化设计', '多轴主动对准AA工艺'], matchedEnterprises: 35 },
    downstreamNode: { name: '智能驾驶感知/工业缺陷检测/航天遥感', keyTechs: ['800万高清ADAS镜头', '线扫3D机器视觉仪', '商业卫星多光谱载荷'], matchedEnterprises: 23 },
    totalEnterprises: 78,
    jluPatentsCount: 390,
    featuredCompanies: ['舜宇光学', '长光卫星', '联创电子', '海康威视', '凌云光']
  },
  {
    id: 'chain-07',
    code: 'IC-07',
    name: '人工智能行业大模型与边缘智能计算产业链',
    category: '集成电路与新一代信息技术',
    summary: '涵盖大模型知识库构建、软硬件协同边缘AI计算盒、智能边缘视觉终端及工业质检Agent。',
    jluAdvantageCollege: '计算机科学与技术学院、软件学院、人工智能学院',
    upstreamNode: { name: '数据标注基座/算力基础设施', keyTechs: ['多模态向量化引擎', '端侧模型轻量量化', '异构算力调度框架'], matchedEnterprises: 25 },
    midstreamNode: { name: '工业行业垂直大模型/中间件', keyTechs: ['知识图谱自动构建', '工业异常声纹识别', '低延时端侧推理引擎'], matchedEnterprises: 38 },
    downstreamNode: { name: '智慧工厂巡检/智能机器人/智慧政务', keyTechs: ['自主巡检四足机器人', '工业缺陷自动分类', '数字人交互系统'], matchedEnterprises: 30 },
    totalEnterprises: 93,
    jluPatentsCount: 510,
    featuredCompanies: ['商汤科技', '科大讯飞', '云从科技', '寒武纪', '中科曙光']
  },

  // 17-24 高端装备与工业母机
  {
    id: 'chain-08',
    code: 'IC-08',
    name: '五轴联动高档数控机床与智能数控系统产业链',
    category: '高端装备与工业母机',
    summary: '高精度电主轴、直线电机、双摆角数控铣头、五轴联动加工中心及高档数控系统(CNC)。',
    jluAdvantageCollege: '机械与航空航天工程学院',
    upstreamNode: { name: '高精主轴/滚珠丝杠/伺服电机', keyTechs: ['动静压混合主轴轴承', '纳米级光栅尺', '直驱双摆角铣头'], matchedEnterprises: 26 },
    midstreamNode: { name: '五轴立/卧加工中心/高档数控系统', keyTechs: ['五轴复杂曲面轨迹插补', '结构热变形实时补偿', '颤振主动在线抑制'], matchedEnterprises: 33 },
    downstreamNode: { name: '航空航天结构件/复杂叶轮叶片制造', keyTechs: ['钛合金机匣高速切削', '航天薄壁件微变形控制', '模具精密镜面铣削'], matchedEnterprises: 22 },
    totalEnterprises: 81,
    jluPatentsCount: 460,
    featuredCompanies: ['科德数控', '华中数控', '海天精工', '创世纪', '通用技术沈阳机床']
  },
  {
    id: 'chain-09',
    code: 'IC-09',
    name: '工业机器人减速器与伺服关节模组产业链',
    category: '高端装备与工业母机',
    summary: 'RV减速器、谐波减速器、力矩电机、一体化关节执行器及六轴工业协作机器人。',
    jluAdvantageCollege: '机械与航空航天工程学院、仪器科学与电气工程学院',
    upstreamNode: { name: '特种合金钢材/高精轴承/磁钢', keyTechs: ['耐疲劳齿轮钢热处理', '柔轮超薄精密磨齿', '高性能钕铁硼磁材'], matchedEnterprises: 21 },
    midstreamNode: { name: 'RV/谐波减速器/一体化智能关节', keyTechs: ['摆线针轮共轭齿形修形', '多维力矩传感器集成', '高扭矩密度关节设计'], matchedEnterprises: 29 },
    downstreamNode: { name: '焊接/装配工业机器人/具身人形机器人', keyTechs: ['末端振动自适应抑制', '视觉引导高精度装配', '人形双足动态平衡'], matchedEnterprises: 27 },
    totalEnterprises: 77,
    jluPatentsCount: 340,
    featuredCompanies: ['双环传动', '绿的谐波', '埃斯顿', '汇川技术', '宇树科技']
  },
  {
    id: 'chain-10',
    code: 'IC-10',
    name: '地球深部探测仪器与智能测井装备产业链',
    category: '高端装备与工业母机',
    summary: '国家重大科研仪器、深地钻探随钻测量仪(MWD/LWD)、核磁共振测井仪与航空地质物探仪。',
    jluAdvantageCollege: '仪器科学与电气工程学院、地球探测科学与技术学院（黄大年团队）',
    upstreamNode: { name: '高温耐振传感器/弱磁测量探头', keyTechs: ['200℃高温井下电子线路', '磁通门高精度磁强计', '压电超声换能器'], matchedEnterprises: 15 },
    midstreamNode: { name: '随钻测井系统/地面物探仪器总成', keyTechs: ['随钻电磁波电阻率测井', '航空重磁综合测量仪', '井下声波成像系统'], matchedEnterprises: 22 },
    downstreamNode: { name: '油气田开采/战略性矿产勘探/深地工程', keyTechs: ['深层页岩气地质导向', '千米深井自动化钻进', '地热资源精准探测'], matchedEnterprises: 18 },
    totalEnterprises: 55,
    jluPatentsCount: 480,
    featuredCompanies: ['中海油服', '中油测井', '石化油服', '恒泰艾普', '吉林大学地探成果孵化群']
  },

  // 25-32 新材料与特种高分子
  {
    id: 'chain-11',
    code: 'IC-11',
    name: '特种工程塑料(PEEK/PI)与高温聚合物产业链',
    category: '新材料与特种高分子',
    summary: '聚醚醚酮(PEEK)、聚酰亚胺(PI)、特种含氟高分子、医用植入级聚合物及航天耐热复合件。',
    jluAdvantageCollege: '化学学院、特种工程塑料教育部重点实验室',
    upstreamNode: { name: '氟酮单体/双酚芴/二酐二胺原料', keyTechs: ['高纯度4,4-二氟二苯甲酮', '无溶剂绿色催化聚合', '单体痕量重金属脱除'], matchedEnterprises: 24 },
    midstreamNode: { name: 'PEEK/PI树脂改性/挤出型材/薄膜', keyTechs: ['医用植入级PEEK除杂提纯', '超薄耐电晕PI薄膜', '碳纤维增强热塑性造粒'], matchedEnterprises: 31 },
    downstreamNode: { name: '医疗人造骨骼/半导体夹具/航空构件', keyTechs: ['3D打印多孔植入假体', '半导体晶圆吸盘耐磨件', '航空绝缘耐温连接器'], matchedEnterprises: 25 },
    totalEnterprises: 80,
    jluPatentsCount: 520,
    featuredCompanies: ['中研股份', '新瀚新材', '沃特股份', '万润股份', '时代新材']
  },
  {
    id: 'chain-12',
    code: 'IC-12',
    name: '超硬材料与金刚石半导体功能器件产业链',
    category: '新材料与特种高分子',
    summary: '金刚石单晶生长、CVD大单晶、超精密金刚石切削工具、金刚石热沉片与大功率散热模组。',
    jluAdvantageCollege: '超硬材料国家重点实验室、材料科学与工程学院',
    upstreamNode: { name: '高纯石墨碳源/硬质合金顶锤/触媒', keyTechs: ['高温高压(HPHT)六面顶压机', '微波等离子体CVD', '气相外延同质多晶'], matchedEnterprises: 18 },
    midstreamNode: { name: '金刚石晶圆/热沉片/微粉砂轮', keyTechs: ['高导热金刚石表面金属化', '纳米级超精密抛光', '超硬PCD刀具激光微加工'], matchedEnterprises: 28 },
    downstreamNode: { name: '大功率半导体散热/芯片划片/航空切削', keyTechs: ['GaN功放器件金刚石热沉', '半导体超薄晶圆微切削', '精密光学模具超精车削'], matchedEnterprises: 20 },
    totalEnterprises: 66,
    jluPatentsCount: 390,
    featuredCompanies: ['中兵红箭', '黄河旋风', '力量钻石', '沃尔德', '四方达']
  },

  // 33-40 生物医药与现代大健康
  {
    id: 'chain-13',
    code: 'IC-13',
    name: '全自动体外诊断(IVD)与高敏荧光探针产业链',
    category: '生物医药与现代大健康',
    summary: '化学发光试剂盒、超分子荧光探针、纳米磁珠、微流控芯片、数字PCR及全自动生化分析仪。',
    jluAdvantageCollege: '化学学院、白求恩医学院、生命科学学院',
    upstreamNode: { name: '抗原抗体/荧光发光底物/纳米磁珠', keyTechs: ['超敏吖啶酯标记物合成', '单分散纳米功能磁珠', '超分子特异性荧光探针'], matchedEnterprises: 30 },
    midstreamNode: { name: '微流控芯片/发光试剂盒/分析仪整机', keyTechs: ['声表面波无损微混匀', '多通道微流控注塑封装', '光电倍增管弱信号放大'], matchedEnterprises: 36 },
    downstreamNode: { name: '三甲医院检验科/第三方临检中心/POCT', keyTechs: ['肿瘤标志物超早期筛查', '心肌肌钙蛋白即时快检', '感染病原体全自动联检'], matchedEnterprises: 26 },
    totalEnterprises: 92,
    jluPatentsCount: 440,
    featuredCompanies: ['迈瑞医疗', '安图生物', '新产业', '亚辉龙', '热景生物']
  },
  {
    id: 'chain-14',
    code: 'IC-14',
    name: '仿生组织工程支架与医用再生植入材料产业链',
    category: '生物医药与现代大健康',
    summary: '仿生多孔骨修复支架、可降解血管支架、生物医用镁合金、光固化水凝胶及软骨再生材料。',
    jluAdvantageCollege: '白求恩口腔医学院、材料科学与工程学院、化学学院',
    upstreamNode: { name: '医用高纯钛粉/丝素蛋白/胶原原料', keyTechs: ['超细医用球形钛合金粉末', '天然高分子精准交联', '生物医用镁钙合金冶炼'], matchedEnterprises: 20 },
    midstreamNode: { name: '3D打印多孔支架/改性表面涂层', keyTechs: ['微纳拓扑仿生孔径调控', '含锶羟基磷灰石涂层', '控释生长因子纳米微球'], matchedEnterprises: 27 },
    downstreamNode: { name: '骨科关节置换/牙种植体/颌面创伤修复', keyTechs: ['个性化骨缺损定制假体', '骨质疏松患者牙种植', '难愈合创面活性敷料'], matchedEnterprises: 22 },
    totalEnterprises: 69,
    jluPatentsCount: 310,
    featuredCompanies: ['威高股份', '大博医疗', '正海生物', '凯利泰', '春立医疗']
  },

  // 41-48 现代农业与绿色生态
  {
    id: 'chain-15',
    code: 'IC-15',
    name: '大马力高端智能农机与仿生减阻装备产业链',
    category: '现代农业与绿色生态',
    summary: '重型动力换挡拖拉机、黑土地仿生减阻犁体、电驱动免耕播种机、北斗自主作业与联合收获机。',
    jluAdvantageCollege: '生物与农业工程学院、仿生科学与工程教育部重点实验室',
    upstreamNode: { name: '耐磨特种钢/液压多路阀/北斗终端', keyTechs: ['仿生耐磨合金熔覆层', '电液比例提升阀组', '高精度RTK差分模块'], matchedEnterprises: 22 },
    midstreamNode: { name: '仿生触土耕作机具/整机总装系统', keyTechs: ['仿生脱土减阻曲面成型', '气力式高速免耕精量播种', '大喂入量双滚筒脱粒'], matchedEnterprises: 28 },
    downstreamNode: { name: '现代农场/农业合作社/粮食主产区', keyTechs: ['无人农场自主耕种管收', '黑土地保护性免耕耕作', '多机协同作业调度系统'], matchedEnterprises: 19 },
    totalEnterprises: 69,
    jluPatentsCount: 380,
    featuredCompanies: ['中国一拖', '潍柴雷沃', '中联重科农机', '吉峰科技', '沃得农机']
  },

  // 49-57 绿色低碳与新能源储能
  {
    id: 'chain-16',
    code: 'IC-16',
    name: '大容量电化学储能与全固态电池产业链',
    category: '绿色低碳与新能源储能',
    summary: '储能专用磷酸铁锂电芯、全钒液流电池、钠离子电池、储能变流器(PCS)及工商业储能系统。',
    jluAdvantageCollege: '化学学院、材料科学与工程学院',
    upstreamNode: { name: '高纯钒电解液/离子交换膜/正负极', keyTechs: ['电解液高效活化配方', '超低内阻全氟磺酸膜', '硬碳负极多孔结构调控'], matchedEnterprises: 25 },
    midstreamNode: { name: '液流电堆总成/PCS变流器/BMS/EMS', keyTechs: ['百千瓦级低流阻电堆', '高转换效率SiC双向逆变', '多层级热失控预警联动'], matchedEnterprises: 34 },
    downstreamNode: { name: '电网侧调峰电站/风光配储/工商业储能', keyTechs: ['GW级储能电站集群调度', '黑启动与构网型控制', '全生命周期容量主动均衡'], matchedEnterprises: 21 },
    totalEnterprises: 80,
    jluPatentsCount: 450,
    featuredCompanies: ['阳光电源', '派能科技', '大连融科', '比亚迪储能', '科华数据']
  }
];

export const INDUSTRY_CATEGORIES = [
  '全部57条产业链',
  '新能源与智能网联汽车',
  '集成电路与新一代信息技术',
  '高端装备与工业母机',
  '新材料与特种高分子',
  '生物医药与现代大健康',
  '现代农业与绿色生态',
  '绿色低碳与新能源储能'
];
