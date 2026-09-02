with open('src/components/AiEnterpriseAgent.tsx', 'r') as f:
    content = f.read()
if "import { RegionFilter }" not in content:
    content = content.replace("import { TargetEnterprise } from '../types';", "import { TargetEnterprise } from '../types';\nimport { RegionFilter } from './RegionFilter';")
with open('src/components/AiEnterpriseAgent.tsx', 'w') as f:
    f.write(content)
