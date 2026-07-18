/******  CONTENT ENGINE — AI-Powered Content Creation  ******/
import React, { useState } from 'react';
import {
  FileText, Wand2, Copy, Check, Sparkles, Type, Image as ImageIcon, Hash,
  Calendar, Clock, Instagram, Youtube, Twitter, Bookmark, Download, RefreshCw,
  ChevronRight, Zap, Flame, TrendingUp, Star, Layout, Filter
} from 'lucide-react';

const CONTENT_TYPES = [
  { id: 'caption',     label: 'Caption',      icon: Type,        desc: 'Social media captions' },
  { id: 'hashtags',    label: 'Hashtags',     icon: Hash,        desc: 'Optimized hashtag sets' },
  { id: 'carousel',    label: 'Carousel',     icon: Layout,      desc: 'Multi-slide content' },
  { id: 'script',      label: 'Video Script', icon: FileText,    desc: 'Short-form video scripts' },
  { id: 'blog',        label: 'Blog Post',    icon: FileText,    desc: 'Long-form blog content' },
  { id: 'email',       label: 'Email',        icon: FileText,    desc: 'Newsletter & email copy' },
];

const TONES = ['Professional', 'Casual', 'Playful', 'Inspirational', 'Educational', 'Bold', 'Witty'];
const PLATFORMS = ['Instagram', 'TikTok', 'YouTube', 'Twitter', 'LinkedIn', 'Facebook'];

