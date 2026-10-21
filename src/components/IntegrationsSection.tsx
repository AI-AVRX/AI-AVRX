import React, { useState } from 'react';
import { INTEGRATIONS_LIST } from '../data/integrations';
import { ServiceIcon, AVRXLogo } from './common/BrandIcons';
import { Search, ArrowRight, Activity, CheckCircle2, ShieldCheck, Play, RotateCcw } from 'lucide-react';
import { IntegrationItem } from '../types/workflow';
import { useScrollReveal } from './common/useScrollReveal';

interface Props {
  onOpenStudio: (workflowId?: string) => void;
}

export function IntegrationsSection({ onOpenStudio }: Props) {
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.1 });
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedIntegration, setSelectedIntegration] = useState<IntegrationItem | null>(null);
  const [hoveredAppId, setHoveredAppId] = useState<string | null>(null);
  const [isDemoRunning, setIsDemoRunning] = useState<boolean>(false);
  const [activeHandshakeId, setActiveHandshakeId] = useState<string | null>('gemini');

  const categories = [
    'All',
    'AI Models',
    'Databases',
    'Communication',
    'CRM & Sales',
    'Developer & Cloud',
    'Productivity'
  ];

  const featuredApps = [
    { id: 'gemini', name: 'Google Gemini', type: 'Reasoning Engine', latency: '42ms' },
    { id: 'postgres', name: 'PostgreSQL & pgvector', type: 'Vector Database', latency: '12ms' },
    { id: 'salesforce', name: 'Salesforce CRM', type: 'Enterprise Pipeline', latency: '180ms' },
    { id: 'slack', name: 'Slack Bot', type: 'Team Dispatcher', latency: '65ms' },
    { id: 'github', name: 'GitHub CI/CD', type: 'DevOps Webhooks', latency: '92ms' }
  ];

  const triggerHandshakeDemo = () => {
    if (isDemoRunning) return;
    setIsDemoRunning(true);
    let step = 0;
    const interval = setInterval(() => {
      if (step < featuredApps.length) {
        setActiveHandshakeId(featuredApps[step].id);
        step++;
      } else {
        clearInterval(interval);
        setIsDemoRunning(false);
      }
    }, 900);
  };

  const filteredIntegrations = INTEGRATIONS_LIST.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="integrations" className="py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-wider text-[#0891B2] mb-2 font-mono">
              Ecosystem & Connectivity
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight font-sans text-balance">
              Connect 400+ enterprise services, databases, and AI models
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed text-balance">
              Plug your agents into internal data warehouses, team communication channels, and developer tools with pre-built authenticated connectors.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search integrations..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-300 bg-[#F8FAFC] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0891B2]/20 focus:border-[#0891B2] transition"
            />
          </div>
        </div>

        {/* Live Animated Integration Mesh Visualizer */}
        <div className="mb-14 rounded-2xl bg-[#0F172A] border border-slate-800 p-6 shadow-xl text-slate-200 overflow-hidden relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-800 mb-6 gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0891B2] animate-ping" />
              <span className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
                Interactive API Handshake Visualizer
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-slate-400">
                Notice: Example simulated link telemetry
              </span>
              <button
                onClick={triggerHandshakeDemo}
                disabled={isDemoRunning}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-[#0891B2] hover:bg-cyan-500 text-white transition disabled:opacity-50"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>{isDemoRunning ? 'Simulating Handshake...' : 'Simulate API Handshake'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Nodes Row with SVG Connecting Lines */}
          <div className="relative py-8 px-4 flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Center AVRX Engine Core */}
            <div className="order-2 md:order-2 flex flex-col items-center z-10">
              <div className="px-5 py-3 h-14 rounded-2xl bg-gradient-to-br from-[#090D17] to-[#0D1527] border-2 border-[#0891B2] shadow-[0_0_25px_rgba(8,145,178,0.4)] flex items-center justify-center relative">
                <img
                  src="/assets/aistudio/avrx-ai-website-logo_3196534c.png"
                  alt="AVRX AI Engine"
                  className="h-7 w-auto object-contain"
                />
                <span className="absolute -bottom-2.5 px-2.5 py-0.5 rounded-full bg-[#0891B2] text-[9px] font-mono font-bold text-slate-950 uppercase tracking-wider shadow-sm">
                  AVRX CORE
                </span>
              </div>
              <span className="text-xs font-bold text-white mt-3.5 font-mono">Unified Gateway</span>
              <span className="text-[10px] text-slate-400 font-mono">mTLS 1.3 Verified</span>
            </div>

            {/* Left and Right Satellite Apps with Animated Connecting Lines */}
            <div className="order-1 md:order-1 flex flex-wrap md:flex-col gap-4 z-10">
              {featuredApps.slice(0, 3).map(app => {
                const isActive = (isDemoRunning && activeHandshakeId === app.id) || hoveredAppId === app.id;
                return (
                  <div
                    key={app.id}
                    onMouseEnter={() => setHoveredAppId(app.id)}
                    onMouseLeave={() => setHoveredAppId(null)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                      isActive
                        ? 'border-[#0891B2] bg-cyan-950/40 shadow-[0_0_15px_rgba(8,145,178,0.25)] text-white'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
                      <ServiceIcon id={app.id} className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-200">{app.name}</div>
                      <div className="text-[10px] font-mono text-cyan-400">{app.latency} latency</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="order-3 md:order-3 flex flex-wrap md:flex-col gap-4 z-10">
              {featuredApps.slice(3).map(app => {
                const isActive = (isDemoRunning && activeHandshakeId === app.id) || hoveredAppId === app.id;
                return (
                  <div
                    key={app.id}
                    onMouseEnter={() => setHoveredAppId(app.id)}
                    onMouseLeave={() => setHoveredAppId(null)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                      isActive
                        ? 'border-[#0891B2] bg-cyan-950/40 shadow-[0_0_15px_rgba(8,145,178,0.25)] text-white'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
                      <ServiceIcon id={app.id} className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-200">{app.name}</div>
                      <div className="text-[10px] font-mono text-cyan-400">{app.latency} latency</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Background SVG Animated Connection Lines with Dynamic Hover/Demo Paths */}
            <svg className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-0">
              <defs>
                <linearGradient id="int-wire-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0891B2" />
                  <stop offset="100%" stopColor="#2563EB" />
                </linearGradient>
                <linearGradient id="int-wire-blue" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#0891B2" />
                </linearGradient>
                <filter id="int-glow">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Left apps to center core */}
              {[
                { id: 'gemini', y1: '28%' },
                { id: 'anthropic', y1: '50%' },
                { id: 'openai', y1: '72%' }
              ].map(link => {
                const isActive = (isDemoRunning && activeHandshakeId === link.id) || hoveredAppId === link.id;
                return (
                  <g key={link.id}>
                    <line
                      x1="22%"
                      y1={link.y1}
                      x2="45%"
                      y2="50%"
                      stroke={isActive ? "url(#int-wire-cyan)" : "#334155"}
                      strokeWidth={isActive ? "2.5" : "1.25"}
                      strokeDasharray={isActive ? "5 3" : "4 4"}
                      className={isActive ? "animate-wire-flow" : ""}
                      opacity={isActive ? 1 : 0.35}
                      filter={isActive ? "url(#int-glow)" : "none"}
                    />
                    {isActive && (
                      <circle r="3.5" fill="#0891B2">
                        <animate
                          attributeName="cx"
                          from="22%"
                          to="45%"
                          dur="0.9s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="cy"
                          from={link.y1}
                          to="50%"
                          dur="0.9s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}
                  </g>
                );
              })}

              {/* Right apps to center core */}
              {[
                { id: 'salesforce', y1: '28%' },
                { id: 'postgres', y1: '50%' },
                { id: 'slack', y1: '72%' }
              ].map(link => {
                const isActive = (isDemoRunning && activeHandshakeId === link.id) || hoveredAppId === link.id;
                return (
                  <g key={link.id}>
                    <line
                      x1="78%"
                      y1={link.y1}
                      x2="55%"
                      y2="50%"
                      stroke={isActive ? "url(#int-wire-blue)" : "#334155"}
                      strokeWidth={isActive ? "2.5" : "1.25"}
                      strokeDasharray={isActive ? "5 3" : "4 4"}
                      className={isActive ? "animate-wire-flow" : ""}
                      opacity={isActive ? 1 : 0.35}
                      filter={isActive ? "url(#int-glow)" : "none"}
                    />
                    {isActive && (
                      <circle r="3.5" fill="#7C3AED">
                        <animate
                          attributeName="cx"
                          from="78%"
                          to="55%"
                          dur="0.9s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="cy"
                          from={link.y1}
                          to="50%"
                          dur="0.9s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Explicit Label: Simulated Demo vs Genuine Integrations */}
          <div className="pt-3.5 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-slate-400 gap-2 font-mono">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Simulated handshake visualizer · Encrypted payload routing demo</span>
            </span>
            <span className="text-slate-400 bg-slate-900/90 border border-slate-800 px-2 py-0.5 rounded text-[10px]">
              Genuine Services: Configured with your own API Keys / OAuth in Workflow Studio
            </span>
          </div>
        </div>

        {/* Category Filter Controls */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 text-xs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-slate-950 text-white shadow-sm font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Light Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredIntegrations.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedIntegration(item)}
              className="group cursor-pointer rounded-xl border border-slate-200 bg-[#FAFBFD] p-5 hover:border-slate-300 hover:shadow-sm transition-all duration-150 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 shadow-xs flex items-center justify-center">
                    <ServiceIcon id={item.id} className="w-5 h-5" />
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-mono font-medium text-cyan-800 bg-cyan-50 border border-cyan-200/80 px-2 py-0.5 rounded">
                      {item.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-slate-900 group-hover:text-slate-950 transition-colors">
                  {item.name}
                </h3>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>{item.templatesCount} templates</span>
                <span className="text-cyan-700 font-medium group-hover:text-cyan-900 flex items-center gap-1">
                  <span>View</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredIntegrations.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-sm">
            No integrations match "{searchQuery}" in {selectedCategory}.
          </div>
        )}

      </div>

      {/* Integration Detail Modal */}
      {selectedIntegration && (
        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 relative">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center">
                  <ServiceIcon id={selectedIntegration.id} className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-950">{selectedIntegration.name}</h3>
                  <p className="text-xs font-mono text-slate-500">{selectedIntegration.category}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedIntegration(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1 rounded-lg hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {selectedIntegration.description}
              </p>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                <div className="font-semibold text-slate-900">Supported Node Actions:</div>
                <div className="text-slate-600 font-mono text-[11px]">
                  • Automated Event Trigger Listener<br/>
                  • Parameterized Mutation Call with Secrets Injection<br/>
                  • High-throughput Vector/Row Paging
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">{selectedIntegration.templatesCount} Community Templates</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedIntegration(null)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedIntegration(null);
                    onOpenStudio();
                  }}
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-950 hover:bg-slate-800 rounded-lg transition"
                >
                  Open in Workflow Studio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
