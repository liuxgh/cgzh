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
  Target,
  Bell,
  Lock,
  Send,
  GraduationCap
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
  const { themeConfig } = useAppTheme();

  const navItems = userRole === 'university' ? [
    { key: 'overview', label: '全景驾驶舱', icon: TrendingUp },
    { key: 'patent-similar', label: '相似专利找企业', icon: ShieldCheck },
    { key: 'industry-chain', label: '产业链找企业', icon: Layers },
    { key: 'patent-product', label: '专利产品找企业', icon: Package },
    { key: 'ai-agent', label: 'AI 靶向寻客智能体', icon: BrainCircuit },
    { key: 'unpatented-tech', label: '非专利技术/成果', icon: Award },
    { key: 'university-demand-inbox', label: '企业保密需求清单', icon: Send }
  ] : (selectedUniversity ? [
    { key: 'tech-map', label: '成果技术图谱', icon: Compass, highlight: true },
    { key: 'tech-search', label: 'AI智能匹配技术', icon: Search },
    { key: 'enterprise-demand-publish', label: '免费发布技术需求 (保密直达)', icon: Lock, highlight: true },
    { key: 'unpatented-tech', label: '非专利技术/成果', icon: Award }
  ] : [
    { key: 'enterprise-landing', label: '首页', icon: Building2, highlight: true },
    { key: 'tech-search', label: 'AI智能匹配技术', icon: Search },
    { key: 'enterprise-demand-publish', label: '免费发布技术需求 (保密直达)', icon: Lock, highlight: true }
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchSubmit(searchInput.trim());
    }
  };

  const isDarkHeader = activeTab === 'industry-chain' || activeTab === 'tech-map';

  return (
    <header className={`sticky top-0 z-40 transition-colors duration-300 ${
      isDarkHeader 
        ? 'bg-[#030919] text-slate-100 border-b border-blue-950/80 shadow-xl' 
        : 'text-slate-800 bg-white shadow-xs border-b border-slate-200'
    }`}>
      {/* 1. 主品牌栏与统一检索 (Main Header Bar) */}
      <div className="px-4 sm:px-8 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
        {/* Brand & Title */}
        <div className="flex items-center gap-4 cursor-pointer group" onClick={() => {
            if (userRole === 'enterprise') {
              setActiveTab('tech-map');
            } else {
              setActiveTab('overview');
            }
        }}>
          {isGenericEnterprise ? (
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                 <Globe className="w-6 h-6 sm:w-7 sm:h-7" />
               </div>
               <div className="flex flex-col justify-center">
                 <span className={`text-[18px] sm:text-[22px] font-black tracking-tight leading-none mb-1 ${isDarkHeader ? 'text-white' : 'text-slate-900'}`}>
                   全国高校科技成果转化平台
                 </span>
                 <span className="text-[10px] sm:text-[11px] font-bold text-cyan-400 tracking-widest leading-none">
                   ENTERPRISE INNOVATION HUB
                 </span>
               </div>
             </div>
          ) : (
             <>
                <div className={`h-11 sm:h-14 shrink-0 flex items-center overflow-hidden relative ${isDarkHeader ? 'bg-white/95 rounded-xl p-1 shadow-md' : 'mix-blend-multiply'}`}>
                  <img src="https://www.jlu.edu.cn/__local/0/5B/64/8C8DCC05EE61C79B65D1DFE86D2_14822F50_437B9.jpg" alt="Jilin University Logo" className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-500 ease-out" />
                </div>
                <div className={`flex flex-col justify-center border-l-2 pl-3.5 sm:pl-4 py-0.5 ml-0.5 ${isDarkHeader ? 'border-blue-900/60' : 'border-slate-200/80'}`}>
                  <div className="flex items-end gap-2.5 mb-2">
                    <span className={`text-[22px] sm:text-[26px] font-black tracking-tight leading-none ${isDarkHeader ? 'text-white' : 'text-slate-900'}`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                      吉林大学
                    </span>
                    <span className={`hidden sm:inline-flex items-center px-2 py-[3px] rounded-md border text-[10px] font-bold tracking-widest leading-none translate-y-[-2px] ${
                      isDarkHeader 
                        ? 'bg-blue-950/80 border-blue-700/80 text-cyan-300' 
                        : 'bg-linear-to-br from-blue-50 to-indigo-50/50 border-blue-100/80 text-blue-700 shadow-[0_1px_2px_rgba(0,0,0,0.02)]'
                    }`}>
                      佰腾大数据驱动
                    </span>
                  </div>
                  <span className={`text-[12px] sm:text-[13px] font-semibold tracking-[0.25em] leading-none pl-0.5 ${isDarkHeader ? 'text-slate-400' : 'text-slate-500'}`}>
                    科技成果转化专区
                  </span>
                </div>
             </>
          )}
        </div>

        {/* Global Fast Search matching Baiten.cn search format */}
        <div className="flex items-center gap-6">
          {/* Role Switcher */}
          <div className={`flex items-center p-1 rounded-lg border shadow-inner ${isDarkHeader ? 'bg-[#081738] border-blue-900/60' : 'bg-slate-100 border-slate-200/60'}`}>
            <button
              onClick={() => onRoleChange('university')}
              className={`px-3 sm:px-4 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                userRole === 'university' 
                  ? (isDarkHeader ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-[#0F52BA] shadow-xs ring-1 ring-slate-200/50') 
                  : (isDarkHeader ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700')
              }`}
            >
              🎓 高校端
            </button>
            <button
              onClick={() => onRoleChange('enterprise')}
              className={`px-3 sm:px-4 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                userRole === 'enterprise' 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : (isDarkHeader ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700')
              }`}
            >
              🏢 企业端
            </button>
            <button
              onClick={() => onRoleChange('baiten')}
              className={`px-3 sm:px-4 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                userRole === 'baiten' 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs' 
                  : (isDarkHeader ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700')
              }`}
            >
              🌐 佰腾网端
            </button>
          </div>

          {userRole !== 'baiten' && (
            <form onSubmit={handleSearch} className={`relative w-full md:w-80 lg:w-[350px] flex shadow-xs group ${userRole === 'enterprise' ? 'hidden sm:flex' : 'flex'}`}>
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder={userRole === 'enterprise' ? '输入技术关键词、成果名称或专利号...' : '输入吉大专利号、技术词、靶向企业...'}
                  className={`w-full border border-r-0 rounded-l-xl px-4 py-2 pl-10 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-400/30 transition-all ${
                    isDarkHeader
                      ? 'bg-[#081738] border-blue-900/80 text-white placeholder-slate-400 focus:bg-[#0c224e] focus:border-cyan-400'
                      : 'bg-slate-100/50 border-slate-200 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-400'
                  }`}
                />
                <Search className={`w-4 h-4 absolute left-3.5 top-2.5 transition-colors ${isDarkHeader ? 'text-slate-400 group-focus-within:text-cyan-400' : 'text-slate-400 group-focus-within:text-blue-500'}`} />
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 font-bold rounded-r-xl text-sm transition-all shrink-0 flex items-center cursor-pointer border border-blue-500 shadow-md"
              >
                <span>{userRole === 'enterprise' ? '技术匹配' : '精准寻客'}</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* 3. 佰腾网功能导航标签栏 (Primary Navigation Tabs) - 佰腾网端下不展示导航栏，直接呈现纯净专利列表页 */}
      {userRole !== 'baiten' && (
        <nav className={`px-4 sm:px-8 border-t flex overflow-x-auto no-scrollbar transition-colors ${
          isDarkHeader ? 'bg-[#030919] border-blue-950/80' : 'bg-white border-slate-200'
        }`}>
          <div className="flex space-x-2 py-0">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key as TabType)}
                  className={`relative px-4 py-3.5 text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer border-b-2 ${
                    isActive
                      ? (isDarkHeader ? 'border-cyan-400 text-cyan-300 font-bold bg-blue-950/40' : 'border-blue-600 text-blue-700 font-bold')
                      : item.highlight
                      ? (isDarkHeader ? 'border-transparent text-cyan-400 hover:text-cyan-300' : 'border-transparent text-blue-700 hover:text-blue-800 hover:border-blue-300')
                      : (isDarkHeader ? 'border-transparent text-slate-400 hover:text-slate-100 hover:border-blue-800' : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300')
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${
                    isActive 
                      ? (isDarkHeader ? 'text-cyan-400' : 'text-blue-600') 
                      : item.highlight 
                      ? (isDarkHeader ? 'text-cyan-400' : 'text-blue-600') 
                      : (isDarkHeader ? 'text-slate-500' : 'text-slate-400')
                  }`} />
                  <span>{item.label}</span>
                  {('badge' in item && Boolean((item as any).badge)) && (
                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md leading-none ${
                      isActive
                        ? 'bg-amber-500 text-white shadow-2xs'
                        : 'bg-amber-100 text-amber-800 border border-amber-300/80'
                    }`}>
                      {(item as any).badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
};
