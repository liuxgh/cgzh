import re

with open('src/components/PatentSimilarSearchHub.tsx', 'r') as f:
    content = f.read()

# Let's see what we currently have:
#        ))}
#      </div>
#      {totalPages > 1

# We need to change it to:
#        ))}
#        )}
#      </div>
#      {totalPages > 1

content = content.replace("        ))}\n      </div>\n      {totalPages > 1", "        ))}\n        )}\n      </div>\n      {totalPages > 1")

with open('src/components/PatentSimilarSearchHub.tsx', 'w') as f:
    f.write(content)

