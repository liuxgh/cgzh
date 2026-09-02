import re

def update_file(filepath, replacements):
    try:
        with open(filepath, 'r') as f:
            content = f.read()
        for old, new in replacements:
            if callable(old):
                content = old(content)
            else:
                content = re.sub(old, new, content)
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated {filepath}")
    except Exception as e:
        print(f"Failed to update {filepath}: {e}")

# 3. Overview Dashboard
overview_replacements = [
    (r'查看企业画像全景', r'查看企业画像'),
    # Remove 主要发明人 block from enterprise card
    (r'<div className="bg-slate-50 p-2\.5 rounded-lg mb-4">\s*<div className="flex items-center gap-1\.5 mb-1">\s*<User className="w-3\.5 h-3\.5 text-indigo-600" />\s*<span className="text-xs font-bold text-slate-700">主要发明人</span>\s*</div>\s*<div className="flex flex-wrap gap-1\.5">\s*\{ent\.keyInventors\?.slice\(0, 2\)\.map\(\(inv, idx\) => \(\s*<span key=\{idx\} className="text-\[10px\] bg-white border border-slate-200 px-1\.5 py-0\.5 rounded text-slate-600">\s*\{inv\.name\}\s*</span>\s*\)\)\}\s*\{ent\.keyInventors && ent\.keyInventors\.length > 2 && \(\s*<span className="text-\[10px\] text-slate-400 py-0\.5">\+...\s*</span>\s*\)\}\s*</div>\s*</div>', r'')
]
update_file('src/components/OverviewDashboard.tsx', overview_replacements)

# 4. Patent Similar Search Hub
similar_replacements = [
    (r'查看企业完整档案', r'查看企业画像'),
    (r'<div className="mt-3 bg-slate-50 p-2\.5 rounded-lg border border-slate-100">\s*<div className="flex items-center gap-1\.5 mb-1">\s*<User className="w-3\.5 h-3\.5 text-indigo-600" />\s*<span className="text-xs font-bold text-slate-700">主要发明人</span>\s*</div>\s*<div className="flex flex-wrap gap-1\.5">\s*\{ent\.keyInventors\?.slice\(0, 3\)\.map\(\(inv, idx\) => \(\s*<span key=\{idx\} className="text-\[10px\] bg-white border border-slate-200 px-1\.5 py-0\.5 rounded text-slate-600">\s*\{inv\.name\}\s*</span>\s*\)\)\}\s*\{ent\.keyInventors && ent\.keyInventors\.length > 3 && \(\s*<span className="text-\[10px\] text-slate-400 py-0\.5">\+\{ent\.keyInventors\.length - 3\}\s*</span>\s*\)\}\s*</div>\s*</div>', r'')
]
update_file('src/components/PatentSimilarSearchHub.tsx', similar_replacements)

# 5. Industry Chain Hub
chain_replacements = [
    (r'查看图谱定位', r'查看企业画像'),
    (r'<div className="mt-3 bg-slate-50 p-2\.5 rounded-lg border border-slate-100">\s*<div className="flex items-center gap-1\.5 mb-1">\s*<User className="w-3\.5 h-3\.5 text-indigo-600" />\s*<span className="text-xs font-bold text-slate-700">主要发明人</span>\s*</div>\s*<div className="flex flex-wrap gap-1\.5">\s*\{ent\.keyInventors\?.slice\(0, 3\)\.map\(\(inv, idx\) => \(\s*<span key=\{idx\} className="text-\[10px\] bg-white border border-slate-200 px-1\.5 py-0\.5 rounded text-slate-600">\s*\{inv\.name\}\s*</span>\s*\)\)\}\s*\{ent\.keyInventors && ent\.keyInventors\.length > 3 && \(\s*<span className="text-\[10px\] text-slate-400 py-0\.5">\+\{ent\.keyInventors\.length - 3\}\s*</span>\s*\)\}\s*</div>\s*</div>', r'')
]
update_file('src/components/IndustryChain57Hub.tsx', chain_replacements)

