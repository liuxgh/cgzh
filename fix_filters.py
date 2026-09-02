import re

def process_file(filepath, has_select_block=False):
    with open(filepath, 'r') as f:
        content = f.read()

    # 1. Remove state declaration
    content = re.sub(r"  const \[enterpriseTypeFilter, setEnterpriseTypeFilter\] = useState<string>\('all'\);\n", "", content)

    # 2. Remove from dependency array
    content = content.replace(", enterpriseTypeFilter", "")

    # 3. Remove filter logic
    content = re.sub(r"    if \(enterpriseTypeFilter !== 'all' && ent\.enterpriseType !== enterpriseTypeFilter\) return false;\n", "", content)

    # 4. Remove setEnterpriseTypeFilter('all'); from reset buttons
    content = re.sub(r"\s*setEnterpriseTypeFilter\('all'\);\n", "\n", content)

    if has_select_block:
        select_block = """          <select
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
        content = content.replace(select_block, "")
        
        # In case the indentation is different
        select_block2 = """                <select
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
        content = content.replace(select_block2, "")

    with open(filepath, 'w') as f:
        f.write(content)

process_file('src/components/PatentSimilarSearchHub.tsx', True)
process_file('src/components/AiEnterpriseAgent.tsx', False)

