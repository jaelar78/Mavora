/******  GLOBAL SIDEBAR — Shared across global pod pages  ******/
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sparkles, Wrench, BookOpen, Plug, Settings, ChevronLeft } from 'lucide-react';

const NAV_ITEMS = [
  { to: '/pods/fashion-forward/ai-assistant', label: 'AI Assistant', icon: Sparkles },
  { to: '/pods/fashion-forward/tools', label: 'Tools', icon: Wrench },
  { to: '/pods/fashion-forward/playbooks', label: 'Playbooks', icon: BookOpen },
  { to: '/pods/fashion-forward/integrations', label: 'Integrations', icon: Plug },
  { to: '/pods/fashion-forward/settings', label: 'Settings', icon: Settings },
];

export default function GlobalSidebar() {
  return (
    <aside className="w-56 bg-[#111118] border-r border-gray-800/60 flex flex-col shrink-0">
      <div className="p-4 border-b border-gray-800/60">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">D</span>
          </div>
          <span className="text-white font-semibold text-sm">Global Tools</span>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all ${
                  isActive
                    ? 'bg-purple-500/10 text-purple-400 border-l-2 border-purple-500'
                    : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                }`
              }
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
      <div className="p-3 border-t border-gray-800/60">
        <a
          href="/pods"
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-gray-200 rounded-lg hover:bg-white/5 transition-all"
        >
          <ChevronLeft size={16} />
          <span>Back to Pods</span>
        </a>
      </div>
    </aside>
  );
}