/******  COLLABORATIONS — Manage brand deals & influencer collabs  ******/
import React, { useState } from 'react';
import {
  Users, Plus, Search, Mail, MessageCircle, CheckCircle, XCircle, Clock,
  DollarSign, Star, Filter, ExternalLink, Send, ChevronDown, Trash2, Edit3,
  TrendingUp, Target, Briefcase, Handshake, UserPlus
} from 'lucide-react';

const SAMPLE_COLLABS = [
  { id: 1, name: 'Sarah Chen', handle: '@sarahstyle', platform: 'Instagram', followers: '245K', niche: 'Fashion', status: 'active', dealValue: 2500, type: 'influencer', email: 'sarah@style.com', notes: 'Great engagement rate, professional content' },
  { id: 2, name: 'Nike Collaboration', handle: '@nike', platform: 'Instagram', followers: '300M', niche: 'Sportswear', status: 'negotiating', dealValue: 15000, type: 'brand', email: 'partnerships@nike.com', notes: 'Q2 campaign discussion' },
  { id: 3, name: 'Alex Fitness', handle: '@alexfit', platform: 'TikTok', followers: '890K', niche: 'Fitness', status: 'pending', dealValue: 1800, type: 'influencer', email: 'alex@fitness.com', notes: 'Waiting for rate confirmation' },
  { id: 4, name: 'Sephora Partnership', handle: '@sephora', platform: 'Instagram', followers: '22M', niche: 'Beauty', status: 'active', dealValue: 8000, type: 'brand', email: 'influencers@sephora.com', notes: 'Monthly content series' },
  { id: 5, name: 'Jake Creative', handle: '@jakecreative', platform: 'YouTube', followers: '1.2M', niche: 'Art', status: 'declined', dealValue: 3500, type: 'influencer', email: 'jake@creative.com', notes: 'Budget mismatch' },
];

const OUTREACH_TEMPLATES = [
  { id: 1, name: 'Initial Outreach', subject: 'Collaboration Opportunity with {podName}', body: 'Hi {name},\n\nI love your content on {platform}! I\'m reaching out because I think we\'d create something amazing together.\n\nWould you be open to discussing a collaboration?\n\nBest,' },
  { id: 2, name: 'Follow-up', subject: 'Following up: Collaboration', body: 'Hi {name},\n\nJust following up on my previous email about a potential collaboration. I\'d love to hear your thoughts!\n\nBest,' },
  { id: 3, name: 'Rate Negotiation', subject: 'Let\'s Make This Work', body: 'Hi {name},\n\nThank you for sharing your rates. I\'d love to find a package that works for both of us. Would you be open to a discussion?\n\nBest,' },
];

export default function Collaborations() {
  const [collabs, setCollabs] = useState(SAMPLE_COLLABS);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  const filtered = collabs.filter((c) => {
    if (filter !== 'all' && c.status !== filter) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalValue = collabs.filter((c) => c.status === 'active').reduce((s, c) => s + c.dealValue, 0);

  return (
    <div className="pod-page-container space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Collaborations</h2>
          <p className="text-sm text-gray-400">Manage brand deals, influencer partnerships, and outreach</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowTemplates(true)} className="btn-secondary flex items-center gap-2 text-sm"><Mail size={14} /> Templates</button>
          <button onClick={() => setShowAdd(true)} className="btn-primary flex items-center gap-2"><Plus size={16} /> Add Contact</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard icon={<Handshake size={16} />} label="Active Deals" value={collabs.filter((c) => c.status === 'active').length.toString()} />
        <KpiCard icon={<DollarSign size={16} />} label="Total Value" value={`$${totalValue.toLocaleString()}`} />
        <KpiCard icon={<UserPlus size={16} />} label="Total Contacts" value={collabs.length.toString()} />
        <KpiCard icon={<TrendingUp size={16} />} label="Avg. Deal" value={`$${Math.round(collabs.reduce((s, c) => s + c.dealValue, 0) / collabs.length).toLocaleString()}`} />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center flex-1 min-w-[200px] bg-[#1a1a24] border border-gray-800 rounded-lg px-3 py-2">
          <Search size={16} className="text-gray-500 mr-2" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search collaborations..." className="bg-transparent text-sm text-white placeholder-gray-500 outline-none flex-1" />
        </div>
        <div className="flex gap-1">
          {['all', 'active', 'negotiating', 'pending', 'declined'].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 text-xs rounded-lg transition-all capitalize ${filter === f ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-[#1a1a24] text-gray-400 border border-gray-800'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Collab List */}
      <div className="space-y-3">
        {filtered.map((collab) => (
          <div key={collab.id} className="pod-card hover:border-purple-500/20 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                  {collab.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white">{collab.name}</h3>
                    <span className={`pod-badge-${collab.status === 'active' ? 'green' : collab.status === 'declined' ? 'red' : collab.status === 'negotiating' ? 'amber' : 'blue'} text-[10px]`}>{collab.status}</span>
                  </div>
                  <p className="text-xs text-gray-500">{collab.handle} &middot; {collab.platform} &middot; {collab.followers} followers &middot; {collab.niche}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-white">${collab.dealValue.toLocaleString()}</p>
                <p className="text-xs text-gray-500">{collab.type}</p>
              </div>
            </div>
            {collab.notes && (
              <p className="text-xs text-gray-400 mt-2 pl-[52px]">{collab.notes}</p>
            )}
          </div>
        ))}
      </div>

      {/* Templates Modal */}
      {showTemplates && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => setShowTemplates(false)}>
          <div className="bg-[#111118] border border-gray-800 rounded-xl w-full max-w-lg max-h-[80vh] overflow-y-auto p-6 m-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-white mb-4">Outreach Templates</h3>
            <div className="space-y-3">
              {OUTREACH_TEMPLATES.map((t) => (
                <div key={t.id} className="pod-card">
                  <p className="text-xs text-gray-500 mb-1">{t.name}</p>
                  <p className="text-xs text-gray-400 font-medium mb-1">{t.subject}</p>
                  <p className="text-xs text-gray-500 whitespace-pre-line">{t.body}</p>
                </div>
              ))}
            </div>
            <button onClick={() => setShowTemplates(false)} className="btn-secondary w-full mt-4">Close</button>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => setShowAdd(false)}>
          <div className="bg-[#111118] border border-gray-800 rounded-xl p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-white mb-4">Add Contact</h3>
            <div className="space-y-3">
              <input placeholder="Name" className="w-full input-field" />
              <input placeholder="Handle (@username)" className="w-full input-field" />
              <input placeholder="Platform" className="w-full input-field" />
              <input placeholder="Email" type="email" className="w-full input-field" />
              <input placeholder="Deal Value" type="number" className="w-full input-field" />
              <div className="flex gap-2 justify-end">
                <button onClick={() => setShowAdd(false)} className="btn-secondary text-sm">Cancel</button>
                <button onClick={() => setShowAdd(false)} className="btn-primary text-sm">Add</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function KpiCard({ icon, label, value }) {
  return (
    <div className="pod-stat-card">
      <div className="flex items-center gap-2 text-gray-500">{icon}<span className="pod-stat-label">{label}</span></div>
      <span className="pod-stat-value">{value}</span>
    </div>
  );
}