import React, { useState, useRef, useEffect } from 'react';
import { Search, Building2, ChevronLeft, User, FileText, ChevronDown, ChevronUp, Image, CheckCircle, Loader2, Sparkles, BrainCircuit, ArrowRight, Edit3, X, Sparkle } from 'lucide-react';
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
  const [isInputExpanded, setIsInputExpanded] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [showMatchSuccess, setShowMatchSuccess] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>(query ? MOCK_RESULTS : []);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isInputExpanded && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isInputExpanded]);

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
      setIsInputExpanded(false);
      setTimeout(() => setShowMatchSuccess(false), 3000);
    }, 2200);
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
        <button 
          id="btn-back-tech-hub"
          onClick={onBack} 
          className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1 cursor-pointer mb-6"
        >
          <ChevronLeft className="w-4 h-4" /> 返回
        </button>

        <AnimatePresence mode="wait">
          {!hasMatched ? (
            /* Initial State: Hero Minimalist Workspace */
            <motion.div 
              key="initial-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, filter: 'blur(4px)' }}
              transition={{ duration: 0.45 }}
              className="flex flex-col items-center justify-center pt-10 sm:pt-20"
            >
              <div className="mb-8 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-900/20 mb-4">
                  <BrainCircuit className="w-8 h-8" />
                </div>
                <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">AI 智能匹配技术</h1>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                  通过多模态 AI 大模型，支持文本、文档、图像等多维度意图识别，为您精准匹配高校科技成果。
                </p>
              </div>

              <div className="w-full max-w-3xl bg-white rounded-3xl p-2 shadow-2xl shadow-slate-200/60 border border-slate-100 relative group overflow-hidden">
                {/* Glowing border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl pointer-events-none" />
                
                <div className="relative bg-white rounded-[22px] p-6 sm:p-8">
                  <textarea 
                    id="input-tech-query-initial"
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
                          <button 
                            onClick={() => setUploadedFiles(uploadedFiles.filter(f => f !== file))} 
                            className="ml-1 hover:text-blue-900"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <button 
                        id="btn-upload-doc-initial"
                        onClick={() => handleFileUpload('doc')} 
                        className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all font-medium text-sm cursor-pointer"
                      >
                        <FileText className="w-4 h-4" /> 上传文档
                      </button>
                      <button 
                        id="btn-upload-img-initial"
                        onClick={() => handleFileUpload('img')} 
                        className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all font-medium text-sm cursor-pointer"
                      >
                        <Image className="w-4 h-4" /> 上传图片
                      </button>
                    </div>

                    <button 
                      id="btn-start-match-initial"
                      onClick={handleMatch}
                      disabled={isMatching || (!currentQuery.trim() && uploadedFiles.length === 0)}
                      className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 disabled:bg-slate-300 disabled:text-slate-500 text-white font-bold rounded-xl shadow-lg shadow-slate-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group/btn relative overflow-hidden cursor-pointer"
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
                      
                      {/* Scanning light animation */}
                      {isMatching && (
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                          initial={{ x: '-100%' }}
                          animate={{ x: '100%' }}
                          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                        />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Matched State: Dynamic Expandable Top Search Box + Results */
            <motion.div 
              key="matched-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="space-y-8"
            >
              {/* Dynamic Expandable Search Card */}
              <motion.div 
                layout
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  {!isInputExpanded ? (
                    /* Collapsed Compact Mode */
                    <motion.div 
                      key="collapsed-search"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:border-blue-300 transition-colors"
                      onClick={() => setIsInputExpanded(true)}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-blue-600" />
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">当前匹配需求</span>
                          </div>
                          <span className="text-xs text-blue-600 font-semibold flex items-center gap-1 hover:underline">
                            <Edit3 className="w-3.5 h-3.5" /> 点击展开修改
                          </span>
                        </div>
                        <div 
                          className="w-full bg-slate-50 hover:bg-slate-100/80 border border-slate-200/70 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 transition-colors truncate"
                          title="点击展开编辑需求"
                        >
                          {currentQuery || '（未输入文本内容，已附带需求文件）'}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 shrink-0 md:mt-5" onClick={(e) => e.stopPropagation()}>
                        {uploadedFiles.length > 0 && (
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-2 rounded-xl border border-slate-200">
                            <FileText className="w-3.5 h-3.5 text-blue-600" /> 已附加 {uploadedFiles.length} 个文件
                          </div>
                        )}
                        <button 
                          id="btn-re-match-collapsed"
                          onClick={handleMatch}
                          disabled={isMatching}
                          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-bold rounded-xl shadow-sm transition-all flex items-center gap-2 text-sm cursor-pointer"
                        >
                          {isMatching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                          {isMatching ? '分析中...' : '重新匹配'}
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    /* Expanded Full Multi-line Mode with Upload & Actions */
                    <motion.div 
                      key="expanded-search"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="p-6 sm:p-7"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                            <Sparkles className="w-4 h-4" />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-800 text-base">修改技术匹配需求</h3>
                            <p className="text-xs text-slate-400">支持修改多行文本或上传相关需求文档与图片</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => setIsInputExpanded(false)}
                          className="text-xs font-bold text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <ChevronUp className="w-3.5 h-3.5" /> 收起
                        </button>
                      </div>

                      <div className="relative">
                        <textarea 
                          id="input-tech-query-expanded"
                          ref={textareaRef}
                          rows={4}
                          value={currentQuery}
                          onChange={(e) => setCurrentQuery(e.target.value)}
                          placeholder="输入您的技术需求、应用场景或业务痛点，支持多行文本..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 resize-none focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all text-sm leading-relaxed text-slate-800"
                        />
                        
                        {uploadedFiles.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3 mb-2">
                            {uploadedFiles.map((file, idx) => (
                              <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg border border-blue-200">
                                {file.includes('pdf') ? <FileText className="w-3.5 h-3.5" /> : <Image className="w-3.5 h-3.5" />}
                                {file}
                                <button 
                                  onClick={() => setUploadedFiles(uploadedFiles.filter(f => f !== file))} 
                                  className="ml-1 hover:text-blue-900"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <button 
                            id="btn-upload-doc-expanded"
                            onClick={() => handleFileUpload('doc')} 
                            className="flex items-center gap-1.5 px-3.5 py-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all font-medium text-xs border border-slate-200 hover:border-blue-200 cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5" /> 上传需求文档
                          </button>
                          <button 
                            id="btn-upload-img-expanded"
                            onClick={() => handleFileUpload('img')} 
                            className="flex items-center gap-1.5 px-3.5 py-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all font-medium text-xs border border-slate-200 hover:border-blue-200 cursor-pointer"
                          >
                            <Image className="w-3.5 h-3.5" /> 上传场景图片
                          </button>
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto">
                          <button 
                            onClick={() => setIsInputExpanded(false)}
                            className="w-full sm:w-auto px-4 py-2.5 text-slate-500 hover:text-slate-700 font-bold text-sm cursor-pointer"
                          >
                            取消
                          </button>
                          <button 
                            id="btn-re-match-expanded"
                            onClick={handleMatch}
                            disabled={isMatching || (!currentQuery.trim() && uploadedFiles.length === 0)}
                            className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm relative overflow-hidden cursor-pointer"
                          >
                            {isMatching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                            {isMatching ? 'AI 深度分析中...' : '重新智能匹配'}
                            
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Match Results Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
                {isMatching && (
                  <div className="absolute inset-0 z-10 bg-white/70 backdrop-blur-xs flex flex-col items-center justify-center">
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
                    <p className="text-slate-500 mt-2 text-sm">从海量高校科技成果库中为您筛选最佳匹配</p>
                  </div>
                )}
              
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                    <Search className="w-6 h-6 text-[#0F52BA]" /> 
                    匹配结果
                  </h2>
                  <span className="px-4 py-1.5 bg-blue-50 text-blue-700 text-sm font-bold rounded-xl border border-blue-100 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    匹配到 {searchResults.length} 项高校科技成果
                  </span>
                </div>
                
                <div className="space-y-6">
                  {searchResults.length === 0 ? (
                    <div className="py-12 text-center text-slate-500">暂无匹配的技术成果，请尝试调整需求描述</div>
                  ) : searchResults.map((res) => (
                    <motion.div 
                      key={res.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
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
                          </div>
                          
                          <h3 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">{res.title}</h3>
                          
                          <div className="text-sm text-slate-500 mt-3 flex flex-wrap items-center gap-4">
                            <span className="flex items-center gap-1.5 font-medium"><Building2 className="w-4 h-4 text-slate-400" /> {res.university}</span>
                          </div>
                        </div>
                        
                        <button className={`shrink-0 px-6 py-2.5 text-white font-bold rounded-xl text-sm shadow-sm transition-all hover:shadow-md flex items-center gap-2 cursor-pointer ${res.type === 'patent' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}>
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
                          className="text-sm font-bold text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors bg-white px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-200 cursor-pointer"
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
                            transition={{ duration: 0.25 }}
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
