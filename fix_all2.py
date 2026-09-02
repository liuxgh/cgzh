import re
import glob

components = [
    'src/components/AiEnterpriseAgent.tsx',
    'src/components/OverviewDashboard.tsx',
    'src/components/PatentSimilarSearchHub.tsx',
    'src/components/AiActionPlanPage.tsx',
    'src/components/IndustryChain57Hub.tsx'
]

variables = [
    'ent.name', 'ent.creditCode', 'ent.legalRep', 'ent.registeredCapital', 'ent.establishedDate', 
    'ent.phone', 'ent.email', 'ent.address', 'ent.shortName', 'ent.status',
    'ent.contact.contactPerson', 'ent.contact.phone', 'ent.contact.email',
    'enterprise.name', 'enterprise.creditCode', 'enterprise.legalRep', 
    'enterprise.registeredCapital', 'enterprise.establishedDate', 'enterprise.phone', 
    'enterprise.email', 'enterprise.address', 'enterprise.shortName', 'enterprise.status',
    'inv.name'
]

for file in components:
    with open(file, 'r') as f:
        content = f.read()
        
    original = content
    
    for var in variables:
        # Regex to find >{var}< or > {var} < or >\n {var} \n< etc.
        # It's safer to just find exact `{var}` NOT inside another tag's props
        # An easy heuristic: find `{var}` preceded by `>` (maybe with spaces/newlines)
        # and followed by `<` (maybe with spaces/newlines).
        pattern = r">(\s*)\{" + re.escape(var) + r"\}(\s*)<"
        replacement = r">\1<CopyableText text={" + var + r"}>{" + var + r"}</CopyableText>\2<"
        
        # Also replace >{var}</span> -> ><CopyableText...>{var}</CopyableText></span>
        content = re.sub(pattern, replacement, content)
        
    if content != original:
        if "CopyableText" not in content:
            content = content.replace("import React", "import React\nimport { CopyableText } from './CopyableText';")
        with open(file, 'w') as f:
            f.write(content)

