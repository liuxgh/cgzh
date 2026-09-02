import re

with open('src/components/PatentSimilarSearchHub.tsx', 'r') as f:
    content = f.read()

# Update placeholder
content = content.replace('placeholder="搜索企业名或专利关键词..."', 'placeholder="搜索企业名称..."')

# Update filtering logic
old_filter = """    if (searchKeyword.trim()) {
      const q = searchKeyword.toLowerCase();
      const matchName = ent.name.toLowerCase().includes(q) || ent.shortName.toLowerCase().includes(q);
      const matchPatent = ent.similarPatents?.some(p => p.title.toLowerCase().includes(q) || p.patentNo.toLowerCase().includes(q));
      if (!matchName && !matchPatent) return false;
    }"""
new_filter = """    if (searchKeyword.trim()) {
      const q = searchKeyword.toLowerCase();
      const matchName = ent.name.toLowerCase().includes(q) || ent.shortName.toLowerCase().includes(q);
      if (!matchName) return false;
    }"""
content = content.replace(old_filter, new_filter)

with open('src/components/PatentSimilarSearchHub.tsx', 'w') as f:
    f.write(content)
