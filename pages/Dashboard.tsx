import React from 'react';
import { Card, Badge } from '../components/Common';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

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
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Operations Control Panel</h1>
          <p className="text-slate-500 text-sm">Real-time monitoring of document movement</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last Sync</p>
          <p className="text-sm font-semibold text-slate-600">Today, 10:30 AM</p>
        </div>
      </div>

      {/* Metric Cards */}
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
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  task.urgency === 'high' ? 'bg-rose-50 text-rose-600' : 
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
    </div>
  );
};