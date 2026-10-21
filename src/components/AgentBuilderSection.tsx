import React, { useState } from 'react';
import { Cpu, Database, Wrench, Shield, Terminal, Sliders, Check, Plus, ArrowRight, Layers, Code, Sparkles, Activity } from 'lucide-react';
import { ServiceIcon } from './common/BrandIcons';
import { useScrollReveal } from './common/useScrollReveal';

interface Props {
  onOpenStudio: () => void;
}

export function AgentBuilderSection({ onOpenStudio }: Props) {
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.1 });
  const [selectedModel, setSelectedModel] = useState('gemini-2.5-flash');
  const [temperature, setTemperature] = useState(0.2);
  const [maxSteps, setMaxSteps] = useState(6);
  const [enabledTools, setEnabledTools] = useState<string[]>(['postgres', 'slack', 'search']);
  const [guardrailActive, setGuardrailActive] = useState(true);
  const [viewMode, setViewMode] = useState<'graph' | 'spec'>('graph');

  const toggleTool = (toolId: string) => {
    if (enabledTools.includes(toolId)) {
      setEnabledTools(enabledTools.filter(t => t !== toolId));
    } else {
      setEnabledTools([...enabledTools, toolId]);
    }
  };

  const availableTools = [
    { id: 'postgres', name: 'PostgreSQL Read-Only DB', category: 'Database', icon: 'postgres' },
    { id: 'slack', name: 'Slack Approval Bot', category: 'Communication', icon: 'slack' },
    { id: 'search', name: 'Google Search Grounding', category: 'Web Research', icon: 'gemini' },
    { id: 'salesforce', name: 'Salesforce CRM Lead Sync', category: 'CRM', icon: 'salesforce' },
    { id: 'github', name: 'GitHub Issues & PRs', category: 'DevOps', icon: 'github' }
  ];

  return (
    <section ref={ref} className="py-24 bg-[#F8FAFC] bg-dot-grid-light border-b border-slate-200/80 relative overflow-hidden">
      {/* Aurora Ambient Bloom */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-r from-cyan-500/8 to-violet-500/8 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
          isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0891B2] bg-cyan-100/70 px-3.5 py-1.5 rounded-full border border-cyan-200/80 mb-3 font-mono shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Modular Agent Assembly</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight font-sans text-balance">
            Assemble multi-skilled agents like building blocks
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            No convoluted code or fragile prompts. Configure model brains, bind sandboxed enterprise tools, attach vector memory, and enforce execution bounds in seconds.
          </p>
        </div>

        {/* Large Visual Interactive Agent Assembler Demo */}
        <div className={`rounded-2xl border border-slate-800 bg-[#0B0F17] shadow-2xl overflow-hidden text-slate-200 transition-all duration-700 delay-150 ${
          isRevealed ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-[0.99]'
        }`}>
          
          {/* Top Stage Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#0F1420] border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-bold text-slate-200 tracking-wide font-mono">AGENT RUNTIME SPECIFICATION</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-slate-400">STATUS:</span>
              <span className="text-[11px] font-mono text-emerald-400 font-semibold bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-800/80">
                COMPILED & READY
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
            
            {/* Left Column: Interactive Controls */}
            <div className="lg:col-span-5 p-6 space-y-6 bg-[#0E131E]">
              
              {/* 1. Model Selector */}
              <div>
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between mb-2">
                  <span className="flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    <span>Inference Model Engine</span>
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400">HOT-SWAPPABLE</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash', latency: '400ms' },
                    { id: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro', latency: '950ms' },
                    { id: 'claude-3-5-sonnet', label: 'Claude 3.5 Sonnet', latency: '820ms' },
                    { id: 'custom-fine-tuned', label: 'Self-Hosted Llama-3', latency: '220ms' }
                  ].map(m => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedModel(m.id)}
                      className={`p-2.5 rounded-xl border text-left transition ${
                        selectedModel === m.id
                          ? 'border-cyan-500 bg-cyan-950/50 text-cyan-200 shadow-sm ring-1 ring-cyan-500/40'
                          : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-semibold">{m.label}</div>
                      <div className="text-[10px] font-mono text-slate-500 mt-0.5">{m.latency} avg</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Tool Binding */}
              <div>
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between mb-2">
                  <span className="flex items-center gap-1.5">
                    <Wrench className="w-4 h-4 text-violet-400" />
                    <span>Enabled Capabilities & Tools</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{enabledTools.length} Active</span>
                </label>
                <div className="space-y-2">
                  {availableTools.map(tool => {
                    const isChecked = enabledTools.includes(tool.id);
                    return (
                      <div
                        key={tool.id}
                        onClick={() => toggleTool(tool.id)}
                        className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition ${
                          isChecked
                            ? 'border-violet-500/80 bg-violet-950/30 text-white shadow-xs'
                            : 'border-slate-800/80 bg-slate-900/30 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center">
                            <ServiceIcon id={tool.icon} className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-200">{tool.name}</div>
                            <div className="text-[10px] font-mono text-slate-500">{tool.category}</div>
                          </div>
                        </div>

                        <div className={`w-5 h-5 rounded flex items-center justify-center transition ${
                          isChecked ? 'bg-violet-600 text-white' : 'border border-slate-700'
                        }`}>
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3. Safety Guardrails & Step Limits */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Loop Circuit Breaker</span>
                  </span>
                  <span className="text-xs font-mono text-cyan-400">{maxSteps} Max Hops</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="12"
                  value={maxSteps}
                  onChange={e => setMaxSteps(Number(e.target.value))}
                  className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                />

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-300">Deterministic PII Redaction</span>
                  <button
                    onClick={() => setGuardrailActive(!guardrailActive)}
                    className={`w-9 h-5 rounded-full transition-colors relative ${guardrailActive ? 'bg-cyan-600' : 'bg-slate-700'}`}
                  >
                    <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${guardrailActive ? 'translate-x-4' : 'translate-x-0.5'}`} />
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: Visual Neural Node Topology & Live Compiled Blueprint JSON */}
            <div className="lg:col-span-7 p-6 flex flex-col justify-between bg-[#080B11]">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewMode('graph')}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                        viewMode === 'graph' ? 'bg-[#0891B2] text-white shadow-xs' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Topology Graph
                    </button>
                    <button
                      onClick={() => setViewMode('spec')}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                        viewMode === 'spec' ? 'bg-[#0891B2] text-white shadow-xs' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Blueprint JSON
                    </button>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/80">
                    AVRX-SPEC-v2
                  </span>
                </div>

                {viewMode === 'graph' ? (
                  /* Visual Neural Graph View */
                  <div className="p-6 rounded-2xl bg-[#04070D] border border-slate-800 relative min-h-[340px] flex flex-col items-center justify-center select-none overflow-hidden">
                    {/* SVG neural connection wires */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <line x1="50%" y1="70" x2="25%" y2="200" stroke="#0891B2" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
                      <line x1="50%" y1="70" x2="50%" y2="200" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
                      <line x1="50%" y1="70" x2="75%" y2="200" stroke="#7C3AED" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
                    </svg>

                    {/* Central Brain Node */}
                    <div className="relative z-10 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-950 to-blue-950 border-2 border-cyan-500 shadow-[0_0_20px_rgba(8,145,178,0.4)] flex items-center gap-2.5 mb-14">
                      <Cpu className="w-5 h-5 text-cyan-300 animate-pulse" />
                      <div>
                        <div className="text-xs font-bold text-white uppercase">{selectedModel}</div>
                        <div className="text-[10px] font-mono text-cyan-300">Temp: {temperature} · Max Hops: {maxSteps}</div>
                      </div>
                    </div>

                    {/* Bound Tools Row */}
                    <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 w-full">
                      {enabledTools.map((tId) => {
                        const tInfo = availableTools.find(a => a.id === tId) || { name: tId, icon: tId };
                        return (
                          <div key={tId} className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2 text-xs font-mono text-slate-300 shadow-sm">
                            <ServiceIcon id={tInfo.icon} className="w-3.5 h-3.5 text-cyan-400" />
                            <span>{tInfo.name.split(' ')[0]}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="absolute bottom-3 left-4 text-[10px] font-mono text-slate-500">
                      Circuit Breaker: {maxSteps} hops · PII Filter: {guardrailActive ? 'ACTIVE' : 'OFF'}
                    </div>
                  </div>
                ) : (
                  /* JSON Specification View */
                  <pre className="p-4 rounded-xl bg-[#05070B] border border-slate-800 text-[11px] font-mono text-cyan-300/90 leading-relaxed overflow-x-auto max-h-[340px]">
{`{
  "agentId": "enterprise_operations_coordinator",
  "engine": {
    "model": "${selectedModel}",
    "temperature": ${temperature},
    "circuitBreaker": {
      "maxAutonomousSteps": ${maxSteps},
      "timeoutMs": 15000
    }
  },
  "guardrails": {
    "piiAnonymization": ${guardrailActive},
    "schemaValidation": "STRICT_ZOD",
    "promptInjectionDefense": true
  },
  "boundTools": [
${enabledTools.map(t => `    { "id": "${t}", "sandbox": "isolated_actor", "auth": "VAULT_SECRETS" }`).join(',\n')}
  ],
  "memoryContext": {
    "provider": "pgvector",
    "similarityThreshold": 0.82,
    "maxContextWindowTokens": 128000
  }
}`}
                  </pre>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-4">
                <span className="text-xs text-slate-400">
                  Ready to test with simulated live input payloads
                </span>
                <button
                  onClick={onOpenStudio}
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs transition flex items-center gap-1.5 shadow-sm active:scale-95"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Open in Workflow Studio</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
