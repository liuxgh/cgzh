import re

filepath = 'src/components/EnterpriseProfilePage.tsx'
with open(filepath, 'r') as f:
    content = f.read()

var_injection = """
  const shortName = enterprise.shortName || "时代";
  const oldName = enterprise.oldName || "-";
  const address = enterprise.address || "福建省宁德市蕉城区疏港路118号";
  const legalRep = enterprise.legalRep || "曾毓群";
"""
content = re.sub(r'const shortName = [^\n]+;\n\s*const oldName = [^\n]+;\n\s*const address = [^\n]+;', var_injection, content)

ui_injection = """
          <div className="flex gap-4">
            <span className="text-slate-500 shrink-0 w-24">曾用名：</span>
            <span className="text-slate-800">{oldName}</span>
          </div>

          <div className="flex gap-4">
            <span className="text-slate-500 shrink-0 w-24">法定代表人：</span>
            <span className="text-slate-800">{legalRep}</span>
          </div>
"""
# Replace the oldName block with oldName + legalRep
content = re.sub(r'<div className="flex gap-4">\s*<span className="text-slate-500 shrink-0 w-20">曾用名：</span>\s*<span className="text-slate-800">\{oldName\}</span>\s*</div>', ui_injection, content)

# I should also fix the w-20 to w-24 globally in that grid to ensure '法定代表人' fits without wrapping
content = content.replace("w-20", "w-24")

with open(filepath, 'w') as f:
    f.write(content)
print("Updated EnterpriseProfilePage.tsx")
