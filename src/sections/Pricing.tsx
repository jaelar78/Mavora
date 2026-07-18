import { useState } from 'react';
import { Check, ShieldCheck, Timer, Zap, ArrowRight, ChevronDown } from 'lucide-react';
import Reveal from '@/components/dovroyn/Reveal';
import Logo from '@/components/dovroyn/Logo';

/* ---------------- Pricing ---------------- */

type Plan = {
  name: string;
  blurb: string;
  monthly: number;
  pods: number;
  seats: number;
  tagline: string;
  features: string[];
  popular?: boolean;
};

const plans: Plan[] = [
  {
    name: 'Starter',
    blurb: 'For solo brands & side hustles',
    monthly: 89,
    pods: 2,
    seats: 1,
    tagline: '2 Brand Pods · 1 seat',
    features: [
      '2 Brand Pods (2 dedicated AIs)',
      '1 user seat',
      'Brand analysis (colours, tone, audience)',
      'Content calendar (10 posts/mo)',
      'Basic ad copy generation',
      'AI image generation',
      'Hashtag research',
      'Platform recommendations',
    ],
  },
  {
    name: 'Professional',
    blurb: 'For growing businesses',
    monthly: 189,
    pods: 4,
    seats: 2,
    tagline: '4 Brand Pods · 2 seats',
    popular: true,
    features: [
      '4 Brand Pods (4 dedicated AIs)',
      '2 user seats',
      'Full brand audit + positioning',
      'Content calendar (30 posts/mo)',
      'Multi-angle ad campaigns',
      'Video scripts with hooks',
      'Audience targeting AI',
      'Competitor insights',
      'Budget recommendations',
    ],
  },
  {
    name: 'Business',
    blurb: 'For teams & multi-brand portfolios',
    monthly: 499,
    pods: 8,
    seats: 4,
    tagline: '8 Brand Pods · 4 seats',
    features: [
      '8 Brand Pods (8 dedicated AIs)',
      '4 user seats',
      'Full brand audit + competitor positioning',
      'Content calendar (80 posts/mo)',
      'Full ad campaign management',
      'Daily brand monitoring',
      'Budget & ROI tracking',
      'Auto-posting via API (rolling out)',
      '1-on-1 onboarding',
    ],
  },
  {
    name: 'Agency',
    blurb: 'For agencies managing multiple clients',
    monthly: 1099,
    pods: 12,
    seats: 6,
    tagline: '12 Brand Pods · 6 seats',
    features: [
      '12 Brand Pods (12 dedicated AIs)',
      '6 user seats',
      'Unlimited content + ad generation',
      'White-label brand reports',
      'Custom AI brand voice training',
      'Daily monitoring per client',
      'Auto-deployment via API (rolling out)',
      'Dedicated account manager',
      'API access',
    ],
  },
];

const guarantees = [
  { icon: ShieldCheck, text: '3-day free trial on all plans' },
  { icon: Timer, text: '14-day money-back guarantee' },
  { icon: ShieldCheck, text: 'Cancel anytime. No contracts.' },
  { icon: Zap, text: 'Set up in under 5 minutes' },
];

/* ---------------- FAQ ---------------- */

const faqs: [string, string][] = [
  [
    'What exactly is a Brand Pod?',
    'A Brand Pod is a self-contained AI workspace dedicated to a single brand. It learns your colours, tone, audience, and competitors, then uses that knowledge to build your strategy, content calendar, and ad campaigns — independently from every other pod on your account.',
  ],
  [
    'How does the AI learn my brand?',
    'Drop in your website URL, app link, or product photos. The AI scans your public presence, extracts your brand kit and positioning, and presents a full audit you can review and override before anything is generated.',
  ],
  [
    'Which platforms does Dovroyn support?',
    'Dovroyn analyses 30+ platforms — Instagram, TikTok, LinkedIn, Facebook, YouTube, Pinterest, X, Threads, Reddit, Google Ads, Meta Ads, and more — then recommends the ones most likely to perform for your brand.',
  ],
  [
    'Does Dovroyn actually post for me?',
    'Every plan produces copy-paste ready content with direct platform links. On Business and Agency plans, fully hands-off auto-deployment via API is rolling out.',
  ],
  [
    'Can I manage multiple brands from one account?',
    'Yes — that is what Brand Pods are for. Plans range from 2 pods on Starter up to 12 pods on Agency, each with its own dedicated AI that learns that brand independently.',
  ],
  [
    'What if I want to cancel?',
    'Cancel anytime from your dashboard — no contracts, no cancellation fees. Annual plans are covered by a 14-day money-back guarantee.',
  ],
  [
    'Is there a free trial?',
    'Every plan starts with a 3-day free trial. You are not charged until day 4, and you can cancel before the trial ends and pay nothing.',
  ],
  [
    'How is this different from Hootsuite or Buffer?',
    'Schedulers publish what you write. Dovroyn does the writing — and the strategy, brand analysis, ad copy, targeting, and monitoring — so it replaces the work of a social media manager, not just the posting tool.',
  ],
];

