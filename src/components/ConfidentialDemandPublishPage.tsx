import React, { useState, useRef, useMemo } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  GraduationCap, 
  Building2, 
  CheckCircle2, 
  Lock, 
  Send, 
  PhoneCall, 
  AlertCircle, 
  Eye, 
  Check, 
  ArrowRight,
  ArrowLeft,
  FileCheck,
  PlusCircle,
  Clock,
  Layers,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  UserCheck,
  User,
  Upload,
  FileText,
  Wand2,
  Trash2,
  ClipboardPaste,
  FileUp,
  Award,
  Zap,
  Cpu,
  ArrowUpRight,
  BookmarkCheck,
  Phone,
  Mail,
  Copy,
  ExternalLink,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ConfidentialEnterpriseDemand, AlumniInfo, UniversityFeedback, PatentItem } from '../types';
import { JLU_COLLEGES } from '../data/confidentialDemandsData';
import { INITIAL_PATENTS } from '../data/mockData';
import { TechDetailPage, TechDetailData } from './TechDetailPage';
import { mapPatentToTechDetail } from '../utils/techDetailMapper';

interface ConfidentialDemandPublishPageProps {
  demands: ConfidentialEnterpriseDemand[];
  onAddDemand: (demand: ConfidentialEnterpriseDemand) => void;
  onNavigateToPatent?: (patent: PatentItem) => void;
}

// AI Matching Helper to match 4-6 relevant patents from database
export function matchPatentsForDemandText(
  demandTitle: string,
  demandDescription: string,
  industry: string = '',
  college: string = ''
): PatentItem[] {
  const textAll = `${demandTitle} ${demandDescription} ${industry} ${college}`.toLowerCase();
  
  // Score patents based on keyword hits
  const scored = INITIAL_PATENTS.map(p => {
    let score = 0;
    const patText = `${p.title} ${p.abstract} ${p.fieldName} ${p.college} ${p.innovations.join(' ')} ${p.applicableIndustries.join(' ')}`.toLowerCase();
    
    // Automotive / Chassis / Mechanical / Braking
    if (textAll.includes('汽车') || textAll.includes('底盘') || textAll.includes('减振') || textAll.includes('压铸') || textAll.includes('车身') || textAll.includes('制动') || textAll.includes('悬架')) {
      if (patText.includes('制动') || patText.includes('底盘') || patText.includes('汽车') || patText.includes('商用车')) score += 15;
      if (patText.includes('镁合金') || patText.includes('压铸') || patText.includes('轻量化') || patText.includes('铝合金')) score += 14;
      if (patText.includes('力控') || patText.includes('机器人') || patText.includes('机械')) score += 8;
      if (patText.includes('激光') || patText.includes('传感')) score += 7;
      if (patText.includes('视觉') || patText.includes('检测')) score += 6;
    }
    
    // AI / Vision / Computing / Models
    if (textAll.includes('算法') || textAll.includes('视觉') || textAll.includes('模型') || textAll.includes('缺陷') || textAll.includes('推理') || textAll.includes('智能') || textAll.includes('图像')) {
      if (patText.includes('视觉') || patText.includes('缺陷') || patText.includes('大模型') || patText.includes('计算')) score += 16;
      if (patText.includes('激光') || patText.includes('光栅') || patText.includes('传感') || patText.includes('芯片')) score += 12;
      if (patText.includes('制动') || patText.includes('电控') || patText.includes('自适应')) score += 8;
      if (patText.includes('机器人') || patText.includes('穿刺')) score += 7;
    }
    
    // Medicine / Bio / Chemistry / Pharma
    if (textAll.includes('药') || textAll.includes('偶联') || textAll.includes('抗体') || textAll.includes('生物') || textAll.includes('靶向') || textAll.includes('合成') || textAll.includes('医学') || textAll.includes('化学')) {
      if (patText.includes('药') || patText.includes('皂苷') || patText.includes('肿瘤') || patText.includes('脂质体')) score += 16;
      if (patText.includes('发光') || patText.includes('超分子') || patText.includes('化学') || patText.includes('材料')) score += 13;
      if (patText.includes('微创') || patText.includes('机器人') || patText.includes('手术') || patText.includes('医疗')) score += 10;
      if (patText.includes('农机') || patText.includes('黑土地')) score += 5;
    }
    
    // Materials / Optics / Crystals / Vacuum
    if (textAll.includes('光纤') || textAll.includes('石英') || textAll.includes('纯化') || textAll.includes('无机') || textAll.includes('氟化物') || textAll.includes('材料') || textAll.includes('激光') || textAll.includes('半导体')) {
      if (patText.includes('发光') || patText.includes('材料') || patText.includes('oled') || patText.includes('tadf')) score += 15;
      if (patText.includes('激光') || patText.includes('微纳') || patText.includes('芯片') || patText.includes('晶圆')) score += 14;
      if (patText.includes('镁合金') || patText.includes('压铸')) score += 10;
      if (patText.includes('磁力') || patText.includes('钻探') || patText.includes('超导')) score += 9;
    }
    
    // Sensors / Aerospace / Precision Instruments / Exploration
    if (textAll.includes('原子钟') || textAll.includes('芯片') || textAll.includes('真空') || textAll.includes('微加工') || textAll.includes('深部') || textAll.includes('勘探') || textAll.includes('地质') || textAll.includes('仪器')) {
      if (patText.includes('钻探') || patText.includes('深部') || patText.includes('感知') || patText.includes('地层')) score += 15;
      if (patText.includes('磁力') || patText.includes('超导') || patText.includes('量子') || patText.includes('航空')) score += 14;
      if (patText.includes('激光') || patText.includes('微纳') || patText.includes('光栅')) score += 12;
      if (patText.includes('机器人') || patText.includes('穿刺')) score += 9;
    }

    // Baseline hit
    if (score === 0) {
      score = p.baitengScore?.overall || 85;
    }

    return { patent: p, score };
  });

  // Sort by highest relevance score
  scored.sort((a, b) => b.score - a.score);

  // Return top 5 matched patents
  return scored.slice(0, 5).map(item => item.patent);
}

