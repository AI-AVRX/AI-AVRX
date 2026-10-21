import React from 'react';
import { Cpu, Wrench, Database, UserCheck, Activity, ShieldCheck, ArrowRight, Check, Code, GitFork, Lock, Sparkles, Terminal } from 'lucide-react';
import { useScrollReveal } from './common/useScrollReveal';

interface Props {
  onOpenStudio: () => void;
}

export function CapabilitiesSection({ onOpenStudio }: Props) {
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.1 });

  const capabilities = [
    {
      icon: Cpu,
      title: "Multi-Model Orchestration",
      description: "Route reasoning tasks to Gemini 2.5 Pro, speed-critical classifications to Gemini 2.5 Flash, or fallback to Claude 3.5 without rewriting workflow topology.",
      badge: "Dynamic routing",
      accent: "text-[#0891B2] bg-cyan-50 border border-cyan-200/60",
      visual: (
        <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 space-y-2 select-none">
          <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1.5 border-b border-slate-800">
            <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
              <Sparkles className="w-3 h-3" />
              <span>ROUTER ENGINE</span>
            </span>
            <span className="text-emerald-400 font-bold">100% Deterministic</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between p-1.5 rounded bg-slate-900/90 border border-cyan-500/40 text-cyan-200">
              <span>Gemini 2.5 Flash</span>
              <span className="text-[10px] text-cyan-400">420ms · Score 96%</span>
            </div>
            <div className="flex items-center justify-between p-1.5 rounded bg-slate-900/50 border border-slate-800 text-slate-400">
              <span>Gemini 2.5 Pro</span>
              <span className="text-[10px] text-slate-500">950ms · Deep Planner</span>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: Wrench,
      title: "Native Tool Synthesis & Calling",
      description: "Equip agents with real-world capabilities. Run SQL queries against PostgreSQL, call authenticated REST endpoints, and trigger webhooks deterministically.",
      badge: "Zero glue code",
      accent: "text-[#2563EB] bg-blue-50 border border-blue-200/60",
      visual: (
        <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 space-y-2 select-none">
          <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1.5 border-b border-slate-800">
            <span className="flex items-center gap-1.5 text-blue-400 font-semibold">
              <Terminal className="w-3 h-3" />
              <span>SANDBOX TOOL CALL</span>
            </span>
            <span className="text-blue-400">mTLS 1.3</span>
          </div>
          <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[10px] space-y-1">
            <div className="text-emerald-400">EXEC: SELECT * FROM crm_deals</div>
            <div className="text-slate-500">WHERE stage = 'Discovery' LIMIT 5;</div>
            <div className="text-cyan-400 pt-1 border-t border-slate-800 flex justify-between">
              <span>Rows Returned: 5</span>
              <span>28ms OK</span>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: Database,
      title: "Hybrid Vector Memory & RAG",
      description: "Embed enterprise PDFs, Notion documents, and SQL rows into vector stores. Agents perform hybrid dense/sparse recall to maintain state across weeks of interaction.",
      badge: "pgvector & Pinecone",
      accent: "text-[#7C3AED] bg-purple-50 border border-purple-200/60",
      visual: (
        <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 space-y-2 select-none">
          <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1.5 border-b border-slate-800">
            <span className="flex items-center gap-1.5 text-violet-400 font-semibold">
              <Database className="w-3 h-3" />
              <span>COSINE SIMILARITY SCAN</span>
            </span>
            <span className="text-violet-400">48,000 vectors</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px] p-1 rounded bg-slate-900 border border-violet-500/30 text-violet-200">
              <span className="truncate max-w-[140px]">Contract_Terms_2026.pdf</span>
              <span className="text-emerald-400 font-bold">0.96 Match</span>
            </div>
            <div className="flex items-center justify-between text-[10px] p-1 rounded bg-slate-900/50 border border-slate-800 text-slate-400">
              <span className="truncate max-w-[140px]">API_SLA_Addendum.md</span>
              <span className="text-slate-400">0.91 Match</span>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: UserCheck,
      title: "Human-in-the-Loop Safeguards",
      description: "Prevent unauthorized writes. Automatically pause workflow execution and dispatch approval cards to Slack, email, or webhook before updating production databases.",
      badge: "Audit verified",
      accent: "text-amber-600 bg-amber-50 border border-amber-200/60",
      visual: (
        <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 space-y-2 select-none">
          <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1.5 border-b border-slate-800">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <UserCheck className="w-3 h-3" />
              <span>SLACK APPROVAL CARD</span>
            </span>
            <span className="text-amber-300">Pending Review</span>
          </div>
          <div className="p-2 rounded bg-slate-900 border border-slate-800 flex items-center justify-between text-[10px]">
            <div>
              <div className="font-bold text-white">Deal $72k ARR</div>
              <div className="text-slate-400">Cyberdyne Systems</div>
            </div>
            <div className="flex gap-1.5">
              <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-bold">Approve</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">Deny</span>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: Activity,
      title: "Deterministic State & Replay",
      description: "Every step is recorded in an immutable ledger. Inspect exact JSON payloads, token counts, and execution latency. Re-run individual failed nodes with zero side effects.",
      badge: "Fault tolerant",
      accent: "text-emerald-700 bg-[#D1FAE5]/60 border border-emerald-300/60",
      visual: (
        <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 space-y-2 select-none">
          <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1.5 border-b border-slate-800">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <Activity className="w-3 h-3" />
              <span>STEP WATERFALL</span>
            </span>
            <span className="text-slate-400">Total 740ms</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-slate-400">Trigger</span>
              <div className="w-32 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full w-1/6" />
              </div>
              <span className="text-slate-500">12ms</span>
            </div>
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-slate-400">Gemini</span>
              <div className="w-32 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-cyan-400 h-full w-4/5" />
              </div>
              <span className="text-slate-500">420ms</span>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: ShieldCheck,
      title: "Enterprise Policy Guardrails",
      description: "Enforce regex output schemas, automatic PII redaction, token rate limits, and custom guardrail models before data ever leaves your security perimeter.",
      badge: "SOC2 aligned",
      accent: "text-[#0891B2] bg-cyan-50 border border-cyan-200/60",
      visual: (
        <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 space-y-2 select-none">
          <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1.5 border-b border-slate-800">
            <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
              <Lock className="w-3 h-3" />
              <span>PII REDACTION ENGINE</span>
            </span>
            <span className="text-emerald-400">Clean</span>
          </div>
          <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[10px] space-y-0.5">
            <div className="text-slate-400">Phone: <span className="text-rose-400">[REDACTED_PII]</span></div>
            <div className="text-slate-400">SSN: <span className="text-rose-400">[REDACTED_PII]</span></div>
            <div className="text-emerald-400 pt-1 text-[9px]">✓ Schema Validated (RFC-8259)</div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section ref={ref} id="capabilities" className="py-24 bg-white border-b border-slate-200/80 relative overflow-hidden">
      {/* Background Soft Mesh Accent */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className={`max-w-3xl mb-16 transition-all duration-700 ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0891B2] mb-3 font-mono">
            <span>Platform Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight font-sans text-balance">
            Engineered for predictable execution at enterprise scale
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            Avoid brittle scripts and opaque black-box agents. AVRX AI gives engineering and operations teams full visual control over prompt logic, external tool access, and safety gates.
          </p>
        </div>

        {/* 6 Aligned Feature Cards with Visual Diagrams */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <div
                key={i}
                style={{ transitionDelay: `${i * 90}ms` }}
                className={`group relative rounded-2xl border border-slate-200/90 bg-[#FAFBFD] p-6.5 hover:border-slate-300 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between ${
                  isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-xs ${cap.accent}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 font-semibold px-2 py-0.5 rounded-md bg-slate-100/90 border border-slate-200">
                      {cap.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-950 group-hover:text-[#0891B2] transition-colors leading-snug">
                    {cap.title}
                  </h3>

                  <p className="mt-2.5 text-xs text-slate-600 leading-relaxed">
                    {cap.description}
                  </p>

                  {/* High-Fidelity Interactive Visual Representation */}
                  {cap.visual}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span className="text-slate-500 text-[11px]">Enterprise Ready</span>
                  <button
                    onClick={onOpenStudio}
                    className="flex items-center gap-1.5 text-cyan-700 hover:text-cyan-900 font-bold transition-all group-hover:translate-x-1"
                  >
                    <span>Inspect Node</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
