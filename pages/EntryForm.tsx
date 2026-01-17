
import React, { useState } from 'react';
import { Card, SectionTitle, Input, Select, Button, Badge } from '../components/Common';
import { EntryType, DeliveryStatus } from '../types';
import { MODES, COURIER_COMPANIES, OFFICES } from '../constants';

export const EntryForm: React.FC<{ initialType?: EntryType }> = ({ initialType = EntryType.INWARD }) => {
  const [type, setType] = useState<EntryType>(initialType);
  const [isReturned, setIsReturned] = useState(false);

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Direct Entry Workflow</h1>
          <p className="text-slate-500 text-sm">System auto-configures fields based on entry type</p>
        </div>
        <div className="bg-slate-100 p-1 rounded-lg flex items-center shadow-inner">
          {[EntryType.INWARD, EntryType.OUTWARD, EntryType.INTERNAL].map(t => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${
                type === t ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
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
              <Input label={`${type} No.`} placeholder="Auto Generated" disabled value={type === EntryType.INWARD ? 'INW/2024/0045' : 'OUT/2024/0821'} />
              <Input label="Date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
              
              {type === EntryType.INWARD && (
                <>
                  <Input label="Received Date" type="date" required />
                  <Select label="Mode of Receipt" options={MODES} required />
                  <Select label="Courier Company" options={COURIER_COMPANIES} />
                  <Input label="Receipt No." placeholder="Enter Receipt #" />
                  <Input label="Receipt Date" type="date" />
                </>
              )}

              {type === EntryType.OUTWARD && (
                <>
                  <Input label="Dispatched By" placeholder="Employee Name" required />
                  <Select label="Courier Company" options={COURIER_COMPANIES} required />
                  <Input label="Tracking ID" placeholder="Tracking/AWB #" required />
                  <Input label="Charges (₹)" type="number" step="0.01" />
                </>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <SectionTitle>{type === EntryType.INWARD ? 'Sender' : 'Recipient'} Information</SectionTitle>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Select label="Select from Master" options={['Reliance Industries', 'HDFC Bank', 'Municipal Corp', 'Supreme Court']} />
                </div>
                <Input label="Full Name" placeholder="Contact Person Name" required />
                <Input label="Contact Number" placeholder="+91 ..." />
                <div className="md:col-span-2">
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-xs font-semibold text-slate-600">Full Address</label>
                    <textarea className="border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-slate-50/30 h-20" />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <SectionTitle>Letter / Document Details</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Letter Number" placeholder="Ref #" />
              <Input label="Letter Date" type="date" />
              <div className="md:col-span-2">
                <Input label="Subject Short" placeholder="Short summary for registers" required />
              </div>
              <div className="md:col-span-2">
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-xs font-semibold text-slate-600">Full Description</label>
                  <textarea className="border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-slate-50/30 h-32" />
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
                  <Input label="Return Date" type="date" required />
                  <Input label="Return Reason" placeholder="Why was it returned?" required />
                  <div className="md:col-span-2">
                    <Input label="Action Taken" placeholder="Next steps..." />
                  </div>
                </div>
              )}
            </Card>
          )}

          <Card className="p-6">
            <SectionTitle>Routing & Distribution</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select label="From Office" options={OFFICES} required />
              <Select label="To Office" options={OFFICES} required />
              <Input label="Target Department" placeholder="Accounts / HR / Admin" />
              <Input label="Target Person" placeholder="Name of official" />
            </div>
          </Card>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          <Card className="p-6 sticky top-24">
            <SectionTitle>Form Actions</SectionTitle>
            <div className="space-y-3">
              <Button className="w-full h-11">
                💾 Save Entry
              </Button>
              <Button variant="secondary" className="w-full">
                🖨️ Save & Print Receipt
              </Button>
              <Button variant="ghost" className="w-full">
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
              <div className="space-y-2">
                {[1].map(i => (
                  <div key={i} className="flex items-center justify-between p-2 bg-slate-50 rounded text-xs border border-slate-100">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span className="text-indigo-500">📎</span>
                      <span className="truncate font-medium text-slate-600">signed_document_v2.pdf</span>
                    </div>
                    <button className="text-rose-500 hover:text-rose-700">✕</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <SectionTitle>Remarks</SectionTitle>
              <textarea 
                placeholder="Internal office remarks..."
                className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-slate-50/30 h-24"
              />
            </div>
          </Card>

          <Card className="p-4 bg-indigo-50 border-indigo-100">
            <h4 className="text-xs font-bold text-indigo-700 mb-2 uppercase tracking-tight">Pro Tip</h4>
            <p className="text-xs text-indigo-600 leading-relaxed">
              Use <b>Ctrl + S</b> to quick save. The inward number is locked based on the current financial year settings.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
