import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck } from 'lucide-react';
import { AVRXLogo } from './common/BrandIcons';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function BookDemoModal({ isOpen, onClose }: Props) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    useCase: 'Autonomous Support & Knowledge RAG',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.company.trim()) {
      setError('Please complete all required fields.');
      return;
    }
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setError('Please provide a valid corporate email address.');
      return;
    }

    setError('');
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-950">Architecture Session Requested</h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
              Thank you, {formData.fullName}. An AVRX AI solutions architect will email <span className="font-semibold text-slate-900">{formData.email}</span> within 2 hours to confirm your custom environment demonstration.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-5 py-2 text-xs font-semibold text-white bg-slate-950 hover:bg-slate-800 rounded-lg transition"
              >
                Return to Product
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-[#090E17] px-2.5 py-1 rounded-lg border border-slate-800 shadow-xs">
                <img
                  src="/assets/aistudio/avrx-ai-website-logo_3196534c.png"
                  alt="AVRX AI"
                  className="h-6 w-auto object-contain"
                />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded-md border border-cyan-200 font-mono">
                Enterprise Consultation
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-950">Book an Architecture Demo</h3>
            <p className="text-xs text-slate-600 mt-1 mb-6">
              Review custom VPC isolation, model orchestration latency, and security certifications with our engineering team.
            </p>

            {error && (
              <div className="mb-4 p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Elena Rostova"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="elena@company.com"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Apex Technologies"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Primary Use Case</label>
                <select
                  value={formData.useCase}
                  onChange={e => setFormData({ ...formData, useCase: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Autonomous Support & Knowledge RAG">Autonomous Support & Knowledge RAG</option>
                  <option value="Inbound Lead Scoring & Salesforce CRM">Inbound Lead Scoring & Salesforce CRM</option>
                  <option value="Invoice Audit & ERP Verification">Invoice Audit & ERP Verification</option>
                  <option value="Security Incident & Alert Triage">Security Incident & Alert Triage</option>
                  <option value="Custom Air-Gapped Deployment">Custom Air-Gapped On-Prem Deployment</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Additional Requirements (Optional)</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Expected volume, security requirements, or existing tech stack..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>NDA guaranteed</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-white bg-slate-950 hover:bg-slate-800 rounded-lg transition shadow-sm"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
