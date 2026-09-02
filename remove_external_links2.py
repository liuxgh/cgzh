import re

filepath = 'src/components/PatentProductSearchHub.tsx'
with open(filepath, 'r') as f:
    content = f.read()

pattern3 = r'\{prod\.filingEnterprise\}\s*<ExternalLink className="w-[^"]+" />'
content = re.sub(pattern3, '{prod.filingEnterprise}', content)

with open(filepath, 'w') as f:
    f.write(content)
print("Removed Share/ExternalLink icons from PatentProductSearchHub.")
