with open('src/components/EnterpriseProfilePage.tsx', 'r') as f:
    content = f.read()

content = content.replace('<span className="text-slate-800">{address}</span>', '<CopyableText text={address}><span className="text-slate-800">{address}</span></CopyableText>')
content = content.replace('<span className="text-blue-600 hover:underline cursor-pointer">{website}</span>', '<CopyableText text={website}><span className="text-blue-600 hover:underline cursor-pointer">{website}</span></CopyableText>')
content = content.replace('<span className="text-slate-800">{status}</span>', '<CopyableText text={status}><span className="text-slate-800">{status}</span></CopyableText>')
content = content.replace('{enterprise.contact?.contactPerson}', '<CopyableText text={enterprise.contact?.contactPerson || ""}>{enterprise.contact?.contactPerson}</CopyableText>')
content = content.replace('{enterprise.contact?.phone}', '<CopyableText text={enterprise.contact?.phone || ""}>{enterprise.contact?.phone}</CopyableText>')
content = content.replace('{enterprise.contact?.email}', '<CopyableText text={enterprise.contact?.email || ""}>{enterprise.contact?.email}</CopyableText>')

with open('src/components/EnterpriseProfilePage.tsx', 'w') as f:
    f.write(content)
