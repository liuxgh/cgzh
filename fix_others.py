with open('src/components/AiEnterpriseAgent.tsx', 'r') as f:
    content = f.read()
# Find the end of the mapped grid:
content = content.replace("              </div>\n              \n              {totalPages", "              </div>\n              )}\n              \n              {totalPages")
with open('src/components/AiEnterpriseAgent.tsx', 'w') as f:
    f.write(content)

with open('src/components/IndustryChain57Hub.tsx', 'r') as f:
    content = f.read()
content = content.replace("            </div>\n            \n            {totalPages", "            </div>\n            )}\n            \n            {totalPages")
with open('src/components/IndustryChain57Hub.tsx', 'w') as f:
    f.write(content)

with open('src/components/PatentSimilarSearchHub.tsx', 'r') as f:
    content = f.read()
content = content.replace("      </div>\n\n\n      {totalPages > 1 && (", "      </div>\n      )}\n\n      {totalPages > 1 && (")
with open('src/components/PatentSimilarSearchHub.tsx', 'w') as f:
    f.write(content)

