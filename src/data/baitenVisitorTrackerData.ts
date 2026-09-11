export interface ViewedPatentItem {
  patentNo: string;
  title: string;
  inventor: string;
  college: string;
  ipc: string;
  status: string;
  valuationRange?: string;
  abstractHighlight: string;
}

export interface SearchSession {
  sessionId: string;
  searchKeyword: string;
  searchType: 'direct_keyword' | 'tech_search_jlu_view';
  searchDate: string;
  searchTime: string;
  viewDurationSeconds: number;
  matchedKeywords: string[];
  patents: ViewedPatentItem[];
  aiAnalysis: {
    intentSummary: string; // AI对该搜索词的意图与痛点研判
    techFocus: string; // 关注的核心技术要点
    cooperationOpportunity: string; // 合作转化机会评估
  };
}

export interface BaitenVisitorRecord {
  id: string;
  companyName: string;
  shortName: string;
  creditCode: string;
  city: string;
  province: string;
  industry: string;
  fieldCategory: 'automotive' | 'materials' | 'biomedicine' | 'semiconductor' | 'machinery' | 'cleanenergy';
  fieldName: string;
  searchType: 'direct_keyword' | 'tech_search_jlu_view'; // 主要代表路径
  searchKeyword: string; // 最近/主要检索使用的关键词
  searchDate: string; // 最近检索日期 YYYY-MM-DD
  searchTime: string; // 显示时间
  viewDurationSeconds: number; // 累计/单次停留时长（秒）
  viewCount: number; // 查看吉大专利次数
  viewedPatents: ViewedPatentItem[]; // 全量专利
  matchedKeywords: string[]; // 关联技术关键词
  enterpriseProfileSummary: string; // 企业业务画像与痛点
  suggestedAction: string; // 建议高校老师/转化办采取的下一步
  phone?: string;
  email?: string;
  contactPerson?: string;
  searchSessions?: SearchSession[]; // 多搜索词 Sessions，每个搜索词对应查看的专利及AI分析
}

