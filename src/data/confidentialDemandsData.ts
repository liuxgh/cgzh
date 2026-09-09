import { ConfidentialEnterpriseDemand } from '../types';
import { INITIAL_PATENTS } from './mockData';

export const INITIAL_CONFIDENTIAL_DEMANDS: ConfidentialEnterpriseDemand[] = [
  {
    id: 'cd-001',
    companyName: '长春富维东阳智能车身系统有限公司',
    creditCode: '91220101MA14B7XXXX',
    industry: '新能源与智能网联汽车',
    region: '吉林省长春市',
    enterpriseScale: '国家级专精特新“小巨人” / 规上工业企业',
    isAlumniEnterprise: true,
    alumniInfo: {
      isAlumniEnterprise: true,
      alumniName: '刘志远',
      alumniPosition: '副总经理兼研发总监',
      graduatedCollege: '汽车工程学院',
      graduationYear: '2008届',
      alumniAssociation: '吉林大学长春校友会 · 汽车行业分会',
      studentIdOrDegree: '车辆工程专业硕士',
      verified: true
    },
    confidentialLevel: 'top_secret',
    demandCategory: 'bottleneck_tech',
    demandTitle: '智能空气悬架电磁比例减振阀-45℃极限高寒防卡滞控制算法与流固耦合仿真',
    currentBottleneck: '在严寒地区商用车实车路试中，比例电磁阀液压油黏度剧增导致阀芯换向延迟由10ms劣化至65ms，出现过弯侧倾补偿不及时及微卡滞现象，严重影响主机厂低温定型验收。',
    targetSpecs: '在-45℃~+85℃全温域内实现阻尼响应时延 ≤ 15ms，高寒耐久测试连续工作10万次无卡滞，具备AUTOSAR车规级软硬件在线标定能力。',
    budget: '300万 - 500万元',
    expectedTimeline: '6 - 9 个月',
    cooperationMode: 'joint_development',
    ndaAgreed: true,
    contactName: '刘志远 (校友)',
    contactPhone: '13844186821',
    contactEmail: 'liu.zy@fuwei-tech.com',
    createdAt: '2026-09-05 09:30',
    status: 'feedback_provided',
    priority: 'lightning_alumni',
    responseDeadlineHours: 24,
    aiTags: ['智能底盘', '高寒电液控制', '流固耦合', '车规级算法'],
    aiSummary: {
      coreChallenge: '商用车在-45℃高寒低温下电磁阀油液黏温非线性剧增，导致响应延迟由10ms劣化至65ms卡滞。',
      targetMetric: '全温域响应时延 ≤ 15ms，10万次耐久无卡滞，符合AUTOSAR标定。',
      recommendedField: '汽车工程学院 / 汽车仿真与控制国家重点实验室',
      commercialValue: '直供一汽商用车主力车型，预计可带动数千万元底盘电控系统装车订单。'
    },
    aiMatchedPatents: [
      INITIAL_PATENTS[0], // pat-001 (线控电液复合制动系统)
      INITIAL_PATENTS[6], // pat-007 (高强稀土镁合金一体化压铸)
      INITIAL_PATENTS[7], // pat-008 (小样本工业表面微瑕疵视觉智能检测)
      INITIAL_PATENTS[9], // pat-010 (六自由度穿刺力控装置)
      INITIAL_PATENTS[2]  // pat-003 (超快激光微纳传感芯片)
    ],
    universityFeedback: {
      id: 'fb-001',
      feedbackTime: '2026-09-05 14:15 (仅用时4.75小时极速反馈)',
      officerName: '张建军 教授 / 科技开发中心产业协同部主任',
      assignedCollege: '汽车工程学院 / 汽车仿真与控制国家重点实验室',
      assignedLab: '底盘电控与主动安全协同控制实验室',
      matchedExperts: [
        {
          name: '高镇海',
          title: '教授 / 博士生导师 / 院长',
          field: '智能底盘动力学控制、主动悬架与极限工况稳定性',
          college: '汽车工程学院'
        },
        {
          name: '刘明',
          title: '副教授 / 重点实验室副主任',
          field: '高寒电液控制系统、黏温非线性补偿算法',
          college: '机械与航空航天工程学院'
        }
      ],
      feasibilityAssessment: '【可行性极高】吉林大学汽车仿真与控制国家重点实验室拥有国内顶尖的高寒底盘台架与电液混合仿真系统。高镇海教授团队已攻克非线性黏温动态补偿算法，并拥有一汽解放重卡黑河冬试验证先例，与贵司的技术痛点契合度达96.8%。',
      proposedSolution: '① 采用吉大自主研发的“黏温特性动态观测器+前馈补偿”控制模型；② 共享实验室-50℃全温域电磁比例阀综合流道测试台开展硬件在环(HIL)联合标定；③ 派驻2名博士生入驻企业技术中心，联合进行一汽定型样件实车调校。',
      estimatedTimeline: '首批修正固件与算法可在45天内交付台架测试；全套联合攻关成果6个月内达到量产交付标准。',
      recommendedPatents: [
        { patentNo: 'CN202410589123.X', title: '一种基于全温域黏温自适应补偿的商用车主动悬架电控系统及标定方法' },
        { patentNo: 'CN202310892341.2', title: '高寒工况下电磁比例阀瞬态阻尼精密控制装置与自学习滤波算法' }
      ],
      nextStepAction: '科技开发中心已启动校友绿色直通通道，定于本周四下午 14:30 在吉林大学南岭校区汽车大楼312会议室（或腾讯会议密闭专线）召开双方点对点闭门技术对接会。',
      contactOfficer: {
        name: '李雅静 (吉大技术转移专员 / 校友服务主管)',
        phone: '0431-85168892 / 13944189920',
        email: 'ttc_alumni@jlu.edu.cn',
        office: '吉林大学中心校区鼎新楼 A521 室'
      }
    }
  },
  {
    id: 'cd-002',
    companyName: '深圳极目智视工业视觉系统有限公司',
    creditCode: '91440300MA5EXXXX',
    industry: '人工智能与机器视觉',
    region: '广东省深圳市南山区',
    enterpriseScale: '国家级高新技术企业 / 瞪羚企业',
    isAlumniEnterprise: true,
    alumniInfo: {
      isAlumniEnterprise: true,
      alumniName: '陈晨',
      alumniPosition: '创始人兼CTO',
      graduatedCollege: '计算机科学与技术学院',
      graduationYear: '2012届',
      alumniAssociation: '吉林大学深圳校友会 · 创新创业分会',
      studentIdOrDegree: '计算机应用技术博士',
      verified: true
    },
    confidentialLevel: 'top_secret',
    demandCategory: 'bottleneck_tech',
    demandTitle: '复杂反光曲面金属结构件亚微米级微细划痕多模态实时缺陷检出算法与模型轻量化',
    currentBottleneck: '在消费电子精密结构件高速冲压线上，高反光曲面导致传统深度学习模型误报率高达18.4%，且单帧推理耗时超过85ms，无法满足产线节拍（<30ms）要求。',
    targetSpecs: '检出率 ≥ 99.7%，误报率 ≤ 0.8%，在嵌入式边缘计算平台(算力<32TOPS)上端到端推理时延 ≤ 25ms，支持小样本缺陷自监督泛化微调。',
    budget: '200万 - 350万元',
    expectedTimeline: '3 - 6 个月',
    cooperationMode: 'patent_license',
    ndaAgreed: true,
    contactName: '陈晨 (校友)',
    contactPhone: '18675518290',
    contactEmail: 'chen.c@jimu-vision.cn',
    createdAt: '2026-09-06 14:20',
    status: 'feedback_provided',
    priority: 'lightning_alumni',
    responseDeadlineHours: 24,
    aiTags: ['机器视觉', '边缘计算模型轻量化', '小样本缺陷检测', '工业质检'],
    aiSummary: {
      coreChallenge: '强反光曲面金属件小样本缺陷检出受光照干扰大，现有模型推理延时85ms过长且误报率达18.4%。',
      targetMetric: '检出率 ≥ 99.7%，误报率 ≤ 0.8%，边缘端推理时延 ≤ 25ms。',
      recommendedField: '计算机科学与技术学院 / 符号计算与知识工程教育部重点实验室',
      commercialValue: '赋能富士康与比亚迪高端消费电子结构件生产线，单条产线年化节约质检人力成本超百万元。'
    },
    aiMatchedPatents: [
      INITIAL_PATENTS[7], // pat-008 (小样本工业表面微瑕疵视觉智能检测)
      INITIAL_PATENTS[2], // pat-003 (超快激光微纳传感芯片)
      INITIAL_PATENTS[0], // pat-001 (线控电液复合制动系统)
      INITIAL_PATENTS[3], // pat-004 (高精度经颅磁刺激柔性线圈)
      INITIAL_PATENTS[9]  // pat-010 (六自由度穿刺力控装置)
    ],
    universityFeedback: {
      id: 'fb-002',
      feedbackTime: '2026-09-06 18:40 (仅用时4.3小时极速反馈)',
      officerName: '常毅 教授 / 计算机科学与技术学院院长',
      assignedCollege: '计算机科学与技术学院 / 软件学院',
      assignedLab: '符号计算与知识工程教育部重点实验室',
      matchedExperts: [
        {
          name: '常毅',
          title: '讲席教授 / 博士生导师 / ACM/IEEE Fellow',
          field: '多模态智能信息处理、大模型高效推理与知识图谱',
          college: '计算机科学与技术学院'
        },
        {
          name: '杨溪',
          title: '副教授 / 青年学术带头人',
          field: '计算摄影学、强反射表面光场重建、轻量化卷积网络架构',
          college: '计算机科学与技术学院'
        }
      ],
      feasibilityAssessment: '【方案完全成熟】重点实验室杨溪团队开发的“偏振光场引导的表面缺陷自适应分离神经网络”已在汽车冲压件上实现18ms极速推理，对高反光材质具有先天的物理光照解耦优势，完全匹配校友企业需求。',
      proposedSolution: '① 提供吉大自研的高反光曲面微缺陷检测开源轻量化引擎专利授权；② 联合开发针对NPU平台的INT8深度量化与通道剪枝工具包；③ 安排研究生团队赴深圳现场采集校友企业产线特定数据集进行模型微调。',
      estimatedTimeline: '20天内交付测试版轻量化模型；60天内完成边缘计算硬件平台集成实测。',
      recommendedPatents: [
        { patentNo: 'CN202410332190.5', title: '一种基于物理光场偏振反演的高反光曲面工业微瑕疵实时检测方法' },
        { patentNo: 'CN202310912445.1', title: '轻量化异构边缘计算芯片上多尺度缺陷检测算子融合加速结构' }
      ],
      nextStepAction: '常毅院长已批示计算机学院技术转移中心为校友企业开设保密专用代码库，定于本周五通过吉林大学智能大模型科研平台向校友企业开放试用接口。',
      contactOfficer: {
        name: '张薇 (计算机学院产学研办公室主任)',
        phone: '0431-85168011 / 13804305591',
        email: 'cs_transfer@jlu.edu.cn',
        office: '吉林大学中心校区计算机大楼 B402 室'
      }
    }
  },
  {
    id: 'cd-003',
    companyName: '江苏恒瑞医药生物技术创新中心',
    creditCode: '913207007040XXXX',
    industry: '生物医药与大健康',
    region: '江苏省连云港市 / 上海研发中心',
    enterpriseScale: '中国医药工业百强龙头企业 / A股上市企业',
    isAlumniEnterprise: false,
    confidentialLevel: 'top_secret',
    demandCategory: 'new_product_rd',
    demandTitle: '靶向EGFR/HER2双抗药物分子偶联物(ADC)新型自降解Linker载荷合成及高纯化工艺',
    currentBottleneck: '在研ADC药物在血液循环中微量水解提前释放毒素，导致临床前灵长类动物实验中出现非靶向肝毒性；现有连接子合成收率低于15%，纯化成本极高。',
    targetSpecs: '体外血浆稳定性 > 120小时，血浆裂解率 < 1.5%；靶细胞溶酶体酶解释放半衰期 < 30分钟；高纯化工艺单步收率 ≥ 65%，纯度 ≥ 98.5% (HPLC)。',
    budget: '500万 - 800万元',
    expectedTimeline: '12 - 18 个月',
    cooperationMode: 'joint_development',
    ndaAgreed: true,
    contactName: '王博士 (资深研究员)',
    contactPhone: '13918239012',
    contactEmail: 'wang.yq@hengrui-rd.com',
    createdAt: '2026-09-07 10:15',
    status: 'assigned_expert',
    priority: 'standard',
    responseDeadlineHours: 24,
    aiTags: ['双抗ADC药物', '自降解Linker', '靶向肿瘤治疗', '药物纯化工艺'],
    aiSummary: {
      coreChallenge: 'ADC药物循环半衰期内非靶向脱落导致肝毒性，连接子化学合成收率低（<15%）阻碍产业化放大。',
      targetMetric: '血浆裂解率 < 1.5%，纯度 ≥ 98.5%，单步合成收率 ≥ 65%。',
      recommendedField: '化学学院 / 白求恩医学部药学院',
      commercialValue: '下一代重磅抗肿瘤创新药关键技术，填补高稳定性Linker自主专利空白。'
    },
    aiMatchedPatents: [
      INITIAL_PATENTS[1], // pat-002 (超分子新材料)
      INITIAL_PATENTS[3], // pat-004 (高精度柔性探头)
      INITIAL_PATENTS[9], // pat-010 (穿刺力控装置)
      INITIAL_PATENTS[4], // pat-005 (人参稀有单体皂苷定向生物酶转化)
      INITIAL_PATENTS[2]  // pat-003 (超快激光微纳传感芯片)
    ]
  },
  {
    id: 'cd-004',
    companyName: '江苏亨通光电股份有限公司',
    creditCode: '913205001377XXXX',
    industry: '电子信息与光电通信',
    region: '江苏省苏州市吴江区',
    enterpriseScale: '全球光纤通信前三强 / 上市企业',
    isAlumniEnterprise: true,
    alumniInfo: {
      isAlumniEnterprise: true,
      alumniName: '钱振华',
      alumniPosition: '总工程师',
      graduatedCollege: '化学学院',
      graduationYear: '2005届',
      alumniAssociation: '吉林大学江苏校友会 · 光电与新材料分会',
      studentIdOrDegree: '高分子化学与物理专业硕士',
      verified: true
    },
    confidentialLevel: 'top_secret',
    demandCategory: 'material_substitution',
    demandTitle: '超低衰减超大容量G.654.E海底光纤用高纯合成石英预制棒等离子体化学沉积关键辅料国产化替代',
    currentBottleneck: '核心沉积原材料特种四氯化硅及含氟掺杂剂完全依赖进口，国外供应商近期提价40%且交付周期拉长至10个月，严重制约跨洋海底光缆重大工程交付。',
    targetSpecs: '纯度达到 99.9999% (6N级)，金属杂质总量 ≤ 1ppb，羟基含量 ≤ 0.05ppm，沉积效率提升15%，通过千公里光纤拉丝衰减验证(≤0.150 dB/km)。',
    budget: '600万 - 1000万元',
    expectedTimeline: '12 - 15 个月',
    cooperationMode: 'equity_investment',
    ndaAgreed: true,
    contactName: '钱振华 (校友)',
    contactPhone: '13771923301',
    contactEmail: 'qian.zh@hengtongoptics.com',
    createdAt: '2026-09-07 16:45',
    status: 'feedback_provided',
    priority: 'lightning_alumni',
    responseDeadlineHours: 24,
    aiTags: ['超高纯石英', 'G.654.E海缆光纤', '国产化替代', '等离子体沉积'],
    aiSummary: {
      coreChallenge: 'G.654.E跨洋海缆光纤预制棒超纯化学辅料受制于海外进口，交期与成本受限。',
      targetMetric: '纯度达6N(99.9999%)，金属杂质 ≤ 1ppb，光纤衰减 ≤ 0.150 dB/km。',
      recommendedField: '化学学院 / 无机合成与制备化学国家重点实验室',
      commercialValue: '支撑国家“东数西算”与跨洋海缆新基建战略，打破海外关键原材料垄断。'
    },
    aiMatchedPatents: [
      INITIAL_PATENTS[1], // pat-002 (有机光电功能材料)
      INITIAL_PATENTS[6], // pat-007 (高强稀土镁合金一体化压铸)
      INITIAL_PATENTS[2], // pat-003 (超快激光微纳传感芯片)
      INITIAL_PATENTS[8], // pat-009 (航空低温超导磁力梯度仪)
      INITIAL_PATENTS[5]  // pat-006 (复杂地层深部科学钻探)
    ],
    universityFeedback: {
      id: 'fb-004',
      feedbackTime: '2026-09-07 20:10 (仅用时3.4小时极速反馈)',
      officerName: '马宏伟 教授 / 化学学院产学研对接主管',
      assignedCollege: '化学学院 / 无机合成与制备化学国家重点实验室',
      assignedLab: '超纯功能材料与特种无机精馏实验室',
      matchedExperts: [
        {
          name: '于吉红',
          title: '中国科学院院士 / 教授',
          field: '分子筛与多孔材料、高纯功能无机合成与分子工程学',
          college: '化学学院'
        },
        {
          name: '贾春江',
          title: '教授 / 博士生导师',
          field: '超高纯气体精馏纯化、特种无机氟化物定向合成与杂质吸附',
          college: '化学学院'
        }
      ],
      feasibilityAssessment: '【国家队实力支撑】吉大化学学院拥有国家重点实验室超纯精馏与低温吸附纯化成套装备，在6N级高纯无机卤化物与氟化物纯化上已具备百公斤级中试验证基础，完全可对标进口产品指标。',
      proposedSolution: '① 采用吉大独创的多级深冷精馏结合分子筛选择性络合吸附提纯工艺；② 提供全套中试级制备工艺包与ICP-MS痕量杂质检测方法；③ 协助亨通光电在苏州建立万级净化中试生产线。',
      estimatedTimeline: '8个月提供首批符合6N标准的测试样品；14个月完成整条产线放大建设。',
      recommendedPatents: [
        { patentNo: 'CN202311209841.0', title: '一种电子级超高纯特种氟化物气相纯化方法及吸附提纯一体化装置' }
      ],
      nextStepAction: '科技开发中心已指派专人与江苏省产学研合作办协同对接，拟于9月12日与亨通技术委员会举行线上点对点技术交底会。',
      contactOfficer: {
        name: '马宏伟 (新材料技术转移总监)',
        phone: '0431-85168891 / 13604316672',
        email: 'hw_ma@jlu.edu.cn',
        office: '吉林大学中心校区鼎新楼 A518 室'
      }
    }
  },
  {
    id: 'cd-005',
    companyName: '成都天奥电子股份有限公司',
    creditCode: '915101007622XXXX',
    industry: '精密仪器与航空航天装备',
    region: '四川省成都市高新区',
    enterpriseScale: '军工央企控股上市公司 / 重点高企',
    isAlumniEnterprise: false,
    confidentialLevel: 'top_secret',
    demandCategory: 'bottleneck_tech',
    demandTitle: '高精度芯片级原子钟用微型化气室飞秒激光微加工与无应力真空阳极键合技术',
    currentBottleneck: '微型原子钟物理系统封装后在车载剧烈振动与宽温交变环境下，微气室玻璃与硅片界面发生微米级热应力蠕变，导致频率温度稳定度指标劣化（漂移达E-11量级），良品率低于60%。',
    targetSpecs: '微气室尺寸 ≤ 3mm×3mm×2mm，真空漏率 ≤ 1×10^-12 Pa·m³/s，全温域(-40℃~85℃)频率稳定度优于 5×10^-12/天，芯片级封装批次良品率 ≥ 92%。',
    budget: '400万 - 600万元',
    expectedTimeline: '9 - 12 个月',
    cooperationMode: 'joint_development',
    ndaAgreed: true,
    contactName: '唐工',
    contactPhone: '18080927731',
    contactEmail: 'tang.gl@elec-cd.com',
    createdAt: '2026-09-07 20:30',
    status: 'pending_review',
    priority: 'standard',
    responseDeadlineHours: 48,
    aiTags: ['芯片级原子钟', '真空阳极键合', '微纳制造', '航空航天装备'],
    aiSummary: {
      coreChallenge: '车载宽温与剧烈振动下微气室热应力蠕变造成微型原子钟频率漂移劣化，良品率低于60%。',
      targetMetric: '微气室尺寸 ≤ 3×3×2mm，漏率 ≤ 1×10^-12 Pa·m³/s，批次良品率 ≥ 92%。',
      recommendedField: '仪器科学与电气工程学院 / 电子科学与工程学院',
      commercialValue: '军工/车规导航核心高精度时统芯片，填补国内微纳原子钟量产工艺空白。'
    },
    aiMatchedPatents: [
      INITIAL_PATENTS[2], // pat-003 (超快激光微纳传感芯片)
      INITIAL_PATENTS[8], // pat-009 (航空低温超导全张量磁力梯度仪)
      INITIAL_PATENTS[5], // pat-006 (复杂地层深部科学钻探自适应控制)
      INITIAL_PATENTS[7], // pat-008 (工业智能计算与多模态模型)
      INITIAL_PATENTS[9]  // pat-010 (六自由度穿刺力控装置)
    ]
  },
  {
    id: 'cd-006',
    companyName: '吉林省金冠电气股份有限公司',
    creditCode: '912201017892XXXX',
    industry: '新能源与高端电气装备',
    region: '吉林省长春市九台区',
    enterpriseScale: '深交所创业板上市公司 / 国家高新技术企业',
    isAlumniEnterprise: true,
    alumniInfo: {
      isAlumniEnterprise: true,
      alumniName: '郭春雷',
      alumniPosition: '副总裁兼储能研究院院长',
      graduatedCollege: '电子科学与工程学院',
      graduationYear: '2010届',
      alumniAssociation: '吉林大学长春校友会 · 创新专委会',
      studentIdOrDegree: '微电子学与固体电子学博士',
      verified: true
    },
    confidentialLevel: 'top_secret',
    demandCategory: 'bottleneck_tech',
    demandTitle: '大容量固态锂电池组主动均衡BMS微芯片与热失控早期微弱特征原位声发射感知算法',
    currentBottleneck: '储能电站吉瓦时级电芯成组后，由于电芯微弱内阻差异累计，传统被动均衡导致系统容量损失达12%；热失控初期微小产气声学信号淹没在强电磁噪声中，误报率过高。',
    targetSpecs: '主动均衡电流 ≥ 5A，均衡能量转换效率 ≥ 93%；热失控早期声发射预警提前量 ≥ 15分钟，强背景噪声下误报率 ≤ 0.1%，支持多通道边缘智能诊断。',
    budget: '350万 - 550万元',
    expectedTimeline: '6 - 9 个月',
    cooperationMode: 'joint_development',
    ndaAgreed: true,
    contactName: '郭春雷 (校友)',
    contactPhone: '13504318892',
    contactEmail: 'cl.guo@jinguan-elec.com',
    createdAt: '2026-09-06 11:20',
    status: 'feedback_provided',
    priority: 'lightning_alumni',
    responseDeadlineHours: 24,
    aiTags: ['固态电池BMS', '声发射原位感知', '热失控预警', '数字信号处理'],
    aiSummary: {
      coreChallenge: '大型储能系统电芯成组失衡容量损耗大，早期微弱热失控信号难以在强电磁干扰下高灵敏度提取。',
      targetMetric: '均衡效率 ≥ 93%，热失控提前预警 ≥ 15分钟，误警率 ≤ 0.1%。',
      recommendedField: '电子科学与工程学院 / 集成光电子学国家重点实验室',
      commercialValue: '支撑国家新型储能安全标准，直配千万千瓦级风光大基地储能电站。'
    },
    aiMatchedPatents: [
      INITIAL_PATENTS[2], // pat-003
      INITIAL_PATENTS[0], // pat-001
      INITIAL_PATENTS[7], // pat-008
      INITIAL_PATENTS[8]  // pat-009
    ],
    universityFeedback: {
      id: 'fb-006',
      feedbackTime: '2026-09-06 15:30 (用时4.1小时极速反馈)',
      officerName: '卢革宇 教授 / 电子学院学术委员会主任',
      assignedCollege: '电子科学与工程学院 / 仪器科学与电气工程学院',
      assignedLab: '微纳传感材料与智能感知系统实验室',
      matchedExperts: [
        {
          name: '卢革宇',
          title: '教授 / 博士生导师 / 国家杰青',
          field: '气体传感器、固态电解质微传感器与智能检测系统',
          college: '电子科学与工程学院'
        },
        {
          name: '王树林',
          title: '副教授 / 电力电子教研室主任',
          field: '高频双向拓扑主动均衡、储能数字电源',
          college: '仪器科学与电气工程学院'
        }
      ],
      feasibilityAssessment: '【高度契合】卢革宇教授团队开发的超微弱声光多物理量融合传感器已完成实验室耐受性测试，在50dB工业底噪下仍具备微爆破声频段的清晰辨识能力。',
      proposedSolution: '① 提供吉大抗电磁干扰多通道压电陶瓷微传感探头原型；② 联合构建“声发射+微应力+温度梯度”三模态联合决策算法；③ 协助搭建百千瓦级储能测试平台。',
      estimatedTimeline: '60天内完成台架验证算法固件；180天内交付车载/储能BMS工程样机。',
      recommendedPatents: [
        { patentNo: 'CN202410298102.1', title: '一种基于声发射微分特征的动力电池热失控多级预警装置与滤波算法' }
      ],
      nextStepAction: '校友专线已与金冠电气技术部对接，约定9月11日上午在吉林大学前卫南区电子楼进行样品对标测试。',
      contactOfficer: {
        name: '李雅静 (吉大技术转移专员 / 校友服务主管)',
        phone: '0431-85168892 / 13944189920',
        email: 'ttc_alumni@jlu.edu.cn',
        office: '吉林大学中心校区鼎新楼 A521 室'
      }
    }
  },
  {
    id: 'cd-007',
    companyName: '沈阳新松机器人自动化股份有限公司',
    creditCode: '912101007198XXXX',
    industry: '智能制造与高端装备',
    region: '辽宁省沈阳市浑南区',
    enterpriseScale: '中国机器人产业龙头骨干企业 / 上市公司',
    isAlumniEnterprise: false,
    confidentialLevel: 'top_secret',
    demandCategory: 'bottleneck_tech',
    demandTitle: '重载工业协作机器人关节柔顺力控与力位混合伺服补偿超高动态响应算法',
    currentBottleneck: '重载大臂展协作机器人在高速移动末端受力接触时，由于减速器齿隙和连杆柔性变形，动态接触冲击力超调达35%，导致高精度磨抛工件表面产生过切。',
    targetSpecs: '力控响应周期 ≤ 0.5ms，动态冲击力超调量 ≤ 5%，力位混合定位重复精度 ≤ ±0.015mm，具备柔顺碰撞急停功能(响应时延<3ms)。',
    budget: '450万 - 700万元',
    expectedTimeline: '9 - 12 个月',
    cooperationMode: 'joint_development',
    ndaAgreed: true,
    contactName: '刘总工',
    contactPhone: '13889120485',
    contactEmail: 'liu.yg@siasun-robot.com',
    createdAt: '2026-09-07 14:10',
    status: 'assigned_expert',
    priority: 'standard',
    responseDeadlineHours: 24,
    aiTags: ['协作机器人', '力位混合控制', '柔顺力控', '关节动力学'],
    aiSummary: {
      coreChallenge: '重载机器人末端高速打磨时柔性形变导致接触力超调严重（>35%），工件表面易产生过切。',
      targetMetric: '力控周期 ≤ 0.5ms，力超调 ≤ 5%，力位重复精度 ≤ ±0.015mm。',
      recommendedField: '机械与航空航天工程学院 / 机器人智能制造重点实验室',
      commercialValue: '支撑航空发动机叶片、高铁车体蒙皮智能打磨产线国产化改造。'
    },
    aiMatchedPatents: [
      INITIAL_PATENTS[9], // pat-010 (六自由度穿刺力控装置)
      INITIAL_PATENTS[0], // pat-001
      INITIAL_PATENTS[7], // pat-008
      INITIAL_PATENTS[2]  // pat-003
    ]
  },
  {
    id: 'cd-008',
    companyName: '长春圣博玛生物材料有限公司',
    creditCode: '912201016642XXXX',
    industry: '新材料与生物医药',
    region: '吉林省长春市高新区',
    enterpriseScale: '国家级高新技术企业 / 医用可降解材料独角兽',
    isAlumniEnterprise: true,
    alumniInfo: {
      isAlumniEnterprise: true,
      alumniName: '庄秀丽',
      alumniPosition: '首席科学家兼联合创始人',
      graduatedCollege: '化学学院',
      graduationYear: '2003届',
      alumniAssociation: '吉林大学长春校友会 · 生物医药分会',
      studentIdOrDegree: '高分子化学与物理专业博士',
      verified: true
    },
    confidentialLevel: 'top_secret',
    demandCategory: 'new_product_rd',
    demandTitle: '可降解医用左旋聚乳酸(PLLA)纳米多孔微球形貌精确控制与连续化无菌喷雾干燥中试工艺',
    currentBottleneck: '在医美再生注剂及缓释微球规模化生产中，聚乳酸微球粒径多分散指数(PDI>0.25)偏大，且有机溶剂残留极难去除至国标50ppm以下，制约海外FDA注册进程。',
    targetSpecs: '微球粒径均一控制在 25-45μm (PDI ≤ 0.10)，二氯甲烷等溶剂残留 ≤ 15ppm，连续进料喷雾干燥收率 ≥ 88%，无菌批次重现性达到药典级标准。',
    budget: '400万 - 650万元',
    expectedTimeline: '6 - 9 个月',
    cooperationMode: 'joint_development',
    ndaAgreed: true,
    contactName: '庄秀丽 (校友)',
    contactPhone: '13944098124',
    contactEmail: 'xl.zhuang@sinoboma.com',
    createdAt: '2026-09-06 16:50',
    status: 'feedback_provided',
    priority: 'lightning_alumni',
    responseDeadlineHours: 24,
    aiTags: ['医用聚乳酸', 'PLLA微球', '溶剂残留控制', '生物降解材料'],
    aiSummary: {
      coreChallenge: 'PLLA医用微球粒径分布离散度大且有机残留难降至50ppm以下，制约高端药用制剂与出海认证。',
      targetMetric: '粒径25-45μm，PDI ≤ 0.10，溶剂残留 ≤ 15ppm，收率 ≥ 88%。',
      recommendedField: '化学学院 / 超分子结构与材料国家重点实验室',
      commercialValue: '打造全球医美再生填充与靶向微球龙头，打破海外进口材料高价垄断。'
    },
    aiMatchedPatents: [
      INITIAL_PATENTS[1], // pat-002
      INITIAL_PATENTS[4], // pat-005
      INITIAL_PATENTS[3], // pat-004
      INITIAL_PATENTS[9]  // pat-010
    ],
    universityFeedback: {
      id: 'fb-008',
      feedbackTime: '2026-09-06 20:15 (仅用时3.4小时极速反馈)',
      officerName: '孙俊奇 教授 / 化学学院院长',
      assignedCollege: '化学学院 / 超分子结构与材料国家重点实验室',
      assignedLab: '医用高分子与纳米给药系统研究中心',
      matchedExperts: [
        {
          name: '孙俊奇',
          title: '教授 / 国家杰青 / 院长',
          field: '自组装功能高分子、纳米微球形貌控制与界面自愈合',
          college: '化学学院'
        },
        {
          name: '张皓',
          title: '教授 / 博士生导师',
          field: '高分子胶体化学、流体剪切自组装与超临界流体纯化',
          college: '化学学院'
        }
      ],
      feasibilityAssessment: '【成果成熟度极高】重点实验室开发的“超临界CO2萃取-喷雾微流控耦合纯化技术”可将残留溶剂降至8ppm以下，粒径PDI保持在0.08以内，与校友企业高度契合。',
      proposedSolution: '① 开放吉大超临界流体纯化中试设备开展联合工艺验证；② 交付全套无菌密闭流道连续制备参数模型；③ 共同申报国家生物医用材料重大专项。',
      estimatedTimeline: '45天内交付符合海外标准的微球中试样品；120天内完成中试产线改造。',
      recommendedPatents: [
        { patentNo: 'CN202410118923.4', title: '一种基于超临界微流控的可降解聚酯微球连续化制备与低残留纯化方法' }
      ],
      nextStepAction: '双方已建立校友VIP项目组，9月9日由孙俊奇院长带队赴圣博玛长春基地进行技术对接与签约。',
      contactOfficer: {
        name: '马宏伟 (新材料技术转移总监)',
        phone: '0431-85168891 / 13604316672',
        email: 'hw_ma@jlu.edu.cn',
        office: '吉林大学中心校区鼎新楼 A518 室'
      }
    }
  },
  {
    id: 'cd-009',
    companyName: '长光卫星技术股份有限公司',
    creditCode: '912201013166XXXX',
    industry: '航空航天与商业遥感',
    region: '吉林省长春市北湖科技开发区',
    enterpriseScale: '中国商业遥感卫星第一股 / 国家级专精特新',
    isAlumniEnterprise: true,
    alumniInfo: {
      isAlumniEnterprise: true,
      alumniName: '宣明',
      alumniPosition: '董事长兼总经理',
      graduatedCollege: '机械与航空航天工程学院',
      graduationYear: '1998届',
      alumniAssociation: '吉林大学长春校友会 · 光机电分会',
      studentIdOrDegree: '机械制造及自动化专业博士',
      verified: true
    },
    confidentialLevel: 'top_secret',
    demandCategory: 'bottleneck_tech',
    demandTitle: '超轻量化反应烧结碳化硅(RB-SiC)大口径空间光学反射镜磁流变超精密抛光与低应力装调工艺',
    currentBottleneck: '口径>1.2米的大型碳化硅反射镜在空间高低温剧烈交变（-120℃~+100℃）下，镜面面形精度RMS由原先的λ/50劣化至λ/15，导致高分辨率夜光遥感成像模糊。',
    targetSpecs: '全口径面形精度 RMS ≤ λ/60 (λ=632.8nm)，镜体轻量化率 ≥ 85%，在-100℃~+80℃宽温交变下面形变化量 ≤ λ/40，装调残余应力 ≤ 2MPa。',
    budget: '600万 - 1200万元',
    expectedTimeline: '12 - 18 个月',
    cooperationMode: 'joint_development',
    ndaAgreed: true,
    contactName: '宣总 / 钟博士',
    contactPhone: '13843019932',
    contactEmail: 'zhong.x@jl1.cn',
    createdAt: '2026-09-05 15:40',
    status: 'feedback_provided',
    priority: 'lightning_alumni',
    responseDeadlineHours: 24,
    aiTags: ['空间光学', '碳化硅反射镜', '磁流变抛光', '吉星高照'],
    aiSummary: {
      coreChallenge: '1.2米级大型碳化硅反射镜在轨道宽温下热应力导致面形劣化严重，影响亚米级空间分辨率。',
      targetMetric: '全口径面形精度 RMS ≤ λ/60，轻量化率 ≥ 85%，残余应力 ≤ 2MPa。',
      recommendedField: '机械与航空航天工程学院 / 仪器科学与电气工程学院',
      commercialValue: '提升“吉林一号”星座超高分辨率对地观测能力，占据全球商业遥感制高点。'
    },
    aiMatchedPatents: [
      INITIAL_PATENTS[2], // pat-003
      INITIAL_PATENTS[8], // pat-009
      INITIAL_PATENTS[6], // pat-007
      INITIAL_PATENTS[7]  // pat-008
    ],
    universityFeedback: {
      id: 'fb-009',
      feedbackTime: '2026-09-05 18:20 (仅用时2.7小时极速反馈)',
      officerName: '周晓勤 教授 / 机械与航空航天工程学院院长',
      assignedCollege: '机械与航空航天工程学院 / 仪器科学与电气工程学院',
      assignedLab: '精密与微纳制造工程研究所',
      matchedExperts: [
        {
          name: '周晓勤',
          title: '教授 / 博士生导师 / 国家杰青',
          field: '超精密微纳加工、复杂光学曲面高效抛光与表面质量调控',
          college: '机械与航空航天工程学院'
        },
        {
          name: '刘志峰',
          title: '教授 / 副校长',
          field: '重型高端装备低应力装调、精密机电一体化',
          college: '机械与航空航天工程学院'
        }
      ],
      feasibilityAssessment: '【国家重点团队支撑】吉大机械学院在硬脆材料磁流变抛光与低应力柔性支撑结构设计拥有深厚积累，已为长春光机所多个重大航天载荷提供核心部件加工方案。',
      proposedSolution: '① 采用吉大自主研发的“变粘度磁流变液自适应修形抛光技术”；② 联合设计双层柔性Bipod无应力支撑卸荷机构；③ 依托吉大高低温真空光学测试舱开展实测。',
      estimatedTimeline: '90天完成小口径试验件验证；270天完成1.2米实物反射镜交付。',
      recommendedPatents: [
        { patentNo: 'CN202410882190.8', title: '一种大口径反应烧结碳化硅空间反射镜无应力柔性装配与微调结构' }
      ],
      nextStepAction: '周晓勤院长拟于9月10日下午专程赴长光卫星航天城航天馆开展点对点现场技术沙龙。',
      contactOfficer: {
        name: '李雅静 (吉大技术转移专员 / 校友服务主管)',
        phone: '0431-85168892 / 13944189920',
        email: 'ttc_alumni@jlu.edu.cn',
        office: '吉林大学中心校区鼎新楼 A521 室'
      }
    }
  },
  {
    id: 'cd-010',
    companyName: '中车长春轨道客车股份有限公司',
    creditCode: '912201011239XXXX',
    industry: '轨道交通与先进装备',
    region: '吉林省长春市绿园区',
    enterpriseScale: '轨道交通装备核心央企 / 全球高铁制造主力军',
    isAlumniEnterprise: false,
    confidentialLevel: 'top_secret',
    demandCategory: 'bottleneck_tech',
    demandTitle: '400km/h时速新一代高速列车轻量化高强耐候铝合金深冷搅拌摩擦焊低变形控制工艺',
    currentBottleneck: '超高速高铁大断面薄壁铝合金型材在长达25米长焊缝连续焊接时，由于局部热应力释放不均，车体侧墙出现0.8-1.5mm波浪变形，影响整车气动平整度及高速气密性。',
    targetSpecs: '25米焊接接头全长变形量 ≤ 0.3mm，接头抗拉强度系数 ≥ 85%，-50℃极限高寒冲击韧性 ≥ 35 J/cm²，实现免焊后机械矫形。',
    budget: '500万 - 800万元',
    expectedTimeline: '9 - 15 个月',
    cooperationMode: 'joint_development',
    ndaAgreed: true,
    contactName: '韩主任 (转向架与车体研究院)',
    contactPhone: '13610781290',
    contactEmail: 'han.xj@crrc-cc.com',
    createdAt: '2026-09-07 18:20',
    status: 'pending_review',
    priority: 'standard',
    responseDeadlineHours: 48,
    aiTags: ['高速列车', '搅拌摩擦焊', '铝合金焊接', '低应力低变形'],
    aiSummary: {
      coreChallenge: '400km/h高铁车体25米超长薄壁铝型材焊接热变形超标（达1.5mm），制约整车平整度。',
      targetMetric: '全长变形量 ≤ 0.3mm，高寒韧性 ≥ 35 J/cm²，免机械矫形。',
      recommendedField: '材料科学与工程学院 / 机械与航空航天工程学院',
      commercialValue: '直接应用于CR450新一代高速动车组量产，保障国家重大高铁出海战略。'
    },
    aiMatchedPatents: [
      INITIAL_PATENTS[6], // pat-007
      INITIAL_PATENTS[0], // pat-001
      INITIAL_PATENTS[7], // pat-008
      INITIAL_PATENTS[5]  // pat-006
    ]
  },
  {
    id: 'cd-011',
    companyName: '杭州海康威视数字技术股份有限公司',
    creditCode: '913301007334XXXX',
    industry: '人工智能与智能安防',
    region: '浙江省杭州市滨江区',
    enterpriseScale: '全球安防行业领军企业 / 科技龙头',
    isAlumniEnterprise: true,
    alumniInfo: {
      isAlumniEnterprise: true,
      alumniName: '姜建锋',
      alumniPosition: '前端感知事业部算法总监',
      graduatedCollege: '计算机科学与技术学院',
      graduationYear: '2014届',
      alumniAssociation: '吉林大学浙江校友会 · 数字经济专委会',
      studentIdOrDegree: '计算机应用技术专业硕士',
      verified: true
    },
    confidentialLevel: 'top_secret',
    demandCategory: 'bottleneck_tech',
    demandTitle: '超低照度复杂浓雾环境下可见光-长波红外跨模态图像实时增强与超分辨率重构微芯片算法',
    currentBottleneck: '在港口与高速公路夜间大雾工况下，传统红外热成像缺乏纹理细节，可见光成像信噪比极低，双光融合模型在4K分辨率下端侧帧率仅12fps，无法满足实时侦测需求。',
    targetSpecs: '支持4K@30fps全实时双光融合超分处理，峰值信噪比(PSNR)提升 ≥ 6dB，边缘AI芯片占用算力 ≤ 8TOPS，暗光浓雾下目标识别准确率提升至95%以上。',
    budget: '300万 - 500万元',
    expectedTimeline: '6 - 9 个月',
    cooperationMode: 'patent_license',
    ndaAgreed: true,
    contactName: '姜建锋 (校友)',
    contactPhone: '18858190321',
    contactEmail: 'jiang.jf@hikvision.com',
    createdAt: '2026-09-08 08:10',
    status: 'pending_review',
    priority: 'lightning_alumni',
    responseDeadlineHours: 24,
    aiTags: ['跨模态图像融合', '夜视超分辨率', '边缘计算芯片', '智慧交通'],
    aiSummary: {
      coreChallenge: '夜间浓雾恶劣工况下双光融合模型计算量大（仅12fps），图像信噪比低导致目标漏检。',
      targetMetric: '4K@30fps实时处理，PSNR提升 ≥ 6dB，算力占用 ≤ 8TOPS。',
      recommendedField: '计算机科学与技术学院 / 软件学院',
      commercialValue: '赋能全国智慧高速公路与边防口岸夜间全天候感知系统。'
    },
    aiMatchedPatents: [
      INITIAL_PATENTS[7], // pat-008
      INITIAL_PATENTS[2], // pat-003
      INITIAL_PATENTS[0], // pat-001
      INITIAL_PATENTS[3]  // pat-004
    ]
  },
  {
    id: 'cd-012',
    companyName: '吉林化纤集团有限责任公司',
    creditCode: '912202011244XXXX',
    industry: '新材料与特种纤维',
    region: '吉林省吉林市九站经济开发区',
    enterpriseScale: '全球最大碳纤维原丝生产基地 / 国有大型集团',
    isAlumniEnterprise: true,
    alumniInfo: {
      isAlumniEnterprise: true,
      alumniName: '孙玉峰',
      alumniPosition: '碳纤维研究院副院长兼主任工程师',
      graduatedCollege: '材料科学与工程学院',
      graduationYear: '2007届',
      alumniAssociation: '吉林大学吉林市校友会',
      studentIdOrDegree: '高分子材料科学专业学士',
      verified: true
    },
    confidentialLevel: 'top_secret',
    demandCategory: 'bottleneck_tech',
    demandTitle: '48K及以上大丝束高强高模聚丙烯腈(PAN)基碳纤维原丝高效湿法凝固成型及皮芯结构消除工艺',
    currentBottleneck: '在年产万吨级大丝束原丝高速纺丝线上，由于凝固浴溶剂双向扩散不均，原丝截面出现明显致密皮层与疏松芯层的“皮芯结构”，导致预氧化碳化后复材拉伸模量无法稳定达到T700/T800标准。',
    targetSpecs: '原丝单丝纤度 ≤ 1.1dtex，变异系数CV值 ≤ 3.5%，消除截面皮芯缺陷率达99%，碳化后复合材料拉伸强度 ≥ 4900MPa，拉伸模量 ≥ 240GPa。',
    budget: '500万 - 900万元',
    expectedTimeline: '9 - 12 个月',
    cooperationMode: 'joint_development',
    ndaAgreed: true,
    contactName: '孙玉峰 (校友)',
    contactPhone: '13804402198',
    contactEmail: 'yf.sun@jilin-fiber.com',
    createdAt: '2026-09-06 08:30',
    status: 'feedback_provided',
    priority: 'lightning_alumni',
    responseDeadlineHours: 24,
    aiTags: ['大丝束碳纤维', 'PAN原丝', '纺丝成型', '风电叶片材料'],
    aiSummary: {
      coreChallenge: '48K大丝束原丝纺丝皮芯结构缺陷导致碳化后拉伸强度模量达不到标称指标。',
      targetMetric: '单丝纤度 ≤ 1.1dtex，CV ≤ 3.5%，碳纤维拉伸强度 ≥ 4900MPa。',
      recommendedField: '化学学院 / 材料科学与工程学院',
      commercialValue: '供应国内超大兆瓦级风电叶片及储氢气瓶，带动百亿级碳纤维产业链。'
    },
    aiMatchedPatents: [
      INITIAL_PATENTS[1], // pat-002
      INITIAL_PATENTS[6], // pat-007
      INITIAL_PATENTS[5], // pat-006
      INITIAL_PATENTS[7]  // pat-008
    ],
    universityFeedback: {
      id: 'fb-012',
      feedbackTime: '2026-09-06 12:45 (仅用时4.25小时极速反馈)',
      officerName: '郑伟涛 教授 / 中国科学院院士',
      assignedCollege: '材料科学与工程学院 / 化学学院',
      assignedLab: '新型电池物理与先进材料重点实验室',
      matchedExperts: [
        {
          name: '郑伟涛',
          title: '教授 / 博士生导师 / 院士',
          field: '先进碳基纳米材料、无机功能薄膜与界面物理化学',
          college: '材料科学与工程学院'
        },
        {
          name: '崔小强',
          title: '教授 / 博士生导师 / 国家杰青',
          field: '高分子原丝界面扩散动力学、多尺度原位表征',
          college: '材料科学与工程学院'
        }
      ],
      feasibilityAssessment: '【国家重点科研力量支持】吉大材料学院团队在原丝凝固浴相分离热力学与温控梯度流场仿真具有丰富工业落地经验，已成功协助国内多家化纤骨干企业优化纺丝槽流道。',
      proposedSolution: '① 部署吉大自主的凝固浴多段梯度降温微环流仿真模型；② 引入绿色亲水助凝剂配方，抑制表层过快结晶；③ 现场搭载原位同步辐射散射监测设备。',
      estimatedTimeline: '60天内完成中试纺丝槽流道优化；180天内完成大丝束连续纺丝试验。',
      recommendedPatents: [
        { patentNo: 'CN202410651290.X', title: '一种抑制聚丙烯腈基碳纤维原丝皮芯缺陷的梯度凝固浴控制装置与添加剂配方' }
      ],
      nextStepAction: '郑伟涛院士团队定于9月14日前往吉林化纤九站厂区进行实地取样与对接交流。',
      contactOfficer: {
        name: '李雅静 (吉大技术转移专员 / 校友服务主管)',
        phone: '0431-85168892 / 13944189920',
        email: 'ttc_alumni@jlu.edu.cn',
        office: '吉林大学中心校区鼎新楼 A521 室'
      }
    }
  },
  {
    id: 'cd-013',
    companyName: '广州广药白云山化学制药有限公司',
    creditCode: '914401011904XXXX',
    industry: '生物医药与现代中药',
    region: '广东省广州市白云区',
    enterpriseScale: '世界500强广药集团核心成员 / 重点制药企业',
    isAlumniEnterprise: false,
    confidentialLevel: 'top_secret',
    demandCategory: 'bottleneck_tech',
    demandTitle: '长白山道地人参稀有抗肿瘤单体皂苷(Rg3/Rh2/Compound K)连续流生物酶催化转化与工业化放大',
    currentBottleneck: '传统人参提取物中抗肿瘤活性最高的稀有皂苷含量不足万分之一，传统酸热水解破坏活性基团且转化率低于25%，酶解法由于固定化酶稳定性差、反应周期长达48小时。',
    targetSpecs: '稀有皂苷转化率 ≥ 92%，纯化后单体纯度 ≥ 98%，微反应器连续酶解停留时间 ≤ 45分钟，固定化酶重复利用批次 ≥ 60批次活性保持80%以上。',
    budget: '400万 - 700万元',
    expectedTimeline: '9 - 12 个月',
    cooperationMode: 'patent_license',
    ndaAgreed: true,
    contactName: '陈总监 (中药新药研发部)',
    contactPhone: '13922108843',
    contactEmail: 'chen.gx@by-pharma.com',
    createdAt: '2026-09-07 11:30',
    status: 'assigned_expert',
    priority: 'standard',
    responseDeadlineHours: 24,
    aiTags: ['稀有单体皂苷', '生物酶转化', '中药现代化', '连续流反应器'],
    aiSummary: {
      coreChallenge: '人参高活性稀有皂苷传统转化率低（<25%），固定化酶稳定性差阻碍工业化连续生产。',
      targetMetric: '稀有皂苷转化率 ≥ 92%，纯度 ≥ 98%，反应时间 ≤ 45分钟。',
      recommendedField: '生命科学学院 / 药学院 / 化学学院',
      commercialValue: '推动东北人参千亿级大健康产业与广药抗肿瘤创新药开发。'
    },
    aiMatchedPatents: [
      INITIAL_PATENTS[4], // pat-005 (人参稀有单体皂苷定向生物酶转化)
      INITIAL_PATENTS[1], // pat-002
      INITIAL_PATENTS[3], // pat-004
      INITIAL_PATENTS[7]  // pat-008
    ]
  },
  {
    id: 'cd-014',
    companyName: '潍柴动力智能科技有限公司',
    creditCode: '91370700MA3QXXXX',
    industry: '新能源与绿色动力装备',
    region: '山东省潍坊市高新区',
    enterpriseScale: '中国内燃机行业龙头企业 / 央企上市公司',
    isAlumniEnterprise: false,
    confidentialLevel: 'top_secret',
    demandCategory: 'bottleneck_tech',
    demandTitle: '重型商用车直喷氢内燃机(H2-ICE)超高压喷射超稀薄燃烧抗爆震与低NOx协同控制算法',
    currentBottleneck: '氢内燃机在大负荷工况下极易发生早燃、回火与剧烈爆震，当前采用被动推迟点火策略导致发动机热效率下降至36%，且NOx排放超出国六/欧七严苛限值。',
    targetSpecs: '指示热效率 ≥ 46.5%，在全负荷范围内消除爆震与回火现象，原机NOx排放 ≤ 200ppm (无需复杂后处理)，起动响应时延 ≤ 1.2秒。',
    budget: '550万 - 850万元',
    expectedTimeline: '9 - 15 个月',
    cooperationMode: 'joint_development',
    ndaAgreed: true,
    contactName: '谭博士 (氢能研发院)',
    contactPhone: '18663609122',
    contactEmail: 'tan.bx@weichai.com',
    createdAt: '2026-09-08 09:15',
    status: 'pending_review',
    priority: 'standard',
    responseDeadlineHours: 24,
    aiTags: ['氢内燃机', '抗爆震控制', '超稀薄燃烧', '零碳动力'],
    aiSummary: {
      coreChallenge: '重型氢内燃机大负荷早燃爆震导致热效率低（仅36%），且NOx排放难以兼顾控制。',
      targetMetric: '指示热效率 ≥ 46.5%，全工况防爆震，原机NOx ≤ 200ppm。',
      recommendedField: '汽车工程学院 / 机械与航空航天工程学院',
      commercialValue: '支撑“双碳”目标下重型商用车零碳动力变革与国家重大专项攻坚。'
    },
    aiMatchedPatents: [
      INITIAL_PATENTS[0], // pat-001
      INITIAL_PATENTS[6], // pat-007
      INITIAL_PATENTS[7], // pat-008
      INITIAL_PATENTS[2]  // pat-003
    ]
  },
  {
    id: 'cd-015',
    companyName: '浙江吉利远程新能源商用车集团有限公司',
    creditCode: '91330100MA28XXXX',
    industry: '新能源商用车与绿色甲醇动力',
    region: '浙江省杭州市 / 四川南充研发基地',
    enterpriseScale: '中国首个专注于新能源商用车的行业龙头',
    isAlumniEnterprise: true,
    alumniInfo: {
      isAlumniEnterprise: true,
      alumniName: '杜海涛',
      alumniPosition: '动力系统研究院院长',
      graduatedCollege: '汽车工程学院',
      graduationYear: '2011届',
      alumniAssociation: '吉林大学浙江校友会 · 汽车产业分会',
      studentIdOrDegree: '动力机械及工程专业硕士',
      verified: true
    },
    confidentialLevel: 'top_secret',
    demandCategory: 'bottleneck_tech',
    demandTitle: '醇氢电动增程重卡全气候热管理与动力系统多能量流自适应协同优化控制算法',
    currentBottleneck: '甲醇增程重卡在东北-35℃极寒运行环境下，甲醇冷启动雾化困难，增程器水温上升慢导致催化器起燃延误，综合电耗较常温工况上升超过42%。',
    targetSpecs: '在-35℃环境下甲醇增程器冷起动时间 ≤ 8秒，催化器达标起燃时间 ≤ 35秒，极寒工况综合百公里甲醇/电综合能耗恶化率 ≤ 15%，整车全生命周期TCO降低18%。',
    budget: '380万 - 600万元',
    expectedTimeline: '6 - 9 个月',
    cooperationMode: 'joint_development',
    ndaAgreed: true,
    contactName: '杜海涛 (校友)',
    contactPhone: '13758209918',
    contactEmail: 'ht.du@geely-commercial.com',
    createdAt: '2026-09-06 17:30',
    status: 'feedback_provided',
    priority: 'lightning_alumni',
    responseDeadlineHours: 24,
    aiTags: ['醇氢电动', '极寒冷启动', '多能量流协同', '整车热管理'],
    aiSummary: {
      coreChallenge: '甲醇增程重卡在-35℃高寒低温下冷启动雾化差、起燃慢，极寒能耗剧增42%。',
      targetMetric: '-35℃冷起动 ≤ 8秒，催化起燃 ≤ 35秒，极寒能耗恶化率 ≤ 15%。',
      recommendedField: '汽车工程学院 / 汽车底盘集成与仿生全国重点实验室',
      commercialValue: '支撑全国醇氢商用车跨区域严寒干线物流大运力普及。'
    },
    aiMatchedPatents: [
      INITIAL_PATENTS[0], // pat-001
      INITIAL_PATENTS[6], // pat-007
      INITIAL_PATENTS[7], // pat-008
      INITIAL_PATENTS[2]  // pat-003
    ],
    universityFeedback: {
      id: 'fb-015',
      feedbackTime: '2026-09-06 21:05 (仅用时3.58小时极速反馈)',
      officerName: '李君 教授 / 汽车工程学院副院长',
      assignedCollege: '汽车工程学院 / 汽车底盘集成与仿生全国重点实验室',
      assignedLab: '先进动力总成与新能源汽车控制实验室',
      matchedExperts: [
        {
          name: '李君',
          title: '教授 / 博士生导师 / 国家万人计划',
          field: '低碳与零碳内燃机燃烧、混合动力多能量流预测控制',
          college: '汽车工程学院'
        },
        {
          name: '胡云峰',
          title: '教授 / 重点实验室副主任',
          field: '汽车复杂电控系统模型预测控制(MPC)、极限工况热管理',
          college: '汽车工程学院'
        }
      ],
      feasibilityAssessment: '【国家级重点实验室技术储备】李君教授团队在替代燃料（甲醇/天然气/氢）高寒低温起动与微波等离子体助燃方面拥有多项发明专利，完全具备校友项目所需的工程验证能力。',
      proposedSolution: '① 采用吉大自主的“甲醇超临界微闪蒸瞬态喷射模型”；② 搭载MPC多能量流全热域能量管理控制固件；③ 免费开放吉大长春高寒动力学台架开展硬件测试。',
      estimatedTimeline: '45天内交付极寒起动电控标定版固件；150天内完成黑河极寒实车测试。',
      recommendedPatents: [
        { patentNo: 'CN202410712903.5', title: '一种基于模型预测控制的甲醇增程式商用车极寒热管理与能量分配策略' }
      ],
      nextStepAction: '校友通道已预约9月15日在吉林大学汽车大楼召开远程商用车-吉大联合实验室技术推进会。',
      contactOfficer: {
        name: '李雅静 (吉大技术转移专员 / 校友服务主管)',
        phone: '0431-85168892 / 13944189920',
        email: 'ttc_alumni@jlu.edu.cn',
        office: '吉林大学中心校区鼎新楼 A521 室'
      }
    }
  },
  {
    id: 'cd-016',
    companyName: '黑龙江北大荒现代农业装备科技研发有限公司',
    creditCode: '91230100MA18XXXX',
    industry: '高端农机与黑土地保护装备',
    region: '黑龙江省哈尔滨市松北区',
    enterpriseScale: '北大荒集团控股现代化农机研发高科技骨干企业',
    isAlumniEnterprise: true,
    alumniInfo: {
      isAlumniEnterprise: true,
      alumniName: '王大勇',
      alumniPosition: '副总经理兼农机总工程师',
      graduatedCollege: '生物与农业工程学院',
      graduationYear: '2009届',
      alumniAssociation: '吉林大学黑龙江校友会 · 现代农业分会',
      studentIdOrDegree: '农业机械化工程专业硕士',
      verified: true
    },
    confidentialLevel: 'top_secret',
    demandCategory: 'bottleneck_tech',
    demandTitle: '东北黑土地全量秸秆覆盖保护性耕作超宽幅高速免耕精密播种仿生防堵核心工作部件',
    currentBottleneck: '在秋季秸秆全量深还田地块，春季免耕播种机在作业速度超过10km/h时，破茬开沟部件极易发生秸秆缠绕拥堵，导致播深不均（变异系数>18%）和缺苗断条率上升。',
    targetSpecs: '作业速度 10-14 km/h 下实现全量秸秆地块防堵率 ≥ 99.2%，播种深度合格率 ≥ 95%，种肥间距精度 ≤ ±5mm，单机单日作业面积提升至500亩以上。',
    budget: '250万 - 400万元',
    expectedTimeline: '6 - 9 个月',
    cooperationMode: 'joint_development',
    ndaAgreed: true,
    contactName: '王大勇 (校友)',
    contactPhone: '13936187720',
    contactEmail: 'wang.dy@bdh-agri.com',
    createdAt: '2026-09-08 08:50',
    status: 'pending_review',
    priority: 'lightning_alumni',
    responseDeadlineHours: 24,
    aiTags: ['黑土地保护', '免耕播种', '仿生减阻防堵', '智能农机装备'],
    aiSummary: {
      coreChallenge: '全量秸秆覆盖下高速免耕播种易缠草堵塞，导致播深不均（变异系数>18%）与出苗率低。',
      targetMetric: '作业速度10-14km/h，防堵率 ≥ 99.2%，播深合格率 ≥ 95%。',
      recommendedField: '生物与农业工程学院 / 工程仿生教育部重点实验室',
      commercialValue: '服务国家千亿斤粮食产能提升工程与黑土地保护性耕作国家战略。'
    },
    aiMatchedPatents: [
      INITIAL_PATENTS[5], // pat-006
      INITIAL_PATENTS[6], // pat-007
      INITIAL_PATENTS[7], // pat-008
      INITIAL_PATENTS[0]  // pat-001
    ]
  }
];

