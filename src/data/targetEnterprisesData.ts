import { TargetEnterprise } from '../types';

export const TARGET_ENTERPRISES_DATA: TargetEnterprise[] = [
  {
    "id": "ent-catl",
    "name": "宁德时代电机科技有限公司",
    "shortName": "宁德电机",
    "creditCode": "91350900MA348U3G8P",
    "registeredCapital": "150,000 万元人民币",
    "location": "福建省宁德市",
    "province": "福建省",
    "city": "宁德市",
    "industry": "新能源汽车 / 核心零部件与电驱系统",
    "scale": "上市企业控股",
    "enterpriseType": "上市企业",
    "revenue": "389.2 亿元 (2024)",
    "rdInvestment": "38.5 百万元",
    "rdRatio": "9.89%",
    "patentTotalCount": 3820,
    "inventionPatentCount": 2190,
    "legalRep": "曾毓群",
    "address": "福建省宁德市蕉城区漳湾镇新港路2号",
    "phone": "0593-8901234",
    "email": "tech-coop@catl.com",
    "website": "https://www.catl.com",
    "establishedDate": "2017-03-15",
    "businessScope": "新能源汽车电驱动系统、高效永磁同步电机、电机控制器、储能系统集成研发、制造与销售。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 98,
    "synergyReason": "宁德电机在高功率密度电机与能量回收电控处于行业前列，急需吉大线控电液复合制动在极端工况下的协同制动控制算法。",
    "chainPosition": {
      "chainId": "chain-2",
      "chainName": "新能源汽车",
      "node": "upstream",
      "nodeName": "上游 • 核心材料与关键部件",
      "subSegment": "高功率电驱动电机与核心电控系统",
      "mainProducts": [
        "高压碳化硅电驱动总成",
        "高功率永磁电机",
        "电驱控制器"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN115829103B",
        "title": "一种电动车辆电液复合制动能量回收自适应控制方法及系统",
        "ipc": "B60T 8/17, B60L 15/20",
        "grantDate": "2024-03-12",
        "similarityScore": 96,
        "abstract": "本发明公开了一种电动车辆电液复合制动能量回收自适应控制方法及系统，涉及新能源车辆制动控制技术领域。该方法通过实时采集车速、轮速、制动踏板行程及电池SOC状态，利用自适应模糊控制算法动态分配电机再生制动力矩与机械液压制动力矩，在保障车辆制动平顺性与行车安全性的前提下，最大化制动动能回馈效率，使综合能量回收率提升15%以上。",
        "techOverlapDescription": "均涉及电液复合制动力矩精确解耦与高回收率能量管理控制算法，技术路线重合度达96%。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-CATL-001",
        "productName": "新能源汽车高集成度电液复合电驱动总成",
        "filingYear": "2024",
        "productCategory": "新能源汽车关键零部件",
        "annualOutputValue": "28.5 亿元",
        "corePatentCount": 18,
        "patentSynergyPoint": "可无缝对接吉大线控复合制动控制算法，优化电机回馈与液压协同响应"
      }
    ]
  },
  {
    "id": "ent-faw",
    "name": "中国第一汽车集团有限公司",
    "shortName": "中国一汽",
    "creditCode": "91220101123999528G",
    "registeredCapital": "3,540,000 万元人民币",
    "location": "吉林省长春市",
    "province": "吉林省",
    "city": "长春市",
    "industry": "新能源汽车 / 整车制造与系统集成",
    "scale": "央企龙头",
    "enterpriseType": "行业龙头国企",
    "revenue": "6,200 亿元 (2024)",
    "rdInvestment": "185.0 亿元",
    "rdRatio": "2.98%",
    "patentTotalCount": 15400,
    "inventionPatentCount": 8900,
    "legalRep": "邱现东",
    "address": "吉林省长春市汽车经济技术开发区东风大街2259号",
    "phone": "0431-85731114",
    "email": "rd-cooperation@faw.com.cn",
    "website": "https://www.faw.com.cn",
    "establishedDate": "1953-07-15",
    "businessScope": "汽车、智能网联汽车、新能源汽车、底盘及关键零部件的研发、制造、销售与技术服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 97,
    "synergyReason": "一汽红旗与解放新能源重卡全面推进线控底盘与智能制动技术升级，与吉大同城合作具备极高落地转化优势。",
    "chainPosition": {
      "chainId": "chain-2",
      "chainName": "新能源汽车",
      "node": "downstream",
      "nodeName": "下游 • 整车制造与系统集成",
      "subSegment": "新能源商用车与乘用车整车制造",
      "mainProducts": [
        "红旗智能新能源乘用车",
        "解放智能重卡",
        "新能源商用车线控底盘"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN114751892B",
        "title": "一种商用车线控电液复合制动系统压力协调控制方法",
        "ipc": "B60T 13/74, B60T 8/32",
        "grantDate": "2023-11-08",
        "similarityScore": 95,
        "abstract": "本发明公开了一种商用车线控电液复合制动系统压力协调控制方法，属于智能商用车底盘控制技术领域。通过构建主缸主动增压与轮缸快速建压的双闭环控制模型，有效克服了传统气压/液压制动系统建压响应滞后的缺陷，实现了制动踏板解耦与高精度紧急制动防抱死控制，大幅缩短制动距离并提升行驶稳定性。",
        "techOverlapDescription": "均聚焦商用车线控电液制动建压控制与主被动安全响应协调，契合度极高。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-FAW-002",
        "productName": "解放J7高端智能网联新能源重型商用车",
        "filingYear": "2024",
        "productCategory": "智能网联新能源汽车整车",
        "annualOutputValue": "95.0 亿元",
        "corePatentCount": 42,
        "patentSynergyPoint": "吉大线控技术可直接导入解放新能源重卡线控底盘研发管线"
      }
    ]
  },
  {
    "id": "ent-bethel",
    "name": "芜湖伯特利汽车安全系统股份有限公司",
    "shortName": "伯特利",
    "creditCode": "913402007627885481",
    "registeredCapital": "41,200 万元人民币",
    "location": "安徽省芜湖市",
    "province": "安徽省",
    "city": "芜湖市",
    "industry": "新能源汽车 / 底盘线控与制动系统",
    "scale": "上市公司",
    "enterpriseType": "上市企业",
    "revenue": "86.4 亿元 (2024)",
    "rdInvestment": "6.2 亿元",
    "rdRatio": "7.18%",
    "patentTotalCount": 1450,
    "inventionPatentCount": 680,
    "legalRep": "袁永彬",
    "address": "安徽省芜湖市经济技术开发区泰山路19号",
    "phone": "0553-5681168",
    "email": "ir@wbwb.cn",
    "website": "https://www.wbwb.cn",
    "establishedDate": "2004-06-11",
    "businessScope": "汽车制动系统、电子机械制动（EMB）、线控制动系统（One-Box/Two-Box）、智能驾驶执行机构的研发、制造与销售。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "similar_patent",
    "matchScore": 96,
    "synergyReason": "国内线控制动(WCBS)领军企业，正在突破下一代全电EMB与商用车电液复合制动系统，与吉大专利高度互补。",
    "chainPosition": {
      "chainId": "chain-2",
      "chainName": "新能源汽车",
      "node": "midstream",
      "nodeName": "中游 • 精密制造与模块总成",
      "subSegment": "线控制动(IBS/WCBS)与线控底盘执行系统",
      "mainProducts": [
        "WCBS线控制动系统",
        "电子驻车制动系统EPB",
        "智能电液制动总成"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN116238491B",
        "title": "一种集成式线控制动系统主缸液压主动调节与故障容错控制方法",
        "ipc": "B60T 7/04, B60T 17/22",
        "grantDate": "2024-06-18",
        "similarityScore": 94,
        "abstract": "本发明公开了一种集成式线控制动系统主缸液压主动调节与故障容错控制方法，属于智能车辆主动安全控制技术领域。该方法在主传感器失效或电机异常状态下，自动切换至多模态备用液压建压回路，保证基础制动力不丢失，并在毫秒级完成踏板感反馈补偿与轮端制动压力精确控制。",
        "techOverlapDescription": "均涉及线控制动主动建压控制、制动意图解析与电液失效容错控制。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-BETHEL-001",
        "productName": "WCBS集成式线控电子制动系统",
        "filingYear": "2024",
        "productCategory": "汽车线控制动系统",
        "annualOutputValue": "21.3 亿元",
        "corePatentCount": 26,
        "patentSynergyPoint": "可将吉大电液复合能量回收算法集成至其第二代WCBS控制器中"
      }
    ]
  },
  {
    "id": "ent-huayu",
    "name": "华域汽车系统股份有限公司",
    "shortName": "华域汽车",
    "creditCode": "913100001322105445",
    "registeredCapital": "315,272 万元人民币",
    "location": "上海市浦东新区",
    "province": "上海市",
    "city": "上海市",
    "industry": "新能源汽车 / 智能底盘与传动系统",
    "scale": "上市公司",
    "enterpriseType": "上市企业",
    "revenue": "1,680 亿元 (2024)",
    "rdInvestment": "68.0 亿元",
    "rdRatio": "4.05%",
    "patentTotalCount": 6800,
    "inventionPatentCount": 3400,
    "legalRep": "王晓秋",
    "address": "上海市静安区威海路489号",
    "phone": "021-22011888",
    "email": "ir@hasco-group.com",
    "website": "https://www.hasco-group.com",
    "establishedDate": "1992-10-28",
    "businessScope": "汽车零部件、底盘电子、线控转向与制动系统、汽车电子电驱动总成的开发与制造。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 94,
    "synergyReason": "上汽集团核心零部件旗舰，正全力布局智能线控底盘X-by-Wire全系产品矩阵，产学研需求强烈。",
    "chainPosition": {
      "chainId": "chain-2",
      "chainName": "新能源汽车",
      "node": "midstream",
      "nodeName": "中游 • 精密制造与模块总成",
      "subSegment": "智能底盘模块与线控制动总成",
      "mainProducts": [
        "电子制动助力系统",
        "线控底盘域控制器",
        "电驱动总成"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN115285201B",
        "title": "一种新能源汽车底盘域控制器电液协同制动控制系统及策略",
        "ipc": "B60W 30/18, B60T 8/1755",
        "grantDate": "2023-09-15",
        "similarityScore": 93,
        "abstract": "本发明公开了一种新能源汽车底盘域控制器电液协同制动控制系统及策略，涉及整车动力学协同控制领域。系统通过集成车身姿态传感器与底盘域控器，实时估算路面附着系数并动态调控轮端制动力矩分配，提升极限转向与紧急制动下的侧向稳定性。",
        "techOverlapDescription": "均涉及底盘域控架构下的电液协同控制与防侧滑自适应算法。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-HUAYU-001",
        "productName": "智能底盘线控电液制动一体化总成",
        "filingYear": "2024",
        "productCategory": "汽车底盘执行系统",
        "annualOutputValue": "34.8 亿元",
        "corePatentCount": 31,
        "patentSynergyPoint": "可对接吉大复合制动动力学模型，加速其商用底盘量产进程"
      }
    ]
  },
  {
    "id": "ent-sunny",
    "name": "舜宇光学科技（集团）有限公司",
    "shortName": "舜宇光学",
    "creditCode": "91330281601002245T",
    "registeredCapital": "109,680 万元人民币",
    "location": "浙江省宁波市",
    "province": "浙江省",
    "city": "宁波市",
    "industry": "电子信息与智能算力 / 光电传感与微纳制造",
    "scale": "上市公司",
    "enterpriseType": "制造业单项冠军",
    "revenue": "380.0 亿元 (2024)",
    "rdInvestment": "28.5 亿元",
    "rdRatio": "7.50%",
    "patentTotalCount": 5200,
    "inventionPatentCount": 3100,
    "legalRep": "叶辽宁",
    "address": "浙江省余姚市舜宇路66-68号",
    "phone": "0574-62538080",
    "email": "rd@sunnyoptical.com",
    "website": "https://www.sunnyoptical.com",
    "establishedDate": "1984-10-18",
    "businessScope": "光学镜头、微纳传感芯片、光电仪器、车载激光雷达光学系统、曲面微结构光栅的研发与制造。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 95,
    "synergyReason": "全球光学与微纳光电子龙头，对吉大皮秒激光超快微纳加工与曲面微结构光栅技术有明确产线引入需求。",
    "chainPosition": {
      "chainId": "chain-16",
      "chainName": "传感器",
      "node": "midstream",
      "nodeName": "中游 • 精密制造与系统集成",
      "subSegment": "高精度光学传感芯片与微纳光学器件",
      "mainProducts": [
        "车载高分辨率光学镜头",
        "激光雷达发射/接收光学模组",
        "微纳光栅传感器"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN116047582B",
        "title": "一种超快激光微纳加工高精度曲面光学衍射光栅的方法及装置",
        "ipc": "G02B 5/18, B23K 26/0622",
        "grantDate": "2024-01-20",
        "similarityScore": 95,
        "abstract": "本发明公开了一种超快激光微纳加工高精度曲面光学衍射光栅的方法及装置，属于超快激光精密制造技术领域。通过利用飞秒/皮秒脉冲激光束与空间光调制器协同，在三维曲面光学基底表面快速刻蚀亚微米级周期的微结构光栅，解决了传统光刻在非平面表面聚焦景深不足与边缘失真的难题。",
        "techOverlapDescription": "均涉及超快脉冲激光束微纳刻蚀曲面微结构光栅工艺，技术方案高度契合。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-SUNNY-001",
        "productName": "高精度车载激光雷达多波长曲面微纳光栅光学模组",
        "filingYear": "2024",
        "productCategory": "光学元器件及光电仪器",
        "annualOutputValue": "12.8 亿元",
        "corePatentCount": 22,
        "patentSynergyPoint": "可直接应用吉大皮秒超快激光加工方案提高光栅成品率"
      }
    ]
  },
  {
    "id": "ent-mindray",
    "name": "深圳迈瑞生物医疗电子股份有限公司",
    "shortName": "迈瑞医疗",
    "creditCode": "91440300708467365G",
    "registeredCapital": "121,244 万元人民币",
    "location": "广东省深圳市",
    "province": "广东省",
    "city": "深圳市",
    "industry": "生物医药与健康 / 高端医疗器械",
    "scale": "上市公司",
    "enterpriseType": "上市企业",
    "revenue": "410.5 亿元 (2024)",
    "rdInvestment": "39.8 亿元",
    "rdRatio": "9.70%",
    "patentTotalCount": 9800,
    "inventionPatentCount": 6500,
    "legalRep": "李西廷",
    "address": "广东省深圳市南山区高新技术产业园区科技南十二路迈瑞大厦",
    "phone": "0755-81888998",
    "email": "ir@mindray.com",
    "website": "https://www.mindray.com",
    "establishedDate": "1999-06-11",
    "businessScope": "高端医学影像、体外诊断仪器、外科手术机器人、生命信息与监护仪器的研发、生产与销售。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "similar_patent",
    "matchScore": 97,
    "synergyReason": "中国高端医疗装备领头羊，骨科与神经外科微创手术机器人正在攻坚高精度六自由度末端力控，与吉大成果极高契合。",
    "chainPosition": {
      "chainId": "chain-1",
      "chainName": "高端医疗器械",
      "node": "midstream",
      "nodeName": "中游 • 核心整机与精密仪器",
      "subSegment": "智能微创手术辅助机器人与力控导航系统",
      "mainProducts": [
        "高端超声诊断系统",
        "腔镜与骨科手术机器人",
        "生命体征智能监护仪"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN115971480B",
        "title": "一种多自由度微创手术机器人末端柔顺力控与主动避障导航系统",
        "ipc": "A61B 34/30, A61B 90/00",
        "grantDate": "2023-12-19",
        "similarityScore": 97,
        "abstract": "本发明公开了一种多自由度微创手术机器人末端柔顺力控与主动避障导航系统，属于医疗机器人智能控制技术领域。该系统采用六维力/力矩传感器与末端自适应柔顺阻抗控制算法，实时感知手术器械与人体骨骼/软组织的接触力反馈，并结合三维光学术中导航实现亚毫米级精准穿刺定位与过载力主动保护。",
        "techOverlapDescription": "均涉及手术机器人末端柔顺力控、力反馈闭环与高精度导航补偿，契合度97%。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-MINDRAY-001",
        "productName": "迈瑞高端骨科微创手术导航定位机器人系统",
        "filingYear": "2024",
        "productCategory": "高端数字化医疗设备",
        "annualOutputValue": "18.6 亿元",
        "corePatentCount": 35,
        "patentSynergyPoint": "吉大柔顺力控机构可直接升级其穿刺末端精度与安全性"
      }
    ]
  },
  {
    "id": "ent-boe",
    "name": "京东方科技集团股份有限公司",
    "shortName": "京东方",
    "creditCode": "911100001011014479",
    "registeredCapital": "3,765,300 万元人民币",
    "location": "北京市大兴区",
    "province": "北京市",
    "city": "北京市",
    "industry": "新材料 / 半导体显示与发光材料",
    "scale": "上市公司",
    "enterpriseType": "制造业单项冠军",
    "revenue": "1,980 亿元 (2024)",
    "rdInvestment": "135.0 亿元",
    "rdRatio": "6.82%",
    "patentTotalCount": 88000,
    "inventionPatentCount": 65000,
    "legalRep": "陈炎顺",
    "address": "北京市北京经济技术开发区西环中路10号",
    "phone": "010-64318888",
    "email": "tech_inquiry@boe.com.cn",
    "website": "https://www.boe.com",
    "establishedDate": "1993-04-09",
    "businessScope": "半导体显示器件、OLED发光模组、超高清显示芯片、传感器及智能制造解决方案。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 99,
    "synergyReason": "全球半导体显示龙头，目前正全力突破高色纯度蓝光TADF材料与长寿命蒸镀技术，对吉大超分子蓝光材料需求极其迫切。",
    "chainPosition": {
      "chainId": "chain-18",
      "chainName": "纳米新材料",
      "node": "downstream",
      "nodeName": "下游 • 显示终端与集成模组",
      "subSegment": "高世代柔性AMOLED显示面板及超高清显示终端",
      "mainProducts": [
        "高世代柔性AMOLED面板",
        "Micro-LED微显示屏",
        "车载交互智能屏"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN114921094B",
        "title": "一种高效率深蓝光有机电致发光器件及其超分子发光层制备方法",
        "ipc": "H01L 51/54, C09K 11/06",
        "grantDate": "2023-10-10",
        "similarityScore": 98,
        "abstract": "本发明公开了一种高效率深蓝光有机电致发光器件及其超分子发光层制备方法，属于新型光电半导体材料与器件技术领域。本发明通过设计具有空间电荷转移特性的超分子TADF发光分子，将反向系间窜越速率提高至10^7 s^-1量级，大幅抑制三线态-三线态湮灭，使蓝光OLED器件外量子效率突破32%，半衰期寿命提升80%以上。",
        "techOverlapDescription": "均聚焦超分子TADF深蓝光发光材料设计与高色纯度发光层制备，契合度98%。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-BOE-001",
        "productName": "京东方新一代超高清高色域柔性AMOLED显示模组",
        "filingYear": "2024",
        "productCategory": "新型半导体显示器件",
        "annualOutputValue": "120.0 亿元",
        "corePatentCount": 58,
        "patentSynergyPoint": "可直接作为吉大TADF蓝光材料工业级面板蒸镀试产验证基地"
      }
    ]
  },
  {
    "id": "ent-kede",
    "name": "科德数控股份有限公司",
    "shortName": "科德数控",
    "creditCode": "912102006716035848",
    "registeredCapital": "10,210 万元人民币",
    "location": "辽宁省大连市",
    "province": "辽宁省",
    "city": "大连市",
    "industry": "高端装备制造 / 高档数控机床与关键功能部件",
    "scale": "上市公司",
    "enterpriseType": "国家级专精特新“小巨人”",
    "revenue": "5.8 亿元 (2024)",
    "rdInvestment": "1.2 亿元",
    "rdRatio": "20.69%",
    "patentTotalCount": 380,
    "inventionPatentCount": 220,
    "legalRep": "陈虎",
    "address": "辽宁省大连经济技术开发区天宝街7号",
    "phone": "0411-39989888",
    "email": "kede-ir@gskede.com",
    "website": "https://www.gskede.com",
    "establishedDate": "2008-01-22",
    "businessScope": "五轴联动高端数控机床、高档数控系统、伺服驱动器、电机电主轴及复杂曲面加工装备。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 93,
    "synergyReason": "国内五轴联动高端数控机床代表企业，正在探索超快激光复合加工与微纳传感部件在高端数控机床中的一体化集成。",
    "chainPosition": {
      "chainId": "chain-10",
      "chainName": "数控机床",
      "node": "midstream",
      "nodeName": "中游 • 精密主机与功能部件",
      "subSegment": "高档五轴联动数控加工中心与复合机床",
      "mainProducts": [
        "五轴立式加工中心",
        "五轴卧式加工中心",
        "高档数控系统GNC60"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN116372190B",
        "title": "一种五轴数控机床光栅干涉位移测量误差自适应实时补偿系统",
        "ipc": "G05B 19/404, B23Q 15/00",
        "grantDate": "2024-02-14",
        "similarityScore": 92,
        "abstract": "本发明公开了一种五轴数控机床光栅干涉位移测量误差自适应实时补偿系统，属于高档数控机床精密测量与智能控制领域。该系统通过高精度光栅干涉测量与热形变自适应估计算法，动态补偿刀尖空间定位误差，使大型复杂曲面零件加工重复定位精度达微米级。",
        "techOverlapDescription": "涉及高精度微结构光栅位移传感与闭环精密控制补偿，具备良好对接基础。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-KEDE-001",
        "productName": "KMC系列高端五轴联动数控加工中心",
        "filingYear": "2024",
        "productCategory": "高档五轴数控机床",
        "annualOutputValue": "4.6 亿元",
        "corePatentCount": 19,
        "patentSynergyPoint": "可对接吉大高精度光栅传感与激光微纳加工技术提升加工精度"
      }
    ]
  },
  {
    "id": "ent-target-10",
    "name": "比亚迪汽车工业有限公司",
    "shortName": "比亚迪",
    "creditCode": "913100000000000000",
    "registeredCapital": "15,000 万元人民币",
    "location": "吉林省长春市",
    "province": "吉林省",
    "city": "长春市",
    "industry": "新能源汽车 / 整车及动力底盘",
    "scale": "上市公司",
    "enterpriseType": "上市企业",
    "revenue": "25.0 亿元 (2024)",
    "rdInvestment": "1.8 亿元",
    "rdRatio": "5.50%",
    "patentTotalCount": 850,
    "inventionPatentCount": 420,
    "legalRep": "张伟",
    "address": "吉林省长春市高新技术产业开发区创新科技大道100号",
    "phone": "0512-88000000",
    "email": "rd_tech@比亚迪.com.cn",
    "website": "https://www.比亚迪.com.cn",
    "establishedDate": "2008-01-15",
    "businessScope": "新能源乘用车与商用车全线控底盘的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 90,
    "synergyReason": "作为新能源汽车产业链下游 • 整车终端与集成底盘的重点骨干企业，在新能源乘用车与商用车全线控底盘领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-2",
      "chainName": "新能源汽车",
      "node": "downstream",
      "nodeName": "下游 • 整车终端与集成底盘",
      "subSegment": "新能源乘用车与商用车全线控底盘",
      "mainProducts": [
        "仰望U8/易四方智能线控底盘总成",
        "比亚迪核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117000000B",
        "title": "一种针对新能源乘用车与商用车全线控底盘的整机集成动力学优化与安全控制装置",
        "ipc": "B60W 30/00, A61B 34/30",
        "grantDate": "2023-01-11",
        "similarityScore": 90,
        "abstract": "本发明公开了一种一种针对新能源乘用车与商用车全线控底盘的整机集成动力学优化与安全控制装置，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在新能源乘用车与商用车全线控底盘方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在新能源乘用车与商用车全线控底盘方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-比亚迪-101",
        "productName": "仰望U8/易四方智能线控底盘总成",
        "filingYear": "2024",
        "productCategory": "整车及动力底盘",
        "annualOutputValue": "260.0 亿元",
        "corePatentCount": 15,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-11",
    "name": "德赛西威汽车电子股份有限公司",
    "shortName": "德赛西威",
    "creditCode": "913100000008371928",
    "registeredCapital": "18,500 万元人民币",
    "location": "吉林省吉林市",
    "province": "吉林省",
    "city": "吉林市",
    "industry": "新能源汽车 / 智能座舱与底盘域控",
    "scale": "上市公司",
    "enterpriseType": "上市企业",
    "revenue": "29.5 亿元 (2024)",
    "rdInvestment": "2.2 亿元",
    "rdRatio": "6.40%",
    "patentTotalCount": 970,
    "inventionPatentCount": 495,
    "legalRep": "李强",
    "address": "吉林省吉林市高新技术产业开发区创新科技大道118号",
    "phone": "0755-88001111",
    "email": "rd_tech@德赛西威.com.cn",
    "website": "https://www.德赛西威.com.cn",
    "establishedDate": "2009-02-15",
    "businessScope": "高性能底盘域控制器与线控执行总成的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 91,
    "synergyReason": "作为新能源汽车产业链中游 • 核心电控与底盘域控的重点骨干企业，在高性能底盘域控制器与线控执行总成领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-2",
      "chainName": "新能源汽车",
      "node": "midstream",
      "nodeName": "中游 • 核心电控与底盘域控",
      "subSegment": "高性能底盘域控制器与线控执行总成",
      "mainProducts": [
        "IPU04智能底盘域控制器",
        "德赛西威核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117001314B",
        "title": "一种针对高性能底盘域控制器与线控执行总的精密加工成型与自适应控制系统",
        "ipc": "B60T 8/17, G05B 19/40",
        "grantDate": "2024-02-12",
        "similarityScore": 91,
        "abstract": "本发明公开了一种一种针对高性能底盘域控制器与线控执行总的精密加工成型与自适应控制系统，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在高性能底盘域控制器与线控执行总成方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在高性能底盘域控制器与线控执行总成方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-德赛西威-102",
        "productName": "IPU04智能底盘域控制器",
        "filingYear": "2024",
        "productCategory": "智能座舱与底盘域控",
        "annualOutputValue": "45.0 亿元",
        "corePatentCount": 16,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-12",
    "name": "浙江万安科技股份有限公司",
    "shortName": "万安科技",
    "creditCode": "913100000016743856",
    "registeredCapital": "22,000 万元人民币",
    "location": "江苏省苏州市",
    "province": "江苏省",
    "city": "苏州市",
    "industry": "新能源汽车 / 汽车制动系统",
    "scale": "国家级专精特新",
    "enterpriseType": "国家级专精特新“小巨人”",
    "revenue": "34.0 亿元 (2024)",
    "rdInvestment": "2.6 亿元",
    "rdRatio": "7.30%",
    "patentTotalCount": 1090,
    "inventionPatentCount": 570,
    "legalRep": "王建华",
    "address": "江苏省苏州市高新技术产业开发区创新科技大道136号",
    "phone": "0512-88002222",
    "email": "rd_tech@万安科技.com.cn",
    "website": "https://www.万安科技.com.cn",
    "establishedDate": "2010-03-15",
    "businessScope": "商用车气压/液压电控复合制动系统的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 92,
    "synergyReason": "作为新能源汽车产业链中游 • 精密制造与模块总成的重点骨干企业，在商用车气压/液压电控复合制动系统领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-2",
      "chainName": "新能源汽车",
      "node": "midstream",
      "nodeName": "中游 • 精密制造与模块总成",
      "subSegment": "商用车气压/液压电控复合制动系统",
      "mainProducts": [
        "EBS/ESC电子制动控制总成",
        "万安科技核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117002628B",
        "title": "一种针对商用车气压/液压电控复合制动系的精密加工成型与自适应控制系统",
        "ipc": "B60T 8/17, G05B 19/40",
        "grantDate": "2023-03-13",
        "similarityScore": 92,
        "abstract": "本发明公开了一种一种针对商用车气压/液压电控复合制动系的精密加工成型与自适应控制系统，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在商用车气压/液压电控复合制动系统方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在商用车气压/液压电控复合制动系统方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-万安科技-103",
        "productName": "EBS/ESC电子制动控制总成",
        "filingYear": "2024",
        "productCategory": "汽车制动系统",
        "annualOutputValue": "18.5 亿元",
        "corePatentCount": 17,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-13",
    "name": "浙江亚太机电股份有限公司",
    "shortName": "亚太股份",
    "creditCode": "913100000025115785",
    "registeredCapital": "25,500 万元人民币",
    "location": "江苏省无锡市",
    "province": "江苏省",
    "city": "无锡市",
    "industry": "新能源汽车 / 线控制动与底盘安全",
    "scale": "上市公司",
    "enterpriseType": "上市企业",
    "revenue": "38.5 亿元 (2024)",
    "rdInvestment": "3.0 亿元",
    "rdRatio": "8.20%",
    "patentTotalCount": 1210,
    "inventionPatentCount": 645,
    "legalRep": "陈敏",
    "address": "江苏省无锡市高新技术产业开发区创新科技大道154号",
    "phone": "0755-88003333",
    "email": "rd_tech@亚太股份.com.cn",
    "website": "https://www.亚太股份.com.cn",
    "establishedDate": "2011-04-15",
    "businessScope": "IEHB集成式电液线控制动系统的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 93,
    "synergyReason": "作为新能源汽车产业链中游 • 精密制造与模块总成的重点骨干企业，在IEHB集成式电液线控制动系统领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-2",
      "chainName": "新能源汽车",
      "node": "midstream",
      "nodeName": "中游 • 精密制造与模块总成",
      "subSegment": "IEHB集成式电液线控制动系统",
      "mainProducts": [
        "IEHB智能线控制动系统",
        "亚太股份核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117003942B",
        "title": "一种针对IEHB集成式电液线控制动系统的精密加工成型与自适应控制系统",
        "ipc": "B60T 8/17, G05B 19/40",
        "grantDate": "2024-04-14",
        "similarityScore": 93,
        "abstract": "本发明公开了一种一种针对IEHB集成式电液线控制动系统的精密加工成型与自适应控制系统，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在IEHB集成式电液线控制动系统方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在IEHB集成式电液线控制动系统方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-亚太股份-104",
        "productName": "IEHB智能线控制动系统",
        "filingYear": "2024",
        "productCategory": "线控制动与底盘安全",
        "annualOutputValue": "22.0 亿元",
        "corePatentCount": 18,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-14",
    "name": "拓普集团股份有限公司",
    "shortName": "拓普集团",
    "creditCode": "913100000033487713",
    "registeredCapital": "29,000 万元人民币",
    "location": "江苏省南京市",
    "province": "江苏省",
    "city": "南京市",
    "industry": "新能源汽车 / 轻量化底盘与线控系统",
    "scale": "上市公司",
    "enterpriseType": "上市企业",
    "revenue": "43.0 亿元 (2024)",
    "rdInvestment": "3.4 亿元",
    "rdRatio": "9.10%",
    "patentTotalCount": 1330,
    "inventionPatentCount": 720,
    "legalRep": "刘志刚",
    "address": "江苏省南京市高新技术产业开发区创新科技大道172号",
    "phone": "0512-88004444",
    "email": "rd_tech@拓普集团.com.cn",
    "website": "https://www.拓普集团.com.cn",
    "establishedDate": "2012-05-15",
    "businessScope": "轻量化一体化压铸底盘及线控制动执行器的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 94,
    "synergyReason": "作为新能源汽车产业链中游 • 精密制造与模块总成的重点骨干企业，在轻量化一体化压铸底盘及线控制动执行器领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-2",
      "chainName": "新能源汽车",
      "node": "midstream",
      "nodeName": "中游 • 精密制造与模块总成",
      "subSegment": "轻量化一体化压铸底盘及线控制动执行器",
      "mainProducts": [
        "一体化轻量化底盘模块总成",
        "拓普集团核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117005256B",
        "title": "一种针对轻量化一体化压铸底盘及线控制动的精密加工成型与自适应控制系统",
        "ipc": "B60T 8/17, G05B 19/40",
        "grantDate": "2023-05-15",
        "similarityScore": 94,
        "abstract": "本发明公开了一种一种针对轻量化一体化压铸底盘及线控制动的精密加工成型与自适应控制系统，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在轻量化一体化压铸底盘及线控制动执行器方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在轻量化一体化压铸底盘及线控制动执行器方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-拓普集团-105",
        "productName": "一体化轻量化底盘模块总成",
        "filingYear": "2024",
        "productCategory": "轻量化底盘与线控系统",
        "annualOutputValue": "38.0 亿元",
        "corePatentCount": 19,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-15",
    "name": "三花智控股份有限公司",
    "shortName": "三花智控",
    "creditCode": "913100000041859641",
    "registeredCapital": "32,500 万元人民币",
    "location": "浙江省杭州市",
    "province": "浙江省",
    "city": "杭州市",
    "industry": "新能源汽车 / 热管理与电子膨胀阀",
    "scale": "国家级专精特新",
    "enterpriseType": "制造业单项冠军",
    "revenue": "47.5 亿元 (2024)",
    "rdInvestment": "3.8 亿元",
    "rdRatio": "5.50%",
    "patentTotalCount": 1450,
    "inventionPatentCount": 795,
    "legalRep": "孙明",
    "address": "浙江省杭州市高新技术产业开发区创新科技大道190号",
    "phone": "0755-88005555",
    "email": "rd_tech@三花智控.com.cn",
    "website": "https://www.三花智控.com.cn",
    "establishedDate": "2013-06-15",
    "businessScope": "新能源汽车高压电子膨胀阀与精密控制电磁阀的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 95,
    "synergyReason": "作为新能源汽车产业链上游 • 核心阀件与热管理材料的重点骨干企业，在新能源汽车高压电子膨胀阀与精密控制电磁阀领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-2",
      "chainName": "新能源汽车",
      "node": "upstream",
      "nodeName": "上游 • 核心阀件与热管理材料",
      "subSegment": "新能源汽车高压电子膨胀阀与精密控制电磁阀",
      "mainProducts": [
        "高集成新能源热管理集成阀岛",
        "三花智控核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117006570B",
        "title": "一种针对新能源汽车高压电子膨胀阀与精密的材料制备与高精度调控方法",
        "ipc": "C08G 65/40, H01M 10/052",
        "grantDate": "2024-06-16",
        "similarityScore": 95,
        "abstract": "本发明公开了一种一种针对新能源汽车高压电子膨胀阀与精密的材料制备与高精度调控方法，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在新能源汽车高压电子膨胀阀与精密控制电磁阀方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在新能源汽车高压电子膨胀阀与精密控制电磁阀方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-三花智控-106",
        "productName": "高集成新能源热管理集成阀岛",
        "filingYear": "2024",
        "productCategory": "热管理与电子膨胀阀",
        "annualOutputValue": "32.0 亿元",
        "corePatentCount": 20,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-16",
    "name": "欣旺达电子股份有限公司",
    "shortName": "欣旺达",
    "creditCode": "913100000050231570",
    "registeredCapital": "36,000 万元人民币",
    "location": "浙江省宁波市",
    "province": "浙江省",
    "city": "宁波市",
    "industry": "新能源与储能 / 动力及储能电池",
    "scale": "上市公司",
    "enterpriseType": "上市企业",
    "revenue": "52.0 亿元 (2024)",
    "rdInvestment": "4.2 亿元",
    "rdRatio": "6.40%",
    "patentTotalCount": 1570,
    "inventionPatentCount": 870,
    "legalRep": "周海峰",
    "address": "浙江省宁波市高新技术产业开发区创新科技大道208号",
    "phone": "0512-88006666",
    "email": "rd_tech@欣旺达.com.cn",
    "website": "https://www.欣旺达.com.cn",
    "establishedDate": "2014-07-15",
    "businessScope": "高倍率超快充动力电芯与BMS能量管理系统的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 96,
    "synergyReason": "作为动力及储能电池产业链上游 • 核心电芯与储能模组的重点骨干企业，在高倍率超快充动力电芯与BMS能量管理系统领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-24",
      "chainName": "动力及储能电池",
      "node": "upstream",
      "nodeName": "上游 • 核心电芯与储能模组",
      "subSegment": "高倍率超快充动力电芯与BMS能量管理系统",
      "mainProducts": [
        "闪充超级动力电池PACK",
        "欣旺达核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117007884B",
        "title": "一种针对高倍率超快充动力电芯与BMS能的材料制备与高精度调控方法",
        "ipc": "C08G 65/40, H01M 10/052",
        "grantDate": "2023-07-17",
        "similarityScore": 96,
        "abstract": "本发明公开了一种一种针对高倍率超快充动力电芯与BMS能的材料制备与高精度调控方法，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在高倍率超快充动力电芯与BMS能量管理系统方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在高倍率超快充动力电芯与BMS能量管理系统方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-欣旺达-107",
        "productName": "闪充超级动力电池PACK",
        "filingYear": "2024",
        "productCategory": "动力及储能电池",
        "annualOutputValue": "52.0 亿元",
        "corePatentCount": 21,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-17",
    "name": "惠州亿纬锂能股份有限公司",
    "shortName": "亿纬锂能",
    "creditCode": "913100000058603499",
    "registeredCapital": "39,500 万元人民币",
    "location": "广东省深圳市",
    "province": "广东省",
    "city": "深圳市",
    "industry": "新能源与储能 / 动力电池",
    "scale": "上市公司",
    "enterpriseType": "上市企业",
    "revenue": "56.5 亿元 (2024)",
    "rdInvestment": "4.6 亿元",
    "rdRatio": "7.30%",
    "patentTotalCount": 1690,
    "inventionPatentCount": 945,
    "legalRep": "赵立国",
    "address": "广东省深圳市高新技术产业开发区创新科技大道226号",
    "phone": "0755-88007777",
    "email": "rd_tech@亿纬锂能.com.cn",
    "website": "https://www.亿纬锂能.com.cn",
    "establishedDate": "2015-08-15",
    "businessScope": "大圆柱高能量密度动力电池的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 97,
    "synergyReason": "作为动力及储能电池产业链上游 • 核心电芯材料与电化学储能的重点骨干企业，在大圆柱高能量密度动力电池领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-24",
      "chainName": "动力及储能电池",
      "node": "upstream",
      "nodeName": "上游 • 核心电芯材料与电化学储能",
      "subSegment": "大圆柱高能量密度动力电池",
      "mainProducts": [
        "46系列大圆柱动力电池总成",
        "亿纬锂能核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117009198B",
        "title": "一种针对大圆柱高能量密度动力电池的材料制备与高精度调控方法",
        "ipc": "C08G 65/40, H01M 10/052",
        "grantDate": "2024-08-18",
        "similarityScore": 97,
        "abstract": "本发明公开了一种一种针对大圆柱高能量密度动力电池的材料制备与高精度调控方法，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在大圆柱高能量密度动力电池方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在大圆柱高能量密度动力电池方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-亿纬锂能-108",
        "productName": "46系列大圆柱动力电池总成",
        "filingYear": "2024",
        "productCategory": "动力电池",
        "annualOutputValue": "48.0 亿元",
        "corePatentCount": 22,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-18",
    "name": "国轩高科股份有限公司",
    "shortName": "国轩高科",
    "creditCode": "913100000066975427",
    "registeredCapital": "43,000 万元人民币",
    "location": "广东省广州市",
    "province": "广东省",
    "city": "广州市",
    "industry": "新能源与储能 / 电池正极与系统集成",
    "scale": "上市公司",
    "enterpriseType": "上市企业",
    "revenue": "61.0 亿元 (2024)",
    "rdInvestment": "5.0 亿元",
    "rdRatio": "8.20%",
    "patentTotalCount": 1810,
    "inventionPatentCount": 1020,
    "legalRep": "张伟",
    "address": "广东省广州市高新技术产业开发区创新科技大道244号",
    "phone": "0512-88008888",
    "email": "rd_tech@国轩高科.com.cn",
    "website": "https://www.国轩高科.com.cn",
    "establishedDate": "2016-09-15",
    "businessScope": "高安全半固态电池与热失控抑制总成的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 98,
    "synergyReason": "作为动力及储能电池产业链上游 • 正负极材料与电芯的重点骨干企业，在高安全半固态电池与热失控抑制总成领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-24",
      "chainName": "动力及储能电池",
      "node": "upstream",
      "nodeName": "上游 • 正负极材料与电芯",
      "subSegment": "高安全半固态电池与热失控抑制总成",
      "mainProducts": [
        "启晨半固态高能量密度电池",
        "国轩高科核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117010512B",
        "title": "一种针对高安全半固态电池与热失控抑制总的材料制备与高精度调控方法",
        "ipc": "C08G 65/40, H01M 10/052",
        "grantDate": "2023-09-11",
        "similarityScore": 98,
        "abstract": "本发明公开了一种一种针对高安全半固态电池与热失控抑制总的材料制备与高精度调控方法，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在高安全半固态电池与热失控抑制总成方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在高安全半固态电池与热失控抑制总成方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-国轩高科-109",
        "productName": "启晨半固态高能量密度电池",
        "filingYear": "2024",
        "productCategory": "电池正极与系统集成",
        "annualOutputValue": "36.0 亿元",
        "corePatentCount": 23,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-19",
    "name": "中创新航科技股份有限公司",
    "shortName": "中创新航",
    "creditCode": "913100000075347355",
    "registeredCapital": "46,500 万元人民币",
    "location": "广东省东莞市",
    "province": "广东省",
    "city": "东莞市",
    "industry": "新能源与储能 / 动力电池",
    "scale": "上市公司",
    "enterpriseType": "上市企业",
    "revenue": "65.5 亿元 (2024)",
    "rdInvestment": "5.4 亿元",
    "rdRatio": "9.10%",
    "patentTotalCount": 1930,
    "inventionPatentCount": 1095,
    "legalRep": "李强",
    "address": "广东省东莞市高新技术产业开发区创新科技大道262号",
    "phone": "0755-88009999",
    "email": "rd_tech@中创新航.com.cn",
    "website": "https://www.中创新航.com.cn",
    "establishedDate": "2017-01-15",
    "businessScope": "全极耳高功率叠片电池与结构创新的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 90,
    "synergyReason": "作为新能源汽车产业链上游 • 动力电池及电驱储能总成的重点骨干企业，在全极耳高功率叠片电池与结构创新领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-2",
      "chainName": "新能源汽车",
      "node": "upstream",
      "nodeName": "上游 • 动力电池及电驱储能总成",
      "subSegment": "全极耳高功率叠片电池与结构创新",
      "mainProducts": [
        "One-Stop极简高集成动力电池系统",
        "中创新航核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117011826B",
        "title": "一种针对全极耳高功率叠片电池与结构创新的材料制备与高精度调控方法",
        "ipc": "C08G 65/40, H01M 10/052",
        "grantDate": "2024-01-12",
        "similarityScore": 90,
        "abstract": "本发明公开了一种一种针对全极耳高功率叠片电池与结构创新的材料制备与高精度调控方法，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在全极耳高功率叠片电池与结构创新方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在全极耳高功率叠片电池与结构创新方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-中创新航-110",
        "productName": "One-Stop极简高集成动力电池系统",
        "filingYear": "2024",
        "productCategory": "动力电池",
        "annualOutputValue": "42.0 亿元",
        "corePatentCount": 24,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-20",
    "name": "上海联影医疗科技股份有限公司",
    "shortName": "联影医疗",
    "creditCode": "913100000083719284",
    "registeredCapital": "50,000 万元人民币",
    "location": "山东省济南市",
    "province": "山东省",
    "city": "济南市",
    "industry": "生物医药与健康 / 高端医学影像",
    "scale": "上市公司",
    "enterpriseType": "上市企业",
    "revenue": "70.0 亿元 (2024)",
    "rdInvestment": "5.8 亿元",
    "rdRatio": "5.50%",
    "patentTotalCount": 2050,
    "inventionPatentCount": 1170,
    "legalRep": "王建华",
    "address": "山东省济南市高新技术产业开发区创新科技大道280号",
    "phone": "0512-88011110",
    "email": "rd_tech@联影医疗.com.cn",
    "website": "https://www.联影医疗.com.cn",
    "establishedDate": "2018-02-15",
    "businessScope": "高场强超导磁共振与精准手术机器人的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 91,
    "synergyReason": "作为高端医疗器械产业链下游 • 临床整机与系统集成的重点骨干企业，在高场强超导磁共振与精准手术机器人领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-1",
      "chainName": "高端医疗器械",
      "node": "downstream",
      "nodeName": "下游 • 临床整机与系统集成",
      "subSegment": "高场强超导磁共振与精准手术机器人",
      "mainProducts": [
        "uEXPLORER全景动态PET-CT系统",
        "联影医疗核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117013140B",
        "title": "一种针对高场强超导磁共振与精准手术机器的整机集成动力学优化与安全控制装置",
        "ipc": "B60W 30/00, A61B 34/30",
        "grantDate": "2023-02-13",
        "similarityScore": 91,
        "abstract": "本发明公开了一种一种针对高场强超导磁共振与精准手术机器的整机集成动力学优化与安全控制装置，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在高场强超导磁共振与精准手术机器人方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在高场强超导磁共振与精准手术机器人方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-联影医疗-111",
        "productName": "uEXPLORER全景动态PET-CT系统",
        "filingYear": "2024",
        "productCategory": "高端医学影像",
        "annualOutputValue": "65.0 亿元",
        "corePatentCount": 25,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-21",
    "name": "山东威高集团医用高分子制品股份有限公司",
    "shortName": "威高股份",
    "creditCode": "913100000092091212",
    "registeredCapital": "53,500 万元人民币",
    "location": "山东省青岛市",
    "province": "山东省",
    "city": "青岛市",
    "industry": "生物医药与健康 / 高端医用耗材与骨科植入",
    "scale": "上市公司",
    "enterpriseType": "上市企业",
    "revenue": "74.5 亿元 (2024)",
    "rdInvestment": "6.2 亿元",
    "rdRatio": "6.40%",
    "patentTotalCount": 2170,
    "inventionPatentCount": 1245,
    "legalRep": "陈敏",
    "address": "山东省青岛市高新技术产业开发区创新科技大道298号",
    "phone": "0755-88012221",
    "email": "rd_tech@威高股份.com.cn",
    "website": "https://www.威高股份.com.cn",
    "establishedDate": "2019-03-15",
    "businessScope": "骨科微创植入材料与手术导航配套机具的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 92,
    "synergyReason": "作为高端医疗器械产业链中游 • 核心耗材与器械总成的重点骨干企业，在骨科微创植入材料与手术导航配套机具领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-1",
      "chainName": "高端医疗器械",
      "node": "midstream",
      "nodeName": "中游 • 核心耗材与器械总成",
      "subSegment": "骨科微创植入材料与手术导航配套机具",
      "mainProducts": [
        "微创脊柱手术植入耗材及力控导引器",
        "威高股份核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117014454B",
        "title": "一种针对骨科微创植入材料与手术导航配套的精密加工成型与自适应控制系统",
        "ipc": "B60T 8/17, G05B 19/40",
        "grantDate": "2024-03-14",
        "similarityScore": 92,
        "abstract": "本发明公开了一种一种针对骨科微创植入材料与手术导航配套的精密加工成型与自适应控制系统，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在骨科微创植入材料与手术导航配套机具方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在骨科微创植入材料与手术导航配套机具方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-威高股份-112",
        "productName": "微创脊柱手术植入耗材及力控导引器",
        "filingYear": "2024",
        "productCategory": "高端医用耗材与骨科植入",
        "annualOutputValue": "28.0 亿元",
        "corePatentCount": 26,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-22",
    "name": "乐普（北京）医疗器械股份有限公司",
    "shortName": "乐普医疗",
    "creditCode": "913100000100463140",
    "registeredCapital": "57,000 万元人民币",
    "location": "北京市北京市",
    "province": "北京市",
    "city": "北京市",
    "industry": "生物医药与健康 / 心脑血管与微创介入",
    "scale": "上市公司",
    "enterpriseType": "上市企业",
    "revenue": "79.0 亿元 (2024)",
    "rdInvestment": "6.6 亿元",
    "rdRatio": "7.30%",
    "patentTotalCount": 2290,
    "inventionPatentCount": 1320,
    "legalRep": "刘志刚",
    "address": "北京市北京市高新技术产业开发区创新科技大道316号",
    "phone": "0512-88013332",
    "email": "rd_tech@乐普医疗.com.cn",
    "website": "https://www.乐普医疗.com.cn",
    "establishedDate": "2020-04-15",
    "businessScope": "心血管微创介入导管与智能力控穿刺系统的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 93,
    "synergyReason": "作为高端医疗器械产业链中游 • 精密制造与系统集成的重点骨干企业，在心血管微创介入导管与智能力控穿刺系统领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-1",
      "chainName": "高端医疗器械",
      "node": "midstream",
      "nodeName": "中游 • 精密制造与系统集成",
      "subSegment": "心血管微创介入导管与智能力控穿刺系统",
      "mainProducts": [
        "生物可吸收冠脉雷帕霉素洗脱支架系统",
        "乐普医疗核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117015768B",
        "title": "一种针对心血管微创介入导管与智能力控穿的精密加工成型与自适应控制系统",
        "ipc": "B60T 8/17, G05B 19/40",
        "grantDate": "2023-04-15",
        "similarityScore": 93,
        "abstract": "本发明公开了一种一种针对心血管微创介入导管与智能力控穿的精密加工成型与自适应控制系统，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在心血管微创介入导管与智能力控穿刺系统方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在心血管微创介入导管与智能力控穿刺系统方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-乐普医疗-113",
        "productName": "生物可吸收冠脉雷帕霉素洗脱支架系统",
        "filingYear": "2024",
        "productCategory": "心脑血管与微创介入",
        "annualOutputValue": "31.0 亿元",
        "corePatentCount": 27,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-23",
    "name": "江苏鱼跃医疗设备股份有限公司",
    "shortName": "鱼跃医疗",
    "creditCode": "913100000108835069",
    "registeredCapital": "60,500 万元人民币",
    "location": "上海市上海市",
    "province": "上海市",
    "city": "上海市",
    "industry": "生物医药与健康 / 医疗急救与智能康复",
    "scale": "上市公司",
    "enterpriseType": "上市企业",
    "revenue": "83.5 亿元 (2024)",
    "rdInvestment": "7.0 亿元",
    "rdRatio": "8.20%",
    "patentTotalCount": 2410,
    "inventionPatentCount": 1395,
    "legalRep": "孙明",
    "address": "上海市上海市高新技术产业开发区创新科技大道334号",
    "phone": "0755-88014443",
    "email": "rd_tech@鱼跃医疗.com.cn",
    "website": "https://www.鱼跃医疗.com.cn",
    "establishedDate": "2021-05-15",
    "businessScope": "高精度呼吸支持设备与术后康复机器人的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 94,
    "synergyReason": "作为高端医疗器械产业链下游 • 终端医疗装备与智能监护的重点骨干企业，在高精度呼吸支持设备与术后康复机器人领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-1",
      "chainName": "高端医疗器械",
      "node": "downstream",
      "nodeName": "下游 • 终端医疗装备与智能监护",
      "subSegment": "高精度呼吸支持设备与术后康复机器人",
      "mainProducts": [
        "高性能医用无创呼吸机及高流量湿化仪",
        "鱼跃医疗核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117017082B",
        "title": "一种针对高精度呼吸支持设备与术后康复机的整机集成动力学优化与安全控制装置",
        "ipc": "B60W 30/00, A61B 34/30",
        "grantDate": "2024-05-16",
        "similarityScore": 94,
        "abstract": "本发明公开了一种一种针对高精度呼吸支持设备与术后康复机的整机集成动力学优化与安全控制装置，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在高精度呼吸支持设备与术后康复机器人方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在高精度呼吸支持设备与术后康复机器人方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-鱼跃医疗-114",
        "productName": "高性能医用无创呼吸机及高流量湿化仪",
        "filingYear": "2024",
        "productCategory": "医疗急救与智能康复",
        "annualOutputValue": "24.0 亿元",
        "corePatentCount": 28,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-24",
    "name": "深圳开立生物医疗科技股份有限公司",
    "shortName": "开立医疗",
    "creditCode": "913100000117206997",
    "registeredCapital": "64,000 万元人民币",
    "location": "四川省成都市",
    "province": "四川省",
    "city": "成都市",
    "industry": "生物医药与健康 / 超声内镜与微创影像",
    "scale": "国家级专精特新",
    "enterpriseType": "国家级专精特新“小巨人”",
    "revenue": "88.0 亿元 (2024)",
    "rdInvestment": "7.4 亿元",
    "rdRatio": "9.10%",
    "patentTotalCount": 2530,
    "inventionPatentCount": 1470,
    "legalRep": "周海峰",
    "address": "四川省成都市高新技术产业开发区创新科技大道352号",
    "phone": "0512-88015554",
    "email": "rd_tech@开立医疗.com.cn",
    "website": "https://www.开立医疗.com.cn",
    "establishedDate": "2022-06-15",
    "businessScope": "4K超高清内窥镜与手术导航穿刺成像系统的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 95,
    "synergyReason": "作为高端医疗器械产业链中游 • 精密仪器与光机电模组的重点骨干企业，在4K超高清内窥镜与手术导航穿刺成像系统领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-1",
      "chainName": "高端医疗器械",
      "node": "midstream",
      "nodeName": "中游 • 精密仪器与光机电模组",
      "subSegment": "4K超高清内窥镜与手术导航穿刺成像系统",
      "mainProducts": [
        "HD-550超高清电子内窥镜系统",
        "开立医疗核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117018396B",
        "title": "一种针对4K超高清内窥镜与手术导航穿刺的精密加工成型与自适应控制系统",
        "ipc": "B60T 8/17, G05B 19/40",
        "grantDate": "2023-06-17",
        "similarityScore": 95,
        "abstract": "本发明公开了一种一种针对4K超高清内窥镜与手术导航穿刺的精密加工成型与自适应控制系统，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在4K超高清内窥镜与手术导航穿刺成像系统方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在4K超高清内窥镜与手术导航穿刺成像系统方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-开立医疗-115",
        "productName": "HD-550超高清电子内窥镜系统",
        "filingYear": "2024",
        "productCategory": "超声内镜与微创影像",
        "annualOutputValue": "15.0 亿元",
        "corePatentCount": 29,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-25",
    "name": "江苏恒瑞医药股份有限公司",
    "shortName": "恒瑞医药",
    "creditCode": "913100000125578925",
    "registeredCapital": "67,500 万元人民币",
    "location": "湖北省武汉市",
    "province": "湖北省",
    "city": "武汉市",
    "industry": "生物医药与健康 / 靶向创新药与纳米载药",
    "scale": "上市公司",
    "enterpriseType": "上市企业",
    "revenue": "92.5 亿元 (2024)",
    "rdInvestment": "7.8 亿元",
    "rdRatio": "5.50%",
    "patentTotalCount": 2650,
    "inventionPatentCount": 1545,
    "legalRep": "赵立国",
    "address": "湖北省武汉市高新技术产业开发区创新科技大道370号",
    "phone": "0755-88016665",
    "email": "rd_tech@恒瑞医药.com.cn",
    "website": "https://www.恒瑞医药.com.cn",
    "establishedDate": "2008-07-15",
    "businessScope": "抗肿瘤靶向纳米制剂与生物大分子偶联药的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 96,
    "synergyReason": "作为生物医药产业链下游 • 创新药物与临床制剂的重点骨干企业，在抗肿瘤靶向纳米制剂与生物大分子偶联药领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-21",
      "chainName": "生物医药",
      "node": "downstream",
      "nodeName": "下游 • 创新药物与临床制剂",
      "subSegment": "抗肿瘤靶向纳米制剂与生物大分子偶联药",
      "mainProducts": [
        "注射用卡瑞利珠单抗抗肿瘤制剂",
        "恒瑞医药核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117019710B",
        "title": "一种针对抗肿瘤靶向纳米制剂与生物大分子的整机集成动力学优化与安全控制装置",
        "ipc": "B60W 30/00, A61B 34/30",
        "grantDate": "2024-07-18",
        "similarityScore": 96,
        "abstract": "本发明公开了一种一种针对抗肿瘤靶向纳米制剂与生物大分子的整机集成动力学优化与安全控制装置，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在抗肿瘤靶向纳米制剂与生物大分子偶联药方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在抗肿瘤靶向纳米制剂与生物大分子偶联药方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-恒瑞医药-116",
        "productName": "注射用卡瑞利珠单抗抗肿瘤制剂",
        "filingYear": "2024",
        "productCategory": "靶向创新药与纳米载药",
        "annualOutputValue": "88.0 亿元",
        "corePatentCount": 30,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-26",
    "name": "华润三九医药股份有限公司",
    "shortName": "华润三九",
    "creditCode": "913100000133950854",
    "registeredCapital": "71,000 万元人民币",
    "location": "安徽省合肥市",
    "province": "安徽省",
    "city": "合肥市",
    "industry": "生物医药与健康 / 现代中药与天然植物药",
    "scale": "行业央国企",
    "enterpriseType": "行业龙头国企",
    "revenue": "97.0 亿元 (2024)",
    "rdInvestment": "8.2 亿元",
    "rdRatio": "6.40%",
    "patentTotalCount": 2770,
    "inventionPatentCount": 1620,
    "legalRep": "张伟",
    "address": "安徽省合肥市高新技术产业开发区创新科技大道388号",
    "phone": "0512-88017776",
    "email": "rd_tech@华润三九.com.cn",
    "website": "https://www.华润三九.com.cn",
    "establishedDate": "2009-08-15",
    "businessScope": "长白山道地人参皂苷提取与高纯纳米制剂的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 97,
    "synergyReason": "作为中药产业链下游 • 现代中药制剂与深加工的重点骨干企业，在长白山道地人参皂苷提取与高纯纳米制剂领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-43",
      "chainName": "中药",
      "node": "downstream",
      "nodeName": "下游 • 现代中药制剂与深加工",
      "subSegment": "长白山道地人参皂苷提取与高纯纳米制剂",
      "mainProducts": [
        "人参三七超微粉及高活性口服制剂",
        "华润三九核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117021024B",
        "title": "一种针对长白山道地人参皂苷提取与高纯纳的整机集成动力学优化与安全控制装置",
        "ipc": "B60W 30/00, A61B 34/30",
        "grantDate": "2023-08-11",
        "similarityScore": 97,
        "abstract": "本发明公开了一种一种针对长白山道地人参皂苷提取与高纯纳的整机集成动力学优化与安全控制装置，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在长白山道地人参皂苷提取与高纯纳米制剂方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在长白山道地人参皂苷提取与高纯纳米制剂方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-华润三九-117",
        "productName": "人参三七超微粉及高活性口服制剂",
        "filingYear": "2024",
        "productCategory": "现代中药与天然植物药",
        "annualOutputValue": "46.0 亿元",
        "corePatentCount": 31,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-27",
    "name": "长春高新技术产业（集团）股份有限公司",
    "shortName": "长春高新",
    "creditCode": "913100000142322782",
    "registeredCapital": "74,500 万元人民币",
    "location": "陕西省西安市",
    "province": "陕西省",
    "city": "西安市",
    "industry": "生物医药与健康 / 基因重组与生物制药",
    "scale": "上市公司",
    "enterpriseType": "上市企业",
    "revenue": "101.5 亿元 (2024)",
    "rdInvestment": "8.6 亿元",
    "rdRatio": "7.30%",
    "patentTotalCount": 2890,
    "inventionPatentCount": 1695,
    "legalRep": "李强",
    "address": "陕西省西安市高新技术产业开发区创新科技大道406号",
    "phone": "0755-88018887",
    "email": "rd_tech@长春高新.com.cn",
    "website": "https://www.长春高新.com.cn",
    "establishedDate": "2010-09-15",
    "businessScope": "重组人白蛋白与特异性多肽靶向偶联递送技术的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 98,
    "synergyReason": "作为生物医药产业链中游 • 基因工程与生物反应制备的重点骨干企业，在重组人白蛋白与特异性多肽靶向偶联递送技术领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-21",
      "chainName": "生物医药",
      "node": "midstream",
      "nodeName": "中游 • 基因工程与生物反应制备",
      "subSegment": "重组人白蛋白与特异性多肽靶向偶联递送技术",
      "mainProducts": [
        "注射用重组人生长激素长效水针",
        "长春高新核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117022338B",
        "title": "一种针对重组人白蛋白与特异性多肽靶向偶的精密加工成型与自适应控制系统",
        "ipc": "B60T 8/17, G05B 19/40",
        "grantDate": "2024-09-12",
        "similarityScore": 98,
        "abstract": "本发明公开了一种一种针对重组人白蛋白与特异性多肽靶向偶的精密加工成型与自适应控制系统，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在重组人白蛋白与特异性多肽靶向偶联递送技术方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在重组人白蛋白与特异性多肽靶向偶联递送技术方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-长春高新-118",
        "productName": "注射用重组人生长激素长效水针",
        "filingYear": "2024",
        "productCategory": "基因重组与生物制药",
        "annualOutputValue": "72.0 亿元",
        "corePatentCount": 32,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-28",
    "name": "中际旭创股份有限公司",
    "shortName": "中际旭创",
    "creditCode": "913100000150694710",
    "registeredCapital": "78,000 万元人民币",
    "location": "辽宁省沈阳市",
    "province": "辽宁省",
    "city": "沈阳市",
    "industry": "电子信息与智能算力 / 光通信与光收发模块",
    "scale": "上市公司",
    "enterpriseType": "上市企业",
    "revenue": "106.0 亿元 (2024)",
    "rdInvestment": "9.0 亿元",
    "rdRatio": "8.20%",
    "patentTotalCount": 3010,
    "inventionPatentCount": 1770,
    "legalRep": "王建华",
    "address": "辽宁省沈阳市高新技术产业开发区创新科技大道424号",
    "phone": "0512-88019998",
    "email": "rd_tech@中际旭创.com.cn",
    "website": "https://www.中际旭创.com.cn",
    "establishedDate": "2011-01-15",
    "businessScope": "800G/1.6T高速光收发模块与微纳光栅耦合的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 90,
    "synergyReason": "作为传感器产业链中游 • 光电集成与传感器模组的重点骨干企业，在800G/1.6T高速光收发模块与微纳光栅耦合领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-16",
      "chainName": "传感器",
      "node": "midstream",
      "nodeName": "中游 • 光电集成与传感器模组",
      "subSegment": "800G/1.6T高速光收发模块与微纳光栅耦合",
      "mainProducts": [
        "800G OSFP/QSFP-DD高速光通信收发模块",
        "中际旭创核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117023652B",
        "title": "一种针对800G/1.6T高速光收发模的精密加工成型与自适应控制系统",
        "ipc": "B60T 8/17, G05B 19/40",
        "grantDate": "2023-01-13",
        "similarityScore": 90,
        "abstract": "本发明公开了一种一种针对800G/1.6T高速光收发模的精密加工成型与自适应控制系统，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在800G/1.6T高速光收发模块与微纳光栅耦合方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在800G/1.6T高速光收发模块与微纳光栅耦合方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-中际旭创-119",
        "productName": "800G OSFP/QSFP-DD高速光通信收发模块",
        "filingYear": "2024",
        "productCategory": "光通信与光收发模块",
        "annualOutputValue": "110.0 亿元",
        "corePatentCount": 33,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-29",
    "name": "歌尔股份有限公司",
    "shortName": "歌尔股份",
    "creditCode": "913100000159066639",
    "registeredCapital": "81,500 万元人民币",
    "location": "福建省厦门市",
    "province": "福建省",
    "city": "厦门市",
    "industry": "电子信息与智能算力 / 声光电精密微纳制造",
    "scale": "国家级专精特新",
    "enterpriseType": "制造业单项冠军",
    "revenue": "110.5 亿元 (2024)",
    "rdInvestment": "9.4 亿元",
    "rdRatio": "9.10%",
    "patentTotalCount": 3130,
    "inventionPatentCount": 1845,
    "legalRep": "陈敏",
    "address": "福建省厦门市高新技术产业开发区创新科技大道442号",
    "phone": "0755-88021109",
    "email": "rd_tech@歌尔股份.com.cn",
    "website": "https://www.歌尔股份.com.cn",
    "establishedDate": "2012-02-15",
    "businessScope": "MEMS微纳声学传感与曲面光学微结构透镜的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 91,
    "synergyReason": "作为传感器产业链中游 • 精密制造与系统集成的重点骨干企业，在MEMS微纳声学传感与曲面光学微结构透镜领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-16",
      "chainName": "传感器",
      "node": "midstream",
      "nodeName": "中游 • 精密制造与系统集成",
      "subSegment": "MEMS微纳声学传感与曲面光学微结构透镜",
      "mainProducts": [
        "微型声电传感与VR近眼显示光学模组",
        "歌尔股份核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117024966B",
        "title": "一种针对MEMS微纳声学传感与曲面光学的精密加工成型与自适应控制系统",
        "ipc": "B60T 8/17, G05B 19/40",
        "grantDate": "2024-02-14",
        "similarityScore": 91,
        "abstract": "本发明公开了一种一种针对MEMS微纳声学传感与曲面光学的精密加工成型与自适应控制系统，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在MEMS微纳声学传感与曲面光学微结构透镜方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在MEMS微纳声学传感与曲面光学微结构透镜方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-歌尔股份-120",
        "productName": "微型声电传感与VR近眼显示光学模组",
        "filingYear": "2024",
        "productCategory": "声光电精密微纳制造",
        "annualOutputValue": "68.0 亿元",
        "corePatentCount": 34,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-30",
    "name": "上海韦尔半导体股份有限公司",
    "shortName": "韦尔股份",
    "creditCode": "913100000167438568",
    "registeredCapital": "85,000 万元人民币",
    "location": "吉林省长春市",
    "province": "吉林省",
    "city": "长春市",
    "industry": "电子信息与智能算力 / CIS图像传感器芯片",
    "scale": "上市公司",
    "enterpriseType": "上市企业",
    "revenue": "115.0 亿元 (2024)",
    "rdInvestment": "9.8 亿元",
    "rdRatio": "5.50%",
    "patentTotalCount": 3250,
    "inventionPatentCount": 1920,
    "legalRep": "刘志刚",
    "address": "吉林省长春市高新技术产业开发区创新科技大道460号",
    "phone": "0512-88022220",
    "email": "rd_tech@韦尔股份.com.cn",
    "website": "https://www.韦尔股份.com.cn",
    "establishedDate": "2013-03-15",
    "businessScope": "高动态车规级CMOS图像传感芯片及光栅的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 92,
    "synergyReason": "作为集成电路产业链上游 • 核心芯片设计与光刻制造的重点骨干企业，在高动态车规级CMOS图像传感芯片及光栅领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-22",
      "chainName": "集成电路",
      "node": "upstream",
      "nodeName": "上游 • 核心芯片设计与光刻制造",
      "subSegment": "高动态车规级CMOS图像传感芯片及光栅",
      "mainProducts": [
        "车规级800万像素高动态范围CIS芯片",
        "韦尔股份核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117026280B",
        "title": "一种针对高动态车规级CMOS图像传感芯的材料制备与高精度调控方法",
        "ipc": "C08G 65/40, H01M 10/052",
        "grantDate": "2023-03-15",
        "similarityScore": 92,
        "abstract": "本发明公开了一种一种针对高动态车规级CMOS图像传感芯的材料制备与高精度调控方法，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在高动态车规级CMOS图像传感芯片及光栅方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在高动态车规级CMOS图像传感芯片及光栅方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-韦尔股份-121",
        "productName": "车规级800万像素高动态范围CIS芯片",
        "filingYear": "2024",
        "productCategory": "CIS图像传感器芯片",
        "annualOutputValue": "55.0 亿元",
        "corePatentCount": 15,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-31",
    "name": "三安光电股份有限公司",
    "shortName": "三安光电",
    "creditCode": "913100000175810496",
    "registeredCapital": "88,500 万元人民币",
    "location": "吉林省吉林市",
    "province": "吉林省",
    "city": "吉林市",
    "industry": "电子信息与智能算力 / 化合物半导体与光电材料",
    "scale": "上市公司",
    "enterpriseType": "上市企业",
    "revenue": "119.5 亿元 (2024)",
    "rdInvestment": "10.2 亿元",
    "rdRatio": "6.40%",
    "patentTotalCount": 3370,
    "inventionPatentCount": 1995,
    "legalRep": "孙明",
    "address": "吉林省吉林市高新技术产业开发区创新科技大道478号",
    "phone": "0755-88023331",
    "email": "rd_tech@三安光电.com.cn",
    "website": "https://www.三安光电.com.cn",
    "establishedDate": "2014-04-15",
    "businessScope": "碳化硅SiC功率晶圆与微结构光电发光外延的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 93,
    "synergyReason": "作为纳米新材料产业链上游 • 核心晶圆与微纳外延片的重点骨干企业，在碳化硅SiC功率晶圆与微结构光电发光外延领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-18",
      "chainName": "纳米新材料",
      "node": "upstream",
      "nodeName": "上游 • 核心晶圆与微纳外延片",
      "subSegment": "碳化硅SiC功率晶圆与微结构光电发光外延",
      "mainProducts": [
        "高纯宽禁带SiC衬底及发光晶圆",
        "三安光电核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117027594B",
        "title": "一种针对碳化硅SiC功率晶圆与微结构光的材料制备与高精度调控方法",
        "ipc": "C08G 65/40, H01M 10/052",
        "grantDate": "2024-04-16",
        "similarityScore": 93,
        "abstract": "本发明公开了一种一种针对碳化硅SiC功率晶圆与微结构光的材料制备与高精度调控方法，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在碳化硅SiC功率晶圆与微结构光电发光外延方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在碳化硅SiC功率晶圆与微结构光电发光外延方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-三安光电-122",
        "productName": "高纯宽禁带SiC衬底及发光晶圆",
        "filingYear": "2024",
        "productCategory": "化合物半导体与光电材料",
        "annualOutputValue": "39.0 亿元",
        "corePatentCount": 16,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-32",
    "name": "武汉华工科技产业股份有限公司",
    "shortName": "华工科技",
    "creditCode": "913100000184182424",
    "registeredCapital": "92,000 万元人民币",
    "location": "江苏省苏州市",
    "province": "江苏省",
    "city": "苏州市",
    "industry": "电子信息与智能算力 / 激光精密制造装备",
    "scale": "上市公司",
    "enterpriseType": "上市企业",
    "revenue": "124.0 亿元 (2024)",
    "rdInvestment": "10.6 亿元",
    "rdRatio": "7.30%",
    "patentTotalCount": 3490,
    "inventionPatentCount": 2070,
    "legalRep": "周海峰",
    "address": "江苏省苏州市高新技术产业开发区创新科技大道496号",
    "phone": "0512-88024442",
    "email": "rd_tech@华工科技.com.cn",
    "website": "https://www.华工科技.com.cn",
    "establishedDate": "2015-05-15",
    "businessScope": "皮秒/飞秒超快激光精密微纳加工装备的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 94,
    "synergyReason": "作为传感器产业链中游 • 精密装备与激光刻蚀的重点骨干企业，在皮秒/飞秒超快激光精密微纳加工装备领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-16",
      "chainName": "传感器",
      "node": "midstream",
      "nodeName": "中游 • 精密装备与激光刻蚀",
      "subSegment": "皮秒/飞秒超快激光精密微纳加工装备",
      "mainProducts": [
        "超快激光微纳晶圆切割与光栅加工系统",
        "华工科技核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117028908B",
        "title": "一种针对皮秒/飞秒超快激光精密微纳加工的精密加工成型与自适应控制系统",
        "ipc": "B60T 8/17, G05B 19/40",
        "grantDate": "2023-05-17",
        "similarityScore": 94,
        "abstract": "本发明公开了一种一种针对皮秒/飞秒超快激光精密微纳加工的精密加工成型与自适应控制系统，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在皮秒/飞秒超快激光精密微纳加工装备方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在皮秒/飞秒超快激光精密微纳加工装备方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-华工科技-123",
        "productName": "超快激光微纳晶圆切割与光栅加工系统",
        "filingYear": "2024",
        "productCategory": "激光精密制造装备",
        "annualOutputValue": "29.0 亿元",
        "corePatentCount": 17,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-33",
    "name": "苏州敏芯微电子技术股份有限公司",
    "shortName": "敏芯股份",
    "creditCode": "913100000192554352",
    "registeredCapital": "95,500 万元人民币",
    "location": "江苏省无锡市",
    "province": "江苏省",
    "city": "无锡市",
    "industry": "电子信息与智能算力 / MEMS微机电传感",
    "scale": "国家级专精特新",
    "enterpriseType": "国家级专精特新“小巨人”",
    "revenue": "128.5 亿元 (2024)",
    "rdInvestment": "11.0 亿元",
    "rdRatio": "8.20%",
    "patentTotalCount": 3610,
    "inventionPatentCount": 2145,
    "legalRep": "赵立国",
    "address": "江苏省无锡市高新技术产业开发区创新科技大道514号",
    "phone": "0755-88025553",
    "email": "rd_tech@敏芯股份.com.cn",
    "website": "https://www.敏芯股份.com.cn",
    "establishedDate": "2016-06-15",
    "businessScope": "全产业链MEMS微纳压力与位移传感器芯片的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 95,
    "synergyReason": "作为传感器产业链上游 • MEMS晶圆设计与微纳封装的重点骨干企业，在全产业链MEMS微纳压力与位移传感器芯片领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-16",
      "chainName": "传感器",
      "node": "upstream",
      "nodeName": "上游 • MEMS晶圆设计与微纳封装",
      "subSegment": "全产业链MEMS微纳压力与位移传感器芯片",
      "mainProducts": [
        "高可靠性汽车级MEMS绝对压力传感器",
        "敏芯股份核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117030222B",
        "title": "一种针对全产业链MEMS微纳压力与位移的材料制备与高精度调控方法",
        "ipc": "C08G 65/40, H01M 10/052",
        "grantDate": "2024-06-18",
        "similarityScore": 95,
        "abstract": "本发明公开了一种一种针对全产业链MEMS微纳压力与位移的材料制备与高精度调控方法，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在全产业链MEMS微纳压力与位移传感器芯片方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在全产业链MEMS微纳压力与位移传感器芯片方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-敏芯股份-124",
        "productName": "高可靠性汽车级MEMS绝对压力传感器",
        "filingYear": "2024",
        "productCategory": "MEMS微机电传感",
        "annualOutputValue": "8.2 亿元",
        "corePatentCount": 18,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-34",
    "name": "中简科技股份有限公司",
    "shortName": "中简科技",
    "creditCode": "913100000200926281",
    "registeredCapital": "99,000 万元人民币",
    "location": "江苏省南京市",
    "province": "江苏省",
    "city": "南京市",
    "industry": "新材料 / 高性能碳纤维及复合材料",
    "scale": "国家级专精特新",
    "enterpriseType": "国家级专精特新“小巨人”",
    "revenue": "133.0 亿元 (2024)",
    "rdInvestment": "11.4 亿元",
    "rdRatio": "9.10%",
    "patentTotalCount": 3730,
    "inventionPatentCount": 2220,
    "legalRep": "张伟",
    "address": "江苏省南京市高新技术产业开发区创新科技大道532号",
    "phone": "0512-88026664",
    "email": "rd_tech@中简科技.com.cn",
    "website": "https://www.中简科技.com.cn",
    "establishedDate": "2017-07-15",
    "businessScope": "ZT7/ZT9系列高强高模碳纤维预浸料的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 96,
    "synergyReason": "作为碳纤维产业链上游 • 高性能原丝与碳化材料的重点骨干企业，在ZT7/ZT9系列高强高模碳纤维预浸料领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-6",
      "chainName": "碳纤维",
      "node": "upstream",
      "nodeName": "上游 • 高性能原丝与碳化材料",
      "subSegment": "ZT7/ZT9系列高强高模碳纤维预浸料",
      "mainProducts": [
        "航空级ZT7系列高强碳纤维",
        "中简科技核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117031536B",
        "title": "一种针对ZT7/ZT9系列高强高模碳纤的材料制备与高精度调控方法",
        "ipc": "C08G 65/40, H01M 10/052",
        "grantDate": "2023-07-11",
        "similarityScore": 96,
        "abstract": "本发明公开了一种一种针对ZT7/ZT9系列高强高模碳纤的材料制备与高精度调控方法，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在ZT7/ZT9系列高强高模碳纤维预浸料方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在ZT7/ZT9系列高强高模碳纤维预浸料方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-中简科技-125",
        "productName": "航空级ZT7系列高强碳纤维",
        "filingYear": "2024",
        "productCategory": "高性能碳纤维及复合材料",
        "annualOutputValue": "12.6 亿元",
        "corePatentCount": 19,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-35",
    "name": "光威复合材料股份有限公司",
    "shortName": "光威复材",
    "creditCode": "913100000209298209",
    "registeredCapital": "102,500 万元人民币",
    "location": "浙江省杭州市",
    "province": "浙江省",
    "city": "杭州市",
    "industry": "新材料 / 碳纤维与热塑性复合材料",
    "scale": "上市公司",
    "enterpriseType": "上市企业",
    "revenue": "137.5 亿元 (2024)",
    "rdInvestment": "11.8 亿元",
    "rdRatio": "5.50%",
    "patentTotalCount": 3850,
    "inventionPatentCount": 2295,
    "legalRep": "李强",
    "address": "浙江省杭州市高新技术产业开发区创新科技大道550号",
    "phone": "0755-88027775",
    "email": "rd_tech@光威复材.com.cn",
    "website": "https://www.光威复材.com.cn",
    "establishedDate": "2018-08-15",
    "businessScope": "耐500℃高温超强韧PEEK碳纤维复合预浸料的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 97,
    "synergyReason": "作为碳纤维产业链中游 • 织物与预浸料复合加工的重点骨干企业，在耐500℃高温超强韧PEEK碳纤维复合预浸料领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-6",
      "chainName": "碳纤维",
      "node": "midstream",
      "nodeName": "中游 • 织物与预浸料复合加工",
      "subSegment": "耐500℃高温超强韧PEEK碳纤维复合预浸料",
      "mainProducts": [
        "航空级高性能碳纤维织物及热塑性预浸料",
        "光威复材核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117032850B",
        "title": "一种针对耐500℃高温超强韧PEEK碳的精密加工成型与自适应控制系统",
        "ipc": "B60T 8/17, G05B 19/40",
        "grantDate": "2024-08-12",
        "similarityScore": 97,
        "abstract": "本发明公开了一种一种针对耐500℃高温超强韧PEEK碳的精密加工成型与自适应控制系统，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在耐500℃高温超强韧PEEK碳纤维复合预浸料方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在耐500℃高温超强韧PEEK碳纤维复合预浸料方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-光威复材-126",
        "productName": "航空级高性能碳纤维织物及热塑性预浸料",
        "filingYear": "2024",
        "productCategory": "碳纤维与热塑性复合材料",
        "annualOutputValue": "27.5 亿元",
        "corePatentCount": 20,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-36",
    "name": "联泓新材料科技股份有限公司",
    "shortName": "联泓新科",
    "creditCode": "913100000217670137",
    "registeredCapital": "106,000 万元人民币",
    "location": "浙江省宁波市",
    "province": "浙江省",
    "city": "宁波市",
    "industry": "新材料 / 电子级特种聚合物与高分子",
    "scale": "上市公司",
    "enterpriseType": "上市企业",
    "revenue": "142.0 亿元 (2024)",
    "rdInvestment": "12.2 亿元",
    "rdRatio": "6.40%",
    "patentTotalCount": 3970,
    "inventionPatentCount": 2370,
    "legalRep": "王建华",
    "address": "浙江省宁波市高新技术产业开发区创新科技大道568号",
    "phone": "0512-88028886",
    "email": "rd_tech@联泓新科.com.cn",
    "website": "https://www.联泓新科.com.cn",
    "establishedDate": "2019-09-15",
    "businessScope": "高纯度聚芳醚酮(PEEK)及超分子精细化学品的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 98,
    "synergyReason": "作为纳米新材料产业链上游 • 特种单体与高纯高分子树脂的重点骨干企业，在高纯度聚芳醚酮(PEEK)及超分子精细化学品领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-18",
      "chainName": "纳米新材料",
      "node": "upstream",
      "nodeName": "上游 • 特种单体与高纯高分子树脂",
      "subSegment": "高纯度聚芳醚酮(PEEK)及超分子精细化学品",
      "mainProducts": [
        "特种电子级EVA与聚醚功能材料",
        "联泓新科核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117034164B",
        "title": "一种针对高纯度聚芳醚酮(PEEK)及超的材料制备与高精度调控方法",
        "ipc": "C08G 65/40, H01M 10/052",
        "grantDate": "2023-09-13",
        "similarityScore": 98,
        "abstract": "本发明公开了一种一种针对高纯度聚芳醚酮(PEEK)及超的材料制备与高精度调控方法，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在高纯度聚芳醚酮(PEEK)及超分子精细化学品方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在高纯度聚芳醚酮(PEEK)及超分子精细化学品方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-联泓新科-127",
        "productName": "特种电子级EVA与聚醚功能材料",
        "filingYear": "2024",
        "productCategory": "电子级特种聚合物与高分子",
        "annualOutputValue": "31.0 亿元",
        "corePatentCount": 21,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-37",
    "name": "宝武碳业科技股份有限公司",
    "shortName": "宝武碳业",
    "creditCode": "913100000226042066",
    "registeredCapital": "109,500 万元人民币",
    "location": "广东省深圳市",
    "province": "广东省",
    "city": "深圳市",
    "industry": "新材料 / 碳基新材料与石墨烯",
    "scale": "行业央国企",
    "enterpriseType": "行业龙头国企",
    "revenue": "146.5 亿元 (2024)",
    "rdInvestment": "12.6 亿元",
    "rdRatio": "7.30%",
    "patentTotalCount": 4090,
    "inventionPatentCount": 2445,
    "legalRep": "陈敏",
    "address": "广东省深圳市高新技术产业开发区创新科技大道586号",
    "phone": "0755-88029997",
    "email": "rd_tech@宝武碳业.com.cn",
    "website": "https://www.宝武碳业.com.cn",
    "establishedDate": "2020-01-15",
    "businessScope": "高导热石墨烯膜与高端锂电负极碳材料的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 90,
    "synergyReason": "作为石墨烯产业链上游 • 碳化原料与石墨烯浆料的重点骨干企业，在高导热石墨烯膜与高端锂电负极碳材料领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-7",
      "chainName": "石墨烯",
      "node": "upstream",
      "nodeName": "上游 • 碳化原料与石墨烯浆料",
      "subSegment": "高导热石墨烯膜与高端锂电负极碳材料",
      "mainProducts": [
        "高导电超细石墨烯纳米导电浆料",
        "宝武碳业核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117035478B",
        "title": "一种针对高导热石墨烯膜与高端锂电负极碳的材料制备与高精度调控方法",
        "ipc": "C08G 65/40, H01M 10/052",
        "grantDate": "2024-01-14",
        "similarityScore": 90,
        "abstract": "本发明公开了一种一种针对高导热石墨烯膜与高端锂电负极碳的材料制备与高精度调控方法，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在高导热石墨烯膜与高端锂电负极碳材料方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在高导热石墨烯膜与高端锂电负极碳材料方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-宝武碳业-128",
        "productName": "高导电超细石墨烯纳米导电浆料",
        "filingYear": "2024",
        "productCategory": "碳基新材料与石墨烯",
        "annualOutputValue": "41.0 亿元",
        "corePatentCount": 22,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-38",
    "name": "无锡先导智能装备股份有限公司",
    "shortName": "先导智能",
    "creditCode": "913100000234413994",
    "registeredCapital": "113,000 万元人民币",
    "location": "广东省广州市",
    "province": "广东省",
    "city": "广州市",
    "industry": "高端装备制造 / 新能源智能装备",
    "scale": "国家级专精特新",
    "enterpriseType": "制造业单项冠军",
    "revenue": "151.0 亿元 (2024)",
    "rdInvestment": "13.0 亿元",
    "rdRatio": "8.20%",
    "patentTotalCount": 4210,
    "inventionPatentCount": 2520,
    "legalRep": "刘志刚",
    "address": "广东省广州市高新技术产业开发区创新科技大道604号",
    "phone": "0512-88031108",
    "email": "rd_tech@先导智能.com.cn",
    "website": "https://www.先导智能.com.cn",
    "establishedDate": "2021-02-15",
    "businessScope": "高精度电驱动转子压装与激光加工成套装备的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 91,
    "synergyReason": "作为数控机床产业链中游 • 高端自动化整机制造的重点骨干企业，在高精度电驱动转子压装与激光加工成套装备领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-10",
      "chainName": "数控机床",
      "node": "midstream",
      "nodeName": "中游 • 高端自动化整机制造",
      "subSegment": "高精度电驱动转子压装与激光加工成套装备",
      "mainProducts": [
        "全自动锂电卷绕叠片智能装备产线",
        "先导智能核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117036792B",
        "title": "一种针对高精度电驱动转子压装与激光加工的精密加工成型与自适应控制系统",
        "ipc": "B60T 8/17, G05B 19/40",
        "grantDate": "2023-02-15",
        "similarityScore": 91,
        "abstract": "本发明公开了一种一种针对高精度电驱动转子压装与激光加工的精密加工成型与自适应控制系统，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在高精度电驱动转子压装与激光加工成套装备方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在高精度电驱动转子压装与激光加工成套装备方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-先导智能-129",
        "productName": "全自动锂电卷绕叠片智能装备产线",
        "filingYear": "2024",
        "productCategory": "新能源智能装备",
        "annualOutputValue": "78.0 亿元",
        "corePatentCount": 23,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-39",
    "name": "苏州绿的谐波传动科技股份有限公司",
    "shortName": "绿的谐波",
    "creditCode": "913100000242785922",
    "registeredCapital": "116,500 万元人民币",
    "location": "广东省东莞市",
    "province": "广东省",
    "city": "东莞市",
    "industry": "高端装备制造 / 精密减速器与机器人核心部件",
    "scale": "国家级专精特新",
    "enterpriseType": "国家级专精特新“小巨人”",
    "revenue": "155.5 亿元 (2024)",
    "rdInvestment": "13.4 亿元",
    "rdRatio": "9.10%",
    "patentTotalCount": 4330,
    "inventionPatentCount": 2595,
    "legalRep": "孙明",
    "address": "广东省东莞市高新技术产业开发区创新科技大道622号",
    "phone": "0755-88032219",
    "email": "rd_tech@绿的谐波.com.cn",
    "website": "https://www.绿的谐波.com.cn",
    "establishedDate": "2022-03-15",
    "businessScope": "高精度高寿命谐波减速器与一体化执行关节的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 92,
    "synergyReason": "作为机器人产业链上游 • 核心精密传动部件的重点骨干企业，在高精度高寿命谐波减速器与一体化执行关节领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-9",
      "chainName": "机器人",
      "node": "upstream",
      "nodeName": "上游 • 核心精密传动部件",
      "subSegment": "高精度高寿命谐波减速器与一体化执行关节",
      "mainProducts": [
        "Y系列高刚性精密谐波减速器",
        "绿的谐波核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117038106B",
        "title": "一种针对高精度高寿命谐波减速器与一体化的材料制备与高精度调控方法",
        "ipc": "C08G 65/40, H01M 10/052",
        "grantDate": "2024-03-16",
        "similarityScore": 92,
        "abstract": "本发明公开了一种一种针对高精度高寿命谐波减速器与一体化的材料制备与高精度调控方法，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在高精度高寿命谐波减速器与一体化执行关节方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在高精度高寿命谐波减速器与一体化执行关节方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-绿的谐波-130",
        "productName": "Y系列高刚性精密谐波减速器",
        "filingYear": "2024",
        "productCategory": "精密减速器与机器人核心部件",
        "annualOutputValue": "14.8 亿元",
        "corePatentCount": 24,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-40",
    "name": "南京埃斯顿自动化股份有限公司",
    "shortName": "埃斯顿",
    "creditCode": "913100000251157851",
    "registeredCapital": "120,000 万元人民币",
    "location": "山东省济南市",
    "province": "山东省",
    "city": "济南市",
    "industry": "高端装备制造 / 工业机器人及核心伺服",
    "scale": "上市公司",
    "enterpriseType": "上市企业",
    "revenue": "160.0 亿元 (2024)",
    "rdInvestment": "13.8 亿元",
    "rdRatio": "5.50%",
    "patentTotalCount": 4450,
    "inventionPatentCount": 2670,
    "legalRep": "周海峰",
    "address": "山东省济南市高新技术产业开发区创新科技大道640号",
    "phone": "0512-88033330",
    "email": "rd_tech@埃斯顿.com.cn",
    "website": "https://www.埃斯顿.com.cn",
    "establishedDate": "2008-04-15",
    "businessScope": "大负载多轴工业机器人与末端柔顺力控装配的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 93,
    "synergyReason": "作为机器人产业链中游 • 机器人本体与集成系统的重点骨干企业，在大负载多轴工业机器人与末端柔顺力控装配领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-9",
      "chainName": "机器人",
      "node": "midstream",
      "nodeName": "中游 • 机器人本体与集成系统",
      "subSegment": "大负载多轴工业机器人与末端柔顺力控装配",
      "mainProducts": [
        "ER280系列大负载六轴智能工业机器人",
        "埃斯顿核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117039420B",
        "title": "一种针对大负载多轴工业机器人与末端柔顺的精密加工成型与自适应控制系统",
        "ipc": "B60T 8/17, G05B 19/40",
        "grantDate": "2023-04-17",
        "similarityScore": 93,
        "abstract": "本发明公开了一种一种针对大负载多轴工业机器人与末端柔顺的精密加工成型与自适应控制系统，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在大负载多轴工业机器人与末端柔顺力控装配方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在大负载多轴工业机器人与末端柔顺力控装配方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-埃斯顿-131",
        "productName": "ER280系列大负载六轴智能工业机器人",
        "filingYear": "2024",
        "productCategory": "工业机器人及核心伺服",
        "annualOutputValue": "35.0 亿元",
        "corePatentCount": 25,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-41",
    "name": "深圳市汇川技术股份有限公司",
    "shortName": "汇川技术",
    "creditCode": "913100000259529779",
    "registeredCapital": "123,500 万元人民币",
    "location": "山东省青岛市",
    "province": "山东省",
    "city": "青岛市",
    "industry": "高端装备制造 / 工业自动化与电驱总成",
    "scale": "上市公司",
    "enterpriseType": "上市企业",
    "revenue": "164.5 亿元 (2024)",
    "rdInvestment": "14.2 亿元",
    "rdRatio": "6.40%",
    "patentTotalCount": 4570,
    "inventionPatentCount": 2745,
    "legalRep": "赵立国",
    "address": "山东省青岛市高新技术产业开发区创新科技大道658号",
    "phone": "0755-88034441",
    "email": "rd_tech@汇川技术.com.cn",
    "website": "https://www.汇川技术.com.cn",
    "establishedDate": "2009-05-15",
    "businessScope": "高响应永磁伺服电机与多轴运动控制器的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 94,
    "synergyReason": "作为机器人产业链上游 • 伺服驱动与高性能电控的重点骨干企业，在高响应永磁伺服电机与多轴运动控制器领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-9",
      "chainName": "机器人",
      "node": "upstream",
      "nodeName": "上游 • 伺服驱动与高性能电控",
      "subSegment": "高响应永磁伺服电机与多轴运动控制器",
      "mainProducts": [
        "MD810系列多机驱动伺服系统",
        "汇川技术核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117040734B",
        "title": "一种针对高响应永磁伺服电机与多轴运动控的材料制备与高精度调控方法",
        "ipc": "C08G 65/40, H01M 10/052",
        "grantDate": "2024-05-18",
        "similarityScore": 94,
        "abstract": "本发明公开了一种一种针对高响应永磁伺服电机与多轴运动控的材料制备与高精度调控方法，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在高响应永磁伺服电机与多轴运动控制器方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在高响应永磁伺服电机与多轴运动控制器方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-汇川技术-132",
        "productName": "MD810系列多机驱动伺服系统",
        "filingYear": "2024",
        "productCategory": "工业自动化与电驱总成",
        "annualOutputValue": "92.0 亿元",
        "corePatentCount": 26,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-42",
    "name": "上海鸣志电器股份有限公司",
    "shortName": "鸣志电器",
    "creditCode": "913100000267901707",
    "registeredCapital": "127,000 万元人民币",
    "location": "北京市北京市",
    "province": "北京市",
    "city": "北京市",
    "industry": "高端装备制造 / 精密控制电机与步进驱动",
    "scale": "上市公司",
    "enterpriseType": "上市企业",
    "revenue": "169.0 亿元 (2024)",
    "rdInvestment": "14.6 亿元",
    "rdRatio": "7.30%",
    "patentTotalCount": 4690,
    "inventionPatentCount": 2820,
    "legalRep": "张伟",
    "address": "北京市北京市高新技术产业开发区创新科技大道676号",
    "phone": "0512-88035552",
    "email": "rd_tech@鸣志电器.com.cn",
    "website": "https://www.鸣志电器.com.cn",
    "establishedDate": "2010-06-15",
    "businessScope": "机器人灵巧手空心杯电机与微型行星减速器的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 95,
    "synergyReason": "作为机器人产业链上游 • 微特精密电机与空心杯电机的重点骨干企业，在机器人灵巧手空心杯电机与微型行星减速器领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-9",
      "chainName": "机器人",
      "node": "upstream",
      "nodeName": "上游 • 微特精密电机与空心杯电机",
      "subSegment": "机器人灵巧手空心杯电机与微型行星减速器",
      "mainProducts": [
        "高转矩密度精密无刷空心杯电机",
        "鸣志电器核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117042048B",
        "title": "一种针对机器人灵巧手空心杯电机与微型行的材料制备与高精度调控方法",
        "ipc": "C08G 65/40, H01M 10/052",
        "grantDate": "2023-06-11",
        "similarityScore": 95,
        "abstract": "本发明公开了一种一种针对机器人灵巧手空心杯电机与微型行的材料制备与高精度调控方法，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在机器人灵巧手空心杯电机与微型行星减速器方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在机器人灵巧手空心杯电机与微型行星减速器方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-鸣志电器-133",
        "productName": "高转矩密度精密无刷空心杯电机",
        "filingYear": "2024",
        "productCategory": "精密控制电机与步进驱动",
        "annualOutputValue": "21.0 亿元",
        "corePatentCount": 27,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-43",
    "name": "中航光电科技股份有限公司",
    "shortName": "中航光电",
    "creditCode": "913100000276273636",
    "registeredCapital": "130,500 万元人民币",
    "location": "上海市上海市",
    "province": "上海市",
    "city": "上海市",
    "industry": "高端装备制造 / 航空航天与高端互连器件",
    "scale": "行业央国企",
    "enterpriseType": "行业龙头国企",
    "revenue": "173.5 亿元 (2024)",
    "rdInvestment": "15.0 亿元",
    "rdRatio": "8.20%",
    "patentTotalCount": 4810,
    "inventionPatentCount": 2895,
    "legalRep": "李强",
    "address": "上海市上海市高新技术产业开发区创新科技大道694号",
    "phone": "0755-88036663",
    "email": "rd_tech@中航光电.com.cn",
    "website": "https://www.中航光电.com.cn",
    "establishedDate": "2011-07-15",
    "businessScope": "超高可靠性抗振光电连接器与深井耐温电缆的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 96,
    "synergyReason": "作为航空装备产业链上游 • 核心光电互连与传感组件的重点骨干企业，在超高可靠性抗振光电连接器与深井耐温电缆领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-30",
      "chainName": "航空装备",
      "node": "upstream",
      "nodeName": "上游 • 核心光电互连与传感组件",
      "subSegment": "超高可靠性抗振光电连接器与深井耐温电缆",
      "mainProducts": [
        "航空级高密度耐极端环境光纤连接器",
        "中航光电核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117043362B",
        "title": "一种针对超高可靠性抗振光电连接器与深井的材料制备与高精度调控方法",
        "ipc": "C08G 65/40, H01M 10/052",
        "grantDate": "2024-07-12",
        "similarityScore": 96,
        "abstract": "本发明公开了一种一种针对超高可靠性抗振光电连接器与深井的材料制备与高精度调控方法，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在超高可靠性抗振光电连接器与深井耐温电缆方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在超高可靠性抗振光电连接器与深井耐温电缆方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-中航光电-134",
        "productName": "航空级高密度耐极端环境光纤连接器",
        "filingYear": "2024",
        "productCategory": "航空航天与高端互连器件",
        "annualOutputValue": "49.0 亿元",
        "corePatentCount": 28,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-44",
    "name": "中国一拖集团有限公司",
    "shortName": "中国一拖",
    "creditCode": "913100000284645565",
    "registeredCapital": "134,000 万元人民币",
    "location": "四川省成都市",
    "province": "四川省",
    "city": "成都市",
    "industry": "高端装备制造 / 农业机械与重型拖拉机",
    "scale": "行业央国企",
    "enterpriseType": "行业龙头国企",
    "revenue": "178.0 亿元 (2024)",
    "rdInvestment": "15.4 亿元",
    "rdRatio": "9.10%",
    "patentTotalCount": 4930,
    "inventionPatentCount": 2970,
    "legalRep": "王建华",
    "address": "四川省成都市高新技术产业开发区创新科技大道712号",
    "phone": "0512-88037774",
    "email": "rd_tech@中国一拖.com.cn",
    "website": "https://www.中国一拖.com.cn",
    "establishedDate": "2012-08-15",
    "businessScope": "大马力智能轮式拖拉机与免耕少耕一体化播种机的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 97,
    "synergyReason": "作为农业机械设备产业链下游 • 智能农机终端与成套装备的重点骨干企业，在大马力智能轮式拖拉机与免耕少耕一体化播种机领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-34",
      "chainName": "农业机械设备",
      "node": "downstream",
      "nodeName": "下游 • 智能农机终端与成套装备",
      "subSegment": "大马力智能轮式拖拉机与免耕少耕一体化播种机",
      "mainProducts": [
        "东方红-LW3204型大马力无级变速轮式拖拉机",
        "中国一拖核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117044676B",
        "title": "一种针对大马力智能轮式拖拉机与免耕少耕的整机集成动力学优化与安全控制装置",
        "ipc": "B60W 30/00, A61B 34/30",
        "grantDate": "2023-08-13",
        "similarityScore": 97,
        "abstract": "本发明公开了一种一种针对大马力智能轮式拖拉机与免耕少耕的整机集成动力学优化与安全控制装置，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在大马力智能轮式拖拉机与免耕少耕一体化播种机方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在大马力智能轮式拖拉机与免耕少耕一体化播种机方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-中国一拖-135",
        "productName": "东方红-LW3204型大马力无级变速轮式拖拉机",
        "filingYear": "2024",
        "productCategory": "农业机械与重型拖拉机",
        "annualOutputValue": "38.0 亿元",
        "corePatentCount": 29,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-45",
    "name": "潍柴雷沃智慧农业科技股份有限公司",
    "shortName": "雷沃重工",
    "creditCode": "913100000293017493",
    "registeredCapital": "137,500 万元人民币",
    "location": "湖北省武汉市",
    "province": "湖北省",
    "city": "武汉市",
    "industry": "高端装备制造 / 智能农机装备",
    "scale": "行业央国企",
    "enterpriseType": "行业龙头国企",
    "revenue": "182.5 亿元 (2024)",
    "rdInvestment": "15.8 亿元",
    "rdRatio": "5.50%",
    "patentTotalCount": 5050,
    "inventionPatentCount": 3045,
    "legalRep": "陈敏",
    "address": "湖北省武汉市高新技术产业开发区创新科技大道730号",
    "phone": "0755-88038885",
    "email": "rd_tech@雷沃重工.com.cn",
    "website": "https://www.雷沃重工.com.cn",
    "establishedDate": "2013-09-15",
    "businessScope": "黑土地保护性耕作免耕播种机与智能测控系统的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 98,
    "synergyReason": "作为农业机械设备产业链下游 • 农田作业整机装备的重点骨干企业，在黑土地保护性耕作免耕播种机与智能测控系统领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-34",
      "chainName": "农业机械设备",
      "node": "downstream",
      "nodeName": "下游 • 农田作业整机装备",
      "subSegment": "黑土地保护性耕作免耕播种机与智能测控系统",
      "mainProducts": [
        "雷沃谷神联合收割机及智能免耕播种机",
        "雷沃重工核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117045990B",
        "title": "一种针对黑土地保护性耕作免耕播种机与智的整机集成动力学优化与安全控制装置",
        "ipc": "B60W 30/00, A61B 34/30",
        "grantDate": "2024-09-14",
        "similarityScore": 98,
        "abstract": "本发明公开了一种一种针对黑土地保护性耕作免耕播种机与智的整机集成动力学优化与安全控制装置，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在黑土地保护性耕作免耕播种机与智能测控系统方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在黑土地保护性耕作免耕播种机与智能测控系统方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-雷沃重工-136",
        "productName": "雷沃谷神联合收割机及智能免耕播种机",
        "filingYear": "2024",
        "productCategory": "智能农机装备",
        "annualOutputValue": "43.0 亿元",
        "corePatentCount": 30,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-46",
    "name": "中车时代电气股份有限公司",
    "shortName": "时代电气",
    "creditCode": "913100000301389421",
    "registeredCapital": "141,000 万元人民币",
    "location": "安徽省合肥市",
    "province": "安徽省",
    "city": "合肥市",
    "industry": "高端装备制造 / 轨道交通与电力电子",
    "scale": "上市公司",
    "enterpriseType": "上市企业",
    "revenue": "187.0 亿元 (2024)",
    "rdInvestment": "16.2 亿元",
    "rdRatio": "6.40%",
    "patentTotalCount": 5170,
    "inventionPatentCount": 3120,
    "legalRep": "刘志刚",
    "address": "安徽省合肥市高新技术产业开发区创新科技大道748号",
    "phone": "0512-88039996",
    "email": "rd_tech@时代电气.com.cn",
    "website": "https://www.时代电气.com.cn",
    "establishedDate": "2014-01-15",
    "businessScope": "重载列车电液复合制动与IGBT逆变牵引系统的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 90,
    "synergyReason": "作为轨道交通产业链中游 • 牵引传动与制动电控的重点骨干企业，在重载列车电液复合制动与IGBT逆变牵引系统领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-5",
      "chainName": "轨道交通",
      "node": "midstream",
      "nodeName": "中游 • 牵引传动与制动电控",
      "subSegment": "重载列车电液复合制动与IGBT逆变牵引系统",
      "mainProducts": [
        "高可靠机车电制动与微机防滑控制系统",
        "时代电气核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117047304B",
        "title": "一种针对重载列车电液复合制动与IGBT的精密加工成型与自适应控制系统",
        "ipc": "B60T 8/17, G05B 19/40",
        "grantDate": "2023-01-15",
        "similarityScore": 90,
        "abstract": "本发明公开了一种一种针对重载列车电液复合制动与IGBT的精密加工成型与自适应控制系统，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在重载列车电液复合制动与IGBT逆变牵引系统方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在重载列车电液复合制动与IGBT逆变牵引系统方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-时代电气-137",
        "productName": "高可靠机车电制动与微机防滑控制系统",
        "filingYear": "2024",
        "productCategory": "轨道交通与电力电子",
        "annualOutputValue": "76.0 亿元",
        "corePatentCount": 31,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-47",
    "name": "中国中车集团有限公司",
    "shortName": "中国中车",
    "creditCode": "913100000309761350",
    "registeredCapital": "144,500 万元人民币",
    "location": "陕西省西安市",
    "province": "陕西省",
    "city": "西安市",
    "industry": "高端装备制造 / 轨道交通整车装备",
    "scale": "行业央国企",
    "enterpriseType": "行业龙头国企",
    "revenue": "191.5 亿元 (2024)",
    "rdInvestment": "16.6 亿元",
    "rdRatio": "7.30%",
    "patentTotalCount": 5290,
    "inventionPatentCount": 3195,
    "legalRep": "孙明",
    "address": "陕西省西安市高新技术产业开发区创新科技大道766号",
    "phone": "0755-88041107",
    "email": "rd_tech@中国中车.com.cn",
    "website": "https://www.中国中车.com.cn",
    "establishedDate": "2015-02-15",
    "businessScope": "时速350公里复兴号智能动车组与制动安全系统的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 91,
    "synergyReason": "作为轨道交通产业链下游 • 高速动车组与重载货车的重点骨干企业，在时速350公里复兴号智能动车组与制动安全系统领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-5",
      "chainName": "轨道交通",
      "node": "downstream",
      "nodeName": "下游 • 高速动车组与重载货车",
      "subSegment": "时速350公里复兴号智能动车组与制动安全系统",
      "mainProducts": [
        "CR450新一代更高速度智能动车组",
        "中国中车核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117048618B",
        "title": "一种针对时速350公里复兴号智能动车组的整机集成动力学优化与安全控制装置",
        "ipc": "B60W 30/00, A61B 34/30",
        "grantDate": "2024-02-16",
        "similarityScore": 91,
        "abstract": "本发明公开了一种一种针对时速350公里复兴号智能动车组的整机集成动力学优化与安全控制装置，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在时速350公里复兴号智能动车组与制动安全系统方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在时速350公里复兴号智能动车组与制动安全系统方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-中国中车-138",
        "productName": "CR450新一代更高速度智能动车组",
        "filingYear": "2024",
        "productCategory": "轨道交通整车装备",
        "annualOutputValue": "2,300 亿元",
        "corePatentCount": 32,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-48",
    "name": "阳光电源股份有限公司",
    "shortName": "阳光电源",
    "creditCode": "913100000318133278",
    "registeredCapital": "148,000 万元人民币",
    "location": "辽宁省沈阳市",
    "province": "辽宁省",
    "city": "沈阳市",
    "industry": "新能源与储能 / 光伏与储能逆变器",
    "scale": "上市公司",
    "enterpriseType": "上市企业",
    "revenue": "196.0 亿元 (2024)",
    "rdInvestment": "17.0 亿元",
    "rdRatio": "8.20%",
    "patentTotalCount": 5410,
    "inventionPatentCount": 3270,
    "legalRep": "周海峰",
    "address": "辽宁省沈阳市高新技术产业开发区创新科技大道784号",
    "phone": "0512-88042218",
    "email": "rd_tech@阳光电源.com.cn",
    "website": "https://www.阳光电源.com.cn",
    "establishedDate": "2016-03-15",
    "businessScope": "高压大功率集中式逆变器与液冷储能电站的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 92,
    "synergyReason": "作为光伏产业链下游 • 储能系统与并网总成的重点骨干企业，在高压大功率集中式逆变器与液冷储能电站领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-3",
      "chainName": "光伏",
      "node": "downstream",
      "nodeName": "下游 • 储能系统与并网总成",
      "subSegment": "高压大功率集中式逆变器与液冷储能电站",
      "mainProducts": [
        "PowerTitan新一代液冷储能系统",
        "阳光电源核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117049932B",
        "title": "一种针对高压大功率集中式逆变器与液冷储的整机集成动力学优化与安全控制装置",
        "ipc": "B60W 30/00, A61B 34/30",
        "grantDate": "2023-03-17",
        "similarityScore": 92,
        "abstract": "本发明公开了一种一种针对高压大功率集中式逆变器与液冷储的整机集成动力学优化与安全控制装置，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在高压大功率集中式逆变器与液冷储能电站方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在高压大功率集中式逆变器与液冷储能电站方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-阳光电源-139",
        "productName": "PowerTitan新一代液冷储能系统",
        "filingYear": "2024",
        "productCategory": "光伏与储能逆变器",
        "annualOutputValue": "180.0 亿元",
        "corePatentCount": 33,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-49",
    "name": "新疆金风科技股份有限公司",
    "shortName": "金风科技",
    "creditCode": "913100000326505206",
    "registeredCapital": "151,500 万元人民币",
    "location": "福建省厦门市",
    "province": "福建省",
    "city": "厦门市",
    "industry": "新能源与储能 / 风力发电与智能微网",
    "scale": "上市公司",
    "enterpriseType": "上市企业",
    "revenue": "200.5 亿元 (2024)",
    "rdInvestment": "17.4 亿元",
    "rdRatio": "9.10%",
    "patentTotalCount": 5530,
    "inventionPatentCount": 3345,
    "legalRep": "赵立国",
    "address": "福建省厦门市高新技术产业开发区创新科技大道802号",
    "phone": "0755-88043329",
    "email": "rd_tech@金风科技.com.cn",
    "website": "https://www.金风科技.com.cn",
    "establishedDate": "2017-04-15",
    "businessScope": "10MW+海上半直驱风力发电机组与制动控制的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 93,
    "synergyReason": "作为风电装备产业链下游 • 大功率风机整机制造的重点骨干企业，在10MW+海上半直驱风力发电机组与制动控制领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-13",
      "chainName": "风电装备",
      "node": "downstream",
      "nodeName": "下游 • 大功率风机整机制造",
      "subSegment": "10MW+海上半直驱风力发电机组与制动控制",
      "mainProducts": [
        "GWHV12中速永磁智能风力发电机组",
        "金风科技核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117051246B",
        "title": "一种针对10MW+海上半直驱风力发电机的整机集成动力学优化与安全控制装置",
        "ipc": "B60W 30/00, A61B 34/30",
        "grantDate": "2024-04-18",
        "similarityScore": 93,
        "abstract": "本发明公开了一种一种针对10MW+海上半直驱风力发电机的整机集成动力学优化与安全控制装置，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在10MW+海上半直驱风力发电机组与制动控制方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在10MW+海上半直驱风力发电机组与制动控制方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-金风科技-140",
        "productName": "GWHV12中速永磁智能风力发电机组",
        "filingYear": "2024",
        "productCategory": "风力发电与智能微网",
        "annualOutputValue": "120.0 亿元",
        "corePatentCount": 34,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-50",
    "name": "中复神鹰碳纤维股份有限公司",
    "shortName": "中复神鹰",
    "creditCode": "913100000334877135",
    "registeredCapital": "155,000 万元人民币",
    "location": "吉林省长春市",
    "province": "吉林省",
    "city": "长春市",
    "industry": "新材料 / 高性能碳纤维",
    "scale": "国家级专精特新",
    "enterpriseType": "制造业单项冠军",
    "revenue": "205.0 亿元 (2024)",
    "rdInvestment": "17.8 亿元",
    "rdRatio": "5.50%",
    "patentTotalCount": 5650,
    "inventionPatentCount": 3420,
    "legalRep": "张伟",
    "address": "吉林省长春市高新技术产业开发区创新科技大道820号",
    "phone": "0512-88044440",
    "email": "rd_tech@中复神鹰.com.cn",
    "website": "https://www.中复神鹰.com.cn",
    "establishedDate": "2018-05-15",
    "businessScope": "SYT49S/SYT55G高性能航空干喷湿纺碳纤维的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 94,
    "synergyReason": "作为碳纤维产业链上游 • 航空级碳纤维原丝及碳化的重点骨干企业，在SYT49S/SYT55G高性能航空干喷湿纺碳纤维领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-6",
      "chainName": "碳纤维",
      "node": "upstream",
      "nodeName": "上游 • 航空级碳纤维原丝及碳化",
      "subSegment": "SYT49S/SYT55G高性能航空干喷湿纺碳纤维",
      "mainProducts": [
        "航空航天级高性能碳纤维束",
        "中复神鹰核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117052560B",
        "title": "一种针对SYT49S/SYT55G高性的材料制备与高精度调控方法",
        "ipc": "C08G 65/40, H01M 10/052",
        "grantDate": "2023-05-11",
        "similarityScore": 94,
        "abstract": "本发明公开了一种一种针对SYT49S/SYT55G高性的材料制备与高精度调控方法，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在SYT49S/SYT55G高性能航空干喷湿纺碳纤维方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在SYT49S/SYT55G高性能航空干喷湿纺碳纤维方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-中复神鹰-141",
        "productName": "航空航天级高性能碳纤维束",
        "filingYear": "2024",
        "productCategory": "高性能碳纤维",
        "annualOutputValue": "22.0 亿元",
        "corePatentCount": 15,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-51",
    "name": "江苏联赢激光股份有限公司",
    "shortName": "联赢激光",
    "creditCode": "913100000343249063",
    "registeredCapital": "158,500 万元人民币",
    "location": "吉林省吉林市",
    "province": "吉林省",
    "city": "吉林市",
    "industry": "高端装备制造 / 精密激光焊接系统",
    "scale": "国家级专精特新",
    "enterpriseType": "国家级专精特新“小巨人”",
    "revenue": "209.5 亿元 (2024)",
    "rdInvestment": "18.2 亿元",
    "rdRatio": "6.40%",
    "patentTotalCount": 5770,
    "inventionPatentCount": 3495,
    "legalRep": "李强",
    "address": "吉林省吉林市高新技术产业开发区创新科技大道838号",
    "phone": "0755-88045551",
    "email": "rd_tech@联赢激光.com.cn",
    "website": "https://www.联赢激光.com.cn",
    "establishedDate": "2019-06-15",
    "businessScope": "蓝光/光纤复合超快激光精密焊接装备的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 95,
    "synergyReason": "作为数控机床产业链中游 • 精密激光加工装备的重点骨干企业，在蓝光/光纤复合超快激光精密焊接装备领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-10",
      "chainName": "数控机床",
      "node": "midstream",
      "nodeName": "中游 • 精密激光加工装备",
      "subSegment": "蓝光/光纤复合超快激光精密焊接装备",
      "mainProducts": [
        "多波长复合激光动力电池极耳焊接系统",
        "联赢激光核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117053874B",
        "title": "一种针对蓝光/光纤复合超快激光精密焊接的精密加工成型与自适应控制系统",
        "ipc": "B60T 8/17, G05B 19/40",
        "grantDate": "2024-06-12",
        "similarityScore": 95,
        "abstract": "本发明公开了一种一种针对蓝光/光纤复合超快激光精密焊接的精密加工成型与自适应控制系统，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在蓝光/光纤复合超快激光精密焊接装备方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在蓝光/光纤复合超快激光精密焊接装备方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-联赢激光-142",
        "productName": "多波长复合激光动力电池极耳焊接系统",
        "filingYear": "2024",
        "productCategory": "精密激光焊接系统",
        "annualOutputValue": "19.5 亿元",
        "corePatentCount": 16,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-52",
    "name": "西安陕鼓动力股份有限公司",
    "shortName": "陕鼓动力",
    "creditCode": "913100000351620991",
    "registeredCapital": "162,000 万元人民币",
    "location": "江苏省苏州市",
    "province": "江苏省",
    "city": "苏州市",
    "industry": "高端装备制造 / 工业透平与深井钻进",
    "scale": "行业央国企",
    "enterpriseType": "行业龙头国企",
    "revenue": "214.0 亿元 (2024)",
    "rdInvestment": "18.6 亿元",
    "rdRatio": "7.30%",
    "patentTotalCount": 5890,
    "inventionPatentCount": 3570,
    "legalRep": "王建华",
    "address": "江苏省苏州市高新技术产业开发区创新科技大道856号",
    "phone": "0512-88046662",
    "email": "rd_tech@陕鼓动力.com.cn",
    "website": "https://www.陕鼓动力.com.cn",
    "establishedDate": "2020-07-15",
    "businessScope": "深部地层科学钻探高压泥浆泵与井下自适应动力装置的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 96,
    "synergyReason": "作为船舶海工产业链下游 • 动力工程与深部钻进成套装备的重点骨干企业，在深部地层科学钻探高压泥浆泵与井下自适应动力装置领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-19",
      "chainName": "船舶海工",
      "node": "downstream",
      "nodeName": "下游 • 动力工程与深部钻进成套装备",
      "subSegment": "深部地层科学钻探高压泥浆泵与井下自适应动力装置",
      "mainProducts": [
        "大型轴流压缩机与井下深钻动力总成",
        "陕鼓动力核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117055188B",
        "title": "一种针对深部地层科学钻探高压泥浆泵与井的整机集成动力学优化与安全控制装置",
        "ipc": "B60W 30/00, A61B 34/30",
        "grantDate": "2023-07-13",
        "similarityScore": 96,
        "abstract": "本发明公开了一种一种针对深部地层科学钻探高压泥浆泵与井的整机集成动力学优化与安全控制装置，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在深部地层科学钻探高压泥浆泵与井下自适应动力装置方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在深部地层科学钻探高压泥浆泵与井下自适应动力装置方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-陕鼓动力-143",
        "productName": "大型轴流压缩机与井下深钻动力总成",
        "filingYear": "2024",
        "productCategory": "工业透平与深井钻进",
        "annualOutputValue": "28.0 亿元",
        "corePatentCount": 17,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-53",
    "name": "中煤科工西安研究院（集团）有限公司",
    "shortName": "中煤科工",
    "creditCode": "913100000359992919",
    "registeredCapital": "165,500 万元人民币",
    "location": "江苏省无锡市",
    "province": "江苏省",
    "city": "无锡市",
    "industry": "高端装备制造 / 复杂地质智能钻探装备",
    "scale": "行业央国企",
    "enterpriseType": "行业龙头国企",
    "revenue": "218.5 亿元 (2024)",
    "rdInvestment": "19.0 亿元",
    "rdRatio": "8.20%",
    "patentTotalCount": 6010,
    "inventionPatentCount": 3645,
    "legalRep": "陈敏",
    "address": "江苏省无锡市高新技术产业开发区创新科技大道874号",
    "phone": "0755-88047773",
    "email": "rd_tech@中煤科工.com.cn",
    "website": "https://www.中煤科工.com.cn",
    "establishedDate": "2021-08-15",
    "businessScope": "千米定向自适应智能钻机与随钻井下参数感知探头的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 97,
    "synergyReason": "作为船舶海工产业链中游 • 随钻测量与自适应钻具的重点骨干企业，在千米定向自适应智能钻机与随钻井下参数感知探头领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-19",
      "chainName": "船舶海工",
      "node": "midstream",
      "nodeName": "中游 • 随钻测量与自适应钻具",
      "subSegment": "千米定向自适应智能钻机与随钻井下参数感知探头",
      "mainProducts": [
        "ZDY系列智能随钻测量定向钻进成套装备",
        "中煤科工核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117056502B",
        "title": "一种针对千米定向自适应智能钻机与随钻井的精密加工成型与自适应控制系统",
        "ipc": "B60T 8/17, G05B 19/40",
        "grantDate": "2024-08-14",
        "similarityScore": 97,
        "abstract": "本发明公开了一种一种针对千米定向自适应智能钻机与随钻井的精密加工成型与自适应控制系统，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在千米定向自适应智能钻机与随钻井下参数感知探头方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在千米定向自适应智能钻机与随钻井下参数感知探头方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-中煤科工-144",
        "productName": "ZDY系列智能随钻测量定向钻进成套装备",
        "filingYear": "2024",
        "productCategory": "复杂地质智能钻探装备",
        "annualOutputValue": "16.8 亿元",
        "corePatentCount": 18,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-54",
    "name": "长春捷翼汽车科技股份有限公司",
    "shortName": "捷翼科技",
    "creditCode": "913100000368364848",
    "registeredCapital": "169,000 万元人民币",
    "location": "江苏省南京市",
    "province": "江苏省",
    "city": "南京市",
    "industry": "新能源汽车 / 高压线束与连接系统",
    "scale": "国家级专精特新",
    "enterpriseType": "国家级专精特新“小巨人”",
    "revenue": "223.0 亿元 (2024)",
    "rdInvestment": "19.4 亿元",
    "rdRatio": "9.10%",
    "patentTotalCount": 6130,
    "inventionPatentCount": 3720,
    "legalRep": "刘志刚",
    "address": "江苏省南京市高新技术产业开发区创新科技大道892号",
    "phone": "0512-88048884",
    "email": "rd_tech@捷翼科技.com.cn",
    "website": "https://www.捷翼科技.com.cn",
    "establishedDate": "2022-09-15",
    "businessScope": "新能源汽车高压快充线束与铝导体轻量化总成的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 98,
    "synergyReason": "作为新能源汽车产业链上游 • 高压线束与连接系统的重点骨干企业，在新能源汽车高压快充线束与铝导体轻量化总成领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-2",
      "chainName": "新能源汽车",
      "node": "upstream",
      "nodeName": "上游 • 高压线束与连接系统",
      "subSegment": "新能源汽车高压快充线束与铝导体轻量化总成",
      "mainProducts": [
        "高压大电流铝导体轻量化快充线束",
        "捷翼科技核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117057816B",
        "title": "一种针对新能源汽车高压快充线束与铝导体的材料制备与高精度调控方法",
        "ipc": "C08G 65/40, H01M 10/052",
        "grantDate": "2023-09-15",
        "similarityScore": 98,
        "abstract": "本发明公开了一种一种针对新能源汽车高压快充线束与铝导体的材料制备与高精度调控方法，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在新能源汽车高压快充线束与铝导体轻量化总成方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在新能源汽车高压快充线束与铝导体轻量化总成方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-捷翼科技-145",
        "productName": "高压大电流铝导体轻量化快充线束",
        "filingYear": "2024",
        "productCategory": "高压线束与连接系统",
        "annualOutputValue": "18.2 亿元",
        "corePatentCount": 19,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-55",
    "name": "一汽富维汽车零部件股份有限公司",
    "shortName": "一汽富维",
    "creditCode": "913100000376736777",
    "registeredCapital": "172,500 万元人民币",
    "location": "浙江省杭州市",
    "province": "浙江省",
    "city": "杭州市",
    "industry": "新能源汽车 / 汽车智能外饰与座舱",
    "scale": "行业央国企",
    "enterpriseType": "行业龙头国企",
    "revenue": "227.5 亿元 (2024)",
    "rdInvestment": "19.8 亿元",
    "rdRatio": "5.50%",
    "patentTotalCount": 6250,
    "inventionPatentCount": 3795,
    "legalRep": "孙明",
    "address": "浙江省杭州市高新技术产业开发区创新科技大道910号",
    "phone": "0755-88049995",
    "email": "rd_tech@一汽富维.com.cn",
    "website": "https://www.一汽富维.com.cn",
    "establishedDate": "2008-01-15",
    "businessScope": "轻量化复合材料车身与智能感知格栅的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 90,
    "synergyReason": "作为新能源汽车产业链上游 • 智能座舱与车身轻量化材料的重点骨干企业，在轻量化复合材料车身与智能感知格栅领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-2",
      "chainName": "新能源汽车",
      "node": "upstream",
      "nodeName": "上游 • 智能座舱与车身轻量化材料",
      "subSegment": "轻量化复合材料车身与智能感知格栅",
      "mainProducts": [
        "一体化轻量化智能发光外饰总成",
        "一汽富维核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117059130B",
        "title": "一种针对轻量化复合材料车身与智能感知格的材料制备与高精度调控方法",
        "ipc": "C08G 65/40, H01M 10/052",
        "grantDate": "2024-01-16",
        "similarityScore": 90,
        "abstract": "本发明公开了一种一种针对轻量化复合材料车身与智能感知格的材料制备与高精度调控方法，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在轻量化复合材料车身与智能感知格栅方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在轻量化复合材料车身与智能感知格栅方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-一汽富维-146",
        "productName": "一体化轻量化智能发光外饰总成",
        "filingYear": "2024",
        "productCategory": "汽车智能外饰与座舱",
        "annualOutputValue": "145.0 亿元",
        "corePatentCount": 20,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-56",
    "name": "富奥汽车零部件股份有限公司",
    "shortName": "富奥股份",
    "creditCode": "913100000385108705",
    "registeredCapital": "176,000 万元人民币",
    "location": "浙江省宁波市",
    "province": "浙江省",
    "city": "宁波市",
    "industry": "新能源汽车 / 转向与电控悬架",
    "scale": "行业央国企",
    "enterpriseType": "行业龙头国企",
    "revenue": "232.0 亿元 (2024)",
    "rdInvestment": "20.2 亿元",
    "rdRatio": "6.40%",
    "patentTotalCount": 6370,
    "inventionPatentCount": 3870,
    "legalRep": "周海峰",
    "address": "浙江省宁波市高新技术产业开发区创新科技大道928号",
    "phone": "0512-88051106",
    "email": "rd_tech@富奥股份.com.cn",
    "website": "https://www.富奥股份.com.cn",
    "establishedDate": "2009-02-15",
    "businessScope": "电控空气悬架与可变阻尼减振器电磁阀的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 91,
    "synergyReason": "作为新能源汽车产业链上游 • 底盘紧固与减振材料的重点骨干企业，在电控空气悬架与可变阻尼减振器电磁阀领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-2",
      "chainName": "新能源汽车",
      "node": "upstream",
      "nodeName": "上游 • 底盘紧固与减振材料",
      "subSegment": "电控空气悬架与可变阻尼减振器电磁阀",
      "mainProducts": [
        "智能电控主动空气悬架总成",
        "富奥股份核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117060444B",
        "title": "一种针对电控空气悬架与可变阻尼减振器电的材料制备与高精度调控方法",
        "ipc": "C08G 65/40, H01M 10/052",
        "grantDate": "2023-02-17",
        "similarityScore": 91,
        "abstract": "本发明公开了一种一种针对电控空气悬架与可变阻尼减振器电的材料制备与高精度调控方法，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在电控空气悬架与可变阻尼减振器电磁阀方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在电控空气悬架与可变阻尼减振器电磁阀方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-富奥股份-147",
        "productName": "智能电控主动空气悬架总成",
        "filingYear": "2024",
        "productCategory": "转向与电控悬架",
        "annualOutputValue": "158.0 亿元",
        "corePatentCount": 21,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-57",
    "name": "吉林省中研高分子材料股份有限公司",
    "shortName": "中研股份",
    "creditCode": "913100000393480633",
    "registeredCapital": "179,500 万元人民币",
    "location": "广东省深圳市",
    "province": "广东省",
    "city": "深圳市",
    "industry": "新材料 / 特种工程塑料PEEK",
    "scale": "国家级专精特新",
    "enterpriseType": "国家级专精特新“小巨人”",
    "revenue": "236.5 亿元 (2024)",
    "rdInvestment": "20.6 亿元",
    "rdRatio": "7.30%",
    "patentTotalCount": 6490,
    "inventionPatentCount": 3945,
    "legalRep": "赵立国",
    "address": "广东省深圳市高新技术产业开发区创新科技大道946号",
    "phone": "0755-88052217",
    "email": "rd_tech@中研股份.com.cn",
    "website": "https://www.中研股份.com.cn",
    "establishedDate": "2010-03-15",
    "businessScope": "超高纯度聚醚醚酮(PEEK)树脂与微粉的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 92,
    "synergyReason": "作为纳米新材料产业链上游 • 特种工程塑料与单体合成的重点骨干企业，在超高纯度聚醚醚酮(PEEK)树脂与微粉领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-18",
      "chainName": "纳米新材料",
      "node": "upstream",
      "nodeName": "上游 • 特种工程塑料与单体合成",
      "subSegment": "超高纯度聚醚醚酮(PEEK)树脂与微粉",
      "mainProducts": [
        "医疗级与航空级高流动性PEEK树脂",
        "中研股份核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117061758B",
        "title": "一种针对超高纯度聚醚醚酮(PEEK)树的材料制备与高精度调控方法",
        "ipc": "C08G 65/40, H01M 10/052",
        "grantDate": "2024-03-18",
        "similarityScore": 92,
        "abstract": "本发明公开了一种一种针对超高纯度聚醚醚酮(PEEK)树的材料制备与高精度调控方法，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在超高纯度聚醚醚酮(PEEK)树脂与微粉方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在超高纯度聚醚醚酮(PEEK)树脂与微粉方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-中研股份-148",
        "productName": "医疗级与航空级高流动性PEEK树脂",
        "filingYear": "2024",
        "productCategory": "特种工程塑料PEEK",
        "annualOutputValue": "6.5 亿元",
        "corePatentCount": 22,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-58",
    "name": "吉林碳谷碳纤维股份有限公司",
    "shortName": "吉林碳谷",
    "creditCode": "913100000401852562",
    "registeredCapital": "183,000 万元人民币",
    "location": "广东省广州市",
    "province": "广东省",
    "city": "广州市",
    "industry": "新材料 / 碳纤维原丝",
    "scale": "国家级专精特新",
    "enterpriseType": "制造业单项冠军",
    "revenue": "241.0 亿元 (2024)",
    "rdInvestment": "21.0 亿元",
    "rdRatio": "8.20%",
    "patentTotalCount": 6610,
    "inventionPatentCount": 4020,
    "legalRep": "张伟",
    "address": "广东省广州市高新技术产业开发区创新科技大道964号",
    "phone": "0512-88053328",
    "email": "rd_tech@吉林碳谷.com.cn",
    "website": "https://www.吉林碳谷.com.cn",
    "establishedDate": "2011-04-15",
    "businessScope": "24K/48K大丝束高品质碳纤维原丝研发与规模化的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 93,
    "synergyReason": "作为碳纤维产业链上游 • 大丝束碳纤维原丝的重点骨干企业，在24K/48K大丝束高品质碳纤维原丝研发与规模化领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-6",
      "chainName": "碳纤维",
      "node": "upstream",
      "nodeName": "上游 • 大丝束碳纤维原丝",
      "subSegment": "24K/48K大丝束高品质碳纤维原丝研发与规模化",
      "mainProducts": [
        "高稳定大丝束原丝及预氧化丝",
        "吉林碳谷核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117063072B",
        "title": "一种针对24K/48K大丝束高品质碳纤的材料制备与高精度调控方法",
        "ipc": "C08G 65/40, H01M 10/052",
        "grantDate": "2023-04-11",
        "similarityScore": 93,
        "abstract": "本发明公开了一种一种针对24K/48K大丝束高品质碳纤的材料制备与高精度调控方法，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在24K/48K大丝束高品质碳纤维原丝研发与规模化方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在24K/48K大丝束高品质碳纤维原丝研发与规模化方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-吉林碳谷-149",
        "productName": "高稳定大丝束原丝及预氧化丝",
        "filingYear": "2024",
        "productCategory": "碳纤维原丝",
        "annualOutputValue": "26.0 亿元",
        "corePatentCount": 23,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-59",
    "name": "吉林化纤集团有限责任公司",
    "shortName": "吉林化纤",
    "creditCode": "913100000410224490",
    "registeredCapital": "186,500 万元人民币",
    "location": "广东省东莞市",
    "province": "广东省",
    "city": "东莞市",
    "industry": "新材料 / 碳纤维及复合材料原丝",
    "scale": "行业央国企",
    "enterpriseType": "行业龙头国企",
    "revenue": "245.5 亿元 (2024)",
    "rdInvestment": "21.4 亿元",
    "rdRatio": "9.10%",
    "patentTotalCount": 6730,
    "inventionPatentCount": 4095,
    "legalRep": "李强",
    "address": "广东省东莞市高新技术产业开发区创新科技大道982号",
    "phone": "0755-88054439",
    "email": "rd_tech@吉林化纤.com.cn",
    "website": "https://www.吉林化纤.com.cn",
    "establishedDate": "2012-05-15",
    "businessScope": "高强碳纤维碳化生产与下游风电风电叶片拉挤板的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 94,
    "synergyReason": "作为碳纤维产业链上游 • 腈纶原丝与碳化基料的重点骨干企业，在高强碳纤维碳化生产与下游风电风电叶片拉挤板领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-6",
      "chainName": "碳纤维",
      "node": "upstream",
      "nodeName": "上游 • 腈纶原丝与碳化基料",
      "subSegment": "高强碳纤维碳化生产与下游风电风电叶片拉挤板",
      "mainProducts": [
        "风电叶片用高模拉挤碳板",
        "吉林化纤核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117064386B",
        "title": "一种针对高强碳纤维碳化生产与下游风电风的材料制备与高精度调控方法",
        "ipc": "C08G 65/40, H01M 10/052",
        "grantDate": "2024-05-12",
        "similarityScore": 94,
        "abstract": "本发明公开了一种一种针对高强碳纤维碳化生产与下游风电风的材料制备与高精度调控方法，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在高强碳纤维碳化生产与下游风电风电叶片拉挤板方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在高强碳纤维碳化生产与下游风电风电叶片拉挤板方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-吉林化纤-150",
        "productName": "风电叶片用高模拉挤碳板",
        "filingYear": "2024",
        "productCategory": "碳纤维及复合材料原丝",
        "annualOutputValue": "210.0 亿元",
        "corePatentCount": 24,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-60",
    "name": "深圳新宙邦科技股份有限公司",
    "shortName": "新宙邦",
    "creditCode": "913100000418596418",
    "registeredCapital": "190,000 万元人民币",
    "location": "山东省济南市",
    "province": "山东省",
    "city": "济南市",
    "industry": "新能源与储能 / 电池电解液与氟化学品",
    "scale": "上市公司",
    "enterpriseType": "上市企业",
    "revenue": "250.0 亿元 (2024)",
    "rdInvestment": "21.8 亿元",
    "rdRatio": "5.50%",
    "patentTotalCount": 6850,
    "inventionPatentCount": 4170,
    "legalRep": "王建华",
    "address": "山东省济南市高新技术产业开发区创新科技大道1000号",
    "phone": "0512-88055550",
    "email": "rd_tech@新宙邦.com.cn",
    "website": "https://www.新宙邦.com.cn",
    "establishedDate": "2013-06-15",
    "businessScope": "高电压长寿命固态锂电电解液及有机硅功能助剂的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 95,
    "synergyReason": "作为动力及储能电池产业链上游 • 核心电解质与高压添加剂的重点骨干企业，在高电压长寿命固态锂电电解液及有机硅功能助剂领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-24",
      "chainName": "动力及储能电池",
      "node": "upstream",
      "nodeName": "上游 • 核心电解质与高压添加剂",
      "subSegment": "高电压长寿命固态锂电电解液及有机硅功能助剂",
      "mainProducts": [
        "高电压高安全锂离子电池电解液",
        "新宙邦核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117065700B",
        "title": "一种针对高电压长寿命固态锂电电解液及有的材料制备与高精度调控方法",
        "ipc": "C08G 65/40, H01M 10/052",
        "grantDate": "2023-06-13",
        "similarityScore": 95,
        "abstract": "本发明公开了一种一种针对高电压长寿命固态锂电电解液及有的材料制备与高精度调控方法，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在高电压长寿命固态锂电电解液及有机硅功能助剂方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在高电压长寿命固态锂电电解液及有机硅功能助剂方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-新宙邦-151",
        "productName": "高电压高安全锂离子电池电解液",
        "filingYear": "2024",
        "productCategory": "电池电解液与氟化学品",
        "annualOutputValue": "46.0 亿元",
        "corePatentCount": 25,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-61",
    "name": "天奈科技股份有限公司",
    "shortName": "天奈科技",
    "creditCode": "913100000426968347",
    "registeredCapital": "193,500 万元人民币",
    "location": "山东省青岛市",
    "province": "山东省",
    "city": "青岛市",
    "industry": "新材料 / 碳纳米管与导电剂",
    "scale": "国家级专精特新",
    "enterpriseType": "制造业单项冠军",
    "revenue": "254.5 亿元 (2024)",
    "rdInvestment": "22.2 亿元",
    "rdRatio": "6.40%",
    "patentTotalCount": 6970,
    "inventionPatentCount": 4245,
    "legalRep": "陈敏",
    "address": "山东省青岛市高新技术产业开发区创新科技大道1018号",
    "phone": "0755-88056661",
    "email": "rd_tech@天奈科技.com.cn",
    "website": "https://www.天奈科技.com.cn",
    "establishedDate": "2014-07-15",
    "businessScope": "多壁/单壁碳纳米管宏量制备与高导电复合浆料的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 96,
    "synergyReason": "作为石墨烯产业链上游 • 碳纳米管与导电浆料的重点骨干企业，在多壁/单壁碳纳米管宏量制备与高导电复合浆料领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-7",
      "chainName": "石墨烯",
      "node": "upstream",
      "nodeName": "上游 • 碳纳米管与导电浆料",
      "subSegment": "多壁/单壁碳纳米管宏量制备与高导电复合浆料",
      "mainProducts": [
        "高纯单壁碳纳米管导电母粒",
        "天奈科技核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117067014B",
        "title": "一种针对多壁/单壁碳纳米管宏量制备与高的材料制备与高精度调控方法",
        "ipc": "C08G 65/40, H01M 10/052",
        "grantDate": "2024-07-14",
        "similarityScore": 96,
        "abstract": "本发明公开了一种一种针对多壁/单壁碳纳米管宏量制备与高的材料制备与高精度调控方法，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在多壁/单壁碳纳米管宏量制备与高导电复合浆料方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在多壁/单壁碳纳米管宏量制备与高导电复合浆料方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-天奈科技-152",
        "productName": "高纯单壁碳纳米管导电母粒",
        "filingYear": "2024",
        "productCategory": "碳纳米管与导电剂",
        "annualOutputValue": "16.5 亿元",
        "corePatentCount": 26,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-62",
    "name": "璞泰来新能源科技股份有限公司",
    "shortName": "璞泰来",
    "creditCode": "913100000435340275",
    "registeredCapital": "197,000 万元人民币",
    "location": "北京市北京市",
    "province": "北京市",
    "city": "北京市",
    "industry": "新能源与储能 / 负极材料与涂覆隔膜",
    "scale": "上市公司",
    "enterpriseType": "上市企业",
    "revenue": "259.0 亿元 (2024)",
    "rdInvestment": "22.6 亿元",
    "rdRatio": "7.30%",
    "patentTotalCount": 7090,
    "inventionPatentCount": 4320,
    "legalRep": "刘志刚",
    "address": "北京市北京市高新技术产业开发区创新科技大道1036号",
    "phone": "0512-88057772",
    "email": "rd_tech@璞泰来.com.cn",
    "website": "https://www.璞泰来.com.cn",
    "establishedDate": "2015-08-15",
    "businessScope": "硅碳高容量负极材料与芳纶涂覆隔膜的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 97,
    "synergyReason": "作为动力及储能电池产业链上游 • 负极活性材料与基膜的重点骨干企业，在硅碳高容量负极材料与芳纶涂覆隔膜领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-24",
      "chainName": "动力及储能电池",
      "node": "upstream",
      "nodeName": "上游 • 负极活性材料与基膜",
      "subSegment": "硅碳高容量负极材料与芳纶涂覆隔膜",
      "mainProducts": [
        "高首效纳米硅碳复合负极材料",
        "璞泰来核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117068328B",
        "title": "一种针对硅碳高容量负极材料与芳纶涂覆隔的材料制备与高精度调控方法",
        "ipc": "C08G 65/40, H01M 10/052",
        "grantDate": "2023-08-15",
        "similarityScore": 97,
        "abstract": "本发明公开了一种一种针对硅碳高容量负极材料与芳纶涂覆隔的材料制备与高精度调控方法，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在硅碳高容量负极材料与芳纶涂覆隔膜方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在硅碳高容量负极材料与芳纶涂覆隔膜方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-璞泰来-153",
        "productName": "高首效纳米硅碳复合负极材料",
        "filingYear": "2024",
        "productCategory": "负极材料与涂覆隔膜",
        "annualOutputValue": "62.0 亿元",
        "corePatentCount": 27,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-63",
    "name": "长春客车厂轨道客车装备有限公司",
    "shortName": "长客装备",
    "creditCode": "913100000443712203",
    "registeredCapital": "200,500 万元人民币",
    "location": "上海市上海市",
    "province": "上海市",
    "city": "上海市",
    "industry": "高端装备制造 / 轨道交通装备",
    "scale": "行业央国企",
    "enterpriseType": "行业龙头国企",
    "revenue": "263.5 亿元 (2024)",
    "rdInvestment": "23.0 亿元",
    "rdRatio": "8.20%",
    "patentTotalCount": 7210,
    "inventionPatentCount": 4395,
    "legalRep": "孙明",
    "address": "上海市上海市高新技术产业开发区创新科技大道1054号",
    "phone": "0755-88058883",
    "email": "rd_tech@长客装备.com.cn",
    "website": "https://www.长客装备.com.cn",
    "establishedDate": "2016-09-15",
    "businessScope": "全自动无人驾驶地铁列车与轻量化车体制造的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 98,
    "synergyReason": "作为轨道交通产业链下游 • 城市轨道列车整车的重点骨干企业，在全自动无人驾驶地铁列车与轻量化车体制造领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-5",
      "chainName": "轨道交通",
      "node": "downstream",
      "nodeName": "下游 • 城市轨道列车整车",
      "subSegment": "全自动无人驾驶地铁列车与轻量化车体制造",
      "mainProducts": [
        "智能无人驾驶磁浮与地铁整车",
        "长客装备核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117069642B",
        "title": "一种针对全自动无人驾驶地铁列车与轻量化的整机集成动力学优化与安全控制装置",
        "ipc": "B60W 30/00, A61B 34/30",
        "grantDate": "2024-09-16",
        "similarityScore": 98,
        "abstract": "本发明公开了一种一种针对全自动无人驾驶地铁列车与轻量化的整机集成动力学优化与安全控制装置，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在全自动无人驾驶地铁列车与轻量化车体制造方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在全自动无人驾驶地铁列车与轻量化车体制造方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-长客装备-154",
        "productName": "智能无人驾驶磁浮与地铁整车",
        "filingYear": "2024",
        "productCategory": "轨道交通装备",
        "annualOutputValue": "120.0 亿元",
        "corePatentCount": 28,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-64",
    "name": "中通客车股份有限公司",
    "shortName": "中通客车",
    "creditCode": "913100000452084132",
    "registeredCapital": "204,000 万元人民币",
    "location": "四川省成都市",
    "province": "四川省",
    "city": "成都市",
    "industry": "新能源汽车 / 客车整车制造",
    "scale": "上市公司",
    "enterpriseType": "上市企业",
    "revenue": "268.0 亿元 (2024)",
    "rdInvestment": "23.4 亿元",
    "rdRatio": "9.10%",
    "patentTotalCount": 7330,
    "inventionPatentCount": 4470,
    "legalRep": "周海峰",
    "address": "四川省成都市高新技术产业开发区创新科技大道1072号",
    "phone": "0512-88059994",
    "email": "rd_tech@中通客车.com.cn",
    "website": "https://www.中通客车.com.cn",
    "establishedDate": "2017-01-15",
    "businessScope": "纯电动与氢燃料电池智能商用客车整车的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 90,
    "synergyReason": "作为新能源汽车产业链下游 • 新能源客车与智能物流车的重点骨干企业，在纯电动与氢燃料电池智能商用客车整车领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-2",
      "chainName": "新能源汽车",
      "node": "downstream",
      "nodeName": "下游 • 新能源客车与智能物流车",
      "subSegment": "纯电动与氢燃料电池智能商用客车整车",
      "mainProducts": [
        "氢燃料电池城市智能公交客车",
        "中通客车核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117070956B",
        "title": "一种针对纯电动与氢燃料电池智能商用客车的整机集成动力学优化与安全控制装置",
        "ipc": "B60W 30/00, A61B 34/30",
        "grantDate": "2023-01-17",
        "similarityScore": 90,
        "abstract": "本发明公开了一种一种针对纯电动与氢燃料电池智能商用客车的整机集成动力学优化与安全控制装置，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在纯电动与氢燃料电池智能商用客车整车方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在纯电动与氢燃料电池智能商用客车整车方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-中通客车-155",
        "productName": "氢燃料电池城市智能公交客车",
        "filingYear": "2024",
        "productCategory": "客车整车制造",
        "annualOutputValue": "52.0 亿元",
        "corePatentCount": 29,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-65",
    "name": "宇通客车股份有限公司",
    "shortName": "宇通客车",
    "creditCode": "913100000460456060",
    "registeredCapital": "207,500 万元人民币",
    "location": "湖北省武汉市",
    "province": "湖北省",
    "city": "武汉市",
    "industry": "新能源汽车 / 智能新能源客车",
    "scale": "国家级专精特新",
    "enterpriseType": "制造业单项冠军",
    "revenue": "272.5 亿元 (2024)",
    "rdInvestment": "23.8 亿元",
    "rdRatio": "5.50%",
    "patentTotalCount": 7450,
    "inventionPatentCount": 4545,
    "legalRep": "赵立国",
    "address": "湖北省武汉市高新技术产业开发区创新科技大道1090号",
    "phone": "0755-88061105",
    "email": "rd_tech@宇通客车.com.cn",
    "website": "https://www.宇通客车.com.cn",
    "establishedDate": "2018-02-15",
    "businessScope": "全电线控底盘新能源重卡及高端宇通轻卡的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 91,
    "synergyReason": "作为新能源汽车产业链下游 • 商用车与整车制造的重点骨干企业，在全电线控底盘新能源重卡及高端宇通轻卡领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-2",
      "chainName": "新能源汽车",
      "node": "downstream",
      "nodeName": "下游 • 商用车与整车制造",
      "subSegment": "全电线控底盘新能源重卡及高端宇通轻卡",
      "mainProducts": [
        "睿控E平台高端纯电动客车",
        "宇通客车核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117072270B",
        "title": "一种针对全电线控底盘新能源重卡及高端宇的整机集成动力学优化与安全控制装置",
        "ipc": "B60W 30/00, A61B 34/30",
        "grantDate": "2024-02-18",
        "similarityScore": 91,
        "abstract": "本发明公开了一种一种针对全电线控底盘新能源重卡及高端宇的整机集成动力学优化与安全控制装置，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在全电线控底盘新能源重卡及高端宇通轻卡方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在全电线控底盘新能源重卡及高端宇通轻卡方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-宇通客车-156",
        "productName": "睿控E平台高端纯电动客车",
        "filingYear": "2024",
        "productCategory": "智能新能源客车",
        "annualOutputValue": "270.0 亿元",
        "corePatentCount": 30,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-66",
    "name": "金龙联合汽车工业（苏州）有限公司",
    "shortName": "苏州金龙",
    "creditCode": "913100000468827988",
    "registeredCapital": "211,000 万元人民币",
    "location": "安徽省合肥市",
    "province": "安徽省",
    "city": "合肥市",
    "industry": "新能源汽车 / 新能源商用车",
    "scale": "行业央国企",
    "enterpriseType": "行业龙头国企",
    "revenue": "277.0 亿元 (2024)",
    "rdInvestment": "24.2 亿元",
    "rdRatio": "6.40%",
    "patentTotalCount": 7570,
    "inventionPatentCount": 4620,
    "legalRep": "张伟",
    "address": "安徽省合肥市高新技术产业开发区创新科技大道1108号",
    "phone": "0512-88062216",
    "email": "rd_tech@苏州金龙.com.cn",
    "website": "https://www.苏州金龙.com.cn",
    "establishedDate": "2019-03-15",
    "businessScope": "海格智能重卡与线控换电重卡整车的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 92,
    "synergyReason": "作为新能源汽车产业链下游 • 专用车与客车整机的重点骨干企业，在海格智能重卡与线控换电重卡整车领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-2",
      "chainName": "新能源汽车",
      "node": "downstream",
      "nodeName": "下游 • 专用车与客车整机",
      "subSegment": "海格智能重卡与线控换电重卡整车",
      "mainProducts": [
        "海格智能网联重型电动牵引车",
        "苏州金龙核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117073584B",
        "title": "一种针对海格智能重卡与线控换电重卡整车的整机集成动力学优化与安全控制装置",
        "ipc": "B60W 30/00, A61B 34/30",
        "grantDate": "2023-03-11",
        "similarityScore": 92,
        "abstract": "本发明公开了一种一种针对海格智能重卡与线控换电重卡整车的整机集成动力学优化与安全控制装置，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在海格智能重卡与线控换电重卡整车方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在海格智能重卡与线控换电重卡整车方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-苏州金龙-157",
        "productName": "海格智能网联重型电动牵引车",
        "filingYear": "2024",
        "productCategory": "新能源商用车",
        "annualOutputValue": "68.0 亿元",
        "corePatentCount": 31,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-67",
    "name": "吉林修正药业集团股份有限公司",
    "shortName": "修正药业",
    "creditCode": "913100000477199917",
    "registeredCapital": "214,500 万元人民币",
    "location": "陕西省西安市",
    "province": "陕西省",
    "city": "西安市",
    "industry": "生物医药与健康 / 现代中药与大健康",
    "scale": "国家级专精特新",
    "enterpriseType": "高新技术企业",
    "revenue": "281.5 亿元 (2024)",
    "rdInvestment": "24.6 亿元",
    "rdRatio": "7.30%",
    "patentTotalCount": 7690,
    "inventionPatentCount": 4695,
    "legalRep": "李强",
    "address": "陕西省西安市高新技术产业开发区创新科技大道1126号",
    "phone": "0755-88063327",
    "email": "rd_tech@修正药业.com.cn",
    "website": "https://www.修正药业.com.cn",
    "establishedDate": "2020-04-15",
    "businessScope": "人参/鹿茸道地长白山药材提取物创新成药的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 93,
    "synergyReason": "作为中药产业链下游 • 中药制剂与成药深加工的重点骨干企业，在人参/鹿茸道地长白山药材提取物创新成药领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-43",
      "chainName": "中药",
      "node": "downstream",
      "nodeName": "下游 • 中药制剂与成药深加工",
      "subSegment": "人参/鹿茸道地长白山药材提取物创新成药",
      "mainProducts": [
        "参鹿扶正口服液及抗疲劳纳米制剂",
        "修正药业核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117074898B",
        "title": "一种针对人参/鹿茸道地长白山药材提取物的整机集成动力学优化与安全控制装置",
        "ipc": "B60W 30/00, A61B 34/30",
        "grantDate": "2024-04-12",
        "similarityScore": 93,
        "abstract": "本发明公开了一种一种针对人参/鹿茸道地长白山药材提取物的整机集成动力学优化与安全控制装置，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在人参/鹿茸道地长白山药材提取物创新成药方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在人参/鹿茸道地长白山药材提取物创新成药方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-修正药业-158",
        "productName": "参鹿扶正口服液及抗疲劳纳米制剂",
        "filingYear": "2024",
        "productCategory": "现代中药与大健康",
        "annualOutputValue": "86.0 亿元",
        "corePatentCount": 32,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-68",
    "name": "吉林敖东药业集团股份有限公司",
    "shortName": "吉林敖东",
    "creditCode": "913100000485571846",
    "registeredCapital": "218,000 万元人民币",
    "location": "辽宁省沈阳市",
    "province": "辽宁省",
    "city": "沈阳市",
    "industry": "生物医药与健康 / 现代中成药与天然药",
    "scale": "上市公司",
    "enterpriseType": "上市企业",
    "revenue": "286.0 亿元 (2024)",
    "rdInvestment": "25.0 亿元",
    "rdRatio": "8.20%",
    "patentTotalCount": 7810,
    "inventionPatentCount": 4770,
    "legalRep": "王建华",
    "address": "辽宁省沈阳市高新技术产业开发区创新科技大道1144号",
    "phone": "0512-88064438",
    "email": "rd_tech@吉林敖东.com.cn",
    "website": "https://www.吉林敖东.com.cn",
    "establishedDate": "2021-05-15",
    "businessScope": "天然植物活性成分提取与靶向中药缓释制剂的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 94,
    "synergyReason": "作为中药产业链下游 • 中药微丸与注射液制剂的重点骨干企业，在天然植物活性成分提取与靶向中药缓释制剂领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-43",
      "chainName": "中药",
      "node": "downstream",
      "nodeName": "下游 • 中药微丸与注射液制剂",
      "subSegment": "天然植物活性成分提取与靶向中药缓释制剂",
      "mainProducts": [
        "安神补脑液及人参皂苷纳米冻干粉针",
        "吉林敖东核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117076212B",
        "title": "一种针对天然植物活性成分提取与靶向中药的整机集成动力学优化与安全控制装置",
        "ipc": "B60W 30/00, A61B 34/30",
        "grantDate": "2023-05-13",
        "similarityScore": 94,
        "abstract": "本发明公开了一种一种针对天然植物活性成分提取与靶向中药的整机集成动力学优化与安全控制装置，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在天然植物活性成分提取与靶向中药缓释制剂方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在天然植物活性成分提取与靶向中药缓释制剂方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-吉林敖东-159",
        "productName": "安神补脑液及人参皂苷纳米冻干粉针",
        "filingYear": "2024",
        "productCategory": "现代中成药与天然药",
        "annualOutputValue": "38.0 亿元",
        "corePatentCount": 33,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-69",
    "name": "吉林省大成生化科技集团有限公司",
    "shortName": "大成生化",
    "creditCode": "913100000493943774",
    "registeredCapital": "221,500 万元人民币",
    "location": "福建省厦门市",
    "province": "福建省",
    "city": "厦门市",
    "industry": "新材料 / 生物基高分子与赖氨酸",
    "scale": "国家级专精特新",
    "enterpriseType": "高新技术企业",
    "revenue": "290.5 亿元 (2024)",
    "rdInvestment": "25.4 亿元",
    "rdRatio": "9.10%",
    "patentTotalCount": 7930,
    "inventionPatentCount": 4845,
    "legalRep": "陈敏",
    "address": "福建省厦门市高新技术产业开发区创新科技大道1162号",
    "phone": "0755-88065549",
    "email": "rd_tech@大成生化.com.cn",
    "website": "https://www.大成生化.com.cn",
    "establishedDate": "2022-06-15",
    "businessScope": "玉米深加工生物基聚酯与高纯发酵赖氨酸的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 95,
    "synergyReason": "作为纳米新材料产业链下游 • 生物基新材料终端应用的重点骨干企业，在玉米深加工生物基聚酯与高纯发酵赖氨酸领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-18",
      "chainName": "纳米新材料",
      "node": "downstream",
      "nodeName": "下游 • 生物基新材料终端应用",
      "subSegment": "玉米深加工生物基聚酯与高纯发酵赖氨酸",
      "mainProducts": [
        "生物基全降解聚乳酸(PLA)复合材料",
        "大成生化核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117077526B",
        "title": "一种针对玉米深加工生物基聚酯与高纯发酵的整机集成动力学优化与安全控制装置",
        "ipc": "B60W 30/00, A61B 34/30",
        "grantDate": "2024-06-14",
        "similarityScore": 95,
        "abstract": "本发明公开了一种一种针对玉米深加工生物基聚酯与高纯发酵的整机集成动力学优化与安全控制装置，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在玉米深加工生物基聚酯与高纯发酵赖氨酸方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在玉米深加工生物基聚酯与高纯发酵赖氨酸方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-大成生化-160",
        "productName": "生物基全降解聚乳酸(PLA)复合材料",
        "filingYear": "2024",
        "productCategory": "生物基高分子与赖氨酸",
        "annualOutputValue": "45.0 亿元",
        "corePatentCount": 34,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-70",
    "name": "沈阳机床股份有限公司",
    "shortName": "沈阳机床",
    "creditCode": "913100000502315702",
    "registeredCapital": "225,000 万元人民币",
    "location": "吉林省长春市",
    "province": "吉林省",
    "city": "长春市",
    "industry": "高端装备制造 / 金属切削机床整机",
    "scale": "行业央国企",
    "enterpriseType": "行业龙头国企",
    "revenue": "295.0 亿元 (2024)",
    "rdInvestment": "25.8 亿元",
    "rdRatio": "5.50%",
    "patentTotalCount": 8050,
    "inventionPatentCount": 4920,
    "legalRep": "刘志刚",
    "address": "吉林省长春市高新技术产业开发区创新科技大道1180号",
    "phone": "0512-88066660",
    "email": "rd_tech@沈阳机床.com.cn",
    "website": "https://www.沈阳机床.com.cn",
    "establishedDate": "2008-07-15",
    "businessScope": "大型立卧式加工中心与智能机加生产线的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 96,
    "synergyReason": "作为数控机床产业链下游 • 智能机床整机与产线的重点骨干企业，在大型立卧式加工中心与智能机加生产线领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-10",
      "chainName": "数控机床",
      "node": "downstream",
      "nodeName": "下游 • 智能机床整机与产线",
      "subSegment": "大型立卧式加工中心与智能机加生产线",
      "mainProducts": [
        "i5智能数控系统高端卧式车床",
        "沈阳机床核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117078840B",
        "title": "一种针对大型立卧式加工中心与智能机加生的整机集成动力学优化与安全控制装置",
        "ipc": "B60W 30/00, A61B 34/30",
        "grantDate": "2023-07-15",
        "similarityScore": 96,
        "abstract": "本发明公开了一种一种针对大型立卧式加工中心与智能机加生的整机集成动力学优化与安全控制装置，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在大型立卧式加工中心与智能机加生产线方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在大型立卧式加工中心与智能机加生产线方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-沈阳机床-161",
        "productName": "i5智能数控系统高端卧式车床",
        "filingYear": "2024",
        "productCategory": "金属切削机床整机",
        "annualOutputValue": "31.0 亿元",
        "corePatentCount": 15,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-71",
    "name": "中国重汽集团济南卡车股份有限公司",
    "shortName": "中国重汽",
    "creditCode": "913100000510687631",
    "registeredCapital": "228,500 万元人民币",
    "location": "吉林省吉林市",
    "province": "吉林省",
    "city": "吉林市",
    "industry": "新能源汽车 / 重型汽车整车",
    "scale": "行业央国企",
    "enterpriseType": "行业龙头国企",
    "revenue": "299.5 亿元 (2024)",
    "rdInvestment": "26.2 亿元",
    "rdRatio": "6.40%",
    "patentTotalCount": 8170,
    "inventionPatentCount": 4995,
    "legalRep": "孙明",
    "address": "吉林省吉林市高新技术产业开发区创新科技大道1198号",
    "phone": "0755-88067771",
    "email": "rd_tech@中国重汽.com.cn",
    "website": "https://www.中国重汽.com.cn",
    "establishedDate": "2009-08-15",
    "businessScope": "黄河/汕德卡高端新能源智能重卡线控底盘的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 97,
    "synergyReason": "作为新能源汽车产业链下游 • 重型商用车整车制造的重点骨干企业，在黄河/汕德卡高端新能源智能重卡线控底盘领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-2",
      "chainName": "新能源汽车",
      "node": "downstream",
      "nodeName": "下游 • 重型商用车整车制造",
      "subSegment": "黄河/汕德卡高端新能源智能重卡线控底盘",
      "mainProducts": [
        "黄河X7高端超低风阻智能牵引车",
        "中国重汽核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117080154B",
        "title": "一种针对黄河/汕德卡高端新能源智能重卡的整机集成动力学优化与安全控制装置",
        "ipc": "B60W 30/00, A61B 34/30",
        "grantDate": "2024-08-16",
        "similarityScore": 97,
        "abstract": "本发明公开了一种一种针对黄河/汕德卡高端新能源智能重卡的整机集成动力学优化与安全控制装置，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在黄河/汕德卡高端新能源智能重卡线控底盘方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在黄河/汕德卡高端新能源智能重卡线控底盘方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-中国重汽-162",
        "productName": "黄河X7高端超低风阻智能牵引车",
        "filingYear": "2024",
        "productCategory": "重型汽车整车",
        "annualOutputValue": "480.0 亿元",
        "corePatentCount": 16,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-72",
    "name": "陕汽集团商用车有限公司",
    "shortName": "陕汽商用车",
    "creditCode": "913100000519059559",
    "registeredCapital": "232,000 万元人民币",
    "location": "江苏省苏州市",
    "province": "江苏省",
    "city": "苏州市",
    "industry": "新能源汽车 / 智能商用车与新能源重卡",
    "scale": "行业央国企",
    "enterpriseType": "行业龙头国企",
    "revenue": "304.0 亿元 (2024)",
    "rdInvestment": "26.6 亿元",
    "rdRatio": "7.30%",
    "patentTotalCount": 8290,
    "inventionPatentCount": 5070,
    "legalRep": "周海峰",
    "address": "江苏省苏州市高新技术产业开发区创新科技大道1216号",
    "phone": "0512-88068882",
    "email": "rd_tech@陕汽商用车.com.cn",
    "website": "https://www.陕汽商用车.com.cn",
    "establishedDate": "2010-09-15",
    "businessScope": "德龙X6000新能源重卡及线控电液制动总成的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 98,
    "synergyReason": "作为新能源汽车产业链下游 • 商用车与特种车辆整车的重点骨干企业，在德龙X6000新能源重卡及线控电液制动总成领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-2",
      "chainName": "新能源汽车",
      "node": "downstream",
      "nodeName": "下游 • 商用车与特种车辆整车",
      "subSegment": "德龙X6000新能源重卡及线控电液制动总成",
      "mainProducts": [
        "德龙新能源纯电动换电牵引车",
        "陕汽商用车核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117081468B",
        "title": "一种针对德龙X6000新能源重卡及线控的整机集成动力学优化与安全控制装置",
        "ipc": "B60W 30/00, A61B 34/30",
        "grantDate": "2023-09-17",
        "similarityScore": 98,
        "abstract": "本发明公开了一种一种针对德龙X6000新能源重卡及线控的整机集成动力学优化与安全控制装置，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在德龙X6000新能源重卡及线控电液制动总成方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在德龙X6000新能源重卡及线控电液制动总成方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-陕汽商用车-163",
        "productName": "德龙新能源纯电动换电牵引车",
        "filingYear": "2024",
        "productCategory": "智能商用车与新能源重卡",
        "annualOutputValue": "190.0 亿元",
        "corePatentCount": 17,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-73",
    "name": "东风商用车有限公司",
    "shortName": "东风商用车",
    "creditCode": "913100000527431487",
    "registeredCapital": "235,500 万元人民币",
    "location": "江苏省无锡市",
    "province": "江苏省",
    "city": "无锡市",
    "industry": "新能源汽车 / 中重型商用车整车",
    "scale": "行业央国企",
    "enterpriseType": "行业龙头国企",
    "revenue": "308.5 亿元 (2024)",
    "rdInvestment": "27.0 亿元",
    "rdRatio": "8.20%",
    "patentTotalCount": 8410,
    "inventionPatentCount": 5145,
    "legalRep": "赵立国",
    "address": "江苏省无锡市高新技术产业开发区创新科技大道1234号",
    "phone": "0755-88069993",
    "email": "rd_tech@东风商用车.com.cn",
    "website": "https://www.东风商用车.com.cn",
    "establishedDate": "2011-01-15",
    "businessScope": "天龙旗舰智能驾驶新能源重卡及线控执行平台的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 90,
    "synergyReason": "作为新能源汽车产业链下游 • 商用车整机制造的重点骨干企业，在天龙旗舰智能驾驶新能源重卡及线控执行平台领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-2",
      "chainName": "新能源汽车",
      "node": "downstream",
      "nodeName": "下游 • 商用车整机制造",
      "subSegment": "天龙旗舰智能驾驶新能源重卡及线控执行平台",
      "mainProducts": [
        "东风天龙GX高端智慧重卡",
        "东风商用车核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117082782B",
        "title": "一种针对天龙旗舰智能驾驶新能源重卡及线的整机集成动力学优化与安全控制装置",
        "ipc": "B60W 30/00, A61B 34/30",
        "grantDate": "2024-01-18",
        "similarityScore": 90,
        "abstract": "本发明公开了一种一种针对天龙旗舰智能驾驶新能源重卡及线的整机集成动力学优化与安全控制装置，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在天龙旗舰智能驾驶新能源重卡及线控执行平台方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在天龙旗舰智能驾驶新能源重卡及线控执行平台方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-东风商用车-164",
        "productName": "东风天龙GX高端智慧重卡",
        "filingYear": "2024",
        "productCategory": "中重型商用车整车",
        "annualOutputValue": "320.0 亿元",
        "corePatentCount": 18,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  },
  {
    "id": "ent-target-74",
    "name": "吉林亚泰（集团）股份有限公司",
    "shortName": "亚泰集团",
    "creditCode": "913100000535803415",
    "registeredCapital": "239,000 万元人民币",
    "location": "江苏省南京市",
    "province": "江苏省",
    "city": "南京市",
    "industry": "生物医药与健康 / 现代医药与健康产业",
    "scale": "上市公司",
    "enterpriseType": "上市企业",
    "revenue": "313.0 亿元 (2024)",
    "rdInvestment": "27.4 亿元",
    "rdRatio": "9.10%",
    "patentTotalCount": 8530,
    "inventionPatentCount": 5220,
    "legalRep": "张伟",
    "address": "江苏省南京市高新技术产业开发区创新科技大道1252号",
    "phone": "0512-88071104",
    "email": "rd_tech@亚泰集团.com.cn",
    "website": "https://www.亚泰集团.com.cn",
    "establishedDate": "2012-02-15",
    "businessScope": "长白山珍贵道地中药材提取与抗衰老功能食品的研发、制造、系统集成与技术咨询服务。",
    "status": "存续（在营、开业、在册）",
    "matchSource": "industry_chain",
    "matchScore": 91,
    "synergyReason": "作为中药产业链下游 • 现代中药与原料深加工的重点骨干企业，在长白山珍贵道地中药材提取与抗衰老功能食品领域具有成熟产业布局，对相关技术成果存在强烈的产业升级需求。",
    "chainPosition": {
      "chainId": "chain-43",
      "chainName": "中药",
      "node": "downstream",
      "nodeName": "下游 • 现代中药与原料深加工",
      "subSegment": "长白山珍贵道地中药材提取与抗衰老功能食品",
      "mainProducts": [
        "参一胶囊抗肿瘤中药单体原料",
        "亚泰集团核心总成模组",
        "高性能智能配套系统"
      ]
    },
    "similarPatents": [
      {
        "patentNo": "CN117084096B",
        "title": "一种针对长白山珍贵道地中药材提取与抗衰的整机集成动力学优化与安全控制装置",
        "ipc": "B60W 30/00, A61B 34/30",
        "grantDate": "2023-02-11",
        "similarityScore": 91,
        "abstract": "本发明公开了一种一种针对长白山珍贵道地中药材提取与抗衰的整机集成动力学优化与安全控制装置，涉及相关高新技术装备与精密制造领域。该技术方案针对传统工艺在响应时滞、控制精度及恶劣工况下稳定性不足的技术难题，提出了基于多源参数融合的自适应闭环控制架构与核心结构拓扑优化设计，配合高可靠性硬件执行机构与动态补偿算法，有效降低系统功耗与响应延迟，显著提升了核心指标的一致性与产品使用寿命。在长白山珍贵道地中药材提取与抗衰老功能食品方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。",
        "techOverlapDescription": "在长白山珍贵道地中药材提取与抗衰老功能食品方向与相关专利技术方案高度重合，具备极强技术协同价值与落地产业化可行性。"
      }
    ],
    "patentProducts": [
      {
        "productCode": "CP-亚泰集团-165",
        "productName": "参一胶囊抗肿瘤中药单体原料",
        "filingYear": "2024",
        "productCategory": "现代医药与健康产业",
        "annualOutputValue": "110.0 亿元",
        "corePatentCount": 19,
        "patentSynergyPoint": "可直接对接相关科研成果进行技术导入与产业化升级"
      }
    ]
  }
];
