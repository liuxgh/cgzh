import re

with open('src/data/targetEnterprisesData.ts', 'r') as f:
    content = f.read()

# Fix the first 8
mapping = {
    '时代': '宁德时代电机科技有限公司',
    '中国一汽 (FAW)': '中国第一汽车集团有限公司',
    '舜宇光学 (Sunny Optical)': '舜宇光学科技（集团）有限公司',
    '迈瑞医疗 (Mindray)': '深圳迈瑞生物医疗电子股份有限公司',
    '科德数控 (Kede CNC)': '科德数控股份有限公司',
    '京东方 (BOE)': '京东方科技集团股份有限公司',
    '中复神鹰 (Zhongfu Shenying)': '中复神鹰碳纤维股份有限公司',
    '中国一拖 (YTO Group)': '中国一拖集团有限公司'
}

def fix_company(match):
    short = match.group(1)
    if short in mapping:
        correct_name = mapping[short]
    elif short.startswith("创新科技"):
        # extract number
        num = short.replace("创新科技", "")
        correct_name = f'智能制造与新能源创新科技(测试{num})股份有限公司'
    else:
        # should not happen but just in case
        correct_name = short
        
    return f"name: '{correct_name}',\n    shortName: '{short}'"

content = re.sub(r"name:\s*'[^']+',\n\s*shortName:\s*'([^']+)'", fix_company, content)

with open('src/data/targetEnterprisesData.ts', 'w') as f:
    f.write(content)
