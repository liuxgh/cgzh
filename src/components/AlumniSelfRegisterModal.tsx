import React, { useState } from 'react';
import { 
  GraduationCap, 
  Building2, 
  CheckCircle2, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  ArrowRight,
  Search,
  BookOpen,
  Send,
  Plus
} from 'lucide-react';
import { JLU_COLLEGES } from '../data/confidentialDemandsData';
import { AlumniEnterpriseRecord } from '../data/alumniEnterprisesData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  alumniList: AlumniEnterpriseRecord[];
  onAddAlumniRecord: (record: AlumniEnterpriseRecord) => void;
  onNavigateToDemandPublish?: () => void;
}

export const AlumniSelfRegisterModal: React.FC<Props> = ({
  isOpen,
  onClose,
  alumniList,
  onAddAlumniRecord,
  onNavigateToDemandPublish
}) => {
  const [activeTab, setActiveTab] = useState<'register' | 'database'>('register');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Form states (Self-reporting, non-mandatory strict verification)
  const [graduatedUniversity, setGraduatedUniversity] = useState('吉林大学');
  const [graduatedCollege, setGraduatedCollege] = useState('汽车工程学院');
  const [graduationYear, setGraduationYear] = useState('2010届');
  const [degreeLevel, setDegreeLevel] = useState('硕士');
  const [alumniName, setAlumniName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [personalPosition, setPersonalPosition] = useState('');
  const [industry, setIndustry] = useState('新能源与智能网联汽车');
  const [registeredRegion, setRegisteredRegion] = useState('吉林省长春市');
  const [techNeedsDescription, setTechNeedsDescription] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !alumniName.trim()) return;

    const newRecord: AlumniEnterpriseRecord = {
      id: `ALUM-2026-${Date.now().toString().slice(-4)}`,
      alumniName: alumniName.trim(),
      graduatedUniversity: graduatedUniversity.trim(),
      graduatedCollege: graduatedCollege.trim(),
      graduationYear: graduationYear.trim() || '往届校友',
      degreeLevel: degreeLevel.trim(),
      companyName: companyName.trim(),
      personalPosition: personalPosition.trim() || '核心骨干/负责人',
      industry: industry.trim() || '高新技术产业',
      registeredRegion: registeredRegion.trim() || '全国',
      techNeedsDescription: techNeedsDescription.trim() || '寻求母校对口技术研发支持与成果承接',
      contactPhone: contactPhone.trim(),
      selfReportedAt: new Date().toLocaleDateString('zh-CN'),
      source: 'user_self_report'
    };

    onAddAlumniRecord(newRecord);
    setSubmittedSuccess(true);
  };

  const resetAndSwitchToDatabase = () => {
    setSubmittedSuccess(false);
    setActiveTab('database');
  };

  const filteredAlumni = alumniList.filter(item => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return item.companyName.toLowerCase().includes(q) ||
           item.alumniName.toLowerCase().includes(q) ||
           item.graduatedCollege.toLowerCase().includes(q) ||
           item.industry.toLowerCase().includes(q) ||
           item.registeredRegion.toLowerCase().includes(q);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-[#002B7F] to-blue-900 p-5 sm:p-6 text-white relative shrink-0">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-2 text-blue-300 text-xs font-bold uppercase tracking-wider mb-1.5">
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span>高校专属成果转化专区 · 校友企业服务通道</span>
          </div>

          <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <span>校友身份自主标注与校友企业库</span>
          </h3>
          <p className="text-xs text-blue-100/80 mt-1 max-w-lg leading-relaxed">
            企业用户可自主填报毕业院校与个人任职企业信息，平台不强制核验数据。
          </p>

          {/* Sub Tab Switcher */}
          <div className="flex items-center gap-2 mt-4 pt-2 border-t border-white/10 text-xs">
            <button
              onClick={() => {
                setSubmittedSuccess(false);
                setActiveTab('register');
              }}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'register'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'bg-white/10 text-white/90 hover:bg-white/20'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>自主标注校友企业</span>
            </button>

            <button
              onClick={() => setActiveTab('database')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'database'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'bg-white/10 text-white/90 hover:bg-white/20'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>动态校友企业库 ({alumniList.length})</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1 text-slate-800 text-xs">

          {/* TAB 1: REGISTER / SELF REPORT */}
          {activeTab === 'register' && (
            <div>
              {submittedSuccess ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-slate-900">校友企业身份自主标注成功！</h4>
                    <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                      已将您的企业「<strong>{companyName}</strong>」载入吉林大学成果转化专区动态校友企业库。母校科技开发中心将持续为您精准匹配对口前沿科技成果。
                    </p>
                  </div>

                  <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-2xl max-w-md mx-auto text-left text-xs space-y-1 text-amber-900">
                    <div className="font-bold flex items-center gap-1.5 text-amber-800">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>校友专属协同权益：</span>
                    </div>
                    <p className="text-[11px] text-amber-800/90 leading-relaxed">
                      您现在可以在企业端直接免费发布技术难题与工艺卡点，母校重点实验室专家团队将第一时间为您提供靶向技术支撑。
                    </p>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    {onNavigateToDemandPublish && (
                      <button
                        onClick={() => {
                          onClose();
                          onNavigateToDemandPublish();
                        }}
                        className="px-5 py-2.5 bg-[#0F52BA] hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>免费发布技术需求 (保密直达)</span>
                      </button>
                    )}

                    <button
                      onClick={resetAndSwitchToDatabase}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Users className="w-3.5 h-3.5 text-slate-500" />
                      <span>查看校友企业库</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Banner 说明 */}
                  <div className="p-3 bg-blue-50/80 border border-blue-200 rounded-2xl flex items-start gap-2.5 text-[11px] text-blue-900 leading-relaxed">
                    <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>免除繁琐核验证明：</strong>
                      平台依托校友诚信自律与情感纽带，采取“自主填报、动态沉淀”机制，帮助校友企业更高效地获取母校科技成果与智力支持。
                    </div>
                  </div>

                  {/* 1. 毕业院校与校友信息 */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                      <GraduationCap className="w-4 h-4 text-blue-700" />
                      <span>1. 校友毕业就读信息</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">毕业院校 *</label>
                        <input
                          type="text"
                          required
                          value={graduatedUniversity}
                          onChange={(e) => setGraduatedUniversity(e.target.value)}
                          placeholder="例如：吉林大学"
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-800"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">毕业院系 / 专业 *</label>
                        <input
                          type="text"
                          required
                          value={graduatedCollege}
                          onChange={(e) => setGraduatedCollege(e.target.value)}
                          placeholder="例如：汽车工程学院 / 车辆工程"
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">校友姓名 *</label>
                        <input
                          type="text"
                          required
                          value={alumniName}
                          onChange={(e) => setAlumniName(e.target.value)}
                          placeholder="如：李志强"
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-800"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">毕业届别 / 年份</label>
                        <input
                          type="text"
                          value={graduationYear}
                          onChange={(e) => setGraduationYear(e.target.value)}
                          placeholder="如：2010届"
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-800"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">学历层次</label>
                        <select
                          value={degreeLevel}
                          onChange={(e) => setDegreeLevel(e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-800"
                        >
                          <option value="本科">本科</option>
                          <option value="硕士">硕士</option>
                          <option value="博士">博士</option>
                          <option value="专科/其他">专科/其他</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* 2. 任职/创办企业信息 */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                      <Building2 className="w-4 h-4 text-blue-700" />
                      <span>2. 个人任职企业信息</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">企业全称 *</label>
                        <input
                          type="text"
                          required
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="如：长春捷翼汽车科技股份有限公司"
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-800"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">个人在企职务 *</label>
                        <input
                          type="text"
                          required
                          value={personalPosition}
                          onChange={(e) => setPersonalPosition(e.target.value)}
                          placeholder="如：董事长 / CTO / 研发负责人"
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">所属行业领域</label>
                        <input
                          type="text"
                          value={industry}
                          onChange={(e) => setIndustry(e.target.value)}
                          placeholder="如：新能源汽车 / 智能装备 / 新材料"
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-800"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">企业所在城市/地区</label>
                        <input
                          type="text"
                          value={registeredRegion}
                          onChange={(e) => setRegisteredRegion(e.target.value)}
                          placeholder="如：吉林省长春市 / 江苏省苏州市"
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">主要关注或拟攻关的技术方向（选填）</label>
                      <input
                        type="text"
                        value={techNeedsDescription}
                        onChange={(e) => setTechNeedsDescription(e.target.value)}
                        placeholder="如：轻量化底盘压铸、高寒电驱控制算法、超分子荧光发光材料"
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-800"
                      />
                    </div>
                  </div>

                  {/* 底部按钮 */}
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      填报后将自动加入吉大专属成果转化校友企业库
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-slate-500 hover:text-slate-800 font-bold rounded-xl cursor-pointer"
                      >
                        取消
                      </button>
                      <button
                        type="submit"
                        disabled={!companyName.trim() || !alumniName.trim()}
                        className="px-6 py-2 bg-[#0F52BA] hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>确认自主标注</span>
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: DATABASE VIEW */}
          {activeTab === 'database' && (
            <div className="space-y-3.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜索校友姓名、企业名称、毕业院系或行业..."
                    className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white"
                  />
                </div>
                <div className="text-[11px] text-slate-500 shrink-0 font-medium">
                  共汇聚 <span className="font-bold text-blue-700">{filteredAlumni.length}</span> 家自主填报校友企业
                </div>
              </div>

              <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
                {filteredAlumni.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 bg-slate-50 hover:bg-blue-50/40 border border-slate-200 hover:border-blue-200 rounded-2xl transition-all space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-xs sm:text-sm">
                          {item.companyName}
                        </span>
                        <span className="px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-300 rounded-full font-bold text-[10px] flex items-center gap-1">
                          <GraduationCap className="w-3 h-3 text-amber-600" />
                          <span>自主填报校友企业</span>
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {item.registeredRegion} · {item.selfReportedAt}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-slate-600 bg-white p-2.5 rounded-xl border border-slate-100">
                      <div>
                        校友姓名：<strong className="text-slate-800">{item.alumniName}</strong> ({item.personalPosition})
                      </div>
                      <div>
                        毕业背景：<strong className="text-blue-900">{item.graduatedUniversity} · {item.graduatedCollege}</strong> ({item.graduationYear})
                      </div>
                      <div className="sm:col-span-2">
                        行业领域：<span className="text-slate-700">{item.industry}</span>
                      </div>
                      {item.techNeedsDescription && (
                        <div className="sm:col-span-2 text-slate-600">
                          关注技术：<span className="text-slate-800 font-medium">{item.techNeedsDescription}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
