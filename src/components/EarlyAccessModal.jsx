/******  EARLY ACCESS / PRICING MODAL  ******/
import React, { useState } from 'react';
import { X, Check, Sparkles, Zap, Crown } from 'lucide-react';

const TIERS = [
  {
    name: 'Starter',
    icon: <Zap size={20} />,
    price: '$29',
    period: '/mo',
    desc: 'Perfect for creators just getting started',
    features: ['1 Pod', '50 AI credits/mo', 'Basic analytics', 'Content calendar', 'Email support'],
    cta: 'Subscribe',
    popular: false,
  },
  {
    name: 'Growth',
    icon: <Sparkles size={20} />,
    price: '$79',
    period: '/mo',
    desc: 'For serious creators ready to scale',
    features: ['3 Pods', '200 AI credits/mo', 'Advanced analytics', 'AI assistant', 'Collaboration tools', 'Priority support'],
    cta: 'Subscribe',
    popular: true,
  },
  {
    name: 'Pro',
    icon: <Crown size={20} />,
    price: '$199',
    period: '/mo',
    desc: 'For teams and agencies',
    features: ['Unlimited Pods', 'Unlimited AI credits', 'Team collaboration', 'API access', 'White-label', 'Dedicated account manager'],
    cta: 'Subscribe',
    popular: false,
  },
];

export default function EarlyAccessModal({ open, onClose, defaultTier = 1 }) {
  const [selected, setSelected] = useState(defaultTier);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  const handleSubscribe = () => {
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); onClose(); }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0E0E16] border border-purple-500/20 rounded-2xl p-8 mx-4" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Get Started with Dovroyn</h2>
          <p className="text-gray-400">Choose the plan that fits your creative journey</p>
        </div>

        {/* Billing toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center bg-[#1a1a24] rounded-lg p-1 border border-gray-800">
            <button className="px-4 py-2 text-sm font-medium bg-purple-600 text-white rounded-md shadow-lg">Monthly</button>
            <button className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">Annual <span className="text-green-400 text-xs">Save 20%</span></button>
          </div>
        </div>

        {/* Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {TIERS.map((tier, i) => (
            <div
              key={tier.name}
              onClick={() => setSelected(i)}
              className={`relative p-6 rounded-xl border cursor-pointer transition-all ${
                selected === i
                  ? 'border-purple-500 bg-purple-500/5 shadow-lg shadow-purple-500/10'
                  : 'border-gray-800 bg-[#111118] hover:border-gray-700'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-semibold rounded-full">
                  Most Popular
                </div>
              )}
              <div className="flex items-center gap-2 mb-3">
                <div className="text-purple-400">{tier.icon}</div>
                <h3 className="font-semibold text-white">{tier.name}</h3>
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-3xl font-bold text-white">{tier.price}</span>
                <span className="text-gray-500 text-sm">{tier.period}</span>
              </div>
              <p className="text-sm text-gray-400 mb-4">{tier.desc}</p>
              <ul className="space-y-2 mb-6">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                    <Check size={14} className="text-green-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={handleSubscribe}
                className={`w-full py-2.5 rounded-lg font-medium transition-all ${
                  selected === i
                    ? 'bg-gradient-to-r from-purple-600 to-violet-500 text-white hover:shadow-lg hover:shadow-purple-500/25'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {submitted && selected === i ? 'Subscribed!' : tier.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Email input */}
        <div className="max-w-md mx-auto">
          <p className="text-center text-sm text-gray-400 mb-3">Enter your email to subscribe</p>
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 bg-[#1a1a24] border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition"
            />
            <button
              onClick={handleSubscribe}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-violet-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all whitespace-nowrap"
            >
              {submitted ? 'Done!' : 'Subscribe'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}