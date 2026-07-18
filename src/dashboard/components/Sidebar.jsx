/******  DASHBOARD SIDEBAR  ******/
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Target, FileText, TrendingUp, Image, Users, Globe, Settings, Sparkles, ChevronLeft
} from 'lucide-react';

const NAV = [
  { to: '/dashboard',             label: 'Dashboard',          icon: LayoutDashboard },
  { to: '/dashboard/campaigns',   label: 'Campaigns',          icon: Target },
  { to: '/dashboard/content-engine', label: 'Content Engine',  icon: FileText },
  { to: '/dashboard/growth-advice',  label: 'Growth Advice',   icon: TrendingUp },
  { to: '/dashboard/media-library',  label: 'Media Library',   icon: Image },
  { to: '/dashboard/artist-submissions', label: 'Submissions', icon: Users },
  { to: '/dashboard/websites',    label: 'Websites',           icon: Globe },
  { to: '/dashboard/settings',    label: 'Settings',           icon: Settings },
];

export default function DashboardSidebar() {
  return (
    <aside className="w-56 bg-[#111118] border-r border-gray-800/60 flex flex-col shrink-0">
      <nav className="flex-1 p-3 space-y-1">
        {NAV.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/dashboard'}
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
        <NavLink
          to="/pods"
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-gray-200 rounded-lg hover:bg-white/5 transition-all"
        >
          <ChevronLeft size={16} />
          <span>Back to Pods</span>
        </NavLink>
      </div>
    </aside>
  );
}