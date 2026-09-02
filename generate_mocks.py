import re
import random

provinces = ['广东省', '江苏省', '浙江省', '上海市', '北京市', '山东省', '四川省', '湖北省']
cities = {
    '广东省': ['深圳市', '广州市', '东莞市'],
    '江苏省': ['苏州市', '南京市', '无锡市'],
    '浙江省': ['杭州市', '宁波市'],
    '上海市': ['上海市'],
    '北京市': ['北京市'],
    '山东省': ['青岛市', '济南市'],
    '四川省': ['成都市'],
    '湖北省': ['武汉市']
}

mock_enterprises = ""
for i in range(1, 45):
    prov = random.choice(provinces)
    city = random.choice(cities[prov])
    phone = f"0{random.randint(10, 99)}-{random.randint(10000000, 99999999)}"
    
    mock = f"""
  {{
    id: 'ent-mock-{i}',
    name: '智能制造与新能源创新科技(测试{i})股份有限公司',
    shortName: '创新科技{i}',
    creditCode: '91350900{random.randint(10000, 99999)}U',
    registeredCapital: '{random.randint(1000, 9000)} 万元人民币',
    location: '{prov}{city}',
    province: '{prov}',
    city: '{city}',
    industry: '高端装备制造 / 自动化与控制',
    scale: '省级专精特新',
    enterpriseType: '民营企业',
    revenue: '{random.randint(1, 50)} 亿元 (2024)',
    rdInvestment: '{random.randint(10, 500)} 百万元',
    rdRatio: '{random.uniform(3.0, 10.0):.2f}%',
    patentTotalCount: {random.randint(20, 200)},
    inventionPatentCount: {random.randint(5, 50)},
    matchSource: 'similar_patent',
    matchScore: {random.randint(70, 95)},
    legalRep: '张三{i}',
    address: '{prov}{city}高新技术产业园{i}号',
    phone: '{phone}',
    email: 'contact@mock{i}.com',
    website: 'www.mock{i}.com',
    establishedDate: '201{random.randint(0,9)}-0{random.randint(1,9)}-1{random.randint(0,9)}',
    businessScope: '一般项目：技术开发，高端装备制造，自动化控制系统集成。',
    registeredProducts: ['高精度传感器设备', '智能伺服驱动器'],
    keyInventors: [
      {{ name: '李四', role: '首席科学家', domain: '自动化控制' }},
      {{ name: '王五', role: '研发总监', domain: '电力电子' }}
    ],
    similarPatents: [
      {{ patentNo: 'CN11{random.randint(100000, 999999)}A', title: '一种基于机器视觉的自动化校准方法' }}
    ],
    synergyReason: '企业在自动化领域具有一定市场份额，技术方向与吉林大学微电子学院相关成果匹配度高。',
    matchTags: ['专精特新', '产学研潜力'],
    contact: {{
      contactPerson: '李四',
      dept: '研发中心',
      title: '技术总监',
      phone: '138{random.randint(10000000, 99999999)}',
      email: 'lisi@mock{i}.com',
      suggestedApproach: '建议通过联合实验室或委托开发项目切入合作。'
    }}
  }},"""
    mock_enterprises += mock

filepath = 'src/data/targetEnterprisesData.ts'
with open(filepath, 'r') as f:
    content = f.read()

# Insert before the last closing bracket for the array
# Let's find "];" at the end of the file
new_content = content.replace("];", mock_enterprises + "\n];")

with open(filepath, 'w') as f:
    f.write(new_content)
print("Added 44 mock enterprises.")
