with open('src/components/IndustryChain57Hub.tsx', 'r') as f:
    content = f.read()

content = content.replace("      if (!matchName && !matchCollege && !matchCompany) return false;\n        return true;\n  });", "      if (!matchName && !matchCollege && !matchCompany) return false;\n    }\n    return true;\n  });")

with open('src/components/IndustryChain57Hub.tsx', 'w') as f:
    f.write(content)
