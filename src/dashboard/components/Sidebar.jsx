import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Globe,
  Sparkles,
  Image,
  TrendingUp,
  Rocket,
  Palette,
  Settings,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";

const navItems = [
  { path: "/app", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/app/websites", icon: Globe, label: "Websites" },
  { path: "/app/content", icon: Sparkles, label: "Content Engine" },
  { path: "/app/media", icon: Image, label: "Media Library" },
  { path: "/app/growth", icon: TrendingUp, label: "Growth Advice" },
  { path: "/app/campaigns", icon: Rocket, label: "Campaigns" },
  { path: "/app/artists", icon: Palette, label: "Artists" },
  { path: "/app/settings", icon: Settings, label: "Settings" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full bg-white border-r border-warm-border z-50 flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-warm-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-taupe flex items-center justify-center shrink-0">
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-semibold text-warm-charcoal text-sm tracking-wide leading-tight">
                ANGLOW
              </span>
              <span className="text-[9px] text-warm-muted tracking-wider">by Dovroyn</span>
            </div>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-warm-muted hover:text-warm-charcoal transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                    isActive
                      ? "bg-taupe/10 text-taupe"
                      : "text-warm-muted hover:text-warm-charcoal hover:bg-warm-border/50"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom: Back to landing */}
      <div className="p-4 border-t border-warm-border">
        <NavLink
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-warm-muted hover:text-warm-charcoal hover:bg-warm-border/50 transition-all"
        >
          <ChevronLeft className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Back to Site</span>}
        </NavLink>
      </div>
    </aside>
  );
}
