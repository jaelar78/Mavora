import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Globe,
  PenTool,
  Image,
  TrendingUp,
  Megaphone,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Globe, label: 'Websites', path: '/websites' },
  { icon: PenTool, label: 'Content Engine', path: '/content' },
  { icon: Image, label: 'Media Library', path: '/media' },
  { icon: TrendingUp, label: 'Growth Advice', path: '/advice' },
  { icon: Megaphone, label: 'Campaigns', path: '/campaigns' },
  { icon: Users, label: 'Artists', path: '/artists' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-[#3D3632] text-[#E8E2D9] z-50 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-72'
      } hidden lg:flex flex-col`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-[#5A524C]">
        <img
          src="/dovroyn-icon.svg"
          alt="Dovroyn"
          className="w-8 h-8 flex-shrink-0"
        />
        {!collapsed && (
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-wide text-[#FAF9F7]">
              Dovroyn
            </span>
            <span className="text-[10px] font-medium text-[#C9A96E] bg-[#C9A96E]/10 px-1.5 py-0.5 rounded">
              BETA
            </span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 space-y-1 px-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                collapsed ? 'justify-center' : ''
              } ${
                isActive
                  ? 'bg-[#C9A96E]/15 text-[#C9A96E]'
                  : 'text-[#9E9484] hover:bg-[#4A433E] hover:text-[#FAF9F7]'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="p-2 border-t border-[#5A524C]">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full py-2 rounded-lg text-[#9E9484] hover:bg-[#4A433E] hover:text-[#FAF9F7] transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          {!collapsed && <span className="ml-2 text-sm">Collapse</span>}
        </button>
      </div>

      {/* Footer */}
      {!collapsed && (
        <div className="px-4 py-3 border-t border-[#5A524C]">
          <p className="text-[10px] text-[#9E9484]/60 leading-relaxed">
            A product of Anglow Digital PTY LTD
          </p>
        </div>
      )}
    </aside>
  );
}
