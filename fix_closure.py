import re
filepath = 'src/components/AiEnterpriseAgent.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# I will change `handleRunAgent` to:
# const handleRunAgent = (targetTab: 'report' | 'official_letter' | 'call_script', mode: 'search' | 'letter') => {
#   setIsProcessing(true);
#   setCurrentStep(0);
#   const stepsLength = mode === 'search' ? searchSteps.length : letterSteps.length;
#   const interval = setInterval(() => {
#     setCurrentStep(prev => {
#       if (prev >= stepsLength - 1) { ... return stepsLength; }
#       return prev + 1;
#     });
#   }, 600);
# };

content = content.replace(
    "const handleRunAgent = (targetTab?: 'report' | 'official_letter' | 'call_script') => {",
    "const handleRunAgent = (targetTab: 'report' | 'official_letter' | 'call_script', mode: 'search' | 'letter') => {"
)
content = content.replace(
    "const target = targetTab || (agentMode === 'search' ? 'report' : 'official_letter');",
    "const target = targetTab;\n    const stepsLength = mode === 'search' ? searchSteps.length : letterSteps.length;"
)
content = content.replace("agentSteps.length - 1", "stepsLength - 1")
content = content.replace("return agentSteps.length;", "return stepsLength;")

# Update the calls
content = content.replace("handleRunAgent('official_letter');", "handleRunAgent('official_letter', 'letter');")
content = content.replace("handleRunAgent('report');", "handleRunAgent('report', 'search');")
content = content.replace("onClick={() => { setAgentMode('search'); handleRunAgent('report', 'search'); }}", "onClick={() => { setAgentMode('search'); handleRunAgent('report', 'search'); }}")
# wait, I already changed it to handleRunAgent('report').

with open(filepath, 'w') as f:
    f.write(content)
