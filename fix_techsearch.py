with open('src/components/TechSearchHub.tsx', 'r') as f:
    content = f.read()

content = content.replace("const pageTitle = isGlobalSearch ? '全网技术寻源 (AI)' : '吉大技术寻源 (AI)';", "const pageTitle = 'AI智能匹配技术';")

with open('src/components/TechSearchHub.tsx', 'w') as f:
    f.write(content)
