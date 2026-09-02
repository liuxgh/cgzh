import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

if "useEffect" not in content:
    content = content.replace("import React, { useState } from 'react';", "import React, { useState, useEffect } from 'react';")

# Find a good place to insert the useEffect block. Let's insert it after globalToastMessage state.
hook = """  const [globalToastMessage, setGlobalToastMessage] = useState<string | null>(null);

  // Scroll to top on navigation change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab, selectedEnterpriseForDetailModal, selectedEnterpriseForActionPlan]);"""

content = content.replace("  const [globalToastMessage, setGlobalToastMessage] = useState<string | null>(null);", hook)

with open('src/App.tsx', 'w') as f:
    f.write(content)
