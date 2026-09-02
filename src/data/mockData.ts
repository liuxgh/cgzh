import { PatentItem, EnterpriseDemand } from '../types';

export const INITIAL_PATENTS: PatentItem[] = [
  {
    id: 'pat-001',
    patentNo: 'CN116892341B',
    title: '一种面向智能新能源商用车的线控电液复合制动系统与能量回收控制方法',
    college: '',
    inventor: '高镇海',
    team: '智能底盘与智能网联汽车协同创新团队',
    field: 'automotive',
    fieldName: '汽车与智能网联',
    ipc: 'B60T 13/74, B60L 7/18',
    applicationDate: '2023-04-15',
    grantDate: '2024-02-18',
    status: 'valid',
    trlLevel: 7,
    trlDescription: 'TRL 7级 - 已完成一汽解放重卡台架试制与高寒极限环境实车验证',
    baitengScore: {
      overall: 94,
      technical: 96,
      legal: 92,
      market: 95,
      barrier: 93
    },
    valuationRange: '280万 - 380万元',
    openLicensePrice: '45万元/年 (或3%阶梯提成)',
    transferModes: ['transfer', 'exclusive_license', 'general_license', 'open_license'],
    abstract: '本发明公开了一种适用于重型商用车的智能线控复合制动架构，通过分布式压力伺服与再生制动解耦控制算法，在高湿、低附着冰雪路面上将制动距离缩短14.6%，同时提高制动能量回馈率22.3%，彻底解决传统气压制动响应滞后与协调控制难题。',
    innovations: [
      '毫秒级电液主动增压响应，响应时延<65ms',
      '自适应路面附着系数在线辨识与防侧滑耦合控制',
      '支持AUTOSAR与ISO 26262 ASIL-D最高功能安全标准'
    ],
    applicableIndustries: ['新能源重卡制造', '商用车线控底盘', '智能重卡自动驾驶系统集成商'],
    viewCount: 1420,
    matchCount: 18,
    documents: [
      { title: '专利授权说明书与权利要求书.pdf', size: '2.4 MB', type: 'PDF' },
      { title: '吉大汽车国重室第三方试验测试报告.pdf', size: '5.8 MB', type: 'PDF' },
      { title: '佰腾网高价值专利评估认证报告.pdf', size: '1.2 MB', type: 'PDF' }
    ]
  },
  {
    id: 'pat-002',
    patentNo: 'CN116564319B',
    title: '高色纯度热激活延迟荧光(TADF)超分子蓝光发光材料及其OLED器件制备工艺',
    college: '',
    inventor: '马於光',
    team: '有机光电功能材料与器件研发团队',
    field: 'materials',
    fieldName: '化学与超分子新材料',
    ipc: 'C07D 487/04, H10K 85/60',
    applicationDate: '2022-06-10',
    grantDate: '2023-11-04',
    status: 'open_licensed',
    trlLevel: 8,
    trlDescription: 'TRL 8级 - 生产系统通过中试放大，已在OLED示范面板线完成小批量蒸镀',
    baitengScore: {
      overall: 96,
      technical: 98,
      legal: 94,
      market: 96,
      barrier: 97
    },
    valuationRange: '450万 - 600万元',
    openLicensePrice: '60万元/年 (开放许可挂牌中)',
    transferModes: ['exclusive_license', 'general_license', 'open_license', 'equity'],
    abstract: '本发明提供了一种兼具窄光谱半峰宽（<28nm）与高外量子效率（EQE>32%）的新型硼氮稠环TADF深蓝光材料，显著抑制高亮度下的效率滚降，器件寿命相比传统商用蓝光材料提升3倍，为国产高端OLED显示屏提供核心发光材料自主可控解决方案。',
    innovations: [
      '自主原创空间共轭受体设计，打破欧美日核心专利池封锁',
      '升华产率大于92%，满足高世代线产线蒸镀纯度要求',
      '色坐标达到CIE y < 0.12的超高清REC.2020蓝光标准'
    ],
    applicableIndustries: ['OLED发光材料制造', '新型显示面板制造', 'VR/AR微显示芯片'],
    viewCount: 2310,
    matchCount: 29,
    documents: [
      { title: '发明专利证书与检测报告.pdf', size: '3.1 MB', type: 'PDF' },
      { title: '吉林大学中试基地放大纯化技术规程.pdf', size: '4.5 MB', type: 'PDF' }
    ]
  },
  {
    id: 'pat-003',
    patentNo: 'CN116239845B',
    title: '高精度皮秒激光超快加工微纳传感芯片与曲面微结构光栅系统',
    college: '',
    inventor: '孙洪波',
    team: '超快激光微纳制造与光电芯片团队',
    field: 'optoelectronics',
    fieldName: '电子信息与精密仪器',
    ipc: 'B23K 26/0622, G02B 5/18',
    applicationDate: '2023-08-20',
    grantDate: '2024-04-12',
    status: 'in_negotiation',
    trlLevel: 6,
    trlDescription: 'TRL 6级 - 工程样机与工艺包已完成长春光机精密制造环境测试',
    baitengScore: {
      overall: 91,
      technical: 95,
      legal: 89,
      market: 90,
      barrier: 92
    },
    valuationRange: '320万 - 450万元',
    openLicensePrice: '50万元/年',
    transferModes: ['transfer', 'exclusive_license', 'equity'],
    abstract: '本发明涉及一种用于半导体晶圆切割与航空级光学曲面微结构的超快激光加工系统，通过空间光调制器自适应波前调制，消除热影响区损伤，加工特征线宽可达50nm以下，加工效率提升5倍。',
    innovations: [
      '无热熔微裂纹损伤的超洁净非热剥蚀工艺',
      '三维自由曲面共形微结构实时轨迹规划与焦点自适应伺服',
      '支持碳化硅(SiC)、金刚石等超硬宽禁带半导体材料'
    ],
    applicableIndustries: ['半导体精密封测', '航空航天光学元器件', '生物微流控芯片制造'],
    viewCount: 980,
    matchCount: 12,
    documents: [
      { title: '超快激光加工技术参数白皮书.pdf', size: '6.2 MB', type: 'PDF' }
    ]
  },
  {
    id: 'pat-004',
    patentNo: 'CN116129871B',
    title: '靶向抗肿瘤长白山人参稀有皂苷Rg3/Rh2高效酶促转化与纳米脂质体载药制剂',
    college: '',
    inventor: '李研',
    team: '吉林道地药材与现代生物医药创新团队',
    field: 'biomedicine',
    fieldName: '生物医药与白求恩医学',
    ipc: 'C12P 19/56, A61K 9/127',
    applicationDate: '2023-01-18',
    grantDate: '2023-12-30',
    status: 'valid',
    trlLevel: 6,
    trlDescription: 'TRL 6级 - 已完成动物靶向代谢动力学实验与安全性评价',
    baitengScore: {
      overall: 89,
      technical: 91,
      legal: 88,
      market: 92,
      barrier: 86
    },
    valuationRange: '350万 - 500万元',
    openLicensePrice: '40万元/年',
    transferModes: ['exclusive_license', 'transfer', 'equity'],
    abstract: '本发明利用定向基因工程菌高效表达专用糖苷水解酶，将低价值粗人参总皂苷单批次定向转化制备高纯度单体皂苷Rg3/Rh2，纯度达98.5%以上，并结合PEG化长循环纳米脂质体技术，肿瘤靶向富集率提升6.8倍。',
    innovations: [
      '酶促催化特异性>99%，解决传统强酸水解副产物多及环境污染瓶颈',
      '显著降低生产成本达65%，具备工业吨级量产条件',
      '可直接申报中药创新药/特医食品注册审批'
    ],
    applicableIndustries: ['中药现代化制药', '抗肿瘤创新药物研发', '大健康高端功能食品'],
    viewCount: 1670,
    matchCount: 22,
    documents: [
      { title: '吉大药学院动物实验药理学报告.pdf', size: '8.1 MB', type: 'PDF' }
    ]
  },
  {
    id: 'pat-005',
    patentNo: 'CN116456209B',
    title: '东北黑土地全秸秆覆盖免耕少耕播种机防堵与智能压实破土装置',
    college: '',
    inventor: '杨印生',
    team: '黑土地保护与智能仿生农机工程团队',
    field: 'agriculture',
    fieldName: '现代农业与黑土地保护',
    ipc: 'A01B 49/06, A01C 7/00',
    applicationDate: '2022-11-22',
    grantDate: '2023-09-15',
    status: 'transferred',
    trlLevel: 9,
    trlDescription: 'TRL 9级 - 已在吉林梨树、榆树等黑土核心示范区完成万亩规模化示范应用',
    baitengScore: {
      overall: 93,
      technical: 92,
      legal: 90,
      market: 96,
      barrier: 92
    },
    valuationRange: '200万 - 300万元',
    openLicensePrice: '25万元/年',
    transferModes: ['transfer', 'general_license', 'open_license'],
    abstract: '针对东北春季低温多茬全秸秆还田地表播种易缠草、壅堵、种沟压实不良导致出苗率低的问题，发明了基于仿生穿山甲鳞片爪趾构型的波纹圆盘切茬破土总成与浮动式多级镇压机构，彻底解决"梨树模式"农机农艺融合痛点。',
    innovations: [
      '仿生减阻降附结构，切茬功耗降低18.4%',
      '宽幅全量秸秆免耕播种作业不堵塞，作业速度达12km/h',
      '出苗整齐度提高15%以上，入选国家黑土地保护主推技术目录'
    ],
    applicableIndustries: ['高端农机装备制造', '农业机械化服务运营', '黑土地保护工程示范项目'],
    viewCount: 3120,
    matchCount: 35,
    documents: [
      { title: '农业农村部机具鉴定检测报告.pdf', size: '4.2 MB', type: 'PDF' }
    ]
  },
  {
    id: 'pat-006',
    patentNo: 'CN116654120B',
    title: '复杂地层深部科学钻探智能化自适应钻进参数控制系统及井下感知装置',
    college: '',
    inventor: '孙友宏',
    team: '地学深部钻探装备与极地勘探团队',
    field: 'geology',
    fieldName: '智能勘探与特种机械',
    ipc: 'E21B 44/00, E21B 47/00',
    applicationDate: '2023-05-19',
    grantDate: '2024-03-01',
    status: 'valid',
    trlLevel: 8,
    trlDescription: 'TRL 8级 - 依托"地壳一号"万米钻机完成松辽盆地及极地冰盖深钻验证',
    baitengScore: {
      overall: 95,
      technical: 97,
      legal: 93,
      market: 94,
      barrier: 96
    },
    valuationRange: '500万 - 700万元',
    openLicensePrice: '75万元/年',
    transferModes: ['exclusive_license', 'general_license', 'equity'],
    abstract: '本发明针对深部高温高压坚硬地层钻进过程卡钻、钻具剧烈振动与井斜难题，发明了基于声电磁多物理场随钻实时感知与井下自适应恒扭矩智能控制系统，使深部地层机械钻速提高35%，钻头使用寿命延长2.1倍。',
    innovations: [
      '200℃超高温环境井下高可靠随钻测量耐受能力',
      '毫秒级振动模态实时辨识与主动阻尼吸振算法',
      '打破国外斯伦贝谢、贝克休斯在特深井钻探控制领域的垄断'
    ],
    applicableIndustries: ['油气与地热深井工程', '战略性矿产资源勘探', '深地深海特种装备制造'],
    viewCount: 1890,
    matchCount: 15,
    documents: [
      { title: '地壳一号深井实钻工程应用报告.pdf', size: '9.5 MB', type: 'PDF' }
    ]
  },
  {
    id: 'pat-007',
    patentNo: 'CN116782390B',
    title: '高强塑韧耐热稀土镁合金车身大型一体化压铸成形工艺及熔炼保护技术',
    college: '',
    inventor: '张志清',
    team: '轻合金精密铸造成形与新材料团队',
    field: 'materials',
    fieldName: '轻量化结构新材料',
    ipc: 'C22C 23/00, B22D 17/00',
    applicationDate: '2023-06-25',
    grantDate: '2024-03-18',
    status: 'valid',
    trlLevel: 7,
    trlDescription: 'TRL 7级 - 已完成汽车减震塔及后地板一体化压铸样件试制与台架疲劳试验',
    baitengScore: {
      overall: 92,
      technical: 94,
      legal: 90,
      market: 93,
      barrier: 91
    },
    valuationRange: '360万 - 480万元',
    openLicensePrice: '55万元/年',
    transferModes: ['transfer', 'exclusive_license', 'general_license'],
    abstract: '本发明针对汽车轻量化车身大型一体化压铸零件对高流动性、高抗热裂性及高断裂延伸率的苛刻要求，开发了一种含微量Nd/Y稀土微合金化高压铸造镁合金，抗拉强度≥310MPa，屈服强度≥200MPa，延伸率≥10%，车身减重达38%以上。',
    innovations: [
      '新型无毒无氟环保型熔炼气体保护配方',
      '超薄壁多型腔模具流道与局部挤压补缩自适应温控技术',
      '相较传统铝合金铸件减重30%以上，抗冲击吸能性能提升45%'
    ],
    applicableIndustries: ['新能源汽车轻量化零部件', '航空航天结构件', '3C电子高散热中框'],
    viewCount: 1540,
    matchCount: 16,
    documents: [
      { title: '稀土镁合金力学性能测试报告.pdf', size: '3.8 MB', type: 'PDF' }
    ]
  },
  {
    id: 'pat-008',
    patentNo: 'CN116490218B',
    title: '基于多模态大模型协同的小样本工业表面精密微瑕疵视觉智能检测系统',
    college: '',
    inventor: '杨博',
    team: '知识工程与工业智能计算团队',
    field: 'ai_computing',
    fieldName: '人工智能与大数据',
    ipc: 'G06T 7/00, G06V 10/774',
    applicationDate: '2023-10-12',
    grantDate: '2024-05-10',
    status: 'open_licensed',
    trlLevel: 8,
    trlDescription: 'TRL 8级 - 算法系统已部署于多家汽车冲压件与锂电极片自动化质检产线',
    baitengScore: {
      overall: 90,
      technical: 93,
      legal: 88,
      market: 91,
      barrier: 89
    },
    valuationRange: '260万 - 360万元',
    openLicensePrice: '38万元/年',
    transferModes: ['general_license', 'open_license', 'equity'],
    abstract: '本发明公开了一种面向工业微弱缺陷（如0.01mm微划痕、针孔、异物）的视觉检测系统，基于吉大自研小样本多模态自监督大模型，仅需3~5张缺陷样本即可实现99.8%检出率，推理时延≤12ms，支持边缘算力芯片实时部署。',
    innovations: [
      '零样本与小样本微瑕疵自适应提示词工程算法',
      '强反光金属表面与曲面透镜微弱特征自适应增强网络',
      '边缘端轻量化部署，无需昂贵GPU集群'
    ],
    applicableIndustries: ['汽车零部件智能制造', '半导体晶圆与封装外观检测', '锂电与光伏产线质检'],
    viewCount: 2190,
    matchCount: 27,
    documents: [
      { title: '工业质检大模型算法白皮书.pdf', size: '4.6 MB', type: 'PDF' }
    ]
  },
  {
    id: 'pat-009',
    patentNo: 'CN116884910B',
    title: '空地一体化高精度航空低温超导全张量磁力梯度仪与地下隐伏构造反演系统',
    college: '',
    inventor: '林君',
    team: '地球深部探测仪器与地球物理反演科研团队',
    field: 'geology',
    fieldName: '地球探测与精密仪器',
    ipc: 'G01V 3/16, G01R 33/035',
    applicationDate: '2022-07-28',
    grantDate: '2023-10-20',
    status: 'valid',
    trlLevel: 7,
    trlDescription: 'TRL 7级 - 已搭载运-12航空物探平台在东北及华北重点矿区完成万平方公里飞行实测',
    baitengScore: {
      overall: 97,
      technical: 99,
      legal: 95,
      market: 95,
      barrier: 98
    },
    valuationRange: '680万 - 920万元',
    openLicensePrice: '90万元/年',
    transferModes: ['exclusive_license', 'transfer', 'equity'],
    abstract: '本发明实现了高动态飞行环境下超导量子干涉器件(SQUID)微弱磁梯度信号的高灵敏提取，噪声基底低于10fT/m/√Hz，结合三维高阶重磁联合非线性反演算法，实现地下3000米深度内隐伏矿体与深部地质断裂带的厘米级精准圈定。',
    innovations: [
      '自主研发低磁惯性动平衡悬挂与自适应机载振动噪声对消阵列',
      '深地3D重磁多源数据智能融合成像与三维地质建模软件著作集成',
      '填补我国高精度航空全张量物探装备核心技术空白'
    ],
    applicableIndustries: ['战略性矿产资源勘查', '地热与深层油气调查', '重大地质工程防灾减灾'],
    viewCount: 2850,
    matchCount: 19,
    documents: [
      { title: '航空物探试飞实测对比报告.pdf', size: '12.4 MB', type: 'PDF' }
    ]
  },
  {
    id: 'pat-010',
    patentNo: 'CN116542389B',
    title: '六自由度脊柱与骨科微创手术辅助穿刺机器人末端柔顺力控装置与导航系统',
    college: '',
    inventor: '赵宏伟',
    team: '智能微纳传感与特种机器人工程团队',
    field: 'equipment',
    fieldName: '高端装备与特种机器人',
    ipc: 'A61B 34/30, A61B 34/20',
    applicationDate: '2023-05-08',
    grantDate: '2024-01-25',
    status: 'in_negotiation',
    trlLevel: 6,
    trlDescription: 'TRL 6级 - 穿刺机器人系统已在吉大一院骨科完成活体动物穿刺精度验证',
    baitengScore: {
      overall: 93,
      technical: 95,
      legal: 91,
      market: 94,
      barrier: 93
    },
    valuationRange: '420万 - 580万元',
    openLicensePrice: '65万元/年',
    transferModes: ['transfer', 'exclusive_license', 'equity'],
    abstract: '本发明针对骨科精准穿刺手术中组织变形、穿刺力突变及骨皮质打滑难题，设计了具有亚毫米级主从映射与多轴力/力矩柔顺自适应反馈的微创机械臂末端，光学与电磁双模空间追踪精度达0.2mm以内。',
    innovations: [
      '基于组织生物力学阻抗的主动安全力控阻尼边界保护',
      '术中CT/C臂影像与患者呼吸体动实时动态配准补偿',
      '整机紧凑轻量化，适于标准百级层流手术室快速布设'
    ],
    applicableIndustries: ['医疗机器人研发制造', '骨科及神经外科精准医疗器械', '高端手术导航系统'],
    viewCount: 1780,
    matchCount: 20,
    documents: [
      { title: '吉大一院骨科手术机器人试验记录.pdf', size: '6.4 MB', type: 'PDF' }
    ]
  },
  {
    id: 'pat-011',
    patentNo: 'CN116320489B',
    title: '基于重组人白蛋白与特异性多肽偶联的靶向纳米递送系统及制备方法',
    college: '',
    inventor: '滕乐生',
    team: '现代分子生物技术与生物制药团队',
    field: 'biomedicine',
    fieldName: '生物医药与分子生物学',
    ipc: 'A61K 47/64, C07K 14/765',
    applicationDate: '2022-10-18',
    grantDate: '2023-08-30',
    status: 'valid',
    trlLevel: 6,
    trlDescription: 'TRL 6级 - 已完成高表达酵母工程菌中试发酵与药效学动物评价',
    baitengScore: {
      overall: 88,
      technical: 90,
      legal: 87,
      market: 91,
      barrier: 85
    },
    valuationRange: '280万 - 400万元',
    openLicensePrice: '40万元/年',
    transferModes: ['exclusive_license', 'general_license', 'transfer'],
    abstract: '本发明通过基因工程毕赤酵母高密度发酵制备高纯度非血浆来源重组人血清白蛋白(rHSA)，并利用高特异性化学偶联位点结合抗肿瘤靶向多肽，避免血源性病原体污染风险，提高难溶性靶向小分子药物载药量达4.5倍。',
    innovations: [
      '重组人白蛋白纯度≥99.5%，内毒素极低(<0.05EU/mg)',
      '发酵产量突破12g/L，大幅降低规模化原料成本',
      '显著降低小分子化疗药物的全身系统毒副作用'
    ],
    applicableIndustries: ['生物创新药与靶向制剂', '血液制品替代品研发', '细胞培养高纯添加剂'],
    viewCount: 1450,
    matchCount: 14,
    documents: [
      { title: '重组白蛋白发酵纯化技术指标.pdf', size: '5.1 MB', type: 'PDF' }
    ]
  },
  {
    id: 'pat-012',
    patentNo: 'CN116459812B',
    title: '耐500℃高温超强韧聚芳醚酮(PEEK)热塑性复合材料预浸料及其连续拉挤成型技术',
    college: '',
    inventor: '张海博',
    team: '特种工程塑料与高性能聚合物团队',
    field: 'materials',
    fieldName: '高分子与特种工程塑料',
    ipc: 'C08G 65/40, B29C 70/52',
    applicationDate: '2023-04-20',
    grantDate: '2024-02-05',
    status: 'transferred',
    trlLevel: 9,
    trlDescription: 'TRL 9级 - 已在航空发动机机匣导流叶片与深海特种电缆护套实现工业化量产应用',
    baitengScore: {
      overall: 95,
      technical: 96,
      legal: 93,
      market: 97,
      barrier: 95
    },
    valuationRange: '480万 - 650万元',
    openLicensePrice: '70万元/年',
    transferModes: ['transfer', 'exclusive_license', 'equity'],
    abstract: '本发明针对航空航天与深海工程对极端环境下特种耐热结构件材料的迫切需求，攻克了高结晶度自交联改性聚芳醚酮单体合成与连续碳纤维无溶剂粉末熔融浸渍工艺，玻璃化转变温度高达230℃，长期耐温超过300℃，抗拉伸强度突破1850MPa。',
    innovations: [
      '完全打破国外Solvay、Victrex在高端航空级PEEK预浸料领域的技术封锁',
      '熔体粘度降低30%，预浸浸润饱满度>98.5%，层间剪切强度提升40%',
      '生产周期较热固性复合材料缩短80%，支持废料热熔循环再利用'
    ],
    applicableIndustries: ['航空航天飞行器结构件', '深海油气开采特种装备', '轨道交通高端减重部件'],
    viewCount: 3410,
    matchCount: 38,
    documents: [
      { title: '吉大特种工程塑料中试试制报告.pdf', size: '7.8 MB', type: 'PDF' }
    ]
  }
];

