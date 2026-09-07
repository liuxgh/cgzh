import fs from 'fs';
import path from 'path';

// Helper to escape XML
function escapeXml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

console.log('Generating industry-chain-panoramic.svg and supply-chain-matching.svg...');

// 1. Generate 产业链全景图 SVG (1920x1080)
const panoramicSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" style="background:#030816; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <defs>
    <!-- Background Gradient -->
    <radialGradient id="bgGlow" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#08204d" stop-opacity="0.9"/>
      <stop offset="60%" stop-color="#041029" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#020612" stop-opacity="1"/>
    </radialGradient>

    <!-- Platform Gradients -->
    <linearGradient id="platGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#0284c7" stop-opacity="0.3"/>
    </linearGradient>

    <linearGradient id="beamGrad" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#0284c7" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"/>
    </linearGradient>

    <!-- Glow Filter -->
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>

    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1920" height="1080" fill="url(#bgGlow)"/>

  <!-- Perspective Isometric Grid Lines -->
  <g stroke="#0e2a56" stroke-width="1" opacity="0.45">
    ${Array.from({ length: 30 }, (_, i) => {
      const y = 200 + i * 35;
      return `<line x1="0" y1="${y}" x2="1920" y2="${y + 240}" stroke="#0b244d" stroke-dasharray="4,6"/>`;
    }).join('\n')}
    ${Array.from({ length: 30 }, (_, i) => {
      const y = 200 + i * 35;
      return `<line x1="1920" y1="${y}" x2="0" y2="${y + 240}" stroke="#0b244d" stroke-dasharray="4,6"/>`;
    }).join('\n')}
  </g>

  <!-- Floating Particles / Ambient Stars -->
  <g fill="#38bdf8" opacity="0.4">
    <circle cx="280" cy="180" r="1.5"/>
    <circle cx="540" cy="120" r="2"/>
    <circle cx="890" cy="90" r="1.5"/>
    <circle cx="1240" cy="140" r="2.5"/>
    <circle cx="1680" cy="220" r="2"/>
    <circle cx="170" cy="650" r="1.5"/>
    <circle cx="1790" cy="780" r="2"/>
    <circle cx="1450" cy="920" r="1.5"/>
  </g>

  <!-- Subtle Diagonal Watermark -->
  <g fill="#0b2246" opacity="0.3" font-size="28" font-weight="900" transform="rotate(-25 960 540)">
    <text x="200" y="300">Baiten® 一班® 佰腾科技</text>
    <text x="800" y="300">Baiten® 一班® 佰腾科技</text>
    <text x="1400" y="300">Baiten® 一班® 佰腾科技</text>
    <text x="400" y="650">Baiten® 一班® 佰腾科技</text>
    <text x="1000" y="650">Baiten® 一班® 佰腾科技</text>
    <text x="1600" y="650">Baiten® 一班® 佰腾科技</text>
  </g>

  <!-- Main Connecting Arterial Lines from Center (750, 420) -->
  <g stroke="#0284c7" stroke-width="2.5" opacity="0.85" filter="url(#softGlow)">
    <!-- Center to Upstream (Top Left) -->
    <path d="M 720 400 L 570 330 L 570 470" fill="none"/>
    <path d="M 570 470 L 410 470" fill="none"/>
    <path d="M 570 330 L 420 330 L 370 280 L 250 280" fill="none"/>
    <path d="M 420 330 L 380 390 L 290 390" fill="none"/>
    <path d="M 420 330 L 440 260 L 530 260" fill="none"/>
    <path d="M 570 470 L 520 400 L 580 370" fill="none"/>
    <path d="M 570 470 L 500 520 L 280 520" fill="none"/>

    <!-- Center to Midstream (Right) -->
    <path d="M 780 410 L 980 330 L 1080 330" fill="none"/>
    <path d="M 980 330 L 1060 250 L 1150 250" fill="none"/>
    <path d="M 1060 250 L 1150 210" fill="none"/>
    <path d="M 1060 250 L 1140 290" fill="none"/>
    <path d="M 1080 330 L 1160 330 L 1280 270 L 1520 270" fill="none"/>
    <path d="M 1280 270 L 1380 220 L 1640 220" fill="none"/>
    <path d="M 1280 270 L 1380 330 L 1540 330" fill="none"/>
    <path d="M 1080 330 L 1180 370 L 1400 370" fill="none"/>
    <path d="M 1180 370 L 1340 430 L 1420 430" fill="none"/>
    <path d="M 1180 370 L 1260 480 L 1510 480" fill="none"/>

    <!-- Center to Downstream (Bottom Center) -->
    <path d="M 740 450 L 760 630" fill="none"/>
    <path d="M 760 630 L 910 700 L 1020 700" fill="none"/>
    <path d="M 760 630 L 620 750 L 420 750" fill="none"/>
    <path d="M 760 630 L 800 820 L 1000 820" fill="none"/>
    <path d="M 800 820 L 900 880 L 1100 880" fill="none"/>
    <path d="M 800 820 L 700 900 L 880 900" fill="none"/>
    <path d="M 760 630 L 650 820 L 620 890" fill="none"/>
  </g>

  <!-- ==================== CENTER NODE: 新能源汽车 ==================== -->
  <g transform="translate(740, 390)">
    <!-- Base Hologram Ellipses -->
    <ellipse cx="0" cy="30" rx="60" ry="24" fill="#0284c7" opacity="0.3" filter="url(#glow)"/>
    <ellipse cx="0" cy="30" rx="46" ry="18" fill="url(#platGrad)" stroke="#38bdf8" stroke-width="2"/>
    <ellipse cx="0" cy="20" rx="36" ry="14" fill="#38bdf8" opacity="0.5"/>
    <path d="M -30 20 L -30 -10 L 30 -10 L 30 20 Z" fill="url(#beamGrad)"/>

    <!-- 3D Isometric Blue Car Silhouette -->
    <g transform="translate(0, -5) scale(0.9)">
      <path d="M -26 8 L -14 -12 L 14 -12 L 28 4 L 32 14 L -20 18 Z" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5"/>
      <path d="M -10 -8 L -2 -14 L 10 -14 L 14 -8 Z" fill="#7dd3fc" opacity="0.9"/>
      <circle cx="-14" cy="16" r="4" fill="#0f172a" stroke="#38bdf8"/>
      <circle cx="18" cy="14" r="4" fill="#0f172a" stroke="#38bdf8"/>
    </g>

    <!-- Node Badge -->
    <rect x="-65" y="48" width="130" height="30" rx="15" fill="#051229" stroke="#38bdf8" stroke-width="1.5" filter="url(#softGlow)"/>
    <text x="0" y="68" fill="#ffffff" font-size="14" font-weight="900" text-anchor="middle" letter-spacing="1">新能源汽车</text>
  </g>

  <!-- ==================== BRANCH 1: 上游-原材料 ==================== -->
  <g transform="translate(570, 450)">
    <!-- Upstream Dais -->
    <ellipse cx="0" cy="15" rx="42" ry="16" fill="url(#platGrad)" stroke="#38bdf8" stroke-width="1.5"/>
    <rect x="-50" y="24" width="100" height="24" rx="6" fill="#071b3d" stroke="#0284c7" stroke-width="1"/>
    <text x="0" y="40" fill="#e0f2fe" font-size="12" font-weight="bold" text-anchor="middle">上游-原材料</text>
  </g>

  <!-- Upstream Sub-Nodes -->
  <!-- 有色金属及化工原材料 -->
  <g transform="translate(580, 360)">
    <rect x="-16" y="-16" width="32" height="32" rx="6" fill="#0284c7" opacity="0.8"/>
    <text x="0" y="30" fill="#bae6fd" font-size="11" font-weight="bold" text-anchor="middle">有色金属及化工原材料</text>
  </g>

  <!-- 负极 & Subnodes -->
  <g transform="translate(420, 330)">
    <circle cx="0" cy="0" r="14" fill="#0369a1" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="0" y="25" fill="#e0f2fe" font-size="12" font-weight="bold" text-anchor="middle">负极</text>
  </g>
  <g transform="translate(290, 380)"><text x="0" y="0" fill="#94a3b8" font-size="11" font-weight="bold" text-anchor="end">石墨材料</text></g>
  <g transform="translate(250, 330)"><text x="0" y="0" fill="#94a3b8" font-size="11" font-weight="bold" text-anchor="end">碳材料</text></g>
  <g transform="translate(200, 280)"><text x="0" y="0" fill="#94a3b8" font-size="11" font-weight="bold" text-anchor="end">钛酸锂</text></g>
  <g transform="translate(130, 240)"><text x="0" y="0" fill="#94a3b8" font-size="11" font-weight="bold" text-anchor="end">硅碳负极</text></g>

  <!-- 正极 & Subnodes -->
  <g transform="translate(310, 380)">
    <circle cx="0" cy="0" r="12" fill="#0284c7" stroke="#38bdf8"/>
    <text x="0" y="22" fill="#e0f2fe" font-size="12" font-weight="bold" text-anchor="middle">正极</text>
  </g>
  <g transform="translate(150, 330)"><text x="0" y="0" fill="#94a3b8" font-size="11" font-weight="bold" text-anchor="end">三元材料</text></g>
  <g transform="translate(170, 370)"><text x="0" y="0" fill="#94a3b8" font-size="11" font-weight="bold" text-anchor="end">磷酸铁锂</text></g>
  <g transform="translate(230, 410)"><text x="0" y="0" fill="#94a3b8" font-size="11" font-weight="bold" text-anchor="end">锰/镍钴酸锂</text></g>

  <!-- 隔膜 & 电解液 -->
  <g transform="translate(500, 300)">
    <rect x="-10" y="-14" width="20" height="28" rx="3" fill="#0284c7" stroke="#38bdf8"/>
    <text x="0" y="24" fill="#bae6fd" font-size="11" font-weight="bold" text-anchor="middle">隔膜</text>
  </g>
  <g transform="translate(600, 250)">
    <rect x="-8" y="-18" width="16" height="36" rx="4" fill="#38bdf8" opacity="0.9"/>
    <text x="0" y="32" fill="#bae6fd" font-size="11" font-weight="bold" text-anchor="middle">电解液</text>
  </g>
  <g transform="translate(550, 190)"><text x="0" y="0" fill="#94a3b8" font-size="11">聚乙烯丙烯</text></g>
  <g transform="translate(590, 150)"><text x="0" y="0" fill="#94a3b8" font-size="11">添加剂</text></g>
  <g transform="translate(680, 180)"><text x="0" y="0" fill="#94a3b8" font-size="11">有机溶剂</text></g>
  <g transform="translate(730, 220)"><text x="0" y="0" fill="#94a3b8" font-size="11">电介质锂盐</text></g>
  <g transform="translate(280, 520)">
    <rect x="-20" y="-8" width="40" height="16" rx="4" fill="#0369a1" stroke="#38bdf8"/>
    <text x="0" y="22" fill="#bae6fd" font-size="11" font-weight="bold" text-anchor="middle">驱动电机关键原材料</text>
  </g>


  <!-- ==================== BRANCH 2: 中游-零部件 ==================== -->
  <g transform="translate(1050, 420)">
    <!-- Midstream Dais -->
    <ellipse cx="0" cy="15" rx="44" ry="18" fill="url(#platGrad)" stroke="#38bdf8" stroke-width="1.5"/>
    <rect x="-48" y="24" width="96" height="24" rx="6" fill="#071b3d" stroke="#0284c7" stroke-width="1"/>
    <text x="0" y="40" fill="#e0f2fe" font-size="12" font-weight="bold" text-anchor="middle">中游-零部件</text>
  </g>

  <!-- Midstream Sub-Nodes -->
  <g transform="translate(1060, 240)">
    <rect x="-14" y="-10" width="28" height="20" rx="3" fill="#0284c7"/>
    <text x="0" y="22" fill="#bae6fd" font-size="11" font-weight="bold" text-anchor="middle">电源系统</text>
  </g>
  <g transform="translate(950, 280)"><text x="0" y="0" fill="#94a3b8" font-size="11">电芯与PACK</text></g>
  <g transform="translate(1150, 270)"><text x="0" y="0" fill="#94a3b8" font-size="11">能源管理系统</text></g>
  <g transform="translate(1150, 190)"><text x="0" y="0" fill="#94a3b8" font-size="11">充电系统</text></g>
  <g transform="translate(1050, 320)"><text x="0" y="0" fill="#94a3b8" font-size="11">BMS(动力电池管理系统)</text></g>

  <g transform="translate(1200, 360)">
    <rect x="-16" y="-10" width="32" height="20" rx="4" fill="#0284c7"/>
    <text x="0" y="22" fill="#bae6fd" font-size="11" font-weight="bold" text-anchor="middle">电机控制器</text>
  </g>
  <g transform="translate(1310, 340)"><text x="0" y="0" fill="#94a3b8" font-size="11">驱动电机控制技术</text></g>

  <g transform="translate(1350, 420)">
    <ellipse cx="0" cy="0" rx="18" ry="10" fill="#0369a1" stroke="#38bdf8"/>
    <text x="0" y="22" fill="#bae6fd" font-size="11" font-weight="bold" text-anchor="middle">驱动电机</text>
  </g>
  <g transform="translate(1440, 400)"><text x="0" y="0" fill="#94a3b8" font-size="11">直流电机</text></g>
  <g transform="translate(1530, 360)"><text x="0" y="0" fill="#94a3b8" font-size="11">感应电机</text></g>
  <g transform="translate(1620, 320)"><text x="0" y="0" fill="#94a3b8" font-size="11">永磁电机</text></g>

  <g transform="translate(1400, 290)"><text x="0" y="0" fill="#94a3b8" font-size="11">辅助控制系统</text></g>
  <g transform="translate(1510, 250)"><text x="0" y="0" fill="#94a3b8" font-size="11">整车电子控制系统</text></g>
  <g transform="translate(1600, 210)"><text x="0" y="0" fill="#94a3b8" font-size="11">再生制动控制系统</text></g>
  <g transform="translate(1780, 230)"><text x="0" y="0" fill="#94a3b8" font-size="11">特种电动机</text></g>
  <g transform="translate(1730, 280)"><text x="0" y="0" fill="#94a3b8" font-size="11">开关磁阻电机</text></g>
  <g transform="translate(1860, 330)"><text x="0" y="0" fill="#94a3b8" font-size="11">控制器</text></g>
  <g transform="translate(1760, 370)"><text x="0" y="0" fill="#94a3b8" font-size="11">功率变换器</text></g>
  <g transform="translate(1700, 415)"><text x="0" y="0" fill="#94a3b8" font-size="11">电力电子元器件</text></g>

  <g transform="translate(1500, 500)">
    <rect x="-14" y="-8" width="28" height="16" rx="4" fill="#0284c7"/>
    <text x="0" y="20" fill="#bae6fd" font-size="11" font-weight="bold" text-anchor="middle">汽车电子</text>
  </g>

  <!-- ==================== FLOATING CARD: 汽车电子 产业资源 & 龙头 ==================== -->
  <g transform="translate(1530, 460)" filter="url(#glow)">
    <!-- Container -->
    <rect x="0" y="0" width="330" height="290" rx="4" fill="#04122d" stroke="#0284c7" stroke-width="1.5" opacity="0.95"/>
    
    <!-- Title Bar -->
    <rect x="0" y="0" width="330" height="34" rx="4" fill="#09255a"/>
    <text x="165" y="22" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">汽车电子</text>

    <!-- 产业资源 Header -->
    <rect x="0" y="34" width="330" height="24" fill="#071b40"/>
    <text x="165" y="50" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">产业资源</text>

    <!-- Stats Table Grid -->
    <g font-size="12" fill="#94a3b8">
      <text x="30" y="78">企业</text><text x="70" y="78" fill="#38bdf8" font-weight="bold">40家</text>
      <text x="190" y="78">专利</text><text x="235" y="78" fill="#38bdf8" font-weight="bold">190件</text>

      <text x="30" y="102">高校</text><text x="70" y="102" fill="#38bdf8" font-weight="bold">0所</text>
      <text x="190" y="102">专家</text><text x="235" y="102" fill="#38bdf8" font-weight="bold">57位</text>

      <text x="20" y="126">科研院所</text><text x="80" y="126" fill="#38bdf8" font-weight="bold">0所</text>
      <text x="190" y="126">产品</text><text x="235" y="126" fill="#38bdf8" font-weight="bold">0件</text>
    </g>

    <!-- 产业龙头 Header -->
    <rect x="0" y="142" width="330" height="24" fill="#071b40"/>
    <text x="165" y="158" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">产业龙头</text>

    <!-- Enterprise List -->
    <g font-size="11.5" fill="#7dd3fc">
      <text x="20" y="186">博世力士乐（常州）有限公司</text>
      <text x="20" y="206">大陆汽车部件（苏州）有限公司</text>
      <text x="20" y="226">徐州伟世通科技有限公司</text>
      <text x="20" y="246">湖南航盛电子科技有限公司</text>
      <text x="20" y="266">江苏宏微科技股份有限公司</text>
      <text x="20" y="284">国创移动能源创新中心（江苏）有限公司</text>
    </g>
  </g>

  <!-- ==================== BRANCH 3: 下游-整车及配套 ==================== -->
  <g transform="translate(760, 640)">
    <!-- Downstream Dais -->
    <ellipse cx="0" cy="15" rx="44" ry="18" fill="url(#platGrad)" stroke="#38bdf8" stroke-width="1.5"/>
    <rect x="-56" y="24" width="112" height="24" rx="6" fill="#071b3d" stroke="#0284c7" stroke-width="1"/>
    <text x="0" y="40" fill="#e0f2fe" font-size="12" font-weight="bold" text-anchor="middle">下游-整车及配套</text>
  </g>

  <!-- Downstream Sub-Nodes -->
  <g transform="translate(930, 720)">
    <rect x="-18" y="-10" width="36" height="20" rx="4" fill="#0284c7"/>
    <text x="0" y="22" fill="#bae6fd" font-size="11" font-weight="bold" text-anchor="middle">整车制造</text>
  </g>
  <g transform="translate(420, 720)">
    <rect x="-10" y="-16" width="20" height="32" rx="4" fill="#0369a1" stroke="#38bdf8"/>
    <text x="0" y="26" fill="#bae6fd" font-size="11" font-weight="bold" text-anchor="middle">电池回收</text>
  </g>
  <g transform="translate(540, 760)">
    <rect x="-14" y="-12" width="28" height="24" rx="4" fill="#0284c7"/>
    <text x="0" y="24" fill="#bae6fd" font-size="11" font-weight="bold" text-anchor="middle">充电站</text>
  </g>
  <g transform="translate(630, 810)">
    <rect x="-8" y="-16" width="16" height="32" rx="4" fill="#0284c7"/>
    <text x="0" y="26" fill="#bae6fd" font-size="11" font-weight="bold" text-anchor="middle">充电桩</text>
  </g>

  <!-- Vehicle Components Array -->
  <g transform="translate(880, 780)"><text x="0" y="0" fill="#94a3b8" font-size="11">安全气囊</text></g>
  <g transform="translate(980, 730)"><text x="0" y="0" fill="#94a3b8" font-size="11">车桥</text></g>
  <g transform="translate(1080, 700)"><text x="0" y="0" fill="#94a3b8" font-size="11">座椅</text></g>
  <g transform="translate(1180, 660)"><text x="0" y="0" fill="#94a3b8" font-size="11">车窗玻璃</text></g>
  <g transform="translate(1360, 710)"><text x="0" y="0" fill="#94a3b8" font-size="11">进气格栅</text></g>
  <g transform="translate(1450, 750)"><text x="0" y="0" fill="#94a3b8" font-size="11">车灯</text></g>

  <g transform="translate(780, 850)"><text x="0" y="0" fill="#94a3b8" font-size="11">车身</text></g>
  <g transform="translate(770, 890)"><text x="0" y="0" fill="#94a3b8" font-size="11">后视镜</text></g>
  <g transform="translate(880, 890)"><text x="0" y="0" fill="#94a3b8" font-size="11">减震器</text></g>
  <g transform="translate(970, 840)"><text x="0" y="0" fill="#94a3b8" font-size="11">仪表盘</text></g>
  <g transform="translate(1070, 790)"><text x="0" y="0" fill="#94a3b8" font-size="11">轮毂</text></g>
  <g transform="translate(1170, 750)"><text x="0" y="0" fill="#94a3b8" font-size="11">方向盘</text></g>
  <g transform="translate(1270, 800)"><text x="0" y="0" fill="#94a3b8" font-size="11">刹车片</text></g>
  <g transform="translate(1260, 840)"><text x="0" y="0" fill="#94a3b8" font-size="11">传动轴</text></g>

  <g transform="translate(880, 930)"><text x="0" y="0" fill="#94a3b8" font-size="11">轮胎</text></g>
  <g transform="translate(1070, 930)"><text x="0" y="0" fill="#94a3b8" font-size="11">保险杠</text></g>
  <g transform="translate(1170, 880)"><text x="0" y="0" fill="#94a3b8" font-size="11">门饰板</text></g>
</svg>`;

// 2. Generate 供应链匹配 SVG (1920x1080)
const supplyChainSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" style="background:#050f24; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <defs>
    <!-- Map Gradients & Filters -->
    <filter id="pinGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>

    <radialGradient id="waterGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0284c7" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#050f24" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- ==================== GIS SATELLITE ROADMAP BACKGROUND ==================== -->
  <rect width="1920" height="1080" fill="#040e26"/>

  <!-- Yangtze River (长江) Path -->
  <path d="M 350 0 C 450 180, 650 300, 820 400 C 920 460, 980 470, 1100 480 C 1300 500, 1450 420, 1600 360 C 1750 300, 1850 250, 1920 220 L 1920 280 C 1850 310, 1750 360, 1600 420 C 1450 480, 1300 560, 1100 540 C 980 530, 900 510, 800 460 C 630 360, 430 240, 320 0 Z" fill="#072a5a" opacity="0.85"/>
  <text x="890" y="420" fill="#1e4d8a" font-size="15" font-weight="bold" transform="rotate(32 890 420)">长 江</text>

  <!-- Green Mountain Areas (紫金山, 栖霞山, 宵王山) -->
  <g fill="#0e3a2b" opacity="0.6">
    <ellipse cx="980" cy="420" rx="55" ry="32"/>
    <ellipse cx="1190" cy="300" rx="45" ry="24"/>
    <ellipse cx="1400" cy="400" rx="40" ry="22"/>
  </g>
  <text x="980" y="424" fill="#34d399" font-size="13" font-weight="bold" text-anchor="middle">▲ 紫金山</text>
  <text x="1190" y="304" fill="#34d399" font-size="13" font-weight="bold" text-anchor="middle">▲ 栖霞山</text>
  <text x="1400" y="404" fill="#34d399" font-size="13" font-weight="bold" text-anchor="middle">▲ 宵王山</text>

  <!-- Highway & Road Network -->
  <g stroke="#1d4076" stroke-width="2.5" fill="none" opacity="0.7">
    <path d="M 0 350 L 500 400 L 900 520 L 1400 580 L 1920 540"/>
    <path d="M 400 0 L 480 350 L 520 600 L 480 1080"/>
    <path d="M 900 0 L 880 380 L 950 650 L 1200 1080"/>
    <path d="M 1450 0 L 1420 400 L 1400 700 L 1450 1080"/>
    <path d="M 0 650 L 450 680 L 900 620 L 1500 750 L 1920 850"/>
    <path d="M 0 180 L 700 220 L 1300 200 L 1920 180"/>
  </g>
  <g stroke="#0f2b57" stroke-width="1.2" fill="none" opacity="0.55">
    <path d="M 100 0 L 300 1080"/>
    <path d="M 650 0 L 750 1080"/>
    <path d="M 1100 0 L 1150 1080"/>
    <path d="M 1650 0 L 1700 1080"/>
    <path d="M 0 500 L 1920 500"/>
    <path d="M 0 850 L 1920 850"/>
  </g>

  <!-- Road Badges (S001, G104, S337, etc.) -->
  <g font-size="10" font-weight="bold">
    <rect x="580" y="240" width="32" height="15" rx="3" fill="#ca8a04"/><text x="596" y="252" fill="#000" text-anchor="middle">S001</text>
    <rect x="940" y="160" width="32" height="15" rx="3" fill="#ca8a04"/><text x="956" y="172" fill="#000" text-anchor="middle">S501</text>
    <rect x="1230" y="160" width="32" height="15" rx="3" fill="#ca8a04"/><text x="1246" y="172" fill="#000" text-anchor="middle">X205</text>
    <rect x="1430" y="160" width="32" height="15" rx="3" fill="#15803d"/><text x="1446" y="172" fill="#fff" text-anchor="middle">G40</text>
    <rect x="620" y="270" width="32" height="15" rx="3" fill="#dc2626"/><text x="636" y="282" fill="#fff" text-anchor="middle">G104</text>
    <rect x="910" y="580" width="32" height="15" rx="3" fill="#dc2626"/><text x="926" y="592" fill="#fff" text-anchor="middle">G104</text>
    <rect x="1460" y="540" width="32" height="15" rx="3" fill="#ca8a04"/><text x="1476" y="552" fill="#000" text-anchor="middle">S266</text>
    <rect x="1470" y="610" width="32" height="15" rx="3" fill="#ca8a04"/><text x="1486" y="622" fill="#000" text-anchor="middle">S243</text>
    <rect x="1240" y="640" width="32" height="15" rx="3" fill="#ca8a04"/><text x="1256" y="652" fill="#000" text-anchor="middle">S337</text>
  </g>

  <!-- City & District Labels -->
  <g font-size="16" font-weight="900" fill="#94a3b8">
    <text x="890" y="220" fill="#cbd5e1">六合区</text>
    <text x="610" y="420" fill="#cbd5e1">浦口区</text>
    <text x="820" y="460" fill="#f8fafc">鼓楼区</text>
    <text x="890" y="460" fill="#f8fafc">玄武区</text>
    <text x="1030" y="380" fill="#f8fafc">栖霞区</text>
    <text x="750" y="510" fill="#f8fafc">建邺区</text>
    <text x="840" y="525" fill="#f8fafc">雨花台区</text>
    <text x="940" y="565" fill="#f8fafc">江宁区</text>
    <text x="1220" y="940" fill="#f8fafc">溧水区</text>
    <text x="1440" y="570" fill="#cbd5e1">句容市</text>
    <text x="1460" y="240" fill="#cbd5e1">仪征市</text>
    <text x="440" y="930" fill="#f8fafc">● 马鞍山市</text>
  </g>

  <!-- Multiple Glowing Blue Enterprise Location Pins on Map -->
  ${[
    [780, 200], [860, 340], [840, 420], [920, 470], [990, 460], [1030, 280],
    [720, 560], [880, 570], [930, 590], [970, 560], [890, 630], [910, 680],
    [940, 780], [960, 800], [1070, 830], [1160, 860], [450, 970], [530, 740],
    [540, 700], [600, 690], [670, 630], [790, 640], [1090, 920]
  ].map(([x, y]) => `
    <g transform="translate(${x}, ${y})" filter="url(#pinGlow)">
      <circle cx="0" cy="-18" r="8" fill="#38bdf8"/>
      <path d="M -8 -18 C -8 -8, 0 0, 0 0 C 0 0, 8 -8, 8 -18 Z" fill="#0284c7"/>
      <circle cx="0" cy="-18" r="3.5" fill="#ffffff"/>
      <ellipse cx="0" cy="1" rx="5" ry="2" fill="#0284c7" opacity="0.6"/>
    </g>
  `).join('\n')}

  <!-- ==================== LEFT FLOATING TREE SIDEBAR ==================== -->
  <g transform="translate(32, 140)">
    <!-- Main Header -->
    <rect x="0" y="0" width="310" height="42" rx="4" fill="#1d4ed8"/>
    <text x="155" y="26" fill="#ffffff" font-size="16" font-weight="900" text-anchor="middle">新能源汽车</text>

    <!-- Tree Body Panel -->
    <rect x="0" y="42" width="310" height="740" rx="4" fill="#04122e" opacity="0.94" stroke="#1e3a8a" stroke-width="1.5"/>

    <!-- Tree Hierarchy Nodes -->
    <g font-size="13" font-weight="bold" fill="#ffffff" transform="translate(18, 72)">
      <text x="0" y="0">▼ 新能源汽车</text>
      
      <g transform="translate(16, 26)">
        <text x="0" y="0">▼ 上游-原材料</text>

        <g transform="translate(18, 26)">
          <!-- Active Highlighted Node -->
          <text x="0" y="0" fill="#f59e0b" font-weight="900">▼ 有色金属及化工原材料</text>

          <g transform="translate(18, 24)" font-size="12" fill="#93c5fd" font-weight="normal">
            <text x="0" y="0">▼ 正极</text>
            <text x="18" y="20" fill="#60a5fa">锰/镍钴酸锂</text>
            <text x="18" y="40" fill="#60a5fa">磷酸铁锂</text>
            <text x="18" y="60" fill="#60a5fa">三元材料</text>

            <text x="0" y="86" fill="#93c5fd">▼ 负极</text>
            <text x="18" y="106" fill="#60a5fa">石墨材料</text>
            <text x="18" y="126" fill="#60a5fa">碳材料</text>
            <text x="18" y="146" fill="#60a5fa">钛酸锂</text>
            <text x="18" y="166" fill="#60a5fa">硅碳负极</text>

            <text x="0" y="192" fill="#93c5fd">▶ 隔膜</text>
            <text x="18" y="210" fill="#60a5fa">聚乙烯丙烯</text>
            <text x="18" y="228" fill="#60a5fa">添加剂</text>

            <text x="0" y="254" fill="#93c5fd">▼ 电解液</text>
            <text x="18" y="272" fill="#60a5fa">电介质锂盐</text>
            <text x="18" y="290" fill="#60a5fa">有机溶剂</text>
            <text x="18" y="308" fill="#60a5fa">添加剂</text>

            <text x="0" y="334" fill="#93c5fd">▶ 驱动电机关键原材料 (硅钢)</text>
          </g>
        </g>
      </g>

      <g transform="translate(16, 440)">
        <text x="0" y="0">▼ 中游-零部件</text>
        <g transform="translate(18, 22)" font-size="12" fill="#93c5fd">
          <text x="0" y="0">▼ 电芯与PACK</text>
          <text x="14" y="20" fill="#60a5fa">▼ 电源系统 (锂离子/燃料电池)</text>
          <text x="14" y="40" fill="#60a5fa">▶ 充电系统</text>
          <text x="0" y="64">▼ BMS(动力电池管理系统)</text>
          <text x="14" y="82" fill="#60a5fa">能源管理系统</text>
          <text x="0" y="106">▼ 电机控制器</text>
          <text x="14" y="124" fill="#60a5fa">驱动电机控制技术</text>
        </g>
      </g>

      <!-- Bottom Legend -->
      <g transform="translate(0, 680)">
        <rect x="0" y="-12" width="14" height="14" fill="#f59e0b"/>
        <text x="22" y="0" font-size="12" fill="#e2e8f0">我所属产业链位置</text>
      </g>
    </g>
  </g>

  <!-- ==================== RIGHT FLOATING MATCHING PANEL ==================== -->
  <g transform="translate(1530, 140)">
    <!-- Header -->
    <rect x="0" y="0" width="360" height="42" rx="4" fill="#1e40af"/>
    <text x="180" y="26" fill="#ffffff" font-size="14.5" font-weight="bold" text-anchor="middle">新能源汽车-有色金属及化工原材料</text>

    <!-- Panel Body -->
    <rect x="0" y="42" width="360" height="740" rx="4" fill="#04112c" opacity="0.94" stroke="#1e3a8a" stroke-width="1.5"/>

    <!-- Subtitle Notice -->
    <text x="18" y="68" font-size="12" fill="#cbd5e1">当前位置附近 <tspan fill="#f97316" font-weight="bold">50公里</tspan> 有以下单位满足您产业</text>
    <text x="18" y="86" font-size="12" fill="#cbd5e1">链特征。</text>

    <!-- Sub-Tabs -->
    <g transform="translate(18, 106)">
      <!-- Tab 1: 上下游企业 (Active) -->
      <text x="50" y="18" fill="#ffffff" font-size="13" font-weight="bold" text-anchor="middle">上下游企业</text>
      <line x1="0" y1="28" x2="100" y2="28" stroke="#3b82f6" stroke-width="2.5"/>

      <!-- Tab 2: 高校科研院所 -->
      <text x="180" y="18" fill="#94a3b8" font-size="13" font-weight="normal" text-anchor="middle">高校科研院所</text>
    </g>

    <!-- 23 Matching Enterprises List -->
    <g font-size="12" fill="#e2e8f0" transform="translate(18, 160)">
      ${[
        "1. 纳乐模塑技术（南京）有限公司",
        "2. 中材科技股份有限公司",
        "3. 南京鼎典科技有限公司",
        "4. 中钢集团南京新材料研究院...",
        "5. 的卢技术有限公司",
        "6. 南京席格科技发展有限公司",
        "7. 安百拓（南京）建筑矿山设备...",
        "8. 南京精研新能源科技有限公司",
        "9. 江苏塔菲尔动力系统有限公司",
        "10. 江苏昊科汽车空调有限公司",
        "11. 江苏塔菲尔新能源科技股...",
        "12. 南京创源天地动力科技有...",
        "13. 南京金龙客车制造有限公司",
        "14. 南京金龙新能源汽车研究...",
        "15. 南京汽车集团有限公司",
        "16. 南京市欣旺达新能源有限公司",
        "17. 南京中微纳米功能材料研...",
        "18. 南京晶能新能源智能汽车...",
        "19. 江苏斯雷普汽车科技有限公司",
        "20. 江苏建康汽车有限公司",
        "21. 马鞍山市威马机械设备有...",
        "22. 江苏中兴派能电池有限公司",
        "23. 中钢天源股份有限公司"
      ].map((name, idx) => `
        <g transform="translate(0, ${idx * 26})">
          <text x="0" y="14" fill="#f1f5f9">${name}</text>
          <text x="290" y="14" font-size="13">🏢</text>
        </g>
      `).join('\n')}
    </g>
  </g>
</svg>`;

// Write the files to /public
fs.writeFileSync(path.join(process.cwd(), 'public/industry-chain-panoramic.svg'), panoramicSvg, 'utf-8');
fs.writeFileSync(path.join(process.cwd(), 'public/supply-chain-matching.svg'), supplyChainSvg, 'utf-8');

// Also copy as .png so both .svg and .png references resolve properly
fs.copyFileSync(path.join(process.cwd(), 'public/industry-chain-panoramic.svg'), path.join(process.cwd(), 'public/industry-chain-panoramic.png'));
fs.copyFileSync(path.join(process.cwd(), 'public/supply-chain-matching.svg'), path.join(process.cwd(), 'public/supply-chain-matching.png'));

console.log('Successfully generated public SVG and PNG assets!');
