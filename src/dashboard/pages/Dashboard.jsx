import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Globe,
  FileText,
  Lightbulb,
  Rocket,
  Sparkles,
  Plus,
  Image,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Instagram,
  Facebook,
  Linkedin,
  PinIcon,
  Check,
  X,
  Zap,
  BarChart3,
  Eye,
} from "lucide-react";
import { cn } from "../../lib/utils";

/* ─── mock data ─── */
const stats = [
  { label: "Total Websites", value: 4, change: "+12%", icon: Globe },
  { label: "Posts Generated", value: 127, change: "+8%", icon: FileText },
  { label: "Pending Advice", value: 3, change: "+2", icon: Lightbulb },
  { label: "Active Campaigns", value: 2, change: "+1", icon: Rocket },
];

const websites = [
  {
    id: 1,
    name: "Gidgee & Co",
    initials: "GC",
    accent: "#f59e0b",
    description: "Australian hat brand — handcrafted leather and felt hats inspired by the outback.",
    platform: "Sitebeat",
    status: "Draft",
    platforms: ["Instagram", "Facebook", "Linkedin"],
    posts: 42,
    advice: 1,
    campaigns: 1,
  },
  {
    id: 2,
    name: "Waymark & Co",
    initials: "WC",
    accent: "#3b82f6",
    description: "Vintage watch marketplace — curated timepieces from around the world.",
    platform: "WordPress",
    status: "Draft",
    platforms: ["Linkedin"],
    posts: 31,
    advice: 1,
    campaigns: 0,
  },
  {
    id: 3,
    name: "MGNM",
    initials: "MG",
    accent: "#8b5cf6",
    description: "Dark fashion artist collaborations — limited edition streetwear drops.",
    platform: "Shopify",
    status: "Draft",
    platforms: ["Instagram", "TikTok"],
    posts: 28,
    advice: 1,
    campaigns: 1,
  },
  {
    id: 4,
    name: "Jewellery",
    initials: "JW",
    accent: "#ec4899",
    description: "High-end jewellery — bespoke rings, necklaces and fine accessories.",
    platform: "Wix",
    status: "Draft",
    platforms: ["Pinterest", "Instagram"],
    posts: 26,
    advice: 0,
    campaigns: 0,
  },
];

const quickActions = [
  { label: "Generate Content", icon: Sparkles, color: "bg-amber-50 text-amber-600" },
  { label: "Add Website", icon: Plus, color: "bg-blue-50 text-blue-600" },
  { label: "Start Campaign", icon: Rocket, color: "bg-violet-50 text-violet-600" },
  { label: "View Media", icon: Image, color: "bg-pink-50 text-pink-600" },
];

const recentActivity = [
  { icon: FileText, text: "Generated 3 Instagram posts for Gidgee & Co", time: "2 min ago", color: "text-amber-500" },
  { icon: Lightbulb, text: "New growth advice: 'Add TikTok for MGNM'", time: "15 min ago", color: "text-violet-500" },
  { icon: Rocket, text: "Campaign 'Summer Launch' started for Jewellery", time: "1 hr ago", color: "text-pink-500" },
  { icon: CheckCircle2, text: "Approved advice: LinkedIn strategy for Waymark", time: "3 hrs ago", color: "text-green-500" },
  { icon: Image, text: "Uploaded 12 media assets to library", time: "5 hrs ago", color: "text-blue-500" },
];

const pendingDecisions = [
  {
    id: 1,
    website: "Gidgee & Co",
    title: "Expand to Pinterest",
    description: "Your audience engagement is 34% higher on visual platforms. Adding Pinterest could increase reach by an estimated 2,400 monthly impressions.",
    impact: "High",
  },
  {
    id: 2,
    website: "MGNM",
    title: "Increase posting frequency",
    description: "TikTok accounts posting 2x daily see 3x follower growth. Consider scheduling 14 Reels per week instead of 7.",
    impact: "Medium",
  },
  {
    id: 3,
    website: "Waymark & Co",
    title: "Run a giveaway campaign",
    description: "Vintage watch giveaways on LinkedIn generate 5x more engagement. A 'Tag a Collector' post could bring 150+ qualified leads.",
    impact: "High",
  },
];

const pipeline = { draft: 18, approved: 7, posted: 102 };

const platformIcons = {
  Instagram,
  Facebook,
  Linkedin,
  Pinterest: PinIcon,
  TikTok: Zap,
};

