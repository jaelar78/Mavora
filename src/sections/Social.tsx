import { Star } from 'lucide-react';
import Reveal from '@/components/dovroyn/Reveal';
import ChatWidget from '@/components/dovroyn/ChatWidget';

/* ---------------- Testimonials ---------------- */

const testimonials = [
  {
    stars: 5,
    quote:
      'Dovroyn took over from the $2,400/mo agency we relied on. The quality is the same, the calendar stays full, and the cost is a fraction of what we paid.',
    name: 'Sarah K.',
    role: 'E-commerce founder, Melbourne',
    tag: 'SAVED $2,000/MO',
  },
  {
    stars: 4,
    quote:
      'Genuinely solid for running several brands at once. The tone lands right most of the time — I still polish a caption here and there, but it hands me back hours every week.',
    name: 'Marcus T.',
    role: 'Digital marketing agency',
    tag: '6 BRANDS, 1 TOOL',
  },
  {
    stars: 5,
    quote:
      'Four minutes to set up. Before my coffee went cold I had a full month of Instagram, TikTok, and LinkedIn posts ready to go.',
    name: 'Jess W.',
    role: 'Personal trainer & coach',
    tag: '4 MIN SETUP',
  },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < n ? 'fill-[#C6A266] text-[#C6A266]' : 'fill-[#e5d9bf] text-[#e5d9bf]'}`}
        />
      ))}
    </div>
  );
}

/* ---------------- Sample output ---------------- */

const sample = [
  {
    title: 'Brand Analysis',
    rows: [
      ['Brand tone:', 'Warm, community-focused'],
      ['Primary colours:', '#2D5016, #F5E6D3'],
      ['Target audience:', '25–45, inner-city professionals'],
      ['Best platforms:', 'Instagram, TikTok, Google Business'],
    ],
  },
  {
    title: 'Content Calendar',
    rows: [
      ['Mon:', 'Behind-the-scenes reel (barista art)'],
      ['Wed:', 'Customer spotlight + UGC repost'],
      ['Fri:', 'Weekend specials carousel'],
      ['Sun:', 'Coffee fact infographic'],
    ],
  },
  {
    title: 'Ad Campaign',
    rows: [
      ['Hook:', '\u201CYour morning ritual, perfected.\u201D'],
      ['Audience:', 'Coffee lovers, 25–40, 5km radius'],
      ['Budget:', '$15/day Instagram + $10/day TikTok'],
      ['CTA:', '\u201COrder ahead — skip the queue\u201D'],
    ],
  },
];

export default function Social() {
  return (
    <>
      {/* Testimonials */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal className="text-center">
            <h2 className="font-serif-display text-[40px] sm:text-[48px] leading-tight text-[#2B2620]">
              Trusted by <em className="text-[#C6A266] font-normal">brands</em> who refuse to overpay
            </h2>
            <p className="mt-3 text-[15px] text-[#6b6255]">Early adopters saving 10+ hours a week on social media.</p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 120}>
                <div className="h-full rounded-2xl border border-[#efe6d1] bg-white p-6 shadow-[0_20px_45px_-30px_rgba(43,38,32,0.25)]">
                  <Stars n={t.stars} />
                  <p className="mt-4 font-serif-display italic text-[17px] leading-relaxed text-[#3d372e]">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-5 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-[14px] font-semibold text-[#2B2620]">{t.name}</p>
                      <p className="text-[12px] text-[#9a8f78]">{t.role}</p>
                    </div>
                    <span className="rounded-md bg-[#f6efdd] px-2 py-1 text-[10px] font-semibold tracking-wide text-[#A8823F] whitespace-nowrap">
                      {t.tag}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sample output */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal className="text-center max-w-2xl mx-auto">
            <h2 className="font-serif-display text-[36px] sm:text-[44px] leading-tight text-[#2B2620]">
              Here's what Dovroyn generates for a café in Melbourne
            </h2>
            <p className="mt-3 text-[15px] text-[#6b6255]">
              Real output from a single Brand Pod. All generated in under 2 minutes.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {sample.map((card, i) => (
              <Reveal key={card.title} delay={i * 120}>
                <div className="h-full rounded-2xl border border-[#efe6d1] bg-white p-6 shadow-[0_20px_45px_-30px_rgba(43,38,32,0.22)]">
                  <h3 className="font-serif-display text-[22px] text-[#2B2620] border-b border-[#f1e8d5] pb-3">
                    {card.title}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {card.rows.map(([k, v]) => (
                      <li key={k} className="text-[13.5px] leading-relaxed">
                        <span className="font-semibold text-[#2B2620]">{k}</span>{' '}
                        <span className="text-[#6b6255]">{v}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-6 text-center">
            <p className="text-[12.5px] text-[#9a8f78]">
              This is a sample. Every brand gets unique, tailored output based on its own data.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Chat preview */}
      <section className="py-20">
        <div className="mx-auto max-w-2xl px-6">
          <Reveal className="text-center">
            <h2 className="font-serif-display text-[36px] sm:text-[44px] leading-tight text-[#2B2620]">
              Talk to Dovroyn right now
            </h2>
            <p className="mt-3 text-[15px] text-[#6b6255]">
              Ask about your brand, get content ideas, or test its social media strategy chops. No signup needed.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-10">
              <ChatWidget />
            </div>
          </Reveal>
          <Reveal className="mt-4 text-center">
            <p className="text-[12.5px] text-[#9a8f78]">
              This is a preview. Sign up to get your own Brand Pod with unlimited AI access.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
