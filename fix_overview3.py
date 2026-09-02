with open('src/components/OverviewDashboard.tsx', 'r') as f:
    lines = f.readlines()

out = []
in_data_pillars = False
data_pillars_lines = []
for line in lines:
    if "{/* 2. Four Core Data Pillars (佰腾底层数据资产) */}" in line:
        in_data_pillars = True
    
    if in_data_pillars:
        data_pillars_lines.append(line)
        if line.strip() == "</div>" and len(data_pillars_lines) > 40: # it's exactly 42 lines
            in_data_pillars = False
            # add showcase after the hero banner (where data pillars used to be)
            out.append("      <div className=\"mt-2\">\n        <JluTechAdvantageShowcase onNavigateToFullMap={() => setActiveTab('tech-map')} />\n      </div>\n")
    else:
        # Check for the patent product text
        if "通过专利密集型产品 ➔ 产品技术找企业" in line:
            line = line.replace("通过专利密集型产品 ➔ 产品技术找企业", "通过国家专利密集型产品 ➔ 产品技术找企业")
        out.append(line)

# Now we need to append the data pillars at the very end.
# We'll find the last </div>
for i in range(len(out)-1, -1, -1):
    if "</div>" in out[i]:
        # we will insert before the second to last </div> (the wrapper of the dashboard)
        break

# Actually, the last two lines are typically:
#     </div>
#   );
# };
# So inserting before the last </div> is good.

last_div_idx = -1
for i in range(len(out)-1, -1, -1):
    if out[i].strip() == "</div>":
        last_div_idx = i
        break

if last_div_idx != -1 and data_pillars_lines:
    weakened_lines = []
    for line in data_pillars_lines:
        line = line.replace('bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col gap-3 hover:border-', 'bg-slate-50/60 p-4 rounded-xl border border-slate-100 flex flex-col gap-2 hover:bg-white hover:shadow-sm transition-all text-slate-500 ')
        line = line.replace('text-2xl font-black text-slate-900', 'text-xl font-bold text-slate-700')
        line = line.replace('text-2xl font-black text-slate-900 font-mono tracking-tight', 'text-xl font-bold font-mono tracking-tight text-slate-700')
        line = line.replace('{/* 2. Four Core Data Pillars (佰腾底层数据资产) */}', '{/* 底层数据资源支持 */}')
        weakened_lines.append(line)
        
    footer_header = '      <div className="mt-12 pt-8 border-t border-slate-200">\n        <div className="text-center text-xs font-bold text-slate-400 mb-6 tracking-widest">—— 底层数据资源支持 ——</div>\n'
    footer = footer_header + "".join(weakened_lines) + '      </div>\n'
    
    out.insert(last_div_idx, footer)

with open('src/components/OverviewDashboard.tsx', 'w') as f:
    f.writelines(out)
print("Updated OverviewDashboard.tsx")
