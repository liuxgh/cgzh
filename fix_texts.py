import re

# 1. PatentProductSearchHub.tsx
filepath = 'src/components/PatentProductSearchHub.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Replace "核心发明专利保护：<strong className="text-slate-700 font-mono">{prod.corePatentsTotal} 项</strong>" 
# or the entire block around it if needed. Let's see the context of line 183.
