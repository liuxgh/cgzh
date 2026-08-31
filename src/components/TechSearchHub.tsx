import React, { useState } from 'react';
import { Search, Building2, ChevronLeft, ArrowRight, User, Star, Beaker, FileText, ChevronDown, ChevronUp, Image, CheckCircle, Loader2 } from 'lucide-react';

interface Props {
  query: string;
  onBack: () => void;
  universityScope?: string | null;
}

export const TechSearchHub: React.FC<Props> = ({ query, onBack, universityScope }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [currentQuery, setCurrentQuery] = useState(query);
  const [isMatching, setIsMatching] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [showMatchSuccess, setShowMatchSuccess] = useState(false);

  const handleFileUpload = (type: 'doc' | 'img') => {
    const fileName = type === 'doc' ? '技术需求文档_v1.pdf' : '应用场景示意图.png';
    if (!uploadedFiles.includes(fileName)) {
      setUploadedFiles([...uploadedFiles, fileName]);
    }
  };

  const handleMatch = () => {
    setIsMatching(true);
    setShowMatchSuccess(false);
    setTimeout(() => {
      setIsMatching(false);
      setShowMatchSuccess(true);
      setTimeout(() => setShowMatchSuccess(false), 3000);
    }, 1500);
  };


  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const allSearchResults = [
    {
      id: 'res-1',
      type: 'patent',
      title: '一种高镍正极材料表面异质外延包覆层及其制备方法',
      no: 'CN115832104B',
      universityId: 'jlu',
      university: '吉林大学',
      description: '本发明涉及新能源电池材料改性技术，通过异质外延包覆有效解决了高镍正极材料循环稳定性差和安全隐患。',
      details: '该技术通过在锂离子电池高镍正极材料表面原位生长具有快离子导体特性的异质外延包覆层，不仅抑制了高镍正极材料与电解液的副反应，还显著提升了材料的锂离子传输速率。在1C充放电条件下，500次循环后容量保持率大于92%，极大提高了电池的安全性能与使用寿命。',
      inventor: {
        name: '张宇轩'
      }
    },
    {
      id: 'res-2',
      type: 'knowhow',
      title: '新型固态电池高离子电导率电解质配方',
      no: '未公开专有技术',
      universityId: 'seu',
      university: '东南大学',
      description: '经实验室验证室温离子电导率达到10^-3 S/cm量级，尚未申请专利，作为技术秘密寻求电池智造头部企业联合开发。',
      details: '本团队开发了一种基于聚合物-无机复合的固态电解质新配方。利用特殊的交联网络结构，克服了传统固态电解质界面阻抗过大的痛点。该技术处于中试前阶段，适合与具备电池产线的企业进行深度联合开发，以期实现下一代高比能固态电池的产业化。',
      inventor: {
        name: '李建国'
      }
    },
    {
      id: 'res-3',
      type: 'patent',
      title: '一种高比能锂硫电池用多孔碳硫复合正极的制备方法',
      no: 'CN113429812A',
      universityId: 'hhu',
      university: '河海大学',
      description: '利用分级多孔碳材料有效物理限域多硫化物，结合化学吸附作用，抑制穿梭效应，提升锂硫电池寿命。',
      details: '针对锂硫电池充放电过程中的“穿梭效应”难题，本发明提出了一种以农业废弃物为碳源制备分级多孔碳基体的方法，并引入极性金属氧化物纳米颗粒。该复合材料不仅具备高比表面积，能实现高硫负载，还能通过强化学键合作用锚定多硫化锂。',
      inventor: {
        name: '王小芳'
      }
    },
    {
      id: 'res-4',
      type: 'knowhow',
      title: '电池热失控预警算法模型与嵌入式系统',
      no: '软件及算法模型',
      universityId: 'jlu',
      university: '吉林大学',
      description: '基于多维传感器数据融合与边缘计算的实时热失控预测算法，提前预警时间超过15分钟。',
      details: '本项目通过采集电池组运行过程中的微小温度梯度、电压波动及应力变化，利用轻量级神经网络模型在BMS(电池管理系统)端进行实时推理。模型占用资源极低，预警准确率达到99.2%，为新能源汽车动力电池安全提供最后一道防线。',
      inventor: {
        name: '陈大明'
      }
    },
    {
      id: 'res-5',
      type: 'patent',
      title: '高比能电池复合集流体制备技术',
      no: 'CN114521098A',
      universityId: 'jlu',
      university: '吉林大学',
      description: '采用新型高分子基材双面镀金属层技术，相比传统铜箔铝箔减重40%，有效提升电池能量密度，且能阻断内短路热失控。',
      details: '该技术通过磁控溅射与水解电镀相结合的工艺，在超薄PET/PP基材上实现致密金属层的沉积。不仅大幅降低了集流体的重量和成本，更因高分子基底在高温下会熔化断路，赋予了电池在穿刺条件下的本征安全性。',
      inventor: {
        name: '赵清'
      }
    }
  ];

  // Filter based on universityScope if provided (e.g. 'jlu'). Otherwise show all (Global search).
  const searchResults = universityScope 
    ? allSearchResults.filter(res => res.universityId === universityScope)
    : allSearchResults;

  const isGlobalSearch = !universityScope;
  const pageTitle = isGlobalSearch ? '全网技术寻源 (AI)' : '吉大技术寻源 (AI)';

  return (
    <div className="space-y-6 animate-in fade-in pb-12">
      <button onClick={onBack} className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1 cursor-pointer">
        <ChevronLeft className="w-4 h-4" /> 返回
      </button>
      
      
      {/* Search Input Area */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-[#0F52BA]" />
            <h3 className="font-bold text-slate-800 text-lg">AI 智能匹配分析</h3>
          </div>
          <p className="text-sm text-slate-500">通过多模态 AI 大模型，支持文本、文档、图像等多维度意图识别，为您精准匹配关联技术资产。</p>
        </div>
        
        <div className="relative">
          <textarea 
            rows={4}
            value={currentQuery}
            onChange={(e) => setCurrentQuery(e.target.value)}
            placeholder="输入您的技术需求、应用场景或业务痛点，支持多行文本..."
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 pb-14 resize-none focus:outline-hidden focus:border-[#0F52BA] focus:ring-2 focus:ring-blue-100 transition-all text-sm leading-relaxed"
          />
          
          {uploadedFiles.length > 0 && (
            <div className="absolute left-4 bottom-14 flex flex-wrap gap-2 mb-2">
              {uploadedFiles.map((file, idx) => (
                <div key={idx} className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 text-xs rounded-md border border-blue-200">
                  {file.includes('pdf') ? <FileText className="w-3 h-3" /> : <Image className="w-3 h-3" />}
                  {file}
                  <button onClick={() => setUploadedFiles(uploadedFiles.filter(f => f !== file))} className="ml-1 hover:text-blue-900">&times;</button>
                </div>
              ))}
            </div>
          )}

          <div className="absolute right-3 bottom-3 flex items-center gap-2">
            <button onClick={() => handleFileUpload('doc')} className="p-2 text-slate-400 hover:text-[#0F52BA] bg-white rounded-lg border border-slate-200 shadow-xs hover:border-[#0F52BA] transition-colors" title="上传需求文档">
              <FileText className="w-4 h-4" />
            </button>
            <button onClick={() => handleFileUpload('img')} className="p-2 text-slate-400 hover:text-[#0F52BA] bg-white rounded-lg border border-slate-200 shadow-xs hover:border-[#0F52BA] transition-colors" title="上传产品/场景图片">
              <Image className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div>
            {showMatchSuccess && (
              <span className="flex items-center gap-1.5 text-sm text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 animate-in fade-in slide-in-from-left-2">
                <CheckCircle className="w-4 h-4" /> 匹配完成，已更新结果库
              </span>
            )}
          </div>
          <button 
            onClick={handleMatch}
            disabled={isMatching}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 disabled:opacity-70 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
          >
            {isMatching ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {isMatching ? 'AI 深度分析中...' : '重新深度匹配'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Search className="w-6 h-6 text-[#0F52BA]" /> 
            {isGlobalSearch ? '全网' : '本校'}匹配结果
          </h2>
          <span className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-bold rounded-lg border border-blue-100">
            为您匹配到 {searchResults.length} 项前沿技术
          </span>
        </div>
        
        <div className="space-y-6">
           {searchResults.length === 0 ? (
             <div className="py-12 text-center text-slate-500">该校暂无匹配的技术成果</div>
           ) : searchResults.map((res) => (
             <div key={res.id} className={`border ${res.type === 'patent' ? 'border-blue-100 bg-blue-50/20' : 'border-emerald-100 bg-emerald-50/20'} rounded-2xl p-6 relative overflow-hidden transition-all hover:shadow-md`}>
               {res.type === 'knowhow' && (
                 <div className="absolute top-4 right-[-30px] rotate-45 bg-emerald-500 text-white text-[10px] font-bold py-1 w-32 text-center shadow-sm">
                   未公开专有技术
                 </div>
               )}
               
               <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-4">
                 <div className="flex-1">
                   <div className="flex items-center gap-3 mb-2">
                     <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded-lg">
                       {res.no}
                     </span>
                   </div>
                   
                   <h3 className="text-xl font-bold text-slate-900 leading-snug">{res.title}</h3>
                   
                   <div className="text-sm text-slate-500 mt-2 flex flex-wrap items-center gap-4">
                     <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4 text-slate-400" /> {res.university}</span>
                   </div>
                 </div>
                 
                 <button className={`shrink-0 px-5 py-2 text-white font-bold rounded-xl text-sm shadow-sm transition-colors cursor-pointer flex items-center gap-2 ${res.type === 'patent' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}>
                   {res.type === 'patent' ? '联系对接人' : '发起合作意向'}
                 </button>
               </div>
               
               <p className="text-slate-600 text-sm leading-relaxed mb-5">
                 {res.description}
               </p>
               
               <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-4 border-t border-slate-200/50">
                 <div className="flex items-center gap-2">
                   <div className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                     <User className="w-4 h-4 text-slate-400" /> 发明人: {res.inventor.name}
                   </div>
                 </div>
                 
                 <button 
                   onClick={() => toggleExpand(res.id)}
                   className="text-sm font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors"
                 >
                   {expandedId === res.id ? (
                     <>收起技术详情 <ChevronUp className="w-4 h-4" /></>
                   ) : (
                     <>查看技术详情 <ChevronDown className="w-4 h-4" /></>
                   )}
                 </button>
               </div>
               
               {/* Expandable Details */}
               {expandedId === res.id && (
                 <div className="mt-4 p-4 bg-white rounded-xl border border-slate-100 text-sm text-slate-600 leading-relaxed animate-in slide-in-from-top-2">
                   <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                     <FileText className="w-4 h-4 text-slate-400" /> 技术摘要与应用前景
                   </h4>
                   <p>{res.details}</p>
                 </div>
               )}
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};
