/******  CAMPAIGNS — Full Campaign Manager  ******/
import React, { useState } from 'react';
import {
  Target, Plus, Search, Filter, ChevronDown, Edit3, Trash2, Pause, Play, BarChart3,
  DollarSign, Eye, MousePointer, TrendingUp, Calendar, Users, Copy, Check, X,
  Facebook, Instagram, Twitter, Youtube, Megaphone, Clock, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#9F7AEA', '#F687B3', '#68D391', '#63B3ED', '#F6E05E'];

const SAMPLE_CAMPAIGNS = [
  {
    id: 1, name: 'Summer Collection Launch', status: 'active', objective: 'awareness',
    platforms: ['Instagram', 'TikTok'], budget: 2000, spent: 1345, startDate: '2026-01-01', endDate: '2026-02-15',
    reach: 45200, impressions: 128000, clicks: 3240, conversions: 186, roi: 2.4,
    chart: [
      { day: 'Mon', spend: 120, reach: 3200, clicks: 89 },
      { day: 'Tue', spend: 180, reach: 5100, clicks: 134 },
      { day: 'Wed', spend: 95, reach: 2800, clicks: 67 },
      { day: 'Thu', spend: 210, reach: 6200, clicks: 178 },
      { day: 'Fri', spend: 150, reach: 4100, clicks: 112 },
      { day: 'Sat', spend: 280, reach: 8900, clicks: 245 },
      { day: 'Sun', spend: 310, reach: 9500, clicks: 267 },
    ]
  },
  {
    id: 2, name: 'Holiday Promo 2026', status: 'draft', objective: 'conversions',
    platforms: ['Facebook', 'Instagram'], budget: 3500, spent: 0, startDate: '2026-02-01', endDate: '2026-03-01',
    reach: 0, impressions: 0, clicks: 0, conversions: 0, roi: 0,
    chart: []
  },
  {
    id: 3, name: 'Influencer Collab Q1', status: 'active', objective: 'engagement',
    platforms: ['TikTok', 'YouTube'], budget: 5000, spent: 2890, startDate: '2026-01-10', endDate: '2026-04-10',
    reach: 67800, impressions: 245000, clicks: 8900, conversions: 432, roi: 3.1,
    chart: [
      { day: 'Mon', spend: 350, reach: 8900, clicks: 245 },
      { day: 'Tue', spend: 420, reach: 10200, clicks: 312 },
      { day: 'Wed', spend: 280, reach: 7100, clicks: 198 },
      { day: 'Thu', spend: 510, reach: 13400, clicks: 389 },
      { day: 'Fri', spend: 380, reach: 9800, clicks: 267 },
      { day: 'Sat', spend: 450, reach: 12100, clicks: 345 },
      { day: 'Sun', spend: 500, reach: 15600, clicks: 401 },
    ]
  },
  {
    id: 4, name: 'Brand Awareness Sprint', status: 'paused', objective: 'awareness',
    platforms: ['Instagram'], budget: 1500, spent: 890, startDate: '2025-12-01', endDate: '2026-01-15',
    reach: 23100, impressions: 78000, clicks: 1230, conversions: 67, roi: 1.8,
    chart: [
      { day: 'Mon', spend: 80, reach: 2100, clicks: 45 },
      { day: 'Tue', spend: 120, reach: 3400, clicks: 78 },
      { day: 'Wed', spend: 95, reach: 2800, clicks: 62 },
      { day: 'Thu', spend: 140, reach: 4100, clicks: 89 },
      { day: 'Fri', spend: 110, reach: 3200, clicks: 71 },
      { day: 'Sat', spend: 200, reach: 5600, clicks: 134 },
      { day: 'Sun', spend: 145, reach: 3900, clicks: 97 },
    ]
  },
];

const PLATFORM_ICONS = { Instagram: <Instagram size={14} />, TikTok: <Megaphone size={14} />, Facebook: <Facebook size={14} />, Twitter: <Twitter size={14} />, YouTube: <Youtube size={14} /> };

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState(SAMPLE_CAMPAIGNS);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [copied, setCopied] = useState(false);

  const filtered = campaigns.filter((c) => {
    if (filter !== 'all' && c.status !== filter) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const toggleStatus = (id) => {
    setCampaigns((prev) => prev.map((c) => {
      if (c.id !== id) return c;
      const next = c.status === 'active' ? 'paused' : c.status === 'paused' ? 'active' : c.status;
      return { ...c, status: next };
    }));
  };

  const totalBudget = campaigns.reduce((s, c) => s + c.budget, 0);
  const totalSpent = campaigns.reduce((s, c) => s + c.spent, 0);
  const totalReach = campaigns.reduce((s, c) => s + c.reach, 0);
  const avgROI = campaigns.filter((c) => c.roi > 0).reduce((s, c) => s + c.roi, 0) / campaigns.filter((c) => c.roi > 0).length || 0;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Campaigns</h1>
          <p className="text-sm text-gray-400 mt-1">Create, manage, and track your marketing campaigns</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-primary flex items-center gap-2">
          <Plus size={16} /> New Campaign
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={<DollarSign size={16} />} label="Total Budget" value={`$${totalBudget.toLocaleString()}`} />
        <StatCard icon={<TrendingUp size={16} />} label="Total Spent" value={`$${totalSpent.toLocaleString()}`} sub={`${Math.round((totalSpent / totalBudget) * 100)}% utilized`} />
        <StatCard icon={<Eye size={16} />} label="Total Reach" value={totalReach.toLocaleString()} />
        <StatCard icon={<Target size={16} />} label="Avg. ROI" value={`${avgROI.toFixed(1)}x`} />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="flex items-center flex-1 bg-[#1a1a24] border border-gray-800 rounded-lg px-3 py-2">
          <Search size={16} className="text-gray-500 mr-2" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search campaigns..." className="bg-transparent text-sm text-white placeholder-gray-500 outline-none flex-1" />
        </div>
        <div className="flex items-center gap-1 bg-[#1a1a24] border border-gray-800 rounded-lg px-3 py-2">
          <Filter size={14} className="text-gray-500" />
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="bg-transparent text-sm text-gray-300 outline-none">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="draft">Draft</option>
            <option value="ended">Ended</option>
          </select>
        </div>
      </div>

      {/* Campaign List */}
      <div className="space-y-3">
        {filtered.map((campaign) => (
          <div
            key={campaign.id}
            className="pod-card cursor-pointer hover:border-purple-500/20 transition-all"
            onClick={() => setSelectedCampaign(campaign)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-white">{campaign.name}</h3>
                <span className={`pod-badge-${campaign.status === 'active' ? 'green' : campaign.status === 'paused' ? 'amber' : campaign.status === 'draft' ? 'blue' : 'gray'}`}>
                  {campaign.status}
                </span>
                <span className="pod-badge bg-gray-800 text-gray-400">{campaign.objective}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); toggleStatus(campaign.id); }}
                  className="p-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  {campaign.status === 'active' ? <Pause size={14} /> : <Play size={14} />}
                </button>
                <button onClick={(e) => e.stopPropagation()} className="p-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                  <Edit3 size={14} />
                </button>
                <button onClick={(e) => e.stopPropagation()} className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-4 text-sm">
              <div>
                <p className="text-xs text-gray-500 mb-1">Budget</p>
                <p className="text-white font-medium">${campaign.budget.toLocaleString()}</p>
                <p className="text-xs text-gray-500">${campaign.spent.toLocaleString()} spent</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Reach</p>
                <p className="text-white font-medium">{campaign.reach.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Clicks</p>
                <p className="text-white font-medium">{campaign.clicks.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Conversions</p>
                <p className="text-white font-medium">{campaign.conversions}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">ROI</p>
                <p className="text-white font-medium">{campaign.roi > 0 ? `${campaign.roi}x` : '—'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Platforms</p>
                <div className="flex gap-1">
                  {campaign.platforms.map((p) => (
                    <span key={p} className="text-purple-400">{PLATFORM_ICONS[p] || <Megaphone size={14} />}</span>
                  ))}
                </div>
              </div>
            </div>
            {/* Progress bar */}
            <div className="mt-3">
              <div className="pod-progress-bar">
                <div className="pod-progress-fill" style={{ width: `${Math.min(100, (campaign.spent / campaign.budget) * 100)}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Campaign Detail Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => setSelectedCampaign(null)}>
          <div className="bg-[#111118] border border-gray-800 rounded-xl w-full max-w-3xl max-h-[80vh] overflow-y-auto m-4" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-white">{selectedCampaign.name}</h2>
                <span className={`pod-badge-${selectedCampaign.status === 'active' ? 'green' : 'amber'}`}>{selectedCampaign.status}</span>
              </div>
              <button onClick={() => setSelectedCampaign(null)} className="p-2 text-gray-400 hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-4">
                <StatCard icon={<DollarSign size={14} />} label="Spent" value={`$${selectedCampaign.spent.toLocaleString()}`} sub={`of $${selectedCampaign.budget.toLocaleString()}`} />
                <StatCard icon={<Eye size={14} />} label="Reach" value={selectedCampaign.reach.toLocaleString()} />
                <StatCard icon={<MousePointer size={14} />} label="Clicks" value={selectedCampaign.clicks.toLocaleString()} sub={`${selectedCampaign.reach > 0 ? ((selectedCampaign.clicks / selectedCampaign.reach) * 100).toFixed(1) : 0}% CTR`} />
                <StatCard icon={<Target size={14} />} label="Conversions" value={selectedCampaign.conversions.toString()} sub={`$${selectedCampaign.conversions > 0 ? (selectedCampaign.spent / selectedCampaign.conversions).toFixed(2) : 0} CPA`} />
              </div>

              {/* Chart */}
              {selectedCampaign.chart.length > 0 && (
                <div className="pod-card">
                  <h4 className="text-sm font-semibold text-white mb-4">Performance (Last 7 Days)</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={selectedCampaign.chart}>
                      <defs>
                        <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#9F7AEA" stopOpacity={0.3} /><stop offset="95%" stopColor="#9F7AEA" stopOpacity={0} /></linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                      <XAxis dataKey="day" stroke="#4B5563" fontSize={12} />
                      <YAxis stroke="#4B5563" fontSize={12} />
                      <Tooltip contentStyle={{ background: '#1a1a24', border: '1px solid #374151', borderRadius: '8px', color: '#fff' }} />
                      <Area type="monotone" dataKey="spend" stroke="#9F7AEA" fillOpacity={1} fill="url(#colorSpend)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Platforms */}
              <div className="pod-card">
                <h4 className="text-sm font-semibold text-white mb-3">Platforms</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCampaign.platforms.map((p) => (
                    <span key={p} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1a24] border border-gray-800 rounded-lg text-sm text-gray-300">
                      {PLATFORM_ICONS[p]} {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* Date Range */}
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1"><Calendar size={14} /> {selectedCampaign.startDate} — {selectedCampaign.endDate}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Campaign Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => setShowCreate(false)}>
          <div className="bg-[#111118] border border-gray-800 rounded-xl w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-white mb-4">Create Campaign</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Campaign Name</label>
                <input className="w-full input-field" placeholder="e.g., Summer Collection Launch" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Objective</label>
                  <select className="w-full input-field">
                    <option>Awareness</option>
                    <option>Engagement</option>
                    <option>Conversions</option>
                    <option>Traffic</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Budget</label>
                  <input type="number" className="w-full input-field" placeholder="$" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Start Date</label>
                  <input type="date" className="w-full input-field" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">End Date</label>
                  <input type="date" className="w-full input-field" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Platforms</label>
                <div className="flex flex-wrap gap-2">
                  {['Instagram', 'TikTok', 'Facebook', 'Twitter', 'YouTube'].map((p) => (
                    <button key={p} className="px-3 py-1.5 border border-gray-700 text-gray-300 rounded-lg text-sm hover:border-purple-500/30 hover:text-purple-400 transition-all">
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setShowCreate(false)} className="btn-secondary">Cancel</button>
                <button onClick={() => setShowCreate(false)} className="btn-primary">Create Campaign</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, sub }) {
  return (
    <div className="pod-stat-card">
      <div className="flex items-center gap-2 text-gray-500">
        {icon}
        <span className="pod-stat-label">{label}</span>
      </div>
      <span className="pod-stat-value">{value}</span>
      {sub && <span className="text-xs text-gray-500">{sub}</span>}
    </div>
  );
}