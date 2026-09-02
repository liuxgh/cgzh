import React, { useState } from 'react';
import { Search, Building2, BookOpen, ArrowRight, Zap } from 'lucide-react';
import { TabType } from '../types';

interface Props {
  onSearch: (query: string) => void;
  onNavigate: (tab: TabType) => void;
}

export const EnterpriseDashboard: React.FC<Props> = ({ onSearch, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Hero Search */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 sm:p-12 shadow-xl border border-slate-800">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blue-200 text-sm font-medium">
            <Zap className="w-4 h-4" />
            企业创新直通车
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            一键直达顶尖高校 <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-white">
              破解企业“卡脖子”技术难题
            </span>
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl">
            输入您的技术需求或面临的痛点，AI智能体将为您从海量高校成果库及非专利技术/成果中，精准匹配解决方案与核心研发团队。
          </p>
          
          <form onSubmit={handleSearch} className="relative max-w-2xl mt-8">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-12 pr-32 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/20 transition-all text-lg backdrop-blur-sm"
              placeholder="例如：提升三元锂电池循环寿命的技术..."
            />
            <button
              type="submit"
              className="absolute inset-y-2 right-2 px-6 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-colors flex items-center gap-2 cursor-pointer"
            >
              匹配技术
            </button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          onClick={() => onNavigate('tech-map')}
          className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">探索高校科研实力</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              宏观了解如“吉林大学”等双一流高校的核心优势学科与技术图谱，发现更多潜在产学研合作切入点。
            </p>
          </div>
          <div className="mt-6 flex justify-end">
             <span className="flex items-center gap-1 text-blue-600 font-bold group-hover:translate-x-1 transition-transform">
               查看吉大技术图谱 <ArrowRight className="w-4 h-4" />
             </span>
          </div>
        </div>

        <div 
          onClick={() => onNavigate('unpatented-tech')}
          className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-400 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">非专利技术/成果</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              浏览高校教师发布的高价值专有技术成果，获取那些尚未形成专利的“隐形资产”。
            </p>
          </div>
          <div className="mt-6 flex justify-end">
             <span className="flex items-center gap-1 text-emerald-600 font-bold group-hover:translate-x-1 transition-transform">
               浏览成果 <ArrowRight className="w-4 h-4" />
             </span>
          </div>
        </div>
      </div>
      
    </div>
  );
};
