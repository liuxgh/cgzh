export type TabType = 
  | 'overview' 
  | 'patent-similar'
  | 'industry-chain'
  | 'patent-product'
  | 'ai-agent'
  | 'tech-map'
  | 'unpatented-tech'
  | 'enterprise-dashboard'
  | 'tech-search'
  | 'enterprise-landing'
  | 'enterprise-demands';

export type UserRole = 'university' | 'enterprise';

export interface PatentItem {
  id: string;
  patentNo: string;
  title: string;
  college: string;
  inventor: string;
  team: string;
  field: 'automotive' | 'materials' | 'optoelectronics' | 'biomedicine' | 'agriculture' | 'geology' | 'ai_computing' | 'equipment';
  fieldName: string;
  ipc: string;
  applicationDate: string;
  grantDate: string;
  status: 'valid' | 'open_licensed' | 'in_negotiation' | 'transferred';
  trlLevel: number; // 1-9
  trlDescription: string;
  baitengScore: {
    overall: number; // 0-100
    technical: number;
    legal: number;
    market: number;
    barrier: number;
  };
  valuationRange: string;
  openLicensePrice?: string;
  transferModes: ('transfer' | 'exclusive_license' | 'general_license' | 'open_license' | 'equity')[];
  abstract: string;
  innovations: string[];
  applicableIndustries: string[];
  viewCount: number;
  matchCount: number;
  documents: { title: string; size: string; type: string }[];
  // Linked matched target enterprise counts
  matchedEnterprisesCount?: {
    bySimilarPatent: number;
    byIndustryChain: number;
    byPatentProduct: number;
  };
}

export interface EnterpriseDemand {
  id: string;
  companyName: string;
  logoColor: string;
  industry: string;
  region: string;
  scale: string;
  businessSummary: string;
  demandTitle: string;
  demandDescription: string;
  techKeywords: string[];
  budget: string;
  cooperationMode: 'license' | 'transfer' | 'joint_lab' | 'custom_dev' | 'equity';
  urgency: 'high' | 'medium' | 'low';
  publishDate: string;
  status: 'open' | 'matching' | 'closed';
  matchedPatentIds: string[];
  contactPerson: string;
  contactTitle: string;
}

// Target Enterprise (靶向企业 - 核心数据结构)
export interface TargetEnterprise {
  id: string;
  name: string;
  shortName: string;
  creditCode: string;
  registeredCapital: string;
  location: string;
  province: string;
  city: string;
  industry: string;
  scale: string;
  enterpriseType: '上市企业' | '国家级专精特新“小巨人”' | '制造业单项冠军' | '高新技术企业' | '行业龙头国企';
  revenue: string;
  rdInvestment: string;
  rdRatio: string;
  patentTotalCount: number;
  inventionPatentCount: number;
  
  // 匹配路径与匹配度
  matchSource: 'similar_patent' | 'industry_chain' | 'patent_product' | 'multi_dimension';
  matchScore: number;
  synergyReason: string;
  
  // 1. 相似专利数据（企业拥有的与吉大专利高度相似的专利）
  similarPatents?: {
    patentNo: string;
    title: string;
    ipc: string;
    grantDate: string;
    similarityScore: number;
    techOverlapDescription: string;
  }[];

  // 2. 产业链定位数据
  chainPosition?: {
    chainId: string;
    chainName: string;
    node: 'upstream' | 'midstream' | 'downstream';
    nodeName: string;
    subSegment: string;
    mainProducts: string[];
  };

  // 3. 专利密集型产品备案数据
  patentProducts?: {
    productCode: string;
    productName: string;
    filingYear: string;
    productCategory: string;
    annualOutputValue: string;
    corePatentCount: number;
    patentSynergyPoint: string;
  }[];

  // 技术诉求与攻关痛点画像
  techPainPoints: string[];
  rdDirections: string[];
  preferredCollabMode: string;

  // 关键决策人与大学对接联络画像
  contact: {
    dept: string;
    contactPerson: string;
    title: string;
    phone: string;
    email: string;
    suggestedApproach: string;
  };
  // 核心发明人（通过专利量统计算法提取的该企业技术核心人员）
  keyInventors?: {
    name: string;
    patentCount: number;
    title?: string;
  }[];
}

export interface MatchAnalysisReport {
  synergyScore: number;
  technologicalFit: string;
  keyAdvantages: string[];
  conversionFeasibility: string;
  recommendedPath: string;
  potentialRisks: string;
  economicEstimation: string;
}

export interface ValuationResult {
  overallScore: number;
  techScore: number;
  legalScore: number;
  marketScore: number;
  trlLevel: number;
  suggestedTransferPrice: string;
  suggestedLicensePrice: string;
  openLicenseStatus: string;
  valuationSummary: string;
}
