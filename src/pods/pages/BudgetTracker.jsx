/******  BUDGET TRACKER — Track spend, revenue & ROI per pod  ******/
import React, { useState } from 'react';
import {
  DollarSign, TrendingUp, TrendingDown, Plus, Trash2, Edit3,
  BarChart3, PieChart as PieIcon, Calendar, Filter, Download,
  ArrowUpRight, ArrowDownRight, Target, Wallet, Receipt
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const COLORS = ['#9F7AEA', '#F687B3', '#68D391', '#63B3ED', '#F6E05E', '#FC8181'];

const SAMPLE_TRANSACTIONS = [
  { id: 1, date: '2026-01-15', description: 'Meta Ads - Summer Campaign', category: 'Advertising', type: 'expense', amount: 450, platform: 'Instagram' },
  { id: 2, date: '2026-01-14', description: 'Influencer Payment - @stylequeen', category: 'Collaboration', type: 'expense', amount: 800, platform: 'TikTok' },
  { id: 3, date: '2026-01-13', description: 'Product Sales - Online Store', category: 'Revenue', type: 'income', amount: 2400, platform: 'Website' },
  { id: 4, date: '2026-01-12', description: 'Canva Pro Subscription', category: 'Tools', type: 'expense', amount: 15, platform: 'N/A' },
  { id: 5, date: '2026-01-11', description: 'Meta Ads - Brand Awareness', category: 'Advertising', type: 'expense', amount: 320, platform: 'Facebook' },
  { id: 6, date: '2026-01-10', description: 'Affiliate Commission', category: 'Revenue', type: 'income', amount: 580, platform: 'Website' },
  { id: 7, date: '2026-01-09', description: 'Photography Session', category: 'Content', type: 'expense', amount: 350, platform: 'N/A' },
  { id: 8, date: '2026-01-08', description: 'Product Sales - Online Store', category: 'Revenue', type: 'income', amount: 1850, platform: 'Website' },
];

const CHART_DATA = [
  { month: 'Oct', revenue: 3200, expenses: 2100 },
  { month: 'Nov', revenue: 4100, expenses: 2800 },
  { month: 'Dec', revenue: 3800, expenses: 2400 },
  { month: 'Jan', revenue: 4830, expenses: 1935 },
];

const CATEGORY_DATA = [
  { name: 'Advertising', value: 770 },
  { name: 'Collaboration', value: 800 },
  { name: 'Tools', value: 15 },
  { name: 'Content', value: 350 },
];

export default function BudgetTracker() {
  const [transactions, setTransactions] = useState(SAMPLE_TRANSACTIONS);
  const [filter, setFilter] = useState('all');
  const [showAdd, setShowAdd] = useState(false);

  const totalRevenue = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const netProfit = totalRevenue - totalExpenses;
  const roi = totalExpenses > 0 ? ((netProfit / totalExpenses) * 100).toFixed(1) : 0;

  const filtered = filter === 'all' ? transactions : transactions.filter((t) => t.type === filter);

  return (
    <div className="pod-page-container space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Budget Tracker</h2>
          <p className="text-sm text-gray-400">Track spend, revenue, and ROI for this pod</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-primary flex items-center gap-2"><Plus size={16} /> Add Transaction</button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard icon={<DollarSign size={16} />} label="Revenue" value={`$${totalRevenue.toLocaleString()}`} color="green" change="+18.5%" />
        <KpiCard icon={<Receipt size={16} />} label="Expenses" value={`$${totalExpenses.toLocaleString()}`} color="red" change="-8.2%" />
        <KpiCard icon={<Wallet size={16} />} label="Net Profit" value={`$${netProfit.toLocaleString()}`} color={netProfit >= 0 ? 'green' : 'red'} change={`${roi}% ROI`} />
        <KpiCard icon={<Target size={16} />} label="ROI" value={`${roi}%`} color="purple" change="vs last month" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="pod-card">
          <h3 className="text-sm font-semibold text-white mb-4">Revenue vs Expenses</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={CHART_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="month" stroke="#4B5563" fontSize={12} />
              <YAxis stroke="#4B5563" fontSize={12} />
              <Tooltip contentStyle={{ background: '#1a1a24', border: '1px solid #374151', borderRadius: '8px', color: '#fff' }} />
              <Bar dataKey="revenue" fill="#68D391" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="#FC8181" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="pod-card">
          <h3 className="text-sm font-semibold text-white mb-4">Expense Breakdown</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={CATEGORY_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                {CATEGORY_DATA.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#1a1a24', border: '1px solid #374151', borderRadius: '8px', color: '#fff' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {['all', 'income', 'expense'].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 text-xs rounded-lg transition-all capitalize ${filter === f ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-[#1a1a24] text-gray-400 border border-gray-800'}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Transactions */}
      <div className="pod-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-4 py-3">Date</th>
              <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-4 py-3">Description</th>
              <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-4 py-3">Category</th>
              <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-4 py-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} className="border-b border-gray-800/50 hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 text-sm text-gray-400">{t.date}</td>
                <td className="px-4 py-3 text-sm text-gray-200">{t.description}</td>
                <td className="px-4 py-3"><span className="pod-badge bg-gray-800 text-gray-400 text-xs">{t.category}</span></td>
                <td className={`px-4 py-3 text-sm font-medium ${t.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                  {t.type === 'income' ? '+' : '-'}${t.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function KpiCard({ icon, label, value, color, change }) {
  const colorMap = { green: 'text-green-400', red: 'text-red-400', purple: 'text-purple-400', blue: 'text-blue-400' };
  return (
    <div className="pod-stat-card">
      <div className="flex items-center gap-2 text-gray-500">{icon}<span className="pod-stat-label">{label}</span></div>
      <span className={`pod-stat-value ${colorMap[color] || 'text-white'}`}>{value}</span>
      <span className="text-xs text-gray-500">{change}</span>
    </div>
  );
}