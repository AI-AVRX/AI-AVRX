import React, { useState } from 'react';
import { Bug, CheckCircle2, XCircle, Clock, Copy, Check, Play, RotateCcw, AlertTriangle, ArrowRight, Activity, Terminal } from 'lucide-react';
import { useScrollReveal } from './common/useScrollReveal';

export function ExecutionDebuggerSection({ onOpenStudio }: { onOpenStudio: () => void }) {
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.1 });
  const [selectedRunId, setSelectedRunId] = useState('run-10492');
  const [selectedStepIndex, setSelectedStepIndex] = useState(2);
  const [activeTab, setActiveTab] = useState<'output' | 'input' | 'logs'>('output');
  const [copied, setCopied] = useState(false);
  const [isSimulatingLiveRun, setIsSimulatingLiveRun] = useState(false);
  const [activeStepState, setActiveStepState] = useState<'pending' | 'running' | 'success' | 'failed'>('success');

  const executionRuns = [
    {
      id: 'run-10492',
      trigger: 'Webhook /v1/leads',
      timestamp: 'Today, 14:38:12',
      duration: '840ms',
      status: 'success',
      tokens: 384,
      steps: [
        { 
          name: 'Inbound Webhook', 
          type: 'trigger', 
          status: 'success', 
          latency: '12ms', 
          input: { source: "web_form", ip: "198.51.100.4" }, 
          output: { name: "David Miller", email: "d.miller@quantum.io", company: "Quantum Dynamics" },
          log: "Received POST /v1/leads [200 OK] — Header signature verified."
        },
        { 
          name: 'Vector Knowledge Search', 
          type: 'memory', 
          status: 'success', 
          latency: '68ms', 
          input: { query: "Quantum Dynamics contracts" }, 
          output: { exists: false, industry: "DeepTech", score: 0.91 },
          log: "pgvector similarity scan across 48,000 embeddings completed (top_k=3)."
        },
        { 
          name: 'Gemini 2.5 Flash Scorer', 
          type: 'agent', 
          status: 'success', 
          latency: '440ms', 
          input: { intent: "Evaluate Quantum Dynamics lead", tier: "DeepTech" }, 
          output: { qualified: true, route: "enterprise_ae", priority: "P1", confidence: 0.96 },
          log: "Model inference returned structured JSON; zero schema violations."
        },
        { 
          name: 'Salesforce Deal Sync', 
          type: 'action', 
          status: 'success', 
          latency: '210ms', 
          input: { name: "David Miller", stage: "Discovery" }, 
          output: { id: "0065g000003ABCDE", success: true },
          log: "Mutated Salesforce Opportunity row #0065g000003ABCDE."
        }
      ]
    },
    {
      id: 'run-10491',
      trigger: 'Cron Daily 08:00',
      timestamp: 'Today, 08:00:04',
      duration: '1.2s',
      status: 'success',
      tokens: 920,
      steps: [
        { 
          name: 'Cron Schedule 08:00', 
          type: 'trigger', 
          status: 'success', 
          latency: '4ms', 
          input: {}, 
          output: { scheduledTime: "08:00:00Z" },
          log: "Cron daemon fired on schedule."
        },
        { 
          name: 'Web Scraper Tool', 
          type: 'tool', 
          status: 'success', 
          latency: '680ms', 
          input: { target: "sec_filings" }, 
          output: { filingsCount: 3, rawTextLength: 42000 },
          log: "Scraped 3 filings without blocking."
        },
        { 
          name: 'Gemini Summarizer', 
          type: 'agent', 
          status: 'success', 
          latency: '480ms', 
          input: { summaryLength: "brief" }, 
          output: { bullets: 4, sentiment: "bullish" },
          log: "Generated executive digest format."
        },
        { 
          name: 'Slack Dispatch', 
          type: 'action', 
          status: 'success', 
          latency: '92ms', 
          input: { channel: "#exec-updates" }, 
          output: { delivered: true },
          log: "Delivered block kit to #exec-updates."
        }
      ]
    },
    {
      id: 'run-10490',
      trigger: 'Webhook /v1/invoices',
      timestamp: 'Yesterday, 19:14:50',
      duration: '420ms',
      status: 'error',
      tokens: 180,
      steps: [
        { 
          name: 'Invoice PDF Webhook', 
          type: 'trigger', 
          status: 'success', 
          latency: '18ms', 
          input: { file: "INV-4029.pdf" }, 
          output: { parsed: true, claimedTotal: 9400.00 },
          log: "Extracted invoice metadata successfully."
        },
        { 
          name: 'PostgreSQL Order Query', 
          type: 'tool', 
          status: 'failed', 
          latency: '402ms', 
          input: { sql: "SELECT * FROM orders WHERE id = 'PO-9941'" }, 
          output: { error: "Connection pool exhausted (5432) after 400ms timeout", code: "ETIMEDOUT" },
          log: "ERROR: Connection timeout to PostgreSQL instance 5432."
        }
      ]
    }
  ];

  const currentRun = executionRuns.find(r => r.id === selectedRunId) || executionRuns[0];
  const currentStep = currentRun.steps[selectedStepIndex] || currentRun.steps[0];
  const [retrySuccess, setRetrySuccess] = useState(false);
  const [selectedStateOverride, setSelectedStateOverride] = useState<'default' | 'pending' | 'running' | 'success' | 'failed'>('default');

  const simulateStepProgression = () => {
    if (isSimulatingLiveRun) return;
    setIsSimulatingLiveRun(true);
    setSelectedStateOverride('default');
    setActiveStepState('pending');

    setTimeout(() => {
      setActiveStepState('running');
    }, 400);

    setTimeout(() => {
      setActiveStepState(currentStep.status === 'failed' ? 'failed' : 'success');
      setIsSimulatingLiveRun(false);
    }, 1100);
  };

  const handleRetryNode = () => {
    setIsSimulatingLiveRun(true);
    setActiveStepState('running');
    setRetrySuccess(false);

    setTimeout(() => {
      setActiveStepState('success');
      setRetrySuccess(true);
      setIsSimulatingLiveRun(false);
    }, 900);
  };

  const copyPayload = () => {
    const data = activeTab === 'output' ? currentStep.output : currentStep.input;
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section ref={ref} id="debugger" className="py-24 bg-[#F8FAFC] bg-dot-grid-light border-b border-slate-200/80 relative overflow-hidden">
      {/* Background Aurora Bloom */}
      <div className="absolute top-1/3 right-1/4 w-96 h-80 bg-gradient-to-r from-cyan-500/8 to-blue-500/8 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className={`max-w-3xl mb-14 transition-all duration-700 ${
          isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0891B2] bg-cyan-100/70 px-3.5 py-1.5 rounded-full border border-cyan-200/80 mb-3 font-mono shadow-xs">
            <Activity className="w-3.5 h-3.5 text-cyan-600" />
            <span>Deterministic Observability Engine</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight font-sans text-balance">
            Inspect every token, database call, and error trace
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            Step through past workflow runs with deterministic fidelity. Inspect input arguments, verified output responses, millisecond execution waterfalls, and retry failed nodes in isolation.
          </p>
        </div>

        {/* 3-Panel Debugger Console */}
        <div className={`rounded-2xl border border-slate-800 bg-[#0F172A] shadow-2xl overflow-hidden text-slate-200 transition-all duration-700 delay-150 ${
          isRevealed ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-[0.99]'
        }`}>
          
          {/* Debugger Top Bar */}
          <div className="flex flex-wrap items-center justify-between px-5 py-3 bg-[#0B1120] border-b border-slate-800 text-xs gap-3">
            <div className="flex items-center gap-2.5">
              <Bug className="w-4 h-4 text-[#0891B2]" />
              <span className="font-bold text-white">Execution State Inspector</span>
              <span className="text-slate-500">·</span>
              <span className="font-mono text-cyan-400">{currentRun.id}</span>
              <span className="text-[10px] font-mono text-amber-300 bg-amber-950/60 border border-amber-800 px-2 py-0.5 rounded ml-2">
                Simulated Sandbox Demo
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-slate-400">Tokens: <strong className="text-white">{currentRun.tokens}</strong></span>
              <span className="text-[11px] font-mono text-slate-400">Duration: <strong className="text-white">{currentRun.duration}</strong></span>
              
              <button
                onClick={simulateStepProgression}
                disabled={isSimulatingLiveRun}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition"
                title="Simulate active node step progression"
              >
                <RotateCcw className={`w-3 h-3 ${isSimulatingLiveRun ? 'animate-spin' : ''}`} />
                <span>Simulate Node Run</span>
              </button>

              <button
                onClick={onOpenStudio}
                className="flex items-center gap-1 px-3 py-1 bg-[#0891B2] hover:bg-cyan-500 text-white font-semibold rounded-lg text-xs transition"
              >
                <span>Debug in Studio</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-800 min-h-[420px]">
            
            {/* Panel 1: Execution Runs List (3 cols) */}
            <div className="md:col-span-3 p-4 bg-[#090E1A] space-y-2">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 font-semibold">
                Recorded Runs ({executionRuns.length})
              </div>
              {executionRuns.map(run => {
                const isSelected = run.id === selectedRunId;
                return (
                  <div
                    key={run.id}
                    onClick={() => { setSelectedRunId(run.id); setSelectedStepIndex(0); }}
                    className={`cursor-pointer rounded-xl border p-3 transition ${
                      isSelected
                        ? 'border-[#0891B2] bg-cyan-950/30 text-white shadow-md'
                        : 'border-slate-800/80 bg-slate-900/40 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-mono font-medium text-slate-300">{run.id}</span>
                      {run.status === 'success' ? (
                        <span className="text-emerald-400 font-mono text-[10px] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> 200 OK
                        </span>
                      ) : (
                        <span className="text-rose-400 font-mono text-[10px] flex items-center gap-1">
                          <XCircle className="w-3 h-3" /> FAILED
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-semibold text-slate-200 truncate">{run.trigger}</div>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mt-2">
                      <span>{run.timestamp}</span>
                      <span>{run.duration}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Panel 2: Node Waterfall Steps (4 cols) */}
            <div className="md:col-span-4 p-4 bg-[#0C1322] space-y-2">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 font-semibold flex items-center justify-between">
                <span>Execution Steps ({currentRun.steps.length})</span>
                <span className="text-[10px] text-slate-500">Node Statuses</span>
              </div>
              {currentRun.steps.map((step, idx) => {
                const isSelected = idx === selectedStepIndex;
                const isError = step.status === 'failed';
                const statusState = isSelected && isSimulatingLiveRun ? activeStepState : step.status;

                let badgeStyle = 'text-emerald-400 bg-emerald-950/50 border-emerald-800';
                let badgeText = 'SUCCESS';

                if (statusState === 'pending') {
                  badgeStyle = 'text-amber-400 bg-amber-950/50 border-amber-800';
                  badgeText = 'PENDING';
                } else if (statusState === 'running') {
                  badgeStyle = 'text-cyan-300 bg-cyan-950/80 border-cyan-700 animate-pulse font-bold';
                  badgeText = 'RUNNING...';
                } else if (statusState === 'failed') {
                  badgeStyle = 'text-rose-400 bg-rose-950/60 border-rose-800 font-bold';
                  badgeText = 'FAILED';
                }

                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedStepIndex(idx)}
                    className={`cursor-pointer rounded-xl border p-3 transition ${
                      isSelected
                        ? 'border-[#0891B2] bg-slate-800/80 shadow-md text-white'
                        : 'border-slate-800/80 bg-slate-900/30 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-slate-200">{step.name}</span>
                      <span className={`text-[10px] font-mono ${isError ? 'text-rose-400' : 'text-slate-400'}`}>
                        {step.latency}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono mt-1">
                      <span className="text-cyan-400 uppercase">{step.type}</span>
                      <span className={`px-1.5 py-0.5 rounded border text-[9px] ${badgeStyle}`}>
                        {badgeText}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Panel 3: JSON Payload & Error Inspector (5 cols) */}
            <div className="md:col-span-5 p-5 bg-[#080D18] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                  <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
                    <button
                      onClick={() => setActiveTab('output')}
                      className={`px-2.5 py-1 text-[11px] font-medium rounded transition ${
                        activeTab === 'output' ? 'bg-slate-800 text-cyan-300 shadow-sm font-semibold' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Output Payload
                    </button>
                    <button
                      onClick={() => setActiveTab('input')}
                      className={`px-2.5 py-1 text-[11px] font-medium rounded transition ${
                        activeTab === 'input' ? 'bg-slate-800 text-cyan-300 shadow-sm font-semibold' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Input Arguments
                    </button>
                    <button
                      onClick={() => setActiveTab('logs')}
                      className={`px-2.5 py-1 text-[11px] font-medium rounded transition ${
                        activeTab === 'logs' ? 'bg-slate-800 text-cyan-300 shadow-sm font-semibold' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Node Logs
                    </button>
                  </div>

                  {activeTab !== 'logs' && (
                    <button
                      onClick={copyPayload}
                      className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 bg-slate-900 px-2 py-1 rounded border border-slate-800 transition"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  )}
                </div>

                <div className="mb-2 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-300">{currentStep.name}</span>
                  <span className="font-mono text-[#0891B2]">{currentStep.latency}</span>
                </div>

                {activeTab === 'logs' ? (
                  <div className="p-4 rounded-xl border border-slate-800 bg-[#040810] text-[11px] font-mono leading-relaxed space-y-2 max-h-[260px] overflow-x-auto">
                    <div className="text-slate-500">[{currentRun.timestamp}] Node initialized</div>
                    <div className="text-cyan-400">[INFO] Executing schema validation for {currentStep.type}...</div>
                    <div className="text-emerald-400">[TRACE] {currentStep.log}</div>
                    <div className="text-slate-400">[METRIC] Duration: {currentStep.latency} · Heap allocation: 1.4MB</div>
                  </div>
                ) : (
                  <pre className={`p-4 rounded-xl border text-[11px] font-mono leading-relaxed overflow-x-auto max-h-[260px] ${
                    currentStep.status === 'failed'
                      ? 'border-rose-900/60 bg-[#160B0E] text-rose-300'
                      : 'border-slate-800 bg-[#040810] text-emerald-300/90'
                  }`}>
                    {JSON.stringify(activeTab === 'output' ? currentStep.output : currentStep.input, null, 2)}
                  </pre>
                )}
              </div>

              {currentStep.status === 'failed' && (
                <div className="mt-4 p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-rose-300 gap-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>
                      {retrySuccess 
                        ? 'PostgreSQL connection recovered (pool expanded to 10 conns)' 
                        : 'PostgreSQL connection timeout on port 5432'}
                    </span>
                  </div>
                  <button
                    onClick={handleRetryNode}
                    disabled={isSimulatingLiveRun}
                    className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded font-medium text-[11px] transition shadow-sm active:scale-95 disabled:opacity-50 shrink-0"
                  >
                    {isSimulatingLiveRun ? 'Retrying in Sandbox...' : retrySuccess ? '✓ Node Recovered' : 'Retry Node'}
                  </button>
                </div>
              )}

              <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between mt-2 font-mono">
                <span>Node: {currentStep.type.toUpperCase()}</span>
                <span>Deterministic Replay Enabled</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
