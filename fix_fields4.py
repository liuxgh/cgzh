with open('src/components/EnterpriseProfilePage.tsx', 'r') as f:
    content = f.read()

content = content.replace('<h4 className="font-bold text-slate-900 text-[15px]">{inv.name}</h4>', '<h4 className="font-bold text-slate-900 text-[15px]"><CopyableText text={inv.name}>{inv.name}</CopyableText></h4>')
content = content.replace('<span className="text-slate-500 font-bold">{inv.patentCount}件</span>', '<CopyableText text={inv.patentCount}><span className="text-slate-500 font-bold">{inv.patentCount}件</span></CopyableText>')

with open('src/components/EnterpriseProfilePage.tsx', 'w') as f:
    f.write(content)
