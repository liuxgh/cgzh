import re
with open('src/components/IndustryChain57Hub.tsx', 'r') as f:
    content = f.read()

# I will use a regex to fix this.
# Find where the filteredChains logic ends (return true; \n  });)
# Then inject the chainEnterprises assignment right before the `if (!ent.chainPosition)`
content = re.sub(r"\}\s*return true;\s*\}\);\s*if \(\!ent\.chainPosition\)", """    return true;
  });

  // Target enterprises matched to this chain
  const chainEnterprises = TARGET_ENTERPRISES_DATA.filter(ent => {
    if (!ent.chainPosition)""", content)

with open('src/components/IndustryChain57Hub.tsx', 'w') as f:
    f.write(content)
