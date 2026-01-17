
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { EntryForm } from './pages/EntryForm';
import { Register } from './pages/Register';
import { Masters } from './pages/Masters';
import { EntryType } from './types';

const SearchPlaceholder = () => (
  <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
    <span className="text-6xl mb-4">🔍</span>
    <h2 className="text-xl font-bold text-slate-800">Advanced Search</h2>
    <p className="max-w-md mt-2">Find records by Tracking ID, Subject, or Department. Search across all inward and outward registers.</p>
  </div>
);

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <HashRouter>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar isOpen={sidebarOpen} />
        
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'pl-64' : 'pl-20'}`}>
          <Header 
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
            isOpen={sidebarOpen}
          />
          
          <main className="pt-24 pb-12 px-8 max-w-[1600px] mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/entry" element={<EntryForm />} />
              <Route path="/entry/inward" element={<EntryForm initialType={EntryType.INWARD} />} />
              <Route path="/entry/outward" element={<EntryForm initialType={EntryType.OUTWARD} />} />
              
              <Route path="/registers/inward" element={<Register type={EntryType.INWARD} />} />
              <Route path="/registers/outward" element={<Register type={EntryType.OUTWARD} />} />
              
              <Route path="/masters" element={<Masters />} />
              <Route path="/search" element={<SearchPlaceholder />} />
              <Route path="/reports" element={<div className="p-20 text-center text-slate-400">📊 Reporting Module - View Restricted</div>} />
              <Route path="/settings" element={<div className="p-20 text-center text-slate-400">⚙️ System Settings - Admin Only</div>} />
              
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
