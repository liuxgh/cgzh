import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Sparkles, 
  Camera, 
  SlidersHorizontal, 
  RotateCcw, 
  Target, 
  Download, 
  FileText, 
  Star, 
  BarChart3, 
  Highlighter, 
  Save, 
  Layers, 
  Columns, 
  ChevronDown, 
  ChevronRight, 
  ChevronLeft,
  Check, 
  ShieldCheck, 
  Building2, 
  Globe, 
  ArrowRight, 
  ExternalLink, 
  Zap, 
  Handshake, 
  Bot, 
  X, 
  MessageSquare,
  Flame,
  Award,
  BookOpen,
  Info
} from 'lucide-react';
import { BAITEN_PATENTS_MOCK, BaitenPatentItem } from '../data/baitenPatentsData';

interface BaitenPatentSearchPageProps {
  onDockingPatent: (patent: BaitenPatentItem) => void;
  onNavigateToRole: (role: 'university' | 'enterprise') => void;
}

export const BaitenPatentSearchPage: React.FC<BaitenPatentSearchPageProps> = ({
  onDockingPatent,
  onNavigateToRole
}) => {
  const [searchKeyword, setSearchKeyword] = useState('吉林大学');
  const [activeSearchTerm, setActiveSearchTerm] = useState('吉林大学');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');
  const [onlyJlu, setOnlyJlu] = useState(false);
  const [selectedPatents, setSelectedPatents] = useState<string[]>([]);
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [aiAssistantMsg, setAiAssistantMsg] = useState('');
  const [aiChatHistory, setAiChatHistory] = useState<Array<{ role: 'ai' | 'user'; text: string }>>([
    {
      role: 'ai',
      text: '您好！我是佰腾 AI 小佰灵 2.0。已为您在吉林大学 50,932 件专利资产池中建立智能索引。点击专利名称右侧的【成果对接】按钮，可一键直达吉林大学科技成果转化专区发布企业保密技术需求！'
    }
  ]);

  // Sidebar expanded groups
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    country: true,
    applicantType: true,
    applicant: true,
    legalStatus: true,
    ipc: false
  });

  const toggleSection = (key: string) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Filter patents based on search query and filters
  const filteredPatents = useMemo(() => {
    return BAITEN_PATENTS_MOCK.filter(item => {
      if (onlyJlu && !item.isJluPatent) return false;
      if (selectedTypeFilter !== 'all') {
        if (selectedTypeFilter === 'invention_grant' && item.patentTypeCategory !== 'invention_grant') return false;
        if (selectedTypeFilter === 'design' && item.patentTypeCategory !== 'design') return false;
        if (selectedTypeFilter === 'invention_pub' && item.patentTypeCategory !== 'invention_pub') return false;
      }
      if (activeSearchTerm.trim()) {
        const q = activeSearchTerm.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchNo = item.patentNo.toLowerCase().includes(q) || item.pubNo.toLowerCase().includes(q);
        const matchApplicant = item.applicants.some(a => a.toLowerCase().includes(q));
        const matchAbstract = item.abstract.toLowerCase().includes(q);
        const matchInventor = item.inventors.some(i => i.toLowerCase().includes(q));
        return matchTitle || matchNo || matchApplicant || matchAbstract || matchInventor;
      }
      return true;
    });
  }, [activeSearchTerm, selectedTypeFilter, onlyJlu]);

  // Handle Search Submit
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setActiveSearchTerm(searchKeyword);
  };

  // Toggle selection
  const handleToggleSelect = (id: string) => {
    setSelectedPatents(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedPatents.length === filteredPatents.length) {
      setSelectedPatents([]);
    } else {
      setSelectedPatents(filteredPatents.map(p => p.id));
    }
  };

  // Send message to AI assistant
  const handleSendAiMsg = (textToSend?: string) => {
    const text = textToSend || aiAssistantMsg;
    if (!text.trim()) return;
    const newHistory = [...aiChatHistory, { role: 'user' as const, text }];
    setAiChatHistory(newHistory);
    setAiAssistantMsg('');

    setTimeout(() => {
      let reply = '为您检索到吉林大学在相关领域共有 120+ 件高价值授权专利。建议您通过【成果对接】通道直接联系吉林大学技术转移中心专家团队！';
      if (text.includes('转化') || text.includes('对接') || text.includes('需求')) {
        reply = '吉林大学科技成果转化专区已打通全流程闭环！您只需在任意吉大专利旁点击【成果对接】，即可免费填报技术卡点痛点，平台将自动指派吉大学科专家与教授团队提供可行性评估及技术解决方案。';
      } else if (text.includes('汽车') || text.includes('制动')) {
        reply = '吉林大学汽车工程学院（汽车底盘集成与仿生全国重点实验室）拥有高振海教授团队的《线控电液复合制动系统》核心专利，综合评分 96 分，匹配多家整车厂量产需求。';
      } else if (text.includes('火星') || text.includes('仿生')) {
        reply = '《一种火星薄壳地形模拟实施方法》（CN202110928396.6）由吉林大学与北京空间飞行器总体设计部联合攻关，属深空仿生工程高价值成果，支持产学研合作与技术授权。';
      }
      setAiChatHistory([...newHistory, { role: 'ai' as const, text: reply }]);
    }, 700);
  };

  // Helper function to highlight keywords in text
  const renderHighlightedText = (text: string) => {
    if (!activeSearchTerm.trim()) return text;
    const regex = new RegExp(`(${activeSearchTerm}|吉林大学)`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) => {
      if (part.toLowerCase() === activeSearchTerm.toLowerCase() || part === '吉林大学') {
        return <span key={index} className="text-red-600 font-bold bg-amber-100/60 px-0.5 rounded">{part}</span>;
      }
      return part;
    });
  };

  return (
    <div className="bg-[#f4f7fa] text-slate-800 min-h-screen text-xs">
      
      {/* 1. BAITEN SEARCH BAR HEADER (搜索框区) */}
      <div className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6 lg:px-8 shadow-2xs">
        <div className="max-w-[1720px] mx-auto flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-3">
          
          {/* Big Search Input with internal feature badges */}
          <form onSubmit={handleSearch} className="flex-1 flex items-center">
            <div className="relative flex-1 flex items-center">
              {/* Globe Icon */}
              <div className="absolute left-3.5 text-blue-500">
                <Globe className="w-5 h-5" />
              </div>

              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="输入检索词，例如：吉林大学、申请人、技术关键词、分类号..."
                className="w-full bg-slate-50 border-2 border-blue-600 rounded-l-md pl-11 pr-32 py-2 text-sm text-slate-900 font-medium focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500"
              />

              {/* In-search buttons */}
              <div className="absolute right-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSearchKeyword('AP=(吉林大学) AND TI=(模拟 OR 控制 OR 算法 OR 装置 OR 制备)');
                    setActiveSearchTerm('吉林大学');
                  }}
                  className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-[11px] font-medium flex items-center gap-1 hover:bg-blue-100 cursor-pointer"
                  title="生成结构化专利检索式"
                >
                  <Bot className="w-3 h-3 text-blue-600" />
                  <span>AI检索式生成</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSearch()}
                  className="text-slate-500 hover:text-blue-600 text-xs font-medium cursor-pointer"
                >
                  二次检索
                </button>
                <button type="button" className="text-slate-400 hover:text-slate-700 p-0.5 cursor-pointer">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Blue Main Search Button */}
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-r-md font-bold text-sm flex items-center justify-center cursor-pointer transition-colors shadow-xs"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Action Buttons on right */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsAiDrawerOpen(true)}
              className="px-3.5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md font-bold text-xs flex items-center gap-1.5 hover:from-blue-700 hover:to-indigo-700 cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>AI智能检索</span>
            </button>

            <button
              type="button"
              className="px-3 py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-md font-medium text-xs flex items-center gap-1 cursor-pointer"
            >
              <Target className="w-3.5 h-3.5 text-slate-500" />
              <span>主题跟踪</span>
            </button>

            <button
              type="button"
              className="px-3 py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-md font-medium text-xs flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>返回旧版</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. TOOLBAR ACTIONS ROW (列表操作栏) */}
      <div className="bg-white border-b border-slate-200 px-4 py-2">
        <div className="max-w-[1720px] mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Left action tools */}
          <div className="flex flex-wrap items-center gap-2">
            <button className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded text-slate-700 font-medium flex items-center gap-1 cursor-pointer">
              <span>图文模式</span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>

            <button className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-300 rounded text-slate-700 font-medium flex items-center gap-1 cursor-pointer">
              <Star className="w-3.5 h-3.5 text-amber-500" />
              <span>收藏</span>
            </button>

            <button className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-300 rounded text-slate-700 font-medium flex items-center gap-1 cursor-pointer">
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>著录项导出</span>
            </button>

            <button className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-300 rounded text-slate-700 font-medium flex items-center gap-1 cursor-pointer">
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>全文下载</span>
            </button>

            <button className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-300 rounded text-slate-700 font-medium flex items-center gap-1 cursor-pointer">
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>附图下载</span>
            </button>

            <button className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-300 rounded text-slate-700 font-medium flex items-center gap-1 cursor-pointer">
              <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
              <span>分析</span>
            </button>

            <button className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-300 rounded text-slate-700 font-medium flex items-center gap-1 cursor-pointer">
              <Highlighter className="w-3.5 h-3.5 text-amber-500" />
              <span>高亮</span>
            </button>

            <button className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-300 rounded text-slate-700 font-medium flex items-center gap-1 cursor-pointer">
              <Save className="w-3.5 h-3.5 text-slate-500" />
              <span>保存检索式</span>
            </button>

            <button className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-300 rounded text-slate-700 font-medium flex items-center gap-1 cursor-pointer">
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>报告</span>
            </button>

            <button className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-300 rounded text-slate-700 font-medium flex items-center gap-1 cursor-pointer">
              <Columns className="w-3.5 h-3.5 text-slate-500" />
              <span>专利对比</span>
            </button>

            <button className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-300 rounded text-slate-700 font-medium flex items-center gap-1 cursor-pointer">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
              <span>显示字段</span>
            </button>

            <div className="flex items-center gap-1 ml-2 text-slate-600 font-medium">
              <span>排序:</span>
              <select className="bg-slate-50 border border-slate-300 rounded px-2 py-0.5 text-xs text-slate-700 cursor-pointer">
                <option>相关度</option>
                <option>申请日 (降序)</option>
                <option>公开日 (降序)</option>
                <option>专利价值评分</option>
              </select>
            </div>
          </div>

          {/* Right result counter & page quick box */}
          <div className="flex items-center gap-3">
            <span className="text-slate-600">
              共 <strong className="text-blue-700 font-bold text-sm">50,932</strong> 条
            </span>
            <div className="flex items-center gap-1">
              <span className="w-6 h-6 border border-slate-300 rounded flex items-center justify-center font-bold text-slate-700 bg-white">
                1
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. MAIN WORKSPACE WITH LEFT FILTER SIDEBAR & RIGHT PATENT LIST */}
      <div className="max-w-[1720px] mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* LEFT SIDEBAR: FILTERS & FACETS (20% width on large screens) */}
          <div className="lg:col-span-3 xl:col-span-2 space-y-3">
            
            {/* Quick buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button className="py-1.5 px-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 rounded font-bold text-xs flex items-center justify-center gap-1 cursor-pointer">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>快捷统计</span>
              </button>
              <button className="py-1.5 px-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded font-medium text-xs flex items-center justify-center gap-1 cursor-pointer">
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                <span>检索历史</span>
              </button>
            </div>

            {/* Filter Accordions */}
            <div className="bg-white rounded-md border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-2xs">
              
              {/* Category 1: 全部国家 */}
              <div className="p-3">
                <div 
                  className="flex items-center justify-between font-bold text-slate-800 cursor-pointer mb-2"
                  onClick={() => toggleSection('country')}
                >
                  <span className="text-xs">全部国家</span>
                  <span className="text-slate-400 text-sm">{expandedSections.country ? '−' : '+'}</span>
                </div>

                {expandedSections.country && (
                  <div className="space-y-1.5 pl-1 text-[11px] text-slate-600">
                    <div className="flex items-center justify-between hover:text-blue-600 cursor-pointer">
                      <label className="flex items-center gap-1.5 cursor-pointer font-bold text-slate-800">
                        <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                        <span>中国</span>
                      </label>
                      <span className="text-slate-400 font-mono">(50813)</span>
                    </div>

                    <div className="pl-5 space-y-1 text-slate-600">
                      <div 
                        className={`flex items-center justify-between cursor-pointer p-0.5 rounded ${selectedTypeFilter === 'invention_grant' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:text-blue-600'}`}
                        onClick={() => setSelectedTypeFilter(selectedTypeFilter === 'invention_grant' ? 'all' : 'invention_grant')}
                      >
                        <span className="flex items-center gap-1.5">
                          <input type="checkbox" checked={selectedTypeFilter === 'invention_grant'} readOnly className="rounded text-blue-600" />
                          <span>发明授权专利</span>
                        </span>
                        <span className="text-slate-400 font-mono">(21197)</span>
                      </div>

                      <div 
                        className={`flex items-center justify-between cursor-pointer p-0.5 rounded ${selectedTypeFilter === 'invention_pub' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:text-blue-600'}`}
                        onClick={() => setSelectedTypeFilter(selectedTypeFilter === 'invention_pub' ? 'all' : 'invention_pub')}
                      >
                        <span className="flex items-center gap-1.5">
                          <input type="checkbox" checked={selectedTypeFilter === 'invention_pub'} readOnly className="rounded text-blue-600" />
                          <span>发明公开专利</span>
                        </span>
                        <span className="text-slate-400 font-mono">(16107)</span>
                      </div>

                      <div className="flex items-center justify-between hover:text-blue-600 cursor-pointer p-0.5">
                        <span className="flex items-center gap-1.5">
                          <input type="checkbox" className="rounded text-blue-600" />
                          <span>实用新型专利</span>
                        </span>
                        <span className="text-slate-400 font-mono">(13206)</span>
                      </div>

                      <div 
                        className={`flex items-center justify-between cursor-pointer p-0.5 rounded ${selectedTypeFilter === 'design' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:text-blue-600'}`}
                        onClick={() => setSelectedTypeFilter(selectedTypeFilter === 'design' ? 'all' : 'design')}
                      >
                        <span className="flex items-center gap-1.5">
                          <input type="checkbox" checked={selectedTypeFilter === 'design'} readOnly className="rounded text-blue-600" />
                          <span>外观专利</span>
                        </span>
                        <span className="text-slate-400 font-mono">(303)</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between hover:text-blue-600 cursor-pointer pt-1">
                      <span className="flex items-center gap-1.5">
                        <input type="checkbox" className="rounded text-blue-600" />
                        <span>WIPO</span>
                      </span>
                      <span className="text-slate-400 font-mono">(109)</span>
                    </div>

                    <div className="flex items-center justify-between hover:text-blue-600 cursor-pointer">
                      <span className="flex items-center gap-1.5">
                        <input type="checkbox" className="rounded text-blue-600" />
                        <span>日本</span>
                      </span>
                      <span className="text-slate-400 font-mono">(10)</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Category: 申请人 */}
              <div className="p-3">
                <div 
                  className="flex items-center justify-between font-bold text-slate-800 cursor-pointer"
                  onClick={() => toggleSection('applicant')}
                >
                  <span className="text-xs">申请人 (专利权人)</span>
                  <span className="text-slate-400 text-sm">{expandedSections.applicant ? '−' : '+'}</span>
                </div>

                {expandedSections.applicant && (
                  <div className="space-y-1.5 mt-2 text-[11px]">
                    <div 
                      className={`flex items-center justify-between p-1 rounded cursor-pointer ${onlyJlu ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200' : 'hover:bg-slate-50'}`}
                      onClick={() => setOnlyJlu(!onlyJlu)}
                    >
                      <span className="flex items-center gap-1.5">
                        <input type="checkbox" checked={onlyJlu} readOnly className="rounded text-blue-600" />
                        <span className="text-red-600 font-bold">吉林大学</span>
                      </span>
                      <span className="text-slate-400 font-mono">(50813)</span>
                    </div>

                    <div className="flex items-center justify-between p-1 hover:bg-slate-50 rounded cursor-pointer text-slate-600">
                      <span>北京空间飞行器总体设计部</span>
                      <span className="text-slate-400 font-mono">(142)</span>
                    </div>
                    <div className="flex items-center justify-between p-1 hover:bg-slate-50 rounded cursor-pointer text-slate-600">
                      <span>中国第一汽车集团有限公司</span>
                      <span className="text-slate-400 font-mono">(98)</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Other Filter Categories */}
              {['产品', '申请人类型', '当前权利人', '申请日', '公开日', '法律状态', '法律事件', '分类号 (大类)', '分类号 (小类)', '分类号 (大组)'].map(name => (
                <div key={name} className="p-2.5 flex items-center justify-between text-slate-700 hover:bg-slate-50 cursor-pointer">
                  <span className="text-xs font-medium">{name}</span>
                  <span className="text-slate-400 text-xs">+</span>
                </div>
              ))}
            </div>

            {/* Quick Banner for Tech Transfer */}
            <div className="p-3 bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-md space-y-2 shadow-sm">
              <div className="flex items-center gap-1.5 font-bold text-cyan-300 text-xs">
                <Handshake className="w-4 h-4 text-cyan-400" />
                <span>吉林大学科技成果转化专区</span>
              </div>
              <p className="text-[11px] text-blue-100 leading-relaxed">
                依托佰腾大数据，吉林大学已面向企业全面开放专利成果对接。遇合适专利可直接点击「成果对接」免费发布需求。
              </p>
              <button
                onClick={() => onNavigateToRole('enterprise')}
                className="w-full py-1.5 bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold rounded text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>进入高校专区</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* RIGHT MAIN LIST (80% width on large screens) */}
          <div className="lg:col-span-9 xl:col-span-10 space-y-3">
            
            {/* Header info banner if filter active */}
            {(onlyJlu || selectedTypeFilter !== 'all') && (
              <div className="bg-blue-50 border border-blue-200 px-3 py-2 rounded flex items-center justify-between text-xs text-blue-800">
                <div className="flex items-center gap-2">
                  <span>当前筛选条件：</span>
                  {onlyJlu && <span className="px-2 py-0.5 bg-blue-600 text-white rounded font-bold text-[11px]">仅吉林大学专利</span>}
                  {selectedTypeFilter !== 'all' && (
                    <span className="px-2 py-0.5 bg-blue-600 text-white rounded font-bold text-[11px]">
                      {selectedTypeFilter === 'invention_grant' ? '发明授权' : selectedTypeFilter === 'design' ? '外观专利' : '发明公开'}
                    </span>
                  )}
                </div>
                <button 
                  onClick={() => { setOnlyJlu(false); setSelectedTypeFilter('all'); }}
                  className="text-blue-600 hover:text-blue-900 underline font-bold cursor-pointer"
                >
                  清除筛选
                </button>
              </div>
            )}

            {/* PATENT LIST ITEMS */}
            <div className="space-y-3">
              {filteredPatents.map((item, index) => {
                const isSelected = selectedPatents.includes(item.id);

                return (
                  <div 
                    key={item.id}
                    className={`bg-white rounded-md border transition-all hover:shadow-md ${
                      isSelected ? 'border-blue-500 bg-blue-50/10' : 'border-slate-200'
                    }`}
                  >
                    {/* Top Row: Checkbox, Index, Type, Number, Title, Status, Score, and CRITICAL 成果对接 TAG */}
                    <div className="p-3.5 pb-2.5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2 bg-slate-50/40">
                      
                      {/* Left Title & Tags */}
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Checkbox */}
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelect(item.id)}
                          className="rounded text-blue-600 w-3.5 h-3.5 cursor-pointer"
                        />

                        {/* Index & Type */}
                        <span className="text-slate-500 font-mono text-xs">
                          {index + 1} {item.type}
                        </span>

                        {/* Application / Patent No */}
                        <a 
                          href="#patent" 
                          onClick={(e) => { e.preventDefault(); }}
                          className="text-blue-700 hover:text-blue-900 hover:underline font-mono font-medium text-xs"
                        >
                          {item.patentNo}
                        </a>

                        {/* Patent Title */}
                        <a
                          href="#title"
                          onClick={(e) => { e.preventDefault(); }}
                          className="text-blue-700 hover:text-blue-900 hover:underline font-bold text-sm tracking-tight"
                        >
                          {renderHighlightedText(item.title)}
                        </a>

                        {/* Status badge: 有权-审定授权 */}
                        <span className="px-2 py-0.5 bg-emerald-600 text-white rounded text-[11px] font-bold leading-none">
                          {item.legalStatus}
                        </span>

                        {/* Score badge: e.g. 54分 / 96分 */}
                        <span className="px-2 py-0.5 border border-amber-500 text-amber-600 bg-amber-50/60 rounded text-[11px] font-bold leading-none font-mono">
                          {item.score} 分
                        </span>

                        {/* ========================================================= */}
                        {/* ⭐ CRITICAL FEATURE: 吉林大学专利「成果对接」标签图标 ⭐ */}
                        {/* ========================================================= */}
                        {item.isJluPatent && (
                          <div className="inline-flex items-center group relative">
                            <button
                              type="button"
                              onClick={() => onDockingPatent(item)}
                              className="px-2.5 py-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-black text-xs rounded-md shadow-sm hover:shadow-md flex items-center gap-1.5 cursor-pointer transition-all transform hover:-translate-y-0.5 active:translate-y-0 ring-2 ring-blue-400/40"
                              title="点击进入吉林大学科技成果转化专区 · 免费发布保密技术需求 (直通高校专家)"
                            >
                              <Handshake className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
                              <span>成果对接</span>
                              <Zap className="w-3 h-3 text-cyan-200" />
                            </button>

                            {/* Floating tooltip badge */}
                            <div className="hidden group-hover:block absolute left-0 bottom-full mb-1.5 z-30 w-64 bg-slate-900 text-white text-[11px] p-2 rounded-lg shadow-xl pointer-events-none">
                              <div className="font-bold text-cyan-300 flex items-center gap-1 mb-0.5">
                                <Sparkles className="w-3 h-3 text-amber-300" />
                                <span>吉林大学科技成果转化通道</span>
                              </div>
                              <div className="text-slate-300 leading-snug">
                                点击后一键直达企业端免费发布技术需求，关联本成果由吉林大学专家团队为您保密攻关对接！
                              </div>
                              <div className="w-2 h-2 bg-slate-900 rotate-45 absolute -bottom-1 left-6"></div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right side quick indicators */}
                      <div className="flex items-center gap-2">
                        {item.matchedField && (
                          <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            {item.matchedField}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content Section: Left Image + Right Metadata Grid */}
                    <div className="p-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                      
                      {/* Left Thumbnail Illustration */}
                      <div className="md:col-span-3 lg:col-span-2 flex justify-center items-center">
                        <div className="w-32 h-32 bg-slate-50 border border-slate-200 rounded p-2 flex flex-col items-center justify-center relative group overflow-hidden">
                          {item.imageType === 'coin' ? (
                            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 p-1 shadow-md flex items-center justify-center text-center">
                              <div className="w-full h-full rounded-full border-2 border-amber-800/40 flex flex-col items-center justify-center p-1 bg-amber-500/10 text-amber-950">
                                <Building2 className="w-6 h-6 text-amber-900" />
                                <span className="text-[8px] font-black leading-none mt-1">吉林大学</span>
                                <span className="text-[6px] font-mono leading-none mt-0.5">JILIN UNIV</span>
                              </div>
                            </div>
                          ) : item.imageType === 'chip' ? (
                            <div className="w-24 h-24 bg-slate-900 rounded border border-cyan-500/40 p-2 flex flex-col items-center justify-center text-cyan-400">
                              <Zap className="w-8 h-8 text-cyan-400" />
                              <span className="text-[8px] font-mono mt-1 text-slate-300">SPR SENSOR</span>
                            </div>
                          ) : item.imageType === 'biomed' ? (
                            <div className="w-24 h-24 bg-emerald-50 rounded border border-emerald-300 p-2 flex flex-col items-center justify-center text-emerald-700">
                              <FileText className="w-8 h-8 text-emerald-600" />
                              <span className="text-[8px] font-bold mt-1 text-center leading-none">基因/生物酶</span>
                            </div>
                          ) : (
                            <div className="w-24 h-24 bg-white border border-slate-300 rounded p-1.5 flex flex-col items-center justify-center text-slate-700">
                              <div className="w-full h-full border border-dashed border-slate-300 rounded flex flex-col items-center justify-center p-1 text-center bg-slate-50/50">
                                <FileText className="w-7 h-7 text-slate-400 mb-1" />
                                <span className="text-[8px] text-slate-500 leading-none">专利附图 说明书</span>
                                <span className="text-[7px] font-mono text-slate-400 mt-0.5">FIG. 1</span>
                              </div>
                            </div>
                          )}

                          <span className="absolute bottom-1 right-1 text-[9px] bg-slate-800/80 text-white px-1 rounded">
                            附图
                          </span>
                        </div>
                      </div>

                      {/* Right Metadata Grid */}
                      <div className="md:col-span-9 lg:col-span-10 space-y-2 text-xs text-slate-700">
                        
                        {/* Row 1 */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div>
                            <span className="text-slate-400">公开 (公告) 号：</span>
                            <span className="font-mono text-blue-700 font-medium">{item.pubNo}</span>
                          </div>
                          <div>
                            <span className="text-slate-400">申请日：</span>
                            <span className="font-mono text-slate-800">{item.appDate}</span>
                          </div>
                          <div>
                            <span className="text-slate-400">申请 (专利权) 人：</span>
                            <span className="font-medium text-slate-900">
                              {item.applicants.map((a, i) => (
                                <React.Fragment key={i}>
                                  {i > 0 && ' '}
                                  {a === '吉林大学' ? (
                                    <strong className="text-red-600 font-bold bg-red-50 px-1 py-0.5 rounded">吉林大学</strong>
                                  ) : (
                                    <span>{a}</span>
                                  )}
                                </React.Fragment>
                              ))}
                            </span>
                          </div>
                        </div>

                        {/* Row 2 */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div>
                            <span className="text-slate-400">公开 (公告) 日：</span>
                            <span className="font-mono text-slate-800">{item.pubDate}</span>
                          </div>
                          <div>
                            <span className="text-slate-400">主分类号：</span>
                            <span className="font-mono text-slate-800">{item.mainIpc}</span>
                          </div>
                          <div>
                            <span className="text-slate-400">代理机构：</span>
                            <span className="text-slate-700">{item.agency}</span>
                          </div>
                        </div>

                        {/* Row 3 */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div className="sm:col-span-2">
                            <span className="text-slate-400">发明人：</span>
                            <span className="text-slate-800 font-medium">{item.inventors.join(' ')}</span>
                            <span className="text-slate-400 ml-4">代理人：</span>
                            <span className="text-slate-800">{item.agent}</span>
                          </div>
                          <div>
                            <span className="text-slate-400">当前权利人：</span>
                            <span className="text-slate-800 font-medium">
                              {item.currentAssignees.map((a, i) => (
                                <React.Fragment key={i}>
                                  {i > 0 && ' '}
                                  {a === '吉林大学' ? (
                                    <strong className="text-red-600 font-bold bg-red-50 px-1 py-0.5 rounded">吉林大学</strong>
                                  ) : (
                                    <span>{a}</span>
                                  )}
                                </React.Fragment>
                              ))}
                            </span>
                          </div>
                        </div>

                        {/* Row 4: Address */}
                        <div>
                          <span className="text-slate-400">申请人地址：</span>
                          <span className="text-slate-700">{item.address}</span>
                        </div>

                        {/* Row 5: Abstract */}
                        <div className="pt-1 text-slate-600 leading-relaxed bg-slate-50/60 p-2 rounded border border-slate-100 text-[11px]">
                          <strong className="text-slate-700 font-bold">摘要：</strong>
                          <span>{renderHighlightedText(item.abstract)}</span>
                        </div>

                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

            {/* BOTTOM PAGINATION BAR (仿佰腾网分页) */}
            <div className="bg-white p-3 rounded-md border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 text-slate-700 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={selectedPatents.length === filteredPatents.length && filteredPatents.length > 0}
                    onChange={handleSelectAll}
                    className="rounded text-blue-600" 
                  />
                  <span>全选</span>
                </label>

                <select className="border border-slate-300 rounded px-2 py-1 bg-slate-50 text-slate-700 text-xs cursor-pointer">
                  <option>100条/页</option>
                  <option>50条/页</option>
                  <option>20条/页</option>
                  <option>10条/页</option>
                </select>
              </div>

              {/* Page Number Buttons */}
              <div className="flex items-center gap-1">
                <button className="px-2 py-1 border border-slate-200 rounded text-slate-400 hover:bg-slate-50 cursor-not-allowed">
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button className="w-7 h-7 bg-blue-600 text-white font-bold rounded flex items-center justify-center">
                  1
                </button>
                <button className="w-7 h-7 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded flex items-center justify-center">
                  2
                </button>
                <button className="w-7 h-7 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded flex items-center justify-center">
                  3
                </button>
                <button className="w-7 h-7 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded flex items-center justify-center">
                  4
                </button>
                <button className="w-7 h-7 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded flex items-center justify-center">
                  5
                </button>
                <button className="w-7 h-7 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded flex items-center justify-center">
                  6
                </button>
                <span className="px-1 text-slate-400">...</span>
                <button className="w-7 h-7 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded flex items-center justify-center">
                  50
                </button>
                <button className="px-2 py-1 border border-slate-200 rounded text-slate-700 hover:bg-slate-50">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 5. FLOATING "AI小佰灵 2.0" AVATAR WIDGET (右下角智能助理) */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isAiDrawerOpen && (
          <button
            onClick={() => setIsAiDrawerOpen(true)}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-600 via-blue-600 to-pink-500 p-0.5 shadow-xl shadow-blue-500/30 group-hover:scale-110 transition-transform">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
                  {/* Avatar Icon */}
                  <div className="w-full h-full bg-gradient-to-br from-indigo-50 to-pink-50 flex items-center justify-center text-indigo-700 font-black text-xs">
                    👩‍💼
                  </div>
                </div>
              </div>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white font-mono text-[9px] font-bold px-1 rounded-full leading-none py-0.5 border border-white">
                2.0
              </span>
            </div>
            <span className="mt-1 px-2 py-0.5 bg-slate-900/80 text-white rounded-full text-[10px] font-bold shadow-md">
              AI小佰灵
            </span>
          </button>
        )}

        {/* AI Drawer Popover */}
        {isAiDrawerOpen && (
          <div className="w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-blue-200 overflow-hidden flex flex-col h-[460px] animate-in slide-in-from-bottom-5">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-base">
                  👩‍💼
                </div>
                <div>
                  <div className="font-bold text-xs flex items-center gap-1">
                    <span>AI 小佰灵 2.0</span>
                    <span className="px-1.5 py-0.2 bg-cyan-400 text-slate-900 text-[9px] rounded font-black">在线</span>
                  </div>
                  <div className="text-[10px] text-blue-200">吉林大学专利转化与技术对接专席</div>
                </div>
              </div>

              <button 
                onClick={() => setIsAiDrawerOpen(false)}
                className="text-white/80 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat conversation */}
            <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-slate-50 text-xs">
              {aiChatHistory.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-2.5 rounded-xl leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none shadow-xs'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-2xs'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Prompt suggestions */}
            <div className="p-2 bg-white border-t border-slate-100 flex flex-wrap gap-1 text-[11px]">
              <button
                onClick={() => handleSendAiMsg('如何把我的技术难题对接给吉林大学专家？')}
                className="px-2 py-1 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded cursor-pointer transition-colors"
              >
                💡 如何发布技术难题？
              </button>
              <button
                onClick={() => handleSendAiMsg('吉大有哪些高价值汽车与装备专利？')}
                className="px-2 py-1 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded cursor-pointer transition-colors"
              >
                🚗 汽车与装备重点专利
              </button>
            </div>

            {/* Input box */}
            <div className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                value={aiAssistantMsg}
                onChange={(e) => setAiAssistantMsg(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSendAiMsg(); }}
                placeholder="咨询专利转化、成果对接或技术需求..."
                className="flex-1 bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                onClick={() => handleSendAiMsg()}
                className="px-3 py-1.5 bg-blue-600 text-white font-bold rounded-lg text-xs hover:bg-blue-700 cursor-pointer shadow-xs"
              >
                发送
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
