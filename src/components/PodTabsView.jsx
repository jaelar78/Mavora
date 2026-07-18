/******  POD TABS VIEW — Meet Millie–style Tabs + AI Chat  ******/
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePod } from '../pods/PodContext';
import {
  Sparkles, Send, Bot, User, Loader2, X, Mic, Wand2,
  Calendar, BarChart3, Target, Users, DollarSign, Globe,
  ArrowLeft, ChevronRight, TrendingUp, Clock, Heart, Eye,
  Share2, MessageCircle, Bookmark, Flame, Zap, Star,
  Layout, Type, Image, Hash, FileText, Megaphone, Palette,
  Settings, RefreshCw, Copy, Check, Download, Upload,
  Plus, Trash2, Edit3, CheckCircle2, AlertCircle, Info
} from 'lucide-react';
import { askDovroynAI } from '../lib/aiClient';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#9F7AEA', '#F687B3', '#68D391', '#63B3ED', '#F6E05E', '#FC8181'];

const TABS = [
  { id: 'overview', label: 'Overview', icon: Layout },
  { id: 'content', label: 'Content', icon: Type },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'ai', label: 'AI Assistant', icon: Sparkles },
  { id: 'audience', label: 'Audience', icon: Users },
  { id: 'campaigns', label: 'Campaigns', icon: Target },
  { id: 'budget', label: 'Budget', icon: DollarSign },
  { id: 'website', label: 'Website', icon: Globe },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const PLATFORM_COLORS = { Instagram: '#E1306C', TikTok: '#000000', Twitter: '#1DA1F2', YouTube: '#FF0000', Facebook: '#1877F2', LinkedIn: '#0A66C2' };

// ─── CONTENT TEMPLATES ───
const CONTENT_TEMPLATES = [
  { name: 'Hook Post', desc: 'Attention-grabbing opening', prompt: 'Create a scroll-stopping hook for Instagram about {topic}' },
  { name: 'Storytelling', desc: 'Narrative-driven content', prompt: 'Write a short story about {topic} that connects emotionally' },
  { name: 'Educational', desc: 'Value-driven teaching', prompt: 'Create an educational post about {topic} with 3 key takeaways' },
  { name: 'Behind the Scenes', desc: 'Authentic transparency', prompt: 'Write a behind-the-scenes post about creating {topic}' },
  { name: 'UGC Style', desc: 'User-generated feel', prompt: 'Write a casual, authentic post about {topic} as if from a customer' },
  { name: 'Carousel', desc: 'Multi-slide format', prompt: 'Create a 5-slide carousel about {topic} with slide titles' },
];

const SAMPLE_HASHTAGS = {
  Fashion: ['#fashion', '#style', '#ootd', '#fashionblogger', '#trendy', '#outfit', '#streetstyle', '#fashionista', '#lookbook', '#styleinspo'],
  Fitness: ['#fitness', '#workout', '#gym', '#health', '#fitnessmotivation', '#training', '#bodybuilding', '#yoga', '#running', '#healthylifestyle'],
  Art: ['#art', '#artist', '#artwork', '#digitalart', '#painting', '#drawing', '#illustration', '#creative', '#design', '#artoftheday'],
  Tech: ['#tech', '#technology', '#coding', '#developer', '#programming', '#webdev', '#javascript', '#react', '#startup', '#innovation'],
  Food: ['#food', '#foodie', '#cooking', '#recipe', '#yummy', '#foodphotography', '#chef', '#homemade', '#delicious', '#instafood'],
  Travel: ['#travel', '#wanderlust', '#adventure', '#explore', '#travelphotography', '#vacation', '#backpacking', '#nature', '#travelgram', '#trip'],
};

// ─── SAMPLE ANALYTICS DATA ───
const generateAnalyticsData = (podType) => {
  const base = [
    { name: 'Week 1', followers: 1200, engagement: 4.2, reach: 8500, impressions: 12000 },
    { name: 'Week 2', followers: 1350, engagement: 4.8, reach: 10200, impressions: 15000 },
    { name: 'Week 3', followers: 1480, engagement: 5.1, reach: 11500, impressions: 17800 },
    { name: 'Week 4', followers: 1620, engagement: 5.5, reach: 13200, impressions: 21000 },
    { name: 'Week 5', followers: 1850, engagement: 6.2, reach: 15800, impressions: 25000 },
    { name: 'Week 6', followers: 2100, engagement: 6.8, reach: 18200, impressions: 29500 },
  ];
  return base;
};