/* ─── component ─── */
export default function Dashboard() {
  const [decisions, setDecisions] = useState(pendingDecisions);
  const [aiStatus] = useState("online");

  const today = new Date().toLocaleDateString("en-AU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleAccept = (id) => setDecisions((d) => d.filter((x) => x.id !== id));
  const handleReject = (id) => setDecisions((d) => d.filter((x) => x.id !== id));

  const totalPipeline = pipeline.draft + pipeline.approved + pipeline.posted;

  return (
    <div className="space-y-8">
      {/* ── Welcome bar ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
      >
        <div>
          <h1 className="text-2xl font-semibold text-warm-charcoal">Welcome back, Jae</h1>
          <p className="text-sm text-warm-muted mt-1">{today}</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-warm-border rounded-full shadow-premium">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
          </span>
          <span className="text-xs font-medium text-warm-gray capitalize">AI {aiStatus}</span>
        </div>
      </motion.div>

      {/* ── Stats row ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white border border-warm-border rounded-2xl shadow-premium p-5 card-lift hover:shadow-premium-hover"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium uppercase tracking-wide text-warm-muted">
                {s.label}
              </span>
              <div className="w-9 h-9 rounded-xl bg-taupe/10 flex items-center justify-center">
                <s.icon className="w-4 h-4 text-taupe" />
              </div>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-warm-charcoal">{s.value}</span>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full mb-0.5">
                {s.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Main grid: Website cards + sidebar ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Website Cards */}
        <div className="xl:col-span-2 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-warm-charcoal">Your Websites</h2>
            <button className="flex items-center gap-1 text-sm text-taupe hover:text-warm-charcoal transition-colors">
              View all <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {websites.map((site, i) => (
              <motion.div
                key={site.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="group bg-white border border-warm-border rounded-2xl shadow-premium hover:shadow-premium-hover card-lift overflow-hidden"
              >
                {/* Top accent bar */}
                <div className="h-1 w-full" style={{ backgroundColor: site.accent }} />

                <div className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0"
                      style={{ backgroundColor: site.accent }}
                    >
                      {site.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-warm-charcoal truncate">
                          {site.name}
                        </h3>
                        <span className="px-1.5 py-0.5 rounded-full text-[9px] font-medium uppercase tracking-wide bg-gray-50 text-gray-500">
                          {site.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-warm-muted mt-0.5">{site.platform}</p>
                    </div>
                  </div>

                  <p className="text-xs text-warm-muted line-clamp-2 mb-3">{site.description}</p>

                  {/* Platform icons */}
                  <div className="flex items-center gap-1.5 mb-3">
                    {site.platforms.map((p) => {
                      const Icon = platformIcons[p] || Globe;
                      return (
                        <div
                          key={p}
                          className="w-6 h-6 rounded-md bg-cream flex items-center justify-center"
                          title={p}
                        >
                          <Icon className="w-3 h-3 text-warm-muted" />
                        </div>
                      );
                    })}
                  </div>

                  {/* Mini stats */}
                  <div className="flex items-center gap-3 text-[10px] text-warm-muted mb-3">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3 h-3" /> {site.posts} posts
                    </span>
                    <span className="flex items-center gap-1">
                      <Lightbulb className="w-3 h-3" /> {site.advice} advice
                    </span>
                    <span className="flex items-center gap-1">
                      <Rocket className="w-3 h-3" /> {site.campaigns} campaigns
                    </span>
                  </div>

                  {/* Open link */}
                  <button className="flex items-center gap-1 text-xs text-taupe font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Open <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Content Pipeline ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white border border-warm-border rounded-2xl shadow-premium p-5"
          >
            <h3 className="text-sm font-semibold text-warm-charcoal mb-4">Content Pipeline</h3>
            <div className="space-y-3">
              {/* Draft */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="flex items-center gap-1.5 text-warm-muted">
                    <FileText className="w-3.5 h-3.5 text-amber-500" /> Draft
                  </span>
                  <span className="font-semibold text-warm-charcoal">{pipeline.draft}</span>
                </div>
                <div className="h-2.5 bg-cream rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(pipeline.draft / totalPipeline) * 100}%` }}
                    transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
                    className="h-full bg-amber-400 rounded-full"
                  />
                </div>
              </div>
              {/* Approved */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="flex items-center gap-1.5 text-warm-muted">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> Approved
                  </span>
                  <span className="font-semibold text-warm-charcoal">{pipeline.approved}</span>
                </div>
                <div className="h-2.5 bg-cream rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(pipeline.approved / totalPipeline) * 100}%` }}
                    transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                    className="h-full bg-blue-400 rounded-full"
                  />
                </div>
              </div>
              {/* Posted */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="flex items-center gap-1.5 text-warm-muted">
                    <Eye className="w-3.5 h-3.5 text-green-500" /> Posted
                  </span>
                  <span className="font-semibold text-warm-charcoal">{pipeline.posted}</span>
                </div>
                <div className="h-2.5 bg-cream rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(pipeline.posted / totalPipeline) * 100}%` }}
                    transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
                    className="h-full bg-green-400 rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Right sidebar ── */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white border border-warm-border rounded-2xl shadow-premium p-5"
          >
            <h3 className="text-sm font-semibold text-warm-charcoal mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-warm-border hover:border-taupe/30 hover:bg-cream/50 transition-all group"
                >
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", action.color)}>
                    <action.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-warm-charcoal">{action.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white border border-warm-border rounded-2xl shadow-premium p-5"
          >
            <h3 className="text-sm font-semibold text-warm-charcoal mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cream flex items-center justify-center shrink-0 mt-0.5">
                    <item.icon className={cn("w-3.5 h-3.5", item.color)} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-warm-gray leading-relaxed">{item.text}</p>
                    <p className="text-[10px] text-warm-muted mt-0.5 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Pending Decisions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-3"
          >
            <h3 className="text-sm font-semibold text-warm-charcoal">Pending Decisions</h3>
            <AnimatePresence>
              {decisions.map((d) => (
                <motion.div
                  key={d.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="bg-white border border-warm-border rounded-2xl shadow-premium p-4 space-y-3"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-medium text-warm-muted uppercase tracking-wide">
                        {d.website}
                      </span>
                      <span
                        className={cn(
                          "px-1.5 py-0.5 rounded-full text-[9px] font-medium",
                          d.impact === "High"
                            ? "bg-red-50 text-red-600"
                            : "bg-amber-50 text-amber-600"
                        )}
                      >
                        {d.impact} Impact
                      </span>
                    </div>
                    <h4 className="text-sm font-medium text-warm-charcoal">{d.title}</h4>
                    <p className="text-xs text-warm-muted mt-1 leading-relaxed">{d.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAccept(d.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-green-600 text-white text-xs font-medium hover:bg-green-700 transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" /> Accept
                    </button>
                    <button
                      onClick={() => handleReject(d.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-red-200 text-red-600 text-xs font-medium hover:bg-red-50 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" /> Reject
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
