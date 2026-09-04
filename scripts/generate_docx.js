import { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  HeadingLevel, 
  Table, 
  TableRow, 
  TableCell, 
  BorderStyle, 
  WidthType, 
  AlignmentType, 
  ShadingType 
} from 'docx';
import fs from 'fs';
import path from 'path';

// Palette
const COLOR_PRIMARY = "0F52BA"; // Oxford/JLU Blue
const COLOR_DARK = "1E293B";    // Slate 800
const COLOR_MUTED = "64748B";   // Slate 500
const COLOR_BG_LIGHT = "F1F5F9";// Slate 100
const COLOR_BORDER = "CBD5E1";  // Slate 300
const COLOR_TEAL = "0D9488";

function createHeading1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 200 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 32, // 16pt
        color: COLOR_PRIMARY,
        font: "微软雅黑"
      })
    ]
  });
}

function createHeading2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 150 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 26, // 13pt
        color: COLOR_DARK,
        font: "微软雅黑"
      })
    ]
  });
}

function createHeading3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 100 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 22, // 11pt
        color: COLOR_TEAL,
        font: "微软雅黑"
      })
    ]
  });
}

function createParagraph(text, options = {}) {
  const { bold = false, italic = false, color = COLOR_DARK, after = 150 } = options;
  return new Paragraph({
    spacing: { line: 360, after }, // 1.5 line spacing
    children: [
      new TextRun({
        text,
        bold,
        italic,
        color,
        size: 22, // 11pt
        font: "微软雅黑"
      })
    ]
  });
}

function createBullet(text, boldPrefix = "") {
  const children = [];
  if (boldPrefix) {
    children.push(new TextRun({
      text: boldPrefix,
      bold: true,
      color: COLOR_DARK,
      size: 22,
      font: "微软雅黑"
    }));
  }
  children.push(new TextRun({
    text,
    color: COLOR_DARK,
    size: 22,
    font: "微软雅黑"
  }));

  return new Paragraph({
    bullet: { level: 0 },
    spacing: { line: 340, after: 100 },
    children
  });
}

function createCallout(title, content) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { type: ShadingType.CLEAR, fill: "EFF6FF" },
            borders: {
              top: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.SINGLE, size: 24, color: COLOR_PRIMARY },
            },
            margins: { top: 200, bottom: 200, left: 300, right: 200 },
            children: [
              new Paragraph({
                spacing: { after: 100 },
                children: [
                  new TextRun({
                    text: title,
                    bold: true,
                    color: COLOR_PRIMARY,
                    size: 22,
                    font: "微软雅黑"
                  })
                ]
              }),
              new Paragraph({
                spacing: { line: 320, after: 0 },
                children: [
                  new TextRun({
                    text: content,
                    color: COLOR_DARK,
                    size: 20,
                    font: "微软雅黑"
                  })
                ]
              })
            ]
          })
        ]
      })
    ]
  });
}

