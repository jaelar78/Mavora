/******  TESTER POD PREVIEW — Full 14-page pod walkthrough  ******/
import React, { useState } from 'react';
import {
  LayoutDashboard, FileText, Calendar, Sparkles, Wand2, BarChart3, Wrench, BookOpen,
  Plug, Settings, Users, Target, DollarSign, Globe, Rocket, Image, Link2, Megaphone,
  ChevronRight, CheckCircle, Lock, Play
} from 'lucide-react';

const PAGES = [
  { key: 'overview',     label: 'Overview',          icon: LayoutDashboard, desc: 'Pod dashboard with KPIs, recent activity, and quick actions', status: 'ready' },
  { key: 'content',      label: 'Content Generator', icon: FileText,        desc: 'AI-powered caption, hashtag & content creation', status: 'ready' },
  { key: 'calendar',     label: 'Content Calendar',  icon: Calendar,        desc: 'Weekly/monthly drag-drop calendar with best-time hints', status: 'ready' },
  { key: 'ai',           label: 'AI Assistant',      icon: Sparkles,        desc: 'Chat-based AI assistant with pod context', status: 'ready' },
  { key: 'optimizer',    label: 'AI Optimizer',      icon: Wand2,           desc: 'One-click content optimization suggestions', status: 'ready' },
  { key: 'analytics',    label: 'Analytics',         icon: BarChart3,       desc: 'Growth charts, engagement metrics, audience demographics', status: 'ready' },
  { key: 'tools',        label: 'Tools',             icon: Wrench,          desc: 'Collection of creator utilities and generators', status: 'ready' },
  { key: 'playbooks',    label: 'Playbooks',         icon: BookOpen,        desc: 'Step-by-step strategy guides for different goals', status: 'ready' },
  { key: 'integrations', label: 'Integrations',      icon: Plug,            desc: 'Connect Meta, TikTok, X, YouTube, Shopify, etc.', status: 'ready' },
  { key: 'collaborations',label:'Collaborations',    icon: Users,           desc: 'Manage brand deals, influencer collabs, outreach', status: 'ready' },
  { key: 'campaigns',    label: 'Ad Campaigns',      icon: Target,          desc: 'Create and track paid social campaigns', status: 'ready' },
  { key: 'budget',       label: 'Budget Tracker',    icon: DollarSign,      desc: 'Track spend, revenue, and ROI per pod', status: 'ready' },
  { key: 'website',      label: 'Website Analyzer',  icon: Globe,           desc: 'SEO audit, performance scan, improvement tips', status: 'ready' },
  { key: 'coming-soon',  label: 'Coming Soon Builder',icon: Rocket,         desc: 'Build viral pre-launch waitlist pages', status: 'ready' },
  { key: 'assets',       label: 'Asset Manager',     icon: Image,           desc: 'Organize images, videos, brand assets per pod', status: 'ready' },
  { key: 'social',       label: 'Social Accounts',   icon: Link2,           desc: 'Connect and manage all social accounts', status: 'ready' },
  { key: 'ads',          label: 'Ad Campaigns',      icon: Megaphone,       desc: 'Create, manage, and track paid ad campaigns', status: 'ready' },
  { key: 'settings',     label: 'Settings',          icon: Settings,        desc: 'Pod configuration, team, billing, preferences', status: 'ready' },
];

const STATUS_STYLES = {
  ready:   { badge: 'bg-emerald-500/10 text-emerald-400', label: 'Ready',    icon: <CheckCircle size={12} /> },
  beta:    { badge: 'bg-amber-500/10 text-amber-400',     label: 'Beta',     icon: <Sparkles size={12} /> },
  soon:    { badge: 'bg-gray-500/10 text-gray-400',       label: 'Soon',     icon: <Lock size={12} /> },
};

export default function TesterPodPreview() {
  const [step, setStep] = useState(0); // 0 = intro, 1+ = pages
  const totalReady = PAGES.filter((p) => p.status === 'ready').length;

  if (step === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center space-y-6">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-600/30">
            <Play size={36} className="text-white ml-1" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Tester Pod</h1>
            <p className="text-gray-400">Explore all {PAGES.length} pod pages in this interactive walkthrough</p>
          </div>
          <div className="flex justify-center gap-4 text-sm">
            <span className="flex items-center gap-1 text-emerald-400"><CheckCircle size={14} /> {totalReady} Ready</span>
            <span className="flex items-center gap-1 text-amber-400"><Sparkles size={14} /> {PAGES.filter((p) => p.status === 'beta').length} Beta</span>
            <span className="flex items-center gap-1 text-gray-500"><Lock size={14} /> {PAGES.filter((p) => p.status === 'soon').length} Soon</span>
          </div>
          <button
            onClick={() => setStep(1)}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-violet-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all inline-flex items-center gap-2"
          >
            Start Walkthrough
            <ChevronRight size={18} />
          </button>
          <p className="text-xs text-gray-600">Use arrow keys or click to navigate &middot; Press ESC to exit</p>
        </div>
      </div>
    );
  }

  const currentPage = PAGES[step - 1];
  const status = STATUS_STYLES[currentPage.status];
  const Icon = currentPage.icon;

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      {/* Progress */}
      <div className="sticky top-0 z-30 bg-[#0a0a0f]/95 backdrop-blur border-b border-gray-800/60 px-6 py-3">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500">Page {step} of {PAGES.length}</span>
            <button onClick={() => setStep(0)} className="text-xs text-gray-500 hover:text-white transition-colors">Exit Preview</button>
          </div>
          <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-600 to-pink-500 rounded-full transition-all duration-500" style={{ width: `${(step / PAGES.length) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Page Preview */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-2xl w-full text-center space-y-6">
          <div className="w-16 h-16 mx-auto bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center">
            <Icon size={28} className="text-purple-400" />
          </div>
          <div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <h2 className="text-2xl font-bold text-white">{currentPage.label}</h2>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${status.badge}`}>
                {status.icon} {status.label}
              </span>
            </div>
            <p className="text-gray-400">{currentPage.desc}</p>
          </div>

          {/* Mock UI Preview */}
          <div className="bg-[#111118] border border-gray-800/60 rounded-xl p-6 text-left space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-amber-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <div className="flex-1 h-6 bg-gray-800/60 rounded-md ml-4" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="h-20 bg-purple-500/5 border border-purple-500/10 rounded-lg" />
              <div className="h-20 bg-purple-500/5 border border-purple-500/10 rounded-lg" />
              <div className="h-20 bg-purple-500/5 border border-purple-500/10 rounded-lg" />
            </div>
            <div className="h-32 bg-gray-800/30 rounded-lg" />
            <div className="flex gap-2">
              <div className="h-8 w-24 bg-purple-600/20 rounded-lg" />
              <div className="h-8 w-24 bg-gray-800/40 rounded-lg" />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-white/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed text-sm"
            >
              Previous
            </button>
            <div className="flex gap-1">
              {PAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setStep(i + 1)}
                  className={`w-2 h-2 rounded-full transition-all ${step === i + 1 ? 'bg-purple-500 w-6' : 'bg-gray-700 hover:bg-gray-600'}`}
                />
              ))}
            </div>
            <button
              onClick={() => setStep(Math.min(PAGES.length, step + 1))}
              disabled={step === PAGES.length}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-violet-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed text-sm"
            >
              {step === PAGES.length ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}