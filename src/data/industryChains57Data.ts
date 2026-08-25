export interface IndustryChain57Item {
  id: string;
  code: string;
  name: string;
  category: string;
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
  {
    "id": "chain-1",
    "code": "IC-01",
    "name": "高端医疗器械",
    "category": "生物医药与健康",
    "summary": "围绕高端医疗器械领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 20
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 24
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 24
    },
    "totalEnterprises": 99,
    "jluPatentsCount": 257,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-2",
    "code": "IC-02",
    "name": "新能源汽车",
    "category": "新能源汽车",
    "summary": "围绕新能源汽车领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 13
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 31
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 20
    },
    "totalEnterprises": 88,
    "jluPatentsCount": 269,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-3",
    "code": "IC-03",
    "name": "光伏",
    "category": "新能源与储能",
    "summary": "围绕光伏领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 23
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 33
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 10
    },
    "totalEnterprises": 61,
    "jluPatentsCount": 75,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-4",
    "code": "IC-04",
    "name": "低空经济产业链",
    "category": "高端装备制造",
    "summary": "围绕低空经济产业链领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 18
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 39
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 16
    },
    "totalEnterprises": 74,
    "jluPatentsCount": 320,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-5",
    "code": "IC-05",
    "name": "轨道交通",
    "category": "高端装备制造",
    "summary": "围绕轨道交通领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 27
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 19
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 19
    },
    "totalEnterprises": 72,
    "jluPatentsCount": 251,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-6",
    "code": "IC-06",
    "name": "碳纤维",
    "category": "新材料",
    "summary": "围绕碳纤维领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 15
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 27
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 15
    },
    "totalEnterprises": 77,
    "jluPatentsCount": 198,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-7",
    "code": "IC-07",
    "name": "石墨烯",
    "category": "新材料",
    "summary": "围绕石墨烯领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 18
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 29
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 11
    },
    "totalEnterprises": 57,
    "jluPatentsCount": 165,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-8",
    "code": "IC-08",
    "name": "工业视觉系统",
    "category": "电子信息与智能算力",
    "summary": "围绕工业视觉系统领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 29
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 36
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 20
    },
    "totalEnterprises": 47,
    "jluPatentsCount": 286,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-9",
    "code": "IC-09",
    "name": "机器人",
    "category": "高端装备制造",
    "summary": "围绕机器人领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 23
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 33
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 22
    },
    "totalEnterprises": 58,
    "jluPatentsCount": 113,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-10",
    "code": "IC-10",
    "name": "数控机床",
    "category": "高端装备制造",
    "summary": "围绕数控机床领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 24
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 36
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 21
    },
    "totalEnterprises": 65,
    "jluPatentsCount": 267,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-11",
    "code": "IC-11",
    "name": "无人机",
    "category": "高端装备制造",
    "summary": "围绕无人机领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 23
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 39
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 20
    },
    "totalEnterprises": 90,
    "jluPatentsCount": 154,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-12",
    "code": "IC-12",
    "name": "特高压设备",
    "category": "高端装备制造",
    "summary": "围绕特高压设备领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 25
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 10
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 26
    },
    "totalEnterprises": 68,
    "jluPatentsCount": 195,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-13",
    "code": "IC-13",
    "name": "风电装备",
    "category": "新能源与储能",
    "summary": "围绕风电装备领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 16
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 22
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 28
    },
    "totalEnterprises": 82,
    "jluPatentsCount": 110,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-14",
    "code": "IC-14",
    "name": "智能电网",
    "category": "高端装备制造",
    "summary": "围绕智能电网领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 27
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 17
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 22
    },
    "totalEnterprises": 67,
    "jluPatentsCount": 292,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-15",
    "code": "IC-15",
    "name": "车联网",
    "category": "新能源汽车",
    "summary": "围绕车联网领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 15
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 38
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 28
    },
    "totalEnterprises": 63,
    "jluPatentsCount": 180,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-16",
    "code": "IC-16",
    "name": "传感器",
    "category": "电子信息与智能算力",
    "summary": "围绕传感器领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 16
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 15
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 21
    },
    "totalEnterprises": 57,
    "jluPatentsCount": 314,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-17",
    "code": "IC-17",
    "name": "工业互联网",
    "category": "电子信息与智能算力",
    "summary": "围绕工业互联网领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 13
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 34
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 16
    },
    "totalEnterprises": 47,
    "jluPatentsCount": 139,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-18",
    "code": "IC-18",
    "name": "纳米新材料",
    "category": "新材料",
    "summary": "围绕纳米新材料领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 25
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 20
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 16
    },
    "totalEnterprises": 59,
    "jluPatentsCount": 115,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-19",
    "code": "IC-19",
    "name": "船舶海工",
    "category": "高端装备制造",
    "summary": "围绕船舶海工领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 14
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 29
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 16
    },
    "totalEnterprises": 84,
    "jluPatentsCount": 215,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-20",
    "code": "IC-20",
    "name": "特钢材料",
    "category": "新材料",
    "summary": "围绕特钢材料领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 27
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 19
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 22
    },
    "totalEnterprises": 52,
    "jluPatentsCount": 84,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-21",
    "code": "IC-21",
    "name": "生物医药",
    "category": "生物医药与健康",
    "summary": "围绕生物医药领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 16
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 39
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 13
    },
    "totalEnterprises": 41,
    "jluPatentsCount": 138,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-22",
    "code": "IC-22",
    "name": "集成电路",
    "category": "电子信息与智能算力",
    "summary": "围绕集成电路领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 11
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 10
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 21
    },
    "totalEnterprises": 56,
    "jluPatentsCount": 215,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-23",
    "code": "IC-23",
    "name": "航空发动机",
    "category": "高端装备制造",
    "summary": "围绕航空发动机领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 12
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 19
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 21
    },
    "totalEnterprises": 87,
    "jluPatentsCount": 280,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-24",
    "code": "IC-24",
    "name": "动力及储能电池",
    "category": "新能源与储能",
    "summary": "围绕动力及储能电池领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 17
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 18
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 14
    },
    "totalEnterprises": 45,
    "jluPatentsCount": 209,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-25",
    "code": "IC-25",
    "name": "工业软件",
    "category": "电子信息与智能算力",
    "summary": "围绕工业软件领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 23
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 30
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 18
    },
    "totalEnterprises": 71,
    "jluPatentsCount": 86,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-26",
    "code": "IC-26",
    "name": "氢燃料电池",
    "category": "新能源与储能",
    "summary": "围绕氢燃料电池领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 26
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 34
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 13
    },
    "totalEnterprises": 68,
    "jluPatentsCount": 311,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-27",
    "code": "IC-27",
    "name": "新能源汽车充电桩",
    "category": "新能源汽车",
    "summary": "围绕新能源汽车充电桩领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 12
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 33
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 18
    },
    "totalEnterprises": 41,
    "jluPatentsCount": 327,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-28",
    "code": "IC-28",
    "name": "脑机接口",
    "category": "生物医药与健康",
    "summary": "围绕脑机接口领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 12
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 10
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 19
    },
    "totalEnterprises": 65,
    "jluPatentsCount": 162,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-29",
    "code": "IC-29",
    "name": "通用大数据",
    "category": "电子信息与智能算力",
    "summary": "围绕通用大数据领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 13
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 29
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 23
    },
    "totalEnterprises": 86,
    "jluPatentsCount": 179,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-30",
    "code": "IC-30",
    "name": "航空装备",
    "category": "高端装备制造",
    "summary": "围绕航空装备领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 15
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 33
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 21
    },
    "totalEnterprises": 66,
    "jluPatentsCount": 299,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-31",
    "code": "IC-31",
    "name": "燃气轮机",
    "category": "高端装备制造",
    "summary": "围绕燃气轮机领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 15
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 39
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 27
    },
    "totalEnterprises": 46,
    "jluPatentsCount": 127,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-32",
    "code": "IC-32",
    "name": "新型显示",
    "category": "电子信息与智能算力",
    "summary": "围绕新型显示领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 10
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 15
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 27
    },
    "totalEnterprises": 83,
    "jluPatentsCount": 91,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-33",
    "code": "IC-33",
    "name": "起重机",
    "category": "高端装备制造",
    "summary": "围绕起重机领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 11
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 33
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 28
    },
    "totalEnterprises": 90,
    "jluPatentsCount": 276,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-34",
    "code": "IC-34",
    "name": "农业机械设备",
    "category": "高端装备制造",
    "summary": "围绕农业机械设备领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 18
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 23
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 15
    },
    "totalEnterprises": 41,
    "jluPatentsCount": 117,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-35",
    "code": "IC-35",
    "name": "应急设备",
    "category": "高端装备制造",
    "summary": "围绕应急设备领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 27
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 11
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 22
    },
    "totalEnterprises": 68,
    "jluPatentsCount": 216,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-36",
    "code": "IC-36",
    "name": "挖掘机",
    "category": "高端装备制造",
    "summary": "围绕挖掘机领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 20
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 36
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 14
    },
    "totalEnterprises": 45,
    "jluPatentsCount": 168,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-37",
    "code": "IC-37",
    "name": "路面机械",
    "category": "高端装备制造",
    "summary": "围绕路面机械领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 22
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 25
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 27
    },
    "totalEnterprises": 92,
    "jluPatentsCount": 333,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-38",
    "code": "IC-38",
    "name": "品牌服装",
    "category": "消费品与轻工",
    "summary": "围绕品牌服装领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 10
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 16
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 29
    },
    "totalEnterprises": 86,
    "jluPatentsCount": 82,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-39",
    "code": "IC-39",
    "name": "化学纤维",
    "category": "新材料",
    "summary": "围绕化学纤维领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 16
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 28
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 20
    },
    "totalEnterprises": 82,
    "jluPatentsCount": 68,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-40",
    "code": "IC-40",
    "name": "纺织设备",
    "category": "高端装备制造",
    "summary": "围绕纺织设备领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 28
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 19
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 17
    },
    "totalEnterprises": 44,
    "jluPatentsCount": 178,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-41",
    "code": "IC-41",
    "name": "高温合金材料",
    "category": "新材料",
    "summary": "围绕高温合金材料领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 13
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 16
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 10
    },
    "totalEnterprises": 50,
    "jluPatentsCount": 88,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-42",
    "code": "IC-42",
    "name": "化学药",
    "category": "生物医药与健康",
    "summary": "围绕化学药领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 10
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 28
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 18
    },
    "totalEnterprises": 81,
    "jluPatentsCount": 222,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-43",
    "code": "IC-43",
    "name": "中药",
    "category": "生物医药与健康",
    "summary": "围绕中药领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 16
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 26
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 14
    },
    "totalEnterprises": 58,
    "jluPatentsCount": 197,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-44",
    "code": "IC-44",
    "name": "水污染防治",
    "category": "节能环保与生态治理",
    "summary": "围绕水污染防治领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 19
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 35
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 12
    },
    "totalEnterprises": 82,
    "jluPatentsCount": 238,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-45",
    "code": "IC-45",
    "name": "节能设备",
    "category": "节能环保与生态治理",
    "summary": "围绕节能设备领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 25
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 17
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 12
    },
    "totalEnterprises": 90,
    "jluPatentsCount": 215,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-46",
    "code": "IC-46",
    "name": "大气污染防治设备",
    "category": "节能环保与生态治理",
    "summary": "围绕大气污染防治设备领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 28
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 13
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 15
    },
    "totalEnterprises": 89,
    "jluPatentsCount": 276,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-47",
    "code": "IC-47",
    "name": "固体废弃物处理",
    "category": "节能环保与生态治理",
    "summary": "围绕固体废弃物处理领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 27
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 39
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 10
    },
    "totalEnterprises": 74,
    "jluPatentsCount": 208,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-48",
    "code": "IC-48",
    "name": "酿造（酒）",
    "category": "消费品与轻工",
    "summary": "围绕酿造（酒）领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 14
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 27
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 20
    },
    "totalEnterprises": 54,
    "jluPatentsCount": 271,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-49",
    "code": "IC-49",
    "name": "人工智能",
    "category": "电子信息与智能算力",
    "summary": "围绕人工智能领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 11
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 11
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 24
    },
    "totalEnterprises": 41,
    "jluPatentsCount": 213,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-50",
    "code": "IC-50",
    "name": "氢能源",
    "category": "新能源与储能",
    "summary": "围绕氢能源领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 18
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 24
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 25
    },
    "totalEnterprises": 84,
    "jluPatentsCount": 339,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-51",
    "code": "IC-51",
    "name": "新能源汽车零部件",
    "category": "新能源汽车",
    "summary": "围绕新能源汽车零部件领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 11
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 36
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 18
    },
    "totalEnterprises": 65,
    "jluPatentsCount": 256,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-52",
    "code": "IC-52",
    "name": "智能门锁",
    "category": "高端装备制造",
    "summary": "围绕智能门锁领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 24
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 16
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 27
    },
    "totalEnterprises": 61,
    "jluPatentsCount": 296,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-53",
    "code": "IC-53",
    "name": "合成生物产业链",
    "category": "生物医药与健康",
    "summary": "围绕合成生物产业链领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 14
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 29
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 14
    },
    "totalEnterprises": 75,
    "jluPatentsCount": 173,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-54",
    "code": "IC-54",
    "name": "氢燃料电池汽车",
    "category": "新能源汽车",
    "summary": "围绕氢燃料电池汽车领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 23
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 23
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 15
    },
    "totalEnterprises": 62,
    "jluPatentsCount": 266,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-55",
    "code": "IC-55",
    "name": "先进金属材料",
    "category": "新材料",
    "summary": "围绕先进金属材料领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 11
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 37
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 18
    },
    "totalEnterprises": 72,
    "jluPatentsCount": 214,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-56",
    "code": "IC-56",
    "name": "生态修复",
    "category": "节能环保与生态治理",
    "summary": "围绕生态修复领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 18
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 11
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 21
    },
    "totalEnterprises": 98,
    "jluPatentsCount": 309,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  },
  {
    "id": "chain-57",
    "code": "IC-57",
    "name": "土壤修复",
    "category": "节能环保与生态治理",
    "summary": "围绕土壤修复领域的核心技术、上游原材料、中游制造与下游应用。",
    "jluAdvantageCollege": "重点科研团队",
    "upstreamNode": {
      "name": "上游核心材料与部件",
      "keyTechs": [
        "核心材料研发",
        "关键零部件制造"
      ],
      "matchedEnterprises": 12
    },
    "midstreamNode": {
      "name": "中游装备与系统集成",
      "keyTechs": [
        "系统集成",
        "精密制造工艺"
      ],
      "matchedEnterprises": 32
    },
    "downstreamNode": {
      "name": "下游终端产品与服务",
      "keyTechs": [
        "产品应用验证",
        "行业解决方案"
      ],
      "matchedEnterprises": 22
    },
    "totalEnterprises": 42,
    "jluPatentsCount": 204,
    "featuredCompanies": [
      "龙头企业A",
      "创新企业B",
      "专精特新企业C"
    ]
  }
];

export const INDUSTRY_CATEGORIES = [
  '全部产业链',
  '生物医药与健康',
  '新能源汽车',
  '新能源与储能',
  '高端装备制造',
  '新材料',
  '电子信息与智能算力',
  '消费品与轻工',
  '节能环保与生态治理'
];
