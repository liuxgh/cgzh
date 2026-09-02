import re

filepath = 'src/App.tsx'
with open(filepath, 'r') as f:
    content = f.read()

content = content.replace("<EnterpriseProfilePage \\n            enterprise={selectedEnterpriseForDetailModal}\\n            onBack={() => setSelectedEnterpriseForDetailModal(null)}\\n          />",
                          "<EnterpriseProfilePage \\n            enterprise={selectedEnterpriseForDetailModal}\\n            onBack={() => setSelectedEnterpriseForDetailModal(null)}\\n            onOpenAiAgentWithEnterprise={handleOpenAiAgentWithEnterprise}\\n          />")

with open(filepath, 'w') as f:
    f.write(content)
print("Updated App.tsx")
