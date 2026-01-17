
import React from 'react';
import { Card, Badge, Button, Input, Select } from '../components/Common';
import { EntryType, DeliveryStatus } from '../types';
import { MOCK_INWARD_DATA, MOCK_OUTWARD_DATA, MODES, COURIER_COMPANIES } from '../constants';

export const Register: React.FC<{ type: EntryType }> = ({ type }) => {
  const data = type === EntryType.INWARD ? MOCK_INWARD_DATA : MOCK_OUTWARD_DATA;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{type} Register</h1>
          <p className="text-slate-500 text-sm">Review historical data and track movement</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary">📥 Export Excel</Button>
          <Button variant="secondary">🖨️ Print Batch</Button>
          <Button>➕ New {type} Entry</Button>
        </div>
      </div>

      <Card className="p-4 bg-slate-50 border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <Input label="Date From" type="date" />
          <Input label="Date To" type="date" />
          <Select label="Mode" options={MODES} />
          <Select label="Courier" options={COURIER_COMPANIES} />
          <div className="flex items-end">
            <Button className="w-full">🔍 Filter Records</Button>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                  {type === EntryType.INWARD ? 'Inward' : 'Outward'} No
                </th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Date</th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                  {type === EntryType.INWARD ? 'Sender' : 'Recipient'}
                </th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Subject</th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((item: any) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors cursor-pointer group">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                      {type === EntryType.INWARD ? item.inwardNo : item.outwardNo}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">
                    {type === EntryType.INWARD ? item.inwardDate : item.dispatchDate}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <p className="text-sm font-bold text-slate-800">{type === EntryType.INWARD ? item.senderName : item.recipientName}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{type === EntryType.INWARD ? item.senderAddress : item.recipientAddress}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm text-slate-600 line-clamp-1 max-w-xs">{item.subject}</p>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <Badge variant={
                      item.status === DeliveryStatus.DELIVERED ? 'success' :
                      item.status === DeliveryStatus.RETURNED ? 'danger' :
                      item.status === DeliveryStatus.IN_TRANSIT ? 'info' : 'warning'
                    }>
                      {item.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button title="View" className="p-1.5 hover:bg-white rounded border border-slate-200 text-slate-600">👁️</button>
                      <button title="Edit" className="p-1.5 hover:bg-white rounded border border-slate-200 text-indigo-600">✏️</button>
                      <button title="Delete" className="p-1.5 hover:bg-white rounded border border-slate-200 text-rose-600">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center text-xs text-slate-500 font-medium">
          <span>Showing 1 to {data.length} of {data.length} entries</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-white disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 bg-indigo-600 text-white rounded">1</button>
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-white">Next</button>
          </div>
        </div>
      </Card>
    </div>
  );
};
