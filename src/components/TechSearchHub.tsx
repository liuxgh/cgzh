import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, Building2, ChevronLeft, User, FileText, ChevronDown, ChevronUp, Image, 
  CheckCircle, Loader2, Sparkles, BrainCircuit, ArrowRight, Edit3, X, MapPin, 
  Phone, Mail, Calendar, ShieldCheck, Compass, Navigation, ExternalLink, Award,
  PhoneCall, MessageSquare, Check, HelpCircle, Building
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TechDetailPage, TechDetailData } from './TechDetailPage';

interface Props {
  query: string;
  onBack: () => void;
  universityScope?: string | null;
  onSelectUniversity?: (uniId: string) => void;
}

interface SearchResult {
  id: string;
  type: 'patent' | 'knowhow';
  title: string;
  no: string;
  university: string;
  universityKey?: string;
  universityBadge?: string;
  inventor: {
    name: string;
    title?: string;
  };
  description: string;
  details: string;
}

interface TechTransferCenter {
  id: string;
  name: string;
  shortName: string;
  badge: string;
  city: string;
  address: string;
  mainPhone: string;
  techTransferPhone: string;
  email: string;
  department: string;
  serviceTags: string[];
}

const TRANSFER_CENTERS: Record<string, TechTransferCenter> = {
  changchun: {
    id: 'ttc-cc',
    name: '吉林大学科研院科技开发办公室（技术转移中心）',
    shortName: '长春总部（前卫南区）',
    badge: '首批国家技术转移示范机构 • 国家级概念验证中心',
    city: '吉林省长春市',
    address: '吉林省长春市朝阳区前进大街2699号 吉林大学前卫南区科技开发办公室',
    mainPhone: '0431-85168225',
    techTransferPhone: '0431-85167421',
    email: 'kfc@jlu.edu.cn',
    department: '技术转移科 / 产学研合作科',
    serviceTags: ['成果转让与许可', '概念验证与中试', '产学研联合攻关', '作价入股备案']
  },
  shenzhen: {
    id: 'ttc-sz',
    name: '吉林大学深圳研究院（华南成果转化中心）',
    shortName: '深圳研究院（大湾区）',
    badge: '粤港澳大湾区产学研与成果转化基地',
    city: '广东省深圳市',
    address: '深圳市南山区高新南四道19号 深圳虚拟大学园大楼B308室',
    mainPhone: '0755-26551610',
    techTransferPhone: '0755-26551888',
    email: 'szyjy@jlu.edu.cn',
    department: '科技发展与成果转化部',
    serviceTags: ['大湾区产业对接', '新一代信息技术', '生物医药与健康', '科技金融赋能']
  },
  qingdao: {
    id: 'ttc-qd',
    name: '吉林大学青岛汽车研究院（胶东半岛基地）',
    shortName: '青岛汽车研究院（山东）',
    badge: '汽车仿真与控制国家重点实验室产学研示范基地',
    city: '山东省青岛市',
    address: '山东省青岛市李沧区九水东路130号（校本部：0431-85095992）',
    mainPhone: '0532-87635677',
    techTransferPhone: '0532-87635677',
    email: 'qdyjy@jlu.edu.cn',
    department: '整车与智能网联技术转化部',
    serviceTags: ['新能源底盘电控', '商用车轻量化', '智能网联算法', '台架测试验证']
  },
  suzhou: {
    id: 'ttc-suzhou',
    name: '吉林大学长三角产学研技术转移中心',
    shortName: '苏州工研院（长三角）',
    badge: '长三角智能制造与高端装备创新基地',
    city: '江苏省苏州市',
    address: '江苏省苏州市工业园区若水路388号 纳米技术与先进制造基地',
    mainPhone: '0512-62887600',
    techTransferPhone: '0512-62887600',
    email: 'kfc@jlu.edu.cn',
    department: '华东区域产业合作办公室',
    serviceTags: ['纳米新材料', '精密装备制造', '工业物联网', '校企联合研发']
  },
  beijing: {
    id: 'ttc-bj',
    name: '吉林大学北京成果转化与重大项目联络处',
    shortName: '北京联络处（京津冀）',
    badge: '京津冀重大科技专项与央国企对接平台',
    city: '北京市海淀区',
    address: '北京市海淀区中关村南大街1号 协同创新港6层',
    mainPhone: '010-68945678',
    techTransferPhone: '010-68945678',
    email: 'kfc@jlu.edu.cn',
    department: '华北产学研创新协同部',
    serviceTags: ['重大科技攻关', '央国企揭榜挂帅', '高价值专利运营', '军民协同创新']
  }
};

const CITY_OPTIONS = [
  { key: 'changchun', label: '吉林 · 长春（总部基地）', desc: '科技开发中心' },
  { key: 'shenzhen', label: '广东 · 深圳（华南中心）', desc: '深圳研究院' },
  { key: 'qingdao', label: '山东 · 青岛（胶东基地）', desc: '青岛汽车研究院' },
  { key: 'suzhou', label: '江苏 · 苏州（华东中心）', desc: '长三角中心' },
  { key: 'beijing', label: '北京（华北联络处）', desc: '重大项目联络处' }
];

// 吉林大学专属成果库 (Single University Scope)
const JLU_RESULTS: SearchResult[] = [
  {
    id: 'jlu-res-1',
    type: 'patent',
    title: '一种基于深度学习的多模态特征融合方法及系统',
    no: 'CN202310458921.X',
    university: '吉林大学人工智能学院',
    universityKey: 'jlu',
    universityBadge: '吉林大学',
    inventor: { name: '王教授' },
    description: '该发明提出了一种新颖的多模态特征融合架构，有效解决了异构数据在联合表示学习中的语义对齐问题。在自然语言处理与计算机视觉的跨模态检索任务中，准确率提升了15%以上。',
    details: '技术成熟度：TRL 5（实验室验证阶段）。已在多模态医疗影像辅助诊断、智能工业缺陷检测等场景进行初步验证。其核心优势在于计算复杂度低，支持边缘设备部署。'
  },
  {
    id: 'jlu-res-2',
    type: 'knowhow',
    title: '高效能自然语言理解引擎与领域知识图谱构建技术',
    no: 'JLU-TECH-2023-088',
    university: '吉林大学计算机科学与技术学院',
    universityKey: 'jlu',
    universityBadge: '吉林大学',
    inventor: { name: '李研究员', title: '知识工程联合实验室主任' },
    description: '本技术成果包含一套完整的垂直领域知识图谱自动化构建工具链，以及轻量级的NLU推理引擎。可快速针对特定行业（如医疗、法律、金融）进行知识抽取与推理。',
    details: '技术成熟度：TRL 7（系统原型在真实环境中演示）。已与某大型律所合作建立法律行业知识问答系统，响应时间小于200ms。该技术可作为SaaS服务或私有化部署。'
  },
  {
    id: 'jlu-res-3',
    type: 'patent',
    title: '重型商用车电控空气悬架与可变阻尼自适应减振控制系统',
    no: 'CN202310889212.4',
    university: '吉林大学车辆工程学院',
    universityKey: 'jlu',
    universityBadge: '吉林大学',
    inventor: { name: '陈教授', title: '长江学者 / 汽车底盘国家重点实验室' },
    description: '针对商用车复杂路况工况，发明了高动态响应电液比例控制阻尼阀及自适应高度平顺性调节算法，大幅降低车身纵向俯仰与侧倾振动幅度，有效延长车架疲劳寿命。',
    details: '技术成熟度：TRL 7（装车实测验证）。已在一汽解放重卡车型上完成寒区与山区5万公里实车路试验证，现已具备规模化量产配套实施条件。'
  },
  {
    id: 'jlu-res-4',
    type: 'patent',
    title: '聚醚醚酮(PEEK)特种工程塑料分子链结构设计与超韧耐高温改性技术',
    no: 'CN202310334512.1',
    university: '吉林大学特种工程塑料教育部重点实验室',
    universityKey: 'jlu',
    universityBadge: '吉林大学',
    inventor: { name: '张教授', title: '国家杰出青年基金获得者' },
    description: '突破了高纯度PEEK单体合成与连续聚合技术瓶颈，通过芳香杂环刚性链调控与纳米晶须复合改性，热变形温度达315℃，抗冲击韧性提升45%，适用于航天与高端医疗植入物。',
    details: '技术成熟度：TRL 6（工程中试放大阶段）。已建成百吨级中试示范线，打破国外垄断，具备全套产业化配方与工艺包。'
  },
  {
    id: 'jlu-res-5',
    type: 'knowhow',
    title: '地质超深钻探智能钻井姿态在线监测与自适应减振控制装备',
    no: 'JLU-TECH-2023-145',
    university: '吉林大学建设工程学院/极地深部钻探实验室',
    universityKey: 'jlu',
    universityBadge: '吉林大学',
    inventor: { name: '孙总工', title: '国家深部探测重大专项首席' },
    description: '针对万米深地与极地恶劣钻进工况，研制出耐高温高压（230℃/180MPa）随钻姿态测量模组及主动阻尼液力减振短节，保障深孔垂直度与钻头寿命。',
    details: '技术成熟度：TRL 8（重大工程实测应用）。已在松辽盆地“地壳一号”及塔里木万米科探井成功示范应用，性能稳定可靠。'
  }
];

