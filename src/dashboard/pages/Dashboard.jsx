/******  DASHBOARD HOME — Overview with KPIs  ******/
import React from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp, Users, Eye, DollarSign, Target, FileText, BarChart3, ArrowUpRight,
  Sparkles, Clock, Zap, Activity, ChevronRight
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const CHART_DATA = [
  { day: 'Mon', followers: 2100, engagement: 5.2, reach: 8500 },
  { day: 'Tue', followers: 2240, engagement: 5.8, reach: 10200 },
  { day: 'Wed', followers: 2380, engagement: 6.1, reach: 11500 },
  { day: 'Thu', followers: 2510, engagement: 5.5, reach: 9800 },
  { day: 'Fri', followers: 2680, engagement: 6.4, reach: 13200 },
  { day: 'Sat', followers: 2850, engagement: 6.9, reach: 15800 },
  { day: 'Sun', followers: 3100, engagement: 7.2, reach: 18200 },
];

const RECENT_ACTIVITY = [
  { action: 'AI generated 3 captions', pod: 'Fashion Forward', time: '5 min ago', icon: <Sparkles size={14} className="text-purple-400" /> },
  { action: 'Campaign launched', pod: 'Summer Collection', time: '1 hr ago', icon: <Target size={14} className="text-blue-400" /> },
  { action: 'Content scheduled', pod: 'Fitness Daily', time: '2 hr ago', icon: <Clock size={14} className="text-green-400" /> },
  { action: 'Analytics report ready', pod: 'Art Studio', time: '3 hr ago', icon: <BarChart3 size={14} className="text-amber-400" /> },
  { action: 'New collaboration request', pod: 'Fashion Forward', time: '5 hr ago', icon: <Users size={14} className="text-pink-400" /> },
];

const QUICK_ACTIONS = [
  { label: 'Generate Content', icon: <FileText size={16} />, to: '/dashboard/content-engine', color: 'purple' },
  { label: 'View Campaigns', icon: <Target size={16} />, to: '/dashboard/campaigns', color: 'blue' },
  { label: 'Check Analytics', icon: <BarChart3 size={16} />, to: '/pods/fashion-forward/analytics', color: 'green' },
  { label: 'AI Assistant', icon: <Sparkles size={16} />, to: '/pods/fashion-forward/ai-assistant', color: 'pink' },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">Welcome back! Here's what's happening across your pods.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard icon={<Users size={18} />} label="Total Followers" value="3,100" change="+47.6%" changeColor="green" />
        <KpiCard icon={<TrendingUp size={18} />} label="Engagement Rate" value="7.2%" change="+38.5%" changeColor="green" />
        <KpiCard icon={<Eye size={18} />} label="Weekly Reach" value="87,200" change="+114.1%" changeColor="green" />
        <KpiCard icon={<DollarSign size={18} />} label="Ad Spend" value="$4,235" change="68% of budget" changeColor="amber" />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Growth Chart */}
        <div className="lg:col-span-2 pod-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Growth Overview</h3>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Activity size={12} />
              <span>Last 7 days</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={CHART_DATA}>
              <defs>
                <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9F7AEA" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#9F7AEA" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="#374151" fontSize={12} />
              <YAxis stroke="#374151" fontSize={12} />
              <Tooltip contentStyle={{ background: '#1a1a24', border: '1px solid #374151', borderRadius: '8px', color: '#fff' }} />
              <Area type="monotone" dataKey="followers" stroke="#9F7AEA" fillOpacity={1} fill="url(#colorFollowers)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <div className="pod-card">
            <h3 className="text-sm font-semibold text-white mb-3">Quick Actions</h3>
            <div className="space-y-2">
              {QUICK_ACTIONS.map((action) => (
                <Link
                  key={action.label}
                  to={action.to}
                  className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-all group"
                >
                  <div className={`text-${action.color}-400`}>{action.icon}</div>
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors flex-1">{action.label}</span>
                  <ChevronRight size={14} className="text-gray-600 group-hover:text-gray-400 transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="pod-card">
            <h3 className="text-sm font-semibold text-white mb-3">Recent Activity</h3>
            <div className="space-y-3">
              {RECENT_ACTIVITY.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  {item.icon}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-200">{item.action}</p>
                    <p className="text-xs text-gray-500">{item.pod}</p>
                  </div>
                  <span className="text-xs text-gray-600 shrink-0">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pod Performance Summary */}
      <div className="pod-card">
        <h3 className="text-lg font-semibold text-white mb-4">Pod Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Fashion Forward', followers: '2,847', posts: 24, engagement: '6.8%', growth: '+12.5%', color: 'from-purple-600 to-pink-500' },
            { name: 'Fitness Daily', followers: '1,523', posts: 18, engagement: '8.2%', growth: '+23.1%', color: 'from-blue-500 to-cyan-400' },
            { name: 'Art Studio', followers: '892', posts: 12, engagement: '5.4%', growth: '+8.7%', color: 'from-amber-500 to-orange-400' },
          ].map((pod) => (
            <div key={pod.name} className="bg-[#0a0a0f] border border-gray-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${pod.color} flex items-center justify-center text-white font-bold text-xs`}>
                  {pod.name.charAt(0)}
                </div>
                <span className="text-sm font-semibold text-white">{pod.name}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-gray-500">Followers</p>
                  <p className="text-white font-medium">{pod.followers}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Engagement</p>
                  <p className="text-white font-medium">{pod.engagement}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Posts</p>
                  <p className="text-white font-medium">{pod.posts}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Growth</p>
                  <p className="text-green-400 font-medium">{pod.growth}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function KpiCard({ icon, label, value, change, changeColor = 'green' }) {
  return (
    <div className="pod-card">
      <div className="flex items-center gap-2 text-gray-500 mb-2">
        {icon}
        <span className="text-xs uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className={`text-xs font-medium mt-1 text-${changeColor}-400`}>{change}</p>
    </div>
  );
}