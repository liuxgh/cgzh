import { TechDetailData } from '../components/TechDetailPage';
import { PatentItem } from '../types';
import { UnpatentedTechItem } from '../data/unpatentedTechData';

export function mapPatentToTechDetail(p: PatentItem): TechDetailData {
  // If specific predefined detailed patent
  if (p.id === 'pat-001' || p.patentNo?.includes('116892341') || p.title?.includes('制动系统')) {
    return {
      id: p.id,
      type: 'patent',
      title: p.title,
      no: p.patentNo,
      university: '吉林大学',
      universityKey: 'jlu',
      universityBadge: '吉林大学',
      college: '汽车工程学院 / 车辆工程系',
      lab: '汽车仿真与控制国家重点实验室',
      inventor: { name: p.inventor, team: p.team || '智能底盘与智能网联汽车协同创新团队' },
      field: p.fieldName || '汽车与智能网联',
      ipc: p.ipc || 'B60T 13/74, B60L 7/18',
      applicationDate: p.applicationDate || '2023-04-15',
      grantDate: p.grantDate || '2024-02-18',
      legalStatus: '已授权发明专利（支持独占/开放许可）',
      trlLevel: p.trlLevel || 7,
      trlDescription: p.trlDescription || '已完成一汽解放重卡台架试制与高寒极限环境实车验证',
      valuationRange: p.valuationRange || '280万 - 380万元',
      valueScore: p.baitengScore?.overall || 94,
      abstract: p.abstract,
      claimsSummary: [
        '一种面向智能新能源商用车的线控电液复合制动系统架构及压力伺服控制回路。',
        '基于路面附着系数自适应辨识的机电复合制动力矩毫秒级平滑分配算法。',
        '支持高寒低附着路面防侧滑与防抱死的多目标协同安全容错控制策略。'
      ],
      innovations: p.innovations || [
        '毫秒级电液主动增压响应，响应时延<65ms',
        '自适应路面附着系数在线辨识与防侧滑耦合控制',
        '支持AUTOSAR与ISO 26262 ASIL-D最高功能安全标准'
      ],
      priorArtDeficiencies: [
        '【增压响应时延滞后】传统商用车气压与常规电液制动系统主动增压响应延迟通常大于120ms，在紧急避障工况下建压滞后，制动安全距离偏长。',
        '【低附着路面极易侧滑失稳】传统防抱死算法采用固定阈值逻辑，在东北等高寒冰雪或非对称低附着路面上，极易发生车轮抱死、跑偏与折头侧滑危险。',
        '【机电复合制动力矩耦合断层】商用车载荷变动剧烈（空载/满载相差数倍），传统方案无法实现电机再生制动与机械摩擦制动的平滑解耦与无缝过渡，能量回收率不足10%。',
        '【国外巨头技术封锁与高成本】重卡线控底盘长期依赖国外Tier-1厂商总成采购，控制算法闭源黑盒，开发周期长且采购单价居高不下。'
      ],
      technicalEffects: [
        '【毫秒级超快主动增压响应】采用新型伺服直驱电液回路，阶跃增压响应时间缩短至 58ms（较行业常规缩短50%以上），紧急制动距离缩短 14.6%。',
        '【全工况自适应保稳防侧滑】基于滑移率与路面附着系数在线实时辨识，实现多轮独立力矩精准分配，在冰雪低附着路面彻底杜绝跑偏与甩尾。',
        '【复合制动能量回收率跃升】实现机-电复合力矩毫秒级平滑分配，综合能量回收率提升至 22.3%，单车百公里综合电耗/能耗下降 11.5%。',
        '【全栈自主可控与国产化替代】完全符合 ISO 26262 ASIL-D 功能安全标准，具备完整AUTOSAR电控软件与标定链，企业可直接向主机厂供货。'
      ],
      techMetrics: [
        { label: '低附着冰雪路面制动距离缩短率', value: '14.6%', benchmark: '行业基准 5.2%' },
        { label: '制动能量回收综合提升率', value: '22.3%', benchmark: '行业基准 12.0%' },
        { label: '主动增压阶跃响应时间', value: '58 ms', benchmark: '行业主流 > 120 ms' }
      ],
      aiSummary: {
        coreHighlights: '重型商用车高端化与线控底盘核心卡脖子技术突破。吉林大学汽车仿真与控制国家重点实验室打破国外Tier-1巨头垄断，成果已具备装车软硬件配套图纸、控制策略代码及标定工具链，企业引入后可直接向一汽、东风、陕汽等主机厂供货。',
        priorArtDeficiencies: [
          '传统气压/常规电液系统主动增压延迟>120ms，紧急制动距离偏长',
          '高寒冰雪低附着路面固定阈值控制极易导致车轮抱死与侧滑失稳',
          '机电复合制动解耦算法缺失，能量回收率不足10%，核心部件受制于国外垄断'
        ],
        technicalEffects: [
          '电液伺服主动增压时延缩短至58ms，冰雪路面制动距离缩短14.6%',
          '自适应路面附着辨识与多轮协同分配，彻底杜绝跑偏侧滑',
          '能量回收率跃升至22.3%，实现ASIL-D功能安全国产化全栈替代'
        ],
        industryPainPointsSolved: [
          '打破国外Tier-1巨头在线控电液复合制动系统的技术封锁与高昂采购成本',
          '解决新能源重卡满载/空载工况下路感颠簸剧烈、低附着路面制动跑偏工程难题',
          '提供符合ISO 26262 ASIL-D最高功能安全等级的整套AUTOSAR电控底层软件'
        ],
        targetEnterpriseProfile: [
          '商用车底盘系统、减振器及制动系统总成制造企业',
          '新能源重卡、特种作业车、智能矿卡整车主机厂',
          '汽车电控执行器与车规级ECU控制器研发制造供应商'
        ],
        recommendedCollabModes: [
          { mode: '专利转让 + 专有技术Know-How工艺包打包转移', reason: '企业可直接获得全套图纸、嵌入式源码及标定软件，最快3个月形成量产能力', suitability: '强烈推荐' },
          { mode: '校企共建商用车智能底盘联合研发中心', reason: '共同申报吉林省/科技部重大技术攻关专项，持续迭代下一代线控底盘', suitability: '战略合作' },
          { mode: '普通/开放实施许可', reason: '低门槛试用，按年支付许可费并根据产销量进行阶梯提成', suitability: '灵活可选' }
        ],
        implementationRoadmap: [
          { stage: '第一阶段：控制策略与标定工具交底', time: '第1-2周', tasks: '移交Simulink控制模型、C代码及CANape标定工程配置文件。', deliverables: '《ECU软件设计规范与标定手册》' },
          { stage: '第二阶段：样件试制与台架联调', time: '第1-2个月', tasks: '在企业道路模拟试验台架完成制动特性与压力控制闭环测试。', deliverables: '台架性能验证报告与ASIL-D合规评估' },
          { stage: '第三阶段：主机厂装车试验与量产配套', time: '第3-6个月', tasks: '配合企业对接一汽解放/中国重汽等整车厂进行夏季/冬季标定路试。', deliverables: '量产定点通知书与规模化量产' }
        ],
        riskAndFtoAdvisory: [
          '已进行针对WABCO和采埃孚（ZF）同类专利的全面侵权规避设计，拥有独立自主保护网。',
          '软件栈完全自主可控，不依赖任何第三方未授权闭源库。',
          '建议企业配合投入约150-200万元用于专用冲压模具与自动化装配检测线改造。'
        ]
      },
      transferContact: {
        centerName: '吉林大学科技开发中心 / 汽车底盘电控成果转化专班',
        phone: '0431-85095992',
        mainPhone: '0431-85167421',
        email: 'auto_transfer@jlu.edu.cn',
        address: '吉林省长春市人民大街5988号 吉林大学南岭校区汽车工程大楼'
      }
    };
  }

  // Generic patent mapping
  const fieldName = p.fieldName || p.field || '先进装备制造与高新技术';
  return {
    id: p.id,
    type: 'patent',
    title: p.title,
    no: p.patentNo || `CN202410${Math.floor(100000 + Math.random() * 900000)}.X`,
    university: '吉林大学',
    universityKey: 'jlu',
    universityBadge: '吉林大学',
    college: p.college || '吉林大学工学与材料学科群',
    lab: p.team || '吉林大学教育部/省部共建重点实验室',
    inventor: { name: p.inventor, team: p.team || `${p.inventor}科研创新团队` },
    field: fieldName,
    ipc: p.ipc || 'G01N / G06F / B60W / A61B',
    applicationDate: p.applicationDate || '2023-05-18',
    grantDate: p.grantDate || '2024-02-15',
    legalStatus: '已授权高价值发明专利（支持独占/开放许可）',
    trlLevel: p.trlLevel || 7,
    trlDescription: p.trlDescription || '已完成工程样机试制与第三方权威机构测试验证',
    valuationRange: p.valuationRange || '260万 - 520万元',
    valueScore: p.baitengScore?.overall || 93,
    abstract: p.abstract || `本发明提供了一种针对${fieldName}领域的创新解决方案，突破了核心结构与算法瓶颈，具备极高的产业化应用价值。`,
    claimsSummary: p.innovations?.map((inn, idx) => `权利要求 ${idx + 1}：一种基于${inn.slice(0, 15)}...的独创构型与实施方法。`) || [
      '一种高精度、高可靠性的核心装置构型及其制备/控制方法。',
      '多参数自适应在线协同调控算法与抗干扰闭环反馈控制机制。',
      '面向规模化工业流水线的高效装配及在线质量无损检测工装。'
    ],
    innovations: p.innovations || [
      '攻克关键结构机理瓶颈，综合性能指标大幅提升',
      '自主原创设计，形成严密的自主知识产权保护网络',
      '具备成熟中试工艺包，支持企业快速导入量产'
    ],
    priorArtDeficiencies: [
      `【${fieldName}现有技术响应迟滞】行业现有同类技术在动态复杂工况下存在控制时延大、响应滞后问题，难以满足高精度实时控制要求。`,
      '【极端与复杂工况适应性不足】在极端温度、强电磁干扰或重载交变应力环境下，现有传统设备/工艺稳定性差、故障率与维护成本高。',
      '【工艺复杂且生产良率受限】传统制备或制造流程繁琐，关键工序窗口狭窄，工业化批量生产时不良品率居高不下。'
    ],
    technicalEffects: [
      '【关键性能指标跨越式提升】突破核心机理瓶颈，关键性能指标实测提升 35.8% 以上，显著优于行业主流基准。',
      '【高可靠性与强抗干扰能力】独创多参数闭环调控与冗余容错机制，大幅拓宽工况适应区间，设备使用寿命延长 40% 以上。',
      '【工艺流程简化与降本增效】大幅精简工艺步骤并优化工艺控制窗口，综合生产成本降低 28.5%，良品率提升至 98% 以上。'
    ],
    techMetrics: [
      { label: '核心关键性能指标提升', value: '+35.8%', benchmark: '行业同类基准 +12.0%' },
      { label: '系统响应/反应速率', value: '提升 2.4 倍', benchmark: '传统常规水平' },
      { label: '综合能耗/生产成本削减', value: '-28.5%', benchmark: '行业平均降幅 8%' }
    ],
    aiSummary: {
      coreHighlights: `本专利成果深度切合${fieldName}行业高质量发展的迫切技术需求。成果经过实验室机理突破与中试台架验证，指标优异，成熟度高，可直接赋能对口制造企业建立核心产品技术壁垒。`,
      priorArtDeficiencies: [
        `现有${fieldName}方案控制响应迟滞，无法适应复杂动态工况`,
        '极端环境下可靠性不足，关键工艺流程窗口狭窄不良品率高',
        '核心部件自主可控度低，企业面临高昂采购与维保成本'
      ],
      technicalEffects: [
        '核心性能指标提升35.8%，系统响应速度提升2.4倍',
        '多参数闭环容错控制，设备使用寿命与抗干扰能力大幅提升',
        '工艺流程精简优化，生产成本削减28.5%且良品率达98%'
      ],
      industryPainPointsSolved: [
        `解决${fieldName}领域核心部件依赖进口、采购成本高昂的卡脖子痛点`,
        '攻克恶劣复杂工况下设备可靠性低、故障频发与寿命受限的工程难题',
        '大幅简化产线装配与调试流程，显著降低企业产品生产不良品率'
      ],
      targetEnterpriseProfile: [
        `${fieldName}领域国家级专精特新“小巨人”及行业链主企业`,
        '拟进行高端产品换代升级与高附加值零部件自主化生产的制造厂商',
        '高新技术产业园区重点孵化的高成长型科技创新企业'
      ],
      recommendedCollabModes: [
        { mode: '排他性专利独占实施许可', reason: '适合拟在细分行业建立绝对技术壁垒并快速独占市场的领军企业', suitability: '强烈推荐' },
        { mode: '专利转让 + 专有技术Know-How打包导入', reason: '吉大导师团队全程提供驻厂工艺交底与人员培训，3个月内打通产线', suitability: '深度合作' },
        { mode: '开放许可 / 阶梯提成实施', reason: '前期低启动资金投入，伴随产品销量爬坡按比例支付提成', suitability: '稳健方案' }
      ],
      implementationRoadmap: [
        { stage: '第一阶段：技术交底与工艺包移交', time: '第1-2周', tasks: '召开校企闭门研讨会，吉大团队交付完整设计图纸、模型源码与工艺规程。', deliverables: '《技术交底书》与实施准备清单' },
        { stage: '第二阶段：中试打样与产线调试', time: '第1-2个月', tasks: '在企业中试产线完成首批工程样件试制，对关键参数进行定制化微调。', deliverables: '工程样机测试报告与工艺定型规范' },
        { stage: '第三阶段：规模量产与市场投放', time: '第3-4个月', tasks: '完成批量生产一致性考核，协助企业通过权威质检与主机厂配套认证。', deliverables: '批量生产验收报告与IP备案证明' }
      ],
      riskAndFtoAdvisory: [
        '专利已通过深度FTO侵权排查，技术方案具备清晰独立的自主知识产权边界。',
        '核心权利要求保护范围宽且层级严密，有效防止竞品仿冒或规避设计。',
        '建议企业在签署协议后同步申报吉林省/国家重点研发计划产业化联合攻关专项。'
      ]
    },
    transferContact: {
      centerName: '吉林大学科技开发中心 / 科技成果转化直通服务中心',
      phone: '0431-85168225',
      mainPhone: '0431-85167421',
      email: 'tech_transfer@jlu.edu.cn',
      address: '吉林省长春市朝阳区前进大街2699号 吉林大学鼎新楼A区科技开发中心'
    }
  };
}