// 全国所有高校成果库 (All Universities Scope)
const ALL_UNIVERSITIES_RESULTS: SearchResult[] = [
  {
    id: 'all-res-1',
    type: 'patent',
    title: '重型商用车电控空气悬架与可变阻尼自适应减振控制系统',
    no: 'CN202310889212.4',
    university: '吉林大学车辆工程学院',
    universityKey: 'jlu',
    universityBadge: '吉林大学',
    inventor: { name: '陈教授', title: '汽车底盘国家重点实验室' },
    description: '针对商用车复杂路况工况，发明了高动态响应电液比例控制阻尼阀及自适应高度平顺性调节算法，大幅降低车身纵向俯仰与侧倾振动幅度，有效延长车架疲劳寿命。',
    details: '技术成熟度：TRL 7（装车实测验证）。已在一汽解放重卡车型上完成寒区与山区5万公里实车路试验证，现已具备规模化量产配套实施条件。'
  },
  {
    id: 'all-res-2',
    type: 'patent',
    title: '高比能全固态锂电池微结构电极与固态电解质界面复合技术',
    no: 'CN202310678912.8',
    university: '清华大学材料学院',
    universityKey: 'thu',
    universityBadge: '清华大学',
    inventor: { name: '林教授', title: '新能源材料与器件研究所' },
    description: '提出新型硫化物/聚合物原位固化复合电解质，界面阻抗降低70%，单体电芯能量密度突破420Wh/kg，通过针刺与150℃热箱严苛安全测试。',
    details: '技术成熟度：TRL 6（A样电芯实测）。在储能与高端动力电池领域已与国内头部整车厂展开联合研发测试。'
  },
  {
    id: 'all-res-3',
    type: 'knowhow',
    title: '超低延时高可靠车路云协同感知边缘计算模组及融合算法',
    no: 'SEU-TECH-2023-112',
    university: '东南大学信息科学与工程学院',
    universityKey: 'seu',
    universityBadge: '东南大学',
    inventor: { name: '赵教授', title: '未来交通协同创新中心' },
    description: '自研轻量化车载端侧AI边缘感知一体机，支持多路激光雷达与4K视频纳秒级时钟同步，协同感知端到端延迟控制在12ms以内。',
    details: '技术成熟度：TRL 7（车路协同示范区规模部署）。已在江苏、浙江多个国家级车联网先导区实现规模化路侧部署。'
  },
  {
    id: 'all-res-4',
    type: 'patent',
    title: '一种基于深度学习的多模态特征融合方法及系统',
    no: 'CN202310458921.X',
    university: '吉林大学人工智能学院',
    universityKey: 'jlu',
    universityBadge: '吉林大学',
    inventor: { name: '王教授', title: '人工智能学院副院长' },
    description: '该发明提出了一种新颖的多模态特征融合架构，有效解决了异构数据在联合表示学习中的语义对齐问题。在跨模态检索任务中准确率提升了15%以上。',
    details: '技术成熟度：TRL 5（实验室验证阶段）。已在多模态医疗影像辅助诊断、智能工业缺陷检测等场景进行初步验证。'
  },
  {
    id: 'all-res-5',
    type: 'patent',
    title: '耐极寒超低温特种润滑耐磨涂层与航空级精密减速器',
    no: 'CN202310542318.5',
    university: '哈尔滨工业大学机器人技术与系统全国重点实验室',
    universityKey: 'hit',
    universityBadge: '哈尔滨工业大学',
    inventor: { name: '刘研究员', title: '特种机器人传动技术团队' },
    description: '开发出-60℃极寒工况下自润滑耐磨纳米复合涂层，配套自研高精度谐波/RV减速器，在低温严苛环境下无卡死、寿命提升3倍。',
    details: '技术成熟度：TRL 7（极地科考装备与极寒机械验证）。已配套极地科考特种巡检装备。'
  },
  {
    id: 'all-res-6',
    type: 'knowhow',
    title: '面向智能制造的高精度工业视觉缺陷实时在线检测系统',
    no: 'ZJU-TECH-2023-045',
    university: '浙江大学控制科学与工程学院',
    universityKey: 'zju',
    universityBadge: '浙江大学',
    inventor: { name: '郑教授', title: '智能系统与控制研究所' },
    description: '集成了多光谱成像与亚像素级深度边缘检测网络，对金属冲压件微裂纹、锂电隔膜划痕实现99.8%检出率，节拍时间小于30ms。',
    details: '技术成熟度：TRL 8（产线规模量产部署）。已在长三角多家汽车冲压与新能源电池上市企业产线落地运行。'
  },
  {
    id: 'all-res-7',
    type: 'patent',
    title: '大功率燃料电池电堆金属双极板超薄精密成形与表面改性技术',
    no: 'CN202310992314.1',
    university: '上海交通大学机械与动力工程学院',
    universityKey: 'sjtu',
    universityBadge: '上海交通大学',
    inventor: { name: '严教授', title: '薄板结构制造研究所' },
    description: '突破0.075mm超薄钛/不锈钢板微流道超塑性微胀形与高耐蚀非晶碳镀层技术，接触电阻低于2.5mΩ·cm²，电堆功率密度超4.8kW/L。',
    details: '技术成熟度：TRL 7（车规级实测）。已通过第三方车规级5000小时耐久性考核，形成完备模具设计规范。'
  },
  {
    id: 'all-res-8',
    type: 'knowhow',
    title: '复杂水工环境下耐腐蚀高强混凝土及裂缝自修复注浆材料',
    no: 'HHU-TECH-2023-019',
    university: '河海大学水利水电学院',
    universityKey: 'hhu',
    universityBadge: '河海大学',
    inventor: { name: '陆教授', title: '水利工程防灾减灾中心' },
    description: '结合微生物矿化自愈合微胶囊与超高性能水泥基复合材料，在水下0.3mm微裂缝可在14天内完成自主矿化封堵，抗氯离子渗透提升5倍。',
    details: '技术成熟度：TRL 7（大型水利工程应用）。已在沿海船闸与引水工程隧道衬砌修复中成功示范。'
  }
];

