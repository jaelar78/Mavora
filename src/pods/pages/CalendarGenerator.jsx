/******  CALENDAR GENERATOR — AI-powered content calendar  ******/
import React, { useState } from 'react';
import {
  Calendar, Wand2, Plus, Trash2, Clock, Hash, Type, Image,
  Instagram, Youtube, Twitter, Check, X, ChevronLeft, ChevronRight,
  Sparkles, TrendingUp, Target, Loader2, RefreshCw
} from 'lucide-react';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const PLATFORM_COLORS = {
  Instagram: '#E1306C',
  TikTok: '#00f2ea',
  YouTube: '#FF0000',
  Twitter: '#1DA1F2',
  Facebook: '#1877F2',
  LinkedIn: '#0A66C2',
};

export default function CalendarGenerator() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1));
  const [generating, setGenerating] = useState(false);
  const [posts, setPosts] = useState(generateSamplePosts());
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newPost, setNewPost] = useState({ title: '', platform: 'Instagram', type: 'carousel', time: '12:00' });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getPostsForDate = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return posts.filter((p) => p.date === dateStr);
  };

  const handleDateClick = (day) => {
    setSelectedDate(day);
    setShowAddModal(true);
  };

  const addPost = () => {
    if (!newPost.title || !selectedDate) return;
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`;
    setPosts((prev) => [...prev, { id: Date.now(), ...newPost, date: dateStr, status: 'scheduled' }]);
    setShowAddModal(false);
    setNewPost({ title: '', platform: 'Instagram', type: 'carousel', time: '12:00' });
  };

  const deletePost = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const generateCalendar = () => {
    setGenerating(true);
    setTimeout(() => {
      const newPosts = generateSamplePosts();
      setPosts(newPosts);
      setGenerating(false);
    }, 2000);
  };

  return (
    <div className="pod-page-container space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">AI Calendar Generator</h2>
          <p className="text-sm text-gray-400">Generate and manage your content calendar</p>
        </div>
        <button onClick={generateCalendar} disabled={generating} className="btn-primary flex items-center gap-2 disabled:opacity-50">
          {generating ? <Loader2 size={16} className="animate-spin" /> : <Wand2 size={16} />}
          {generating ? 'Generating...' : 'AI Generate'}
        </button>
      </div>

      {/* Calendar Header */}
      <div className="pod-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">{MONTHS[month]} {year}</h3>
          <div className="flex items-center gap-2">
            <button onClick={prevMonth} className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white"><ChevronLeft size={16} /></button>
            <button onClick={() => setCurrentDate(new Date())} className="px-3 py-1 text-xs bg-[#1a1a24] text-gray-300 rounded-lg hover:bg-white/5">Today</button>
            <button onClick={nextMonth} className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white"><ChevronRight size={16} /></button>
          </div>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {DAYS.map((d) => (
            <div key={d} className="text-center text-xs text-gray-500 font-medium py-2">{d}</div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, day) => {
            const dayNum = day + 1;
            const dayPosts = getPostsForDate(dayNum);
            const isToday = dayNum === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
            return (
              <button
                key={dayNum}
                onClick={() => handleDateClick(dayNum)}
                className={`aspect-square p-1 rounded-lg border text-left transition-all hover:border-purple-500/30 ${
                  isToday ? 'border-purple-500/50 bg-purple-500/5' : 'border-gray-800/40 bg-[#0a0a0f]'
                }`}
              >
                <span className={`text-xs font-medium ${isToday ? 'text-purple-400' : 'text-gray-400'}`}>{dayNum}</span>
                <div className="flex flex-wrap gap-0.5 mt-1">
                  {dayPosts.slice(0, 3).map((p, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: PLATFORM_COLORS[p.platform] || '#9F7AEA' }} />
                  ))}
                  {dayPosts.length > 3 && <span className="text-[8px] text-gray-600">+{dayPosts.length - 3}</span>}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Upcoming Posts */}
      <div className="pod-card">
        <h3 className="text-sm font-semibold text-white mb-3">Upcoming Posts</h3>
        <div className="space-y-2">
          {posts.filter((p) => p.status === 'scheduled').slice(0, 10).map((post) => (
            <div key={post.id} className="flex items-center justify-between p-2 bg-[#0a0a0f] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: PLATFORM_COLORS[post.platform] || '#9F7AEA' }} />
                <div>
                  <p className="text-xs text-gray-200">{post.title}</p>
                  <p className="text-[10px] text-gray-500">{post.date} &middot; {post.time} &middot; {post.platform}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="pod-badge-purple text-[10px]">{post.type}</span>
                <button onClick={() => deletePost(post.id)} className="p-1 text-gray-600 hover:text-red-400"><Trash2 size={12} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Post Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => setShowAddModal(false)}>
          <div className="bg-[#111118] border border-gray-800 rounded-xl p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <h4 className="text-lg font-semibold text-white mb-4">Add Post — {MONTHS[month]} {selectedDate}</h4>
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
              </select>
              <input type="time" value={newPost.time} onChange={(e) => setNewPost((p) => ({ ...p, time: e.target.value }))} className="w-full input-field" />
              <div className="flex gap-2 justify-end">
                <button onClick={() => setShowAddModal(false)} className="btn-secondary text-sm">Cancel</button>
                <button onClick={addPost} className="btn-primary text-sm">Add Post</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function generateSamplePosts() {
  return [
    { id: 1, title: 'OOTD: Casual Friday', platform: 'Instagram', type: 'carousel', date: '2026-01-20', time: '12:00', status: 'scheduled' },
    { id: 2, title: 'Trend Alert: Pastels', platform: 'TikTok', type: 'reel', date: '2026-01-21', time: '19:00', status: 'scheduled' },
    { id: 3, title: 'Style Tips Tuesday', platform: 'Instagram', type: 'story', date: '2026-01-22', time: '10:00', status: 'scheduled' },
    { id: 4, title: 'Behind the Scenes', platform: 'YouTube', type: 'video', date: '2026-01-23', time: '14:00', status: 'scheduled' },
    { id: 5, title: 'Weekend Vibes', platform: 'Instagram', type: 'single', date: '2026-01-24', time: '11:00', status: 'scheduled' },
    { id: 6, title: 'Monday Motivation', platform: 'Twitter', type: 'single', date: '2026-01-27', time: '09:00', status: 'scheduled' },
    { id: 7, title: 'Sustainable Fashion', platform: 'Instagram', type: 'carousel', date: '2026-01-28', time: '13:00', status: 'scheduled' },
    { id: 8, title: 'Quick Style Hack', platform: 'TikTok', type: 'reel', date: '2026-01-29', time: '20:00', status: 'scheduled' },
  ];
}