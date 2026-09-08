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
    contactPhone: '138****6821',
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
      alumniAssociation: '吉林大学深圳校友会 · 人工智能分会',
      studentIdOrDegree: '计算机应用技术专业博士',
      verified: true
    },
    confidentialLevel: 'top_secret',
    demandCategory: 'bottleneck_tech',
    demandTitle: '复杂反光曲面金属结构件亚微米级微细划痕多模态实时缺陷检出算法与模型轻量化',
    currentBottleneck: '在新能源汽车动力电池托盘与精密航空铝构件质检产线中，高反光曲面导致传统深度学习网络误报率高达12.4%，端侧工控机显存占用超8GB，单工件检测节拍超过120ms，无法匹配自动化节拍。',
    targetSpecs: '检出率（Recall）≥ 99.8%，过杀率（False Alarm）≤ 0.5%，边缘工控机单卡（RTX 4060等）推理延迟 ≤ 20ms，显存占用 ≤ 2GB。',
    budget: '150万 - 250万元',
    expectedTimeline: '4 - 6 个月',
    cooperationMode: 'joint_development',
    ndaAgreed: true,
    contactName: '陈晨 (校友)',
    contactPhone: '186****9912',
    contactEmail: 'chen.chen@optivision-sz.com',
    createdAt: '2026-09-06 16:20',
    status: 'assigned_expert',
    priority: 'lightning_alumni',
    responseDeadlineHours: 24,
    aiTags: ['工业缺陷检测', '轻量化模型', '机器视觉', '边缘算力优化'],
    aiSummary: {
      coreChallenge: '动力电池铝托盘高反光曲面微细划痕误报率达12.4%，端侧工控机显存超标且延迟>120ms。',
      targetMetric: '检出率 ≥ 99.8%，过杀率 ≤ 0.5%，单卡推理延迟 ≤ 20ms，显存 ≤ 2GB。',
      recommendedField: '计算机科学与技术学院 / 符号计算与知识工程教育部重点实验室',
      commercialValue: '匹配头部动力电池厂商出货质检自动化产线，产业化示范效应显著。'
    },
    aiMatchedPatents: [
      INITIAL_PATENTS[7], // pat-008 (多模态大模型小样本工业微瑕疵检测)
      INITIAL_PATENTS[2], // pat-003 (皮秒激光微纳传感芯片与光栅系统)
      INITIAL_PATENTS[0], // pat-001 (线控电液复合制动系统)
      INITIAL_PATENTS[1], // pat-002 (TADF超分子蓝光发光材料)
      INITIAL_PATENTS[9]  // pat-010 (六自由度穿刺力控装置)
    ],
    universityFeedback: {
      id: 'fb-002',
      feedbackTime: '2026-09-06 18:40 (用时2.3小时完成对口专家分派)',
      officerName: '王晓光 / 科技开发中心高新技术推广部',
      assignedCollege: '计算机科学与技术学院 / 符号计算与知识工程教育部重点实验室',
      assignedLab: '计算机视觉与模式识别国家级前沿交叉团队',
      matchedExperts: [
        {
          name: '杨博',
          title: '教授 / 博士生导师 / 重点实验室主任',
          field: '知识图谱与工业大模型、图像语义分割与跨模态特征融合',
          college: '计算机科学与技术学院'
        },
        {
          name: '王峰',
          title: '副教授 / 模式识别团队负责人',
          field: '少样本工业缺陷检测、边缘端算力剪枝与量化加速',
          college: '软件学院'
        }
      ],
      feasibilityAssessment: '【高度对口】杨博教授团队近期完成国家重点研发计划“工业复杂流形光场成像与轻量化质检”课题，独创非对称注意力流形投影算法，已在吉林通用机械汽车铝压铸产线完成闭环测试。',
      proposedSolution: '提供吉大轻量化工业质检算法套件（支持TensorRT FP16/INT8双精度加速），并结合陈晨校友团队的产线光照模组做自适应迁移学习，预计可在2周内构建微调基准模型。',
      estimatedTimeline: '15天内提供第一版轻量化算法SDK；3个月完成实地工业产线验证。',
      recommendedPatents: [
        { patentNo: 'CN202410651239.8', title: '一种基于流形注意力增强的工业反光表面微细缺陷亚像素检测方法' }
      ],
      nextStepAction: '校友会深圳联络处正协助安排杨博教授团队本周末在深圳南山科技园开展现场闭门技术研讨。',
      contactOfficer: {
        name: '王晓光 (技术转移专员)',
        phone: '0431-85168895 / 13504308819',
        email: 'xg_wang@jlu.edu.cn',
        office: '吉林大学中心校区鼎新楼 A519 室'
      }
    }
  },
  {
    id: 'cd-003',
    companyName: '长春海悦药业股份有限公司',
    creditCode: '912201017325XXXX',
    industry: '生物医药与大健康',
    region: '吉林省长春市净月高新区',
    enterpriseScale: '上市企业 / 吉林省医药龙头',
    isAlumniEnterprise: true,
    alumniInfo: {
      isAlumniEnterprise: true,
      alumniName: '孙海涛',
      alumniPosition: '研发副总裁兼首席科学家',
      graduatedCollege: '白求恩医学部 / 药学院',
      graduationYear: '2005届',
      alumniAssociation: '吉林大学医药行业校友总会',
      studentIdOrDegree: '药物化学专业博士',
      verified: true
    },
    confidentialLevel: 'top_secret',
    demandCategory: 'new_product_rd',
    demandTitle: '靶向EGFR/HER2双抗药物分子偶联物(ADC)新型自降解Linker载荷合成及高纯化工艺',
    currentBottleneck: '目前国外进口Linker偶联物在血液循环中微量非特异性裂解，造成游离小分子毒素脱落带来的心脏与血液系统副反应，且公斤级批次合成纯度难以突破98.5%。',
    targetSpecs: '新型pH/酶双敏感自裂解Linker稳定性提高50%，小分子偶联产率 ≥ 85%，单批次纯度 ≥ 99.2%，内毒素含量符合中国药典2025版注射剂标准。',
    budget: '500万 - 800万元',
    expectedTimeline: '12 - 18 个月',
    cooperationMode: 'joint_lab',
    ndaAgreed: true,
    contactName: '孙海涛 (校友)',
    contactPhone: '139****1188',
    contactEmail: 'sun.ht@haiyue-pharma.com',
    createdAt: '2026-09-04 11:00',
    status: 'in_dialogue',
    priority: 'lightning_alumni',
    responseDeadlineHours: 24,
    aiTags: ['ADC药物', '生物制药', '自降解Linker', '高纯度合成'],
    aiSummary: {
      coreChallenge: '国外进口Linker存在微量非特异性脱落引发副反应，且公斤级批次合成纯度难以达到药用标准。',
      targetMetric: '自裂解Linker稳定性提升50%，偶联产率 ≥ 85%，纯度 ≥ 99.2%。',
      recommendedField: '化学学院 / 超分子结构与材料国家重点实验室 & 药学院',
      commercialValue: '一类创新靶向抗肿瘤药核心原料，打破海外跨国药企垄断。'
    },
    aiMatchedPatents: [
      INITIAL_PATENTS[3], // pat-004 (靶向抗肿瘤长白山人参稀有皂苷Rg3/Rh2)
      INITIAL_PATENTS[1], // pat-002 (TADF超分子蓝光发光材料)
      INITIAL_PATENTS[9], // pat-010 (六自由度脊柱与骨科微创机器人)
      INITIAL_PATENTS[7], // pat-008 (工业智能计算与多模态模型)
      INITIAL_PATENTS[4]  // pat-005 (黑土地智能仿生农机)
    ],
    universityFeedback: {
      id: 'fb-003',
      feedbackTime: '2026-09-04 15:30 (用时4.5小时由化学学院与药学院联合出具评估报告)',
      officerName: '赵国栋 研究员 / 科技开发中心生物医药板块主管',
      assignedCollege: '化学学院 / 超分子结构与材料国家重点实验室',
      assignedLab: '化学生物学与抗体偶联创新药物研发中心',
      matchedExperts: [
        {
          name: '刘堃',
          title: '教授 / 国家杰出青年基金获得者 / 团队负责人',
          field: '超分子化学、智能刺激响应型药物递送系统及靶向Linker设计',
          college: '化学学院'
        },
        {
          name: '滕乐生',
          title: '教授 / 博士生导师',
          field: '生物药中试发酵、抗体偶联及药物质量标准控制',
          college: '生命科学学院'
        }
      ],
      feasibilityAssessment: '【突破性潜力】吉林大学化学学科在全国名列前茅（世界一流建设学科）。超分子重点实验室在pH响应型二硫键/酰腙自降解基团领域拥有多项原创国际PCT专利，可定制化设计多维稳定型偶联Linker。',
      proposedSolution: '建议双方共建“吉大-海悦药业 新型抗肿瘤ADC药物联合研发中心”，吉大负责靶向Linker分子定制与公斤级合成工艺开发，海悦药业提供抗体母液与动物毒理药代评价平台。',
      estimatedTimeline: '6个月完成先导Linker分子筛选与公斤级工艺验证；12个月完成CMC药学研究。',
      recommendedPatents: [
        { patentNo: 'CN202310981245.3', title: '一种高稳定性生理环境惰性肿瘤微环境特异裂解的ADC药物连接子及其制备方法' }
      ],
      nextStepAction: '双方已完成保密协议双签，首期联合实验室筹建协议草案已发送至企业法务与研发总监邮箱，定于9月10日举行正式签约仪式。',
      contactOfficer: {
        name: '赵国栋 (生物医药转化专员)',
        phone: '0431-85168896 / 13804319981',
        email: 'gd_zhao@jlu.edu.cn',
        office: '吉林大学中心校区鼎新楼 A522 室'
      }
    }
  },
  {
    id: 'cd-004',
    companyName: '江苏亨通光电股份有限公司',
    creditCode: '913205001377XXXX',
    industry: '新材料与光电信息',
    region: '江苏省苏州市吴江区',
    enterpriseScale: '中国500强企业 / 上市龙头企业',
    isAlumniEnterprise: false,
    confidentialLevel: 'top_secret',
    demandCategory: 'material_substitution',
    demandTitle: '超低衰减超大容量G.654.E海底光纤用高纯合成石英预制棒等离子体化学沉积关键辅料国产化替代',
    currentBottleneck: '核心等离子体化学气相沉积(PCVD)制棒过程中所用的特种高纯氟化物掺杂剂主要依赖欧美进口，受贸易管制波动影响大，亟需实现99.9999%超高纯电子级原料国产自主供应。',
    targetSpecs: '纯度 ≥ 99.9999% (6N级别)，金属杂质总量 ≤ 5ppb，含水率 ≤ 1ppm，配合高速沉积工艺折射率剖面波动 ≤ ±0.0002。',
    budget: '600万 - 1000万元',
    expectedTimeline: '12 - 24 个月',
    cooperationMode: 'tech_transfer',
    ndaAgreed: true,
    contactName: '周经理',
    contactPhone: '137****5520',
    contactEmail: 'zhou.wm@hengtonggroup.com',
    createdAt: '2026-09-07 10:15',
    status: 'feedback_provided',
    priority: 'standard',
    responseDeadlineHours: 48,
    aiTags: ['超高纯电子化学品', '光纤预制棒', '国产化替代', '无机功能材料'],
    aiSummary: {
      coreChallenge: '海底光纤等离子体制棒核心特种高纯氟化物依赖欧美进口，面临关键供应链断供风险。',
      targetMetric: '纯度达到 99.9999% (6N级)，金属杂质 ≤ 5ppb，含水率 ≤ 1ppm。',
      recommendedField: '无机合成与制备化学国家重点实验室 / 化学学院',
      commercialValue: '赋能全球海底跨洋通信光纤龙头，直接替代千万级进口高纯材料采购。'
    },
    aiMatchedPatents: [
      INITIAL_PATENTS[1], // pat-002 (TADF超分子有机蓝光发光材料)
      INITIAL_PATENTS[2], // pat-003 (超快激光微纳传感芯片与光栅系统)
      INITIAL_PATENTS[6], // pat-007 (高强塑韧稀土镁合金成形工艺)
      INITIAL_PATENTS[5], // pat-006 (复杂地层深部科学钻探自适应控制)
      INITIAL_PATENTS[8]  // pat-009 (航空低温超导全张量磁力梯度仪)
    ],
    universityFeedback: {
      id: 'fb-004',
      feedbackTime: '2026-09-07 16:45 (用时6.5小时出具初步技术评估)',
      officerName: '马宏伟 / 科技开发中心无机非金属材料专项组',
      assignedCollege: '无机合成与制备化学国家重点实验室 / 化学学院',
      assignedLab: '高纯电子化学品与特种氟材料研发中心',
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
    contactPhone: '180****7731',
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
  '吉林大学深圳校友会 · 创新创业分会',
  '吉林大学北京校友会 · 科技创新专委会',
  '吉林大学上海校友会 · 智能制造分会',
  '吉林大学江苏校友会 · 光电与新材料分会',
  '吉林大学浙江校友会 · 数字经济专委会',
  '吉林大学广东校友会 · 生物医药专委会',
  '吉林大学四川校友会 · 电子与军工分会'
];
