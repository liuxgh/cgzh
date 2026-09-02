import re

with open('src/components/TechSearchHub.tsx', 'r') as f:
    content = f.read()

# Add motion import
if "import { motion" not in content:
    content = content.replace("import React, { useState, useEffect, useRef } from 'react';", "import React, { useState, useEffect, useRef } from 'react';\nimport { motion, AnimatePresence } from 'motion/react';")

# Add hasMatched state
if "const [hasMatched, setHasMatched]" not in content:
    content = content.replace("const [isMatching, setIsMatching] = useState(false);", "const [isMatching, setIsMatching] = useState(false);\n  const [hasMatched, setHasMatched] = useState(!!initialQuery);")

# Update handleMatch
old_handleMatch = """  const handleMatch = () => {
    if (!currentQuery.trim() && uploadedFiles.length === 0) return;
    
    setIsMatching(true);
    setShowMatchSuccess(false);
    
    setTimeout(() => {
      setIsMatching(false);
      setShowMatchSuccess(true);
      setSearchResults(MOCK_RESULTS);
      setTimeout(() => setShowMatchSuccess(false), 3000);
    }, 1500);
  };"""

new_handleMatch = """  const handleMatch = () => {
    if (!currentQuery.trim() && uploadedFiles.length === 0) return;
    
    setIsMatching(true);
    setShowMatchSuccess(false);
    
    setTimeout(() => {
      setIsMatching(false);
      setShowMatchSuccess(true);
      setSearchResults(MOCK_RESULTS);
      setHasMatched(true);
      setTimeout(() => setShowMatchSuccess(false), 3000);
    }, 2500); // slightly longer for cool animation
  };"""

content = content.replace(old_handleMatch, new_handleMatch)

with open('src/components/TechSearchHub.tsx', 'w') as f:
    f.write(content)