/* ---------------- Stats / Resources ---------------- */

const stats = [
  ['30+', 'Platforms analysed'],
  ['<5 min', 'Full brand audit'],
  ['12', 'Brands, one dashboard'],
  ['$0', 'Extra hires needed'],
];

const resources = [
  {
    tag: 'STRATEGY',
    title: 'How to build a content calendar that actually works',
    body: 'The framework Dovroyn uses to plan 30 days of posts in minutes — and how you can apply the same logic manually or with AI.',
  },
  {
    tag: 'PLATFORM GUIDE',
    title: 'Instagram vs TikTok: where should your brand be?',
    body: 'A breakdown of audience demographics, content formats, and algorithm behaviour to help you choose the right platform for your niche.',
  },
  {
    tag: 'ADVERTISING',
    title: "AI-generated ad copy: what works and what doesn't",
    body: 'Real examples of AI-written headlines, CTAs, and carousel copy — plus the prompting techniques that produce better results.',
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const price = (m: number) => (annual ? Math.round(m * 0.8) : m);

  return (
    <>
      {/* Pricing */}
      <section className="py-24" id="pricing">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="text-center">
            <h2 className="font-serif-display text-[36px] sm:text-[46px] leading-tight text-[#2B2620]">
              Plans that scale with you
            </h2>
            <p className="mt-3 text-[15px] text-[#6b6255]">More pods. More brands. More AI power.</p>
          </Reveal>
          <Reveal delay={80} className="mt-8 flex justify-center">
            <div className="inline-flex items-center rounded-full border border-[#e7dcc3] bg-white p-1">
              <button
                onClick={() => setAnnual(false)}
                className={`rounded-full px-5 py-2 text-[13px] font-medium transition-colors ${
                  !annual ? 'bg-[#C6A266] text-white' : 'text-[#6b6255]'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={`rounded-full px-5 py-2 text-[13px] font-medium transition-colors ${
                  annual ? 'bg-[#C6A266] text-white' : 'text-[#6b6255]'
                }`}
              >
                Annual
              </button>
              <span className="px-3 text-[11.5px] font-semibold text-[#A8823F]">Save 20%</span>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {plans.map((p, i) => (
              <Reveal key={p.name} delay={i * 100}>
                <div
                  className={`relative h-full rounded-2xl border bg-white p-6 flex flex-col ${
                    p.popular
                      ? 'border-[#C6A266] shadow-[0_30px_60px_-30px_rgba(166,134,74,0.5)]'
                      : 'border-[#efe6d1] shadow-[0_16px_40px_-30px_rgba(43,38,32,0.3)]'
                  }`}
                >
                  {p.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#C6A266] px-3.5 py-1 text-[10px] font-semibold tracking-wide text-white">
                      MOST POPULAR
                    </span>
                  )}
                  <h3 className="font-serif-display text-[24px] text-[#2B2620]">{p.name}</h3>
                  <p className="mt-0.5 text-[12px] text-[#9a8f78]">{p.blurb}</p>
                  <p className="mt-4 font-serif-display text-[40px] leading-none text-[#2B2620]">
                    ${price(p.monthly)}
                    <span className="text-[16px] text-[#9a8f78]">/mo</span>
                  </p>
                  {annual && <p className="mt-1 text-[11px] text-[#A8823F]">billed annually</p>}
                  <p className="mt-2.5 text-[12.5px] font-medium text-[#A8823F]">{p.tagline}</p>
                  {(p.name === 'Business' || p.name === 'Agency') && (
                    <p className="mt-1 text-[11px] text-[#9a8f78]">Auto-deploy via API (rolling out)</p>
                  )}
                  <ul className="mt-5 space-y-2.5 border-t border-[#f1e8d5] pt-5 flex-1">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-[12.5px] text-[#4a443b]">
                        <Check className="mt-0.5 w-3.5 h-3.5 shrink-0 text-[#A8823F]" /> {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="https://dovroyn.com/signup"
                    className={`mt-6 block rounded-xl py-3 text-center text-[14px] font-medium transition-colors ${
                      p.popular
                        ? 'bg-[#C6A266] text-white hover:bg-[#b8935a]'
                        : 'border border-[#e0d4ba] text-[#4a443b] hover:bg-[#fbf6ea]'
                    }`}
                  >
                    Start Free Trial
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8 text-center">
            <p className="text-[12.5px] text-[#9a8f78]">
              All plans include 30+ platform connections · Prices in USD · Annual billing saves 20%
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {guarantees.map((g) => (
                <span key={g.text} className="inline-flex items-center gap-2 text-[13px] text-[#6b6255]">
                  <g.icon className="w-4 h-4 text-[#A8823F]" /> {g.text}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="mx-auto max-w-2xl px-6">
          <Reveal className="text-center">
            <h2 className="font-serif-display text-[36px] sm:text-[44px] leading-tight text-[#2B2620]">
              Frequently asked questions
            </h2>
            <p className="mt-3 text-[15px] text-[#6b6255]">Everything you need to know before getting started.</p>
          </Reveal>
          <div className="mt-10 space-y-3">
            {faqs.map(([q, a], i) => (
              <Reveal key={q} delay={i * 60}>
                <div className="overflow-hidden rounded-xl border border-[#efe6d1] bg-white">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left text-[14.5px] font-medium text-[#2B2620]"
                  >
                    {q}
                    <ChevronDown
                      className={`w-4 h-4 text-[#A8823F] transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      openFaq === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-4 text-[13.5px] leading-relaxed text-[#6b6255]">{a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map(([v, l], i) => (
              <Reveal key={l} delay={i * 100}>
                <p className="font-serif-display text-[44px] leading-none text-[#C6A266]">{v}</p>
                <p className="mt-2 text-[13px] text-[#6b6255]">{l}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal className="text-center max-w-xl mx-auto">
            <h2 className="font-serif-display text-[36px] sm:text-[44px] leading-tight text-[#2B2620]">
              Social media resources
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#6b6255]">
              Guides and insights to help you grow your brand online — powered by what Dovroyn's AI learns every day.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {resources.map((r, i) => (
              <Reveal key={r.title} delay={i * 120}>
                <a
                  href="https://dovroyn.com/blog"
                  className="block h-full rounded-2xl border border-[#efe6d1] bg-[#fbf7ec] p-6 hover:bg-white hover:shadow-[0_20px_45px_-30px_rgba(43,38,32,0.3)] transition-all"
                >
                  <span className="text-[10.5px] font-semibold tracking-[0.14em] text-[#A8823F]">{r.tag}</span>
                  <h3 className="mt-3 font-serif-display text-[20px] leading-snug text-[#2B2620]">{r.title}</h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-[#6b6255]">{r.body}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28">
        <Reveal className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-serif-display text-[42px] sm:text-[54px] leading-[1.08] text-[#2B2620]">
            Stop posting manually.
            <br />
            Start growing intelligently.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-[#6b6255]">
            Each Brand Pod is a dedicated AI that knows your brand better than any generic tool ever could. One
            dashboard, up to 12 brands, zero guesswork.
          </p>
          <p className="mt-6 inline-flex items-center gap-1.5 text-[12.5px] text-[#8a7f6a]">
            <ShieldCheck className="w-3.5 h-3.5" /> 3-day free trial. Cancel anytime. No contracts.
          </p>
          <div className="mt-6">
            <a
              href="https://dovroyn.com/signup"
              className="inline-flex items-center gap-2 rounded-xl bg-[#C6A266] px-8 py-4 text-[15px] font-medium text-white shadow-[0_14px_30px_-10px_rgba(166,134,74,0.7)] hover:bg-[#b8935a] transition-colors"
            >
              Generate my calendar <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#ece1c9] py-10">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Logo />
          <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[13.5px] text-[#6b6255]">
            <a href="mailto:info@dovroyn.com" className="hover:text-[#A8823F] transition-colors">
              info@dovroyn.com
            </a>
            <a href="https://dovroyn.com/agency" className="hover:text-[#A8823F] transition-colors">
              Agencies
            </a>
            <a href="https://dovroyn.com/pricing" className="hover:text-[#A8823F] transition-colors">
              Pricing
            </a>
            <a href="https://dovroyn.com/terms" className="hover:text-[#A8823F] transition-colors">
              Terms
            </a>
            <a href="https://dovroyn.com/privacy" className="hover:text-[#A8823F] transition-colors">
              Privacy
            </a>
          </nav>
        </div>
        <p className="mt-8 text-center text-[11.5px] text-[#b3a684]">© {new Date().getFullYear()} Dovroyn · dovroyn.com</p>
      </footer>
    </>
  );
}
