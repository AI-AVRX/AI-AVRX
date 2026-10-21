import React, { useState } from 'react';
import { AVRXLogo } from './common/BrandIcons';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function Footer({ onOpenStudio, onBookDemo }: { onOpenStudio: () => void; onBookDemo: () => void }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please provide a valid corporate email address.');
      return;
    }
    setError('');
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#090D14] text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Top Newsletter / CTA row */}
        <div className="pb-12 border-b border-slate-800/80 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <div className="mb-3">
              <img
                src="/assets/aistudio/avrx-ai-website-logo_3196534c.png"
                alt="AVRX AI Logo"
                className="h-9 sm:h-10 w-auto object-contain"
              />
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Automate · Grow · Beyond — Visual Autonomous AI Workflows for Modern Enterprise
            </p>
          </div>

          {/* Lead / Newsletter Capture */}
          <div className="w-full lg:w-auto">
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-4 py-2.5 rounded-xl">
                <CheckCircle2 className="w-4 h-4" />
                <span>Subscribed to engineering changelog and security advisories.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter engineering email..."
                    className="w-64 px-3.5 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition"
                  >
                    Subscribe
                  </button>
                </div>
                {error && <p className="text-[11px] text-rose-400">{error}</p>}
              </form>
            )}
          </div>
        </div>

        {/* Link Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-8 py-12 text-xs">
          
          <div>
            <h4 className="font-semibold text-white tracking-wide uppercase text-[11px] font-mono mb-3">
              Product
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={onOpenStudio} className="hover:text-cyan-400 transition text-left">Workflow Studio</button></li>
              <li><a href="#workflows" className="hover:text-cyan-400 transition">Autonomous Agents</a></li>
              <li><a href="#capabilities" className="hover:text-cyan-400 transition">Model Orchestration</a></li>
              <li><a href="#debugger" className="hover:text-cyan-400 transition">Execution Debugger</a></li>
              <li><a href="#prompt-builder" className="hover:text-cyan-400 transition">Prompt to Workflow</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white tracking-wide uppercase text-[11px] font-mono mb-3">
              Solutions
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#workflows" className="hover:text-cyan-400 transition">Lead Qualification</a></li>
              <li><a href="#workflows" className="hover:text-cyan-400 transition">Customer Support RAG</a></li>
              <li><a href="#workflows" className="hover:text-cyan-400 transition">Competitor Intelligence</a></li>
              <li><a href="#agent-loop" className="hover:text-cyan-400 transition">Finance & Invoice Audit</a></li>
              <li><a href="#agent-loop" className="hover:text-cyan-400 transition">Security Incident Triage</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white tracking-wide uppercase text-[11px] font-mono mb-3">
              Integrations
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#integrations" className="hover:text-cyan-400 transition">Google Gemini 2.5</a></li>
              <li><a href="#integrations" className="hover:text-cyan-400 transition">Anthropic Claude</a></li>
              <li><a href="#integrations" className="hover:text-cyan-400 transition">PostgreSQL & pgvector</a></li>
              <li><a href="#integrations" className="hover:text-cyan-400 transition">Salesforce CRM</a></li>
              <li><a href="#integrations" className="hover:text-cyan-400 transition">Slack & Discord</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white tracking-wide uppercase text-[11px] font-mono mb-3">
              Industries
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#industries" className="hover:text-cyan-400 transition">Finance & Insurance</a></li>
              <li><a href="#industries" className="hover:text-cyan-400 transition">Real Estate Hub</a></li>
              <li><a href="#industries" className="hover:text-cyan-400 transition">Retail & E-Commerce</a></li>
              <li><a href="#industries" className="hover:text-cyan-400 transition">Healthcare Admin</a></li>
              <li><a href="#industries" className="hover:text-cyan-400 transition">Agencies & Services</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white tracking-wide uppercase text-[11px] font-mono mb-3">
              Resources
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={onOpenStudio} className="hover:text-cyan-400 transition text-left">Interactive Sandbox</button></li>
              <li><a href="https://cloud.google.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition">Developer Docs</a></li>
              <li><a href="#debugger" className="hover:text-cyan-400 transition">API Reference</a></li>
              <li><a href="#enterprise" className="hover:text-cyan-400 transition">Security Whitepaper</a></li>
              <li><button onClick={onBookDemo} className="hover:text-cyan-400 transition text-left">Contact Engineering</button></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright and legal line */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <div className="flex items-center gap-2">
            <span>© 2026 AVRX AI, Inc. All rights reserved.</span>
            <span>·</span>
            <span className="font-mono text-cyan-500">Automate · Grow · Beyond</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition">Terms of Service</a>
            <a href="#" className="hover:text-slate-400 transition">Security Disclosures</a>
            <a href="#" className="hover:text-slate-400 transition">System Status</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
