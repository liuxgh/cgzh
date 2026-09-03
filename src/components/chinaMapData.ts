import React, { useState } from 'react';

// Geographic center positions for China provinces and major matching cities on a 1000x800 SVG canvas
export interface ProvinceGeoData {
  id: string;
  name: string;
  shortName: string;
  pinyin: string;
  x: number;
  y: number;
  labelX?: number;
  labelY?: number;
  path: string;
}

export interface CityGeoMarker {
  id: string;
  name: string;
  shortName: string;
  province: string;
  x: number;
  y: number;
}

// 34 Provincial Admin Regions with SVG Paths on a 1000 x 800 viewBox
export const CHINA_PROVINCES: ProvinceGeoData[] = [
  {
    id: 'hubei',
    name: '湖北省',
    shortName: '湖北',
    pinyin: 'hubei',
    x: 620,
    y: 490,
    labelX: 620,
    labelY: 485,
    path: 'M 570,470 L 610,455 L 650,460 L 685,480 L 675,515 L 640,525 L 600,530 L 565,510 Z'
  },
  {
    id: 'shanghai',
    name: '上海市',
    shortName: '上海',
    pinyin: 'shanghai',
    x: 775,
    y: 480,
    labelX: 795,
    labelY: 475,
    path: 'M 765,475 L 780,470 L 785,485 L 770,490 Z'
  },
  {
    id: 'zhejiang',
    name: '浙江省',
    shortName: '浙江',
    pinyin: 'zhejiang',
    x: 745,
    y: 535,
    labelX: 750,
    labelY: 535,
    path: 'M 725,505 L 760,495 L 775,525 L 765,565 L 735,570 L 715,535 Z'
  },
  {
    id: 'jiangsu',
    name: '江苏省',
    shortName: '江苏',
    pinyin: 'jiangsu',
    x: 735,
    y: 445,
    labelX: 740,
    labelY: 440,
    path: 'M 695,410 L 740,395 L 770,445 L 760,475 L 720,470 L 690,440 Z'
  },
  {
    id: 'beijing',
    name: '北京市',
    shortName: '北京',
    pinyin: 'beijing',
    x: 680,
    y: 300,
    labelX: 685,
    labelY: 295,
    path: 'M 670,290 L 690,290 L 695,305 L 675,310 Z'
  },
  {
    id: 'tianjin',
    name: '天津市',
    shortName: '天津',
    pinyin: 'tianjin',
    x: 700,
    y: 320,
    labelX: 715,
    labelY: 320,
    path: 'M 693,312 L 708,310 L 712,330 L 698,332 Z'
  },
  {
    id: 'guangdong',
    name: '广东省',
    shortName: '广东',
    pinyin: 'guangdong',
    x: 650,
    y: 650,
    labelX: 650,
    labelY: 650,
    path: 'M 590,625 L 650,615 L 705,625 L 715,655 L 675,680 L 610,675 L 585,650 Z'
  },
  {
    id: 'sichuan',
    name: '四川省',
    shortName: '四川',
    pinyin: 'sichuan',
    x: 480,
    y: 500,
    labelX: 475,
    labelY: 495,
    path: 'M 420,430 L 490,425 L 545,465 L 530,540 L 485,580 L 435,550 L 415,485 Z'
  },
  {
    id: 'shandong',
    name: '山东省',
    shortName: '山东',
    pinyin: 'shandong',
    x: 705,
    y: 370,
    labelX: 710,
    labelY: 365,
    path: 'M 660,350 L 710,335 L 765,355 L 780,380 L 725,400 L 665,390 Z'
  },
  {
    id: 'jilin',
    name: '吉林省',
    shortName: '吉林',
    pinyin: 'jilin',
    x: 820,
    y: 225,
    labelX: 825,
    labelY: 220,
    path: 'M 780,210 L 840,195 L 870,230 L 845,260 L 795,250 Z'
  },
  {
    id: 'liaoning',
    name: '辽宁省',
    shortName: '辽宁',
    pinyin: 'liaoning',
    x: 775,
    y: 275,
    labelX: 780,
    labelY: 270,
    path: 'M 745,260 L 790,250 L 815,275 L 780,310 L 745,290 Z'
  },
  {
    id: 'henan',
    name: '河南省',
    shortName: '河南',
    pinyin: 'henan',
    x: 635,
    y: 420,
    labelX: 635,
    labelY: 415,
    path: 'M 590,390 L 660,385 L 685,420 L 660,460 L 600,455 L 580,420 Z'
  },
  {
    id: 'fujian',
    name: '福建省',
    shortName: '福建',
    pinyin: 'fujian',
    x: 715,
    y: 595,
    labelX: 720,
    labelY: 595,
    path: 'M 690,565 L 730,560 L 745,610 L 710,640 L 680,610 Z'
  },
  {
    id: 'anhui',
    name: '安徽省',
    shortName: '安徽',
    pinyin: 'anhui',
    x: 690,
    y: 470,
    labelX: 690,
    labelY: 470,
    path: 'M 665,435 L 710,430 L 725,480 L 705,525 L 665,510 L 660,465 Z'
  },
  {
    id: 'hunan',
    name: '湖南省',
    shortName: '湖南',
    pinyin: 'hunan',
    x: 600,
    y: 565,
    labelX: 600,
    labelY: 565,
    path: 'M 570,525 L 630,520 L 640,580 L 605,620 L 565,590 Z'
  },
  {
    id: 'jiangxi',
    name: '江西省',
    shortName: '江西',
    pinyin: 'jiangxi',
    x: 670,
    y: 560,
    labelX: 670,
    labelY: 560,
    path: 'M 645,515 L 685,520 L 705,570 L 675,620 L 645,585 Z'
  },
  {
    id: 'chongqing',
    name: '重庆市',
    shortName: '重庆',
    pinyin: 'chongqing',
    x: 545,
    y: 515,
    labelX: 545,
    labelY: 515,
    path: 'M 525,485 L 560,480 L 570,525 L 545,550 L 525,525 Z'
  },
  {
    id: 'hebei',
    name: '河北省',
    shortName: '河北',
    pinyin: 'hebei',
    x: 665,
    y: 335,
    labelX: 660,
    labelY: 340,
    path: 'M 645,280 L 690,270 L 715,310 L 705,370 L 655,375 L 640,320 Z'
  },
  {
    id: 'shanxi',
    name: '山西省',
    shortName: '山西',
    pinyin: 'shanxi',
    x: 615,
    y: 345,
    labelX: 615,
    labelY: 345,
    path: 'M 595,300 L 635,300 L 640,380 L 600,390 L 590,340 Z'
  },
  {
    id: 'shaanxi',
    name: '陕西省',
    shortName: '陕西',
    pinyin: 'shaanxi',
    x: 555,
    y: 410,
    labelX: 555,
    labelY: 410,
    path: 'M 540,320 L 585,315 L 585,410 L 565,470 L 525,455 L 535,380 Z'
  },
  {
    id: 'guangxi',
    name: '广西壮族自治区',
    shortName: '广西',
    pinyin: 'guangxi',
    x: 575,
    y: 650,
    labelX: 575,
    labelY: 650,
    path: 'M 530,610 L 590,610 L 610,650 L 585,685 L 530,670 Z'
  },
  {
    id: 'guizhou',
    name: '贵州省',
    shortName: '贵州',
    pinyin: 'guizhou',
    x: 535,
    y: 585,
    labelX: 535,
    labelY: 585,
    path: 'M 505,555 L 560,550 L 570,600 L 520,620 L 500,585 Z'
  },
  {
    id: 'yunnan',
    name: '云南省',
    shortName: '云南',
    pinyin: 'yunnan',
    x: 450,
    y: 630,
    labelX: 450,
    labelY: 630,
    path: 'M 410,570 L 485,570 L 495,650 L 445,690 L 400,640 Z'
  },
  {
    id: 'heilongjiang',
    name: '黑龙江省',
    shortName: '黑龙江',
    pinyin: 'heilongjiang',
    x: 830,
    y: 140,
    labelX: 830,
    labelY: 135,
    path: 'M 770,140 L 830,70 L 890,130 L 870,200 L 795,190 Z'
  },
  {
    id: 'neimenggu',
    name: '内蒙古自治区',
    shortName: '内蒙古',
    pinyin: 'neimenggu',
    x: 590,
    y: 240,
    labelX: 590,
    labelY: 240,
    path: 'M 460,280 L 570,260 L 670,230 L 750,220 L 770,160 L 720,170 L 640,210 L 520,240 Z'
  },
  {
    id: 'ningxia',
    name: '宁夏回族自治区',
    shortName: '宁夏',
    pinyin: 'ningxia',
    x: 515,
    y: 340,
    labelX: 515,
    labelY: 340,
    path: 'M 500,320 L 530,315 L 535,365 L 505,375 Z'
  },
  {
    id: 'gansu',
    name: '甘肃省',
    shortName: '甘肃',
    pinyin: 'gansu',
    x: 430,
    y: 360,
    labelX: 430,
    labelY: 360,
    path: 'M 350,300 L 460,290 L 500,350 L 520,410 L 475,420 L 420,380 Z'
  },
  {
    id: 'qinghai',
    name: '青海省',
    shortName: '青海',
    pinyin: 'qinghai',
    x: 340,
    y: 400,
    labelX: 340,
    labelY: 400,
    path: 'M 260,360 L 380,340 L 430,400 L 390,470 L 280,450 Z'
  },
  {
    id: 'xinjiang',
    name: '新疆维吾尔自治区',
    shortName: '新疆',
    pinyin: 'xinjiang',
    x: 200,
    y: 270,
    labelX: 200,
    labelY: 270,
    path: 'M 80,240 L 230,160 L 330,260 L 280,360 L 140,360 L 80,300 Z'
  },
  {
    id: 'xizang',
    name: '西藏自治区',
    shortName: '西藏',
    pinyin: 'xizang',
    x: 210,
    y: 490,
    labelX: 210,
    labelY: 490,
    path: 'M 120,440 L 280,420 L 380,480 L 350,560 L 170,550 Z'
  },
  {
    id: 'hainan',
    name: '海南省',
    shortName: '海南',
    pinyin: 'hainan',
    x: 610,
    y: 730,
    labelX: 635,
    labelY: 730,
    path: 'M 595,715 L 625,715 L 630,740 L 600,745 Z'
  },
  {
    id: 'taiwan',
    name: '台湾省',
    shortName: '台湾',
    pinyin: 'taiwan',
    x: 775,
    y: 625,
    labelX: 795,
    labelY: 625,
    path: 'M 765,605 L 785,615 L 780,650 L 760,640 Z'
  },
  {
    id: 'hongkong',
    name: '香港特别行政区',
    shortName: '香港',
    pinyin: 'hongkong',
    x: 670,
    y: 670,
    labelX: 690,
    labelY: 672,
    path: 'M 665,666 L 675,666 L 675,674 L 665,674 Z'
  },
  {
    id: 'macao',
    name: '澳门特别行政区',
    shortName: '澳门',
    pinyin: 'macao',
    x: 650,
    y: 675,
    labelX: 635,
    labelY: 685,
    path: 'M 646,672 L 654,672 L 654,678 L 646,678 Z'
  }
];

