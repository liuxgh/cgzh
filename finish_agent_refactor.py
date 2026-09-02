import re

filepath = 'src/components/AiEnterpriseAgent.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Remove the state
content = re.sub(r"const \[activeTab, setActiveTab\].*?\n", "", content)

# Find the Tabs Bar and remove it
tabs_pattern = r"\{/\* Tabs Bar \*/\}.*?\{/\* TAB 1: Intelligence Report \*/\}"
content = re.sub(tabs_pattern, "", content, flags=re.DOTALL)

# Now we need to remove the "activeTab === 'report' && (" wrap around TAB 1.
# Actually, the python script earlier failed to remove the `activeTab === 'report' && (` block.
# Let's just remove the wrappers.

# We will remove from {/* TAB 2: Official Letter */} to the end of the file except the closing tags.
tab2_idx = content.find("{/* TAB 2: Official Letter */}")
if tab2_idx != -1:
    # Keep the closing tags of the outer div
    tail = "\n        </div>\n      )}\n    </div>\n  );\n};\n"
    content = content[:tab2_idx] + tail

with open(filepath, 'w') as f:
    f.write(content)