function mapSearchResultToTechDetail(res: SearchResult): TechDetailData {
  if (res.id === 'jlu-res-1' || res.id === 'all-res-4') {
    return {
      id: res.id,
      type: 'patent',
      title: res.title,
      no: res.no,
      university: res.university,
      universityKey: 'jlu',
      universityBadge: '吉林大学',
      college: '人工智能学院 / 计算机科学与技术学院',
      lab: '教育部符号计算与知识工程重点实验室',
      inventor: { name: res.inventor.name },
      field: '人工智能与智能计算',
      ipc: 'G06N 3/04, G06F 18/21',
      applicationDate: '2023-05-18',
      grantDate: '2024-02-15',
      legalStatus: '专利权维持有效（支持独占/开放许可）',
      trlLevel: 6,
      trlDescription: '中试验证与工业级SDK封装阶段',
      valuationRange: '320万 - 650万元',
      valueScore: 94,
      abstract: res.description,
      claimsSummary: [
        '一种针对图像-文本-时序信号的非对称多模态交叉注意力映射矩阵构建方法。',
        '多源异构特征联合流形对齐算法，消除高维稀疏特征空间中的语义漂移与噪声干扰。',
        '端侧低比特量化蒸馏机制，支持算力受限车载/工业嵌入式平台的极速部署。'
      ],
      innovations: [
        '首创自适应语义流形投影算法，跨模态检索准确率较主流CLIP架构提升15.3%。',
        '显存占用缩减62%，单帧特征抽取与对齐推理时延控制在18ms以内。',
        '提供开箱即用的Python/C++工业级推理SDK及ONNX/TensorRT格式模型转换工具链。'
      ],
      techMetrics: [
        { label: '跨模态检索准确率 (mAP@R)', value: '89.4%', benchmark: '行业传统平均 74.1%' },
        { label: '边缘端单帧推理延迟', value: '16.8 ms', benchmark: '行业基准 > 55 ms' },
        { label: '模型显存峰值占用', value: '1.2 GB', benchmark: '主流竞品 3.8 GB' }
      ],
      aiSummary: {
        coreHighlights: '本成果深度契合当前制造业智能化升级中对“视觉+文本+传感时序”多源异构数据融合分析的迫切需求。算法具有计算开销低、抗噪鲁棒性强的显著优势，可直接嵌入企业现有视觉质检系统、智能客服系统及工业数字孪生中枢，显著缩短AI算法自研周期。',
        industryPainPointsSolved: [
          '解决多源传感器时钟不同步导致的模态特征错位难题',
          '攻克工业边缘工控机算力不足、大模型难以部署的痛点',
          '降低企业标注跨模态复杂样本的沉没成本，支持少样本迁移'
        ],
        targetEnterpriseProfile: [
          '工业自动化与机器视觉检测系统集成商（Tier-1/Tier-2）',
          '智能座舱多模态人机交互系统开发企业',
          '智慧医疗影像辅助诊断与电子病历多模态分析软件厂商'
        ],
        recommendedCollabModes: [
          { mode: '排他性专利独占实施许可', reason: '适合拟在细分行业建立排他性技术壁垒的领军企业', suitability: '强烈推荐' },
          { mode: '联合共建“AI+工业垂类大模型”中试实验室', reason: '由吉大导师团队负责算法迭代，企业提供真实工业场景数据', suitability: '深度合作' },
          { mode: '专利所有权作价转让', reason: '适合拟申报国家级专精特新“小巨人”并扩充核心知识产权资产的企业', suitability: '可选方案' }
        ],
        implementationRoadmap: [
          { stage: '第一阶段：技术交底与场景适配', time: '第1-2周', tasks: '召开校企闭门技术研讨会，吉大团队提供底层算法架构文档与测试基准。', deliverables: '《技术可行性分析报告》与场景数据集清洗规范' },
          { stage: '第二阶段：中试打样与算法微调', time: '第1-2个月', tasks: '导入企业产线/业务真实样本，针对特定硬件（如NVIDIA Jetson）完成模型剪枝与量化。', deliverables: '定制化模型权重包及C++部署动态链接库' },
          { stage: '第三阶段：产线集成与量产验收', time: '第3-4个月', tasks: '接入企业MES或上位机系统，完成连续72小时压力稳定性测试。', deliverables: '系统验收报告、知识产权转移备案证书' }
        ],
        riskAndFtoAdvisory: [
          '专利已通过全球PCT检索与FTO自由实施排查，无核心专利侵权纠纷风险。',
          '算法中不包含GPL等具有传染性质的开源组件，商用合规风险极低。',
          '建议企业在签署许可协议时，同步约定后续衍生改进成果的归属条款。'
        ]
      },
      transferContact: {
        centerName: '吉林大学人工智能学院成果转化工作专班',
        phone: '0431-85167421',
        mainPhone: '0431-85168225',
        email: 'ai_transfer@jlu.edu.cn',
        address: '吉林省长春市朝阳区前进大街2699号 吉林大学计算机楼B412'
      }
    };
  } else if (res.id === 'jlu-res-3' || res.id === 'all-res-1') {
    return {
      id: res.id,
      type: 'patent',
      title: res.title,
      no: res.no,
      university: res.university,
      universityKey: 'jlu',
      universityBadge: '吉林大学',
      college: '车辆工程学院 / 汽车工程学院',
      lab: '汽车仿真与控制国家重点实验室',
      inventor: { name: res.inventor.name, title: res.inventor.title, team: '商用车智能底盘电控系统科研团队' },
      field: '智能网联新能源汽车与底盘电控',
      ipc: 'B60G 17/015, B60G 11/27',
      applicationDate: '2023-04-12',
      grantDate: '2023-11-20',
      legalStatus: '已授权发明专利（支持作价入股/独占许可）',
      trlLevel: 7,
      trlDescription: '整车装车5万公里实测验证阶段',
      valuationRange: '480万 - 920万元',
      valueScore: 96,
      abstract: res.description,
      claimsSummary: [
        '一种基于路面预瞄识别的重卡空气悬架自适应阻尼协同调节电控架构。',
        '高速响应电液比例减振阀先导级动态压力补偿控制回路设计。',
        '兼顾整车防侧倾、防点头与满载平顺性的多目标帕累托前沿动态寻优算法。'
      ],
      innovations: [
        '发明了毫秒级路况自适应阻尼阀控制策略，车身垂向振动加速度降低38.5%。',
        '攻克了高寒（-40℃）工况下电磁比例阀油液黏温特性补偿算法，杜绝卡滞。',
        '完成一汽解放重卡5万公里严苛高寒（黑河）及山区（云南）实车耐久测试。'
      ],
      techMetrics: [
        { label: '车身俯仰/侧倾振动幅度降低率', value: '38.5%', benchmark: '行业传统标准 18.0%' },
        { label: '阻尼连续调节响应时间', value: '< 12 ms', benchmark: '行业主流 35 ms' },
        { label: '低温极限可靠性运行温度', value: '-45 ℃', benchmark: '行业标准 -30 ℃' }
      ],
      aiSummary: {
        coreHighlights: '商用车高端化与智能悬架升级的核心卡脖子技术突破。吉林大学依托“汽车仿真与控制国家重点实验室”，打破国外大陆（Continental）、威伯科（WABCO）在重型电控悬架系统的软硬件垄断。成果已具备成熟装车软硬件配套图纸、控制策略代码及标定工具链，企业引入后可直接向一汽、东风、陕汽等主机厂供货。',
        industryPainPointsSolved: [
          '打破国外Tier-1巨头在商用车ECAS电控空气悬架系统的技术封锁与高昂采购成本',
          '解决重卡满载/空载工况下路感颠簸剧烈、底盘悬架结构疲劳开裂的工程通病',
          '提供符合ISO 26262 ASIL-D最高功能安全等级的整套AUTOSAR电控底层软件'
        ],
        targetEnterpriseProfile: [
          '国内主流汽车底盘系统、减振器及空气悬架制造总成企业',
          '重型商用车、特种作业车、新能源矿卡整车主机厂',
          '汽车电控执行器与车规级ECU控制器研发制造供应商'
        ],
        recommendedCollabModes: [
          { mode: '专利转让 + 专有技术Know-How工艺包打包转移', reason: '企业可直接获得全套图纸、嵌入式源码及标定软件，最快3个月形成量产能力', suitability: '强烈推荐' },
          { mode: '校企共建商用车智能底盘联合研发中心', reason: '共同申报吉林省/科技部重大技术攻关专项，持续迭代下一代线控悬架', suitability: '战略合作' }
        ],
        implementationRoadmap: [
          { stage: '第一阶段：控制策略与标定工具交底', time: '第1-2周', tasks: '移交Simulink控制模型、C代码及CANape标定工程配置文件。', deliverables: '《ECU软件设计规范与标定手册》' },
          { stage: '第二阶段：样件试制与台架联调', time: '第1-2个月', tasks: '在企业四立柱道路模拟试验台架完成阻尼特性与高度控制闭环测试。', deliverables: '台架性能验证报告与ASIL-D合规评估' },
          { stage: '第三阶段：主机厂装车试验与量产配套', time: '第3-6个月', tasks: '配合企业对接一汽解放/中国重汽等整车厂进行夏季/冬季标定路试。', deliverables: '量产定点通知书与规模化量产' }
        ],
        riskAndFtoAdvisory: [
          '已进行针对WABCO和采埃孚（ZF）同类专利的全面侵权规避设计，拥有独立自主保护网。',
          '软件栈完全自主可控，不依赖任何第三方未授权闭源库。',
          '建议企业配合投入约150-200万元用于专用冲压模具与自动化装配检测线改造。'
        ]
      },
      transferContact: {
        centerName: '吉林大学汽车底盘电控成果转化专班',
        phone: '0431-85095992',
        mainPhone: '0431-85167421',
        email: 'auto_transfer@jlu.edu.cn',
        address: '吉林省长春市人民大街5988号 吉林大学南岭校区汽车工程大楼'
      }
    };
  } else {
    return {
      id: res.id,
      type: res.type,
      title: res.title,
      no: res.no,
      university: res.university,
      universityKey: res.universityKey || 'jlu',
      universityBadge: res.universityBadge || res.university,
      college: `${res.university} 核心重点学科实验室`,
      lab: `${res.universityBadge || res.university} 重点科研基地`,
      inventor: { name: res.inventor.name, title: res.inventor.title, team: `${res.inventor.name}科研创新团队` },
      field: '先进装备与新一代高新技术',
      ipc: 'G01N / H01M / B60L / C08L',
      applicationDate: '2023-06-10',
      grantDate: '2024-01-18',
      legalStatus: '有效高价值成果（支持产学研合作转化）',
      trlLevel: res.type === 'patent' ? 7 : 6,
      trlDescription: res.type === 'patent' ? '工程中试验证阶段' : '系统原型示范应用阶段',
      valuationRange: '280万 - 620万元',
      valueScore: 92,
      abstract: res.description,
      claimsSummary: [
        '针对复杂工况下材料/系统性能衰减的多物理场协同优化方法。',
        '高精度核心元器件微观结构调控及一体化精密制造工艺。',
        '自适应闭环监测与智能自愈合运行控制架构。'
      ],
      innovations: [
        '突破核心工艺瓶颈，综合关键性能指标较行业传统水平提升25%以上。',
        '降低制造综合成本与能耗，具备成熟的产线适配与工程放大基础。',
        '已完成严苛工业级工况实测，形成完整自主知识产权保护网络。'
      ],
      techMetrics: [
        { label: '核心性能突破指标', value: '提升 35%+', benchmark: '行业传统标准 100%' },
        { label: '工业工况连续无故障运行', value: '> 3000 小时', benchmark: '行业基准 1200 小时' },
        { label: '制造成本与能耗优化', value: '降低 22%', benchmark: '传统生产基准' }
      ],
      aiSummary: {
        coreHighlights: `本项成果（${res.title}）针对产业链关键环节的卡脖子难题提供了全新解决方案。研发团队由${res.university}顶尖科研力量领衔，兼具学术前沿性与工程落地可行性。成果已在示范工程或实验室完成充分验证，可帮助引进企业快速实现产品升级换代。`,
        industryPainPointsSolved: [
          '攻克传统工艺路线中一致性差、失效频次高的行业痛点',
          '打破高端元器件/材料依赖高价进口的被动局面',
          '提升企业自主研发实力，快速形成专利防御壁垒'
        ],
        targetEnterpriseProfile: [
          '从事高端制造、新材料、新能源或数字化升级的行业骨干企业',
          '拟申报国家级/省级制造业单项冠军、专精特新重点小巨人企业',
          '产业链链主企业及核心一级配套零部件供应商'
        ],
        recommendedCollabModes: [
          { mode: '专利/成果独占实施许可', reason: '获得独家排他竞争优势，保护期内独享市场红利', suitability: '强烈推荐' },
          { mode: '产学研联合攻关与中试基地共建', reason: '依托高校科研团队持续提供技术支撑与人才培训', suitability: '推荐' },
          { mode: '作价入股 / 设立合资产业化公司', reason: '深度绑定高校科学家团队利益，实现风险共担收益共享', suitability: '可选方案' }
        ],
        implementationRoadmap: [
          { stage: '第一阶段：技术交底与产线评估', time: '第1-2周', tasks: '组织线上线下技术对接会，评估企业产线设备兼容度与改造成本。', deliverables: '《技术交底书与实施方案》' },
          { stage: '第二阶段：中试验证与样品生产', time: '第1-3个月', tasks: '由高校团队指导进行样品试制与全套性能指标测试。', deliverables: '中试样品与权威第三方检测报告' },
          { stage: '第三阶段：商业化批量导入', time: '第3-6个月', tasks: '完成全套生产工艺包移交，建立质量管控与运维保障体系。', deliverables: '量产导入验收报告' }
        ],
        riskAndFtoAdvisory: [
          '已进行自主知识产权查新与排他性检索，不存在权属纠纷风险。',
          '建议企业在正式投产前配合高校团队完成一次全流程安全生产与环评审核。',
          '高校技术转移办公室提供全流程合同审查与法律合规保障。'
        ]
      },
      transferContact: {
        centerName: `${res.universityBadge || res.university} 科技成果转化办公室`,
        phone: '0431-85167421',
        mainPhone: '0431-85168225',
        email: 'kfc@jlu.edu.cn',
        address: `${res.university} 科技创新大厦技术转移中心`
      }
    };
  }
}

