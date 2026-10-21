import React, { useState } from 'react';
import { IndustryItem, IndustryWorkflow } from '../data/industryData';
import { X, ArrowRight, CheckCircle2, Terminal, ArrowUpRight, ShieldCheck, Clock, Layers, Sparkles } from 'lucide-react';
import { ServiceIcon, AVRXLogo } from './common/BrandIcons';

interface Props {
  industry: IndustryItem | null;
  onClose: () => void;
  onOpenStudio: (workflowId?: string) => void;
  onBookDemo: () => void;
}

export function IndustryDetailModal({ industry, onClose, onOpenStudio, onBookDemo }: Props) {
  if (!industry) return null;

  const [selectedWorkflowIndex, setSelectedWorkflowIndex] = useState(0);
  const activeWorkflow: IndustryWorkflow = industry.workflows[selectedWorkflowIndex] || industry.workflows[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-2xl bg-[#0B0F17] border border-slate-800 shadow-2xl text-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#0F1420] border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/80 flex items-center justify-center text-cyan-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                  {industry.categoryLabel}
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-xs text-slate-400 font-medium">{industry.kpi}</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white font-sans">
                {industry.name} — AI Workflow Blueprint Gallery
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Top Banner with Industry Dashboard Image & Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center rounded-xl bg-[#070A0F] border border-slate-800/80 p-5">
            <div className="lg:col-span-7 space-y-3">
              <span className="text-xs font-semibold text-cyan-300 font-mono">INDUSTRY BLUEPRINT</span>
              <h3 className="text-xl font-extrabold text-white leading-snug">
                {industry.headline}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {industry.description}
              </p>

              {/* Agent Bullet points */}
              <div className="pt-2">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-semibold">
                  Included Autonomous Agents:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {industry.agentExamples.map((agent, aIdx) => (
                    <div key={aIdx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{agent}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-xl overflow-hidden border border-slate-800 aspect-[16/10] bg-slate-900 shadow-lg">
                <img
                  src={industry.image}
                  alt={industry.headline}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17]/90 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-cyan-300">
                  <span>{industry.name} Hub</span>
                  <span className="text-emerald-400">Verified Architecture</span>
                </div>
              </div>
            </div>
          </div>

          {/* Workflow Selector Tabs if multiple */}
          {industry.workflows.length > 1 && (
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <span className="text-xs font-mono text-slate-400 mr-2">Workflows:</span>
              {industry.workflows.map((wf, wIdx) => (
                <button
                  key={wf.id}
                  onClick={() => setSelectedWorkflowIndex(wIdx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    selectedWorkflowIndex === wIdx
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-800 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  {wf.title}
                </button>
              ))}
            </div>
          )}

          {/* Active Workflow In-Depth Architecture */}
          {activeWorkflow && (
            <div className="space-y-6">
              
              {/* Workflow Details Banner */}
              <div className="p-4 rounded-xl bg-[#0E131E] border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <h4 className="text-sm font-bold text-white font-sans">{activeWorkflow.title}</h4>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      Latency: {activeWorkflow.latency}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
                    {activeWorkflow.summary}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenStudio(activeWorkflow.studioWorkflowId || 'lead-qualification');
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg transition shadow-sm active:scale-95"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Open in Workflow Studio</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Visual Step-by-Step Flow Pipeline */}
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-3 font-semibold">
                  Execution Pipeline & Connected Nodes:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative">
                  {activeWorkflow.steps.map((st, sIdx) => {
                    let badgeColor = 'text-cyan-400 bg-cyan-950/80 border-cyan-800/80';
                    if (st.type === 'trigger') badgeColor = 'text-blue-400 bg-blue-950/80 border-blue-800/80';
                    if (st.type === 'guardrail') badgeColor = 'text-amber-400 bg-amber-950/80 border-amber-800/80';
                    if (st.type === 'action') badgeColor = 'text-emerald-400 bg-emerald-950/80 border-emerald-800/80';

                    return (
                      <div
                        key={sIdx}
                        className="rounded-xl border border-slate-800 bg-[#0A0E17] p-3.5 flex flex-col justify-between hover:border-slate-700 transition"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded border ${badgeColor}`}>
                              {st.type}
                            </span>
                            <span className="text-[10px] font-mono text-slate-500">Node 0{sIdx + 1}</span>
                          </div>
                          <h5 className="text-xs font-bold text-white">{st.name}</h5>
                          <p className="text-[11px] text-slate-400 mt-1 font-mono leading-relaxed">
                            {st.description}
                          </p>
                        </div>

                        <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-500 flex items-center justify-between">
                          <span>Deterministic</span>
                          <span className="text-emerald-400">Schema Validated</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Specifications: Trigger, AI Processing, Actions & Expected Output */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Trigger & AI Processing */}
                <div className="p-4 rounded-xl bg-[#0A0D15] border border-slate-800 space-y-3">
                  <div>
                    <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block font-semibold">
                      Trigger Event:
                    </span>
                    <p className="text-xs text-slate-300 font-mono mt-0.5">{activeWorkflow.trigger}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-800">
                    <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block mb-1 font-semibold">
                      AI Reasoning & Processing Steps:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {activeWorkflow.aiProcessingSteps.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-cyan-400 font-mono text-[10px] mt-0.5">↳</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-slate-800">
                    <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block mb-1 font-semibold">
                      Enterprise Integrations:
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {activeWorkflow.integrations.map((tool, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Expected Output & Sample Output JSON */}
                <div className="p-4 rounded-xl bg-[#0A0D15] border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                        Expected Verified Output:
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">JSON Payload</span>
                    </div>
                    <p className="text-xs text-slate-300 mb-2 font-medium">
                      {activeWorkflow.expectedOutput}
                    </p>

                    <pre className="p-3 rounded-lg bg-[#05070B] border border-slate-800 text-[11px] font-mono text-emerald-300/90 overflow-x-auto max-h-44 leading-relaxed">
                      {JSON.stringify(activeWorkflow.samplePayload, null, 2)}
                    </pre>
                  </div>

                  <div className="pt-3 border-t border-slate-800 mt-3 text-[11px] text-slate-500 flex items-center justify-between">
                    <span>Audit Status: Signed & Stored</span>
                    <span className="text-cyan-400 font-mono">SOC2 / HIPAA Compliant</span>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* Modal Bottom Action Bar */}
        <div className="px-6 py-3.5 bg-[#0A0D14] border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>All workflows deployable to single-tenant VPC or on-premise clusters.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onBookDemo();
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition"
            >
              Consult an Industry Architect
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenStudio(activeWorkflow?.studioWorkflowId || 'lead-qualification');
              }}
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition flex items-center gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Launch Studio</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
