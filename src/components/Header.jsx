import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#03001E]/80 backdrop-blur-xl border-b border-gray-800/40">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <span className="text-white font-bold text-lg">Dovroyn</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">Home</Link>
          <Link to="/pricing" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">Pricing</Link>
          <Link to="/about" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">About</Link>
          <Link to="/case-study" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">Case Study</Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
          >
            Sign in
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-violet-500 text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all"
          >
            Get Started
          </Link>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#03001E] border-t border-gray-800/40 px-6 py-4 space-y-3">
          <Link to="/" onClick={() => setMobileOpen(false)} className="block text-gray-300 hover:text-white text-sm font-medium">Home</Link>
          <Link to="/pricing" onClick={() => setMobileOpen(false)} className="block text-gray-300 hover:text-white text-sm font-medium">Pricing</Link>
          <Link to="/about" onClick={() => setMobileOpen(false)} className="block text-gray-300 hover:text-white text-sm font-medium">About</Link>
          <Link to="/case-study" onClick={() => setMobileOpen(false)} className="block text-gray-300 hover:text-white text-sm font-medium">Case Study</Link>
          <div className="pt-3 border-t border-gray-800/40 flex flex-col gap-2">
            <Link to="/login" onClick={() => setMobileOpen(false)} className="text-center py-2 text-gray-300 hover:text-white text-sm">Sign in</Link>
            <Link to="/login" onClick={() => setMobileOpen(false)} className="text-center py-2 bg-gradient-to-r from-purple-600 to-violet-500 text-white text-sm font-medium rounded-lg">Get Started</Link>
          </div>
        </div>
      )}
    </header>
  );
}