import re
with open('src/components/AiEnterpriseAgent.tsx', 'r') as f:
    content = f.read()

# Remove enterpriseTypeFilter dropdown
old_select = """                <select
                  value={enterpriseTypeFilter}
                  onChange={(e) => setEnterpriseTypeFilter(e.target.value)}
                  className="bg-white border border-[#D8E2F0] rounded-xl px-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:border-[#0F52BA] shadow-sm font-medium"
                >
                  <option value="all">企业资质 (不限)</option>
                  <option value="上市企业">上市企业</option>
                  <option value="国家级专精特新“小巨人”">专精特新“小巨人”</option>
                  <option value="高新技术企业">高新技术企业</option>
                  <option value="制造业单项冠军">制造业单项冠军</option>
                  <option value="行业龙头国企">行业龙头国企</option>
                </select>"""
content = content.replace(old_select, "")

# It's okay if we don't remove the state completely since it defaults to "all", but let's remove it to be clean.
# I will just leave the state, it doesn't hurt and avoiding re-writing the array of dependencies is safer.

with open('src/components/AiEnterpriseAgent.tsx', 'w') as f:
    f.write(content)
