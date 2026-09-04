import { UserRole } from '../types';
import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Briefcase, 
  CheckCircle, 
  Trash2, 
  Edit3, 
  X, 
  Building2, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Phone,
  Building,
  ShieldCheck,
  Check,
  Clock,
  MessageSquare,
  ArrowRight,
  User,
  Inbox
} from 'lucide-react';
import { UNPATENTED_TECH_LIST, UnpatentedTechItem } from '../data/unpatentedTechData';
import { useIntents } from '../context/IntentContext';

interface Props { 
  userRole: UserRole;
  onNavigateToIntentHub?: () => void;
}

const ITEMS_PER_PAGE = 6;

export const UNPATENTED_DOMAINS = [
  '环境与生态',
  '人工智能',
  '材料科学',
  '生物医药',
  '机械工程',
  '电子信息'
];

export const UnpatentedTechHub: React.FC<Props> = ({ userRole, onNavigateToIntentHub }) => {
  const isEnterprise = userRole === 'enterprise';
  const { intents, addIntent, getIntentsByTarget } = useIntents();

  const [techs, setTechs] = useState<UnpatentedTechItem[]>(UNPATENTED_TECH_LIST);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Add Form State
  const [formData, setFormData] = useState({ 
    title: '', 
    domain: UNPATENTED_DOMAINS[0], 
    desc: '', 
    contact: '', 
    team: '',
    status: 'seeking' as UnpatentedTechItem['status']
  });

  // Edit Tech State
  const [editingTech, setEditingTech] = useState<UnpatentedTechItem | null>(null);

  // Enterprise Docking Modal State
  const [dockingTech, setDockingTech] = useState<UnpatentedTechItem | null>(null);
  const [dockingFormData, setDockingFormData] = useState({
    companyName: '长春百克生物科技股份公司',
    contactPerson: '赵云海 (研发副总裁)',
    phone: '13843056789',
    email: 'zhaoyh@bcht.net',
    mode: '专有技术秘密独占许可与中试放大联合攻关',
    demandDesc: '希望就该专有技术的工程化参数及小试/中试放大数据进行深入技术对接与交流，拟共同申请省级重大科技成果转化专项。'
  });

  // Selected Tech for Viewing Intents (University Modal)
  const [viewingTechIntents, setViewingTechIntents] = useState<UnpatentedTechItem | null>(null);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };
  
  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const domainOptions = [
    { key: 'all', label: '全部领域' },
    ...UNPATENTED_DOMAINS.map(d => ({ key: d, label: d }))
  ];

  // University: Handle Add
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim() && formData.desc.trim()) {
      const newTech: UnpatentedTechItem = { 
        id: 'tech-' + Date.now(), 
        title: formData.title.trim(),
        domain: formData.domain,
        desc: formData.desc.trim(),
        contact: formData.contact.trim() || '吉林大学科研团队',
        team: formData.team.trim() || undefined,
        status: formData.status, 
        date: new Date().toISOString().split('T')[0] 
      };
      setTechs([newTech, ...techs]);
      setShowAddForm(false);
      setFormData({ 
        title: '', 
        domain: UNPATENTED_DOMAINS[0], 
        desc: '', 
        contact: '', 
        team: '',
        status: 'seeking'
      });
      showToast(`已成功发布非专利成果《${newTech.title.slice(0, 16)}...》！`);
    }
  };

  // University: Handle Edit Save
  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTech) return;
    setTechs(techs.map(t => t.id === editingTech.id ? editingTech : t));
    showToast(`已更新成果《${editingTech.title.slice(0, 14)}...》的档案信息与合作状态！`);
    setEditingTech(null);
  };

  // Quick Change Status (University role in card)
  const handleStatusChangeForTech = (techId: string, newStatus: UnpatentedTechItem['status'], e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setTechs(prev => prev.map(t => {
      if (t.id === techId) {
        return { ...t, status: newStatus };
      }
      return t;
    }));
    const statusName = newStatus === 'seeking' ? '寻求转化合作' : newStatus === 'negotiating' ? '商务洽谈中' : '已达成中试合作';
    showToast(`该成果合作状态已变更为【${statusName}】`);
  };

  // Enterprise: Submit Docking Intent (Sync to Global IntentContext)
  const handleDockingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dockingTech) return;

    // 1. Add to global intent system
    addIntent({
      targetType: 'unpatented',
      targetId: dockingTech.id,
      targetTitle: dockingTech.title,
      targetNo: dockingTech.id.toUpperCase(),
      domain: dockingTech.domain,
      inventorOrContact: `${dockingTech.contact}${dockingTech.team ? ' (' + dockingTech.team + ')' : ''}`,
      companyName: dockingFormData.companyName.trim(),
      contactPerson: dockingFormData.contactPerson.trim(),
      phone: dockingFormData.phone.trim(),
      email: dockingFormData.email.trim(),
      mode: dockingFormData.mode,
      demandDesc: dockingFormData.demandDesc.trim(),
      status: 'pending'
    });

    // 2. Automatically transition tech status to 'negotiating'
    setTechs(prev => prev.map(t => {
      if (t.id === dockingTech.id) {
        return { ...t, status: 'negotiating' };
      }
      return t;
    }));

    showToast(`已成功向【${dockingTech.contact}】团队提交对接申请！高校端已实时接收并可在【转化对接意向工作台】集中推进。`);
    setDockingTech(null);
  };

  // Filtered List
  const filteredTechs = useMemo(() => {
    return techs.filter(tech => {
      // Domain filter
      if (selectedDomain !== 'all' && tech.domain !== selectedDomain) return false;
      
      // Status filter
      if (selectedStatus !== 'all' && tech.status !== selectedStatus) return false;

      // Keyword query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = tech.title.toLowerCase().includes(q);
        const matchesDesc = tech.desc.toLowerCase().includes(q);
        const matchesDomain = tech.domain.toLowerCase().includes(q);
        const matchesContact = tech.contact.toLowerCase().includes(q);
        const matchesTeam = tech.team ? tech.team.toLowerCase().includes(q) : false;

        return matchesTitle || matchesDesc || matchesDomain || matchesContact || matchesTeam;
      }

      return true;
    });
  }, [techs, selectedDomain, selectedStatus, searchQuery]);

  // Pagination calculation
  const totalItems = filteredTechs.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  
  const paginatedTechs = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredTechs.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredTechs, safeCurrentPage]);

  // Handle Search Input with page reset
  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleDomainChange = (domain: string) => {
    setSelectedDomain(domain);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (status: string) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  const getStatusBadge = (status: UnpatentedTechItem['status']) => {
    switch (status) {
      case 'seeking':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            寻求转化合作
          </span>
        );
      case 'negotiating':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold rounded-md">
            <Clock className="w-3 h-3 text-amber-500" />
            商务洽谈中
          </span>
        );
      case 'cooperating':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-blue-50 text-[#0F52BA] border border-blue-200 text-xs font-bold rounded-md">
            <CheckCircle className="w-3 h-3 text-[#0F52BA]" />
            已达成中试合作
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2.5 text-sm font-medium animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-linear-to-r from-blue-50/80 via-indigo-50/40 to-slate-50 border border-blue-100 rounded-3xl p-6 shadow-xs">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/70 text-[#0F52BA] text-xs font-bold mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            专有技术秘密 / 实验室在研成果中试库
          </div>
          <h2 className="text-2xl font-black text-slate-900">
            非专利技术 / 专有成果管理
          </h2>
          <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
            汇聚吉林大学各重点实验室未公开申请专利的核心配方工艺、算法底座、中试熟化项目与在研成果。支持高校科研团队自主发布与成果状态流转，企业端可在线发起定向对接意向。
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {!isEnterprise && onNavigateToIntentHub && (
            <button
              onClick={onNavigateToIntentHub}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 text-[#0F52BA] border border-blue-200 rounded-xl font-bold hover:bg-blue-100 transition-colors shadow-xs text-xs cursor-pointer"
            >
              <Building2 className="w-4 h-4" />
              <span>查看全部企业对接意向 &rarr;</span>
            </button>
          )}

          {!isEnterprise && (
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#0F52BA] text-white rounded-xl font-bold hover:bg-[#082C6C] transition-colors shrink-0 shadow-sm cursor-pointer text-xs"
            >
              {showAddForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {showAddForm ? '收起发布面板' : '发布非专利技术/成果'}
            </button>
          )}
        </div>
      </div>

      {/* Positioned ABOVE search box: Add New Tech Form */}
      {showAddForm && (
        <div className="bg-linear-to-br from-blue-50/90 via-slate-50 to-white border border-blue-200 rounded-3xl p-6 relative animate-in fade-in slide-in-from-top-3 duration-200 shadow-sm">
          <button 
            onClick={() => setShowAddForm(false)} 
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 bg-white rounded-full shadow-xs cursor-pointer"
            title="关闭"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="mb-4">
            <h3 className="text-lg font-bold text-[#0F52BA] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#0F52BA]" />
              发布新的非专利成果 / 专有技术
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              录入尚未公开申请专利的实验室中试配方、核心工艺控制参数、专有算法底座等成果资产
            </p>
          </div>

          <form onSubmit={handleAdd} className="space-y-4 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <span className="text-rose-500">*</span>成果/技术名称
                </label>
                <input 
                  required 
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})} 
                  type="text" 
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:border-[#0F52BA] text-xs font-medium" 
                  placeholder="例如：一种新型高分子材料合成配方与中试发酵工艺" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <span className="text-rose-500">*</span>学科领域
                </label>
                <select 
                  value={formData.domain} 
                  onChange={e => setFormData({...formData, domain: e.target.value})} 
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:border-[#0F52BA] text-xs cursor-pointer font-medium" 
                >
                  {UNPATENTED_DOMAINS.map(domain => (
                    <option key={domain} value={domain}>{domain}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <span className="text-rose-500">*</span>主要研发专家及院系
                </label>
                <input 
                  required 
                  value={formData.contact} 
                  onChange={e => setFormData({...formData, contact: e.target.value})} 
                  type="text" 
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:border-[#0F52BA] text-xs font-medium" 
                  placeholder="例如：张教授 (材料科学与工程学院)" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">所属科研团队 / 实验室 (选填)</label>
                <input 
                  value={formData.team} 
                  onChange={e => setFormData({...formData, team: e.target.value})} 
                  type="text" 
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:border-[#0F52BA] text-xs font-medium" 
                  placeholder="例如：超硬材料国家重点实验室" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">初始合作状态</label>
                <select 
                  value={formData.status} 
                  onChange={e => setFormData({...formData, status: e.target.value as UnpatentedTechItem['status']})} 
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:border-[#0F52BA] text-xs cursor-pointer font-medium"
                >
                  <option value="seeking">寻求转化合作</option>
                  <option value="negotiating">商务洽谈中</option>
                  <option value="cooperating">已达成中试合作</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span><span className="text-rose-500">*</span>技术简介、应用场景及合作诉求 (脱敏描述)</span>
                <span className="text-[11px] text-amber-700 font-normal">请勿泄露需完全保密的核心工艺数值与配方秘诀</span>
              </label>
              <textarea 
                required 
                value={formData.desc} 
                onChange={e => setFormData({...formData, desc: e.target.value})} 
                rows={3} 
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:border-[#0F52BA] resize-none text-xs font-medium" 
                placeholder="简要描述技术机理、应用工况、技术优势及合作诉求..."
              />
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button 
                type="submit" 
                className="px-6 py-2.5 bg-[#0F52BA] hover:bg-[#082C6C] text-white rounded-xl font-bold shadow-sm cursor-pointer transition-colors text-xs flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                确认发布成果
              </button>
              <button 
                type="button" 
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl font-medium text-xs transition-colors cursor-pointer"
              >
                取消
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Clear Search & Multi-dimensional Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-slate-400" />
          </div>
          <input 
            type="text" 
            placeholder="搜索成果名称、技术特征、学科领域、研发专家或所属团队..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-300 focus:border-[#0F52BA] rounded-xl text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-blue-100 transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => handleSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              title="清空搜索"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Domain & Status Filtering Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
            <span className="text-xs font-bold text-slate-500 mr-1 shrink-0 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-[#0F52BA]" />
              学科领域：
            </span>
            {domainOptions.map(domain => (
              <button
                key={domain.key}
                onClick={() => handleDomainChange(domain.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedDomain === domain.key
                    ? 'bg-[#0F52BA] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {domain.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between md:justify-end gap-3 text-xs">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-slate-500 font-bold">合作状态：</span>
              <select
                value={selectedStatus}
                onChange={(e) => handleStatusFilterChange(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-medium text-slate-700 focus:outline-hidden focus:border-[#0F52BA] cursor-pointer"
              >
                <option value="all">全部状态</option>
                <option value="seeking">寻求转化合作</option>
                <option value="negotiating">商务洽谈中</option>
                <option value="cooperating">已达成中试合作</option>
              </select>
            </div>

            <div className="text-slate-500 shrink-0 font-medium">
              共筛选出 <strong className="text-[#0F52BA] font-bold font-mono">{totalItems}</strong> 项成果
            </div>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      {paginatedTechs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {paginatedTechs.map(tech => {
            const techIntents = getIntentsByTarget(tech.id);

            return (
              <div 
                key={tech.id} 
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-3 gap-2">
                    <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg shrink-0">
                      {tech.domain}
                    </span>
                    
                    {/* Status Badge */}
                    {getStatusBadge(tech.status)}
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 leading-snug mb-2 line-clamp-2 hover:text-[#0F52BA] transition-colors">
                    {tech.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-3">
                    {tech.desc}
                  </p>

                  {/* University view: Show received Enterprise Intents badge */}
                  {!isEnterprise && techIntents.length > 0 && (
                    <div 
                      onClick={() => setViewingTechIntents(tech)}
                      className="mb-3 bg-amber-50/80 hover:bg-amber-100/80 border border-amber-200 rounded-xl p-2.5 text-xs text-amber-900 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between font-bold text-[11px]">
                        <span className="flex items-center gap-1">
                          <Building className="w-3.5 h-3.5 text-amber-600" />
                          已收到 <strong className="text-amber-700 font-mono">{techIntents.length}</strong> 家企业对接意向
                        </span>
                        <span className="text-amber-700 flex items-center gap-0.5">
                          查看意向 <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600 truncate mt-1">
                        最新意向：{techIntents[0].companyName} ({techIntents[0].contactPerson})
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="pt-3.5 border-t border-slate-100">
                  <div className="text-xs text-slate-500 space-y-0.5 mb-3">
                    <div className="flex items-center gap-1 text-slate-800 font-semibold truncate">
                      <GraduationCap className="w-3.5 h-3.5 text-[#0F52BA] shrink-0" />
                      <span className="truncate">{tech.contact}</span>
                    </div>
                    {tech.team && (
                      <div className="text-[11px] text-slate-500 truncate pl-4.5">
                        {tech.team}
                      </div>
                    )}
                    <div className="text-[11px] text-slate-400 pl-4.5">
                      发布于 {tech.date}
                    </div>
                  </div>

                  {/* Role-based Action Buttons & Status Management */}
                  <div className="space-y-2">
                    {isEnterprise ? (
                      // Enterprise Side: Docking Button
                      <div>
                        {tech.status === 'seeking' && (
                          <button 
                            onClick={() => setDockingTech(tech)}
                            className="w-full flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            发起转化对接意向
                          </button>
                        )}
                        {tech.status === 'negotiating' && (
                          <button 
                            onClick={() => setDockingTech(tech)}
                            className="w-full flex items-center justify-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
                          >
                            <Clock className="w-3.5 h-3.5" />
                            洽谈中 · 追加意向沟通
                          </button>
                        )}
                        {tech.status === 'cooperating' && (
                          <button 
                            onClick={() => setDockingTech(tech)}
                            className="w-full flex items-center justify-center gap-1.5 px-4 py-2 bg-[#0F52BA] hover:bg-[#082C6C] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
                          >
                            <ShieldCheck className="w-3.5 h-3.5" />
                            已中试合作 · 申请衍生合作
                          </button>
                        )}
                      </div>
                    ) : (
                      // University Side: Full Management & Direct Status Selector
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
                          <span className="text-[11px] font-bold text-slate-600 pl-1">管理状态：</span>
                          <select
                            value={tech.status}
                            onChange={(e) => handleStatusChangeForTech(tech.id, e.target.value as UnpatentedTechItem['status'])}
                            className="text-xs font-bold bg-white border border-slate-200 rounded-lg px-2 py-1 text-slate-800 focus:outline-hidden focus:border-[#0F52BA] cursor-pointer"
                          >
                            <option value="seeking">🟢 寻求转化合作</option>
                            <option value="negotiating">🟡 商务洽谈中</option>
                            <option value="cooperating">🔵 已达成中试合作</option>
                          </select>
                        </div>

                        <div className="flex items-center justify-between pt-0.5">
                          <div className="flex gap-1.5">
                            <button 
                              onClick={() => setEditingTech(tech)}
                              className="flex items-center gap-1 px-2.5 py-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer text-xs font-medium" 
                              title="编辑成果"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              编辑
                            </button>
                            <button 
                              onClick={() => {
                                setTechs(techs.filter(t => t.id !== tech.id));
                                showToast('已从非专利成果库中移除该成果');
                              }}
                              className="flex items-center gap-1 px-2.5 py-1.5 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer text-xs font-medium"
                              title="下架成果"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              下架
                            </button>
                          </div>

                          {techIntents.length > 0 ? (
                            <button
                              onClick={() => setViewingTechIntents(tech)}
                              className="text-[11px] font-bold text-amber-700 hover:text-amber-800 bg-amber-50 px-2 py-1 rounded-md border border-amber-200 cursor-pointer"
                            >
                              查看企业意向 ({techIntents.length})
                            </button>
                          ) : (
                            <span className="text-[11px] text-slate-400">暂无意向</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-xs">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-slate-900 mb-1">未匹配到符合条件的非专利成果</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
            当前筛选条件下暂无成果，您可以尝试切换学科领域、更改合作状态或清除搜索关键词。
          </p>
          <button 
            onClick={() => {
              setSearchQuery('');
              setSelectedDomain('all');
              setSelectedStatus('all');
              setCurrentPage(1);
            }}
            className="px-4 py-2 bg-[#0F52BA] text-white rounded-xl text-xs font-bold hover:bg-[#082C6C] transition-colors cursor-pointer"
          >
            重置所有筛选条件
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="bg-white border border-slate-200 rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">
            显示第 <strong className="text-slate-900 font-bold">{(safeCurrentPage - 1) * ITEMS_PER_PAGE + 1}</strong> 至{' '}
            <strong className="text-slate-900 font-bold">{Math.min(safeCurrentPage * ITEMS_PER_PAGE, totalItems)}</strong> 项，
            共 <strong className="text-[#0F52BA] font-bold">{totalItems}</strong> 项成果
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={safeCurrentPage === 1}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                safeCurrentPage === 1 
                  ? 'bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed' 
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              上一页
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  safeCurrentPage === page
                    ? 'bg-[#0F52BA] text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={safeCurrentPage === totalPages}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                safeCurrentPage === totalPages 
                  ? 'bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed' 
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              下一页
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Enterprise Docking Modal */}
      {dockingTech && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 inline-block mb-1">
                  校企专有技术秘密对接通道
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  提交《非专利专有技术成果转化对接意向》
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  意向将直达【{dockingTech.contact}】研发团队及吉林大学科技开发中心专员。
                </p>
              </div>
              <button 
                onClick={() => setDockingTech(null)} 
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tech Brief */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-1">
              <div className="font-bold text-slate-900">{dockingTech.title}</div>
              <div className="text-slate-500 flex items-center gap-2">
                <span>领域：{dockingTech.domain}</span>
                <span>• 研发团队：{dockingTech.contact}</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleDockingSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    意向企业名称
                  </label>
                  <input 
                    required 
                    type="text"
                    value={dockingFormData.companyName}
                    onChange={e => setDockingFormData({...dockingFormData, companyName: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-hidden focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    拟合作模式
                  </label>
                  <select 
                    value={dockingFormData.mode}
                    onChange={e => setDockingFormData({...dockingFormData, mode: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-hidden focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="中试联合熟化攻关">中试联合熟化攻关</option>
                    <option value="专有技术秘密独占许可与中试放大">专有技术秘密独占许可与中试放大</option>
                    <option value="专有技术完全转让">专有技术完全转让</option>
                    <option value="作价入股与共建产业化公司">作价入股与共建产业化公司</option>
                    <option value="企业定向委托定制研发">企业定向委托定制研发</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">对接人姓名及职务</label>
                  <input 
                    required 
                    type="text"
                    value={dockingFormData.contactPerson}
                    onChange={e => setDockingFormData({...dockingFormData, contactPerson: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-hidden focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    联系电话 / 手机
                  </label>
                  <input 
                    required 
                    type="text"
                    value={dockingFormData.phone}
                    onChange={e => setDockingFormData({...dockingFormData, phone: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-hidden focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">电子邮箱</label>
                  <input 
                    type="email"
                    value={dockingFormData.email}
                    onChange={e => setDockingFormData({...dockingFormData, email: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-hidden focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">意向对接诉求与应用场景说明</label>
                <textarea 
                  required 
                  rows={3}
                  value={dockingFormData.demandDesc}
                  onChange={e => setDockingFormData({...dockingFormData, demandDesc: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-hidden focus:border-emerald-500 resize-none"
                />
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>保密与合规承诺：</strong>双方对接过程中涉及的未公开中试数据、配方机理及企业工艺需求受《中华人民共和国反不正当竞争法》商业秘密条款保护，平台将协助出具标准 NDA 保密协议。
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setDockingTech(null)}
                  className="px-4 py-2.5 border border-slate-300 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  取消
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  确认提交对接申请并进入洽谈
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* University: View Tech's Enterprise Intents Modal */}
      {viewingTechIntents && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200 inline-block mb-1">
                  企业意向清单
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  《{viewingTechIntents.title}》收到的企业对接申请
                </h3>
              </div>
              <button 
                onClick={() => setViewingTechIntents(null)} 
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {getIntentsByTarget(viewingTechIntents.id).map(intent => (
                <div key={intent.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">{intent.companyName}</span>
                    <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded text-[11px] font-bold">
                      {intent.status === 'pending' ? '待高校响应' : '洽谈跟进中'}
                    </span>
                  </div>
                  <div className="text-slate-600 flex items-center gap-3">
                    <span>对接人：<strong className="text-slate-800">{intent.contactPerson}</strong></span>
                    <span>电话：<strong className="text-slate-800 font-mono">{intent.phone}</strong></span>
                  </div>
                  <div className="text-slate-700">
                    <span className="font-bold">合作模式：</span>{intent.mode}
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-100 text-slate-800 leading-relaxed">
                    {intent.demandDesc}
                  </div>
                  <div className="text-[11px] text-slate-400 text-right">
                    提交时间：{intent.createdAt}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              {onNavigateToIntentHub ? (
                <button
                  onClick={() => {
                    setViewingTechIntents(null);
                    onNavigateToIntentHub();
                  }}
                  className="px-4 py-2 bg-[#0F52BA] text-white rounded-xl text-xs font-bold hover:bg-[#082C6C] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  进入转化对接意向工作台统一处置 &rarr;
                </button>
              ) : <div />}

              <button 
                onClick={() => setViewingTechIntents(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 cursor-pointer"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {/* University Edit Tech Modal */}
      {editingTech && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-[#0F52BA]" />
                  编辑非专利成果档案与合作状态
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  高校成果负责人可实时更新技术描述、团队信息以及合作进展状态
                </p>
              </div>
              <button 
                onClick={() => setEditingTech(null)} 
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSave} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">成果/技术名称</label>
                <input 
                  required 
                  type="text"
                  value={editingTech.title}
                  onChange={e => setEditingTech({...editingTech, title: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-hidden focus:border-[#0F52BA]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">学科领域</label>
                  <select 
                    value={editingTech.domain}
                    onChange={e => setEditingTech({...editingTech, domain: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-hidden focus:border-[#0F52BA] cursor-pointer"
                  >
                    {UNPATENTED_DOMAINS.map(domain => (
                      <option key={domain} value={domain}>{domain}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">当前合作状态</label>
                  <select 
                    value={editingTech.status}
                    onChange={e => setEditingTech({...editingTech, status: e.target.value as UnpatentedTechItem['status']})}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:outline-hidden focus:border-[#0F52BA] cursor-pointer"
                  >
                    <option value="seeking">🟢 寻求转化合作 (开放对接)</option>
                    <option value="negotiating">🟡 商务洽谈中 (已有意向企业)</option>
                    <option value="cooperating">🔵 已达成中试合作 (协议签署)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">主要研发专家及院系</label>
                  <input 
                    required 
                    type="text"
                    value={editingTech.contact}
                    onChange={e => setEditingTech({...editingTech, contact: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-hidden focus:border-[#0F52BA]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">所属科研团队 / 实验室</label>
                  <input 
                    type="text"
                    value={editingTech.team || ''}
                    onChange={e => setEditingTech({...editingTech, team: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-hidden focus:border-[#0F52BA]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">技术简介与优势 (脱敏描述)</label>
                <textarea 
                  required 
                  rows={4}
                  value={editingTech.desc}
                  onChange={e => setEditingTech({...editingTech, desc: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-hidden focus:border-[#0F52BA] resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setEditingTech(null)}
                  className="px-4 py-2.5 border border-slate-300 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  取消
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2.5 bg-[#0F52BA] hover:bg-[#082C6C] text-white rounded-xl text-xs font-bold shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  保存修改
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
