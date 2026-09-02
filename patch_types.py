with open('src/types.ts', 'r') as f:
    content = f.read()

replacement = """export interface TargetEnterprise {
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
  
  // 工商及联系信息
  legalRep?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  establishedDate?: string;
  businessScope?: string;
  status?: string;
  oldName?: string;"""

content = content.replace("export interface TargetEnterprise {\n  id: string;\n  name: string;\n  shortName: string;\n  creditCode: string;\n  registeredCapital: string;\n  location: string;\n  province: string;\n  city: string;\n  industry: string;\n  scale: string;\n  enterpriseType: '上市企业' | '国家级专精特新“小巨人”' | '制造业单项冠军' | '高新技术企业' | '行业龙头国企';\n  revenue: string;\n  rdInvestment: string;\n  rdRatio: string;\n  patentTotalCount: number;\n  inventionPatentCount: number;", replacement)

# Add Enterprise profile tab type if it doesn't exist
if "'enterprise-profile'" not in content:
    content = content.replace("type TabType = ", "type TabType = 'enterprise-profile' | ")

with open('src/types.ts', 'w') as f:
    f.write(content)
print("Updated types.ts")
