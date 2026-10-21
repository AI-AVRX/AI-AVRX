import React, { useState, useEffect } from 'react';
import { CheckCircle2, Play, Pause, RotateCcw, ArrowRight, Layers, Cpu, Wrench, Shield, Sparkles, Activity } from 'lucide-react';
import { ServiceIcon } from './common/BrandIcons';
import { useScrollReveal } from './common/useScrollReveal';

export function AgentDemoSection({ onOpenStudio }: { onOpenStudio: () => void }) {
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.1 });
  const [activeTab, setActiveTab] = useState<'sales' | 'support' | 'research' | 'marketing'>('sales');
  const [activeStep, setActiveStep] = useState(2);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const scenarios = {
    sales: {
      category: "Sales & Pipeline Acceleration",
      title: "Autonomous Enterprise SDR Agent",
      goal: "Enrich inbound enterprise inquiry, check Salesforce CRM history, calculate budget signal with Gemini, and dispatch qualified deal to Slack.",
      agentModel: "Gemini 2.5 Flash Reasoner",
      steps: [
        {
          phase: "01. Task Ingest",
          label: "Inbound Lead Webhook",
          targetTool: "HTTP REST Listener",
          detail: "Parsed lead: Sarah Connor (Cyberdyne Systems, 450 employees). Request: Enterprise agent orchestration.",
          status: "Completed",
          latency: "8ms",
          output: { email: "s.connor@cyberdyne.ai", intent: "Enterprise Trial", score: 94 }
        },
        {
          phase: "02. Tool Hand-off",
          label: "Salesforce CRM Query Tool",
          targetTool: "Salesforce SOQL API",
          detail: "QUERY: SELECT Id, Tier, AccountOwner FROM Accounts WHERE Domain = 'cyberdyne.ai' LIMIT 1;",
          status: "Completed",
          latency: "140ms",
          output: { accountTier: "Strategic Tier-1", pastDeals: 2, owner: "Marcus Vance" }
        },
        {
          phase: "03. Agent Reasoning",
          label: "Gemini 2.5 Flash Agent",
          targetTool: "Core Reasoning Model",
          detail: "Agent evaluates: Deal size > $50k ARR, high urgency, active expansion intent. Recommend direct executive routing.",
          status: "Active Execution",
          latency: "380ms",
          output: { qualificationDecision: "QUALIFIED_STRATEGIC", priority: "P1", confidence: 0.96 }
        },
        {
          phase: "04. Safeguard Gate",
          label: "Policy & Anonymization Filter",
          targetTool: "Guardrail Validator",
          detail: "Redacted raw contact phone before team broadcast. Validated required CRM schema compliance.",
          status: "Pending",
          latency: "2ms",
          output: { piiRedacted: true, schemaApproved: true }
        },
        {
          phase: "05. Tool Action",
          label: "Slack Interactive Notification",
          targetTool: "Slack Block Kit Action",
          detail: "Dispatched high-priority notification to #inbound-deals with 1-click Claim Lead button.",
          status: "Pending",
          latency: "85ms",
          output: { channel: "#inbound-deals", messageId: "msg_99410", delivered: true }
        }
      ]
    },
    support: {
      category: "Customer Support & RAG",
      title: "Autonomous Resolution Agent",
      goal: "Ingest Zendesk ticket, perform semantic search over PostgreSQL pgvector knowledge base, and return verified solution.",
      agentModel: "Gemini 2.5 Pro",
      steps: [
        {
          phase: "01. Task Ingest",
          label: "Zendesk Webhook",
          targetTool: "Zendesk Event Stream",
          detail: "Ticket #ZD-9982: 'Webhook signature HMAC mismatch on Node v22 rawBody buffer.'",
          status: "Completed",
          latency: "12ms",
          output: { ticketId: "ZD-9982", requester: "alex@acme.dev", severity: "Normal" }
        },
        {
          phase: "02. Tool Hand-off",
          label: "PostgreSQL pgvector Tool",
          targetTool: "Knowledge Base Vectors",
          detail: "EXEC: SELECT content, similarity FROM doc_embeddings ORDER BY embedding <=> query_vec LIMIT 3;",
          status: "Completed",
          latency: "45ms",
          output: { matchedDoc: "Node v22 Crypto Migration Guide", similarity: 0.94 }
        },
        {
          phase: "03. Agent Reasoning",
          label: "Gemini 2.5 Support Agent",
          targetTool: "Code Synthesis Engine",
          detail: "Synthesizing exact 4-line snippet replacing parsed JSON body with unparsed buffer for crypto.createHmac().",
          status: "Active Execution",
          latency: "420ms",
          output: { draftResolution: "Verified buffer implementation provided", confidence: 0.98 }
        },
        {
          phase: "04. Safeguard Gate",
          label: "Confidence Threshold Checker",
          targetTool: "Audit Gate",
          detail: "Confidence 98% exceeds 95% minimum requirement for automatic zero-human closure.",
          status: "Pending",
          latency: "1ms",
          output: { autoSendApproved: true, escalated: false }
        },
        {
          phase: "05. Tool Action",
          label: "Zendesk Public Reply",
          targetTool: "Zendesk Support API",
          detail: "Published authenticated solution directly to customer ticket and marked as Solved.",
          status: "Pending",
          latency: "110ms",
          output: { ticketUpdated: true, status: "Solved", csatSurveySent: true }
        }
      ]
    },
    research: {
      category: "Market & Competitive Intelligence",
      title: "Autonomous Research Analyst Agent",
      goal: "Scrape regulatory filings and industry press, correlate market developments, and generate executive summaries.",
      agentModel: "Gemini 2.5 Flash Grounding",
      steps: [
        {
          phase: "01. Task Ingest",
          label: "Daily Cron Trigger (08:00 UTC)",
          targetTool: "Scheduler Engine",
          detail: "Fired daily research routine: Monitoring 14 competitor targets in Cloud & Enterprise AI.",
          status: "Completed",
          latency: "4ms",
          output: { targetSectors: ["Enterprise AI", "Workflow Automation"], jobRunId: "run_8812" }
        },
        {
          phase: "02. Tool Hand-off",
          label: "Web Scraper & Feed Tool",
          targetTool: "Headless Content Reader",
          detail: "Fetched 18 articles, SEC 10-K filings, and changelog release notes across target domains.",
          status: "Completed",
          latency: "680ms",
          output: { articlesRetrieved: 18, rawCharacters: 142000, validFeeds: 14 }
        },
        {
          phase: "03. Agent Reasoning",
          label: "Gemini 2.5 Analyst Agent",
          targetTool: "Grounding & Summarization",
          detail: "Identified 1 pricing shift, 2 new feature launches, and synthesized strategic threat matrix.",
          status: "Active Execution",
          latency: "620ms",
          output: { keyFindings: 3, marketSentiment: "Neutral-Bullish", readTime: "2 min" }
        },
        {
          phase: "04. Safeguard Gate",
          label: "Factuality & Citation Verifier",
          targetTool: "Search Grounding Auditor",
          detail: "Cross-referenced all extracted financial figures against official regulatory SEC disclosures.",
          status: "Pending",
          latency: "95ms",
          output: { citationsVerified: 6, hallucinationScore: 0.0 }
        },
        {
          phase: "05. Tool Action",
          label: "Email & Slack Broadcast",
          targetTool: "Executive Dispatcher",
          detail: "Sent clean Markdown digest with comparison tables to senior leadership channel.",
          status: "Pending",
          latency: "92ms",
          output: { deliveredRecipients: 14, slackBroadcast: true }
        }
      ]
    },
    marketing: {
      category: "Omnichannel Growth & Marketing",
      title: "Autonomous Campaign Optimizer Agent",
      goal: "Monitor conversion rates on advertising channels, rebalance budget to top-performing variants, and generate localized copy.",
      agentModel: "Gemini 2.5 Flash",
      steps: [
        {
          phase: "01. Task Ingest",
          label: "Google Analytics Webhook",
          targetTool: "Realtime Analytics Stream",
          detail: "Detected 32% drop in conversion on Ad Set B while Ad Set A CAC decreased to $18.",
          status: "Completed",
          latency: "15ms",
          output: { event: "ANOMALY_DETECTED", varianceThreshold: 0.25 }
        },
        {
          phase: "02. Tool Hand-off",
          label: "Ad Manager API Tool",
          targetTool: "Meta & Google Ads Connectors",
          detail: "Pulls impression metrics, click-through rates, and current daily spend allocations.",
          status: "Completed",
          latency: "180ms",
          output: { currentDailyBudget: "$4,500", topVariant: "Variant_A2_Clean" }
        },
        {
          phase: "03. Agent Reasoning",
          label: "Gemini Copywriting Agent",
          targetTool: "Multi-Variant Synthesizer",
          detail: "Generated 3 high-intent headline variations matching current top-converting messaging angles.",
          status: "Active Execution",
          latency: "340ms",
          output: { generatedHeadlines: 3, toneAlignment: "B2B Pragmatic" }
        },
        {
          phase: "04. Safeguard Gate",
          label: "Budget Ceiling Circuit Breaker",
          targetTool: "Spend Safety Guardrail",
          detail: "Verified that reallocation of $800 daily stays safely within approved $5,000 monthly cap.",
          status: "Pending",
          latency: "2ms",
          output: { capExceeded: false, approvalGranted: true }
        },
        {
          phase: "05. Tool Action",
          label: "Ad Set Rebalance & Notion Log",
          targetTool: "Ads API & Notion CRM",
          detail: "Updated active campaign bid caps and logged decision rationale to Growth Notion Board.",
          status: "Pending",
          latency: "140ms",
          output: { campaignsUpdated: 2, notionPageLogged: true }
        }
      ]
    }
  };

  const current = scenarios[activeTab];

  // Auto-play stepper
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setActiveStep(prev => (prev < 4 ? prev + 1 : 0));
      }, 1600);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying]);

  return (
    <section ref={ref} id="agent-loop" className="py-24 bg-[#F8FAFC] bg-dot-grid-light border-b border-slate-200/80 relative overflow-hidden">
      {/* Cinematic Aurora Glow behind stage */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-6xl h-80 bg-gradient-to-r from-cyan-500/10 via-blue-500/8 to-violet-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Header */}
        <div className={`flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6 transition-all duration-700 ${
          isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0891B2] bg-cyan-100/70 px-3.5 py-1.5 rounded-full border border-cyan-200/80 mb-3 font-mono shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
              <span>Interactive Agent Reasoning Loop</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight font-sans text-balance">
              Autonomous agents passing tasks to real tools
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
              Watch AVRX AI agents inspect incoming tasks, invoke parameterized database and API tools, verify guardrails, and return actionable business results.
            </p>
          </div>

          {/* 4 Tabs: Sales, Customer Support, Research, Marketing */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-200/80 backdrop-blur-md rounded-xl border border-slate-300/80 shrink-0 shadow-xs">
            {(['sales', 'support', 'research', 'marketing'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setActiveStep(2);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${
                  activeTab === tab
                    ? 'bg-white text-slate-950 shadow-sm scale-[1.02]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                {tab === 'support' ? 'Customer Support' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Showcase Stage: Dark Navy Panel on Light Canvas */}
        <div className={`rounded-2xl border border-slate-800 bg-[#0F172A] shadow-2xl overflow-hidden text-slate-200 transition-all duration-700 delay-150 ${
          isRevealed ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-[0.99]'
        }`}>
          
          {/* Top Panel Bar */}
          <div className="flex flex-wrap items-center justify-between px-6 py-3.5 bg-[#0B1120] border-b border-slate-800 gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0891B2] animate-pulse" />
              <div>
                <span className="text-xs font-bold text-white font-sans">{current.title}</span>
                <span className="hidden sm:inline-block text-slate-500 mx-2">·</span>
                <span className="text-[11px] font-mono text-[#0891B2]">{current.agentModel}</span>
              </div>
            </div>

            {/* Stepper & Play Controls */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-slate-400 mr-1">
                Stage {activeStep + 1} of 5
              </span>

              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  isAutoPlaying
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-[#0891B2] hover:bg-cyan-500 text-white'
                }`}
              >
                {isAutoPlaying ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
                <span>{isAutoPlaying ? 'Pause Live' : 'Auto Step'}</span>
              </button>

              <button
                onClick={() => setActiveStep(prev => (prev < 4 ? prev + 1 : 0))}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition"
              >
                Next Node
              </button>
            </div>
          </div>

          {/* Goal & Task Description Strip */}
          <div className="px-6 py-3 bg-[#0A0E1A] border-b border-slate-800/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-wider">Objective:</span>
              <span className="text-slate-300 font-mono text-[11px] truncate max-w-3xl">{current.goal}</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 hidden md:inline">Simulated Live Demo</span>
          </div>

          {/* 5 Connected Step Cards with Live Tool Connection Animations */}
          <div className="p-6 bg-[#0B0F1C] bg-dot-grid-dense relative">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
              {current.steps.map((st, sIdx) => {
                const isSelected = sIdx === activeStep;
                const isDone = sIdx < activeStep;

                let borderClass = 'border-slate-800 bg-[#0E1526]/80 text-slate-400';
                let badgeClass = 'text-slate-500 bg-slate-900 border-slate-800';

                if (isSelected) {
                  borderClass = 'border-[#0891B2] bg-[#0A1A2F] text-white shadow-[0_0_18px_rgba(8,145,178,0.3)] ring-1 ring-[#0891B2]/60';
                  badgeClass = 'text-cyan-300 bg-cyan-950 border-cyan-700 animate-pulse font-bold';
                } else if (isDone) {
                  borderClass = 'border-emerald-600/60 bg-[#07171B] text-slate-300';
                  badgeClass = 'text-emerald-300 bg-[#D1FAE5]/10 border-emerald-800';
                }

                return (
                  <div
                    key={sIdx}
                    onClick={() => setActiveStep(sIdx)}
                    className={`cursor-pointer rounded-xl border p-3.5 flex flex-col justify-between transition-all duration-200 relative ${borderClass}`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded border ${badgeClass}`}>
                          {isDone ? '✓ Returned' : isSelected ? '⚡ Executing' : 'Queued'}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">{st.latency}</span>
                      </div>

                      <h4 className="text-xs font-bold text-slate-100">{st.label}</h4>
                      <span className="text-[10px] font-mono text-cyan-400 block mt-0.5">{st.targetTool}</span>

                      <p className="text-[11px] text-slate-400 mt-2 font-mono leading-relaxed line-clamp-3">
                        {st.detail}
                      </p>
                    </div>

                    <div className="mt-4 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span>Stage 0{sIdx + 1}</span>
                      {isDone ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : isSelected ? (
                        <span className="text-[#0891B2] font-semibold animate-pulse">Passing Task →</span>
                      ) : (
                        <span>{st.phase.split('.')[1]?.trim()}</span>
                      )}
                    </div>

                    {/* Active Step Realtime Progress Bar */}
                    {isSelected && (
                      <div className="absolute -bottom-[1px] left-3 right-3 h-[2px] bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#0891B2] via-[#2563EB] to-[#7C3AED] w-full animate-pulse" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Node Live Task Passing & Result Payload Inspector */}
          <div className="p-6 bg-[#080D18] border-t border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white font-sans flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-[#0891B2]" />
                  <span>Agent Task Dispatch → {current.steps[activeStep].targetTool}</span>
                </span>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                  SCHEMA_BOUND
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {current.steps[activeStep].detail}
              </p>
              
              <div className="p-3 rounded-xl bg-[#040810] border border-slate-800 text-[11px] font-mono space-y-1">
                <div className="text-slate-500 flex items-center justify-between">
                  <span>DISPATCHED_BY: {current.agentModel}</span>
                  <span className="text-cyan-400">{current.steps[activeStep].latency}</span>
                </div>
                <div className="text-cyan-300">
                  ➜ Hand-off: Task passed with strict JSON-schema parameter validation
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5 font-mono">
                <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified Result Returned by Tool</span>
                </span>
                <span className="text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded text-[10px]">
                  200 SUCCESS
                </span>
              </div>
              <pre className="p-3.5 rounded-xl bg-[#040810] border border-slate-800 text-[11px] font-mono text-emerald-300/95 overflow-x-auto max-h-36 leading-relaxed">
                {JSON.stringify(current.steps[activeStep].output, null, 2)}
              </pre>
            </div>
          </div>

          {/* Bottom Action Strip */}
          <div className="px-6 py-3 bg-[#0B1120] border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400 text-[11px]">
              Click any stage above to step through agent thought, tool hand-off, and result verification.
            </span>
            <button
              onClick={onOpenStudio}
              className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition"
            >
              <span>Customize in Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
