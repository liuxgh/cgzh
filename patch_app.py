import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

replacement = """        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedEnterpriseForDetailModal(null);
        }}"""

content = content.replace("        setActiveTab={setActiveTab}", replacement)

with open('src/App.tsx', 'w') as f:
    f.write(content)
print("Patched App.tsx")
