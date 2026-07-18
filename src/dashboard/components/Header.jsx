import { Bell, Search, User } from "lucide-react";

export function Header() {
  return (
    <header className="h-16 bg-white border-b border-warm-border flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-3 max-w-md w-full">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-muted" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-cream border border-warm-border text-sm text-warm-charcoal placeholder:text-warm-muted focus:outline-none focus:border-taupe focus:ring-2 focus:ring-taupe/20 transition-all"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-cream transition-colors">
          <Bell className="w-5 h-5 text-warm-muted" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-warm-charcoal flex items-center justify-center">
            <User className="w-4 h-4 text-cream" />
          </div>
          <span className="text-sm font-medium text-warm-charcoal hidden md:block">Jae</span>
        </div>
      </div>
    </header>
  );
}
