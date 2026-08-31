import React from 'react';
import { TabType, UserRole } from '../types';
import { 
  Building2, 
  Search, 
  Sparkles, 
  Database, 
  Compass, 
  ShieldCheck, 
  Layers, 
  Package, 
  FileText, 
  TrendingUp, 
  BrainCircuit, 
  Cpu, 
  UserCheck,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  PhoneCall,
  Flame,
  Globe,
  Award,
  Target
} from 'lucide-react';
import { useAppTheme } from '../context/ThemeContext';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onSearchSubmit: (text: string) => void;
  selectedUniversity?: string | null;
  onSelectUniversity?: (uni: string | null) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  userRole,
  onRoleChange,
  onSearchSubmit,
  selectedUniversity = null,
  onSelectUniversity
}) => {
  const isGenericEnterprise = userRole === 'enterprise' && !selectedUniversity;
  const [searchInput, setSearchInput] = React.useState('');
  const [searchCategory, setSearchCategory] = React.useState<'patent' | 'enterprise' | 'industry' | 'product'>('patent');
  const { themeConfig } = useAppTheme();

  const navItems = userRole === 'university' ? [
    { key: 'overview', label: '全景驾驶舱', icon: TrendingUp },
    { key: 'patent-similar', label: '相似专利找企业', icon: ShieldCheck },
    { key: 'industry-chain', label: '产业链找企业', icon: Layers },
    { key: 'patent-product', label: '专利产品找企业', icon: Package },
    { key: 'ai-agent', label: 'AI 靶向寻客智能体', icon: BrainCircuit, highlight: true },
    { key: 'unpatented-tech', label: '未入库技术', icon: Award }
  ] : (selectedUniversity ? [
    { key: 'tech-map', label: '吉大技术图谱', icon: Compass, highlight: true },
    { key: 'tech-search', label: '吉大技术寻源 (AI)', icon: Search },
    { key: 'unpatented-tech', label: '未公开成果池', icon: Award }
  ] : [
    { key: 'enterprise-landing', label: '全国高校联盟大厅', icon: Building2, highlight: true },
    { key: 'tech-search', label: '全网技术寻源 (AI)', icon: Search }
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchSubmit(searchInput.trim());
    }
  };

  return (
    <header className="sticky top-0 z-40 text-slate-800 bg-white shadow-sm border-b border-slate-200">
      {/* 1. 主品牌栏与统一检索 (Main Header Bar) */}
      <div className={`px-4 sm:px-8 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors`}>
        {/* Brand & Title */}
        <div className="flex items-center gap-4 cursor-pointer group" onClick={() => {
            if (userRole === 'enterprise' && selectedUniversity) {
              if (onSelectUniversity) onSelectUniversity(null);
            } else if (userRole === 'enterprise') {
              setActiveTab('enterprise-landing');
            } else {
              setActiveTab('overview');
            }
        }}>
          {isGenericEnterprise ? (
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                 <Globe className="w-6 h-6 sm:w-7 sm:h-7" />
               </div>
               <div className="flex flex-col justify-center">
                 <span className="text-[18px] sm:text-[22px] font-black text-slate-900 tracking-tight leading-none mb-1">
                   全国高校科技成果转化平台
                 </span>
                 <span className="text-[10px] sm:text-[11px] font-bold text-blue-600 tracking-widest leading-none">
                   ENTERPRISE INNOVATION HUB
                 </span>
               </div>
             </div>
          ) : (
             <>
                <div className="h-11 sm:h-14 shrink-0 flex items-center overflow-hidden mix-blend-multiply relative">
                  <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors z-10" />
                  <img src="https://www.jlu.edu.cn/__local/0/5B/64/8C8DCC05EE61C79B65D1DFE86D2_14822F50_437B9.jpg" alt="Jilin University Logo" className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-500 ease-out" />
                </div>
                <div className="flex flex-col justify-center border-l-2 border-slate-200/80 pl-3.5 sm:pl-4 py-0.5 ml-0.5">
                  <div className="flex items-end gap-2.5 mb-2">
                    <span className="text-[22px] sm:text-[26px] font-black text-slate-900 tracking-tight leading-none" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                      吉林大学
                    </span>
                    <span className="hidden sm:inline-flex items-center px-2 py-[3px] rounded-md bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-100/80 text-blue-700 text-[10px] font-bold tracking-widest leading-none shadow-[0_1px_2px_rgba(0,0,0,0.02)] translate-y-[-2px]">
                      佰腾大数据驱动
                    </span>
                  </div>
                  <span className="text-[12px] sm:text-[13px] font-semibold text-slate-500 tracking-[0.25em] leading-none pl-0.5">
                    科技成果转化专区
                  </span>
                </div>
             </>
          )}
        </div>

        {/* Global Fast Search matching Baiten.cn search format */}
        <div className="flex items-center gap-6">
          {/* Role Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200/60 shadow-inner">
            <button
              onClick={() => onRoleChange('university')}
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 ${userRole === 'university' ? 'bg-white text-[#0F52BA] shadow-sm ring-1 ring-slate-200/50' : 'text-slate-500 hover:text-slate-700'}`}
            >
              🎓 高校端
            </button>
            <button
              onClick={() => onRoleChange('enterprise')}
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 ${userRole === 'enterprise' ? 'bg-[#0F52BA] text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              🏢 企业端
            </button>
          </div>

          <form onSubmit={handleSearch} className={`relative w-full md:w-80 lg:w-[350px] flex shadow-xs group ${userRole === 'enterprise' ? 'hidden sm:flex' : 'flex'}`}>
            <div className="relative flex-1">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={userRole === 'enterprise' ? '输入技术需求、痛点、关键词...' : '输入吉大专利号、技术词、靶向企业...'}
                className="w-full bg-slate-100/50 border border-slate-200 border-r-0 rounded-l-xl px-4 py-2 pl-10 text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-400/10 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 font-bold rounded-r-xl text-sm transition-all shrink-0 flex items-center cursor-pointer border border-blue-600 shadow-sm"
            >
              <span>{userRole === 'enterprise' ? '技术匹配' : '精准寻客'}</span>
            </button>
          </form>
        </div>
      </div>

      {/* 3. 佰腾网功能导航标签栏 (Primary Navigation Tabs) */}
      <nav className={`px-4 sm:px-8 border-t border-slate-200 bg-white flex overflow-x-auto no-scrollbar transition-colors`}>
        <div className="flex space-x-2 py-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`relative px-4 py-3.5 text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer border-b-2 ${
                  isActive
                    ? 'border-blue-600 text-blue-700 font-bold'
                    : item.highlight
                    ? 'border-transparent text-blue-700 hover:text-blue-700 hover:border-blue-300'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : item.highlight ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};

