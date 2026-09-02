content = """import React, { useState, useEffect } from 'react';
import { Search, Building2, ChevronLeft, User, FileText, ChevronDown, ChevronUp, Image, CheckCircle, Loader2, Sparkles, BrainCircuit, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  query: string;
  onBack: () => void;
  universityScope?: string | null;
}

interface SearchResult {
  id: string;
  type: 'patent' | 'knowhow';
  title: string;
  no: string;
  university: string;
  inventor: {
    name: string;
    title: string;
  };
  description: string;
  details: string;
}

const MOCK_RESULTS: SearchResult[] = [
  {
    id: 'res-1',
    type: 'patent',
    title: '一种基于深度学习的多模态特征融合方法及系统',
    no: 'CN202310458921.X',
    university: '吉林大学人工智能学院',
    inventor: { name: '王教授', title: '博导/人工智能专家' },
    description: '该发明提出了一种新颖的多模态特征融合架构，有效解决了异构数据在联合表示学习中的语义对齐问题。在自然语言处理与计算机视觉的跨模态检索任务中，准确率提升了15%以上。',
    details: '技术成熟度：TRL 5（实验室验证阶段）。已在多模态医疗影像辅助诊断、智能工业缺陷检测等场景进行初步验证。其核心优势在于计算复杂度低，支持边缘设备部署。'
  },
  {
    id: 'res-2',
    type: 'knowhow',
    title: '高效能自然语言理解引擎与领域知识图谱构建技术',
    no: 'JLU-TECH-2023-088',
    university: '吉林大学计算机科学与技术学院',
    inventor: { name: '李研究员', title: '知识工程联合实验室主任' },
    description: '本技术成果包含一套完整的垂直领域知识图谱自动化构建工具链，以及轻量级的NLU推理引擎。可快速针对特定行业（如医疗、法律、金融）进行知识抽取与推理。',
    details: '技术成熟度：TRL 7（系统原型在真实环境中演示）。已与某大型律所合作建立法律行业知识问答系统，响应时间小于200ms。该技术可作为SaaS服务或私有化部署。'
  }
];

export const TechSearchHub: React.FC<Props> = ({ query, onBack, universityScope }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [currentQuery, setCurrentQuery] = useState(query);
  const [isMatching, setIsMatching] = useState(false);
  const [hasMatched, setHasMatched] = useState(!!query);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [showMatchSuccess, setShowMatchSuccess] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>(query ? MOCK_RESULTS : []);
  
  const isGlobalSearch = !universityScope;

  const handleFileUpload = (type: 'doc' | 'img') => {
    const fileName = type === 'doc' ? '技术需求文档_v1.pdf' : '应用场景示意图.png';
    if (!uploadedFiles.includes(fileName)) {
      setUploadedFiles([...uploadedFiles, fileName]);
    }
  };

  const handleMatch = () => {
    if (!currentQuery.trim() && uploadedFiles.length === 0) return;
    
    setIsMatching(true);
    setShowMatchSuccess(false);
    
    // Simulate AI thinking delay
    setTimeout(() => {
      setIsMatching(false);
      setShowMatchSuccess(true);
      setSearchResults(MOCK_RESULTS);
      setHasMatched(true);
      setTimeout(() => setShowMatchSuccess(false), 3000);
    }, 2500);
  };

  const toggleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <button onClick={onBack} className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1 cursor-pointer mb-6">
          <ChevronLeft className="w-4 h-4" /> 返回
        </button>

        <AnimatePresence mode="wait">
          {!hasMatched ? (
            <motion.div 
              key="initial-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center pt-10 sm:pt-20"
            >
              <div className="mb-8 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-900/20 mb-4">
                  <BrainCircuit className="w-8 h-8" />
                </div>
                <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">AI 智能匹配分析</h1>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                  通过多模态 AI 大模型，支持文本、文档、图像等多维度意图识别，为您精准匹配关联技术资产与研发团队。
                </p>
              </div>

              <div className="w-full max-w-3xl bg-white rounded-3xl p-2 shadow-2xl shadow-slate-200/50 border border-slate-100 relative group overflow-hidden">
                {/* Glowing border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl pointer-events-none" />
                
                <div className="relative bg-white rounded-[22px] p-6 sm:p-8">
                  <textarea 
                    rows={5}
                    value={currentQuery}
                    onChange={(e) => setCurrentQuery(e.target.value)}
                    placeholder="描述您的技术需求、应用场景或业务痛点，支持多行长文本..."
                    className="w-full bg-transparent border-none resize-none focus:outline-hidden text-lg text-slate-800 placeholder:text-slate-400 leading-relaxed"
                  />
                  
                  {uploadedFiles.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4 mb-2">
                      {uploadedFiles.map((file, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg border border-blue-100">
                          {file.includes('pdf') ? <FileText className="w-4 h-4" /> : <Image className="w-4 h-4" />}
                          {file}
                          <button onClick={() => setUploadedFiles(uploadedFiles.filter(f => f !== file))} className="ml-1 hover:text-blue-900">&times;</button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <button onClick={() => handleFileUpload('doc')} className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all font-medium text-sm">
                        <FileText className="w-4 h-4" /> 上传文档
                      </button>
                      <button onClick={() => handleFileUpload('img')} className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all font-medium text-sm">
                        <Image className="w-4 h-4" /> 上传图片
                      </button>
                    </div>

                    <button 
                      onClick={handleMatch}
                      disabled={isMatching || (!currentQuery.trim() && uploadedFiles.length === 0)}
                      className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 disabled:bg-slate-300 disabled:text-slate-500 text-white font-bold rounded-xl shadow-lg shadow-slate-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group/btn relative overflow-hidden"
                    >
                      {isMatching ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          深度分析中...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
                          开始智能匹配
                        </>
                      )}
                      
                      {/* Scanning effect during matching */}
                      {isMatching && (
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          initial={{ x: '-100%' }}
                          animate={{ x: '100%' }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Optional: Add some techy floating background elements here if desired */}
            </motion.div>
          ) : (
            <motion.div 
              key="matched-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Collapsed Search Header */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-bold text-slate-500">当前匹配需求</span>
                  </div>
                  <div className="relative">
                    <input 
                      value={currentQuery}
                      onChange={(e) => setCurrentQuery(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-3 shrink-0 md:mt-6">
                  {uploadedFiles.length > 0 && (
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-100 px-3 py-2 rounded-lg">
                      <FileText className="w-3.5 h-3.5" /> 已附加 {uploadedFiles.length} 个文件
                    </div>
                  )}
                  <button 
                    onClick={handleMatch}
                    disabled={isMatching}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-2 text-sm"
                  >
                    {isMatching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                    {isMatching ? '分析中' : '重新匹配'}
                  </button>
                </div>
              </div>

              {/* Match Results */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
                {isMatching && (
                  <div className="absolute inset-0 z-10 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center">
                     <div className="relative w-20 h-20 mb-4">
                        <motion.div 
                          className="absolute inset-0 rounded-full border-4 border-blue-100"
                        />
                        <motion.div 
                          className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent"
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center text-blue-600">
                          <BrainCircuit className="w-8 h-8" />
                        </div>
                     </div>
                     <h3 className="text-xl font-bold text-slate-800">AI 正在深度解析...</h3>
                     <p className="text-slate-500 mt-2">从海量科研库中为您筛选最佳匹配</p>
                  </div>
                )}
              
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                    <Search className="w-6 h-6 text-[#0F52BA]" /> 
                    {isGlobalSearch ? '全网' : '本校'}匹配结果
                  </h2>
                  <span className="px-4 py-1.5 bg-blue-50 text-blue-700 text-sm font-bold rounded-xl border border-blue-100 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    匹配到 {searchResults.length} 项高度关联技术
                  </span>
                </div>
                
                <div className="space-y-6">
                  {searchResults.length === 0 ? (
                    <div className="py-12 text-center text-slate-500">暂无匹配的技术成果，请尝试调整需求描述</div>
                  ) : searchResults.map((res, index) => (
                    <motion.div 
                      key={res.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className={`border ${res.type === 'patent' ? 'border-blue-100 bg-blue-50/10' : 'border-emerald-100 bg-emerald-50/10'} rounded-2xl p-6 relative overflow-hidden transition-all hover:shadow-md group`}
                    >
                      {/* Accent bar */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${res.type === 'patent' ? 'bg-blue-500' : 'bg-emerald-500'}`} />
                      
                      {res.type === 'knowhow' && (
                        <div className="absolute top-4 right-[-30px] rotate-45 bg-emerald-500 text-white text-[10px] font-bold py-1 w-32 text-center shadow-sm">
                          非专利技术/成果
                        </div>
                      )}
                      
                      <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                              {res.no}
                            </span>
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${res.type === 'patent' ? 'text-blue-700 bg-blue-50 border border-blue-100' : 'text-emerald-700 bg-emerald-50 border border-emerald-100'}`}>
                              匹配度: {90 - index * 5}%
                            </span>
                          </div>
                          
                          <h3 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">{res.title}</h3>
                          
                          <div className="text-sm text-slate-500 mt-3 flex flex-wrap items-center gap-4">
                            <span className="flex items-center gap-1.5 font-medium"><Building2 className="w-4 h-4 text-slate-400" /> {res.university}</span>
                          </div>
                        </div>
                        
                        <button className={`shrink-0 px-6 py-2.5 text-white font-bold rounded-xl text-sm shadow-sm transition-all hover:shadow-md flex items-center gap-2 ${res.type === 'patent' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}>
                          {res.type === 'patent' ? '联系对接人' : '发起合作意向'} <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <p className="text-slate-600 text-sm leading-relaxed mb-5 bg-white/50 p-4 rounded-xl border border-slate-100/50">
                        {res.description}
                      </p>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-200/60">
                        <div className="flex items-center gap-2">
                          <div className="font-bold text-slate-700 text-sm flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg">
                            <User className="w-4 h-4 text-slate-400" /> {res.inventor.name} <span className="text-slate-400 font-normal">|</span> <span className="text-slate-500 font-normal">{res.inventor.title}</span>
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => toggleExpand(res.id)}
                          className="text-sm font-bold text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors bg-white px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-200"
                        >
                          {expandedId === res.id ? (
                            <>收起详情 <ChevronUp className="w-4 h-4" /></>
                          ) : (
                            <>查看技术详情 <ChevronDown className="w-4 h-4" /></>
                          )}
                        </button>
                      </div>
                      
                      <AnimatePresence>
                        {expandedId === res.id && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 p-5 bg-white rounded-xl border border-slate-100 text-sm text-slate-600 leading-relaxed shadow-xs">
                              <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                                <FileText className="w-4 h-4 text-blue-500" /> 技术摘要与应用前景
                              </h4>
                              <p>{res.details}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
"""

with open('src/components/TechSearchHub.tsx', 'w') as f:
    f.write(content)