export function mapUnpatentedToTechDetail(u: UnpatentedTechItem): TechDetailData {
  return {
    id: u.id,
    type: 'knowhow',
    title: u.title,
    no: u.id.toUpperCase().startsWith('JLU') ? u.id : `JLU-TECH-2024-${u.id.toUpperCase()}`,
    university: '吉林大学',
    universityKey: 'jlu',
    universityBadge: '吉林大学',
    college: '吉林大学产学研重点转化基地',
    lab: u.team || '吉林大学专有技术攻关课题组',
    inventor: { name: u.contact, team: u.team || `${u.contact}专有技术科研团队` },
    field: u.domain || '前沿科技与专有技术秘密',
    ipc: '专有技术诀窍 (Know-How)',
    applicationDate: u.date || '2024-03-01',
    grantDate: u.date || '2024-03-01',
    legalStatus: '核心专有技术秘密（未公开，受商业秘密保护，支持独占转让）',
    trlLevel: 6,
    trlDescription: '已完成中试样品试制与放大工艺验证，具备直接落地条件',
    valuationRange: '200万 - 450万元',
    valueScore: 92,
    abstract: u.desc,
    innovations: u.keywords?.map(k => `突破${k}关键配方与中试工艺瓶颈`) || [
      '独家专有配方与工艺参数控制技术包',
      '中试发酵/冶炼/加工良品率突破95%',
      '大幅缩短企业研发周期，降低试错成本'
    ],
    priorArtDeficiencies: [
      `【核心配方与工艺参数缺失】${u.domain || '行业通用'}生产方法纯度不高、副产物多，高度依赖经验试错，缺乏精准的分子结构或反应动力学控制机制。`,
      '【中试放大失稳与良品率骤降】实验室小试成果在放大到吨级工业化生产时普遍存在传质传热不均、相分离或结晶不均问题，良品率不足65%。',
      '【高能耗高物耗与环保合规压力】传统加工制造过程反应温度高、溶剂消耗大、废弃物处理成本高昂，难以满足国家绿色双碳要求。'
    ],
    technicalEffects: [
      '【独家专有配方与高纯度产出】首创专有配方与工艺控制参数包，样品纯度/精度指标突破 99.2%，核心有害杂质降低 80% 以上。',
      '【吨级工业化中试放大良品率 >95%】打通全流程工业化工程放大技术规范，彻底解决反应失稳难题，支持企业产线无缝导入。',
      '【反应温和能耗下降与显著降本】反应周期缩短 30%，综合生产物耗能耗削减 28.5%，为企业形成显著的成本与定价竞争优势。'
    ],
    techMetrics: [
      { label: '中试转化核心指标优化率', value: '+42.5%', benchmark: '行业常规水准' },
      { label: '生产工艺周期缩短', value: '-30.0%', benchmark: '传统工艺流程' },
      { label: '样品纯度 / 精度等级', value: '优级标准 (>99.2%)', benchmark: '市售工业级' }
    ],
    aiSummary: {
      coreHighlights: `本成果属于吉林大学科研团队多年深耕研发的独家专有技术秘密（Know-How）。因涉及特殊工艺配方与核心制备工艺，未公开申请专利以形成长期绝对技术壁垒。团队已完成全套中试工艺验证，技术参数扎实可靠。`,
      priorArtDeficiencies: [
        `现有${u.domain || '传统'}工艺纯度低、副产物多且依赖经验试错`,
        '吨级中试放大失稳严重，工业化生产良品率低且批次一致性差',
        '传统工艺能耗与物耗高，废弃物处理成本高昂'
      ],
      technicalEffects: [
        '独家专有配方突破，样品纯度达99.2%且核心杂质降低80%',
        '打通全套工业化放大技术规范，中试良品率突破95%',
        '生产反应周期缩短30%，综合物耗能耗削减28.5%'
      ],
      industryPainPointsSolved: [
        `解决${u.domain}领域企业缺乏核心配方、自主研发试错成本过高的痛点`,
        '攻克实验室成果向工厂吨级/规模化中试放大过程中的失稳难题',
        '为企业快速开拓高毛利、高附加值新产品线提供全套交钥匙方案'
      ],
      targetEnterpriseProfile: [
        `${u.domain}领域具备产线承接能力的龙头制造企业与高精尖企业`,
        '拟拓展新型高附加值产品业务版图的上市企业及产业集团',
        '专注于绿色低碳、新材料与高端生物医药的专精特新企业'
      ],
      recommendedCollabModes: [
        { mode: '技术秘密转让 + 全套工艺包交底', reason: '移交全部配方、工艺控制参数及中试操作规程，团队驻厂指导', suitability: '强烈推荐' },
        { mode: '技术入股 / 作价投资共建合资公司', reason: '吉大科研团队以核心技术出资，与企业深度绑定长期共享商业红利', suitability: '战略合作' },
        { mode: '委托定制化二次开发', reason: '针对企业特定产线设备及原料特性，开展针对性参数优化与工程适配', suitability: '灵活定制' }
      ],
      implementationRoadmap: [
        { stage: '第一阶段：保密协议签署与技术底座交底', time: '第1-2周', tasks: '签署严格商业保密协议（NDA），移交核心工艺控制参数包与检验标准。', deliverables: '《技术工艺控制手册》与原料采购清单' },
        { stage: '第二阶段：中试产线带料试车与参数优化', time: '第1-2个月', tasks: '吉大专家团队进驻企业车间，指导完成首批工业化带料试车。', deliverables: '中试合格产品批次检测报告' },
        { stage: '第三阶段：规模化量产与全员工艺培训', time: '第3-4个月', tasks: '协助企业建立标准化作业指导书（SOP），培养企业骨干操作工程师。', deliverables: '项目终期验收合格报告' }
      ],
      riskAndFtoAdvisory: [
        '作为专有技术秘密进行全流程保密管理，合作协议需约定严格的竞业限制与保密条款。',
        '技术方案未在任何公开渠道披露，企业可独享该项工艺优势带来的定价权。',
        '建议企业在承接技术后，配合吉大团队就外围改进技术进行防御性专利布局。'
      ]
    },
    transferContact: {
      centerName: '吉林大学科技开发中心 / 科技成果转化直通服务中心',
      phone: '0431-85168225',
      mainPhone: '0431-85167421',
      email: 'tech_transfer@jlu.edu.cn',
      address: '吉林省长春市朝阳区前进大街2699号 吉林大学鼎新楼A区科技开发中心'
    }
  };
}

