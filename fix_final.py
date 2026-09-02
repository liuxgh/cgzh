import re

with open('src/components/PatentSimilarSearchHub.tsx', 'r') as f:
    content = f.read()

# Replace all )} that are alone on a line right after another )} block.
# Actually I'll just use re.sub for any `</div>\s*\)\}\s*\}\)` or something.
# Let's just do it precisely by searching.
content = re.sub(r"\}\)\}\s*</div>\s*\)\}\s*\{totalPages", "})}\n        )}\n      </div>\n      {totalPages", content)

# To be safe, just remove ANY trailing stray )} before {totalPages.
content = re.sub(r"\}\)\}\s*</div>\s*\)\}\s*\{totalPages", "})}\n        )}\n      </div>\n      {totalPages", content)

# I can also just manually fix the exact text block:
block = """        ))}
      </div>
      )}
      {totalPages > 1"""
new_block = """        ))}
        )}
      </div>
      {totalPages > 1"""
content = content.replace(block, new_block)

# And another one that might be there:
block2 = """        ))}
        )}
      </div>
      )}
      {totalPages > 1"""
new_block2 = """        ))}
        )}
      </div>
      {totalPages > 1"""
content = content.replace(block2, new_block2)

with open('src/components/PatentSimilarSearchHub.tsx', 'w') as f:
    f.write(content)

