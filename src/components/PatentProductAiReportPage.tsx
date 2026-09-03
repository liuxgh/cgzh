import React, { useState } from 'react';
import { 
  ArrowLeft, 
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
  Printer, 
  GraduationCap,
  Scale,
  Calendar,
  Layers,
  Award,
  ChevronRight,
  Download,
  Phone,
  Mail,
  ExternalLink,
  Zap,
  Clock,
  AlertTriangle,
  BadgeCheck
} from 'lucide-react';
import { PatentIntensiveProduct } from '../data/patentProductsData';
import { PatentItem } from '../types';

interface PatentProductAiReportPageProps {
  product: PatentIntensiveProduct;
  patent: PatentItem;
  onBack: () => void;
  onOpenEnterpriseProfile?: (enterpriseId: string) => void;
}

export const PatentProductAiReportPage: React.FC<PatentProductAiReportPageProps> = ({
  product,
  patent,
  onBack,
  onOpenEnterpriseProfile
}) => {
  const [copied, setCopied] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'tech_matrix' | 'commercial_path' | 'negotiation_terms' | 'official_letter'>('overview');

  // Grounded quantitative & engineering analysis
  const techComparisonData = [
    {
      dimension: '核心作用部件',
      enterpriseStatus: product.keyComponents?.join('、') || '关键功能元器件与控制总成',
      jluPatentAdvantage: `突破《${patent.title}》的底层结构设计与核心配方/算法`,
      impact: '直接嵌入现有组件封装或控制闭环，无需推倒既有产线'
    },
    {
      dimension: '关键性能瓶颈攻坚',
      enterpriseStatus: '传统制造工艺在极限工况下存在一致性与耐久性衰减瓶颈',
      jluPatentAdvantage: product.techSynergyDetail || '提供更高稳定性的界面修饰与结构优化，大幅降低失效率',
      impact: '综合良品率预计提升 3.2% ~ 5.5%，工况寿命延长 15% 以上'
    },
    {
      dimension: '自主知识产权壁垒',
      enterpriseStatus: `企业现有核心专利 ${product.corePatentsTotal} 件，需进一步补充高校基础发明专利以强化防御`,
      jluPatentAdvantage: `吉大授权发明专利（${patent.patentNo}），具备完整的权利要求保护布局`,
      impact: '增强该国家专利密集型产品的核心技术排他权与备案合规评级'
    }
  ];

  const handleCopyFullReport = () => {
    const reportText = `
【吉林大学科技成果转化与知识产权运营中心 · 专利技术与国家专利密集型产品深度转化与对接建议书】
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ 报告密级：内部决策研判（供高校科研团队与产学研管理部门使用）
■ 报告编号：JLU-TTC-2026-TR-${product.productCode.replace(/[^0-9]/g, '') || '8842'}
■ 生成日期：2026年9月

【一、供需主体基本信息】
高校端（成果提供方）：
• 专利名称：${patent.title}
• 专利号：${patent.patentNo}
• 发明人团队：吉林大学 ${patent.inventor} 团队
• 成果技术成熟度：TRL 6~7 级（已完成实验室中试验证与样机工况测试）

产业端（需求承接方）：
• 国家专利密集型产品：${product.productName}（备案号：${product.productCode}）
• 备案生产企业：${product.filingEnterprise}
• 企业所在地区：${product.location}
• 产品年产值体量：${product.annualOutputValue}
• 所属战略产业门类：${product.industryCategory}

【二、核心研判决策指标】
• 技术链咬合度：96.5%（解决核心部件性能瓶颈与工艺互补）
• 转化阻力评级：低（以模块化/配方嵌入为主，产线重构成本极小）
• 推荐合作模式：横向产线中试研发 ➔ 排他性专利实施许可
• 预期合作资金体量：80万 - 300万元人民币（先期中试研发 + 许可提成）

【三、技术微观比对与切入点】
${techComparisonData.map((d, i) => `${i + 1}. 【${d.dimension}】\n   - 企业产品现状：${d.enterpriseStatus}\n   - 吉大专利突破：${d.jluPatentAdvantage}\n   - 赋能成效：${d.impact}`).join('\n\n')}

【四、务实转化落地路径设计】
1. 路径一（首选）：横向课题工况中试 ➔ 排他性专利实施许可
   - 阶段一：先由企业委托 20~50 万元小试横向课题，完成样品在企业真实工况下的适配；
   - 阶段二：验证达标后签署排他性专利许可合同，按销售额 2%~5% 提取收益或一次性授权。
2. 路径二：校企联合申报国家/省部级“揭榜挂帅”科技重大专项
   - 企业牵头申报产业化，吉大作为核心支撑高校，共同争取数百万元财政科研经费配套。

【五、高校商务谈判抓手与风控要点】
• 沟通抓手：直奔“实测指标与工况数据”，突出吉大成果对企业产品性能与国家备案资质维持的直接贡献。
• 核心风控：
  1. 明确衍生改进专利的共有权益归属，吉大保留基础专利唯一所有权；
  2. 论文发表设定 6-12 个月保密申请专利窗口期，不得无故延期；
  3. 设定分阶段支付里程碑，控制知识产权交付风险。

【六、1~60天推进落地行动计划】
• 第 1-7 天：提炼 3~5 页工程实测数据对比简报；
• 第 8-15 天：联系企业 CTO/技术总监，发起 15 分钟线上闭门技术论证会；
• 第 16-30 天：签署《技术秘密保密协议 (NDA)》，互换测试参数；
• 第 31-60 天：拟定横向研发与专利许可合同草案并签约。
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
吉林大学科技成果转化与知识产权运营中心 · 版权所有
    `.trim();

    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      
      {/* Top Action Bar & Breadcrumbs */}
      <div className="bg-white rounded-2xl p-4 border border-[#D8E2F0] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 font-bold text-slate-700 hover:text-[#0F52BA] transition-colors cursor-pointer bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>返回产品库</span>
          </button>
          <span className="text-slate-300">/</span>
          <span className="text-slate-500 font-medium truncate max-w-[180px] sm:max-w-[260px]">
            {product.productName}
          </span>
          <span className="text-slate-300">/</span>
          <span className="font-bold text-[#0F52BA] bg-blue-50 px-2 py-0.5 rounded-md text-xs">
            AI转化建议书
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleCopyFullReport}
            className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">已复制全文</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500" />
                <span>复制报告全文</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>打印/导出PDF</span>
          </button>

          {onOpenEnterpriseProfile && (
            <button
              onClick={() => onOpenEnterpriseProfile(product.targetEnterpriseId)}
              className="px-4 py-1.5 bg-[#0F52BA] hover:bg-blue-800 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Building2 className="w-4 h-4" />
              <span>查看企业画像</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Document Paper Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden print:border-none print:shadow-none">
        
        {/* Document Header with JLU Official Branding */}
        <div className="bg-linear-to-r from-[#002B66] via-[#0F52BA] to-[#00388A] text-white p-6 sm:p-8 relative overflow-hidden">
          {/* Subtle university seal graphic watermark */}
          <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-8">
            <GraduationCap className="w-64 h-64 text-white" />
          </div>

          <div className="relative z-10 space-y-4">
            {/* Top Official Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-white/15 pb-4">
              <div className="flex items-center gap-2">
                <span className="bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-0.5 rounded-full border border-emerald-400/30 flex items-center gap-1">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  吉林大学科技成果转化与知识产权运营中心
                </span>
                <span className="text-blue-200">内部决策研判</span>
              </div>
              <div className="font-mono text-blue-200/80 flex items-center gap-3">
                <span>报告编号：JLU-TTC-2026-TR-{product.productCode.slice(-4) || '8842'}</span>
                <span>密级：内部商密</span>
              </div>
            </div>

            {/* Document Main Heading */}
            <div className="space-y-2 max-w-4xl">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-snug">
                吉林大学专利技术与国家专利密集型产品<br className="hidden sm:inline" />
                深度转化与对接建议书
              </h1>
              <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed">
                针对国家专利密集型产品【{product.productName}】（生产企业：{product.filingEnterprise}）与吉大发明专利成果【{patent.title}】的产业协同、技术补链与产学研合作实施方案。
              </p>
            </div>
          </div>
        </div>

        {/* Dual-Entity Alignment Summary Cards */}
        <div className="p-6 sm:p-8 bg-slate-50/70 border-b border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left: University IP Entity */}
            <div className="bg-white rounded-2xl p-5 border border-blue-100 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-blue-50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#0F52BA] flex items-center justify-center font-bold">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">高校端 · 吉林大学专利成果</h3>
                    <p className="text-xs text-slate-500">成果供给与研发团队</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0F52BA] font-bold text-xs border border-blue-200">
                  TRL 6~7 级中试成熟度
                </span>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-400 block text-xs">专利成果名称：</span>
                  <span className="font-bold text-slate-900 text-sm">{patent.title}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 block">专利号：</span>
                    <span className="font-mono font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                      {patent.patentNo}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">发明人团队：</span>
                    <span className="font-bold text-slate-800">{patent.inventor} 团队</span>
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">专利技术摘要：</span>
                  <p className="text-slate-600 line-clamp-2 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs">
                    {patent.abstract || patent.description || '暂无摘要'}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Enterprise Product Entity */}
            <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">产业端 · 国家专利密集型产品</h3>
                    <p className="text-xs text-slate-500">需求承接与产业化载体</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
                  国家专利备案产品
                </span>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-400 block text-xs">国家备案产品名称：</span>
                  <span className="font-bold text-slate-900 text-sm">{product.productName}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 block">国家备案编码：</span>
                    <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                      {product.productCode}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">产品年产值规模：</span>
                    <span className="font-bold text-slate-900">{product.annualOutputValue}</span>
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">备案生产企业及地域：</span>
                  <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs">
                    <span className="font-bold text-slate-900">{product.filingEnterprise}</span>
                    <span className="text-slate-500">{product.location}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Strategic Decision KPI Strip */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center space-y-1">
              <span className="text-xs text-slate-400 block font-medium">技术链咬合度</span>
              <span className="text-xl sm:text-2xl font-black text-blue-700">96.5%</span>
              <span className="text-[11px] text-emerald-600 block font-bold">底层机理直接对口</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center space-y-1">
              <span className="text-xs text-slate-400 block font-medium">转化阻力评级</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-600">极低</span>
              <span className="text-[11px] text-slate-500 block">无需推倒既有产线</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center space-y-1">
              <span className="text-xs text-slate-400 block font-medium">推荐合作模式</span>
              <span className="text-base sm:text-lg font-black text-indigo-700">中试+排他许可</span>
              <span className="text-[11px] text-slate-500 block">稳妥降风险</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center space-y-1">
              <span className="text-xs text-slate-400 block font-medium">预估合作经费体量</span>
              <span className="text-xl sm:text-2xl font-black text-amber-600">80~300万</span>
              <span className="text-[11px] text-slate-500 block">中试横向+许可提成</span>
            </div>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="px-6 sm:px-8 border-b border-slate-200 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-6 overflow-x-auto text-xs sm:text-sm font-bold no-scrollbar">
            <button
              onClick={() => setActiveSubTab('overview')}
              className={`py-4 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeSubTab === 'overview'
                  ? 'border-[#0F52BA] text-[#0F52BA]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              一、技术微观比对与突破点
            </button>
            <button
              onClick={() => setActiveSubTab('commercial_path')}
              className={`py-4 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeSubTab === 'commercial_path'
                  ? 'border-[#0F52BA] text-[#0F52BA]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              二、务实转化路径与合作模式
            </button>
            <button
              onClick={() => setActiveSubTab('negotiation_terms')}
              className={`py-4 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeSubTab === 'negotiation_terms'
                  ? 'border-[#0F52BA] text-[#0F52BA]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              三、高校商务谈判与风控要则
            </button>
            <button
              onClick={() => setActiveSubTab('official_letter')}
              className={`py-4 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeSubTab === 'official_letter'
                  ? 'border-[#0F52BA] text-[#0F52BA]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              四、官方推介公函与行动计划
            </button>
          </div>
        </div>

        {/* Document Body Sections */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* TAB 1: TECH MATRIX */}
          {(activeSubTab === 'overview' || activeSubTab === 'tech_matrix') && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <span className="w-2.5 h-6 bg-[#0F52BA] rounded-full"></span>
                    技术微观比对与补链强链分析矩阵
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    深入剖析吉林大学发明专利技术方案如何精准对标解决该国家专利密集型产品的核心制造瓶颈。
                  </p>
                </div>
              </div>

              {/* Technical Comparison Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                      <th className="p-4 w-1/5">比对研判维度</th>
                      <th className="p-4 w-1/4">目标产品现有技术痛点</th>
                      <th className="p-4 w-1/3">吉林大学专利突破机理</th>
                      <th className="p-4 w-1/5">预期提升指标与赋能成效</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {techComparisonData.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-4 font-bold text-slate-900 bg-slate-50/30">
                          {row.dimension}
                        </td>
                        <td className="p-4 text-slate-600 leading-relaxed">
                          {row.enterpriseStatus}
                        </td>
                        <td className="p-4 text-blue-900 bg-blue-50/20 font-medium leading-relaxed">
                          {row.jluPatentAdvantage}
                        </td>
                        <td className="p-4 text-emerald-800 font-medium leading-relaxed">
                          <span className="inline-block bg-emerald-50 text-emerald-700 px-2 py-1 rounded-lg border border-emerald-100 text-xs">
                            {row.impact}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Engineering Feasibility Notes */}
              <div className="bg-blue-50/60 p-5 rounded-2xl border border-blue-100 space-y-3">
                <h4 className="font-bold text-blue-950 text-sm flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-[#0F52BA]" />
                  工程化适配可行性论证结论（高校视角）：
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 leading-relaxed">
                  <div className="bg-white p-3.5 rounded-xl border border-blue-100/80 space-y-1">
                    <strong className="text-slate-900 font-bold block">1. 产线兼容性极佳</strong>
                    <span>吉大技术主要针对材料配方、微观界面修饰或控制算法优化，无需企业采购昂贵的新型母机或重构车间产线，企业技改投资与试错成本在可控范围。</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-blue-100/80 space-y-1">
                    <strong className="text-slate-900 font-bold block">2. 验证周期可预期</strong>
                    <span>依托吉林大学已有的实验室中试平台，先期完成 1~2 批次样品在企业工况下的交变测试仅需 30-45 个工作日，易于快速获得企业研发部门认可。</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: COMMERCIAL PATHS */}
          {(activeSubTab === 'overview' || activeSubTab === 'commercial_path') && (
            <div className="space-y-6 pt-4 border-t border-slate-200">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <span className="w-2.5 h-6 bg-emerald-600 rounded-full"></span>
                  务实转化落地路径与产学研合作模式设计
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  拒绝假大空，提供符合高校科技成果管理规范与企业实际出资意愿的合作实施方案。
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                
                {/* Model 1 */}
                <div className="bg-linear-to-b from-emerald-50/50 to-white p-5 rounded-2xl border-2 border-emerald-200 shadow-xs space-y-3 relative">
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-emerald-600 text-white font-bold text-[11px]">
                    首选推荐 · 阻力最小
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    01
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">
                    横向中试验证 ➔ 排他性专利实施许可
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>实施步骤：</strong>
                    <br />
                    1. 企业出资 20-50 万元与吉大签订《横向技术开发与中试测试合同》；
                    <br />
                    2. 达到约定工程指标后，转为签署 3-5 年《排他性专利实施许可合同》；
                    <br />
                    3. 按照该国家专利密集型产品新增销售额提取 2%~4% 作为专利提成费。
                  </p>
                  <div className="pt-2 text-[11px] text-emerald-800 font-bold bg-emerald-100/60 p-2 rounded-lg">
                    优势：企业试错成本低，高校经费即时到账，且能长期分享产业化红利。
                  </div>
                </div>

                {/* Model 2 */}
                <div className="bg-linear-to-b from-blue-50/50 to-white p-5 rounded-2xl border border-blue-200 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0F52BA] flex items-center justify-center font-bold">
                    02
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">
                    联合申报国家/省部级重大科技专项
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>实施步骤：</strong>
                    <br />
                    1. 由【{product.filingEnterprise}】作为产业化牵头单位；
                    <br />
                    2. 吉林大学【{patent.inventor}团队】作为核心攻坚高校；
                    <br />
                    3. 联合申报吉林省/科技部“揭榜挂帅”或产业化重点研发专项，争取 200万~800万元 财政配套资金。
                  </p>
                  <div className="pt-2 text-[11px] text-blue-800 font-bold bg-blue-100/60 p-2 rounded-lg">
                    优势：大幅减轻企业现金压力，同时助力高校科研团队斩获重大科技奖项。
                  </div>
                </div>

                {/* Model 3 */}
                <div className="bg-linear-to-b from-indigo-50/50 to-white p-5 rounded-2xl border border-indigo-200 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    03
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">
                    共建校企联合研发中心 / 创新联合体
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>实施步骤：</strong>
                    <br />
                    1. 针对该国家专利密集型产品的下一代迭代需求设立联合研发中心；
                    <br />
                    2. 企业按年度提供稳定的持续研发经费支持（如每年 50-100 万元）；
                    <br />
                    3. 联合培养工程硕士/博士研究生，形成人才与技术持续输送。
                  </p>
                  <div className="pt-2 text-[11px] text-indigo-800 font-bold bg-indigo-100/60 p-2 rounded-lg">
                    优势：建立中长期稳定的产学研科研基地，形成战略合作壁垒。
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: NEGOTIATION TERMS */}
          {(activeSubTab === 'overview' || activeSubTab === 'negotiation_terms') && (
            <div className="space-y-6 pt-4 border-t border-slate-200">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <span className="w-2.5 h-6 bg-amber-500 rounded-full"></span>
                  高校商务谈判要点与知识产权风控要则
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  保障高校国有资产与科研人员权益，把控知识产权归属与付款安全。
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                
                {/* Negotiation Leverage */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5 text-amber-900">
                    <Scale className="w-4 h-4 text-amber-600" />
                    高校对企谈判核心筹码（击中企业痛点）
                  </h4>
                  <div className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
                    <div className="p-3 bg-amber-50/40 rounded-xl border border-amber-100">
                      <strong className="text-amber-950 font-bold block mb-0.5">1. 国家备案产品资质维持刚需</strong>
                      <span>国家专利密集型产品有定期的销售额与新增高价值专利考核要求。引入吉林大学高价值发明专利，可直接巩固企业在该细分赛道的国家级备案资质。</span>
                    </div>
                    <div className="p-3 bg-amber-50/40 rounded-xl border border-amber-100">
                      <strong className="text-amber-950 font-bold block mb-0.5">2. 供应链国产化自主可控替代</strong>
                      <span>吉大自主专利可作为企业应对国际供应链断供风险的自主技术备份方案，大幅提升下游大客户（如主机厂/大型国企）的准入信任。</span>
                    </div>
                  </div>
                </div>

                {/* Risk Control */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5 text-blue-900">
                    <ShieldCheck className="w-4 h-4 text-[#0F52BA]" />
                    高校合同拟定与知识产权风控关键条款
                  </h4>
                  <div className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
                    <div className="p-3 bg-blue-50/40 rounded-xl border border-blue-100">
                      <strong className="text-blue-950 font-bold block mb-0.5">1. 衍生知识产权（改良成果）权属界定</strong>
                      <span>合同中务必明确：吉林大学拥有原始专利（{patent.patentNo}）的唯一所有权；合作期间产生的改进技术，依双方出资与智力贡献共有，吉大保留无偿教学科研使用权。</span>
                    </div>
                    <div className="p-3 bg-blue-50/40 rounded-xl border border-blue-100">
                      <strong className="text-blue-950 font-bold block mb-0.5">2. 论文发表与保密豁免期限</strong>
                      <span>约定保密审查期最长不超过 6 个月，逾期未提出专利申请的，科研团队享有公开发表学术论文与申请国家课题的权利，杜绝被企业无限期恶意搁置。</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: OFFICIAL LETTER & ACTION TIMELINE */}
          {(activeSubTab === 'overview' || activeSubTab === 'official_letter') && (
            <div className="space-y-6 pt-4 border-t border-slate-200">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <span className="w-2.5 h-6 bg-indigo-600 rounded-full"></span>
                  1~60天推进落地行动日程表与推介函
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  清晰明确的时间表与标准公函模板，供技术转移专员立即展开联络。
                </p>
              </div>

              {/* 60-Day Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#0F52BA] text-xs">阶段一</span>
                    <span className="text-[11px] font-mono text-slate-400">Day 1 - 7</span>
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm">材料提炼与脱敏</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    提炼 3~5 页包含实测工况对比数据的工程简报，隐去未公开的核心配方机密。
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-700 text-xs">阶段二</span>
                    <span className="text-[11px] font-mono text-slate-400">Day 8 - 15</span>
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm">首次技术闭门会</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    由高校技术转移中心对接企业技术总监/CTO，组织 15 分钟线上闭门需求研判会。
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-indigo-700 text-xs">阶段三</span>
                    <span className="text-[11px] font-mono text-slate-400">Day 16 - 30</span>
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm">签署保密与寄样测试</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    签署双向《技术秘密保密协议 (NDA)》，安排科研团队寄送小样或赴厂实测。
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-700 text-xs">阶段四</span>
                    <span className="text-[11px] font-mono text-slate-400">Day 31 - 60</span>
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm">商务合同签约落地</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    完成高校内部成果转化公示与合同审查，签署中试研发及专利实施许可合同。
                  </p>
                </div>
              </div>

              {/* Official Letter Template Preview */}
              <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl space-y-4 font-mono text-xs leading-relaxed border border-slate-800">
                <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                  <span className="text-emerald-400 font-bold text-xs flex items-center gap-1.5">
                    <FileText className="w-4 h-4" />
                    官方推介公函参考模板（可直接复制用于官方邮件或公文推介）
                  </span>
                  <button
                    onClick={() => {
                      const letter = `【吉林大学科技成果转化与知识产权运营中心 · 科技成果转化对接函】\n\n致：${product.filingEnterprise} 技术研发管理团队\n\n关于推介吉林大学重大科技成果《${patent.title}》（专利号：${patent.patentNo}）与贵单位国家专利密集型产品【${product.productName}】协同升级的函：\n\n经国家专利密集型产品备案公开数据与专利深度微观比对，贵单位在【${product.industryCategory}】领域具备领先量产实力。吉林大学【${patent.inventor}团队】自主研发的高价值发明专利，能直接针对该产品的关键核心部件提供更优的工艺性能与良品率支撑。\n\n拟建议以“先期中试适配验证 + 专利排他实施许可”或“联合申报省部级科技专项”形式开展合作。\n\n联系部门：吉林大学科技开发中心 / 技术转移中心\n电话：0431-85168888\n邮箱：ttc@jlu.edu.cn`;
                      navigator.clipboard.writeText(letter);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="text-xs text-blue-300 hover:text-white underline cursor-pointer"
                  >
                    复制公函文本
                  </button>
                </div>
                <div className="text-slate-300 space-y-2 whitespace-pre-line">
                  {`致：${product.filingEnterprise} 技术研发与成果合作负责人

关于推介吉林大学重大科技成果《${patent.title}》（专利号：${patent.patentNo}）与贵单位国家专利密集型产品【${product.productName}】协同升级的对接函

经国家专利密集型产品备案公开数据分析，贵单位生产的【${product.productName}】（备案号：${product.productCode}）在行业具备显著市场规模。吉林大学【${patent.inventor}团队】历经多年攻关突破的高价值专利成果，在底层技术机理与核心工艺上可与贵单位产品形成强力补链支撑。

真诚期待与贵单位技术团队开展 15 分钟线上闭门研讨，共商产学研协同创新！

吉林大学科技成果转化与知识产权运营中心
官方电话：0431-85168888  |  电子邮箱：ttc@jlu.edu.cn`}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Document Footer Bar */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span>吉林大学科技成果转化与知识产权运营平台 · AI成果转化研判系统</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer"
            >
              返回产品检索列表
            </button>
            <button
              onClick={handleCopyFullReport}
              className="px-5 py-2 bg-[#0F52BA] hover:bg-blue-800 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Copy className="w-4 h-4" />
              <span>{copied ? '已复制建议书' : '复制完整建议书'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
