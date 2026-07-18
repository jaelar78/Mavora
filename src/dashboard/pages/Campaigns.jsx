import { useState } from 'react';
import {
  Megaphone,
  Plus,
  BarChart3,
  Eye,
  MousePointer,
  DollarSign,
  Pause,
  Play,
  Trash2,
  Calendar,
} from 'lucide-react';

const INITIAL_CAMPAIGNS = [
  {
    id: 1,
    name: 'Summer Collection Launch',
    platform: 'Meta Ads',
    status: 'active',
    budget: 50,
    spent: 32.40,
    impressions: 12400,
    clicks: 843,
    ctr: 6.8,
    startDate: '2025-06-01',
    endDate: '2025-06-30',
  },
  {
    id: 2,
    name: 'Google Search - Skincare',
    platform: 'Google Ads',
    status: 'active',
    budget: 75,
    spent: 58.20,
    impressions: 8900,
    clicks: 412,
    ctr: 4.6,
    startDate: '2025-06-01',
    endDate: '2025-07-15',
  },
  {
    id: 3,
    name: 'TikTok Influencer Collab',
    platform: 'TikTok Ads',
    status: 'paused',
    budget: 30,
    spent: 12.80,
    impressions: 5600,
    clicks: 298,
    ctr: 5.3,
    startDate: '2025-05-15',
    endDate: '2025-06-15',
  },
];

const PLATFORM_COLORS = {
  'Meta Ads': 'bg-blue-50 text-blue-600',
  'Google Ads': 'bg-emerald-50 text-emerald-600',
  'TikTok Ads': 'bg-rose-50 text-rose-600',
};

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState(INITIAL_CAMPAIGNS);
  const [showAdd, setShowAdd] = useState(false);

  const toggleStatus = (id) => {
    setCampaigns(
      campaigns.map((c) =>
        c.id === id ? { ...c, status: c.status === 'active' ? 'paused' : 'active' } : c
      )
    );
  };

  const handleDelete = (id) => setCampaigns(campaigns.filter((c) => c.id !== id));

  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0);
  const totalImpressions = campaigns.reduce((sum, c) => sum + c.impressions, 0);
  const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);
  const avgCtr = ((totalClicks / totalImpressions) * 100).toFixed(1);

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#3D3632] font-serif">Campaigns</h1>
          <p className="text-sm text-[#9E9484] mt-0.5">Manage and track your ad campaigns.</p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 px-4 py-2 bg-[#3D3632] text-[#FAF9F7] rounded-lg text-sm font-medium hover:bg-[#4A433E] transition-colors"
        >
          <Plus size={16} />
          New Campaign
        </button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Budget', value: `$${totalBudget}`, icon: DollarSign },
          { label: 'Total Spent', value: `$${totalSpent.toFixed(2)}`, icon: BarChart3 },
          { label: 'Impressions', value: totalImpressions.toLocaleString(), icon: Eye },
          { label: 'Avg. CTR', value: `${avgCtr}%`, icon: MousePointer },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl border border-[#E8E2D9] p-4 shadow-premium">
              <div className="flex items-center gap-2 mb-1">
                <Icon size={14} className="text-[#9E9484]" />
                <span className="text-[11px] text-[#9E9484]">{stat.label}</span>
              </div>
              <p className="text-lg font-semibold text-[#3D3632] font-serif">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Campaigns list */}
      <div className="space-y-3">
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="bg-white rounded-xl border border-[#E8E2D9] p-5 shadow-premium card-lift"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-[#3D3632]">{campaign.name}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${PLATFORM_COLORS[campaign.platform]}`}>
                    {campaign.platform}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      campaign.status === 'active'
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-amber-50 text-amber-600'
                    }`}
                  >
                    {campaign.status === 'active' ? 'Active' : 'Paused'}
                  </span>
                </div>

                <div className="flex items-center gap-4 mt-2 text-[11px] text-[#9E9484]">
                  <span className="flex items-center gap-1">
                    <Calendar size={11} />
                    {campaign.startDate} → {campaign.endDate}
                  </span>
                  <span>Budget: ${campaign.budget}/day</span>
                  <span>Spent: ${campaign.spent.toFixed(2)}</span>
                </div>

                {/* Mini metrics */}
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#E8E2D9]/50">
                  <div className="flex items-center gap-1.5">
                    <Eye size={12} className="text-[#9E9484]" />
                    <span className="text-xs font-medium text-[#3D3632]">{campaign.impressions.toLocaleString()}</span>
                    <span className="text-[10px] text-[#9E9484]">impressions</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MousePointer size={12} className="text-[#C9A96E]" />
                    <span className="text-xs font-medium text-[#3D3632]">{campaign.clicks}</span>
                    <span className="text-[10px] text-[#9E9484]">clicks</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BarChart3 size={12} className="text-[#6B6560]" />
                    <span className="text-xs font-medium text-[#3D3632]">{campaign.ctr}%</span>
                    <span className="text-[10px] text-[#9E9484]">CTR</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => toggleStatus(campaign.id)}
                  className="p-2 rounded-lg hover:bg-[#E8E2D9]/50 transition-colors"
                  title={campaign.status === 'active' ? 'Pause' : 'Resume'}
                >
                  {campaign.status === 'active' ? (
                    <Pause size={15} className="text-amber-500" />
                  ) : (
                    <Play size={15} className="text-emerald-500" />
                  )}
                </button>
                <button
                  onClick={() => handleDelete(campaign.id)}
                  className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={15} className="text-red-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
