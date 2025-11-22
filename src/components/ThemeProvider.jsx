import React from 'react';

const ThemeProvider = ({ children }) => {
  return (
    <div className="min-h-screen bg-[color:var(--bg-dark)] text-[color:var(--text-light)]">
      <style>{`:root{--bg-dark:#0F172A;--bg-card:rgba(255,255,255,0.05);--bg-card-glass:rgba(255,255,255,0.08);--primary-indigo:#4F46E5;--primary-pink:#EC4899;--primary-cyan:#06B6D4;--text-light:#E2E8F0;--text-dim:#94A3B8}`}</style>
      {children}
    </div>
  );
};

export default ThemeProvider;
