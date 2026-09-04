import React, { createContext, useContext, useState, useEffect } from 'react';
import { CooperationIntentRecord, IntentStatus, IntentTargetType } from '../types';

const INITIAL_INTENTS: CooperationIntentRecord[] = [
  {
    id: 'intent-101',
    targetType: 'patent',
    targetId: 'p1',
    targetTitle: '一种多轴重型特种车辆电控空气悬架阻尼动态自适应调节系统及控制方法',
    targetNo: 'CN202310892341.2',
    domain: '智能网联与新能源汽车',
    inventorOrContact: '王教授 (汽车工程学院 / 底盘国家重点实验室)',
    companyName: '长春一汽富维汽车零部件股份有限公司',
    contactPerson: '张建军 (技术中心总监)',
    phone: '13944188899',
    email: 'zhangjj@faway.com.cn',
    mode: '专利独占实施许可 + 中试产线联合验证',
    demandDesc: '我们正在针对新能源重卡智慧产线开发高平顺性电控空气悬架总成，吉林大学王教授团队该专利中的电液比例阻尼阀控算法与我们在研电控单元高度契合，急需引入工程化参数并在一汽解放重卡上联合开展冬季寒区实车试验。',
    expectedDate: '2026-09-12',
    status: 'negotiating',
    createdAt: '2026-09-02',
    assignedStaff: '吉林大学科技开发中心 成果转化科 李老师',
    replyNote: '已与汽车学院王教授团队取得联系，教授表示非常认可一汽富维的应用场景，拟于下周二上午组织腾讯会议进行首次技术交底会。',
    statusLogs: [
      {
        time: '2026-09-02 14:30',
        operator: '企业端 (长春一汽富维)',
        action: '提交专利转化对接意向',
        note: '通过全国高校科技成果转化平台发起意向申请'
      },
      {
        time: '2026-09-02 16:45',
        operator: '高校端 (李老师)',
        action: '分配跟进专员并转交汽车工程学院王教授',
        note: '已初审企业资质，属于吉林省汽车产业链骨干企业，匹配度高'
      },
      {
        time: '2026-09-03 10:15',
        operator: '高校端 (李老师)',
        action: '变更为【商务洽谈中】',
        note: '双方已交换保密意向，拟于下周组织线上技术对接会'
      }
    ]
  },
  {
    id: 'intent-102',
    targetType: 'unpatented',
    targetId: 'k1',
    targetTitle: '一种新型聚芳醚醚酮(PEEK)连续挤出成型工艺及结晶度在线控制方法',
    targetNo: 'JLU-TECH-2023-019',
    domain: '材料科学',
    inventorOrContact: '李副教授 (化学学院 / 特种工程塑料教育部重点实验室)',
    companyName: '长春百克生物科技股份公司 (新材料工程事业部)',
    contactPerson: '赵云海 (研发副总裁)',
    phone: '13843056789',
    email: 'zhaoyh@bcht.net',
    mode: '专有技术秘密独占许可与中试放大联合攻关',
    demandDesc: '拟采购该项非专利专有连续挤出工艺参数，用于高端医疗植入级 PEEK 导管的医工交叉中试试验。希望就结晶度在线超声监控模块与李老师团队签署保密协议并展开深入合作。',
    expectedDate: '2026-09-15',
    status: 'pending',
    createdAt: '2026-09-03',
    assignedStaff: '吉林大学科技开发中心 产学研合作科 张老师',
    replyNote: '待高校科研团队初审技术指标与保密级别。',
    statusLogs: [
      {
        time: '2026-09-03 09:20',
        operator: '企业端 (长春百克生物)',
        action: '提交非专利专有技术对接意向',
        note: '期望开展医工交叉中试放大'
      }
    ]
  },
  {
    id: 'intent-103',
    targetType: 'patent',
    targetId: 'p2',
    targetTitle: '一种超硬碳化硅纳米复合耐磨涂层及其常压微波烧结制备方法',
    targetNo: 'CN202310349812.5',
    domain: '新材料与特种工程',
    inventorOrContact: '孙教授 (超硬材料国家重点实验室)',
    companyName: '吉林碳谷碳纤维股份有限公司',
    contactPerson: '孙明辉 (技术部经理)',
    phone: '13756012345',
    email: 'sunmh@jltg.com',
    mode: '作价入股 / 联合成立碳化硅涂层中试产业化公司',
    demandDesc: '我司拟在吉林市经开区投资建设碳化硅基耐磨复合涂层示范产线，希望以吉大孙教授团队该项专利作价入股，共同申报吉林省重大科技成果转化专项资金。',
    expectedDate: '2026-09-18',
    status: 'meeting_arranged',
    createdAt: '2026-08-30',
    assignedStaff: '吉林大学科技开发中心 作价入股与资产运营科 陈老师',
    replyNote: '已与吉林碳谷完成第一轮商业模式沟通，双方定于2026-09-10在吉林大学前卫南区科技开发中心会议室举行校企合作闭门签约准备会。',
    statusLogs: [
      {
        time: '2026-08-30 11:00',
        operator: '企业端 (吉林碳谷)',
        action: '提交作价入股合作申请',
        note: '拟投资建立千万元级中试示范线'
      },
      {
        time: '2026-08-31 15:30',
        operator: '高校端 (陈老师)',
        action: '完成高校知识产权合规性审查',
        note: '该专利权属清晰，无质押担保记录'
      },
      {
        time: '2026-09-02 16:00',
        operator: '高校端 (陈老师)',
        action: '变更为【已安排技术对接】',
        note: '已定于9月10日在校本部召开专家论证及作价入股对接会'
      }
    ]
  },
  {
    id: 'intent-104',
    targetType: 'unpatented',
    targetId: 'k2',
    targetTitle: '工业级多模态端侧轻量化故障诊断与时序异常检测算法底座',
    targetNo: 'JLU-TECH-2023-042',
    domain: '人工智能',
    inventorOrContact: '刘研究员 (人工智能学院 / 软件学院)',
    companyName: '长光卫星技术股份有限公司',
    contactPerson: '李振华 (星载智能载荷部主任)',
    phone: '13604319988',
    email: 'lizh@jl1.cn',
    mode: '企业定向委托开发与算法源代码授权',
    demandDesc: '希望将该轻量化故障诊断底座移植至商业遥感卫星星载微型计算机上，用于卫星电源系统与姿控飞轮的实时在轨自诊断。',
    expectedDate: '2026-09-20',
    status: 'pending',
    createdAt: '2026-09-03',
    assignedStaff: '吉林大学科技开发中心 成果转化科 李老师',
    replyNote: '待高校端安排人工智能团队进行星载环境算力适配评估。',
    statusLogs: [
      {
        time: '2026-09-03 16:40',
        operator: '企业端 (长光卫星)',
        action: '提交非专利专有算法对接意向',
        note: '星载在轨自诊断应用场景'
      }
    ]
  },
  {
    id: 'intent-105',
    targetType: 'patent',
    targetId: 'p3',
    targetTitle: '用于退役动力三元锂电池梯次利用的正极材料低能耗修复再生技术',
    targetNo: 'CN202310567819.3',
    domain: '绿色低碳与节能环保',
    inventorOrContact: '张教授 (环境与资源学院)',
    companyName: '吉林省金冠电气股份有限公司 (新能源回收事业部)',
    contactPerson: '王东 (总经理助理)',
    phone: '13504423456',
    email: 'wangdong@goldencrown.cn',
    mode: '专利独占实施许可 + 500万元中试线建设',
    demandDesc: '已与张教授团队完成首期样品修复测试，电池循环寿命恢复率达到94.6%。现已签署技术转化排他性合作框架协议，准备正式向科技厅申报成果转化落地重大专项。',
    expectedDate: '2026-08-25',
    status: 'contract_signed',
    createdAt: '2026-08-20',
    assignedStaff: '吉林大学科技开发中心 成果转化科 李老师',
    replyNote: '校企双方已完成正式合同用印，正在吉林省科技厅成果转化服务中心进行技术合同认定登记。',
    statusLogs: [
      {
        time: '2026-08-20 10:00',
        operator: '企业端 (金冠电气)',
        action: '发起专利独占许可意向',
        note: '动力电池回收循环利用重大产业化'
      },
      {
        time: '2026-08-22 14:00',
        operator: '高校端 (李老师)',
        action: '完成样品检测与法律审核',
        note: '修复指标优异，符合产业化标准'
      },
      {
        time: '2026-08-28 17:00',
        operator: '高校端 (李老师)',
        action: '变更为【已达成转化签约】',
        note: '双方完成正式技术许可合同签署与备案'
      }
    ]
  }
];

