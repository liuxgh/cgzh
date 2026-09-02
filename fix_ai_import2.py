import re
with open('src/components/AiEnterpriseAgent.tsx', 'r') as f:
    content = f.read()

content = re.sub(r"import \{ PatentItem, TargetEnterprise \} from '../types';", "import { PatentItem, TargetEnterprise } from '../types';\nimport { RegionFilter } from './RegionFilter';", content)

with open('src/components/AiEnterpriseAgent.tsx', 'w') as f:
    f.write(content)
