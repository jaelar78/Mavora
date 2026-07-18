/******  AI OPTIMIZER — One-click content optimization  ******/
import React, { useState } from 'react';
import {
  Wand2, Type, Hash, Image, BarChart3, Sparkles, Zap, Check, Copy, RefreshCw,
  TrendingUp, Clock, Target, AlertCircle, ChevronRight, Loader2, Lightbulb
} from 'lucide-react';

const OPTIMIZATION_TYPES = [
  { id: 'caption', label: 'Caption', icon: Type, desc: 'Rewrite for engagement' },
  { id: 'hashtags', label: 'Hashtags', icon: Hash, desc: 'Optimize tag strategy' },
  { id: 'headline', label: 'Headline', icon: Type, desc: 'Craft click-worthy titles' },
  { id: 'cta', label: 'Call-to-Action', icon: Target, desc: 'Improve conversions' },
  { id: 'image', label: 'Image Prompt', icon: Image, desc: 'Better visual descriptions' },
  { id: 'bio', label: 'Bio / About', icon: Type, desc: 'Optimize profile text' },
];

const TONES = ['More Engaging', 'More Professional', 'More Playful', 'Shorter', 'Longer', 'More Urgent'];

export default function AIOptimizer() {
  const [selectedType, setSelectedType] = useState('caption');
  const [input, setInput] = useState('');
  const [tone, setTone] = useState('More Engaging');
  const [optimizing, setOptimizing] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);

  const optimize = () => {
    if (!input.trim()) return;
    setOptimizing(true);
    setResult(null);
    setTimeout(() => {
      const optimized = generateOptimization(selectedType, input, tone);
      setResult(optimized);
      setHistory((prev) => [{ id: Date.now(), type: selectedType, original: input, optimized, tone }, ...prev.slice(0, 9)]);
      setOptimizing(false);
    }, 2000);
  };

  const copyResult = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pod-page-container max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white mb-1">AI Optimizer</h2>
        <p className="text-sm text-gray-400">One-click optimization for all your content</p>
      </div>

      {/* Type Selector */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {OPTIMIZATION_TYPES.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => { setSelectedType(type.id); setResult(null); }}
              className={`p-3 rounded-xl border text-left transition-all ${
                selectedType === type.id
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-gray-800 bg-[#111118] hover:border-gray-700'
              }`}
            >
              <Icon size={16} className={selectedType === type.id ? 'text-purple-400' : 'text-gray-500'} />
              <p className="text-xs font-medium text-white mt-1.5">{type.label}</p>
              <p className="text-[10px] text-gray-500">{type.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Input */}
      <div className="pod-card space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Your {OPTIMIZATION_TYPES.find((t) => t.id === selectedType)?.label}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Paste your ${selectedType} here...`}
            rows={4}
            className="w-full input-field resize-none"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Optimization Goal</label>
          <div className="flex flex-wrap gap-2">
            {TONES.map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
                  tone === t ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-[#1a1a24] text-gray-400 border border-gray-800 hover:border-gray-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={optimize}
          disabled={!input.trim() || optimizing}
          className="btn-primary flex items-center gap-2 disabled:opacity-50"
        >
          {optimizing ? <Loader2 size={16} className="animate-spin" /> : <Wand2 size={16} />}
          {optimizing ? 'Optimizing...' : 'Optimize'}
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="pod-card space-y-4 animate-in fade-in duration-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-purple-400" />
              <h3 className="text-sm font-semibold text-white">Optimized Result</h3>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={copyResult} className="p-1.5 text-gray-400 hover:text-purple-400 transition-colors">
                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
              </button>
              <button onClick={optimize} className="p-1.5 text-gray-400 hover:text-purple-400 transition-colors">
                <RefreshCw size={14} />
              </button>
            </div>
          </div>
          <div className="bg-[#0a0a0f] border border-gray-800 rounded-xl p-4">
            <p className="text-sm text-gray-200 whitespace-pre-line">{result.text}</p>
          </div>
          {/* Metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#0a0a0f] border border-gray-800 rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-green-400">{result.improvements.engagement}</p>
              <p className="text-[10px] text-gray-500">Est. Engagement</p>
            </div>
            <div className="bg-[#0a0a0f] border border-gray-800 rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-purple-400">{result.improvements.readability}</p>
              <p className="text-[10px] text-gray-500">Readability</p>
            </div>
            <div className="bg-[#0a0a0f] border border-gray-800 rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-blue-400">{result.improvements.cta}</p>
              <p className="text-[10px] text-gray-500">CTA Strength</p>
            </div>
          </div>
          {/* Suggestions */}
          {result.suggestions.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Additional Suggestions</h4>
              {result.suggestions.map((s, i) => (
                <div key={i} className="flex items-start gap-2 p-2 bg-[#0a0a0f] rounded-lg">
                  <Lightbulb size={12} className="text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-300">{s}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="pod-card">
          <h3 className="text-sm font-semibold text-white mb-3">Recent Optimizations</h3>
          <div className="space-y-2">
            {history.map((h) => (
              <div key={h.id} className="flex items-center justify-between p-2 bg-[#0a0a0f] rounded-lg">
                <div className="min-w-0">
                  <p className="text-xs text-gray-300 truncate">{h.original.substring(0, 50)}...</p>
                  <p className="text-[10px] text-gray-500">{h.type} &middot; {h.tone}</p>
                </div>
                <span className="pod-badge-purple text-[10px]">{h.type}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Optimization Generator ───
function generateOptimization(type, input, tone) {
  const optimizations = {
    caption: {
      text: `✨ ${input}\n\n💡 ${tone === 'More Engaging' ? 'Double-tap if you agree!' : tone === 'More Professional' ? 'Share your thoughts in the comments.' : 'Drop a 🔥 if this resonates!'}\n\n👇 What's your take? Let me know below!`,
      improvements: { engagement: '+32%', readability: '+18%', cta: '+45%' },
      suggestions: ['Add 2-3 relevant emojis', 'Include a question to boost comments', 'Tag relevant accounts'],
    },
    hashtags: {
      text: `#${input.replace(/\s+/g, '')} #contentcreator #growth #strategy #trending2026 #community #creatorlife #socialmedia #digitalmarketing #influencer #brandbuilding #engagement #viral #explore`,
      improvements: { engagement: '+28%', readability: '+15%', cta: '+10%' },
      suggestions: ['Use 20-30 hashtags for best reach', 'Mix popular and niche tags', 'Create a branded hashtag'],
    },
    headline: {
      text: tone === 'More Urgent' ? `STOP: ${input} (Before It's Too Late)` : `${input}: The Complete 2026 Guide`,
      improvements: { engagement: '+45%', readability: '+22%', cta: '+60%' },
      suggestions: ['Use numbers for higher CTR', 'Add brackets [Guide]', 'Keep under 60 characters'],
    },
    cta: {
      text: tone === 'More Urgent' ? `⚠️ Only 24 hours left! ${input} — Don't miss out. Click the link NOW! 👇` : `✨ Ready to get started? ${input} Click the link below to learn more! 👇`,
      improvements: { engagement: '+38%', readability: '+20%', cta: '+55%' },
      suggestions: ['Use action verbs', 'Create urgency with time limits', 'Make the benefit clear'],
    },
    image: {
      text: `A stunning, high-quality visual featuring ${input}. Bright, eye-catching colors with a modern aesthetic. Clean composition with focal point centered. Professional photography style with subtle gradients and soft lighting. Instagram-optimized 4:5 ratio.`,
      improvements: { engagement: '+25%', readability: '+30%', cta: '+15%' },
      suggestions: ['Use bright, contrasting colors', 'Keep the composition clean', 'Add subtle text overlay'],
    },
    bio: {
      text: `🎯 ${input}\n✨ Helping you grow\n📩 DM for collabs\n👇 Free guide below`,
      improvements: { engagement: '+30%', readability: '+25%', cta: '+40%' },
      suggestions: ['Include keywords for searchability', 'Add a clear CTA', 'Use line breaks for readability'],
    },
  };

  return optimizations[type] || optimizations.caption;
}