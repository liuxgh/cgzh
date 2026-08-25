import React, { useState } from 'react';
import { X, Building2, CheckCircle2, DollarSign } from 'lucide-react';
import { EnterpriseDemand } from '../types';

interface NewDemandModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (demand: EnterpriseDemand) => void;
}

export const NewDemandModal: React.FC<NewDemandModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [companyName, setCompanyName] = useState('');
  const [region, setRegion] = useState('吉林长春');
  const [industry, setIndustry] = useState('新能源与智能网联汽车');
  const [scale, setScale] = useState('专精特新重点高企业 / 规上制造企业');
  const [demandTitle, setDemandTitle] = useState('');
  const [demandDescription, setDemandDescription] = useState('');
  const [techKeywordsStr, setTechKeywordsStr] = useState('轻量化, 新材料, 工艺优化');
  const [budget, setBudget] = useState('200万 - 400万元');
  const [cooperationMode, setCooperationMode] = useState<'license' | 'transfer' | 'joint_lab' | 'custom_dev' | 'equity'>('license');
  const [contactPerson, setContactPerson] = useState('');
  const [contactTitle, setContactTitle] = useState('技术副总 / 研发总监');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !demandTitle.trim()) return;

    const keywords = techKeywordsStr
      .split(/[,，\s]+/)
      .map(k => k.trim())
      .filter(Boolean);

    const newDemand: EnterpriseDemand = {
      id: `ent-${Date.now()}`,
      companyName: companyName.trim(),
      logoColor: 'from-blue-600 to-indigo-700',
      industry,
      region: region.trim() || '吉林长春',
      scale,
      businessSummary: '高新技术制造与关键零部件研发制造',
      demandTitle: demandTitle.trim(),
      demandDescription: demandDescription.trim() || '急需寻找高性能替代方案与新工艺技术，突破产业技术瓶颈。',
      techKeywords: keywords.length > 0 ? keywords : ['关键技术攻关', '产学研协同'],
      budget: budget.trim() || '100万 - 300万元',
      cooperationMode,
      urgency: 'high',
      publishDate: new Date().toISOString().split('T')[0],
      status: 'open',
      matchedPatentIds: [],
      contactPerson: contactPerson.trim() || '王总监',
      contactTitle
    };

    onSubmit(newDemand);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 border border-slate-200 shadow-2xl space-y-4 my-8">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">发布企业技术攻关与专利采购需求</h3>
              <p className="text-[11px] text-slate-500">发布后将自动启动吉林大学8800余项专利成果库AI深度检索与匹配</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 font-bold text-base">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-sm">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-slate-700 font-bold block mb-1">企业全称 *</label>
              <input
                type="text"
                required
                placeholder="例如：长春富维智能装备有限公司"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              />
            </div>
            <div>
              <label className="text-slate-700 font-bold block mb-1">所属产业赛道</label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              >
                <option value="新能源与智能网联汽车">新能源与智能网联汽车</option>
                <option value="电子化学品与新型显示">电子化学品与新型显示</option>
                <option value="精密光学与半导体装备">精密光学与半导体装备</option>
                <option value="生物医药与现代大健康">生物医药与现代大健康</option>
                <option value="现代智能农机装备">现代智能农机装备</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-slate-700 font-bold block mb-1">技术痛点 / 攻关需求名称 *</label>
            <input
              type="text"
              required
              placeholder="例如：寻找高低温兼顾的智能底盘线控传感器自适应校准算法"
              value={demandTitle}
              onChange={(e) => setDemandTitle(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-slate-700 font-bold block mb-1">拟投入研发/采购预算</label>
              <input
                type="text"
                placeholder="例如：200万 - 500万元"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              />
            </div>
            <div>
              <label className="text-slate-700 font-bold block mb-1">期望合作模式</label>
              <select
                value={cooperationMode}
                onChange={(e) => setCooperationMode(e.target.value as any)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              >
                <option value="license">技术实施许可 (先用后付/提成)</option>
                <option value="transfer">专利权整体买断转让</option>
                <option value="joint_lab">共建校企联合实验室</option>
                <option value="custom_dev">委托吉大团队定制定向研发</option>
                <option value="equity">作价入股 / 股权合作</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-slate-700 font-bold block mb-1">技术关键词 (逗号隔开)</label>
            <input
              type="text"
              placeholder="例如：线控底盘, 算法模型, 极寒工况, ASIL-D"
              value={techKeywordsStr}
              onChange={(e) => setTechKeywordsStr(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
            />
          </div>

          <div>
            <label className="text-slate-700 font-bold block mb-1">详细技术难题与指标要求描述</label>
            <textarea
              rows={3}
              placeholder="详细描述当前产线遇到的技术瓶颈、关键指标参数要求及期望吉大成果达到的技术阶段..."
              value={demandDescription}
              onChange={(e) => setDemandDescription(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-slate-700 font-bold block mb-1">企业对接联系人</label>
              <input
                type="text"
                placeholder="例如：李经理"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              />
            </div>
            <div>
              <label className="text-slate-700 font-bold block mb-1">职务与部门</label>
              <input
                type="text"
                placeholder="例如：技术研发部部长"
                value={contactTitle}
                onChange={(e) => setContactTitle(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center gap-1.5 shadow-xs"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>确认发布并启动AI匹配</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
