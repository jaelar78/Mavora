/******  SETTINGS — Account & Pod Configuration  ******/
import React, { useState } from 'react';
import {
  Settings, User, Bell, Shield, CreditCard, Palette, Globe, Key,
  ChevronRight, ToggleLeft, ToggleRight, Check, X, AlertTriangle
} from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

const SECTIONS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'integrations', label: 'Integrations', icon: Globe },
  { id: 'api', label: 'API Keys', icon: Key },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Profile state
  const [profile, setProfile] = useState({
    displayName: 'Alex Creator',
    email: 'alex@example.com',
    bio: 'Digital creator & entrepreneur building brands online.',
    website: 'https://alexcreator.com',
    timezone: 'America/New_York',
  });

  // Notification state
  const [notifications, setNotifications] = useState({
    emailDigest: true,
    campaignAlerts: true,
    collaborationRequests: true,
    weeklyReport: true,
    productUpdates: false,
  });

  // Appearance state
  const [appearance, setAppearance] = useState({
    theme: 'dark',
    sidebarCollapsed: false,
    compactMode: false,
  });

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 800);
  };

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-gray-400 mt-1">Manage your account preferences and configuration</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-48 shrink-0 space-y-1">
          {SECTIONS.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all text-left ${
                  activeSection === section.id
                    ? 'bg-purple-500/10 text-purple-400 border-l-2 border-purple-500'
                    : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                }`}
              >
                <Icon size={16} />
                <span>{section.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-6">
          {activeSection === 'profile' && (
            <div className="pod-card space-y-4">
              <h3 className="text-lg font-semibold text-white">Profile</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
                  {profile.displayName.charAt(0)}
                </div>
                <div>
                  <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">Change Avatar</button>
                  <p className="text-xs text-gray-500">JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Display Name</label>
                  <input value={profile.displayName} onChange={(e) => setProfile((p) => ({ ...p, displayName: e.target.value }))} className="w-full input-field" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Email</label>
                  <input value={profile.email} onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))} className="w-full input-field" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Bio</label>
                <textarea value={profile.bio} onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))} rows={3} className="w-full input-field resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Website</label>
                  <input value={profile.website} onChange={(e) => setProfile((p) => ({ ...p, website: e.target.value }))} className="w-full input-field" placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Timezone</label>
                  <select value={profile.timezone} onChange={(e) => setProfile((p) => ({ ...p, timezone: e.target.value }))} className="w-full input-field">
                    <option>America/New_York</option>
                    <option>America/Los_Angeles</option>
                    <option>Europe/London</option>
                    <option>Europe/Paris</option>
                    <option>Asia/Tokyo</option>
                    <option>Australia/Sydney</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end">
                <button onClick={handleSave} className="btn-primary">
                  {saved ? 'Saved!' : saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="pod-card space-y-4">
              <h3 className="text-lg font-semibold text-white">Notifications</h3>
              <div className="space-y-3">
                {[
                  { key: 'emailDigest', label: 'Daily Email Digest', desc: 'Get a summary of your pod activity every morning' },
                  { key: 'campaignAlerts', label: 'Campaign Alerts', desc: 'Notifications when campaigns start, end, or need attention' },
                  { key: 'collaborationRequests', label: 'Collaboration Requests', desc: 'Alert when someone wants to collaborate' },
                  { key: 'weeklyReport', label: 'Weekly Performance Report', desc: 'Detailed analytics report every Monday' },
                  { key: 'productUpdates', label: 'Product Updates', desc: 'New features and improvements from Dovroyn' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-3 bg-[#0a0a0f] rounded-lg">
                    <div>
                      <p className="text-sm text-white font-medium">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => toggleNotification(item.key)}
                      className={`transition-colors ${notifications[item.key] ? 'text-purple-400' : 'text-gray-600'}`}
                    >
                      {notifications[item.key] ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="pod-card space-y-4">
              <h3 className="text-lg font-semibold text-white">Security</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#0a0a0f] rounded-lg">
                  <div>
                    <p className="text-sm text-white font-medium">Change Password</p>
                    <p className="text-xs text-gray-500">Last changed 30 days ago</p>
                  </div>
                  <button className="btn-secondary text-sm">Change</button>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#0a0a0f] rounded-lg">
                  <div>
                    <p className="text-sm text-white font-medium">Two-Factor Authentication</p>
                    <p className="text-xs text-gray-500">Add an extra layer of security</p>
                  </div>
                  <button className="btn-secondary text-sm">Enable</button>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#0a0a0f] rounded-lg">
                  <div>
                    <p className="text-sm text-white font-medium">Active Sessions</p>
                    <p className="text-xs text-gray-500">2 active sessions</p>
                  </div>
                  <button className="text-sm text-red-400 hover:text-red-300 transition-colors">Manage</button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'billing' && (
            <div className="pod-card space-y-4">
              <h3 className="text-lg font-semibold text-white">Billing</h3>
              <div className="p-4 bg-purple-500/5 border border-purple-500/20 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-purple-400 font-medium">Current Plan</span>
                  <span className="pod-badge-purple">Growth</span>
                </div>
                <p className="text-2xl font-bold text-white">$79<span className="text-sm text-gray-500 font-normal">/mo</span></p>
                <p className="text-sm text-gray-400 mt-1">Next billing: February 15, 2026</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-white">Recent Invoices</h4>
                {[
                  { date: 'Jan 15, 2026', amount: '$79.00', status: 'Paid' },
                  { date: 'Dec 15, 2025', amount: '$79.00', status: 'Paid' },
                  { date: 'Nov 15, 2025', amount: '$79.00', status: 'Paid' },
                ].map((inv) => (
                  <div key={inv.date} className="flex items-center justify-between p-3 bg-[#0a0a0f] rounded-lg">
                    <div className="flex items-center gap-3">
                      <CreditCard size={14} className="text-gray-500" />
                      <span className="text-sm text-gray-300">{inv.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-white">{inv.amount}</span>
                      <span className="pod-badge-green text-xs">{inv.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'appearance' && (
            <div className="pod-card space-y-4">
              <h3 className="text-lg font-semibold text-white">Appearance</h3>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Theme</label>
                <div className="flex gap-2">
                  {['dark', 'light', 'system'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setAppearance((prev) => ({ ...prev, theme: t }))}
                      className={`px-4 py-2 text-sm rounded-lg capitalize transition-all ${
                        appearance.theme === t ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-[#0a0a0f] text-gray-400 border border-gray-800'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#0a0a0f] rounded-lg">
                <div>
                  <p className="text-sm text-white font-medium">Compact Mode</p>
                  <p className="text-xs text-gray-500">Reduce padding for denser UI</p>
                </div>
                <button
                  onClick={() => setAppearance((prev) => ({ ...prev, compactMode: !prev.compactMode }))}
                  className={`transition-colors ${appearance.compactMode ? 'text-purple-400' : 'text-gray-600'}`}
                >
                  {appearance.compactMode ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                </button>
              </div>
            </div>
          )}

          {activeSection === 'integrations' && (
            <div className="pod-card space-y-4">
              <h3 className="text-lg font-semibold text-white">Integrations</h3>
              <div className="space-y-3">
                {[
                  { name: 'Instagram', status: 'connected', icon: '📸' },
                  { name: 'TikTok', status: 'connected', icon: '🎵' },
                  { name: 'YouTube', status: 'disconnected', icon: '📺' },
                  { name: 'Twitter / X', status: 'disconnected', icon: '🐦' },
                  { name: 'Shopify', status: 'disconnected', icon: '🛍️' },
                  { name: 'Stripe', status: 'connected', icon: '💳' },
                ].map((integration) => (
                  <div key={integration.name} className="flex items-center justify-between p-3 bg-[#0a0a0f] rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{integration.icon}</span>
                      <div>
                        <p className="text-sm text-white font-medium">{integration.name}</p>
                        <span className={`text-xs ${integration.status === 'connected' ? 'text-green-400' : 'text-gray-500'}`}>{integration.status}</span>
                      </div>
                    </div>
                    <button className={`text-sm ${integration.status === 'connected' ? 'text-red-400 hover:text-red-300' : 'text-purple-400 hover:text-purple-300'} transition-colors`}>
                      {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'api' && (
            <div className="pod-card space-y-4">
              <h3 className="text-lg font-semibold text-white">API Keys</h3>
              <div className="p-4 bg-[#0a0a0f] rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Production Key</span>
                  <span className="pod-badge-green text-xs">Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-[#111118] border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-300 font-mono">dov_prod_••••••••••••••••</code>
                  <button className="p-2 text-gray-400 hover:text-white transition-colors"><Copy size={14} /></button>
                </div>
              </div>
              <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg flex items-start gap-3">
                <AlertTriangle size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-400">Keep your API keys secure. Never share them in client-side code or public repositories.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}