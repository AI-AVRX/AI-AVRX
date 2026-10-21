import React, { useState } from 'react';
import { SAMPLE_WORKFLOWS } from '../data/mockWorkflows';
import { InteractiveWorkflowCanvas } from './InteractiveWorkflowCanvas';
import { ArrowRight, Sparkles, Terminal, CheckCircle2, ShieldCheck, Cpu, Zap, Activity } from 'lucide-react';

interface HeroSectionProps {
  onOpenStudio: (workflowId?: string) => void;
  onBookDemo: () => void;
}

export function HeroSection({ onOpenStudio, onBookDemo }: HeroSectionProps) {
  const [selectedWorkflowIndex, setSelectedWorkflowIndex] = useState(0);
  const activeWorkflow = SAMPLE_WORKFLOWS[selectedWorkflowIndex] || SAMPLE_WORKFLOWS[0];

  return (
    <section id="workflows" className="relative pt-14 pb-24 overflow-hidden bg-[#F8FAFC] bg-dot-grid-light border-b border-slate-200/70">
      {/* Cinematic Aurora Background Blooms */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] pointer-events-none -z-10 overflow-hidden">
        {/* Cyan Bloom */}
        <div className="absolute top-10 left-1/4 w-[500px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl animate-float-slow" />
        {/* Violet Bloom */}
        <div className="absolute top-20 right-1/4 w-[480px] h-[340px] bg-violet-500/10 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }} />
        {/* Electric Blue Core */}
        <div className="absolute top-48 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/8 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Tagline / Intro Kicker */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 mb-4 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
            <span className="text-[#0891B2] font-extrabold tracking-tight">AVRX AI</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Automate</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Grow</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-violet-600 font-semibold">Beyond</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 font-sans text-balance leading-[1.12]">
            Autonomous AI agents and workflows for{' '}
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-violet-600 bg-clip-text text-transparent">
              modern enterprise operations
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto text-balance font-normal">
            Connect state-of-the-art LLMs, enterprise APIs, internal vector knowledge bases, and human approval checkpoints in unified visual node graphs. Deploy self-healing agents that plan, retrieve, and execute reliably.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            {/* Primary CTA with subtle animated gradient glow */}
            <button
              onClick={() => onOpenStudio(activeWorkflow.id)}
              className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-slate-950 hover:bg-slate-900 transition-all shadow-md hover:shadow-cyan-500/20 hover:shadow-lg active:scale-95"
            >
              <Terminal className="w-4 h-4 text-cyan-400 group-hover:rotate-6 transition-transform" />
              <span>Launch Workflow Studio</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary CTA */}
            <button
              onClick={onBookDemo}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-800 bg-white/95 hover:bg-slate-50 border border-slate-300/90 transition shadow-xs hover:shadow active:scale-95 backdrop-blur-sm"
            >
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Book Architecture Call</span>
            </button>
          </div>

          {/* Trust markers with crisp styling */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold text-slate-700">SOC2 Type II Ready</span>
            </div>
            <span className="hidden sm:inline text-slate-300">·</span>
            <div className="flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-cyan-600" />
              <span className="font-semibold text-slate-700">Multi-Model Orchestration</span>
            </div>
            <span className="hidden sm:inline text-slate-300">·</span>
            <div className="flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-slate-700">Zero-Telemetry Execution</span>
            </div>
          </div>
        </div>

        {/* Workflow Switcher Filter Controls */}
        <div className="mt-10 mb-4 max-w-3xl mx-auto">
          <div className="flex items-center justify-center p-1 bg-slate-200/75 backdrop-blur-md rounded-xl border border-slate-300/80 overflow-x-auto gap-1 shadow-xs">
            {SAMPLE_WORKFLOWS.map((wf, idx) => {
              const isActive = idx === selectedWorkflowIndex;
              const cleanLabel = wf.name.replace('Autonomous ', '');
              return (
                <button
                  key={wf.id}
                  onClick={() => setSelectedWorkflowIndex(idx)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-white text-slate-950 shadow-sm font-bold scale-[1.02]'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-white/60'
                  }`}
                >
                  {cleanLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Prominent Autonomous AI Agent Demonstration - Dark Canvas on Light Background */}
        <div className="relative mt-2">
          {/* Subtle multi-layer glow behind canvas for cinematic depth */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500/20 via-blue-500/15 to-violet-500/20 rounded-3xl blur-2xl -z-10 opacity-70" />

          <InteractiveWorkflowCanvas
            workflow={activeWorkflow}
            onOpenInStudio={onOpenStudio}
            onWorkflowComplete={() => setSelectedWorkflowIndex(prev => (prev + 1) % SAMPLE_WORKFLOWS.length)}
            autoRotate={true}
          />
        </div>

      </div>
    </section>
  );
}
