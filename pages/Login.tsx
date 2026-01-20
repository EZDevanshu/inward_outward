import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MockApi } from '../services/MockApi';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            // In a real app, we would validate password too
            // For mock, we just check username and simulate delay
            const user = await MockApi.login(username);
            login(user); // Set global auth state
            // Navigation will be handled by App.tsx redirect logic or we can do it here
            // But usually best to let App routing handle state change
        } catch (err) {
            setError('Invalid credentials. Try "admin" or "operator"');
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-indigo-600 p-6 text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl">📂</span>
                    </div>
                    <h1 className="text-xl font-bold text-white">Inward Outward</h1>
                    <p className="text-indigo-100 text-xs mt-1">Management System</p>
                </div>

                <div className="p-8">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Username / Email</label>
                            <input
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                placeholder="Enter username"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                placeholder="Enter password"
                            />
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm bg-red-50 p-3 rounded border border-red-100 flex items-center">
                                <span className="mr-2">⚠️</span> {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center"
                        >
                            {isLoading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </span>
                            ) : 'Sign In'}
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <p className="text-xs text-slate-400 mb-2">Use credentials to test roles:</p>
                        <div className="flex justify-center gap-2 text-xs">
                            <code className="bg-slate-100 px-2 py-1 rounded text-slate-600 cursor-pointer hover:bg-slate-200" onClick={() => { setUsername('admin'); setPassword('admin') }}>admin / admin</code>
                            <code className="bg-slate-100 px-2 py-1 rounded text-slate-600 cursor-pointer hover:bg-slate-200" onClick={() => { setUsername('operator'); setPassword('operator') }}>operator / operator</code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
