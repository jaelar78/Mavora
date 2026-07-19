import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/dovroyn/Reveal';

const industries = [
  {
    title: 'E-commerce & Retail',
    body: 'Product launches, seasonal campaigns, shoppable posts, and ad copy that converts browsers into buyers.',
  },
  {
    title: 'Restaurants & Hospitality',
    body: 'Menu highlights, event promotions, UGC-style reels, and location-based targeting across Instagram and TikTok.',
  },
  {
    title: 'Real Estate',
    body: 'Property showcases, virtual tour scripts, neighbourhood guides, and LinkedIn thought leadership for agents.',
  },
  {
    title: 'Health & Wellness',
    body: 'Educational carousels, before-and-after storytelling, appointment reminders, and wellness tips calendars.',
  },
  {
    title: 'SaaS & Tech Startups',
    body: 'Feature announcements, onboarding sequences, founder-led content, and B2B ad campaigns on LinkedIn.',
  },
  {
    title: 'Coaches & Consultants',
    body: 'Authority-building content, client success stories, and lead-generating posts that fill your calendar.',
  },
  {
    title: 'Agencies & Freelancers',
    body: 'Manage up to 12 client brands from one dashboard. Each pod learns each client independently — no cross-contamination.',
  },
];

const audiences = [
  {
    title: 'Small business owners',
    body: "You know you need social media but don't have time to create content every day. Dovroyn gives you a full month in minutes.",
  },
  {
    title: 'Marketing teams',
    body: 'Juggling multiple brands and platforms? Each Brand Pod handles one brand end-to-end so your team can focus on strategy.',
  },
  {
    title: 'Social media managers',
    body: 'Tired of the content treadmill? Dovroyn generates everything — you just review, approve, and post. Auto-posting is rolling out soon.',
  },
  {
    title: 'Agencies with multiple clients',
    body: 'Up to 12 Brand Pods means 12 clients managed from one dashboard. Each AI learns each client separately.',
  },
];

const comparison: [string, string, string][] = [
  ['Monthly cost', '$1,200–$3,000+', 'From $89/mo'],
  ['Content calendar', '20–30 posts/mo', 'Unlimited posts'],
  ['Platforms covered', '2–4 platforms', '30+ platforms'],
  ['Ad copy & targeting', 'Extra fee', 'Included (Professional+)'],
  ['Brand analysis', 'Manual research', 'AI-powered in minutes'],
  ['Video scripts', 'Extra fee or DIY', 'Included'],
  ['Available hours', '9–5 weekdays', '24/7, instant'],
  ['Scale to 12 brands', 'Hire 12 people', 'One Agency plan'],
  ['Setup time', '2–4 weeks onboarding', 'Under 5 minutes'],
];

export default function Industries() {
  return (
    <>
      {/* Industries */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal className="text-center max-w-xl mx-auto">
            <h2 className="font-serif-display text-[36px] sm:text-[46px] leading-tight text-[#2B2620]">
              Built for every industry
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#6b6255]">
              Whether you're a solo founder or an agency with a dozen clients, Dovroyn adapts to your niche.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((it, i) => (
              <Reveal key={it.title} delay={(i % 3) * 100} className={i === 6 ? 'lg:col-start-2' : ''}>
                <div className="h-full rounded-2xl border border-[#efe6d1] bg-[#fbf7ec] p-6 hover:bg-white hover:shadow-[0_20px_45px_-30px_rgba(43,38,32,0.3)] transition-all">
                  <h3 className="font-serif-display text-[21px] text-[#2B2620]">{it.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-[#6b6255]">{it.body}</p>
                  <a href="https://dovroyn.com/signup" className="mt-3.5 inline-flex items-center gap-1 text-[12.5px] text-[#A8823F] hover:gap-1.5 transition-all">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Who is it for */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal className="text-center max-w-xl mx-auto">
            <h2 className="font-serif-display text-[36px] sm:text-[46px] leading-tight text-[#2B2620]">
              Who is Dovroyn for?
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#6b6255]">
              If you've ever spent hours writing captions, designing posts, or wondering what to post next —
              Dovroyn replaces all of that.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {audiences.map((a, i) => (
              <Reveal key={a.title} delay={(i % 2) * 120}>
                <div className="h-full rounded-2xl border border-[#efe6d1] bg-white p-6 shadow-[0_16px_40px_-28px_rgba(43,38,32,0.25)]">
                  <h3 className="font-serif-display text-[21px] text-[#2B2620]">{a.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-[#6b6255]">{a.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <a
              href="https://dovroyn.com/signup"
              className="inline-flex items-center gap-2 rounded-xl bg-[#C6A266] px-7 py-3.5 text-[15px] font-medium text-white shadow-[0_12px_28px_-10px_rgba(166,134,74,0.65)] hover:bg-[#b8935a] transition-colors"
            >
              Start Your Free 3-Day Trial <ArrowRight className="w-4 h-4" />
            </a>
            <p className="mt-3 text-[12.5px] text-[#9a8f78]">No credit card charged until your trial ends.</p>
          </Reveal>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal className="text-center">
            <h2 className="font-serif-display text-[36px] sm:text-[46px] leading-tight text-[#2B2620]">
              Dovroyn vs. hiring a social media manager
            </h2>
            <p className="mt-3 text-[15px] text-[#6b6255]">Same results. Fraction of the cost. Available 24/7.</p>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-10 overflow-hidden rounded-2xl border border-[#e9ddc3] bg-white shadow-[0_30px_70px_-40px_rgba(43,38,32,0.35)]">
              <table className="w-full text-[13.5px]">
                <thead>
                  <tr className="bg-[#f6efdd] text-left">
                    <th className="px-5 py-3.5 font-semibold text-[#2B2620]">What you get</th>
                    <th className="px-5 py-3.5 font-semibold text-[#8a7f6a]">Hiring a manager</th>
                    <th className="px-5 py-3.5 font-semibold text-[#A8823F]">Dovroyn</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map(([label, manager, dovroyn], i) => (
                    <tr key={label} className={i % 2 ? 'bg-[#fdfbf5]' : 'bg-white'}>
                      <td className="px-5 py-3 text-[#2B2620] font-medium">{label}</td>
                      <td className="px-5 py-3 text-[#8a7f6a]">{manager}</td>
                      <td className="px-5 py-3 text-[#A8823F] font-medium">{dovroyn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal className="mt-8 text-center">
            <a
              href="https://dovroyn.com/signup"
              className="inline-flex items-center gap-2 rounded-xl bg-[#C6A266] px-7 py-3.5 text-[15px] font-medium text-white shadow-[0_12px_28px_-10px_rgba(166,134,74,0.65)] hover:bg-[#b8935a] transition-colors"
            >
              Try Dovroyn free for 3 days <ArrowRight className="w-4 h-4" />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