export const INITIAL_ENTERPRISES: EnterpriseDemand[] = [
  {
    id: 'ent-001',
    companyName: '中国第一汽车集团有限公司 (FAW R&D Center)',
    logoColor: 'from-blue-600 to-indigo-700',
    industry: '新能源与智能网联汽车',
    region: '吉林长春 / 国家级长春汽车经济技术开发区',
    scale: '央企 / 500强 / 产值千亿级',
    businessSummary: '红旗豪华乘用车、解放中重型商用车全产业链研发制造与自动驾驶底盘软硬件开发',
    demandTitle: '商用车线控底盘线控制动(EMB/EHB)核心控制算法及能量回收系统研发',
    demandDescription: '为满足红旗与解放新一代智能重卡高等级自动驾驶要求，急需寻找高响应速度、具备极寒环境防滑解耦控制的线控电液复合制动系统，要求具备完整的算法模型、台架测试及实车验证数据。',
    techKeywords: ['线控制动', '能量回收', '高寒工况控制', '商用车底盘', '功能安全ASIL-D'],
    budget: '500万 - 800万元',
    cooperationMode: 'license',
    urgency: 'high',
    publishDate: '2026-06-15',
    status: 'matching',
    matchedPatentIds: ['pat-001'],
    contactPerson: '张总监',
    contactTitle: '一汽研发总院底盘所主任工程师'
  },
  {
    id: 'ent-002',
    companyName: '吉林奥来德光电材料股份有限公司',
    logoColor: 'from-cyan-600 to-blue-700',
    industry: '电子化学品与新型显示',
    region: '吉林长春 / 高新技术产业开发区 (科创板上市企业)',
    scale: '上市公司 / 员工1500+ / 行业龙头',
    businessSummary: 'OLED有机发光材料、蒸发源设备及蒸镀前沿耗材研发生产',
    demandTitle: '高寿命、高纯度TADF及超荧光蓝光发光材料产线导入与专利许可',
    demandDescription: '为打破海外专利对高端OLED蓝光材料的垄断，企业正在扩建年产10吨级升华纯化产线，诚征具有自主知识产权的高纯度TADF或多重共振蓝光材料，要求CIE y < 0.14，升华良率高。',
    techKeywords: ['OLED发光材料', 'TADF', '蓝光材料', '升华纯化', '面板蒸镀'],
    budget: '600万 - 1000万元',
    cooperationMode: 'joint_lab',
    urgency: 'high',
    publishDate: '2026-07-02',
    status: 'open',
    matchedPatentIds: ['pat-002'],
    contactPerson: '刘院长',
    contactTitle: '奥来德中央研究院副院长'
  },
  {
    id: 'ent-003',
    companyName: '中国科学院长春光机所协同创新平台 / 长光集团',
    logoColor: 'from-amber-600 to-orange-700',
    industry: '精密光学与半导体装备',
    region: '吉林长春 / 长光卫星与精密仪器产业园',
    scale: '国家级科研产业集团 / 专精特新重点高地',
    businessSummary: '高分辨率遥感相机、半导体超精密检测设备、激光微纳制造装备',
    demandTitle: '宽禁带半导体(SiC/GaN)及微纳光栅结构超快皮秒激光精密加工工艺',
    demandDescription: '针对第三代半导体晶圆划切容易产生崩边与微裂纹问题，急需引进超快激光脉冲空间光整形与微纳加工成套工艺包，实现无热影响的高速精密剥蚀。',
    techKeywords: ['超快激光', '皮秒微纳加工', '碳化硅切割', '空间光调制', '光栅'],
    budget: '300万 - 500万元',
    cooperationMode: 'transfer',
    urgency: 'medium',
    publishDate: '2026-07-20',
    status: 'open',
    matchedPatentIds: ['pat-003'],
    contactPerson: '陈研究员',
    contactTitle: '激光先进制造事业部部长'
  },
  {
    id: 'ent-004',
    companyName: '长春高新技术产业(集团)股份有限公司 / 金赛药业',
    logoColor: 'from-emerald-600 to-teal-700',
    industry: '生物医药与现代大健康',
    region: '吉林长春 / 长春新区生物医药产业园',
    scale: '百亿级上市药企 / 国家创新型企业',
    businessSummary: '基因工程生物药物、儿科与妇女健康药物、中药现代化创新制剂研发',
    demandTitle: '长白山道地人参稀有单体皂苷定向生物酶转化与高吸收制剂技术合作',
    demandDescription: '推进吉林省人参产业高质量发展战略，计划开发靶向抗肿瘤或免疫调节的1类中药新药，急需转化高效生物转化酶催化及纳米载药制剂专利成果。',
    techKeywords: ['人参皂苷Rg3', '定向酶转化', '纳米脂质体', '中药创新药', '靶向给药'],
    budget: '400万 - 600万元',
    cooperationMode: 'custom_dev',
    urgency: 'high',
    publishDate: '2026-08-01',
    status: 'matching',
    matchedPatentIds: ['pat-004'],
    contactPerson: '王博士',
    contactTitle: '天然药物研发中心项目负责人'
  },
  {
    id: 'ent-005',
    companyName: '中国一拖集团 / 吉峰农机装备股份有限公司',
    logoColor: 'from-green-600 to-emerald-800',
    industry: '现代智能农机装备',
    region: '东北区域农机制造与服务基地',
    scale: '国内农机龙头企业',
    businessSummary: '重型轮式拖拉机、智能免耕播种机、玉米/大豆联合收割机',
    demandTitle: '适应东北黑土地全量秸秆覆盖下的智能仿生少耕免耕精密播种机成套技术',
    demandDescription: '响应国家黑土地保护性耕作行动计划，解决秸秆还田后播种易堵塞、出苗不均难题，寻求具备实际大田应用验证的高成熟度免耕播种专利群实施许可。',
    techKeywords: ['黑土地保护', '免耕播种机', '秸秆防堵', '仿生减阻', '精密镇压'],
    budget: '200万 - 350万元',
    cooperationMode: 'license',
    urgency: 'medium',
    publishDate: '2026-06-28',
    status: 'open',
    matchedPatentIds: ['pat-005'],
    contactPerson: '赵总工',
    contactTitle: '现代农业装备技术总监'
  }
];

