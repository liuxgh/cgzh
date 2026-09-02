import re

filepath = 'src/components/AiEnterpriseAgent.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# 1. We remove activeTab and agentMode, replace them with simple stuff.
# 2. We remove letterSteps entirely.
# 3. We change agentSteps to just the search steps.
# 4. We remove the "TAB 2" and "TAB 3" blocks entirely.
# 5. We update the prop onOpenAiActionPlan from App.tsx. It's missing in AiEnterpriseAgentProps.

# Add the prop to interface:
content = content.replace(
    "onSelectEnterprise: (enterprise: TargetEnterprise) => void;",
    "onSelectEnterprise: (enterprise: TargetEnterprise) => void;\n  onOpenAiActionPlan?: (enterprise: TargetEnterprise) => void;"
)

content = content.replace(
    "onSelectEnterprise\n}) => {",
    "onSelectEnterprise,\n  onOpenAiActionPlan\n}) => {"
)

# Remove the complex steps and modes:
start_idx = content.find("const searchSteps = [")
end_idx = content.find("const handleRunAgent = ")

new_steps = """
  const agentSteps = [
    { title: '专利权利要求与技术特征语义解析', desc: '提取核心发明点、微观机理、适用工业场景及潜在替代/互补特征' },
    { title: '佰腾中国专利大模型向量语义比对', desc: '穿透2亿+专利数据库，匹配全国企业同族/相似技术公开专利' },
    { title: '战略产业链上下游供需图谱穿透', desc: '定位上游关键原材料、中游制造模块与下游整机集成商技术痛点' },
    { title: '国家专利密集型产品备案公开数据产业化能力校验', desc: '比对200,000+款已备案量产产品，筛选具备规模化采购实力的规上企业' },
    { title: '企业工商信用画像与产学研决策人匹配', desc: '生成企业研发预算、技术高管联系方式与定制化上门走访沟通策略' }
  ];

"""
content = content[:start_idx] + new_steps + content[end_idx:]

# Refactor handleRunAgent
old_run = """const handleRunAgent = (targetTab: 'report' | 'official_letter' | 'call_script', mode: 'search' | 'letter') => {
    setIsProcessing(true);
    setCurrentStep(0);
    const target = targetTab;
    const stepsLength = mode === 'search' ? searchSteps.length : letterSteps.length;
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= stepsLength - 1) {
          clearInterval(interval);
          setIsProcessing(false);
          if (target) setActiveTab(target);
          return stepsLength;
        }
        return prev + 1;
      });
    }, 600);
  };"""
  
new_run = """const handleRunAgent = () => {
    setIsProcessing(true);
    setCurrentStep(0);
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= agentSteps.length - 1) {
          clearInterval(interval);
          setIsProcessing(false);
          return agentSteps.length;
        }
        return prev + 1;
      });
    }, 600);
  };"""
content = content.replace(old_run, new_run)

# Fix effect
old_effect = """useEffect(() => {
    if (initialEnterprise) {
      setAgentMode('letter');
      handleRunAgent('official_letter', 'letter');
    } else if (initialQuery) {
      setAgentMode('search');
      handleRunAgent('report', 'search');
    }
  }, [initialQuery, initialEnterprise]);"""
new_effect = """useEffect(() => {
    if (initialQuery) {
      handleRunAgent();
    }
  }, [initialQuery]);"""
content = content.replace(old_effect, new_effect)

# Fix "AI撰写成果转化推荐函" click
content = content.replace(
    "setLocalEnterprise(ent);\n                            setAgentMode('letter');\n                            handleRunAgent('official_letter', 'letter');",
    "if (onOpenAiActionPlan) { onOpenAiActionPlan(ent); }"
)

# Fix the button onClick
content = content.replace(
    "onClick={() => { setAgentMode('search'); handleRunAgent('report', 'search'); }}",
    "onClick={handleRunAgent}"
)

# Fix animation text (remove ternary)
content = content.replace(
    "{agentMode === 'search' ? '佰腾 AI 智能体正在进行多维跨数据库穿透检索与关联推理...' : '佰腾 AI 智能体正在自动撰写定制化科技成果转化推荐函...'}",
    "佰腾 AI 智能体正在进行多维跨数据库穿透检索与关联推理..."
)

# Remove the Tabs HTML
start_tabs = content.find("<!-- Tabs Bar -->")
if start_tabs == -1:
    start_tabs = content.find("{/* Tabs Bar */}")

end_tabs = content.find("{/* TAB 1: Intelligence Report */}")

if start_tabs != -1 and end_tabs != -1:
    content = content[:start_tabs] + content[end_tabs:]

# Remove activeTab condition
content = content.replace("{activeTab === 'report' && (", "")
content = content.replace(")}", "", 1) # Note: we'll use regex for precision below

with open(filepath, 'w') as f:
    f.write(content)
