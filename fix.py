with open('src/components/OverviewDashboard.tsx', 'r') as f:
    content = f.read()

# I deleted a div on line 107. Let me append it at the very end just before `);`
content = content.replace("    </div>\n  );\n};", "    </div>\n    </div>\n  );\n};")

with open('src/components/OverviewDashboard.tsx', 'w') as f:
    f.write(content)
