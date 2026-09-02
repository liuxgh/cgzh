with open('src/components/Header.tsx', 'r') as f:
    content = f.read()

content = content.replace("label: '吉大技术图谱'", "label: '成果技术图谱'")
content = content.replace("label: '吉大技术寻源 (AI)'", "label: 'AI智能匹配技术'")
content = content.replace("label: '全国高校联盟大厅'", "label: '首页'")
content = content.replace("label: '全网技术寻源 (AI)'", "label: 'AI智能匹配技术'")

with open('src/components/Header.tsx', 'w') as f:
    f.write(content)
