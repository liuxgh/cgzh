import { UserRole } from '../types';
import React, { useState } from 'react';
import { Plus, Search, Filter, Briefcase, FileText, CheckCircle, Clock, Trash2, Edit3, X, Building2, Sparkles } from 'lucide-react';

const initialTechs = [
  {
    id: 'k1',
    title: '一种高效降解水体微塑料的新型微生物菌剂',
    domain: '环境与生态',
    status: 'seeking',
    date: '2023-11-15',
    desc: '本技术分离出一株能够高效降解PET/PE微塑料的特异性菌株，实验室条件下48小时降解率可达65%，目前尚未申请专利，属于核心专有技术，正寻求环保企业进行中试合作。',
    contact: '王教授 (生命科学学院)'
  },
  {
    id: 'k2',
    title: '基于大模型的工业设备预测性维护系统底座',
    domain: '人工智能',
    status: 'negotiating',
    date: '2023-10-22',
    desc: '利用多模态大模型结合时序数据分析，实现对大型旋转机械的故障预测，准确率提升15%。核心算法作为技术秘密保留，寻找头部制造企业进行真实场景落地。',
    contact: '李研究员 (计算机科学与技术学院)'
  },
  {
    id: 'k3',
    title: '耐超低温高强韧钛合金冶炼工艺参数控制技术',
    domain: '材料科学',
    status: 'seeking',
    date: '2023-11-01',
    desc: '经过上千次实验得出的特殊熔炼温度曲线与微量元素配比，使钛合金在-196℃下冲击韧性提高40%。该工艺参数不宜公开，作为专有技术寻求特种装备制造企业转让或合作。',
    contact: '张教授 (材料科学与工程学院)'
  }
];

interface Props { userRole: UserRole; }

export const UnpatentedTechHub: React.FC<Props> = ({ userRole }) => {
  const isEnterprise = userRole === 'enterprise';
  const [techs, setTechs] = useState(initialTechs);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', domain: '环境与生态', desc: '', contact: '' });
  const [searchQuery, setSearchQuery] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.desc) {
      setTechs([{ 
        id: Date.now().toString(), 
        ...formData, 
        status: 'seeking', 
        date: new Date().toISOString().split('T')[0] 
      }, ...techs]);
      setShowAddForm(false);
      setFormData({ title: '', domain: '环境与生态', desc: '', contact: '' });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-[#0F52BA]" />
            未入库技术 / 专有技术 平台
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {isEnterprise ? '浏览吉林大学专家发布的高价值前沿专有技术，获取尚未形成专利的隐形技术资产。' : '供吉林大学教师发布尚未形成专利（或不宜公开申请专利）的核心技术成果，供系统在后台为企业进行加密匹配。'}
          </p>
        </div>
        {!isEnterprise && (<button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#0F52BA] text-white rounded-xl font-bold hover:bg-[#082C6C] transition-colors shrink-0"
        >
          <Plus className="w-5 h-5" />
          发布未入库技术
        </button>)}
      </div>

      
      {/* Enhanced Search Bar */}
      <div className="relative group mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500 opacity-50 group-hover:opacity-100"></div>
        <div className="relative flex items-center bg-white border border-slate-200 group-hover:border-blue-300 rounded-2xl shadow-sm transition-all duration-300 overflow-hidden focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:border-blue-400">
          <div className="pl-5 pr-2 flex items-center justify-center">
            <Search className="w-6 h-6 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-300" />
          </div>
          <input 
            type="text" 
            placeholder="在海量未公开的隐形专有技术资产池中探索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-4 px-2 text-base bg-transparent border-none focus:outline-hidden text-slate-700 placeholder-slate-400"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="px-4 text-slate-300 hover:text-slate-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <div className="pr-2 pl-1 py-2">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-md hover:bg-slate-800 transition-colors duration-300 whitespace-nowrap">
              <Sparkles className="w-4 h-4 text-blue-300" />
              精准发现
            </button>
          </div>
        </div>
      </div>

      {showAddForm && (
        <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 relative">
          <button onClick={() => setShowAddForm(false)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 bg-white rounded-full"><X className="w-4 h-4" /></button>
          <h3 className="text-lg font-bold text-blue-900 mb-4">发布新的技术成果</h3>
          <form onSubmit={handleAdd} className="space-y-4 max-w-3xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">技术名称</label>
                <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} type="text" className="w-full px-4 py-2 rounded-xl border border-blue-200 bg-white focus:outline-hidden focus:border-blue-400" placeholder="例如：一种新型高分子材料合成配方" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">所属领域</label>
                <select value={formData.domain} onChange={e => setFormData({...formData, domain: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-blue-200 bg-white focus:outline-hidden focus:border-blue-400">
                  <option>环境与生态</option>
                  <option>人工智能</option>
                  <option>材料科学</option>
                  <option>机械工程</option>
                  <option>生物医药</option>
                </select>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">联系人及院系</label>
              <input required value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} type="text" className="w-full px-4 py-2 rounded-xl border border-blue-200 bg-white focus:outline-hidden focus:border-blue-400" placeholder="例如：张教授 (化学学院)" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">技术简介及优势 (脱敏)</label>
              <textarea required value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} rows={4} className="w-full px-4 py-2 rounded-xl border border-blue-200 bg-white focus:outline-hidden focus:border-blue-400 resize-none" placeholder="简要描述技术效果、应用场景及合作诉求，请勿包含需保密的核心参数..."></textarea>
            </div>
            <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-sm">
              确认发布
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {techs.filter(tech => tech.title.includes(searchQuery) || tech.desc.includes(searchQuery) || tech.domain.includes(searchQuery)).map(tech => (
          <div key={tech.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg">{tech.domain}</span>

              </div>
              <h4 className="text-lg font-bold text-slate-900 leading-tight mb-2 line-clamp-2">{tech.title}</h4>
              <p className="text-sm text-slate-500 line-clamp-3 mb-4">{tech.desc}</p>
            </div>
            
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs text-slate-500 flex flex-col">
                <span className="font-semibold text-slate-700">{tech.contact}</span>
                <span>发布于 {tech.date}</span>
              </div>
              {isEnterprise ? (
                <button className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold transition-colors cursor-pointer shadow-sm">
                  发起合作意向
                </button>
              ) : (
              <div className="flex gap-2">
                <button className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"><Edit3 className="w-4 h-4" /></button>
                <button className="p-2 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer" onClick={() => setTechs(techs.filter(t => t.id !== tech.id))}><Trash2 className="w-4 h-4" /></button>
              </div>
              )}
            </div>
            
            {tech.status === 'seeking' && (
               <div className="mt-3 bg-blue-50/50 p-2.5 rounded-lg border border-blue-100/50 flex items-center justify-between text-xs cursor-pointer hover:bg-blue-50 transition-colors">
                  <span className="text-slate-600 flex items-center gap-1"><Building2 className="w-3.5 h-3.5 text-blue-500" /> AI智能体匹配到 <strong>3</strong> 家潜在企业</span>
                  <span className="text-blue-700 font-bold">查看推荐 &rarr;</span>
               </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
