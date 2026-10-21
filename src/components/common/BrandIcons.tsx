import React from 'react';

export function AVRXLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <img
      src="/assets/aistudio/avrx-ai-website-logo_3196534c.png"
      alt="AVRX AI"
      className={`object-contain ${className}`}
    />
  );
}

export function AVRXBrandLockup({ className = "h-8 sm:h-9 w-auto" }: { className?: string }) {
  return (
    <div className="inline-flex items-center bg-[#090E17] px-2.5 py-1 rounded-xl border border-slate-800/90 shadow-sm hover:border-cyan-500/40 transition-colors">
      <img
        src="/assets/aistudio/avrx-ai-website-logo_3196534c.png"
        alt="AVRX AI Logo"
        className={`object-contain ${className}`}
      />
    </div>
  );
}

export function ServiceIcon({ id, className = "w-5 h-5" }: { id: string; className?: string }) {
  switch (id) {
    case 'gemini':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M12 2C12 7.52285 7.52285 12 2 12C7.52285 12 12 16.4772 12 22C12 16.4772 16.4772 12 22 12C16.4772 12 12 7.52285 12 2Z" fill="url(#gemini-grad)" />
          <defs>
            <linearGradient id="gemini-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0891B2" />
              <stop offset="0.5" stopColor="#2563EB" />
              <stop offset="1" stopColor="#7C3AED" />
            </linearGradient>
          </defs>
        </svg>
      );
    case 'anthropic':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M13.8 4L21 20H17.2L15.6 16.2H8.4L6.8 20H3L10.2 4H13.8ZM9.8 13.2H14.2L12 8L9.8 13.2Z" fill="#D97706" />
        </svg>
      );
    case 'openai':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M19.5 9.5C19 6.5 16.5 4.5 13.5 4.5C12.8 4.5 12.1 4.7 11.5 5C10.7 3.8 9.4 3 8 3C5.5 3 3.5 5 3.5 7.5C3.5 8.1 3.6 8.7 3.8 9.3C2.7 10.2 2 11.5 2 13C2 15.5 3.8 17.5 6.2 17.9C6.4 19.6 7.8 21 9.5 21C10.5 21 11.4 20.6 12 19.9C12.8 20.6 13.8 21 15 21C17.5 21 19.5 19 19.5 16.5C19.5 15.9 19.4 15.3 19.2 14.7C20.3 13.8 21 12.5 21 11C21 10.4 20.8 9.9 20.5 9.4L19.5 9.5Z" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'postgres':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M12 2C6.5 2 3 5 3 10C3 14 6 17 8 18V22H11V18C15 18 17 16 19 14C21 12 21 9 20 6C19 4 16 2 12 2Z" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 8C9 7 11 7 13 8" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'slack':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="3" y="10" width="4" height="4" rx="2" fill="#E01E5A" />
          <rect x="10" y="3" width="4" height="4" rx="2" fill="#36C5F0" />
          <rect x="17" y="10" width="4" height="4" rx="2" fill="#2EB67D" />
          <rect x="10" y="17" width="4" height="4" rx="2" fill="#ECB22E" />
          <path d="M8 10H14V14H8V10Z" fill="#3B82F6" opacity="0.3" />
        </svg>
      );
    case 'salesforce':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M18.5 9C17.9 6.5 15.7 4.7 13 4.7C11.5 4.7 10.1 5.3 9.1 6.3C8.4 5.8 7.5 5.5 6.5 5.5C4 5.5 2 7.5 2 10C2 10.4 2.1 10.8 2.2 11.2C1 12.3 0.3 13.8 0.3 15.5C0.3 18.5 2.8 21 5.8 21H18.5C21.5 21 24 18.5 24 15.5C24 12.6 21.6 10.2 18.5 9Z" fill="#00A1E0" />
        </svg>
      );
    case 'github':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      );
    case 'discord':
      return (
        <svg viewBox="0 0 24 24" fill="#5865F2" className={className}>
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      );
    case 'stripe':
      return (
        <svg viewBox="0 0 24 24" fill="#635BFF" className={className}>
          <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.977 15.617.414 12.518.414 6.953.414 3.125 3.328 3.125 8.163c0 4.675 3.731 6.554 7.625 7.977 2.766 1.01 3.696 1.761 3.696 2.854 0 1.01-.89 1.542-2.316 1.542-2.394 0-5.385-1.119-7.382-2.227l-.924 5.612c2.09.957 5.093 1.558 8.146 1.558 5.86 0 9.873-2.83 9.873-7.904 0-4.838-3.766-6.666-7.867-8.425z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
  }
}
