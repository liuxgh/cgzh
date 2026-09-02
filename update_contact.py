with open('src/components/EnterpriseProfilePage.tsx', 'r') as f:
    content = f.read()

old_block = """          <div className="flex gap-4">
            <span className="text-slate-500 shrink-0 w-24">公司电话：</span>
            <span className="text-slate-800">{phone}</span>
          </div>
          
          <div className="flex gap-4">
            <span className="text-slate-500 shrink-0 w-24">公司邮箱：</span>
            <span className="text-slate-800">{email}</span>
          </div>"""

new_block = """          <div className="flex gap-4 items-center">
            <span className="text-slate-500 shrink-0 w-24 flex items-center gap-1 whitespace-nowrap">
              <Phone className="w-3.5 h-3.5 text-blue-500" />公司电话：
            </span>
            <span className="text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{phone}</span>
          </div>
          
          <div className="flex gap-4 items-center">
            <span className="text-slate-500 shrink-0 w-24 flex items-center gap-1 whitespace-nowrap">
              <Mail className="w-3.5 h-3.5 text-blue-500" />公司邮箱：
            </span>
            <span className="text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{email}</span>
          </div>"""

if old_block in content:
    content = content.replace(old_block, new_block)
    with open('src/components/EnterpriseProfilePage.tsx', 'w') as f:
        f.write(content)
    print("Replaced successfully")
else:
    print("Old block not found!")
