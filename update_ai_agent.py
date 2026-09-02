import re

filepath = 'src/components/AiEnterpriseAgent.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# First, let's redefine the state and the steps.
# We'll use a `generateTarget` string to indicate what we are generating. 'search' vs 'letter'.

new_agent_steps = """
  const searchSteps = [
    { title: '专利权利要求与技术特征语义解析', desc: '提取核心发明点、微观机理、适用工业场景及潜在替代/互补特征' },
    { title: '佰腾中国专利大模型向量语义比对', desc: '穿透2亿+专利数据库，匹配全国企业同族/相似技术公开专利' },
    { title: '战略产业链上下游供需图谱穿透', desc: '定位上游关键原材料、中游制造模块与下游整机集成商技术痛点' },
    { title: '国家专利密集型产品备案公开数据产业化能力校验', desc: '比对200,000+款已备案量产产品，筛选具备规模化采购实力的规上企业' },
    { title: '企业工商信用画像与产学研决策人匹配', desc: '生成企业研发预算、技术高管联系方式与定制化上门走访沟通策略' }
  ];

  const letterSteps = [
    { title: '读取企业画像与专利布局图谱', desc: '提取目标企业核心主营业务、战略研发方向与近期备案产品信息' },
    { title: '匹配技术成果与企业需求契合点', desc: '深度分析吉林大学专利创新点，对齐企业现有技术短板与降本增效需求' },
    { title: '自动生成定制化转化推荐函', desc: '采用严谨公文格式，结构化输出合作背景、核心优势与拟合作模式' },
    { title: '生成产学研走访沟通话术指南', desc: '提供开场切入点、技术痛点实测数据展示策略与合作方案备选' }
  ];

  const [agentMode, setAgentMode] = useState<'search' | 'letter'>('search');
  const agentSteps = agentMode === 'search' ? searchSteps : letterSteps;
"""

# Replace the original `agentSteps` with this.
pattern_steps = r"const agentSteps = \[.*?\];"
content = re.sub(pattern_steps, new_agent_steps, content, flags=re.DOTALL)

# Handle the click on "AI撰写成果转化推荐函" in Tab 1
button_pattern = r"onClick=\{\(\) => \{\s*setLocalEnterprise\(ent\);\s*setActiveTab\('official_letter'\);\s*\}\}"
new_button = """onClick={() => { 
                            setLocalEnterprise(ent);
                            setAgentMode('letter');
                            handleRunAgent('official_letter');
                          }}"""
content = re.sub(button_pattern, new_button, content)

# Modify `handleRunAgent` to take a target tab, or default to current.
run_agent_pattern = r"const handleRunAgent = \(\) => \{\s*setIsProcessing\(true\);\s*setCurrentStep\(0\);"
new_run_agent = """const handleRunAgent = (targetTab?: 'report' | 'official_letter' | 'call_script') => {
    setIsProcessing(true);
    setCurrentStep(0);
    const target = targetTab || (agentMode === 'search' ? 'report' : 'official_letter');"""
content = re.sub(run_agent_pattern, new_run_agent, content)

# Modify the end of the interval to set the tab.
interval_end_pattern = r"clearInterval\(interval\);\s*setIsProcessing\(false\);\s*return agentSteps\.length;"
new_interval_end = """clearInterval(interval);
          setIsProcessing(false);
          if (target) setActiveTab(target);
          return agentSteps.length;"""
content = re.sub(interval_end_pattern, new_interval_end, content)

# Ensure the effect for `initialEnterprise` triggers it.
effect_pattern = r"useEffect\(\(\) => \{\s*if \(initialQuery\) \{\s*handleRunAgent\(\);\s*\}\s*\}, \[initialQuery\]\);"
new_effect = """useEffect(() => {
    if (initialEnterprise) {
      setAgentMode('letter');
      handleRunAgent('official_letter');
    } else if (initialQuery) {
      setAgentMode('search');
      handleRunAgent('report');
    }
  }, [initialQuery, initialEnterprise]);"""
content = re.sub(effect_pattern, new_effect, content)

# Also fix the run search button to reset mode.
run_search_pattern = r"onClick=\{handleRunAgent\}\s*disabled=\{isProcessing\}"
new_run_search = """onClick={() => { setAgentMode('search'); handleRunAgent('report'); }}
                disabled={isProcessing}"""
content = re.sub(run_search_pattern, new_run_search, content)

with open(filepath, 'w') as f:
    f.write(content)

