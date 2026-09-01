import sys

with open('src/components/EnterpriseLandingPage.tsx', 'r') as f:
    content = f.read()

content = content.replace("logo: '/hhu.svg'", "logo: '/hehai.png'")
content = content.replace("logo: '/seu.png'", "logo: '/dongnan.png'")
content = content.replace("logo: '/suda.png'", "logo: '/suzhou.png'")
content = content.replace("logo: '/njust.svg'", "logo: '/nanjingligong.png'")

with open('src/components/EnterpriseLandingPage.tsx', 'w') as f:
    f.write(content)
print("Logos updated.")