export const BAITEN_SEARCH_DAILY_LEADS: BaitenVisitorRecord[] = [
  {
    id: 'lead-01',
    companyName: '长城汽车股份有限公司',
    shortName: '长城汽车',
    creditCode: '91130600104888888X',
    city: '保定市',
    province: '河北省',
    industry: '智能新能源整车制造 / 智能线控底盘',
    fieldCategory: 'automotive',
    fieldName: '汽车与智能网联',
    searchType: 'tech_search_jlu_view',
    searchKeyword: '重卡智能线控复合制动 能量回收防滑控制',
    searchDate: '2026-09-10',
    searchTime: '2026-09-10 10:42',
    viewDurationSeconds: 420,
    viewCount: 6,
    viewedPatents: [
      {
        patentNo: 'CN116892341B',
        title: '一种面向智能新能源商用车的线控电液复合制动系统与能量回收控制方法',
        inventor: '高镇海',
        college: '汽车工程学院 / 汽车仿真与控制国家重点实验室',
        ipc: 'B60T 13/74, B60L 7/18',
        status: '有效授权 (维持中)',
        valuationRange: '280万 - 380万元',
        abstractHighlight: '解决重卡在低附着冰雪路面上制动滞后难题，制动距离缩短14.6%，回馈效率提升22.3%。'
      },
      {
        patentNo: 'CN114212398B',
        title: '多轴重型特种电动车分布式电驱防滑转力矩矢量分配算法',
        inventor: '高镇海',
        college: '汽车工程学院',
        ipc: 'B60L 15/20',
        status: '有效授权',
        abstractHighlight: '多轴轮端力矩独立毫秒级调节，提升冰雪泥泞路面脱困能力。'
      },
      {
        patentNo: 'CN115340112B',
        title: '商用车电子机械制动(EMB)执行器快速响应闭环压力伺服控制系统',
        inventor: '高镇海',
        college: '汽车工程学院',
        ipc: 'B60T 8/17',
        status: '有效授权',
        abstractHighlight: '针对干式线控制动EMB夹紧力迟滞非线性问题，实现45ms极速建压。'
      }
    ],
    matchedKeywords: ['线控电液制动', '重卡能量回收', '防滑控制', '毫秒级增压响应', 'ASIL-D安全标准'],
    enterpriseProfileSummary: '长城旗下未势能源与商用车事业部近期正在研发新一代重卡线控滑板底盘，急需极端寒冷工况下的电液制动控制算法。',
    suggestedAction: '建议由高镇海教授团队协同技术转移办，针对其商用车线控底盘研发总监发起闭门技术交流。',
    phone: '0312-2198***',
    email: 'chassis-rd@gwm.cn',
    contactPerson: '底盘电控系统研发部-李工',
    searchSessions: [
      {
        sessionId: 'sess-01-1',
        searchKeyword: '重卡智能线控复合制动 能量回收防滑控制',
        searchType: 'tech_search_jlu_view',
        searchDate: '2026-09-10',
        searchTime: '2026-09-10 10:42',
        viewDurationSeconds: 260,
        matchedKeywords: ['线控电液制动', '重卡能量回收', '低附着路面制动'],
        patents: [
          {
            patentNo: 'CN116892341B',
            title: '一种面向智能新能源商用车的线控电液复合制动系统与能量回收控制方法',
            inventor: '高镇海',
            college: '汽车工程学院 / 汽车仿真与控制国家重点实验室',
            ipc: 'B60T 13/74, B60L 7/18',
            status: '有效授权 (维持中)',
            valuationRange: '280万 - 380万元',
            abstractHighlight: '解决重卡在低附着冰雪路面上制动滞后难题，制动距离缩短14.6%，回馈效率提升22.3%。'
          },
          {
            patentNo: 'CN114212398B',
            title: '多轴重型特种电动车分布式电驱防滑转力矩矢量分配算法',
            inventor: '高镇海',
            college: '汽车工程学院',
            ipc: 'B60L 15/20',
            status: '有效授权',
            abstractHighlight: '多轴轮端力矩独立毫秒级调节，提升冰雪泥泞路面脱困能力。'
          }
        ],
        aiAnalysis: {
          intentSummary: '企业研发工程师正在针对重型新能源商用车低附着工况下的制动控制方案进行前瞻技术调研，重点关注高可靠性的电液复合线控方案。',
          techFocus: '冰雪极寒路面防滑制动响应速度、机电制动力矩协同分配与能量回馈效率。',
          cooperationOpportunity: '吉大高镇海团队在极寒测试场地数据与实车软硬件闭环方面极具壁垒，建议进行算法授权或联合申报重点研发课题。'
        }
      },
      {
        sessionId: 'sess-01-2',
        searchKeyword: '吉林大学 高镇海 EMB线控制动 压力响应',
        searchType: 'direct_keyword',
        searchDate: '2026-09-08',
        searchTime: '2026-09-08 16:15',
        viewDurationSeconds: 160,
        matchedKeywords: ['EMB电子机械制动', '高镇海团队', '压力伺服控制'],
        patents: [
          {
            patentNo: 'CN115340112B',
            title: '商用车电子机械制动(EMB)执行器快速响应闭环压力伺服控制系统',
            inventor: '高镇海',
            college: '汽车工程学院',
            ipc: 'B60T 8/17',
            status: '有效授权',
            abstractHighlight: '针对干式线控制动EMB夹紧力迟滞非线性问题，实现45ms极速建压。'
          }
        ],
        aiAnalysis: {
          intentSummary: '直接搜索高镇海团队名称与EMB专利，说明企业已经知悉吉大在底盘电控领域的权威地位，意图精准获取具体执行机构的控制代码与参数设计。',
          techFocus: '干式EMB执行器非线性摩擦补偿与45ms快速建压控制回路。',
          cooperationOpportunity: '极高。对方已精准定位团队，建议由学院技术转移联络员主动致电长城底盘部安排线上闭门技术研讨。'
        }
      }
    ]
  },
  {
    id: 'lead-02',
    companyName: '维信诺科技股份有限公司',
    shortName: '维信诺',
    creditCode: '91131000727500000Y',
    city: '固安县 / 昆山',
    province: '河北省 / 江苏省',
    industry: '新型半导体显示 / OLED发光材料',
    fieldCategory: 'materials',
    fieldName: '化学与超分子新材料',
    searchType: 'direct_keyword',
    searchKeyword: '吉林大学 超分子蓝光发光材料 马於光',
    searchDate: '2026-09-10',
    searchTime: '2026-09-10 09:18',
    viewDurationSeconds: 560,
    viewCount: 4,
    viewedPatents: [
      {
        patentNo: 'CN116564319B',
        title: '高色纯度热激活延迟荧光(TADF)超分子蓝光发光材料及其OLED器件制备工艺',
        inventor: '马於光',
        college: '化学学院 / 超分子结构与材料国家重点实验室',
        ipc: 'C07D 487/04, H10K 85/60',
        status: '开放许可挂牌中 (45万元/年)',
        valuationRange: '450万 - 600万元',
        abstractHighlight: '突破蓝光TADF材料效率滚降与色纯度瓶颈，半峰宽小于18nm，外量子效率高达33.8%。'
      },
      {
        patentNo: 'CN115011293B',
        title: '一种具有聚集诱导发光特性的深蓝光有机电致发光分子及其合成方法',
        inventor: '马於光',
        college: '化学学院 / 超分子结构与材料国家重点实验室',
        ipc: 'C07C 211/54',
        status: '有效授权',
        abstractHighlight: '抑制固态浓度猝灭，发光量子产率提升至95%以上。'
      }
    ],
    matchedKeywords: ['TADF发光材料', '超分子蓝光', 'OLED蒸镀工艺', '色纯度突破', '效率滚降抑制'],
    enterpriseProfileSummary: '维信诺第6代全柔AMOLED量产线正面临蓝光发光寿命与色纯度国产替代技术攻坚，对吉大成熟中试配方需求极其紧迫。',
    suggestedAction: '直接通过开放许可绿色通道联系维信诺材料采购与前瞻研发部，可快速促成开放许可备案或专利转让。',
    phone: '010-5883***',
    email: 'rd-materials@visionox.com',
    contactPerson: '前瞻材料开发部-王博士',
    searchSessions: [
      {
        sessionId: 'sess-02-1',
        searchKeyword: '吉林大学 超分子蓝光发光材料 马於光',
        searchType: 'direct_keyword',
        searchDate: '2026-09-10',
        searchTime: '2026-09-10 09:18',
        viewDurationSeconds: 380,
        matchedKeywords: ['TADF超分子蓝光', '马於光院士团队', '窄半峰宽高色纯度'],
        patents: [
          {
            patentNo: 'CN116564319B',
            title: '高色纯度热激活延迟荧光(TADF)超分子蓝光发光材料及其OLED器件制备工艺',
            inventor: '马於光',
            college: '化学学院 / 超分子结构与材料国家重点实验室',
            ipc: 'C07D 487/04, H10K 85/60',
            status: '开放许可挂牌中 (45万元/年)',
            valuationRange: '450万 - 600万元',
            abstractHighlight: '突破蓝光TADF材料效率滚降与色纯度瓶颈，半峰宽小于18nm，外量子效率高达33.8%。'
          }
        ],
        aiAnalysis: {
          intentSummary: '企业前瞻材料开发部门针对第六代柔性AMOLED产线国产蓝光发光体寿命短、色纯度差的卡脖子难题，直接锁定吉大马於光教授团队的超分子TADF中试配方。',
          techFocus: '半峰宽小于18nm、高色纯度、低效率滚降的TADF分子合成路径与蒸镀匹配性。',
          cooperationOpportunity: '该专利已挂牌开放许可(45万/年)，具备极高的即时落地转化条件，可直接发起许可备案。'
        }
      },
      {
        sessionId: 'sess-02-2',
        searchKeyword: '深蓝光 OLED 聚集诱导发光 AIE 量产蒸镀',
        searchType: 'tech_search_jlu_view',
        searchDate: '2026-09-07',
        searchTime: '2026-09-07 14:22',
        viewDurationSeconds: 180,
        matchedKeywords: ['深蓝光AIE', '聚集诱导发光', '蒸镀配方'],
        patents: [
          {
            patentNo: 'CN115011293B',
            title: '一种具有聚集诱导发光特性的深蓝光有机电致发光分子及其合成方法',
            inventor: '马於光',
            college: '化学学院 / 超分子结构与材料国家重点实验室',
            ipc: 'C07C 211/54',
            status: '有效授权',
            abstractHighlight: '抑制固态浓度猝灭，发光量子产率提升至95%以上。'
          }
        ],
        aiAnalysis: {
          intentSummary: '从AIE发光机理维度调研替代发光材料，对比不同技术路线在蒸镀产线上的稳定性表现。',
          techFocus: '固态无猝灭、高量子效率深蓝光分子工业化合成与提纯产率。',
          cooperationOpportunity: '可结合上述TADF专利打包提供「深蓝光发光材料专利池组合方案」，提升整体议价空间。'
        }
      }
    ]
  },
  {
    id: 'lead-03',
    companyName: '江苏恒瑞医药股份有限公司',
    shortName: '恒瑞医药',
    creditCode: '91320700704040000Z',
    city: '连云港市',
    province: '江苏省',
    industry: '生物医药 / 靶向抗体与免疫治疗',
    fieldCategory: 'biomedicine',
    fieldName: '生物医药与生命健康',
    searchType: 'tech_search_jlu_view',
    searchKeyword: 'PD-L1/TGF-β 双特异性抗体 实体瘤耐药',
    searchDate: '2026-09-10',
    searchTime: '2026-09-10 11:15',
    viewDurationSeconds: 380,
    viewCount: 3,
    viewedPatents: [
      {
        patentNo: 'CN116239108B',
        title: '一种靶向PD-L1/TGF-β双功能融合蛋白工程化构建体及其在克服耐药肿瘤中的应用',
        inventor: '李晶',
        college: '生命科学学院 / 分子酶学工程教育部重点实验室',
        ipc: 'C07K 19/00, A61P 35/00',
        status: '有效授权',
        valuationRange: '600万 - 850万元',
        abstractHighlight: '双特异阻断免疫抑制微环境，在冷肿瘤模型中促CD8+ T细胞浸润提升3.4倍。'
      }
    ],
    matchedKeywords: ['双特异性抗体', 'PD-L1/TGF-β', '肿瘤免疫耐药', 'CHO表达系统', '高亲和力筛选'],
    enterpriseProfileSummary: '恒瑞在IO双抗研发管线上正在补强克服免疫逃逸和间质纤维化的候选分子靶点。',
    suggestedAction: '建议由李晶教授团队提供完整的体外靶点结合动力学(Biacore)与灵长类预实验药效报告，开展联合申报或专利独占许可谈判。',
    phone: '0518-8546***',
    email: 'bd@hengrui.com',
    contactPerson: '全球BD商务与转化部-陈总监',
    searchSessions: [
      {
        sessionId: 'sess-03-1',
        searchKeyword: 'PD-L1/TGF-β 双特异性抗体 实体瘤耐药',
        searchType: 'tech_search_jlu_view',
        searchDate: '2026-09-10',
        searchTime: '2026-09-10 11:15',
        viewDurationSeconds: 380,
        matchedKeywords: ['双抗融合蛋白', '克服免疫耐药', 'CD8+ T细胞浸润'],
        patents: [
          {
            patentNo: 'CN116239108B',
            title: '一种靶向PD-L1/TGF-β双功能融合蛋白工程化构建体及其在克服耐药肿瘤中的应用',
            inventor: '李晶',
            college: '生命科学学院 / 分子酶学工程教育部重点实验室',
            ipc: 'C07K 19/00, A61P 35/00',
            status: '有效授权',
            valuationRange: '600万 - 850万元',
            abstractHighlight: '双特异阻断免疫抑制微环境，在冷肿瘤模型中促CD8+ T细胞浸润提升3.4倍。'
          }
        ],
        aiAnalysis: {
          intentSummary: '国内创新药龙头企业重点关注第二代肿瘤免疫双抗分子，旨在解决PD-1/PD-L1单药在富含纤维化基质的冷肿瘤中无应答的临床痛点。',
          techFocus: 'TGF-β受体陷阱(trap)与PD-L1抗体融合分子的空间稳定性与表达产率。',
          cooperationOpportunity: '具有重磅药物管线合作潜力，建议由科技处协助团队准备药效与工艺流转报告，开展独占许可商业谈判。'
        }
      }
    ]
  },
  {
    id: 'lead-04',
    companyName: '宁德时代电机科技有限公司',
    shortName: '宁德电机',
    creditCode: '91350900MA348U3G8P',
    city: '宁德市',
    province: '福建省',
    industry: '新能源汽车 / 核心零部件与电驱系统',
    fieldCategory: 'cleanenergy',
    fieldName: '清洁能源与先进储能',
    searchType: 'direct_keyword',
    searchKeyword: '吉林大学 固态电池复合电解质膜 界面阻抗',
    searchDate: '2026-09-09',
    searchTime: '2026-09-09 17:35',
    viewDurationSeconds: 490,
    viewCount: 5,
    viewedPatents: [
      {
        patentNo: 'CN115934502B',
        title: '基于原位聚合交联的高离子电导率全固态锂金属电池复合电解质膜制备方法',
        inventor: '杜菲',
        college: '材料科学与工程学院 / 汽车材料教育部重点实验室',
        ipc: 'H01M 10/0565, H01M 10/052',
        status: '有效授权',
        valuationRange: '350万 - 500万元',
        abstractHighlight: '室温离子电导率突破1.8×10⁻³ S/cm，彻底抑制锂枝晶生长，循环超1500圈容量保持率92.4%。'
      },
      {
        patentNo: 'CN114883492B',
        title: '一种原位生成超薄富LiF固态电解质界面膜的锂电池正极修饰工艺',
        inventor: '杜菲',
        college: '材料科学与工程学院',
        ipc: 'H01M 4/13',
        status: '有效授权',
        abstractHighlight: '正极界面阻抗降低46%，有效抑制高电压正极相变。'
      }
    ],
    matchedKeywords: ['全固态电池', '原位聚合', '高离子电导率', '锂枝晶抑制', '软包电池试制'],
    enterpriseProfileSummary: '宁德时代全力攻关全固态电池量产线，正大范围物色高校高导电、低阻抗复合膜专利组合。',
    suggestedAction: '推荐杜菲教授团队与宁德时代21C创新实验室固态电解质所对接，洽谈专利技术作价入股或排他实施许可。',
    phone: '0593-8901***',
    email: 'solidstate-tech@catl.com',
    contactPerson: '前沿储能材料研究院-张首席科学家',
    searchSessions: [
      {
        sessionId: 'sess-04-1',
        searchKeyword: '吉林大学 固态电池复合电解质膜 界面阻抗',
        searchType: 'direct_keyword',
        searchDate: '2026-09-09',
        searchTime: '2026-09-09 17:35',
        viewDurationSeconds: 310,
        matchedKeywords: ['原位聚合电解质', '全固态金属锂', '高离子电导率'],
        patents: [
          {
            patentNo: 'CN115934502B',
            title: '基于原位聚合交联的高离子电导率全固态锂金属电池复合电解质膜制备方法',
            inventor: '杜菲',
            college: '材料科学与工程学院 / 汽车材料教育部重点实验室',
            ipc: 'H01M 10/0565, H01M 10/052',
            status: '有效授权',
            valuationRange: '350万 - 500万元',
            abstractHighlight: '室温离子电导率突破1.8×10⁻³ S/cm，彻底抑制锂枝晶生长，循环超1500圈容量保持率92.4%。'
          }
        ],
        aiAnalysis: {
          intentSummary: '锂电霸主宁德时代针对全固态电池中聚合物-无机复合电解质膜界面阻抗过高的共性技术难题，直接检索吉大材料学院杜菲教授专利成果。',
          techFocus: '室温1.8×10⁻³ S/cm电导率、原位交联降低界面固-固接触阻抗的机理与干法涂布适应性。',
          cooperationOpportunity: '宁德时代21C创新实验室具备充沛产学研经费，建议联合开展GWh量产线适应性测试项目。'
        }
      },
      {
        sessionId: 'sess-04-2',
        searchKeyword: '超薄固态电解质界面膜 正极相变抑制',
        searchType: 'tech_search_jlu_view',
        searchDate: '2026-09-05',
        searchTime: '2026-09-05 10:18',
        viewDurationSeconds: 180,
        matchedKeywords: ['富LiF界面膜', '正极包覆', '高电压防衰减'],
        patents: [
          {
            patentNo: 'CN114883492B',
            title: '一种原位生成超薄富LiF固态电解质界面膜的锂电池正极修饰工艺',
            inventor: '杜菲',
            college: '材料科学与工程学院',
            ipc: 'H01M 4/13',
            status: '有效授权',
            abstractHighlight: '正极界面阻抗降低46%，有效抑制高电压正极相变。'
          }
        ],
        aiAnalysis: {
          intentSummary: '寻找高镍及超高电压正极界面改性方案，确保固态电池在高电压下不产气、不脱金属离子。',
          techFocus: '纳米级原位氟化包覆工艺，降低界面电荷转移阻抗。',
          cooperationOpportunity: '可与上述固态电解质专利组成正极修饰+电解质一体化方案，向宁德时代做整体成果推荐。'
        }
      }
    ]
  },
  {
    id: 'lead-05',
    companyName: '北方华创科技集团股份有限公司',
    shortName: '北方华创',
    creditCode: '91110000722600000R',
    city: '北京市',
    province: '北京市',
    industry: '集成电路制造装备 / ICP等离子体刻蚀',
    fieldCategory: 'semiconductor',
    fieldName: '集成电路与芯片装备',
    searchType: 'tech_search_jlu_view',
    searchKeyword: '高深宽比硅通孔 ICP刻蚀 射频偏压匹配',
    searchDate: '2026-09-09',
    searchTime: '2026-09-09 15:20',
    viewDurationSeconds: 320,
    viewCount: 3,
    viewedPatents: [
      {
        patentNo: 'CN116129482B',
        title: '一种用于三维三维TSV高深宽比硅微结构的高均匀性ICP深反应离子刻蚀工艺',
        inventor: '宋大鹏',
        college: '电子科学与工程学院 / 集成光电子学国家重点实验室',
        ipc: 'H01L 21/3065, H01L 21/768',
        status: '有效授权',
        valuationRange: '320万 - 450万元',
        abstractHighlight: '在深宽比大于35:1的TSV微孔中实现侧壁角度89.7°±0.2°，无钻蚀与扇形波纹缺陷。'
      }
    ],
    matchedKeywords: ['TSV硅通孔', '高深宽比刻蚀', 'ICP反应离子', '微纳制造', '3D先进封装'],
    enterpriseProfileSummary: '北方华创在3D先进封装微孔刻蚀机量产测试中，需要高校在工艺配方数据库与腔体射频场仿真方面的积累。',
    suggestedAction: '可联合申报国家重大科技专项，并邀请北方华创封装刻蚀事业部到吉大集成光电子国重室进行工艺流片验证。',
    phone: '010-5616***',
    email: 'equip-coop@naura.com',
    contactPerson: '刻蚀机产品线战略合作处-孙处长',
    searchSessions: [
      {
        sessionId: 'sess-05-1',
        searchKeyword: '高深宽比硅通孔 ICP刻蚀 射频偏压匹配',
        searchType: 'tech_search_jlu_view',
        searchDate: '2026-09-09',
        searchTime: '2026-09-09 15:20',
        viewDurationSeconds: 320,
        matchedKeywords: ['TSV深孔刻蚀', '等离子体射频匹配', '侧壁形貌控制'],
        patents: [
          {
            patentNo: 'CN116129482B',
            title: '一种用于三维三维TSV高深宽比硅微结构的高均匀性ICP深反应离子刻蚀工艺',
            inventor: '宋大鹏',
            college: '电子科学与工程学院 / 集成光电子学国家重点实验室',
            ipc: 'H01L 21/3065, H01L 21/768',
            status: '有效授权',
            valuationRange: '320万 - 450万元',
            abstractHighlight: '在深宽比大于35:1的TSV微孔中实现侧壁角度89.7°±0.2°，无钻蚀与扇形波纹缺陷。'
          }
        ],
        aiAnalysis: {
          intentSummary: '半导体装备龙头北方华创针对先进算力芯片2.5D/3D Chiplet封装中的高深宽比TSV硅通孔刻蚀设备，调研工艺配方优化专利。',
          techFocus: '35:1深宽比下的侧壁倾角控制、抑制微草效应与气体脉冲流量配比。',
          cooperationOpportunity: '北方华创急需高校成熟工艺库导入其设备端，适宜共建「刻蚀工艺验证联合实验室」。'
        }
      }
    ]
  },
  {
    id: 'lead-06',
    companyName: '沈阳新松机器人自动化股份有限公司',
    shortName: '新松机器人',
    creditCode: '91210100701500000M',
    city: '沈阳市',
    province: '辽宁省',
    industry: '高端装备制造 / 重载特种仿生机器人',
    fieldCategory: 'machinery',
    fieldName: '高端装备与仿生制造',
    searchType: 'direct_keyword',
    searchKeyword: '吉林大学 仿生足式机器人 任露泉院士团队 地形自适应',
    searchDate: '2026-09-08',
    searchTime: '2026-09-08 14:05',
    viewDurationSeconds: 410,
    viewCount: 4,
    viewedPatents: [
      {
        patentNo: 'CN115812903B',
        title: '仿动物蹄趾微结构的重载足式机器人高缓冲柔性足端及步态稳定控制系统',
        inventor: '任露泉',
        college: '工程仿生国家地方联合工程实验室 / 仿生科学与工程学院',
        ipc: 'B25J 9/16, B62D 57/028',
        status: '有效授权',
        valuationRange: '400万 - 550万元',
        abstractHighlight: '借鉴岩羊与雪豹足底微纳米结构，抗冲击缓冲性能提升42%，冰面与松软沙地滑移率降低38%。'
      }
    ],
    matchedKeywords: ['仿生足端', '重载足式机器人', '地形自适应', '抗冲击缓冲', '特种特种巡检装备'],
    enterpriseProfileSummary: '新松正在研制面向高寒边防与油气管道越野巡检的重载特种四足机器人，吉大的仿生足端力学与材料处于国内顶尖。',
    suggestedAction: '建议推动建立「吉大-新松高端仿生机器人联合创新中心」，共同承接国家应急管理部与能源巡检重大装备订单。',
    phone: '024-3161***',
    email: 'bionic-robot@siasun.com',
    contactPerson: '特种机器人事业部-周总工',
    searchSessions: [
      {
        sessionId: 'sess-06-1',
        searchKeyword: '吉林大学 仿生足式机器人 任露泉院士团队 地形自适应',
        searchType: 'direct_keyword',
        searchDate: '2026-09-08',
        searchTime: '2026-09-08 14:05',
        viewDurationSeconds: 410,
        matchedKeywords: ['仿生足端缓冲', '任露泉院士团队', '越野自适应步态'],
        patents: [
          {
            patentNo: 'CN115812903B',
            title: '仿动物蹄趾微结构的重载足式机器人高缓冲柔性足端及步态稳定控制系统',
            inventor: '任露泉',
            college: '工程仿生国家地方联合工程实验室 / 仿生科学与工程学院',
            ipc: 'B25J 9/16, B62D 57/028',
            status: '有效授权',
            valuationRange: '400万 - 550万元',
            abstractHighlight: '借鉴岩羊与雪豹足底微纳米结构，抗冲击缓冲性能提升42%，冰面与松软沙地滑移率降低38%。'
          }
        ],
        aiAnalysis: {
          intentSummary: '特种机器人事业部针对北方高寒极地与恶劣油气管道巡检场景，精准查阅任露泉院士团队仿生足端专利，寻求解决机身剧烈颠簸与打滑倾覆问题。',
          techFocus: '多层梯度缓冲材料复合、岩羊蹄部仿生微结构与实时接触力感知。',
          cooperationOpportunity: '东北本土高端装备名企，与吉大仿生国地联合工程实验室地理相近，极易促成重大横向研发合作。'
        }
      }
    ]
  },
  {
    id: 'lead-07',
    companyName: '吉利汽车集团研究院 (宁波吉利汽车研究开发有限公司)',
    shortName: '吉利汽车',
    creditCode: '91330201750300000W',
    city: '宁波市 / 杭州市',
    province: '浙江省',
    industry: '新能源智能网联汽车 / 底盘线控集成',
    fieldCategory: 'automotive',
    fieldName: '汽车与智能网联',
    searchType: 'tech_search_jlu_view',
    searchKeyword: '商用车分布式驱动 轮边电机矢量力矩控制',
    searchDate: '2026-09-07',
    searchTime: '2026-09-07 16:10',
    viewDurationSeconds: 280,
    viewCount: 3,
    viewedPatents: [
      {
        patentNo: 'CN116892341B',
        title: '一种面向智能新能源商用车的线控电液复合制动系统与能量回收控制方法',
        inventor: '高镇海',
        college: '汽车工程学院',
        ipc: 'B60T 13/74',
        status: '有效授权',
        abstractHighlight: '高湿低附着冰雪路面制动控制与能量回收。'
      }
    ],
    matchedKeywords: ['分布式电驱动', '矢量力矩控制', '商用车线控底盘', '湿滑路面防抱死'],
    enterpriseProfileSummary: '吉利远程新能源商用车集团正在加速星瀚H与重卡超级滑板底盘的量产测试。',
    suggestedAction: '可对接吉利远程商用车研究院动力底盘部，推送高镇海教授团队最新实车极寒测试数据包。',
    phone: '0574-8888***',
    email: 'chassis-rd@geely.com',
    contactPerson: '商用车研究院-赵主任',
    searchSessions: [
      {
        sessionId: 'sess-07-1',
        searchKeyword: '商用车分布式驱动 轮边电机矢量力矩控制',
        searchType: 'tech_search_jlu_view',
        searchDate: '2026-09-07',
        searchTime: '2026-09-07 16:10',
        viewDurationSeconds: 280,
        matchedKeywords: ['分布式轮边驱动', '矢量力矩分配', '防抱死复合制动'],
        patents: [
          {
            patentNo: 'CN116892341B',
            title: '一种面向智能新能源商用车的线控电液复合制动系统与能量回收控制方法',
            inventor: '高镇海',
            college: '汽车工程学院',
            ipc: 'B60T 13/74',
            status: '有效授权',
            abstractHighlight: '高湿低附着冰雪路面制动控制与能量回收。'
          }
        ],
        aiAnalysis: {
          intentSummary: '吉利商用车研究院在研发重卡分布式电驱动架构时，检索并调阅吉大在多轴差动制动与力矩矢量控制方面的专利。',
          techFocus: '多轴轮边电机制动力矩协同与复杂路况稳定性控制。',
          cooperationOpportunity: '吉利远程新能源商用车正在扩大研发外协，建议重点对接杭州/宁波商用车底盘线控组。'
        }
      }
    ]
  },
  {
    id: 'lead-08',
    companyName: '京东方科技集团股份有限公司 (BOE)',
    shortName: '京东方',
    creditCode: '91110000101100000K',
    city: '北京市 / 成都市',
    province: '北京市',
    industry: '半导体显示器件 / Micro-OLED与柔性显示',
    fieldCategory: 'materials',
    fieldName: '化学与超分子新材料',
    searchType: 'tech_search_jlu_view',
    searchKeyword: '有机发光材料 蓝光寿命衰减 超分子组装',
    searchDate: '2026-09-06',
    searchTime: '2026-09-06 11:30',
    viewDurationSeconds: 360,
    viewCount: 4,
    viewedPatents: [
      {
        patentNo: 'CN116564319B',
        title: '高色纯度热激活延迟荧光(TADF)超分子蓝光发光材料及其OLED器件制备工艺',
        inventor: '马於光',
        college: '化学学院 / 超分子结构与材料国家重点实验室',
        ipc: 'C07D 487/04',
        status: '开放许可挂牌中',
        abstractHighlight: '超分子组装构筑高空间刚性基团，显著抑制三重态-三重态湮灭导致的蓝光发光猝灭。'
      }
    ],
    matchedKeywords: ['有机蓝光寿命', '超分子组装', 'OLED发光层', '升华提纯工艺', '器件寿命衰减抑制'],
    enterpriseProfileSummary: '京东方B12柔性屏基地对解决车载与折叠屏蓝光像素衰减问题有强烈技术改造需求。',
    suggestedAction: '组织吉大化学学院超分子团队与京东方中央研究院材料研究所开展线上交流专场。',
    phone: '010-6431***',
    email: 'rd-mat@boe.com.cn',
    contactPerson: '中央研究院材料研究所-刘博士',
    searchSessions: [
      {
        sessionId: 'sess-08-1',
        searchKeyword: '有机发光材料 蓝光寿命衰减 超分子组装',
        searchType: 'tech_search_jlu_view',
        searchDate: '2026-09-06',
        searchTime: '2026-09-06 11:30',
        viewDurationSeconds: 360,
        matchedKeywords: ['蓝光寿命衰减', '超分子组装', '抑制三重态猝灭'],
        patents: [
          {
            patentNo: 'CN116564319B',
            title: '高色纯度热激活延迟荧光(TADF)超分子蓝光发光材料及其OLED器件制备工艺',
            inventor: '马於光',
            college: '化学学院 / 超分子结构与材料国家重点实验室',
            ipc: 'C07D 487/04',
            status: '开放许可挂牌中',
            abstractHighlight: '超分子组装构筑高空间刚性基团，显著抑制三重态-三重态湮灭导致的蓝光发光猝灭。'
          }
        ],
        aiAnalysis: {
          intentSummary: '全球显示巨头京东方中央研究院针对柔性折叠屏长时间使用后蓝光像素快速衰减的瓶颈问题，调阅吉大超分子空间刚性组装专利。',
          techFocus: '抑制三重态-三重态湮灭(TTA)、延长蓝光器件LT95寿命。',
          cooperationOpportunity: '京东方拥有开放型联合创新基金，可申请企业资助的前瞻联合研发课题。'
        }
      }
    ]
  },
  {
    id: 'lead-09',
    companyName: '中芯国际集成电路制造有限公司',
    shortName: '中芯国际',
    creditCode: '913100007178592634',
    city: '上海市',
    province: '上海市',
    industry: '集成电路制造 / 晶圆代工与光电子器件',
    fieldCategory: 'semiconductor',
    fieldName: '集成电路与芯片装备',
    searchType: 'direct_keyword',
    searchKeyword: '吉林大学 硅基光电子 调制器 集成光电子国重室',
    searchDate: '2026-09-04',
    searchTime: '2026-09-04 15:40',
    viewDurationSeconds: 390,
    viewCount: 4,
    viewedPatents: [
      {
        patentNo: 'CN115201823B',
        title: '一种硅基混合集成超高速电光调制器芯片结构及其制备方法',
        inventor: '陈岐岱',
        college: '电子科学与工程学院 / 集成光电子学国家重点实验室',
        ipc: 'G02F 1/015, H01S 5/026',
        status: '有效授权',
        valuationRange: '500万 - 700万元',
        abstractHighlight: '3dB电光调制带宽突破110GHz，兼容标准8英寸CMOS代工产线工艺。'
      }
    ],
    matchedKeywords: ['硅光芯片', '电光调制器', 'CMOS兼容工艺', '超高速光互连'],
    enterpriseProfileSummary: '中芯国际先进工艺光互连晶圆制造线正在评估国内高校硅光流片专利组合。',
    suggestedAction: '可对接中芯国际先进工艺光电集成研发组，进行工艺流片与专利授权合作。',
    phone: '021-3861***',
    email: 'silicon-photonics@smics.com',
    contactPerson: '特色工艺技术部-吴总监',
    searchSessions: [
      {
        sessionId: 'sess-09-1',
        searchKeyword: '吉林大学 硅基光电子 调制器 集成光电子国重室',
        searchType: 'direct_keyword',
        searchDate: '2026-09-04',
        searchTime: '2026-09-04 15:40',
        viewDurationSeconds: 390,
        matchedKeywords: ['硅基光电子', '超高速调制器', 'CMOS流片兼容'],
        patents: [
          {
            patentNo: 'CN115201823B',
            title: '一种硅基混合集成超高速电光调制器芯片结构及其制备方法',
            inventor: '陈岐岱',
            college: '电子科学与工程学院 / 集成光电子学国家重点实验室',
            ipc: 'G02F 1/015, H01S 5/026',
            status: '有效授权',
            valuationRange: '500万 - 700万元',
            abstractHighlight: '3dB电光调制带宽突破110GHz，兼容标准8英寸CMOS代工产线工艺。'
          }
        ],
        aiAnalysis: {
          intentSummary: '中芯国际特色工艺部直接搜索吉大集成光电子国重室，评估其硅光调制器芯片设计在8英寸CMOS产线上的工艺流片可行性。',
          techFocus: '110GHz超高调制带宽与低驱动电压(Vpi)设计。',
          cooperationOpportunity: '适宜达成产线流片授权与PDK工艺包联合开发协议。'
        }
      }
    ]
  },
  {
    id: 'lead-10',
    companyName: '先导智能装备股份有限公司',
    shortName: '先导智能',
    creditCode: '91320200739400000T',
    city: '无锡市',
    province: '江苏省',
    industry: '高端装备制造 / 固态电池涂布与叠片设备',
    fieldCategory: 'machinery',
    fieldName: '高端装备与仿生制造',
    searchType: 'tech_search_jlu_view',
    searchKeyword: '固态电池干法电极 辊压成膜 张力自适应控制',
    searchDate: '2026-09-02',
    searchTime: '2026-09-02 09:30',
    viewDurationSeconds: 430,
    viewCount: 5,
    viewedPatents: [
      {
        patentNo: 'CN115934502B',
        title: '基于原位聚合交联的高离子电导率全固态锂金属电池复合电解质膜制备方法',
        inventor: '杜菲',
        college: '材料科学与工程学院',
        ipc: 'H01M 10/0565',
        status: '有效授权',
        abstractHighlight: '原位交联干法工艺与高精度温度-张力耦合辊压成膜机制。'
      }
    ],
    matchedKeywords: ['干法电极', '辊压成膜', '固态电池装备', '微张力自适应'],
    enterpriseProfileSummary: '先导智能在开发下一代全固态电池干法电极整线装备，需要高校在原位成膜机理方面的理论支持。',
    suggestedAction: '建议组织机械与材料学院联合团队与先导智能中央研究院对接产学研联合攻关。',
    phone: '0510-8116***',
    email: 'rd-equip@leadchina.cn',
    contactPerson: '固态装备研究所-钱院长',
    searchSessions: [
      {
        sessionId: 'sess-10-1',
        searchKeyword: '固态电池干法电极 辊压成膜 张力自适应控制',
        searchType: 'tech_search_jlu_view',
        searchDate: '2026-09-02',
        searchTime: '2026-09-02 09:30',
        viewDurationSeconds: 430,
        matchedKeywords: ['固态干法电极', '辊压成膜', '原位交联机理'],
        patents: [
          {
            patentNo: 'CN115934502B',
            title: '基于原位聚合交联的高离子电导率全固态锂金属电池复合电解质膜制备方法',
            inventor: '杜菲',
            college: '材料科学与工程学院',
            ipc: 'H01M 10/0565',
            status: '有效授权',
            abstractHighlight: '原位交联干法工艺与高精度温度-张力耦合辊压成膜机制。'
          }
        ],
        aiAnalysis: {
          intentSummary: '全球新能源装备龙头先导智能正在突破全固态电池干法连续辊压成膜整线装备，重点调研成膜温度场与高分子原位交联动力学。',
          techFocus: '干法薄膜厚度均匀度控制、张力自适应闭环与辊压缺陷消除。',
          cooperationOpportunity: '先导智能装备转化意愿强，可就成膜工艺机理模型开展横向委托开发。'
        }
      }
    ]
  }
];
