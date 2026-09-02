import re

with open('src/components/PatentSimilarSearchHub.tsx', 'r') as f:
    content = f.read()

content = re.sub(r"\}\)\}\s*</div>\s*\)\}\s*\{totalPages > 1", "})}\n      </div>\n      {totalPages > 1", content)
content = re.sub(r"\}\)\s*</div>\s*\)\}\s*\{totalPages > 1", "})\n      </div>\n      {totalPages > 1", content)
content = re.sub(r"</div>\s*\)\}\s*\{totalPages > 1", "</div>\n      {totalPages > 1", content)

with open('src/components/PatentSimilarSearchHub.tsx', 'w') as f:
    f.write(content)
