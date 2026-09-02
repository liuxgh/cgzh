with open('src/components/IndustryChain57Hub.tsx', 'r') as f:
    content = f.read()

# Replace the broken part
old_broken = """  });    if (!ent.chainPosition) return false;"""
new_fixed = """  });

  // Target enterprises matched to this chain
  const chainEnterprises = TARGET_ENTERPRISES_DATA.filter(ent => {
    if (!ent.chainPosition) return false;"""

content = content.replace(old_broken, new_fixed)
with open('src/components/IndustryChain57Hub.tsx', 'w') as f:
    f.write(content)
