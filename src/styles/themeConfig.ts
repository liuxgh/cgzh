export type ThemeStyle = 
  | 'baiten-classic'    // 佰腾官方经典蓝橙 (Baiten Official Blue & Orange)
  | 'academic-jlu'      // 吉大深邃学术蓝 (JLU Academic Navy & Sapphire)
  | 'cyber-tech'        // 现代科技深色 (Cyber AI Dark & Indigo)
  | 'emerald-energy'    // 生态新工科翠绿 (Eco Green & Clean Energy)
  | 'warm-amber';       // 科技商务金橙 (Warm Gold & Amber Tech)

export interface ThemeConfig {
  id: ThemeStyle;
  name: string;
  badge: string;
  description: string;
  colors: {
    primary: string;
    primaryHover: string;
    accent: string;
    accentHover: string;
    topBarBg: string;
    headerBg: string;
    navBg: string;
    bannerGradient: string;
    cardBorder: string;
    pageBg: string;
    footerBg: string;
    tagBg: string;
    tagText: string;
  };
  previewColors: string[];
}

export const THEME_CONFIGS: Record<ThemeStyle, ThemeConfig> = {
  'baiten-classic': {
    id: 'baiten-classic',
    name: '佰腾官方经典 (蓝橙)',
    badge: '官方标准',
    description: '匹配 www.baiten.cn 官方品牌视觉：科技深蓝底蕴 + 活力金橙焦点，数据权威感强。',
    colors: {
      primary: '#0F52BA',
      primaryHover: '#0D449E',
      accent: '#FF7A00',
      accentHover: '#FF9500',
      topBarBg: 'bg-[#082C6C]',
      headerBg: 'bg-linear-to-r from-[#0F52BA] via-[#145BCB] to-[#0D449E]',
      navBg: 'bg-[#0A3D8F]',
      bannerGradient: 'bg-linear-to-r from-[#082C6C] via-[#0F52BA] to-[#0A3D8F]',
      cardBorder: 'border-[#D8E2F0]',
      pageBg: 'bg-[#F4F7FB]',
      footerBg: 'bg-[#082C6C]',
      tagBg: 'bg-blue-50',
      tagText: 'text-blue-700',
    },
    previewColors: ['#0F52BA', '#FF7A00', '#082C6C', '#F4F7FB']
  },
  'academic-jlu': {
    id: 'academic-jlu',
    name: '吉大极简典雅 (学府深蓝)',
    badge: '高校专属',
    description: '吉林大学专属科研风范：深邃吉大蓝 + 纯白高对比度 + 铂金灰调，庄重严谨、专注科研检索。',
    colors: {
      primary: '#003366',
      primaryHover: '#002244',
      accent: '#3B82F6',
      accentHover: '#2563EB',
      topBarBg: 'bg-[#001F3F]',
      headerBg: 'bg-linear-to-r from-[#003366] via-[#004080] to-[#002244]',
      navBg: 'bg-[#002B55]',
      bannerGradient: 'bg-linear-to-r from-[#001F3F] via-[#003366] to-[#004B87]',
      cardBorder: 'border-slate-200',
      pageBg: 'bg-[#F8FAFC]',
      footerBg: 'bg-[#001F3F]',
      tagBg: 'bg-blue-500/20',
      tagText: 'text-blue-200',
    },
    previewColors: ['#003366', '#3B82F6', '#001F3F', '#F8FAFC']
  },
  'cyber-tech': {
    id: 'cyber-tech',
    name: '星际智能极夜 (AI 深空黑)',
    badge: '极客AI',
    description: '深空极夜夜间模式：曜石黑 + 极光紫电蓝 + 荧光青，凸显 AI 智能体推理与大数据穿透的高科技感。',
    colors: {
      primary: '#6366F1',
      primaryHover: '#4F46E5',
      accent: '#06B6D4',
      accentHover: '#0891B2',
      topBarBg: 'bg-[#090D16]',
      headerBg: 'bg-linear-to-r from-[#0B0F19] via-[#111827] to-[#1E1B4B]',
      navBg: 'bg-[#0F172A]',
      bannerGradient: 'bg-linear-to-r from-[#0B0F19] via-[#1E1B4B] to-[#0F172A]',
      cardBorder: 'border-slate-800',
      pageBg: 'bg-[#0B0F17]',
      footerBg: 'bg-[#070A10]',
      tagBg: 'bg-cyan-500/20',
      tagText: 'text-cyan-300',
    },
    previewColors: ['#6366F1', '#06B6D4', '#0F172A', '#0B0F17']
  },
  'emerald-energy': {
    id: 'emerald-energy',
    name: '双碳产业清新 (翡翠新工科)',
    badge: '产业生态',
    description: '双碳、新能源新材料与大健康产业：翡翠绿 + 普鲁士蓝，契合高价值成果孵化与可持续发展。',
    colors: {
      primary: '#0D9488',
      primaryHover: '#0F766E',
      accent: '#F59E0B',
      accentHover: '#D97706',
      topBarBg: 'bg-[#064E3B]',
      headerBg: 'bg-linear-to-r from-[#064E3B] via-[#0F766E] to-[#0D9488]',
      navBg: 'bg-[#042F2E]',
      bannerGradient: 'bg-linear-to-r from-[#042F2E] via-[#064E3B] to-[#0F766E]',
      cardBorder: 'border-emerald-100',
      pageBg: 'bg-[#F0FDF4]',
      footerBg: 'bg-[#042F2E]',
      tagBg: 'bg-emerald-500/20',
      tagText: 'text-emerald-200',
    },
    previewColors: ['#0D9488', '#F59E0B', '#064E3B', '#F0FDF4']
  },
  'warm-amber': {
    id: 'warm-amber',
    name: '科技商务暖金 (尊享金石)',
    badge: '高端商务',
    description: '技术转移与资本运作高端风：曜夜深灰 + 雅金暖橙，注重商业估值交易与重大专利转化签约。',
    colors: {
      primary: '#D97706',
      primaryHover: '#B45309',
      accent: '#3B82F6',
      accentHover: '#2563EB',
      topBarBg: 'bg-[#1C1917]',
      headerBg: 'bg-linear-to-r from-[#1C1917] via-[#292524] to-[#451A03]',
      navBg: 'bg-[#1F1D1B]',
      bannerGradient: 'bg-linear-to-r from-[#1C1917] via-[#451A03] to-[#78350F]',
      cardBorder: 'border-amber-100',
      pageBg: 'bg-[#FDFBF7]',
      footerBg: 'bg-[#1C1917]',
      tagBg: 'bg-blue-500/20',
      tagText: 'text-cyan-300',
    },
    previewColors: ['#D97706', '#3B82F6', '#1C1917', '#FDFBF7']
  }
};
