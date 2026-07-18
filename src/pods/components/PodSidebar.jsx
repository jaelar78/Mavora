/******  POD SIDEBAR — Per-pod navigation with 14 pages  ******/
import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import {
  LayoutDashboard, FileText, Calendar, Sparkles, Wand2, BarChart3, Wrench,
  BookOpen, Plug, Settings, Users, Target, DollarSign, Globe, Rocket,
  Image, Link2, ChevronLeft,
} from 'lucide-react';

// ─── Pod-specific navigation (per pod) ───
const POD_NAV = [
  { to: 'overview',        label: 'Overview',           icon: LayoutDashboard },
  { to: 'content',         label: 'Content Generator',  icon: FileText },
  { to: 'calendar',        label: 'Content Calendar',   icon: Calendar },
  { to: 'ai-assistant',    label: 'AI Assistant',       icon: Sparkles },
  { to: 'calendar-generator', label: 'AI Calendar',     icon: Calendar },
  { to: 'optimizer',       label: 'AI Optimizer',       icon: Wand2 },
  { to: 'analytics',       label: 'Analytics',          icon: BarChart3 },
  { to: 'tools',           label: 'Tools',              icon: Wrench },
  { to: 'playbooks',       label: 'Playbooks',          icon: BookOpen },
  { to: 'integrations',    label: 'Integrations',       icon: Plug },
  { to: 'collaborations',  label: 'Collaborations',     icon: Users },
  { to: 'campaigns',       label: 'Ad Campaigns',       icon: Target },
  { to: 'budget',          label: 'Budget Tracker',     icon: DollarSign },
  { to: 'website-analyzer',label: 'Website Analyzer',   icon: Globe },
  { to: 'coming-soon',     label: 'Coming Soon Builder',icon: Rocket },
  { to: 'assets',          label: 'Assets',             icon: Image },
  { to: 'social-accounts', label: 'Social Accounts',    icon: Link2 },
  { to: 'pod-settings',    label: 'Settings',           icon: Settings },
];

export default function PodSidebar({ podId, pod }) {
  const basePath = `/pods/${podId}`;

  return (
    <aside className="w-56 bg-[#111118] border-r border-gray-800/60 flex flex-col shrink-0 overflow-hidden">
      {/* Pod Identity */}
      <div className="p-3 border-b border-gray-800/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
            {pod?.name?.charAt(0)?.toUpperCase() || 'P'}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">{pod?.name || 'Pod'}</p>
            <p className="text-[10px] text-gray-500">{pod?.type} &middot; {pod?.status || 'Active'}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {POD_NAV.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={`${basePath}/${item.to}`}
              end={item.to === 'overview'}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-1.5 text-xs rounded-lg transition-all ${
                  isActive
                    ? 'bg-purple-500/10 text-purple-400 font-medium'
                    : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                }`
              }
            >
              <Icon size={14} />
              <span className="truncate">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-gray-800/60">
        <a
          href="/pods"
          className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-400 hover:text-gray-200 rounded-lg hover:bg-white/5 transition-all"
        >
          <ChevronLeft size={14} />
          <span>All Pods</span>
        </a>
      </div>
    </aside>
  );
}