with open('src/components/PatentSimilarSearchHub.tsx', 'r') as f:
    content = f.read()

content = content.replace("        ))}\n        )}\n      </div>", "        ))\n        )}\n      </div>")

with open('src/components/PatentSimilarSearchHub.tsx', 'w') as f:
    f.write(content)
