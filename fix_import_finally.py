with open('src/components/PatentSimilarSearchHub.tsx', 'r') as f:
    content = f.read()

if "RegionFilter" not in content[:500]:
    content = content.replace("import { PatentItem, TargetEnterprise } from '../types';", "import { PatentItem, TargetEnterprise } from '../types';\nimport { RegionFilter } from './RegionFilter';")

with open('src/components/PatentSimilarSearchHub.tsx', 'w') as f:
    f.write(content)
