/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { OverviewDashboard } from './components/OverviewDashboard';
import { PatentSimilarSearchHub } from './components/PatentSimilarSearchHub';
import { IndustryChain57Hub } from './components/IndustryChain57Hub';
import { PatentProductSearchHub } from './components/PatentProductSearchHub';
import { AiEnterpriseAgent } from './components/AiEnterpriseAgent';
import { JluAllPatentsSummary } from './components/JluAllPatentsSummary';
import { BaitengValuationTool } from './components/BaitengValuationTool';
import { TargetEnterpriseDetailModal } from './components/TargetEnterpriseDetailModal';
import { PatentDetailModal } from './components/PatentDetailModal';
import { NewPatentModal } from './components/NewPatentModal';
import { ThemeProvider, useAppTheme } from './context/ThemeContext';

import { INITIAL_PATENTS } from './data/mockData';
import { TARGET_ENTERPRISES_DATA } from './data/targetEnterprisesData';
import { TabType, UserRole, PatentItem, TargetEnterprise } from './types';
import { CheckCircle2, Palette } from 'lucide-react';

function AppContent() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [userRole, setUserRole] = useState<UserRole>('researcher');
  const { themeConfig } = useAppTheme();

  const [patents, setPatents] = useState<PatentItem[]>(INITIAL_PATENTS);

  // Selected entities for modals and detailed views
  const [selectedPatent, setSelectedPatent] = useState<PatentItem | null>(INITIAL_PATENTS[0]);
  const [selectedPatentForDetailModal, setSelectedPatentForDetailModal] = useState<PatentItem | null>(null);
  const [selectedEnterpriseForDetailModal, setSelectedEnterpriseForDetailModal] = useState<TargetEnterprise | null>(null);
  const [isNewPatentModalOpen, setIsNewPatentModalOpen] = useState(false);

  // Quick Agent queries
  const [agentInitialQuery, setAgentInitialQuery] = useState<string>('');
  const [agentInitialEnterprise, setAgentInitialEnterprise] = useState<TargetEnterprise | null>(null);
  const [globalToastMessage, setGlobalToastMessage] = useState<string | null>(null);

  // Global search submit
  const handleSearchSubmit = (text: string) => {
    setAgentInitialQuery(text);
    setActiveTab('ai-agent');
    setGlobalToastMessage(`已将搜索词「${text}」载入 AI 靶向寻客智能体`);
    setTimeout(() => setGlobalToastMessage(null), 3500);
  };

  // Launch AI Agent with custom query from Overview
  const handleLaunchAiAgentWithQuery = (query: string) => {
    setAgentInitialQuery(query);
    setActiveTab('ai-agent');
    setGlobalToastMessage(`已将技术成果「${query}」载入 AI 靶向寻客智能体`);
    setTimeout(() => setGlobalToastMessage(null), 3500);
  };

  // Launch AI Agent with specific enterprise
  const handleOpenAiAgentWithEnterprise = (enterprise: TargetEnterprise) => {
    setAgentInitialEnterprise(enterprise);
    setAgentInitialQuery(enterprise.name);
    setActiveTab('ai-agent');
    setGlobalToastMessage(`已锁定目标企业「${enterprise.name}」，AI 智能体正在生成专属对接策略`);
    setTimeout(() => setGlobalToastMessage(null), 3500);
  };

  // Add new patent handler
  const handleAddPatent = (newPatent: PatentItem) => {
    setPatents([newPatent, ...patents]);
    setSelectedPatent(newPatent);
    setSelectedPatentForDetailModal(newPatent);
    setGlobalToastMessage(`新专利《${newPatent.title.slice(0, 16)}...》已入库并完成佰腾初评！`);
    setTimeout(() => setGlobalToastMessage(null), 4000);
  };

  return (
    <div className={`min-h-screen ${themeConfig.colors.pageBg} text-slate-900 flex flex-col font-sans antialiased transition-colors`}>
      
      {/* Global SaaS Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={setUserRole}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* Main SaaS Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* TAB 1: OVERVIEW DASHBOARD */}
        {activeTab === 'overview' && (
          <OverviewDashboard
            patents={patents}
            setActiveTab={setActiveTab}
            onSelectEnterprise={(ent) => setSelectedEnterpriseForDetailModal(ent)}
            onSelectPatent={(p) => {
              setSelectedPatent(p);
              setSelectedPatentForDetailModal(p);
            }}
            onLaunchAiAgentWithQuery={handleLaunchAiAgentWithQuery}
          />
        )}

        {/* TAB 2: PATH 1 - SIMILAR PATENTS */}
        {activeTab === 'patent-similar' && (
          <PatentSimilarSearchHub
            patents={patents}
            selectedPatent={selectedPatent}
            onSelectPatent={(p) => setSelectedPatent(p)}
            onSelectEnterprise={(ent) => setSelectedEnterpriseForDetailModal(ent)}
            onOpenAiAgentWithEnterprise={handleOpenAiAgentWithEnterprise}
          />
        )}

        {/* TAB 3: PATH 2 - 57 INDUSTRY CHAINS */}
        {activeTab === 'industry-chain' && (
          <IndustryChain57Hub
            onSelectEnterprise={(ent) => setSelectedEnterpriseForDetailModal(ent)}
            onSelectPatent={(p) => {
              setSelectedPatent(p);
              setSelectedPatentForDetailModal(p);
            }}
            onOpenAiAgentWithEnterprise={handleOpenAiAgentWithEnterprise}
          />
        )}

        {/* TAB 4: PATH 3 - PATENT-INTENSIVE PRODUCTS */}
        {activeTab === 'patent-product' && (
          <PatentProductSearchHub
            onSelectEnterprise={(ent) => setSelectedEnterpriseForDetailModal(ent)}
            onSelectPatent={(p) => {
              setSelectedPatent(p);
              setSelectedPatentForDetailModal(p);
            }}
            onOpenAiAgentWithEnterprise={handleOpenAiAgentWithEnterprise}
          />
        )}

        {/* TAB 5: AI ENTERPRISE TARGETING AGENT */}
        {activeTab === 'ai-agent' && (
          <AiEnterpriseAgent
            patents={patents}
            initialQuery={agentInitialQuery}
            initialEnterprise={agentInitialEnterprise}
            onSelectEnterprise={(ent) => setSelectedEnterpriseForDetailModal(ent)}
          />
        )}

        {/* TAB 6: JLU ALL PATENTS ASSET REPOSITORY */}
        {activeTab === 'all-patents' && (
          <JluAllPatentsSummary
            patents={patents}
            onSelectPatent={(p) => {
              setSelectedPatent(p);
              setSelectedPatentForDetailModal(p);
            }}
            onLaunchAiMatch={(p) => {
              setSelectedPatent(p);
              setActiveTab('patent-similar');
            }}
            onInitiateTransfer={(p) => {
              setSelectedPatent(p);
              handleLaunchAiAgentWithQuery(p.patentNo);
            }}
            onOpenNewPatent={() => setIsNewPatentModalOpen(true)}
          />
        )}

        {/* TAB 7: BAITENG VALUATION TOOL */}
        {activeTab === 'valuation-tool' && (
          <BaitengValuationTool
            patents={patents}
          />
        )}

      </main>

      {/* Target Enterprise Full Dossier Modal */}
      <TargetEnterpriseDetailModal
        isOpen={Boolean(selectedEnterpriseForDetailModal)}
        enterprise={selectedEnterpriseForDetailModal}
        onClose={() => setSelectedEnterpriseForDetailModal(null)}
        onOpenAiAgentWithEnterprise={handleOpenAiAgentWithEnterprise}
      />

      {/* Patent Detail Modal */}
      <PatentDetailModal
        patent={selectedPatentForDetailModal}
        onClose={() => setSelectedPatentForDetailModal(null)}
        onLaunchAiMatch={(p) => {
          setSelectedPatent(p);
          setActiveTab('patent-similar');
        }}
        onInitiateTransfer={(p) => {
          setSelectedPatent(p);
          handleLaunchAiAgentWithQuery(p.patentNo);
        }}
      />

      {/* New Patent Filing Modal */}
      <NewPatentModal
        isOpen={isNewPatentModalOpen}
        onClose={() => setIsNewPatentModalOpen(false)}
        onSubmit={handleAddPatent}
      />

      {/* Global Toast Notification */}
      {globalToastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-blue-500/40 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{globalToastMessage}</span>
        </div>
      )}

      {/* Global 佰腾网官方统一底栏 (Baiten Official SaaS Footer) */}
      <footer className={`bg-slate-900 text-slate-300 text-xs py-8 border-t border-black/20 mt-12 transition-colors`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-24 shrink-0">
                <img src="https://www.baiten.cn/images/baiten/logo3.svg" alt="Baiten Logo" className="w-full h-auto brightness-0 invert opacity-90" />
              </div>
              <div>
                <div className="text-white font-bold text-sm flex items-center gap-2">
                  <span>佰腾网 - 科技成果转化平台</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] border border-amber-400/30">
                    吉林大学专区
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  吉林大学科学技术处 / 科技开发中心 (技术转移中心) • 江苏佰腾科技有限公司联合赋能
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-[11px] text-slate-300">
              <a href="https://www.baiten.cn" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                佰腾网首页
              </a>
              <span>·</span>
              <span className="hover:text-white cursor-pointer transition-colors">专利检索系统</span>
              <span>·</span>
              <span className="hover:text-white cursor-pointer transition-colors">57条产业链图谱</span>
              <span>·</span>
              <span className="hover:text-white cursor-pointer transition-colors">国家专利密集型产品库</span>
            </div>
          </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
            <div>
              © 2006-2026 江苏佰腾科技有限公司 (Baiten.cn) 版权所有 | 百业腾飞 • 专利为先
            </div>
            <div className="flex items-center gap-4">
              <span>数据底座：2亿+全球专利 · 20万+密集型产品 · 165万+企业画像</span>
              <span>苏ICP备11018872号</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

