/******  WEBSITES — Website Builder & Manager  ******/
import React, { useState } from 'react';
import {
  Globe, Plus, Search, Edit3, ExternalLink, Trash2, Copy, Check,
  Layout, Palette, Code, Smartphone, Eye, BarChart3, Settings2,
  ChevronRight, Sparkles, Monitor, Tablet
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const SAMPLE_SITES = [
  {
    id: 1, name: 'Fashion Forward Store', domain: 'fashionforward.store', status: 'published',
    template: 'E-commerce', pages: 8, visitors: 4520, views: 12800, lastUpdated: '2026-01-15',
    analytics: [
      { day: 'Mon', visitors: 520, views: 1400 },
      { day: 'Tue', visitors: 680, views: 1890 },
      { day: 'Wed', visitors: 450, views: 1200 },
      { day: 'Thu', visitors: 720, views: 2100 },
      { day: 'Fri', visitors: 890, views: 2600 },
      { day: 'Sat', visitors: 650, views: 1850 },
      { day: 'Sun', visitors: 610, views: 1760 },
    ]
  },
  {
    id: 2, name: 'Fitness Daily Blog', domain: 'fitnessdaily.blog', status: 'published',
    template: 'Blog', pages: 24, visitors: 3210, views: 8900, lastUpdated: '2026-01-14',
    analytics: [
      { day: 'Mon', visitors: 380, views: 950 },
      { day: 'Tue', visitors: 420, views: 1100 },
      { day: 'Wed', visitors: 510, views: 1350 },
      { day: 'Thu', visitors: 460, views: 1200 },
      { day: 'Fri', visitors: 550, views: 1500 },
      { day: 'Sat', visitors: 490, views: 1300 },
      { day: 'Sun', visitors: 400, views: 1000 },
    ]
  },
  {
    id: 3, name: 'Art Studio Portfolio', domain: 'artstudio.design', status: 'draft',
    template: 'Portfolio', pages: 6, visitors: 0, views: 0, lastUpdated: '2026-01-12',
    analytics: []
  },
];

const TEMPLATES = [
  { id: 'ecommerce', name: 'E-commerce', icon: <Layout size={24} />, desc: 'Sell products online', pages: 8 },
  { id: 'blog', name: 'Blog', icon: <Code size={24} />, desc: 'Share stories and articles', pages: 6 },
  { id: 'portfolio', name: 'Portfolio', icon: <Palette size={24} />, desc: 'Showcase your work', pages: 5 },
  { id: 'landing', name: 'Landing Page', icon: <Monitor size={24} />, desc: 'High-conversion single page', pages: 1 },
  { id: 'coming-soon', name: 'Coming Soon', icon: <Sparkles size={24} />, desc: 'Build anticipation', pages: 1 },
];

export default function Websites() {
  const [sites, setSites] = useState(SAMPLE_SITES);
  const [search, setSearch] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [selectedSite, setSelectedSite] = useState(null);
  const [copied, setCopied] = useState(false);

  const filtered = sites.filter((s) => !search || s.name.toLowerCase().includes(search.toLowerCase()));

  const copyDomain = (domain) => {
    navigator.clipboard.writeText(`https://${domain}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Websites</h1>
          <p className="text-sm text-gray-400 mt-1">Build and manage your websites</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-primary flex items-center gap-2">
          <Plus size={16} /> New Website
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={<Globe size={16} />} label="Total Sites" value={sites.length.toString()} />
        <StatCard icon={<Eye size={16} />} label="Total Visitors" value={sites.reduce((s, site) => s + site.visitors, 0).toLocaleString()} />
        <StatCard icon={<BarChart3 size={16} />} label="Total Views" value={sites.reduce((s, site) => s + site.views, 0).toLocaleString()} />
        <StatCard icon={<Check size={16} />} label="Published" value={sites.filter((s) => s.status === 'published').length.toString()} />
      </div>

      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="flex items-center flex-1 bg-[#1a1a24] border border-gray-800 rounded-lg px-3 py-2">
          <Search size={16} className="text-gray-500 mr-2" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search websites..." className="bg-transparent text-sm text-white placeholder-gray-500 outline-none flex-1" />
        </div>
      </div>

      {/* Sites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map((site) => (
          <div
            key={site.id}
            className="pod-card cursor-pointer hover:border-purple-500/30 transition-all group"
            onClick={() => setSelectedSite(site)}
          >
            <div className="aspect-[16/10] bg-[#0a0a0f] rounded-lg mb-4 flex items-center justify-center border border-gray-800/60 group-hover:border-purple-500/20 transition-all">
              <Globe size={32} className="text-gray-700 group-hover:text-purple-400 transition-colors" />
            </div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-white text-sm">{site.name}</h3>
                <p className="text-xs text-gray-500">{site.domain}</p>
              </div>
              <span className={`pod-badge-${site.status === 'published' ? 'green' : 'blue'}`}>{site.status}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
              <span>{site.template}</span>
              <span>&middot;</span>
              <span>{site.pages} pages</span>
              <span>&middot;</span>
              <span>{site.lastUpdated}</span>
            </div>
            {site.status === 'published' && (
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1 text-gray-400"><Eye size={12} /> {site.visitors.toLocaleString()}</span>
                <span className="flex items-center gap-1 text-gray-400"><BarChart3 size={12} /> {site.views.toLocaleString()}</span>
              </div>
            )}
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-800/60">
              <button onClick={(e) => { e.stopPropagation(); copyDomain(site.domain); }} className="p-1.5 text-gray-400 hover:text-white transition-colors" title="Copy URL">
                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
              </button>
              <button onClick={(e) => e.stopPropagation()} className="p-1.5 text-gray-400 hover:text-white transition-colors" title="Edit">
                <Edit3 size={14} />
              </button>
              <a href={`https://${site.domain}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-1.5 text-gray-400 hover:text-white transition-colors" title="Preview">
                <ExternalLink size={14} />
              </a>
              <button onClick={(e) => e.stopPropagation()} className="p-1.5 text-gray-400 hover:text-red-400 transition-colors ml-auto" title="Delete">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Site Detail Modal */}
      {selectedSite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => setSelectedSite(null)}>
          <div className="bg-[#111118] border border-gray-800 rounded-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto m-4" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-800 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">{selectedSite.name}</h2>
                <p className="text-sm text-gray-500">{selectedSite.domain}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`pod-badge-${selectedSite.status === 'published' ? 'green' : 'blue'}`}>{selectedSite.status}</span>
                <button onClick={() => setSelectedSite(null)} className="p-2 text-gray-400 hover:text-white"><Settings2 size={18} /></button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {selectedSite.analytics.length > 0 && (
                <div className="pod-card">
                  <h4 className="text-sm font-semibold text-white mb-4">Traffic (Last 7 Days)</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={selectedSite.analytics}>
                      <defs>
                        <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#9F7AEA" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#9F7AEA" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="day" stroke="#374151" fontSize={12} />
                      <YAxis stroke="#374151" fontSize={12} />
                      <Tooltip contentStyle={{ background: '#1a1a24', border: '1px solid #374151', borderRadius: '8px', color: '#fff' }} />
                      <Area type="monotone" dataKey="visitors" stroke="#9F7AEA" fillOpacity={1} fill="url(#colorVisitors)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
              <div className="grid grid-cols-3 gap-4">
                <div className="pod-card text-center">
                  <p className="text-xl font-bold text-white">{selectedSite.pages}</p>
                  <p className="text-xs text-gray-500">Pages</p>
                </div>
                <div className="pod-card text-center">
                  <p className="text-xl font-bold text-white">{selectedSite.visitors.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Visitors</p>
                </div>
                <div className="pod-card text-center">
                  <p className="text-xl font-bold text-white">{selectedSite.views.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Page Views</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => setShowCreate(false)}>
          <div className="bg-[#111118] border border-gray-800 rounded-xl w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-white mb-4">Create Website</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Site Name</label>
                <input className="w-full input-field" placeholder="My Awesome Site" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Domain</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">https://</span>
                  <input className="flex-1 input-field" placeholder="yoursite" />
                  <select className="input-field">
                    <option>.com</option>
                    <option>.co</option>
                    <option>.io</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Choose Template</label>
                <div className="grid grid-cols-2 gap-2">
                  {TEMPLATES.map((t) => (
                    <button key={t.id} className="p-3 bg-[#0a0a0f] border border-gray-800 rounded-lg hover:border-purple-500/30 transition-all text-left">
                      <div className="text-purple-400 mb-1">{t.icon}</div>
                      <p className="text-sm text-white font-medium">{t.name}</p>
                      <p className="text-xs text-gray-500">{t.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setShowCreate(false)} className="btn-secondary">Cancel</button>
                <button onClick={() => setShowCreate(false)} className="btn-primary">Create Website</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="pod-stat-card">
      <div className="flex items-center gap-2 text-gray-500">
        {icon}
        <span className="pod-stat-label">{label}</span>
      </div>
      <span className="pod-stat-value">{value}</span>
    </div>
  );
}