const AUDIENCE_DATA = [
  { name: '18-24', value: 35 },
  { name: '25-34', value: 40 },
  { name: '35-44', value: 18 },
  { name: '45-54', value: 5 },
  { name: '55+', value: 2 },
];

const GENDER_DATA = [
  { name: 'Female', value: 62 },
  { name: 'Male', value: 35 },
  { name: 'Other', value: 3 },
];

export default function PodTabsView() {
  const { podId } = useParams();
  const navigate = useNavigate();
  const { pods, updatePod } = usePod();
  const pod = pods.find((p) => p.id === podId);
  const [activeTab, setActiveTab] = useState('overview');

  // AI Chat state
  const [aiOpen, setAiOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState([]);
  const [aiInput, setAiInput] = useState('');
  const [aiTyping, setAiTyping] = useState(false);
  const aiScrollRef = useRef(null);

  useEffect(() => {
    if (aiScrollRef.current) aiScrollRef.current.scrollTop = aiScrollRef.current.scrollHeight;
  }, [aiMessages, aiTyping]);

  const sendAiMessage = async (text) => {
    if (!text.trim()) return;
    setAiMessages((m) => [...m, { role: 'user', text }]);
    setAiInput('');
    setAiTyping(true);
    try {
      const reply = await askDovroynAI(text, { podId });
      setAiMessages((m) => [...m, { role: 'assistant', text: reply }]);
    } catch {
      setAiMessages((m) => [...m, { role: 'assistant', text: 'Sorry, I had trouble connecting. Try again?' }]);
    } finally {
      setAiTyping(false);
    }
  };

  if (!pod) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0a0a0f]">
        <div className="text-center">
          <AlertCircle size={48} className="text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Pod not found</h2>
          <button onClick={() => navigate('/pods')} className="btn-primary">Back to Pods</button>
        </div>
      </div>
    );
  }

  const analyticsData = generateAnalyticsData(pod.type);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* ─── Top Bar ─── */}
      <div className="sticky top-0 z-30 bg-[#0a0a0f]/95 backdrop-blur border-b border-gray-800/60">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <button onClick={() => navigate('/pods')} className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white">
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold">
              {pod.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">{pod.name}</h1>
              <p className="text-xs text-gray-500">{pod.type} &middot; {pod.platforms?.join(', ') || 'All Platforms'}</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="pod-badge-purple">{pod.status || 'Active'}</span>
            <button
              onClick={() => setAiOpen(!aiOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/10 text-purple-400 text-sm rounded-lg hover:bg-purple-500/20 transition-all"
            >
              <Sparkles size={14} />
              <span>AI Assistant</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide py-1">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-purple-500/10 text-purple-400 border-b-2 border-purple-500'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                  }`}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── Main Content ─── */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'overview' && <OverviewTab pod={pod} analytics={analyticsData} />}
        {activeTab === 'content' && <ContentTab pod={pod} />}
        {activeTab === 'calendar' && <CalendarTab pod={pod} />}
        {activeTab === 'analytics' && <AnalyticsTab data={analyticsData} />}
        {activeTab === 'audience' && <AudienceTab />}
        {activeTab === 'campaigns' && <CampaignsTab pod={pod} />}
        {activeTab === 'budget' && <BudgetTab pod={pod} />}
        {activeTab === 'website' && <WebsiteTab pod={pod} />}
        {activeTab === 'settings' && <SettingsTab pod={pod} updatePod={updatePod} />}
      </div>

      {/* ─── AI Assistant Panel ─── */}
      {aiOpen && (
        <div className="fixed top-16 right-4 bottom-4 w-[400px] bg-[#111118] border border-purple-500/20 rounded-xl shadow-2xl flex flex-col z-40 animate-in slide-in-from-right duration-300">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <Bot size={18} className="text-purple-400" />
              <span className="font-semibold text-white text-sm">AI Assistant</span>
              <span className="px-1.5 py-0.5 text-[10px] bg-purple-500/20 text-purple-300 rounded-full">BETA</span>
            </div>
            <button onClick={() => setAiOpen(false)} className="text-gray-400 hover:text-white"><X size={16} /></button>
          </div>
          <div ref={aiScrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {aiMessages.length === 0 && (
              <div className="text-center py-8">
                <Sparkles size={32} className="text-purple-400/50 mx-auto mb-3" />
                <p className="text-sm text-gray-400">Ask me anything about your pod!</p>
                <div className="mt-4 space-y-2">
                  {['Write a caption', 'Content ideas', 'Analyze performance', 'Hashtag suggestions'].map((q) => (
                    <button key={q} onClick={() => sendAiMessage(q)} className="block w-full text-left px-3 py-2 text-xs bg-white/5 text-gray-400 rounded-lg hover:bg-purple-500/10 hover:text-purple-300 transition-all">
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {aiMessages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'assistant' ? 'bg-purple-500/20 text-purple-400' : 'bg-gray-700 text-gray-300'}`}>
                  {msg.role === 'assistant' ? <Bot size={14} /> : <User size={14} />}
                </div>
                <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${msg.role === 'assistant' ? 'bg-purple-500/10 text-gray-200 border border-purple-500/10' : 'bg-gray-700 text-white'}`}>
                  <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                </div>
              </div>
            ))}
            {aiTyping && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0"><Bot size={14} /></div>
                <div className="bg-purple-500/10 border border-purple-500/10 px-3 py-2 rounded-xl"><Loader2 size={16} className="text-purple-400 animate-spin" /></div>
              </div>
            )}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); sendAiMessage(aiInput); }} className="p-3 border-t border-gray-800">
            <div className="flex items-center gap-2 bg-[#1a1a24] border border-gray-700 rounded-xl px-3 py-2 focus-within:border-purple-500/50">
              <Mic size={14} className="text-gray-500 cursor-pointer hover:text-purple-400" />
              <input value={aiInput} onChange={(e) => setAiInput(e.target.value)} placeholder="Ask anything..." className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none" />
              <button type="submit" disabled={!aiInput.trim() || aiTyping} className="text-purple-400 hover:text-purple-300 disabled:text-gray-600"><Send size={14} /></button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  TAB COMPONENTS
// ═══════════════════════════════════════════════════════════════

function OverviewTab({ pod, analytics }) {
  const latest = analytics[analytics.length - 1];
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={<Users size={18} />} label="Followers" value={latest.followers.toLocaleString()} change="+12.5%" />
        <StatCard icon={<TrendingUp size={18} />} label="Engagement" value={`${latest.engagement}%`} change="+8.2%" />
        <StatCard icon={<Eye size={18} />} label="Reach" value={latest.reach.toLocaleString()} change="+15.3%" />
        <StatCard icon={<BarChart3 size={18} />} label="Impressions" value={latest.impressions.toLocaleString()} change="+20.1%" />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: <Type size={16} />, label: 'Generate Content', color: 'purple' },
          { icon: <Calendar size={16} />, label: 'Plan Calendar', color: 'pink' },
          { icon: <Target size={16} />, label: 'New Campaign', color: 'blue' },
          { icon: <BarChart3 size={16} />, label: 'View Analytics', color: 'green' },
        ].map((action) => (
          <button key={action.label} className="flex items-center gap-2 p-3 bg-[#111118] border border-gray-800/60 rounded-xl hover:border-purple-500/30 transition-all text-left">
            <div className={`text-${action.color}-400`}>{action.icon}</div>
            <span className="text-sm text-gray-300 font-medium">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Recent Activity + Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 pod-card">
          <h3 className="text-lg font-semibold text-white mb-4">Growth Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={analytics}>
              <XAxis dataKey="name" stroke="#4B5563" fontSize={12} />
              <YAxis stroke="#4B5563" fontSize={12} />
              <Tooltip contentStyle={{ background: '#1a1a24', border: '1px solid #374151', borderRadius: '8px', color: '#fff' }} />
              <Line type="monotone" dataKey="followers" stroke="#9F7AEA" strokeWidth={2} dot={{ fill: '#9F7AEA', r: 4 }} />
              <Line type="monotone" dataKey="reach" stroke="#63B3ED" strokeWidth={2} dot={{ fill: '#63B3ED', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="pod-card">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { action: 'Content published', detail: 'Instagram carousel', time: '2h ago', icon: <CheckCircle2 size={14} className="text-green-400" /> },
              { action: 'Campaign launched', detail: 'Summer promo', time: '5h ago', icon: <Target size={14} className="text-blue-400" /> },
              { action: 'AI content generated', detail: '3 captions', time: '1d ago', icon: <Sparkles size={14} className="text-purple-400" /> },
              { action: 'Analytics updated', detail: 'Weekly report', time: '2d ago', icon: <BarChart3 size={14} className="text-amber-400" /> },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                {item.icon}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-200 font-medium">{item.action}</p>
                  <p className="text-xs text-gray-500">{item.detail}</p>
                </div>
                <span className="text-xs text-gray-600 shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContentTab({ pod }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [topic, setTopic] = useState('');
  const [generated, setGenerated] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const hashtags = SAMPLE_HASHTAGS[pod.type] || SAMPLE_HASHTAGS.Fashion;

  const generate = async () => {
    if (!topic.trim()) return;
    setGenerating(true);
    setTimeout(() => {
      setGenerated({
        caption: `✨ ${topic} just got a major upgrade! Here's what you need to know:\n\n1. Start with the basics and build up\n2. Consistency beats perfection every time\n3. Your audience wants authenticity\n\nWhat's your biggest challenge with ${topic.toLowerCase()}? Drop a comment below! 👇`,
        hashtags: hashtags.slice(0, 8).join(' '),
        bestTime: 'Tuesday 11:00 AM - 1:00 PM',
        platform: pod.platforms?.[0] || 'Instagram',
      });
      setGenerating(false);
    }, 2000);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Templates */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-1">Content Templates</h3>
        <p className="text-sm text-gray-400 mb-4">Choose a template to generate content</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {CONTENT_TEMPLATES.map((t) => (
            <button
              key={t.name}
              onClick={() => setSelectedTemplate(t)}
              className={`p-4 rounded-xl border text-left transition-all ${
                selectedTemplate?.name === t.name
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-gray-800 bg-[#111118] hover:border-gray-700'
              }`}
            >
              <h4 className="text-sm font-semibold text-white mb-1">{t.name}</h4>
              <p className="text-xs text-gray-500">{t.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Generator */}
      <div className="pod-card">
        <h3 className="text-lg font-semibold text-white mb-4">
          {selectedTemplate ? `Generate: ${selectedTemplate.name}` : 'Content Generator'}
        </h3>
        <div className="flex gap-3 mb-4">
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a topic (e.g., summer fashion trends)..."
            className="flex-1 input-field"
          />
          <button
            onClick={generate}
            disabled={!topic.trim() || generating}
            className="btn-primary flex items-center gap-2 disabled:opacity-50"
          >
            {generating ? <Loader2 size={16} className="animate-spin" /> : <Wand2 size={16} />}
            Generate
          </button>
        </div>

        {generated && (
          <div className="space-y-4 animate-in fade-in duration-500">
            <div className="bg-[#0a0a0f] border border-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500 uppercase tracking-wider">Caption</span>
                <button onClick={() => copyToClipboard(generated.caption)} className="text-gray-500 hover:text-purple-400 transition-colors">
                  {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                </button>
              </div>
              <p className="text-sm text-gray-200 whitespace-pre-line">{generated.caption}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {generated.hashtags.split(' ').map((h) => (
                <span key={h} className="pod-badge-purple">{h}</span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock size={14} />
              <span>Best time to post: {generated.bestTime}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CalendarTab({ pod }) {
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [newPost, setNewPost] = useState({ title: '', platform: '', time: '' });

  const today = new Date();
  const currentWeekStart = new Date(today);
  currentWeekStart.setDate(today.getDate() - today.getDay() + 1 + weekOffset * 7);

  const [schedule, setSchedule] = useState({
    'Mon': [
      { time: '9:00 AM', title: 'Morning Motivation', platform: 'Instagram', type: 'carousel' },
      { time: '3:00 PM', title: 'Product Showcase', platform: 'TikTok', type: 'video' },
    ],
    'Tue': [
      { time: '11:00 AM', title: 'Behind the Scenes', platform: 'Instagram', type: 'story' },
    ],
    'Wed': [
      { time: '10:00 AM', title: 'Educational Post', platform: 'LinkedIn', type: 'text' },
      { time: '2:00 PM', title: 'UGC Feature', platform: 'Instagram', type: 'reel' },
    ],
    'Thu': [
      { time: '9:30 AM', title: 'Trending Topic', platform: 'Twitter', type: 'text' },
    ],
    'Fri': [
      { time: '12:00 PM', title: 'Weekend Vibes', platform: 'Instagram', type: 'carousel' },
    ],
    'Sat': [
      { time: '10:00 AM', title: 'Casual Post', platform: 'Instagram', type: 'story' },
    ],
    'Sun': [
      { time: '7:00 PM', title: 'Week Recap', platform: 'Instagram', type: 'carousel' },
    ],
  });

  const addPost = () => {
    if (!newPost.title || !newPost.platform || !selectedSlot) return;
    const day = selectedSlot.day;
    setSchedule((s) => ({
      ...s,
      [day]: [...(s[day] || []), { time: selectedSlot.time, title: newPost.title, platform: newPost.platform, type: 'text' }],
    }));
    setSelectedSlot(null);
    setNewPost({ title: '', platform: '' });
  };

  const timeSlots = ['6:00 AM', '9:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '5:00 PM', '7:00 PM', '9:00 PM'];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Content Calendar</h3>
        <div className="flex items-center gap-2">
          <button onClick={() => setWeekOffset((w) => w - 1)} className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white"><ArrowLeft size={16} /></button>
          <span className="text-sm text-gray-300">Week of {currentWeekStart.toLocaleDateString()}</span>
          <button onClick={() => setWeekOffset((w) => w + 1)} className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white"><ChevronRight size={16} /></button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {DAYS.map((day) => (
          <div key={day} className="bg-[#111118] border border-gray-800/60 rounded-xl p-3 min-h-[200px]">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{day}</div>
            <div className="space-y-2">
              {(schedule[day] || []).map((post, i) => (
                <div key={i} className="p-2 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <p className="text-xs font-medium text-purple-300 truncate">{post.title}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-[10px] text-gray-500">{post.time}</span>
                    <span className="text-[10px] text-gray-600">&middot;</span>
                    <span className="text-[10px]" style={{ color: PLATFORM_COLORS[post.platform] || '#9F7AEA' }}>{post.platform}</span>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setSelectedSlot({ day, time: '12:00 PM' })}
                className="w-full py-1.5 border border-dashed border-gray-700 rounded-lg text-xs text-gray-500 hover:border-purple-500/30 hover:text-purple-400 transition-all flex items-center justify-center gap-1"
              >
                <Plus size={12} /> Add
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => setSelectedSlot(null)}>
          <div className="bg-[#111118] border border-gray-800 rounded-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h4 className="text-lg font-semibold text-white mb-4">Add Post — {selectedSlot.day}</h4>
            <div className="space-y-3">
              <input value={newPost.title} onChange={(e) => setNewPost((p) => ({ ...p, title: e.target.value }))} placeholder="Post title..." className="w-full input-field" />
              <select value={newPost.platform} onChange={(e) => setNewPost((p) => ({ ...p, platform: e.target.value }))} className="w-full input-field">
                <option value="">Select platform</option>
                {Object.keys(PLATFORM_COLORS).map((p) => (<option key={p} value={p}>{p}</option>))}
              </select>
              <div className="flex gap-2 justify-end">
                <button onClick={() => setSelectedSlot(null)} className="btn-secondary">Cancel</button>
                <button onClick={addPost} className="btn-primary">Add Post</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AnalyticsTab({ data }) {
  const [metric, setMetric] = useState('followers');
  const metrics = [
    { key: 'followers', label: 'Followers', color: '#9F7AEA' },
    { key: 'engagement', label: 'Engagement %', color: '#68D391' },
    { key: 'reach', label: 'Reach', color: '#63B3ED' },
    { key: 'impressions', label: 'Impressions', color: '#F6E05E' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 flex-wrap">
        {metrics.map((m) => (
          <button
            key={m.key}
            onClick={() => setMetric(m.key)}
            className={`px-3 py-1.5 text-sm rounded-lg transition-all ${metric === m.key ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}
          >
            {m.label}
          </button>
        ))}
      </div>
      <div className="pod-card">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#4B5563" fontSize={12} />
            <YAxis stroke="#4B5563" fontSize={12} />
            <Tooltip contentStyle={{ background: '#1a1a24', border: '1px solid #374151', borderRadius: '8px', color: '#fff' }} />
            <Bar dataKey={metric} fill={metrics.find((m) => m.key === metric)?.color || '#9F7AEA'} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="pod-card">
          <h4 className="text-sm font-semibold text-white mb-3">Audience Age</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={AUDIENCE_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                {AUDIENCE_DATA.map((_, i) => (<Cell key={i} fill={COLORS[i % COLORS.length]} />))}
              </Pie>
              <Tooltip contentStyle={{ background: '#1a1a24', border: '1px solid #374151', borderRadius: '8px', color: '#fff' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="pod-card">
          <h4 className="text-sm font-semibold text-white mb-3">Gender Split</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={GENDER_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                {GENDER_DATA.map((_, i) => (<Cell key={i} fill={COLORS[i % COLORS.length]} />))}
              </Pie>
              <Tooltip contentStyle={{ background: '#1a1a24', border: '1px solid #374151', borderRadius: '8px', color: '#fff' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function AudienceTab() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">Audience Insights</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon={<Users size={18} />} label="Total Followers" value="2,847" change="+12.5%" />
        <StatCard icon={<Heart size={18} />} label="Avg. Likes" value="324" change="+18.2%" />
        <StatCard icon={<MessageCircle size={18} />} label="Avg. Comments" value="47" change="+9.8%" />
      </div>
      <div className="pod-card">
        <h4 className="text-sm font-semibold text-white mb-4">Top Locations</h4>
        <div className="space-y-2">
          {['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany'].map((loc, i) => (
            <div key={loc} className="flex items-center gap-3">
              <span className="text-sm text-gray-400 w-6">{i + 1}</span>
              <span className="text-sm text-gray-300 flex-1">{loc}</span>
              <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: `${85 - i * 12}%` }} />
              </div>
              <span className="text-xs text-gray-500 w-10 text-right">{85 - i * 12}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CampaignsTab({ pod }) {
  const [campaigns, setCampaigns] = useState([
    { id: 1, name: 'Summer Collection Launch', status: 'active', budget: 500, spent: 234, reach: 12500, conversions: 45, platform: 'Instagram' },
    { id: 2, name: 'Influencer Collab', status: 'active', budget: 1000, spent: 567, reach: 23400, conversions: 89, platform: 'TikTok' },
    { id: 3, name: 'Holiday Promo', status: 'draft', budget: 750, spent: 0, reach: 0, conversions: 0, platform: 'Facebook' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Campaigns</h3>
        <button className="btn-primary flex items-center gap-2"><Plus size={16} /> New Campaign</button>
      </div>
      <div className="space-y-3">
        {campaigns.map((c) => (
          <div key={c.id} className="pod-card flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-sm font-semibold text-white">{c.name}</h4>
                <span className={`pod-badge-${c.status === 'active' ? 'green' : 'amber'}`}>{c.status}</span>
              </div>
              <p className="text-xs text-gray-500">{c.platform} &middot; Budget: ${c.budget}</p>
            </div>
            {c.status === 'active' && (
              <>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{c.reach.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">reach</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{c.conversions}</p>
                  <p className="text-xs text-gray-500">conversions</p>
                </div>
                <div className="w-24">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">${c.spent}</span>
                    <span className="text-gray-500">${c.budget}</span>
                  </div>
                  <div className="pod-progress-bar">
                    <div className="pod-progress-fill" style={{ width: `${(c.spent / c.budget) * 100}%` }} />
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function BudgetTab({ pod }) {
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2026-01-15', desc: 'Meta Ads', category: 'Advertising', amount: -250, type: 'expense' },
    { id: 2, date: '2026-01-14', desc: 'Influencer Payment', category: 'Collaboration', amount: -500, type: 'expense' },
    { id: 3, date: '2026-01-10', desc: 'Product Sales', category: 'Revenue', amount: 1200, type: 'income' },
    { id: 4, date: '2026-01-08', desc: 'Canva Pro', category: 'Tools', amount: -15, type: 'expense' },
  ]);
  const totalIncome = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = Math.abs(transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0));

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">Budget Tracker</h3>
      <div className="grid grid-cols-3 gap-4">
        <StatCard icon={<TrendingUp size={18} />} label="Revenue" value={`$${totalIncome.toLocaleString()}`} change="+23.5%" />
        <StatCard icon={<DollarSign size={18} />} label="Expenses" value={`$${totalExpense.toLocaleString()}`} change="-8.2%" />
        <StatCard icon={<BarChart3 size={18} />} label="Net" value={`$${(totalIncome - totalExpense).toLocaleString()}`} change="+15.8%" />
      </div>
      <div className="pod-card">
        <h4 className="text-sm font-semibold text-white mb-4">Recent Transactions</h4>
        <div className="space-y-2">
          {transactions.map((t) => (
            <div key={t.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${t.type === 'income' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                  {t.type === 'income' ? <TrendingUp size={14} /> : <DollarSign size={14} />}
                </div>
                <div>
                  <p className="text-sm text-gray-200">{t.desc}</p>
                  <p className="text-xs text-gray-500">{t.date} &middot; {t.category}</p>
                </div>
              </div>
              <span className={`text-sm font-medium ${t.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                {t.type === 'income' ? '+' : ''}{t.amount >= 0 ? `$${t.amount}` : `-$${Math.abs(t.amount)}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WebsiteTab({ pod }) {
  const [url, setUrl] = useState(pod.website || '');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const analyze = () => {
    if (!url) return;
    setAnalyzing(true);
    setTimeout(() => {
      setResult({
        score: 78,
        seo: 82,
        speed: 71,
        mobile: 88,
        issues: ['Missing meta description', 'Images need alt text', 'Sitemap not found'],
        suggestions: ['Add structured data markup', 'Optimize image sizes', 'Enable browser caching'],
      });
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">Website Analyzer</h3>
      <div className="flex gap-3">
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter website URL..." className="flex-1 input-field" />
        <button onClick={analyze} disabled={!url || analyzing} className="btn-primary flex items-center gap-2 disabled:opacity-50">
          {analyzing ? <Loader2 size={16} className="animate-spin" /> : <Globe size={16} />}
          Analyze
        </button>
      </div>
      {result && (
        <div className="space-y-4 animate-in fade-in duration-500">
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Overall', value: result.score, color: 'purple' },
              { label: 'SEO', value: result.seo, color: 'blue' },
              { label: 'Speed', value: result.speed, color: 'amber' },
              { label: 'Mobile', value: result.mobile, color: 'green' },
            ].map((s) => (
              <div key={s.label} className="pod-card text-center">
                <div className={`text-3xl font-bold text-${s.color}-400 mb-1`}>{s.value}</div>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="pod-card">
              <h4 className="text-sm font-semibold text-white mb-3">Issues Found</h4>
              <ul className="space-y-2">
                {result.issues.map((issue, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-300"><AlertCircle size={14} className="text-amber-400 shrink-0" />{issue}</li>
                ))}
              </ul>
            </div>
            <div className="pod-card">
              <h4 className="text-sm font-semibold text-white mb-3">Suggestions</h4>
              <ul className="space-y-2">
                {result.suggestions.map((s, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={14} className="text-green-400 shrink-0" />{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SettingsTab({ pod, updatePod }) {
  const [form, setForm] = useState({ name: pod.name, type: pod.type, bio: pod.bio || '', website: pod.website || '' });

  const save = () => {
    updatePod(pod.id, form);
  };

  return (
    <div className="space-y-6 max-w-xl">
      <h3 className="text-lg font-semibold text-white">Pod Settings</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Pod Name</label>
          <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="w-full input-field" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Type</label>
          <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))} className="w-full input-field">
            {['Fashion', 'Fitness', 'Art', 'Tech', 'Food', 'Travel', 'Lifestyle', 'Business', 'Other'].map((t) => (<option key={t} value={t}>{t}</option>))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Bio</label>
          <textarea value={form.bio} onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))} rows={3} className="w-full input-field resize-none" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Website</label>
          <input value={form.website} onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))} className="w-full input-field" placeholder="https://..." />
        </div>
        <button onClick={save} className="btn-primary">Save Changes</button>
      </div>
    </div>
  );
}

// ─── StatCard helper ───
function StatCard({ icon, label, value, change }) {
  const isPositive = change?.startsWith('+');
  return (
    <div className="pod-stat-card">
      <div className="flex items-center gap-2 text-gray-500">
        {icon}
        <span className="text-xs uppercase tracking-wider">{label}</span>
      </div>
      <span className="pod-stat-value">{value}</span>
      {change && <span className={`text-xs font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>{change}</span>}
    </div>
  );
}