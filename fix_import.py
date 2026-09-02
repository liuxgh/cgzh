import re

filepath = 'src/components/JluTechAdvantageShowcase.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Replace any missing HelpCircle in lucide-react imports
if 'HelpCircle' not in content[:1000]: # Check header
    import_pattern = r'import \{([^}]+)\} from \'lucide-react\';'
    match = re.search(import_pattern, content)
    if match:
        imports = match.group(1)
        if 'HelpCircle' not in imports:
            new_imports = imports + ', HelpCircle'
            content = content.replace(match.group(0), f"import {{{new_imports}}} from 'lucide-react';")

with open(filepath, 'w') as f:
    f.write(content)
print("Fixed imports in JluTechAdvantageShowcase.tsx")
