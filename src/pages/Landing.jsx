import { Link } from 'react-router-dom';
import { Sparkles, Zap, Brain, BarChart3, Calendar, Globe, ArrowRight, CheckCircle } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#03001E] text-white">
      {/* Top Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <img src="/dovroyn-icon.svg" alt="Dovroyn" className="w-8 h-8" />
          <span className="text-xl font-bold tracking-tight">Dovroyn</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/pricing" className="text-sm text-gray-300 hover:text-white transition">Pricing</Link>
          <Link to="/login" className="text-sm text-gray-300 hover:text-white transition">Sign In</Link>
          <Link to="/login" className="px-4 py-2 bg-[#9F7AEA] text-white text-sm font-medium rounded-lg hover:bg-[#B794F4] transition">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-20 pb-32 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#9F7AEA]/10 border border-[#9F7AEA]/20 rounded-full text-sm text-[#B794F4] mb-8">
          <Sparkles className="w-4 h-4" />
          AI-Powered Marketing Pods
        </div>
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
          One pod.<br />
          <span className="text-[#9F7AEA]">Infinite campaigns.</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
          Create dedicated AI marketing pods for each brand, product, or campaign. 
          Each pod has its own brain, memory, content calendar, and strategy.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link to="/login" className="px-8 py-3.5 bg-[#9F7AEA] text-white font-semibold rounded-xl hover:bg-[#B794F4] transition flex items-center gap-2">
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/pods" className="px-8 py-3.5 border border-gray-700 text-white font-medium rounded-xl hover:border-[#9F7AEA] transition">
            View Demo Pod
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-24 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-[#9F7AEA] text-sm font-medium mb-2">FEATURES</p>
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-16">Everything you need to scale</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Brain, title: 'AI-Powered Pods', desc: 'Each pod has its own AI brain that learns your brand voice, audience, and strategy.' },
              { icon: Calendar, title: 'Content Calendar', desc: 'Auto-generate months of content tailored to your brand, holidays, and campaign goals.' },
              { icon: BarChart3, title: 'Analytics', desc: 'Track performance across all platforms with unified dashboards and AI insights.' },
              { icon: Globe, title: '30+ Platforms', desc: 'Post to Instagram, TikTok, Facebook, LinkedIn, Pinterest, and many more from one place.' },
              { icon: Zap, title: 'Ad Campaigns', desc: 'Create, manage, and optimize paid campaigns with AI-powered budget allocation.' },
              { icon: Sparkles, title: 'Collaborations', desc: 'Manage artist submissions, influencer partnerships, and brand collaborations.' },
            ].map((f, i) => (
              <div key={i} className="p-6 bg-[#111827] border border-gray-800 rounded-2xl hover:border-[#9F7AEA]/30 transition">
                <f.icon className="w-8 h-8 text-[#9F7AEA] mb-4" />
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#9F7AEA] text-sm font-medium mb-2">HOW IT WORKS</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-16">Launch in minutes</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Create a Pod', desc: 'Set up a dedicated workspace for your brand or campaign.' },
              { step: '02', title: 'Train Your AI', desc: 'Feed it your brand voice, audience, and competitors.' },
              { step: '03', title: 'Generate Content', desc: 'AI creates posts, ads, and calendars tailored to you.' },
              { step: '04', title: 'Launch & Scale', desc: 'Publish across 30+ platforms and track performance.' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold text-[#9F7AEA]/30 mb-4">{s.step}</div>
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="px-6 py-24 bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#9F7AEA] text-sm font-medium mb-2">PRICING</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Simple, transparent pricing</h2>
          <p className="text-gray-400 mb-10">Start free. Scale as you grow.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Starter', price: '$89', desc: '2 pods, 50 AI posts/mo', features: ['2 pods', '50 AI posts/mo', 'Basic analytics', 'Email support'] },
              { name: 'Growth', price: '$189', desc: '5 pods, 200 AI posts/mo', features: ['5 pods', '200 AI posts/mo', 'Advanced analytics', 'Meta Ads integration', 'Priority support'] },
              { name: 'Business', price: '$499', desc: '10 pods, 500 AI posts/mo', features: ['10 pods', '500 AI posts/mo', 'Full analytics', 'All integrations', 'Team members', 'Dedicated support'] },
            ].map((plan, i) => (
              <div key={i} className={`p-6 rounded-2xl border ${i === 1 ? 'border-[#9F7AEA] bg-[#9F7AEA]/5' : 'border-gray-800 bg-[#111827]'}`}>
                <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
                <div className="text-3xl font-bold text-[#9F7AEA] mb-1">{plan.price}<span className="text-sm text-gray-400">/mo</span></div>
                <p className="text-gray-400 text-sm mb-4">{plan.desc}</p>
                <ul className="space-y-2 mb-6 text-left">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-[#9F7AEA]" /> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/login" className={`block w-full py-2.5 rounded-lg font-medium text-sm transition ${i === 1 ? 'bg-[#9F7AEA] text-white hover:bg-[#B794F4]' : 'border border-gray-700 text-white hover:border-[#9F7AEA]'}`}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/dovroyn-icon.svg" alt="Dovroyn" className="w-6 h-6" />
            <span className="font-semibold">Dovroyn</span>
          </div>
          <p className="text-gray-500 text-sm">A product of Anglow Digital PTY LTD</p>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link to="/pricing" className="hover:text-white transition">Pricing</Link>
            <Link to="/login" className="hover:text-white transition">Sign In</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