export const JLU_DISCIPLINES_STATS = [
  { name: '汽车与智能运载', count: 1842, rate: '28.4%', activeAmount: '1.42 亿元', leader: '汽车工程学院 / 机械与航空航天学院' },
  { name: '化学与先进材料', count: 2650, rate: '34.2%', activeAmount: '2.18 亿元', leader: '化学学院 / 材料科学与工程学院' },
  { name: '电子信息与智能仪器', count: 1430, rate: '22.8%', activeAmount: '9,800 万元', leader: '电子科学与工程学院 / 仪器科学与电气工程学院' },
  { name: '白求恩医学与生物医药', count: 1210, rate: '26.5%', activeAmount: '1.15 亿元', leader: '白求恩医学部 / 药学院 / 生命科学学院' },
  { name: '现代农业与仿生装备', count: 980, rate: '31.6%', activeAmount: '7,400 万元', leader: '生物与农业工程学院 / 植物科学学院' },
  { name: '地球勘探与特种装备', count: 820, rate: '19.4%', activeAmount: '6,200 万元', leader: '建设工程学院 / 地球科学学院' }
];

export const BAITENG_VALUATION_METRICS = [
  { key: 'tech', label: '技术先进性 (TRL/前瞻度/独创性)', weight: '35%' },
  { key: 'legal', label: '法律稳定性 (权利范围/同族/维权壁垒)', weight: '25%' },
  { key: 'market', label: '市场前景 (产业链替代/规模/毛利率)', weight: '25%' },
  { key: 'barrier', label: '竞争壁垒与规避难度', weight: '15%' }
];
