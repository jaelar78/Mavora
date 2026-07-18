/******  GROWTH ADVICE — Personalized Recommendations  ******/
import React, { useState } from 'react';
import {
  TrendingUp, Target, Zap, Star, CheckCircle, Clock, ArrowRight,
  BarChart3, Users, Sparkles, Bookmark, BookmarkCheck, Flame
} from 'lucide-react';

const RECOMMENDATIONS = [
  {
    id: 1, category: 'Content', priority: 'high',
    title: 'Increase carousel post frequency',
    description: 'Your carousel posts get 2.3x more engagement than single-image posts. Consider creating 3-4 carousels per week.',
    impact: '+15% engagement',
    effort: 'Medium',
    icon: <Target size={18} />,
  },
  {
    id: 2, category: 'Timing', priority: 'high',
    title: 'Post at 11 AM on Tuesdays',
    description: 'Your audience is most active between 10 AM - 12 PM on weekdays. Shift your posting schedule to match peak engagement times.',
    impact: '+22% reach',
    effort: 'Low',
    icon: <Clock size={18} />,
  },
  {
    id: 3, category: 'Hashtags', priority: 'medium',
    title: 'Use niche hashtags over broad ones',
    description: 'Switch from #fashion (500M posts) to niche tags like #sustainablefashion (2M posts) for better discoverability.',
    impact: '+30% discovery',
    effort: 'Low',
    icon: <Zap size={18} />,
  },
  {
    id: 4, category: 'Collaboration', priority: 'medium',
    title: 'Partner with micro-influencers',
    description: 'Collaborating with 3-5 micro-influencers (10K-50K followers) in your niche could boost your reach by 40%.',
    impact: '+40% reach',
    effort: 'High',
    icon: <Users size={18} />,
  },
  {
    id: 5, category: 'Content', priority: 'low',
    title: 'Add video content to your mix',
    description: 'Video content gets 38% more engagement. Start with short-form Reels/TikToks to test audience response.',
    impact: '+38% engagement',
    effort: 'High',
    icon: <Flame size={18} />,
  },
  {
    id: 6, category: 'Analytics', priority: 'low',
    title: 'Set up conversion tracking',
    description: 'Add UTM parameters to your bio links to better understand which content drives the most conversions.',
    impact: 'Better insights',
    effort: 'Medium',
    icon: <BarChart3 size={18} />,
  },
];

const WEEKLY_GOALS = [
  { id: 1, text: 'Post 5 times this week', current: 3, target: 5 },
  { id: 2, text: 'Engage with 20 accounts daily', current: 15, target: 20 },
  { id: 3, text: 'Create 2 Reels', current: 1, target: 2 },
  { id: 4, text: 'Reply to all comments within 2 hours', current: 4, target: 4 },
];

export default function GrowthAdvice() {
  const [saved, setSaved] = useState([]);
  const [filter, setFilter] = useState('all');
  const [goals, setGoals] = useState(WEEKLY_GOALS);

  const toggleSave = (id) => {
    setSaved((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
  };

  const toggleGoal = (id) => {
    setGoals((prev) => prev.map((g) => g.id === id ? { ...g, current: g.current >= g.target ? 0 : g.current + 1 } : g));
  };

  const filtered = filter === 'all' ? RECOMMENDATIONS : RECOMMENDATIONS.filter((r) => r.priority === filter);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Growth Advice</h1>
        <p className="text-sm text-gray-400 mt-1">Personalized recommendations to grow your pods</p>
      </div>

      {/* Score Card */}
      <div className="pod-card flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">78</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Growth Score</h3>
          <p className="text-sm text-gray-400">Your pods are performing well! Follow the recommendations below to reach 90+.</p>
          <div className="flex items-center gap-2 mt-2">
            <TrendingUp size={14} className="text-green-400" />
            <span className="text-xs text-green-400">+12 points from last week</span>
          </div>
        </div>
      </div>

      {/* Weekly Goals */}
      <div className="pod-card">
        <h3 className="text-lg font-semibold text-white mb-4">Weekly Goals</h3>
        <div className="space-y-3">
          {goals.map((goal) => (
            <div key={goal.id} className="flex items-center gap-3">
              <button
                onClick={() => toggleGoal(goal.id)}
                className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                  goal.current >= goal.target ? 'bg-purple-500 border-purple-500' : 'border-gray-600 hover:border-purple-500'
                }`}
              >
                {goal.current >= goal.target && <CheckCircle size={14} className="text-white" />}
              </button>
              <div className="flex-1">
                <p className={`text-sm ${goal.current >= goal.target ? 'text-gray-500 line-through' : 'text-gray-200'}`}>{goal.text}</p>
                <div className="w-full h-1.5 bg-gray-800 rounded-full mt-1 overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full transition-all" style={{ width: `${(goal.current / goal.target) * 100}%` }} />
                </div>
              </div>
              <span className="text-xs text-gray-500">{goal.current}/{goal.target}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {['all', 'high', 'medium', 'low'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-sm rounded-lg transition-all ${
              filter === f ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
            }`}
          >
            {f === 'all' ? 'All' : `${f.charAt(0).toUpperCase() + f.slice(1)} Priority`}
          </button>
        ))}
      </div>

      {/* Recommendations */}
      <div className="space-y-3">
        {filtered.map((rec) => (
          <div key={rec.id} className="pod-card-hover">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="text-purple-400">{rec.icon}</div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-white">{rec.title}</h4>
                    <span className={`pod-badge-${rec.priority === 'high' ? 'red' : rec.priority === 'medium' ? 'amber' : 'blue'}`}>{rec.priority}</span>
                  </div>
                  <p className="text-xs text-gray-500">{rec.category}</p>
                </div>
              </div>
              <button onClick={() => toggleSave(rec.id)} className="text-gray-400 hover:text-purple-400 transition-colors">
                {saved.includes(rec.id) ? <BookmarkCheck size={16} className="text-purple-400" /> : <Bookmark size={16} />}
              </button>
            </div>
            <p className="text-sm text-gray-300 mb-3">{rec.description}</p>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1 text-green-400"><TrendingUp size={12} /> {rec.impact}</span>
              <span className="flex items-center gap-1 text-gray-500"><Zap size={12} /> {rec.effort} effort</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}