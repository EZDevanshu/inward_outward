
import React from 'react';

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-sm border border-slate-200 ${className}`}>
    {children}
  </div>
);

export const Badge: React.FC<{ children: React.ReactNode; variant?: 'success' | 'warning' | 'danger' | 'info' | 'default' }> = ({ children, variant = 'default' }) => {
  const styles = {
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    info: 'bg-sky-50 text-sky-700 border-sky-200',
    default: 'bg-slate-50 text-slate-700 border-slate-200'
  };
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium border ${styles[variant]}`}>
      {children}
    </span>
  );
};

export const Input: React.FC<{ label: string; [key: string]: any }> = ({ label, required, ...props }) => (
  <div className="flex flex-col gap-1 w-full">
    <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
      {label}
      {required && <span className="text-rose-500">*</span>}
    </label>
    <input
      {...props}
      className="border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-slate-50/30"
    />
  </div>
);

export const Select: React.FC<{ label: string; options: string[]; [key: string]: any }> = ({ label, options, required, ...props }) => (
  <div className="flex flex-col gap-1 w-full">
    <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
      {label}
      {required && <span className="text-rose-500">*</span>}
    </label>
    <select
      {...props}
      className="border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-slate-50/30 appearance-none"
    >
      <option value="">Select {label}</option>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

export const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4 uppercase tracking-wider">
    {children}
  </h3>
);

export const Button: React.FC<{ children: React.ReactNode; variant?: 'primary' | 'secondary' | 'danger' | 'ghost'; [key: string]: any }> = ({ children, variant = 'primary', className = "", ...props }) => {
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200',
    secondary: 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50',
    danger: 'bg-rose-600 text-white hover:bg-rose-700 shadow-rose-200',
    ghost: 'bg-transparent text-slate-500 hover:bg-slate-100'
  };
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded font-medium text-sm transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
