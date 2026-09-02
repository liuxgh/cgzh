import re

filepath = 'src/components/UnpatentedTechHub.tsx'
with open(filepath, 'r') as f:
    content = f.read()

content = content.replace('非专利技术/成果 / 专有技术 平台', '非专利技术、成果')
content = content.replace('供吉林大学教师发布尚未形成专利（或不宜公开申请专利）的核心技术成果，供系统在后台为企业进行加密匹配。', '供吉林大学教师发布尚未形成专利（或不宜公开申请专利）的核心技术成果。')

with open(filepath, 'w') as f:
    f.write(content)
print("Updated UnpatentedTechHub.tsx")
