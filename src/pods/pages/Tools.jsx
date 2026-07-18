/******  TOOLS — Collection of creator utilities  ******/
import React from 'react';
import { Wrench, Type, Hash, Image, BarChart3, Clock, DollarSign, Globe, Sparkles } from 'lucide-react';

const TOOLS = [
  { icon: <Type size={20} />, label: 'Caption Writer', desc: 'AI-powered caption generation', to: 'content', color: 'purple' },
  { icon: <Hash size={20} />, label: 'Hashtag Generator', desc: 'Optimize your hashtag strategy', to: 'content', color: 'pink' },
  { icon: <Image size={20} />, label: 'Image Resizer', desc: 'Resize for any platform', to: 'assets', color: 'blue' },
  { icon: <BarChart3 size={20} />, label: 'Engagement Calculator', desc: 'Calculate engagement rates', to: 'analytics', color: 'green' },
  { icon: <Clock size={20} />, label: 'Best Time Finder', desc: 'Optimal posting times', to: 'calendar', color: 'amber' },
  { icon: <DollarSign size={20} />, label: 'Rate Calculator', desc: 'Price your collaborations', to: 'budget', color: 'emerald' },
  { icon: <Globe size={20} />, label: 'Link Shortener', desc: 'Trackable short links', to: 'website-analyzer', color: 'cyan' },
  { icon: <Sparkles size={20} />, label: 'AI Assistant', desc: 'Chat with Dovroyn AI', to: 'ai-assistant', color: 'purple' },
];

export default function Tools() {
  return (
    <div className="pod-page-container space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Tools</h2>
        <p className="text-sm text-gray-400">Creator utilities and generators</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {TOOLS.map((tool) => (
          <a
            key={tool.label}
            href={tool.to}
            className="pod-card flex flex-col items-center text-center p-4 hover:border-purple-500/30 transition-all group"
          >
            <div className="text-purple-400 group-hover:scale-110 transition-transform mb-2">{tool.icon}</div>
            <p className="text-sm font-medium text-white">{tool.label}</p>
            <p className="text-xs text-gray-500">{tool.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}