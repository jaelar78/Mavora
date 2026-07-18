/******  CONTENT CALENDAR — Weekly/monthly view with best-time hints  ******/
import React, { useState } from 'react';
import {
  Calendar, ChevronLeft, ChevronRight, Plus, Clock, Instagram, Youtube,
  Twitter, Hash, Type, Image, Video, Check, X, Edit3, Trash2, Sparkles,
  TrendingUp, Target, Wand2
} from 'lucide-react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const WEEKS = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

const PLATFORM_COLORS = {
  Instagram: '#E1306C',
  TikTok: '#00f2ea',
  YouTube: '#FF0000',
  Twitter: '#1DA1F2',
  Facebook: '#1877F2',
  LinkedIn: '#0A66C2',
};

const SAMPLE_SCHEDULE = {
  'Mon': [
    { id: 1, time: '9:00 AM', title: 'Morning Motivation', platform: 'Instagram', type: 'carousel', status: 'published' },
    { id: 2, time: '3:00 PM', title: 'Product Showcase', platform: 'TikTok', type: 'video', status: 'scheduled' },
  ],
  'Tue': [
    { id: 3, time: '11:00 AM', title: 'Behind the Scenes', platform: 'Instagram', type: 'story', status: 'draft' },
    { id: 4, time: '7:00 PM', title: 'Tutorial Tuesday', platform: 'YouTube', type: 'video', status: 'scheduled' },
  ],
  'Wed': [
    { id: 5, time: '10:00 AM', title: 'Educational Post', platform: 'Instagram', type: 'carousel', status: 'scheduled' },
    { id: 6, time: '2:00 PM', title: 'Quick Tips', platform: 'Twitter', type: 'text', status: 'draft' },
  ],
  'Thu': [
    { id: 7, time: '9:30 AM', title: 'Trending Topic', platform: 'TikTok', type: 'video', status: 'scheduled' },
    { id: 8, time: '6:00 PM', title: 'Community Q&A', platform: 'Instagram', type: 'story', status: 'draft' },
  ],
  'Fri': [
    { id: 9, time: '12:00 PM', title: 'Friday Favorites', platform: 'Instagram', type: 'carousel', status: 'scheduled' },
    { id: 10, time: '5:00 PM', title: 'Week Recap', platform: 'Twitter', type: 'text', status: 'draft' },
  ],
  'Sat': [
    { id: 11, time: '10:00 AM', title: 'Weekend Vibes', platform: 'Instagram', type: 'single', status: 'scheduled' },
  ],
  'Sun': [
    { id: 12, time: '7:00 PM', title: 'Sunday Planning', platform: 'Instagram', type: 'carousel', status: 'draft' },
  ],
};

