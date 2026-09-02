files = [
    'src/components/AiEnterpriseAgent.tsx',
    'src/components/PatentSimilarSearchHub.tsx',
    'src/components/IndustryChain57Hub.tsx',
    'src/components/OverviewDashboard.tsx'
]

for file in files:
    with open(file, 'r') as f:
        content = f.read()
    
    # Replace instances of })\n)} with just })\n
    content = content.replace("              )}\n              )}\n            </div>", "              )}\n            </div>")
    content = content.replace("            )}\n            )}\n          </div>", "            )}\n          </div>")
    content = content.replace("        )}\n        )}\n", "        )}\n")

    with open(file, 'w') as f:
        f.write(content)
