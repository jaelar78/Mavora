/******  SOCIAL ACCOUNTS — Connect and manage social accounts  ******/
import React, { useState } from 'react';
import {
  Link2, Instagram, Youtube, Twitter, Facebook, Linkedin, MessageCircle,
  Check, X, ExternalLink, RefreshCw, Plus, Trash2, AlertCircle
} from 'lucide-react';

const ACCOUNTS = [
  { id: 'instagram', name: 'Instagram', handle: '@fashionforward', followers: '28.4K', icon: <Instagram size={20} />, color: '#E1306C', connected: true, lastSync: '2 min ago', status: 'active' },
  { id: 'tiktok', name: 'TikTok', handle: '@fashionforward', followers: '12.1K', icon: <Twitter size={20} />, color: '#00f2ea', connected: true, lastSync: '5 min ago', status: 'active' },
  { id: 'youtube', name: 'YouTube', handle: 'Fashion Forward', followers: '4.2K', icon: <Youtube size={20} />, color: '#FF0000', connected: true, lastSync: '1 hr ago', status: 'active' },
  { id: 'twitter', name: 'Twitter / X', handle: '@fashionfwd', followers: '8.9K', icon: <Twitter size={20} />, color: '#1DA1F2', connected: false, lastSync: null, status: 'disconnected' },
  { id: 'facebook', name: 'Facebook', handle: 'Fashion Forward', followers: '15.3K', icon: <Facebook size={20} />, color: '#1877F2', connected: false, lastSync: null, status: 'disconnected' },
  { id: 'linkedin', name: 'LinkedIn', handle: 'Fashion Forward', followers: '1.2K', icon: <Linkedin size={20} />, color: '#0A66C2', connected: false, lastSync: null, status: 'disconnected' },
  { id: 'pinterest', name: 'Pinterest', handle: 'fashionforward', followers: '22.6K', icon: <MessageCircle size={20} />, color: '#E60023', connected: true, lastSync: '30 min ago', status: 'active' },
  { id: 'threads', name: 'Threads', handle: '@fashionforward', followers: '3.4K', icon: <MessageCircle size={20} />, color: '#000000', connected: false, lastSync: null, status: 'disconnected' },
];

export default function SocialAccounts() {
  const [accounts, setAccounts] = useState(ACCOUNTS);

  const toggleConnection = (id) => {
    setAccounts((prev) => prev.map((a) => a.id === id ? { ...a, connected: !a.connected, status: a.connected ? 'disconnected' : 'active', lastSync: a.connected ? null : 'Just now' } : a));
  };

  const connectedCount = accounts.filter((a) => a.connected).length;
  const totalFollowers = accounts.filter((a) => a.connected).reduce((s, a) => s + parseFloat(a.followers.replace('K', '')) * (a.followers.includes('M') ? 1e6 : a.followers.includes('K') ? 1e3 : 1), 0);

  return (
    <div className="pod-page-container space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Social Accounts</h2>
        <p className="text-sm text-gray-400">Connect and manage your social media accounts</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="pod-stat-card">
          <div className="flex items-center gap-2 text-gray-500"><Link2 size={14} /><span className="pod-stat-label">Connected</span></div>
          <span className="pod-stat-value">{connectedCount}/{accounts.length}</span>
        </div>
        <div className="pod-stat-card">
          <div className="flex items-center gap-2 text-gray-500"><Check size={14} /><span className="pod-stat-label">Active</span></div>
          <span className="pod-stat-value">{accounts.filter((a) => a.status === 'active').length}</span>
        </div>
        <div className="pod-stat-card">
          <div className="flex items-center gap-2 text-gray-500"><Link2 size={14} /><span className="pod-stat-label">Total Reach</span></div>
          <span className="pod-stat-value">{(totalFollowers / 1e3).toFixed(1)}K</span>
        </div>
      </div>

      {/* Accounts List */}
      <div className="space-y-2">
        {accounts.map((account) => (
          <div key={account.id} className={`flex items-center justify-between p-4 bg-[#111118] border rounded-xl transition-all ${account.connected ? 'border-gray-800' : 'border-gray-800/40 opacity-60'}`}>
            <div className="flex items-center gap-3">
              <div style={{ color: account.color }}>{account.icon}</div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white">{account.name}</p>
                  {account.connected && <span className="pod-badge-green text-[10px]">Connected</span>}
                </div>
                {account.connected ? (
                  <p className="text-xs text-gray-500">{account.handle} &middot; {account.followers} followers &middot; Synced {account.lastSync}</p>
                ) : (
                  <p className="text-xs text-gray-600">Not connected</p>
                )}
              </div>
            </div>
            <button
              onClick={() => toggleConnection(account.id)}
              className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
                account.connected
                  ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20'
                  : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/20'
              }`}
            >
              {account.connected ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}