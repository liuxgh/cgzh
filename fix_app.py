import re
filepath = 'src/App.tsx'
with open(filepath, 'r') as f:
    content = f.read()

content = content.replace("setSelectedEnterpriseForDetailModal(null);\n        }}", "setSelectedEnterpriseForDetailModal(null);\n          setSelectedEnterpriseForActionPlan(null);\n        }}")

with open(filepath, 'w') as f:
    f.write(content)
