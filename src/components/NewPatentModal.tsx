import React, { useState } from 'react';
import { X, PlusCircle, CheckCircle2, FileText, Cpu, Award } from 'lucide-react';
import { PatentItem } from '../types';

interface NewPatentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (patent: PatentItem) => void;
}

export const NewPatentModal: React.FC<NewPatentModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [patentNo, setPatentNo] = useState('');
  const [inventor, setInventor] = useState('');
  const [college, setCollege] = useState('');
  const [field, setField] = useState<'automotive' | 'materials' | 'optoelectronics' | 'biomedicine' | 'agriculture' | 'geology'>('automotive');
  const [ipc, setIpc] = useState('B60T 13/74');
  const [trlLevel, setTrlLevel] = useState<number>(7);
  const [valuationRange, setValuationRange] = useState('200万 - 350万元');
  const [openLicensePrice, setOpenLicensePrice] = useState('30万元/年');
  const [abstract, setAbstract] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const fieldNames: Record<string, string> = {
      automotive: '汽车与智能网联',
      materials: '化学与超分子新材料',
      optoelectronics: '电子信息与精密仪器',
      biomedicine: '生物医药与白求恩医学',
      agriculture: '现代农业与黑土地保护',
      geology: '智能勘探与特种机械'
    };

    const newPatent: PatentItem = {
      id: `pat-${Date.now()}`,
      patentNo: patentNo.trim() || `CN202610${Math.floor(100000 + Math.random() * 900000)}.X`,
      title: title.trim(),
      college: '',
      inventor: inventor.trim() || '吉大发明人',
      team: '前沿创新团队',
      field,
      fieldName: fieldNames[field] || '综合工科',
      ipc: ipc.trim() || 'G06F 17/00',
      applicationDate: '2024-03-12',
      grantDate: '2025-06-18',
      status: 'valid',
      trlLevel,
      trlDescription: `TRL ${trlLevel} 级 - 已完成实验室与中试台架验证`,
      baitengScore: {
        overall: 91,
        technical: 93,
        legal: 90,
        market: 92,
        barrier: 89
      },
      valuationRange: valuationRange.trim() || '200万 - 300万元',
      openLicensePrice: openLicensePrice.trim() || '30万元/年',
      transferModes: ['transfer', 'exclusive_license', 'general_license', 'open_license'],
      abstract: abstract.trim() || '本发明提供了一种高可靠性工业级解决方案，显著降低系统能耗与制造成本。',
      innovations: ['原创自主核心架构', '具备完整中试验证数据包', '突破传统工艺性能极限'],
      applicableIndustries: ['先进装备制造', '新能源产业', '新材料应用'],
      viewCount: 1,
      matchCount: 3,
      documents: [
        { title: '吉林大学科技成果披露与申报表.pdf', size: '1.8 MB', type: 'PDF' }
      ]
    };

    onSubmit(newPatent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 border border-slate-200 shadow-2xl space-y-4 my-8">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">吉林大学科技成果披露与专利入库申报</h3>
              <p className="text-[11px] text-slate-500">录入后将自动接入佰腾价值评估雷达并参与企业需求智能匹配</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 font-bold text-base">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-sm">
          <div>
            <label className="text-slate-700 font-bold block mb-1">专利/成果名称 *</label>
            <input
              type="text"
              required
              placeholder="例如：一种高能量密度固态锂电池正极材料合成方法"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-slate-700 font-bold block mb-1">专利申请号/授权号</label>
              <input
                type="text"
                placeholder="例如：CN202410882319.4"
                value={patentNo}
                onChange={(e) => setPatentNo(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              />
            </div>
            <div>
              <label className="text-slate-700 font-bold block mb-1">发明人 / 团队领衔</label>
              <input
                type="text"
                placeholder="例如：王教授 团队"
                value={inventor}
                onChange={(e) => setInventor(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-slate-700 font-bold block mb-1">所属院系 / 重点实验室</label>
              <select
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              >
                <option value="汽车工程学院">汽车工程学院 (汽车仿真国重室)</option>
                <option value="化学学院">化学学院 (超分子化学国重室)</option>
                <option value="电子科学与工程学院">电子科学与工程学院 (光电子国重室)</option>
                <option value="药学院/白求恩医学院">药学院 / 白求恩第一临床医学院</option>
                <option value="生物与农业工程学院">生物与农业工程学院 (仿生农机)</option>
                <option value="建设工程学院">建设工程学院 (深部钻探国地联合)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-700 font-bold block mb-1">学科领域专区</label>
              <select
                value={field}
                onChange={(e) => setField(e.target.value as any)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              >
                <option value="automotive">汽车与智能网联</option>
                <option value="materials">化学与超分子新材料</option>
                <option value="optoelectronics">电子信息与精密仪器</option>
                <option value="biomedicine">生物医药与白求恩医学</option>
                <option value="agriculture">现代农业与黑土地保护</option>
                <option value="geology">智能勘探与特种机械</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-slate-700 font-bold block mb-1">技术就绪度 (TRL)</label>
              <select
                value={trlLevel}
                onChange={(e) => setTrlLevel(Number(e.target.value))}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              >
                <option value={5}>TRL 5级 (实验室原型)</option>
                <option value={6}>TRL 6级 (中试验证)</option>
                <option value={7}>TRL 7级 (工程样机完成)</option>
                <option value={8}>TRL 8级 (产线集成通过)</option>
                <option value={9}>TRL 9级 (具备规模量产)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-700 font-bold block mb-1">意向转让参考估值</label>
              <input
                type="text"
                placeholder="200万 - 350万元"
                value={valuationRange}
                onChange={(e) => setValuationRange(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              />
            </div>

            <div>
              <label className="text-slate-700 font-bold block mb-1">开放许可年费率</label>
              <input
                type="text"
                placeholder="30万元/年"
                value={openLicensePrice}
                onChange={(e) => setOpenLicensePrice(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-700 font-bold block mb-1">成果技术方案与主要创新指标</label>
            <textarea
              rows={3}
              placeholder="简述核心技术方案、主要创新点、相比行业现有竞品的突出优势及适用企业..."
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 resize-none"
            />
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
              className="px-5 py-2 text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-1.5 shadow-xs"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>提交入库与披露备案</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
