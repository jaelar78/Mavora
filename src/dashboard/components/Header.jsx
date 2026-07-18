/******  DASHBOARD HEADER  ******/
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Search } from 'lucide-react';
import { usePod } from '../../pods/PodContext';

export default function DashboardHeader() {
  const { currentPod } = usePod();

  return (
    <header className="h-14 bg-[#111118] border-b border-gray-800/60 flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">D</span>
          </div>
          <span className="text-white font-semibold text-sm hidden md:block">Dovroyn</span>
        </Link>
        {currentPod && (
          <>
            <span className="text-gray-600">/</span>
            <span className="text-sm text-purple-400 font-medium">{currentPod.name}</span>
          </>
        )}
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center bg-[#1a1a24] border border-gray-800 rounded-lg px-3 py-1.5">
          <Search size={14} className="text-gray-500 mr-2" />
          <input placeholder="Search..." className="bg-transparent text-sm text-white placeholder-gray-500 outline-none w-40" />
        </div>
        <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full" />
        </button>
        <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
          U
        </div>
      </div>
    </header>
  );
}