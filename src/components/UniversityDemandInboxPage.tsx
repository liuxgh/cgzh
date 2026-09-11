import React, { useState, useMemo, useEffect } from 'react';
import { 
  Building2, 
  Lock, 
  Send, 
  GraduationCap, 
  Search, 
  Filter, 
  Sparkles, 
  Check, 
  Eye, 
  FileText,
  Tag,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RefreshCw,
  UserPlus,
  Compass,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Calendar,
  DollarSign,
  Cpu,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Phone,
  User,
  Copy,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  ArrowUpRight
} from 'lucide-react';
import { ConfidentialEnterpriseDemand, UniversityFeedback, PatentItem } from '../types';
import { TechDetailPage, TechDetailData } from './TechDetailPage';
import { mapPatentToTechDetail } from '../utils/techDetailMapper';
import { matchPatentsForDemandText } from './ConfidentialDemandPublishPage';

interface UniversityDemandInboxPageProps {
  demands: ConfidentialEnterpriseDemand[];
  onUpdateDemand: (updatedDemand: ConfidentialEnterpriseDemand) => void;
}

export const UniversityDemandInboxPage: React.FC<UniversityDemandInboxPageProps> = ({
  demands,
  onUpdateDemand
}) => {
  // Navigation View: 'list' | 'detail' | 'feedback'
  const [currentView, setCurrentView] = useState<'list' | 'detail' | 'feedback'>('list');
  const [activeDemandId, setActiveDemandId] = useState<string | null>(null);

  // Full-page Tech Detail View (No popups, standard full page like TechSearchHub)
  const [selectedTechForDetail, setSelectedTechForDetail] = useState<TechDetailData | null>(null);

  // Collapsible patents state in table view (default collapsed)
  const [expandedDemandPatents, setExpandedDemandPatents] = useState<Set<string>>(new Set());

  const toggleExpandPatents = (demandId: string) => {
    setExpandedDemandPatents(prev => {
      const next = new Set(prev);
      if (next.has(demandId)) {
        next.delete(demandId);
      } else {
        next.add(demandId);
      }
      return next;
    });
  };

  const handleOpenTechDetail = (patent: PatentItem) => {
    const techData = mapPatentToTechDetail(patent);
    setSelectedTechForDetail(techData);
  };

  // Filters for table view
  const [filterType, setFilterType] = useState<'all' | 'alumni' | 'pending' | 'feedback_provided'>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Copy state
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Streamlined Feedback Form State
  const [feedbackCollege, setFeedbackCollege] = useState('');
  const [expertName, setExpertName] = useState('');
  const [expertTitle, setExpertTitle] = useState('');
  const [solutionText, setSolutionText] = useState('');
  const [timelineText, setTimelineText] = useState('3-6个月');
  const [officerPhone, setOfficerPhone] = useState('0431-85168892 (科技开发中心)');
  const [isGeneratingAiPlan, setIsGeneratingAiPlan] = useState(false);

  // Active demand object
  const activeDemand = useMemo(() => {
    return demands.find(d => d.id === activeDemandId) || null;
  }, [demands, activeDemandId]);

  // Extract all available AI tags across demands
  const allAiTags = useMemo(() => {
    const tagSet = new Set<string>();
    demands.forEach(d => {
      if (d.aiTags && d.aiTags.length > 0) {
        d.aiTags.forEach(t => tagSet.add(t));
      }
    });
    return Array.from(tagSet);
  }, [demands]);

  // Extract all industries
  const allIndustries = useMemo(() => {
    const indSet = new Set<string>();
    demands.forEach(d => {
      if (d.industry) indSet.add(d.industry);
    });
    return Array.from(indSet);
  }, [demands]);

  // Copy helper
  const handleCopy = (text: string, key: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  // Open detail page
  const handleViewDetail = (demand: ConfidentialEnterpriseDemand) => {
    setActiveDemandId(demand.id);
    setCurrentView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open feedback page
  const handleOpenFeedback = (demand: ConfidentialEnterpriseDemand) => {
    setActiveDemandId(demand.id);
    if (demand.universityFeedback) {
      setFeedbackCollege(demand.universityFeedback.assignedCollege);
      setExpertName(demand.universityFeedback.matchedExperts[0]?.name || '');
      setExpertTitle(demand.universityFeedback.matchedExperts[0]?.title || '教授 / 博士生导师');
      setSolutionText(demand.universityFeedback.proposedSolution);
      setTimelineText(demand.universityFeedback.estimatedTimeline || '3-6个月');
      setOfficerPhone(demand.universityFeedback.contactOfficer?.phone || '0431-85168892 (科技开发中心)');
    } else {
      if (demand.industry.includes('汽车') || demand.alumniInfo?.graduatedCollege?.includes('汽车')) {
        setFeedbackCollege('汽车工程学院 / 汽车仿真与控制国家重点实验室');
        setExpertName('高镇海');
        setExpertTitle('教授 / 博士生导师 / 院长');
        setSolutionText('推荐采用吉大自研全温域黏温自适应补偿控制模型，依托重点实验室台架开展HIL联合标定与测试。');
      } else if (demand.industry.includes('智能') || demand.industry.includes('计算') || demand.industry.includes('视觉')) {
        setFeedbackCollege('计算机科学与技术学院 / 符号计算与知识工程教育部重点实验室');
        setExpertName('杨博');
        setExpertTitle('教授 / 博士生导师 / 重点实验室主任');
        setSolutionText('提供吉大轻量化工业视觉质检算法套件，做自适应迁移学习与模型剪枝，两周内输出基准SDK。');
      } else if (demand.industry.includes('医') || demand.industry.includes('药')) {
        setFeedbackCollege('化学学院 & 白求恩医学部药学院');
        setExpertName('刘堃');
        setExpertTitle('教授 / 国家杰青 / 团队带头人');
        setSolutionText('依托超分子结构与材料国家重点实验室，定制开发靶向自裂解Linker分子并完成公斤级合成工艺开发。');
      } else {
        setFeedbackCollege('无机合成与制备化学国家重点实验室 / 化学学院');
        setExpertName('于吉红');
        setExpertTitle('中国科学院院士 / 教授');
        setSolutionText('采用多级深冷精馏结合分子筛络合吸附提纯工艺，提供中试级制备工艺包与检测方法。');
      }
      setTimelineText('3-6个月');
      setOfficerPhone('0431-85168892 (科技开发中心)');
    }
    setCurrentView('feedback');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // AI Assistance: One-click generate/refine university response proposal
  const handleAiGenerateProposal = () => {
    if (!activeDemand) return;
    setIsGeneratingAiPlan(true);
    setTimeout(() => {
      const d = activeDemand;
      setSolutionText(
        `【AI 智能匹配方案】针对企业「${d.demandTitle}」核心痛点，建议依托我校【${feedbackCollege || '对口国家重点实验室'}】科研优势：\n` +
        `1. 开展定向关键技术联合攻关，攻坚核心工艺参数；\n` +
        `2. 开放国家级科研台架开展实验标定与样件试制；\n` +
        `3. 安排对口专责专家团队与企业技术骨干召开闭门技术交底会。`
      );
      setIsGeneratingAiPlan(false);
    }, 450);
  };

  // Save feedback
  const handleSaveFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeDemand) return;

    const newFeedback: UniversityFeedback = {
      id: `fb-${Date.now()}`,
      feedbackTime: new Date().toLocaleString('zh-CN', { hour12: false }) + ' (科技开发中心出具)',
      officerName: '吉大科技开发中心专员',
      assignedCollege: feedbackCollege.trim(),
      matchedExperts: [
        {
          name: expertName.trim() || '高镇海',
          title: expertTitle.trim() || '教授 / 博士生导师',
          field: activeDemand.industry,
          college: feedbackCollege.split('/')[0].trim()
        }
      ],
      feasibilityAssessment: `经科技开发中心专家组研判，该需求与我校科研团队储备高度契合。`,
      proposedSolution: solutionText.trim(),
      estimatedTimeline: timelineText.trim(),
      nextStepAction: '科技开发中心已指派技术转移专员协同专家与企业安排点对点闭门对接。',
      contactOfficer: {
        name: '吉大技术转移专员',
        phone: officerPhone.trim(),
        email: 'ttc@jlu.edu.cn',
        office: '吉林大学中心校区鼎新楼'
      }
    };

    const updatedDemand: ConfidentialEnterpriseDemand = {
      ...activeDemand,
      status: 'feedback_provided',
      universityFeedback: newFeedback
    };

    onUpdateDemand(updatedDemand);
    // Back to detail view to see results
    setCurrentView('detail');
  };

  // Filter demands logic
  const filteredDemands = demands.filter(d => {
    if (filterType === 'alumni' && !d.isAlumniEnterprise) return false;
    if (filterType === 'pending' && d.status !== 'pending_review' && d.status !== 'assigned_expert') return false;
    if (filterType === 'feedback_provided' && d.status !== 'feedback_provided' && d.status !== 'in_dialogue') return false;

    if (selectedTag !== 'all') {
      if (!d.aiTags || !d.aiTags.includes(selectedTag)) return false;
    }

    if (selectedIndustry !== 'all') {
      if (d.industry !== selectedIndustry) return false;
    }
    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchCompany = d.companyName.toLowerCase().includes(q);
      const matchTitle = d.demandTitle.toLowerCase().includes(q);
      const matchIndustry = d.industry.toLowerCase().includes(q);
      const matchTag = d.aiTags?.some(t => t.toLowerCase().includes(q));
      const matchAlumni = d.alumniInfo?.alumniName?.toLowerCase().includes(q) || d.alumniInfo?.graduatedCollege?.toLowerCase().includes(q);
      return matchCompany || matchTitle || matchIndustry || matchTag || matchAlumni;
    }
    return true;
  });

  // Pagination state for demands list
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  // Reset to page 1 when filters or search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filterType, selectedTag, selectedIndustry, searchQuery]);

  const totalPages = Math.ceil(filteredDemands.length / pageSize) || 1;
  const paginatedDemands = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredDemands.slice(start, start + pageSize);
  }, [filteredDemands, currentPage, pageSize]);

  const alumniCount = demands.filter(d => d.isAlumniEnterprise).length;
  const pendingCount = demands.filter(d => d.status === 'pending_review' || d.status === 'assigned_expert').length;
  const feedbackCount = demands.filter(d => d.status === 'feedback_provided' || d.status === 'in_dialogue').length;

  // =========================================================================
  // VIEW 0: 科技成果全景详情页 (Full Page View)
  // =========================================================================
  if (selectedTechForDetail) {
    return (
      <TechDetailPage
        tech={selectedTechForDetail}
        onBack={() => setSelectedTechForDetail(null)}
        onBookDocking={() => {
          setSelectedTechForDetail(null);
          setCurrentView('feedback');
        }}
      />
    );
  }

  // =========================================================================
  // VIEW 1: 详情全页面 (Detail Full Page)
  // =========================================================================
  if (currentView === 'detail' && activeDemand) {
    const detailMatchedPatents = activeDemand.aiMatchedPatents && activeDemand.aiMatchedPatents.length > 0 
      ? activeDemand.aiMatchedPatents 
      : matchPatentsForDemandText(activeDemand.demandTitle, activeDemand.currentBottleneck, activeDemand.industry);

    return (
      <div className="space-y-6 animate-in fade-in duration-300 w-full max-w-7xl mx-auto">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentView('list')}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200 flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-500" />
            <span>返回需求清单</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleOpenFeedback(activeDemand)}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
              <span>{activeDemand.universityFeedback ? '编辑高校专家方案' : '出具高校专家方案'}</span>
            </button>
          </div>
        </div>

        {/* Top Header Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {activeDemand.isAlumniEnterprise && (
              <span className="px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-300 rounded-md font-bold text-xs flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
                <span>吉大校友企业</span>
              </span>
            )}
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md font-bold text-xs flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-600" />
              <span>点对点保密</span>
            </span>
            <span className="text-xs text-slate-400">单号: {activeDemand.id}</span>
            <span className="text-xs text-slate-400">发布时间: {activeDemand.createdAt}</span>
          </div>

          <div>
            <h1 className="text-2xl font-black text-slate-900 leading-snug">
              {activeDemand.demandTitle}
            </h1>
          </div>

          {/* Enterprise & High-Contrast Contact Card (高亮联系人与联系电话 + 一键复制, 已去掉研发预算) */}
          <div className="bg-gradient-to-r from-blue-50/90 via-indigo-50/60 to-slate-50 border-2 border-blue-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-blue-200/70 mb-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-700" />
                <span className="text-xs font-black text-blue-950 uppercase tracking-wide">发布企业与联系人信息</span>
              </div>
              <span className="text-xs font-bold text-blue-800 bg-white/80 px-2.5 py-0.5 rounded-full border border-blue-200">
                {activeDemand.industry}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block mb-0.5 font-medium">企业全称</span>
                <span className="font-extrabold text-slate-900 text-sm">{activeDemand.companyName}</span>
                <span className="text-slate-400 block text-[11px] mt-0.5">{activeDemand.region || '国内重点产业园区'}</span>
              </div>

              {/* Contact Person (High visibility) */}
              <div className="bg-white p-2.5 rounded-xl border border-blue-300/80 shadow-2xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-blue-900 font-bold flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-blue-600" />
                    <span>对接联系人</span>
                  </span>
                  <button
                    onClick={(e) => handleCopy(activeDemand.contactName, 'contactName', e)}
                    className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1 rounded transition-colors text-[10px] font-bold flex items-center gap-0.5 cursor-pointer"
                    title="复制联系人"
                  >
                    {copiedKey === 'contactName' ? (
                      <span className="text-emerald-600 flex items-center gap-0.5 font-bold">
                        <Check className="w-3 h-3" /> 已复制
                      </span>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" /> 复制
                      </>
                    )}
                  </button>
                </div>
                <div className="font-black text-slate-900 text-sm bg-blue-50/50 px-2 py-0.5 rounded">
                  {activeDemand.contactName}
                </div>
              </div>

              {/* Contact Phone (High visibility) */}
              <div className="bg-white p-2.5 rounded-xl border-2 border-emerald-400 shadow-2xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-emerald-950 font-bold flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>联系手机电话</span>
                  </span>
                  <button
                    onClick={(e) => handleCopy(activeDemand.contactPhone, 'contactPhone', e)}
                    className="text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50 p-1 rounded transition-colors text-[10px] font-bold flex items-center gap-0.5 cursor-pointer"
                    title="复制电话号码"
                  >
                    {copiedKey === 'contactPhone' ? (
                      <span className="text-emerald-700 flex items-center gap-0.5 font-bold">
                        <Check className="w-3 h-3" /> 已复制
                      </span>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" /> 复制
                      </>
                    )}
                  </button>
                </div>
                <div className="font-black text-emerald-900 text-sm tracking-wide bg-emerald-50/80 px-2 py-0.5 rounded font-mono">
                  {activeDemand.contactPhone}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI 靶向匹配：吉林大学适配科技成果推荐 (关联科研成果库) */}
        <div className="bg-slate-900 rounded-2xl p-5 text-white space-y-3.5 shadow-sm">
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-bold text-white">
                AI 自动匹配：吉林大学适配科技成果推荐（共 {detailMatchedPatents.length} 项成果）
              </span>
            </div>
            <span className="text-xs text-slate-400">
              点击「查看成果」可直接查阅成果全景信息与转化建议
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {detailMatchedPatents.map((pat) => (
              <div 
                key={pat.id}
                className="bg-white/10 hover:bg-white/15 border border-white/10 hover:border-blue-400/50 rounded-xl p-3.5 flex flex-col justify-between space-y-2.5 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono text-blue-200">{pat.patentNo}</span>
                    <span className="text-slate-400">TRL {pat.trlLevel}级</span>
                  </div>
                  <h4 className="font-bold text-xs text-white line-clamp-2 leading-snug">
                    {pat.title}
                  </h4>
                  <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                    {pat.abstract}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 truncate pr-1">
                    {pat.inventor} · {pat.fieldName}
                  </span>
                  <button
                    onClick={() => handleOpenTechDetail(pat)}
                    className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-md text-xs flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                  >
                    <span>查看成果</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI 需求速读与价值摘要 */}
        <div className="bg-gradient-to-br from-purple-50/90 via-indigo-50/50 to-blue-50/60 border border-purple-200/90 rounded-2xl p-5 text-xs space-y-3 shadow-xs">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="font-black text-purple-950 flex items-center gap-2 text-sm">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>AI 需求速读与转化价值摘要</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {activeDemand.aiTags?.map(tag => (
                <span key={tag} className="px-2.5 py-0.5 bg-white/90 text-purple-900 border border-purple-200 rounded-md text-[11px] font-bold">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-700 pt-1">
            <div className="bg-white/95 p-3 rounded-xl border border-purple-100/90 space-y-1">
              <span className="text-slate-500 font-bold block text-[11px]">核心攻关难点：</span>
              <p className="font-bold text-slate-900 text-xs leading-relaxed">
                {activeDemand.aiSummary?.coreChallenge || activeDemand.currentBottleneck}
              </p>
            </div>

            <div className="bg-white/95 p-3 rounded-xl border border-purple-100/90 space-y-1">
              <span className="text-slate-500 font-bold block text-[11px]">期望目标指标：</span>
              <p className="font-bold text-slate-900 text-xs leading-relaxed">
                {activeDemand.aiSummary?.targetMetric || activeDemand.targetSpecs || '攻克核心技术卡点并满足产业化量产规范'}
              </p>
            </div>

            <div className="bg-white/95 p-3 rounded-xl border border-purple-100/90 space-y-1">
              <span className="text-slate-500 font-bold block text-[11px]">推荐对口学院 / 重点实验室：</span>
              <p className="font-black text-blue-900 text-xs">
                {activeDemand.aiSummary?.recommendedField || activeDemand.industry}
              </p>
            </div>

            <div className="bg-white/95 p-3 rounded-xl border border-purple-100/90 space-y-1">
              <span className="text-slate-500 font-bold block text-[11px]">转化商业价值预估：</span>
              <p className="font-bold text-emerald-800 text-xs">
                {activeDemand.aiSummary?.commercialValue || `研发经费约 ${activeDemand.budget}`}
              </p>
            </div>
          </div>
        </div>

        {/* 校友企业档案 (如有) */}
        {activeDemand.isAlumniEnterprise && activeDemand.alumniInfo && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50/50 border border-amber-200 rounded-2xl p-5 text-xs space-y-2 shadow-xs">
            <div className="font-black text-amber-950 flex items-center gap-2 text-sm">
              <GraduationCap className="w-4 h-4 text-amber-600" />
              <span>吉林大学校友档案核验信息</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-700 pt-1">
              <div>校友姓名：<span className="font-black text-slate-900">{activeDemand.alumniInfo.alumniName}</span></div>
              <div>企业职务：<span className="font-black text-slate-900">{activeDemand.alumniInfo.alumniPosition}</span></div>
              <div>母校院系：<span className="font-black text-slate-900">{activeDemand.alumniInfo.graduatedCollege}</span></div>
              <div>毕业届别：<span className="font-black text-slate-900">{activeDemand.alumniInfo.graduationYear}</span></div>
              <div className="sm:col-span-2">所属分会：<span className="font-bold text-slate-900">{activeDemand.alumniInfo.alumniAssociation}</span></div>
              <div className="sm:col-span-2">学位背景：<span className="font-bold text-slate-900">{activeDemand.alumniInfo.studentIdOrDegree || '本硕博校友'}</span></div>
            </div>
          </div>
        )}

        {/* 原始需求详情描述 */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <span>企业原始技术难题与参数指标描述</span>
          </h3>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs space-y-3">
            <div>
              <span className="text-slate-500 font-bold block mb-1">工艺卡点与技术难题描述：</span>
              <p className="text-slate-800 leading-relaxed font-medium whitespace-pre-line text-sm">
                {activeDemand.currentBottleneck}
              </p>
            </div>

            {activeDemand.targetSpecs && (
              <div className="pt-3 border-t border-slate-200">
                <span className="text-slate-500 font-bold block mb-1">补充关键指标要求：</span>
                <p className="text-slate-800 leading-relaxed font-medium">{activeDemand.targetSpecs}</p>
              </div>
            )}
          </div>
        </div>

        {/* 已出具的高校方案 (如有) */}
        {activeDemand.universityFeedback && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50/40 border border-blue-200 rounded-2xl p-6 shadow-xs space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-blue-200">
              <div className="flex items-center gap-2 font-black text-blue-950 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>已出具吉大官方承接方案</span>
              </div>
              <span className="text-[11px] text-blue-600 font-medium">
                {activeDemand.universityFeedback.feedbackTime}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <span className="text-slate-500 block mb-0.5">承接学院 / 重点实验室：</span>
                <span className="font-bold text-slate-900">{activeDemand.universityFeedback.assignedCollege}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">主责专家团队：</span>
                <span className="font-bold text-slate-900">
                  {activeDemand.universityFeedback.matchedExperts.map(e => `${e.name} (${e.title.split('/')[0]})`).join('、')}
                </span>
              </div>
            </div>

            <div className="bg-white/90 p-3.5 rounded-xl border border-blue-200 space-y-1">
              <span className="text-blue-900 font-bold block">拟定攻关路径方案：</span>
              <p className="text-slate-800 leading-relaxed font-medium whitespace-pre-line text-xs">
                {activeDemand.universityFeedback.proposedSolution}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-slate-600 pt-1">
              <div>预计攻关周期：<span className="font-bold text-slate-900">{activeDemand.universityFeedback.estimatedTimeline}</span></div>
              <div className="text-blue-900 font-bold flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-blue-200">
                <span>联络专员：</span>
                <span className="font-mono text-slate-900">{activeDemand.universityFeedback.contactOfficer?.phone}</span>
                {activeDemand.universityFeedback.contactOfficer?.phone && (
                  <button
                    onClick={(e) => handleCopy(activeDemand.universityFeedback!.contactOfficer.phone, 'officer_phone', e)}
                    className="p-1 text-slate-400 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors cursor-pointer"
                    title="复制专员电话"
                  >
                    {copiedKey === 'officer_phone' ? (
                      <span className="text-emerald-600 flex items-center gap-0.5 text-[10px] font-bold">
                        <Check className="w-3 h-3" /> 已复制
                      </span>
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setCurrentView('list')}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
          >
            返回列表
          </button>

          <button
            onClick={() => handleOpenFeedback(activeDemand)}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-cyan-200" />
            <span>{activeDemand.universityFeedback ? '编辑修改专家反馈方案' : '立即出具专家反馈方案'}</span>
          </button>
        </div>

      </div>
    );
  }

  // =========================================================================
  // VIEW 2: 编辑/出具高校反馈全页面 (Feedback Full Page)
  // =========================================================================
  if (currentView === 'feedback' && activeDemand) {
    return (
      <div className="space-y-6 animate-in fade-in duration-300 w-full max-w-7xl mx-auto">
        
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentView('detail')}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200 flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-500" />
            <span>返回需求详情</span>
          </button>

          <span className="text-xs text-slate-500 font-medium">
            对标需求: {activeDemand.demandTitle.slice(0, 20)}...
          </span>
        </div>

        {/* Feedback form container */}
        <div className="max-w-4xl mx-auto">

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          
          <div className="pb-4 border-b border-slate-200">
            <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <span>出具吉林大学专家承接与评估方案</span>
              <span className="text-xs font-normal text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                极简反馈
              </span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              企业：{activeDemand.companyName} | 单号：{activeDemand.id}
            </p>
          </div>

          {/* High-Contrast Contact Bar in Feedback Page (高亮联系人电话 + 复制) */}
          <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-3.5 text-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-700" />
              <span className="font-bold text-slate-900">{activeDemand.companyName}</span>
            </div>

            <div className="flex items-center gap-4">
              {/* Contact Person */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500">对接人:</span>
                <span className="font-extrabold text-blue-900 bg-white px-2 py-0.5 rounded border border-blue-200">
                  {activeDemand.contactName}
                </span>
                <button
                  type="button"
                  onClick={(e) => handleCopy(activeDemand.contactName, 'fb_contactName', e)}
                  className="text-blue-600 hover:text-blue-800 text-[10px] font-bold p-0.5 cursor-pointer"
                  title="复制联系人"
                >
                  {copiedKey === 'fb_contactName' ? <Check className="w-3 h-3 text-emerald-600 inline" /> : <Copy className="w-3 h-3 inline" />}
                </button>
              </div>

              {/* Contact Phone */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500">电话:</span>
                <span className="font-extrabold text-emerald-900 bg-white px-2 py-0.5 rounded border border-emerald-300 font-mono">
                  {activeDemand.contactPhone}
                </span>
                <button
                  type="button"
                  onClick={(e) => handleCopy(activeDemand.contactPhone, 'fb_contactPhone', e)}
                  className="text-emerald-700 hover:text-emerald-900 text-[10px] font-bold p-0.5 cursor-pointer"
                  title="复制电话"
                >
                  {copiedKey === 'fb_contactPhone' ? <Check className="w-3 h-3 text-emerald-600 inline" /> : <Copy className="w-3 h-3 inline" />}
                </button>
              </div>
            </div>
          </div>

          <form onSubmit={handleSaveFeedback} className="space-y-5 text-xs">
            
            {/* 院系与主责专家 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-800 font-bold block mb-1.5">对口承接院系 / 重点实验室 *</label>
                <input
                  type="text"
                  required
                  value={feedbackCollege}
                  onChange={(e) => setFeedbackCollege(e.target.value)}
                  placeholder="如：汽车工程学院 / 汽车仿真与控制国家重点实验室"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-blue-400 focus:outline-none text-xs"
                />
              </div>

              <div>
                <label className="text-slate-800 font-bold block mb-1.5">主责专家 / 教授姓名与职称 *</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    value={expertName}
                    onChange={(e) => setExpertName(e.target.value)}
                    placeholder="如：高镇海"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-blue-400 focus:outline-none text-xs"
                  />
                  <input
                    type="text"
                    value={expertTitle}
                    onChange={(e) => setExpertTitle(e.target.value)}
                    placeholder="教授 / 博士生导师"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-blue-400 focus:outline-none text-xs"
                  />
                </div>
              </div>
            </div>

            {/* 攻关方案与 AI 辅助 */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-slate-800 font-bold text-xs">拟定攻关路径与方案建议 *</label>
                <button
                  type="button"
                  onClick={handleAiGenerateProposal}
                  disabled={isGeneratingAiPlan}
                  className="px-3 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold rounded-lg text-xs border border-purple-200 flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                >
                  <Sparkles className={`w-3.5 h-3.5 text-purple-600 ${isGeneratingAiPlan ? 'animate-spin' : ''}`} />
                  <span>{isGeneratingAiPlan ? 'AI 正在梳理方案...' : 'AI 辅助生成方案'}</span>
                </button>
              </div>

              <textarea
                required
                rows={6}
                value={solutionText}
                onChange={(e) => setSolutionText(e.target.value)}
                placeholder="填写专家初步评估意见、建议攻关路径、技术路线或样件测试安排..."
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 font-medium resize-none focus:ring-2 focus:ring-blue-400 focus:outline-none leading-relaxed text-xs"
              />
            </div>

            {/* 周期与科技开发中心电话 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-800 font-bold block mb-1.5">预计攻关周期</label>
                <input
                  type="text"
                  value={timelineText}
                  onChange={(e) => setTimelineText(e.target.value)}
                  placeholder="如：3 - 6 个月"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 font-medium text-xs"
                />
              </div>

              <div>
                <label className="text-slate-800 font-bold block mb-1.5">科技开发中心对接专员与电话</label>
                <input
                  type="text"
                  value={officerPhone}
                  onChange={(e) => setOfficerPhone(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 font-medium text-xs"
                />
              </div>
            </div>

            {/* Submit buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setCurrentView('detail')}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                取消
              </button>

              <button
                type="submit"
                className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>正式反馈给企业</span>
              </button>
            </div>

          </form>

        </div>
        </div>

      </div>
    );
  }

  // =========================================================================
  // VIEW 3: 默认企业保密需求清单列表表格 (Table List View)
  // =========================================================================
  return (
    <div className="space-y-5 animate-in fade-in duration-300 w-full max-w-7xl mx-auto">
      
      {/* 1. 高校端 Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            企业需求清单
            <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
              共 {demands.length} 项有效需求
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            企业直接加密投递的真实研发痛点与技术攻关清单，AI已自动解析生成核心标签与需求摘要。
          </p>
        </div>

        {/* Quick Stats Pill Group */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs whitespace-nowrap">
            <span className="text-slate-500">待反馈: </span>
            <span className="font-extrabold text-blue-600">{pendingCount}</span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 whitespace-nowrap">
            <span className="text-amber-700">校友企业: </span>
            <span className="font-extrabold text-amber-800">{alumniCount}</span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200/80 text-xs text-emerald-900 whitespace-nowrap">
            <span className="text-emerald-700">已出方案: </span>
            <span className="font-extrabold text-emerald-800">{feedbackCount}</span>
          </div>
        </div>
      </div>

      {/* 2. 筛选组件 (AI自动打标签筛选 + 状态 + 行业 + 关键词) */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
        
        {/* Top filter row: Main status tabs + Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterType === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              全部需求 ({demands.length})
            </button>

            <button
              onClick={() => setFilterType('alumni')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                filterType === 'alumni'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>校友企业 ({alumniCount})</span>
            </button>

            <button
              onClick={() => setFilterType('pending')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterType === 'pending'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              待专家承接 ({pendingCount})
            </button>

            <button
              onClick={() => setFilterType('feedback_provided')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterType === 'feedback_provided'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              已出具方案 ({feedbackCount})
            </button>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索企业、技术、AI标签、联系人..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
          </div>
        </div>

        {/* AI Auto-Generated Tags Filter Bar */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-500 font-bold flex items-center gap-1 shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>AI 自动标签：</span>
          </span>

          <button
            onClick={() => setSelectedTag('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              selectedTag === 'all'
                ? 'bg-purple-100 text-purple-900 font-bold border border-purple-300'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            全部标签
          </button>

          {allAiTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? 'all' : tag)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedTag === tag
                  ? 'bg-purple-600 text-white font-bold shadow-2xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-purple-50 hover:text-purple-700 border border-slate-200'
              }`}
            >
              #{tag}
            </button>
          ))}

          {/* Industry dropdown */}
          <div className="ml-auto flex items-center gap-1 text-slate-500 text-xs">
            <span>行业：</span>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 text-xs text-slate-700 font-medium focus:outline-none"
            >
              <option value="all">全行业领域</option>
              {allIndustries.map(ind => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>
        </div>

      </div>

      {/* 3. 表格视图 (Table Layout) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-bold">
                <th className="py-3.5 px-4 w-12 text-center whitespace-nowrap">#</th>
                <th className="py-3.5 px-4 min-w-[260px]">技术需求课题 / 痛点</th>
                <th className="py-3.5 px-4 min-w-[160px]">发布企业</th>
                <th className="py-3.5 px-4 min-w-[200px] whitespace-nowrap">企业联系人 / 电话 (可复制)</th>
                <th className="py-3.5 px-4 w-44 text-center whitespace-nowrap">AI 靶向适配成果</th>
                <th className="py-3.5 px-4 w-32 whitespace-nowrap">状态</th>
                <th className="py-3.5 px-4 w-36 text-center whitespace-nowrap">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredDemands.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <div className="space-y-2">
                      <FileText className="w-8 h-8 mx-auto text-slate-300" />
                      <div className="font-bold text-slate-600">未找到符合条件的企业技术需求</div>
                      <p className="text-[11px]">可尝试切换筛选条件或搜索关键词</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedDemands.map((demand, index) => {
                  const itemIndex = (currentPage - 1) * pageSize + index + 1;
                  const hasFeedback = !!demand.universityFeedback;
                  const isExpanded = expandedDemandPatents.has(demand.id);
                  const matchedPatents = demand.aiMatchedPatents && demand.aiMatchedPatents.length > 0
                    ? demand.aiMatchedPatents
                    : matchPatentsForDemandText(demand.demandTitle, demand.currentBottleneck, demand.industry);

                  return (
                    <React.Fragment key={demand.id}>
                      <tr 
                        className={`hover:bg-blue-50/40 transition-colors group cursor-pointer ${
                          isExpanded ? 'bg-blue-50/30' : ''
                        }`}
                        onClick={() => handleViewDetail(demand)}
                      >
                        {/* Index */}
                        <td className="py-4 px-4 text-center font-mono text-slate-400 text-[11px] whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          {itemIndex}
                        </td>

                        {/* Demand Title & Summary */}
                        <td className="py-4 px-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5">
                              {demand.isAlumniEnterprise && (
                                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded text-[10px] font-bold shrink-0">
                                  <GraduationCap className="w-3 h-3 text-amber-600" />
                                  校友企业
                                </span>
                              )}
                              <span className="font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                {demand.demandTitle}
                              </span>
                            </div>
                            <p className="text-slate-500 text-[11px] line-clamp-1">
                              {demand.aiSummary?.coreChallenge || demand.currentBottleneck}
                            </p>
                          </div>
                        </td>

                        {/* Enterprise Info */}
                        <td className="py-4 px-4">
                          <div className="space-y-0.5">
                            <div className="font-bold text-slate-900 flex items-center gap-1">
                              <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                              <span className="truncate max-w-[180px]">{demand.companyName}</span>
                            </div>
                            <div className="text-[11px] text-slate-500 truncate max-w-[180px]">
                              {demand.industry}
                            </div>
                          </div>
                        </td>

                        {/* Contact Info (High Visibility with Copy buttons) */}
                        <td className="py-4 px-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-slate-900">
                              <User className="w-3 h-3 text-blue-600 shrink-0" />
                              <span className="font-bold">{demand.contactName}</span>
                              <button
                                onClick={(e) => handleCopy(demand.contactName, `row_${demand.id}_name`, e)}
                                className="text-slate-400 hover:text-blue-600 p-0.5 rounded transition-colors cursor-pointer"
                                title="复制联系人姓名"
                              >
                                {copiedKey === `row_${demand.id}_name` ? (
                                  <Check className="w-3 h-3 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>

                            <div className="flex items-center gap-1 text-emerald-800 font-mono">
                              <Phone className="w-3 h-3 text-emerald-600 shrink-0" />
                              <span className="font-bold text-[11px]">{demand.contactPhone}</span>
                              <button
                                onClick={(e) => handleCopy(demand.contactPhone, `row_${demand.id}_phone`, e)}
                                className="text-slate-400 hover:text-emerald-700 p-0.5 rounded transition-colors cursor-pointer"
                                title="复制电话号码"
                              >
                                {copiedKey === `row_${demand.id}_phone` ? (
                                  <Check className="w-3 h-3 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </div>
                        </td>

                        {/* AI Matched Tech (Collapsible Toggle) */}
                        <td className="py-4 px-4 text-center whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => toggleExpandPatents(demand.id)}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                              isExpanded 
                                ? 'bg-blue-600 text-white border-blue-600 shadow-xs' 
                                : 'bg-blue-50/80 text-blue-700 border-blue-200 hover:bg-blue-100/80'
                            }`}
                            title="点击展开/收起吉林大学适配科技成果"
                          >
                            <Sparkles className={`w-3 h-3 ${isExpanded ? 'text-cyan-200' : 'text-blue-600'}`} />
                            <span>适配成果 ({matchedPatents.length})</span>
                            <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                          </button>
                        </td>

                        {/* Status */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          {hasFeedback ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-[11px] font-bold">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>已出方案</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full text-[11px] font-bold">
                              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                              <span>待专家承接</span>
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-4 text-center whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-center gap-1.5 flex-nowrap whitespace-nowrap">
                            <button
                              onClick={() => handleViewDetail(demand)}
                              className="px-2.5 py-1 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-bold text-xs transition-colors inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
                              title="在新页面查看需求详情"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>详情</span>
                            </button>

                            <button
                              onClick={() => handleOpenFeedback(demand)}
                              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all inline-flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                                hasFeedback 
                                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-2xs'
                              }`}
                            >
                              <Sparkles className="w-3 h-3" />
                              <span>{hasFeedback ? '编辑' : '出方案'}</span>
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Expanded Row: AI Matched Achievements */}
                      {isExpanded && (
                        <tr className="bg-slate-900 border-y border-slate-800">
                          <td colSpan={7} className="p-4 sm:p-5" onClick={(e) => e.stopPropagation()}>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-white text-xs font-bold">
                                  <Sparkles className="w-4 h-4 text-blue-400" />
                                  <span>AI 自动匹配：吉林大学适配科技成果推荐（共 {matchedPatents.length} 项成果）</span>
                                </div>
                                <button
                                  onClick={() => toggleExpandPatents(demand.id)}
                                  className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                                >
                                  收起推荐 ▲
                                </button>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {matchedPatents.map((pat) => (
                                  <div 
                                    key={pat.id}
                                    className="bg-white/10 hover:bg-white/15 border border-white/10 hover:border-blue-400/50 rounded-xl p-3 flex flex-col justify-between space-y-2 transition-colors"
                                  >
                                    <div className="space-y-1">
                                      <div className="flex items-center justify-between text-[10px]">
                                        <span className="font-mono text-blue-200">{pat.patentNo}</span>
                                        <span className="text-slate-400">TRL {pat.trlLevel}级</span>
                                      </div>
                                      <h4 className="font-bold text-xs text-white line-clamp-2 leading-snug">
                                        {pat.title}
                                      </h4>
                                      <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                                        {pat.abstract}
                                      </p>
                                    </div>

                                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                                      <span className="text-slate-400 truncate pr-1">
                                        {pat.inventor} · {pat.fieldName}
                                      </span>
                                      <button
                                        onClick={() => handleOpenTechDetail(pat)}
                                        className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-md text-xs flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                                      >
                                        <span>查看成果</span>
                                        <ArrowUpRight className="w-3 h-3" />
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {filteredDemands.length > 0 && (
          <div className="bg-slate-50/90 px-4 py-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span>
                显示第 <strong className="text-slate-900 font-bold">{(currentPage - 1) * pageSize + 1}</strong> 至 <strong className="text-slate-900 font-bold">{Math.min(currentPage * pageSize, filteredDemands.length)}</strong> 条，共 <strong className="text-slate-900 font-bold">{filteredDemands.length}</strong> 条需求
              </span>
              <span className="text-slate-300">|</span>
              <div className="flex items-center gap-1.5">
                <span>每页</span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="bg-white border border-slate-300 rounded-lg px-2 py-1 text-xs font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer shadow-2xs"
                >
                  <option value={5}>5 条</option>
                  <option value={10}>10 条</option>
                  <option value={20}>20 条</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-2.5 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1 transition-colors ${
                  currentPage === 1
                    ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 cursor-pointer shadow-2xs'
                }`}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>上一页</span>
              </button>

              <div className="flex items-center gap-1 px-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  if (
                    totalPages > 7 &&
                    pageNum !== 1 &&
                    pageNum !== totalPages &&
                    Math.abs(pageNum - currentPage) > 2
                  ) {
                    if (pageNum === 2 || pageNum === totalPages - 1) {
                      return <span key={pageNum} className="px-1 text-slate-400">...</span>;
                    }
                    return null;
                  }

                  const isActive = pageNum === currentPage;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-2.5 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1 transition-colors ${
                  currentPage === totalPages
                    ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 cursor-pointer shadow-2xs'
                }`}
              >
                <span>下一页</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
