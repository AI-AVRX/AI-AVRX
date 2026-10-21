import React, { useState, useEffect } from 'react';
import { INDUSTRY_LIST, IndustryItem } from '../data/industryData';
import { 
  ArrowRight, CheckCircle2, Server, ShieldCheck, Activity,
  Building, Home, ShoppingCart, HeartPulse, GraduationCap, Briefcase
} from 'lucide-react';
import { useScrollReveal } from './common/useScrollReveal';

interface Props {
  onSelectIndustry: (industry: IndustryItem) => void;
  onBookDemo: () => void;
}

export function IndustrySection({ onSelectIndustry, onBookDemo }: Props) {
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.1 });
  const [imgError, setImgError] = useState<Record<string, boolean>>({});
  const [activeNodePulse, setActiveNodePulse] = useState<number>(1);

  // Subtle cycling node activity
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNodePulse(prev => (prev < 3 ? prev + 1 : 1));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  // Industry-specific 3-step pipeline examples
  const industryMiniPipelines: Record<string, { steps: string[]; tag: string }> = {
    'finance-insurance': {
      steps: ['Borrower 10-K Intake', 'Gemini Credit Underwriter', 'Salesforce Financial Sync'],
      tag: 'Verified Underwriting Run'
    },
    'real-estate': {
      steps: ['Zillow Inquiry Webhook', 'Buyer Buying Power Score', 'Agent Calendar Walkthrough'],
      tag: 'Auto-Tour Booked'
    },
    'ecommerce-retail': {
      steps: ['WISMO Ticket Ingest', 'Shopify Tracking Carrier', 'Instant Refund / Macro Reply'],
      tag: 'Resolved in 680ms'
    },
    'healthcare': {
      steps: ['Patient Intake Portal', 'HIPAA Non-Clinical Filter', 'EHR Scheduling Dispatch'],
      tag: 'Zero Diagnostic Risk'
    },
    'education': {
      steps: ['Admissions Inquiry', '2026 Course Catalog RAG', 'Counselor Zoom Scaffold'],
      tag: 'Transfer Credits Verified'
    },
    'agencies-services': {
      steps: ['Meeting Call Audio', 'Gemini Scope & Budget Parser', 'Linear 14-Task Epic Generator'],
      tag: 'SOW Drafted & Synced'
    }
  };

  const getIndustryIcon = (id: string) => {
    switch (id) {
      case 'finance-insurance':
        return <Building className="w-8 h-8 text-cyan-400 mb-2" />;
      case 'real-estate':
        return <Home className="w-8 h-8 text-blue-400 mb-2" />;
      case 'ecommerce-retail':
        return <ShoppingCart className="w-8 h-8 text-emerald-400 mb-2" />;
      case 'healthcare':
        return <HeartPulse className="w-8 h-8 text-rose-400 mb-2" />;
      case 'education':
        return <GraduationCap className="w-8 h-8 text-amber-400 mb-2" />;
      case 'agencies-services':
        return <Briefcase className="w-8 h-8 text-violet-400 mb-2" />;
      default:
        return <Server className="w-8 h-8 text-[#0891B2] mb-2" />;
    }
  };

  return (
    <section ref={ref} id="industries" className="py-24 bg-[#F8FAFC] bg-dot-grid-light border-b border-slate-200/80 relative overflow-hidden">
      {/* Background Soft Mesh Glow */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Subtitle */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
          isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0891B2] bg-cyan-100/70 px-3.5 py-1.5 rounded-full border border-cyan-200/80 mb-3 font-mono shadow-xs">
            <span>Specialized Sector Blueprints</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight font-sans text-balance">
            AI agents built for your industry
          </h2>
          <p className="mt-3.5 text-base sm:text-lg text-slate-600 leading-relaxed text-balance font-normal">
            Automate repetitive work, accelerate decisions, and deliver better customer experiences.
          </p>
        </div>

        {/* Premium Six-Card Responsive Industry Grid: 3-col desktop, 2-col tablet, 1-col mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INDUSTRY_LIST.map((industry, i) => {
            const hasError = imgError[industry.id];
            const pipeline = industryMiniPipelines[industry.id] || {
              steps: ['Inbound Event', 'Gemini Reasoning', 'Enterprise Sync'],
              tag: 'Active Workflow'
            };

            return (
              <div
                key={industry.id}
                style={{ transitionDelay: `${i * 80}ms` }}
                className={`group rounded-2xl bg-[#0F172A] border border-slate-800 hover:border-cyan-500/60 shadow-xl hover:shadow-[0_12px_36px_-6px_rgba(8,145,178,0.22)] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 ${
                  isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div>
                  {/* Top Image / Dashboard Visual */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900 border-b border-slate-800">
                    {!hasError ? (
                      <img
                        src={industry.image}
                        alt={industry.headline}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={() => setImgError(prev => ({ ...prev, [industry.id]: true }))}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#090E1A] to-[#0F172A] p-6 text-center">
                        {getIndustryIcon(industry.id)}
                        <span className="text-xs font-mono text-slate-200 font-bold">{industry.name}</span>
                        <span className="text-[10px] text-slate-400 mt-1">{industry.headline}</span>
                      </div>
                    )}
                    
                    {/* Subtle Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent opacity-90" />
                    
                    {/* Industry Category Label */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-[10px] font-mono text-cyan-300 uppercase tracking-wider font-bold">
                      {industry.categoryLabel}
                    </div>

                    {/* KPI Benchmark Badge */}
                    <div className="absolute bottom-2.5 right-3 text-[10px] font-mono text-emerald-300 bg-slate-950/90 backdrop-blur-sm px-2.5 py-0.5 rounded border border-emerald-800/80 font-semibold shadow-xs">
                      {industry.kpi}
                    </div>
                  </div>

                  {/* Dark Navy Content Panel */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      {industry.name}
                    </h3>
                    
                    <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                      {industry.description}
                    </p>

                    {/* Subtle Live Animated Workflow Rail */}
                    <div className="mt-5 p-3 rounded-xl bg-[#0B101D] border border-slate-800/90">
                      <div className="flex items-center justify-between text-[10px] font-mono mb-2 text-slate-400">
                        <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                          <Activity className="w-3 h-3 text-[#0891B2]" />
                          <span>EXAMPLE WORKFLOW PIPELINE</span>
                        </span>
                        <span className="text-emerald-400 font-medium">{pipeline.tag}</span>
                      </div>

                      {/* 3 Connected Nodes with Animated Wire */}
                      <div className="relative flex items-center justify-between gap-1 pt-1 pb-1">
                        {pipeline.steps.map((st, idx) => {
                          const isPulse = activeNodePulse === idx + 1;
                          return (
                            <div key={idx} className="flex-1 flex flex-col items-center text-center relative z-10">
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-mono font-bold transition-all ${
                                isPulse 
                                  ? 'bg-[#0891B2] text-slate-950 ring-2 ring-cyan-400/60 scale-110 shadow-[0_0_8px_rgba(8,145,178,0.7)]' 
                                  : 'bg-slate-800 text-slate-400 border border-slate-700'
                              }`}>
                                0{idx + 1}
                              </div>
                              <span className={`text-[9px] font-mono mt-1.5 truncate max-w-[85px] leading-tight transition-colors ${
                                isPulse ? 'text-cyan-300 font-semibold' : 'text-slate-400'
                              }`}>
                                {st}
                              </span>
                            </div>
                          );
                        })}

                        {/* Connecting background line */}
                        <div className="absolute top-3.5 left-6 right-6 h-[1.5px] bg-slate-800 -z-0" />
                        {/* Connecting animated pulse segment */}
                        <div 
                          className="absolute top-3.5 h-[1.5px] bg-gradient-to-r from-cyan-500 to-violet-500 -z-0 transition-all duration-500"
                          style={{
                            left: `${(activeNodePulse - 1) * 40 + 10}%`,
                            width: '25%'
                          }}
                        />
                      </div>
                    </div>

                    {/* 4 to 5 Specific AI Agents / Automation Examples */}
                    <div className="mt-4 space-y-2 pt-3 border-t border-slate-800/80">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-semibold mb-1">
                        Core Autonomous Agents:
                      </span>
                      {industry.agentExamples.map((agent, aIdx) => (
                        <div key={aIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0891B2] shrink-0 mt-0.5" />
                          <span className="leading-snug">{agent}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Link: Explore Workflows -> */}
                <div className="p-6 pt-0 mt-2">
                  <button
                    onClick={() => onSelectIndustry(industry)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 hover:text-white border border-slate-800 hover:border-cyan-500/50 transition-all flex items-center justify-center gap-2 group/btn shadow-xs active:scale-[0.98]"
                  >
                    <span>Explore workflows</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#0891B2] group-hover/btn:translate-x-1.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enterprise Bottom Strip */}
        <div className={`mt-14 p-6.5 rounded-2xl bg-[#0F172A] border border-slate-800 text-slate-300 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden transition-all duration-700 delay-300 ${
          isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          {/* Subtle aurora shine */}
          <div className="absolute -top-12 left-1/4 w-72 h-24 bg-cyan-500/10 blur-2xl pointer-events-none" />

          <div className="flex items-center gap-4 relative z-10">
            <div className="w-11 h-11 rounded-xl bg-cyan-950/80 border border-cyan-800/80 flex items-center justify-center text-[#0891B2] shrink-0 shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Need a specialized industry workflow or custom ERP integration?</h4>
              <p className="text-xs text-slate-400 mt-0.5 max-w-2xl">
                Our solutions architects configure tailor-made autonomous agent pipelines matching your exact compliance, EHR, SAP, or proprietary core banking systems.
              </p>
            </div>
          </div>
          <button
            onClick={onBookDemo}
            className="whitespace-nowrap px-5 py-2.5 bg-white text-slate-950 hover:bg-slate-100 rounded-xl text-xs font-bold transition shadow-sm hover:shadow active:scale-95 shrink-0 relative z-10"
          >
            Schedule Architecture Review
          </button>
        </div>

      </div>
    </section>
  );
}
