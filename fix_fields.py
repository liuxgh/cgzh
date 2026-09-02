import re

with open('src/components/EnterpriseProfilePage.tsx', 'r') as f:
    content = f.read()

# Make sure CopyableText is imported
if "CopyableText" not in content:
    content = content.replace("import React", "import React\nimport { CopyableText } from './CopyableText';")

# 统一社会信用代码
content = content.replace('<span className="text-slate-800">{creditCode}</span>', '<CopyableText text={creditCode}><span className="text-slate-800">{creditCode}</span></CopyableText>')
# 法定代表人
content = content.replace('<span className="text-slate-800">{legalRep}</span>', '<CopyableText text={legalRep}><span className="text-slate-800">{legalRep}</span></CopyableText>')
# 成立日期
content = content.replace('<span className="text-slate-800">{establishedDate}</span>', '<CopyableText text={establishedDate}><span className="text-slate-800">{establishedDate}</span></CopyableText>')
# 注册资本
content = content.replace('<span className="text-slate-800">{registeredCapital}</span>', '<CopyableText text={registeredCapital}><span className="text-slate-800">{registeredCapital}</span></CopyableText>')
# 公司电话
content = content.replace('<span className="text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{phone}</span>', '<CopyableText text={phone}><span className="text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{phone}</span></CopyableText>')
# 公司邮箱
content = content.replace('<span className="text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{email}</span>', '<CopyableText text={email}><span className="text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{email}</span></CopyableText>')
# 企业简称
content = content.replace('<span className="text-slate-800">{shortName}</span>', '<CopyableText text={shortName}><span className="text-slate-800">{shortName}</span></CopyableText>')
# 曾用名
content = content.replace('<span className="text-slate-800">{oldName}</span>', '<CopyableText text={oldName}><span className="text-slate-800">{oldName}</span></CopyableText>')
# 企业状态
content = content.replace('<span className="text-slate-800">{status}</span>', '<CopyableText text={status}><span className="text-slate-800">{status}</span></CopyableText>')
# 注册地址
content = content.replace('<span className="text-slate-800 leading-relaxed">{address}</span>', '<CopyableText text={address}><span className="text-slate-800 leading-relaxed">{address}</span></CopyableText>')

# Also title
content = content.replace('<h1 className="text-2xl font-black text-slate-900">{enterprise.name}</h1>', '<CopyableText text={enterprise.name}><h1 className="text-2xl font-black text-slate-900">{enterprise.name}</h1></CopyableText>')

with open('src/components/EnterpriseProfilePage.tsx', 'w') as f:
    f.write(content)