# 6. Patent Product Hub
product_replacements = [
    (r'查看企业详情', r'查看企业画像'),
    (r'\{/\* Key Inventors \*/\}[\s\S]*?\{/\* End Key Inventors \*/\}', r''),
    (r'<div className="bg-slate-50 p-3 rounded-lg border border-slate-100">\s*<div className="flex items-center gap-1\.5 mb-2">\s*<User className="w-3\.5 h-3\.5 text-indigo-600" />\s*<span className="text-xs font-bold text-slate-700">主要发明人</span>\s*</div>\s*<div className="flex flex-wrap gap-1\.5">\s*\{ent\.keyInventors\?.slice\(0, 3\)\.map\(\(inv, idx\) => \(\s*<span key=\{idx\} className="text-\[10px\] bg-white border border-slate-200 px-1\.5 py-0\.5 rounded text-slate-600">\s*\{inv\.name\}\s*</span>\s*\)\)\}\s*\{ent\.keyInventors && ent\.keyInventors\.length > 3 && \(\s*<span className="text-\[10px\] text-slate-400 py-0\.5">\+\{ent\.keyInventors\.length - 3\}\s*</span>\s*\)\}\s*</div>\s*</div>', r''),
    # Remove 核心发明专利保护
    (r'<div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 flex flex-col justify-between">[\s\S]*?</div>\s*</div>', r'</div>')
]
# We'll use a custom function for product to remove the exact blocks if regex misses.
def fix_product(content):
    content = content.replace("查看企业详情", "查看企业画像")
    
    # Remove 主要发明人
    inventor_block = re.search(r'<div className="bg-slate-50 p-3 rounded-lg border border-slate-100">\s*<div className="flex items-center gap-1\.5 mb-2">\s*<User className="w-3\.5 h-3\.5 text-indigo-600" />\s*<span className="text-xs font-bold text-slate-700">主要发明人</span>[\s\S]*?</div>\s*</div>', content)
    if inventor_block:
        content = content.replace(inventor_block.group(0), "")
        
    # Remove 核心发明专利保护 block
    patent_protect_block = re.search(r'<div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 flex flex-col justify-between">\s*<div>\s*<div className="flex items-center gap-2 mb-3">[\s\S]*?</div>\s*</div>\s*</div>', content)
    if patent_protect_block:
        content = content.replace(patent_protect_block.group(0), "")
    
    # Also another variation of inventor block might exist:
    inventor_block_2 = re.search(r'\{/\* Key Inventors \*/\}[\s\S]*?</div>\s*</div>', content)
    if inventor_block_2:
        content = content.replace(inventor_block_2.group(0), "")

    return content

update_file('src/components/PatentProductSearchHub.tsx', [(fix_product, "")])

# 7. AiEnterpriseAgent
def fix_agent(content):
    content = content.replace("查看全景画像", "查看企业画像")
    content = content.replace("自动输出靶向买家企业画像清单、痛点契合点及一对一合作对接公文。", "自动输出靶向企业画像清单。")
    content = content.replace("AI匹配推荐", "")
    
    # Remove industry tag below enterprise name
    industry_tag = re.search(r'<div className="mt-2 flex flex-wrap gap-2">\s*<span className="bg-slate-100 text-slate-600 px-2 py-0\.5 rounded text-xs">\{enterprise\.industry\}</span>\s*</div>', content)
    if industry_tag:
        content = content.replace(industry_tag.group(0), "")

    # Remove 主要发明人 block
    inventor_block = re.search(r'<div className="flex items-start gap-3 pt-3 border-t border-slate-100">\s*<div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center shrink-0 mt-0\.5">\s*<User className="w-3 h-3 text-slate-500" />\s*</div>\s*<div>\s*<div className="text-xs text-slate-500 mb-1">主要发明人</div>\s*<div className="flex flex-wrap gap-1\.5">\s*\{enterprise\.keyInventors\?.slice\(0, 3\)\.map\(\(inv, idx\) => \(\s*<span key=\{idx\} className="text-xs text-slate-700 bg-white border border-slate-200 px-1\.5 py-0\.5 rounded">\s*\{inv\.name\}\s*</span>\s*\)\)\}\s*</div>\s*</div>\s*</div>', content)
    if inventor_block:
        content = content.replace(inventor_block.group(0), "")

    return content

update_file('src/components/AiEnterpriseAgent.tsx', [(fix_agent, "")])

