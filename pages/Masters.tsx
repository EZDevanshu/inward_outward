
import React, { useState, useEffect } from 'react';
import { Card, Button, Input, SectionTitle } from '../components/Common';
import { MockApi } from '../services/MockApi';
import { Office, Mode, Entity, Courier } from '../types';

type MasterType = 'offices' | 'modes' | 'entities' | 'couriers';

export const Masters: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<MasterType>('offices');
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  // Form State
  const [formData, setFormData] = useState<any>({});

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await MockApi.getMasters(selectedTab);
      setItems(data);
    } catch (error) {
      console.error('Failed to load data', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    setFormData({}); // Reset form when tab changes
  }, [selectedTab]);

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsDrawerOpen(true);
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setFormData({ isActive: true });
    setIsDrawerOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await MockApi.deleteMaster(selectedTab, id);
      loadData();
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await MockApi.updateMaster(selectedTab, editingItem.id, formData);
      } else {
        await MockApi.createMaster(selectedTab, formData);
      }
      setIsDrawerOpen(false);
      loadData();
    } catch (error) {
      console.error('Failed to save', error);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const renderTableHeaders = () => {
    switch (selectedTab) {
      case 'offices':
        return (
          <>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Institute</th>
            <th className="px-6 py-3">Department</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3 text-right">Actions</th>
          </>
        );
      case 'modes':
        return (
          <>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3 text-right">Actions</th>
          </>
        );
      case 'entities':
        return (
          <>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Person</th>
            <th className="px-6 py-3">Location</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3 text-right">Actions</th>
          </>
        );
      case 'couriers':
        return (
          <>
            <th className="px-6 py-3">Company</th>
            <th className="px-6 py-3">Contact</th>
            <th className="px-6 py-3">Phone/Email</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3 text-right">Actions</th>
          </>
        );
    }
  };

  const renderTableRows = (item: any) => {
    const statusBadge = (
      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${item.isActive ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-100 text-slate-500 border-slate-200'
        }`}>
        {item.isActive ? 'Active' : 'Inactive'}
      </span>
    );

    const actionButtons = (
      <td className="px-6 py-4 text-right">
        <button onClick={() => handleEdit(item)} className="text-indigo-600 hover:underline font-bold text-xs mr-3">Edit</button>
        <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:underline font-bold text-xs">Delete</button>
      </td>
    );

    switch (selectedTab) {
      case 'offices':
        return (
          <tr key={item.id} className="hover:bg-slate-50 transition-colors">
            <td className="px-6 py-4 text-sm font-bold text-slate-800">{item.name}</td>
            <td className="px-6 py-4 text-sm text-slate-600">{item.institute}</td>
            <td className="px-6 py-4 text-sm text-slate-600">{item.department}</td>
            <td className="px-6 py-4">{statusBadge}</td>
            {actionButtons}
          </tr>
        );
      case 'modes':
        return (
          <tr key={item.id} className="hover:bg-slate-50 transition-colors">
            <td className="px-6 py-4 text-sm font-bold text-slate-800">{item.name}</td>
            <td className="px-6 py-4">{statusBadge}</td>
            {actionButtons}
          </tr>
        );
      case 'entities':
        return (
          <tr key={item.id} className="hover:bg-slate-50 transition-colors">
            <td className="px-6 py-4 text-sm font-bold text-slate-800">{item.name}</td>
            <td className="px-6 py-4 text-sm text-slate-600">{item.personName}</td>
            <td className="px-6 py-4 text-sm text-slate-600">{item.place}</td>
            <td className="px-6 py-4">{statusBadge}</td>
            {actionButtons}
          </tr>
        );
      case 'couriers':
        return (
          <tr key={item.id} className="hover:bg-slate-50 transition-colors">
            <td className="px-6 py-4 text-sm font-bold text-slate-800">{item.name}</td>
            <td className="px-6 py-4 text-sm text-slate-600">{item.contactPerson}</td>
            <td className="px-6 py-4 text-sm text-slate-600">
              <div className='flex flex-col'>
                <span>{item.phone}</span>
                <span className='text-xs text-slate-400'>{item.email}</span>
              </div>
            </td>
            <td className="px-6 py-4">{statusBadge}</td>
            {actionButtons}
          </tr>
        );
    }
  };

  const renderFormFields = () => {
    return (
      <div className="space-y-4">
        {/* Common Field Name */}
        <div className='flex flex-col gap-1'>
          <label className="text-sm font-medium text-slate-700">Name / Title <span className='text-red-500'>*</span></label>
          <input
            type="text"
            required
            className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            value={formData.name || ''}
            onChange={e => handleInputChange('name', e.target.value)}
            placeholder="Enter Name"
          />
        </div>

        {selectedTab === 'offices' && (
          <>
            <div className='grid grid-cols-2 gap-4'>
              <Input label="Institute" value={formData.institute || ''} onChange={e => handleInputChange('institute', e.target.value)} />
              <Input label="Department" value={formData.department || ''} onChange={e => handleInputChange('department', e.target.value)} />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <Input label="Opening Inward No" type="number" value={formData.openingInwardNo || ''} onChange={e => handleInputChange('openingInwardNo', e.target.value)} />
              <Input label="Opening Outward No" type="number" value={formData.openingOutwardNo || ''} onChange={e => handleInputChange('openingOutwardNo', e.target.value)} />
            </div>
          </>
        )}

        {selectedTab === 'entities' && (
          <>
            <Input label="Contact Person" value={formData.personName || ''} onChange={e => handleInputChange('personName', e.target.value)} />
            <Input label="Address" value={formData.address || ''} onChange={e => handleInputChange('address', e.target.value)} />
            <Input label="Place / City" value={formData.place || ''} onChange={e => handleInputChange('place', e.target.value)} />
          </>
        )}

        {selectedTab === 'couriers' && (
          <>
            <Input label="Contact Person" value={formData.contactPerson || ''} onChange={e => handleInputChange('contactPerson', e.target.value)} />
            <div className='grid grid-cols-2 gap-4'>
              <Input label="Phone" value={formData.phone || ''} onChange={e => handleInputChange('phone', e.target.value)} />
              <Input label="Email" type="email" value={formData.email || ''} onChange={e => handleInputChange('email', e.target.value)} />
            </div>
            <Input label="Website" value={formData.website || ''} onChange={e => handleInputChange('website', e.target.value)} />
            <Input label="Address" value={formData.address || ''} onChange={e => handleInputChange('address', e.target.value)} />
          </>
        )}

        <div className="flex items-center gap-3 bg-slate-50 p-3 rounded mt-4">
          <span className="text-sm font-bold text-slate-600">Active Status</span>
          <input
            type="checkbox"
            className="w-5 h-5 rounded border-slate-300 cursor-pointer"
            checked={formData.isActive || false}
            onChange={e => handleInputChange('isActive', e.target.checked)}
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600 mb-1 block">Remarks / Notes</label>
          <textarea
            className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm h-24 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            value={formData.remarks || ''}
            onChange={e => handleInputChange('remarks', e.target.value)}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="relative min-h-[calc(100vh-8rem)]">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Master Management</h1>
            <p className="text-slate-500 text-sm">Manage configuration for {selectedTab}</p>
          </div>
          <Button onClick={handleAddNew}>➕ Add New</Button>
        </div>

        <div className="flex border-b border-slate-200 gap-8 mb-4">
          {(['offices', 'modes', 'entities', 'couriers'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`pb-3 text-sm font-bold transition-all border-b-2 capitalize ${selectedTab === tab ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
            >
              {tab === 'entities' ? 'From/To (Entities)' : tab}
            </button>
          ))}
        </div>

        <Card className="overflow-hidden min-h-[400px]">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  {renderTableHeaders()}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-10 text-slate-400">No records found</td></tr>
                ) : (
                  items.map(item => renderTableRows(item))
                )}
              </tbody>
            </table>
          )}
        </Card>
      </div>

      {/* Side Drawer Overlay */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl animate-in slide-in-from-right duration-300 overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-lg font-bold text-slate-800">
                {editingItem ? 'Edit' : 'Add New'} <span className='capitalize'>{selectedTab === 'entities' ? 'Entity' : selectedTab.slice(0, -1)}</span>
              </h2>
              <button onClick={() => setIsDrawerOpen(false)} className="text-slate-400 hover:text-slate-600 text-2xl">✕</button>
            </div>

            <form onSubmit={handleSave} className="p-6">
              {renderFormFields()}

              <div className="pt-6 border-t border-slate-100 flex gap-3 mt-8">
                <Button className="flex-1" type="submit">Save Changes</Button>
                <Button variant="secondary" onClick={() => setIsDrawerOpen(false)} type="button">Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
