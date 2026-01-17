
import React, { useState } from 'react';
import { Card, Button, Input, SectionTitle } from '../components/Common';

const MOCK_MASTERS = [
  { id: '1', name: 'Main HQ', code: 'MHQ', isActive: true, remarks: 'Primary hub', sequence: 1 },
  { id: '2', name: 'Regional North', code: 'RN', isActive: true, remarks: 'Delhi Cluster', sequence: 2 },
  { id: '3', name: 'Zonal East', code: 'ZE', isActive: false, remarks: 'Closing soon', sequence: 3 },
];

export const Masters: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Offices');

  return (
    <div className="relative min-h-screen">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">System Masters</h1>
            <p className="text-slate-500 text-sm">Configure base entities and office hierarchy</p>
          </div>
          <Button onClick={() => setIsDrawerOpen(true)}>➕ Add New {selectedTab.slice(0, -1)}</Button>
        </div>

        <div className="flex border-b border-slate-200 gap-8 mb-4">
          {['Offices', 'Modes', 'Entities', 'Couriers'].map(tab => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`pb-3 text-sm font-bold transition-all border-b-2 ${
                selectedTab === tab ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <Card className="overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex gap-4">
            <input 
              type="text" 
              placeholder={`Search ${selectedTab}...`} 
              className="flex-1 border border-slate-200 rounded px-3 py-1.5 text-sm focus:outline-none"
            />
            <Button variant="secondary">Filter</Button>
          </div>
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3">Seq</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Code</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Remarks</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_MASTERS.map(item => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-400 font-bold">{item.sequence}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800">{item.name}</td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-500">{item.code}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                      item.isActive ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-100 text-slate-500 border-slate-200'
                    }`}>
                      {item.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{item.remarks}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-indigo-600 hover:underline font-bold text-xs">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* Side Drawer Overlay */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl animate-in slide-in-from-right duration-300 overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-lg font-bold text-slate-800">Add New {selectedTab.slice(0, -1)}</h2>
              <button onClick={() => setIsDrawerOpen(false)} className="text-slate-400 hover:text-slate-600 text-2xl">✕</button>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <Input label="Display Name" placeholder="e.g. Finance Hub" required />
                <Input label="System Code" placeholder="e.g. FIN-01" required />
                <Input label="Display Sequence" type="number" defaultValue="1" />
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded">
                  <span className="text-sm font-bold text-slate-600">Active Status</span>
                  <input type="checkbox" className="w-5 h-5 rounded border-slate-300" defaultChecked />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1 block">Detailed Remarks</label>
                  <textarea className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm h-32 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex gap-3">
                <Button className="flex-1">Save Master Item</Button>
                <Button variant="secondary" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