export const JLU_COLLEGES = [
  '汽车工程学院',
  '计算机科学与技术学院',
  '化学学院',
  '电子科学与工程学院',
  '白求恩医学部 / 药学院',
  '材料科学与工程学院',
  '机械与航空航天工程学院',
  '生物与农业工程学院',
  '仪器科学与电气工程学院',
  '地球科学学院',
  '生命科学学院',
  '软件学院',
  '物理学院',
  '新能源与环境学院',
  '通信工程学院'
];

export const JLU_ALUMNI_ASSOCIATIONS = [
  '吉林大学全球校友总会',
  '吉林大学长春校友会 · 汽车行业分会',
  '吉林大学长春校友会 · 生物医药分会',
  '吉林大学长春校友会 · 光机电分会',
  '吉林大学深圳校友会 · 创新创业分会',
  '吉林大学北京校友会 · 科技创新专委会',
  '吉林大学上海校友会 · 智能制造分会',
  '吉林大学江苏校友会 · 光电与新材料分会',
  '吉林大学浙江校友会 · 数字经济专委会',
  '吉林大学广东校友会 · 生物医药专委会',
  '吉林大学四川校友会 · 电子与军工分会',
  '吉林大学黑龙江校友会 · 现代农业分会',
  '吉林大学吉林市校友会'
];
