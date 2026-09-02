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
    
    if "import { Download" not in content and "Download," not in content:
        # Just find lucide-react import
        content = re.sub(r"from 'lucide-react';", ", Download } from 'lucide-react';", content)
        # That might break if there's no trailing space. Better:
        content = re.sub(r"\}\s*from\s*'lucide-react';", ", Download } from 'lucide-react';", content)
    
    with open(file, 'w') as f:
        f.write(content)
