import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavGroup: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-6">
    <h4 className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{title}</h4>
    <div className="space-y-1">{children}</div>
  </div>
);

const NavItem: React.FC<{ to: string; icon: string; label: string }> = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all border-l-4 ${isActive
        ? 'bg-indigo-50/50 text-indigo-700 border-indigo-600'
        : 'text-slate-600 border-transparent hover:bg-slate-50 hover:text-slate-900'
      }`
    }
  >
    <span className="text-lg shrink-0">{icon}</span>
    <span className="truncate">{label}</span>
  </NavLink>
);

export const Sidebar: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  return (
    <aside className={`${isOpen ? 'w-64' : 'w-20'} h-screen fixed left-0 top-0 bg-white border-r border-slate-200 z-40 transition-all duration-300 overflow-hidden shadow-xl`}>
      <Link to="/dashboard" className="block">
        <div className="h-20 flex items-center px-6 border-b border-slate-100 hover:bg-slate-50 transition">
          <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center shrink-0">
            <span className="text-white font-bold">IO</span>
          </div>

          {isOpen && (
            <div className="ml-3 overflow-hidden whitespace-nowrap">
              <h1 className="text-sm font-bold text-slate-800 leading-tight">
                In-Out System
              </h1>
              <p className="text-[10px] text-slate-500">Digital Register v2.4</p>
            </div>
          )}
        </div>
      </Link>
      <nav className="py-6 h-[calc(100vh-80px)] overflow-y-auto custom-scrollbar">
        <NavGroup title="Main">
          <NavItem to="/dashboard" icon="📊" label="Dashboard" />
        </NavGroup>

        <NavGroup title="Operations">
          <NavItem to="/entry" icon="✍️" label="Combined Entry" />
          <NavItem to="/entry/inward" icon="📥" label="Inward Entry" />
          <NavItem to="/entry/outward" icon="📤" label="Outward Entry" />
        </NavGroup>

        {/* Admin Section */}
        {isAdmin && (
          <NavGroup title="Data Management">
            <NavItem to="/masters" icon="📁" label="Masters" />
            <NavItem to="/registers/inward" icon="📒" label="Inward Register" />
            <NavItem to="/registers/outward" icon="📘" label="Outward Register" />
          </NavGroup>
        )}

        <NavGroup title="Utilities">
          <NavItem to="/search" icon="🔍" label="Advanced Search" />
          {isAdmin && <NavItem to="/reports" icon="📈" label="Reports" />}
          {isAdmin && <NavItem to="/settings" icon="⚙️" label="Settings" />}
        </NavGroup>
      </nav>
    </aside>
  );
};