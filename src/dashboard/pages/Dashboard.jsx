import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Globe,
  PenTool,
  Image,
  TrendingUp,
  Megaphone,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Eye,
  MousePointer,
  DollarSign,
} from 'lucide-react';

/* ─── Mock data (replace with API calls) ─── */
const METRICS = [
  { label: 'Total Websites', value: '12', change: '+3', up: true, icon: Globe },
  { label: 'Content Pieces', value: '48', change: '+12', up: true, icon: PenTool },
  { label: 'Media Files', value: '156', change: '+8', up: true, icon: Image },
  { label: 'Active Campaigns', value: '4', change: '-1', up: false, icon: Megaphone },
];

const RECENT_ACTIVITY = [
  { action: 'Website analyzed', target: 'auroraskincare.com.au', time: '2 min ago' },
  { action: 'Content generated', target: 'Summer Collection Instagram post', time: '15 min ago' },
  { action: 'Media uploaded', target: 'beach-lifestyle-hero.jpg', time: '1 hour ago' },
  { action: 'Campaign launched', target: 'Holiday Special 2025', time: '3 hours ago' },
  { action: 'Artist submission', target: 'Emma Wilson portfolio', time: '5 hours ago' },
];

const QUICK_ACTIONS = [
  { label: 'Add Website', icon: Globe, path: '/websites', color: 'bg-[#C9A96E]/10 text-[#C9A96E]' },
  { label: 'Generate Content', icon: PenTool, path: '/content', color: 'bg-[#9E9484]/10 text-[#9E9484]' },
  { label: 'Upload Media', icon: Image, path: '/media', color: 'bg-[#6B6560]/10 text-[#6B6560]' },
  { label: 'View Campaigns', icon: Megaphone, path: '/campaigns', color: 'bg-[#C9A96E]/10 text-[#C9A96E]' },
  { label: 'Growth Advice', icon: TrendingUp, path: '/advice', color: 'bg-[#9E9484]/10 text-[#9E9484]' },
  { label: 'Artist Submissions', icon: Users, path: '/artists', color: 'bg-[#6B6560]/10 text-[#6B6560]' },
];

const PERFORMANCE_DATA = [
  { day: 'Mon', impressions: 4200, clicks: 320, spend: 45 },
  { day: 'Tue', impressions: 5100, clicks: 410, spend: 58 },
  { day: 'Wed', impressions: 4800, clicks: 380, spend: 52 },
  { day: 'Thu', impressions: 6200, clicks: 520, spend: 71 },
  { day: 'Fri', impressions: 7100, clicks: 610, spend: 82 },
  { day: 'Sat', impressions: 5800, clicks: 490, spend: 65 },
  { day: 'Sun', impressions: 4500, clicks: 350, spend: 48 },
];

function StatCard({ metric }) {
  const Icon = metric.icon;
  return (
    <div className="bg-white rounded-xl border border-[#E8E2D9] p-5 shadow-premium card-lift">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg ${metric.color || 'bg-[#C9A96E]/10'}`}>
          <Icon size={18} className="text-[#C9A96E]" />
        </div>
        <div className={`flex items-center gap-0.5 text-xs font-medium ${metric.up ? 'text-emerald-600' : 'text-red-500'}`}>
          {metric.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {metric.change}
        </div>
      </div>
      <p className="text-2xl font-semibold text-[#3D3632] font-serif">{metric.value}</p>
      <p className="text-xs text-[#9E9484] mt-0.5">{metric.label}</p>
    </div>
  );
}

function PerformanceChart() {
  const maxImpressions = Math.max(...PERFORMANCE_DATA.map(d => d.impressions));

  return (
    <div className="bg-white rounded-xl border border-[#E8E2D9] p-5 shadow-premium">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[#3D3632]">Performance Overview</h3>
        <select className="text-xs border border-[#E8E2D9] rounded-lg px-2 py-1 bg-[#FAF9F7] text-[#6B6560]">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>This month</option>
        </select>
      </div>

      <div className="flex items-end justify-between gap-2 h-40">
        {PERFORMANCE_DATA.map((d) => (
          <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5">
            <div className="w-full flex flex-col gap-1">
              <div
                className="w-full bg-[#C9A96E]/20 rounded-t-sm relative group"
                style={{ height: `${(d.impressions / maxImpressions) * 100}px` }}
              >
                <div
                  className="absolute bottom-0 left-0 right-0 bg-[#C9A96E] rounded-t-sm transition-all"
                  style={{ height: `${(d.clicks / d.impressions) * 100 * 3}%` }}
                />
              </div>
            </div>
            <span className="text-[10px] text-[#9E9484] font-medium">{d.day}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#E8E2D9]">
        <div className="flex items-center gap-1.5">
          <Eye size={13} className="text-[#9E9484]" />
          <span className="text-xs text-[#6B6560]">Impressions</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MousePointer size={13} className="text-[#C9A96E]" />
          <span className="text-xs text-[#6B6560]">Clicks</span>
        </div>
        <div className="flex items-center gap-1.5">
          <DollarSign size={13} className="text-[#6B6560]" />
          <span className="text-xs text-[#6B6560]">Spend</span>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#3D3632] font-serif">Dashboard</h1>
        <p className="text-sm text-[#9E9484] mt-0.5">Welcome back — here's what's happening.</p>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS.map((m, i) => (
          <div key={m.label} className={`stagger-${i + 1} animate-fade-in-up`}>
            <StatCard metric={m} />
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2">
          <PerformanceChart />
        </div>

        {/* Activity feed */}
        <div className="bg-white rounded-xl border border-[#E8E2D9] p-5 shadow-premium">
          <h3 className="text-sm font-semibold text-[#3D3632] mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {RECENT_ACTIVITY.map((a, i) => (
              <div key={i} className="flex items-start gap-3 pb-3 border-b border-[#E8E2D9]/50 last:border-0 last:pb-0">
                <div className="w-2 h-2 rounded-full bg-[#C9A96E] mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium text-[#3D3632]">{a.action}</p>
                  <p className="text-[11px] text-[#9E9484]">{a.target}</p>
                  <p className="text-[10px] text-[#9E9484]/60 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h3 className="text-sm font-semibold text-[#3D3632] mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                to={action.path}
                className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-[#E8E2D9] shadow-premium card-lift hover:border-[#C9A96E]/30 transition-all"
              >
                <div className={`p-2.5 rounded-lg ${action.color}`}>
                  <Icon size={20} />
                </div>
                <span className="text-xs font-medium text-[#3D3632] text-center">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Integration status */}
      <div className="bg-white rounded-xl border border-[#E8E2D9] p-5 shadow-premium">
        <div className="flex items-center gap-2 mb-3">
          <Zap size={16} className="text-[#C9A96E]" />
          <h3 className="text-sm font-semibold text-[#3D3632]">Connected Services</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {['Supabase', 'Stripe', 'OpenAI', 'SendGrid', 'Meta Ads'].map((service) => (
            <span
              key={service}
              className="px-3 py-1.5 bg-[#FAF9F7] border border-[#E8E2D9] rounded-lg text-xs font-medium text-[#6B6560]"
            >
              {service}
            </span>
          ))}
        </div>
        <p className="text-[11px] text-[#9E9484] mt-2">
          Configure API keys in Settings to activate integrations.
        </p>
      </div>
    </div>
  );
}
