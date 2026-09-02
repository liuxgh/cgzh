with open('src/components/PatentSimilarSearchHub.tsx', 'r') as f:
    content = f.read()
if "import { RegionFilter }" not in content:
    content = content.replace("import { TargetEnterprise, PatentItem } from '../types';", "import { TargetEnterprise, PatentItem } from '../types';\nimport { RegionFilter } from './RegionFilter';")
content = content.replace("const [regionFilter, setRegionFilter] = useState<string>('all');", "const [regionFilter, setRegionFilter] = useState<{p: string, c: string, d: string}>({p: 'all', c: 'all', d: 'all'});")
with open('src/components/PatentSimilarSearchHub.tsx', 'w') as f:
    f.write(content)

with open('src/components/IndustryChain57Hub.tsx', 'r') as f:
    content = f.read()
if "import { RegionFilter }" not in content:
    content = content.replace("import { TargetEnterprise, PatentItem } from '../types';", "import { TargetEnterprise, PatentItem } from '../types';\nimport { RegionFilter } from './RegionFilter';")
content = content.replace("const [regionFilter, setRegionFilter] = useState<string>('all');", "const [regionFilter, setRegionFilter] = useState<{p: string, c: string, d: string}>({p: 'all', c: 'all', d: 'all'});")
with open('src/components/IndustryChain57Hub.tsx', 'w') as f:
    f.write(content)
