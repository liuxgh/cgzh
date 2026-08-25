const fs = require('fs');

function replaceStr(file, targetRegex, replacement) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(targetRegex, replacement);
  fs.writeFileSync(file, content, 'utf8');
}

// 1. Header.tsx
replaceStr('src/components/Header.tsx', /<div className="relative w-12 h-12 shrink-0 overflow-hidden rounded-full border border-slate-200 shadow-sm bg-white">[\s\S]*?佰腾大数据驱动\s*<\/span>\s*<\/div>\s*<\/div>/, `<div className="w-28 shrink-0 flex items-center">
            <img src="https://www.baiten.cn/images/baiten/logo3.svg" alt="Baiten Logo" className="w-full h-auto" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 font-sans">
                佰腾网
              </span>
              <div className="h-4 w-px bg-slate-300 rounded-full mx-1" />
              <span className="text-base sm:text-lg font-semibold text-slate-700">
                吉林大学科技成果转化专区
              </span>
            </div>
          </div>`);

// 2. Remove "研发投入：" from OverviewDashboard.tsx
replaceStr('src/components/OverviewDashboard.tsx', /<span.*?研发投入：<strong className="text-slate-800 font-mono">\{ent\.rdInvestment\}<\/strong><\/span>/g, '');

// 2. Remove "对接人" from OverviewDashboard.tsx
replaceStr('src/components/OverviewDashboard.tsx', /<div className="text-slate-500 text-\[11px\]">\s*对接人：.*?<\/div>/g, '<div></div>');

// 3. Remove "研发投入" from PatentSimilarSearchHub.tsx
replaceStr('src/components/PatentSimilarSearchHub.tsx', /<span className="text-slate-300">•<\/span>\s*<span className="text-sm text-slate-500">\s*研发投入：<strong className="text-slate-800 font-mono">\{enterprise\.rdInvestment\}<\/strong> \(占比\{enterprise\.rdRatio\}\)\s*<\/span>/g, '');

// 3. Remove "对接人" from PatentSimilarSearchHub.tsx
replaceStr('src/components/PatentSimilarSearchHub.tsx', /<div className="text-slate-600">\s*<span className="text-slate-400">高校产学研对接人：<\/span>\s*<strong className="text-slate-800">\{enterprise\.contact\.contactPerson\}<\/strong> \(\{enterprise\.contact\.title\} - \{enterprise\.contact\.dept\}\)\s*<span className="text-slate-400 ml-2 font-mono">\{enterprise\.contact\.phone\}<\/span>\s*<\/div>/g, '<div></div>');

// 4. Remove "企业资质类型筛选" from PatentSimilarSearchHub.tsx
replaceStr('src/components/PatentSimilarSearchHub.tsx', /\{\/\* Enterprise Type Filter \*\/\}\s*<div className="lg:col-span-3 space-y-1\.5">[\s\S]*?<\/select>\s*<\/div>/g, '');

// 5. Remove "企业资质类型" badge from PatentSimilarSearchHub.tsx (the pill badge)
replaceStr('src/components/PatentSimilarSearchHub.tsx', /<span className="px-2\.5 py-0\.5 rounded-full bg-blue-50 text-\[#0F52BA\] text-sm font-bold border border-blue-200">\s*\{enterprise\.enterpriseType\}\s*<\/span>/g, '');

// 6. Remove "综合协同匹配度" from PatentSimilarSearchHub.tsx
replaceStr('src/components/PatentSimilarSearchHub.tsx', /<div className="text-right">\s*<span className="text-\[11px\] text-slate-400 block">综合技术协同度<\/span>\s*<span className="text-2xl font-black text-emerald-600 font-mono">\s*\{enterprise\.matchScore\} <span className="text-sm font-normal text-slate-400">分<\/span>\s*<\/span>\s*<\/div>/g, '');


// 7. Remove matchScore from OverviewDashboard.tsx
replaceStr('src/components/OverviewDashboard.tsx', /<div className="text-right shrink-0">\s*<span className="text-sm text-slate-500 block">协同匹配得分<\/span>\s*<span className="text-xl font-black text-emerald-600 font-mono">\s*\{ent\.matchScore\} <span className="text-sm font-normal text-slate-400">分<\/span>\s*<\/span>\s*<\/div>/g, '');

// 8. Remove enterpriseType from OverviewDashboard.tsx
replaceStr('src/components/OverviewDashboard.tsx', /<span className="px-2 py-0\.5 rounded-md bg-blue-50 text-blue-700 text-\[10px\] font-bold border border-blue-100 flex items-center gap-1">\s*<Building2 className="w-3 h-3" \/>\s*\{ent\.enterpriseType\}\s*<\/span>/g, '');

// 9. Remove matchScore from AiEnterpriseAgent.tsx
replaceStr('src/components/AiEnterpriseAgent.tsx', /<div className="text-right shrink-0">\s*<span className="text-\[10px\] text-slate-400 block">AI 协同得分<\/span>\s*<span className="text-xl font-black text-emerald-600 font-mono">\{ent\.matchScore\}分<\/span>\s*<\/div>/g, '');

// 10. Remove enterpriseType from AiEnterpriseAgent.tsx
replaceStr('src/components/AiEnterpriseAgent.tsx', /<span className="px-2 py-0\.5 rounded-md bg-blue-50 text-blue-700 text-\[10px\] font-bold border border-blue-100">\s*\{ent\.enterpriseType\}\s*<\/span>/g, '');

// 11. Remove contact from AiEnterpriseAgent.tsx
replaceStr('src/components/AiEnterpriseAgent.tsx', /<span className="text-slate-500 text-\[11px\]">\s*对接人：<strong className="text-slate-800">\{ent\.contact\.contactPerson\}<\/strong> \(\{ent\.contact\.title\}\)\s*<\/span>/g, '<span></span>');


// 12. Remove matchScore from IndustryChain57Hub.tsx
replaceStr('src/components/IndustryChain57Hub.tsx', /<span className="font-mono text-xl font-black text-emerald-600 shrink-0">\s*\{ent\.matchScore\}分\s*<\/span>/g, '');

console.log("All replacements processed.");
