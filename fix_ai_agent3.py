import re
filepath = 'src/components/AiEnterpriseAgent.tsx'
with open(filepath, 'r') as f:
    content = f.read()

content = content.replace('成果转化老师电话/上门沟通切入策略 (Talking Points)', '吉大成果转化老师上门走访与电话沟通切入指南')
content = content.replace('吉大成果转化沟通切入建议', '吉大成果转化沟通切入建议') # wait, that's inside the text, let's leave it.
content = content.replace('吉大成果转化老师上门走访与沟通话术指南 (Talking Points)', '吉大成果转化老师上门走访与电话沟通切入指南')

with open(filepath, 'w') as f:
    f.write(content)
print("Fixed tab 3 text.")
