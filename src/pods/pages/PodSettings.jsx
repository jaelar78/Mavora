/******  POD SETTINGS — Full pod configuration  ******/
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePod } from '../PodContext';
import {
  Settings, Type, Palette, Globe, Clock, Hash, Users, Target, Image,
  Bell, Shield, Trash2, Save, Check, X, ToggleLeft, ToggleRight,
  Instagram, Youtube, Twitter, Facebook, Linkedin, AlertTriangle
} from 'lucide-react';

export default function PodSettings() {
  const { podId } = useParams();
  const { pods, updatePod } = usePod();
  const pod = pods.find((p) => p.id === podId);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [form, setForm] = useState({
    name: pod?.name || '',
    type: pod?.type || 'Fashion',
    bio: pod?.bio || '',
    website: pod?.website || '',
    tone: pod?.settings?.tone || 'Casual',
    postingFrequency: pod?.settings?.postingFrequency || 'daily',
    autoSchedule: pod?.settings?.autoSchedule ?? true,
    notifications: {
      contentReminders: true,
      analyticsAlerts: true,
      collaborationRequests: true,
      weeklyReports: false,
    },
  });

  if (!pod) return <div className="pod-page-container"><p className="text-gray-400">Pod not found</p></div>;

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      updatePod(podId, {
        name: form.name,
        type: form.type,
        bio: form.bio,
        website: form.website,
        settings: {
          ...pod.settings,
          tone: form.tone,
          postingFrequency: form.postingFrequency,
          autoSchedule: form.autoSchedule,
        },
      });
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 600);
  };

  const toggleNotification = (key) => {
    setForm((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: !prev.notifications[key] },
    }));
  };

  return (
    <div className="pod-page-container max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Pod Settings</h2>
          <p className="text-sm text-gray-400">Configure {pod.name}</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2 disabled:opacity-50">
          {saved ? <Check size={16} /> : saving ? 'Saving...' : <Save size={16} />}
          {saved ? 'Saved!' : saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* General */}
      <div className="pod-card space-y-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2"><Type size={16} className="text-purple-400" /> General</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Pod Name</label>
            <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="w-full input-field" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Category</label>
            <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))} className="w-full input-field">
              {['Fashion', 'Fitness', 'Art', 'Tech', 'Food', 'Travel', 'Lifestyle', 'Business', 'Music', 'Photography', 'Gaming', 'Beauty', 'Education', 'Other'].map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Bio</label>
          <textarea value={form.bio} onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))} rows={3} className="w-full input-field resize-none" />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Website</label>
          <input value={form.website} onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))} className="w-full input-field" placeholder="https://..." />
        </div>
      </div>

      {/* Content Preferences */}
      <div className="pod-card space-y-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2"><Palette size={16} className="text-purple-400" /> Content Preferences</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Content Tone</label>
            <select value={form.tone} onChange={(e) => setForm((f) => ({ ...f, tone: e.target.value }))} className="w-full input-field">
              {['Casual', 'Professional', 'Playful', 'Inspirational', 'Educational', 'Bold', 'Witty', 'Motivational'].map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Posting Frequency</label>
            <select value={form.postingFrequency} onChange={(e) => setForm((f) => ({ ...f, postingFrequency: e.target.value }))} className="w-full input-field">
              <option value="multiple_daily">Multiple times daily</option>
              <option value="daily">Daily</option>
              <option value="3x_week">3x per week</option>
              <option value="2x_week">2x per week</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
        </div>
        <div className="flex items-center justify-between p-2 bg-[#0a0a0f] rounded-lg">
          <div>
            <p className="text-sm text-white">Auto-Schedule</p>
            <p className="text-xs text-gray-500">AI suggests best posting times</p>
          </div>
          <button onClick={() => setForm((f) => ({ ...f, autoSchedule: !f.autoSchedule }))} className={form.autoSchedule ? 'text-purple-400' : 'text-gray-600'}>
            {form.autoSchedule ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="pod-card space-y-3">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2"><Bell size={16} className="text-purple-400" /> Notifications</h3>
        {[
          { key: 'contentReminders', label: 'Content Reminders', desc: 'Remind me to create content' },
          { key: 'analyticsAlerts', label: 'Analytics Alerts', desc: 'Notify me of significant changes' },
          { key: 'collaborationRequests', label: 'Collaboration Requests', desc: 'Alert on new partnership requests' },
          { key: 'weeklyReports', label: 'Weekly Reports', desc: 'Send weekly performance summary' },
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between p-2 bg-[#0a0a0f] rounded-lg">
            <div>
              <p className="text-sm text-white">{item.label}</p>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
            <button onClick={() => toggleNotification(item.key)} className={form.notifications[item.key] ? 'text-purple-400' : 'text-gray-600'}>
              {form.notifications[item.key] ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
            </button>
          </div>
        ))}
      </div>

      {/* Danger Zone */}
      <div className="pod-card border-red-500/20">
        <h3 className="text-sm font-semibold text-red-400 flex items-center gap-2 mb-3"><AlertTriangle size={16} /> Danger Zone</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white">Delete Pod</p>
            <p className="text-xs text-gray-500">This action cannot be undone</p>
          </div>
          <button onClick={() => setShowDelete(true)} className="px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-xs hover:bg-red-500/20 transition-all">
            Delete Pod
          </button>
        </div>
      </div>

      {/* Delete Confirmation */}
      {showDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => setShowDelete(false)}>
          <div className="bg-[#111118] border border-red-500/30 rounded-xl p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-white mb-2">Delete {pod.name}?</h3>
            <p className="text-sm text-gray-400 mb-4">This will permanently delete all data associated with this pod. This action cannot be undone.</p>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowDelete(false)} className="btn-secondary text-sm">Cancel</button>
              <button onClick={() => setShowDelete(false)} className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-all">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}