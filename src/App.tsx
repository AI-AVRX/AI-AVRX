import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { AgentDemoSection } from './components/AgentDemoSection';
import { IndustrySection } from './components/IndustrySection';
import { IndustryDetailModal } from './components/IndustryDetailModal';
import { AgentBuilderSection } from './components/AgentBuilderSection';
import { PromptToWorkflowSection } from './components/PromptToWorkflowSection';
import { ExecutionDebuggerSection } from './components/ExecutionDebuggerSection';
import { IntegrationsSection } from './components/IntegrationsSection';
import { Footer } from './components/Footer';
import { BookDemoModal } from './components/BookDemoModal';
import { WorkflowStudio } from './components/studio/WorkflowStudio';
import { IndustryItem } from './data/industryData';

export default function App() {
  const [studioOpen, setStudioOpen] = useState(false);
  const [activeWorkflowId, setActiveWorkflowId] = useState<string | undefined>(undefined);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryItem | null>(null);

  const handleOpenStudio = (workflowId?: string) => {
    setActiveWorkflowId(workflowId);
    setStudioOpen(true);
  };

  const handleCloseStudio = () => {
    setStudioOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-950">
      {/* 1. Compact 1-row Navigation */}
      <Navbar
        onOpenStudio={() => handleOpenStudio()}
        onBookDemo={() => setDemoModalOpen(true)}
      />

      {/* Main Content Sections Flow */}
      <main className="flex-1">
        {/* 2 & 3. Product Introduction & Prominent Autonomous AI Agent Demonstration Canvas */}
        <HeroSection
          onOpenStudio={handleOpenStudio}
          onBookDemo={() => setDemoModalOpen(true)}
        />

        {/* 4. Capabilities section with clean, aligned feature cards */}
        <CapabilitiesSection
          onOpenStudio={() => handleOpenStudio()}
        />

        {/* 5. AI Agent Demonstration section (Text + Interactive Reasoning Loop) */}
        <AgentDemoSection
          onOpenStudio={() => handleOpenStudio()}
        />

        {/* 6. AI Agents Built for Your Industry (6 Premium Industry Cards with Dark Navy Panels & Workflow Modals) */}
        <IndustrySection
          onSelectIndustry={(ind) => setSelectedIndustry(ind)}
          onBookDemo={() => setDemoModalOpen(true)}
        />

        {/* 7. Building an Agent: Large visual assembler demo and supporting cards */}
        <AgentBuilderSection
          onOpenStudio={() => handleOpenStudio()}
        />

        {/* 8. Start with a Prompt and Build Something Useful (Prompt-to-Workflow Engine) */}
        <PromptToWorkflowSection
          onOpenStudio={handleOpenStudio}
        />

        {/* 9. Workflow Execution & Debugging (I/O inspection, waterfall, error traces) */}
        <ExecutionDebuggerSection
          onOpenStudio={() => handleOpenStudio()}
        />

        {/* 10. Integrations Gallery with recognizable service icons & category filters */}
        <IntegrationsSection
          onOpenStudio={handleOpenStudio}
        />
      </main>

      {/* 11. Premium Dark Footer Contrasting with the White Main Page */}
      <Footer
        onOpenStudio={() => handleOpenStudio()}
        onBookDemo={() => setDemoModalOpen(true)}
      />

      {/* Interactive Book Demo Modal */}
      <BookDemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />

      {/* Detailed Industry Workflow Gallery Modal */}
      <IndustryDetailModal
        industry={selectedIndustry}
        onClose={() => setSelectedIndustry(null)}
        onOpenStudio={handleOpenStudio}
        onBookDemo={() => setDemoModalOpen(true)}
      />

      {/* Full-Featured Workflow Studio (when opened) */}
      {studioOpen && (
        <WorkflowStudio
          initialWorkflowId={activeWorkflowId}
          onExit={handleCloseStudio}
        />
      )}
    </div>
  );
}
