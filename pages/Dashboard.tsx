import React from 'react';
import { Card, Badge, Button } from '../components/Common';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { EntryType } from '../types';

const data = [
  { name: 'Jan', inward: 400, outward: 240 },
  { name: 'Feb', inward: 300, outward: 139 },
  { name: 'Mar', inward: 200, outward: 980 },
  { name: 'Apr', inward: 278, outward: 390 },
  { name: 'May', inward: 189, outward: 480 },
];

const pieData = [
  { name: 'Blue Dart', value: 400 },
  { name: 'DHL', value: 300 },
  { name: 'Speed Post', value: 300 },
  { name: 'FedEx', value: 200 },
];

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444'];

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === 'ADMIN';

  const AdminView = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Today's Inward", val: "12", trend: "+2", sub: "Documents", color: "indigo" },
          { label: "Today's Outward", val: "08", trend: "-1", sub: "Dispatches", color: "emerald" },
          { label: "Pending Routing", val: "24", trend: "0", sub: "Internal Items", color: "amber" },
          { label: "Returned Items", val: "03", trend: "+1", sub: "To be processed", color: "rose" }
        ].map((item, idx) => (
          <Card key={idx} className="p-5">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.label}</span>
              <Badge variant={item.trend.startsWith('+') ? 'success' : 'warning'}>{item.trend}</Badge>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-800">{item.val}</span>
              <span className="text-xs text-slate-500 font-medium">{item.sub}</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full mt-4 overflow-hidden">
              <div className="h-full bg-indigo-600 transition-all duration-1000" style={{ width: '65%' }}></div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Volume Comparison</h3>
            <div className="flex gap-4 text-xs font-bold">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
                <span className="text-slate-600">Inward</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-slate-600">Outward</span>
              </div>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="0" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 500 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 500 }}
                />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', padding: '12px' }}
                />
                <Bar dataKey="inward" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={24} />
                <Bar dataKey="outward" fill="#10b981" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Courier Share */}
        <Card className="p-6">
          <h3 className="font-bold text-slate-800 mb-6">Courier Usage Share</h3>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {pieData.map((item, i) => (
              <div key={i} className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: COLORS[i] }}></div>
                  <span className="text-slate-600 font-medium">{item.name}</span>
                </div>
                <span className="text-slate-800 font-bold">{Math.round((item.value / 1200) * 100)}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
        {/* Pending Tasks */}
        <Card className="p-6">
          <h3 className="font-bold text-slate-800 mb-4">Workflow Status</h3>
          <div className="space-y-4">
            {[
              { label: "Courier Pickup Pending", count: 4, desc: "Awaiting dispatch from reception", urgency: "high" },
              { label: "Internal Routing Awaited", count: 12, desc: "Assigned to departments but not received", urgency: "medium" },
              { label: "Pending Delivery Confirmation", count: 7, desc: "Sent but delivery status not updated", urgency: "low" }
            ].map((task, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-3 border border-slate-100 rounded-lg hover:bg-slate-50 hover:border-indigo-200 transition-all cursor-pointer group outline-none"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${task.urgency === 'high' ? 'bg-rose-50 text-rose-600' :
                  task.urgency === 'medium' ? 'bg-amber-50 text-amber-600' : 'bg-sky-50 text-sky-600'
                  }`}>
                  <span className="font-bold">{task.count}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors truncate">{task.label}</p>
                  <p className="text-[11px] text-slate-500 font-medium truncate">{task.desc}</p>
                </div>
                <div className="text-slate-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all">→</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Alerts Panel */}
        <Card className="p-6 border-l-4 border-l-rose-500">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="text-rose-500">⚠️</span> Critical Alerts
          </h3>
          <div className="space-y-3">
            {[
              { id: 'O-543', type: 'Return', msg: 'Courier returned from HDFC Bank', time: '2h ago' },
              { id: 'I-002', type: 'Missing', msg: 'No tracking ID for Courier entry', time: '5h ago' },
              { id: 'O-422', type: 'Delay', msg: 'Expected delivery delayed by 3 days', time: '1d ago' }
            ].map((alert, idx) => (
              <div key={idx} className="bg-slate-50 p-3 rounded text-sm flex justify-between items-start border border-transparent hover:border-slate-200 transition-colors">
                <div className="min-w-0">
                  <span className="font-bold text-[9px] text-slate-400 mr-2 uppercase tracking-tight">{alert.type}</span>
                  <p className="text-slate-700 font-medium truncate pr-4">{alert.msg}</p>
                  <p className="text-[10px] text-indigo-600 font-bold mt-1">Ref ID: {alert.id}</p>
                </div>
                <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">{alert.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );

  const OperatorView = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card className="p-6 border-l-4 border-indigo-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Today's Inward</p>
              <h2 className="text-4xl font-bold text-slate-800 mt-2">18</h2>
            </div>
            <div className="p-4 bg-indigo-50 rounded-full text-indigo-600 text-2xl">📥</div>
          </div>
          <Button className="mt-4 w-full" onClick={() => navigate('/entry/inward')}>+ New Inward Entry</Button>
        </Card>

        <Card className="p-6 border-l-4 border-emerald-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Today's Outward</p>
              <h2 className="text-4xl font-bold text-slate-800 mt-2">09</h2>
            </div>
            <div className="p-4 bg-emerald-50 rounded-full text-emerald-600 text-2xl">📤</div>
          </div>
          <Button className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700" onClick={() => navigate('/entry/outward')}>+ New Outward Entry</Button>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2">
          <h3 className="font-bold text-slate-800 mb-4">Recent Processing</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-bold">
                <tr>
                  <th className="p-3 rounded-l-lg">ID</th>
                  <th className="p-3">Subject</th>
                  <th className="p-3">Type</th>
                  <th className="p-3 rounded-r-lg">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[1, 2, 3, 4, 5].map(i => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="p-3 font-mono text-xs font-bold text-slate-600">INW/2024/00{i}</td>
                    <td className="p-3">Document from Regional Office regarding Audit</td>
                    <td className="p-3"><Badge variant="info">Inward</Badge></td>
                    <td className="p-3"><Badge variant="success">Received</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-bold text-slate-800 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button variant="secondary" className="w-full justify-start gap-2" onClick={() => navigate('/search')}>🔍 Search Record</Button>
            <Button variant="secondary" className="w-full justify-start gap-2">📦 Track Courier</Button>
            <Button variant="secondary" className="w-full justify-start gap-2">📑 View Daily Report</Button>
          </div>
        </Card>
      </div>
    </>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            {isAdmin ? 'Operations Control Panel' : 'Operator Dashboard'}
          </h1>
          <p className="text-slate-500 text-sm">
            {isAdmin ? 'Real-time monitoring of document movement' : 'Daily overview and quick entry'}
          </p>
        </div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last Sync</p>
        <p className="text-sm font-semibold text-slate-600 mb-2">Today, 10:30 AM</p>
      </div>
      {isAdmin ? <AdminView /> : <OperatorView />}
    </div >
  );
};