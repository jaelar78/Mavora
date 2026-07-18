import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Search, Menu } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="h-16 bg-[#FAF9F7]/80 backdrop-blur-md border-b border-[#E8E2D9] sticky top-0 z-40 px-4 lg:px-8 flex items-center justify-between">
      {/* Search */}
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md w-full hidden sm:block">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9E9484]"
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#E8E2D9] rounded-lg text-sm text-[#3D3632] placeholder:text-[#9E9484] focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/30 focus:border-[#C9A96E]"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-lg hover:bg-[#E8E2D9]/50 transition-colors">
          <Bell size={18} className="text-[#6B6560]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C9A96E] rounded-full" />
        </button>

        <Link
          to="/settings"
          className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-[#E8E2D9]/50 transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#C9A96E] to-[#9E9484] flex items-center justify-center text-white text-xs font-medium">
            U
          </div>
          <span className="text-sm font-medium text-[#3D3632] hidden sm:block">
            Account
          </span>
        </Link>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-[#E8E2D9]/50"
        >
          <Menu size={20} className="text-[#6B6560]" />
        </button>
      </div>
    </header>
  );
}
