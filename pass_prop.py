import re
filepath = 'src/App.tsx'
with open(filepath, 'r') as f:
    content = f.read()

content = content.replace(
    "onSelectEnterprise={(ent) => setSelectedEnterpriseForDetailModal(ent)}",
    "onSelectEnterprise={(ent) => setSelectedEnterpriseForDetailModal(ent)}\n            onOpenAiAgentWithEnterprise={handleOpenAiAgentWithEnterprise}"
)

with open(filepath, 'w') as f:
    f.write(content)
