import React from 'react';
import { OFFICES, FINANCIAL_YEARS } from '../constants';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface HeaderProps {
  onToggleSidebar: () => void;
  isOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar, isOpen }) => {
  // We use inline styles for the left property to guarantee it's not overridden or ignored by Tailwind's JIT.
  const sidebarWidth = isOpen ? '256px' : '80px';
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header
      style={{ left: sidebarWidth }}
      className="h-16 bg-white border-b border-slate-200 fixed top-0 right-0 z-20 flex items-center pr-6 shadow-sm transition-all duration-300"
    >
      <div className="flex items-center gap-4 w-full max-w-xl pl-6">
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-slate-100 rounded-md text-slate-600 shrink-0 outline-none focus:ring-2 focus:ring-indigo-500/20"
          title="Toggle Sidebar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        <div className="relative flex-1 group hidden md:block">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 text-sm">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search Inward/Outward No..."
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-transparent focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all rounded-md text-sm outline-none"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-6">
        <div className="hidden lg:flex items-center gap-4 border-r border-slate-200 pr-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Current Office</span>
            <select className="text-xs font-semibold text-slate-700 bg-transparent focus:outline-none cursor-pointer">
              {OFFICES.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">FY</span>
            <select className="text-xs font-semibold text-slate-700 bg-transparent focus:outline-none cursor-pointer">
              {FINANCIAL_YEARS.map(fy => <option key={fy}>{fy}</option>)}
            </select>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 hover:bg-slate-50 rounded-lg p-1 transition-all outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-800">{user?.name || 'Guest'}</p>
              <p className="text-[10px] text-slate-500">{user?.role || 'Viewer'}</p>
            </div>
            <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold border-2 border-white shadow-sm">
              {user?.name?.charAt(0) || 'U'}
            </div>
          </button>

          {isDropdownOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-slate-100 z-20 animate-in fade-in slide-in-from-top-1">
                <div className="px-4 py-3 border-b border-slate-50 sm:hidden">
                  <p className="text-sm font-bold text-slate-800">{user?.name}</p>
                  <p className="text-xs text-slate-500">{user?.role}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <span>🚪</span> Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};