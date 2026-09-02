with open('src/components/OverviewDashboard.tsx', 'r') as f:
    content = f.read()

# We need to find:
#           ))}
#         </div>
#       </div>

old = """          ))}
        </div>
      </div>"""

new = """          ))}
        </div>
        )}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-6">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-sm font-medium text-slate-600">
              第 <span className="text-slate-900 font-bold">{currentPage}</span> 页，共 {totalPages} 页
            </div>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>"""

content = content.replace(old, new)
with open('src/components/OverviewDashboard.tsx', 'w') as f:
    f.write(content)
