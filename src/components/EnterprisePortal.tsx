import React, { useState } from 'react';
import { Search, UserCheck, Building2, Sparkles, Target, Zap, ArrowRight, PhoneCall, Bot, FlaskConical, MapPin, CheckCircle2, Paperclip, ImagePlus } from 'lucide-react';
import { INITIAL_PATENTS } from '../data/mockData';
import { PatentItem } from '../types';

interface EnterprisePortalProps {
  onViewPatent: (patent: PatentItem) => void;
}

export const EnterprisePortal: React.FC<EnterprisePortalProps> = ({ onViewPatent }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [matchedPatents, setMatchedPatents] = useState<PatentItem[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    // Simulate AI matching delay
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
      // Mock pick 3 patents based on query length just to have stable pseudo-random
      const idx = searchQuery.length % 3;
      setMatchedPatents([
        INITIAL_PATENTS[idx],
        INITIAL_PATENTS[(idx + 1) % INITIAL_PATENTS.length],
        INITIAL_PATENTS[(idx + 2) % INITIAL_PATENTS.length],
      ]);
    }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-slate-50 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Building2 className="w-64 h-64 text-blue-900" />
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 font-bold text-sm border border-blue-100">
              <Sparkles className="w-4 h-4" />
              <span>企业技术需求反向寻源系统</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              智能匹配吉林大学 <br className="hidden sm:block" />
              <span className="text-[#0F52BA]">前沿科技成果与专家团队</span>
            </h1>
            
            <p className="text-slate-500 text-base sm:text-lg max-w-2xl mx-auto">
              输入您的企业技术需求或研发痛点，AI 将依托吉林大学海量科研成果库与佰腾专利大数据，为您精准匹配最契合的技术升级方案与产学研合作团队。
            </p>

            <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto mt-8">
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
            </form>
          </div>
        </div>

        {/* Results Section */}
        {hasSearched && !isSearching && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-black text-slate-900">
                基于您的企业需求，生成专属匹配报告
              </h2>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-bold text-sm border border-emerald-200 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                AI 匹配完成
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {/* Left: Matched Patents */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-blue-600" />
                  <span>高度契合科研成果 (吉大专家团队)</span>
                </h3>
                <div className="space-y-4">
                  {matchedPatents.map((patent, idx) => (
                    <div key={patent.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            
                            <span className="text-xs font-mono text-slate-400">专利号: {patent.patentNo}</span>
                          </div>
                          <h4 className="text-xl font-bold text-slate-900 cursor-pointer hover:text-blue-700 transition-colors" onClick={() => onViewPatent(patent)}>
                            {patent.title}
                          </h4>
                          <div className="flex items-center gap-4 text-sm text-slate-600">
                            <span className="flex items-center gap-1.5">
                              <UserCheck className="w-4 h-4 text-slate-400" />
                              {patent.inventor}
                            </span>
                            
                          </div>
                        </div>
                        <button 
                          onClick={() => onViewPatent(patent)}
                          className="px-4 py-2 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-sm font-bold rounded-xl border border-slate-200 hover:border-blue-200 transition-colors shrink-0"
                        >
                          查看详情
                        </button>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-slate-100">
                        <span className="text-[11px] font-bold text-slate-500 block mb-1">AI 协同切入点分析：</span>
                        <p className="text-sm text-slate-700 leading-relaxed">
                          该技术在<strong className="text-blue-700">{patent.domain}</strong>领域具备显著优势，可直接解决贵公司在产品迭代中的关键性能瓶颈。建议将其作为重点引进技术，通过技术许可或作价入股形式开展深度合作。
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
