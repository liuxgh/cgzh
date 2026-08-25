const fs = require('fs');
let code = fs.readFileSync('src/components/EnterprisePortal.tsx', 'utf-8');

// 1. Add imports
code = code.replace(/import { (.*?) } from 'lucide-react';/, "import { $1, Paperclip, ImagePlus } from 'lucide-react';");

// 2. Replace the form
const formRegex = /<form onSubmit=\{handleSearch\} className="relative max-w-2xl mx-auto mt-8">[\s\S]*?<\/form>/;
const newForm = `<form onSubmit={handleSearch} className="relative max-w-3xl mx-auto mt-8">
              <div className="shadow-lg rounded-2xl bg-white border-2 border-blue-100 focus-within:border-blue-500 transition-colors overflow-hidden">
                <textarea
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="请输入企业技术需求（例如：寻找一种提高电池能量密度的固态电解质技术...），支持多段落输入"
                  className="w-full bg-transparent border-none focus:ring-0 text-base sm:text-lg text-slate-900 px-4 py-4 placeholder:text-slate-400 resize-none h-32 outline-none"
                />
                
                <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-t border-blue-50">
                  <div className="flex items-center gap-2">
                    <label className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1.5 text-sm font-medium cursor-pointer">
                      <Paperclip className="w-4 h-4" />
                      <span>导入文档</span>
                      <input type="file" multiple className="hidden" />
                    </label>
                    <label className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1.5 text-sm font-medium cursor-pointer">
                      <ImagePlus className="w-4 h-4" />
                      <span>导入产品图</span>
                      <input type="file" multiple accept="image/*" className="hidden" />
                    </label>
                  </div>
                  <button
                    type="submit"
                    disabled={isSearching || !searchQuery.trim()}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold rounded-xl transition-colors flex items-center gap-2 shadow-sm"
                  >
                    {isSearching ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>匹配中...</span>
                      </>
                    ) : (
                      <>
                        <span>智能匹配</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>`;

code = code.replace(formRegex, newForm);

// 3. Remove "AI 合作建议与对接通道" Right panel
const rightPanelRegex = /\{\/\* Right: Recommendation & CTA \*\/\}\s*<div className="space-y-4">\s*<h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">\s*<Bot className="w-5 h-5 text-indigo-600" \/>\s*<span>AI 合作建议与对接通道<\/span>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
code = code.replace(rightPanelRegex, '');

// 4. Change grid layout and remove lg:col-span-2
code = code.replace(/<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">/, '<div className="grid grid-cols-1 gap-6">');
code = code.replace(/<div className="lg:col-span-2 space-y-4">/, '<div className="space-y-4">');

fs.writeFileSync('src/components/EnterprisePortal.tsx', code, 'utf-8');