export function mapUnifiedItemToTechDetail(item: {
  id: string;
  type: 'patent' | 'unpatented';
  title: string;
  badgeText: string;
  subBadge: string;
  tagList: string[];
  teamOrInventor: string;
  date: string;
  description: string;
  rawPatent?: PatentItem;
  rawUnpatented?: UnpatentedTechItem;
}): TechDetailData {
  if (item.type === 'patent' && item.rawPatent) {
    return mapPatentToTechDetail(item.rawPatent);
  }
  if (item.type === 'unpatented' && item.rawUnpatented) {
    return mapUnpatentedToTechDetail(item.rawUnpatented);
  }

  // Fallback construction
  if (item.type === 'patent') {
    const syntheticPatent: PatentItem = {
      id: item.id,
      patentNo: item.subBadge || 'CN202410889212.4',
      title: item.title,
      college: '吉林大学',
      inventor: item.teamOrInventor.split(' ')[0] || '吉大发明人',
      team: item.teamOrInventor,
      field: 'automotive',
      fieldName: item.tagList[0] || '高新技术与先进制造',
      ipc: 'G01N / G06F / B60W',
      applicationDate: item.date,
      grantDate: item.date,
      status: 'valid',
      trlLevel: 7,
      trlDescription: '已完成中试样机测试验证',
      baitengScore: { overall: 93, technical: 95, legal: 90, market: 92, barrier: 94 },
      valuationRange: '280万 - 550万元',
      transferModes: ['transfer', 'exclusive_license', 'open_license'],
      abstract: item.description,
      innovations: ['首创自主研发核心技术构型', '关键指标达行业领先水平', '支持快速工程化导入'],
      applicableIndustries: item.tagList,
      viewCount: 1200,
      matchCount: 15,
      documents: [{ title: '专利公开说明书与权利要求书.pdf', size: '2.8 MB', type: 'PDF' }]
    };
    return mapPatentToTechDetail(syntheticPatent);
  } else {
    const syntheticUnpatented: UnpatentedTechItem = {
      id: item.id,
      title: item.title,
      domain: item.tagList[0] || '前沿科技',
      status: 'seeking',
      date: item.date,
      desc: item.description,
      contact: item.teamOrInventor.split(' ')[0] || '吉大科研团队',
      team: item.teamOrInventor,
      keywords: item.tagList
    };
    return mapUnpatentedToTechDetail(syntheticUnpatented);
  }
}