export default function ContentCalendar() {
  const [schedule, setSchedule] = useState(SAMPLE_SCHEDULE);
  const [view, setView] = useState('weekly');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', platform: 'Instagram', type: 'carousel', time: '12:00' });

  const addPost = () => {
    if (!newPost.title || !selectedSlot) return;
    const day = selectedSlot.day;
    setSchedule((s) => ({
      ...s,
      [day]: [...(s[day] || []), { id: Date.now(), ...newPost, status: 'draft' }],
    }));
    setShowAdd(false);
    setNewPost({ title: '', platform: 'Instagram', type: 'carousel', time: '12:00' });
  };

  const deletePost = (day, postId) => {
    setSchedule((s) => ({ ...s, [day]: s[day].filter((p) => p.id !== postId) }));
  };

  const statusColors = { published: 'bg-green-500/10 text-green-400 border-green-500/20', scheduled: 'bg-purple-500/10 text-purple-400 border-purple-500/20', draft: 'bg-gray-800 text-gray-400 border-gray-700' };

  return (
    <div className="pod-page-container space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Content Calendar</h2>
          <p className="text-sm text-gray-400">Plan and schedule your content</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#1a1a24] border border-gray-800 rounded-lg p-1">
            <button onClick={() => setView('weekly')} className={`px-3 py-1 text-xs rounded-md transition-all ${view === 'weekly' ? 'bg-purple-500/20 text-purple-400' : 'text-gray-400'}`}>Weekly</button>
            <button onClick={() => setView('monthly')} className={`px-3 py-1 text-xs rounded-md transition-all ${view === 'monthly' ? 'bg-purple-500/20 text-purple-400' : 'text-gray-400'}`}>Monthly</button>
          </div>
        </div>
      </div>

      {/* Weekly View */}
      {view === 'weekly' && (
        <div className="grid grid-cols-7 gap-2">
          {DAYS.map((day) => (
            <div key={day} className="bg-[#111118] border border-gray-800/60 rounded-xl p-3 min-h-[300px]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{day}</span>
                <button onClick={() => { setSelectedSlot({ day }); setShowAdd(true); }} className="p-1 text-gray-600 hover:text-purple-400 transition-colors">
                  <Plus size={12} />
                </button>
              </div>
              <div className="space-y-2">
                {(schedule[day] || []).map((post) => (
                  <div key={post.id} className={`p-2 border rounded-lg ${statusColors[post.status]}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-medium opacity-70">{post.time}</span>
                      <button onClick={() => deletePost(day, post.id)} className="text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 size={10} />
                      </button>
                    </div>
                    <p className="text-xs font-medium truncate">{post.title}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: PLATFORM_COLORS[post.platform] || '#9F7AEA' }} />
                      <span className="text-[9px] opacity-60">{post.platform}</span>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => { setSelectedSlot({ day }); setShowAdd(true); }}
                  className="w-full py-2 border border-dashed border-gray-700 rounded-lg text-xs text-gray-600 hover:border-purple-500/30 hover:text-purple-400 transition-all flex items-center justify-center gap-1"
                >
                  <Plus size={12} /> Add
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="pod-stat-card">
          <div className="flex items-center gap-2 text-gray-500"><Check size={14} /><span className="pod-stat-label">Published</span></div>
          <span className="pod-stat-value">{Object.values(schedule).flat().filter((p) => p.status === 'published').length}</span>
        </div>
        <div className="pod-stat-card">
          <div className="flex items-center gap-2 text-gray-500"><Clock size={14} /><span className="pod-stat-label">Scheduled</span></div>
          <span className="pod-stat-value">{Object.values(schedule).flat().filter((p) => p.status === 'scheduled').length}</span>
        </div>
        <div className="pod-stat-card">
          <div className="flex items-center gap-2 text-gray-500"><Sparkles size={14} /><span className="pod-stat-label">Drafts</span></div>
          <span className="pod-stat-value">{Object.values(schedule).flat().filter((p) => p.status === 'draft').length}</span>
        </div>
      </div>

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => setShowAdd(false)}>
          <div className="bg-[#111118] border border-gray-800 rounded-xl p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <h4 className="text-lg font-semibold text-white mb-4">Add Post — {selectedSlot?.day}</h4>
            <div className="space-y-3">
              <input value={newPost.title} onChange={(e) => setNewPost((p) => ({ ...p, title: e.target.value }))} placeholder="Post title..." className="w-full input-field" />
              <select value={newPost.platform} onChange={(e) => setNewPost((p) => ({ ...p, platform: e.target.value }))} className="w-full input-field">
                {Object.keys(PLATFORM_COLORS).map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
              <select value={newPost.type} onChange={(e) => setNewPost((p) => ({ ...p, type: e.target.value }))} className="w-full input-field">
                <option value="carousel">Carousel</option>
                <option value="reel">Reel</option>
                <option value="story">Story</option>
                <option value="single">Single Image</option>
                <option value="video">Video</option>
                <option value="text">Text</option>
              </select>
              <input type="time" value={newPost.time} onChange={(e) => setNewPost((p) => ({ ...p, time: e.target.value }))} className="w-full input-field" />
              <div className="flex gap-2 justify-end">
                <button onClick={() => setShowAdd(false)} className="btn-secondary text-sm">Cancel</button>
                <button onClick={addPost} className="btn-primary text-sm">Add Post</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}