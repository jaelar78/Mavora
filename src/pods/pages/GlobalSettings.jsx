/******  GLOBAL SETTINGS — Cross-pod preferences  ******/
import React from 'react';
import { Settings, Globe, Bell, Shield, Palette, Database } from 'lucide-react';

export default function GlobalSettings() {
  return (
    <div className="pod-page-container">
      <h2 className="text-xl font-bold text-white mb-4">Global Settings</h2>
      <p className="text-sm text-gray-400 mb-6">These settings apply across all your pods.</p>
      <div className="max-w-lg space-y-3">
        {[
          { icon: <Globe size={16} />, label: 'Language & Region', desc: 'English (US)' },
          { icon: <Bell size={16} />, label: 'Notification Preferences', desc: 'Email & push enabled' },
          { icon: <Shield size={16} />, label: 'Privacy & Security', desc: '2FA enabled' },
          { icon: <Palette size={16} />, label: 'Theme', desc: 'Dark mode' },
          { icon: <Database size={16} />, label: 'Data & Export', desc: 'Export your data' },
        ].map((setting) => (
          <button key={setting.label} className="w-full flex items-center gap-3 p-3 bg-[#111118] border border-gray-800 rounded-xl hover:border-purple-500/30 transition-all text-left">
            <div className="text-purple-400">{setting.icon}</div>
            <div className="flex-1">
              <p className="text-sm text-white">{setting.label}</p>
              <p className="text-xs text-gray-500">{setting.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}