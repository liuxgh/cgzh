import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Building2, 
  FileText, 
  Package, 
  CheckCircle2, 
  Copy, 
  Check, 
  Lightbulb, 
  TrendingUp, 
  ShieldCheck, 
  Handshake, 
  Send,
  GraduationCap,
  Scale,
  ListOrdered
} from 'lucide-react';
import { PatentIntensiveProduct } from '../data/patentProductsData';
import { PatentItem } from '../types';

interface AiProductSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: PatentIntensiveProduct | null;
  patent: PatentItem | null;
  onOpenAiActionPlan?: (targetEnterpriseId: string) => void;
}

export const AiProductSummaryModal: React.FC<AiProductSummaryModalProps> = ({
  isOpen,
  onClose,
  product,
  patent,
  onOpenAiActionPlan
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !product || !patent) return null;

  // Real, grounded university-centric comparison report
  const analysisReport = {
    // 1. 技术点对点比对
    techMapping: {
      targetComponent: product.keyComponents?.slice(0, 2).join('、') || '核心功能模块',
      jluPatentFocus: patent.title,
      synergyPoint: product.techSynergyDetail || '吉大专利技术能有效对标解决该产品在实际生产或使用中的核心工艺与性能瓶颈。'
    },
    // 2. 高校技术切入优势（真实、不夸大）
    coreAdvantages: [
      `工程适配性：吉大专利在【${patent.title}】上的参数与配方，可直接嵌入【${product.productName}】的现有产线或下一代技术迭代中，避免企业颠覆性重构产线。`,
      `指标提升点：重点在可靠性、关键性能一致性或降本降耗等关键工艺环节提供底层技术支撑。`,
      `自主可控壁垒：可为该国家备案产品补充高价值高校发明专利授权，增强核心部件的自主知识产权护城河。`
    ],
    // 3. 推荐合作落地模式（高校可操作性强）
    cooperationPaths: [
      {
        type: '模式一：横向课题中试研发 ➔ 专利实施许可（最稳妥、推荐）',
        desc: `先以企业委托横向课题（10-50万元）完成在【${product.filingEnterprise}】现有工况下的样品测试与产线适配验证；验证合格后，签署排他性专利实施许可或技术转让协议。`,
        tag: '落地阻力最小'
      },
      {
        type: '模式二：联合申报省部级/国家级“揭榜挂帅”科技专项',
        desc: `以【${product.filingEnterprise}】为产业牵头单位、吉林大学【${patent.inventor}团队】为技术支撑，共同申报重大重点研发计划，争取政府配套科技研发资金。`,
        tag: '获批资金与成果奖'
      }
    ],
    // 4. 高校谈判筹码与沟通要点
    negotiationPoints: [
      `资质维护诉求：该产品为国家备案专利密集型产品（年产值【${product.annualOutputValue}】），企业对产品持续升级与维持高价值专利群有硬性诉求。`,
      `沟通切入点：建议高校科研团队在对接时，直奔“实测指标与工况验证数据”，重点介绍吉大技术如何帮助该产品提升良率或降低材料能耗。`
    ],
    // 5. 立即行动清单
    actionSteps: [
      `1. 准备材料：提取专利中关于测试数据、工况对比的图表，形成3-5页工程化简报（避免纯理论推导）；`,
      `2. 对接联系：由学校技术转移中心或发明人联系企业技术研发负责人/CTO，建议优先组织线上15分钟技术研判会；`,
      `3. 商务推进：明确以“先小试验证、后商务签约”的稳健节奏推进，保障高校知识产权权益。`
    ]
  };

  const handleCopyText = () => {
    const fullText = `
【高校技术转移与成果转化 · AI转化建议报告】
━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ 吉大专利：${patent.patentNo} - ${patent.title}
■ 发明人团队：${patent.inventor}
■ 对口国家专利密集型产品：${product.productName}（备案号：${product.productCode}）
■ 备案生产企业：${product.filingEnterprise}（${product.location}）
■ 产品年产值：${product.annualOutputValue}

【一、技术精准比对与结合点】
• 对应产品部件：${analysisReport.techMapping.targetComponent}
• 技术结合切入点：${analysisReport.techMapping.synergyPoint}

【二、高校技术切入优势】
${analysisReport.coreAdvantages.map(item => `• ${item}`).join('\n')}

【三、务实落地路径与合作模式建议】
${analysisReport.cooperationPaths.map(p => `• ${p.type}\n  ${p.desc}`).join('\n')}

【四、高校谈判筹码与沟通要点】
${analysisReport.negotiationPoints.map(p => `• ${p}`).join('\n')}

【五、高校技术转移落地行动清单】
${analysisReport.actionSteps.join('\n')}
━━━━━━━━━━━━━━━━━━━━━━━━━━━
吉林大学科技成果转化与知识产权运营平台 · AI转化建议
    `.trim();

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="bg-linear-to-r from-[#003366] via-[#0F52BA] to-[#0A3D8F] text-white p-5 sm:p-6 flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 flex items-center gap-1 backdrop-blur-xs">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-300" />
                高校技术转移专属 · AI转化建议报告
              </span>
              <span className="px-2 py-0.5 rounded-md bg-white/15 text-blue-100 text-xs font-mono">
                {product.productCode}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {product.productName}
            </h3>
            <p className="text-xs text-blue-100/90">
              对口企业：{product.filingEnterprise}（{product.location}）· 年产值 {product.annualOutputValue}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer shrink-0"
            title="关闭"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 bg-slate-50/50">
          
          {/* Linked Key Entities Info Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white p-3.5 rounded-2xl border border-blue-100 shadow-xs space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F52BA]">
                <FileText className="w-4 h-4 text-[#0F52BA]" />
                <span>吉林大学专利成果</span>
              </div>
              <div className="text-sm font-bold text-slate-900 line-clamp-1">{patent.title}</div>
              <div className="text-xs text-slate-500 flex items-center gap-2 flex-wrap font-mono">
                <span className="text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">{patent.patentNo}</span>
                <span>发明人: {patent.inventor}</span>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-emerald-100 shadow-xs space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                <Package className="w-4 h-4 text-emerald-600" />
                <span>对口国家专利密集型产品</span>
              </div>
              <div className="text-sm font-bold text-slate-900 line-clamp-1">{product.productName}</div>
              <div className="text-xs text-slate-600 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="font-bold text-slate-800">{product.filingEnterprise}</span>
              </div>
            </div>
          </div>

          {/* Section 1: Tech Synergy & Fit */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
              <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#0F52BA] flex items-center justify-center">
                <Lightbulb className="w-4 h-4" />
              </div>
              <h4>一、技术结合点与切入位置</h4>
            </div>
            <div className="bg-blue-50/50 p-3.5 rounded-xl border border-blue-100/70 text-xs sm:text-sm text-slate-700 space-y-2 leading-relaxed">
              <div className="flex items-center gap-2 font-bold text-blue-950">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span>目标产品对应关键部件：{analysisReport.techMapping.targetComponent}</span>
              </div>
              <p className="text-slate-600">
                <strong className="text-slate-900 font-medium">切入结合分析：</strong>
                {analysisReport.techMapping.synergyPoint}
              </p>
            </div>
          </div>

          {/* Section 2: Core Advantages for University Tech */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4>二、吉大技术切入优势（务实研判）</h4>
            </div>
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {analysisReport.coreAdvantages.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Recommended Cooperation Paths */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
              <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <Handshake className="w-4 h-4" />
              </div>
              <h4>三、推荐产学研落地路径（操作性强）</h4>
            </div>
            <div className="space-y-2.5">
              {analysisReport.cooperationPaths.map((p, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-indigo-100 bg-indigo-50/30 hover:border-indigo-200 transition-all space-y-1.5">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-xs sm:text-sm font-bold text-indigo-950">{p.type}</span>
                    <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700 text-[11px] font-bold">
                      {p.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Negotiation Points & Action Steps */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                <Scale className="w-4 h-4" />
              </div>
              <h4>四、高校谈判筹码与行动清单</h4>
            </div>
            
            <div className="bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/60 text-xs text-slate-800 space-y-1.5 leading-relaxed">
              <strong className="text-amber-900 font-bold block">沟通谈判抓手：</strong>
              {analysisReport.negotiationPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-1.5">
                  <span className="text-amber-700 font-bold">•</span>
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="space-y-1.5 pt-1">
              <div className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <ListOrdered className="w-3.5 h-3.5 text-[#0F52BA]" />
                <span>技术转移行动指引：</span>
              </div>
              {analysisReport.actionSteps.map((step, idx) => (
                <div key={idx} className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  {step}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleCopyText}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">已复制比对报告</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500" />
                <span>复制比对报告</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer"
            >
              关闭
            </button>
            {onOpenAiActionPlan && (
              <button
                onClick={() => {
                  onClose();
                  onOpenAiActionPlan(product.targetEnterpriseId);
                }}
                className="px-4 py-2 bg-[#0F52BA] hover:bg-blue-800 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>生成高校对接建议书</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