// Generate the Docx
const doc = new Document({
  styles: {
    default: {
      document: {
        run: {
          font: "微软雅黑",
          size: 22,
          color: COLOR_DARK,
        },
      },
    },
  },
  sections: [
    {
      properties: {
        page: {
          margin: {
            top: 1440, // 1 inch
            right: 1440,
            bottom: 1440,
            left: 1440,
          },
        },
      },
      children: [
        // Title Block
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 400, after: 100 },
          children: [
            new TextRun({
              text: "高校科技成果转化数字化赋能平台",
              bold: true,
              size: 48, // 24pt
              color: COLOR_PRIMARY,
              font: "微软雅黑"
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [
            new TextRun({
              text: "产 品 全 景 介 绍 与 解 决 方 案",
              bold: true,
              size: 28, // 14pt
              color: COLOR_MUTED,
              font: "微软雅黑"
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
          children: [
            new TextRun({
              text: "版本号：V2.4  |  编制单位：江苏佰腾科技有限公司  |  发布日期：2026年",
              size: 18,
              color: COLOR_MUTED,
              font: "微软雅黑"
            })
          ]
        }),

        // Callout Box
        createCallout(
          "【产品战略导言】",
          "本平台由江苏佰腾科技有限公司依托全球2亿+知识产权大数据资产、165万+规上制造业实体企业图谱及自主研发的产业大模型智能体，深度联合重点高校技术转移转化机构（如吉林大学科技开发中心）打造。平台致力于打破传统高校“成果养在深闺人未识”与企业“技术转型缺乏智力支撑”的壁垒，构建全流程主动穿透、精准匹配、闭环协同的数字化成果转化中枢。"
        ),

        // Section 1
        createHeading1("一、 行业痛点与建设背景"),
        createParagraph(
          "我国高校院所蕴含着极其丰硕的科研智慧与前沿技术储备，但在迈向实体经济落地的“最后一公里”，普遍面临着三大结构性痛点："
        ),
        createBullet("：传统转化严重依赖线下展会、熟人圈子与零散推介，高校往往处于“被动等待企业找上门”状态，缺乏高效触达全国潜在制造企业的数字化渠道。", "1. 寻客链路被动狭窄"),
        createBullet("：企业通常使用通俗工程痛点找技术，而高校科研成果使用严谨学术或专利权利要求书表述，二者存在巨大的“语义鸿沟”，致使大量真正契合的技术沉睡于数据库中。", "2. 成果与需求语义脱节"),
        createBullet("：高校科技成果通常处于小试阶段（TRL 4~6），涉及工艺放大、配方保密、中试验证、法律合同审查与收益分配等多重复杂流程，缺乏标准化的数字化协同跟踪平台。", "3. 产学研协同链路割裂"),
        createParagraph(
          "针对上述痛点，本平台通过“大数据穿透 + AI大模型智能体 + 闭环意向协同”三大支柱，重塑科技成果转化的业务范式。"
        ),

        // Section 2
        createHeading1("二、 平台总体定位与双角色业务架构"),
        createParagraph(
          "平台采用“高校端 + 企业端”双轮驱动架构，既赋能高校技术转移专员主动“向外寻客”，又支持广大企业精准“向内寻技”，形成端到端的双向转化飞轮。"
        ),

        // Table for Architecture
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  shading: { type: ShadingType.CLEAR, fill: COLOR_PRIMARY },
                  borders: {
                    top: { style: BorderStyle.SINGLE, size: 8, color: COLOR_BORDER },
                    bottom: { style: BorderStyle.SINGLE, size: 8, color: COLOR_BORDER },
                    left: { style: BorderStyle.SINGLE, size: 8, color: COLOR_BORDER },
                    right: { style: BorderStyle.SINGLE, size: 8, color: COLOR_BORDER },
                  },
                  margins: { top: 120, bottom: 120, left: 150, right: 150 },
                  children: [
                    new Paragraph({
                      alignment: AlignmentType.CENTER,
                      children: [new TextRun({ text: "平台端别", bold: true, color: "FFFFFF", size: 20 })]
                    })
                  ]
                }),
                new TableCell({
                  shading: { type: ShadingType.CLEAR, fill: COLOR_PRIMARY },
                  borders: {
                    top: { style: BorderStyle.SINGLE, size: 8, color: COLOR_BORDER },
                    bottom: { style: BorderStyle.SINGLE, size: 8, color: COLOR_BORDER },
                    left: { style: BorderStyle.SINGLE, size: 8, color: COLOR_BORDER },
                    right: { style: BorderStyle.SINGLE, size: 8, color: COLOR_BORDER },
                  },
                  margins: { top: 120, bottom: 120, left: 150, right: 150 },
                  children: [
                    new Paragraph({
                      alignment: AlignmentType.CENTER,
                      children: [new TextRun({ text: "核心职能定位", bold: true, color: "FFFFFF", size: 20 })]
                    })
                  ]
                }),
                new TableCell({
                  shading: { type: ShadingType.CLEAR, fill: COLOR_PRIMARY },
                  borders: {
                    top: { style: BorderStyle.SINGLE, size: 8, color: COLOR_BORDER },
                    bottom: { style: BorderStyle.SINGLE, size: 8, color: COLOR_BORDER },
                    left: { style: BorderStyle.SINGLE, size: 8, color: COLOR_BORDER },
                    right: { style: BorderStyle.SINGLE, size: 8, color: COLOR_BORDER },
                  },
                  margins: { top: 120, bottom: 120, left: 150, right: 150 },
                  children: [
                    new Paragraph({
                      alignment: AlignmentType.CENTER,
                      children: [new TextRun({ text: "主干功能模块", bold: true, color: "FFFFFF", size: 20 })]
                    })
                  ]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  shading: { type: ShadingType.CLEAR, fill: COLOR_BG_LIGHT },
                  borders: {
                    top: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
                    bottom: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
                    left: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
                    right: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
                  },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      alignment: AlignmentType.CENTER,
                      children: [new TextRun({ text: "高校管理端\n(技转中心/经纪人)", bold: true, color: COLOR_PRIMARY, size: 20 })]
                    })
                  ]
                }),
                new TableCell({
                  borders: {
                    top: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
                    bottom: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
                    left: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
                    right: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
                  },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text: "主导成果盘点、技术价值评估、全国规上企业主动靶向寻客、AI方案生成与意向协同流转处置。", size: 20 })]
                    })
                  ]
                }),
                new TableCell({
                  borders: {
                    top: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
                    bottom: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
                    left: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
                    right: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
                  },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text: "① 成果资产与五维价值评价库\n② 相似专利大模型寻客路径\n③ 57条细分战略产业链穿透寻客\n④ 国家专利密集型产品数据寻客\n⑤ AI 转化推荐方案智能体\n⑥ 企业成果对接意向协同处置工作台", size: 18 })]
                    })
                  ]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  shading: { type: ShadingType.CLEAR, fill: COLOR_BG_LIGHT },
                  borders: {
                    top: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
                    bottom: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
                    left: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
                    right: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
                  },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      alignment: AlignmentType.CENTER,
                      children: [new TextRun({ text: "企业协同端\n(实体企业/采购方)", bold: true, color: COLOR_TEAL, size: 20 })]
                    })
                  ]
                }),
                new TableCell({
                  borders: {
                    top: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
                    bottom: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
                    left: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
                    right: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
                  },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text: "发布工程痛点需求、按学科/产业查阅技术交底简报、一键提交合作意向、跟踪高校反馈闭环。", size: 20 })]
                    })
                  ]
                }),
                new TableCell({
                  borders: {
                    top: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
                    bottom: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
                    left: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
                    right: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
                  },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text: "① AI 语义自然语言寻技匹配\n② 专利与非专利技术交底中心\n③ 在线意向提报（明确合作模式）\n④ 对接进度时间线与高校专员联络", size: 18 })]
                    })
                  ]
                })
              ]
            })
          ]
        }),

        // Section 3
        createHeading1("三、 核心功能模块详述"),

        createHeading2("3.1 全景成果资产库与五维价值评价体系"),
        createParagraph(
          "平台打破了传统仅展示“专利列表”的局限，构建了全面包容已授权发明专利与非专利技术秘密（专有配方、算法模型、中试工艺等）的资产管理体系："
        ),
        createBullet("：对纳管成果从【技术先进性】、【法律稳定性】、【产业市场前景】、【竞争壁垒强度】及【战略新兴度】五个核心维度进行动态量化打分（0-100分）。", "• 佰腾五维价值模型"),
        createBullet("：明确成果所处阶段（TRL 1~3基础前沿、TRL 4~6中试验证、TRL 7~9工业量产），让企业对转化风险一目了然。", "• 技术成熟度等级（TRL 1-9）"),
        createBullet("：综合分析同行类似交易案例，自动化生成公允的市场转让与排他/普通许可参考区间，消除定价盲区。", "• 估值价格区间参考"),

        createHeading2("3.2 三维立体穿透式靶向寻客矩阵（核心竞争力）"),
        createParagraph(
          "平台研发了三套相互印证、高精度的企业触达穿透路径，帮助高校科研团队和专员告别盲目对接："
        ),
        createBullet("：基于深度学习自然语言向量，在全国2亿+专利文献中检索相近研发主线，自动识别拥有大量同类专利储备、具备技术承接能力的规上工业企业。", "1. 路径一【相似专利语义向量大模型寻客】"),
        createBullet("：依据国家战略新兴产业分类，将高校成果智能挂接至57条细分产业链拓扑图，精准穿透上游关键材料、中游精密制造与下游整车整机终端的链主与专精特新企业。", "2. 路径二【57条战略产业链全链条图谱寻客】"),
        createBullet("：直接挂接国家专利密集型产品官方备案数据库，定位那些已经具备高附加值量产产线、急需技术迭代以维持市场份额的企业，转化意愿极为迫切。", "3. 路径三【国家专利密集型产品备案数据寻客】"),

        createHeading2("3.3 AI 靶向寻客智能体（Autonomous Conversion Agent）"),
        createParagraph(
          "结合大模型与智能代理（Agent）技术，实现“成果一键导入，方案即刻呈现”："
        ),
        createBullet("：自动抽提成果的核心技术发明点、工艺边界及竞品替代优势，无需人工撰写繁复的材料。", "• 自动化技术创新点提炼"),
        createBullet("：深度比对目标企业的经营主业与产品线痛点，自动阐述高校技术如何为该企业降低成本、提高良率或开拓新产品市场。", "• 企业协同痛点诊断报告"),
        createBullet("：自动生成包含技术说明、合作模式建议、小试到中试分步实施计划、保密条款（NDA）建议的正式商函，专员可一键导出或打印。", "• 一键生成《成果转化推荐函》与走访话术"),

        createHeading2("3.4 全生命周期对接意向协同工作台（Intent Hub）"),
        createParagraph(
          "为避免传统对接中“表格满天飞、状态难跟进、文字堆叠头疼”的体验缺陷，工作台提供了极为清晰的现代化协同体验："
        ),
        createBullet("：默认提供结构化列表视图，以企业名称、目标技术、合作模式、诉求单行截断摘要、当前状态、跟进专员等规整呈现，告别大段文字轰炸；同时支持一键切换紧凑卡片视图。", "• 结构化表格与紧凑卡片双视图切换"),
        createBullet("：清晰流转“待高校响应 ➔ 商务洽谈中 ➔ 已安排对接会 ➔ 已达成转化签约 ➔ 已归档”五大核心状态，每个状态均有专属高对比度色彩与标识。", "• 闭环状态生命周期管理"),
        createBullet("：点击任意记录即可唤起弹窗，展示企业法人征信档案、需求详述全文、流转日志记录，并支持高校专员录入答复备注与分配人员。", "• 沉浸式详情档案与处置流转"),
        createBullet("：支持将当前筛选的意向台账一键导出为标准 CSV/Excel 报表，便于校领导汇报与科技厅统计报送。", "• 台账一键导出（CSV报表）"),

        // Section 4
        createHeading1("四、 平台核心技术优势与数据壁垒"),
        createBullet("：无缝融合佰腾2亿+全球专利大数据、165万+工商及招投标企业实体画像，底层数据保持日更，穿透真实度行业领先。", "1. 权威丰富的数据底座"),
        createBullet("：通过“相似专利 + 产业链节点 + 密集型产品”三重漏斗交叉校验，过滤皮包公司与无效主体，确保推荐的企业有资金实力与工程承接能力。", "2. 多维立体交叉校验算法"),
        createBullet("：专为科技成果转化领域定制的垂直领域 Prompt 工程与评估模型，生成的推进建议书契合高校职务发明管理政策与市场商业规范。", "3. 垂直领域产业大模型调优"),
        createBullet("：所有成果、意向、企业联系方式支持严格的权限隔离（RBAC）与脱敏保护，符合高校科研保密与知识产权安全审查法规。", "4. 全链路企业级安全与合规"),

        // Section 5
        createHeading1("五、 交付模式与生态合作建议"),
        createParagraph(
          "针对第三方机构（如地方科创集团、产业园区、高校联盟或科技咨询公司）采购或集成，平台支持灵活多样的合作与落地形态："
        ),
        createBullet("：提供完整的全功能独立部署版本，可贴牌（White-label）定制第三方专属 UI 品牌规范与域名，快速上线本地化产学研平台。", "形态 A：SaaS / 独立私有化部署方案"),
        createBullet("：平台提供标准化的 RESTful API 开放接口群，支持第三方在自有微信小程序、APP或OA系统中无缝调用成果检索、AI寻客与意向提报能力。", "形态 B：PaaS 开放 API 接口集成方案"),
        createBullet("：由佰腾与高校联合运营团队提供定期的“专利盘活评估、靶向企业精准走访、校企技术闭门研讨会承办”等增值线下撮合服务。", "形态 C：平台软件 + 科技经纪人深度联合运营"),

        // Section 6
        createHeading1("六、 结语"),
        createParagraph(
          "高校科技成果转化数字化赋能平台不仅是一套软件系统，更是连接高等学府基础科研与中国制造业实体产业的技术高速公路。通过数据赋能与智能驱动，让高校成果真正走出实验室，赋能实体经济高质量发展！"
        ),
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          spacing: { before: 300 },
          children: [
            new TextRun({
              text: "—— 江苏佰腾科技有限公司 联合研发组",
              bold: true,
              italic: true,
              color: COLOR_MUTED,
              size: 20
            })
          ]
        })
      ]
    }
  ]
});

// Write to file
const outputPath = path.join(process.cwd(), 'public', '高校科技成果转化数字化赋能平台_产品介绍.docx');
Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(outputPath, buffer);
  console.log(`Successfully generated docx at: ${outputPath}`);
});
