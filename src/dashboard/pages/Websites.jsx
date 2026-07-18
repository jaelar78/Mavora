import { useState } from 'react';
import {
  Globe,
  Plus,
  ExternalLink,
  BarChart3,
  RefreshCw,
  Trash2,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

/* ─── Mock data ─── */
const INITIAL_WEBSITES = [
  {
    id: 1,
    name: 'Aurora Skincare',
    url: 'https://auroraskincare.com.au',
    status: 'active',
    lastAnalyzed: '2 hours ago',
    pages: 24,
    score: 87,
  },
  {
    id: 2,
    name: 'Summit Trail Co',
    url: 'https://summittrailco.com',
    status: 'active',
    lastAnalyzed: '1 day ago',
    pages: 18,
    score: 92,
  },
  {
    id: 3,
    name: 'Coastal Living AU',
    url: 'https://coastalliving.com.au',
    status: 'pending',
    lastAnalyzed: '—',
    pages: 0,
    score: null,
  },
];

export default function Websites() {
  const [websites, setWebsites] = useState(INITIAL_WEBSITES);
  const [showAdd, setShowAdd] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newName, setNewName] = useState('');

  const handleAdd = () => {
    if (!newUrl.trim() || !newName.trim()) return;
    const newSite = {
      id: Date.now(),
      name: newName.trim(),
      url: newUrl.trim().startsWith('http') ? newUrl.trim() : `https://${newUrl.trim()}`,
      status: 'pending',
      lastAnalyzed: '—',
      pages: 0,
      score: null,
    };
    setWebsites([newSite, ...websites]);
    setNewUrl('');
    setNewName('');
    setShowAdd(false);
  };

  const handleDelete = (id) => {
    setWebsites(websites.filter((w) => w.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#3D3632] font-serif">Websites</h1>
          <p className="text-sm text-[#9E9484] mt-0.5">Manage and analyze your websites.</p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 px-4 py-2 bg-[#3D3632] text-[#FAF9F7] rounded-lg text-sm font-medium hover:bg-[#4A433E] transition-colors"
        >
          <Plus size={16} />
          Add Website
        </button>
      </div>

      {/* Add website form */}
      {showAdd && (
        <div className="bg-white rounded-xl border border-[#E8E2D9] p-5 shadow-premium">
          <h3 className="text-sm font-semibold text-[#3D3632] mb-3">Add New Website</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#6B6560] mb-1">Website Name</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Aurora Skincare"
                className="w-full px-3 py-2 border border-[#E8E2D9] rounded-lg text-sm text-[#3D3632] placeholder:text-[#9E9484] bg-[#FAF9F7] focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/30 focus:border-[#C9A96E]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#6B6560] mb-1">Website URL</label>
              <input
                type="text"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-3 py-2 border border-[#E8E2D9] rounded-lg text-sm text-[#3D3632] placeholder:text-[#9E9484] bg-[#FAF9F7] focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/30 focus:border-[#C9A96E]"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-3">
            <button
              onClick={() => setShowAdd(false)}
              className="px-4 py-2 text-sm text-[#6B6560] hover:text-[#3D3632] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-[#C9A96E] text-white rounded-lg text-sm font-medium hover:bg-[#B8985A] transition-colors"
            >
              Add Website
            </button>
          </div>
        </div>
      )}

      {/* Websites list */}
      <div className="space-y-3">
        {websites.map((site) => (
          <div
            key={site.id}
            className="bg-white rounded-xl border border-[#E8E2D9] p-5 shadow-premium card-lift"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-[#C9A96E]/10 rounded-lg">
                  <Globe size={20} className="text-[#C9A96E]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-[#3D3632]">{site.name}</h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        site.status === 'active'
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'bg-amber-50 text-amber-600'
                      }`}
                    >
                      {site.status === 'active' ? 'Active' : 'Pending'}
                    </span>
                  </div>
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#9E9484] hover:text-[#C9A96E] flex items-center gap-0.5 mt-0.5 transition-colors"
                  >
                    {site.url}
                    <ExternalLink size={10} />
                  </a>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-[11px] text-[#9E9484]">
                      Last analyzed: {site.lastAnalyzed}
                    </span>
                    {site.pages > 0 && (
                      <span className="text-[11px] text-[#9E9484]">
                        {site.pages} pages
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {site.score && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF9F7] rounded-lg">
                    <BarChart3 size={14} className="text-[#C9A96E]" />
                    <span className="text-xs font-semibold text-[#3D3632]">{site.score}</span>
                    <span className="text-[10px] text-[#9E9484]">score</span>
                  </div>
                )}
                <button
                  title="Re-analyze"
                  className="p-2 rounded-lg hover:bg-[#E8E2D9]/50 transition-colors"
                >
                  <RefreshCw size={15} className="text-[#9E9484]" />
                </button>
                <button
                  title="Delete"
                  onClick={() => handleDelete(site.id)}
                  className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={15} className="text-red-400" />
                </button>
              </div>
            </div>

            {/* Analysis preview */}
            {site.status === 'active' && (
              <div className="mt-4 pt-4 border-t border-[#E8E2D9]/50 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'SEO Score', value: `${site.score}%`, icon: CheckCircle },
                  { label: 'Load Time', value: '1.2s', icon: RefreshCw },
                  { label: 'Mobile', value: '97/100', icon: CheckCircle },
                  { label: 'Issues', value: '3', icon: AlertCircle },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-2">
                      <Icon size={14} className="text-[#9E9484]" />
                      <div>
                        <p className="text-[10px] text-[#9E9484]">{item.label}</p>
                        <p className="text-xs font-medium text-[#3D3632]">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
