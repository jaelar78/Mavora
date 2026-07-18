/******  POD HEADER — Pod name, status, quick actions  ******/
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bell, Settings } from 'lucide-react';

export default function PodHeader({ pod, podId }) {
  return (
    <header className="h-14 bg-[#111118] border-b border-gray-800/60 flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-3">
        <Link
          to="/pods"
          className="p-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
        >
          <ArrowLeft size={18} />
        </Link>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-xs">
          {pod?.name?.charAt(0)?.toUpperCase() || 'P'}
        </div>
        <div>
          <h1 className="text-sm font-semibold text-white leading-tight">{pod?.name || 'Pod'}</h1>
          <p className="text-[10px] text-gray-500">{pod?.type} &middot; {pod?.status || 'Active'}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="pod-badge-purple text-xs">{pod?.status || 'Active'}</span>
        <button className="p-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
          <Bell size={16} />
        </button>
        <Link
          to={`/pods/${podId}/pod-settings`}
          className="p-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
        >
          <Settings size={16} />
        </Link>
      </div>
    </header>
  );
}