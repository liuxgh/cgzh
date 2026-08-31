import sys

with open('src/components/TechSearchHub.tsx', 'r') as f:
    content = f.read()

import_replacement = "import { Search, Building2, ChevronLeft, ArrowRight, User, Star, Beaker, FileText, ChevronDown, ChevronUp, Image, CheckCircle, Loader2 } from 'lucide-react';"
content = content.replace("import { Search, Building2, ChevronLeft, ArrowRight, User, Star, Beaker, FileText, ChevronDown, ChevronUp, Image } from 'lucide-react';", import_replacement)

# Add states
state_addition = """const [expandedId, setExpandedId] = useState<string | null>(null);
  const [currentQuery, setCurrentQuery] = useState(query);
  const [isMatching, setIsMatching] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [showMatchSuccess, setShowMatchSuccess] = useState(false);

  const handleFileUpload = (type: 'doc' | 'img') => {
    const fileName = type === 'doc' ? '技术需求文档_v1.pdf' : '应用场景示意图.png';
    if (!uploadedFiles.includes(fileName)) {
      setUploadedFiles([...uploadedFiles, fileName]);
    }
  };

  const handleMatch = () => {
    setIsMatching(true);
    setShowMatchSuccess(false);
    setTimeout(() => {
      setIsMatching(false);
      setShowMatchSuccess(true);
      setTimeout(() => setShowMatchSuccess(false), 3000);
    }, 1500);
  };
"""
content = content.replace(
    "const [expandedId, setExpandedId] = useState<string | null>(null);\n  const [currentQuery, setCurrentQuery] = useState(query);",
    state_addition
)

search_area_old = """      {/* Search Input Area */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Search className="w-5 h-5 text-[#0F52BA]" />
          <h3 className="font-bold text-slate-800 text-lg">AI 智能匹配分析</h3>
        </div>
        <div className="relative">
          <textarea 
            rows={4}
            value={currentQuery}
            onChange={(e) => setCurrentQuery(e.target.value)}
            placeholder="输入您的技术需求、应用场景或业务痛点，支持多行文本..."
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 pb-14 resize-none focus:outline-hidden focus:border-[#0F52BA] focus:ring-2 focus:ring-blue-100 transition-all text-sm leading-relaxed"
          />
          <div className="absolute right-3 bottom-3 flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-[#0F52BA] bg-white rounded-lg border border-slate-200 shadow-xs hover:border-[#0F52BA] transition-colors" title="上传需求文档">
              <FileText className="w-4 h-4" />
            </button>
            <button className="p-2 text-slate-400 hover:text-[#0F52BA] bg-white rounded-lg border border-slate-200 shadow-xs hover:border-[#0F52BA] transition-colors" title="上传产品/场景图片">
              <Image className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
            重新深度匹配
          </button>
        </div>
      </div>"""

search_area_new = """      {/* Search Input Area */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-[#0F52BA]" />
            <h3 className="font-bold text-slate-800 text-lg">AI 智能匹配分析</h3>
          </div>
          <p className="text-sm text-slate-500">通过多模态 AI 大模型，支持文本、文档、图像等多维度意图识别，为您精准匹配关联技术资产。</p>
        </div>
        
        <div className="relative">
          <textarea 
            rows={4}
            value={currentQuery}
            onChange={(e) => setCurrentQuery(e.target.value)}
            placeholder="输入您的技术需求、应用场景或业务痛点，支持多行文本..."
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 pb-14 resize-none focus:outline-hidden focus:border-[#0F52BA] focus:ring-2 focus:ring-blue-100 transition-all text-sm leading-relaxed"
          />
          
          {uploadedFiles.length > 0 && (
            <div className="absolute left-4 bottom-14 flex flex-wrap gap-2 mb-2">
              {uploadedFiles.map((file, idx) => (
                <div key={idx} className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 text-xs rounded-md border border-blue-200">
                  {file.includes('pdf') ? <FileText className="w-3 h-3" /> : <Image className="w-3 h-3" />}
                  {file}
                  <button onClick={() => setUploadedFiles(uploadedFiles.filter(f => f !== file))} className="ml-1 hover:text-blue-900">&times;</button>
                </div>
              ))}
            </div>
          )}

          <div className="absolute right-3 bottom-3 flex items-center gap-2">
            <button onClick={() => handleFileUpload('doc')} className="p-2 text-slate-400 hover:text-[#0F52BA] bg-white rounded-lg border border-slate-200 shadow-xs hover:border-[#0F52BA] transition-colors" title="上传需求文档">
              <FileText className="w-4 h-4" />
            </button>
            <button onClick={() => handleFileUpload('img')} className="p-2 text-slate-400 hover:text-[#0F52BA] bg-white rounded-lg border border-slate-200 shadow-xs hover:border-[#0F52BA] transition-colors" title="上传产品/场景图片">
              <Image className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div>
            {showMatchSuccess && (
              <span className="flex items-center gap-1.5 text-sm text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 animate-in fade-in slide-in-from-left-2">
                <CheckCircle className="w-4 h-4" /> 匹配完成，已更新结果库
              </span>
            )}
          </div>
          <button 
            onClick={handleMatch}
            disabled={isMatching}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 disabled:opacity-70 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
          >
            {isMatching ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {isMatching ? 'AI 深度分析中...' : '重新深度匹配'}
          </button>
        </div>
      </div>"""

content = content.replace(search_area_old, search_area_new)

with open('src/components/TechSearchHub.tsx', 'w') as f:
    f.write(content)
