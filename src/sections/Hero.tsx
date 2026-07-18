import { ArrowRight, Clock3, Sparkles, Instagram, Facebook, Music2, Pin, Bell } from 'lucide-react';
import Reveal from '@/components/dovroyn/Reveal';
import Logo from '@/components/dovroyn/Logo';

type Pod = { name: string; monogram: string; tint: string; dots: number[][] };

const pods: Pod[] = [
  { name: 'Velvette Beauty', monogram: 'VB', tint: '#E8D9C4', dots: [[2, 0], [3, 1], [0, 2], [5, 3], [1, 4], [6, 1]] },
  { name: 'Fiorano', monogram: 'F', tint: '#EFE4D2', dots: [[1, 3], [4, 0], [2, 2], [6, 4], [0, 1], [3, 3]] },
  { name: 'Harlan & Co', monogram: 'H&Co', tint: '#E4D5BE', dots: [[0, 0], [2, 4], [5, 1], [3, 2], [6, 3], [1, 0]] },
  { name: 'Atelier Lume', monogram: 'AL', tint: '#F0E7D6', dots: [[3, 4], [1, 2], [4, 1], [0, 3], [5, 0], [2, 1]] },
  { name: 'Café Solenne', monogram: 'CS', tint: '#E9DBC6', dots: [[2, 1], [5, 4], [1, 0], [6, 2], [3, 3], [0, 4]] },
  { name: 'NorthPeak Fit', monogram: 'NP', tint: '#E6D8C0', dots: [[4, 2], [0, 1], [3, 0], [5, 3], [1, 4], [6, 0]] },
];

const dotColors = ['#2B2620', '#C6A266', '#7FA98B', '#C47F6D', '#6D8EC4'];

function SocialRow() {
  return (
    <div className="flex items-center justify-center gap-1.5 text-[#8a7f6a]">
      <Instagram className="w-3 h-3 text-[#C2557A]" />
      <Music2 className="w-3 h-3 text-[#2B2620]" />
      <Facebook className="w-3 h-3 text-[#3B5998]" />
      <Pin className="w-3 h-3 text-[#B7352E]" />
    </div>
  );
}

function PodCard({ pod }: { pod: Pod }) {
  return (
    <div className="rounded-xl border border-[#eee3cd] bg-white/95 shadow-[0_10px_30px_-18px_rgba(43,38,32,0.25)] p-3.5">
      <div className="flex justify-end -mt-0.5 -mr-0.5">
        <span className="text-[#cbbd9f] tracking-[0.15em] text-[10px] leading-none">···</span>
      </div>
      <div
        className="mx-auto w-9 h-9 rounded-full flex items-center justify-center font-serif-display text-[13px] text-[#6d5a33]"
        style={{ backgroundColor: pod.tint }}
      >
        {pod.monogram}
      </div>
      <p className="mt-1.5 text-center font-serif-display text-[15px] text-[#2B2620]">{pod.name}</p>
      <div className="mt-1.5">
        <SocialRow />
      </div>
      <div className="mt-2.5 border-t border-[#f1e8d5] pt-2">
        <div className="grid grid-cols-7 gap-1">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
            <span key={i} className="text-center text-[7px] text-[#b3a684] font-medium">
              {d}
            </span>
          ))}
          {Array.from({ length: 7 }).map((_, day) => {
            const hit = pod.dots.find(([d]) => d === day);
            return (
              <span key={day} className="h-3.5 rounded-[4px] bg-[#faf5ea] flex items-center justify-center">
                {hit ? <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dotColors[hit[1]] }} /> : null}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative pt-[150px] pb-8 overflow-hidden">
      {/* soft radial glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[640px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(198,162,102,0.14),transparent_70%)]" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#e7dcc3] bg-[#f6efdd] px-4 py-1.5 text-[11px] font-medium tracking-[0.14em] text-[#A8823F]">
            <Sparkles className="w-3.5 h-3.5" />
            ALL-IN-ONE AI MARKETING PLATFORM FOR WEBSITES &amp; APPS
          </span>
        </Reveal>
        <Reveal delay={90}>
          <h1 className="mt-7 font-serif-display text-[52px] sm:text-[72px] leading-[1.04] text-[#2B2620]">
            Every Brand Pod.
            <br />
            <em className="font-normal text-[#C6A266]">Its own dedicated AI.</em>
          </h1>
        </Reveal>
        <Reveal delay={180}>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-[#6b6255]">
            Drop in a website, app, or product photos — each pod's AI builds your complete brand
            strategy, content calendar, ad campaigns, audience targeting, SEO monitoring, and
            competitor analysis. One platform replacing your social media manager, ad agency, and
            marketing tools.
          </p>
        </Reveal>
        <Reveal delay={260}>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href="https://dovroyn.com/signup"
              className="inline-flex items-center gap-2 rounded-xl bg-[#C6A266] px-7 py-3.5 text-[15px] font-medium text-white shadow-[0_12px_28px_-10px_rgba(166,134,74,0.65)] hover:bg-[#b8935a] transition-colors"
            >
              Start your 3-day free trial <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-xl border border-[#e0d4ba] bg-white px-7 py-3.5 text-[15px] font-medium text-[#4a443b] hover:bg-[#fdfaf2] transition-colors"
            >
              See How It Works
            </a>
          </div>
        </Reveal>
        <Reveal delay={330}>
          <p className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] text-[#8a7f6a]">
            <Clock3 className="w-3.5 h-3.5" /> 3-day free trial • No charge until day 4 • Cancel anytime
          </p>
        </Reveal>
      </div>

      {/* Dashboard mockup */}
      <Reveal delay={380} className="relative mx-auto mt-14 max-w-4xl px-6">
        <div className="animate-float-soft rounded-t-2xl border border-b-0 border-[#e9ddc3] bg-gradient-to-b from-white to-[#fbf7ec] shadow-[0_40px_80px_-40px_rgba(43,38,32,0.35)]">
          <div className="flex items-center justify-between border-b border-[#f0e6d0] px-6 py-3.5">
            <Logo />
            <div className="flex items-center gap-3">
              <span className="relative">
                <Bell className="w-4 h-4 text-[#a3947a]" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#C6A266]" />
              </span>
              <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[#d9b98a] to-[#a8823f] border border-white shadow" />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-5">
            {pods.map((p) => (
              <PodCard key={p.name} pod={p} />
            ))}
          </div>
        </div>
        {/* fade into page */}
        <div className="pointer-events-none absolute inset-x-6 bottom-0 h-28 bg-gradient-to-t from-[#FAF6EE] to-transparent" />
      </Reveal>
    </section>
  );
}
