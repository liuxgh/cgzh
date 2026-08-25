export interface PatentIntensiveProduct {
  id: string;
  productCode: string; // 备案编号
  productName: string; // 产品名称
  filingEnterprise: string; // 备案企业
  location: string;
  industryCategory: string; // 细分行业门类
  filingYear: string;
  status: '国家认定的专利密集型产品' | '地方重点培育专利密集型产品' | '已备案有效';
  annualOutputValue: string; // 产品年销售额/产值
  corePatentsTotal: number; // 关联企业发明专利数
  productDescription: string;
  keyComponents: string[]; // 关键技术零部件/组件
  jluSynergyPatentField: string; // 匹配吉大优势专利领域
  matchedJluPatentId: string;
  matchedJluPatentTitle: string;
  matchedJluInventor: string;
  matchedJluCollege: string;
  techSynergyDetail: string; // 技术协同与采购转化结合点
  targetEnterpriseId: string;
}

export const PATENT_INTENSIVE_PRODUCTS_DATA: PatentIntensiveProduct[] = [
  {
    id: 'prod-01',
    productCode: 'PIP-2023-CN-09881',
    productName: '神行4C超充动力电池模组系统',
    filingEnterprise: '宁德时代新能源科技股份有限公司',
    location: '福建省宁德市',
    industryCategory: '新能源汽车动力蓄电池制造',
    filingYear: '2023年备案',
    status: '国家认定的专利密集型产品',
    annualOutputValue: '100亿-500亿元',
    corePatentsTotal: 142,
    productDescription: '全球首款采用超电子网正极和石墨快离子环技术的磷酸铁锂4C超充电池，实现“充电10分钟，续航400公里”。',
    keyComponents: ['超高导电单晶正极极片', '快离子环硅碳负极', '超薄抗穿刺功能隔膜', '高压液冷集成托盘'],
    jluSynergyPatentField: '高镍正极材料自组装修饰与固态电解质界面改性',
    matchedJluPatentId: 'jlu-pat-01',
    matchedJluPatentTitle: '一种高镍三元正极材料表面原位自组装导电高分子薄膜修饰方法',
    matchedJluInventor: '崔教授',
    matchedJluCollege: '化学学院 (无机合成与制备化学国家重点实验室)',
    techSynergyDetail: '吉大液相自组装单分子膜技术可进一步降低超充极片界面传质阻抗，使充放电循环热生成率降低28%。',
    targetEnterpriseId: 'ent-catl'
  },
  {
    id: 'prod-02',
    productCode: 'PIP-2023-CN-11029',
    productName: '红旗天工纯电智能底盘平台系统',
    filingEnterprise: '中国第一汽车集团有限公司',
    location: '吉林省长春市',
    industryCategory: '新能源乘用车及智能底盘制造',
    filingYear: '2023年备案',
    status: '国家认定的专利密集型产品',
    annualOutputValue: '100亿-500亿元',
    corePatentsTotal: 88,
    productDescription: '国内首款全自主研发的智能滑板式全线控底盘架构，集成四轮独立电驱、线控转向与主动连续可调阻尼悬架系统。',
    keyComponents: ['四轮独立轮毂/轮边电机', '全冗余线控主动转向机', '仿生主动减震悬架', '中央域控制器(VMC)'],
    jluSynergyPatentField: '线控多轴主动转向与仿生减阻复合车身',
    matchedJluPatentId: 'jlu-pat-02',
    matchedJluPatentTitle: '一种基于仿生多足动物缓冲力学的线控悬架自适应阻尼控制系统',
    matchedJluInventor: '陈教授',
    matchedJluCollege: '汽车工程学院、仿生教育部重点实验室',
    techSynergyDetail: '吉大仿生猫爪缓冲力学与AI路况预瞄控制可使红旗底盘在过坎冲击响应速度提升40%，显著提升乘坐高级感。',
    targetEnterpriseId: 'ent-faw'
  },
  {
    id: 'prod-03',
    productCode: 'PIP-2023-CN-04572',
    productName: '800万像素高动态车载智能驾驶镜头模组',
    filingEnterprise: '舜宇光学科技（集团）有限公司',
    location: '浙江省宁波市',
    industryCategory: '光学仪器与精密元器件制造',
    filingYear: '2023年备案',
    status: '国家认定的专利密集型产品',
    annualOutputValue: '10亿-50亿元',
    corePatentsTotal: 64,
    productDescription: '针对L3/L4高级别自动驾驶的前视感知主摄镜头，具备120米超远探测距离与140dB超高动态范围抗强光眩光能力。',
    keyComponents: ['高折射低色散非球面玻璃镜片', '微纳抗反射超疏水镀膜', '车规级主动对准镜头筒', '高精度温漂补偿机构'],
    jluSynergyPatentField: '超表面微纳透镜消色差与抗极端温差色散镀膜',
    matchedJluPatentId: 'jlu-pat-03',
    matchedJluPatentTitle: '一种工作于-40℃至120℃宽温区的非球面车载镜头消热差无源补偿结构',
    matchedJluInventor: '刘教授',
    matchedJluCollege: '电子科学与工程学院 (集成光电子学国家重点实验室)',
    techSynergyDetail: '吉大无源消热差结构专利能完全替代舜宇当前采用的复杂机械双材料补偿套筒，减少模组零件数30%且成本下降15%。',
    targetEnterpriseId: 'ent-sunny'
  },
  {
    id: 'prod-04',
    productCode: 'PIP-2023-CN-07731',
    productName: '全自动高速化学发光免疫分析流水线系统 (CL-8000i)',
    filingEnterprise: '深圳迈瑞生物医疗电子股份有限公司',
    location: '广东省深圳市',
    industryCategory: '体外诊断设备及试剂制造',
    filingYear: '2023年备案',
    status: '国家认定的专利密集型产品',
    annualOutputValue: '10亿-50亿元',
    corePatentsTotal: 92,
    productDescription: '单机检测速度达500测试/小时的高速全自动化学发光分析仪，支持纳米级微量精准加样与超高敏吖啶酯标记检测。',
    keyComponents: ['超高敏光电倍增管检测模块', '非接触微流控加样针', '恒温温育磁分离反应盘', '高均一性功能化纳米磁珠'],
    jluSynergyPatentField: '超分子荧光探针与声表面波微流控无损混匀',
    matchedJluPatentId: 'jlu-pat-04',
    matchedJluPatentTitle: '一种用于超微量生物体液检测的声表面波微流控芯片快速混匀装置',
    matchedJluInventor: '张教授',
    matchedJluCollege: '化学学院 (超分子结构与材料国家重点实验室)、白求恩医学院',
    techSynergyDetail: '吉大声表面波混匀专利可消除迈瑞仪器目前机械搅拌引起的微气泡干扰，使弱阳性早癌抗原检出灵敏度提升10倍。',
    targetEnterpriseId: 'ent-mindray'
  },
  {
    id: 'prod-05',
    productCode: 'PIP-2023-CN-02108',
    productName: 'KMC系列大型五轴联动立式加工中心',
    filingEnterprise: '科德数控股份有限公司',
    location: '辽宁省大连市',
    industryCategory: '金属切削机床制造 / 高档数控母机',
    filingYear: '2023年备案',
    status: '国家认定的专利密集型产品',
    annualOutputValue: '1亿-5亿元',
    corePatentsTotal: 31,
    productDescription: '拥有自主知识产权的航空航天叶轮、机匣、模具加工高端五轴母机，主轴转速达24000rpm，定位精度达2微米。',
    keyComponents: ['双力矩直驱双摆角数控铣头', '大扭矩高刚性电主轴', 'GNC68高档数控系统', '对称式矿物铸件床身'],
    jluSynergyPatentField: '五轴数控加工进给速度平滑规划与主轴动态热平衡控制',
    matchedJluPatentId: 'jlu-pat-05',
    matchedJluPatentTitle: '一种基于离心力自适应约束的高速五轴曲面加工自适应减振插补算法',
    matchedJluInventor: '孙教授',
    matchedJluCollege: '机械与航空航天工程学院',
    techSynergyDetail: '吉大自适应插补算法可直接集成到科德自主数控系统软核中，加工复杂叶盘表面粗糙度由Ra0.8提升至Ra0.4。',
    targetEnterpriseId: 'ent-kede'
  },
  {
    id: 'prod-06',
    productCode: 'PIP-2023-CN-08819',
    productName: '第6代超薄柔性AMOLED折叠显示屏幕',
    filingEnterprise: '京东方科技集团股份有限公司',
    location: '北京市',
    industryCategory: '半导体显示器件制造',
    filingYear: '2023年备案',
    status: '国家认定的专利密集型产品',
    annualOutputValue: '100亿-500亿元',
    corePatentsTotal: 310,
    productDescription: '行业领先的20万次无痕折叠AMOLED柔性屏幕，广泛应用于折叠旗舰手机、车载卷轴屏及轻薄折叠笔记本。',
    keyComponents: ['超薄柔性玻璃UTG盖板', 'TADF高发光效率有机蒸镀层', 'ALD无机-有机复合薄膜封装(TFE)', '低功耗LTPO背板'],
    jluSynergyPatentField: '高效率蓝光热活化延迟荧光(TADF)材料与水氧阻隔薄膜封装',
    matchedJluPatentId: 'jlu-pat-06',
    matchedJluPatentTitle: '一种基于原子层沉积技术的高阻隔柔性显示器多层复合水氧阻隔封装膜',
    matchedJluInventor: '马院士 / 段教授',
    matchedJluCollege: '化学学院、超分子结构与材料国家重点实验室',
    techSynergyDetail: '吉大ALD复合封装专利将水汽透过率降至10^-6数量级，可显著延长京东方折叠屏在高温高湿环境下的发光像素寿命。',
    targetEnterpriseId: 'ent-boe'
  },
  {
    id: 'prod-07',
    productCode: 'PIP-2023-CN-01994',
    productName: '干喷湿纺高性能PAN基碳纤维(T800级/T1000级)',
    filingEnterprise: '中复神鹰碳纤维股份有限公司',
    location: '江苏省连云港市',
    industryCategory: '高性能纤维及复合材料制造',
    filingYear: '2023年备案',
    status: '国家认定的专利密集型产品',
    annualOutputValue: '10亿-50亿元',
    corePatentsTotal: 28,
    productDescription: '拉伸强度达5.8GPa的大规模量产级T800碳纤维束，广泛应用于大型民用客机机身壁板、高端无人机及压力容器。',
    keyComponents: ['超纯高分子聚丙烯腈原丝', '干喷湿纺高速成形喷丝组件', '高温低氧精准均热碳化炉', '特种改性环氧/热塑浸润剂'],
    jluSynergyPatentField: '特种耐高温聚醚醚酮(PEEK)/聚酰亚胺树脂基体浸润改性',
    matchedJluPatentId: 'jlu-pat-07',
    matchedJluPatentTitle: '一种耐500℃高温特种聚醚醚酮树脂在连续碳纤维表面快速浸润包覆工艺',
    matchedJluInventor: '王教授',
    matchedJluCollege: '化学学院 (特种工程塑料教育部重点实验室)',
    techSynergyDetail: '吉大高分子界面浸润工艺专利解决熔体粘度过高浸润不透的瓶颈，使中复神鹰碳纤维与热塑树脂复材层间剪切强度提升42%。',
    targetEnterpriseId: 'ent-sycarbon'
  },
  {
    id: 'prod-08',
    productCode: 'PIP-2023-CN-03417',
    productName: '东方红LW2604重型轮式智能拖拉机系统',
    filingEnterprise: '第一拖拉机股份有限公司',
    location: '河南省洛阳市',
    industryCategory: '农业机械与动力装备制造',
    filingYear: '2023年备案',
    status: '国家认定的专利密集型产品',
    annualOutputValue: '10亿-50亿元',
    corePatentsTotal: 42,
    productDescription: '配装260马力高压共轨柴油机与动力换挡变速箱的重型大马力拖拉机，支持北斗无人驾驶农田深翻、免耕深松作业。',
    keyComponents: ['动力换挡/无级变速箱总成', '高精度北斗农机自动驾驶仪', '仿生减阻深松耕作犁具', '电液负载敏感提升系统'],
    jluSynergyPatentField: '仿生脱土减阻犁体曲面与耐磨触土刀片制造',
    matchedJluPatentId: 'jlu-pat-08',
    matchedJluPatentTitle: '一种基于蜣螂体表微几何特征的仿生低黏附脱土耕作翻转犁体',
    matchedJluInventor: '任院士 / 佟教授',
    matchedJluCollege: '生物与农业工程学院 (仿生科学与工程教育部重点实验室)',
    techSynergyDetail: '吉大仿生犁铧在东北黑土耕作中阻力下降22%，油耗降低15%，且犁壁完全不挂泥，大幅提升一拖拖拉机作业能效指标。',
    targetEnterpriseId: 'ent-ytogroup'
  }
];
