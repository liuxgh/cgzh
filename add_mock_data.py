import re
with open('src/data/targetEnterprisesData.ts', 'r') as f:
    content = f.read()

# FOR CATL (ent-catl) Let's add more patents and inventors.
# Find `similarPatents: [` and add one more.
old_similar_patents = """    similarPatents: [
      {
        patentNo: 'CN112456789A',
        title: '一种高镍三元正极材料及其制备方法',
        ipc: 'H01M4/525',
        grantDate: '2021-05-12',
        similarityScore: 94,
        techOverlapDescription: '均采用了纳米级表面包覆技术，吉大专利在包覆层的导电网络构建上具有互补性。'
      }
    ],"""

new_similar_patents = """    similarPatents: [
      {
        patentNo: 'CN112456789A',
        title: '一种高镍三元正极材料及其制备方法',
        ipc: 'H01M4/525',
        grantDate: '2021-05-12',
        similarityScore: 94,
        techOverlapDescription: '均采用了纳米级表面包覆技术，吉大专利在包覆层的导电网络构建上具有互补性。'
      },
      {
        patentNo: 'CN113847592B',
        title: '新型硅碳负极材料的自组装工艺',
        ipc: 'H01M4/36',
        grantDate: '2022-11-03',
        similarityScore: 91,
        techOverlapDescription: '与吉大成果中的微观孔隙结构控制原理高度一致，可直接用于该企业下一代快充电池体系。'
      },
      {
        patentNo: 'CN210987654U',
        title: '动力电池热失控阻燃隔膜结构',
        ipc: 'H01M50/409',
        grantDate: '2020-08-15',
        similarityScore: 88,
        techOverlapDescription: '在耐高温高分子材料的应用上存在交叉，吉大的耐高温聚合物配方可直接提升其隔膜安全性。'
      }
    ],"""
content = content.replace(old_similar_patents, new_similar_patents)

# For CATL inventors
old_inventors = """    keyInventors: [
      { name: '曾毓群', patentCount: 45 },
      { name: '吴凯', patentCount: 38 }
    ]"""

new_inventors = """    keyInventors: [
      { name: '曾毓群', patentCount: 145 },
      { name: '吴凯', patentCount: 138 },
      { name: '赵丰刚', patentCount: 89 },
      { name: '陈小波', patentCount: 76 },
      { name: '王鸿雁', patentCount: 52 }
    ]"""
content = content.replace(old_inventors, new_inventors)

with open('src/data/targetEnterprisesData.ts', 'w') as f:
    f.write(content)
