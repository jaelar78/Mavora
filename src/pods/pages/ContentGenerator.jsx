/******  CONTENT GENERATOR — AI-powered caption, hashtag & content creation  ******/
import React, { useState } from 'react';
import {
  Wand2, Type, Hash, Image, FileText, Copy, Check, Sparkles, RefreshCw,
  Bookmark, Download, Calendar, Clock, Instagram, Youtube, Twitter,
  ChevronDown, Loader2, Lightbulb, TrendingUp, Zap
} from 'lucide-react';

const CONTENT_TYPES = [
  { id: 'caption', label: 'Caption', icon: Type, placeholder: 'Describe your post topic...' },
  { id: 'hashtags', label: 'Hashtags', icon: Hash, placeholder: 'Enter your topic for hashtags...' },
  { id: 'carousel', label: 'Carousel', icon: Image, placeholder: 'What is your carousel about?' },
  { id: 'script', label: 'Video Script', icon: FileText, placeholder: 'Describe your video topic...' },
];

const TONES = ['Casual', 'Professional', 'Playful', 'Inspirational', 'Educational', 'Bold', 'Witty'];
const PLATFORMS = ['Instagram', 'TikTok', 'YouTube', 'Twitter', 'LinkedIn', 'Facebook'];

export default function ContentGenerator() {
  const [contentType, setContentType] = useState('caption');
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Casual');
  const [platform, setPlatform] = useState('Instagram');
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState([]);

  const generate = () => {
    if (!topic.trim()) return;
    setGenerating(true);
    setResult(null);
    setTimeout(() => {
      setResult(generateContent(contentType, topic, tone, platform));
      setGenerating(false);
    }, 2000);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const saveContent = () => {
    if (!result) return;
    setSaved((prev) => [...prev, { id: Date.now(), type: contentType, topic, preview: result.text?.substring(0, 60) || result, date: new Date().toLocaleDateString() }]);
  };

  return (
    <div className="pod-page-container max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Content Generator</h2>
        <p className="text-sm text-gray-400">AI-powered content creation for your pod</p>
      </div>

      {/* Content Type Selector */}
      <div className="grid grid-cols-4 gap-2">
        {CONTENT_TYPES.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => { setContentType(type.id); setResult(null); }}
              className={`p-3 rounded-xl border text-left transition-all ${
                contentType === type.id
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-gray-800 bg-[#111118] hover:border-gray-700'
              }`}
            >
              <Icon size={18} className={contentType === type.id ? 'text-purple-400' : 'text-gray-500'} />
              <p className="text-sm font-medium text-white mt-2">{type.label}</p>
            </button>
          );
        })}
      </div>

      {/* Input Panel */}
      <div className="pod-card space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Topic</label>
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={CONTENT_TYPES.find((c) => c.id === contentType)?.placeholder}
            className="w-full input-field"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Platform</label>
            <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="w-full input-field">
              {PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Tone</label>
            <select value={tone} onChange={(e) => setTone(e.target.value)} className="w-full input-field">
              {TONES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <button
          onClick={generate}
          disabled={!topic.trim() || generating}
          className="btn-primary flex items-center gap-2 disabled:opacity-50"
        >
          {generating ? <Loader2 size={16} className="animate-spin" /> : <Wand2 size={16} />}
          {generating ? 'Generating...' : `Generate ${CONTENT_TYPES.find((c) => c.id === contentType)?.label}`}
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="pod-card space-y-4 animate-in fade-in duration-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-purple-400" />
              <h3 className="text-sm font-semibold text-white">Generated {CONTENT_TYPES.find((c) => c.id === contentType)?.label}</h3>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={saveContent} className="p-1.5 text-gray-400 hover:text-purple-400 transition-colors" title="Save"><Bookmark size={14} /></button>
              <button onClick={() => copyToClipboard(result.text || result)} className="p-1.5 text-gray-400 hover:text-purple-400 transition-colors" title="Copy">
                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
              </button>
              <button onClick={generate} className="p-1.5 text-gray-400 hover:text-purple-400 transition-colors" title="Regenerate"><RefreshCw size={14} /></button>
            </div>
          </div>
          <div className="bg-[#0a0a0f] border border-gray-800 rounded-xl p-4">
            {typeof result === 'string' ? (
              <pre className="text-sm text-gray-200 whitespace-pre-wrap font-sans">{result}</pre>
            ) : result.slides ? (
              <div className="space-y-3">
                <h4 className="font-semibold text-white">{result.title}</h4>
                {result.slides.map((slide, i) => (
                  <div key={i} className="p-3 bg-[#111118] border border-gray-800 rounded-lg">
                    <p className="text-xs text-purple-400 mb-1">Slide {i + 1}</p>
                    <p className="text-sm text-gray-200">{slide}</p>
                  </div>
                ))}
              </div>
            ) : (
              <pre className="text-sm text-gray-200 whitespace-pre-wrap font-sans">{result.text || JSON.stringify(result, null, 2)}</pre>
            )}
          </div>
          {result.hashtags && (
            <div className="flex flex-wrap gap-1">
              {result.hashtags.split(' ').map((h) => (
                <span key={h} className="px-2 py-0.5 text-[10px] bg-purple-500/10 text-purple-400 rounded-full">{h}</span>
              ))}
            </div>
          )}
          {result.bestTime && (
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Clock size={12} /> Best time to post: {result.bestTime}
            </div>
          )}
        </div>
      )}

      {/* Saved Content */}
      {saved.length > 0 && (
        <div className="pod-card">
          <h3 className="text-sm font-semibold text-white mb-3">Saved ({saved.length})</h3>
          <div className="space-y-2">
            {saved.map((s) => (
              <div key={s.id} className="flex items-center justify-between p-2 bg-[#0a0a0f] rounded-lg">
                <div>
                  <p className="text-xs text-gray-200">{s.preview}...</p>
                  <p className="text-[10px] text-gray-500">{s.type} &middot; {s.topic} &middot; {s.date}</p>
                </div>
                <button onClick={() => copyToClipboard(s.preview)} className="p-1 text-gray-500 hover:text-purple-400"><Copy size={12} /></button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function generateContent(type, topic, tone, platform) {
  const contents = {
    caption: {
      text: `✨ ${topic} just leveled up!\n\nHere's the game plan:\n→ Start with what you know\n→ Build consistency, not perfection\n→ Let your authentic voice shine\n\nThe real secret? Showing up every single day. 💯\n\nWhat's your biggest win with ${topic}? Drop it below! 👇`,
      hashtags: `#${topic.toLowerCase().replace(/\s+/g, '')} #contentcreator #growthmindset #creatorlife #socialmedia #strategy #trending #community #buildinpublic #authenticity`,
      bestTime: 'Tuesday 11:00 AM - 1:00 PM',
    },
    hashtags: `#${topic.toLowerCase().replace(/\s+/g, '')} #${topic.toLowerCase().replace(/\s+/g, '')}tips #contentcreator #creatorlife #socialmediatips #growthhacking #digitalmarketing #influencer #brandbuilding #community #viral #trending2026 #explore #fyp #instagood`,
    carousel: {
      title: `${topic}: The Ultimate Guide`,
      slides: [
        `🎯 The Complete ${topic} Playbook`,
        `❌ Mistake #1: Overcomplicating things. Keep it simple.`,
        `✅ Strategy: Focus on one platform, master it, then expand.`,
        `📈 Growth Hack: Engage with 20 accounts before posting.`,
        `🚀 Your Action Plan for this week 👇`,
      ],
    },
    script: `[HOOK - 0-3s]\n"If you're struggling with ${topic}, stop scrolling."\n\n[VALUE - 3-25s]\n"I spent 6 months figuring this out. Here are the 3 things that actually moved the needle..."\n\n[CTA - 25-30s]\n"Follow for more ${topic} tips. Save this for later!"`,
  };
  return contents[type] || contents.caption;
}