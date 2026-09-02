with open('src/components/EnterpriseLandingPage.tsx', 'r') as f:
    content = f.read()

content = content.replace("已接入合作高校联盟", "已接入高校")

with open('src/components/EnterpriseLandingPage.tsx', 'w') as f:
    f.write(content)
