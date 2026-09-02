with open('src/App.tsx', 'r') as f:
    content = f.read()

old_block = """          <EnterpriseProfilePage 
            enterprise={selectedEnterpriseForDetailModal}
            onBack={() => setSelectedEnterpriseForDetailModal(null)}
          />"""

new_block = """          <EnterpriseProfilePage 
            enterprise={selectedEnterpriseForDetailModal}
            onBack={() => setSelectedEnterpriseForDetailModal(null)}
            onOpenAiActionPlan={(ent) => setSelectedEnterpriseForActionPlan(ent)}
          />"""

content = content.replace(old_block, new_block)

with open('src/App.tsx', 'w') as f:
    f.write(content)
