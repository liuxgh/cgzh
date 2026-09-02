import re

filepath = 'src/components/EnterpriseProfilePage.tsx'
with open(filepath, 'r') as f:
    content = f.read()

var_injection = """
  const address = enterprise.address || "福建省宁德市蕉城区疏港路118号";
  const website = enterprise.website || "www.catl.com";
"""
content = re.sub(r'const address = [^\n]+;', var_injection, content)

ui_injection = """
          <div className="flex gap-4">
            <span className="text-slate-500 shrink-0 w-24">企业网址：</span>
            <span className="text-blue-600 hover:underline cursor-pointer">{website}</span>
          </div>

          <div className="flex gap-4 md:col-span-2">
            <span className="text-slate-500 shrink-0 w-24">注册地址：</span>
"""
content = re.sub(r'<div className="flex gap-4 md:col-span-3">\s*<span className="text-slate-500 shrink-0 w-24">注册地址：</span>', ui_injection, content)

with open(filepath, 'w') as f:
    f.write(content)
print("Updated website in EnterpriseProfilePage.tsx")
