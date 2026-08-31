import React, { useState } from 'react';
import { Target, Plus, CheckCircle, Clock, X, MessageSquare } from 'lucide-react';

export const EnterpriseDemands = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [demands, setDemands] = useState([
    {
      id: 'd1',
      title: '高能量密度固态电池正极材料联合研发',
      domain: '新能源',
      budget: '500万-1000万',
      date: '2023-11-20',
      status: 'active'
    },
    {
      id: 'd2',
      title: '工业视觉表面缺陷检测算法优化 (要求误检率<1%)',
      domain: '人工智能',
      budget: '100万-200万',
      date: '2023-10-15',
      status: 'matching'
    }
  ]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Target className="w-6 h-6 text-[#0F52BA]" />
            我的技术需求悬赏
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            发布企业研发痛点，系统将自动匹配高校科研团队及存量高价值专利。
          </p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#0F52BA] text-white rounded-xl font-bold hover:bg-[#082C6C] transition-colors shrink-0 cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          发布新需求
        </button>
      </div>

      {showAddForm && (
        <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 relative">
          <button onClick={() => setShowAddForm(false)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 bg-white rounded-full cursor-pointer"><X className="w-4 h-4" /></button>
          <h3 className="text-lg font-bold text-blue-900 mb-4">发布新的悬赏需求</h3>
          <form className="space-y-4 max-w-3xl" onSubmit={(e) => { e.preventDefault(); setShowAddForm(false); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">需求标题</label>
                <input required type="text" className="w-full px-4 py-2 rounded-xl border border-blue-200 bg-white focus:outline-none focus:border-blue-400" placeholder="例如：新能源电池寿命延长方案" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">研发预算</label>
                <select className="w-full px-4 py-2 rounded-xl border border-blue-200 bg-white focus:outline-none focus:border-blue-400">
                  <option>50万以内</option>
                  <option>50万-100万</option>
                  <option>100万-500万</option>
                  <option>500万以上</option>
                </select>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">技术难点描述</label>
              <textarea required rows={4} className="w-full px-4 py-2 rounded-xl border border-blue-200 bg-white focus:outline-none focus:border-blue-400 resize-none" placeholder="详细描述目前遇到的瓶颈、对解决方案的期望指标等..."></textarea>
            </div>
            <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-sm cursor-pointer">
              确认发布
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {demands.map(demand => (
          <div key={demand.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg">{demand.domain}</span>
                {demand.status === 'active' ? (
                  <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded text-xs font-bold border border-emerald-100">
                    <CheckCircle className="w-3 h-3" /> 悬赏中
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-1 rounded text-xs font-bold border border-blue-100">
                    <Clock className="w-3 h-3" /> 方案对接中
                  </span>
                )}
              </div>
              <h4 className="text-lg font-bold text-slate-900 leading-tight mb-2 line-clamp-2">{demand.title}</h4>
              <p className="text-sm text-slate-500 mb-4">预算规模: <span className="font-bold text-slate-700">{demand.budget}</span></p>
            </div>
            
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">发布于 {demand.date}</span>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-bold transition-colors cursor-pointer border border-slate-200">
                <MessageSquare className="w-3.5 h-3.5" /> 查看收到的方案
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
