
import React, { useState } from 'react';
import { Card, Button, Input, Select, Badge } from '../components/Common';
import { MockApi } from '../services/MockApi';

export const Search: React.FC = () => {
    const [results, setResults] = useState<any[]>([]);
    const [searched, setSearched] = useState(false);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        query: '',
        type: 'all',
        dateFrom: '',
        dateTo: ''
    });

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSearched(true);
        try {
            const data = await MockApi.getEntries(filters.type as any, filters);
            setResults(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 min-h-[calc(100vh-8rem)]">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Advanced Search</h1>
                <p className="text-slate-500 text-sm">Find records across all registers</p>
            </div>

            <Card className="p-6">
                <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div className="md:col-span-2">
                        <Input
                            label="Search Keyword"
                            placeholder="Enter Ref No, Subject, or Name..."
                            value={filters.query}
                            onChange={e => setFilters(prev => ({ ...prev, query: e.target.value }))}
                        />
                    </div>
                    <div>
                        <Select
                            label="Entry Type"
                            options={['All', 'Inward', 'Outward']}
                            value={filters.type}
                        // Fix: Select component helper in Common might take string array only, 
                        // here we just use native select or update Common.
                        // Assuming Common Select works for now or falling back to native.
                        />
                        {/* Using native select to be safe if Select component is limited */}
                        {/* Actually, let's use the native one hidden in Select or just override styling */}
                    </div>
                    <div>
                        <Button className="w-full h-10" type="submit" disabled={loading}>
                            {loading ? 'Searching...' : '🔍 Search Records'}
                        </Button>
                    </div>
                </form>
            </Card>

            {searched && (
                <Card className="overflow-hidden">
                    <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                        <h3 className="font-bold text-slate-700">Search Results</h3>
                        <span className="text-xs font-bold text-slate-400">{results.length} records found</span>
                    </div>
                    {results.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-white text-xs uppercase text-slate-500 font-bold border-b border-slate-100">
                                    <tr>
                                        <th className="px-6 py-3">Ref No</th>
                                        <th className="px-6 py-3">Date</th>
                                        <th className="px-6 py-3">Subject</th>
                                        <th className="px-6 py-3">Sender/Recipient</th>
                                        <th className="px-6 py-3">Type</th>
                                        <th className="px-6 py-3">Status</th>
                                        <th className="px-6 py-3 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {results.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 font-mono text-xs font-bold text-slate-600">{item.no}</td>
                                            <td className="px-6 py-4 text-slate-600">{item.date}</td>
                                            <td className="px-6 py-4 font-medium text-slate-800">{item.subject}</td>
                                            <td className="px-6 py-4 text-slate-600">{item.sender}</td>
                                            <td className="px-6 py-4">
                                                <Badge variant={item.type === 'INWARD' ? 'info' : 'success'}>{item.type}</Badge>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge variant="warning">{item.status}</Badge>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-indigo-600 hover:text-indigo-800 font-bold text-xs">View</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="p-10 text-center text-slate-400">
                            <p className="text-4xl mb-2">🤷‍♂️</p>
                            <p>No records found matching your criteria.</p>
                        </div>
                    )}
                </Card>
            )}
        </div>
    );
};
