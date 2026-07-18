/******  ACCOUNT PAGE  ******/
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, CreditCard, Bell, LogOut, ChevronRight, Shield, Palette, ToggleLeft, ToggleRight } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export default function Account() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({ name: '', email: '', bio: '' });
  const [notifications, setNotifications] = useState({
    emailDigest: true,
    campaignAlerts: true,
    productUpdates: false,
  });

  useEffect(() => {
    const getUser = async () => {
      const { data: { user: u } } = await supabase.auth.getUser();
      if (!u) { navigate('/login'); return; }
      setUser(u);
      setProfile({ name: u.user_metadata?.name || '', email: u.email, bio: u.user_metadata?.bio || '' });
    };
    getUser();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleUpdateProfile = async () => {
    await supabase.auth.updateUser({
      data: { name: profile.name, bio: profile.bio },
    });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold text-white">Account</h1>

        {/* Profile Card */}
        <div className="pod-card">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
              {profile.name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase()}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">{profile.name || 'Creator'}</h2>
              <p className="text-sm text-gray-400">{profile.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Display Name</label>
              <input
                value={profile.name}
                onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                className="w-full input-field"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Bio</label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
                rows={3}
                className="w-full input-field resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>
            <button onClick={handleUpdateProfile} className="btn-primary">Update Profile</button>
          </div>
        </div>

        {/* Notifications */}
        <div className="pod-card space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Bell size={18} className="text-purple-400" /> Notifications
          </h3>
          {[
            { key: 'emailDigest', label: 'Weekly Email Digest', desc: 'Get a summary of your pod performance' },
            { key: 'campaignAlerts', label: 'Campaign Alerts', desc: 'Notifications about your active campaigns' },
            { key: 'productUpdates', label: 'Product Updates', desc: 'New features and improvements' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white">{item.label}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
              <button
                onClick={() => setNotifications((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
                className={notifications[item.key] ? 'text-purple-400' : 'text-gray-600'}
              >
                {notifications[item.key] ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
              </button>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="pod-card space-y-2">
          <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors text-left">
            <div className="flex items-center gap-3">
              <CreditCard size={18} className="text-gray-400" />
              <span className="text-sm text-gray-200">Billing & Subscription</span>
            </div>
            <ChevronRight size={16} className="text-gray-600" />
          </button>
          <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors text-left">
            <div className="flex items-center gap-3">
              <Shield size={18} className="text-gray-400" />
              <span className="text-sm text-gray-200">Security</span>
            </div>
            <ChevronRight size={16} className="text-gray-600" />
          </button>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-red-500/10 transition-colors text-left group"
          >
            <div className="flex items-center gap-3">
              <LogOut size={18} className="text-red-400" />
              <span className="text-sm text-red-400 group-hover:text-red-300">Sign Out</span>
            </div>
            <ChevronRight size={16} className="text-red-400/50" />
          </button>
        </div>
      </div>
    </div>
  );
}