export const TechSearchHub: React.FC<Props> = ({ 
  query, 
  onBack, 
  universityScope,
  onSelectUniversity 
}) => {
  const isUniversityMode = Boolean(universityScope);
  const [selectedTechForDetail, setSelectedTechForDetail] = useState<TechDetailData | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [currentQuery, setCurrentQuery] = useState(query);
  const [isMatching, setIsMatching] = useState(false);
  const [hasMatched, setHasMatched] = useState(!!query);
  const [isInputExpanded, setIsInputExpanded] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [showMatchSuccess, setShowMatchSuccess] = useState(false);
  
  // Selected university filter in all-universities mode
  const [selectedUniFilter, setSelectedUniFilter] = useState<string>('all');
  
  // Initialize result dataset according to scope
  const initialPool = isUniversityMode ? JLU_RESULTS : ALL_UNIVERSITIES_RESULTS;
  const [searchResults, setSearchResults] = useState<SearchResult[]>(query ? initialPool : []);

  // Update results if universityScope changes
  useEffect(() => {
    const pool = isUniversityMode ? JLU_RESULTS : ALL_UNIVERSITIES_RESULTS;
    if (hasMatched || query) {
      setSearchResults(pool);
    }
  }, [universityScope, isUniversityMode]);

  // Filtered results in all-universities mode
  const displayedResults = (!isUniversityMode && selectedUniFilter !== 'all')
    ? searchResults.filter(r => r.universityKey === selectedUniFilter)
    : searchResults;
  
  // Selected City / Regional Tech Transfer Center (吉林大学)
  const [selectedCityKey, setSelectedCityKey] = useState<string>('changchun');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedTechForBooking, setSelectedTechForBooking] = useState<SearchResult | null>(null);
  
  // Booking Form State
  const [bookingFormData, setBookingFormData] = useState({
    companyName: '长春一汽富维汽车零部件股份有限公司',
    contactPerson: '李经理',
    contactPhone: '13800008888',
    collabMode: '线上视频技术研讨会',
    expectedDate: '2026-09-10',
    notes: isUniversityMode 
      ? '希望与吉林大学科技开发中心（技术转移中心）专家深入研讨该项技术在量产产线上的可行性与中试验证方案。'
      : '希望与成果研发团队及高校技术转移部门深入研讨该项技术在量产产线上的可行性。'
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [copyToast, setCopyToast] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const currentCenter = TRANSFER_CENTERS[selectedCityKey] || TRANSFER_CENTERS.changchun;

  useEffect(() => {
    if (isInputExpanded && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isInputExpanded]);

  const handleFileUpload = (type: 'doc' | 'img') => {
    const fileName = type === 'doc' ? '企业技术攻关需求书_v2.pdf' : '工况应用场景实测图.png';
    if (!uploadedFiles.includes(fileName)) {
      setUploadedFiles([...uploadedFiles, fileName]);
    }
  };

  const handleMatch = () => {
    if (!currentQuery.trim() && uploadedFiles.length === 0) return;
    
    setIsMatching(true);
    setShowMatchSuccess(false);
    
    // Simulate AI thinking delay
    setTimeout(() => {
      setIsMatching(false);
      setShowMatchSuccess(true);
      const targetPool = isUniversityMode ? JLU_RESULTS : ALL_UNIVERSITIES_RESULTS;
      setSearchResults(targetPool);
      setHasMatched(true);
      setIsInputExpanded(false);
      setTimeout(() => setShowMatchSuccess(false), 3000);
    }, 1800);
  };

  const toggleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  const handleOpenBooking = (tech?: SearchResult | TechDetailData | null) => {
    if (tech) {
      setSelectedTechForBooking(tech as SearchResult);
    } else {
      setSelectedTechForBooking(null);
    }
    setBookingSubmitted(false);
    setShowBookingModal(true);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
    setTimeout(() => {
      setShowBookingModal(false);
      setBookingSubmitted(false);
      showToast(isUniversityMode 
        ? '预约对接需求已成功提交！吉林大学科技开发中心专员及科研团队将根据排期与您对接联络。'
        : '预约对接需求已成功提交！高校科技成果转移专员及科研团队将根据排期与您对接联络。'
      );
    }, 1600);
  };

  const showToast = (msg: string) => {
    setCopyToast(msg);
    setTimeout(() => setCopyToast(null), 3500);
  };

  const handleCopyText = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showToast(`已复制${label}：${text}`);
    } else {
      showToast(`${label}：${text}`);
    }
  };

  // Dedicated Detail Page View
  if (selectedTechForDetail) {
    return (
      <>
        <TechDetailPage
          tech={selectedTechForDetail}
          onBack={() => setSelectedTechForDetail(null)}
          onOpenBooking={(t) => handleOpenBooking(t)}
          universityScope={universityScope}
          onSelectUniversity={onSelectUniversity}
        />

        {/* 预约技术转移中心对接弹窗 */}
        <AnimatePresence>
          {showBookingModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
              >
                <div className="bg-slate-900 p-5 text-white relative">
                  <button 
                    onClick={() => setShowBookingModal(false)}
                    className="absolute right-4 top-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-1.5 text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
                    <Building2 className="w-3.5 h-3.5 text-blue-400" />
                    官方产学研对接通道
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {isUniversityMode 
                      ? `预约 ${currentCenter.name}`
                      : `预约产学研技术对接（${selectedTechForBooking?.university || '相关高校'}）`
                    }
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {isUniversityMode 
                      ? `成果转化专线：${currentCenter.techTransferPhone}`
                      : '高校技术转移专班科技经纪人将全程跟进'
                    }
                  </p>
                </div>

                {bookingSubmitted ? (
                  <div className="p-8 text-center space-y-4">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-7 h-7" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900">对接需求已提交成功</h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                      高校技术转移专员与科研团队将根据工作排期与您取得联系，确认闭门对接研讨安排与技术资料准备。
                    </p>
                    <div className="pt-2">
                      <Loader2 className="w-4 h-4 text-blue-600 animate-spin mx-auto" />
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitBooking} className="p-5 space-y-3.5">
                    {selectedTechForBooking && (
                      <div className="bg-blue-50/80 p-3 rounded-xl border border-blue-200/60 text-xs space-y-1">
                        <div className="text-blue-700 font-bold flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" /> 拟对接成果：
                        </div>
                        <div className="font-bold text-slate-800 text-xs leading-snug">{selectedTechForBooking.title}</div>
                        <div className="text-slate-500 font-mono text-[11px]">{selectedTechForBooking.no} • {selectedTechForBooking.university}</div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">企业全称</label>
                        <input 
                          type="text"
                          required
                          value={bookingFormData.companyName}
                          onChange={(e) => setBookingFormData({...bookingFormData, companyName: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">对接联系人</label>
                        <input 
                          type="text"
                          required
                          value={bookingFormData.contactPerson}
                          onChange={(e) => setBookingFormData({...bookingFormData, contactPerson: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-blue-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">联系电话</label>
                        <input 
                          type="tel"
                          required
                          value={bookingFormData.contactPhone}
                          onChange={(e) => setBookingFormData({...bookingFormData, contactPhone: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">期望对接形式</label>
                        <select
                          value={bookingFormData.collabMode}
                          onChange={(e) => setBookingFormData({...bookingFormData, collabMode: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-blue-600"
                        >
                          <option value="线上视频技术研讨会">线上闭门技术研讨会</option>
                          <option value="专家进企现场指导">高校专家进企现场指导</option>
                          <option value="来校考察与实验室参观">来校考察与重点实验室参观</option>
                          <option value="专利排他转让/许可商务谈判">专利转让 / 许可商务谈判</option>
                          <option value="校企联合攻关申报专项">校企联合申报科技重大专项</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">需求细节与预期目标</label>
                      <textarea 
                        rows={2}
                        value={bookingFormData.notes}
                        onChange={(e) => setBookingFormData({...bookingFormData, notes: e.target.value})}
                        placeholder="请简要阐述企业目前的具体指标要求或产业化场景..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-blue-600 resize-none"
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-end gap-2.5">
                      <button 
                        type="button"
                        onClick={() => setShowBookingModal(false)}
                        className="px-3.5 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 cursor-pointer"
                      >
                        取消
                      </button>
                      <button 
                        type="submit"
                        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" /> 确认提交预约
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Floating Toast */}
      {copyToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-blue-500/40 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-semibold">{copyToast}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 pt-6">
        <button 
          id="btn-back-tech-hub"
          onClick={onBack} 
          className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1 cursor-pointer mb-6"
        >
          <ChevronLeft className="w-4 h-4" /> 返回{isUniversityMode ? '吉林大学图谱' : '首页'}
        </button>

        <AnimatePresence mode="wait">
          {!hasMatched ? (
            /* Initial State: Hero Minimalist Workspace */
            <motion.div 
              key="initial-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, filter: 'blur(4px)' }}
              transition={{ duration: 0.45 }}
              className="flex flex-col items-center justify-center pt-10 sm:pt-20"
            >
              <div className="mb-8 text-center space-y-4">
                <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">AI 智能匹配技术</h1>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                  {isUniversityMode ? (
                    '基于多模态 AI 大模型，精准匹配吉林大学 40+ 优势学院与国家重点实验室科技成果，并直连吉大就近技术转移中心。'
                  ) : (
                    '基于多模态 AI 大模型，一键穿透全国重点高校科技成果库（涵盖清华、吉大、浙大、哈工大、东南、上交等），为您跨校智能筛选高契合度技术方案。'
                  )}
                </p>
              </div>

              <div className="w-full max-w-3xl bg-white rounded-3xl p-2 shadow-2xl shadow-slate-200/60 border border-slate-100 relative group overflow-hidden">
                {/* Glowing border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl pointer-events-none" />
                
                <div className="relative bg-white rounded-[22px] p-6 sm:p-8">
                  <textarea 
                    id="input-tech-query-initial"
                    rows={5}
                    value={currentQuery}
                    onChange={(e) => setCurrentQuery(e.target.value)}
                    placeholder={isUniversityMode 
                      ? "描述您的企业技术攻关需求、工艺痛点，系统将精准匹配吉林大学相关成果与就近转移中心..."
                      : "描述您的企业技术攻关需求、工艺痛点，系统将检索全国所有高校科技成果库为您推荐最佳方案..."
                    }
                    className="w-full bg-transparent border-none resize-none focus:outline-hidden text-lg text-slate-800 placeholder:text-slate-400 leading-relaxed"
                  />
                  
                  {uploadedFiles.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4 mb-2">
                      {uploadedFiles.map((file, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg border border-blue-100">
                          {file.includes('pdf') ? <FileText className="w-4 h-4" /> : <Image className="w-4 h-4" />}
                          {file}
                          <button 
                            onClick={() => setUploadedFiles(uploadedFiles.filter(f => f !== file))} 
                            className="ml-1 hover:text-blue-900"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <button 
                        id="btn-upload-doc-initial"
                        onClick={() => handleFileUpload('doc')} 
                        className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all font-medium text-sm cursor-pointer"
                      >
                        <FileText className="w-4 h-4" /> 上传需求文档
                      </button>
                      <button 
                        id="btn-upload-img-initial"
                        onClick={() => handleFileUpload('img')} 
                        className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all font-medium text-sm cursor-pointer"
                      >
                        <Image className="w-4 h-4" /> 上传产品图片
                      </button>
                    </div>

                    <button 
                      id="btn-start-match-initial"
                      onClick={handleMatch}
                      disabled={isMatching || (!currentQuery.trim() && uploadedFiles.length === 0)}
                      className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 disabled:bg-slate-300 disabled:text-slate-500 text-white font-bold rounded-xl shadow-lg shadow-slate-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group/btn relative overflow-hidden cursor-pointer"
                    >
                      {isMatching ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          深度分析中...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
                          {isUniversityMode ? '智能匹配吉大成果' : '跨校智能匹配'}
                        </>
                      )}
                      
                      {isMatching && (
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                          initial={{ x: '-100%' }}
                          animate={{ x: '100%' }}
                          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                        />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Matched State */
            <motion.div 
              key="matched-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="space-y-6"
            >
              {/* Dynamic Expandable Search Card */}
              <motion.div 
                layout
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  {!isInputExpanded ? (
                    /* Collapsed Compact Mode */
                    <motion.div 
                      key="collapsed-search"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:border-blue-300 transition-colors"
                      onClick={() => setIsInputExpanded(true)}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-blue-600" />
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                              当前匹配需求 ({isUniversityMode ? '吉林大学成果专区' : '全国所有高校成果库'})
                            </span>
                          </div>
                          <span className="text-xs text-blue-600 font-semibold flex items-center gap-1 hover:underline">
                            <Edit3 className="w-3.5 h-3.5" /> 点击展开修改
                          </span>
                        </div>
                        <div 
                          className="w-full bg-slate-50 hover:bg-slate-100/80 border border-slate-200/70 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 transition-colors truncate"
                          title="点击展开编辑需求"
                        >
                          {currentQuery || '（多模态技术需求已提交，已匹配高契合度高校成果库）'}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 shrink-0 md:mt-5" onClick={(e) => e.stopPropagation()}>
                        {uploadedFiles.length > 0 && (
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-2 rounded-xl border border-slate-200">
                            <FileText className="w-3.5 h-3.5 text-blue-600" /> 已附加 {uploadedFiles.length} 个文件
                          </div>
                        )}
                        <button 
                          id="btn-re-match-collapsed"
                          onClick={handleMatch}
                          disabled={isMatching}
                          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 text-sm cursor-pointer"
                        >
                          {isMatching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                          {isMatching ? '分析中...' : '重新匹配'}
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    /* Expanded Full Multi-line Mode with Upload & Actions */
                    <motion.div 
                      key="expanded-search"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="p-6 sm:p-7"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                            <Sparkles className="w-4 h-4" />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-800 text-base">修改技术匹配需求</h3>
                            <p className="text-xs text-slate-400">
                              {isUniversityMode 
                                ? '针对吉林大学成果库重新调整技术攻关描述或上传资料' 
                                : '针对全国所有高校成果库重新调整技术攻关描述或上传资料'
                              }
                            </p>
                          </div>
                        </div>
                        <button 
                          onClick={() => setIsInputExpanded(false)}
                          className="text-xs font-bold text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <ChevronUp className="w-3.5 h-3.5" /> 收起
                        </button>
                      </div>

                      <div className="relative">
                        <textarea 
                          id="input-tech-query-expanded"
                          ref={textareaRef}
                          rows={4}
                          value={currentQuery}
                          onChange={(e) => setCurrentQuery(e.target.value)}
                          placeholder="输入您的技术需求、应用场景或业务痛点，支持多行文本..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 resize-none focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all text-sm leading-relaxed text-slate-800"
                        />
                        
                        {uploadedFiles.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3 mb-2">
                            {uploadedFiles.map((file, idx) => (
                              <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg border border-blue-200">
                                {file.includes('pdf') ? <FileText className="w-3.5 h-3.5" /> : <Image className="w-3.5 h-3.5" />}
                                {file}
                                <button 
                                  onClick={() => setUploadedFiles(uploadedFiles.filter(f => f !== file))} 
                                  className="ml-1 hover:text-blue-900"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <button 
                            id="btn-upload-doc-expanded"
                            onClick={() => handleFileUpload('doc')} 
                            className="flex items-center gap-1.5 px-3.5 py-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all font-medium text-xs border border-slate-200 hover:border-blue-200 cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5" /> 上传需求文档
                          </button>
                          <button 
                            id="btn-upload-img-expanded"
                            onClick={() => handleFileUpload('img')} 
                            className="flex items-center gap-1.5 px-3.5 py-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all font-medium text-xs border border-slate-200 hover:border-blue-200 cursor-pointer"
                          >
                            <Image className="w-3.5 h-3.5" /> 上传场景图片
                          </button>
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto">
                          <button 
                            onClick={() => setIsInputExpanded(false)}
                            className="w-full sm:w-auto px-4 py-2.5 text-slate-500 hover:text-slate-700 font-bold text-sm cursor-pointer"
                          >
                            取消
                          </button>
                          <button 
                            id="btn-re-match-expanded"
                            onClick={handleMatch}
                            disabled={isMatching || (!currentQuery.trim() && uploadedFiles.length === 0)}
                            className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm relative overflow-hidden cursor-pointer"
                          >
                            {isMatching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                            {isMatching ? 'AI 深度分析中...' : '重新智能匹配'}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* ⭐ CONDITIONAL MODULE: 就近推荐技术转移中心 (仅在进入具体大学后显示) */}
              {isUniversityMode ? (
                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs relative overflow-hidden transition-all hover:border-blue-300">
                  {/* Top Subtle Accent Bar */}
                  <div className="h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-400 absolute top-0 left-0 right-0" />

                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-md border border-blue-200/60">
                          <MapPin className="w-3.5 h-3.5 text-blue-600" />
                          吉林大学 • 就近技术转移中心推荐
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          {currentCenter.badge}
                        </span>
                      </div>
                      <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2 mt-1">
                        <Building2 className="w-5 h-5 text-blue-600" />
                        {currentCenter.name}
                      </h2>
                    </div>

                    {/* Regional Quick Switcher */}
                    <div className="flex items-center gap-2 self-start lg:self-auto">
                      <span className="text-xs text-slate-500 shrink-0">服务区域:</span>
                      <div className="relative">
                        <select 
                          id="select-transfer-center-region"
                          value={selectedCityKey}
                          onChange={(e) => {
                            setSelectedCityKey(e.target.value);
                            showToast(`已切换至：${TRANSFER_CENTERS[e.target.value]?.name || '技术转移中心'}`);
                          }}
                          className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2 pr-8 focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer appearance-none transition-colors"
                        >
                          {CITY_OPTIONS.map(c => (
                            <option key={c.key} value={c.key}>
                              {c.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Content Layout */}
                  <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* Left & Center: Real Contact Info & Functions */}
                    <div className="lg:col-span-8 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-600">
                        <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                          <span className="truncate">
                            转化专线: <strong className="text-slate-900 font-mono font-bold">{currentCenter.techTransferPhone}</strong>
                          </span>
                          <button
                            onClick={() => handleCopyText(currentCenter.techTransferPhone, '成果转化专线')}
                            className="ml-auto text-[11px] text-blue-600 font-semibold hover:underline cursor-pointer"
                          >
                            复制
                          </button>
                        </div>

                        <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <PhoneCall className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="truncate">
                            总机/合作: <strong className="text-slate-900 font-mono font-bold">{currentCenter.mainPhone}</strong>
                          </span>
                          <button
                            onClick={() => handleCopyText(currentCenter.mainPhone, '办公电话')}
                            className="ml-auto text-[11px] text-blue-600 font-semibold hover:underline cursor-pointer"
                          >
                            复制
                          </button>
                        </div>

                        <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <Mail className="w-4 h-4 text-indigo-600 shrink-0" />
                          <span className="truncate">
                            受理邮箱: <strong className="text-slate-900 font-mono">{currentCenter.email}</strong>
                          </span>
                          <button
                            onClick={() => handleCopyText(currentCenter.email, '受理邮箱')}
                            className="ml-auto text-[11px] text-blue-600 font-semibold hover:underline cursor-pointer"
                          >
                            复制
                          </button>
                        </div>

                        <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <Building className="w-4 h-4 text-amber-600 shrink-0" />
                          <span className="truncate">
                            对接科室: <strong className="text-slate-900">{currentCenter.department}</strong>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 text-xs text-slate-500 bg-slate-50/70 p-2.5 rounded-xl border border-slate-100">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span><strong>办公地址：</strong>{currentCenter.address}</span>
                      </div>

                      {/* Service Tags */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[11px] text-slate-400 font-medium">支持通道：</span>
                        {currentCenter.serviceTags.map((tag, idx) => (
                          <span key={idx} className="text-[11px] bg-blue-50/70 text-blue-700 px-2 py-0.5 rounded-md border border-blue-100 font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right Action Section */}
                    <div className="lg:col-span-4 flex flex-col justify-center space-y-3 bg-slate-50/80 p-4 rounded-xl border border-slate-200/60">
                      <button
                        id="btn-book-transfer-center"
                        onClick={() => handleOpenBooking()}
                        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Calendar className="w-4 h-4" /> 一键预约吉大经纪人对接
                      </button>

                      <button
                        onClick={() => handleCopyText(currentCenter.techTransferPhone, '转化专线')}
                        className="w-full py-2 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Phone className="w-3.5 h-3.5 text-slate-500" /> 复制转化直通电话
                      </button>

                      <div className="text-[11px] text-slate-500 text-center leading-tight">
                        吉大官方直通 • 闭门答辩 • 中试验证 • 快速签约
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* 全网模式下的指引提示栏 (不展示单一大学转移中心) */
                <div className="bg-gradient-to-r from-blue-50 via-indigo-50/50 to-slate-50 rounded-2xl p-4 sm:p-5 border border-blue-100/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">全网高校成果匹配模式</span>
                        <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[10px] font-bold">跨校成果库</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        当前匹配结果已覆盖全国多所“双一流”高校。点击成果卡片可直接发起对接；如需查看具体大学专属经纪人与就近技术转移中心，请选择进入对应高校专区。
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Match Results Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs relative overflow-hidden">
                {isMatching && (
                  <div className="absolute inset-0 z-10 bg-white/70 backdrop-blur-xs flex flex-col items-center justify-center">
                    <div className="relative w-20 h-20 mb-4">
                      <motion.div 
                        className="absolute inset-0 rounded-full border-4 border-blue-100"
                      />
                      <motion.div 
                        className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-blue-600">
                        <BrainCircuit className="w-8 h-8" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">
                      {isUniversityMode ? 'AI 正在解析吉林大学成果库...' : 'AI 正在深度检索全国高校成果库...'}
                    </h3>
                    <p className="text-slate-500 mt-2 text-sm">
                      {isUniversityMode ? '从吉林大学 40+ 学科院系中为您筛选高契合成果' : '从全国重点高校库中筛选高契合度专利与非专利技术'}
                    </p>
                  </div>
                )}
              
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                      <Search className="w-6 h-6 text-[#0F52BA]" /> 
                      {isUniversityMode ? '吉林大学匹配科技成果清单' : '全国高校跨校匹配科技成果清单'}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      {isUniversityMode 
                        ? '展示仅限吉林大学的专利与非专利技术/成果，支持直联吉大技术转移中心'
                        : '展示涵盖全国重点高校的匹配成果，支持跨校筛选与产学研精准对接'
                      }
                    </p>
                  </div>
                  
                  <span className="px-4 py-1.5 bg-blue-50 text-blue-700 text-sm font-bold rounded-xl border border-blue-100 flex items-center gap-1.5 self-start sm:self-auto">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    {isUniversityMode 
                      ? `匹配到 ${searchResults.length} 项吉林大学科技成果`
                      : `跨校匹配到 ${displayedResults.length} 项科技成果`
                    }
                  </span>
                </div>

                {/* All Universities Mode: Quick University Filter Tabs */}
                {!isUniversityMode && (
                  <div className="flex flex-wrap items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-400 mr-1">高校筛选:</span>
                    {[
                      { key: 'all', label: '全部高校成果' },
                      { key: 'jlu', label: '吉林大学' },
                      { key: 'thu', label: '清华大学' },
                      { key: 'seu', label: '东南大学' },
                      { key: 'hit', label: '哈尔滨工业大学' },
                      { key: 'zju', label: '浙江大学' },
                      { key: 'sjtu', label: '上海交通大学' },
                      { key: 'hhu', label: '河海大学' }
                    ].map(tab => (
                      <button
                        key={tab.key}
                        onClick={() => setSelectedUniFilter(tab.key)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          selectedUniFilter === tab.key
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                )}
                
                <div className="space-y-6">
                  {displayedResults.length === 0 ? (
                    <div className="py-12 text-center text-slate-500">
                      暂无匹配的技术成果，请尝试调整需求描述或高校筛选
                    </div>
                  ) : displayedResults.map((res) => (
                    <motion.div 
                      key={res.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                      className={`border ${res.type === 'patent' ? 'border-blue-100 bg-blue-50/10' : 'border-emerald-100 bg-emerald-50/10'} rounded-2xl p-6 relative overflow-hidden transition-all hover:shadow-md group`}
                    >
                      {/* Accent bar */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${res.type === 'patent' ? 'bg-blue-500' : 'bg-emerald-500'}`} />
                      
                      {res.type === 'knowhow' && (
                        <div className="absolute top-4 right-[-30px] rotate-45 bg-emerald-500 text-white text-[10px] font-bold py-1 w-32 text-center shadow-xs">
                          非专利技术/成果
                        </div>
                      )}
                      
                      <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                              {res.no}
                            </span>
                            {res.universityBadge && (
                              <span className={`text-xs px-2.5 py-0.5 rounded-md font-bold ${
                                res.universityKey === 'jlu' 
                                  ? 'bg-blue-100 text-blue-800' 
                                  : res.universityKey === 'thu'
                                  ? 'bg-purple-100 text-purple-800'
                                  : res.universityKey === 'seu'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : res.universityKey === 'hit'
                                  ? 'bg-amber-100 text-amber-800'
                                  : res.universityKey === 'zju'
                                  ? 'bg-cyan-100 text-cyan-800'
                                  : 'bg-indigo-100 text-indigo-800'
                              }`}>
                                {res.universityBadge}
                              </span>
                            )}
                            <span className="text-xs text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full font-semibold border border-blue-200/50">
                              高价值成果
                            </span>
                          </div>
                          
                          <h3 
                            onClick={() => setSelectedTechForDetail(mapSearchResultToTechDetail(res))}
                            className="text-xl font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors cursor-pointer"
                          >
                            {res.title}
                          </h3>
                          
                          <div className="text-sm text-slate-500 mt-3 flex flex-wrap items-center gap-4">
                            <span className="flex items-center gap-1.5 font-medium">
                              <Building2 className="w-4 h-4 text-slate-400" /> {res.university}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 shrink-0">
                          {/* If in all-universities mode and it's JLU, allow entering JLU zone */}
                          {!isUniversityMode && res.universityKey === 'jlu' && onSelectUniversity && (
                            <button
                              onClick={() => onSelectUniversity('jlu')}
                              className="px-3.5 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl text-xs border border-blue-200 transition-all flex items-center gap-1 cursor-pointer"
                              title="进入吉林大学成果专区"
                            >
                              进入吉大专区 &rarr;
                            </button>
                          )}
                          <button 
                            onClick={() => handleOpenBooking(res)}
                            className={`px-5 py-2.5 text-white font-bold rounded-xl text-sm shadow-xs transition-all hover:shadow-md flex items-center gap-2 cursor-pointer ${res.type === 'patent' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}
                          >
                            <Calendar className="w-4 h-4" /> 
                            {isUniversityMode ? '预约中心对接' : '预约产学研对接'} 
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-slate-600 text-sm leading-relaxed mb-5 bg-white/50 p-4 rounded-xl border border-slate-100/50">
                        {res.description}
                      </p>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-200/60">
                        <div className="flex items-center gap-2">
                          <div className="font-bold text-slate-700 text-sm flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg">
                            <User className="w-4 h-4 text-slate-400" /> {res.inventor.name} <span className="text-slate-400 font-normal">|</span> <span className="text-slate-500 font-normal">{res.inventor.title}</span>
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => setSelectedTechForDetail(mapSearchResultToTechDetail(res))}
                          className="text-sm font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100/80 flex items-center gap-1.5 transition-colors px-4 py-2 rounded-xl border border-blue-200 cursor-pointer shadow-xs hover:shadow-sm"
                        >
                          <FileText className="w-4 h-4 text-blue-600" />
                          查看专利详情与AI建议
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 预约技术转移中心对接弹窗 */}
      <AnimatePresence>
        {showBookingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
            >
              <div className="bg-slate-900 p-5 text-white relative">
                <button 
                  onClick={() => setShowBookingModal(false)}
                  className="absolute right-4 top-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1.5 text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <Building2 className="w-3.5 h-3.5 text-blue-400" />
                  官方产学研对接通道
                </div>
                <h3 className="text-lg font-bold text-white">
                  {isUniversityMode 
                    ? `预约 ${currentCenter.name}`
                    : `预约产学研技术对接（${selectedTechForBooking?.university || '相关高校'}）`
                  }
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  {isUniversityMode 
                    ? `成果转化专线：${currentCenter.techTransferPhone}`
                    : '高校技术转移专班科技经纪人将全程跟进'
                  }
                </p>
              </div>

              {bookingSubmitted ? (
                <div className="p-8 text-center space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">对接需求已提交成功</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                    高校技术转移专员与科研团队将根据工作排期与您取得联系，确认闭门对接研讨安排与技术资料准备。
                  </p>
                  <div className="pt-2">
                    <Loader2 className="w-4 h-4 text-blue-600 animate-spin mx-auto" />
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitBooking} className="p-5 space-y-3.5">
                  {selectedTechForBooking && (
                    <div className="bg-blue-50/80 p-3 rounded-xl border border-blue-200/60 text-xs space-y-1">
                      <div className="text-blue-700 font-bold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> 拟对接成果：
                      </div>
                      <div className="font-bold text-slate-800 text-xs leading-snug">{selectedTechForBooking.title}</div>
                      <div className="text-slate-500 font-mono text-[11px]">{selectedTechForBooking.no} • {selectedTechForBooking.university}</div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">企业全称</label>
                      <input 
                        type="text"
                        required
                        value={bookingFormData.companyName}
                        onChange={(e) => setBookingFormData({...bookingFormData, companyName: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">对接联系人</label>
                      <input 
                        type="text"
                        required
                        value={bookingFormData.contactPerson}
                        onChange={(e) => setBookingFormData({...bookingFormData, contactPerson: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">联系电话</label>
                      <input 
                        type="tel"
                        required
                        value={bookingFormData.contactPhone}
                        onChange={(e) => setBookingFormData({...bookingFormData, contactPhone: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">期望对接形式</label>
                      <select
                        value={bookingFormData.collabMode}
                        onChange={(e) => setBookingFormData({...bookingFormData, collabMode: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-blue-600"
                      >
                        <option value="线上视频技术研讨会">线上闭门技术研讨会</option>
                        <option value="专家进企现场指导">高校专家进企现场指导</option>
                        <option value="来校考察与实验室参观">来校考察与重点实验室参观</option>
                        <option value="专利排他转让/许可商务谈判">专利转让 / 许可商务谈判</option>
                        <option value="校企联合攻关申报专项">校企联合申报科技重大专项</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">需求细节与预期目标</label>
                    <textarea 
                      rows={2}
                      value={bookingFormData.notes}
                      onChange={(e) => setBookingFormData({...bookingFormData, notes: e.target.value})}
                      placeholder="请简要阐述企业目前的具体指标要求或产业化场景..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-blue-600 resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2.5">
                    <button 
                      type="button"
                      onClick={() => setShowBookingModal(false)}
                      className="px-3.5 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 cursor-pointer"
                    >
                      取消
                    </button>
                    <button 
                      type="submit"
                      className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" /> 确认提交预约
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