export const ConfidentialDemandPublishPage: React.FC<ConfidentialDemandPublishPageProps> = ({
  demands,
  onAddDemand,
  onNavigateToPatent
}) => {
  // Main view switcher: 'wizard' (Step 1-2) | 'success' (Success View) | 'list' (My demands)
  const [viewMode, setViewMode] = useState<'wizard' | 'success' | 'list'>('wizard');
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  // Full-page Tech Detail View (No popups, standard full page like TechSearchHub)
  const [selectedTechForDetail, setSelectedTechForDetail] = useState<TechDetailData | null>(null);

  // Booking Modal State (inside Tech Detail Page)
  const [showBookingModal, setShowBookingModal] = useState<boolean>(false);
  const [selectedTechForBooking, setSelectedTechForBooking] = useState<TechDetailData | null>(null);
  const [bookingEnterpriseName, setBookingEnterpriseName] = useState<string>('长春富维东阳智能车身系统有限公司');
  const [bookingContactPerson, setBookingContactPerson] = useState<string>('刘志远');
  const [bookingPhone, setBookingPhone] = useState<string>('13804318888');
  const [bookingRequirementNote, setBookingRequirementNote] = useState<string>('希望与吉大成果科研团队尽快开展闭门技术对接交流');
  const [bookingSuccessToast, setBookingSuccessToast] = useState<string | null>(null);

  // Form State: Step 1 (Identity & Company + Alumni Self-reporting)
  const [isAlumniEnterprise, setIsAlumniEnterprise] = useState<boolean>(true);
  const [graduatedUniversity, setGraduatedUniversity] = useState('吉林大学');
  const [graduatedCollege, setGraduatedCollege] = useState('汽车工程学院');
  const [graduationYear, setGraduationYear] = useState('2008届');
  const [degreeLevel, setDegreeLevel] = useState('硕士');
  const [alumniName, setAlumniName] = useState('刘志远');
  const [alumniPosition, setAlumniPosition] = useState('副总经理兼研发总监');
  const [alumniAssociation, setAlumniAssociation] = useState('吉林大学长春校友会');

  // Company Information
  const [companyName, setCompanyName] = useState('长春富维东阳智能车身系统有限公司');
  const [industry, setIndustry] = useState('新能源与智能网联汽车');
  const [registeredRegion, setRegisteredRegion] = useState('吉林省长春市');
  const [contactName, setContactName] = useState('刘志远');
  const [contactPhone, setContactPhone] = useState('13804318888');

  // Form State: Step 2 (Technical Demand - default empty so placeholder shows cleanly)
  const [demandTitle, setDemandTitle] = useState('');
  const [demandDescription, setDemandDescription] = useState('');

  // Collapsible patents state in "My Demands" table view (default collapsed)
  const [expandedDemandPatents, setExpandedDemandPatents] = useState<Set<string>>(new Set());

  // Pagination state for "My Demands" table
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const totalPages = Math.ceil(demands.length / pageSize) || 1;
  const paginatedDemands = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return demands.slice(start, start + pageSize);
  }, [demands, currentPage, pageSize]);

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

  // File import state & AI status
  const [importedFileName, setImportedFileName] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState<boolean>(false);
  const [isAiPolishing, setIsAiPolishing] = useState<boolean>(false);
  const [aiTipMessage, setAiTipMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Submission & AI Auto-matching State
  const [selectedDemandForDetail, setSelectedDemandForDetail] = useState<ConfidentialEnterpriseDemand | null>(null);
  const [recentlySubmittedId, setRecentlySubmittedId] = useState<string>('');
  const [matchedPatentsResult, setMatchedPatentsResult] = useState<PatentItem[]>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  // Navigation handler to open full TechDetailPage
  const handleOpenTechDetail = (patent: PatentItem) => {
    const detailData = mapPatentToTechDetail(patent);
    setSelectedTechForDetail(detailData);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  // Handle booking appointment
  const handleOpenBooking = (tech: TechDetailData) => {
    setSelectedTechForBooking(tech);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = () => {
    setShowBookingModal(false);
    setBookingSuccessToast(`🎉 已成功向吉林大学科技开发中心提交《${selectedTechForBooking?.title.slice(0, 16)}...》技术交底对接申请！专员将在24小时内与您致电！`);
    setTimeout(() => setBookingSuccessToast(null), 5000);
  };

  // Handle file upload and text extraction
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setImportedFileName(file.name);

    // Auto extract title from filename if title is empty or default
    const cleanFileName = file.name.replace(/\.[^/.]+$/, '').replace(/^[0-9_\-\s]+/, '');
    if (cleanFileName.length > 4 && (!demandTitle || demandTitle === '超高强铝合金一体化压铸底盘件微合金化工艺攻关')) {
      setDemandTitle(cleanFileName);
    }

    if (file.type === 'text/plain' || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content && content.trim()) {
          setDemandDescription(content.trim());
          setAiTipMessage(`已成功从《${file.name}》读取并导入需求内容`);
          setTimeout(() => setAiTipMessage(null), 4000);
        }
        setIsImporting(false);
      };
      reader.onerror = () => {
        setIsImporting(false);
      };
      reader.readAsText(file);
    } else {
      // Simulate docx/pdf structured extraction with high precision
      setTimeout(() => {
        const extracted = 
`【当前卡点与痛点】（已从《${file.name}》智能提取）：
当前工艺在极端工况下存在核心性能波动，材料力学强度/算法处理延迟未达预期指标，制约了下一代产品工程化落地。

【期望达到的关键技术指标与参数】：
1. 核心关键指标提升 30% 以上，通过第三方权威计量认证；
2. 满足行业标准与主机厂/客户严格测试规范；
3. 提供完备的技术交底书、实验检测报告及中试/工业化方案。`;
        setDemandDescription(extracted);
        setIsImporting(false);
        setAiTipMessage(`已成功解析《${file.name}》技术文档，并提炼关键痛点与指标要求`);
        setTimeout(() => setAiTipMessage(null), 4500);
      }, 700);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Insert standard outline
  const handleInsertOutline = () => {
    const outline = 
`【当前卡点与痛点】：
1. 目前研发/生产中遇到的主要瓶颈是：
2. 现有工艺或技术方案存在的缺陷：

【期望达到的关键技术指标与参数】：
1. 核心性能指标要求（如强度/纯度/精度/时延）：
2. 交付物形态（如工艺包/算法软件/样机/样品/专利）：
3. 成本或环保等附加要求：`;
    setDemandDescription(outline);
    setAiTipMessage('已插入产学研技术需求标准提纲');
    setTimeout(() => setAiTipMessage(null), 3000);
  };

  // AI Polish & Structuring
  const handleAiPolish = () => {
    if (!demandDescription.trim()) {
      handleInsertOutline();
      return;
    }
    setIsAiPolishing(true);
    setTimeout(() => {
      let polished = demandDescription;
      // If it doesn't have standard section titles, structure it
      if (!polished.includes('【当前卡点与痛点】') && !polished.includes('【期望达到的关键技术指标与参数】')) {
        polished = 
`【当前卡点与痛点】：
${polished.trim()}

【期望达到的关键技术指标与参数】：
1. 攻关突破上述技术瓶颈，核心指标达到国内/国际先进水平；
2. 形成可落地的工业化技术方案与可检验的工程样件/参数标准。`;
      }
      setDemandDescription(polished);
      setIsAiPolishing(false);
      setAiTipMessage('已完成技术需求专业结构化排版');
      setTimeout(() => setAiTipMessage(null), 3500);
    }, 600);
  };

  // Paste from clipboard
  const handlePasteClipboard = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setDemandDescription((prev) => (prev ? `${prev}\n\n${text}` : text));
          setAiTipMessage('已粘贴剪贴板内容');
          setTimeout(() => setAiTipMessage(null), 3000);
        }
      }
    } catch {
      // Fallback
    }
  };

  // Submit Handler (Directly submit from Step 2 with AI auto-matching)
  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const newId = `DEMAND-${Date.now().toString().slice(-6)}`;
    
    // Auto-generate AI tags based on text content and industry
    const generatedTags: string[] = [];
    const textAll = `${demandTitle} ${demandDescription} ${industry}`.toLowerCase();
    
    if (textAll.includes('汽车') || textAll.includes('底盘') || textAll.includes('减振') || textAll.includes('压铸') || textAll.includes('车身')) {
      generatedTags.push('智能网联汽车', '一体化压铸', '轻量化材料');
    }
    if (textAll.includes('算法') || textAll.includes('视觉') || textAll.includes('模型') || textAll.includes('缺陷') || textAll.includes('推理') || textAll.includes('智能')) {
      generatedTags.push('工业视觉', '边缘算力优化', '缺陷检测');
    }
    if (textAll.includes('药') || textAll.includes('偶联') || textAll.includes('抗体') || textAll.includes('生物') || textAll.includes('靶向') || textAll.includes('合成')) {
      generatedTags.push('创新药物', '分子合成', '靶向递送');
    }
    if (textAll.includes('光纤') || textAll.includes('石英') || textAll.includes('纯化') || textAll.includes('无机') || textAll.includes('氟化物') || textAll.includes('氟')) {
      generatedTags.push('超高纯电子化学品', '特种材料', '卡脖子替代');
    }
    if (textAll.includes('原子钟') || textAll.includes('芯片') || textAll.includes('真空') || textAll.includes('微加工') || textAll.includes('激光') || textAll.includes('应力')) {
      generatedTags.push('芯片级封装', '精密微纳制造', '航空航天装备');
    }
    if (generatedTags.length === 0) {
      generatedTags.push('技术攻关', '关键工艺升级', '卡脖子攻关');
    }

    // Match 5 high-quality patents
    const matchedPatents = matchPatentsForDemandText(
      demandTitle,
      demandDescription,
      industry,
      isAlumniEnterprise ? graduatedCollege : ''
    );

    setMatchedPatentsResult(matchedPatents);

    const newDemand: ConfidentialEnterpriseDemand = {
      id: newId,
      createdAt: new Date().toLocaleDateString('zh-CN'),
      companyName: companyName.trim() || '保密高新技术企业',
      isAlumniEnterprise,
      alumniInfo: isAlumniEnterprise ? {
        isAlumniEnterprise: true,
        alumniName: alumniName.trim(),
        alumniPosition: alumniPosition.trim(),
        graduatedCollege: `${graduatedUniversity} · ${graduatedCollege.trim()}`,
        graduationYear: graduationYear.trim(),
        alumniAssociation: alumniAssociation.trim()
      } : undefined,
      industry: industry.trim() || '高新技术产业',
      region: registeredRegion.trim() || '吉林省长春市',
      enterpriseScale: '国家高新技术企业 / 专精特新',
      contactName: contactName.trim(),
      contactPhone: contactPhone.trim(),
      contactEmail: 'contact@enterprise.com',
      confidentialLevel: 'top_secret',
      ndaAgreed: true,
      priority: isAlumniEnterprise ? 'lightning_alumni' : 'standard',
      responseDeadlineHours: isAlumniEnterprise ? 24 : 48,
      demandCategory: 'bottleneck_tech',
      demandTitle: demandTitle.trim(),
      currentBottleneck: demandDescription.trim(),
      targetSpecs: '',
      budget: '面议 / 产学研联合攻关',
      expectedTimeline: '6 - 12 个月',
      cooperationMode: 'joint_development',
      aiTags: Array.from(new Set(generatedTags)).slice(0, 4),
      aiSummary: {
        coreChallenge: demandDescription.length > 80 ? `${demandDescription.slice(0, 75)}...` : demandDescription,
        targetMetric: '攻克核心技术指标并满足主机厂/产业化量产规范',
        recommendedField: graduatedCollege ? `${graduatedCollege}及对口重点实验室` : `${industry}重点学科组`,
        commercialValue: '具备清晰产线工程化落地场景，已由AI自动匹配母校对口科技成果并推送高校后台'
      },
      aiMatchedPatents: matchedPatents,
      status: isAlumniEnterprise ? 'assigned_expert' : 'pending_review',
      universityFeedback: isAlumniEnterprise ? {
        id: `fb-${Date.now()}`,
        feedbackTime: '科技开发中心已受理 · 专家派发中',
        officerName: '吉大科技开发中心产业协同部',
        assignedCollege: graduatedCollege ? `${graduatedCollege}科研团队` : '对口学院重点实验室',
        matchedExperts: [
          {
            name: '高镇海',
            title: '教授 / 博士生导师 / 院长',
            field: '智能底盘动力学与电控系统',
            college: '汽车工程学院'
          }
        ],
        feasibilityAssessment: '经吉大科技开发中心初审，该技术痛点与我校现有重点实验室科研储备高度契合，已建立校友协同服务专班。',
        proposedSolution: '建议采用吉大自研算法与台架进行协同标定，安排专家教授开展闭门技术交底。',
        estimatedTimeline: '出具初步可行性方案中',
        nextStepAction: '科技开发中心专员将通过电话与您开展技术交底并安排闭门交流。',
        contactOfficer: {
          name: '张建军主任',
          phone: '0431-85168892 / 13944189920',
          email: 'ttc@jlu.edu.cn',
          office: '吉林大学中心校区鼎新楼 A521 室'
        }
      } : undefined
    };

    onAddDemand(newDemand);
    setRecentlySubmittedId(newId);
    setViewMode('success');
  };

  // If a full-page TechDetail view is active, render it directly (same as TechSearchHub & JluTechMapPage)
  if (selectedTechForDetail) {
    return (
      <div className="w-full relative min-h-screen bg-slate-50">
        <TechDetailPage
          tech={selectedTechForDetail}
          onBack={() => {
            setSelectedTechForDetail(null);
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          }}
          onOpenBooking={(t) => handleOpenBooking(t)}
          universityScope="jlu"
        />

        {/* 预约技术对接弹窗 */}
        <AnimatePresence>
          {showBookingModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
              >
                <div className="bg-slate-900 p-5 text-white relative">
                  <button 
                    onClick={() => setShowBookingModal(false)}
                    className="absolute right-4 top-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-1.5 text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
                    <Building2 className="w-3.5 h-3.5 text-blue-400" />
                    吉林大学官方产学研闭门对接通道
                  </div>
                  <h3 className="text-base font-bold text-white pr-6 line-clamp-1">
                    预约成果对接：{selectedTechForBooking?.title}
                  </h3>
                  <div className="text-xs text-slate-300 mt-1">
                    专利号/成果号：{selectedTechForBooking?.no} · 团队：{selectedTechForBooking?.inventor.name} ({selectedTechForBooking?.college})
                  </div>
                </div>

                <div className="p-5 space-y-3.5 text-xs text-slate-700">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-2 text-blue-900">
                    <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>提交后将由吉林大学科技开发中心专员直联科研团队，24小时内为您安排闭门技术交流。</span>
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 block mb-1">企业全称 *</label>
                    <input 
                      type="text" 
                      value={bookingEnterpriseName}
                      onChange={(e) => setBookingEnterpriseName(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-800 block mb-1">联系人姓名 *</label>
                      <input 
                        type="text" 
                        value={bookingContactPerson}
                        onChange={(e) => setBookingContactPerson(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-800 block mb-1">联系电话 *</label>
                      <input 
                        type="text" 
                        value={bookingPhone}
                        onChange={(e) => setBookingPhone(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 block mb-1">意向诉求与合作模式</label>
                    <textarea 
                      rows={3}
                      value={bookingRequirementNote}
                      onChange={(e) => setBookingRequirementNote(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2.5">
                    <button
                      type="button"
                      onClick={() => setShowBookingModal(false)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer"
                    >
                      取消
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmBooking}
                      className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>确认提交预约</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // If a full-page Demand Detail view is active (No popup modal, full-page with AI recommendations)
  if (selectedDemandForDetail) {
    const matchedPatents = selectedDemandForDetail.aiMatchedPatents && selectedDemandForDetail.aiMatchedPatents.length > 0
      ? selectedDemandForDetail.aiMatchedPatents
      : matchPatentsForDemandText(
          selectedDemandForDetail.demandTitle, 
          selectedDemandForDetail.currentBottleneck, 
          selectedDemandForDetail.industry,
          selectedDemandForDetail.isAlumniEnterprise ? selectedDemandForDetail.alumniInfo?.graduatedCollege : ''
        );
    const hasFeedback = !!selectedDemandForDetail.universityFeedback;

    return (
      <div className="w-full max-w-7xl mx-auto space-y-6 pb-16 animate-in fade-in duration-200 pt-2">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setSelectedDemandForDetail(null);
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-blue-600 bg-white border border-slate-200 hover:border-blue-300 px-4 py-2 rounded-xl shadow-2xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>返回我发布的需求</span>
          </button>
          
          <div className="flex items-center gap-2">
            {selectedDemandForDetail.isAlumniEnterprise && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-lg text-xs font-bold">
                <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
                <span>校友企业专属通道</span>
              </span>
            )}
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-lg text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>点对点保密直达</span>
            </span>
          </div>
        </div>

        {/* Demand Title & Status Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
              需求单号: {selectedDemandForDetail.id}
            </span>
            <span className="text-slate-500">
              发布时间: {selectedDemandForDetail.createdAt}
            </span>
            <span className="text-slate-300">|</span>
            {hasFeedback ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-md font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>吉大已出方案</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 text-blue-900 rounded-md font-bold">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>后台初审中</span>
              </span>
            )}
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
            {selectedDemandForDetail.demandTitle}
          </h1>
        </div>

        {/* Enterprise & Contact Info Card (High Visibility with Copy buttons) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <Building2 className="w-4 h-4 text-blue-600" />
            <span>发布企业与联系人信息</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <span className="text-slate-400">企业名称</span>
              <div className="font-bold text-slate-900 text-sm">{selectedDemandForDetail.companyName}</div>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <span className="text-slate-400">所属行业领域</span>
              <div className="font-bold text-slate-900 text-sm">{selectedDemandForDetail.industry}</div>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <span className="text-slate-400">企业注册地区</span>
              <div className="font-bold text-slate-900 text-sm">{selectedDemandForDetail.region || '吉林省长春市'}</div>
            </div>
            
            {/* Contact Card Highlighted */}
            <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200/80 space-y-1.5">
              <span className="text-blue-900 font-bold">对接联系人与电话</span>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-slate-900">
                  <User className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="font-bold text-sm">{selectedDemandForDetail.contactName}</span>
                  <button
                    onClick={(e) => handleCopy(selectedDemandForDetail.contactName, `detail_name_${selectedDemandForDetail.id}`, e)}
                    className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-100 rounded transition-colors cursor-pointer"
                    title="复制联系人姓名"
                  >
                    {copiedKey === `detail_name_${selectedDemandForDetail.id}` ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-1.5 text-emerald-800 font-mono bg-white px-2.5 py-1 rounded-lg border border-emerald-200">
                  <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="font-bold text-xs">{selectedDemandForDetail.contactPhone}</span>
                  <button
                    onClick={(e) => handleCopy(selectedDemandForDetail.contactPhone, `detail_phone_${selectedDemandForDetail.id}`, e)}
                    className="p-1 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 rounded transition-colors cursor-pointer"
                    title="复制电话号码"
                  >
                    {copiedKey === `detail_phone_${selectedDemandForDetail.id}` ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Alumni details if applicable */}
          {selectedDemandForDetail.isAlumniEnterprise && selectedDemandForDetail.alumniInfo && (
            <div className="p-3.5 bg-amber-50/50 rounded-xl border border-amber-200/70 text-xs space-y-1">
              <div className="font-bold text-amber-900 flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-amber-700" />
                <span>校友填报信息：</span>
              </div>
              <div className="text-amber-950 font-medium">
                {selectedDemandForDetail.alumniInfo.alumniName} ({selectedDemandForDetail.alumniInfo.alumniPosition}) · {selectedDemandForDetail.alumniInfo.graduatedCollege} ({selectedDemandForDetail.alumniInfo.graduationYear}) · {selectedDemandForDetail.alumniInfo.alumniAssociation || '校友总会'}
              </div>
            </div>
          )}
        </div>

        {/* Technical Bottleneck and Target Specs Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <FileText className="w-4 h-4 text-blue-600" />
            <span>技术难题与指标要求详情</span>
          </h3>
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 text-xs text-slate-800 leading-relaxed whitespace-pre-line font-medium">
            {selectedDemandForDetail.currentBottleneck}
          </div>
        </div>

        {/* University Official Feedback (if available) */}
        {hasFeedback && selectedDemandForDetail.universityFeedback && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blue-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-blue-100">
              <h3 className="text-sm font-bold text-blue-950 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>吉林大学官方专家方案与承接团队</span>
              </h3>
              <span className="text-xs text-slate-400">
                {selectedDemandForDetail.universityFeedback.feedbackTime}
              </span>
            </div>

            <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-200/80 space-y-3 text-xs">
              <div>
                <strong className="text-blue-900 block mb-1">承接院系与科研团队：</strong>
                <span className="text-slate-800 font-bold">{selectedDemandForDetail.universityFeedback.assignedCollege}</span>
              </div>
              <div>
                <strong className="text-blue-900 block mb-1">建议攻关路径与方案：</strong>
                <p className="text-slate-800 leading-relaxed">{selectedDemandForDetail.universityFeedback.proposedSolution}</p>
              </div>
              <div>
                <strong className="text-blue-900 block mb-1">拟匹配专家教授：</strong>
                <div className="flex flex-wrap gap-2 pt-1">
                  {selectedDemandForDetail.universityFeedback.matchedExperts.map(exp => (
                    <span key={exp.name} className="px-2.5 py-1 bg-white border border-blue-200 rounded-lg text-blue-900 font-bold">
                      {exp.name} ({exp.title} · {exp.field})
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-2 border-t border-blue-200/60 text-blue-900 font-semibold flex items-center justify-between flex-wrap gap-2">
                <span>联络专员：{selectedDemandForDetail.universityFeedback.contactOfficer.name}</span>
                <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-blue-200 text-slate-800">
                  <Phone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="font-mono font-bold text-xs">{selectedDemandForDetail.universityFeedback.contactOfficer.phone}</span>
                  <button
                    onClick={(e) => handleCopy(selectedDemandForDetail.universityFeedback!.contactOfficer.phone, `officer_phone_${selectedDemandForDetail.id}`, e)}
                    className="p-1 text-slate-400 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors cursor-pointer"
                    title="复制联络专员电话"
                  >
                    {copiedKey === `officer_phone_${selectedDemandForDetail.id}` ? (
                      <span className="text-emerald-600 flex items-center gap-0.5 text-[11px] font-bold">
                        <Check className="w-3.5 h-3.5" /> 已复制
                      </span>
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI 靶向匹配：吉林大学适配科技成果推荐 (MATCHED PATENTS IN FULL-PAGE DETAIL) */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-5 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center border border-blue-400/40 font-bold">
                <Sparkles className="w-4 h-4 text-blue-300" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>AI 靶向匹配：吉林大学适配科技成果推荐</span>
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  系统已根据您提交的技术难点指标，在吉大成果库中为您靶向匹配在库高价值专利/成果：
                </p>
              </div>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              共推荐 {matchedPatents.length} 项成果
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {matchedPatents.map((pat) => (
              <div 
                key={pat.id}
                className="bg-white/10 hover:bg-white/15 border border-white/15 hover:border-blue-400/60 rounded-2xl p-4 transition-all duration-200 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2 py-0.5 bg-blue-500/30 text-blue-200 border border-blue-400/30 rounded-md font-mono text-[11px]">
                      {pat.patentNo}
                    </span>
                    <span className="px-2 py-0.5 bg-slate-800/80 text-emerald-300 border border-emerald-500/30 rounded-md text-[11px] font-semibold">
                      TRL {pat.trlLevel}级 · {pat.status === 'valid' ? '授权专利' : '重点科技成果'}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-white leading-snug line-clamp-2">
                    {pat.title}
                  </h4>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {pat.abstract}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <div className="text-slate-400 text-[11px] line-clamp-1 pr-2">
                    发明人：<strong className="text-white">{pat.inventor}</strong> ({pat.fieldName})
                  </div>
                  
                  <button
                    onClick={() => handleOpenTechDetail(pat)}
                    className="px-3 py-1.5 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-lg text-xs flex items-center gap-1 transition-colors cursor-pointer shrink-0 shadow-xs"
                  >
                    <span>查看成果</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Back Button */}
        <div className="pt-2 flex justify-start">
          <button
            onClick={() => {
              setSelectedDemandForDetail(null);
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
            className="px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-xl border border-slate-300 text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>返回我发布的需求列表</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-16 animate-in fade-in duration-200">
      
      {/* 预约对接成功提示 Toast */}
      {bookingSuccessToast && (
        <div className="p-3.5 bg-emerald-500 text-white font-bold rounded-2xl shadow-lg flex items-center justify-between text-xs animate-in slide-in-from-top-2">
          <span>{bookingSuccessToast}</span>
          <button onClick={() => setBookingSuccessToast(null)} className="text-white/80 hover:text-white px-2">✕</button>
        </div>
      )}

      {/* 顶部标题与切换栏 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div>
          <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <span>{viewMode === 'list' ? '我发布的需求' : '免费发布技术需求'}</span>
            {viewMode === 'list' && (
              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
                共 {demands.length} 项
              </span>
            )}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {viewMode === 'list'
              ? '记录您提交的所有保密技术需求及关联的吉林大学 AI 靶向成果推荐与专家方案'
              : '点对点直达吉林大学对口学科专家 · 提交后AI智能匹配适配科技成果'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {viewMode !== 'list' ? (
            <button
              onClick={() => setViewMode('list')}
              className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <FileCheck className="w-3.5 h-3.5 text-slate-500" />
              <span>我发布的需求 ({demands.length})</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setViewMode('wizard');
                setCurrentStep(1);
              }}
              className="px-4 py-1.5 bg-[#0F52BA] hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>填写新需求</span>
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 步骤分步填写向导 (WIZARD MODE - 仅需 2 步) */}
      {/* ========================================================================= */}
      {viewMode === 'wizard' && (
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* 步骤指示条 (Clean 2-Step Indicator) */}
          <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                currentStep >= 1 ? 'bg-[#0F52BA] text-white' : 'bg-slate-100 text-slate-400'
              }`}>
                {currentStep > 1 ? <Check className="w-4 h-4" /> : '1'}
              </div>
              <div>
                <span className={`text-xs font-bold block ${currentStep === 1 ? 'text-blue-900' : 'text-slate-600'}`}>
                  企业与校友身份
                </span>
                <span className="text-[10px] text-slate-400 block hidden sm:block">自主标注 · 不强制核验</span>
              </div>
            </div>

            <div className="w-12 h-0.5 bg-slate-200 shrink-0 mx-3" />

            <div className="flex items-center gap-2 flex-1 justify-end">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                currentStep === 2 ? 'bg-[#0F52BA] text-white' : 'bg-slate-100 text-slate-400'
              }`}>
                2
              </div>
              <div className="text-right sm:text-left">
                <span className={`text-xs font-bold block ${currentStep === 2 ? 'text-blue-900' : 'text-slate-600'}`}>
                  描述技术难题与关键指标
                </span>
                <span className="text-[10px] text-slate-400 block hidden sm:block">支持文档导入 · 提交后AI直配</span>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* STEP 1: 企业与校友身份 (自主标注) */}
          {/* ------------------------------------------------------------- */}
          {currentStep === 1 && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-150">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  第 1 步：确认企业基本信息与校友身份
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  企业用户可自主填报毕业院校与个人任职企业信息，平台不强制核验数据
                </p>
              </div>

              {/* 身份二选一大卡片 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <button
                  type="button"
                  onClick={() => setIsAlumniEnterprise(true)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer relative ${
                    isAlumniEnterprise
                      ? 'border-amber-500 bg-amber-50/40 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">吉林大学校友企业</div>
                        <div className="text-xs text-slate-500 mt-0.5">母校专家直连</div>
                      </div>
                    </div>
                    {isAlumniEnterprise && <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setIsAlumniEnterprise(false)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer relative ${
                    !isAlumniEnterprise
                      ? 'border-blue-600 bg-blue-50/40 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">非吉林大学校友企业</div>
                        <div className="text-xs text-slate-500 mt-0.5">寻求吉林大学对口学科攻关</div>
                      </div>
                    </div>
                    {!isAlumniEnterprise && <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />}
                  </div>
                </button>
              </div>

              {/* 校友企业自主填报信息 */}
              {isAlumniEnterprise && (
                <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-2xl space-y-3.5 text-xs animate-in fade-in duration-150">
                  <div className="font-bold text-amber-900 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-amber-700" />
                      <span>校友身份自主填报（依托自主申报，免繁琐核验证明）</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-700 font-bold block mb-1">毕业院校 *</label>
                      <input
                        type="text"
                        value={graduatedUniversity}
                        onChange={(e) => setGraduatedUniversity(e.target.value)}
                        placeholder="如：吉林大学"
                        className="w-full p-2.5 bg-white border border-amber-300 rounded-xl text-slate-900 font-medium"
                      />
                    </div>

                    <div>
                      <label className="text-slate-700 font-bold block mb-1">毕业院系 / 专业 *</label>
                      <input
                        type="text"
                        value={graduatedCollege}
                        onChange={(e) => setGraduatedCollege(e.target.value)}
                        placeholder="如：汽车工程学院 / 化学学院"
                        className="w-full p-2.5 bg-white border border-amber-300 rounded-xl text-slate-900 font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-slate-700 font-bold block mb-1">校友姓名 *</label>
                      <input
                        type="text"
                        value={alumniName}
                        onChange={(e) => setAlumniName(e.target.value)}
                        placeholder="如：刘志远"
                        className="w-full p-2.5 bg-white border border-amber-300 rounded-xl text-slate-900 font-medium"
                      />
                    </div>

                    <div>
                      <label className="text-slate-700 font-bold block mb-1">毕业届别 / 年份</label>
                      <input
                        type="text"
                        value={graduationYear}
                        onChange={(e) => setGraduationYear(e.target.value)}
                        placeholder="如：2008届"
                        className="w-full p-2.5 bg-white border border-amber-300 rounded-xl text-slate-900 font-medium"
                      />
                    </div>

                    <div>
                      <label className="text-slate-700 font-bold block mb-1">个人在企职务</label>
                      <input
                        type="text"
                        value={alumniPosition}
                        onChange={(e) => setAlumniPosition(e.target.value)}
                        placeholder="如：副总经理兼研发总监"
                        className="w-full p-2.5 bg-white border border-amber-300 rounded-xl text-slate-900 font-medium"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 企业基本联系信息 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">企业全称 *</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="如：长春富维东阳智能车身系统有限公司"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-slate-700 font-bold block mb-1">所属行业领域 *</label>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="如：新能源汽车 / 生物医药 / 人工智能"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-slate-700 font-bold block mb-1">对接联系人 *</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="如：刘先生"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-slate-700 font-bold block mb-1">联系手机号 *</label>
                  <input
                    type="text"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="用于接收专家方案与对接通知"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:bg-white"
                  />
                </div>
              </div>

              {/* 下一步按钮 */}
              <div className="pt-3 flex justify-end">
                <button
                  type="button"
                  disabled={!companyName.trim() || !contactPhone.trim()}
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-2.5 bg-[#0F52BA] hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>下一步：填写技术诉求</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* STEP 2: 技术难题与指标要求（合并为单一强大输入框，第2步直接提交） */}
          {/* ------------------------------------------------------------- */}
          {currentStep === 2 && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5 animate-in fade-in duration-150">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  第 2 步：描述技术难题与关键指标
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  可直接描述当前卡点与期望参数，也可一键导入现有需求书。提交后系统将由AI自动匹配母校技术成果并实时推送至高校后台。
                </p>
              </div>

              {/* 课题名称 */}
              <div className="text-xs">
                <label className="text-slate-700 font-bold block mb-1">
                  技术攻关课题 / 需求名称 *
                </label>
                <input
                  type="text"
                  value={demandTitle}
                  onChange={(e) => setDemandTitle(e.target.value)}
                  placeholder="例如：超高强铝合金一体化压铸底盘件微合金化工艺攻关"
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-semibold text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              {/* 隐藏的文件输入组件 */}
              <input
                type="file"
                ref={fileInputRef}
                accept=".docx,.doc,.pdf,.txt,.md,.rtf,.wps"
                className="hidden"
                onChange={handleFileUpload}
              />

              {/* 合并后的强大需求文本框容器 */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <label className="text-slate-700 font-bold flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    <span>技术难题与指标要求描述 *</span>
                  </label>
                  <span className="text-[11px] text-slate-400">支持导入 Word / PDF / TXT / MD 文档</span>
                </div>

                {/* 智能提示小条 */}
                {aiTipMessage && (
                  <div className="p-2 bg-blue-50 border border-blue-200 text-blue-800 rounded-xl text-xs flex items-center justify-between animate-in fade-in duration-200">
                    <span className="flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                      {aiTipMessage}
                    </span>
                    <button 
                      onClick={() => setAiTipMessage(null)}
                      className="text-blue-500 hover:text-blue-700 font-bold px-1"
                    >
                      ✕
                    </button>
                  </div>
                )}

                {/* 统一大文本域 */}
                <div className="relative">
                  <textarea
                    rows={8}
                    value={demandDescription}
                    onChange={(e) => setDemandDescription(e.target.value)}
                    placeholder="请简要描述您目前遇到的技术难题、工艺卡点或期望达到的关键参数指标（如：提高材料强度、降低气孔率、优化算法时延等）"
                    className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-slate-900 font-medium text-xs resize-y focus:ring-2 focus:ring-blue-500 focus:bg-white leading-relaxed font-sans"
                  />
                  <div className="absolute right-3 bottom-3 text-[11px] text-slate-400 pointer-events-none bg-slate-50/80 px-1.5 py-0.5 rounded">
                    {demandDescription.length} 字
                  </div>
                </div>

                {/* 文本框左下方快捷操作按钮栏 */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isImporting}
                      className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg font-bold transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                      title="支持导入 Word / PDF / TXT 需求文档"
                    >
                      <FileUp className="w-3.5 h-3.5" />
                      <span>{isImporting ? '解析文档中...' : '导入需求文档'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleInsertOutline}
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                      title="插入标准提纲"
                    >
                      <span>📑 插入标准提纲</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleAiPolish}
                      disabled={isAiPolishing}
                      className="px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg font-bold transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
                      title="AI 结构化整理"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{isAiPolishing ? '整理中...' : '✨ AI 智能排版'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handlePasteClipboard}
                      className="px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-lg font-medium transition-colors flex items-center gap-1 cursor-pointer"
                      title="从系统剪贴板粘贴文本"
                    >
                      <ClipboardPaste className="w-3.5 h-3.5 text-slate-500" />
                      <span>从剪贴板粘贴</span>
                    </button>

                    {demandDescription && (
                      <button
                        type="button"
                        onClick={() => setDemandDescription('')}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="清空内容"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <span className="text-[11px] text-slate-400">
                    支持格式：.docx / .doc / .pdf / .txt / .md
                  </span>
                </div>
              </div>

              {/* 保密承诺提示 */}
              <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-center gap-2.5 text-xs text-emerald-900">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  <strong>点对点绝密保障：</strong>需求内容仅供吉林大学科技开发中心与指定学科专家评审，绝不向第三方公开。提交后将第一时间推送到高校后台。
                </span>
              </div>

              {/* 按钮行（第2步直接提交） */}
              <div className="pt-3 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>上一步</span>
                </button>

                <button
                  type="button"
                  disabled={!demandTitle.trim() || !demandDescription.trim()}
                  onClick={() => handleSubmit()}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold rounded-xl text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>加密提交并由AI智能匹配成果</span>
                </button>
              </div>

            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* 提交成功页面 (SUCCESS VIEW with AI Matched Outcomes) */}
      {/* ========================================================================= */}
      {viewMode === 'success' && (
        <div className="space-y-6 animate-in zoom-in-95 duration-200">
          
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm text-center space-y-5">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                技术需求已成功保密提交！
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                需求单号：<strong className="text-slate-900">{recentlySubmittedId}</strong>。
                需求已第一时间推送至吉林大学科技开发中心后台，并由AI自动匹配了对应适配科技成果。
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl max-w-md mx-auto text-left text-xs space-y-1.5 text-slate-600">
              <div>企业名称：<strong className="text-slate-800">{companyName}</strong></div>
              <div>课题名称：<strong className="text-slate-800">{demandTitle}</strong></div>
              <div>保密级别：<strong className="text-emerald-700">点对点绝密 · 仅吉大专家可见</strong></div>
              <div>推送状态：<strong className="text-blue-700">✓ 已实时推送至吉林大学科技开发中心后台</strong></div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setViewMode('list')}
                className="px-5 py-2.5 bg-[#0F52BA] hover:bg-blue-700 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <FileCheck className="w-4 h-4" />
                <span>查看我发布的需求与专家方案</span>
              </button>

              <button
                onClick={() => {
                  setViewMode('wizard');
                  setCurrentStep(1);
                }}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs sm:text-sm transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>继续发布新需求</span>
              </button>
            </div>
          </div>

          {/* AI 自动匹配的对口科技成果卡片区 (已去除“大幅提升对接精准度”与“匹配度”) */}
          {matchedPatentsResult.length > 0 && (
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center border border-blue-400/40 font-bold">
                    <Sparkles className="w-4 h-4 text-blue-300" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span>AI 靶向匹配：吉林大学适配科技成果推荐</span>
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      系统已根据您提交的技术难点指标，在吉大成果库中为您靶向匹配在库高价值专利/成果：
                    </p>
                  </div>
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  共推荐 {matchedPatentsResult.length} 项成果
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {matchedPatentsResult.map((pat) => (
                  <div 
                    key={pat.id}
                    className="bg-white/10 hover:bg-white/15 border border-white/15 hover:border-blue-400/60 rounded-2xl p-4 transition-all duration-200 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="px-2 py-0.5 bg-blue-500/30 text-blue-200 border border-blue-400/30 rounded-md font-mono text-[11px]">
                          {pat.patentNo}
                        </span>
                        <span className="px-2 py-0.5 bg-slate-800/80 text-emerald-300 border border-emerald-500/30 rounded-md text-[11px] font-semibold">
                          TRL {pat.trlLevel}级 · {pat.status === 'valid' ? '授权专利' : '重点科技成果'}
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-white leading-snug line-clamp-2">
                        {pat.title}
                      </h4>

                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {pat.abstract}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                      <div className="text-slate-400 text-[11px] line-clamp-1 pr-2">
                        发明人：<strong className="text-white">{pat.inventor}</strong> ({pat.fieldName})
                      </div>
                      
                      <button
                        onClick={() => handleOpenTechDetail(pat)}
                        className="px-3 py-1.5 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-lg text-xs flex items-center gap-1 transition-colors cursor-pointer shrink-0 shadow-xs"
                      >
                        <span>查看成果</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* 我发布的需求列表 (MY DEMANDS TABLE VIEW with collapsible AI matched outcomes) */}
      {/* ========================================================================= */}
      {viewMode === 'list' && (
        <div className="space-y-4">

          {demands.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center text-slate-500 border border-slate-200 space-y-3">
              <div className="font-bold text-sm text-slate-700">暂无需求记录</div>
              <p className="text-xs text-slate-400">您尚未发布任何技术需求</p>
              <button
                onClick={() => {
                  setViewMode('wizard');
                  setCurrentStep(1);
                }}
                className="px-5 py-2 bg-[#0F52BA] text-white font-bold rounded-xl text-xs hover:bg-blue-700 cursor-pointer"
              >
                立即免费发布第一项需求
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-600 font-bold">
                      <th className="py-3.5 px-4 w-12 text-center whitespace-nowrap">#</th>
                      <th className="py-3.5 px-4 min-w-[280px]">技术需求课题 / 卡点痛点</th>
                      <th className="py-3.5 px-4 min-w-[180px]">发布主体 / 行业</th>
                      <th className="py-3.5 px-4 w-28 whitespace-nowrap">发布时间</th>
                      <th className="py-3.5 px-4 w-32 whitespace-nowrap">对接状态</th>
                      <th className="py-3.5 px-4 w-44 text-center whitespace-nowrap">AI 靶向适配成果</th>
                      <th className="py-3.5 px-4 w-24 text-center whitespace-nowrap">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {paginatedDemands.map((demand, index) => {
                      const itemIndex = (currentPage - 1) * pageSize + index + 1;
                      const hasFeedback = !!demand.universityFeedback;
                      const matchedPatents = demand.aiMatchedPatents && demand.aiMatchedPatents.length > 0 
                        ? demand.aiMatchedPatents 
                        : matchPatentsForDemandText(demand.demandTitle, demand.currentBottleneck, demand.industry);
                      const isExpanded = expandedDemandPatents.has(demand.id);

                      return (
                        <React.Fragment key={demand.id}>
                          <tr className="hover:bg-blue-50/40 transition-colors group">
                            {/* Index */}
                            <td className="py-4 px-4 text-center font-mono text-slate-400 text-[11px] whitespace-nowrap">
                              {itemIndex}
                            </td>

                            {/* Title & snippet */}
                            <td className="py-4 px-4">
                              <div className="space-y-1">
                                <div className="flex items-center gap-1.5">
                                  {demand.isAlumniEnterprise && (
                                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded text-[10px] font-bold shrink-0">
                                      <GraduationCap className="w-3 h-3 text-amber-600" />
                                      校友企业
                                    </span>
                                  )}
                                  <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                                    {demand.demandTitle}
                                  </span>
                                </div>
                                <p className="text-slate-500 text-[11px] line-clamp-1">
                                  {demand.currentBottleneck}
                                </p>
                              </div>
                            </td>

                            {/* Enterprise & Industry */}
                            <td className="py-4 px-4">
                              <div className="space-y-0.5">
                                <div className="font-bold text-slate-900 truncate max-w-[200px]">
                                  {demand.companyName}
                                </div>
                                <div className="text-[11px] text-slate-500 truncate max-w-[200px]">
                                  {demand.industry}
                                </div>
                              </div>
                            </td>

                            {/* Date */}
                            <td className="py-4 px-4 text-slate-500 text-[11px] whitespace-nowrap">
                              {demand.createdAt}
                            </td>

                            {/* Status */}
                            <td className="py-4 px-4 whitespace-nowrap">
                              {hasFeedback ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-[11px] font-bold">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>已出方案</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-800 border border-blue-200 rounded-full text-[11px] font-bold">
                                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                                  <span>后台初审中</span>
                                </span>
                              )}
                            </td>

                            {/* AI Matched Technologies toggle button (默认收缩) */}
                            <td className="py-4 px-4 text-center whitespace-nowrap">
                              <button
                                onClick={() => toggleExpandPatents(demand.id)}
                                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all inline-flex items-center gap-1 cursor-pointer ${
                                  isExpanded
                                    ? 'bg-blue-600 text-white shadow-2xs'
                                    : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200'
                                }`}
                                title="点击展开/收起吉林大学适配科技成果推荐"
                              >
                                <Sparkles className="w-3 h-3" />
                                <span>{isExpanded ? '收起适配成果' : `适配成果 (${matchedPatents.length})`}</span>
                                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                              </button>
                            </td>

                            {/* Actions */}
                            <td className="py-4 px-4 text-center whitespace-nowrap">
                              <button
                                onClick={() => {
                                  setSelectedDemandForDetail(demand);
                                  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                                }}
                                className="px-3 py-1 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-bold text-xs transition-colors inline-flex items-center gap-1 cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>详情</span>
                              </button>
                            </td>
                          </tr>

                          {/* Expanded AI Matched Technologies Section (默认收缩，点击展开) */}
                          {isExpanded && (
                            <tr className="bg-slate-900 border-b border-slate-800 text-white">
                              <td colSpan={7} className="p-4 sm:p-5 animate-in fade-in duration-150">
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                                    <div className="flex items-center gap-2">
                                      <Sparkles className="w-4 h-4 text-blue-400" />
                                      <span className="text-xs font-bold text-white">
                                        AI 靶向匹配：吉林大学适配科技成果推荐（共 {matchedPatents.length} 项成果）
                                      </span>
                                    </div>
                                    <span className="text-[11px] text-slate-400">
                                      点击「查看成果」可查看专利详情与AI产业化建议
                                    </span>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {matchedPatents.map((pat) => (
                                      <div 
                                        key={pat.id}
                                        className="bg-white/10 hover:bg-white/15 border border-white/10 hover:border-blue-400/50 rounded-xl p-3.5 flex flex-col justify-between space-y-2.5 transition-colors"
                                      >
                                        <div className="space-y-1.5">
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

                                  {/* University feedback snippet inside expanded area if available */}
                                  {hasFeedback && demand.universityFeedback && (
                                    <div className="mt-2 bg-blue-950/70 border border-blue-800/80 rounded-xl p-3 text-xs text-slate-200 space-y-1.5">
                                      <div className="flex items-center justify-between font-bold text-blue-300">
                                        <div className="flex items-center gap-1.5">
                                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                                          <span>吉大承接院系：{demand.universityFeedback.assignedCollege}</span>
                                        </div>
                                        <span className="text-[11px] text-slate-400 font-normal">
                                          {demand.universityFeedback.feedbackTime}
                                        </span>
                                      </div>
                                      <div className="text-slate-300">
                                        <strong className="text-blue-300">专家建议方案：</strong>
                                        {demand.universityFeedback.proposedSolution}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              {demands.length > 0 && (
                <div className="bg-slate-50/90 px-4 py-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <span>
                      显示第 <strong className="text-slate-900 font-bold">{(currentPage - 1) * pageSize + 1}</strong> 至 <strong className="text-slate-900 font-bold">{Math.min(currentPage * pageSize, demands.length)}</strong> 条，共 <strong className="text-slate-900 font-bold">{demands.length}</strong> 条需求
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
          )}
        </div>
      )}

    </div>
  );
};