export default function ContentEngine() {
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
      const outputs = {
        caption: generateCaption(topic, tone, platform),
        hashtags: generateHashtags(topic, platform),
        carousel: generateCarousel(topic, tone),
        script: generateScript(topic, tone),
        blog: generateBlog(topic, tone),
        email: generateEmail(topic, tone),
      };
      setResult(outputs[contentType] || outputs.caption);
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
    setSaved((prev) => [...prev, { id: Date.now(), type: contentType, topic, content: typeof result === 'string' ? result : result.title || 'Generated content', date: new Date().toISOString() }]);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Content Engine</h1>
          <p className="text-sm text-gray-400 mt-1">AI-powered content generation for every format</p>
        </div>
      </div>

      {/* Content Type Selector */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
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
              <p className="text-xs text-gray-500">{type.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Input Panel */}
      <div className="pod-card space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-400 mb-1">Topic or Prompt</label>
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={`What should the ${contentType} be about?`}
              className="w-full input-field"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Platform</label>
            <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="w-full input-field">
              {PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Tone</label>
          <div className="flex flex-wrap gap-2">
            {TONES.map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-all ${
                  tone === t ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-[#1a1a24] text-gray-400 border border-gray-800 hover:border-gray-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={generate}
          disabled={!topic.trim() || generating}
          className="btn-primary flex items-center gap-2 disabled:opacity-50"
        >
          {generating ? <RefreshCw size={16} className="animate-spin" /> : <Wand2 size={16} />}
          {generating ? 'Generating...' : 'Generate Content'}
        </button>
      </div>

      {/* Output */}
      {result && (
        <div className="pod-card space-y-4 animate-in fade-in duration-500">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Generated {CONTENT_TYPES.find((c) => c.id === contentType)?.label}</h3>
            <div className="flex items-center gap-2">
              <button onClick={saveContent} className="p-2 text-gray-400 hover:text-purple-400 transition-colors" title="Save">
                <Bookmark size={16} />
              </button>
              <button onClick={() => copyToClipboard(typeof result === 'string' ? result : result.text || result.title)} className="p-2 text-gray-400 hover:text-purple-400 transition-colors" title="Copy">
                {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
              </button>
              <button onClick={generate} className="p-2 text-gray-400 hover:text-purple-400 transition-colors" title="Regenerate">
                <RefreshCw size={16} />
              </button>
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
              <pre className="text-sm text-gray-200 whitespace-pre-wrap font-sans">{result.text || result.title}</pre>
            )}
          </div>
        </div>
      )}

      {/* Saved Content */}
      {saved.length > 0 && (
        <div className="pod-card">
          <h3 className="text-lg font-semibold text-white mb-4">Saved Content</h3>
          <div className="space-y-2">
            {saved.map((s) => (
              <div key={s.id} className="flex items-center justify-between p-3 bg-[#0a0a0f] rounded-lg">
                <div>
                  <p className="text-sm text-gray-200 font-medium">{s.content.substring(0, 60)}...</p>
                  <p className="text-xs text-gray-500">{s.type} &middot; {s.topic}</p>
                </div>
                <button onClick={() => copyToClipboard(s.content)} className="p-1.5 text-gray-400 hover:text-purple-400">
                  <Copy size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Content Generators ───
function generateCaption(topic, tone, platform) {
  const captions = {
    Professional: `We\'re excited to share our latest insights on ${topic}. After extensive research and hands-on experience, we\'ve compiled the key takeaways that matter most.\n\nSwipe through to discover:\n1. The fundamentals you need to know\n2. Advanced strategies for growth\n3. Common pitfalls to avoid\n\nWhat\'s your experience with ${topic}? We\'d love to hear your thoughts in the comments.`,
    Casual: `Okay so ${topic} is literally taking over my feed right now and I had to share my thoughts 😅\n\nHere\'s what I\'ve learned:\n✨ Start simple, don\'t overthink it\n✨ Consistency > perfection always\n✨ Your community wants the real you\n\nWho else is obsessed with ${topic} rn? Drop a 🙋‍♀️ below!`,
    Playful: `*dramatically enters chat*\n\nDid someone say ${topic}?! Because I have THOUGHTS. And feelings. And a whole carousel of hot takes.\n\nBuckle up bestie, we\'re going on a journey 🎢\n\nWhat\'s YOUR hot take on ${topic}? Don\'t be shy 👇`,
    Inspirational: `Your journey with ${topic} starts with a single step. Today. Right now.\n\nI believe in you because I\'ve been where you are. The doubt, the uncertainty, the "what if I fail?"\n\nBut here\'s what I know for sure:\n💫 You are capable\n💫 You are worthy\n💫 Your story matters\n\nTag someone who needs to hear this today 💜`,
    Educational: `Let\'s break down ${topic} in 60 seconds:\n\n📌 WHAT: The core concept you need to understand\n📌 WHY: The reason it matters for your growth\n📌 HOW: 3 actionable steps to implement today\n📌 WHEN: The best timing for maximum impact\n\nSave this for later and share with someone who needs to see it!`,
    Bold: `Let me be real with you about ${topic}.\n\nMost people are doing it wrong. Like, REALLY wrong.\n\nStop following the crowd. Start leading it.\n\nThe blueprint is simpler than you think:\n→ Cut the fluff\n→ Double down on what works\n→ Execute relentlessly\n\nAre you ready to level up? Let\'s go.`,
    Witty: `*opens notes app at 2am*\n\nMe, writing about ${topic}:\n"This is either brilliant or I need sleep"\n\nSpoiler: it\'s both.\n\nHere\'s my unhinged but effective approach:\n1. Make it weird (authentically)\n2. Make it useful (actually)\n3. Make it you (unapologetically)\n\nThe algorithm loves chaos. Give it what it wants.`,
  };
  return captions[tone] || captions.Casual;
}

function generateHashtags(topic, platform) {
  const baseTags = ['#creatorlife', '#contentcreator', '#socialmedia', '#growth', '#strategy'];
  const topicTags = [`#${topic.toLowerCase().replace(/\s+/g, '')}`, `#${topic.toLowerCase().replace(/\s+/g, '')}tips`, `#${topic.toLowerCase().replace(/\s+/g, '')}community`];
  const platformTags = { Instagram: ['#instagood', '#instadaily', '#reels', '#explore'], TikTok: ['#fyp', '#foryou', '#viral', '#trending'], YouTube: ['#youtube', '#youtuber', '#subscribe'], Twitter: ['#thread', '#twittertips'], LinkedIn: ['#linkedin', '#professionals'], Facebook: ['#facebook'] };
  return [...baseTags, ...topicTags, ...(platformTags[platform] || [])].join(' ');
}

function generateCarousel(topic, tone) {
  return {
    title: `${topic}: The Complete Guide`,
    slides: [
      `🎯 Welcome to your ultimate guide on ${topic}!`,
      `📌 What is ${topic}?\nLet\'s start with the basics and build from there.`,
      `❌ Common Mistakes\nHere\'s what most people get wrong (and how to fix it).`,
      `✅ The Blueprint\nStep-by-step: How to master ${topic} starting today.`,
      `🚀 Your Action Plan\n3 things to do THIS WEEK to see real results.`,
      `💾 Save this post and follow for more ${topic} tips!`,
    ],
  };
}

function generateScript(topic, tone) {
  return `[HOOK - 0-3s]\n"Stop scrolling if you care about ${topic}."\n\n[PROBLEM - 3-10s]\n"Here\'s the thing nobody tells you about ${topic}..."\n\n[SOLUTION - 10-25s]\n"I spent months figuring this out so you don\'t have to. Here are the 3 game-changing strategies that actually work."\n\n[CTA - 25-30s]\n"Follow for more ${topic} breakdowns. Comment \'GUIDE\' and I\'ll send you the full playbook."\n\n---\nTone: ${tone}\nEstimated length: 30 seconds`;
}

function generateBlog(topic, tone) {
  return `# The Ultimate Guide to ${topic}\n\n## Introduction\n${topic} has become one of the most important areas for creators and businesses alike. In this comprehensive guide, we\'ll explore everything you need to know.\n\n## Why ${topic} Matters\nUnderstanding ${topic} isn\'t just a nice-to-have anymore—it\'s essential for anyone looking to grow their presence online.\n\n## Key Strategies\n1. **Start with research** - Know your audience and what they care about\n2. **Create consistently** - Quality matters, but consistency builds trust\n3. **Measure and iterate** - Use data to inform your decisions\n\n## Common Pitfalls to Avoid\n- Trying to do everything at once\n- Ignoring your analytics\n- Copying others instead of finding your voice\n\n## Conclusion\n${topic} is a journey, not a destination. Start small, stay consistent, and watch your growth compound over time.`;
}

function generateEmail(topic, tone) {
  return `Subject: Your ${topic} strategy guide is here 🚀\n\nHey there,\n\nI know how overwhelming ${topic} can feel sometimes. That\'s why I put together this quick guide to help you cut through the noise.\n\nHere\'s what we\'ll cover:\n→ The #1 mistake people make with ${topic}\n→ 3 tactics that actually move the needle\n→ A simple framework you can use today\n\n[Read the Full Guide]\n\nAs always, reply to this email if you have questions. I read every single one.\n\nTalk soon,\nThe Dovroyn Team`;
}