const STORAGE_KEY = 'jlu_tech_cooperation_intents_v2';

interface IntentContextType {
  intents: CooperationIntentRecord[];
  addIntent: (newIntent: Omit<CooperationIntentRecord, 'id' | 'createdAt' | 'statusLogs'>) => CooperationIntentRecord;
  updateIntentStatus: (id: string, newStatus: IntentStatus, replyNote?: string, operator?: string) => void;
  assignStaff: (id: string, staffName: string) => void;
  deleteIntent: (id: string) => void;
  getIntentById: (id: string) => CooperationIntentRecord | undefined;
  getIntentsByTarget: (targetId: string) => CooperationIntentRecord[];
  unreadPendingCount: number;
}

const IntentContext = createContext<IntentContextType | undefined>(undefined);

export const IntentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [intents, setIntents] = useState<CooperationIntentRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_INTENTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(intents));
    } catch {
      // ignore
    }
  }, [intents]);

  const addIntent = (data: Omit<CooperationIntentRecord, 'id' | 'createdAt' | 'statusLogs'>): CooperationIntentRecord => {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = `${dateStr} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const record: CooperationIntentRecord = {
      ...data,
      id: 'intent-' + Date.now(),
      createdAt: dateStr,
      status: data.status || 'pending',
      assignedStaff: data.assignedStaff || '吉林大学科技开发中心 成果转化科 李老师',
      replyNote: data.replyNote || '已接收企业意向申请，待高校科研团队与技术转移专员初审对接。',
      statusLogs: [
        {
          time: timeStr,
          operator: `企业端 (${data.companyName})`,
          action: `提交${data.targetType === 'patent' ? '专利' : '非专利'}转化对接意向`,
          note: `拟开展合作模式：${data.mode}`
        }
      ]
    };

    setIntents(prev => [record, ...prev]);
    return record;
  };

  const updateIntentStatus = (id: string, newStatus: IntentStatus, replyNote?: string, operator: string = '高校端专员') => {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = `${dateStr} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const statusMap: Record<IntentStatus, string> = {
      pending: '待高校响应',
      negotiating: '商务洽谈中',
      meeting_arranged: '已安排技术对接研讨会',
      contract_signed: '已达成转化签约',
      closed: '已归档'
    };

    setIntents(prev => prev.map(item => {
      if (item.id === id) {
        const newLogs = [
          ...item.statusLogs,
          {
            time: timeStr,
            operator,
            action: `状态流转为【${statusMap[newStatus]}】`,
            note: replyNote || `跟进状态变更更新`
          }
        ];
        return {
          ...item,
          status: newStatus,
          updatedAt: dateStr,
          replyNote: replyNote !== undefined ? replyNote : item.replyNote,
          statusLogs: newLogs
        };
      }
      return item;
    }));
  };

  const assignStaff = (id: string, staffName: string) => {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = `${dateStr} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setIntents(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          assignedStaff: staffName,
          statusLogs: [
            ...item.statusLogs,
            {
              time: timeStr,
              operator: '高校端技转中心',
              action: `指定跟进专员：${staffName}`,
              note: '负责牵头组织校企技术沟通与商务协议推进'
            }
          ]
        };
      }
      return item;
    }));
  };

  const deleteIntent = (id: string) => {
    setIntents(prev => prev.filter(i => i.id !== id));
  };

  const getIntentById = (id: string) => {
    return intents.find(i => i.id === id);
  };

  const getIntentsByTarget = (targetId: string) => {
    return intents.filter(i => i.targetId === targetId || (i.targetNo && i.targetNo === targetId));
  };

  const unreadPendingCount = intents.filter(i => i.status === 'pending').length;

  return (
    <IntentContext.Provider value={{
      intents,
      addIntent,
      updateIntentStatus,
      assignStaff,
      deleteIntent,
      getIntentById,
      getIntentsByTarget,
      unreadPendingCount
    }}>
      {children}
    </IntentContext.Provider>
  );
};

export const useIntents = () => {
  const context = useContext(IntentContext);
  if (!context) {
    throw new Error('useIntents must be used within an IntentProvider');
  }
  return context;
};
