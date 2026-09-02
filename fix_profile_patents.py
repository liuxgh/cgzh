with open('src/components/EnterpriseProfilePage.tsx', 'r') as f:
    content = f.read()

content = content.replace("成果匹配专利清单", "企业相似专利")
content = content.replace("专利摘要内容:", "摘要:")

old_percentage = """                    <span className="text-[10px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
                      {p.similarityScore || 90}%
                    </span>"""

content = content.replace(old_percentage, "")

with open('src/components/EnterpriseProfilePage.tsx', 'w') as f:
    f.write(content)
