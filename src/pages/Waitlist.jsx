/******  WAITLIST / SUBSCRIBE PAGE  ******/
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, Sparkles, Zap, Crown } from 'lucide-react';

const TIERS = [
  {
    name: 'Starter', price: '$29', period: '/mo',
    features: ['1 Pod', '50 AI credits/mo', 'Basic analytics', 'Content calendar', 'Email support'],
  },
  {
    name: 'Growth', price: '$79', period: '/mo',
    features: ['3 Pods', '200 AI credits/mo', 'Advanced analytics', 'AI assistant', 'Collaboration tools', 'Priority support'],
    popular: true,
  },
  {
    name: 'Pro', price: '$199', period: '/mo',
    features: ['Unlimited Pods', 'Unlimited AI credits', 'Team collaboration', 'API access', 'White-label', 'Dedicated account manager'],
  },
];

export default function Waitlist() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [selectedTier, setSelectedTier] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-sm mb-8">
          <ArrowLeft size={16} /> Back to home
        </Link>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">Subscribe to Dovroyn</h1>
          <p className="text-gray-400">Choose the plan that's right for your creative journey</p>
        </div>

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {TIERS.map((tier, i) => (
            <div
              key={tier.name}
              onClick={() => setSelectedTier(i)}
              className={`p-6 rounded-xl border cursor-pointer transition-all ${
                selectedTier === i
                  ? 'border-purple-500 bg-purple-500/5 shadow-lg shadow-purple-500/10'
                  : 'border-gray-800 bg-[#111118] hover:border-gray-700'
              }`}
            >
              {tier.popular && (
                <div className="inline-block px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs font-medium rounded-full mb-3">
                  Most Popular
                </div>
              )}
              <h3 className="text-lg font-semibold text-white mb-1">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold text-white">{tier.price}</span>
                <span className="text-gray-500 text-sm">{tier.period}</span>
              </div>
              <ul className="space-y-2">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                    <Check size={14} className="text-green-400 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Email Form */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 input-field"
                required
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">No credit card required. Cancel anytime.</p>
          </form>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mb-4">
              <Check size={32} className="text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">You're subscribed!</h3>
            <p className="text-gray-400">Welcome to Dovroyn {TIERS[selectedTier].name}. Check your email for next steps.</p>
          </div>
        )}
      </div>
    </div>
  );
}