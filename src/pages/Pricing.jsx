import { Link } from 'react-router-dom';
import { CheckCircle, Sparkles } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '$89',
    period: '/month',
    description: 'Perfect for getting started',
    features: ['2 pods', '50 AI posts/month', 'Basic analytics', 'Email support', 'Instagram & Facebook'],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Growth',
    price: '$189',
    period: '/month',
    description: 'For growing businesses',
    features: ['5 pods', '200 AI posts/month', 'Advanced analytics', 'Priority support', 'Meta Ads integration', 'TikTok & LinkedIn'],
    cta: 'Get Started',
    featured: true,
  },
  {
    name: 'Business',
    price: '$499',
    period: '/month',
    description: 'For serious operators',
    features: ['10 pods', '500 AI posts/month', 'Full analytics suite', 'Dedicated support', 'All 30+ platforms', 'Team members (5)'],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Agency',
    price: '$1,099',
    period: '/month',
    description: 'For agencies managing multiple clients',
    features: ['25 pods', 'Unlimited AI posts', 'White-label reports', 'Account manager', 'API access', 'Custom integrations'],
    cta: 'Contact Sales',
    featured: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#03001E] text-white">
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <img src="/dovroyn-icon.svg" alt="Dovroyn" className="w-8 h-8" />
          <span className="text-xl font-bold tracking-tight">Dovroyn</span>
        </Link>
        <Link to="/" className="text-sm text-gray-300 hover:text-white transition">Back to Home</Link>
      </nav>

      <section className="px-6 pt-16 pb-12 text-center max-w-3xl mx-auto">
        <p className="text-[#9F7AEA] text-sm font-medium mb-2">PRICING</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, transparent pricing</h1>
        <p className="text-gray-400 text-lg">Start with a free trial. Scale as you grow. No hidden fees.</p>
      </section>

      <section className="px-6 pb-24 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative p-6 rounded-2xl border ${
                plan.featured
                  ? 'border-[#9F7AEA] bg-[#9F7AEA]/5'
                  : 'border-gray-800 bg-[#0A0A0A]'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#9F7AEA] text-white text-xs font-medium rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Most Popular
                </div>
              )}
              <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-3xl font-bold text-[#9F7AEA]">{plan.price}</span>
                <span className="text-gray-400 text-sm">{plan.period}</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-[#9F7AEA] shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/login"
                className={`block w-full py-2.5 rounded-lg font-medium text-sm text-center transition ${
                  plan.featured
                    ? 'bg-[#9F7AEA] text-white hover:bg-[#B794F4]'
                    : 'border border-gray-700 text-white hover:border-[#9F7AEA]'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
