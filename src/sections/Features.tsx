import { Brain, Target, CalendarDays, Zap, BarChart3, Sparkles, ArrowRight } from 'lucide-react';
import Reveal from '@/components/dovroyn/Reveal';

/* ---------------- Feature grid ---------------- */

const features = [
  {
    icon: Brain,
    title: 'Full brand intelligence',
    body: "Each pod's AI extracts your brand kit — colours, tone, audience, positioning, competitors — and uses it to inform every piece of content it creates.",
  },
  {
    icon: Target,
    title: 'Platform & audience strategy',
    body: 'The AI maps your ideal audience across 30+ platforms and recommends where to focus — based on your industry, geography, and buyer profile.',
  },
  {
    icon: CalendarDays,
    title: 'Full content calendar',
    body: 'A month of platform-specific posts generated in seconds. Captions, hashtags, images, carousels, and stories — all in your brand voice.',
  },
  {
    icon: Zap,
    title: 'Ad copy with multiple angles',
    body: 'Pain point, benefit, curiosity, social proof — the AI generates ad variations, video scripts with hooks, and carousel storytelling breakdowns.',
  },
  {
    icon: BarChart3,
    title: 'Competitor positioning',
    body: "See where you sit in the market. The AI identifies your competitors' strategies and finds gaps you can own — on higher tiers.",
  },
  {
    icon: Sparkles,
    title: 'Daily brand monitoring',
    body: 'On Business & Agency plans, your pod monitors your online presence daily — SEO health, social signals, and brand mentions — and flags what needs attention.',
  },
];

/* ---------------- Platforms marquee ---------------- */

const platforms = [
  ['Instagram', '#E1306C'], ['Facebook', '#1877F2'], ['TikTok', '#111111'], ['LinkedIn', '#0A66C2'],
  ['YouTube', '#FF0000'], ['Pinterest', '#E60023'], ['X', '#111111'], ['Snapchat', '#C9A400'],
  ['Reddit', '#FF4500'], ['Threads', '#111111'], ['WhatsApp', '#25D366'], ['Telegram', '#229ED9'],
  ['Google Ads', '#4285F4'], ['Meta Ads', '#0081FB'], ['Amazon', '#FF9900'], ['Etsy', '#F1641E'],
  ['Shopify', '#95BF47'], ['Discord', '#5865F2'], ['Spotify', '#1DB954'], ['Twitch', '#9146FF'],
  ['Medium', '#111111'], ['Substack', '#FF6719'],
] as const;

function PlatformPill({ name, color }: { name: string; color: string }) {
  return (
    <span className="mx-2 inline-flex items-center gap-2.5 rounded-full border border-[#ede2c9] bg-white px-5 py-2.5 text-[14px] font-medium text-[#4a443b] shadow-[0_6px_16px_-10px_rgba(43,38,32,0.25)] shrink-0">
      <span className="w-4 h-4 rounded-[5px]" style={{ backgroundColor: color }} />
      {name}
    </span>
  );
}

/* ---------------- In-action phones ---------------- */

function Phone({ label, sub, children, rotate }: { label: string; sub: string; children: React.ReactNode; rotate: string }) {
  return (
    <div className={`${rotate} transition-transform duration-500 hover:rotate-0`}>
      <div className="mx-auto w-[240px] overflow-hidden rounded-t-[28px] border-[5px] border-b-0 border-[#2B2620] bg-white shadow-[0_30px_60px_-30px_rgba(43,38,32,0.45)]">
        <div className="h-[300px] overflow-hidden">{children}</div>
      </div>
      <p className="mt-5 text-center font-serif-display text-[19px] text-[#2B2620]">{label}</p>
      <p className="mt-1 text-center text-[12.5px] text-[#8a7f6a]">{sub}</p>
    </div>
  );
}

/* ---------------- Steps ---------------- */

const steps = [
  {
    n: '1',
    title: 'Drop in your brand',
    body: 'Paste a website URL, upload product photos, or link your app. The AI produces a full brand audit — colours, tone, audience profile, competitor landscape, and platform strategy.',
  },
  {
    n: '2',
    title: 'Get your full strategy',
    body: 'Your pod generates a content calendar, ad campaigns with multiple angles, video scripts, audience targeting, and budget recommendations — all in your brand voice.',
  },
  {
    n: '3',
    title: 'Post or let Dovroyn do it',
    body: 'Copy-paste ready content with direct platform links. On Business & Agency, auto-deployment via API is rolling out for fully hands-off posting.',
  },
];

