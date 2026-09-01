import React from 'react';
import { Building2, ArrowRight, Sparkles, Network, Fingerprint, Database, CheckCircle2 } from 'lucide-react';

interface Props {
  onSelectUniversity: (uniId: string) => void;
}

export const EnterpriseLandingPage: React.FC<Props> = ({ onSelectUniversity }) => {
  const universities = [
    {
      id: 'jlu',
      name: '吉林大学',
      logo: 'https://www.jlu.edu.cn/__local/0/5B/64/8C8DCC05EE61C79B65D1DFE86D2_14822F50_437B9.jpg',
      tags: ['985工程', '211工程', '双一流A类'],
      stats: { patents: '5.8万+', tech: '化学、机械、医学等' },
      status: 'active'
    },
    {
      id: 'hhu',
      name: '河海大学',
      logo: '/hehai.png',
      tags: ['211工程', '双一流'],
      stats: { patents: '3.2万+', tech: '水利工程、环境、土木等' },
      status: 'coming_soon'
    },
    {
      id: 'seu',
      name: '东南大学',
      logo: '/dongnan.png',
      tags: ['985工程', '211工程', '双一流A类'],
      stats: { patents: '8.5万+', tech: '建筑、电子、通信等' },
      status: 'coming_soon'
    },
    {
      id: 'jiangnan',
      name: '江南大学',
      logo: '/jiangnan.png',
      tags: ['211工程', '双一流'],
      stats: { patents: '4.1万+', tech: '食品科学、轻工技术等' },
      status: 'coming_soon'
    },
    {
      id: 'suda',
      name: '苏州大学',
      logo: '/suzhou.png',
      tags: ['211工程', '双一流'],
      stats: { patents: '6.8万+', tech: '材料科学、医学、纺织等' },
      status: 'coming_soon'
    },
    {
      id: 'njust',
      name: '南京理工大学',
      logo: '/nanjingligong.png',
      tags: ['211工程', '双一流'],
      stats: { patents: '5.4万+', tech: '兵器科学、化工、光学等' },
      status: 'coming_soon'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-10 sm:p-16 shadow-2xl border border-slate-800 overflow-hidden group">
        <div className="absolute -right-20 -top-20 w-[600px] h-[600px] bg-blue-600/20 group-hover:bg-blue-600/30 transition-colors duration-700 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute -left-20 -bottom-20 w-[400px] h-[400px] bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors duration-700 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-blue-200 text-sm font-bold shadow-sm">
            <Sparkles className="w-4 h-4" />
            国家级高校科技成果转化枢纽
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            汇聚顶尖科研力量 <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-white">
              赋能企业硬核科技创新
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
            打破产学研信息壁垒。在这里，企业可以直接穿透数十所“双一流”高校的底层数据库，通过 AI 智能体精准匹配解决您“卡脖子”痛点的核心专利、未公开技术与专家团队。
          </p>
          
          <div className="flex flex-wrap items-center gap-6 mt-8 pt-4">
            <div className="flex items-center gap-2 text-slate-300 font-medium">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>智能需求匹配</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 font-medium">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>海量未公开专有技术</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 font-medium">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>产学研一键直联</span>
            </div>
          </div>
        </div>
      </div>

      {/* University Grid */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Network className="w-6 h-6 text-blue-600" />
            已接入合作高校联盟
          </h2>
          <span className="text-sm font-bold text-slate-500">更多双一流高校持续接入中...</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {universities.map((uni) => (
            <div 
              key={uni.id}
              onClick={() => uni.status === 'active' && onSelectUniversity(uni.id)}
              className={`relative rounded-3xl p-6 border transition-all ${
                uni.status === 'active' 
                  ? 'bg-white border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-400 cursor-pointer group' 
                  : 'bg-slate-50 border-slate-200 opacity-80 hover:opacity-100 grayscale-[40%] hover:grayscale-0 transition-all duration-300'
              }`}
            >
              {uni.status !== 'active' && (
                <div className="absolute top-6 right-6 px-3 py-1.5 bg-slate-100 text-slate-500 border border-slate-200 text-xs font-bold rounded-lg shadow-sm">
                  即将接入
                </div>
              )}
              {uni.status === 'active' && (
                <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}

              <div className="h-16 flex items-center justify-start mb-6 mix-blend-multiply">
                 <img src={uni.logo} alt={uni.name} className="h-full w-auto object-contain max-w-[200px]" />
              </div>
              
              <h3 className="text-xl font-black text-slate-900 mb-3">{uni.name}</h3>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {uni.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[11px] font-bold rounded-md border border-slate-200/50 shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 flex items-center gap-1.5 font-medium"><Database className="w-4 h-4 text-slate-400" /> 成果库容量</span>
                  <span className="font-bold text-slate-900">{uni.stats.patents}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 flex items-center gap-1.5 font-medium"><Fingerprint className="w-4 h-4 text-slate-400" /> 优势学科</span>
                  <span className="font-bold text-slate-900 truncate max-w-[140px] text-right" title={uni.stats.tech}>{uni.stats.tech}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
