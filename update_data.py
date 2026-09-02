import re

filepath = 'src/data/targetEnterprisesData.ts'
with open(filepath, 'r') as f:
    content = f.read()

# Replace the first element of TARGET_ENTERPRISES_DATA with our updated one
catl_pattern = r"({\s*id:\s*'ent-catl',\s*name:\s*'宁德时代新能源科技股份有限公司'[\s\S]*?matchScore:\s*97,)"

replacement = r"""{
    id: 'ent-catl',
    name: '宁德时代电机科技有限公司',
    shortName: '时代',
    creditCode: '91350900587526883U',
    registeredCapital: '8000 万元人民币',
    location: '福建省宁德市',
    province: '福建省',
    city: '宁德市',
    industry: '新能源汽车 / 动力电池与储能系统',
    scale: '全球动力电池市占率第一 / 创业板千亿市值龙头',
    enterpriseType: '上市企业',
    revenue: '4,009 亿元 (2024)',
    rdInvestment: '183.6 亿元 (研发比 4.58%)',
    rdRatio: '4.58%',
    patentTotalCount: 152,
    inventionPatentCount: 34,
    matchSource: 'similar_patent',
    matchScore: 97,
    legalRep: '曾毓群',
    address: '福建省宁德市蕉城区疏港路118号',
    phone: '0593-8991832',
    email: 'xm@catlmotor.com',
    website: 'www.catl.com',
    establishedDate: '2017-02-24',
    businessScope: '一般项目：技术服务、技术开发、技术咨询、技术交流、技术转让、技术推广；电动机制造；发电机及发电机组制造；发电机及发电机组销售；微特电机及组件制造；微特电机及组件销售；齿轮及齿轮减、变速箱制造；齿轮及齿轮减、变速箱销售；模具销售；输配电及控制设备制造；智能输配电及控制设备销售；机械零件、零部件加工；机械零件、零部件销售；电子元器件与机电组件设备销售；电池制造；电池销售；新能源汽车整车销售；新能源汽车电附件销售；新能源汽车换电设施销售；电动汽车充电基础设施运营；汽车新车销售；集中式快速充电站；分布式交流充电桩销售；二手车经销；船舶销售；建筑工程用机械销售；非居住房地产租赁 ( 除依法须经批准的项目外, 凭营业执照依法自主开展经营活动 ) 许可项目：技术进出口；货物进出口 ( 依法须经批准的项目，经相关部门批准后方可开展经营活动，具体经营项目以相关部门批准文件或许可证件为准 )',
    status: '存续',
    oldName: '-',"""

content = re.sub(catl_pattern, replacement, content)

# I should also add legalRep, address, etc. to others just so they don't break if accessed, though they have default fallbacks in the page.
with open(filepath, 'w') as f:
    f.write(content)
print("Updated targetEnterprisesData.ts")
