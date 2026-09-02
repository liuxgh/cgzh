import re

filepath = 'src/components/PatentProductSearchHub.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Replace title
content = content.replace("通过国家专利密集型产品 ➔ 产品技术找企业", "通过国家专利密集型产品找企业")

# Replace the span
span_pattern = r'<span className="text-slate-400 text-\[11px\]">\s*核心发明专利保护：<strong className="text-slate-700 font-mono">\{prod\.corePatentsTotal\} 项</strong>\s*</span>'
content = re.sub(span_pattern, "", content)

# Change justify-between to justify-end for that specific div
# The div looks like: <div className="pt-2 flex items-center justify-between text-sm">
div_pattern = r'<div className="pt-2 flex items-center justify-between text-sm">\s*<button'
# Wait, if we remove the span, the text becomes <div ...>\n<button
content = re.sub(r'<div className="pt-2 flex items-center justify-between text-sm">\s*<button', r'<div className="pt-2 flex items-center justify-end text-sm">\n                <button', content)

with open(filepath, 'w') as f:
    f.write(content)
print("Updated PatentProductSearchHub.tsx")
