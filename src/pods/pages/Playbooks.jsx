/******  PLAYBOOKS — Strategy guides for different goals  ******/
import React, { useState } from 'react';
import { BookOpen, Target, TrendingUp, Users, Zap, Star, ChevronRight, Clock, CheckCircle, Lock } from 'lucide-react';

const PLAYBOOKS = [
  {
    id: 1, title: '0 to 10K Followers', category: 'Growth', difficulty: 'Beginner', duration: '30 days',
    icon: <TrendingUp size={20} />, color: 'green',
    steps: ['Optimize your bio and profile', 'Post daily for 30 days', 'Engage with 50 accounts daily', 'Use 20-30 targeted hashtags', 'Collaborate with 5 micro-influencers'],
    locked: false,
  },
  {
    id: 2, title: 'Viral Content Formula', category: 'Content', difficulty: 'Intermediate', duration: '14 days',
    icon: <Zap size={20} />, color: 'purple',
    steps: ['Study your top 10 performing posts', 'Identify the hook pattern', 'Create 7 pieces using the formula', 'Test different posting times', 'Double down on what works'],
    locked: false,
  },
  {
    id: 3, title: 'Brand Deal Mastery', category: 'Monetization', difficulty: 'Advanced', duration: '21 days',
    icon: <Target size={20} />, color: 'amber',
    steps: ['Build a media kit', 'Reach out to 20 brands', 'Negotiate your rates', 'Deliver professional content', 'Build long-term partnerships'],
    locked: false,
  },
  {
    id: 4, title: 'Community Building', category: 'Engagement', difficulty: 'Beginner', duration: '30 days',
    icon: <Users size={20} />, color: 'blue',
    steps: ['Reply to every comment', 'Create a signature greeting', 'Host weekly Q&A sessions', 'Feature community members', 'Build a private group'],
    locked: false,
  },
  {
    id: 5, title: 'Reels Growth Engine', category: 'Growth', difficulty: 'Intermediate', duration: '14 days',
    icon: <Zap size={20} />, color: 'pink',
    steps: ['Post 1 Reel per day', 'Use trending audio', 'Create educational content', 'Add text hooks in first 1 second', 'Cross-post to TikTok'],
    locked: true,
  },
  {
    id: 6, title: 'Agency Launch Kit', category: 'Business', difficulty: 'Advanced', duration: '60 days',
    icon: <Target size={20} />, color: 'purple',
    steps: ['Define your niche and offer', 'Build a portfolio', 'Set up systems and processes', 'Get your first 3 clients', 'Scale with templates and SOPs'],
    locked: true,
  },
];

export default function Playbooks() {
  const [selectedPlaybook, setSelectedPlaybook] = useState(null);
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? PLAYBOOKS : PLAYBOOKS.filter((p) => p.category === filter);
  const categories = ['all', ...new Set(PLAYBOOKS.map((p) => p.category))];

  return (
    <div className="pod-page-container space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Playbooks</h2>
        <p className="text-sm text-gray-400">Step-by-step strategy guides for different goals</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 text-xs rounded-lg transition-all capitalize ${filter === cat ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-[#1a1a24] text-gray-400 border border-gray-800'}`}
          >
            {cat === 'all' ? 'All' : cat}
          </button>
        ))}
      </div>

      {/* Playbooks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((playbook) => (
          <button
            key={playbook.id}
            onClick={() => !playbook.locked && setSelectedPlaybook(playbook)}
            className={`pod-card text-left transition-all ${playbook.locked ? 'opacity-50 cursor-not-allowed' : 'hover:border-purple-500/30'}`}
          >
            <div className="flex items-start gap-3">
              <div className={`text-${playbook.color}-400`}>{playbook.locked ? <Lock size={20} /> : playbook.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-white">{playbook.title}</h3>
                  {playbook.locked && <Lock size={12} className="text-gray-600" />}
                </div>
                <p className="text-xs text-gray-500 mb-2">{playbook.category} &middot; {playbook.difficulty} &middot; {playbook.duration}</p>
                <div className="flex items-center gap-1">
                  {playbook.steps.slice(0, 3).map((_, i) => (
                    <div key={i} className="w-6 h-1 bg-purple-500/30 rounded-full" />
                  ))}
                  <span className="text-[10px] text-gray-600 ml-1">{playbook.steps.length} steps</span>
                </div>
              </div>
              {!playbook.locked && <ChevronRight size={16} className="text-gray-600 shrink-0" />}
            </div>
          </button>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedPlaybook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => setSelectedPlaybook(null)}>
          <div className="bg-[#111118] border border-gray-800 rounded-xl w-full max-w-lg max-h-[80vh] overflow-y-auto p-6 m-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`text-${selectedPlaybook.color}-400`}>{selectedPlaybook.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-white">{selectedPlaybook.title}</h3>
                <p className="text-xs text-gray-500">{selectedPlaybook.category} &middot; {selectedPlaybook.difficulty} &middot; {selectedPlaybook.duration}</p>
              </div>
            </div>
            <div className="space-y-3">
              {selectedPlaybook.steps.map((step, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-[#0a0a0f] rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</div>
                  <p className="text-sm text-gray-200">{step}</p>
                </div>
              ))}
            </div>
            <button onClick={() => setSelectedPlaybook(null)} className="btn-secondary w-full mt-4">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}