// Key Matching Cities with precise canvas coordinates
export const CHINA_MATCHING_CITIES: CityGeoMarker[] = [
  { id: 'wuhan', name: '武汉市', shortName: '武汉', province: '湖北省', x: 628, y: 495 },
  { id: 'shanghai-city', name: '上海市', shortName: '上海', province: '上海市', x: 775, y: 480 },
  { id: 'beijing-city', name: '北京市', shortName: '北京', province: '北京市', x: 680, y: 300 },
  { id: 'ningbo', name: '宁波市', shortName: '宁波', province: '浙江省', x: 765, y: 530 },
  { id: 'hangzhou', name: '杭州市', shortName: '杭州', province: '浙江省', x: 742, y: 520 },
  { id: 'nanjing', name: '南京市', shortName: '南京', province: '江苏省', x: 720, y: 460 },
  { id: 'suzhou', name: '苏州市', shortName: '苏州', province: '江苏省', x: 755, y: 472 },
  { id: 'wuxi', name: '无锡市', shortName: '无锡', province: '江苏省', x: 745, y: 465 },
  { id: 'changzhou', name: '常州市', shortName: '常州', province: '江苏省', x: 735, y: 458 },
  { id: 'shenzhen', name: '深圳市', shortName: '深圳', province: '广东省', x: 668, y: 662 },
  { id: 'guangzhou', name: '广州市', shortName: '广州', province: '广东省', x: 648, y: 648 },
  { id: 'chengdu', name: '成都市', shortName: '成都', province: '四川省', x: 478, y: 505 },
  { id: 'qingdao', name: '青岛市', shortName: '青岛', province: '山东省', x: 748, y: 370 },
  { id: 'jinan', name: '济南市', shortName: '济南', province: '山东省', x: 692, y: 358 },
  { id: 'changchun', name: '长春市', shortName: '长春', province: '吉林省', x: 818, y: 228 },
  { id: 'shenyang', name: '沈阳市', shortName: '沈阳', province: '辽宁省', x: 778, y: 272 },
  { id: 'zhengzhou', name: '郑州市', shortName: '郑州', province: '河南省', x: 628, y: 412 },
  { id: 'ningde', name: '宁德市', shortName: '宁德', province: '福建省', x: 735, y: 585 }
];
