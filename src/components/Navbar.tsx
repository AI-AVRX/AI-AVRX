import React, { useState } from 'react';
import { AVRXLogo } from './common/BrandIcons';
import { ArrowUpRight, Menu, X, Terminal } from 'lucide-react';

interface NavbarProps {
  onOpenStudio: () => void;
  onBookDemo: () => void;
  activeSection?: string;
}

export function Navbar({ onOpenStudio, onBookDemo }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FFFFFF]/90 backdrop-blur-md border-b border-slate-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Website Brand Logo */}
        <a 
          href="#" 
          className="flex items-center shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-xl"
          aria-label="AVRX AI Home"
        >
          <div className="flex items-center bg-[#090D16] px-3 py-1.5 rounded-xl border border-slate-800/90 shadow-xs group-hover:border-cyan-500/50 group-hover:shadow-[0_0_20px_rgba(8,145,178,0.25)] transition-all duration-200">
            <img
              src="/assets/aistudio/avrx-ai-website-logo_3196534c.png"
              alt="AVRX AI"
              className="h-7 sm:h-8 md:h-8.5 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </div>
        </a>

        {/* Zone 2: Navigation Links (single-line, clean text links) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <a href="#workflows" className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0">
            Workflows
          </a>
          <a href="#capabilities" className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0">
            Capabilities
          </a>
          <a href="#agent-loop" className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0">
            Agents
          </a>
          <a href="#industries" className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0">
            Industries
          </a>
          <a href="#debugger" className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0">
            Debugging
          </a>
          <a href="#integrations" className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0">
            Integrations
          </a>
          <a href="#prompt-builder" className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0">
            Builder
          </a>
        </nav>

        {/* Zone 3: Primary Action & Quick Demo */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onBookDemo}
            className="hidden sm:inline-flex items-center text-xs font-medium text-slate-700 hover:text-slate-950 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition whitespace-nowrap shrink-0"
          >
            Book Demo
          </button>

          <button
            onClick={onOpenStudio}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-950 hover:bg-slate-800 rounded-lg shadow-sm transition whitespace-nowrap shrink-0 active:scale-95"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Launch Studio</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white/95 backdrop-blur-lg px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2 text-sm font-medium text-slate-700">
            <a 
              href="#workflows" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              Workflows
            </a>
            <a 
              href="#capabilities" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              Capabilities
            </a>
            <a 
              href="#agent-loop" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              Agent Architecture
            </a>
            <a 
              href="#industries" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              Industry Blueprints
            </a>
            <a 
              href="#debugger" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              Execution Debugger
            </a>
            <a 
              href="#integrations" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              Integrations Gallery
            </a>
            <a 
              href="#prompt-builder" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              Prompt to Workflow
            </a>
          </nav>
          <div className="pt-2 border-t border-slate-200 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onBookDemo(); }}
              className="w-full text-center py-2 text-xs font-semibold text-slate-800 bg-slate-100 rounded-lg"
            >
              Book an Enterprise Demo
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenStudio(); }}
              className="w-full text-center py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg"
            >
              Launch Workflow Studio
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
