import React, { useState } from 'react';
import { Sparkles, ArrowRight, Wand2, CheckCircle2, Terminal } from 'lucide-react';
import { ServiceIcon } from './common/BrandIcons';
import { useScrollReveal } from './common/useScrollReveal';

interface Props {
  onOpenStudio: (workflowId?: string) => void;
}

interface GeneratedNode {
  title: string;
  type: string;
  icon: string;
  detail: string;
}

export function PromptToWorkflowSection({ onOpenStudio }: Props) {
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.1 });
  const presets = [
    {
      title: "GitHub Releases to Slack Digest",
      prompt: "Listen for new GitHub release webhooks, summarize breaking changes using Gemini 2.5 Flash, and broadcast an executive digest to #engineering-announcements on Slack."
    },
    {
      title: "Inbound Lead Qualification & CRM Sync",
      prompt: "When a lead submits a demo form, check company headcount in Pinecone vectors, score intent with Gemini, and create an opportunity in Salesforce if score > 80."
    },
    {
      title: "Invoice Audit & ERP Verification",
      prompt: "Parse incoming invoice PDF attachments, run a PostgreSQL query against existing purchase orders, verify bank accounts, and require human sign-off before payment."
    },
    {
      title: "Customer Support Auto-Resolution",
      prompt: "Ingest Zendesk support tickets, perform semantic search on PostgreSQL knowledge base, draft a step-by-step solution, and post reply if confidence is above 95%."
    }
  ];

  const [promptText, setPromptText] = useState(presets[0].prompt);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedNodes, setGeneratedNodes] = useState<GeneratedNode[]>([
    { title: "GitHub Release Webhook", type: "Trigger", icon: "github", detail: "Listens for release.published event payloads" },
    { title: "Gemini 2.5 Summarizer", type: "AI Agent", icon: "gemini", detail: "Extracts breaking changes & migration notes" },
    { title: "Markdown Formatter", type: "Logic", icon: "code", detail: "Transforms release notes into clean block kit JSON" },
    { title: "Slack Channel Broadcast", type: "Action", icon: "slack", detail: "Dispatches to #engineering-announcements" }
  ]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      // Intelligently synthesize nodes based on keywords in prompt
      const text = promptText.toLowerCase();
      const nodes: GeneratedNode[] = [];

      // Trigger
      if (text.includes('github')) {
        nodes.push({ title: "GitHub Webhook Trigger", type: "Trigger", icon: "github", detail: "Listens on repo events and PR actions" });
      } else if (text.includes('invoice') || text.includes('form') || text.includes('lead')) {
        nodes.push({ title: "Inbound Webhook", type: "Trigger", icon: "webhook", detail: "Receives structured JSON / form payload" });
      } else {
        nodes.push({ title: "Scheduled Cron Trigger", type: "Trigger", icon: "clock", detail: "Runs automatically on defined schedule" });
      }

      // Memory / DB
      if (text.includes('postgres') || text.includes('sql') || text.includes('order')) {
        nodes.push({ title: "PostgreSQL Database Query", type: "Data Tool", icon: "postgres", detail: "SELECT * FROM historical_records" });
      } else if (text.includes('vector') || text.includes('pinecone') || text.includes('knowledge')) {
        nodes.push({ title: "Vector Memory Retrieval", type: "Vector Store", icon: "database", detail: "Semantic similarity top-k search" });
      }

      // AI Agent
      nodes.push({
        title: text.includes('pro') ? "Gemini 2.5 Pro Agent" : "Gemini 2.5 Flash Agent",
        type: "Autonomous LLM",
        icon: "gemini",
        detail: "Structured reasoning & schema-validated extraction"
      });

      // Human review gate if applicable
      if (text.includes('human') || text.includes('sign-off') || text.includes('approval') || text.includes('score')) {
        nodes.push({ title: "Human Review Gate", type: "Governance", icon: "shield", detail: "Pauses execution pending team sign-off" });
      }

      // Action
      if (text.includes('slack')) {
        nodes.push({ title: "Slack Block Kit Action", type: "Integration", icon: "slack", detail: "Dispatches interactive notification card" });
      } else if (text.includes('salesforce') || text.includes('crm')) {
        nodes.push({ title: "Salesforce CRM Sync", type: "CRM Action", icon: "salesforce", detail: "Creates opportunity and binds account" });
      } else {
        nodes.push({ title: "HTTP REST Dispatcher", type: "API Action", icon: "webhook", detail: "POST /v1/workflow/complete" });
      }

      setGeneratedNodes(nodes);
      setIsGenerating(false);
    }, 600);
  };

  return (
    <section ref={ref} id="prompt-builder" className="py-24 bg-white border-b border-slate-200/80 relative overflow-hidden">
      {/* Background Soft Mesh Accent */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className={`max-w-3xl mb-12 transition-all duration-700 ${
          isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0891B2] mb-3 font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Prompt-to-Workflow Engine</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight font-sans text-balance">
            Start with a prompt, build an enterprise-grade agent
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            Describe your automation intent in everyday language. AVRX AI infers the trigger, selects required API tools, injects guardrails, and renders a fully editable visual graph.
          </p>
        </div>

        {/* Preset Prompt Tabs */}
        <div className={`flex flex-wrap gap-2 mb-4 transition-all duration-700 delay-100 ${
          isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPromptText(preset.prompt);
              }}
              className="text-xs font-medium px-3.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-slate-700 transition active:scale-95 shadow-2xs"
            >
              {preset.title}
            </button>
          ))}
        </div>

        {/* Prompt Input Box */}
        <div className={`relative rounded-2xl border border-slate-300/90 bg-white shadow-md p-5 mb-8 focus-within:ring-2 focus-within:ring-cyan-500/30 focus-within:border-cyan-500 transition-all duration-700 delay-150 ${
          isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <textarea
            value={promptText}
            onChange={e => setPromptText(e.target.value)}
            rows={3}
            placeholder="Describe what workflow or agent you want to build..."
            className="w-full text-sm text-slate-900 bg-transparent resize-none focus:outline-none placeholder:text-slate-400 font-sans leading-relaxed"
          />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-3 border-t border-slate-100 mt-2 gap-3">
            <span className="text-[11px] font-mono text-slate-500">
              AVRX Natural Workflow Compiler · Zero hallucinated endpoints
            </span>
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !promptText.trim()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-950 hover:bg-slate-900 disabled:opacity-50 transition shadow-sm hover:shadow active:scale-95"
            >
              <Wand2 className={`w-3.5 h-3.5 text-cyan-400 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Synthesizing Graph...' : 'Generate Workflow Graph'}</span>
            </button>
          </div>
        </div>

        {/* Generated Visual Node Diagram */}
        <div className={`rounded-2xl border border-slate-800 bg-[#0B0F17] p-6 shadow-2xl text-slate-200 transition-all duration-700 delay-200 ${
          isRevealed ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-[0.99]'
        }`}>
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-bold font-mono tracking-wide text-slate-200 uppercase">
                Synthesized Workflow Graph ({generatedNodes.length} Stages)
              </span>
            </div>
            <button
              onClick={() => onOpenStudio()}
              className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-semibold transition"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Load in Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Connected Nodes Row with Visual Flow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {generatedNodes.map((node, i) => (
              <div
                key={i}
                className="relative rounded-xl border border-slate-800 bg-[#0F1420] p-4 flex flex-col justify-between hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(8,145,178,0.2)] transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60 uppercase">
                      {node.type}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">0{i + 1}</span>
                  </div>

                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                      <ServiceIcon id={node.icon} className="w-4 h-4 text-cyan-300" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-100">{node.title}</h4>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
                    {node.detail}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>Linked Port</span>
                  <span className="text-emerald-400">✓ Validated</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Graph compilation latency: <strong>48ms</strong></span>
            <span className="text-cyan-400">Zero syntax errors · Graph complete</span>
          </div>
        </div>

      </div>
    </section>
  );
}
