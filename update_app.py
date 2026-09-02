import re

filepath = 'src/App.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Imports
content = content.replace("import { AiEnterpriseAgent } from './components/AiEnterpriseAgent';", "import { AiEnterpriseAgent } from './components/AiEnterpriseAgent';\nimport { AiActionPlanPage } from './components/AiActionPlanPage';")

# States
content = content.replace(
    "const [selectedEnterpriseForDetailModal, setSelectedEnterpriseForDetailModal] = useState<TargetEnterprise | null>(null);",
    "const [selectedEnterpriseForDetailModal, setSelectedEnterpriseForDetailModal] = useState<TargetEnterprise | null>(null);\n  const [selectedEnterpriseForActionPlan, setSelectedEnterpriseForActionPlan] = useState<TargetEnterprise | null>(null);"
)

# Handler
old_handler = """  // Launch AI Agent with specific enterprise
  const handleOpenAiAgentWithEnterprise = (enterprise: TargetEnterprise) => {
    setAgentInitialEnterprise(enterprise);
    setAgentInitialQuery(enterprise.name);
    setActiveTab('ai-agent');
    setGlobalToastMessage(`已锁定目标企业「${enterprise.name}」，AI 智能体正在生成专属对接策略`);
    setTimeout(() => setGlobalToastMessage(null), 3500);
  };"""

new_handler = """  // Launch AI Action Plan for specific enterprise
  const handleOpenAiActionPlan = (enterprise: TargetEnterprise) => {
    setSelectedEnterpriseForActionPlan(enterprise);
  };"""

content = content.replace(old_handler, new_handler)

# Render main logic
old_main = """        {selectedEnterpriseForDetailModal ? (
          <EnterpriseProfilePage 
            enterprise={selectedEnterpriseForDetailModal}
            onBack={() => setSelectedEnterpriseForDetailModal(null)}
          />
        ) : ("""

new_main = """        {selectedEnterpriseForActionPlan ? (
          <AiActionPlanPage
            enterprise={selectedEnterpriseForActionPlan}
            activePatent={selectedPatent || patents[0]}
            onBack={() => setSelectedEnterpriseForActionPlan(null)}
          />
        ) : selectedEnterpriseForDetailModal ? (
          <EnterpriseProfilePage 
            enterprise={selectedEnterpriseForDetailModal}
            onBack={() => setSelectedEnterpriseForDetailModal(null)}
          />
        ) : ("""

content = content.replace(old_main, new_main)

# Also rename all usages of handleOpenAiAgentWithEnterprise
content = content.replace("handleOpenAiAgentWithEnterprise", "handleOpenAiActionPlan")

with open(filepath, 'w') as f:
    f.write(content)

