import {
  Brain,
  CalendarDays,
  Share2,
  Sparkles,
  FolderOpen,
  BarChart3,
  CircleDollarSign,
  Palette,
  Gem,
  Users,
  Globe2,
  RadioTower,
  Pencil,
  Check,
  Crown,
  ChevronDown,
} from 'lucide-react';
import Reveal from '@/components/dovroyn/Reveal';

const tabs = [
  { icon: Brain, label: 'AI Brain', active: true },
  { icon: CalendarDays, label: 'Content Calendar' },
  { icon: Share2, label: 'Platforms' },
  { icon: Sparkles, label: 'Coming Soon' },
  { icon: FolderOpen, label: 'Files' },
  { icon: BarChart3, label: 'Ad Performance' },
  { icon: CircleDollarSign, label: 'Budget' },
];

function Override() {
  return (
    <button className="inline-flex items-center gap-1.5 rounded-lg border border-[#e7dcc3] bg-white px-3 py-1.5 text-[12px] text-[#A8823F] hover:bg-[#fbf6ea] transition-colors shrink-0">
      <Pencil className="w-3 h-3" /> Override
    </button>
  );
}

function AnalysisRow({
  icon: Icon,
  title,
  sub,
  children,
  note,
}: {
  icon: typeof Palette;
  title: string;
  sub: string;
  children: React.ReactNode;
  note: string;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-5 border-t border-[#f1e8d5] px-5 py-4">
      <div className="flex items-center gap-3 md:w-[250px] shrink-0">
        <span className="w-9 h-9 rounded-full bg-[#f6efdd] flex items-center justify-center text-[#A8823F]">
          <Icon className="w-4 h-4" />
        </span>
        <div>
          <p className="text-[13.5px] font-semibold text-[#2B2620]">{title}</p>
          <p className="text-[11px] text-[#9a8f78]">{sub}</p>
        </div>
      </div>
      <div className="md:w-[290px] shrink-0">{children}</div>
      <p className="flex-1 text-[12px] leading-relaxed text-[#8a7f6a]">{note}</p>
      <Override />
    </div>
  );
}

function ProductMockup() {
  return (
    <div className="rounded-2xl border border-[#e9ddc3] bg-white shadow-[0_40px_90px_-45px_rgba(43,38,32,0.35)] overflow-hidden">
      {/* header */}
      <div className="flex flex-wrap items-center gap-4 px-6 pt-6 pb-4">
        <span className="w-12 h-12 rounded-xl bg-[#2B2620] flex items-center justify-center">
          <Crown className="w-6 h-6 text-[#C6A266]" />
        </span>
        <div className="flex-1 min-w-[180px]">
          <p className="font-serif-display text-[26px] leading-tight text-[#2B2620]">Maison Aurelle</p>
          <p className="text-[12px] font-medium text-[#A8823F] tracking-wide">Luxury Watches</p>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-lg border border-[#e7dcc3] bg-[#fbf6ea] px-3.5 py-2 text-[12.5px] text-[#6b6255]">
          Project Actions <ChevronDown className="w-3.5 h-3.5" />
        </button>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f2ead6] px-3 py-1.5 text-[11.5px] font-medium text-[#8a6f35]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C6A266]" /> Active
        </span>
      </div>
      {/* tabs */}
      <div className="flex gap-1 overflow-x-auto px-4 pb-3 border-b border-[#f1e8d5]">
        {tabs.map((t) => (
          <span
            key={t.label}
            className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3.5 py-2 text-[12.5px] ${
              t.active
                ? 'bg-[#f6efdd] text-[#A8823F] font-medium shadow-[inset_0_0_0_1px_#ead9b8]'
                : 'text-[#8a7f6a]'
            }`}
          >
            <t.icon className="w-3.5 h-3.5" /> {t.label}
          </span>
        ))}
      </div>
      {/* AI analysis banner */}
      <div className="px-5 pt-5">
        <div className="rounded-xl border border-[#efe2c6] bg-[#fdf9ef] px-5 py-4 flex items-center gap-3.5">
          <span className="w-9 h-9 rounded-full bg-white border border-[#eee2c6] flex items-center justify-center text-[#A8823F]">
            <Brain className="w-4 h-4" />
          </span>
          <div>
            <p className="text-[15px] text-[#2B2620]">
              I analyzed your website <span className="text-[#A8823F] font-medium">maisonaurelle.com</span>
            </p>
            <p className="text-[12px] text-[#9a8f78]">Here's what I discovered about your brand and my recommendations.</p>
          </div>
          <Sparkles className="ml-auto w-5 h-5 text-[#C6A266]" />
        </div>
      </div>
      {/* analysis rows */}
      <div className="py-2">
        <AnalysisRow
          icon={Palette}
          title="Brand Colors"
          sub="Extracted from your website"
          note="These are the dominant colors found across your website, logo, and visual content, conveying luxury and sophistication."
        >
          <div className="flex gap-2">
            <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#e3c98f] to-[#b08d4c] border border-[#e0d4ba]" />
            <span className="w-9 h-9 rounded-lg bg-[#2B2620]" />
            <span className="w-9 h-9 rounded-lg bg-white border border-[#e0d4ba]" />
          </div>
        </AnalysisRow>
        <AnalysisRow
          icon={Gem}
          title="Brand Tone"
          sub="Detected from your content"
          note="Your messaging and visuals reflect a premium, high-end positioning that inspires aspiration."
        >
          <div className="flex flex-wrap gap-1.5">
            {['Luxury', 'Refined', 'Aspirational'].map((t) => (
              <span key={t} className="rounded-full bg-[#f6efdd] px-2.5 py-1 text-[11px] text-[#8a6f35]">
                {t}
              </span>
            ))}
          </div>
        </AnalysisRow>
        <AnalysisRow
          icon={Users}
          title="Target Audience"
          sub="Suggested demographic"
          note="Based on your content, products, and positioning, your ideal audience is affluent, career-oriented men."
        >
          <div>
            <p className="text-[13px] font-semibold text-[#2B2620]">Men, 28–55</p>
            <p className="text-[11px] text-[#9a8f78]">Professionals, High Income</p>
          </div>
        </AnalysisRow>
        <AnalysisRow
          icon={Globe2}
          title="Geography"
          sub="Recommended reach"
          note="Your brand has global appeal with no geographic limitations detected on your website."
        >
          <div>
            <p className="text-[13px] font-semibold text-[#2B2620]">Worldwide</p>
            <p className="text-[11px] text-[#9a8f78]">No specific geo-focus detected</p>
          </div>
        </AnalysisRow>
        <AnalysisRow
          icon={RadioTower}
          title="Recommended Platforms"
          sub="Where to focus your efforts"
          note="These platforms align best with your audience and content style."
        >
          <div className="flex flex-wrap items-center gap-1.5">
            {['LinkedIn', 'Instagram', 'Facebook'].map((p) => (
              <span
                key={p}
                className="inline-flex items-center gap-1 rounded-full bg-[#eef4ec] border border-[#d7e4d2] px-2.5 py-1 text-[11px] text-[#4a7a54]"
              >
                {p} <Check className="w-3 h-3" />
              </span>
            ))}
            {['TikTok', 'Snapchat'].map((p) => (
              <span key={p} className="rounded-full bg-[#f4f0e6] px-2.5 py-1 text-[11px] text-[#a3987f]">
                {p}
              </span>
            ))}
          </div>
        </AnalysisRow>
      </div>
      <p className="px-6 pb-5 pt-1 text-[11px] text-[#b0a488]">
        ✦ AI insights are generated from your website and public data. You can override any recommendation.
      </p>
    </div>
  );
}

const pillars = [
  {
    title: 'Full brand audit in seconds',
    body: 'Each pod scans your brand and produces a complete analysis — brand kit, positioning, audience profile, competitor landscape, and platform strategy.',
  },
  {
    title: 'Content + ads + strategy',
    body: 'Not just posts. Each pod generates ad copy, video scripts, audience targeting, budget recommendations, and multi-angle campaign variations.',
  },
  {
    title: 'Scales without extra hires',
    body: 'Up to 12 pods from one dashboard. Each one is a dedicated AI that replaces a social media manager, content writer, and ad strategist.',
  },
];

export default function BrandPod() {
  return (
    <section className="py-24" id="how-it-works">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif-display text-[40px] sm:text-[48px] leading-tight text-[#2B2620]">
            What is a Brand Pod?
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-[#6b6255]">
            Each Brand Pod is a self-contained AI workspace dedicated to one brand. Drop in your
            business — the AI learns everything about it and manages your entire social media presence.
          </p>
        </Reveal>
        <Reveal delay={150} className="mt-14">
          <ProductMockup />
        </Reveal>
        <div className="mt-20 grid gap-10 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 120} className="text-center">
              <h3 className="font-serif-display text-[24px] text-[#2B2620]">{p.title}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-[#6b6255]">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
