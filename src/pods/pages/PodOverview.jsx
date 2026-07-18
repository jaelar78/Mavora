/******  POD OVERVIEW — Dashboard with KPIs, activity, quick actions  ******/
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePod } from '../PodContext';
import {
  TrendingUp, Users, Eye, Heart, MessageCircle, Share2, Bookmark,
  ArrowRight, Sparkles, Target, Calendar, BarChart3, Zap, Activity,
  ChevronRight, FileText, Wand2, Clock, Flame
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const CHART_DATA = [
  { day: 'Mon', followers: 1200, engagement: 4.2, reach: 8500 },
  { day: 'Tue', followers: 1350, engagement: 4.8, reach: 10200 },
  { day: 'Wed', followers: 1480, engagement: 5.1, reach: 11500 },
  { day: 'Thu', followers: 1620, engagement: 5.5, reach: 13200 },
  { day: 'Fri', followers: 1850, engagement: 6.2, reach: 15800 },
  { day: 'Sat', followers: 2100, engagement: 6.8, reach: 18200 },
  { day: 'Sun', followers: 2340, engagement: 7.1, reach: 21000 },
];

const QUICK_ACTIONS = [
  { label: 'Generate Content', icon: <Wand2 size={16} />, to: 'content', color: 'purple' },
  { label: 'View Calendar', icon: <Calendar size={16} />, to: 'calendar', color: 'blue' },
  { label: 'Check Analytics', icon: <BarChart3 size={16} />, to: 'analytics', color: 'green' },
  { label: 'AI Assistant', icon: <Sparkles size={16} />, to: 'ai-assistant', color: 'pink' },
];

export default function PodOverview() {
  const { podId } = useParams();
  const { pods } = usePod();
  const pod = pods.find((p) => p.id === podId);

  if (!pod) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-400">Pod not found</p>
      </div>
    );
  }

  return (
    <div className="pod-page-container space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">{pod.name}</h2>
          <p className="text-sm text-gray-400">{pod.bio || `${pod.type} pod`}</p>
        </div>
        <span className="pod-badge-purple">{pod.status || 'Active'}</span>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard icon={<Users size={16} />} label="Followers" value={pod.analytics?.followers?.toLocaleString() || '0'} change="+12.5%" />
        <KpiCard icon={<TrendingUp size={16} />} label="Engagement" value={`${pod.analytics?.engagement || 0}%`} change="+8.2%" />
        <KpiCard icon={<Eye size={16} />} label="Reach" value={pod.analytics?.reach?.toLocaleString() || '0'} change="+15.3%" />
        <KpiCard icon={<BarChart3 size={16} />} label="Impressions" value={pod.analytics?.impressions?.toLocaleString() || '0'} change="+20.1%" />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {QUICK_ACTIONS.map((action) => (
          <Link
            key={action.label}
            to={action.to}
            className="flex items-center gap-2 p-3 bg-[#111118] border border-gray-800/60 rounded-xl hover:border-purple-500/30 transition-all group"
          >
            <div className={`text-${action.color}-400 group-hover:scale-110 transition-transform`}>{action.icon}</div>
            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{action.label}</span>
          </Link>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Growth Chart */}
        <div className="lg:col-span-2 pod-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Growth Trend</h3>
            <span className="text-xs text-gray-500">Last 7 days</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={CHART_DATA}>
              <defs>
                <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9F7AEA" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#9F7AEA" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="#374151" fontSize={10} />
              <YAxis stroke="#374151" fontSize={10} />
              <Tooltip contentStyle={{ background: '#1a1a24', border: '1px solid #374151', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
              <Area type="monotone" dataKey="followers" stroke="#9F7AEA" fillOpacity={1} fill="url(#colorFollowers)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="pod-card">
          <h3 className="text-sm font-semibold text-white mb-3">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { action: 'Content published', detail: 'Instagram carousel', time: '2h ago', icon: <FileText size={12} className="text-green-400" /> },
              { action: 'AI content generated', detail: '3 captions', time: '5h ago', icon: <Sparkles size={12} className="text-purple-400" /> },
              { action: 'Campaign launched', detail: 'Summer promo', time: '1d ago', icon: <Target size={12} className="text-blue-400" /> },
              { action: 'Analytics updated', detail: 'Weekly report', time: '2d ago', icon: <BarChart3 size={12} className="text-amber-400" /> },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                {item.icon}
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-200">{item.action}</p>
                  <p className="text-[10px] text-gray-500">{item.detail}</p>
                </div>
                <span className="text-[10px] text-gray-600 shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Ideas */}
      <div className="pod-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white">Content Ideas</h3>
          <Link to="content" className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1">
            View All <ChevronRight size={12} />
          </Link>
        </div>
        <div className="space-y-2">
          {(pod.contentIdeas || []).slice(0, 4).map((idea) => (
            <div key={idea.id} className="flex items-center justify-between p-2 bg-[#0a0a0f] rounded-lg">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${idea.status === 'published' ? 'bg-green-400' : idea.status === 'scheduled' ? 'bg-purple-400' : 'bg-gray-600'}`} />
                <span className="text-xs text-gray-200">{idea.title}</span>
              </div>
              <span className="pod-badge bg-gray-800 text-gray-400 text-[10px]">{idea.type}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scheduled Posts */}
      {pod.scheduledPosts && pod.scheduledPosts.length > 0 && (
        <div className="pod-card">
          <h3 className="text-sm font-semibold text-white mb-3">Scheduled Posts</h3>
          <div className="space-y-2">
            {pod.scheduledPosts.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-2 bg-[#0a0a0f] rounded-lg">
                <div>
                  <p className="text-xs text-gray-200">{post.title}</p>
                  <p className="text-[10px] text-gray-500">{post.platform} &middot; {post.date} at {post.time}</p>
                </div>
                <span className="pod-badge-purple text-[10px]">{post.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function KpiCard({ icon, label, value, change }) {
  const isPositive = change?.startsWith('+');
  return (
    <div className="pod-stat-card">
      <div className="flex items-center gap-2 text-gray-500">{icon}<span className="pod-stat-label">{label}</span></div>
      <span className="pod-stat-value">{value}</span>
      {change && <span className={`text-xs font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>{change}</span>}
    </div>
  );
}