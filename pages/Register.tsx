
import React, { useState, useEffect } from 'react';
import { Card, Badge, Button, Input, Select } from '../components/Common';
import { EntryType, DeliveryStatus } from '../types';
import { MockApi } from '../services/MockApi';
import { useNavigate } from 'react-router-dom';

export const Register: React.FC<{ type: EntryType }> = ({ type }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await MockApi.getEntries(type as any); // Type assertion for mock compat
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [type]);

  const handleAddNew = () => {
    navigate(type === EntryType.INWARD ? '/entry/inward' : '/entry/outward');
  };

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
          <Button onClick={handleAddNew}>➕ New {type} Entry</Button>
        </div>
      </div>

      <Card className="p-4 bg-slate-50 border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <Input label="Date From" type="date" />
          <Input label="Date To" type="date" />
          <div className="flex items-end">
            <Button className="w-full">🔍 Filter Records</Button>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden min-h-[400px]">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
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
                {data.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-10 text-slate-400">No records found for {type}</td></tr>
                ) : (
                  data.map((item: any) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors cursor-pointer group">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                          {item.no}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">
                        {item.date}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <p className="text-sm font-bold text-slate-800">{item.sender}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-slate-600 line-clamp-1 max-w-xs">{item.subject}</p>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <Badge variant={
                          item.status === 'DELIVERED' ? 'success' : 'warning'
                        }>
                          {item.status || 'PENDING'}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button title="View" className="p-1.5 hover:bg-white rounded border border-slate-200 text-slate-600">👁️</button>
                          <button title="Edit" className="p-1.5 hover:bg-white rounded border border-slate-200 text-indigo-600">✏️</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};
