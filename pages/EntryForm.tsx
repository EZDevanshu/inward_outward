
import React, { useState, useEffect } from 'react';
import { Card, SectionTitle, Input, Select, Button, Badge } from '../components/Common';
import { EntryType, DeliveryStatus } from '../types';
import { MockApi } from '../services/MockApi';
import { useAuth } from '../context/AuthContext';

interface EntryFormProps {
  initialType?: EntryType;
}

export const EntryForm: React.FC<EntryFormProps> = ({ initialType = EntryType.INWARD }) => {
  const [type, setType] = useState<EntryType>(initialType);
  const [isReturned, setIsReturned] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Master Data State
  const [offices, setOffices] = useState<any[]>([]);
  const [modes, setModes] = useState<any[]>([]);
  const [entities, setEntities] = useState<any[]>([]);
  const [couriers, setCouriers] = useState<any[]>([]);

  // Form State
  const [formData, setFormData] = useState<any>({
    date: new Date().toISOString().split('T')[0],
    inwardNo: 'EXT/2024/0045',
    outwardNo: 'OUT/2024/0821'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [o, m, e, c] = await Promise.all([
          MockApi.getMasters('offices'),
          MockApi.getMasters('modes'),
          MockApi.getMasters('entities'),
          MockApi.getMasters('couriers')
        ]);
        setOffices(o);
        setModes(m);
        setEntities(e);
        setCouriers(c);
      } catch (err) {
        console.error('Error fetching masters', err);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await MockApi.createEntry(
        type === EntryType.INWARD ? 'inward' : 'outward',
        { ...formData, type, createdBy: user?.username }
      );
      alert('Entry saved successfully!');
      setFormData({
        date: new Date().toISOString().split('T')[0],
        inwardNo: 'EXT/2024/00' + Math.floor(Math.random() * 100),
        outwardNo: 'OUT/2024/0' + Math.floor(Math.random() * 100)
      });
    } catch (e) {
      alert('Failed to save entry');
    } finally {
      setLoading(false);
    }
  };

  // Helper to map masters to string array for Common Select if needed, 
  // or update Common Select to accept object array.
  // Assuming Select takes options as string[] based on existing usage.
  // We'll simplisticly map name for display.
  // Real implementation should handle ID binding.

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Direct Entry Workflow</h1>
          <p className="text-slate-500 text-sm">System auto-configures fields based on entry type</p>
        </div>
        <div className="bg-slate-100 p-1 rounded-lg flex items-center shadow-inner">
          {[EntryType.INWARD, EntryType.OUTWARD].map(t => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${type === t ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <SectionTitle>{type} Details</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label={`${type} No.`}
                placeholder="Auto Generated"
                disabled
                value={type === EntryType.INWARD ? formData.inwardNo : formData.outwardNo}
              />
              <Input
                label="Entry Date"
                type="date"
                value={formData.date}
                onChange={e => handleInputChange('date', e.target.value)}
              />

              {type === EntryType.INWARD && (
                <>
                  <Input label="Received Date" type="date" onChange={e => handleInputChange('receivedDate', e.target.value)} />
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-xs font-semibold text-slate-600">Mode of Receipt</label>
                    <select className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-white"
                      onChange={e => handleInputChange('mode', e.target.value)}
                    >
                      <option value="">Select Mode</option>
                      {modes.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                    </select>
                  </div>

                  {/* Courier Conditionally */}
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-xs font-semibold text-slate-600">Courier Company (if applicable)</label>
                    <select className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-white"
                      onChange={e => handleInputChange('courierId', e.target.value)}
                    >
                      <option value="">Select Courier</option>
                      {couriers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>

                  <Input label="Receipt / AWB No." placeholder="Enter Receipt #" onChange={e => handleInputChange('receiptNo', e.target.value)} />
                </>
              )}

              {type === EntryType.OUTWARD && (
                <>
                  <Input label="Dispatched By" placeholder="Employee Name" onChange={e => handleInputChange('dispatchedBy', e.target.value)} />
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-xs font-semibold text-slate-600">Mode</label>
                    <select className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-white"
                      onChange={e => handleInputChange('mode', e.target.value)}
                    >
                      <option value="">Select Mode</option>
                      {modes.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-xs font-semibold text-slate-600">Courier Company</label>
                    <select className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-white"
                      onChange={e => handleInputChange('courierId', e.target.value)}
                    >
                      <option value="">Select Courier</option>
                      {couriers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <Input label="Tracking ID" placeholder="Tracking/AWB #" onChange={e => handleInputChange('trackingId', e.target.value)} />
                  <Input label="Charges (₹)" type="number" step="0.01" onChange={e => handleInputChange('charges', e.target.value)} />
                </>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <SectionTitle>{type === EntryType.INWARD ? 'Sender' : 'Recipient'} Information</SectionTitle>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-xs font-semibold text-slate-600">Select from Master</label>
                    <select className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-white"
                      onChange={e => {
                        const ent = entities.find(x => x.id === e.target.value);
                        if (ent) {
                          setFormData(prev => ({
                            ...prev,
                            senderName: ent.personName,
                            senderAddress: ent.address + ', ' + ent.place
                          }));
                        }
                      }}
                    >
                      <option value="">-- Select Entity --</option>
                      {entities.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                    </select>
                  </div>
                </div>
                <Input label="Full Name" placeholder="Contact Person Name" value={formData.senderName || ''} onChange={e => handleInputChange('senderName', e.target.value)} />
                <Input label="Contact Number" placeholder="+91 ..." onChange={e => handleInputChange('contactPhone', e.target.value)} />
                <div className="md:col-span-2">
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-xs font-semibold text-slate-600">Full Address</label>
                    <textarea
                      className="border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-slate-50/30 h-20"
                      value={formData.senderAddress || ''}
                      onChange={e => handleInputChange('senderAddress', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <SectionTitle>Letter / Document Details</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Letter Number" placeholder="Ref #" onChange={e => handleInputChange('letterNo', e.target.value)} />
              <Input label="Letter Date" type="date" onChange={e => handleInputChange('letterDate', e.target.value)} />
              <div className="md:col-span-2">
                <Input label="Subject Short" placeholder="Short summary for registers" required onChange={e => handleInputChange('subject', e.target.value)} />
              </div>
              <div className="md:col-span-2">
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-xs font-semibold text-slate-600">Full Description</label>
                  <textarea className="border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-slate-50/30 h-32"
                    onChange={e => handleInputChange('description', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </Card>

          {type === EntryType.OUTWARD && (
            <Card className="p-6 border-l-4 border-l-amber-500">
              <div className="flex justify-between items-center mb-4">
                <SectionTitle>Return Handling</SectionTitle>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500">Mark as Returned?</span>
                  <input
                    type="checkbox"
                    checked={isReturned}
                    onChange={e => setIsReturned(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 rounded"
                  />
                </div>
              </div>
              {isReturned && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <Input label="Return Date" type="date" required onChange={e => handleInputChange('returnDate', e.target.value)} />
                  <Input label="Return Reason" placeholder="Why was it returned?" required onChange={e => handleInputChange('returnReason', e.target.value)} />
                </div>
              )}
            </Card>
          )}

          <Card className="p-6">
            <SectionTitle>Routing & Distribution</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 w-full">
                <label className="text-xs font-semibold text-slate-600">From Office</label>
                <select className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-white"
                  onChange={e => handleInputChange('fromOffice', e.target.value)}
                >
                  <option value="">Select Office</option>
                  {offices.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label className="text-xs font-semibold text-slate-600">To Office</label>
                <select className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-white"
                  onChange={e => handleInputChange('toOffice', e.target.value)}
                >
                  <option value="">Select Office</option>
                  {offices.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
                </select>
              </div>
              <Input label="Target Department" placeholder="Accounts / HR / Admin" onChange={e => handleInputChange('department', e.target.value)} />
              <Input label="Target Person" placeholder="Name of official" onChange={e => handleInputChange('toPerson', e.target.value)} />
            </div>
          </Card>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          <Card className="p-6 sticky top-24">
            <SectionTitle>Form Actions</SectionTitle>
            <div className="space-y-3">
              <Button className="w-full h-11" onClick={handleSubmit} disabled={loading}>
                {loading ? 'Saving...' : '💾 Save Entry'}
              </Button>
              <Button variant="secondary" className="w-full">
                🖨️ Save & Print Receipt
              </Button>
              <Button variant="ghost" className="w-full" onClick={() => setFormData({})}>
                🧹 Clear Fields
              </Button>
            </div>

            <div className="mt-8 space-y-4">
              <SectionTitle>Attachments</SectionTitle>
              <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center hover:border-indigo-300 transition-colors cursor-pointer group">
                <span className="text-2xl block mb-2 group-hover:scale-110 transition-transform">📄</span>
                <p className="text-xs font-bold text-slate-700">Drag files here</p>
                <p className="text-[10px] text-slate-400">or click to browse</p>
                <input type="file" className="hidden" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
