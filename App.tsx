
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { EntryForm } from './pages/EntryForm';
import { Register } from './pages/Register';
import { Masters } from './pages/Masters';
import { Login } from './pages/Login';
import { Search } from './pages/Search';
import { EntryType, Role } from './types';
import { AuthProvider, useAuth } from './context/AuthContext';

const SearchPlaceholder = () => (
  <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
    <span className="text-6xl mb-4">🔍</span>
    <h2 className="text-xl font-bold text-slate-800">Advanced Search</h2>
    <p className="max-w-md mt-2">Find records by Tracking ID, Subject, or Department. Search across all inward and outward registers.</p>
  </div>
);

const Unauthorized = () => (
  <div className="flex flex-col items-center justify-center h-full py-20 text-center">
    <span className="text-6xl mb-4">🚫</span>
    <h2 className="text-2xl font-bold text-slate-800">Access Denied</h2>
    <p className="text-slate-500 mt-2">You do not have permission to view this page.</p>
  </div>
);

// Layout wrapper for authenticated pages
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Sidebar isOpen={sidebarOpen} />
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'pl-64' : 'pl-20'}`}>
        <Header
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          isOpen={sidebarOpen}
        />
        <main className="pt-24 pb-12 px-8 max-w-[1600px] mx-auto min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
};

// Guard component to protect routes
const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  allowedRoles?: Role[]
}> = ({ children, allowedRoles }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return (
      <AppLayout>
        <Unauthorized />
      </AppLayout>
    );
  }

  return <AppLayout>{children}</AppLayout>;
};

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={
        isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
      } />

      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />

      <Route path="/entry" element={
        <ProtectedRoute>
          <EntryForm />
        </ProtectedRoute>
      } />
      <Route path="/entry/inward" element={
        <ProtectedRoute>
          <EntryForm initialType={EntryType.INWARD} />
        </ProtectedRoute>
      } />
      <Route path="/entry/outward" element={
        <ProtectedRoute>
          <EntryForm initialType={EntryType.OUTWARD} />
        </ProtectedRoute>
      } />

      <Route path="/registers/inward" element={
        <ProtectedRoute>
          <Register type={EntryType.INWARD} />
        </ProtectedRoute>
      } />
      <Route path="/registers/outward" element={
        <ProtectedRoute>
          <Register type={EntryType.OUTWARD} />
        </ProtectedRoute>
      } />

      {/* Admin Only Routes */}
      <Route path="/masters" element={
        <ProtectedRoute allowedRoles={['ADMIN']}>
          <Masters />
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute allowedRoles={['ADMIN']}>
          <div className="p-20 text-center text-slate-400">⚙️ System Settings - Admin Only</div>
        </ProtectedRoute>
      } />

      <Route path="/search" element={
        <ProtectedRoute>
          <Search />
        </ProtectedRoute>
      } />
      <Route path="/reports" element={
        <ProtectedRoute allowedRoles={['ADMIN']}>
          <div className="p-20 text-center text-slate-400">📊 Reporting Module - View Restricted</div>
        </ProtectedRoute>
      } />

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
