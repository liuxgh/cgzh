import sys
import re

with open('src/components/OverviewDashboard.tsx', 'r') as f:
    content = f.read()

# 1. Remove import
content = re.sub(r"import \{ JluTechAdvantageShowcase \} from '\./JluTechAdvantageShowcase';\n", "", content)

# 2. Remove the component block
block_regex = r"\{\/\* 2\. JLU Core Tech Advantage Radar / Visualization \*\/\}.*?\{\/\* 3\. Three Core Enterprise Discovery Paths \(三大靶向寻客路径直接入口\) \*\/\}"
content = re.sub(block_regex, "{/* 3. Three Core Enterprise Discovery Paths (三大靶向寻客路径直接入口) */}", content, flags=re.DOTALL)

with open('src/components/OverviewDashboard.tsx', 'w') as f:
    f.write(content)
print("OverviewDashboard updated.")
