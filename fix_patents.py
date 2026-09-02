with open('src/components/EnterpriseProfilePage.tsx', 'r') as f:
    content = f.read()

# 专利号
content = content.replace('{p.patentNo}', '<CopyableText text={p.patentNo}>{p.patentNo}</CopyableText>')

with open('src/components/EnterpriseProfilePage.tsx', 'w') as f:
    f.write(content)
