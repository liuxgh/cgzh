with open('src/components/IndustryChain57Hub.tsx', 'r') as f:
    lines = f.readlines()

# delete lines 58-69 (index 57 to 68)
new_lines = lines[:57] + lines[69:]

with open('src/components/IndustryChain57Hub.tsx', 'w') as f:
    f.writelines(new_lines)
