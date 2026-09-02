import re
files = [
    'src/components/AiEnterpriseAgent.tsx',
    'src/components/IndustryChain57Hub.tsx',
    'src/components/OverviewDashboard.tsx',
    'src/components/PatentSimilarSearchHub.tsx'
]

for file in files:
    with open(file, 'r') as f:
        content = f.read()
    
    # Replace all broken imports
    content = re.sub(r"\} , Download , Download \} from 'lucide-react';", ", Download } from 'lucide-react';", content)
    content = re.sub(r"\} , Download \} from 'lucide-react';", ", Download } from 'lucide-react';", content)
    
    with open(file, 'w') as f:
        f.write(content)
