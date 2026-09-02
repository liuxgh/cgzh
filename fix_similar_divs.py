filepath = 'src/components/PatentSimilarSearchHub.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Let's fix the header replacement I did earlier.
# The original code had:
#       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
#         <div className="flex items-center gap-2">
#           ...
#         </div>
#         <div className="relative w-full sm:w-64">
#           ...
#         </div>
#       </div>

# My replacement:
#         <div className="flex flex-1 items-center gap-2">
#           ...
#         </div>
#         <div className="flex w-full sm:w-auto items-center gap-3">
#           <select ...>...</select>
#           <div className="relative flex-1 sm:w-64">

# I forgot to add a closing div for `<div className="flex w-full sm:w-auto items-center gap-3">`
# Let's replace:
#           <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
#         </div>
#       </div>
# with an extra closing div.

content = content.replace('          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />\n        </div>\n      </div>', '          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />\n        </div>\n        </div>\n      </div>')

with open(filepath, 'w') as f:
    f.write(content)
