import re

files = [
    'src/components/AiActionPlanPage.tsx',
    'src/components/AiEnterpriseAgent.tsx',
    'src/components/IndustryChain57Hub.tsx',
    'src/components/OverviewDashboard.tsx',
    'src/components/PatentSimilarSearchHub.tsx'
]

for file in files:
    with open(file, 'r') as f:
        content = f.read()
    
    if "import { CopyableText }" not in content:
        # replace the first 'import ' with 'import { CopyableText } from './CopyableText';\nimport '
        content = re.sub(r"import ", "import { CopyableText } from './CopyableText';\nimport ", content, count=1)
        
        with open(file, 'w') as f:
            f.write(content)
