import re

files = [
    'src/components/AiEnterpriseAgent.tsx',
    'src/components/PatentSimilarSearchHub.tsx',
    'src/components/IndustryChain57Hub.tsx',
    'src/components/OverviewDashboard.tsx'
]

for file in files:
    with open(file, 'r') as f:
        content = f.read()
    
    # We want to remove the redundant )}. 
    # Notice in the tail output:
    #             )}
    #             )}
    content = re.sub(r"\}\)\s*\}\)\s*", ")}\n", content)
    
    with open(file, 'w') as f:
        f.write(content)
