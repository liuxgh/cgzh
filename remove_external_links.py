import re
import glob

for filepath in glob.glob('src/components/*.tsx'):
    with open(filepath, 'r') as f:
        content = f.read()
    
    # We want to remove <ExternalLink className="w-4 h-4 text-slate-400" />
    # Let's just remove any <ExternalLink... inside h4 or near enterprise.name
    # Actually, we can just replace `<ExternalLink className="w-4 h-4 text-slate-400" />`
    # and `<ExternalLink className="w-3 h-3 text-slate-400" />` safely if they appear after `{enterprise.name}`
    
    pattern1 = r'\{enterprise\.name\}\s*<ExternalLink className="w-[^"]+" />'
    content = re.sub(pattern1, '{enterprise.name}', content)
    
    pattern2 = r'\{ent\.name\}\s*<ExternalLink className="w-[^"]+" />'
    content = re.sub(pattern2, '{ent.name}', content)
    
    with open(filepath, 'w') as f:
        f.write(content)
print("Removed Share/ExternalLink icons.")
