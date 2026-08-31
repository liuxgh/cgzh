import sys

with open('src/components/JluTechMapPage.tsx', 'r') as f:
    content = f.read()

# 1. Update Props
content = content.replace(
    "interface Props { userRole?: UserRole; onNavigateToSearch?: () => void; }",
    "import { PatentItem } from '../types';\ninterface Props { userRole?: UserRole; onNavigateToSearch?: () => void; onSelectPatent?: (patent: PatentItem) => void; }"
)

# 2. Update Component signature
content = content.replace(
    "export const JluTechMapPage: React.FC<Props> = ({ userRole = 'university', onNavigateToSearch }) => {",
    "export const JluTechMapPage: React.FC<Props> = ({ userRole = 'university', onNavigateToSearch, onSelectPatent }) => {"
)

# 3. Add handlePatentClick
handler = """  const [activeDomain, setActiveDomain] = useState(techDomains[0]);

  const handlePatentClick = (pat: any) => {
    if (!onSelectPatent) return;
    const mockPatent: PatentItem = {
      id: pat.id,
      patentNo: pat.no,
      title: pat.name,
      college: '吉林大学',
      inventor: '张发明 (示例)',
      team: '核心技术研发团队',
      field: 'automotive',
      fieldName: activeDomain.title,
      ipc: pat.tags[0]?.replace('IPC: ', '') || 'A01',
      applicationDate: '2023-01-10',
      grantDate: '2024-02-15',
      status: 'valid',
      trlLevel: 7,
      trlDescription: '已完成实验室小试，进入中试阶段。',
      baitengScore: { overall: 92, technical: 95, legal: 88, market: 90, barrier: 95 },
      valuationRange: '100万 - 300万',
      transferModes: ['transfer', 'exclusive_license'],
      abstract: `【核心专利】${pat.name}。该专利属于${activeDomain.title}技术领域的重点高潜转化成果。`,
      innovations: ['打破国外技术垄断', '显著提升关键性能指标', '具备极高的市场应用前景'],
      applicableIndustries: ['智能制造', '新能源', '高端装备'],
      viewCount: 1542,
      matchCount: 36,
      documents: [{ title: '专利说明书.pdf', size: '2.4 MB', type: 'pdf' }]
    };
    onSelectPatent(mockPatent);
  };"""

content = content.replace(
    "const [activeDomain, setActiveDomain] = useState(techDomains[0]);",
    handler
)

# 4. Update the onClick
content = content.replace(
    '<div key={pat.id} className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-blue-500/50 hover:bg-slate-800/80 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300 cursor-pointer group flex flex-col justify-between relative overflow-hidden">',
    '<div key={pat.id} onClick={() => handlePatentClick(pat)} className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-blue-500/50 hover:bg-slate-800/80 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300 cursor-pointer group flex flex-col justify-between relative overflow-hidden">'
)

with open('src/components/JluTechMapPage.tsx', 'w') as f:
    f.write(content)
