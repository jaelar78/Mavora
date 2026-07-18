import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full py-8 bg-[#03001E] border-t border-gray-800/40">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Dovroyn. All rights reserved.
        </p>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <span>Made with</span>
          <Heart size={14} className="text-purple-500 fill-purple-500" />
          <span>for creators</span>
        </div>
      </div>
    </footer>
  );
}