/******  COMING SOON BUILDER — Pre-launch waitlist pages  ******/
import React, { useState } from 'react';
import {
  Rocket, Palette, Type, Image, Mail, Share2, Copy, Check, Eye, Code,
  Smartphone, Monitor, Tablet, ChevronDown, Sparkles, Globe, Zap, Users,
  TrendingUp, ArrowRight, Loader2
} from 'lucide-react';

const TEMPLATES = [
  { id: 'minimal', name: 'Minimal', desc: 'Clean and focused', bg: 'from-gray-900 to-black' },
  { id: 'gradient', name: 'Gradient', desc: 'Bold and vibrant', bg: 'from-purple-900 via-pink-900 to-black' },
  { id: 'pattern', name: 'Pattern', desc: 'Playful textures', bg: 'from-blue-900 to-indigo-900' },
  { id: 'photo', name: 'Photo', desc: 'Image-driven', bg: 'from-gray-800 to-gray-900' },
];

const SAMPLE_PAGES = [
  { id: 1, name: 'Fashion Launch', domain: 'fashionforward.store', template: 'gradient', subscribers: 2340, status: 'live', created: '2026-01-10' },
  { id: 2, name: 'Fitness App', domain: 'fitnessapp.co', template: 'minimal', subscribers: 890, status: 'draft', created: '2026-01-12' },
  { id: 3, name: 'Art Collection', domain: 'artdrop.design', template: 'photo', subscribers: 0, status: 'draft', created: '2026-01-14' },
];

export default function ComingSoonBuilder() {
  const [pages, setPages] = useState(SAMPLE_PAGES);
  const [showCreate, setShowCreate] = useState(false);
  const [previewMode, setPreviewMode] = useState('desktop');
  const [copied, setCopied] = useState(false);

  const [builder, setBuilder] = useState({
    name: '',
    headline: 'Something Amazing is Coming',
    subtitle: 'Be the first to know when we launch.',
    ctaText: 'Get Early Access',
    template: 'gradient',
    brandColor: '#9F7AEA',
    showCountdown: true,
    showSocial: true,
    countdownDate: '2026-03-01',
  });

  const copyUrl = (domain) => {
    navigator.clipboard.writeText(`https://${domain}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pod-page-container space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Coming Soon Builder</h2>
          <p className="text-sm text-gray-400">Create viral pre-launch waitlist pages</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-primary flex items-center gap-2"><Rocket size={16} /> New Page</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <KpiCard icon={<Globe size={16} />} label="Pages" value={pages.length.toString()} />
        <KpiCard icon={<Users size={16} />} label="Total Subscribers" value={pages.reduce((s, p) => s + p.subscribers, 0).toLocaleString()} />
        <KpiCard icon={<TrendingUp size={16} />} label="Live Pages" value={pages.filter((p) => p.status === 'live').length.toString()} />
      </div>

      {/* Pages List */}
      <div className="space-y-3">
        {pages.map((page) => (
          <div key={page.id} className="pod-card flex items-center justify-between hover:border-purple-500/20 transition-all">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${TEMPLATES.find((t) => t.id === page.template)?.bg || 'from-gray-800 to-black'} flex items-center justify-center`}>
                <Rocket size={16} className="text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-white">{page.name}</h3>
                  <span className={`pod-badge-${page.status === 'live' ? 'green' : 'blue'} text-[10px]`}>{page.status}</span>
                </div>
                <p className="text-xs text-gray-500">{page.domain} &middot; {page.subscribers} subscribers</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => copyUrl(page.domain)} className="p-1.5 text-gray-400 hover:text-white"><Copy size={14} /></button>
              <button className="p-1.5 text-gray-400 hover:text-white"><Eye size={14} /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal with Builder */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => setShowCreate(false)}>
          <div className="bg-[#111118] border border-gray-800 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto m-4" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-xl font-bold text-white">Create Coming Soon Page</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Builder Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Page Name</label>
                  <input value={builder.name} onChange={(e) => setBuilder((b) => ({ ...b, name: e.target.value }))} placeholder="My Launch" className="w-full input-field" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Headline</label>
                  <input value={builder.headline} onChange={(e) => setBuilder((b) => ({ ...b, headline: e.target.value }))} className="w-full input-field" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Subtitle</label>
                  <input value={builder.subtitle} onChange={(e) => setBuilder((b) => ({ ...b, subtitle: e.target.value }))} className="w-full input-field" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">CTA Button Text</label>
                  <input value={builder.ctaText} onChange={(e) => setBuilder((b) => ({ ...b, ctaText: e.target.value }))} className="w-full input-field" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-2">Template</label>
                  <div className="grid grid-cols-2 gap-2">
                    {TEMPLATES.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setBuilder((b) => ({ ...b, template: t.id }))}
                        className={`p-3 rounded-xl border text-left transition-all ${builder.template === t.id ? 'border-purple-500 bg-purple-500/10' : 'border-gray-800 bg-[#0a0a0f]'}`}
                      >
                        <div className={`w-full h-8 rounded-lg bg-gradient-to-r ${t.bg} mb-2`} />
                        <p className="text-xs font-medium text-white">{t.name}</p>
                        <p className="text-[10px] text-gray-500">{t.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-gray-400">Preview</p>
                  <div className="flex items-center gap-1 bg-[#1a1a24] rounded-lg p-1">
                    <button onClick={() => setPreviewMode('desktop')} className={`p-1 rounded ${previewMode === 'desktop' ? 'bg-purple-500/20 text-purple-400' : 'text-gray-500'}`}><Monitor size={12} /></button>
                    <button onClick={() => setPreviewMode('tablet')} className={`p-1 rounded ${previewMode === 'tablet' ? 'bg-purple-500/20 text-purple-400' : 'text-gray-500'}`}><Tablet size={12} /></button>
                    <button onClick={() => setPreviewMode('mobile')} className={`p-1 rounded ${previewMode === 'mobile' ? 'bg-purple-500/20 text-purple-400' : 'text-gray-500'}`}><Smartphone size={12} /></button>
                  </div>
                </div>
                <div className={`mx-auto rounded-xl overflow-hidden border border-gray-800 ${previewMode === 'desktop' ? 'w-full' : previewMode === 'tablet' ? 'w-64' : 'w-48'}`}>
                  <div className={`aspect-[9/16] bg-gradient-to-br ${TEMPLATES.find((t) => t.id === builder.template)?.bg || 'from-purple-900 to-black'} flex flex-col items-center justify-center p-4 text-center`}>
                    <Rocket size={24} className="text-white/80 mb-3" />
                    <h4 className="text-sm font-bold text-white mb-1">{builder.headline}</h4>
                    <p className="text-[10px] text-white/70 mb-3">{builder.subtitle}</p>
                    <div className="w-full max-w-[140px] flex gap-1 mb-3">
                      <input placeholder="Email" className="flex-1 bg-white/10 border border-white/20 rounded px-2 py-1 text-[10px] text-white placeholder-white/40" />
                    </div>
                    <button className="px-4 py-1.5 rounded-lg text-[10px] font-medium text-white" style={{ backgroundColor: builder.brandColor }}>
                      {builder.ctaText}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-800 flex justify-end gap-2">
              <button onClick={() => setShowCreate(false)} className="btn-secondary">Cancel</button>
              <button onClick={() => setShowCreate(false)} className="btn-primary flex items-center gap-2"><Rocket size={16} /> Create Page</button>
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