export default function Features() {
  return (
    <>
      {/* Feature grid */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal className="text-center max-w-2xl mx-auto">
            <h2 className="font-serif-display text-[36px] sm:text-[46px] leading-tight text-[#2B2620]">
              Replaces your social media manager, ad agency, and content team
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#6b6255]">
              Every Brand Pod is a full-stack AI that handles strategy, content, ads, and monitoring — so you
              don't need to hire for it.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 100}>
                <div className="h-full rounded-2xl border border-[#efe6d1] bg-white p-6 shadow-[0_16px_40px_-28px_rgba(43,38,32,0.25)] hover:shadow-[0_24px_50px_-28px_rgba(43,38,32,0.35)] transition-shadow">
                  <span className="w-10 h-10 rounded-xl bg-[#f6efdd] flex items-center justify-center text-[#A8823F]">
                    <f.icon className="w-[18px] h-[18px]" />
                  </span>
                  <h3 className="mt-4 font-serif-display text-[21px] text-[#2B2620]">{f.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-[#6b6255]">{f.body}</p>
                  <a href="https://dovroyn.com/pricing" className="mt-3.5 inline-flex items-center gap-1 text-[12.5px] text-[#A8823F] hover:gap-1.5 transition-all">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms marquee */}
      <section className="py-20 overflow-hidden">
        <Reveal className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-serif-display text-[36px] sm:text-[44px] leading-tight text-[#2B2620]">
            30+ platforms. One AI decides where to post.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#6b6255]">
            Each pod's AI analyses your brand and predicts which platforms will deliver the best results — then
            builds content tailored to each one.
          </p>
        </Reveal>
        <div className="relative mt-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-[#FAF6EE] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-[#FAF6EE] to-transparent" />
          <div className="animate-marquee flex w-max py-2">
            {[...platforms, ...platforms].map(([name, color], i) => (
              <PlatformPill key={`${name}-${i}`} name={name} color={color} />
            ))}
          </div>
        </div>
      </section>

      {/* In action */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal className="text-center max-w-2xl mx-auto">
            <h2 className="font-serif-display text-[36px] sm:text-[44px] leading-tight text-[#2B2620]">
              See Dovroyn in action
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#6b6255]">
              Watch how AI builds your entire social media presence in seconds — from brand analysis to a full
              month of content.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-10 sm:grid-cols-3">
            <Reveal>
              <Phone label="AI reads your brand" sub="Drop in your URL — the pod AI detects everything" rotate="-rotate-3">
                <div className="h-full bg-gradient-to-b from-[#f2e6cf] to-[#e6d3ae] p-3">
                  <div className="mt-4 flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-2 text-[10px] text-[#6b6255] shadow">
                    <span className="text-[#b3a684]">⌕</span> www.yourbrand.com
                  </div>
                  <div className="mt-3 space-y-2">
                    {['Extracting palette…', 'Reading tone of voice…', 'Mapping audience…'].map((s, i) => (
                      <div key={s} className="rounded-lg bg-white/80 px-2.5 py-2 text-[9.5px] text-[#6b6255] flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ['#C6A266', '#2B2620', '#7FA98B'][i] }} />
                        {s}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 rounded-lg bg-[#2B2620] px-2.5 py-2.5 text-[9.5px] text-[#e9dfc8]">
                    Brand audit complete ✓
                  </div>
                </div>
              </Phone>
            </Reveal>
            <Reveal delay={120}>
              <Phone label="Calendar fills itself" sub="A full month of posts generated instantly" rotate="rotate-2">
                <div className="h-full bg-[#fdfaf2] p-3">
                  <p className="mt-2 text-center font-serif-display text-[13px] text-[#2B2620]">October</p>
                  <div className="mt-2 grid grid-cols-7 gap-1">
                    {Array.from({ length: 28 }).map((_, i) => (
                      <span key={i} className="aspect-square rounded-[4px] bg-white border border-[#f0e6d0] flex items-center justify-center">
                        {[2, 5, 8, 11, 14, 17, 20, 23, 26].includes(i) ? (
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ['#C6A266', '#2B2620', '#C47F6D', '#6D8EC4'][i % 4] }} />
                        ) : null}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 space-y-1.5">
                    {['Reel: morning ritual', 'Carousel: 5 tips', 'Story: poll + link'].map((s) => (
                      <div key={s} className="rounded-md bg-white border border-[#f0e6d0] px-2 py-1.5 text-[9px] text-[#6b6255]">
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </Phone>
            </Reveal>
            <Reveal delay={240}>
              <Phone label="12 brands, one dashboard" sub="Each Brand Pod gets its own dedicated AI" rotate="-rotate-2">
                <div className="h-full bg-gradient-to-b from-[#f7efe0] to-[#eee0c6] p-3">
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {['Velvette', 'Fiorano', 'Harlan', 'Lume', 'Solenne', 'NorthPeak'].map((b, i) => (
                      <div key={b} className="rounded-lg bg-white/90 border border-[#eee2c6] p-2 text-center">
                        <span
                          className="mx-auto block w-6 h-6 rounded-full font-serif-display text-[8px] leading-6 text-white"
                          style={{ backgroundColor: ['#8a6f35', '#2B2620', '#7FA98B', '#C47F6D', '#6D8EC4', '#A8823F'][i] }}
                        >
                          {b[0]}
                        </span>
                        <p className="mt-1 text-[8.5px] text-[#6b6255]">{b}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 rounded-lg bg-[#C6A266] px-2.5 py-2 text-center text-[9.5px] font-medium text-white">
                    + Add Brand Pod
                  </div>
                </div>
              </Phone>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal className="text-center max-w-2xl mx-auto">
            <h2 className="font-serif-display text-[36px] sm:text-[46px] leading-tight text-[#2B2620]">
              From zero to a full marketing strategy in under 5 minutes
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#6b6255]">
              Brand audit, content calendar, ad campaigns, and audience targeting — all generated from a single URL.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 130} className="text-center">
                <span className="mx-auto flex w-11 h-11 items-center justify-center rounded-full bg-[#f6efdd] border border-[#ead9b8] font-serif-display text-[18px] text-[#A8823F]">
                  {s.n}
                </span>
                <h3 className="mt-5 font-serif-display text-[24px] text-[#2B2620]">{s.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[#6b6255]">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
