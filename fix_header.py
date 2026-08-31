import sys

with open('src/components/Header.tsx', 'r') as f:
    content = f.read()

# Remove translucent style
content = content.replace(
    'sticky top-0 z-40 text-slate-800 bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/50',
    'sticky top-0 z-40 text-slate-800 bg-white shadow-sm border-b border-slate-200'
)

# Remove tag properties from navItems
content = content.replace(", tag: '语义大模型'", "")
content = content.replace(", tag: '图谱穿透'", "")
content = content.replace(", tag: '密集型备案'", "")
content = content.replace(", tag: 'Agent'", "")
content = content.replace(", tag: 'Know-how'", "")
content = content.replace(", tag: 'AI'", "")

# Remove rendering of the tag
old_tag_render = """                <span>{item.label}</span>
                {item.tag && (
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded-sm ml-0.5 ${
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : item.highlight
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.tag}
                  </span>
                )}"""
content = content.replace(old_tag_render, "                <span>{item.label}</span>")

# Navigation style optimization
# Change py-3.5 to px-4 py-3.5 to give buttons better padding
old_nav_class = """                className={`relative py-3.5 text-sm font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer border-b-2 ${"""
new_nav_class = """                className={`relative px-4 py-3.5 text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer border-b-2 ${"""
content = content.replace(old_nav_class, new_nav_class)

# Update space-x-4 to space-x-1 or space-x-2 for better gap with the new padding
content = content.replace('className="flex space-x-4 py-0"', 'className="flex space-x-2 py-0"')

with open('src/components/Header.tsx', 'w') as f:
    f.write(content)
print("Header updated.")
