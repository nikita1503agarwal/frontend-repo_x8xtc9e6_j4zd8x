import React from 'react';

export const Card = ({ children, className = '' }) => (
  <div className={`rounded-2xl p-4 bg-[color:var(--bg-card)] border border-white/10 shadow-[0_8px_25px_rgba(0,0,0,0.35)] backdrop-blur-md ${className}`}>
    {children}
  </div>
);

export const PrimaryButton = ({ children, className = '', ...props }) => (
  <button
    {...props}
    className={`px-4 py-2 rounded-2xl text-white transition duration-300 hover:brightness-110 hover:shadow-[0_0_20px_rgba(79,70,229,0.6)] active:scale-[0.98] bg-[linear-gradient(90deg,#4F46E5_0%,#EC4899_100%)] ${className}`}
  >
    {children}
  </button>
);

export const SecondaryButton = ({ children, className = '', ...props }) => (
  <button
    {...props}
    className={`px-4 py-2 rounded-2xl text-[color:var(--text-light)] transition duration-300 hover:shadow-[0_0_12px_rgba(236,72,153,0.4)] border border-[color:var(--primary-indigo)]/70 ${className}`}
  >
    {children}
  </button>
);
