import re
filepath = 'src/components/AiEnterpriseAgent.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# I will find "{/* TAB 1" up to "{/* TAB 2" and replace it
pattern = r'\{\/\* TAB 1: Target Enterprises Full Cards \*\/\}.*?\{\/\* TAB 2: Official Letter \*\/\}'
content = re.sub(pattern, '{/* TAB 2: Official Letter */}', content, flags=re.DOTALL)

with open(filepath, 'w') as f:
    f.write(content)
print("Removed TAB 1.")
