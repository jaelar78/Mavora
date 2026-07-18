import { useState } from 'react';
import {
  PenTool,
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  Download,
  Settings,
} from 'lucide-react';

const CONTENT_TYPES = [
  { id: 'instagram', label: 'Instagram Post', icon: '📸' },
  { id: 'facebook', label: 'Facebook Ad', icon: '📘' },
  { id: 'tiktok', label: 'TikTok Script', icon: '🎵' },
  { id: 'blog', label: 'Blog Post', icon: '✍️' },
  { id: 'google', label: 'Google Ad', icon: '🔍' },
  { id: 'email', label: 'Email', icon: '📧' },
];

const TONES = [
  { id: 'professional', label: 'Professional' },
  { id: 'casual', label: 'Casual' },
  { id: 'luxury', label: 'Luxury' },
  { id: 'playful', label: 'Playful' },
  { id: 'educational', label: 'Educational' },
];

function GeneratedContentCard({ type, onCopy }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-[#E8E2D9] p-5 shadow-premium">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{type.icon}</span>
          <h3 className="text-sm font-semibold text-[#3D3632]">{type.label}</h3>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg hover:bg-[#E8E2D9]/50 transition-colors"
            title="Copy"
          >
            {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} className="text-[#9E9484]" />}
          </button>
          <button className="p-1.5 rounded-lg hover:bg-[#E8E2D9]/50 transition-colors" title="Regenerate">
            <RefreshCw size={14} className="text-[#9E9484]" />
          </button>
        </div>
      </div>
      <div className="bg-[#FAF9F7] rounded-lg p-3 border border-[#E8E2D9]">
        <p className="text-xs text-[#6B6560] leading-relaxed">
          {type.id === 'instagram' &&
            `✨ Meet the new Aurora Glow Serum — your skin's new best friend. Handcrafted in Australia with native botanicals. Tap the link in bio to shop!\n\n#AuroraSkincare #AustralianBeauty #GlowUp #CleanBeauty #SkincareRoutine`}
          {type.id === 'facebook' &&
            `🌿 Introducing Aurora Skincare's Summer Collection\n\nNatural ingredients. Real results. Australian made.\n\nShop now and get 20% off your first order with code AURORA20.`}
          {type.id === 'tiktok' &&
            `HOOK: "I thought my skincare routine was complete until I tried THIS..."\n\n[Scene 1: Morning routine, picking up serum]\nVO: "Aurora Glow Serum. Australian botanicals. One drop."\n\n[Scene 2: Close-up of glowing skin]\nText overlay: "3 weeks later"\n\n[Scene 3: Product shot with price]\nCTA: "Link in bio — 20% off"`}
          {type.id === 'blog' &&
            `Why Australian Botanicals Are Taking Over Skincare in 2025\n\nFrom Kakadu plum to Tasmanian pepperberry, Australian native ingredients are becoming the gold standard in clean beauty...`}
          {type.id === 'google' &&
            `Headlines:\n1. Aurora Skincare AU | 20% Off\n2. Natural Australian Skincare\n3. Shop the Glow Serum\n\nDescription:\nHandcrafted in Australia. Native botanicals. Real results. Free shipping over $50. Shop the Summer Collection now.`}
          {type.id === 'email' &&
            `Subject: Your glow-up starts here ✨\n\nHi there,\n\nReady to transform your skincare routine?\n\nMeet the Aurora Glow Serum — our bestselling product, now back in stock.\n\n→ Shop now with 20% off: [LINK]`}
        </p>
      </div>
      <div className="flex items-center justify-between mt-3">
        <span className="text-[10px] text-[#9E9484]">Generated just now</span>
        <button className="flex items-center gap-1 text-[11px] text-[#C9A96E] hover:text-[#B8985A] font-medium transition-colors">
          <Download size={12} />
          Export
        </button>
      </div>
    </div>
  );
}

export default function ContentEngine() {
  const [selectedType, setSelectedType] = useState('instagram');
  const [brand, setBrand] = useState('');
  const [product, setProduct] = useState('');
  const [tone, setTone] = useState('professional');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 1500);
  };

  const currentType = CONTENT_TYPES.find((t) => t.id === selectedType);

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#3D3632] font-serif">Content Engine</h1>
        <p className="text-sm text-[#9E9484] mt-0.5">AI-powered content generation for all platforms.</p>
      </div>

      {/* Configuration panel */}
      <div className="bg-white rounded-xl border border-[#E8E2D9] p-5 shadow-premium">
        <div className="flex items-center gap-2 mb-4">
          <Settings size={16} className="text-[#C9A96E]" />
          <h3 className="text-sm font-semibold text-[#3D3632]">Content Configuration</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Content type */}
          <div>
            <label className="block text-xs font-medium text-[#6B6560] mb-1.5">Content Type</label>
            <select
              value={selectedType}
              onChange={(e) => { setSelectedType(e.target.value); setGenerated(false); }}
              className="w-full px-3 py-2 border border-[#E8E2D9] rounded-lg text-sm text-[#3D3632] bg-[#FAF9F7] focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/30 focus:border-[#C9A96E]"
            >
              {CONTENT_TYPES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.icon} {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Brand */}
          <div>
            <label className="block text-xs font-medium text-[#6B6560] mb-1.5">Brand Name</label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="e.g. Aurora Skincare"
              className="w-full px-3 py-2 border border-[#E8E2D9] rounded-lg text-sm text-[#3D3632] placeholder:text-[#9E9484] bg-[#FAF9F7] focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/30 focus:border-[#C9A96E]"
            />
          </div>

          {/* Product */}
          <div>
            <label className="block text-xs font-medium text-[#6B6560] mb-1.5">Product/Offer</label>
            <input
              type="text"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder="e.g. Summer Serum"
              className="w-full px-3 py-2 border border-[#E8E2D9] rounded-lg text-sm text-[#3D3632] placeholder:text-[#9E9484] bg-[#FAF9F7] focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/30 focus:border-[#C9A96E]"
            />
          </div>

          {/* Tone */}
          <div>
            <label className="block text-xs font-medium text-[#6B6560] mb-1.5">Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full px-3 py-2 border border-[#E8E2D9] rounded-lg text-sm text-[#3D3632] bg-[#FAF9F7] focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/30 focus:border-[#C9A96E]"
            >
              {TONES.map((t) => (
                <option key={t.id} value={t.id}>{t.label}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={generating}
          className="mt-4 flex items-center gap-2 px-5 py-2.5 bg-[#C9A96E] text-white rounded-lg text-sm font-medium hover:bg-[#B8985A] transition-colors disabled:opacity-50"
        >
          <Sparkles size={16} />
          {generating ? 'Generating...' : 'Generate Content'}
        </button>
      </div>

      {/* Generated content */}
      {generated && currentType && (
        <div className="animate-fade-in-up">
          <GeneratedContentCard
            type={currentType}
            onCopy={() => {}}
          />
        </div>
      )}

      {/* Content type selector cards */}
      <div>
        <h3 className="text-sm font-semibold text-[#3D3632] mb-3">All Content Types</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CONTENT_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => { setSelectedType(type.id); setGenerated(false); }}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                selectedType === type.id
                  ? 'border-[#C9A96E] bg-[#C9A96E]/5'
                  : 'border-[#E8E2D9] bg-white hover:border-[#C9A96E]/30'
              }`}
            >
              <span className="text-2xl">{type.icon}</span>
              <span className="text-xs font-medium text-[#3D3632]">{type.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
